---
title: Managed Service Provider Pattern
sidebar_position: 1
---

Unlike an on-premise environment, a cloud-based environment requires a high level of automation.
Manual installation, customization, and operation of services by personnel should be absolute exceptions.

In ApeiroRA, <Term>service providers</Term> are responsible for automating the lifecycle of <Term>capabilities</Term>.  
They can also leverage other <Term>services</Term> to implement a capability. 
For instance, if a service provider of a database requires a Kubernetes cluster for deployment, it doesn't need to manage the cluster itself. 
Instead, it can utilize another service that provides the cluster.

One key challenge with this architectural approach is its **locality and lack of scalability in a globally distributed environment**.
The number of capabilities that can be managed is **limited by the potential size of the <Term>service runtime</Term>**, for example a Kubernetes cluster.  
Furthermore, there is **no fundamental runtime capable of spanning across regions**.
All capabilities must operate in a designated location, which may not align with the location of the consumers application.
This situation poses challenges for services where factors such as latency, bandwidth, and legal requirements can be critical.
Therefore, it is **highly recommended to support multiple service runtime environments for capabilities** in a service provider architecture.  

Essentially, the service provider should have the ability to deploy a capability close to the consumer's application when necessary.
The term "close" may vary in its definition; for instance, to minimize latency, a database instance should be hosted in the same data center as the application.
Meanwhile, other services may need to be located in the same country as the application to comply with legal requirements.

To address this problem, the service management needs to **manage multiple <Term>service runtimes</Term>**.  
It should leverage another service provider for the appropriate service runtimes.
As a result, multiple service runtimes are available to potentially host new capabilities, enhancing scalability and regional distribution.

The following sections outline the "**Managed Service Provider Pattern**" that allocates the responsibility of distributing capabilities to multiple controllers, facilitating scalability and regional coverage.
The two main components are the <Term>service coordinator</Term> and <Term>servicelets</Term>.

<ApeiroFigure src="/services/img/msp.svg" 
  alt="Managed Service Provider" 
  caption="Managed Service Provider"
  width="50%"/>

## Service Coordinator

A **service coordinator** is a central component of a <Term>service provider</Term>.
It comprises a <Term>service scheduler</Term> and a <Term>service runtime manager</Term>.


### Service Scheduler

A capability is typically not requested with a predetermined target service runtime.
Instead, it is the task of the **service scheduler** to **identify and assign an appropriate service runtime** that can host the new (unscheduled) capability.

The service scheduler searches for unassigned capabilities within the <Term>service orchestration environment</Term>, examines their requirements and constraints, and then prioritizes and identifies an appropriate service runtime for them.
This scheduling process is based on constraints or requirements outlined in the <Term>resource</Term> document of the capability and the features of the available service runtimes, such as load, capacity, location, or topology.  
If no suitable service runtime is found — such as when no existing runtime is available in the required location for deployment — the <Term>service runtime manager</Term> system is triggered to create a new service runtime.

Once an appropriate service runtime is identified, the service scheduler assigns the capability to the selected service runtime by updating its resource document with the identifier of the runtime.  
Since the assignment is part of the resource document, a <Term>service consumer</Term> can even prefill this field to explicitly choose a dedicated service runtime if it is already known to them.

After the assignment, a <Term>servicelet</Term> picks up the resource and executes its internal implementation tasks to bring the capability to life on the selected service runtime.
This could involve, for example, deploying database software on the selected Kubernetes cluster.


### Service Runtime Manager

To be scalable in a cloud environment, it is not sufficient to simply increase the number of service runtimes to a static value.
Depending on the load situation and the constraints described by the capability resource document, it might not be possible for the service scheduler to assign an appropriate service runtime to a capability.

Such a situation can be addressed by an additional component, the **service runtime manager**.
This is a component **responsible to manage the lifecycle of service runtimes**.

The service runtime manager handles such cases by ordering and configuring additional service runtimes according to the constraints of unassigned capability requests.
It also removes these runtimes when they are no longer required.

To fulfill this task, it typically leverages another service provider capable of providing the necessary technical service runtimes required to host capabilities.
The service runtime manager orders these runtimes and configures them to be suitable for hosting capabilities.
This involves deploying an appropriate <Term>servicelet</Term> for the new runtime, which will then take responsibility for the capabilities assigned to it.  


## Servicelet

All spawned service runtimes could potentially be managed by a central management component.
In this approach, once a new capability has been scheduled, a central component would deploy it on the assigned service runtime.
However, this method may eventually lead to scalability issues.  
Additionally, it is not feasible to support fenced or hybrid environments without additional, often manual, network setups because a simple central manager requires direct access to the service runtimes it manages.

The *Managed Service Provider* pattern shifts the responsibility of deploying capabilities to a component known as "**servicelet**".  
A servicelet operates on or near the service runtime(s) it manages.
For example, if the service runtime is a Kubernetes cluster, the same runtime can be used to deploy both the servicelet and the capabilities.  
The servicelet monitors the service orchestration environment to **identify resources that need deployment on these runtimes, and it either initiates or carries out the installation process**.  
Furthermore, the servicelet is tasked with reporting the status of the capability and updating all necessary data for the service consumer in the service orchestration environment.  
It also **relays the status of the service runtime(s)** to the service orchestration environment, effectively creating a <Term>digital twin</Term> for each service runtime.
The <Term>service scheduler</Term> then uses this information to determine the optimal distribution of new capabilities.

This pattern reverses the direction of requests, facilitating efficient management of both fenced and hybrid environments.
Additionally, it shifts the execution of operational business logic from the central service provider to controllers positioned at the edge.

*This pattern is inspired by the "sharded controller pattern" in Kubernetes.*