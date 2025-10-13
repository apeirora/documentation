---
sidebar_position: 1
title: Hosted Control Planes
---

A notable evolution and special case in multi-cluster federation architecture is the concept of **Hosted Control Planes (HCP)**, originating from the idea of [Kubeception](https://gardener.cloud/docs/getting-started/architecture/)[^1], that is [recursively](./..//control-planes/index.md#interactions-of-planes) deploying Kubernetes with or in Kubernetes. With HCP the control and data plane components are hosted as tenant workloads in the worker plane of another cluster, a so-called host or seed cluster. Notably, HCP at its core is a Control-Plane-as-a-Service offering. The HCP approach offers:

- **Cost Efficiency**: Organizations can reduce operational overhead and costs associated with maintaining dedicated cluster infrastructure. Instead of dedicating entire virtual machines to control plane components, HCP runs these components in containers within Kubernetes in a multi-tenant fashion.
- **Faster Provisioning**: HCPs enable quicker cluster provisioning times, as the control and data plane can be treated like any other cloud-native component deployment.
- **Security Optimizations**: With the planes managed [separately](./../control-planes/crt.md), HCP enhances security, including strong isolation boundaries between control and work plane.
- **Cloud-Native Benefits**: Kubernetes is the cloud-native reference system for automating deployment, scaling, and management of containerized software. As Kubernetes itself is (containerized) software, we inherit all cloud-native advantages and benefits by using Kubernetes to deploy, host, and operate Kubernetes.

<ApeiroFigure src="/multi-cluster-federation/img/hcp.svg"
  alt="Hosted Control Planes"
  caption="Hosted Control Planes"
  width="100%"/>

Learned Kubernetes skills become portable across all layers of the cloud stack; from the technical infrastructure to the platform and service layers.

[^1]: [KubeCeption! A Story of Self-Hosted Kubernetes](https://www.youtube.com/watch?v=EbNxGK9MwN4) and [Turtles All the Way Down: Inception for Kubernetes](https://www.youtube.com/watch?v=DFz9qhUvO3U).

## Managed Kubernetes Provider

The HCP architecture[^2] plays a crucial role in building Managed Kubernetes-as-a-Service offerings, which form an indispensable platform runtime service. This cloud-native underlay service supports application and service teams with universal on-demand runtimes (Kubernetes offers highly useful abstractions for their business needs). Portability features allow using Kubernetes as a lingua franca across different infrastructure providers. This underlay allows for other platform services to be offered and operated, forming the basis of a distributed Cloud Operating System (COS).

[^2]: Hosting Control Planes can be implemented with or without Kubeception. Any qualified platform can be instrumented to provide the host environment (cf. [MKE](https://d2iq.com/blog/introducing-mesosphere-kubernetes-engine-mke) or [Docker](https://www.docker.com/resources/kubernetes-and-docker/)).

Automated operations and enterprise-readiness at scale are a key factor for Managed Kubernetes-as-a-Service, as depicted by the tip of the iceberg idiom:

<ApeiroFigure src="/multi-cluster-federation/img/operating-apps.png"
  alt="Operating K8s"
  caption="Operating K8s"
  source="Gardener documentation"
  width="100%" style="max-width: 300px;"/>

For key considerations, the simple HCP approach does not suffice. Forming a distributed COS with scalable Kubernetes-as-a-Service will require the versatility to dynamically create and manage host or seed clusters, potentially on multiple (heterogeneous) infrastructure providers and/or regions, the ability to operate autonomously (auto-scaling, auto-updating, self-healing, ...), and many more. The required enterprise-grade management business logic is typically captured in a product (or project) in its own right.
