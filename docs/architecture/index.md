---
sidebar_position: -10
title: Architecture Overview
keywords: [architecture, overview]
---

The Apeiro Reference Architecture is a collection of open-source components designed to establish the foundation for building the cloud-edge continuum in Europe, i.e. a uniform infrastructure from big data centers into small edge environments.

The following diagram provides an overview of the different layers of Apeiro. In such layer diagrams, a layer usually consumes functionality from a lower layer to provides functionality for a higher layer. While this generally applies to Apeiro and this diagram, note that communication between layers is largely facilitated through the Platform Mesh - a central and cross-cutting component in Apeiro. Additional cross-cutting concerns are depicted on the left.

<ApeiroFigure src="/architecture/layered-architecture.svg"
  alt="A layered perspective on the Apeiro Reference Architecture"
  caption="A layered perspective on the Apeiro Reference Architecture (colors used for clarity only)"
  width="100%"/>

Apeiro does not require adoption of all layers at once and allows to adopt layers and their components individually. Note that in case of individual adoption, components may need to be adjusted to integrate with non-Apeiro components.

Apeiro conceptually pursues a _declarative approach_ across its components, just like Kubernetes does, and adopts the idea of kubeception[^kubeception], i.e. it's using Kubernetes to run Kubernetes. As a result, most lower layers are directly run on Kubernetes.

## Layers Top to Bottom

- **[Platform Mesh](./../best-practices/platform-mesh/index.mdx)** is a core component of Apeiro that allows service providers to offer services of any kind and service consumers to discover those services, order capabilities, and control their lifecycle.

    Other layers of Apeiro usually act as both service provider and service consumers: they provide their functionality as capability and consume capabilities of other layers through the Platform Mesh. The Platform Mesh also acts as a single point of contact for integrating non-Apeiro services (not depicted) and making them available via the same cloud-native mechanisms.

- **[Data Fabric](./../best-practices/data-fabric/index.mdx)** provides standards and tooling for decentralized self-describing of application resources leading to a mesh architecture.

- **Konfidence** is the software development and release framework of Apeiro for microservice-based SaaS applications. It comes with support for ring deployments, feature toggle management and a delivery process, all based on best practices from the CNCF landscape[^cncf-landscape].

    _Note that additional information will be added in the future._

- **Kubernetes** is the layer in Apeiro for hosting your cloud native workloads. Note that this is vanilla Kubernetes.

- **Gardener** provides managed Kubernetes-as-a-Service in Apeiro across infrastructure providers. It will come with support for IronCore and CobaltCore out of the box and be extended for additional IaaS stacks.

    _Note that additional information will be added in the future._

- **IronCore and CobaltCore** are two infrastructure flavors of Apeiro that provide compute, network, and storage. While CobaltCore exposes an OpenStack-compatible API, IronCore comes with a declarative Kubernetes-style interface.

    _Note that additional information will be added in the future._

- **Bare Metal Automation** provides functionality to manage bare metal infrastructure in Apeiro through Kubernetes principles. By leveraging Baseboard Management Controllers (BMCs) and the [Redfish API](https://www.dmtf.org/standards/redfish), it enables streamlined and automated server discovery, provisioning, and lifecycle management.

    _Note that additional information will be added in the future._


## Cross Cutting Concerns

- **[Lifecycle Tooling](./../best-practices/lcm/index.mdx)** based on cloud native principles is considered essential by Apeiro in order to managing software lifecycle at scale.

- **[Security & Compliance](./../best-practices/security/index.mdx)** are built into Apeiro across the different layers.

- **Zero-Trust** is a security paradigm in Apeiro to improve the overall security posture.

- **[Observability](./../best-practices/observability/index.mdx)** is available in Apeiro through its layers.

[^cncf-landscape]: CNCF Cloud Native Landscape, see https://landscape.cncf.io
[^kubeception]: see [Hosted Control Planes](./../best-practices/multi-cluster-federation/hosted-control-planes.mdx)
