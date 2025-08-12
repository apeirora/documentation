---
title: Security Compliance Automation
sidebar_position: 1
---

# Security Compliance Automation

This page outlines the **Security Compliance Automation** concepts.

## Scope

In general, a control framework refers to a structured set of guidelines that details an organization's processes and procedures. 

A Single Control Framework typically refers to a system where there is one overarching set of guidelines or procedures that governs the entire organization and their systems. This framework is usually standardized across the organization, providing a consistent approach to managing and controlling processes. It's simpler and easier to manage, but it may not be flexible enough to cater to the unique needs of different departments or functions within the organization. Examples for Single Control Frameworks are Product Standards, Corporate Requirements, Corporate Standards. 

A Multi Control Framework refers to a system where there are multiple control frameworks in place, often tailored to specific departments, functions, or processes within the organization. This allows for more flexibility and customization, as each framework can be designed to best suit the needs of its specific area. However, it can be more complex to manage and there may be inconsistencies or conflicts between the different frameworks. 

Most relevant for each security compliance automation is the Information Security Management System (ISMS) it supports. An ISMS is a systematic approach to managing sensitive company information so that it remains secure. It includes people, processes, and IT systems by applying a risk management process and gives assurance to various stakeholders that the risk is adequately managed. In relation to single and multi control frameworks, an ISMS can be implemented using either approach, depending on the organization's needs and structure. In context of Single Control Framework, an organization would use a single, unified ISMS across all departments and functions. This would ensure consistency in information security practices and make the system simpler to manage. An example of a single control framework in ISMS is the ISO 27001 standard, which provides a universal set of controls for managing information security. 

In context of a Multi Control Framework the organization might use different ISMS frameworks for different departments or functions, each tailored to the specific needs and risks of that area. This could allow for more flexibility and customization, but it could also make the system more complex to manage and potentially lead to inconsistencies. For example, an organization might choose to implement controls from the following frameworks like ISO 27001 and NIST SP 800-53 at the same time. ISO 27001 provides a flexible approach and includes >100 controls that organizations can choose to implement based on their specific needs and risks. These controls cover a wide range of areas, including information security policies, human resource security, access control, cryptography, physical and environmental security, operations security, communications security, system acquisition, development and maintenance, supplier relationships, information security incident management, information security aspects of business continuity management, and compliance. NIST SP 800-53 (National Institute of Standards and Technology Special Publication 800-53) establishes security and privacy controls for federal information systems and organizations. It covers five areas of security: access control, awareness and training, audit and accountability, security assessment and authorization, and configuration management. 

By combining controls from these different frameworks like ISO 27001 and NIST SP 800-53 at the same time, an organization can create a robust and comprehensive ISMS that addresses various aspects of information security. This approach allows for more flexibility and customization, as the organization can choose the controls that best suit its specific needs and risks. However, it also requires careful management to ensure consistency and avoid conflicts between the different controls. In both cases, the goal of the ISMS is to ensure the confidentiality, integrity, and availability of information by applying a risk management process and giving assurance to stakeholders that the information is protected. The choice between a single or multi control framework would depend on the specific needs and structure of the organization. 

Beside ISMS there are other management systems relevant for certifications like Quality Management System (QMS), Environmental Management System (EMS), Health and Safety Management System (HSMS), Risk Management System (RMS), Energy Management System (EnMS), Food Safety Management System (FSMS). For all of them there are dedicated ISO or other standards available and each of those management systems can be implemented using a single or multi control framework within an organization, depending on the specific needs and structure of this organization. 

In ApieroRA security compliance automation is limited to ISMS based on single or multi control framework and its respective certifications. 

## Secure Controls Framework

Because it includes the current ISO 27001 v2022 and NIST SP 800-53 rev5 controls mapped to many more control frameworks the Secure Controls Framework (SCF) https://securecontrolsframework.com/ is utilized as reference. Organization specific single control frameworks which comprise controls which are mapped to ISO 27001 v2022 or NIST SP 800-53 rev5 controls are covered per default by security compliance automation reference implementation and are prepared for certification for all other control frameworks which are mapped in the SCF.

## UIDs

