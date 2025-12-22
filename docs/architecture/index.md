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

- **[Platform Mesh](./../best-practices/platform-mesh/index.md)** is a core component of Apeiro that allows service providers to offer services of any kind and service consumers to discover those services, order capabilities, and control their lifecycle.

    Other layers of Apeiro usually act as both service provider and service consumers: they provide their functionality as capability and consume capabilities of other layers through the Platform Mesh. The Platform Mesh also acts as a single point of contact for integrating non-Apeiro services (not depicted) and making them available via the same cloud-native mechanisms.

- **[Data Fabric](./../best-practices/data-fabric/index.md)** provides standards and tooling for decentralized self-describing of application resources leading to a mesh architecture.

- **[Konfidence](./../best-practices/lcm/konfidence/index.md)** is the software delivery framework of Apeiro for microservice-based SaaS applications. It comes with support for ring deployments, feature toggle management and a delivery process, all based on best practices from the CNCF landscape[^cncf-landscape].

    _Note that additional information will be added in the future._

- **Kubernetes** is the layer in Apeiro for hosting your cloud-native workloads. Note that this is vanilla Kubernetes.

- **[Gardener](./../best-practices//multi-cluster-federation/managed-kubernetes-as-a-service.md)** provides managed Kubernetes-as-a-Service in Apeiro across infrastructure providers. It will come with support for IronCore and CobaltCore out of the box and be extended for additional IaaS stacks.

    Gardener-managed Kubernetes nodes use **[Garden Linux](./../best-practices/operating-system/index.md)** - a small, reproducible and auditable Linux image based on Debian GNU/Linux with a focus on Linux containers and virtual machines.

    _Note that additional information will be added in the future._

- **IronCore and CobaltCore** are two infrastructure flavors of Apeiro that provide compute, network, and storage. While CobaltCore exposes an OpenStack-compatible API, IronCore comes with a declarative Kubernetes-style interface.

    _Note that additional information will be added in the future._

- **[Bare Metal Automation](./../best-practices/baremetal/index.md)** provides functionality to manage bare metal infrastructure in Apeiro through Kubernetes principles. By leveraging Baseboard Management Controllers (BMCs) and the [Redfish API](https://www.dmtf.org/standards/redfish), it enables streamlined and automated server discovery, provisioning, and lifecycle management.

    _Note that additional information will be added in the future._

## Cross Cutting Concerns

- **[Lifecycle Tooling](./../best-practices/lcm/index.md)** based on cloud-native principles is considered essential by Apeiro in order to managing software lifecycle at scale.

- **[Security & Compliance](./../best-practices/security/index.md)** are built into Apeiro across the different layers.

- **Zero-Trust** is a security paradigm in Apeiro to improve the overall security posture.

- **[Observability](./../best-practices/observability/index.md)** is available in Apeiro through its layers.

[^cncf-landscape]: CNCF Cloud Native Landscape, see https://landscape.cncf.io
[^kubeception]: see [Hosted Control Planes](./../best-practices/multi-cluster-federation/hosted-control-planes.md)

## 8ra and the IPCEI-CIS Reference Architecture

The Apeiro reference architecture is developed as part of the [8ra](https://www.8ra.com) and [IPCEI-CIS](https://www.8ra.com/ipcei-cis/) initiative. 
The IPCEI-CIS published an overall [reference architecture](https://www.8ra.com/resources/) that provides the framework to all IPCEI-CIS projects and partners for describing their specific contributions to an overall cloud-edge infrastructure.
The Apeiro reference architecture and its components fit well into the holistic IPCEI-CIS architecture and the structures, layers, and domains prescribed in this central document.
<!-- add reference to https://landscape.apeirora.eu -->

<ApeiroFigure src="/architecture/apeiro-icra.png"
  alt="The Apeiro components mapped to the IPCEI-CIS Reference Architecture"
  caption="Mapping the Apeiro components to the IPCEI-CIS Reference Architecture"
  width="100%"/>

These Apeiro components are part of the **Virtualization** layer:
- <Project name="gardenlinux">Garden Linux</Project>
- <Project>CobaltCore</Project>
- <Project>IronCore</Project>

These Apeiro components are part of the **Cloud Edge Platform** layer:
- <Project>Gardener</Project>

These Apeiro components are part of the **Service Orchestration** layer:
- <Project name="platformmesh">Platform Mesh</Project>

These Apeiro components are part of the **Data** layer:
- <Project name="ord">Open Resource Discovery</Project>

These Apeiro components are part of the **Application** layer:
- <Project>Konfidence</Project>

These Apeiro components are part of the **Management** domain:
- <Project>Greenhouse</Project>
- <Project name="openmfp">Open Micro Frontend Platform</Project>
- <Project name="openmcp">Open Managed Control Plane</Project>
- <Project name="ocm">Open Component Model</Project>
