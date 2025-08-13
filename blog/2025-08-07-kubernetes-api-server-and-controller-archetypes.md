---
title: "Kubernetes API Server and Controller Archetypes"
authors:
  - uwe-krueger
  - erwin-margewitsch
  - vasu-chandrasekhara
tags:
  - kubernetes
  - kubernetes resource model
  - controller
---

Why is the status of a resource in Kubernetes so difficult to determine? Hard to believe, since we are talking about Kubernetes, the orchestration platform which made it so easy to deploy, scale and manage containerized applications.
In the next few blog posts we will make a journey, starting to explore the <Term>Kubernetes Resource Model</Term>, the heart of Kubernetes' functionality. We will discover its responsibility and its declarative nature, visit afterwards the controllers and at the end will look at the resource manifests, where the users define the desired state but also the status has his home. When extending Kubernetes you are responsible in making the status meaningful, therefore we look at the end at some best practices for the status subresource.

<!-- truncate -->

## Kubernetes Resource Model

We will not repeat all the concepts of the <Term>Kubernetes Resource Model</Term>, but will focus only on the important concepts which are relevant for our discussion. Take a look also at the official [Apeiro documentation](./../docs/best-practices/digital-twins/krm/index.md) regarding the KRM.

**Everything is a Resource**
\
Kubernetes represents all infrastructure elements as API resources. Some common examples include:
* `Pod`: The smallest deployable unit.
* `Deployment`: Manages application replicas and updates.

**Declarative State Management**
\
Rather than issuing imperative commands (like "start 3 containers"), you define the desired state in a text document (also called "manifest"), which can be transmitted into a data plane and then manipulated by CRUD operations. Kubernetes' controllers continuously monitor and reconcile the current cluster state to match the declared state. This reconciling process is known as the [control loop](./../docs/best-practices/digital-twins/controller.md).

**Controllers and Reconciliation Loop**
\
Kubernetes uses controllers to monitor resources and ensure they match the desired state. For example:
* A `Deployment` controller will create new Pods if one crashes.
* A `HorizontalPodAutoscaler` adjusts replicas based on CPU usage.

**Custom Resources and Extensibility**
\
Kubernetes is extensible. You can define your own resource types using [Custom Resource Definitions](./../docs/best-practices/digital-twins/extensibility.md) (CRDs) and build controllers to manage them.

To understand the big picture we will look at the RESTful design pattern and how it's used in the Kubernetes API server, the resource documents and the controllers.


## RESTful Design Pattern

The REST pattern is designed for network-based, distributed applications, specifically client-server applications. A traditional REST server provides REST endpoints for various functions, these endpoints are identified by URLs and can be called via standard HTTP methods like GET, POST, PUT, DELETE.

The REST server represents some external environment, here called real-world. It maps the calls to implementations incorporated in the REST server, which finally call some external API to apply the intended semantic of the REST call to the real world.

In this typical design the service bundles the REST API endpoints with the functionality behind it. This is a useful design for services with a closed functionality. Depending on the implementation, the server becomes an instrinsic part that functionality, and may require a new software version, if new endpoints have to be added or functionality behind the endpoints needs to be modified.

<ApeiroFigure src="/status/img/traditional-big-picture.svg"
    alt="Regular REST API endpoints"
    caption="Regular REST API endpoints"
    width="100%"/>

In many cases the semantics of the REST endpoints is operation-centric.

Technically, the Kubernetes API server is like a REST server, however Kubernetes has chosen to use a completely different approach: it separates the functionality behind the API related to the real-world from the API management handled by a REST server. This architecture is also described as **API centric**. The Kubernetes API server restricts itself to operations required to manage textual resource documents representing the state of a software system.

