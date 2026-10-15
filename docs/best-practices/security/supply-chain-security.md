---
sidebar_position: 8
title: Software Supply Chain Security
keywords: [Supply Chain, OCM, Open Component Model, Open Delivery Gear, Konfidence, Provenance, SBoM, Signing]
---

<Project name="ocm">Open Component Model</Project> (OCM), <Project name="odg">Open Delivery Gear</Project> (ODG), and <Project>Konfidence</Project> together address the full chain from artifact creation to deployment: provenance, signing, continuous compliance scanning, and delivery governance as composable building blocks.

## What Apeiro Provides

- **Software Bill of Delivery**: <Project name="ocm">Open Component Model</Project> captures what software is included and how it was delivered, with globally unique component identities (OCM Coordinates) as the common correlation key across the delivery chain
- **Provenance and signing**: every artifact carries a cryptographic signature, provenance metadata, and OCM Coordinates that survive transport across registries and environments
- **Continuous compliance automation**: <Project name="odg">Open Delivery Gear</Project> scans components continuously, tracks findings against configurable remediation deadlines, and supports contextual CVE rescoring
- **Delivery governance**: <Project>Konfidence</Project> enforces stage-gated promotion of OCM-based application vectors (DEV to TEST to PROD), ensuring only approved versions progress

## Software Bill of Delivery

Apeiro uses <Project name="ocm">Open Component Model</Project> as a **Software Bill of Delivery (SBoD)**. Where a traditional SBoM captures what software is included, OCM additionally captures how it was delivered: lifecycle metadata, deployment context, provenance data, and compliance evidence.

OCM provides:

- **Globally unique component identities** (OCM Coordinates) that correlate information across development, release, and runtime, and survive transport across registries and environments, including air-gapped deployments
- **Signed components** using RSA, X.509, or Sigstore keyless signing

Once every tool in the delivery chain uses OCM Coordinates as a shared key, vulnerability findings, deployment records, and compliance evidence can be correlated across the full software lifecycle.

See also [Software Bill of Delivery](../lcm/sbod/) in the Lifecycle Management section for more on OCM as a delivery standard.

## Provenance and Signing

Every artifact in an Apeiro-based delivery pipeline carries:

- A cryptographic signature verifiable against a known key or keyless signing record
- Provenance metadata linking the artifact to its source, build, and release process
- OCM Coordinates that survive transport between registries and environments

Signature verification is performed by OCM tooling as part of the delivery pipeline. <Project name="odg">Open Delivery Gear</Project> uses OCM Coordinates to track and scan the verified component versions.

## Continuous Compliance Automation

<Project name="odg">Open Delivery Gear</Project> (ODG) extends OCM with continuous vulnerability and compliance evaluation. It scans component versions continuously using OCM Coordinates as the stable identity key, tracks findings against configurable remediation deadlines, and supports contextual CVE rescoring so operators can reprioritize based on operational context rather than raw severity alone.

When findings cross configured thresholds, ODG can trigger downstream remediation workflows. A Delivery Dashboard provides an aggregated compliance posture view across the component portfolio. Additional scanners and data sources can be integrated through the ODG Extension Model.

## Delivery Governance

<Project>Konfidence</Project> is Apeiro's software delivery framework for SaaS applications. Its security contribution is promotion control: it uses OCM-based **application vectors** (immutable, versioned deployment specifications) to enforce that only versions which have passed prior delivery stages can progress to the next stage (DEV -> TEST -> PROD). Each vector change produces a new identity, so the promotion chain is traceable within the Konfidence control plane.
::: info Early Development
<Project>Konfidence</Project> is pre-release software. APIs and features are subject to change; no stability or compatibility guarantees are provided at this stage.
:::

## Operator Responsibilities

- Supply chain policies and regulatory compliance: OCM and ODG generate evidence; operators define the standards they must meet and the compliance decisions they make
- SBoM distribution and consumer disclosure decisions
- Vulnerability remediation deadline policy (ODG tracks findings against deadlines operators configure)
- Signing key management for custom components

## Related Topics

- [Software Bill of Delivery](../lcm/sbod/index.md): OCM as the SBoD standard
- [Konfidence](../lcm/konfidence/index.md): delivery governance and stage-gated promotion
- [Security Operations](./security-operations.md): ODG feeds into security posture visibility
- [Scope & Shared Responsibility](./scope-and-responsibility.md)
