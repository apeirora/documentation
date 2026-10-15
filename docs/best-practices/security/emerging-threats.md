---
sidebar_position: 10
title: Emerging Threats
keywords: [Crypto Agility, Post-Quantum, Open Crypto Broker, Emerging Threats, AI Security, Supply Chain, AI-Driven Threats]
---

Apeiro is designed to remain flexible and resilient against emerging and future threats, in particular those related to net-new vulnerabilities, post-quantum safety, and artificial intelligence.

## What Apeiro Provides

- **Continuous vulnerability visibility**: <Project name="odg">Open Delivery Gear</Project> continuously evaluates all components for known vulnerabilities across all dependency types; <Project name="ocm">Open Component Model</Project> provides the stable identity layer that makes tracking possible across registries, environments, and the full software lifecycle
- **Open Crypto Broker**: externalizes cryptographic decisions into algorithm profiles, enabling policy-based algorithm rotation without modifying, or redeploying affected services, and facilitating post-quantum migration
- **AI-related threat coverage**: <Project name="ocm">Open Component Model</Project> and <Project name="odg">Open Delivery Gear</Project> can extend to AI models as supply chain dependencies; <Project name="zero-trust-workload-identities">Zero Trust Workload Identities</Project> constrains the blast radius of a compromised AI agent credential

## Continuous Vulnerability Visibility

Responding to emerging threats requires knowing what software is running and which vulnerabilities affect it. As new threat classes emerge, the ability to assess affected components and plan remediation at scale determines how quickly an architecture can respond.

<Project name="odg">Open Delivery Gear</Project> continuously evaluates components for known vulnerabilities across all dependency types, with findings tracked against configurable remediation deadlines. <Project name="ocm">Open Component Model</Project> provides the component identity layer: unique, stable identifiers that remain consistent across registries, environments, and the full software lifecycle, enabling precise enumeration of all affected deployments when a new threat or vulnerability class is disclosed.

## Open Crypto Broker

<Project name="crypto-broker">Open Crypto Broker</Project> externalizes cryptographic decisions into profiles, optionally with central governance. Instead of each service hardcoding a specific algorithm, workloads consume cryptographic operations through a unified interface backed by a managed, operator-controlled algorithm policy.

This provides:

- **Algorithm governance**: approved cryptographic algorithms are defined in a policy, not scattered across application code
- **Policy-based algorithm rotation**: algorithms can be changed by updating a profile without modifying, rebuilding, and redeploying affected services
- **Crypto-agility**: a concrete path for transitioning to post-quantum cryptography as standardized algorithms mature

Open Crypto Broker provides the architectural mechanism for post-quantum migration: once post-quantum algorithms are standardized and mature, they can be introduced as a new algorithm profile and gradually rolled out across workloads without application-level changes.

::: warning Planned Capability
Open Crypto Broker is at an early stage and currently targets cryptographic uses cases inside a workload. It does not yet govern the cryptographic algorithms used for service-to-service mutual TLS (mTLS).
:::

## AI-related Threats

As an attacker's tool, AI lowers the skill threshold for sophisticated intrusions: better phishing, faster malware, and cyber operations at a scale that was previously impractical. The EU's [Action Plan on Cybersecurity and Artificial Intelligence](https://digital-strategy.ec.europa.eu/en/library/eu-action-plan-cybersecurity-and-artificial-intelligence) (July 2026) frames this as a dual-use challenge and calls on cloud operators to keep defenses current as AI capabilities evolve. Apeiro's security settings are configurable and extensible, so operators can integrate up-to-date security tooling to defend against AI-assisted attacks.

When AI is part of your own infrastructure, it enlarges the attack surface in two specific ways. First, AI models are supply chain dependencies subject to tampering. <Project name="ocm">Open Component Model</Project> can give each model a stable, globally unique identity (OCM Coordinates) that persists across environments, and <Project name="odg">Open Delivery Gear</Project> can evaluate them continuously against configurable remediation deadlines. Second, AI agents tend to run with broad permissions to act autonomously. A stolen agent credential gives an attacker the agent's full action scope across every system it can reach. <Project name="zero-trust-workload-identities">Zero Trust Workload Identities</Project> can help to replace static API keys with short-lived, cryptographically verifiable identities tied to the workload.

## Operator Responsibilities

- Enterprise risk management processes and threat model review frequency (Apeiro provides technical mechanisms; formal review processes remain operator responsibility)
- Post-quantum migration timelines for custom application code and custom cryptographic integrations
- Algorithm policy definition within Open Crypto Broker
- AI security policy: trusted model and dataset sources, remediation priorities for AI-specific findings, and authorization scope boundaries for AI agents

## Related Topics

- [Software Supply Chain Security](./supply-chain-security.md): vulnerability tracking via OCM/ODG
- [Security Operations](./security-operations.md): ongoing threat visibility
- [Scope & Shared Responsibility](./scope-and-responsibility.md)
