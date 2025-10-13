---
sidebar_position: 13
title: Baremetal
keywords: [bos, bare-metal]
---

<!-- The increasing demand for digital sovereignty, combined with the geographical distribution of compute resources across public clouds, private data centers, and the edge, defines the modern cloud-edge continuum. This environment requires robust, compliant, and provider-agnostic infrastructure solutions. -->
Traditionally, managing physical infrastructure, specifically baremetal servers, relies on complex, imperative workflows involving custom scripting, manual interventions via Baseboard Management Controllers (BMC), and vendor-specific tools. These outdated methods produce human toil, require [ITIL frameworks](https://en.wikipedia.org/wiki/ITIL) with manual supervision for ensuring quality, and stand in stark contrast to the declarative, automated nature of modern cloud-native management, which uses APIs to define and enforce a desired state.

To address this gap, Apeiro provides its cloud-native opinion for a unified control plane capable of managing the entire physical lifecycle of hardware resources. A management service that encompasses automated Discovery, scalable Provisioning, and continuous Day-2 Operations, such as updating BIOS, managing firmware, and maintaining hardware inventory, all driven by declarative definitions.

## IronCore Baremetal Automation
<div style="float: right; width: 120px; margin: -50px 20px 0 20px; padding: 10px;">

![IronCoreBM](/baremetal/img/IronCoreBM.svg)

</div>

IronCore recognizes that Kubernetes has transcended its initial purpose as a container orchestrator only. Its API and Resource Model (KRM) have expanded to become the industry's de facto standard for declarative infrastructure management and within Apeiro IronCore it serves as generalized platform API for infrastructure automation.


[IronCore Baremetal Automation](https://ironcore.dev/baremetal/) provides a new reference for compounded software layers for inventorying, managing, and maintaining baremetal servers using Kubernetes’ cloud-native principles. It serves as the default (but not exclusive) baremetal management provider of choice in the Apeiro Reference Architecture.

It provides comprehensive APIs surrounding two main concepts:
1. out-of-band server management, and
2. in-band server boot automation.

<ApeiroFigure src="https://ironcore.dev/metal-automation-overview.png"
    alt="Baremetal Automation"
    caption="Baremetal Automation"
    width="80%"/>

## Further Information

For those interested in exploring IronCore further, including its detailed architecture, operational guides, and extension capabilities, the official IronCore Documentation is an invaluable resource. It provides comprehensive insights into setting up and managing IronCore, along with best practices and community support. You can access the documentation here
- [IronCore](https://ironcore.dev/)
- [IronCore Baremetal Automation](https://ironcore.dev/baremetal/)
- [IronCore IaaS](https://ironcore.dev/iaas/getting-started.html) _(not discussed on this page)_
- [IronCore on GitHub](https://github.com/ironcore-dev/)
