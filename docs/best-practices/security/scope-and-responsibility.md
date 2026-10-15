---
sidebar_position: 2
title: Scope & Shared Responsibility
keywords: [Scope, Shared Responsibility, Operator Responsibility, Compliance]
---

Apeiro is a **reference architecture and open-source construction kit**. Platform operators and solution providers assemble, configure, and operate the components. Understanding what Apeiro provides and what operators must own is essential for correctly interpreting the security documentation.

## What Apeiro Provides

- A reference architecture for sovereign cloud-edge environments
- A set of open-source building blocks with defined integration points
- A vendor-neutral framework that allows to combine security components

Apeiro is **not**:

- A managed security service
- A certified ICT product (Apeiro is not itself a certified product; individual components may have their own certification status)
- A compliance framework or certification body
- A substitute for an organization's security policy, incident response process, or regulatory compliance program

## Shared Responsibility

The following table clarifies what Apeiro provides architecturally versus what remains the operator's responsibility.

| Topic | Apeiro Provides | Operator Responsibility |
|---|---|---|
| **Authentication** | OIDC federation (compatible with MFA/2FA enforcement, operator-configured); SPIFFE-based workload identity (in development) | IDP selection, MFA/2FA policy and enforcement, user provisioning, access reviews, session policy |
| **Authorization** | [OpenFGA](https://openfga.dev/) ReBAC engine, Kubernetes RBAC | Access policy design, role definitions, privilege reviews, authorization model governance |
| **Secrets management** | <Project>OpenBao</Project> secrets engine, PKI, namespace isolation | Unseal policy, secrets access policy, audit review |
| **Key management** | <Project>OpenKCM</Project> key hierarchy, BYOK/HYOK, HSM integration | HSM procurement and operations, key rotation policy, compliance reporting on key usage |
| **Network security** | <Project>IronCore</Project> declarative networking | DDoS protection, IDS/IPS selection, network policy design |
| **Data protection (transit)** | <Project>OpenBao</Project> PKI; SPIFFE-based mTLS (in development) | Trust domain design, TLS policy enforcement, certificate governance decisions |
| **Data protection (at rest)** | <Project>OpenKCM</Project> encryption | Data classification, retention policies, regulatory compliance |
| **Software supply chain** | <Project name="ocm">Open Component Model</Project> provenance and signing, <Project name="odg">Open Delivery Gear</Project> vulnerability scanning | SBoM policy, vulnerability remediation SLA definition, compliance decisions |
| **Security operations** | <Project>Greenhouse</Project> observability, Audit Logging standards | SIEM/XDR tooling, SOC operations, incident response process |
| **Resilience** | <Project>Gardener</Project> HA clusters; cloud-native (<Project>IronCore</Project>) and OpenStack-based (<Project>CobaltCore</Project>) IaaS with declarative infrastructure lifecycle automation and continuous reconciliation | RTO/RPO commitments, DR testing, uptime guarantees |
| **Compliance** | <Project name="ocm">Open Component Model</Project>/<Project name="odg">Open Delivery Gear</Project> compliance evidence generation, SCF-based controls reference | Regulatory compliance, certification activities, audit submissions |
| **Governance** | Open standards, open-source transparency | CSA2/EUCS participation, certification strategy, enterprise risk management |

## What Apeiro Does Not Define

The following are examples of things explicitly **not** provided by Apeiro and must be addressed by the operating organization. This list is illustrative, not exhaustive:

- DDoS mitigation mechanisms or uptime guarantees
- Specific Recovery Time Objectives (RTOs) or Recovery Point Objectives (RPOs)
- SOC metrics such as Mean Time to Detect (MTTD) or Mean Time to Respond (MTTR)
- Incident response playbooks or SLAs
- Data classification schemes or data retention policies
- Formal threat-model review processes or review frequencies
- Enterprise risk management processes
- Patch SLAs or vulnerability remediation commitments
- Certification strategy or regulatory compliance programs
- DDoS preparedness exercises, disaster recovery testing, or failover drill schedules

## Regulatory Context

Apeiro's open-standards foundation and software supply chain transparency are designed to support organizations in meeting evolving regulatory requirements, including the EU Cyber Resilience Act, national cybersecurity frameworks, and sector-specific regulations. Regulatory compliance, however, is always the responsibility of the deploying organization. Apeiro generates evidence and provides architectural building blocks; compliance decisions and certification activities remain with the operator.
