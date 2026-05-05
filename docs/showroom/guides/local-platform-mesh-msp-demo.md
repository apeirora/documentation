---
sidebar_position: 1
sidebar_label: Local Platform Mesh with LLM & Chat UI
title: "Local Platform Mesh with LLM & Chat UI"
outline: [2, 3]
---

Platform Mesh turns Kubernetes operators into managed services. A provider writes an operator once, registers it through KCP, and every customer gets self-service access through a workspace without ever touching the cluster where the operator runs.

That sounds abstract. This tutorial makes it concrete.

You will set up a full Platform Mesh environment on your laptop, register two real service providers, and then (switching to the customer's perspective) provision a private LLM and a Chat UI that talks to it. Everything runs on a single Kind cluster, but the architecture is identical to what runs in production.

| Step | Role | What you do |
|------|------|-------------|
| **1** | Platform team | Set up local Platform Mesh (Kind + KCP) |
| **2** | Provider team | Install Private LLM on the local setup |
| **3** | Provider team | Install Chat UI on the local setup |
| **4** | Customer | Create the consumer (`demo`) workspace |
| **5** | Customer | Bind to the provider APIs (`APIBinding`) |
| **6** | Customer | Create an `LLMInstance` |
| **7** | Customer | Create a `ChatUIInstance` wired to the LLM |
| **8** | Customer | Access the Chat UI and talk to the model |

---

## Scenario Overview

Imagine a platform team that wants to offer two services to its internal customers: a private LLM inference endpoint and a chat interface. The platform team builds two Kubernetes operators and registers them in Platform Mesh. A customer binds to the provider APIs and creates instances without needing to know where or how those operators run.

This tutorial puts you in both roles. First you are the **platform team**, deploying operators and registering them as providers. Then you become the **customer**, creating service instances through the KCP API.

The two providers:

| Provider | What it does | What the customer creates |
|----------|-------------|--------------------------|
| [**Private LLM**](https://github.com/apeirora/showroom-msp-private-llm) | Runs a llama.cpp inference server | An `LLMInstance` CR with a model name and replica count |
| [**Chat UI**](https://github.com/apeirora/showroom-msp-chat-ui) | Deploys a per-tenant Open WebUI wired to an OpenAI-compatible backend | A `ChatUIInstance` CR pointing to a credentials Secret |

What makes this interesting is the **composition**. Chat UI does not bundle its own LLM; it consumes one. The customer creates an LLM first, gets a Secret with the endpoint, then passes that Secret to the Chat UI. Two independent providers, connected through a standard interface.

## Architecture

In production, KCP runs on a dedicated cluster and each provider has its own MSP (Managed Service Provider) cluster. Locally, everything runs in a single Kind cluster, but the logical boundaries are the same: provider workspaces are isolated from consumer workspaces, sync agents bridge the control plane to the workload layer, and operators only see CRs that belong to their APIExport.

<ApeiroFigure src="/showroom/guides/local-pm-architecture.drawio.svg"
  alt="Architecture diagram showing KCP control plane with provider and consumer workspaces, sync agents bridging to workload namespaces running Private LLM and Chat UI operators"
  caption="Local Platform Mesh architecture: everything runs in a single Kind cluster, but the logical layers (provider, consumer, sync, workload) mirror the production setup" />

Both providers follow the same split: one umbrella chart for the workload side (operator + sync agent on Kind), one for the KCP side (APIExport in the provider workspace).

## Prerequisites

- [Docker](https://docs.docker.com/get-docker/) (or [Podman](https://podman.io))
- [Kind](https://kind.sigs.k8s.io/) (Kubernetes in Docker)
- [kubectl](https://kubernetes.io/docs/tasks/tools/)
- [Helm](https://helm.sh/) 3
- [Task](https://taskfile.dev/installation/) (optional, you can run the scripts directly)
- [yq](https://github.com/mikefarah/yq), [mkcert](https://github.com/FiloSottile/mkcert): used by local-setup scripts
- [krew](https://krew.sigs.k8s.io/): used to install the kcp kubectl plugins in Step 1
- ~10 GB free disk space (Kind cluster + model download)

Plan around 25 min on a warm machine: about 10 of those are `task local-setup`; the rest is Helm plus waiting for the model to download.

For detailed prerequisite setup across operating systems and container runtimes, see the [Platform Mesh local-setup README](https://github.com/platform-mesh/helm-charts/tree/main/local-setup#prerequisites).

## Key Concepts

- [**KCP Workspaces**](https://docs.kcp.io/kcp/main/concepts/workspaces/): the multi-tenant control plane. Each provider and consumer organization gets its own isolated workspace.
- [**APIExport & APIBinding**](https://docs.kcp.io/kcp/main/concepts/apis/): the provider/consumer contract. A provider publishes an APIExport; a consumer binds to it in their workspace.
- [**API Sync Agent & PublishedResource**](https://docs.kcp.io/api-syncagent/): the bridge between KCP and a workload cluster. CRs created in KCP are virtual; the sync agent mirrors them to real clusters and syncs status back.
## Part 1: Building the Platform

### Step 1: Set up Local Platform Mesh

Clone [`helm-charts`](https://github.com/platform-mesh/helm-charts), check out the validated local-demo commit, run the local setup, and install the kcp kubectl plugins. The commit pins the Platform Mesh OCM component used by local setup; do not edit `local-setup/kustomize/components/ocm/component.yaml`. A future version of this tutorial will switch to a release version of Platform Mesh.

```sh
git clone https://github.com/platform-mesh/helm-charts.git
cd helm-charts
git checkout b0ff8e91   # pins PM components to 0.4.0-build.30

task local-setup

kubectl krew index add kcp-dev https://github.com/kcp-dev/krew-index.git || true
kubectl krew install kcp-dev/kcp kcp-dev/ws kcp-dev/create-workspace
```

Point your shell at the two kubeconfigs:

```sh
export KCP="$(pwd)/.secret/kcp/admin.kubeconfig"
export KIND="$(pwd)/.secret/kind/kubeconfig"
mkdir -p "$(dirname "$KIND")" && kind get kubeconfig --name platform-mesh > "$KIND"
export KUBECONFIG=$KCP
export DEMO_USER=tutorial@example.com    # must look like an email; Step 4's org initializer validates the format
```

Apply two one-time runtime adjustments:

```sh
# Use 127.0.0.1 to avoid localhost address-family ambiguity.
yq -i '
  .clusters[].cluster.server |= sub("https://localhost:", "https://127.0.0.1:") |
  .clusters[].cluster."tls-server-name" = "localhost"
' "$KCP"

# CoreDNS: make KCP virtual-workspace hostnames reachable from inside pods.
(
  export KUBECONFIG=$KIND
  TRAEFIK_IP=$(kubectl get svc -n default traefik -o jsonpath='{.spec.clusterIP}')
  kubectl get configmap coredns -n kube-system -o yaml | \
    TRAEFIK_IP=$TRAEFIK_IP yq eval '.data.Corefile |= sub("kubernetes cluster.local",
      "hosts {\n    " + strenv(TRAEFIK_IP) + " localhost kcp.localhost root.kcp.localhost llm.test\n    fallthrough\n}\nkubernetes cluster.local")' | \
    kubectl apply -f -
  kubectl rollout restart deploy coredns -n kube-system
  kubectl rollout status deploy coredns -n kube-system --timeout=90s
)
```

Verify the two endpoints:

```sh
KUBECONFIG=$KIND kubectl get nodes
kubectl kcp workspace tree
```

### Step 2: Install Private LLM

Private LLM lives in two places: the operator and sync-agent on the Kind cluster, and the APIExport on KCP. Install both halves directly from the published OCI charts.

Create the provider workspace on KCP:

```sh
kubectl kcp workspace use :root
kubectl create-workspace providers --type=root:providers --ignore-existing
kubectl kcp workspace use :root:providers
kubectl create-workspace private-llm --type=root:provider --ignore-existing
```

Install the workload side on Kind:

```sh
kubectl kcp workspace use :root
KUBECONFIG=$KIND helm install private-llm \
  oci://ghcr.io/apeirora/charts/private-llm-msp-app --version 2.10.1 \
  --namespace private-llm --create-namespace \
  --set global.publicHost=llm.test \
  --set kcpKubeconfig.inClusterServerUrl=https://frontproxy-front-proxy.platform-mesh-system.svc.cluster.local:8443 \
  --set-file kcpKubeconfig.adminContent=$KCP
```

Install the KCP side in the provider workspace:

```sh
kubectl kcp workspace use :root:providers:private-llm
helm install private-llm-pm \
  oci://ghcr.io/apeirora/charts/private-llm-pm-app --version 2.10.1 \
  --namespace private-llm --create-namespace
```

Sync agent pods may restart once or twice during the first ~90 seconds, while the KCP-side install finishes publishing its endpoint slice. This is expected.

Wait for the sync agent to publish the provider resources before moving on:

```sh
KUBECONFIG=$KIND kubectl -n private-llm rollout status deployment/private-llm --timeout=3m
kubectl get apiexport llm.privatellms.msp \
  -o jsonpath='{range .spec.resources[*]}{.name}{"\n"}{end}'
```

The APIExport resources must include `llminstances` and `apitokenrequests`.

For the full details and troubleshooting, see the [Private LLM local installation guide](https://github.com/apeirora/showroom-msp-private-llm/blob/main/docs/installation-local.md).

### Step 3: Install Chat UI

Chat UI follows the same umbrella-chart pattern as Private LLM and is published the same way.

Create the provider workspace on KCP:

```sh
kubectl kcp workspace use :root:providers
kubectl create-workspace chat-ui --type=root:provider --ignore-existing
kubectl kcp workspace use :root:providers:chat-ui
```

Install the workload side on Kind:

```sh
KUBECONFIG=$KIND helm install chat-ui \
  oci://ghcr.io/apeirora/charts/chat-ui-msp-app --version 0.10.6 \
  --namespace chat-ui --create-namespace \
  --set kcpKubeconfig.inClusterServerUrl=https://frontproxy-front-proxy.platform-mesh-system.svc.cluster.local:8443 \
  --set-file kcpKubeconfig.adminContent=$KCP
```

Install the KCP side in the provider workspace:

```sh
helm install chat-ui-pm \
  oci://ghcr.io/apeirora/charts/chat-ui-pm-app --version 0.10.6 \
  --namespace chat-ui --create-namespace
```

Wait for the sync agent to publish the Chat UI resource before moving on:

```sh
KUBECONFIG=$KIND kubectl -n chat-ui rollout status deployment/chat-ui --timeout=3m
kubectl get apiexport ui.privatellms.msp \
  -o jsonpath='{range .spec.resources[*]}{.name}{"\n"}{end}'
```

The APIExport resources must include `chatuiinstances`.

For the full details and troubleshooting, see the [Chat UI local installation guide](https://github.com/apeirora/showroom-msp-chat-ui/blob/main/docs/installation-local.md).

Both providers are now registered in KCP and their sync agents are idle, waiting for a customer to create something.
## Part 2: Using the Platform

### Step 4: Create the Consumer Workspace

Customer resources live under two `Account` CRs: the org `Account` creates the org workspace (and its workspace types), and a child `Account` creates the per-user workspace your resources actually land in.

Create the org `Account`:

```sh
kubectl kcp workspace use :root:orgs

until kubectl create -o yaml -f - 2>/dev/null <<EOF | grep -q 'allowed: true'; do sleep 2; done
apiVersion: authorization.k8s.io/v1
kind: SubjectAccessReview
spec:
  user: ${DEMO_USER}
  resourceAttributes:
    verb: create
    group: core.platform-mesh.io
    resource: accounts
    version: v1alpha1
EOF

kubectl create --as="$DEMO_USER" -f - <<'EOF'
apiVersion: core.platform-mesh.io/v1alpha1
kind: Account
metadata:
  name: demo
spec:
  type: org
  displayName: Demo Org
EOF

kubectl wait account/demo --for=condition=Ready --timeout=3m
```

Wait for the org authorization store, then switch into the new workspace:

```sh
until kubectl get store demo >/dev/null 2>&1; do sleep 2; done
kubectl wait store/demo --for=condition=Ready --timeout=3m

KUBECONFIG=$KIND kubectl rollout restart deployment/rebac-authz-webhook -n platform-mesh-system
KUBECONFIG=$KIND kubectl rollout status deployment/rebac-authz-webhook -n platform-mesh-system --timeout=90s

kubectl kcp workspace use :root:orgs:demo
```

Create the child `Account`. In local setup, the authorization webhook can occasionally keep returning `NoOpinion` for the new org workspace until it is restarted. The bounded retry below restarts it and rechecks the SAR instead of waiting forever.

```sh
account_create_allowed() {
  kubectl create -o yaml -f - 2>/dev/null <<EOF | grep -q 'allowed: true'
apiVersion: authorization.k8s.io/v1
kind: SubjectAccessReview
spec:
  user: ${DEMO_USER}
  resourceAttributes:
    verb: create
    group: core.platform-mesh.io
    resource: accounts
    version: v1alpha1
EOF
}

allowed=false
for attempt in 1 2 3; do
  for _ in $(seq 1 30); do
    if account_create_allowed; then
      allowed=true
      break 2
    fi
    sleep 2
  done

  KUBECONFIG=$KIND kubectl rollout restart deployment/rebac-authz-webhook -n platform-mesh-system
  KUBECONFIG=$KIND kubectl rollout status deployment/rebac-authz-webhook -n platform-mesh-system --timeout=90s
done

if [ "$allowed" != true ]; then
  echo "Timed out waiting for account create authorization in root:orgs:demo" >&2
  exit 1
fi

kubectl create --as="$DEMO_USER" -f - <<'EOF'
apiVersion: core.platform-mesh.io/v1alpha1
kind: Account
metadata:
  name: tutorial
spec:
  type: account
  displayName: Tutorial Account
EOF

kubectl wait account/tutorial --for=condition=Ready --timeout=3m
```

Switch into the tutorial workspace and create the `default` namespace where your service instances will land:

```sh
kubectl kcp workspace use :root:orgs:demo:tutorial   # stay here for the remaining steps
kubectl create namespace default --dry-run=client -o yaml | kubectl apply -f -
```

### Step 5: Bind the Provider APIs

An **APIBinding** is how a consumer workspace subscribes to a provider's **APIExport**. Think of the APIExport as a service catalog entry the provider publishes, and the APIBinding as the customer saying "yes, give me access". After the binding is accepted, the provider's CRDs appear in the consumer workspace: `kubectl get llminstances` and `kubectl get chatuiinstances` start working inside `root:orgs:demo:tutorial`, even though the CRDs themselves are still owned by the provider.

The sync agent needs to read your `Secrets` and write `Events`: **permission claims** that the binding must accept. Skip them and the binding still goes green, but every sync-agent request comes back `forbidden`.

```sh
kubectl apply -f - <<'EOF'
apiVersion: apis.kcp.io/v1alpha2
kind: APIBinding
metadata:
  name: llm-binding
spec:
  reference:
    export:
      path: root:providers:private-llm     # provider workspace
      name: llm.privatellms.msp            # APIExport (exposes LLMInstance + APITokenRequest)
  permissionClaims:
  - {group: "", resource: secrets,    verbs: ["*"], selector: {matchAll: true}, state: Accepted}
  - {group: "", resource: namespaces, verbs: ["*"], selector: {matchAll: true}, state: Accepted}
  - {group: "", resource: events,     verbs: ["*"], selector: {matchAll: true}, state: Accepted}
---
apiVersion: apis.kcp.io/v1alpha2
kind: APIBinding
metadata:
  name: chat-ui-binding
spec:
  reference:
    export:
      path: root:providers:chat-ui         # provider workspace
      name: ui.privatellms.msp             # APIExport (exposes ChatUIInstance)
  permissionClaims:
  - {group: "", resource: secrets,    verbs: ["*"], selector: {matchAll: true}, state: Accepted}
  - {group: "", resource: namespaces, verbs: ["*"], selector: {matchAll: true}, state: Accepted}
  - {group: "", resource: events,     verbs: ["*"], selector: {matchAll: true}, state: Accepted}
EOF
```

Verify both bindings become `Ready`:

```sh
kubectl wait apibinding/llm-binding --for=condition=Ready --timeout=3m
kubectl wait apibinding/chat-ui-binding --for=condition=Ready --timeout=3m
kubectl get apibindings

until kubectl api-resources --api-group=llm.privatellms.msp | grep -q '^llminstances'; do sleep 2; done
until kubectl api-resources --api-group=ui.privatellms.msp | grep -q '^chatuiinstances'; do sleep 2; done
```

### Step 6: Create an `LLMInstance`

`LLMInstance` is now a type in your workspace. Create one: the sync agent mirrors it to the Kind cluster, the operator downloads the model and runs llama.cpp, and status flows back to KCP:

```sh
kubectl apply -f - <<'EOF'
apiVersion: llm.privatellms.msp/v1alpha1
kind: LLMInstance
metadata:
  name: demo-llm
  namespace: default
spec:
  model: gemma-3-1b-it
  replicas: 1
EOF

kubectl wait llminstance/demo-llm --for=condition=Ready --timeout=8m
kubectl get llminstance demo-llm
```

### Step 7: Request a Token and Create a `ChatUIInstance`

Chat UI doesn't bundle its own model; it consumes one over an OpenAI-compatible API. The configuration procedure (create an `APITokenRequest`, get a `Secret` back, hand it to the Chat UI) is the same pattern production deployments use; you're just running it locally.

Create an `APITokenRequest`. The LLM operator generates an auth token, writes `OPENAI_API_URL` and `OPENAI_API_KEY` into a `Secret` named `<request-name>-token`, and the sync agent mirrors that `Secret` back into your consumer workspace:

```sh
kubectl apply -f - <<'EOF'
apiVersion: llm.privatellms.msp/v1alpha1
kind: APITokenRequest
metadata:
  name: demo-llm-token
  namespace: default
spec:
  instanceName: demo-llm
  description: Chat UI access token
EOF

kubectl wait apitokenrequest/demo-llm-token --for=jsonpath='{.status.phase}'=Ready --timeout=3m
TOKEN_SECRET=$(kubectl get apitokenrequest demo-llm-token -o jsonpath='{.status.secretName}')
```

Wait until the mirrored Secret is readable in the consumer workspace:

```sh
until kubectl get secret "$TOKEN_SECRET" >/dev/null 2>&1; do sleep 2; done
```

Create the `ChatUIInstance`, pointing it at the token secret:

```sh
kubectl apply -f - <<EOF
apiVersion: ui.privatellms.msp/v1alpha1
kind: ChatUIInstance
metadata:
  name: demo-chat
  namespace: default
spec:
  credentialsSecretRef:
    name: $TOKEN_SECRET
EOF
```

Wait for the Chat UI operator to deploy Open WebUI and report back:

```sh
kubectl wait chatuiinstance/demo-chat --for=condition=Ready --timeout=8m
```

### Step 8: Access the Chat UI

Port-forward to the Open WebUI pod on the Kind cluster:

```sh
(
  export KUBECONFIG=$KIND
  CHAT_NS=$(kubectl get chatuiinstances -A -o jsonpath='{.items[0].metadata.namespace}')
  kubectl port-forward -n "$CHAT_NS" svc/demo-chat-chatui 8080:8080
)
```

Open `http://localhost:8080`. Gemma 3 1B auto-selects in the model picker; it shows as `/models/gemma-3-1b-it-Q4_K_M.gguf` (llama.cpp registers models by their file path).

On local CPU-only runtimes, Gemma inference is slow. A first reply can take several minutes because Open WebUI sends a much larger prompt than a basic smoke-test query. The UI isn't stuck, Gemma is just thinking.

The first Open WebUI start can also take a minute or two while Kind pulls the image and Open WebUI downloads its startup assets. `ContainerCreating` or an initial `Provisioning` phase is expected during that first boot.

## What Just Happened

Take a step back and look at what you built. The tutorial had two parts, and the boundary between them is the whole point.

**Part 1** was platform work: deploying operators, creating provider workspaces, registering APIs. Each provider had a workload-side install on Kind and a KCP-side install in its provider workspace.

**Part 2** was customer work: binding to APIs, creating CRs, getting back status. The customer never knew which cluster the operators ran on, never needed cluster credentials, never wrote a Helm chart. They created short YAML documents against the KCP API and got managed services back.

The flow:

1. **Customer** creates an `LLMInstance` in their workspace: a request, not an instruction
2. **LLM sync agent** mirrors the CR to the workload cluster
3. **Private LLM operator** reconciles: downloads the model, creates Deployment and Service
4. **Status flows back** through the sync agent; the customer sees `Ready`
5. **Customer** creates a `ChatUIInstance` with a credentials Secret, composing two services through a standard interface
6. **Chat UI sync agent** mirrors the CR and Secret; the operator gets both in the same namespace
7. **Chat UI operator** reconciles: deploys Open WebUI, injects credentials
8. **Status flows back**; the customer has a working Chat UI

This separation (providers build operators, the platform handles multi-tenancy and delivery, customers create simple CRs) is what Platform Mesh enables. The local setup compresses the infrastructure, but the contracts between the layers are identical to production.

## Cleanup

```sh
kind delete cluster --name platform-mesh
```

## Troubleshooting

For operator-specific issues, see each project's local installation guide:

- [Private LLM troubleshooting](https://github.com/apeirora/showroom-msp-private-llm/blob/main/docs/installation-local.md#troubleshooting)
- [Chat UI troubleshooting](https://github.com/apeirora/showroom-msp-chat-ui/blob/main/docs/installation-local.md#troubleshooting)
- [Platform Mesh local-setup troubleshooting](https://github.com/platform-mesh/helm-charts/tree/main/local-setup#troubleshooting)

### Common Issues

| Symptom | Cause | Fix |
|---------|-------|-----|
| `task local-setup` hangs during Kind creation and kubelet logs contain `could not detect clock speed` | The older `kindest/node:v1.35.0` image can fail on some arm64 Docker setups | Use the pinned guide commit `b0ff8e91`, which uses `kindest/node:v1.35.1` |
| Sync agent logs contain `frontproxy-front-proxy...:6443: i/o timeout` | PM `0.4.0-build.30` exposes the in-cluster front-proxy Service on `8443`, while the provider chart defaults still point at `6443` | Keep the Step 2 and Step 3 `kcpKubeconfig.inClusterServerUrl=...:8443` value on the MSP-side Helm installs |
| `helm install` hits the wrong cluster | `KUBECONFIG` is set to `$KCP` by default; MSP-side installs must prefix with `KUBECONFIG=$KIND` | Re-run with `KUBECONFIG=$KIND helm install ...` on the MSP-side command |
| `kubectl` against `localhost:8443` returns `http: server gave HTTP response to HTTPS client` | `localhost` can resolve to the wrong local listener for this setup | Apply the `127.0.0.1` kubeconfig patch in Step 1 |
| `KUBECONFIG=$KIND kubectl …` returns `connection refused` against a `127.0.0.1:<port>` that doesn't match the running Kind container | Docker reassigns the Kind API-server port on each container restart and the file at `$KIND` still has the old port | Refresh `$KIND` from the live cluster: `kind get kubeconfig --name platform-mesh > "$KIND"` |
| Creating the `demo` Account fails with `cannot patch resource "accounts"` and `NoOpinion` | `kubectl apply --server-side` uses the `patch` verb, while local org onboarding grants the demo user `create` for Accounts | Use the Step 4 `kubectl create --as="$DEMO_USER"` commands. If a failed retry created `tutorial` directly under `root:orgs`, run `kubectl kcp workspace use :root:orgs`, then delete it with `kubectl delete account tutorial` |
| Creating the `demo` or `tutorial` Account fails with `cannot create resource "accounts"` and `NoOpinion` | The rebac-authz-webhook's apiexport-cluster-provider raced the Store reconciler: `Store.status.storeId` was empty when it tried to register the new logical cluster, so the cluster was dropped and never retried | Run the Step 4 flow as written: it waits for the Store, rolls the webhook so it re-registers cleanly, and SAR-polls before each impersonated create. If you hit it on an already-broken stack, `KUBECONFIG=$KIND kubectl rollout restart deployment/rebac-authz-webhook -n platform-mesh-system` and rerun the failing block |
| Creating `LLMInstance` fails with `no matches for kind "LLMInstance"` | The Private LLM sync agent has not published `llminstances` into the provider APIExport yet | Run the Step 2 rollout and APIExport resource checks. If `private-llm` is CrashLooping, inspect `KUBECONFIG=$KIND kubectl -n private-llm logs deploy/private-llm --tail=50` |
| Creating `ChatUIInstance` fails with `no matches for kind "ChatUIInstance"` | The Chat UI sync agent has not published `chatuiinstances` into the provider APIExport yet | Run the Step 3 rollout and APIExport resource checks. If `chat-ui` is missing or unhealthy, inspect `KUBECONFIG=$KIND kubectl -n chat-ui logs deploy/chat-ui --tail=50` |

## Further Reading

- [Private LLM: Architecture](https://github.com/apeirora/showroom-msp-private-llm/blob/main/docs/architecture.md)
- [Chat UI: Architecture](https://github.com/apeirora/showroom-msp-chat-ui/blob/main/docs/architecture.md)
- [Platform Mesh local-setup: Developer Guide](https://github.com/platform-mesh/helm-charts/tree/main/local-setup/DEVELOPERS.md)
