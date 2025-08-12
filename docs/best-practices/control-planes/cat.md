---
sidebar_position: 2
title: Controller Archetypes
---

This chapter explains the different types of controller archetypes.

The Kubernetes architecture is **API centric** and not API driven. The business logic runs outside the API server, in loosely coupled [controllers](https://kubernetes.io/docs/concepts/architecture/controller/) which bi-directionally map the virtual representation of <Term>digital twins</Term> to the real-world.

A typical controller is responsible for a particular resource type and its implementation
in the real world or target environment, but there are also other flavors how a controller can interact with
a resource. We identify **four archetypes** for controllers and will explain them using Kubernetes native controllers/resources `Kubelet`, `Scheduler`, `ReplicaSet`, `Deployment`, and `Service`.

## Actuators

Actuators are controllers which map real-world capabilities into the virtual-world (with digital twins). They bring capabilities into the realm of the Kubernetes API and explain the vast expansion of the community and ecosystem beyond containerized workloads only. [Crossplane](https://www.crossplane.io/), [ExternalDNS](https://kubernetes-sigs.github.io/external-dns/latest/), and `Kubelet` are examples of the actuator archetype.

The `Kubelet` controller is a fundamental component of Kubernetes. It acts as the node agent on each worker node. Each `Kubelet` first registers its node in the `Nodes` space and then watches for `Pods` that are assigned to it, essentially sharding the `Pods` space.

<ApeiroFigure src="/control-planes/img/actuator.svg"
    alt="Actuators"
    caption="Actuators"
    width="100%"/>

## Attribute Controllers

Attribute controllers operate in the virtual-world, on existing digital twins. Their core business logic function is to map a desired aspect by enriching (calculating) attributes of digital twins which are covered/managed by other controllers.
Besides `Scheduler`, for example, policy controllers such as [Gatekeeper](https://open-policy-agent.github.io/gatekeeper/website/) or [Kyverno](https://kyverno.io/) operate in this archetype category.

The `Scheduler` controller is a pivotal default component in the Kubernetes control plane, responsible for the [assigning of pods to nodes](https://kubernetes.io/docs/concepts/scheduling-eviction/assign-pod-node/). It reads available `Node` digital twin objects and keeps a watch on all unscheduled `Pod` objects. The *binding* process to compute a suitable node can be [configured](https://kubernetes.io/docs/concepts/scheduling-eviction/kube-scheduler/).
Ultimately, the `Scheduler` adjusts the `Pod:spec:nodeName` attribute of prior unscheduled `Pods` with its node assignment decision. This controller archetype obtains all information from the digital twins and only operates on digital twins.

<ApeiroFigure src="/control-planes/img/attribute.svg"
    alt="Attributes"
    caption="Attributes"
    width="100%"/>

## Aspect Controllers

The resource implementation can be supported by additional controllers. These are controllers responsible only for certain aspects of the resource. An aspect might be described by separate attributes or implicitly derived from the regular attributes. Their target might be completely different than the one of the main controller.

In Kubernetes, the exemplary scenario can be found within the `Service` resource handling. The main task for this resource is describe a virtual, stable endpoint for groups of pods across nodes. Establishing the required cluster-internal routing is the responsibility of the main "Service" controller (the implementation detail varies with the Container Networking Interface in use). An optional aspect is the desire to expose the service outside the cluster, which is typically handled by a separate aspect controller (e.g., a cloud controller instructing a `LoadBalancer` in the IaaS layer). Note that the main functionality can exist without the aspect. And main and aspect controllers in fact can target different environments (in our example: cluster-internal and IaaS).

<ApeiroFigure src="/control-planes/img/aspect2.svg"
    alt="Aspects"
    caption="Aspects"
    width="100%"/>

## Logical Object Controllers

Logical object controllers operate in the virtual-world only, but they introduce new logical types. Their business logic function is to create and manage useful abstractions. All custom controllers or operators (for example on [OperatorHub](https://operatorhub.io)) fall into this archetype.
They introduce new digital twin abstractions and often productize their offering using other abstractions, which at the end of the chain, typically spawn Kubernetes `Pods` with their workload.

The `ReplicaSet` and `Deployment` controller are prime example of useful abstractions for the orchestration of containers. `ReplicaSet` [introduces a new digital twin type](https://kubernetes.io/docs/concepts/workloads/controllers/replicaset/) which creates and manages `Pod` objects with the intent to ensure that a stable set of replicas are running at any given time. And `Deployment` [introduces a new type](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/) by instrumenting `ReplicaSet` to offer declarative lifecycle management (via rolling updates, rollback, and scaling).
<ApeiroFigure src="/control-planes/img/abstract.svg"
    alt="Abstractions"
    caption="Abstractions"
    width="100%"/>