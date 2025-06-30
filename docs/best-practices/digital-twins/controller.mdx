---
title: Controller Pattern
sidebar_position: 2
---

<Term>KRM</Term> is tightly coupled with the architectural [controller pattern](https://kubernetes.io/docs/concepts/architecture/controller/), wherein the observed state is continuously reconciled with the desired state and the processed state is asynchronously reported back. The KRM describes the standardized structure and behavior of Kubernetes API operations on resources. This structure is defined in detail in the [API Conventions](https://github.com/kubernetes/community/blob/master/contributors/devel/sig-architecture/api-conventions.md) document and establishes the semantic concepts for API group, types/kind, metadata, names, ..., spec, and status. 

## Proportional-Integral-Derivative

The controller pattern can be likened to a **PID (Proportional-Integral-Derivative) Controller**[^1] in control systems engineering, where the goal is to maintain a desired state by continuously adjusting the system's behavior. Here's how the Kubernetes controller relates to the PID controller:

1. **Desired State vs. Setpoint**: In Kubernetes, the desired state is akin to the setpoint in a PID controller.

1. **Actual State vs. Process Variable**: The actual state in the cluster, which includes, for example, the actual number of running resources, their health, and other metrics, is analogous to the process variable in a PID controller. This is what the controller monitors to determine if adjustments are needed.

1. **Control Loop**: Both Kubernetes controllers and PID controllers operate in a control loop:
   
   - **Proportional (P)**: In Kubernetes, this would be the immediate response to a discrepancy between the desired and actual state.
   - **Integral (I)**: This aspect deals with the accumulation of past errors. In Kubernetes, controllers need to handle persistent issues or trends over time (e.g. `CrashLoopBackOff`), like gradually scaling resources based on historical load patterns.
   - **Derivative (D)**: This part predicts future behavior based on the rate of change. In Kubernetes, this is reflected in how controllers anticipate future resource needs or react to sudden changes in the actual state, e.g. scaling up or down based on predicted demand.

   <ApeiroFigure src="https://upload.wikimedia.org/wikipedia/commons/4/43/PID_en.svg" 
     alt="PID controller block diagram" 
     caption="PID controller block diagram"
     source="Wikipedia: PID controller"
     sourceLink="https://en.wikipedia.org/wiki/Proportional%E2%80%93integral%E2%80%93derivative_controller#Fundamental_operation"
     width="100%"/>

1. **Reconciliation**: Kubernetes controllers continuously reconcile the actual state with the desired state, much like a PID controller adjusts the control variable to minimize the error between the setpoint and the process variable. If there's a discrepancy, the controller takes action to correct it.
    
    In the analog world, the parameters must be tuned to match the desired industrial usage. With Kubernetes, the choreography of control must be aligned to minimize any potential oscillation of states.

    <ApeiroFigure src="https://upload.wikimedia.org/wikipedia/commons/a/a3/PID_varyingP.jpg" 
      alt="Controller theory: Proportional term" 
      caption="Controller theory: Proportional term"
      source="Wikipedia: PID controller"
      sourceLink="https://en.wikipedia.org/wiki/Proportional%E2%80%93integral%E2%80%93derivative_controller#Controller_theory"
      width="100%"/>
    
    PID controller reconcilation example for three values of the proportional parameter K<sub>p</sub> (with K<sub>i</sub> and K<sub>d</sub> held constant)

1. **Feedback Mechanism**: Both systems rely on feedback. In Kubernetes, this feedback comes from the shared repository of resources and their actual state hosted by the API server. Controllers typically use shared information to make decisions on what actions to take.

1. **Automation and Self-Healing**: Just as a PID controller automatically adjusts to maintain the setpoint, Kubernetes controllers automate the management of the resources, realizing a self-healing effect at the microscopic and immutable infrastructure at the macroscopic level.

1. **Extensibility**: While PID controllers are typically fixed in their function, Kubernetes controllers can be extended through custom controllers, to handle specific use cases with custom resources, allowing for a highly flexible and extensible system.


## Edge and Level Triggering

Edge and level triggering[^2] refer to different approaches for monitoring and responding to changes in the resource's state.  
**Edge triggering** in Kubernetes controllers focuses on reacting to specific events or changes, offering efficiency and precision in timing but potentially less resilience to failures in messaging.  
**Level triggering**, on the other hand, ensures continuous alignment with the desired state, providing robustness against missed events or transient issues but at the cost of potentially higher resource usage.

1. **Edge Triggering**: Edge triggering in Kubernetes involves reacting to specific changes or events. When an event occurs, like a failure in the status of a resource or a metric crossing a threshold, the controller is notified by an event that previously was subscribed to with a watch. It initiates a reconciliation.
   - **Advantages**: 
     - More efficient in terms of resource usage since it only reacts to changes, reducing unnecessary checks.
     - Can be more precise in timing, especially useful in applications requiring immediate response to changes.
   - **Disadvantages**: 
     - Less resilient to failures or missed events. If an event is missed or delayed, the system might not react appropriately, leading to incorrect outcomes.
     - Can result in incorrect outcomes if events are not processed in the correct order or if there are network issues.

1. **Level Triggering**: Level triggering involves continuously monitoring the actual state of resources against the desired state. Controllers periodically check the state and reconcile any discrepancies, ensuring the system remains in the desired state even if events are missed or delayed.
   - **Advantages**: 
     - More resilient to failures, missed events, or transient issues since it ensures the system's state matches the desired state over time.
     - Suitable for complex and unreliable environments where signals might be lost or retransmitted multiple times.
   - **Disadvantages**: 
     - Potentially less efficient as it requires constant monitoring and re-evaluation of the entire state, which can be resource-intensive.
     - May not offer the same level of precision in timing as edge triggering.

Controllers often use a hybrid approach, combining elements of both edge and level triggering.  
For instance, the `ReplicaSet` controller uses level-based reconciliation, periodically reading the full resource, to ensure the desired number of replicas is continuously maintained, but it also reacts to specific events (like a Pod deletion) with edge triggering to quickly adjust and react to arbitrary failures of resources that it owns.

[^1]: [Wikipedia: PID controller](https://en.wikipedia.org/wiki/Proportional%E2%80%93integral%E2%80%93derivative_controller)
[^2]: [Level Triggering and Reconciliation in Kubernetes](https://hackernoon.com/level-triggering-and-reconciliation-in-kubernetes-1f17fe30333d)