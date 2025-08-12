---
sidebar_position: 10
title: Data Fabric
keywords: [Data Fabric]
---

Gartner, a prominent industry analyst firm, characterizes Data Fabric as an "emerging data management and data integration design concept". Its primary objective is to facilitate "data access across the business through flexible, reusable, augmented and sometimes automated data integration". Gartner emphasizes its role in addressing the pervasive challenge of collecting, connecting, integrating, and delivering data from dispersed sources, ultimately simplifying an organization's data integration infrastructure and reducing technical debt. A crucial attribute highlighted by Gartner is Data Fabric's reliance on "active metadata," which proactively analyzes data context and generates recommendations, effectively converting passive metadata into actionable insights to automate data management tasks.

Other leading technology vendors and industry organizations also define Data Fabric, generally aligning with Gartner's vision while emphasizing different aspects based on their platforms and strategic focus. A common thread among most definitions - such as those from Forrester, IBM, Microsoft, and SAP - is the important role of metadata. It is often highlighted as a key enabler for automation, governance, and intelligent data integration across distributed environments.

Key Elements of Gartner's Definition:

* **Design Concept, Not a Product**<br/>
    It's not a specific tool but an architectural approach involving various technologies.

* **Integrated Layer of Data and Processes**<br/>
    Data fabric connects data sources, applications, and users across platforms and locations.

* **Metadata-Driven**<br/>
    It leverages active metadata (real-time, contextual, and enriched metadata) to automate data management tasks like integration, governance, and discovery.

* **Continuous Analytics**<br/>
    Constantly analyzes metadata and data usage patterns to optimize data delivery and enhance data understanding.

* **Environment-Agnostic**<br/>
    Works across on-premises, cloud, hybrid, and multi-cloud environments.

While Data Fabric encompasses various components, our focus within the scope of ApeiroRA is on metadata.
The following diagram demonstrates how decentralized self-describing of application resources enables the identification of the correct objects (Entity Types) behind the resources exposed by applications.
This approach helps clarify their meaning and determine which integration points are linked to the same underlying object.

<ApeiroFigure src="/data-fabric/img/enterprise.svg"
    alt="Business Objects Relationship"
    caption="Example Objects Relationship"
    width="100%"/>

1. Referencing to internally aligned entity types
2. Referencing to entity types across system capabilities
3. Referencing to entity types across applications
4. Referencing to entity types within system capability