SCF utilizes unique control IDs (UIDs) which are a combination of control framework ID plus control ID. By this means unique mapping becomes possible, which is a mandatory required for automation. UIDs is a mechanism which is widely used in enterprise softwares. Here are some of the benefits:
1. Data Uniqueness: UIDs ensure that each record in a database is unique, preventing duplication and ensuring data integrity.
1. Data Consistency: UIDs provide a consistent way to identify and access data across different systems or databases. This is particularly important in large enterprises where data may be spread across multiple systems.
1. Data Integration: UIDs are essential for integrating data from different sources or systems. They provide a common key that can be used to join data together, making it easier to create a unified view of the data.
1. Data Traceability: UIDs make it possible to trace data back to its source, which is important for auditing, compliance, and data governance purposes.
1. Improved Search and Retrieval: UIDs make it easier to search for and retrieve specific records. This can improve the efficiency of database operations and make it easier for users to find the information they need.
1. Simplification of Data Management: UIDs simplify the process of managing data, as they provide a straightforward way to identify, update, or delete specific records.
1. Support for Distributed Systems: In distributed systems, UIDs can help ensure that data remains consistent and unique across different nodes or servers.
1. Scalability: UIDs are designed to be unique not just within a single database or system, but across multiple systems, making them suitable for large, scalable applications.
1. Security: UIDs can be used to anonymize sensitive data, helping to protect privacy and comply with data protection regulations.
1. Interoperability: UIDs can facilitate interoperability between different systems or applications, as they provide a standard way to identify data.

## Correlation IDs

Correlation IDs  are used in enterprise software to track and correlate requests across multiple systems or services. Here are some of the benefits of leveraging them:
1. Request Tracing: Correlation IDs allow for end-to-end request tracing in complex systems. This is particularly useful in microservices architectures or distributed systems where a single request might span multiple services.
1. Debugging and Troubleshooting: By using a correlation ID, it becomes easier to track down where an issue occurred in the system. If an error occurs, the correlation ID can be used to trace the entire path of the request, making it easier to identify and fix the problem.
1. Performance Monitoring: Correlation IDs can be used to monitor the performance of a system. By tracking the time it takes for a request to pass through the system, it's possible to identify bottlenecks and optimize performance.
1. Log Organization: Correlation IDs can be used to group related log entries together. This makes it easier to analyse logs and understand the sequence of events related to a specific request.
1. Audit Trails: Correlation IDs can be used to create audit trails, which are important for compliance, security, and governance purposes. They provide a way to verify the actions performed by a system or user.
1. Improved Customer Support: If a customer reports an issue, the support team can use the correlation ID to trace the customer's actions and understand what went wrong. This can lead to faster resolution times and improved customer satisfaction.
1. System Health Monitoring: Correlation IDs can be used in system health monitoring and alerting. If a particular request pattern consistently leads to errors, it can be identified and addressed proactively.
1. Insights and Analytics: By analyzing the data associated with correlation IDs, businesses can gain insights into usage patterns, system performance, and potential areas of improvement.
1. Security: Correlation IDs can help in identifying unusual patterns or potential security threats by correlating different actions across the system.

## Architecture Principles

The major architecture principles in security compliance automation and certification preparation are to rely exclusively on open, public, extendable, standard -
1. security controls framework which provides UIDs which is ready for automation. Framework of choice is the Secure Controls Framework (SCF)
1. model which relies on Unique Correlation IDs which is ready for automation. Model of choice is the <Project name="ocm">Open Component Model (OCM)</Project>.
Following above architecture principles will enable the security compliance automation reference implementation to be prepared and extendable for multiple existing and future certifications in all layers in the technology stack, in all regions, in all industries and in all security levels.


## Value Proposition

Software today must fulfill further obligations than its plain functionality.
Beside others security, privacy and legal compliance are key requirements for all components in the reference.
Organizations today, have an overtime historically grown stack of task specific, own- or third-party tools, bringing their specific underlying models, to support processes, which include most of the time manual process steps to bridge the gaps caused by this setting.
Adding new tools or establishing new processes comes with a growing price of integration the more complex the tool landscape becomes.
A feasible way out for organizations is to identify a common underlying model, which is open enough so that it can be leveraged in future processes alongside future tools.
Therefore, we include relevant tools and best practices to increase the general security posture and compliance level with automation at source.

