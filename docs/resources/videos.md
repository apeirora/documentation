---
title: Videos
sidebar_position: 4
---

Short demo videos showcasing Apeiro components in action.

## Moving Workloads

This demo shows how Platform Mesh and KCP enable policy-driven workload placement across Kubernetes clusters.
Workloads are described as `SiteWorkload` custom resources with declarative placement constraints — such as requiring a specific region or preferring green-energy sites.
A Workload Placement Operator evaluates these constraints and schedules workloads to the matching target clusters automatically, without changes to the workload itself.

<SapVideo
  entryId="1_l3csbn4t"
  title="Moving Workloads – Make your workloads move like the wind"
  thumbnail="/img/showroom/video-moving-workloads.jpg"
  caption="Demo: policy-driven workload placement across Kubernetes clusters with Platform Mesh and KCP"
/>

## SimpleCluster Sovereign LLM – Bring Your Own Cluster

This demo illustrates the "two controls, one SaaS service" model: the provider manages the full lifecycle of the LLM service (upgrades, ops, status), while the customer decides where the workload and data actually run by supplying a kubeconfig Secret pointing to their own cluster.
The workload and data plane move to the customer-selected host; the SaaS contract and provider-managed lifecycle remain unchanged.

<SapVideo
  entryId="1_zl7y6186"
  title="SimpleCluster Sovereign LLM – Bring Your Own Cluster"
  thumbnail="/img/showroom/video-simplecluster-sovereign-llm.jpg"
  caption="Demo: sovereignty-preserving SaaS — customer-controlled runtime, provider-managed lifecycle"
/>

## One Chat App. Two Private Models.

This demo walks through a multi-layer architecture built on Platform Mesh: a chat application (Open WebUI) is connected to a private LLM via API bindings as custom resources — `LLMInstance`, `ChatUIInstance`, `APITokenRequest`.
The underlying model (e.g. TinyLlama) can be swapped for a stronger one by updating the `LLMInstance` CR, while the chat application and its API contract stay completely unchanged.
The four layers — consumer, provider API, and workload — are each hosted in separate clusters and interact only through the Platform Mesh API abstraction.

<SapVideo
  entryId="1_9vwkra8g"
  title="One chat app. Two private models."
  thumbnail="/img/showroom/video-chat-app-private-models.jpg"
  caption="Demo: model-agnostic chat application via Platform Mesh API contracts — swap the private LLM without changing the app"
/>
