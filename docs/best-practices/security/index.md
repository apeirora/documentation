---
sidebar_position: 8
title: Security
keywords: [Security, Zero Trust, Identity, OpenFGA, SPIFFE, OpenBao, OpenKCM, Supply Chain]
---

Apeiro integrates security throughout its architecture, grounded in open standards and open-source components.
It is a **reference architecture and construction kit**: platform operators and solution providers assemble, configure, and operate the components. Apeiro does not itself constitute a managed security service, a certified ICT[^1] product, or a compliance program.

[^1]: ICT: Information and Communications Technology; the term used in EU regulatory frameworks such as the Cyber Resilience Act.

## Architecture Orientation

Apeiro addresses security across multiple domains, each backed by specific open-source components:

- **Network security**: <Project>IronCore</Project> (declarative networking, L3 tenant isolation), <Project name="zero-trust-workload-identities">Zero Trust Workload Identities</Project> (in development) for workload identity and mTLS
- **Identity & authorization**: [Keycloak](https://www.keycloak.org/) (OIDC-based authentication, identity federation); [OpenFGA](https://openfga.dev/) (Relationship-Based Access Control); <Project name="zero-trust-workload-identities">Zero Trust Workload Identities</Project> (in development) for workload identity and mTLS
- **Secrets & certificates**: <Project>OpenBao</Project> (secrets management, PKI, certificate lifecycle)
- **Key management**: <Project>OpenKCM</Project> (customer-controlled encryption at-rest, BYOK/HYOK)
- **Software supply chain**: <Project name="ocm">Open Component Model</Project> (provenance, signing), <Project name="odg">Open Delivery Gear</Project> (continuous compliance), <Project>Konfidence</Project> (SaaS application delivery governance, promotion gates)
- **Security operations**: <Project>CobaltCore</Project> (integrates <Project>Greenhouse</Project> and [Heureka Security Posture Management](https://github.com/cloudoperators/heureka)), <Project>IronCore</Project> (cloud-native infrastructure telemetry), [Audit Logging](https://github.com/apeirora/audit-log-poc-for-otel)
- **Crypto agility**: <Project name="crypto-broker">Open Crypto Broker</Project> (algorithm governance, post-quantum path)

## Security Documentation

The first three pages cover general framework topics. The remaining pages follow the defense-in-depth layers defined in Security Principles.

| Page | What it covers |
|---|---|
| [Security Principles](./security-principles.md) | Zero Trust, open standards, digital sovereignty, defense in depth |
| [Scope & Shared Responsibility](./scope-and-responsibility.md) | What Apeiro provides vs. what operators own |
| [Network Security](./network-security.md) | Zero Trust workload identity, IronCore declarative networking, CobaltCore for traditional workloads |
| [Identity & Access Management](./identity-access-management.md) | Authentication (OIDC, Keycloak), workload identity (Zero Trust Workload Identities, in development), authorization (OpenFGA ReBAC), federation |
| [Secrets Management & PKI](./secrets-management.md) | OpenBao: secrets storage, certificate lifecycle, PKI |
| [Key Management](./key-management.md) | OpenKCM: key hierarchies, BYOK/HYOK, pluggable KMS backends |
| [Software Supply Chain Security](./supply-chain-security.md) | OCM provenance, ODG compliance, Konfidence SaaS application delivery governance |
| [Security Operations](./security-operations.md) | Greenhouse observability, Heureka security posture management, audit logging, incident response enablers |
| [Emerging Threats](./emerging-threats.md) | Open Crypto Broker, post-quantum path, supply chain threat visibility |

## Platform Mesh Security

The Platform Mesh implementation has its own dedicated security page covering its specific authentication and authorization architecture, including OIDC-based identity federation with Keycloak, per-organization identity realms, and the two-tier RBAC + OpenFGA authorization model used within the Platform Mesh control plane. See [Platform Mesh Security](../platform-mesh/security.md).
