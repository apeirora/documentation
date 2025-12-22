---
sidebar_position: 1
title: Control Plane Hardware
---

The minimal control plane footprint is designed for reliability and cost efficiency.
We do not include the required capacity to run other optional Apeiro services from the COS layer and above in this consideration for the control plane sizing.
Depending on the complete target scenario, additional capacity needs to be reserved to run Gardener and other services on the control plane.
This page focuses on the recommended size of the control plane for a plain installation of the BOS layer and bare metal automation to manage the infrastructure in the data plane that will carry the workload.

Additional sizing optimization for minimal footprint installations might be achieved by merging control and data plane into a single rack.
Our focus here is on a sustainable setup that can also be scaled out during productive operations, depending on increased resource demand.

## Bare Metal Hardware Specifications
The Control Plane of a pure bare metal setup that focuses on managing hardware resources without the additional IaaS capabilities requires a single rack for the complete stack.

The minimal setup for a bare metal offering includes:
- Management Nodes: Minimum of three servers to ensure high availability and redundancy for orchestration, monitoring, and API endpoints.
- Network Switch: One management switch for interconnecting control and data plane components, supporting both internal and external traffic.
- Compute Nodes: Two or more servers dedicated to workload execution and storage, sized according to anticipated resource demand.
- Storage: Shared storage system accessible by all compute nodes for persistent data and VM images.
- Firewall: At least one firewall for basic network segmentation and security between control, data plane, and external connections.
- Console/Management Access: One console for out-of-band management and troubleshooting.

This list presents the essential hardware components for a minimal yet scalable single rack deployment, combining both control plane and data plane functions for the Apeiro cloud infrastructure.
Please refer to the subsequent sections for more detail on the respective components.

## CobaltCore Hardware Specifications
The Control Plane of CobaltCore, i.e. BareMetal management plus IaaS functionality provided by OpenStack, consists typically of two racks, one for hosting the required network management functionality and one for providing the necessary compute power.

A typical **network fabric** pod for a Cobalt Core deployment in a modern data center environment generally consists of these key components designed to ensure robust connectivity, scalability, and high availability:
- Spine Switches: Usually three or more high-capacity switches that serve as the backbone of the network, interconnecting with all leaf switches to provide non-blocking bandwidth and low latency across the pod.
- Leaf Switches: Typically, two switches that connect directly to servers, storage devices, and other endpoints. The leaf-spine topology helps facilitate east-west traffic within the pod and supports scalable expansion.
- Core Switches: Two or more switches that aggregate traffic from the spine layer and connect the pod to external networks or additional data center pods, contributing to redundancy and load balancing.
- Firewalls: At least two firewalls are deployed for security, ensuring traffic inspection, segmentation, and protection against unauthorized access.
- Management Switch: A dedicated switch for out-of-band management, providing secure access to network and server management interfaces.
- Console Server: One or more console servers for centralized access to the serial management ports of network and compute devices, supporting remote troubleshooting and maintenance.

Specifications for each component may vary depending on performance requirements and vendor selection, but common features include support for high-speed interfaces (such as 100G QSFP28), redundant power supplies, and advanced network protocols (e.g., DMTF Redfish, VXLAN, EVPN).
This general architecture is designed to provide scalable, resilient, and secure networking for control plane and data plane operations in bare metal and IaaS environments.

A typical **compute pod** deployment is designed to deliver scalable, efficient, and manageable compute resources.
These pods commonly consist of a set of servers, network switches, and management components that together provide the necessary performance, connectivity, and operational flexibility for a wide variety of workloads.
- Compute Nodes: Usually between 8 and 32 servers per pod, each equipped with single- or dual-socket CPUs from leading manufacturers like Intel or AMD. These nodes often feature high core counts (ranging from 64 to 144 cores per socket), a substantial amount of RAM (256GB to 1TB per node), and fast local storage (such as NVMe SSDs) to support demanding applications. Single-socket configurations are preferred for lower power consumption and easier scaling, while dual-socket options are chosen for memory-intensive workloads.
- Network Connectivity: High-speed network interfaces, such as 25G, 40G, or 100G Ethernet ports, are standard for east-west traffic between compute nodes and for uplink to the broader network. SmartNICs (like NVIDIA Bluefield or Mellanox ConnectX) are often deployed to offload network processing, improve bandwidth, and reduce latency, especially in environments focused on virtualization, high-performance computing (HPC), or large-scale cloud operations.
- Top-of-Rack (ToR) Switches: Each pod typically includes two or more ToR switches. These switches aggregate traffic from the compute nodes and provide connections to the spine/leaf fabric of the data center for redundancy and high availability.
- Management Switch: A dedicated management switch is used for out-of-band management connections, allowing secure and reliable access to server and network management interfaces.

