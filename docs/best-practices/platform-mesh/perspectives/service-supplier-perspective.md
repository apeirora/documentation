---
title: Service Supplier Perspective
sidebar_position: 1
---

# Service Supplier Perspective

Let's explore what a supplier of a <Term>service</Term> needs to do to offer their service to <Term>account</Term> members of a <Term>service orchestration environment</Term>.


## Service Lifecycle API

First and foremost, the supplier needs to have a service to offer.
This service can be anything, as long as it meets one crucial requirement set by ApeiroRA: the lifecycle of a <Term>capability</Term> of the service must be controllable through ApeiroRA's declarative model.
In other words, the supplier must ensure that the creation, modification, and deletion of a <Term>digital twin</Term> in a service orchestration environment are translated into real-world actions.
In the context of cloud applications, capabilities should offer an API that the client applications and services can utilize.

However, an important [principle](../guiding-principles.md) of the reference architecture is that the lifecycle API and the capabilities business API must remain strictly decoupled.
While ApeiroRA imposes no constraints on the capabilities business API, it enforces guardrails for the lifecycle API, mandating the use of the <Term>Kubernetes Resource Model</Term>.


## Register Service in Marketplace

To make a service available, the supplier must register a <Term>service provider</Term>, which manages one or more services, in a <Term>service marketplace</Term>.
The registration should include all necessary information for potential consumers (such a description, API definitions, SLAs, etc.), as well as all technical details required to enable the service in a service orchestration environment.
The registration process also uses a declarative model. This means the supplier must provide a resource document describing the service.
This document will be picked up by a marketplace <Term>controller</Term>, which then provides all the necessary data (such as connection information and credentials) that the service provider needs to detect, access, and process orders.

Services can utilize other services from the same or a different service marketplaces.
For example, a service offering a database might need to deploy a Kubernetes cluster for each database installation.
This Kubernetes cluster could be provided by a service provider within the same service marketplace.
This approach enables the stacking of services and streamlines the development and deployment of higher-level services.


## Provide Services

A service marketplace is connected to one or more service orchestration environments.
The service marketplace and the service orchestration environments decide which services should be available to the service orchestration environment.
They may both filter the service catalog based on their own criteria.

Once the service is registered, <Term>service consumers</Term> can place their orders as described on the [previous page](developer-perspective.md).
The service provider is responsible for processing these orders.
To achieve this, a <Term>controller</Term> operated by the service provider monitors the service marketplace and the connected service orchestration environments.
Whenever a matching resource document is created, updated, or deleted, the controller must reflect those changes in reality.
What exactly this entails depends on the specific service being offered.


## Service Lifecycle

A supplier may change and expand a service offering over time, but reducing the scope or shutting down the service entirely can be difficult.
There may be contractual obligations between the supplier and the service marketplace and/or the service consumer that must be honored.
However, these considerations fall outside the scope of ApeiroRA.