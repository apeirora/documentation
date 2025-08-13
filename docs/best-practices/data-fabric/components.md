---
sidebar_position: 3
title: Components
---


Three main components of Data Fabric:
<Term>Open Resource Discovery</Term>, <Term>Unified Metadata Service</Term> and aligned metadata model.


## Open Resource Discovery

<Term>ORD</Term> is a protocol providing a common standard to all vendors to describe their business applications by providing the metadata for a system capability (API, event, data product) and all available business objects including a description to provide context on those entity types. With an ORD endpoint, all metadata can be exposed in a standardized format. ORD also includes practical concepts and examples of how technical services can implement a business reality over a distributed cloud-edge scenario using ORD-based semantic concepts. ORD is fully contributed as open-source software, and a technical documentation is available here: Open Resource Discovery

## Unified Metadata Service

<Term>UMS</Term> is a central service that collects all ORD-based metadata of participating services. UMS itself, having collected and aggregated all metadata of a given customer landscape, in the broader context represents a Discovery API. This facilitates the automated understanding of how business objects are related across capabilities and business applications. Ultimately, ORD and UMS enable the seamless and automatic integration between services hosted across different providers.

## Aligned Metadata Model
Application resources leverage a standardized metadata model to ensure consistent identification of business objects, independent of resource or service naming conventions. A common example is the use of a dedicated annotation within the specification that explicitly defines the business object associated with the API.


The [following section](./landscape.md) illustrates the interaction of these components within the system architecture and the metadata flow.

