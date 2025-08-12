---
sidebar_position: 1
title: Operator-based Installation & Update Procedures
keywords: [LCM]
---

With operator-based software lifecycle management, installation and upgrade procedures are implemented with application-specific code rather than with general-purpose tools.

Such an operator is an individual piece of software that coordinates the necessary steps for installing or updating an application in a target environment[^1]. It considers an application-specific configuration description and the current state of the environment. With this information, the operator adjusts its procedures to bring the target environment into the desired state.

[^1]: Also see the [CNCF Operator White Paper](https://tag-app-delivery.cncf.io/whitepapers/operator/)

## Operators in Kubernetes

In a Kubernetes environment, the operator would be a custom controller and the configuration description would be a custom resource. The reconciliation loop in Kubernetes ensures that the operator regularly compares the current state of the target environment with the desired state and makes adjustments if necessary.

From a human operator perspective, both installing and updating an application becomes a uniform task that is a simple as deploying (i.e. `kubectl apply`-ing) the operator in the target environment.

## Operators in Apeiro

Apeiro recommends to implement operator-based installation and update procedures for its components.

Note that not all Apeiro components have adopted operator-based installation and update procedures yet.

## Four Principles

With operators and by adhering to the below four principles it is possible to shift left the responsibility for lifecycle management back from DevOps team to the development and product team, which can design the product and its installation/update requirements in lock step.

:::info Four Principles

1. **API First**

    Design rich, versioned APIs that enable management and configuration holistically. Consider its evolution over time without breaking changes. Avoid passing unstructured and untyped data.

2. **Declarative API**

    Design declarative APIs using desired states. Remodel imperative APIs. Embrace asynchronous responses with a standard pattern.

3. **Reconciling controllers**

    Implement reconciling controllers (or product-specific operators) that continuously monitor and align both the system’s desired configuration and its observed state, automatically correcting deviations. Implement any supportive complex migration and upgrade logic as intrinsic part of the controller. Continuously push the system towards the desired state.

4. **Data and Metadata in Data Plane**

    Support emergence by ensuring that all configuration data and metadata is queryable via API (with a consistent model). This empowers others to develop APIs and controllers on top of existing functionality in unforeseen ways.

:::

With these four principles, the actual controller implementation behind a versioned API contract can be exchanged without breaking changes. This is a key feature to future-proof investments in lifecycle management.


## More Information

Our blog post [Lifecycle Management - Configuration and Installation Reconsidered](/blog/2025/03/05/lcm-configuration-installation-reconsidered) discusses the approach in depth. It explains the popular Infrastructure as Code paradigm and why we consider the Operator approach, also known as Infrastructure as Data or Configuration as Data, to be more suitable to handle the complexities of modern Cloud applications.