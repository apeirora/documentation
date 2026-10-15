---
sidebar_position: 9
title: Security Operations
keywords: [Security Operations, Greenhouse, OpenTelemetry, Audit Logging, Incident Response, Observability]
---

Apeiro provides technical building blocks for security observability, audit logging, and incident response integration. These components enable operators to detect, investigate, and respond to security events, but they do not constitute an incident response process. That remains the responsibility of the operating organization.

## What Apeiro Provides

- **Security observability**: <Project>CobaltCore</Project> adopts <Project>Greenhouse</Project> as its operations platform (unified dashboards, Heureka for remediation and compliance tracking); <Project>IronCore</Project> produces infrastructure-layer telemetry suitable for SIEM and XDR integration
- **Audit logging**: OpenTelemetry-based audit event transport with structured events suitable for SIEM ingestion, forensic investigation, and supply chain correlation via OCM
- **Incident response integration points**: component operations across <Project>OpenBao</Project>, <Project>OpenKCM</Project>, OIDC providers, OpenTelemetry, and <Project name="odg">Open Delivery Gear</Project> that an operator's IR/SOAR tooling can invoke
- **Resilience building blocks**: <Project>Gardener</Project> HA control planes, <Project>IronCore</Project> infrastructure abstraction across providers, and <Project>CobaltCore</Project> HA IaaS for workload portability

## Security Observability

<Project>Greenhouse</Project> is Apeiro's Kubernetes-based Day-2 operations platform. It serves as the aggregation and visualization layer for operational and security data originating from infrastructure and platform components:

- Unified dashboards for infrastructure state, alerting, and security posture
- Organization and access management with fine-grained Kubernetes RBAC
- Preconfigured observability and compliance tooling
- Operational playbooks
- Plugin-based extensibility for custom tooling integration

<Project>CobaltCore</Project> explicitly integrates Greenhouse as its operations platform, and additionally integrates [Heureka Security Posture Management](https://github.com/cloudoperators/heureka), which provides:

- Remediation tracking for security issues (vulnerabilities, security events, policy violations)
- Compliance tracking and auditability across infrastructure components
- Coordinated lifecycle automation via <Project>Gardener</Project> extensions, reducing the window during which hypervisor and storage nodes are unpatched

CobaltCore also contributes infrastructure telemetry, audit logging, and security-relevant monitoring for cloud infrastructure services, particularly for traditional workloads running on its OpenStack-compatible IaaS layer.

<Project>IronCore</Project> provides infrastructure-layer telemetry for cloud-native workloads: firmware inventory, hardware lifecycle status, and operational metrics suitable for SIEM and XDR integration.

All telemetry is designed for integration with SIEM and XDR platforms through standard formats.

## Audit Logging

Apeiro is contributing [proof-of-concept work](https://github.com/apeirora/audit-log-poc-for-otel) to the OpenTelemetry ecosystem exploring requirements for audit logging in cloud-native environments, specifically reliable delivery guarantees, tamper-detection mechanisms, and structured event formats. This is active research. See [Observability](../observability/) for more on Apeiro's OpenTelemetry contributions.

Using OpenTelemetry as the audit event transport provides:

- A common, standard-format audit trail across heterogeneous components
- Structured events suitable for SIEM ingestion
- Forensic evidence for incident investigation

## Incident Response Integration Points

Apeiro does not define an incident response process. It provides the technical integration points that enable rapid containment:

| Action | Component |
|---|---|
| Revoke access tokens, secrets, certificates | <Project>OpenBao</Project> |
| Disable encryption keys (block data access) | <Project>OpenKCM</Project> |
| Revoke workload identities | <Project name="zero-trust-workload-identities">Zero Trust Workload Identities</Project> (in development) |
| Revoke operator and platform access | OIDC providers |
| Collect forensic audit records | OpenTelemetry |
| Assess component vulnerability state | <Project name="odg">Open Delivery Gear</Project> |

An operator's IDS, SOAR, or incident response tooling integrates with these components to take action. The integration points are intentionally kept standard and open so that operators can use the tools their organization or regulatory environment requires.

## Resilience Building Blocks

Apeiro's architecture supports operational resilience through infrastructure automation and workload portability:

- <Project>Gardener</Project> supports resilient Kubernetes control-plane architectures and hosted control planes with automatic recovery mechanisms
- <Project>IronCore</Project> provides infrastructure abstraction across compute, network, and storage, reducing operational dependency on specific infrastructure providers through declarative APIs
- <Project>CobaltCore</Project> provides HA-capable OpenStack IaaS, contributing infrastructure redundancy and lifecycle automation across workload types

These capabilities reduce exposure to single-provider failures and support workload portability. RTO/RPO commitments, uptime guarantees, and DDoS mitigation are deployment-specific and not defined by Apeiro.

## Operator Responsibilities

- Incident response process, playbooks, severity classification, and escalation paths
- SIEM and XDR tooling selection and integration
- SOC operations and metrics (MTTD, MTTR, patch SLAs)
- DDoS preparedness exercises and disaster recovery testing
- Uptime commitments and failover procedures
- Recovery Time Objectives (RTOs) and Recovery Point Objectives (RPOs)

## Related Topics

- [Network Security](./network-security.md): containment integration points
- [Observability](../observability/): OpenTelemetry details
- [Software Supply Chain Security](./supply-chain-security.md): ODG for vulnerability state
- [Scope & Shared Responsibility](./scope-and-responsibility.md)
