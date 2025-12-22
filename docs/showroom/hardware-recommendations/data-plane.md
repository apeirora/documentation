---
sidebar_position: 2
title: Data Plane Hardware
---

The Data Plane footprint is determined by the required performance and horizontal scalability.
The hardware recommendations for Data Plane are shared between CobaltCore and IronCore and will need to be adapted based on the actual workload profiles that need to be supported in the specific target setup.
For simplicity in procurement, operations, and management of resources, it should be considered to use the same hardware specifications for control and data plane servers.

## Compute Data Plane

General Purpose Compute Pod nodes are designed to provide flexible, scalable computing resources suitable for a wide range of workloads, including virtualization, container orchestration, and cloud-native applications.
Typical hardware configurations for these nodes include a high-core-count, single-socket server processor (such as the latest Intel Xeon or AMD EPYC CPUs) with 128 or more cores, paired with substantial system memory, commonly 512GB RAM or higher, to support resource-intensive tasks and multiple virtual machines or containers simultaneously.

Storage is generally provisioned with fast, reliable NVMe SSDs (often 1TB or higher) for rapid system boot and efficient handling of local workloads.
High-speed networking is critical for these nodes, so dual 100G SmartNICs are frequently used to provide robust throughput, low latency, and offload network processing tasks (for example, using technologies like NVIDIA BlueField-3 or Mellanox ConnectX series).
Additional 1G Base-T Ethernet ports are often included for management or out-of-band access.

For data center deployments, compute pod nodes are typically designed to maximize density and power efficiency, allowing up to 16 or more nodes per standard 10kW rack, depending on specific power, cooling, and workload requirements.
These generalized specifications ensure that the compute pods can meet the demands of modern enterprise IT environments and scale effectively as business needs evolve.

## Storage Data Plane

A typical storage node in modern data center environments is designed to deliver high-capacity, high-throughput, and reliable storage services for a variety of applications, such as distributed file systems, object storage, and database backends.
These nodes commonly feature a high-core-count server processor, such as an AMD EPYC or Intel Xeon CPU, with at least 32 to 64 cores (and corresponding threads) to handle intensive I/O and background processing tasks.
System memory is provisioned generously, often ranging from 256GB to 512GB or more, to support caching, metadata operations, and smooth performance under heavy workloads.

Storage nodes typically use fast NVMe SSDs for both system boot (commonly 1TB or higher) and bulk storage.
Bulk storage capacity is provided by multiple high-capacity NVMe drives, often 8 to 24 drives per node, with individual drive capacities commonly between 8TB and 16TB, depending on workload and budget.
These drives are generally selected for their endurance and performance characteristics appropriate to the expected read/write mix.

For network connectivity, storage nodes are equipped with high-speed interfaces, such as dual 100G QSFP28 ports, to support rapid data transfer and minimize bottlenecks in distributed storage architectures.
Additional 1G Base-T Ethernet ports are usually included for management and monitoring purposes.
In cost-sensitive deployments, hardware acceleration features like SmartNICs may be omitted, relying instead on standard network interface cards to balance performance and budget.

To optimize for data center density and power efficiency, storage nodes are designed to maximize the number of units per rack, often supporting 12 to 18 nodes per standard 10kW rack, with scalability in modular increments to match capacity and redundancy requirements.
This general specification ensures that storage nodes can be flexibly deployed in a wide range of enterprise and cloud environments, scaling efficiently as business needs grow.

## Mixed Data Plane

A typical combined compute and storage setup in modern data centers is designed to balance high performance, scalability, and efficient resource utilization.
These solutions often involve distributing compute and storage resources across multiple racks to optimize power consumption and provide flexible scaling options.

For the network layer, high-throughput leaf switches are commonly used to connect compute and storage nodes, ensuring low-latency data transfer and robust connectivity.
Out-of-band (OOB) management switches are included to enable remote monitoring and management of infrastructure components.

Storage nodes usually feature high-core-count server processors, such as AMD EPYC or Intel Xeon CPUs, with substantial memory allocations (typically 256GB to 512GB or more) to support intensive I/O operations and caching.
These nodes are equipped with hardware accelerators like SmartNICs or DPUs (e.g., NVIDIA BlueField), and utilize high-capacity NVMe SSDs for both boot and bulk storage.
Security and manageability features, such as TPM modules and BMC with Redfish support, are also standard in enterprise deployments.

Compute nodes are designed for high parallel processing capability, often employing dual-processor configurations (e.g., dual Intel Xeon CPUs) with a large number of cores and significant RAM (up to several terabytes per node) to handle demanding workloads.
These nodes may also incorporate hardware accelerators for networking and storage offload and are provisioned with fast NVMe storage for local data access.

By modularly combining compute and storage resources across racks, organizations can scale their infrastructure in units that balance processing power, storage capacity, and network throughput.
This approach supports a broad range of workloads, from distributed storage systems and virtualization to high-performance computing and data analytics, making it well-suited for both enterprise and cloud data center environments.

## Network Data Plane

