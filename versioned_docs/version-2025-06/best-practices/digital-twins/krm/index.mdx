---
title: Kubernetes Resource Model
sidebar_position: 1
---

*Kubernetes uses an opinionated <Term>Digital Twin</Term> Model.*

The concept of digital twins aligns closely with the **[Kubernetes Resource Model](https://github.com/kubernetes/design-proposals-archive/blob/main/architecture/resource-management.md)** (KRM) in terms of managing complex systems through abstraction and declarative configurations.  
Its original purpose and design was created for orchestrating containerized workloads and services in a cluster of machines. It uses a [declarative approach](https://github.com/kubernetes/design-proposals-archive/blob/main/architecture/declarative-application-management.md) to define the "desired state" of resources (e.g., pods, services) and employs software <Term>actuators</Term> (controllers or operators) to reconcile this state with the real-world/actual state in the cluster. 

In contrast to traditional approaches with imperative command & control APIs, Kubernetes' design is founded on [Promise Theory](https://en.wikipedia.org/wiki/Promise_theory). Kubernetes and KRM hence represent a cloud-native reference implementation for [immutable infrastructure](https://thenewstack.io/a-brief-look-at-immutable-infrastructure-and-why-it-is-such-a-quest/) facilitating the de-facto standard for predictability, repeatability, scalability, reversibility, and availability with containerized workloads. 

A further important distinction is that Kubernetes is **API centric** but **not API driven**. While all requests go via the API server, all business logic technically runs outside the API server, in decoupled controllers which implement the necessary logic (conforming to the KRM framework). This is in contrast to traditional API server designs which include (or multiplex) the operational business logic. This is a main reason why the Kubernetes API is uniformly extendable.

Meanwhile, Kubernetes and its use of KRM/digital twins have expanded beyond its original in-cluster purpose. Its control plane can be extended using [Custom Resource Definition](https://kubernetes.io/docs/tasks/extend-kubernetes/custom-resources/custom-resource-definitions/) to represent resources outside cluster in the real world.

### Resource Structure

The KRM defines a standardized structure for all resources that includes:
- **group, version, kind**: uniquely identifies the resource type
- **metadata** with names, namespace, labels, and annotations
- **spec**: defines the desired state
- **status**: feedback of the actual state

<ApeiroFigure src="/digital-twins/img/resource-structure.svg" 
  alt="Resource Structure" 
  caption="Resource Structure"
  width="100%"/>

The processing flow for resource operations by the API server follows a standard [sequence](https://kubernetes.io/docs/concepts/security/controlling-access/), which opened another ecosystem for technologies (e.g. policy and validation engines).


## Design Choices and Limitations

Beware that KRM does not specify a uniform status property, requiring individual (or domain-specific interpretation) of resources' status feedback.
Furthermore, the virtual representation of the to-be-managed real world with multiple independent moving parts faces eventual consistency challenges, and that is by nature a challenge in distributed systems.  
Kubernetes chose an implementation with optimistic concurrency control using a shared repository state filled with digital twin objects in form of KRM[^1].

[^1]: [Omega: flexible, scalable schedulers for large compute clusters](https://static.googleusercontent.com/media/research.google.com/en//pubs/archive/41684.pdf)