The Kubernetes API server focuses on the documents, including access control and document type management. It does not know anything about the meaning of those managed documents. It just manages typed resources and specializes on the API service infrastructure and functionality required to maintain typed documents, also called resource manifest. It manages an object space for hosting resource documents, called the [data plane](./../docs/best-practices/control-planes/index.md#data-plane).

<ApeiroFigure src="/status/img/big-picture.svg"
    alt="Kubernetes-style API endpoints"
    caption="Kubernetes-style API endpoints"
    width="100%"/>

With the REST server handling API requests regarding the resource documents, the actual operations or payload processing takes place in externalized controllers. Let's now look at the resource documents and the controllers.

## Resource Manifests

In Kubernetes the resource manifest can be specified equivalently in YAML or in JSON format.

Almost every Kubernetes object includes two nested object fields that govern the object's specification: the object spec and the object status. For objects that have a spec, you have to set this when you create the object, providing a description of the characteristics you want the intended real-world objects behind the resource to have: its desired state.

The status describes the supplied real-world state of the object, and is kept up-to-date by a responsible controller in the Kubernetes control plane. Overall, the Kubernetes control plane continually and actively manages every object's actual state to match the desired state you supplied. The status field provides valuable information about the health, readiness and other important aspects of the resource.

## Kubernetes Controller
This is the place where the payload operations have their home after we saw that these operations have been moved away from the REST server. The functionality is implemented as a regular application, called controller, and it uses the REST API of the data plane like any normal user.

In this design, users are not triggering dedicated operations like in typical REST scenarios; they just declare the desired state. The necessary operations are determined by the controller by comparing the desired state from the resource document with the actual state in the real-world. This process works in both directions. Changes to both the desired state and the actual state may trigger operations executed by the resource implementation. It basically consists of a reconciliation loop triggered by state changes in the object space as well as in the real-world. The required operations are automatically derived from the observed delta.

The resource document describes the desired state provided by its maintainer or owner and some status information provided by its controller used to reflect additional external state found for the represented object in the real-world. This way the resource document can really be seen as a digital reproduction of some element or set of elements of the real-world. Applications can examine and manipulate the real-world object by reading or writing the resource document without direct access to the real world. The resource document is therefore called the digital twin of the real-world object it represents.

### Understanding Kubernetes Controllers

Kubernetes controllers are often described as reconciliation loops that keep the system's actual state aligned with the desired state. But in practice, controllers are capable of far more.

<ApeiroFigure src="https://upload.wikimedia.org/wikipedia/en/f/fc/Sir_Topham_Hatt_1986.jpg"
    alt="The Fat Controller"
    caption="The Fat Controller, a fictional character from Thomas & Friends, is centrally responsible for the efficient and smooth operation of the railway, overseeing locomotives and staff."
    source="Wikipedia: The Fat Controller"
    sourceLink="https://en.wikipedia.org/wiki/The_Fat_Controller"
    width="50%"/>

Controllers working together can manipulate any other Kubernetes object via the same API, coordinate complex behaviors, and orchestrate infrastructure, even without directly interacting with the real world, all using the same underlying control pattern.

### Controllers as Compositional Units
A controller isn't limited to acting on a single type of resource or external API. It can modify any object in the Kubernetes object space, using the generic, document-centric Kubernetes API, often without knowing which controller will pick up those changes. For example, the **[Kubernetes scheduler](./../docs/best-practices/control-planes/cat.md#attribute-controllers)** doesn't create Pods, it assigns them to Nodes by modifying the `nodeName` field in the `Pod` spec. This change triggers the **[kubelet](./../docs/best-practices/control-planes/cat.md#actuators)**, which is the controller actually responsible for launching the Pod on the target Node.

<ApeiroFigure src="/status/img/general-controller.svg"
    alt="Controller in general"
    caption="Controller in general"
    width="100%"/>

This decoupled, object-driven pattern allows for **[recursive orchestration](./../docs/best-practices/control-planes/cat.md#logical-object-controllers)**. Higher-level abstractions like **Deployments** are implemented by managing other resources, such as ReplicaSets and Pods. Each layer is handled by a different controller, forming a chain from abstract declarations to real-world execution.

<ApeiroFigure src="/status/img/recursive-nature-of-controller.svg"
    alt="Recursive nature of controller "
    caption="Recursive nature of controller "
    width="100%"/>

### Declarative Logic by Delegation

This layered controller model enables Kubernetes to represent **abstract resources** using lower-level primitives. For example, a `Deployment` resource is realized by the **Deployment controller**, which maintains a **ReplicaSet**, which in turn manages **Pods**. Each component is declarative and independent, yet collectively implements the application lifecycle.

Controllers may not directly interact with the real world at all, they simply manipulate Kubernetes objects. Those objects may trigger other controllers that manage infrastructure, networking, or external services. This model supports both **in-cluster orchestration** and **cross-environment coordination** (e.g., multi-cluster or hybrid cloud deployments).

## A Taxonomy of Controllers: Three Dimensions

Kubernetes controllers can be classified along **three orthogonal dimensions**:

1. **Behavior** – What the controller does.
2. **Organization** – How controller instances are assigned.
3. **Multi-Plane Organization** – How control spans environments or layers.

Let’s explore each.

## Controller Behavioral Types

With this dimension we describe how a controller works on its data plane and target environment. Also take a look at the [Controller Archetypes](./../docs/best-practices/control-planes/cat.md).

### Resource Controllers

These are the classic "actuator" controllers. They implement a resource’s desired state in the real world by calling external APIs. The **kubelet** is a resource controller: it ensures Pods assigned to its node are running. For more information see [kubelet and Pod lifecycle](https://kubernetes.io/docs/concepts/architecture/nodes/)

<ApeiroFigure src="/status/img/resource-controller.svg"
    alt="Resource controller"
    caption="Resource controller"
    width="100%"/>

### Attribute Controllers

These controllers manage individual fields or attributes of a resource rather than the resource itself. For instance, the **kube-scheduler** sets the `nodeName` field on unscheduled Pods by reading resource constraints and Node availability. It doesn’t launch the Pod, that’s the kubelet’s job.

<ApeiroFigure src="/status/img/attribute-controller.svg"
    alt="Attribute controller"
    caption="Attribute controller"
    width="100%"/>


### Aspect Controllers

These controllers manage **part of** a resource’s functionality. A good example is the **[cloud-controller](https://kubernetes.io/docs/concepts/architecture/cloud-controller/)**, which provisions load balancers in a cloud provider when a `Service` of type `LoadBalancer` is created. The actual service routing inside the cluster is handled separately by other networking components.

<ApeiroFigure src="/status/img/aspect-controller.svg"
    alt="Aspect controller"
    caption="Aspect controller"
    width="100%"/>


### Logical Controllers

These operate **only on Kubernetes objects** and express their behavior by managing other resources in the data plane. The **Deployment controller** is a logical controller: it maintains a ReplicaSet, which in turn manages Pods. This cascading implementation eventually leads to real-world effects but without direct external API calls.

<ApeiroFigure src="/status/img/logical-controller.svg"
    alt="Logical controller"
    caption="Logical controller"
    width="100%"/>

## Controller Organization

Resources must be correlated with controllers, responsible to implement the resources. There are several ways, how such an assignment might be organized.

### Straight Assignment

This is the typical controller design, one controller instance is responsible for all resources of a particular type.

<ApeiroFigure src="/status/img/straight-controller.svg"
    alt="straight controller"
    caption="Straight controller"
    width="100%"/>

Although a controller implementation is state-less, only one controller instance is used to handle all resources. This is required to avoid inter-process synchronization to coordinate the processing of a single resource among different controller instances to avoid the processing for a resource by more than one instance in parallel.

:::info
Even in the straight assignment case, you may want the controller to be highly available in case of a failure. The simple mechanism, often used in Kubernetes, is to spawn several instances and use leader election to elect one as the leader.

This opens up the question about the limits of scalability of a single, active controller instance. How much reconciliation work can one instance coordinate in parallel? How much memory is and how many threads are feasible?

At cloud scale, you may want to distribute the required reconciliation work across multiple, simultaneously active controller instances. The following paper describes an approach that allows scaling horizontally without sacrificing availability or performance: [Horizontally Scalable Kubernetes Controllers](https://github.com/timebertt/masters-thesis-controller-sharding/releases/download/v1.0/Horizontally_Scalable_Kubernetes_Controllers.pdf)
:::

The only other way to circumvent this synchronization is to establish a formal partitioning of the resource set. This leads to the next archetype: environment sharding.

### Environment Sharding

Instead of a singleton multiple controller instances are used. To avoid the coordination of the resource processing, every instance is uniquely responsible for a particular instance of the target environment intended for a particular resource. This responsibility is described by fields in the resource evaluated by the controller instances to determine whether it is responsible for processing this resource manifest.

Often the controller instances run near the technical environment, they are responsible for. For example, each **kubelet** instance runs on a node and is solely responsible for managing Pods on that node. This is a form of sharding based on `nodeName`.

This pattern is also used in multi-cluster setups like **[Gardener](https://gardener.cloud/docs/concepts/controller-manager/ )**, where `gardenlet` agents hosted by a dedicated seed cluster are used to run the control planes of payload clusters. Every seed cluster runs its own gardenlet to manage the local payload clusters, like a kubelet manages pod on a particular node.

<ApeiroFigure src="/status/img/sharded-environment-controller.svg"
    alt="Sharded environment controller"
    caption="Sharded environment controller"
    width="100%"/>

### Implementation Sharding

Different controller implementations manage resources based on the type of a target environment. For different environment types, different controller implementations are used. If this kind of sharding is used for a resources in a single data plane, the resources must describe this kind of responsibility, again. For example, in Kubernetes a `ingress` uses a `class` annotation to select among multiple possible `ingress` implementations. Or different data planes are intended for different technical environments, then a specific controller type is used to run (as singleton) against this data plane. For example, in Kubernetes an appropriate `Service` controller type is used, applicable for the IaaS environment used to run the Kubernetes cluster.

This is common in pluggable controller frameworks like **[Crossplane](https://docs.crossplane.io/)** or **Cluster API**.

<ApeiroFigure src="/status/img/sharded-implementation-controller.svg"
    alt="Sharded implementation controller"
    caption="Sharded implementation controller"
    width="100%"/>

## Multi-Plane Controller Organization

Controllers can also be categorized based on how they span **source (spec)** and **target (execution)** environments.

A controller might consume a single Kubernetes API and act on:

- A local data plane (e.g., Nodes, Pods),

- A remote system (e.g., cloud APIs),

- Or multiple environments at once.


In advanced cases, controllers form **n:m topologies**, where many resources may map to many targets, or be split across environments using delegation.

<ApeiroFigure src="/status/img/plane-organization-controller.svg"
    alt="Multi-plane controller organization"
    caption="Multi-plane controller organization"
    width="100%"/>

## Conclusion

Kubernetes controllers are the backbone of the platform’s extensibility. By combining behavioral roles, organizational patterns, and plane mappings, you can build systems that scale from simple automation to cross-cluster, or multi-cloud orchestration.

This highly composable, recursive architecture makes Kubernetes not just a container orchestrator but a **universal control plane** for declarative systems, or in other words a **Cloud Operating System**.

**Outlook**
\
In a next blog we will take a look the resource layout, how the desired state and its current status is reported.