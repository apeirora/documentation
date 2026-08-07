---
sidebar_position: 4
title: Data and Control Plane State
---

In [Kubernetes Implementation Design](./kid.md), we discussed the conceptual interplay between data, control, and work planes, as implemented in Kubernetes. In the following we discuss how state plays a crucial role for backup, restore, migration and pivoting.

## State

In Kubernetes the state of the control plane is fully captured within the data plane and persisted primarily with technologies like etcd. This plane serves as the shared repository for all digital twin resources, which function as a virtual representation of the real-world environment.

The data plane state can be backed-up and later restored by
1. securing the data and config files of the persistency technology (e.g., etcd or RDBMS),
2. capturing the underlying volume or block-storage, potential quiescening the database while using advanced snapshot mechanisms, or
3. saving the logical Kubernetes resources via the API level, which makes it independent of the technology and therefore fully portable.

<ApeiroFigure src="/control-planes/img/state.svg"
alt="Securing State of the Data Plane"
caption="Securing State of the Data Plane"
width="100%"/>

:::info Data Plane State vs. Cluster State

Here, we are only focused on the state of all controllers associated in a control plane. For a full Kubernetes cluster backup and restore, the workloads that have produced state in own block or object storage also need to be considered.

:::

Popular tools in the Kubernetes ecosystem are [Velero.io](https://velero.io/), or the CNCF project [k8up.io](https://k8up.io/).

## Operations with State

By conceptually separating the control plane from the data plane, we can devise operations on the system, which can replace, migrate, pivot the planes (even while running) without breaking the logic, as long as the two are correctly reconnected.

### Live Migration

Control Plane Migration is a key feature for enterprise-grade [Managed Kubernetes-as-a-Service](../multi-cluster-federation/managed-kubernetes-as-a-service.md) solutions, designed to safely move a Kubernetes cluster's control plane from one hosting cluster (source cluster) to another (target cluster). This process is crucial for maintenance, regional failovers, and infrastructure provider transitions.

<ApeiroFigure src="/control-planes/img/migrate.svg"
alt="Migration with State"
caption="Migration with State"
width="100%"/>

The migration process is governed by non-negotiable principles aimed at maintaining the continuous availability of the managed Kubernetes cluster and requires (non default) control plane extension maintainers to adhere to them.

Apeiro's default Kubernetes-as-a-Service solution Gardener has specific [documentation](https://gardener.cloud/docs/gardener/extensions/migration/) on this topic for extension maintainers and operators.

### Pivoting

Pivoting, similar to migration, is an architectural concept enabled by the recursive nature of the planes and is often required in bootstrapping clusters.

For example, after setting up a data and control plane in a bootstrap cluster (in a donor cloud or on a laptop) connected to a remote work plane, the pivoting process moves the state and planes into the remote work plane, handing over the management to itself (and thereby making it self-reliable).

<ApeiroFigure src="/control-planes/img/pivot.svg"
alt="Pivoting from a boostrap cluster"
caption="Pivoting from a boostrap cluster"
width="100%"/>

Pivoting solves the "chicken-and-the-egg" problem for how to utilize a declarative Kubernetes API to create the very Kubernetes cluster that you are managing.

[Cluster API](https://cluster-api.sigs.k8s.io/) (CAPI) applies the core principles that made Kubernetes successful to cluster management itself. CAPI supports the [pivoting process](https://cluster-api.sigs.k8s.io/clusterctl/commands/move) with its command-line utility `clusterctl`, specifically through the `clusterctl move` command. CAPI provides functional building blocks for teams to build platforms bottum-up.

Gardener, bootstrapped within a prefabricated [garden cluster](https://gardener.cloud/docs/glossary/#gardener-glossary) and providing an end user optimized "[cluster api experience](https://gardener.cloud/docs/getting-started/shoots/)" from a platform perspective, is enhancing its capabilities to support setting up autonomous clusters with its command-line utility [`gardenadm`](https://gardener.cloud/blog/2025/06/06-25-introducing-gardenadm-bootstrap-for-autonomous-shoots/#introducing-gardenadm-bootstrap-for-autonomous-shoots). The `bootstrap` command uses and automatically pivots from a KinD cluster.
