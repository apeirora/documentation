---
sidebar_position: 2
title: Design Principles
---


## Principles

Three key principles must be upheld:

* Resources provided by services must be self-descriptive.
* Resources provided by services must be discoverable.
* Resources provided by services must use metadata that is aligned and descriptive.

:::info

Data Fabric uses slightly different terminology related to <Term>Open Resource Discovery</Term>, where the term _resource_ carries a different meaning compared to its definition in ApeiroRA.

:::

These principles ensure that service resources are easily understandable, searchable, and consistently described, enhancing interoperability and usability. Using these principles can improve the efficiency and effectiveness of data management and integration.

To illustrate the concept more clearly, let's look at the following example from the ERP world - though the principles of Data Fabric apply equally well across other domains.

## Example

In this example the system landscape comprises three distinct systems, each designed to support specific functional domains such as customer data management, order processing, and product information management. The objective is to configure the "Opportunity to Order" (O2O) business process, which encompasses the end-to-end workflow for transforming a sales opportunity into a finalized customer order.

This process involves the orchestration of multiple business objects, including opportunities, quotations, customer records, product catalogs, and sales orders. Seamless integration across the Customer Relationship Management (CRM), Enterprise Resource Planning (ERP), and Order Management System (OMS) platforms is essential to ensure consistent and reliable data exchange throughout the process.

Effective configuration and integration of these systems are critical to maintaining data integrity, optimizing workflow efficiency, and enabling real-time visibility across the sales lifecycle.

To maintain clarity and reduce complexity in this example, we will limit our scope to the following core business objects:

* **Customer** – also referred to as **Account** or **Contact**, depending on the context within the system.
* **Quote** – also known as **Quotation**, representing a formal offer to a **Customer**.
* **Sales Order** – a confirmed request for the delivery of **Products** or services.
* **Product** – also referred to as **Material**, representing goods or items available for sale or service.

Each system is capable of interacting with specific business objects and provides access to the necessary resources to support their processing. These resources may include APIs, Events, Data Products, and other integration mechanisms. However, in-depth implementation details are solely documented and not readily accessible through the user interface, requiring integrators to possess domain-specific expertise and invest substantial effort to ensure correct and efficient integration.

<ApeiroFigure src="/data-fabric/img/na_landscape.svg" 
    alt="System Landscape" 
    caption="Example: System landscape"
    width="100%"/>

Now, let us assume that all exposed resources are self-describing and include metadata that explicitly defines their associations with the relevant business objects they pertain to or reference.

<ApeiroFigure src="/data-fabric/img/a_landscape.svg" 
    alt="System Landscape" 
    caption="Example: Metadata in system landscape"
    width="100%"/>

With this level of accessible metadata, it becomes evident which exposed resources are available in each system, enabling the configuration of the required integration process. A simplified version of the end-to-end flow is outlined below:
1.	Replicate Customer master data between Systems X and Y.
2.	Replicate Product master data between Systems Y and Z.
3.	Manage opportunities and generate Quotes within System Y.
4.	Create Sales Orders in System Z, referencing Quotes from System Y.