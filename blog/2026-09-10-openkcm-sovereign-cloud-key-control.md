---
title: "Sovereign Cloud Needs More Than a Region. It Needs Key Control."
authors:
  - aysan-mazloumi
tags:
  - openkcm
  - sovereign-cloud
  - encryption
  - key-management
  - ipcei-cis
---

Sovereign cloud is one of the most overused terms in enterprise technology. It has been applied to everything from a datacenter in a specific country to a fully air-gapped, customer-operated deployment where no data or key material ever crosses an organizational boundary. The gap between those two definitions is enormous, and most organizations are sitting somewhere in the middle - believing they have sovereignty when what they actually have is geographic proximity.

Regulators are tightening. NIS2 and DORA are pushing organizations to demonstrate not just that data is protected, but that they can prove it and act on it unilaterally. Customers are asking harder questions before signing contracts. Governments are mandating that critical infrastructure runs on infrastructure they control, not infrastructure they rent.

The pressure is real. But the solutions being offered often fall short. A sovereign cloud label on a hyperscaler region. A compliance certificate that says the right things without changing who actually has access. Encryption that is on by default but governed by someone else.

True sovereignty is not about where a server is located. It is about who holds the keys.

<!-- truncate -->

## The Key Control Problem

Every cloud platform encrypts data at rest, but in most deployments the key material lives in the provider's infrastructure - rotated on the provider's schedule, revocable only with the provider's cooperation. For organizations migrating from on-premise environments, where hardware-backed encryption came with full customer control over key generation, rotation, and deletion, the cloud frequently asks them to hand that governance to a managed service. For security-conscious enterprises and regulated industries, that trade-off is often a blocker.

The regulatory context is hardening this further. Standards including ISO/IEC 27001 A.8.24 and A.8.25, NIST SP 800-57 for key management, and the BSI C5:2026 CRY-03 criterion for critical infrastructure certification all demand rigorous, demonstrable customer control over encryption keys - not just encryption at rest. Certification bodies are asking for evidence that customers can rotate and delete their own keys independently, without provider cooperation. A checkbox on a compliance form is no longer sufficient.

There is also a dimension that rarely gets discussed openly: jurisdiction. When a legal authority in one jurisdiction demands access to data stored by an organization subject to a different jurisdiction's laws, the organization caught in the middle needs options. Key deletion - the ability to make data cryptographically unreadable almost instantly - is increasingly understood not just as a GDPR Article 17 tool, but as a geopolitical instrument. An organization that can destroy the cryptographic material protecting its data can respond to conflicting legal demands without handing anything over. That capability requires owning the keys.

The question that actually separates real sovereignty from its imitation is not "is my data encrypted?" It is: can I cut off access to my data instantly, by myself, at any time, from anywhere - without calling a vendor, filing a support ticket, or waiting for anyone?

For most organizations today, the honest answer is no.

## OpenKCM: Key Governance as a Platform Service

OpenKCM is an open-source central key chain manager that gives organizations full governance over their encryption key hierarchy, from the customer-controlled root key down to the ephemeral keys protecting individual records, across cloud-native and on-premise deployments.

The design principle is straightforward: the customer owns the root key. It lives in their own HSM or cloud KMS - on their hardware, in their region, under their control. OpenKCM manages the entire key hierarchy beneath it without ever holding key material it could use independently. The result is a cryptographic kill switch that the customer controls alone. Revoking the customer's L1 key revokes access to all data protected under that key hierarchy - globally, as the next attempt to use the root key is refused. Organizations with multiple regional deployments may hold multiple L1 keys, each governing their respective region, and must revoke each to achieve full data inaccessibility.

This is not merely a feature. It is an architectural commitment. The system is designed so that the platform cannot act as a cryptographic authority on the customer's behalf. Governance and cryptographic execution are separated by design - the control plane stores metadata and policy, never key material; the crypto engine executes operations but has no policy authority. Neither component can act unilaterally, and the customer's root key is the only thing that can activate, suspend, or destroy the entire chain.

OpenKCM is part of the ApeiroRA project, a Linux Foundation Europe directed fund under NeoNephos, and is developed in alignment with the IPCEI-CIS mandate for European digital infrastructure sovereignty.

## What OpenKCM Delivers

Six value propositions define the project and have been publicly committed as part of the NeoNephos foundation profile.

