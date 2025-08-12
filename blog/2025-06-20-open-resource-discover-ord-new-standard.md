---
title: 'Open Resource Discovery (ORD): A New Open Standard for Discovering Services, Events, and Data Products'
authors:
  - simon-heimler
  - vyshnavi-gadamsetti
  - vasu-chandrasekhara
tags:
  - ord
  - open resource discovery
---

In complex enterprise environments, knowing which digital services, events, and data products are available — and how to integrate with them — is a well-known challenge. As businesses evolve, the ability to discover, understand, and consume digital offerings becomes increasingly critical.
[Open Resource Discovery (ORD)](https://open-resource-discovery.github.io/specification/), now an independent open standard under the [Linux Foundation](https://www.linuxfoundation.org/) (via the [NeoNephos Foundation](https://neonephos.org)), was designed to solve this challenge. It provides a standard, automated way for industries to describe and publish services, events, and data products directly from their source systems, making it an ideal foundation for digital collaboration and integration across platforms.

<!-- truncate -->

## Why ORD Matters for Industries
Modern enterprises operate across fragmented landscapes — diverse platforms, microservices, APIs, events, and data products. Without a common way to describe and discover these offerings, teams waste time searching, aligning, and re-validating information.

ORD creates a decentralized and open method for exposing metadata and therbey making these resources dynamically discoverable and actionable across ecosystems.

![ORD-svg](https://open-resource-discovery.github.io/specification/assets/images/ord-provider-overview-7541358f15f21e362b88aa6f600ac6d4.svg)


## Keeping it ORDinary: The Simple Genius of Common Understanding

ORD's benefits for Industries include:

**Standardization:** Enables seamless discovery and integration across internal and external landscapes.

**Automation:** Enables tools and platforms to read service metadata and configure connections automatically.

**Trust:** Provides services, events, and data descriptions directly from the source, making them authoritative and up to date.

**Interoperability:** Supports common protocols and metadata formats, making it applicable across industries and platforms.

## ORDs of Magnitude: Tangible Business Results

Due to its generic, extensible nature, ORD can be used as a backbone for various use cases across industries. Here are some examples of how ORD can be applied:

- **API Catalogs:** Allow for decentralized, dynamic aggregation of API and Event capabilities available across services in a standardized way, supporting different protocol types and metadata specifications, and facilitate their discovery in catalogs. Automatically aggregated catalogs are accurate and up-to-date and therefore make it easier for customers and their developers to understand technical integration interfaces a company offers externally or internally.

- **Runtime System Landscape Introspection:** ORD can be used to introspect services at runtime, thus discover the actual state of all services in the system landscape, reflecting e.g. the combined configuration and customization state.

- **Data Products:** Provide an industry-wide common approach to describing data "as a product", making data ubiquitously accessible and actionable for analytics, AI, and application development.

- **Data Mesh:** Facilitate a common, decentralized approach to mesh Data Products into one catalog.

- **Automation and AI:** Metadata published and connected via ORD promotes and aids automation and AI. Since many AI protocols are described with APIs and specialized protocols, they too can be described, catalogued and discovered via ORD.

- **Knowledge Graphs:** ORD is extensible to include knowledge graphs as metadata, thus can be utilized to build connected knowledge providing a holistic view of (enterprise) resources available across services.

## ORD and Semantic Technologies

ORD is akin to semantic web standards, but it follows a simpler model (just defining a JSON Schema interface for JSON data that is provided) without the overhead of ontologies, a primary reason for complexity.
ORD reflects how most metadata standards in the industry work today that can be pragmatically included in the discovery process, e.g. OpenAPI, AsyncAPI, and others.
Developers simply have to create JSON files following the schema contract, aided by auto-completion and validation in their favoured IDE.

ORD can be used in conjunction with semantic web standards and technologies, thereby complementing semantic web principles pragmatically for industry use cases.
In fact, the metadata model of ORD and its attached metadata files can be converted and imported into Knowledge Graphs.
The IDs within ORD are namespaced and have similar global uniqueness qualities as URIs in semantic web standards.

## The Road Ahead for Industries

With ORD donated and governed fully independently under the [NeoNephos](https://neonephos.org) Foundation, its potential goes far beyond any one domain. Its open, pragmatic, and collaborative nature positions ORD to become a cornerstone for integration, discovery, and automation across industries — from manufacturing and finance, to logistics, automotive, and beyond.

By adopting ORD, organizations can:

✅ Break down silos across their platforms and ecosystems.

✅ Accelerate the onboarding of services, APIs, and data offerings.

✅ Enable higher levels of automation and AI driven integration.

✅ Build a more resilient and future proof enterprise architecture.

For example, ORD has been pivotal in addressing these very challenges across SAP's expansive ecosystem. ORD has been leveraged in offerings like [Business Accelerator Hub](https://api.sap.com/), [SAP Business Technology Platform](https://www.sap.com/products/technology-platform.html), [SAP Business Data Cloud](https://www.sap.com/products/data-cloud.html), but also other companies, like [Databricks](https://www.databricks.com/), use it for standardized metadata exchange and integration in their offerings.

The ORD community is growing and looks forward to welcoming new members and organizations, interested in openly discovering and connecting their resources across industry platforms, adopting [Open Resource Discovery](https://open-resource-discovery.github.io/specification/) and contributing further use cases of their industries.