Support for standardized management protocols, such as DMTF Redfish, is recommended to provide vendor-agnostic, RESTful API-based hardware management.
This ensures seamless integration with automation tools and reduces complexity.
Compute pods are architected to be modular, allowing for easy expansion and maintenance.
Power efficiency, density, and cooling requirements are key factors in hardware selection.
Network topology is optimized for low latency and high bandwidth, supporting both control plane and data plane operations.

## IronCore Hardware Specifications
The Control Plane of IronCore consists typically of a single rack, holding management functionality for network, compute, and storage.

For **networking** in a modern data center compute pod, a typical stack includes a combination of high-performance switches and dedicated management infrastructure to ensure robust connectivity, redundancy, and operational flexibility:
- Spine Switches: Two or more high-throughput, low-latency switches (commonly 32-port or higher, supporting 100G Ethernet) serve as the backbone of the data center's leaf-spine architecture. These switches aggregate traffic from leaf switches and provide scalable bandwidth for east-west and north-south data flows. Popular models include those from vendors such as Edgecore, Arista, Cisco, or Juniper.
- Leaf Switches: Two or more top-of-rack (ToR) switches (often matching the spine switch in hardware family and supporting 25G or 100G uplinks) connect directly to compute nodes. These switches aggregate server traffic and uplink to the spine for high availability and load balancing.
- Out-of-Band (OOB) Management Stack: Dedicated OOB switches (both spine and leaf) and a console server provide secure, isolated management access to all infrastructure devices. OOB switches typically support a mix of 1G and 10G ports for management traffic, while the console server (from vendors like Perle, Opengear, or Lantronix) offers serial and network-based remote access to device consoles.
- Router Servers: Can share specification with the servers used for general management services. One or more high-performance x86 servers equipped with modern multi-core CPUs (such as AMD EPYC or Intel Xeon), large memory (e.g., 192GB+), NVMe SSDs, and multiple high-speed network interfaces (such as three or more dual-port 100G Ethernet NICs). These servers are used for routing, network services, or as network function virtualization (NFV) hosts, and often include features like TPM modules and support for Redfish or similar management standards.

This architecture ensures high throughput, redundancy, and a clear separation between production and management networks.
All network hardware should support advanced features such as Layer 2/Layer 3 switching, network automation (via APIs like DMTF Redfish), and hardware-based security modules for trusted operations.
The use of white-box or branded switches is common, with hardware selection driven by performance, compatibility, and support requirements.

For **management services**, it is recommended to deploy a set of dedicated management servers with robust hardware configurations to ensure reliable performance, security, and scalability.
A typical setup includes three or more management servers, each equipped with the following or equivalent specifications:
- Multi-core server-grade processor (such as AMD EPYC or Intel Xeon) with at least 32 cores to handle management workloads and virtualization tasks.
- Large memory capacity, typically 192GB RAM or higher, to support concurrent management operations and monitoring tools.
- High-performance NVMe SSD storage, around 3TB or more, for fast boot times, logging, and management software storage.
- Multiple high-speed network interfaces, such as dual-port 100G Ethernet adapters (e.g., Mellanox/ConnectX series), to ensure high availability and rapid management traffic handling.
- Additional network connectivity through 10G SFP+ and 1G RJ45 ports for versatile management network integration and out-of-band access.
- Hardware-based security features, including a TPM 2.0 module, for secure boot and trusted operations.
- Support for advanced management standards like BMC with Redfish API, allowing for remote and automated management of server hardware.

These management servers are typically deployed in a redundant configuration to provide high availability and are integrated with the broader out-of-band management stack, ensuring secure, isolated access to critical infrastructure devices.
Hardware selection should be based on compatibility with existing systems, support for automation, and the ability to scale as operational needs grow.
