---
sidebar_position: 3
title: Multi-Cluster Federation
keywords: [Multi-Cluster, Federation]
---

Kubernetes clusters are inherently designed as scalable runtime environments for containerized applications. While a single cluster can be dynamically scaled by adding or removing nodes (either manually or automatically), its ability to span across diverse geographical regions or multiple cloud providers is fundamentally limited. These limitations arise from several critical factors:

- **Network Latency and Bandwidth**: geographic dispersion introduces significant network latency and bandwidth constraints, impacting inter-node communication and application performance.

- **Data Gravity**: the challenge and cost associated with moving large volumes of data between distant locations can hinder efficient workload distribution.

- **Storage Replication Limitations**: Achieving consistent, low-latency replication of persistent storage across regions is often impractical.

- **Control Plane Bottlenecks**: the centralized nature of a single Kubernetes control plane can become a bottleneck at large scales or when managing resources across geographically disparate networks.

Given these considerations or constraints, there are several reasons for cloud services to manage and distribute their workload over multiple Kubernetes clusters with a multi-cloud and multi-region strategy:

- **Global Service Delivery**: offering services in or across multiple regions and leveraging a multi-cloud strategy for enhanced resilience, compliance, and reach.

- **Achieving Scalable Operations**: overcoming the practical limits on the number of nodes a single cluster can efficiently manage, allowing for larger overall infrastructure.

- **Enhanced Isolation and Security**: improve resource separation and implement tight security boundaries by distributing tenants dynamically across multiple, dedicated clusters if required.

- **Hybrid Cloud Integration**: seamlessly incorporate customer-managed (on-premise) clusters into a broader cloud-native strategy.

- **Disaster Recovery and Business Continuity**: design robust architectures that enable rapid failover and service continuity in the event of regional or local outages.

- **Regulatory Compliance**: adhere to data residency and sovereignty requirements by deploying workloads and tenants in specific judicial locations.


## Federation: Approaches to Multi-Cluster Management
Federation is the overarching concept for managing and orchestrating workloads across multiple Kubernetes clusters from a unified perspective. In the following, we focus only on the compute aspects of multi-cluster management. It is crucial to acknowledge that design choices for compute significantly influence and necessitate further technical considerations for network and storage concerns.

### Centralized Federation: The Traditional Model

