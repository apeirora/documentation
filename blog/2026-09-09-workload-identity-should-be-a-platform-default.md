---
title: "Workload Identity Should Come With the Cluster"
authors:
  - maximilian-lenkeit
tags:
  - zero trust
  - workload identity
  - spiffe
  - spire
  - gardener
  - security
---

"Never trust, always verify", the zero-trust claim, has become the default advice for securing communication between workloads: assume the network is untrusted and authenticate every connection, even in-cluster. While it is good advice, it quietly assumes something that isn't always solved at scale: that every workload already has a verifiable and attested identity.

Without a verifiable identity per workload, zero trust has nothing to check against. This post argues that instead of leaving this to individual teams, it should be a default capability of a [managed Kubernetes offering](./../docs/best-practices/multi-cluster-federation/managed-kubernetes-as-a-service.md).

<!-- truncate -->

## Do-It-Yourself Does Not Scale

The mechanics of zero-trust networking are well understood: mTLS with short-lived certificates for east-west traffic is a solved problem at the level of a single service or a single cluster. Various tools exist, best practices are documented, and any team can spin up [SPIFFE/SPIRE](https://spiffe.io/) in their cluster and issue workload identities themselves.

The trouble starts when you apply this at enterprise scale with hundreds of teams.

In a large managed Kubernetes offering, you are not operating one cluster. You are operating thousands, across many teams, projects, and infrastructure providers. In that setting, a do-it-yourself approach to workload identities becomes a liability, for two reasons:

1. **Governance:** When every team runs their own workload identity services, you have no way to enforce central standards. You cannot guarantee that CAs are backed by a KMS or an HSM rather than a private key from a Kubernetes secret. You cannot guarantee that node and workload attestation are hardened correctly or that key material rotates in time. Each cluster starts following its own security policies, and the fleet as a whole becomes impossible to reason about.

2. **Overhead:** Asking every team to fully comprehend workload identity services, deploy them, operate them and keep them patched is a burden and it's unnecessary. This is repetitive work that produces inconsistent results, precisely where consistency matters most.

So letting teams DIY workload identities doesn't scale; not technically, and not from a governance perspective.

## Managed Workload Identities Improve Security Posture

The alternative is to make verifiable workload identity a capability that a managed Kubernetes service offers, the same way it offers networking or storage. A team should be able to obtain a verifiable identity for a workload through configuration alone, with something as simple as a label or an annotation, and get back an automatically rotated identity they can use for mTLS.

But more important than convenience is the improved security posture that comes with it. When workload identities are an offering of your managed Kubernetes service, security best practices can be enforced centrally.

Node attestation is a good example: you want to assert that a node is trusted and part of a known pool of resources before any workload is scheduled on it. But each infrastructure provider proves the identity of a node differently, has their own verification services and may make changes over time. When the managed Kubernetes service owns node attestation, it can track and adapt to those changes so that workload owners don't even have to know that the underlying mechanism shifted.

And the effects amplify with infrastructure diversity. Managed Kubernetes services can provision clusters across multiple infrastructure providers, whether it's [CobaltCore](https://apeirora.eu/content/projects/#cobalt-core), [IronCore](https://apeirora.eu/content/projects/#ironcore-iaas) or hyperscalers like AWS, Azure or GCP. The details are abstracted so that workload owners interact with a homogeneous control plane. If teams ran their own workload identity services, they would have to understand and configure the specifics of all infrastructure providers they use. But when the managed Kubernetes service provides workload identity, it can select the right node and workload attestation mechanisms for the underlying infrastructure and take care of the differences.

Lastly, only the component that provisions nodes on an infrastructure provider can reliably guarantee that a node is not just "good" in terms of being attested, but that it does actually belong to a given cluster, rather than being a node from elsewhere that holds a valid identity but was never meant to join this cluster. If a team operated workload identity services from inside their own cluster, they couldn't root trust in the infrastructure the same way a managed Kubernetes service can, because it does not control that infrastructure.

For all these reasons, it's managed Kubernetes services that should provide verifiable workload identities by default.

## Outlook

This is the direction that we explore in Apeiro: building on top of SPIFFE as the open, vendor-neutral standard, we want to make attested workload identities available in our [managed Kubernetes offering](./../docs/best-practices/multi-cluster-federation/managed-kubernetes-as-a-service.md). Workload owners should be able to opt in through a small set of configuration options without having to worry about the machinery behind the scenes.

Once workload identities are available by default, another question follows: identity by itself tells you *who* a workload is, but not *which other workloads it should trust*. At the scale of thousands of clusters, defining and managing trust domains, the relationships between them, and federation across boundaries is yet another challenge that will be discussed in a separate blog post.