For CobaltCore deployments we recommend a dedicated network pod (whereas for IronCore we recommend deploying the network data plane on the compute nodes).
A typical hardware specification for such a pod includes the following components:
- Top-of-Rack (ToR) Switches: Multiple high-throughput ToR switches (commonly 2–4 per pod) provide primary network connectivity for compute, storage, and other devices within the rack. These switches often support high-speed Ethernet (e.g., 25/40/100/400GbE) to ensure low-latency and high-bandwidth communication between nodes.
- Tenant Switches: One or more switches dedicated to tenant or customer network segments, enabling secure and isolated networking for different workloads or clients within the data center.
- Load Balancers: Hardware or virtual load balancers (typically 2 per pod for redundancy) are included to distribute traffic efficiently across servers and services, enhancing reliability and performance.
- Console Access: Dedicated console servers or devices provide out-of-band management and remote access for troubleshooting and maintenance of network devices and servers.
- Switch Management: A management switch or network interface aggregates out-of-band management traffic, supporting centralized monitoring, configuration, and control of infrastructure components.

This modular pod-based architecture enables flexible scaling, robust fault tolerance, and streamlined management.
The actual number and specification of devices may vary based on the data center's size, workload requirements, and specific use cases, but the general principle is to provide a balanced, redundant network foundation for efficient and secure operations.

## AI Training and Inference Data Plane

A typical hardware specification for **AI training pods** in modern data centers is designed to deliver high computational power, robust memory bandwidth, and scalable network connectivity to support demanding machine learning and deep learning workloads.
- GPU Acceleration: AI training nodes commonly feature multiple high-end GPUs (such as NVIDIA H100, H200, A100, or AMD MI300 series), each equipped with large amounts of high-bandwidth memory (HBM2e or HBM3/3e, typically 40GB–141GB per GPU). These GPUs are selected for their performance in parallel processing and support for advanced features like mixed-precision (FP8, FP16) and Multi-Instance GPU (MIG) capability, which allow efficient resource partitioning and flexible scaling.
- CPU Configuration: AI training servers utilize powerful server-grade CPUs, such as Intel Xeon Scalable or AMD EPYC processors, providing high core counts and support for large memory capacities. While the CPU is not the primary compute resource for training, it is essential for data preprocessing, orchestration, and feeding data to GPUs efficiently.
- System Memory: These nodes are typically equipped with substantial RAM (512GB or more, fully populated) to ensure fast data access, caching, and support for large-scale deep learning models.
- Storage: Fast NVMe SSDs (1TB or larger) are standard for the operating system and local data staging. Additional high-capacity storage may be included for datasets, model checkpoints, and logs.
- Networking: High-speed network interfaces, such as 100G QSFP28, InfiniBand, or Ethernet, are used to enable rapid data transfer between nodes and to storage systems. Multiple network ports and redundancy are often included for reliability and to support distributed training.
- Form Factor and Power: Due to the high power consumption of modern GPUs, AI training pods are generally limited to a low number of units per rack, depending on power and cooling capabilities.
- Software Ecosystem: NVIDIA GPUs are frequently chosen for their mature software ecosystem, including CUDA, cuDNN, and broad compatibility with popular AI frameworks (such as TensorFlow, PyTorch, and MXNet). This ecosystem provides significant advantages in terms of optimization, performance, and community support.
- Security and Manageability: Enterprise deployments often include features like TPM modules for hardware security, BMC with remote management capabilities, and support for industry-standard protocols.

Overall, the hardware specification for AI training pods is driven by the need for maximum GPU performance, high memory bandwidth, scalable networking, and robust software support to accelerate AI research and production workloads in both enterprise and cloud environments.

A typical hardware specification for **AI inference pods** is designed to deliver efficient and reliable performance for running trained machine learning models in production environments.
These nodes generally feature a combination of high-core-count CPUs and multiple GPUs optimized for inference workloads, as well as robust memory, fast storage, and scalable networking.
- CPU Configuration: AI inference servers commonly use server-grade processors such as Intel Xeon Scalable or AMD EPYC, with high core counts (often exceeding 64 cores) to handle parallel inference requests and manage orchestration tasks. Features like Trusted Execution Technology (TDX) and TPM modules are often included for enhanced hardware security.
- System Memory: Nodes typically have substantial RAM (ranging from 256GB to 1TB, fully populated) to support fast data access and caching, which is essential for low-latency inference operations.
- Storage: Fast NVMe SSDs (1TB or larger) are standard for the operating system and local data staging, ensuring rapid response times for loading models and processing data.
- GPU Acceleration: AI inference nodes may be equipped with multiple high-performance GPUs, such as NVIDIA L40S, A100, H100, or comparable AMD models. Each GPU typically offers 24GB to 48GB of GDDR6 or HBM memory, supporting mixed-precision computation and optimized for inference throughput. Configurations may include up to 8 GPUs per node, with rack density often limited by power and cooling considerations (e.g., up to 4 nodes or 32 GPUs per standard rack).
- Networking: High-speed network interfaces (such as 25G/100G Ethernet or InfiniBand) are included to facilitate fast communication between nodes and external systems, supporting distributed inference and load balancing.
- Form Factor and Power: To accommodate power and cooling requirements, inference nodes are typically deployable in standard data center racks without requiring specialized infrastructure. Rack density may be constrained to ensure optimal reliability and efficiency.

Overall, AI inference node hardware is selected to balance high-throughput, low-latency inference, scalability, and reliability, making them suitable for deployment in both enterprise and cloud data centers.
The market is evolving quickly and these recommendations must be considered with current trends and recent hardware developments in mind.