The conventional approach to multi-cluster management is to set up a central cluster that acts as a global control plane, which then federates workloads to numerous remote payload clusters.
The central cluster's API is extended with specific federation APIs and also hosts the respective federation controllers. Hereby, the <Term>work plane</Term> for those controllers is the set of remote payload clusters, more precisely, the <Term>data planes</Term> of those clusters.
Numerous projects, such as [KubeAdmiral](https://kubeadmiral.io/), [Liqo](https://liqo.io/), [Karmada](https://karmada.io/), or platforms such as [KubeVela](https://kubevela.io/), are architected with common multi-cluster federation patterns.

<ApeiroFigure src="/multi-cluster-federation/img/federation.svg"
  alt="Federation with a central and payload clusters"
  caption="Federation with a central and payload clusters"
  width="100%"/>

This simple federation design has some direct challenges:

- **Complex backup and restore**:
  A generic, transactionally safe solution for backup and restore of distributed workloads across multiple payload clusters is probably not feasible. Rather, a workload specific solution needs to be considered alongside the federation faculty.

- **Limited separation of concerns**:
  The users typically get access to the central cluster, which is setup as Kubernetes cluster with a runtime that hosts the federation controllers. Since the entire container runtime API is discoverable, the central cluster must be adequately secured.

- **Scalability Bottlenecks**:
  Federation controllers have a central responsibility and need to keep connections to all the remote payload clusters, and be able to reconcile all payload cluster with increasing scale. The centralized design may also be prone to the [thundering herd](https://en.wikipedia.org/wiki/Thundering_herd_problem) problem.

- **Heightened Security Risks**:
  Credentials for all payload clusters need to be held centrally, as the federation controllers need broad access rights[^1].

  [^1]: Such environments are prone to cyber attack techniques such as [lateral movement](https://en.wikipedia.org/wiki/Lateral_movement_(cybersecurity)).

- **Network Access Constraints**:
  The central cluster must be able to initiate outbound conncetions/forward-connect to all the remote payload clusters.This often necessitates a common network (public or private) where payload clusters cannot be fully secured behind firewalls, potentially increasing their exposure.


### Federation with Agents: Decentralizing Control

Many of the aforementioned drawbacks of centralized federation, particularly concerning scalability, security, and network access, can be significantly mitigated by adopting an agent-based architecture. This approach draws inspiration directly from the fundamental design of Kubernetes itself, specifically how `kubelet` agents manage individual nodes within a cluster.

- **Sharded Responsibility**:
  Analogous to how kubelet controllers manage (remote) nodes, an agent-based approach decentralizes the federation objective. Each payload cluster hosts a dedicated agent, effectively sharding the management responsibility. This distributes the workload and reduces the burden on any single central component.

- **Reversed Access Direction**:
  With agents running _within_ the remote payload clusters, the network access direction is reversed from "outside-in" to "inside-out." Agents in the payload clusters initiate connections to the central control plane. This allows payload clusters to reside securely behind firewalls, simplifying initial registration and enabling the establishment of secure network overlays or peering as needed.

- **Enhanced Separation of Concerns**:
  The central cluster no longer requires direct access to the remote payload clusters' full control planes. Agents leverage in-cluster roles and authentication to interact with their respective payload clusters. This eliminates the need to store sensitive access credentials centrally. Furthermore, an agent's permissions in the central cluster can be precisely scoped to only the "digital twins" (representations of remote resources) it manages, minimizing the impact of a potential compromise.

It is crucial to differentiate between agents that merely proxy access to a payload cluster's full control plane and those that implement proper abstractions and delegation. The latter is preferred, as it facilitates true sharding of business logic and avoids centralizing latency-sensitive operations. The agent architecture should be utilized to design proper and useful abstractions, and establish delegation and sharding principles that effect high scalability without centralizing the complete business logic (with its latency challenges).

Building on Kubernetes design principles, the concept of a `clusterlet` emerges (inherited from the `kubelet` terminology). A `clusterlet` bundles all the controllers an agent requires to manage its assigned workload within a payload cluster. Similar to how `kubelets` register their nodes via Node objects, `clusterlets` announce their payload clusters (and their capabilities) within the central data plane using dedicated resource types. The intent of workload assignment to a specific payload cluster can then be intelligently delegated to a workload-aware federation scheduler.

<ApeiroFigure src="/multi-cluster-federation/img/clusterlets.svg"
  alt="Federation with clusterlet agents"
  caption="Federation with clusterlet agents"
  width="100%"/>


### Separating the Planes: A Robust Architectural Evolution

The most advanced evolution of this design involves a fundamental separation of the data plane[^2] from the runtime plane. With `clusterlets` operating within the payload clusters, the central cluster's function can be reduced to a pure data plane. This significantly enhances the system's security posture. In this configuration, the central data plane primarily consists of a generic API server and suitable persistence, devoid of the extensive resource types typically shipped with a native Kubernetes API server.

[^2]: <Project>kcp</Project> is the project used in ApeiroRA that delivers a clusterless, pure data plane. The idea itself is older and has evolved from initiatives like [Kubeception](https://www.youtube.com/watch?v=EbNxGK9MwN4), [Gardener](https://gardener.cloud/docs/getting-started/architecture/), and [Badidea](https://www.youtube.com/watch?v=fxqV24h_ocs).

For the <Term>controllers</Term> responsible for global federation aspects (e.g., federation schedulers, policy engines), a separate runtime Kubernetes cluster[^3] is utilized. This cluster is typically managed by administrators and does not require direct user access to the federation service, further isolating critical control logic.

[^3]: Remember, controllers may run on any work plane or runtime and be connected with a data plane (hosting the relevant digital twin repository) which is not necessarily the same data plane used by a Kubernetes cluster in unisono.

<ApeiroFigure src="/multi-cluster-federation/img/planes.svg"
  alt="Federation with separated planes"
  caption="Federation with separated planes"
  width="100%"/>

The benefits of this architectural plane separation are profound:

- **Superior Resiliency**: The data plane, containing only federation and workload resources, is decoupled from (not bound and intertwined with) the runtime cluster . This means the runtime cluster can fail and be replaced without impacting the integrity or availability of the federation data.

- **Independent Backup/Restore**: Backup and restore operations for the data plane can be performed independently of the runtime cluster, simplifying disaster recovery procedures.

- **Dynamic and Elastic Infrastructure**: This design enables the central federation function to dynamically provision remote payload clusters on-demand, much like a cluster autoscaler manages nodes for a single Kubernetes cluster. All clusters can be treated as "cattle" (disposable and easily replaceable) rather than "pets" (unique and requiring individual care), fostering a truly dynamic, resilient, and scalable federation infrastructure. A dynamic, managed Kubernetes-as-a-Service provider can be utilized to order remote payload clusters on-demand.

Projects like KCP embody the "clusterless" or pure data plane approach. This fundamental separation allows controllers to run on any work plane or runtime and connect to a data plane that hosts the relevant "digital twin" repository, independent of a specific Kubernetes cluster's data plane.

## Additional Domain Considerations for Multi-Cluster Federation

Beyond the core architectural patterns, several other critical domain-specific factors must be meticulously addressed for successful multi-cluster federation of business critical services. Just to name a few:

- Unified Policy Enforcement and Governance
- Comprehensive Observability and Monitoring
- Cost Management and Optimization:
- Federated Identity and Access Management
- Advanced Network Connectivity and Overlay Networks
- Optional: GitOps and Continuous Delivery
- Robust Disaster Recovery (DR)
- Business Continuity Planning (BCP)
- Stateful Workload Management
- Streamlined Developer Experience
- Vendor Lock-in Mitigation
