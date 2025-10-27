---
sidebar_position: 12
title: Operating Systems
keywords: [os, container-os]
---
<div style="float: right; width: 120px; margin: -50px 20px 0 20px; padding: 10px;">

![GardenLinux](/operating-system/img/gardenlinux.svg)

</div>

[Garden Linux](https://gardenlinux.io) is the default (but not exclusive) Linux Operating System of choice in the Apeiro Reference Architecture.

Modern cloud-native operating systems are purpose-built to run containerized workloads, Kubernetes clusters, and virtual machines efficiently and securely. Unlike traditional general-purpose operating systems, these platforms are designed to be minimal, optimized, secure by default, and support atomic and ephemeral operations.

<ApeiroFigure src="/operating-system/img/Linux-OS.svg"
  alt="A layered perspective on modern Linux operating systems"
  caption="A layered perspective on modern Linux operating systems (colors used for clarity only)"
  width="100%"/>

## Key Characteristics

### Minimal and Optimized

A cloud-native operating system is stripped down to the essentials. It includes only the components required to run containers and orchestrate workloads, reducing the attack surface and resource consumption. This minimalism leads to faster boot times, smaller images, and easier maintenance.

### Secure by Default

Security is a foundational principle. Modern operating systems for containerized workloads implement:
- Immutable root filesystems to prevent unauthorized changes
- Principle of least privilege for all services and users
- Built-in security modules (e.g., SELinux, AppArmor, seccomp)
- Automated and atomic updates to quickly patch vulnerabilities


### Atomic and Ephemeral

Cloud-native operating systems support atomic upgrades and rollbacks, ensuring system consistency and reliability. Nodes are designed to be stateless and disposable, making it easy to recover from failures and scale clusters dynamically.

## Integration with Kubernetes and Containers

These operating systems natively support container runtimes such as containerd or CRI-O and are optimized for orchestration platforms like Kubernetes. They often include tools for automated provisioning (e.g., cloud-init, Ignition) and are built to integrate seamlessly with CI/CD pipelines and cloud infrastructure.

## Use Cases

- **Kubernetes Clusters:** Providing a stable, secure, and minimal base for Kubernetes nodes.
- **OCI Containers:** Running containerized applications with optimal performance and security.
- **Virtual Machines:** Supporting lightweight VMs for additional isolation or legacy workloads.
- **Regulatory Requirements:** Provide a digital commons for community collaboration for [security and compliance](https://gardener.cloud/docs/security-and-compliance/).

## Garden Linux: The Default Cloud-Native OS for Apeiro

[Garden Linux](https://gardenlinux.io), based on Debian GNU/Linux, is the default cloud-native operating system for Apeiro. It is purpose-built for running containerized workloads and Kubernetes clusters, providing a minimal, secure, and robust foundation. Garden Linux is used by Gardener for all Kubernetes conformance tests, ensuring full compatibility and reliability for cloud-native environments (cf. [Gardener Extension for Garden Linux](https://gardener.cloud/docs/extensions/os-extensions/gardener-extension-os-gardenlinux/))

<ApeiroFigure src="/badges/certified-kubernetes-color.svg"
  alt="Certified Kubernetes Logo"
  caption="Gardener is a fully certified Kubernetes solution and uses Garden Linux for all Kubernetes conformance tests"
  width="20%"/>

For more details and daily, transparent data proof, see the [Gardener conformance test results](https://testgrid.k8s.io/conformance-gardener). They are exclusively run with Garden Linux.

In conclusion, modern cloud-native operating systems are a critical foundation for scalable, secure, and efficient containerized infrastructure. By embracing minimalism, security, and atomic operations, a purpose built distribution, like Garden Linux, enable organizations to run Kubernetes, containers, and VMs with confidence and agility.

In the Apeiro Reference Architecture, Garden Linux hopes to push the envelope for an enterprise-ready, cloud-native, and freely available Container Linux.
