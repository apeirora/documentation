---
sidebar_position: 7
keywords: [Key Management, Key Management Service, KMS, OpenKCM, DEK, KEK, BYOK, HYOK]
title: Key Management
---

<Project>OpenKCM</Project> is Apeiro's open-source Key Management Service. It provides a central key chain manager for customer-owned encryption keys, managing encryption at rest across cloud-native deployments. Organizations retain exclusive control over their key material, with immediate revocation across all governed workloads.

::: warning Early Availability
<Project>OpenKCM</Project> is in active development.
:::

## What Apeiro Provides

- **Customer-owned key governance**: organizations control the full key hierarchy, from root keys down to data encryption keys
- **BYOK and HYOK**: Bring Your Own Key and Hold Your Own Key support, ensuring organizations can retain or import their own root key material
- **Pluggable KMS backends**: root key material is governed through pluggable keystore backends
- **Multi-cloud key management**: consistent key lifecycle management across heterogeneous infrastructure providers
- **Keychain composition**: key hierarchies that span multiple platforms and storage backends under a single governance layer
- **Integration with <Project>IronCore</Project> and <Project>CobaltCore</Project>**: both IaaS platforms plan integration with OpenKCM for block and object storage encryption

## Concepts

Protecting data at rest requires encryption keys and a means to store those keys securely. Because not every key can be stored in the same highly-secured location, encryption keys form a **keychain**: each key is encrypted (wrapped) by a higher-level key, and so on up to a root key stored in a secure backend such as a cloud KMS or an HSM-backed secrets manager. Only the root key must reside in the trusted backend; all other keys are stored as wrapped (encrypted) keys in regular storage.

OpenKCM addresses keys at four levels:

- **Level 1 Keys**: Customer-managed root keys. These provide BYOK and HYOK capabilities and are stored in the configured KMS backend (AWS KMS or OpenBao).
- **Level 2-4 Keys**: Key Encryption Keys (KEKs) managed by OpenKCM's _Krypton_ layer, wrapping lower-level keys up to the Level 1 root.

A keychain can exist at multiple levels of abstraction simultaneously. For example, a database's internal key hierarchy (data encryption keys, key encryption keys) may be one node in a cluster-level keychain, which in turn connects to a platform-level keychain managed by OpenKCM. OpenKCM extends this model further, unifying key governance across multiple clusters and infrastructure providers.

## Architecture

<ApeiroFigure src="/security/img/kms.svg"
  alt="OpenKCM, Apeiro's key management service"
  caption="OpenKCM, Apeiro's key management service"
  width="100%"/>

OpenKCM consists of several logical components:

- **CMK: Level 1 key management**: manages customer-managed root keys (BYOK/HYOK); root keys are stored exclusively in the configured KMS backend and are never exposed to application workloads
- **Krypton (crypto layer)**: manages the Level 2-4 key hierarchy; handles wrapping and unwrapping, key assignment changes, and Level 1 key disablement (which immediately blocks access to all wrapped data)
- **Pluggable keystore backends**: a plugin-based architecture (go-plugin over gRPC) supports different KMS backends; currently integrated: AWS KMS and OpenBao
- **Infrastructure integration**: connects the Krypton layer to <Project>IronCore</Project> and <Project>CobaltCore</Project> storage services out of the box; additional providers supported through a plugin mechanism

## Operator Responsibilities

- **KMS backend selection and custodianship**: selecting and securing the KMS backend (cloud KMS or OpenBao with optional HSM) that protects root keys
- **Key rotation policy**: defining how frequently keys are rotated and under what conditions
- **BYOK/HYOK key import procedures**: managing how customer-provided keys are imported and governed
- **Compliance reporting**: documenting key usage for audits and regulatory requirements
- **Access controls for key management operations**: defining who may manage keys and under what authorization

## Related Topics

- [Secrets Management & PKI](./secrets-management.md): OpenBao as the secrets layer beneath OpenKCM
- [Data Protection at Rest](./scope-and-responsibility.md): shared responsibility for data classification and retention
- [Security Principles](./security-principles.md): digital sovereignty and BYOK/HYOK
