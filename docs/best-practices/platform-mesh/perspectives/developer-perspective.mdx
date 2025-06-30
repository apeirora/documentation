---
title: Developer Perspective
sidebar_position: 0
---

# Developer Perspective

Let's look at the <Term>platform mesh</Term> from an application or service developer perspective.

## Identify Target Environment 

First, the developer must determine the ApeiroRA environment they want to target.
The available features, primarily defined by the accessible <Term>services</Term>, can vary significantly.
For example, a public cloud environment can utilize services over the Internet, while an air-gapped data center is restricted to services available within that specific data center.
The range of available services is likely even more limited at the edge.   
If a crucial service is missing, it may be necessary to make it available in that environment.
ApeiroRA also provides optional tools to describe, package, deliver, install, and operate services across a range of environments, from large facilities to tiny ones. 


## Create Account

Next, the developer needs an <Term>account</Term> in the ApeiroRA environment they plan to use for development.  
ApeiroRA focuses on technical details and does not provide a framework for legal, contractual, organizational, or billing matters.
Therefore, the account creation process is managed and initiated by an external system outside of ApeiroRA.
Eventually, the developer will receive the necessary credentials and permissions to access the <Term>service orchestration environment</Term>.


## Find Services

Following this, the developer examines the <Term>service marketplaces</Term> connected to the service orchestration environment and selects the required services.
Usually, this includes at least a runtime environment, but often more services are needed.  
The same kind of service, or services providing the same APIs, might be offered by multiple providers.
For instance, this could be an open-source database. In such cases, non-functional and contractual aspects are crucial in deciding which service to choose.  
ApeiroRA also provides an optional <Term>frontend</Term> for browsing the service catalog and extracting all necessary information.

Most services are not free.
Since ApeiroRA does not include infrastructure for contracts and billing, this must be handled by specific service marketplaces or service orchestration environment implementations.
(More on this on the [Platform Mesh Operator Perspective](operator-perspective.mdx) page.)  
For the rest of the sections, we assume that there is a contract between the developer and the service supplier, allowing the developer to use services.


## Order Capabilities

Once the developer has identified the necessary services, they can proceed to order instances of the services.
These instances are referred to as "<Term>capabilities</Term>".  
ApeiroRA uses a declarative model to manage the lifecycle of these capabilities.
In this model, the developer creates a <Term>resource</Term> document in their account space within the service orchestration environment, containing the configuration of the capability.  
Essentially, the developer describes the desired state of the capability they wish to use.
For example, if the service is a database, the desired state might include the database's location, memory, and disk size.  
The service provider publishes the required structure of this resource document on the service marketplace.  
The creation and management of these resource documents can be accomplished through an API, CLI, or the portal.

This resource document acts as the <Term>digital twin</Term> of the capability.
When such a document is created, modified, or removed, the service provider detects these changes and implements them in the real world.
For example, if the resource document of a database is created, the <Term>controller</Term> of the service provider offering this service will notice.
It will then create the database and update the resource document and may provide more documents with the necessary information to enable the developer (the service consumer) to connect to the database.
If the developer alters the resource document - such as increasing the disk space for the database - the service provider's controller will detect the change and adjust the capability accordingly.

This concept should be familiar to anyone with Kubernetes experience.
The platform mesh not only follows the same approach, the <Term>Kubernetes Resource Model</Term> (KRM), but ApeiroRA also uses the same tools.  
The service orchestration environment is based on the Kubernetes API server, allowing users to interact with it using familiar tools like `kubectl`.


## Managed vs Unmanaged Services

The flow described above involves service providers that are registered in service marketplaces and ApeiroRA environments.  
These providers are known as "<Term>managed service providers</Term>" (MSPs) and they offer "<Term>managed services</Term>".  
However, developers may also use "<Term>unmanaged services</Term>". "Unmanaged services" are deployed and maintained outside the ApeiroRA realm.
This could include, for instance, a specific legacy service that cannot or should not be integrated into ApeiroRA.  
It is recommended to also place the capability connection information into the service orchestration environment to present a homogeneous setup to the application.

Eventually, all capabilities are created by the respective service providers, and the necessary connection data is stored in the developer's account space.  
Now, the developer can implement and test their application.


## Run Application

ApeiroRA does not make any assumptions about how the application is ultimately deployed and operated, as this largely depends on the chosen runtime environment and services.  
ApeiroRAs frontend serves as the centralized hub where all participants can manage their assets. But its functionality depends on the degree to which services and service providers adhere to ApeiroRA guidelines.

The project also provides optional tools to package and deploy applications, including their dependencies.
These tools are also compatible with air-gapped environments and edge scenarios, supporting scenarios where Internet access is not available.
