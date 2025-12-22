---
sidebar_position: 3
title: Availability Zones and Scaling
---

## Availability Zones

With a single Control Plane and Data Plane, only limited SLAs (Service Level Agreements) can be guaranteed, as the entire system relies on a single set of resources and is thus more susceptible to outages or failures.
To achieve higher SLAs and ensure greater system resilience, we recommend deploying multiple availability zones.

An availability zone is an isolated location within a data center region, designed with independent power, cooling, and networking to reduce the risk of simultaneous failures. By distributing workloads across at least three identical availability zones, you can significantly improve fault tolerance and disaster recovery capabilities.

This approach typically involves multiplying the Control Plane and Data Plane investments to create three separate, fully functional zones.
In addition, deploying multiple availability zones requires robust load balancing to distribute traffic and workloads evenly, as well as data replication strategies to ensure data consistency and availability even in the event of a zone failure.

Leveraging multiple availability zones is a best practice adopted by leading cloud providers to meet stringent uptime and reliability requirements for enterprise and mission-critical applications.

<ApeiroFigure src="/showroom/showroom-azs.png"
  alt="An illustration of the layout with multiple availability zones controlled by redundancy management"
  caption="Multi-AZ layout"
  width="100%"/>

## Scaling Options

### Control Plane

With the suggested setup, we expect the Control Plane to be appropriately sized for most data center environments, providing robust management and orchestration capabilities for routine operations.

However, if operational demands increase or the scale of deployments grows, you have the flexibility to adjust the Control Plane configuration.
Vertical scaling can be achieved by upgrading to more powerful nodes, which may include adding additional CPUs, memory, or storage resources to existing servers.

Alternatively, horizontal scaling is possible by incorporating additional racks, thereby increasing the number of nodes that share the workload and enhance redundancy.

This approach to rightsizing can be implemented proactively as part of scheduled hardware refresh cycles, aligning with the natural depreciation of equipment, or reactively in response to sudden surges in Data Plane demand.
This ensures that the Control Plane remains resilient and capable of supporting evolving infrastructure requirements without causing disruptions to ongoing services.

### Data Plane

The Data Plane can be scaled horizontally on demand by adding additional compute, storage, network, and AI nodes as needed based on the required capacity for the expected workload.
Horizontal scaling, also known as "scaling out," involves increasing the number of nodes or servers in the system rather than upgrading the hardware of existing nodes.

This approach enables organizations to handle greater workloads, improve fault tolerance, and maintain high availability.
As user demand or data volumes grow, new nodes can be seamlessly integrated into the infrastructure, allowing for near-linear increases in throughput and capacity without significant downtime. 
