---
sidebar_position: 6
title: Secrets Management & PKI
keywords: [OpenBao, Secrets, PKI, HSM, PKCS11, Multi-tenancy, Certificates]
---

<Project>OpenBao</Project> is Apeiro's identity-based secrets and encryption management system, providing a central service for securely storing, accessing, and distributing secrets needed for infrastructure and service bootstrapping, particularly in distributed cloud-edge environments.

## What Apeiro Provides

- **Secrets storage**: API keys, passwords, tokens, and credentials stored with access controlled by authentication and authorization policies
- **PKI and certificate lifecycle**: certificate issuance, rotation, and revocation through a built-in Certificate Authority
- **Seal/unseal with HSM backing**: <Term>Hardware Security Module</Term> (HSM)-backed auto-unseal via PKCS#11, ensuring the unseal key is protected by dedicated cryptographic hardware
- **Multi-tenancy via namespaces**: isolated secret stores for different tenants, teams, or platform components; availability varies by OpenBao edition (see [OpenBao Namespaces documentation](https://openbao.org/docs/enterprise/namespaces/))

For encryption key management (key hierarchies, BYOK/HYOK, cross-platform key governance), see [Key Management](./key-management.md), which covers <Project>OpenKCM</Project>, the layer that builds on OpenBao to provide enterprise-grade key management.

## Bootstrapping

Infrastructure provisioning requires credentials such as database passwords, API tokens, and service certificates. OpenBao stores these securely so that automated provisioning processes can retrieve them without embedding credentials in configuration files or container images.

<ApeiroFigure src="/security/img/secrets.svg"
  alt="Secrets bootstrapping with OpenBao"
  caption="Secrets bootstrapping with OpenBao"
  width="100%"/>

For automated startup, OpenBao supports auto-unsealing with the unseal key stored in an <Term>Hardware Security Module</Term> (HSM) via PKCS#11. Multi-tenancy is supported through namespaces, enabling isolated secret stores for different platform components or tenant organizations.

## PKI and Certificate Lifecycle

OpenBao's PKI capabilities provide a Certification Authority (CA) for issuing certificates used for authentication and encrypted communication. The CA's private key can be stored in or protected by an HSM when OpenBao is configured with PKCS#11 auto-unseal.

<ApeiroFigure src="/security/img/pki.svg"
  alt="PKI with OpenBao"
  caption="PKI with OpenBao"
  width="100%"/>

Automated TLS certificate management is supported through the [ACME protocol](https://datatracker.ietf.org/doc/html/rfc8555), enabling services to automatically obtain and renew certificates without manual intervention.

## Operator Responsibilities

- **Unseal policy**: securing the HSM and the unseal key material
- **Secrets access policy**: defining which services and identities may access which secrets
- **Audit review**: reviewing OpenBao audit logs for unauthorized or anomalous access
- **Disaster recovery**: configuring and testing OpenBao recovery procedures
- **CA trust chain governance**: managing root CA trust distribution

## Related Topics

- [Key Management](./key-management.md): OpenKCM for encryption key hierarchies, BYOK/HYOK
- [Identity & Access Management](./identity-access-management.md): credential and secrets lifecycle
- [Network Security](./network-security.md): Zero Trust Workload Identities for workload mTLS
