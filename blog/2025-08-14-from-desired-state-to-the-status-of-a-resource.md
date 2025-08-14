---
title: "From Desired State to the Status of a Resource"
authors:
  - uwe-krueger
  - erwin-margewitsch
  - vasu-chandrasekhara
tags:
  - kubernetes
  - CRD
  - Customer Resource Definition
  - spec
  - status
---

In the [last blog](./2025-08-07-kubernetes-api-server-and-controller-archetypes.md), we looked into the heart of Kubernetes' functionality, its API centric core model only dealing with the CRUD of typed documents, the externalized business logic in reconciling controllers, and their archetypes. In this blog, we will discuss the layout and specifics of [Custom Resource Definitions (CRDs)](https://kubernetes.io/docs/concepts/extend-kubernetes/api-extension/custom-resources/) used to extend the <Term>Kubernetes Resource Model</Term>.

<!-- truncate -->

## Resource Layout

Recap: the controller's task is to map resource specifications to elements in a target environment, a process that is bidirectional:
* Changes on both sides can trigger controller operations,
* the digital twin must be the hook to access the desired state, to control the mapping[^1] process, as well as "feedback" about the current mapping state, and
* the resource is the interaction element for both sides, the resource owner and the controller(s). Both have access to the shared resource document.
[^1]: "mapping process" surmises the grouping and ordering of all required operations.

There are basically three information categories:
1. Rich and semantically consistent information reflecting the desired state of modelled elements in the `spec`.
2. Feedback information on the progress of the mapping, or its `status`, including valuable error information and the version of the resource observed so far by the controller.
3. Feedback information in `Events` about detected changes and actions executed by the controller because of drift between the desired state and the target environment.

