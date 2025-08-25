---
title: "Garden Linux: Enabling AI on Kubernetes with NVIDIA GPUs"
authors:
  - pavel-pavlov
  - darren-hague
tags:
  - kubernetes
  - gardener
  - gardenlinux
---

## AI and Kubernetes: Unlocking Business Innovation

Artificial Intelligence (AI) has become essential for business innovation, enabling companies to unlock new revenue streams, automate processes, and make data-driven decisions automatically and at scale.

There is industry-wide agreement that Kubernetes provides an ideal platform for running AI workloads (see [Cloud Native AI Whitepaper](https://www.cncf.io/reports/cloud-native-artificial-intelligence-whitepaper/)). Furthermore, the CNCF community is in the process of defining infrastructure level [AI Conformance](https://github.com/cncf/ai-conformance) which will make Kubernetes ubiquitous for AI workloads.

But for Kubernetes to support GPUs, you need the worker nodes' operating systems enabled with the right GPU drivers and associated access frameworks.

<!-- truncate -->

It may seem like just an obvious, pragmatic, and necessary requirement at the infrastructure level, but embedded in the fully open-source Apeiro Reference Architecture, governed and supported by (industry) members of the [NeoNephos Foundation](https://neonephos.org), its impact is substantial: **Apeiro freely empowers any organization or consortia seeking to build sovereign, modern datacenters for leveraging AI**.

Participation and contributions are not only welcome, but directly connect to the broader joint AI imperative of business.

## Simplifying NVIDIA GPU Support in Gardener

Easier said than done, there is significant operational complexity to consider: multi-cloud, hybrid environments, different hardware, diverse operating systems, complex driver management, and varying cloud provider configurations.

In Apeiro, we offer [Gardener](https://gardener.cloud) and [Garden Linux](https://github.com/gardenlinux) to tackle such operational complexity. With the [NVIDIA GPU Operator](https://github.com/NVIDIA/gpu-operator), we can provide a unified AI-conformant Kubernetes platform that works across any infrastructure with [NVIDIA Data Center GPUs](https://www.nvidia.com/en-us/data-center/data-center-gpus/).

## Understanding the NVIDIA GPU Operator

The NVIDIA GPU Operator automates GPU support in Kubernetes by deploying all the required software components (drivers, CUDA, device plugins, etc.) in the right [ABI-compatible](https://en.wikipedia.org/wiki/Application_binary_interface) versions. It eliminates any manual GPU driver installation and configuration, and enables GPUs as native Kubernetes resources. The GPU Operator is a Kubernetes-native operator with custom resource definitions. Furthermore, it ensures consistent GPU functionality across different hardware nodes and configurations, while enabling automatic updates, scaling, and troubleshooting through standard Kubernetes APIs.

<ApeiroFigure src="/img/blog/2025-08-25-nvidia-gpu-enablement-gpu-operator.png"
  caption="NVIDIA GPU Operator visualization in layers"
  source="docs.nvidia.com"
  sourceLink="https://docs.nvidia.com/datacenter/cloud-native/gpu-operator/latest/overview.html"
  width="100%"/>

## Enabling Garden Linux for the GPU Operator

The NVIDIA GPU Operator is architected in a modular way so anyone who wants to build GPU Driver containers can make the GPU Operator work with their operating system.
This is what we have done and we are making it publicly available. We used the public NVIDIA GPU Driver Dockerfile to create functional Garden Linux GPU Driver images. Please feel free to use them and collaborate by sharing feedback within the Garden Linux
[gardenlinux-nvidia-installer](https://github.com/gardenlinux/gardenlinux-nvidia-installer/) repository.

Garden Linux builds containers for the three latest active NVIDIA driver branches on all
Garden Linux versions that are in maintenance.

As of August 2025, this means containerized GPU drivers for the following combinations of major releases are available:

| Garden Linux | NVIDIA Driver   |
| -            | -             |
| [1592](https://github.com/gardenlinux/gardenlinux/issues/2161) | 570, 565, 550 |
| [1877](https://github.com/gardenlinux/gardenlinux/issues/2358) | 570, 565, 550 |

We automated the support directly in our build pipelines.

### Automating the Build

With guidance from NVIDIA[^thanks], Garden Linux's build and release process was adjusted to automatically publish the ABI-compatible container images required by the GPU Operator.

[^thanks]: Thanks to [Jathavan Sriram](https://www.linkedin.com/in/jathavansriram) from NVIDIA for the productive discussions.

<ApeiroFigure src="/img/blog/2025-08-25-nvidia-gpu-enablement-gpu-operator-publishing.svg"
  caption="Publishing workflow" />

An automated [workflow](https://github.com/gardenlinux/gardenlinux-nvidia-installer/blob/main/.github/workflows/update_version.yml) immediately creates a pull request for new driver versions. Hence, Garden Linux provides you with the latest GPU driver updates with zero effort! The results are published in Garden Linux's GitHub container registry [`ghcr.io/gardenlinux/gardenlinux-nvidia-installer`](https://github.com/gardenlinux/gardenlinux-nvidia-installer/pkgs/container/gardenlinux-nvidia-installer) with the [release](https://github.com/gardenlinux/gardenlinux-nvidia-installer/blob/main/.github/workflows/release.yml) workflow.

### Under the Hood
Orchestrating the publishing of the drivers, wrapped in the correct container format needed by the NVIDIA GPU Operator, requires two major steps:

1. The new driver is [compiled](https://github.com/gardenlinux/gardenlinux-nvidia-installer/blob/main/.github/workflows/build_driver.yml) against the specific container-based environment and the exact [Linux Kernel](https://kernel.org/) version used in Garden Linux.

2. After Step 1 is successfully completed, the new driver is compatibly [packaged](https://github.com/gardenlinux/gardenlinux-nvidia-installer/blob/main/.github/workflows/build_image.yml) as OCI container, which can be easily picked up by the NVIDIA GPU Operator at runtime (cf. "nvidia-driver" entry point).

### Example Helm Chart Configuration

The GPU Operator is installed using a [Helm Chart](https://helm.sh/docs/topics/charts/) provided in the NVIDIA Helm repository. Running the NVIDIA GPU Operator on Garden Linux requires a specific set of configuration values in [gpu-operator-values.yaml](https://github.com/gardenlinux/gardenlinux-nvidia-installer/blob/main/helm/gpu-operator-values.yaml).

For sovereign (and air-gapped) environments, you need to maintain your own repository correctly in the `driver.repository` value of the Helm chart.

## Connecting the Dots

### Prerequisites

The example below assumes you have:

1. Access to a [Gardener Project](https://gardener.cloud/docs/getting-started/project/) with sufficient permissions to create a Kubernetes cluster on your preferred platform.
2. Sufficient quota and permissions to create worker pools with data center-grade NVIDIA GPUs.
3. Understanding of how to use Gardener and command line terminal.

### Installation Steps

1. Create Kubernetes cluster.

    You can use any (and different) worker nodes with NVIDIA GPUs.

2. Install Helm

    Follow the [NVIDIA GPU Driver Getting Started Operator Installation Guide](https://docs.nvidia.com/datacenter/cloud-native/gpu-operator/latest/getting-started.html#operator-install-guide) to prepare Helm.

    It is important to add the NVIDIA Helm repository before proceeding to next step.


3. Install the NVIDIA GPU Operator

    You can further follow the guide from Step 2 or use the example from the [Garden Linux NVIDIA Installer](https://github.com/gardenlinux/gardenlinux-nvidia-installer). It is important to:

    - make sure the `gpu-operator` namespace exists before installation or if you execute the command below consider adding the Helm flag `--create-namespace` as alternative.

    - use Helm flag `--values` with value `https://raw.githubusercontent.com/gardenlinux/gardenlinux-nvidia-installer/refs/heads/main/helm/gpu-operator-values.yaml` as demonstrated below.

    ```bash
    helm upgrade --install -n gpu-operator --create-namespace gpu-operator nvidia/gpu-operator --values \
      https://raw.githubusercontent.com/gardenlinux/gardenlinux-nvidia-installer/refs/heads/main/helm/gpu-operator-values.yaml
    ```

    - By default you can use the latest supported version with the values file above, but if you really need it, you can change the `driver.version` property to any available version available in [Garden Linux NVIDIA Driver Package Repository](https://github.com/gardenlinux/gardenlinux-nvidia-installer/pkgs/container/gardenlinux-nvidia-installer).

4. Test GPU availability (optional)

    You can verify that GPU Operator has worked correctly using a sample job from the NVIDIA [k8s-device-plugin](https://github.com/NVIDIA/k8s-device-plugin) repository. Deploy the following GPU pod manifest:

    ```yaml
    apiVersion: v1
    kind: Pod
    metadata:
      name: gpu-pod
    spec:
      restartPolicy: Never
      containers:
        - name: cuda-container
          image: nvcr.io/nvidia/k8s/cuda-sample:vectoradd-cuda12.5.0
          resources:
            limits:
              nvidia.com/gpu: 1 # requesting 1 GPU
      tolerations:
        - key: nvidia.com/gpu
          operator: Exists
          effect: NoSchedule
    ```

    If everything is working correctly, the container log should include a message containing the message `Test PASSED`:

    <ApeiroFigure src="/img/blog/2025-08-25-nvidia-gpu-enablement-container-done.png"
      alt="Example of container logs"
      caption="Example of container logs" />

## Gardener Integration

With the NVIDIA GPU Operator working out of the box, we are planning to offer a complete end-to-end experience, by enabling the end user to order a Kubernetes cluster via Gardener with everything preset; as a Service. We will be working with the community and propose a Gardener Enhancement Proposal (GEP), with the goal to present the integrated experience as an extension like the one shown below.

```yaml
kind: Shoot
...
spec:
  extensions:
  - type: nvidia-gpu-extension
    providerConfig:
      cdi:
         enabled: true
         default: true
      toolkit:
         installDir: /opt/nvidia
      driver:
         imagePullPolicy: Always
         usePrecompiled: true
         repository: ghcr.io/gardenlinux/gardenlinux-nvidia-installer
...
```

## Demo Video

Watch our 5 minutes demo and see how it works end-to-end!

<ApeiroFigure src="/img/blog/2025-08-25-nvidia-gpu-enablement-youtube-cover.png"
  caption="5-minute demo video on YouTube"
  href="https://youtu.be/7_e7mTvQFsU" />

## Outlook and Support

Our Apeiro community encourages you to share feedback or report any issues you encounter while using the NVIDIA GPU Operator on Garden Linux. Please open an issue in the [gardenlinux-nvidia-installer](https://github.com/gardenlinux/gardenlinux-nvidia-installer/issues) repository.

The team values your contributions and is eager to hear from your experience.
