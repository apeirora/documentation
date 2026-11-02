---
sidebar_position: 5
title: Identity & Access Management
keywords: [Identity, Authentication, Authorization, OIDC, Keycloak, SPIFFE, OpenFGA, ReBAC, RBAC, Federation, Zero Trust Workload Identities]
---

Apeiro's identity and access management architecture covers two distinct concerns: **authentication** (establishing who or what is making a request) and **authorization** (deciding what that identity is permitted to do). Both are implemented using open standards and are designed to work across multi-provider and multi-tenant environments.

A deliberate design principle is the **decoupling of authentication and authorization**. Rather than embedding authorization logic into individual applications, Apeiro promotes a shared, centralized authorization layer that any service can integrate with. This makes access control consistent across Platform Mesh, OpenMFP, Data Fabric, and other components without each service maintaining its own permission model.

<ApeiroFigure src="/security/img/authn-authz.svg"
  alt="Authentication and Authorization in Apeiro"
  caption="Authentication and Authorization in Apeiro: Apeiro services authenticate via the internal IdP (Keycloak), which federates with external customer IdPs. Authorization uses Kubernetes RBAC as the primary gate. For simple deployments, Keycloak group-to-role mappings are sufficient. OpenFGA is an optional second tier for relationship-based access decisions in more complex scenarios."
  width="100%"/>

## What Apeiro Provides

- **OIDC-based authentication**: short-lived JWT tokens, MFA/2FA (operator-configured), and federation with external identity providers via [Keycloak](https://www.keycloak.org/)
- **Workload identity**: <Project name="zero-trust-workload-identities">Zero Trust Workload Identities</Project> (in development) issues cryptographically verifiable SPIFFE SVIDs, enabling automatic mTLS between services
- **RBAC**: Keycloak group claims can be referenced as subjects in Kubernetes RBAC bindings, sufficient when access decisions depend only on role assignments
- **Relationship-Based Access Control** (optional): [OpenFGA](https://openfga.dev/) derives access decisions from explicit subject-object relationships, supporting delegated administration and multi-tenant authorization in more complex scenarios
- **Identity federation**: corporate OIDC, SAML, and LDAP identity brokering; SPIFFE trust domain federation across environments

## Authentication

### Platform and Operator Access

For authentication, [OpenID Connect (OIDC)](https://openid.net/connect/) is the industry standard. [Keycloak](https://www.keycloak.org/) serves as Apeiro's default **internal IdP** - a core component for storing technical and personal user accounts and issuing OIDC tokens to Apeiro services.

OIDC-based authentication supports:

- Short-lived JWT tokens with defined expiry
- MFA/2FA enforcement (operator-configured via Keycloak or external IDP)
- Federation with external identity providers (corporate OIDC, SAML, LDAP) via identity brokering

Customers often use their own identity providers. In this case, they can connect **external IdPs** to the internal IdP: Keycloak acts as an [identity broker](https://www.keycloak.org/docs/latest/server_admin/index.html#_identity_broker), federating authentication to external corporate identity providers via OpenID Connect or [SAML 2.0](https://www.keycloak.org/docs/latest/server_admin/#_client-saml-configuration). This allows Apeiro to normalize identities from diverse sources into a consistent internal representation without requiring each service to integrate with every external IdP separately.

The <Project name="platformmesh">Platform Mesh</Project> implementation uses Keycloak with per-organization dedicated realms and this identity brokering mechanism. See [Platform Mesh Security](../platform-mesh/security.md) for the specific implementation.

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

## Authorization

For authorization there is no single dominant industry standard. Apeiro supports two authorization paths, which can be combined:

### RBAC via Keycloak and Kubernetes (Default)

Role-Based Access Control (RBAC) using **Keycloak groups referenced in Kubernetes RBAC bindings** covers access decisions based on role assignments. Keycloak groups (populated from internal user management or federated from an external IDP) are exposed as group claims in OIDC tokens. An operator creates `RoleBinding` or `ClusterRoleBinding` resources that reference those group names as subjects, granting the corresponding roles without requiring any additional authorization components.

This model covers access control needs where membership in a group is the deciding factor: organizational roles, team permissions, or job function.

### OpenFGA for Relationship-Based Access Control (Optional)

When authorization decisions depend on **relationships between entities** (team memberships, resource ownership, service subscriptions, delegated administration) rather than on static role assignments, RBAC alone cannot express them. For these cases, Apeiro optionally integrates [OpenFGA](https://openfga.dev/) (Fine-Grained Authorization).

OpenFGA implements **Relationship-Based Access Control (ReBAC)**, which can also express classical RBAC and ABAC models:

- **RBAC**: roles and groups can be modeled directly within OpenFGA using its [authorization model and relationship tuples](https://openfga.dev/docs/modeling/roles-and-permissions).
- **ABAC** ([Attribute-Based Access Control](https://openfga.dev/docs/authorization-concepts#what-is-attribute-based-access-control)): attribute conditions can be expressed as relationship types.
- **ReBAC** derives access decisions from explicit **relationships** between subjects and objects, making it more expressive for scenarios where permissions depend on entity relationships rather than static role assignments.

> "Relationship-Based Access Control (ReBAC) enables user access rules to be conditional on relations that a given user has with a given object and that object's relationship with other objects. For example, a given user can view a given document if the user has access to the document's parent folder." [^1]

[^1]: [OpenFGA](https://openfga.dev/docs/authorization-concepts#what-is-relationship-based-access-control)

Access decisions in OpenFGA are resolved from relationship tuples of the form `(user, relation, object)`. Permissions propagate through the relationship graph. Examples of relationships that can be modeled:

- `user:alice` has relation `owner` on `document:contract-42` → alice can edit
- `team:engineering` has relation `member` on `user:bob` → bob inherits team permissions
- `organization:acme` has relation `subscriber` on `service:k8s-cluster` → acme's members can access
- `provider:infra-co` has relation `authorized` on `marketplace:apeiro` → provider may publish

OpenFGA supports both **forward authorization checks** ("Can user X access resource Y?") and **inverse queries** ("Which resources can user X access?"), the latter being particularly useful for building UIs and audit views.

### Use in Apeiro

In <Project name="platformmesh">Platform Mesh</Project> and <Project>OpenMFP</Project>, OpenFGA handles authorization decisions that depend on entity relationships. It is integrated as an authorization webhook in the Platform Mesh control plane: Kubernetes RBAC acts as the first gate; requests with no RBAC opinion are forwarded to OpenFGA. This two-tier model means structural API access is handled by RBAC, while relationship-level decisions are handled by OpenFGA.

OpenFGA is integrated through the Kubernetes authorization webhook mechanism, so any conforming authorizer can be substituted. However, Platform Mesh builds on OpenFGA specifically for per-organization store provisioning, dynamic authorization schema generation, and marketplace integration; omitting it means those features are unavailable.

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
