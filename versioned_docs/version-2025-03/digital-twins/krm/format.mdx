---
title: Wire and At-Rest Format
sidebar_position: 3
---

# KRM's Wire and At-Rest Format

Kubernetes uses KRM and its API wire format not just in transit, but also at rest, when storing a <Term>resource</Term> on disk, in version control, or in other storage. Rather than define an additional envelope structure for the serialization format to represent request parameters, the resource body has sufficient information to construct API calls to operate on the resource. An identical resource body is returned by a GET API call and can be stored and processed by other tools.  
For example, the resource, now called manifest, can be captured as past revision of a resource, recorded in an asset inventory system for audit purposes, or used as backup for disaster recovery. With immutable infrastructure the manifest can be promoted from development to test, staging, up to production.

All KRM-compatible client tools share a common pattern, spearheaded by `kubectl` reference implementation: the clients read the at-rest-manifest, parse the apiVersion, kind, namespace, and name fields from the body, and finally construct the API URL and POSTs the resource to the API server. The API server endpoint and credentials are identified from the applicable context of a `kubeconfig` file[^1].

[^1]: [Using the Kubernetes Resource Model for Declarative Configuration](https://itnext.io/using-the-kubernetes-resource-model-for-declarative-configuration-q-a-b032e5d8ecf5)
[^2]: [Omega: flexible, scalable schedulers for large compute clusters](https://static.googleusercontent.com/media/research.google.com/en//pubs/archive/41684.pdf)
[^3]: [Understanding Kubernetes Through Real-World Phenomena and Analogies](https://www.youtube.com/watch?v=GpJz-Ab8R9M)