In addition, like the Software Bill of Materials (SBoM), we introduce a Software Bill of Delivery (SBoD) for cloud-native products described with the <Project name="ocm">Open Component Model (OCM)</Project>.
While OCM's key feature is associated with lifecycle management, OCM based unique identities allow to correlate all audit relevant facts early in the software development and qualification process.
Adding OCM based IDs to existing tools and related content will make it possible for organizations to start a transition from a tool centric setup to a model centric setup over time.
The more tools and process steps adopt OCM based IDs aka OCM Coordinates, the more content can be correlated in the context of end-to-end processes.

To support this transition end users can adopt and extend the OCM and its reference implementation, <Project>OCM Gear</Project>, for their specific development or security compliance automation process.
As OCM reference implementation OCM Gear is an extensible toolbox and provides the technical foundation for our Security Compliance Automation.
For each required tool e.g. a dedicated security scanner in build- or runtime a dedicated OCM Gear extension can be implemented as data provider.
As a central process engine, OCM Gear correlates arbitrary metadata, such as security related findings, using OCM based unique identities and enables fine granular tracking of findings along with rich context information.
OCM Gear can integrate with all related existing tooling, such as malware- and vulnerability scanners, and merge metadata from any relevant external data sources into a common coordinate system.
Organizations with a previously tool-centric approach can transition to our Security and Compliance Automation using its model-based reference.

By design, OCM Gear offers an audit-safe, context aware re-prioritization concept of such findings, allowing developers to increase efficiency by sharpening their focus on genuinely relevant findings.
This allows developers to minimize toil and false positive fatigue. Furthermore, OCM Gear allows security experts to refine and aggregate security and compliance metadata to be published and included in the product release (along with the artifacts and SBoMs) for a limited number of customers in industries with highest security demands.
For those customers and partners with OCM and OCM Gear, software providers aid with a trust-but-verify mandate, by providing the necessary and decisive metadata for verification in a transparent fashion.
We thereby fulfill a requirement for digital sovereignty.

Organizations which overtime manage their transition from a tool centric setup towards a model centric setup, with e2e automation leveraging OCM coordinates as correlation IDs will gain advantages which come with AI.
Combining static information (SBoM) and dynamic information from runtime which can be correlated, LLM or ML System can be leveraged to e.g. identify lateral movement paths or other so far unknown attack vectors, which can become relevant as vital context information when an organization is under attack.
As we will see more and more AI generated attacks in the future which are leveraging most of the time poor context information, our security compliance automation brings means to continuously generate better context information on the defence side, than any attacker can have.
Thus, security related meta information as part of a software delivery must be handled in a secure way and should only be provided to trusted customers and partners under appropriate contractual boundaries.

Organizations which leverage our security compliance automation from scratch in their datacenters, should be prepared for several certifications per default, without the above-described transition phase.
The primary set of services which are supported by ApeiroRA Security Compliance Automation includes security services, runtime environments, and services that are part of the IPCEI-CIS funded project scope.

For more details about these services, visit the [Apeiro Reference Architecture](https://apeirora.eu) website.


:::info Securing software
Executive, Legislature, and Judiciary embrace and mandate software security. Worldwide, governments have concluded that Open-Source Software (OSS) underpins almost all essential products of modern (digital) life and that securing the highly dynamic OSS ecosystem is critical. This realization ushered in a major change of government strategy towards cybersecurity. For example, the Whitehouse, on counsel of Cybersecurity and Infrastructure Security Agency (CISA) and National Telecommunications and Information Administration (NTIA), issued U.S. Executive Order 14028, strongly recommending the usage of  Software Bill of Materials (SBOMs). This recommendation has for all practical reasons changed into a mandatory rule for software developers that de-facto now applies to all software vendors. Furthermore, CISA entered into a multi-faceted approach to cybersecurity:

1. collaboration with, and setting early standards via, open-source foundations like Open Source Software Security Foundation (OpenSSF).
2. financing initiatives in open source with high impact (cf. OpenSSF Mobilization Plan) to strengthen the security of the overall open source infrastructure.
3. roll out security practices and (open) standards along with education via open source first (cf. CISA Open Source Software Security Roadmap), next to standardization bodies such as e.g. ISO.

The German Bundesamt für Sicherheit in der Informationstechnik (BSI) collaborates in the above-mentioned approach. The ensuing activities in the field of cybersecurity can be noticed in commercial software as well as in open-source. The EU Cyber Resilience Act (CRA) advised by European Union Agency for Cybersecurity (ENISA) mandates security and compliance goals which only can be met by modern security & compliance tools. And without automation the goals are futile.

:::