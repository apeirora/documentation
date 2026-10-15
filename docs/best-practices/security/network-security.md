---
sidebar_position: 4
title: Network Security
keywords: [Network Security, Zero Trust, SPIFFE, mTLS, IronCore, CobaltCore, Workload Identity]
---

Apeiro's network security is built on two foundations: declarative infrastructure networking (<Project>IronCore</Project> for cloud-native workloads and <Project>CobaltCore</Project> for traditional workloads) and a Zero Trust identity model where <Project name="zero-trust-workload-identities">Zero Trust Workload Identities</Project> (in development) ensures trust is established through verified workload identities and cryptographic controls rather than network location.

## What Apeiro Provides

- **Declarative infrastructure networking**: <Project>IronCore</Project> provides Kubernetes-native network resources (networks, VIPs, network interfaces) with NetworkPolicy, L3 tenant isolation, and NATGateway; <Project>CobaltCore</Project> covers traditional workloads via its OpenStack IaaS layer
- **Zero Trust Workload Identities** (in development): SPIFFE-based cryptographic workload identity enabling automatic mTLS between services; trust is based on workload runtime identity rather than network location

## Infrastructure Networking (IronCore)

<Project>IronCore</Project> provides network security at the infrastructure layer through a declarative Kubernetes-native API. Network resources are managed through infrastructure-as-code principles, ensuring consistent security controls across environments.

The IronCore network architecture consists of:

- **ironcore-net**: the central networking API and networking control plane
- **metalnet**: a cluster-local networking API and control plane for infrastructure networking
- **Declarative network resources**: Networks, Virtual IPs, and Network Interfaces managed through Kubernetes-native APIs, enabling network segmentation, isolation, and lifecycle management

Specific network security capabilities:

- **NetworkPolicy**: label-selector-based traffic regulation within isolated networks, defining allowed ingress and egress rules per NetworkInterface
- **L3 tenant isolation**: each network is logically isolated at layer 3; network peering between tenants requires mutual validation from both sides
- **NATGateway**: outbound-only internet access for machines in private subnets, keeping workloads not directly internet-reachable
- **VirtualIP management**: explicit allocation and association of public IPs, giving operators direct control over internet exposure
- **BMCSecret**: sensitive BMC (Redfish) access credentials stored in dedicated Kubernetes Secret resources, decoupled from other configuration data
- **Secrets-backed provisioning**: server operating system installation uses Ignition configuration referenced via a secret reference, not embedded in plain resource definitions

All networking configuration is expressed as Kubernetes resources, meaning network security policy is version-controlled, auditable, and subject to the same reconciliation guarantees as any other infrastructure resource.

For traditional and non-cloud-native workloads, <Project>CobaltCore</Project> provides network connectivity through its OpenStack IaaS layer.

## Workload Identity and Mutual TLS

::: warning In Development
Zero Trust Workload Identities is in POC phase. The SPIFFE-based workload identity architecture described here represents the intended design; production deployment is not yet complete.
:::

<Project name="zero-trust-workload-identities">Zero Trust Workload Identities</Project> gives every workload a cryptographically verifiable identity, enabling automatic mutual TLS (mTLS) between them. Trust is based on the workload's runtime identity rather than its IP address or network segment, eliminating the implicit trust that perimeter-based models require. See [Identity & Access Management](./identity-access-management.md) for how the SPIFFE-based identity mechanism works.

## Operator Responsibilities

- Network policy design and enforcement (Apeiro provides the declarative networking API; operators define the policies)
- Intrusion detection and response tooling (Apeiro provides integration hooks, not an IDS)
- SIEM and XDR integration
- DDoS protection (not provided by Apeiro)
- Network segmentation decisions beyond what IronCore declarative resources enforce

## Related Topics

- [Identity & Access Management](./identity-access-management.md): Zero Trust Workload Identities and mTLS authentication
- [Secrets Management & PKI](./secrets-management.md): OpenBao PKI for certificates
- [Security Operations](./security-operations.md): audit logging and incident response enablers
- [Scope & Shared Responsibility](./scope-and-responsibility.md)
