---
title: "# IPCEI-CIS Hackathon Potsdam, July 2026: What We Built"
authors:
  - jessica-katz
tags:
---
In July 2026, nearly 100 engineers and architects from SAP, BWI, Fraunhofer, Kubermatic, Liquid Reply and additional IPCEI-CIS partner organizations gathered at the SAP Innovation Center in Potsdam for a four-day hands-on hackathon. The format was straightforward: dedicated topic tracks, breakout sessions, and a shared commitment to walking away with concrete results rather than slide decks. 

This post is the summary view. The workstream tracks published their own detailed writeup, linked below. 

---
## What we worked on 

The event covered seven technical tracks across five main areas: Open Control Plane and Open Component Model, Platform Mesh and the Sovereign AI Stack with Thalamus and Naira. 

### Open Control Plane and OCM 

The Open Control Plane and OCM tracks ran four workstreams in parallel. 

Two of them focused on reducing friction for platform teams adopting GitOps and secret management. The **automated Git integration** track produced `platform-service-gitops`, a tool that lets teams register GitHub credentials centrally and automatically propagate repository access into target control planes. The paired **OpenBao integration** track produced `platform-service-openbao`, which eliminates long-lived tokens by establishing trust relationships between control planes and secret backends using Kubernetes ServiceAccount JWTs. 

A third workstream expanded OCP's cluster provider ecosystem with two new implementations: a direct GCP provider and a Cluster API provider, both demonstrating that OCP can integrate into existing infrastructure without requiring Gardener as an intermediary. 

The fourth OCP/OCM track focused on community growth: migrating `ocm-kit` from its original repository into the `open-component-model` organization. This is the first externally contributed community project for OCM and establishes a template for open contribution within the ecosystem. 

A fifth topic addressed **SBOM generation from OCM component versions**, formalizing how OCM can serve as a foundation for generating semantically connected Software Bills of Materials for audit, triage, and regulatory purposes. 

Full writeup: [Open Control Plane Hackathon Blog](https://open-control-plane.io/community/blog/hackathon-july-2026/) 

### Platform Mesh 

The Platform Mesh tracks, led jointly with BWI, tackled three problems that come up repeatedly in public sector and defense deployments. 

**Access control**: The current role model ties permissions to individual identities, which doesn't scale for production environments where personnel rotate frequently across organizations and borders. The team prototyped group and role-centric access alongside just-in-time privilege elevation, moving toward a model where standing elevated access is the exception rather than the default. Working repositories and a demo came out of this track. 

**Standardized IaaS APIs**: Proprietary cloud APIs are one of the main practical barriers to workload portability. The track produced a proof-of-concept API layer for provider-agnostic workload migration, with a [video demonstration](https://www.youtube.com/watch?v=ZKNeE781jLI) available. The goal is to let public sector operators move workloads between providers without API translation overhead, including in crisis scenarios. 

**Developer experience**: A third area investigated was identity provider decoupling, specifically separating Keycloak from Platform Mesh's core architecture to support teams to bring their own IdP in the future. This turned out to be more technically involved than the initial scope assumed. The track documented the dependencies and what would be needed to address them. 

Full writeup: [Platform Mesh Hackathon Outcomes](https://github.com/platform-mesh/community/blob/main/events/ipcei-cis-hackathon-july-2026.md) 
Demo video: [YouTube](https://www.youtube.com/watch?v=ZKNeE781jLI) 

### Sovereign AI Infrastructure: Thalamus and Naira 

The Thalamus track ran three workstreams focused on sovereign AI infrastructure. 

**Naira integration**: The team built a plugin that connects Thalamus model data to Naira's catalog, letting Naira's MCP server answer live queries about running inference instances. MCP-capable clients can now query available models and engine configurations directly. 

**OCM component packaging for Thalamus**: The track explored packaging Thalamus as a single OCM artifact, making it a versioned and transportable component that can be pulled from a sovereign OCI registry. This is still experimental, but the goal is clear: deployments that don't depend on external registries or upstream services. 

**Sovereign model weight distribution**: The team prototyped storing model weights as OCM components in custom OCI registries while maintaining Hugging Face API compatibility. They packaged, stored, and served a test model without the weights touching Hugging Face at any point. 

A separate track ran on **GPU environment footprint**: adding real carbon emission data to AI inference observability. The approach is an OpenTelemetry Collector plugin that reads watt-hour data directly from blade PDUs via IPMI or Redfish and combines it with real-time grid carbon intensity from services like Electricity Maps. The result is a `gpu.carbon.emissions.grams` metric that appears in existing dashboards without additional instrumentation. Other tools estimate; this one reads the actual meter. 

Full writeup: [Thalamus Hackathon Workshop](https://cobaltcore-dev.github.io/thalamus/main/ipcei-cis-workshop-2026/) 
Thalamus website: [Thalamus](https://cobaltcore-dev.github.io/thalamus/v0.2.0/) 

---
### What came out of the four days 

Across the tracks, the teams produced working proofs of concept, progress in architectural decision making, onboarding documentation, and demo-ready integrations. Not everything is production-ready, and that's intentional. The format is designed to accelerate exploration, not ship finished software. 

Several outcomes will feed directly into open-source contributions and formal RFCs. The IaaS API standardization work is one example. The SBOM generation track is another, with preparation already published at [ocm-project issue #184](https://github.com/open-component-model/ocm-project/issues/184). 

The cross-organization format also mattered. Engineers from public sector organizations, defence-adjacent contexts, and cloud infrastructure teams spent four days working on the same problems. That shared context doesn't come from conference presentations. 

---
### Up next: November 24-26 

The next IPCEI-CIS hackathon takes place November 24-26, 2026. Several of the Potsdam tracks continue, and new topics are in preparation. The focus remains the same: hands-on technical work, concrete outputs, and cross-organization collaboration on the European cloud-edge continuum. 

You can find more information on the ApeiroRA webiste: [IPCEI-CIS Hackathon Potsdam, November 24-26: From Bare Metal Up](https://apeirora.eu/content/news/apeirora-ipcei-cis-hackathon/).