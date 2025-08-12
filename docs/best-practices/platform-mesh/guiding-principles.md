---
sidebar_position: 2
title: Guiding Principles
---

The architectural framework, including its components and API specifications, is based on the following common design principles.

## Declarative API

The API design is solely dedicated to a declarative model, with no support for imperative requests. REST is exclusively used for managing declaration resources.  
The declarative API model of ApeiroRA is inherited from the Kubernetes ecosystem, known as the <Term>Kubernetes Resource Model</Term> (KRM).
This model is based on a generic API server with extensible resource types.

Unlike traditional REST designs, the execution of real-world actions (drift control) is handled by "controllers" or "operators" that work on top of a REST model.
The REST model is only used to store and manipulate the declarative intents, rather than executing actions.
The reconciliation design manages the drift between the desired and real state of the world, which has been proven to enable reliable and resilient software environments.

The service orchestration environment provides a <Term name="account model">structured object space</Term> for storing the declarative intentions, known as the desired state.
The same API is used by the controllers. Controllers work on the object space and handle the drift control between the desired state described in the declarative manifests and the intended realizations in the real world.


## Decoupling

Decoupling and separation of concerns is an important design criterion for the components of the reference architecture.  
All components and layers should be directly usable without needing the complete framework or service orchestration environment, meaning that components can be hardwired if desired.
<Term>Service providers</Term> should be as self-contained as possible and directly usable, for example, with their own tenant/service account management that can also be linked with a corporate account system or the orchestration environment.  
While the overall architecture aims to enable the creation of <Term>marketplaces</Term> using various service providers, this central element should not be required for other parts to function or work together.
Service providers should be able to be easily connected to any orchestration environment.

The architecture will strive to avoid bundling functionality that could be provided by separate components in order to maximize flexibility in composing architectural elements and providing different implementations.
