---
sidebar_position: 5
title: Identity & Access Management
keywords: [Identity, Authentication, Authorization, OIDC, SPIFFE, OpenFGA, ReBAC, Federation, Zero Trust Workload Identities]
---

Apeiro's identity and access management architecture covers two distinct concerns: **authentication** (establishing who or what is making a request) and **authorization** (deciding what that identity is permitted to do). Both are implemented using open standards and are designed to work across multi-provider and multi-tenant environments.

## What Apeiro Provides

- **OIDC-based authentication**: short-lived JWT tokens, MFA/2FA (operator-configured), and federation with external identity providers via [Keycloak](https://www.keycloak.org/)
- **Workload identity**: <Project name="zero-trust-workload-identities">Zero Trust Workload Identities</Project> (in development) issues cryptographically verifiable SPIFFE SVIDs, enabling automatic mTLS between services
- **Relationship-Based Access Control**: [OpenFGA](https://openfga.dev/) derives access decisions from explicit subject-object relationships, supporting delegated administration and multi-tenant authorization without overprivileged roles
- **Identity federation**: corporate OIDC, SAML, and LDAP identity brokering; SPIFFE trust domain federation across environments

## Authentication

### Platform and Operator Access

Platform and operator authentication is based on [OpenID Connect (OIDC)](https://openid.net/connect/). OIDC-based authentication supports:

- Short-lived JWT tokens with defined expiry
- MFA/2FA enforcement (operator-configured via Keycloak or external IDP)
- Federation with external identity providers (corporate OIDC, SAML, LDAP) via identity brokering

The <Project name="platformmesh">Platform Mesh</Project> implementation uses Keycloak as its internal identity provider, with per-organization dedicated realms and an identity brokering mechanism that normalizes external identities into a consistent internal representation. See [Platform Mesh Security](../platform-mesh/security.md) for the specific implementation.

### Workload Identity (Zero Trust Workload Identities)

<Project name="zero-trust-workload-identities">Zero Trust Workload Identities</Project> is Apeiro's planned workload identity framework, based on the [SPIFFE](https://spiffe.io/) standard.

::: warning In Development
Zero Trust Workload Identities is in POC phase. The architecture and integration model described here represents the intended design; production deployment is not yet complete.
:::

SPIFFE (Secure Production Identity Framework for Everyone) defines a standard for workload identity documents (SVIDs). Apeiro will:

- Issue cryptographically verifiable workload identities to services
- Establish mutual trust relationships between services without requiring manual certificate management
- Enable automatic mutual TLS (mTLS) between workloads, where services choose to use the issued SVIDs to establish mutually authenticated connections via their TLS stack or a sidecar proxy
- Support federation across multiple SPIFFE trust domains

Once deployed, service-to-service communication can be authenticated and encrypted by default, with identities that are short-lived, automatically rotated, and tied to the workload's runtime context rather than a static credential.

## Authorization: Relationship-Based Access Control

### Why ReBAC

Apeiro's preferred authorization model is Relationship-Based Access Control (ReBAC) implemented through [OpenFGA](https://openfga.dev/) (Fine-Grained Authorization).

Traditional RBAC assigns permissions through static roles. ABAC evaluates attributes at request time. ReBAC derives access decisions from explicit **relationships** between subjects and objects, which makes it significantly more expressive for complex multi-tenant and cross-provider environments without requiring attribute proliferation.

### How OpenFGA Works

Access decisions in OpenFGA are resolved from relationship tuples of the form `(user, relation, object)`. Permissions propagate through the relationship graph. Examples of relationships that can be modeled:

- `user:alice` has relation `owner` on `document:contract-42` → alice can edit
- `team:engineering` has relation `member` on `user:bob` → bob inherits team permissions
- `organization:acme` has relation `subscriber` on `service:k8s-cluster` → acme's members can access
- `provider:infra-co` has relation `authorized` on `marketplace:apeiro` → provider may publish

OpenFGA supports both **forward authorization checks** ("Can user X access resource Y?") and **inverse queries** ("Which resources can user X access?"), the latter being particularly useful for building UIs and audit views.

### Use in Apeiro

OpenFGA is the authorization engine for <Project name="platformmesh">Platform Mesh</Project> and <Project>OpenMFP</Project>. It is exposed as an authorization webhook in the Platform Mesh control plane: Kubernetes RBAC acts as the first gate; requests without a RBAC opinion are forwarded to OpenFGA. This two-tier model means structural API access is handled by RBAC, while business-level and relationship-level decisions are handled by OpenFGA.

The OpenFGA authorization schema in Platform Mesh evolves dynamically as service providers expose capabilities: new service types automatically extend the authorization model without manual schema updates.

## Operator Responsibilities

Apeiro provides the IAM building blocks. Operators own:

- Identity governance policies and access review processes
- IDP selection, configuration, and federation setup
- Privileged access management procedures
- User lifecycle management (provisioning, deprovisioning)
- Access revocation workflows and incident response processes

## Related Topics

- [Platform Mesh Security](../platform-mesh/security.md): Keycloak IDP, per-organization realms, two-tier RBAC + OpenFGA model
- [Secrets Management & PKI](./secrets-management.md): OpenBao credential lifecycle
- [Network Security](./network-security.md): Zero Trust Workload Identities for mTLS between workloads
- [Security Operations](./security-operations.md): audit logging, SIEM integration, incident response
- [Scope & Shared Responsibility](./scope-and-responsibility.md)
