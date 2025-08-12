---
title: Control through Choreography
sidebar_position: 2
---

Multiple separate resource abstractions and controllers, each with their reconciling control-loops, seemingly collaborate to achieve a desired emergent behavior (greater than the sum of all parts). The design of Kubernetes achieves control through choreography[^2][^3]. 

## Orchestration vs Choreography

Modern applications are typically built and run using a combination of cloud-native technologies, loosely coupled microservices, and operated with progressive release and lifecycle management.  
But how can loosely coupled or seemingly independent components be brought together? Two popular architecture patterns are Orchestration and Choreography. 

### Orchestration
    
Orchestration involves a central component, acting like a supervisor (or a conductor in an orchestra), which orchestrates the business logic or process flow between the other components.  
While orchestration leads to central control, simplicity, and easier observability, the introduction of a central component inadvertently leads to tight coupling and a rigid structure, in which adding, removing, or exchanging a component becomes challengingly complex.  
Furthermore, the central component can be a single point of failure. A possible way to compensate for failure is to preserve the state of the process with techniques such as [durable execution workflows](https://github.com/temporalio/temporal/tree/main/docs/architecture), or implementing the [SAGA](https://microservices.io/patterns/data/saga.html) transaction pattern in all participating components.
    
<ApeiroFigure src="/digital-twins/img/orchestrate.svg" 
    alt="Example Orchestration Flow" 
    caption="Example Orchestration Flow"
    width="100%"/>

### Choreography
    
On the other hand, choreography allows the components to manage their functions autonomously while contributing to the overall expected, but emergent, behavior.  
The structure is decentralized, there is no need for a central component, making the system more resilient. But it does however rely on a message broker or, as in the case of <Term>KRM</Term>, an API server that acts as one.  
Unlike the orchestrated approach with tight coupling, choreography allows to keep the loosely coupled architecture, the component structure, the business logic and flow can be easily augmented or changed. But collaboration amongst ever more components becomes complex to rationalize, multifaceted, making it harder to obtain a holistic understanding, and more difficult to troubleshoot. With reconciling controllers, an initiated process eventually stabilizes or reaches a failure state.
    
<ApeiroFigure src="/digital-twins/img/choreography.svg" 
    alt="Example Choreography Flow" 
    caption="Example Choreography Flow"
    width="100%"/>

The Kubernetes design is based on choreography, but can incorporate orchestration benefits. 

The collaborative behavior in Kubernetes can be likened to the [invisible hand](https://en.wikipedia.org/wiki/Invisible_hand) metaphor from economics: Kubernetes motivates individual controllers, acting in their "self-interest" (catering only to a specific concern), to produce a desired overall system behavior.  
This means that while each controller focuses on its own task, their collective actions result in a coordinated behavior, much like how individual, free, economic agents in a market, pursuing their own interests, contribute to the overall economic equilibrium. This design has been proven to be more robust than centralized systems.

[^2]: [Omega: flexible, scalable schedulers for large compute clusters](https://static.googleusercontent.com/media/research.google.com/en//pubs/archive/41684.pdf)
[^3]: [Understanding Kubernetes Through Real-World Phenomena and Analogies](https://www.youtube.com/watch?v=GpJz-Ab8R9M)