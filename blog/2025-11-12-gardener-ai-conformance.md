---
title: "AI Conformant Cloud Operating System for a Sovereign Europe"
authors:
  - vedran-lerenc
  - vasu-chandrasekhara
tags:
  - kubernetes
  - gardener
  - ai
---

We are thrilled to announce that Apeiro with its project [Gardener](https://gardener.cloud/) is one of the first reference architectures to achieve official [Kubernetes AI Conformance](https://www.cncf.io/announcements/2025/11/11/cncf-launches-certified-kubernetes-ai-conformance-program-to-standardize-ai-workloads-on-kubernetes/), as defined by the [Cloud Native Computing Foundation](https://www.cncf.io/). This significant milestone underscores our commitment to providing a robust, scalable, and reliable blueprint for running modern, resource-intensive AI and machine learning (ML) workloads in a sovereign European cloud-edge continuum.

<!-- truncate -->

<ApeiroFigure src="/badges/certified-ai-platform-color.png"
  alt="Certified AI Platform Logo"
  caption="Gardener is a CNCF-certified Kubernetes AI Platform"
  width="20%"/>

## **What is Kubernetes AI Conformance?**

As AI/ML applications become more prevalent and crucial for business, the need for standardized environments[^1] to run them has become critical. The CNCF's Kubernetes AI Conformance Working Group was established to address this need. It aims to define a clear, verifiable set of requirements that a Kubernetes distribution must meet to be considered "AI Conformant". In fact, equipped with these requirements CNCF established the [**Certified** Kubernetes AI Conformance Program](https://github.com/cncf/k8s-ai-conformance).

Similar to ISO[^2] standards, this conformance standard provides a trusted baseline for users, ensuring that a Kubernetes cluster is properly configured to handle the unique demands of AI workloads. It goes beyond basic Kubernetes conformance to verify specific capabilities related to hardware acceleration, drivers, and runtime environments, which are essential for the performance and stability of AI applications.

[^1]: The [Cloud Native Artificial Intelligence Whitepaper](https://www.cncf.io/reports/cloud-native-artificial-intelligence-whitepaper/) presents an overview of state-of-the-art AI/ML techniques implemented in the Cloud Native Artificial Intelligence (CNAI) ecosystem and industry.
[^2]: The [International Organization for Standardization (ISO)](https://www.iso.org/home.html) develops internationally recognized standards, such as the ISO 9001 for quality management and ISO 27001 for information security.

## **How the Apeiro Reference Architecture Delivers AI Conformance**

Achieving AI Conformance is based on the first requirements catalog published by the Working Group. Here's how our **Cloud Operating System with AI Conformant Cluster** meets these stringent requirements:

### **Natively Integrated GPU Support**

Managing GPU drivers across a fleet of machines is notoriously complex. A building block of our AI Conformance is therefore to abstract away this complexity for the user with automation[^3].

This ensures the correct drivers are installed and configured for your GPU nodes. Users no longer have to manually handle driver installations, version mismatches, or kernel module compilations. When you request a worker node with a GPU, the Operator ensures that it is ready for your AI workloads with the necessary drivers, software assets, and libraries, making the powerful hardware directly accessible to your Kubernetes pods.

[^3]: In Apeiro, we enabled the [NVIDIA GPU Operator](./2025-08-25-garden-linux-enabling-ai-workloads-with-nvidia-gpus). Other GPU hardware will be supported in a similar fashion. Our goal is to extend this powerful, hands-off approach to a broader range of hardware accelerators, further strengthening the hardware sovereignty of our users.

### **Meeting the Conformance Requirements**

The AI Conformance standard specifies a catalog of requirements that a platform must satisfy. The Apeiro Reference Architecture fulfills these by ensuring:

*   **GPU Discovery and Allocation:** Clusters built on the Apeiro blueprint correctly identify available GPUs on worker nodes and make them schedulable resources within Kubernetes. This allows users to simply request, for example, `nvidia.com/gpu` resources in their pod specifications.
*   **Driver and Runtime Integrity:** The conformance verifies that the correct drivers and container runtimes are in place to expose GPUs to containers. Our reference architecture guarantees that these components are correctly installed and versioned.
*   **Workload Execution:** By passing the conformance tests, the Apeiro blueprint proves that it can reliably run sample AI/ML workloads that utilize GPU acceleration, confirming that the entire stack - from the operating system to the Kubernetes control plane - is functioning correctly.

## **Benefits for our Industry Adopters**

The Apeiro initiative centers on digital sovereignty. By leveraging an open, community-driven standard endorsed by the CNCF and all its members, our adopters have the flexibility to run AI workloads in any supported environment, inheriting the compliance and conformance baked into the Apeiro Reference Architecture.

For developers and platform engineers building the next generation of cloud native infrastructure, Apeiro's AI Conformance provides tangible benefits:

*   **Simplified Operations:** Drastically reduces the operational burden of setting up and maintaining GPU-enabled Kubernetes clusters.
*   **Increased Reliability:** Provides a standardized, predictable environment, giving you the confidence to run production-grade AI workloads and contribute to a sovereign digital infrastructure.
*   **Faster Time-to-Value:** Enables you to focus on developing your AI models, pipelines, and applications instead of wrestling with infrastructure configuration, and thus accelerating innovation.
*   **Neutrally Governed and Open Source:** With the [donation](https://neonephos.org/introduction) of the Apeiro by SAP to the NeoNephos Foundation, the stewardship has fundamentally changed. This act placed all Apeiro projects under a neutral, vendor-agnostic governance model, which ensures that its future development (including the AI/ML focus) are influenced and managed collaboratively by a diverse community of members and industry adopters.

## **Further Reading**

*   [CNCF AI Conformance Working Group](https://github.com/cncf/ai-conformance)
*   [CNCF Kubernetes AI Conformance Specification](https://docs.google.com/document/d/1hXoSdh9FEs13Yde8DivCYjjXyxa7j4J8erjZPEGWuzc/edit?tab=t.0#heading=h.9j85ih1tpsk)
*   [Garden Linux NVIDIA Installer](https://github.com/gardenlinux/gardenlinux-nvidia-installer)
*   [Gardener AI Conformance Submission](https://github.com/gardener/gardener-ai-conformance)
*   [Gardener NVIDIA GPU Operator Installation Guide](https://github.com/gardener/gardener-ai-conformance/blob/main/v1.33/NVIDIA-GPU-Operator.md)
*   [Gardener AI Conformance Requirements and Demonstration](https://github.com/gardener/gardener-ai-conformance/tree/main/v1.33)
