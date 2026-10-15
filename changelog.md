---
title: Changelog
---

## v2.15.0 (2026-10-15)

**New content**

- [Security Principles](./docs/best-practices/security/security-principles.md) — new page covering Zero Trust, open standards, least privilege, digital sovereignty, defense in depth, crypto agility, and software supply chain integrity
- [Scope & Shared Responsibility](./docs/best-practices/security/scope-and-responsibility.md) — new page with a full responsibility table clarifying what ApeiroRA provides versus what operators own, and an explicit list of what ApeiroRA does not define
- [Identity & Access Management](./docs/best-practices/security/identity-access-management.md) — new page covering OIDC/MFA/SPIFFE authentication, OpenFGA Relationship-Based Access Control (ReBAC), workload identity, and federation
- [Network Security](./docs/best-practices/security/network-security.md) — new page covering Zero Trust networking, Zero Trust Workload Identities (in development), IronCore declarative networking (NetworkPolicy, L3 tenant isolation, NATGateway, BMCSecret), CobaltCore for traditional workloads, and intrusion containment integration points
- [Software Supply Chain Security](./docs/best-practices/security/supply-chain-security.md) — new page covering OCM as Software Bill of Delivery, provenance and signing (RSA, X.509, Sigstore), Open Delivery Gear continuous compliance, and Konfidence delivery governance
- [Security Operations](./docs/best-practices/security/security-operations.md) — new page covering Greenhouse security observability (adopted by CobaltCore with Heureka), IronCore infrastructure telemetry, OpenTelemetry audit logging, and incident response integration points
- [Emerging Threats](./docs/best-practices/security/emerging-threats.md) — new page covering Open Crypto Broker algorithm governance, the architectural path for future post-quantum migration, AI-driven threat analysis (AI as attack force multiplier, AI supply chain risks, why Apeiro's layered architecture is more critical rather than obsolete), and continuous vulnerability visibility via OCM/ODG
- Blog post: [Security Compliance Automation](./blog/2025-06-10-security-compliance-automation.md) — original security compliance automation deep-dive by Frederik Thormaehlen, covering SCF, OCM as compliance backbone, tool-centric to model-centric transition, and the regulatory backdrop (EU CRA, EO 14028)

**Updated content**

- [Security Overview](./docs/best-practices/security/index.md) — expanded into a security hub with architecture orientation and navigation table linking all sub-sections; ordered by defense-in-depth layers
- [Key Management](./docs/best-practices/security/key-management.md) — rewritten to accurately reflect OpenKCM's current state: pluggable KMS backends (AWS KMS, OpenBao), BYOK/HYOK via CMK component, early-availability warning for Q4 2026 production target
- [Secrets Management & PKI](./docs/best-practices/security/secrets-management.md) — updated tone and structure; added operator responsibilities, Zero Trust Workload Identities complementarity note, and edition-availability qualifier for namespace support

**Removed content**

- Security Compliance Automation — removed as a documentation page; original content preserved as a blog post (see above)

## v2.14.0 (2026-09-24)

**New content**

- Blog post: [From Urgency to Reality: Building the Crypto Broker](./blog/2026-09-24-open-crypto-broker.md)

## v2.13.0 (2026-09-18)

**New content**

- Blog post: [Sovereign Cloud Needs More Than a Region. It Needs Key Control.](./blog/2026-09-10-openkcm-sovereign-cloud-key-control.md) - OpenKCM perspective on sovereign cloud key governance: covers the key control problem, the project architecture and capabilities, recent releases of Krypton, Krypton Operator, and CMK, and upcoming development priorities

## v2.12.0 (2026-09-09)

**New content**

- Document: [IPCEI-CIS Reference Architecture v3.0](./docs/resources/documents.md) - added link to the third version of the IPCEI-CIS Reference Architecture (v2.0 link removed)
- Document: [8ra Collaborative Security Framework (CSF)](./docs/resources/documents.md) - added link to the 8ra Collaborative Security Framework
- Blog post: [Workload Identity Should Come With the Cluster](./blog/2026-09-09-workload-identity-should-be-a-platform-default.md)

## v2.11.0 (2026-08-18)

**New content**

- [Videos](./docs/resources/videos.md) - new page in the Resources section with three demo videos from the Apeiro channel, including content summaries
- [Showroom Scenarios](./docs/showroom/scenarios.md) - embedded demo videos for Application Hosting and Development and Management scenarios
- [Local Platform Mesh Tutorial](./docs/showroom/tutorials/local-platform-mesh-msp-demo.md) - added "See it in Action" video section

## v2.10.0 (2026-08-06)

**New content**

- Blog post: [Running Rook at Petabyte Scale Across Multiple Regions](./blog/2026-03-18-running-rook-at-petabyte-scale.md) - our first external blog post, linking to an article published on Medium
- Document: [Running Rook at Petabyte Scale Across Multiple Regions](https://www.clyso.com/eu/media/pages/products/rook/144058f243-1785224164/white-paper-rook_10072026.pdf) - a Clyso technical whitepaper added to the [Documents](./docs/resources/documents.md) resources

## v2.9.1 (2026-05-06)

**Updated content**

- Tutorial: [Local Platform Mesh](./docs/showroom/tutorials/local-platform-mesh-msp-demo.md) - updated to Platform Mesh 0.3.0; tutorials are now served under `/tutorials/` instead of `/guides/`

## v2.9.0 (2026-05-05)

**New content**

- Tutorial: [Local Platform Mesh](./docs/showroom/tutorials/local-platform-mesh-msp-demo.md) - step-by-step guide to setting up a local Apeiro Showroom environment with a sample Platform Mesh scenario

## v2.8.0 (2026-03-31)

**New content**

- [Security in Platform Mesh](./docs/best-practices/platform-mesh/security.md) - an overview authentication, authorization, and other security aspects of the Platform Mesh

## v2.6.3 (2026-02-24)

**Updated content**

- Aligned nomenclature on different plane types: [Showroom Hardware Recommendations](./docs/showroom/hardware-recommendations/index.md)
- Contact information: Want to connect? Reach out to us at <a href="mailto:apeiro@sap.com">apeiro@sap.com</a>

## v2.6.1 (2026-02-06)

**Updated content**

- Document: [IPCEI-CIS Reference Architecture Version 2.0](./docs/resources/documents)

## v2.6.0 (2026-02-04)

**New content**

- Blog post: [Immersive Data Center Management: Advancing Sustainability and Operational Excellence](./blog/2026-02-04-sustainability-immersive-data-center.md)
- Document: [Data Center Observability Blueprint](/assets/resources/documents/Apeiro_DataCenterObservability_Blueprint_20260130_ext.pdf)


## v2.5.0 (2025-12-22)

**New content**

- [Showroom Hardware Recommendations](./docs/showroom/hardware-recommendations/index.md) - hardware recommendations for setting up an Apeiro-based cloud infrastructure

**Updated content**

- [Architecture Overview](./docs/architecture/index.md#_8ra-and-the-ipcei-cis-reference-architecture) - mapping between IPCEI-CIS Reference Architecture layers and Apeiro components

## v2.4.0 (2025-11-12)

**New content**

- Blog post: [AI Conformant Cloud Operating System for a Sovereign Europe](./blog/2025-11-12-gardener-ai-conformance.md)

## v2.3.0 (2025-10-27)

**New content**

- [Getting Started](./docs/getting-started/index.md) - get started with Apeiro by exploring how you can use individual components in your existing setup.

## v2.2.0 (2025-10-13)

**New content**

- [Konfidence](./docs/best-practices/lcm/konfidence/index.md) - software delivery framework for microservice-based software-as-a-service (SaaS) in Apeiro
- [Gardener](./docs/best-practices/multi-cluster-federation/managed-kubernetes-as-a-service.md) - Kubernetes-as-a-Service in Apeiro
- [Operating Systems](./docs/best-practices/operating-system/index.md) - modern cloud-native operating systems such as Garden Linux in Apeiro
- [Baremetal](./docs/best-practices/baremetal/index.md) - control plane capable for managing the entire physical lifecycle of hardware resource
- [Data and Control Plane State](./docs/best-practices/control-planes/data-and-control-plane-state.md) - about the role of state in Kubernetes data and control planes

**Updated content**

- [Architecture Overview](./docs/architecture/index.md) - link to Konfidence, Gardener, Garden Linux, and Baremetal
- [Observability](./docs/best-practices/observability/index.md) - explanation of different observability signals

## v2.1.0 (2025-08-25)

- Blog post: Garden Linux: Enabling AI on Kubernetes with NVIDIA GPUs

## v2.0.0 (2025-08-12)

- Update layout to new design

## v1.3.0 (2025-06-30)

**New Content**
- quarterly release of version 2025-06
- new section "Architecture Overview"
- new section "Data Fabric"
- new section "Showroom"
- new section "Resources"

**Chore**
- display NeoNephos logo
- re-arrange navigation

## v1.2.0 (2025-06-03)

- Blog post: Release of OpenBao namespaces

## v1.1.0 (2025-03-25)

- Blog post: KCP Multi‑Tenant Control Planes

## v1.0.0 (2025-03-13)

- Initial setup of documentation content
