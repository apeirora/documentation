---
sidebar_position: -6
title: Getting Started
---

Start exploring the Apeiro Reference Architecture at different levels of the stack:
- [for baremetal](#getting-started-for-baremetal) with e.g. IronCore's Baremetal Automation
- [for existing infrastructure](#getting-started-for-existing-infrastructure) with e.g. Gardener
- [for existing Kubernetes clusters](#getting-started-for-existing-kubernetes-clusters) with e.g. Platform Mesh or Open Component Model
- [for existing workloads](#getting-started-for-existing-workloads) with e.g. Open Resource Discovery or Open Component Model

## Getting Started for Baremetal

Explore the following Apeiro components for baremetal:

- **[Baremetal Automation](https://ironcore.dev/baremetal/)** of IronCore - manage physical servers in a Kubernetes-native way.
- **[IronCore-in-a-Box](https://github.com/ironcore-dev/ironcore-in-a-box?tab=readme-ov-file)** - evaluate IronCore on a local kind cluster for demo purposes.

## Getting Started for Existing Infrastructure

Explore the following Apeiro components for existing infrastructure:

- **[Gardener](https://gardener.cloud/docs/gardener/deployment/setup_gardener/)** - provide fully managed Kubernetes service for [several infrastructure providers](https://gardener.cloud/#everywhere-you-want-it); can also be [set up locally](https://gardener.cloud/docs/gardener/deployment/getting_started_locally/).
- **[Garden Linux](https://github.com/gardenlinux/gardenlinux?tab=readme-ov-file)** - run Kubernetes nodes with a small, auditable Linux image.

## Getting Started for Existing Kubernetes Clusters

Explore the following Apeiro components for existing Kubernetes clusters:

- **Platform Mesh** as interplay of [kcp](https://docs.kcp.io/kcp/main/setup/), [OpenMFP](https://openmfp.org/documentation/getting-started/), and [OpenFGA](https://openfga.dev/docs/getting-started/setup-openfga/overview) - provide, discover, and consume services with Kubernetes-native principles.
- **[Open Component Model](https://ocm.software/docs/getting-started/)** - deliver and deploy software across environments with this standard and the corresponding tooling.
- **[OpenBao](https://openbao.org/docs/install/)** - manage and store secrets and public key infrastructure securely.
<!-- - **[Open Managed Control Plane](#)** -  -->
<!-- - **[Konfidence](#)** -  -->

## Getting Started for Existing Workloads

Explore the following Apeiro components for existing workloads:

- **[Open Resource Discovery](https://open-resource-discovery.github.io/specification/introduction)** - publish application and service metadata with this open protocol.
- **[Open Component Model](https://ocm.software/docs/getting-started/)** - deliver and deploy software across environments with this standard and the corresponding tooling.

## Next Steps

- **Assemble Apeiro** - the [Showroom](./../showroom/scenarios.md) demonstrates how Apeiro assembles the individual components as a working environment.
- **Adapt Apeiro** - most components of Apeiro are extensible and adjustable, you can adapt them to your own infrastructure or environment constraints.
- **Pick and choose** - Apeiro is a toolkit and you can pick-and-choose the components that provide the most value for your use case.
