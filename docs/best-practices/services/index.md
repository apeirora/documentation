---
sidebar_label: Services and Service Management
title: Services
sidebar_position: 4
---

**Services** are a fundamental part of the Apeiro Reference Architecture.

However, the term "service" can often be ambiguous and open to interpretation, leading to misunderstandings.
On this page, we define what a service is within the context of ApeiroRA and explain related concepts and terms.

<ApeiroFigure src="/services/img/concepts.svg"
  alt="Terms and Concepts"
  caption="Terms and Concepts"
  width="70%"/>

### Service

*A **service** in its most general form is a solution or active entity, which offers some API to its <Term>consumers</Term>.*

This service API serves as a contract between the service <Term>capability</Term> and its <Term>consumers</Term>, accessible through a defined endpoint and typically requiring credentials for access.

Specific examples of service APIs vary based on the type of workload, and these can include:

- **REST Endpoints**:
  Utilized for both low-level and high-level services, REST APIs provide a standard interface for interacting with web services over HTTP using methods like GET, POST, PUT, and DELETE.
- **Event-Based or Pub/Sub Communication Channels**:
  These channels facilitate asynchronous communication, allowing services to publish and subscribe to event streams. This approach is beneficial for real-time data processing and decoupled architectures.
- **Binary Protocols**:
  Often employed by SQL and NoSQL databases, binary protocols offer efficient communication by structuring data in a compact binary format, enhancing performance and reducing latency compared to text-based protocols.
- **Service-Specific Protocols**:
  These protocols have properties vital to the service, such as high performance, reduced data size, or enhanced reliability. They are designed to meet specific service requirements and optimize the service's operational parameters.

Services may also incorporate a combination of different APIs to cater to varying needs.
ApeiroRA recommends using <Term>Open Resource Discovery</Term> (ORD) to describe these interfaces, providing a standardized way to document and interact with service APIs.

Additionally, a service might offer administrative and end-user tools, such as command-line interfaces (CLI) and web-based user interfaces (UIs), to facilitate easier management and interaction with the service's functionalities.

Multiple <Term>service providers</Term> may offer <Term>managed services</Term> that expose identical APIs.
For instance, if two providers offer the same open-source database as a service, consumers can select a provider based on non-functional and contractual requirements.
This allows consumers to evaluate providers on factors such as reliability, performance, security, cost, customer support, and service level agreements (SLAs), rather than the technical details of the API itself.


<details>
<summary>Example: <strong>Database</strong></summary>

A database can serve as an example of a service.
A service supplier may offer the setup and maintenance of this database, while the service consumer would only receive the necessary connection details and credentials.
</details>

<details>
<summary>Example: <strong>Database Schema</strong></summary>

A database schema can also be offered as a service.
In this model, a service consumer requests a schema within an existing database they already own.
No upfront deployment is necessary, as the database is already in place.
The schema will ultimately consume resources covered by the database instance.
There is a strict dependency on the database instance; there must be an existing database and if the database instance is removed, the schema will be removed as well.
</details>

<details>
<summary>Example: <strong>Kubernetes Cluster</strong></summary>

Another example could be a Kubernetes cluster.
The service consumer could specify and order a Kubernetes cluster, eventually obtaining access to its control plane. This access provides the cluster's credentials, for instance in the form of a `kubeconfig` file.
The service provider would be responsible for managing the cluster's control plane, but not the worker nodes. The worker nodes would be managed by the cluster's control plane itself.
</details>

<details>
<summary>Example: <strong>Currency Converter Service</strong></summary>

Another type of example could be a currency converter service.
A service supplier may offer a REST API that enables applications to convert amounts to different currencies using up-to-date exchange rates.
Additionally, the service might offer access to historical data for retrospective currency conversions.
The service consumer would receive credentials to access the service, primarily used for billing purposes.
</details>


### Capability

*A **capability** represents a specific, configured instance of a service designated for a particular application or service.*

The characteristics of a capability strongly depend on the service and configuration.
Generally, there are two categories of capabilities:

1. **Capabilities that require a deployment or provisioning**:
   These capabilities necessitate the deployment of additional software and allocation of infrastructure components, such as runtime and disk space.
   An example is setting up a database, which involves deploying the database software and ensuring the needed infrastructure is in place.
   These deployments may be performed by <Term>servicelets</Term>.