The resource manifest structure offers a `spec` and a `status` section (or subresource), and the Kubernetes system implements an [Event API](https://kubernetes.io/docs/reference/kubernetes-api/cluster-resources/event-v1/), fittingly also modelled with declarative APIs.

### Desired State

When using Kubernetes' inbuilt API Extension facility through CRDs, both the `spec` and the `status` can be fully described with an OpenAPI v3.0 schema.

The `spec` section describes the configuration attributes and is managed by the owner of the resource (the inbound or desired state). These attributes are used by the controller to parameterize the mapping steps.

### Feedback

There are three different ways of providing feedback for the desired state expressed with the resource document.

#### The `status` Section

When creating or manipulating real-world elements in the target environment, selected attributes can be reported back into the status section of the resource. In Kubernetes, for example, the responsible aspect controller for the `Service` resource, reports back the network address of the instantiated load balancer.

In the `status` section you will also find information about the mapping progress. This typically can include an observed version, message and a status or phase field. This information is used by owners or consumers of the resource to gain information about the mapping state and potentially influences their processes.
For example, the `phase` field for `Pod` typically consists of the states `Pending`, `Running`, `Succeeded`, `Failed`, and `Unknown`.

```yaml
status:
  phase: Pending
```
This is clearly useful during the creation/setup of a resource. But the after initial creation it may cause problems during drift control, especially when multiple parties or controllers are involved in the implementation mapping, all sharing the same status attributes. In such cases, it can become difficult to derive an overall status.

#### Events

The `Event` feedback channel serves to provide information about
* detected external state changes
* executed actions
* mapping decisions and reasons

The information here has the flavor of a simple log. It lists formal actions and detected problems, executed by the controller during the lifetime of a resource.

This kind of information is handled by a sequence of so-called `events` in Kubernetes and has strictly to be distinguished from the first `status` category. It does not show the actual status, but the history of activity. In simple cases, you may find the list of all status changes. In general, it should offer more fine-grained information for the user about concrete actions done by the controller to align the desired state and the actual state in the target environment. A developer has the alternative to sift through (debugging) logs of the controller.

#### Complex Scenarios

Things get more complicated, when considering more elaborate controller/resource patterns. Every aspect of a resource might have its own status information. In such scenarios it might not be possible to synthesize a simple (shared) status value.
In the most simple case there is a fixed set of aspects, for example for the implementation of `Pods` in Kubernetes. In such a case, there may be dedicated feedback fields in the `status`.

But if different implementations are required for aspects, or even different sets of aspects depending on the environment or chosen implementation, a fixed field structure in the status is not universally applicable.
For such cases, `conditions` were introduced (cf. [KEP-1623](https://github.com/kubernetes/enhancements/tree/master/keps/sig-api-machinery/1623-standardize-conditions)). It is a list of independently managed condition entries.

The following is an example for conditions with different types.
```yaml
status:
  phase: "InProgress"
  conditions:
    - type: AppReady
      status: "False"
      reason: "Deploying"
      message: "Application deployment is in progress."
      lastTransitionTime: "2025-06-15T12:00:00Z"
    - type: DatabaseReady
      status: "True"
      reason: "DatabaseStarted"
      message: "Database has started successfully."
      lastTransitionTime: "2025-06-15T11:55:00Z"
    - type: ConfigurationValid
      status: "True"
      reason: "Validated"
      message: "All configuration values are valid."
      lastTransitionTime: "2025-06-15T11:50:00Z"
```
Each entry in conditions has the following fields:
* **`type`**: which condition or aspect is tracked (e.g., `AppReady`, `DatabaseReady`),
* **`status`**: one of `True`, `False`, or `Unknown`,
* **`reason`**: short, machine-readable explanation,
* **`message`**: human-readable, detailed explanation,
* **`lastTransitionTime`**: timestamp of the last status change,
\
and optionally,
* **`observedGeneration`**: Last time the condition transitioned from one status to another.

## Best Practices

This chapter draws insights from various deliberations on user experiences[^2] with designing and implementing CRDs. We'll explore several recommendations concerning its implementation.
[^2]: [Making CRDs Delightful: Beyond the Pitfalls](https://www.youtube.com/watch?v=6KdywJWnYyg) by Evan Anderson held at KubeCon EU 2025.

You might be wondering, "User experience for CRDs? Really?" The answer is a resounding _yes_, and our first example quickly illustrates why.

### Discrepancies, Feedback for Human or Machines?

Imagine you've requested 4 replicas, but the status reports only 2. Naturally, you'd question this discrepancy. And that's just the beginning.

```yaml
  apiVersion: foo.bar/v1
  kind: MyThing
  metadata:
    name: ...
    namespace: ...
  spec:
    # What the users wants
    replicas: 4
  status:
    # How the thing actually is
    replicas: 2
```

A simple user experience reduces the barrier to participation. A difficult user experience increases the chance of errors under stress. When something is wrong, you will look into the `status`. The worst thing is when you need to think what the `status` is trying to tell you, instead of obvious hints and solutions.

In the simple example above, do you need to do something? If you need to do something, where would you look further?

Furthermore, the `status` should clearly communicate what's happening to both machines and humans. Humans can deal with descriptions, summaries, sentences and involved resources. Machines rather deal with numbers, enums, URLs, and links to other resources.

### Meaningful Internal and External References

The `status` subresource communicates the meaningful **observed state** of the real-world status of the managed resource. It is common and recommended to include references to both, internal Kubernetes objects and external resources in the `status`.

- **Internal References** often point to resources like ConfigMaps, Secrets, or Pods that the controller is currently using or monitoring.

- **External References** can include URLs or endpoints of external services, APIs, or real-world (cloud) resources the controller has provisioned or is interacting with.

This approach keeps the `spec` focused on desired user intent, while the `status` reflects runtime information and dependencies discovered or created by the controller.
```yaml
apiVersion: apps.example.com/v1
kind: MyApp
metadata:
  name: my-app-instance
spec:
  configMapRef:
    name: my-app-config
  endpoint: "https://api.example.com/v1/webhook"
status:
  observedConfigMap:
    name: my-app-config
    namespace: default
  externalService:
    url: "https://api.example.com/v1/webhook"
  secretUsed:
    name: my-app-secret
    namespace: default

```
**Explanation**
- `status.observedConfigMap` and `status.secretUsed` are **internal** resource references, pointing to exactly which ConfigMap and Secret the controller is currently referencing or using.
- `status.externalService.url` records the actual **external** information, which might have been set or validated dynamically by the controller.

Recall that the `status` is **managed** fully by the controller, and is updated continuously to provide near real-time feedback to users and tools inspecting the resource.

Using the `status` subresource provides a clear separation between user intent and observed state.

### Positive, Standardized Conditions
Design a top-level summary condition like "Ready" (for ongoing things) or "Succeeded" (for completed tasks).

Use **positive** polarity for all other condition types (e.g., "FooWorked," "BarFetched", etc.). This means `true` indicates a desired state and makes it easier for both humans and machines to understand the overall status.

### When To Omit a Status
Status isn't always needed. If your CRD is purely for configuration (e.g., `GatewayClass`, `StorageClass`, `RoleBindings`), it might not need its own status.

### Build Aggregated CRDs
Create top-level resources that summarize the state of multiple underlying resources, making it easier for users to understand the overall picture (e.g., [Knative Service](https://knative.dev/docs/serving/), [Cert-Manager Certificate](https://cert-manager.io/docs/usage/certificate/)).

### Reuse Known Types
Use known types and references to other resources, or embed them in your CRD. Don't reinvent the wheel.
```yaml
spec:
  secretRef:
    namespace: mynamespace
    name: mysecret
    key: password
# or
  extensions:
  - type: foobar
    providerConfig:
      apiVersion: foobar.extensions/v1alpha1
      kind: FooBarConfig
      foo: bar
```
If different resources share a common structural pattern (like the `spec.template.spec` in `Deployments`, `DaemonSets`, and `Jobs`), adopt that pattern. This is also known as **Duct Typing**

### Meaningful Zero Values
Use the "zero value" of fields (e.g., an empty list, a zero integer) to imply a sensible default to "do the right thing". For example, an empty target in a policy could mean "applies to all resources in the namespace".

If zero is a meaningful distinct value (e.g., 0 replicas), use a pointer type in Go to distinguish between `nil` (not set) and `0` (explicitly set to zero).

### GitOps Friendliness (Idempotency)
Design your controllers so that applying resources multiple times or in any order eventually leads to the desired state without getting stuck in a half-initialized state.

### Metadata
What to use when:
* **Labels:** Use for short, searchable key-value pairs to find resources.
* **Annotations:** Use for more detailed, non-searchable metadata, potentially including JSON.
* **Owner References:** Always set owner references when your controller creates other resources. This enables garbage collection and helps users understand resource relationships.

### Validation
Use OpenAPI and CEL (Common Expression Language) validation in your CRD to provide immediate, useful error messages to users before the resource is even created.

### Aggregated Roles
You can dynamically [aggregate](https://kubernetes.io/docs/reference/access-authn-authz/rbac/) several ClusterRoles into one combined ClusterRole. Use special labels to automatically include your CRD's ClusterRoles into standard Kubernetes built-in ClusterRoles (e.g., for view, edit, admin):

### `kubectl` Experience
[Define `additionalPrinterColumns`](https://kubernetes.io/docs/tasks/extend-kubernetes/custom-resources/custom-resource-definitions/) in your CRD so `kubectl get` provides more useful information at a glance, including more details with the `wide` format.

Add short names for your kinds (e.g., `app` for `application`) to make `kubectl` commands easier to type.

Add your resources to the "all" category so they appear in `kubectl get all`.

### Versioning and Evolution of CRDs
Your CRDs are stored in the Kubernetes data plane. While your CRD specification and schema will change and evolve over time, you need to manage that transition.

* Different CRD versions (e.g., v1 & v2) are actively supported in the API simultaneously, but only one is the dedicated storage version. They need to be converted into each other.
* While some CRD version changes may be trivial, others may be utterly complex involving tradeoffs.

You can find further developer guidance in [kubebuilder](https://book.kubebuilder.io/), and talks[^3] that go further into detail.
[^3]: [The Missing Talk About API Versioning & Evolution in Your Developer Platform](https://www.youtube.com/watch?v=pHRQpqCEvU8) by Stefan Schimanski & Sergiusz Urbaniak held at KubeCon NA 2024.

### Emitting Events Matters

When building Kubernetes controllers, emitting **Events** to signal state changes is not just a nice-to-have best practice, it's a vital tool for making your custom resources **observable** and **user-friendly**.

While logs also contain detailed information about what the controller is processing, they are typically **inaccessible** to most users. Logs are often restricted to operators or administrators, hidden behind role-based access control (RBAC), or only visible through centralized logging systems. This creates a visibility gap for developers or users who deploy applications with built-in custom controllers, but don’t have access to internal logs.

Kubernetes **Events** bridge this gap. They provide a lightweight, user-facing way to track significant changes and issues. Events also appear in standard commands like `kubectl describe`:
```bash
# remark: kubectl describe <works with any Kubernetes resource>
$ kubectl describe pod coredns-5688667fd4-c9qsw --namespace kube-system

Name:                 coredns-5688667fd4-c9qsw
Namespace:            kube-system
...
Conditions:
  Type                        Status
  PodReadyToStartContainers   True
  Initialized                 True
  Ready                       True
  ContainersReady             True
  PodScheduled                True
...
Events:
  Type    Reason          Age   From     Message
  ----    ------          ----  ----     -------
  Normal  SandboxChanged  115s  kubelet  Pod sandbox changed, it will be killed and re-created.
  Normal  Pulled          114s  kubelet  Container image "coredns-coredns:1.12.1" already present on machine
  Normal  Created         114s  kubelet  Created container: coredns
  Normal  Started         114s  kubelet  Started container coredns
```

This makes it easy for any user to see what’s happening within their resource - whether it succeeded, failed, or is waiting on a dependency - without needing to access internal logs or debug the controller itself. But as a controller developer, avoid creating events for no-op checks and prevent noise.

By emitting `Events` for key lifecycle transitions (e.g., validation errors, creation success, external dependencies not found, etc.), you give users **actionable feedback** in near real-time. Following Kubernetes conventions - such as using consistent, machine-readable reasons, and clear, human-readable messages - ensures `Events` are both scriptable and understandable. They turn a “black box” controller into an observable system that’s easier to operate and support.


## Conclusion
Kubernetes makes it very easy to extend the API through CRDs, and the good news is: everyone can manage these just like any built-in resource using `kubectl`. The uncomfortable truth is: a good user experience can only be achieved with a thoroughly well-designed, and consistently maintained CRD (covering its full lifespan of many versions). And that will involve a learning curve.

**Outlook**
\
In a next blog we will take a look at further aspects of cooperating controllers, and Kubernetes data planes as Platform APIs.