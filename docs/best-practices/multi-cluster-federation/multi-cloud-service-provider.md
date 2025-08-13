---
sidebar_position: 2
title: Multi-Cloud Service Provider
---

<Term>Service providers</Term> operating within the cloud-edge continuum may need to deliver <Term>services</Term> to a vast number of <Term>consumers</Term> while ensuring that these services are provided _near_ them, both for technical efficiency and legal compliance.
A diverse array of infrastructure, cloud providers, and edges of different abilities and sizes may be required to fulfill all the requirements.

To achieve this, service providers must be able to either set up or access runtime environments for their services on demand, and they should also be capable of reconfiguring or removing these runtime environments as the demand changes.
In other words, they must be able to handle multiple <Term>work planes</Term> (targets) and must be able to control these work planes.

The environment for implementing the localized service or capability is typically a Kubernetes cluster; however, any specialized technical runtime environment may be used depending on the workload.
And the dynamic, on-demand procurement can be delegated to a aforementioned [Managed Kubernetes Provider](./hosted-control-planes.md#managed-kubernetes-provider).
In ApeiroRA, the service provider API must strictly adhere to the [Kubernetes Resource Model](./../digital-twins/krm/index.md). The [Multi-Cluster Federation](./index.md) pattern can serve as an implementation recommendation for a **Managed Service Provider**.

When a consumer orders a <Term>capability</Term>, they initiate the process by creating a <Term>resource</Term> document using the service provider's API or <Term>data plane</Term>.
A scheduler <Term>controller</Term> of the managed service provider then assigns this request to an adequate runtime environment, updating the document with the environment's identifier.
If no suitable environment is available, the managed service provider is responsible for creating or procuring one with an associated identifier and runtime resource document.
Typically, a service-aware autoscaler controller monitors the data plane and activates whenever a new runtime environment in a different region or cloud provider is needed, culminating in a robust and scalable architecture with centralized management.

Each runtime environment is equipped with a servicelet, a component responsible for monitoring resource documents associated with its identifier. More importantly, the servicelet must be equipped with the necessary business logic to locally manage and operate the desired capability in its associated runtime environment.
The servicelet operates within or near the runtime environment, ensuring network proximity.
Upon detecting changes in related resource documents in the service providers' data plane, it updates or reconciles the capability accordingly.
Since the servicelet is situated close to the runtime environment, it operates securely behind a firewall, eliminating the need for direct access by the service provider.
The servicelet reports the status of its managed capabilities back to the data plane, enabling the service provider to update or dismantle runtime environments as necessary.

Overall, this enhances security, as well as resilience, and streamlines deployment and operational processes. This **Multi-Cloud Managed Service Provider** model can even scale dynamically from zero, seamlessly integrating and deploying across the envisioned multi-provider cloud-edge continuum.

<ApeiroFigure src="/multi-cluster-federation/img/msp.svg"
  alt="Multi-Cloud Managed Service Provider"
  caption="Multi-Cloud Managed Service Provider"
  width="100%"/>

The design pattern is versatile and can of course be implemented without relying solely on Kubernetes, by utilizing specialized runtimes that are managed by a runtime provider which is uniformly compatible and supported across the cloud-edge continuum and the various providers.
For instance, Java workloads could be federated using JVM runtimes through a Managed JVM Provider.
Conveniently, Kubernetes can function as a generic provider and be adapted to act as an underlying layer for any specialized runtime provider. This pattern is highly reusable and adaptable to various environments.