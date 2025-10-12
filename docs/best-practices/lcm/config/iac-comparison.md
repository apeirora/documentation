---
sidebar_position: 10
title: Comparison to Infrastructure as Code (IaC)
description: IaC is snapshot-based orchestration; operators are always-on autopilot
keywords: [IAC,LCM]
---

Infrastructure as Code (IaC) has become a standard approach for
provisioning and managing cloud resources. While IaC tools like
Terraform, CloudFormation and Pulumi offer automation and repeatability,
they also introduce several challenges that can hinder scalability,
reliability, and maintainability in complex environments.

While both IaC and operator-based lifecycle management are based on
declaring a desired state, there are several key differences in how they
are implemented and operated.

With operator-based lifecycle management, many of these challenges can
be mitigated or avoided altogether.

## Domain-specific languages (DSLs) and custom tooling

IaC tools utilizing domain-specific languages (DSLs) require teams to
learn new syntax and semantics. Additionally DSLs require custom tooling
and testing. Debugging complex logic in a DSL can be harder than in
a general-purpose language.

DSLs can be easier to audit and reason about, but in experience become
limiting as complexity grows and are continuously expanded until they
resemble a general-purpose language.

In operator-based lifecycle management, operators are implemented in
common programming languages (e.g. Go, Rust, Python, Java) and can reuse
existing tooling, test frameworks, and libraries. This makes complex
lifecycle logic, error handling, and observability easier to implement
and test.

## Resource dependencies

In IaC resources need to be ordered to be applied in the correct
sequence. While tools generally infer dependencies, complex scenarios
require manually declaring dependencies, otherwise a resource may fail
to be created because a dependent resource is later in the apply order.

Operators do not require a specific order of operations. Each operator
works independently and continuously reconciles until a dependency
disappears. If a dependent resource is not yet available the operator
will retry until it is.

## Secrets

Infrastructure needs secrets and credentials, hence tools deploying the
infrastructure need access to them.

IaC tools typically use state files or backends to store the current
status to compare against when planning changes. This state needs to be
stored securely in case it contains sensitive information.

Additionally IaC tools needs access to the secrets and credentials to
access the cloud providers, making the tools a high-value target for
attackers. While many IaC tools integrate with secret managers and OIDC
flows to avoid long-lived credentials the secrets themselves are still
exposed to the IaC tool.

Operators utilize the cluster-native secret storage, which can be filled
by external secret managers (e.g. AWS Secrets Manager, HashiCorp Vault)
through either push or pull mechanisms with short-lived credentials and
policy-based access, giving access only to relevant secrets.

## Migrations and slow deployments

Applications sometimes require a long time on an initial startup, e.g.
to prepare and migrate a database. IaC tools typically have a fixed
timeout for operations, which can lead to failed deployments if the
timeout is too short. Additionally long-running operations can block the
entire pipeline.

Migrations are often long-running, disruptive, or stateful operations
that exceed the intended lifecycle model of typical IaC applies. Because
IaC applies are usually designed to converge quickly, expressing
multi-stage migrations (backfills, phased rollouts, long-running version
upgrades) is awkward and error-prone.

Operators act independently of each other and of the deployment
pipeline, allowing for long-running operations like an initial startup
or migrations without blocking the entire deployment, allowing for
multi-stage, stateful upgrade procedures: rolling upgrades, data
migrations with checkpoints, pause/resume, and detailed status
reporting.

Further operators can implement version-aware reconciliation and safety
nets to up-/downgrade between versions, avoiding the need for complex
migration scripts.

## Drift and repair

IaC tools typically operate as point-in-time executions. If a resource
fails or drifts from the desired state the common remedy is to re-run
the IaC tool. This relies on external schedulers (e.g. CI/CD
infrastructure or IaC platforms) or manual intervention. Additionally
a failing resource can block and stop the entire deployment as the tool
waits for a healthy state before proceeding.

In contrast, operators continuously independently reconcile the desired
state both event-based (e.g. on resource changes) and periodically. If
a resources fails or drifts from the desired state the operator will
retry until the resource is healthy again.

## Monitoring

IaC tools provide logs, event history and sometimes dashboards but only
for abstract resources. Users need to rely on external monitoring
solutions to monitor the state of the actual infrastructure.

Operators can emit application-specific events, metrics and set
conditions and status fields on resources, which can be monitored using
standard Kubernetes tools. This provides visibility into the full state
of the application and its components.
