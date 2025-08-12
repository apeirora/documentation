---
sidebar_position: 1
title: Software Bill of Delivery
keywords: [SBoD]
---

Secure Software Development Lifecycle (S-SDLC) adds the security emphasis on SDLC, from software design, development, packaging, shipment, to deployment and beyond. Ensuring the integrity, security, and traceability of software and all artifacts across various environments is paramount. Security and compliance must be [automated](./../../security/security-compliance-automation/index.mdx) for modern development practices to meet the business demand of increasing pace of feature innovation and delivery to production.

## Open Component Model as SBoD
While a Software Bill of Materials (SBoM) focuses on the constituent parts of a software artifact[^1], the reference architecture adopts the novel concept of **Software Bill of Delivery (SBoD)** to facilitate integrity, security, and traceability of software (and much more) in a holistic fashion. The **<Project name="ocm">Open Component Model</Project>** (OCM)[^2] is utilized as SBoD, and the following outlines some of the key features:

- **Machine-readable**: OCM is an open standard designed to describe software artifacts and any associated metadata in a technology-agnostic, machine-readable format.
- **Resource and Source Repositories**: OCM allows for the description of resources and source repositories in code, ensuring that all necessary components for deployment are clearly defined and accessible.
- **Integrity and Provenance**: Components are signed to ensure uncompromised integrity, providing a verifiable chain of custody from development to production. Routing-slips are possible as well.
- **Secure Transport & Delivery**: OCM ensures that content can be transported securely to any environment, whether it's public cloud, on-premise, or air-gapped systems.
- **Correlation ID & Traceability**: Each OCM component has a unique identifier, which acts as a correlation ID, enabling alignment and traceability of different processes and tools across the software lifecycle.
- **Automated Deployment**: Leveraging GitOps techniques, OCM enables seamless automation of component deployment with declarative APIs, promoting practicable  immutable Infrastructure as Data type of reproducible deployments.
- **Flexibility**: OCM's agnostic nature allows it to work with various tools and environments, making it adaptable to different software delivery pipelines.

<ApeiroFigure src="https://raw.githubusercontent.com/open-component-model/ocm-spec/refs/heads/main/doc/OCM-Ecosystem.png"
  alt="Open Component Model"
  caption="Open Component Model"
  source="Open Component Model specification"
  sourceLink="https://github.com/open-component-model/ocm-spec/blob/main/README.md#open-component-model-ocm"
  width="100%"/>

## Release Channel

For a producer of software, be it a solution, a product, a submodule or component, OCM can also be utilized as **release channel**, containing the qualified version vector of all subcomponents and their artifacts. After internal qualification, the development pipeline can automatically push the computed OCM version to any kind of compatible repository, for example an OCI (Open Container Initiative) image registry. With OCM, consumers can subscribe to a release repository and not only find all previously published versions of OCM (including the latest), but also can be informed whenever a new version is published.

The features and the provided tooling around OCM enable the S-SDLC. In particular, OCM can be used within continuous integration pipelines to instrument the stages (from qualification to production), acting like a routing slip, with final publication to a release channel. OCM bundles the transport or shipment of all artifacts that belong to a particular version (version vector). Continuous delivery pipelines pull or push the software into the desired clouds or edges. Shipments into network isolated clouds are possible using physical media for transport. Lastly, OCM can also facilitate the (automated) continuous deployment, whereby the ApeiroRA suggests a best practice instrumented with GitOps and Infrastructure as Data. All ApeiroRA projects will utilize OCM.

But ultimately, adopters of OCM as SBoD can package any type of runbook, and require consumer DevOps teams to become familiar with the particular tooling and runbook documentation.

## Security Compliance

The OCM coordinate system is the crucial missing link to establish [security compliance automation](./../../security/security-compliance-automation/index.mdx). It enables organizations to enhance security posture and certification readiness.

:::info Real-world analogy
In the context of food safety, Global Trade Item Number (GTIN) serves as a crucial coordinate system. It provides a standardized method to identify any food product uniquely, regardless of where it is in the supply chain. This unique identification is critical for tracking and tracing food products, a fundamental aspect of food safety. The GTIN is usually embedded in the barcode of the product, along with a label that provides access to immediate information, such as nutrition score. More extensive data is then stored in backoffice databases which then can be correlated using the GTIN.

OCM's unique component version identifier and a "backoffice data lake" filled with SBoMs and signals from all employed scanner and tools, serve as a crucial coordinate system for security and compliance.
:::

[^1]: [SBoM: What's next?](https://archive.fosdem.org/2024/schedule/event/fosdem-2024-2939-sbom-what-s-next-/)
[^2]: [About the OCM Project](https://ocm.software/docs/overview/about/)