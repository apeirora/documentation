---
sidebar_position: 1
title: Hardware Recommendations
---

This section provides hardware recommendations for typical Apeiro cloud infrastructure deployments, reflecting the specifications and best practices that we applied in our internal showroom installations of Apeiro, based on the CobaltCore and IronCore BOS layers respectively.

The Control Plane forms the backbone of the Apeiro cloud, managing orchestration, monitoring, and API endpoints.
All Apeiro management components are deployed in the control plane.

The Work Plane is responsible for workload execution, storage, AI training/inference, and networking.
The specific buildout of the Work Plane depends on the requirements and expected workload to be handled on the infrastructure.

<ApeiroFigure src="/showroom/showroom-planes.png"
  alt="An illustration of the layout of the control plane and work plane, consisting of multiple pods"
  caption="The high-level control plane and work plane layout (shows optional components)"
  width="100%"/>

The recommendations focus on minimal and scalable footprints for both the [Control Plane](./control-plane.md) and [Work Plane](./work-plane.md), while illustrating options for deployments with one and three [availability zones](./scaling.md).
This ensures both robustness and flexibility for various enterprise workloads.
