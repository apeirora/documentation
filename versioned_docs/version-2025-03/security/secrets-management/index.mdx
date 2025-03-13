---
sidebar_position: 10
title: Secrets Management & PKI
keywords: [OpenBao]
---

With Apeiro Security, we will extend the open source project <Project>OpenBao</Project> with enterprise-grade features,
transforming it into a comprehensive solution for secure secrets management and certificate lifecycle automation.

> "OpenBao is an identity-based secrets and encryption management system. A secret is anything that you want to tightly control access to,
such as API encryption keys, passwords, and certificates. OpenBao provides encryption services that are gated by authentication and authorization methods.
Using OpenBao's UI, CLI, or HTTP API, access to secrets and other sensitive data can be securely stored and managed, tightly controlled (restricted),
and auditable." [^1]

We see the following use cases for OpenBao.

## Bootstrapping

For provisioning of services, credentials are needed, for example database passwords. We want to store these secrets securely in OpenBao,
such that they can be accessed from automated provisioning procedures. Administrator access is needed for the initial configuration or issue resolution.

<ApeiroFigure src="/security/img/secrets.svg"
  alt="Secrets"
  caption="Secrets"
  width="100%"/>

For automated startup, OpenBao must support auto-unsealing, while the unseal key should be stored in
<Term>Hardware security module</Term> (HSM)[^2].
For HSM access, PKCS#11[^3] support must be [added](https://github.com/openbao/go-kms-wrapping/pull/14) to OpenBao.
For multi-tenancy, namespace support must be [added](https://github.com/openbao/openbao/issues/787) to OpenBao.
In addition, disaster recovery is needed for enterprise readiness.

## PKI

The central component of each Public Key Infrastructure (PKI) is a Certification Authority (CA), which issues certificates that can be used for
authentication. The root certificate of a CA is used to digitally sign user certificates, server certificates or CRLs (certificate revocation lists).
Thus, the private key of a CA must be carefully secured. The private key should be stored in an HSM (or at least encrypted with a key stored in an HSM).
As above, administrator access is needed for the initial configuration or issue resolution.

<ApeiroFigure src="/security/img/pki.svg"
  alt="PKI"
  caption="PKI"
  width="100%"/>

For automated TLS configuration of server certificates (ACME[^4] protocol),
OpenBao must support automated access to the private key for signing certificates. If we store the private key in HSM, we must extend the PKCS#11 support
of OpenBao to enable digital signatures.

[^1]: [What is OpenBao?](https://openbao.org/docs/what-is-openbao/)
[^2]: [Wikipedia: Hardware security module](https://en.wikipedia.org/wiki/Hardware_security_module)
[^3]: [Wikipedia: PKCS#11](https://en.wikipedia.org/wiki/PKCS_11)
[^4]: [Wikipedia: ACME](https://de.wikipedia.org/wiki/Automatic_Certificate_Management_Environment)