2. **Capabilities that map to a tenant in a SaaS application or service**:
  These do not require the deployment of additional software. Instead, they utilize the existing resources of a service to create and allocate a new logical space.
  For example, a schema in a database uses the pre-allocated resources of the database to provide a new logical space for the requester.
  Another example is a business service where the capability is only used for metering and billing, and thus only constitutes an additional database entry within the business service.

The internal workings of a capability are considered implementation details.
However, it is recommended to use a <Term>service provider</Term> to manage these capabilities.
This approach enables both the <Term>service supplier</Term> and the <Term>service consumer</Term> to fully leverage the features and benefits of ApeiroRA.

A capability and the corresponding <Term>resource</Term> together form a <Term>digital twin</Term>.

<details>
<summary>Example: <strong>Database</strong></summary>

A deployed database instance is a capability.
This capability has been set up and configured by the database service provider, based on the parameters established by the service consumer in the resource document they created.
The service consumer eventually gets the credentials to access the database.
</details>

<details>
<summary>Example: <strong>Database Schema</strong></summary>

A database schema within an existing database can also be considered a capability if it can be provisioned declaratively through a service provider.
When the service consumer requests a schema, they must specify the desired database.
The service provider then creates and configures the schema and, depending on the database, provides the necessary schema credentials to the service consumer.
The schema can also be modified or removed by altering the resource of its digital twin.
</details>

<details>
<summary>Example: <strong>Kubernetes Cluster</strong></summary>

A concrete, operational Kubernetes cluster control plane is a capability that a service consumer has requested and can access.

</details>

<details>
<summary>Example: <strong>Currency Converter Service</strong></summary>

From the service consumer's perspective, the currency converter service is a capability, as they can connect to it with the provided credentials.
In this instance, there is no need for deployment.
The service simply adds an entry to its internal database and uses the credentials solely for billing purposes.
</details>


### Resource

*A **resource** is a description of the desired state of a service <Term>capability</Term>.*

A <Term>service consumer</Term> creates, modifies, or deletes a resource within the <Term>service orchestration environment</Term> to request, manage, or schedule the deletion of a <Term>capability</Term>.
The <Term>controller</Term> of the respective <Term>service provider</Term> detects the change and must respond accordingly.
Together, the resource and the corresponding <Term>capability</Term> form a <Term>digital twin</Term>.

An ApeiroRA resource closely resembles a resource in the <Term>Kubernetes Resource Model</Term> (KRM).
it adheres to the same structures and patterns and is typically expressed in YAML.

A hypothetical resource of a database might look like this:

```yaml
apiVersion: SomeCoreDB/v1
kind: Database
metadata:
  name: my-first-database
spec:
  serviceTier: premium
  location: ger01
  cpu: 16
  ram: 32gb
  disk: 500gb
```


### Service Provider

*A **service provider** is an entity that offers <Term>services</Term>, monitors its <Term>resources</Term>, and manages <Term>capabilities</Term>.*

When a <Term>service supplier</Term> wishes to offer a <Term>service</Term> in the ApeiroRA realm, they must provide a service provider.
Typically, this service provider is a software application that has access to the <Term>service marketplaces</Term> where it is registered, as well as access to all <Term>service orchestration environments</Term> where it intends to offer services.
This software facilitates registration in a service marketplace by providing all necessary metadata for one or more services, enabling potential service consumers to discover these services and order <Term>capabilities</Term> in the service orchestration environments.
At a minimum, the service provider must operate a <Term>controller</Term> that monitors resources belonging to it and responds to any changes affecting them.

The primary task of a service provider is to ensure synchronization of the digital twin. In summary, this involves:

* Translating changes to the resource document into the respective capability (reconciliation).
* Transferring data required by the service consumer to the service orchestration environment.
* Relaying status information about the capability back to the resource.
* Adjusting changes and drifts of the capability to align again with the respective resource document.

The exact way service providers are installed and operate is considered an implementation detail.
However, it is recommended to adhere to the <Term>Managed Service Provider</Term> pattern.

<details>
<summary>Example: <strong>Database</strong></summary>

