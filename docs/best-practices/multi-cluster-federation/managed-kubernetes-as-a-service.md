---
sidebar_position: 2
title: Managed Kubernetes-as-a-Service
author: "Niclas Moldenhauer <niclas.moldenhauer@sap.com>"
maintainers:
  - "Niklas Klocke <niklas.klocke@sap.com>"
  - "Marc Vornetran <marc.vornetran@sap.com>"
---

<div style="float: right; width: 120px; margin: -50px 20px 0 20px; padding: 10px;">

![Gardener](/multi-cluster-federation/img/gardenerlogo.svg)

</div>

**Project <Project>Gardener</Project>** emerges as a leading Managed Kubernetes-as-a-Service solution, providing a comprehensive framework for managing Kubernetes clusters at scale. It specifically has codified and automated crucial operational [features](https://gardener.cloud/docs/gardener/) which elevate the otherwise generic [Hosted Control Plane (HCP)](./hosted-control-planes.md) architecture to enterprise-readiness level. For example, Gardener automates the management and scaling of its own hosting infrastructure.

Gardener's architecture is designed to address the complexities of multi-cloud and hybrid cloud environments, offering a seamless experience for both developers and operators, and has been proven in production across a wide variety of enterprises and cloud service providers.

Project <Project>Gardener</Project> is the default (but not exclusive) Kubernetes-as-a-Service provider of choice in the Apeiro Reference Architecture. It is a fully certified Kubernetes solution, and ensures full compatibility and reliability for supported environments. Furthermore, Gardener releases are mandatorily checked with the Security Technical Implementation Guide (STIG) for Kubernetes as published by the [Defense Information Systems Agency (DISA)](https://www.cyber.mil/stigs/downloads/).

<ApeiroFigure src="/badges/certified-kubernetes-color.svg"
  alt="Certified Kubernetes Logo"
  caption="Gardener is a fully certified Kubernetes solution"
  width="20%"/>

For more details and daily, transparent data proof, see the [Gardener conformance test results](https://testgrid.k8s.io/conformance-gardener) and Gardener's [security and compliance](https://gardener.cloud/docs/security-and-compliance/) pages.

## High-Level Architecture and Botanical Scheme

Gardener's architecture is designed to manage and scale hosting infrastructure autonomously, which is crucial for delivering Managed Kubernetes-as-a-Service offerings.

<ApeiroFigure src="/multi-cluster-federation/img/gardener.svg"
  alt="Gardener Schematics"
  caption="Gardener Schematics" />

The architecture supports application and service teams by providing on-demand runtimes and facilitating the portability of Kubernetes skills across various cloud layers. Key architectural components are described using a botanical scheme:
At its core, Gardener employs a unique Kubernetes-in-Kubernetes architecture, often referred to as "[Kubeception](https://gardener.cloud/docs/getting-started/architecture/)", which allows for the management of multiple Kubernetes clusters (referred to as "shoots") from a central control plane known as the "garden cluster". This architecture is particularly advantageous for multi-cloud environments, as it enables seamless deployment and management of clusters across various cloud providers.
- **Garden Cluster**: The garden cluster serves as the management layer, overseeing the lifecycle of shoot clusters. It is a nodeless cluster that consists of a control plane, an API server, etcd, and various controllers. This cluster is the central brain of a Gardener landscape, where users can create, modify, or delete shoot clusters.
- **Seed Clusters**: Seed clusters are part of the garden cluster and provide the necessary infrastructure and resources to create and manage shoot clusters. They host the control planes of shoot clusters, allowing for efficient resource utilization and operational independence. This hierarchical structure enhances security and isolation, as each shoot operates independently while still being governed by the garden cluster.
- **Shoot Clusters**: Shoot clusters are the user-facing Kubernetes clusters managed by Gardener. They are tailored to specific workloads and requirements, providing flexibility and scalability. The worker nodes of a shoot cluster are simple virtual machines in a hyperscaler or self-owned datacenter, running an operating system, a container runtime, and the kubelet.

## Hosted Control Planes and Multi-Cloud Service Provider

Gardener applies the [Hosted Control Plane (HCP)](./hosted-control-planes.md) pattern to deliver a robust and scalable Kubernetes-as-a-Service solution. By adopting this pattern, Gardener separates the control plane from the worker nodes, hosting the control plane components in dedicated seed clusters. This approach, combined with Gardener's extension mechanism, offers several additional benefits:
- **Resource Efficiency**: Gardener optimizes resource usage and lowers total cost of ownership (TCO) beyond the inherited efficiency benefits of HCP. Gardener provides specific and automatically adjusted dynamic scaling algorithms for all the individual control plane components.
- **Homogeneous Multi-Cloud Experience**: Gardener's extension mechanism, combined with its ability to deploy seed clusters across multiple regions, provides a scalable and consistent Kubernetes experience across diverse cloud environments. This approach abstracts the complexities of underlying infrastructures, enabling a unified interface and toolset for developers and operators. The result is a seamless, homogeneous experience that enhances productivity, reduces operational overhead, and allows organizations to leverage the best features of different cloud providers efficiently.
- **High Availability and Resilience**: The HCP pattern enhances the availability of Kubernetes clusters. Control plane components, such as the API server, are managed as Kubernetes resources with liveness and readiness probes. This means that if a component fails, it can be automatically restarted by Kubernetes, ensuring minimal downtime and quick recovery. Furthermore, Gardener includes (live) control plane migration options, required for the most demanding operational scenarios.
- **Simplified Fleet Management**: The centralized management of control planes in seed clusters simplifies operations. Administrators can manage multiple shoot clusters from a single garden cluster, streamlining tasks such as updates, scaling, and monitoring.

### Blueprint for Managed Service Provider Architecture
Although the Gardener architecture is a variant of the more generic HCP architecture, it also provided the blueprint for comprehensive [Managed Service Providers (MSP)](./../services/managed-service-provider-pattern.md). MSP is a service provisioning system capable of initializing and managing its own hosting or seed infrastructure across available resources in the cloud-edge-continuum, with the goal to offer desired, specialized services.


## Further Information

For those interested in exploring Gardener further, including its detailed architecture, operational guides, and extension capabilities, the official Gardener Documentation is an invaluable resource. It provides comprehensive insights into setting up and managing Gardener, along with best practices and community support. You can access the documentation here
- [Gardener Documentation: Getting Started](https://gardener.cloud/docs/getting-started/introduction/)
- [Gardener Website](https://gardener.cloud/)
- [Gardener on GitHub](https://github.com/gardener)
