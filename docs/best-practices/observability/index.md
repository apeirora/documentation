---
sidebar_position: 9
title: Observability
keywords: [Telemetry, OpenTelemetry, OTel, Observability, Greenhouse]
---

This page describes the approach towards **observability** in the Apeiro Reference Architecture.

Apeiro uses [OpenTelemetry](https://opentelemetry.io), also known as <Term>OTel</Term>, for telemetry. OpenTelemetry provides a comprehensive open-source observability framework for producing and collecting telemetry data, including logs, metrics, and traces. It is compatible with various storage backends to persist telemetry data (e.g., OpenSearch, S3-compatible storages) and can be integrated with many observability tools for analysis (e.g., Prometheus, Zipkin, several commercial tools). Observability in software and infrastructure is essential for operating a complex cloud environment. High-quality observability will enable teams to:
- Detect and troubleshoot issues quickly,
- Maintain performance and reliability,
- Make data-driven improvements.

## Functional Overview
All components of the Apeiro Reference Architecture strive to produce telemetry data compatible with the OpenTelemetry standard, it does not impose a specific sink implementation for telemetry data. Instead, any supported storage or tool can be configured. 

<ApeiroFigure src="/observability/img/audit-logging.svg"
  alt="Overview of OpenTelemetry in the Apeiro Reference Architecture"
  caption="Overview of OpenTelemetry in the Apeiro Reference Architecture"
  width="100%"/>

:::info
Some components may be deployed with an OpenTelemetry Collector by default to streamline collection of telemetry data, however, any [deployment pattern](https://opentelemetry.io/docs/collector/deployment/) for the OpenTelemetry Collector may be used.

Note that for [audit logs](#audit-logging) a durable write-once/read-many (WORM) storage such as an S3-compatible storage is recommended.
:::

## Core Signals

The three key signals of observability are **metrics**, **logs**, and **traces**, each providing unique insights contributing to a comprehensive view of a system's health.

### Metrics
Metrics are numerical data points reporting on a system health over time. Examples of metrics can be CPU usage, memory usage, request latency.

### Logs

Logs are detailed records of system or application events. These can be in various formats like structured/unstructured, single-/multi-line or written to files/streamed. Logs provide text-based data for post-incident analysis and crucial for auditing, troubleshooting or improving a system. Logs can also be categorised into purpose, for instance application logs, security-relevant logs or <Term>audit relevant logs</Term>. 

### Traces
Traces follow a request's journey through the system, capturing latency and failures across microservices. Traces are key for understanding dependencies, diagnosing bottlenecks and debugging the source code with real system data.

## Tools
Common open source tools to capture these signals are:
- **[Prometheus](https://prometheus.io)** is a tool for collecting and querying metrics. It uses a time-series database optimized for real-time data, making it ideal for gathering system health data, enabling alerting, and visualizing trends.
- **[OpenSearch](https://opensearch.org)** provides a scalable platform for log indexing, search, and analysis of logs. Enabling teams to sift through large volumes of logs to identify issues and understand system behaviour over time.
- **[Jaeger](https://www.jaegertracing.io)** is a tool for distributed tracing, providing a detailed view of request paths and performance across services.

OpenTelemetry defines a standard for unifying the processing of all three types of signals. In addition to providing an API and SDKs for multiple programming languages, OpenTelemetry also simplifies the integration with backend systems such as Prometheus, OpenSearch and Jaeger.

## Audit Logging

Audit logging describes the capability of capturing audit-trail relevant events of a system to meet compliance requirements. Such events may originate from infrastructure components up to the workloads that run on top. It is a capability that is particularly relevant for providers of enterprise software.

Unlike regular application logs, audit logs are usually subject to long retention periods and software providers must guarantee their completeness (i.e. guarantee of delivery).

Examples of audit logs include:
- failed login attempts
- permission changes (e.g. of a service account or application user)
- accessing sensitive information
- modification of data

The Apeiro Rerefence Architecture aims to bring audit logging to OpenTelemetry. While many capabilities required to process audit logs already exist in OpenTelemetry, standardized semantic conventions for audit logs and delivery guarantees are missing.

Therefore, together with the OpenTelemetry community Apeiro teams are working on the following deliverables:
- semantic convention for audit logs
- extension of OpenTelemetry APIs/SDKs for audit logging purposes
- extension of OpenTelemetry Collector for audit logging purposes