The responsibilities of a database service provider may include deploying the database software according to the specifications outlined in the resource document created by the service consumer.
This deployment may involve utilizing services provided by other service providers, such as using a Kubernetes cluster as the runtime environment for the database software.

Throughout the database's lifecycle, the service provider is responsible for maintaining its operational status, implementing updates in response to changes in the resource document, and decommissioning the database upon request.
This also includes scheduling and deploying software updates and security fixes when necessary, as well as keeping the service consumer informed about these actions.
</details>

<details>
<summary>Example: <strong>Database Schema</strong></summary>

A database schema is a subset of a database, making it probable that a single service provider manages both the database and the schema services.
Typically, a schema does not require a new deployment.
Instead, the service provider merely adds or modifies configurations within the database, which then generates the schema.

Given that a schema is dependent on the database, any changes, particularly the deletion of the database, will impact the schema.
The service provider must accurately reflect these changes in the status of the schema's resource documentation.
</details>

<details>
<summary>Example: <strong>Kubernetes Cluster</strong></summary>

A service provider for a Kubernetes offering is responsible for the control plane of a cluster, which subsequently manages the actual cluster or clusters.
Therefore, the primary task of this service provider is to provide the service consumer with access details for the control plane.
</details>

<details>
<summary>Example: <strong>Currency Converter Service</strong></summary>

A Currency Converter capability functions primarily as a tenant for the service, mainly utilized for billing purposes.
Consequently, the service provider's responsibilities are limited to tenant management tasks, which may be as straightforward as adding, modifying, or deleting a row in an internal database.
</details>


### Managed and Unmanaged Services

A **managed service** is delivered through a <Term>service provider</Term> and must include a declarative approach for managing <Term>capabilities</Term>, such as creating, updating, and deleting them.

An **unmanaged service**  is set up by a DevOps team using tools and APIs that are outside the scope of ApeiroRA.
It is subsequently managed directly without the involvement of a <Term>service provider</Term>.
Only legacy systems and services should be attached as unmanaged services.


### Service Suppliers and Service Consumers

The documentation highlights two main roles:

* **Service Supplier**:
  A service supplier, whether a company or an individual, offers and manages one or more services.
  For <Term>managed services</Term>, the supplier must also ensure a <Term>service provider</Term> is in place, as this entity manages the lifecycle of the service <Term>capabilities</Term>.
  Additionally, the service supplier should register the service provider in relevant service marketplaces.
* **Service Consumer**:
  A service customer, whether a company or an individual, orders a service, manages the lifecycle of the resultant <Term>capability</Term>, and is responsible for its payment.


### Service Marketplace

*A **service marketplace** allows <Term>service providers</Term> to register their <Term>services</Term>, making it convenient for <Term>service consumers</Term> to find them.*

When a service marketplace connects to a service orchestration environment, all or a selected subset of the services from the marketplace become available to the users of the service orchestration environment.


### Service Runtime

*A **service runtime** is a service used to embed other services and their API.*

Services and capabilities themselves exist or run somewhere.
They are either a subset of another service or require their own runtime environment.
The type of environment can vary significantly depending on the service.

Here are few examples:

| Service            | Service Runtime    |
| ------------------ | ------------------ |
| Virtual Machine    | Hypervisor         |
| Kubernetes Cluster | Virtual Machine    |
| Database           | Kubernetes Cluster |
| DB Schema          | Database           |
| SaaS Service       | PaaS, Database     |
| PaaS               | Kubernetes Cluster |

A database schema qualifies as a service according to the definition used here, as it is an entity with dedicated users, permissions, and maintained elements (such as tables) that are distinct from those in other schemas.
It possesses its own API and API endpoint.
Although a schema typically shares a common API with the database, it formally has its own endpoint.
This scenario is comparable to objects and classes in an object-oriented environment.
Technically, methods and their implementations are bound to the classes, but formally they belong to the objects;
the access point is not the class (as in abstract data types) but rather the object identity.

Almost every service can be decomposed into a set of services that collectively form the implementation of that service.
At a minimum, a service consists of one dedicated element embedded within its service runtime (for example, a *Process* running on a *VM*, or more complex structures like a set of *Pods* and a *Service* definition within a *Kubernetes Cluster*).