- **Customer-owned key governance**: the full key hierarchy - from root key down to data encryption keys - is controlled by the customer; the platform never holds key material it could use independently, and the customer retains exclusive authority to revoke access at any time
- **Unified keystore control plane**: a single governance layer across AWS KMS, Azure Key Vault, GCP KMS, Thales Luna HSMs, or self-managed OpenBao, without requiring migration or vendor commitment
- **BYOK and HYOK**: customers choose to bring their own key or hold their own key, depending on their trust model and regulatory context; the right to revoke applies in both cases
- **Keychain composition and lifecycle control**: keys are scoped to individual workloads; a service key can be rotated on its own schedule, suspended, or revoked in isolation without affecting sibling services or anything else in the hierarchy
- **Pluggable keystore backends**: the same OpenKCM binary operates across any keystore; no lock-in at the key management layer
- **Compliance readiness**: GDPR Article 17 crypto-shredding, NIS2, DORA, and data residency - key deletion makes all protected data permanently unrecoverable, with no deletion pipelines to coordinate and no provider workflows to trigger

## Sovereignty Across Regions and Boundaries

For a bank with its European operations in Frankfurt and its Asian hub in Singapore, the sovereignty model scales without compromise.

Each region derives its own keys from the customer's local root key, held in that region's keystore. A Frankfurt key cannot decrypt Singapore data. The isolation is mathematical, not contractual, and an audit log proves regional containment. The kill switch is regional: revoking an L1 key revokes access to all data governed under it in that region, as the next attempt to use the root key is refused. Organizations with data across multiple regions hold separate L1 keys per region - revoking all of them achieves global data inaccessibility, with no provider coordination required.

For fully air-gapped sovereign deployments - where the customer's cluster is their own, operated entirely within their boundary, with zero external dependency - OpenKCM runs co-located with the workload. The root key never leaves the customer's HSM. The encryption layer is entirely theirs to operate, audit, and shut down. This is the model mandated for critical national infrastructure, government deployments, and regulated industries where the very concept of a third party holding key material is unacceptable.

The IPCEI-CIS program is building European cloud infrastructure with the sovereignty properties this model requires. OpenKCM is developed in alignment with that initiative - not a product retrofitted to meet the mandate, but one designed from the ground up with it in mind.

## Technical Progress

Krypton, the crypto execution engine, has its first public release at version 0.0.1. Active development since then has added a base KMIP server implementation, a key processor architecture, CLI tooling for key lifecycle management, and secure memory management including mlock, mprotect, and zeroization.

Krypton Operator version 0.7.0 manages multi-cluster Krypton deployments via Helm. It supports namespace-scoped watching, health checking, and automatic repair of deployment resources. The operator is running in the ApeiroRA showroom environment, deployed via FluxCD GitOps across multiple worker clusters.

CMK, the governance and policy layer, has reached version 0.8.0. This release introduced HYOK key rotation, a BYOK feature gate for landscape-level control, an async fanout mechanism for high-throughput key operations, key rotation audit logging, and OpenTelemetry tracing for database connections. CMK and Krypton integration is actively in progress.

## What Is Next

Our September 2026 contributor workshop - focused on Krypton Core and Krypton integration on the Platform Mesh landscape as part of the ApeiroRA initiative - brought together contributors, adopters, and stakeholders to push the roadmap into sharper focus. Three themes emerged as priorities for the next phase of development.

The first is encryption as a platform default rather than an opt-in. The target model is one where encryption governance is present from the moment a workload is deployed - transparent to developers, enforced by the platform, and governed by a clear ownership model that does not require the customer to take additional steps. This requires integration at the platform layer, not just at the application layer, and it is the direction the Platform Mesh integration is moving toward.

The second is the service provider integration path. For OpenKCM to reach its potential as a platform-level key governance service, data-persistent services - databases, object stores, message queues - need a standardized way to integrate with it. Defining this integration model is part of the current roadmap.

The third is sovereign cloud hardening. Air-gapped, customer-operated, fully self-contained deployments are not an edge case for OpenKCM. They are the primary use case. The pluggable backend architecture, the co-location model for the crypto execution engine, and the kill-switch design are all oriented toward this. The next phase of development will harden these capabilities further, with specific focus on the deployment patterns and operational tooling that sovereign cloud operators require.

## Getting Involved

OpenKCM is open source. The repositories, roadmap, and contribution guidelines are available at [github.com/openkcm](https://github.com/openkcm). The project welcomes contributions from engineers, architects, and organizations working on sovereign cloud infrastructure, regulated industry deployments, and cloud-native key management.

For organizations evaluating OpenKCM for production use, or for potential adopters interested in the Platform Mesh integration or sovereign cloud deployment path - the project holds monthly community meetings via the Linux Foundation platform. Community members are welcome to join the Steering Sync to discuss product features, roadmap priorities, and integration scenarios directly with the team.
