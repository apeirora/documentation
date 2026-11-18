---
title: "Beyond Reporting: Toward Sustainable Data Center Operations"
authors:
  - hector-martinez
  - martina-doherr
tags:
  - sustainability
  - datacenter
---

In August 2027, data centers in Europe gain something they have never had before: a public grade for their energy and water efficiency, from A to G. An A will be an argument in procurement; a G perhaps not.

<!-- truncate -->

That grade is arriving because the stakes keep growing. Demand for data center capacity is rising quickly, driven by cloud computing and AI, and electricity demand from these facilities is projected to more than double by 2030, with AI-focused facilities set to more than triple (potentially quadruple) their consumption ([IEA](https://www.iea.org/reports/energy-and-ai)). Whether that expansion happens sustainably has become an open question that regulation is increasingly turning into concrete requirements.

A companion post in this series follows electricity onto the grid and asks when a green claim should have to match the hour it is used in.
<!-- TODO (OPEN 1): Link zum "Hourly Electricity"-Begleitbeitrag ergänzen, sobald Titel und URL final sind. -->

This article describes some of the challenges of sustainable cloud operations; the increasing push for more efficient facilities, driven in part by new and upcoming regulation; and how more granular reporting could help to build more sustainable operations. ApeiroRA treats sustainability as part of the architecture; the work described here sits with a dedicated sustainable operations team. This post explains our vision with respect to these challenges.

## Growth Meets the Rulebook

The growth itself is not the problem; its accountability is. AI workloads require substantial compute, and that compute carries energy, water and carbon costs that cannot be set aside. The realization is reaching beyond operators to the software companies that build on them: under the CSRD, large companies must report Scope 3 emissions, including the carbon embedded in the cloud services they consume ([CSRD](https://finance.ec.europa.eu/capital-markets-union-and-financial-markets/company-reporting-and-auditing/company-reporting/corporate-sustainability-reporting_en)). For a large SaaS company like SAP, with more than 440,000 customers and 300 million cloud users ([SAP](https://www.sap.com/about/company.html)), the sustainability performance of its underlying infrastructure is no longer an internal matter.

Sustainability performance is now a **regulatory requirement** rather than a voluntary one.

The EU has introduced mandatory annual reporting of data center efficiency metrics and, from 2027, a public efficiency rating. For operators, that creates two distinct demands: measure and report accurately, and improve.

## The Measurement Gap

The sustainability challenge in data centers is not a lack of ambition; most operators understand the stakes. The challenge is measurement, and the distance between what customers demand and what infrastructure can actually deliver in terms of data.

Energy consumption is tracked at the facility level, often directly from the power distribution units (PDUs). Correlating that use to specific workloads, racks or tenants remains difficult. Water is barely measured at all: most facilities rely on a single site-level meter, read periodically, reported as an annual total. And carbon accounting at the workload level is hard to achieve in most operations.

Current regulatory frameworks do not yet enforce this granularity, and the status quo could hold for a while. But front-runners are already reporting well beyond the minimal requirements, and the direction of travel is clear. Betting against finer measurement is a poor strategy.

The result is a strange asymmetry: facilities can measure CPU, but the attribution of CO₂ emissions is mostly known only as totals. Closing that gap between IT telemetry and resource telemetry is what our sustainable operations work aims to address.

## From Reporting to Rating

The starting point is mandatory reporting. Under the EU Energy Efficiency Directive, data centers with 500 kW or more of installed IT power must report their energy consumption, power utilization, temperature set points, waste heat utilization, water usage and renewable energy share each year ([EED](https://energy.ec.europa.eu/topics/energy-efficiency/energy-efficiency-targets-directive-and-rules/energy-efficiency-directive_en); reporting scheme).
<!-- TODO: Link zum "reporting scheme" (EU-Meldeschema für Rechenzentren) ergänzen. -->
Uptake has so far been partial: in the first reporting period, only about 36% of the data centers covered by the obligation reported (European Commission).
<!-- TODO: Quelle/Link "European Commission" (36 %-Zahl zum ersten Meldezeitraum) ergänzen. -->

Several of these figures are condensed into standard efficiency indicators. The best known is Power Usage Effectiveness (PUE): the ratio between the total energy a facility draws and the energy that reaches its IT equipment. A value close to 1 means almost all energy is spent on computing rather than on overhead such as cooling. Water Usage Effectiveness (WUE) plays the equivalent role for water.

With the EU Data Centre Energy Label, proposed in September 2026 and with labels expected from August 2027, these indicators move from disclosure to assessment (European Commission). The label grades facilities from A to G:
<!-- TODO: Quelle/Link "European Commission" (EU Data Centre Energy Label, Vorschlag September 2026) ergänzen. -->

| Grade | PUE | Reading |
| --- | --- | --- |
| A | 1.15 or below | Almost all the energy drawn reaches the IT equipment |
| G | above 1.9 | The facility draws almost two units for every one that reaches a server |

*End points of the proposed A–G scale; intermediate grades scale accordingly.*

A grade is not something an operator can change through better observability alone; improving it requires running the facility more efficiently. Planned minimum performance standards are expected to reinforce this, setting levels that facilities must meet rather than only report (European Commission).
<!-- TODO: Quelle/Link "European Commission" (geplante Mindestleistungsstandards) ergänzen. -->

It is fair to ask whether operators need yet another form to fill in. The label is different in kind: it grades. A reported PUE of 1.6 changes nothing by itself; a public G next to the facility's name may change procurement decisions, financing conditions and customer conversations. The label turns efficiency from a disclosure into a competitive variable.

This is where observability and operations meet. As with the better emissions attribution described earlier, at the level of the facility better metric observability could help to drive more sustainable operations. Fine-grained measurement is a prerequisite for optimization, because an operator cannot improve what it cannot see. Once the data is available, it can inform decisions that lower consumption — placing workloads where energy and capacity are used most efficiently, or adjusting cooling to match actual conditions. The aim of our sustainable operations work is therefore twofold: make reporting easier and more reliable at all layers in the stack, and, through better observability, enable operators to act more efficiently.

## An Open Foundation

We approach this through open standards and open source rather than proprietary tooling. For publicly funded European infrastructure, openness is part of the brief – and here it happens to be the practical choice as well: data centers are heterogeneous environments, assembled from equipment and software supplied by many vendors, and sustainability data must flow across all of them. Open, vendor-neutral interfaces make this possible without tying operators to a single supplier. A reporting problem should not be traded for a lock-in problem.

This builds on the observability foundation described in our earlier work on [Immersive Data Centre Management](./2026-02-04-sustainability-immersive-data-center.md): an open telemetry pipeline that gathers data from power distribution units, environmental sensors and IT workloads. Some of the same open components that support operational monitoring can carry sustainability metrics, which avoids maintaining a separate, parallel system – and with it provides a single source of truth.

Around this foundation, a wider ecosystem of open-source tools for measuring and reducing the environmental impact of compute is taking shape. That ecosystem deserves an article of its own; here it is enough to note that our contribution is designed to interoperate with it rather than to replace it.

## The Road Ahead

Sustainability reporting for data centers is moving **from voluntary to mandatory**, and from annual, facility-level figures towards more continuous and more granular data. Regulation is likely to continue in this direction.

Addressing this is the remit of our dedicated sustainable operations team. Its work covers multiple sides of the problem described here: making environmental performance easier to measure and report, and helping operators use that information to run their technology stack more efficiently. It sits alongside a growing ecosystem of open-source green tooling and an evolving regulatory landscape, rather than apart from them.

Sustainable operations and digital sovereignty are not separate goals. We treat them as part of the same open foundation for Europe's cloud-edge infrastructure.

If you would like to discuss data center sustainability, resource telemetry or carbon-aware operations and want to collaborate, contact us at [apeiro@sap.com](mailto:apeiro@sap.com).
