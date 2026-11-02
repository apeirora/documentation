---
title: "SimpleCluster: sovereign hosting for your workloads"
sidebar_label: Sovereign Workload Hosting
sidebar_position: 1
description: "Choose where a workload runs and agree who operates the infrastructure and application."
---

# SimpleCluster: sovereign hosting for your workloads

You want to use an application, but you also need a say in where it runs. One customer may be happy with the service provider's infrastructure. Another needs a particular cloud environment or wants the workload in their own data center. The application should not have to be redesigned for each hosting choice.

This scenario shows how SimpleCluster can help prepare the Kubernetes environment for that workload. The customer chooses an approved hosting destination, the provider integration provisions the cluster, and the customer or an authorized service provider deploys the application there.

<SapVideo
  entryId="1_zl7y6186"
  title="SimpleCluster: sovereign workload hosting"
  caption="Demo: one SaaS offering, customer-controlled deployment (MSP, cloud account, or sovereign infrastructure)"
/>

## Where can the workload run?

There are three hosting arrangements to consider:

- **Provider-hosted:** the typical SaaS setup, where the workload runs in the service provider's environment. The customer agrees on placement, access and service responsibilities with the provider.
- **Customer-selected cloud:** the workload runs in a cloud environment chosen by the customer. Account ownership, region and operational access need to be agreed before deployment.
- **Own data center:** the workload runs in customer-controlled infrastructure. This needs suitable capacity, connectivity and a supported way to prepare the environment.

<ApeiroFigure
  src="/showroom/scenarios/sovereign-hosting-choices.drawio.svg"
  alt="A customer chooses a hosting destination with SimpleCluster. The alternatives are provider-hosted infrastructure, a chosen cloud or the customer's own data center. Each environment hosts the workload; availability depends on provider integrations."
  caption="Choose a hosting destination from the supported options. These are alternatives, not automatic migration or failover."
/>

For this scenario, we're working with the following providers and projects:

<ul class="sovereign-provider-logos" aria-label="Providers and projects collaborating on this scenario">
  <li>
    <a href="https://apeirora.eu/" aria-label="Apeiro">
      <img src="/img/fulllogo.svg" alt="Apeiro" loading="lazy" />
    </a>
  </li>
  <li>
    <a href="https://www.sap.com/" aria-label="SAP">
      <img src="/img/logo_partner_sap.svg" alt="SAP" loading="lazy" />
    </a>
  </li>
  <li>
    <a href="https://www.arsys.es/" aria-label="Arsys">
      <img src="/showroom/scenarios/providers/arsys.svg" alt="Arsys" loading="lazy" />
    </a>
  </li>
  <li>
    <a href="https://www.cloudferro.com/" aria-label="CloudFerro">
      <img src="/showroom/scenarios/providers/cloudferro.svg" alt="CloudFerro" loading="lazy" />
    </a>
  </li>
  <li>
    <a href="https://www.datigroup.com/en" aria-label="DATI Group">
      <img src="/showroom/scenarios/providers/dati-group.svg" alt="DATI Group" loading="lazy" />
    </a>
  </li>
  <li>
    <a href="https://www.t-systems.com/gb/en/cloud-services/solutions/cloud-infrastructure/private-cloud/open-sovereign-cloud" aria-label="Deutsche Telekom, Open Sovereign Cloud">
      <img src="/showroom/scenarios/providers/deutsche-telekom.jpg" alt="Deutsche Telekom" width="56" height="56" loading="lazy" />
      <span class="sovereign-provider-caption">Open Sovereign Cloud</span>
    </a>
  </li>
  <li>
    <a href="https://www.leaseweb.com/en/" aria-label="Leaseweb">
      <img src="/showroom/scenarios/providers/leaseweb.svg" alt="Leaseweb" loading="lazy" />
    </a>
  </li>
</ul>

Available hosting options depend on the integrations enabled in your environment and your arrangements with each provider. These are not three built-in SimpleCluster modes. In particular, provisioning in your own data center needs a suitable integration. If you already have a Kubernetes cluster, you can deploy the application there with your existing tooling; SimpleCluster doesn't provide a general import flow for existing clusters.

## What happens in this scenario?

1. **Agree where the workload should run.** Check the available hosting options against location, access and operational requirements.
2. **Request the cluster.** SimpleCluster gives the customer a common way to request Kubernetes clusters, while the selected provider handles the infrastructure details.
3. **Receive cluster access.** Once provisioning is complete, the authorized operator gets access to the new cluster.
4. **Deploy and operate the application.** The customer or service provider deploys the workload and checks that it is healthy. A ready cluster is the starting point, not proof that the application is running.

The [tutorial](/docs/showroom/tutorials/simplecluster-sovereign-workloads.md) demonstrates the provisioning part with Apeiro Hosting on IronCore. Other hosting arrangements need their own provider setup. Application deployment and direct access to the target cluster are not demonstrated.

## Who operates what?

The customer chooses or approves the hosting destination. The infrastructure owner operates that environment or delegates the work. SimpleCluster and the provider integration handle cluster provisioning; they don't take over the application's full lifecycle.

The application operator handles deployment, upgrades, monitoring and removal. That can be the customer or a service provider with permission to access the cluster. Running in the customer's environment doesn't automatically remove provider access or make the customer responsible for operating the application.

Before deployment, agree who can access the environment, who handles incidents and upgrades, and who owns backups and recovery. Also decide how access is audited and revoked, and what happens to data when the service ends.

## What does this mean for sovereignty?

The benefit is a clearer choice of hosting environment without tying the application to one provider's provisioning process. But location is only one part of sovereignty. Ownership, jurisdiction, operational access and the software supply chain matter too.

The service may still rely on external identity services, management systems, image registries, DNS and network access. Choosing a location doesn't make it air-gapped, compliant or entirely customer-controlled. Moving an application also needs a plan for its data and traffic; portable deployment definitions alone don't provide migration or failover.

SimpleCluster is a demonstration project. Assess security, support and availability before considering a production setup.

## Try the provisioning flow

Follow [Provision a Kubernetes cluster with SimpleCluster](/docs/showroom/tutorials/simplecluster-sovereign-workloads.md) for the CLI commands, portal screenshots and technical resource diagrams. It covers service activation through cluster readiness, with application deployment described as a separate next step.
