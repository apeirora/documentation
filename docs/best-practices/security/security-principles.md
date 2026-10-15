---
sidebar_position: 1
title: Security Principles
keywords: [Zero Trust, Open Standards, Digital Sovereignty, Defense in Depth, Crypto Agility]
---

Apeiro's security architecture is shaped by a set of principles that inform component selection, integration design, and the boundaries of what the platform defines versus what operators own.

## Digital Sovereignty

Apeiro is designed so that organizations retain ownership of their cryptographic material regardless of the underlying infrastructure provider.

- **Key ownership**: <Project>OpenKCM</Project> supports BYOK (Bring Your Own Key) and HYOK (Hold Your Own Key), giving organizations direct control over root keys across infrastructure providers and with HSM-backing.
- **Own trust root**: <Project>OpenBao</Project> lets organizations operate their own certificate authority and PKI, so certificate trust is rooted in infrastructure the organization controls.

## Open Standards

Apeiro uses the following open standards to ensure interoperability:

| Domain | Standards |
|---|---|
| Authentication | OIDC, OAuth2, SPIFFE |
| Transport security | mTLS |
| Observability & audit | [OpenTelemetry](https://opentelemetry.io/) |
| Software delivery | <Project name="ocm">Open Component Model</Project>, SBOM |

## Zero Trust

Trust is established through verified identities and cryptographic controls, not network location. Workload-to-workload communication is designed around cryptographically verifiable workload identity based on the [SPIFFE](https://spiffe.io/) standard, enabling mutual TLS between services, implemented by <Project name="zero-trust-workload-identities">Zero Trust Workload Identities</Project>.

## Least Privilege

Access decisions in Apeiro are derived from explicit, fine-grained relationships rather than broad static roles. [OpenFGA](https://openfga.dev/) implements Relationship-Based Access Control (ReBAC): permissions are resolved from tuples that describe who has what relationship to which resource. This supports delegated administration, tenant-specific access, and cross-provider authorization without overprivileged service accounts or flat role structures.

## Defense in Depth

Security controls are layered across the stack. No single component is the sole line of defense:

1. Infrastructure networking isolation: <Project>IronCore</Project> declarative network resources
2. Workload identity, mTLS, and fine-grained authorization: <Project name="zero-trust-workload-identities">Zero Trust Workload Identities</Project> (in development), [OpenFGA](https://openfga.dev/)
3. Secrets and certificate lifecycle: <Project>OpenBao</Project>
4. Encryption key governance: <Project>OpenKCM</Project>
5. Software supply chain integrity: <Project name="ocm">Open Component Model</Project>, <Project name="odg">Open Delivery Gear</Project>
6. Observability and audit logging: <Project>Greenhouse</Project>, OpenTelemetry
7. Crypto agility: <Project name="crypto-broker">Open Crypto Broker</Project>
