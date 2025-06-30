---
title: Extensibility
sidebar_position: 3
---

The Kubernetes control plane and its API server are designed with inbuilt API Extensibility features. Kubernetes offers a robust framework for extensibility through **Custom Resource Definitions** (CRDs).  
CRDs allow users to create new types of <Term>resources</Term> beyond the built-in set, enabling the management of custom resources like databases, messaging systems, storage or filesystems, or any type of capability directly within the grasp of the Kubernetes API. 

Users can recursively leverage Kubernetes' declarative API and define a CRD using `apiVersion: apiextensions.k8s.io/v1` and `kind: CustomResourceDefinition`. The subsequently extended API enables to create, get, list, watch, update, patch, and delete instances of these custom resources, just as they would with native Kubernetes resources (native resources can also be considered custom resources[^1]).  
This extension mechanism provides flexibility and customization, allowing for seamless integration with existing Kubernetes tools and security measures and policies. It supports the dynamic registration and management of custom resources in a control plane. 

A thorough description of Custom Resource Definitions, including topics of validation with OpenAPI v3.0 schema, validation with Common Express Language (CEL), multi-versioning, and many more can be found in the Kubernetes documentation: [Extend the Kubernetes API with CustomResourceDefinitions](https://kubernetes.io/docs/tasks/extend-kubernetes/custom-resources/custom-resource-definitions/).

## Extension API server

Alternatively, the API server can also be extended with additional APIs using an [Extension API Server](https://kubernetes.io/docs/tasks/extend-kubernetes/setup-extension-api-server/) which are not part of the core Kubernetes APIs.

For [example](https://github.com/gardener/gardener/blob/master/example/90-shoot.yaml), [Gardener](https://gardener.cloud) is implemented as an Extension API server that introduces a bundle of new custom resource definitions. The main user facing extended resource is the `shoot`, which fully adheres to the consistent KRM framework and specification:
```yaml
apiVersion: core.gardener.cloud/v1beta1
kind: Shoot
metadata:
  name: crazy-botany
  labels:
    category: production
  annotation:
    gitops: 483ac937f496b2f36a8ff34c3b3ba84f70ac5782
spec:
...
status:
...
```
Familiarity and proficiency with Kubernetes allows developers and administrators to easily apply (and convert) skills towards other capabilities modelled with KRM. 

The `api-resources` command included in the standard client library is essentially useful for dynamic discovery of resource definitions (digital twins) and their APIs:
- **Discovery**: It helps understand what resources are available in their Kubernetes cluster, which can be particularly helpful when working with custom resources or when you're not sure about the exact name or API version of a resource.
- **Scope**: Knowing whether a resource is namespaced or cluster-scoped is crucial for managing and querying resources correctly.
- **Policies**: The output can be used to create Role-Based Access Control (RBAC) policies by listing all resources and their associated API groups, which can then be used to define permissions.
- **Versions**: It shows the API versions available for each resource, which is important for ensuring compatibility and understanding the evolution of Kubernetes APIs.
- **Completion**: Tools like kubectl can use this information for command-line completion, making it easier to interact with KRM.

## Usage beyond Kubernetes 

<Term>KRM</Term> was intended to serve as the base representation for software development kits, clients, and tooling, enabling to render and generate the API representation dynamically. The declarative management approach with self-describing resources can be used in other areas as well. With the ecosystem adopting Kubernetes (and therin KRM), a network effect with a plethora of (declarative) configuration tools for many use cases emerged.

Some tools re-use KRM standard definitions but outside the Kubernetes realm, for example [Tilt](https://tilt.dev/) in its command line interface:
```
tilt api-resources
NAME                      SHORTNAMES     APIVERSION          NAMESPACED   KIND
clusters                                 tilt.dev/v1alpha1   false        Cluster
cmdimages                                tilt.dev/v1alpha1   false        CmdImage
cmds                                     tilt.dev/v1alpha1   false        Cmd
...
uibuttons                                tilt.dev/v1alpha1   false        UIButton
uiresources                              tilt.dev/v1alpha1   false        UIResource
uisessions                               tilt.dev/v1alpha1   false        UISession
```

[^1]: See [Generic Control Plane](https://github.com/kcp-dev/generic-controlplane) and the <Project>kcp</Project> project presentation [Deep Dive Into Generic Control Planes and kcp](https://kccncna2024.sched.com/event/f89a88fa580392ef5e839ecc6af28049)
