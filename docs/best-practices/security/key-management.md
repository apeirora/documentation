---
sidebar_position: 3
keywords: [Key Management, Key Management Service, KMS, Hardware Security Module,OpenKCM, HSM, DEK, KEK]
title: Key Management Service
---

This page describes the Apeiro key management service <Term>OpenKCM</Term>.
OpenKCM is a secure, scalable, and open-source Key Management solution that facilitates encryption of data at rest and allows to manage encryption keys for components of the Apeiro Reference Architecture. It is open for integration by third-party components and tailored to meet the growing demands of data protection in modern cloud environments. It helps organizations to manage cryptographic keys efficiently while ensuring compliance with stringent security and privacy standards.

## Functional Overview

- Protect root keys with a <Term>Hardware Security Module</Term> (HSM)
- Manage software keychains and the root key that protects them
- Control encryption keys across several platforms and heterogenous infrastructure providers at once
- Disable root keys to prevent access to encrypted data at rest

## Concepts

Protecting data at rest requires encryption keys to encrypt the data and a means to securely store these keys.

Encryption keys can be stored securely in a Hardware Security Module (HSM). It is a specific piece of hardware that provides means to prevent, detect, or respond to (physical) tampering of the device and usually contains dedicated processors for cryptographic operations.

Not all encryption keys are stored directly in an HSM. Instead, encryption keys usually form a hierarchy of keys, also called keychain, where an encryption key is wrapped (i.e. encrypted) by a higher-level encryption key. This process is repeated along the keychain until an encryption key is wrapped by a key that is protected by an HSM. This mechanism allows to store a small number of of encryption keys in the HSM while other encryption keys along the keychain can be stored in a regular storage as a wrapped key (i.e. encrypted).

Encryption keys can be addressed more specifically depending on their usage:
- _Level 1 Keys_: These are customer-managed keys (root keys) that provide BYOK (Bring Your Own Key) and HYOK (Hold Your Own Key) capabilities.
- _Level 2-4 Keys_: These are Key Encryption Keys (KEKs) managed by OpenKCM's _Krypton_ layer.

The concept of a keychain may exist on different levels of abstraction. For example, when looking at a database that supports encryption of data at rest, it may accept one encryption key to encrypt the data. However, in most cases, the database will internally derive additional KEKs and DEKs from that encryption key to form an internal keychain. At the same time, a keychain may exist on the level of the cluster that the database is deployed to, perhaps along with other storage systems. On that level of abstraction, the encryption key that the database expects may just be one of the DEKs of the cluster-level keychain. The cluster-level keychain may eventually ling all storage systems up to one root key, resulting in a single encryption key that is protecting all data of the cluster.

OpenKCM, takes this concept one step further and applies it to multiple clusters on the same platform or even across heterogenous infrastructure providers. It thereby offers a consistent interface for managing encryption of data at rest.

The encryption keys along the keychain of the OpenKCM can be associated with systems. This allows to manage keys and their access either individually (i.e. usually per storage backend) or from a system-centric perspective.

## Architecture

The ApeiroRA Key Management Service consists of several logical components:

- **HSM integration** allows to connect HSMs from different providers, including on-premise HSMs and Cloud HSM services.

    A selected set of HSM providers is supported out of the box. A plugin mechanism allows to add support for additional HSM providers.

- **CMK: Level 1 key management** allows to manage root keys that are protected by an HSM.

    Level 1 keys are governed through a central _CMK_ component that supports Bring Your Own Key (BYOK) and Hold Your Own Key (HYOK) capabilities, ensuring secure integration with Hardware Security Modules (HSMs).

- **Krypton** (crypto layer) Manages the hierarchy of keys, specifically governing Level 2-4 keys.

    This includes modifying the assignment of Level 1 keys to these lower-level keys for wrapping purposes or disabling Level 1 keys to prevent access to encrypted data at rest

- **Infrastructure integration** connects OpenKCM's Krypton layer to different infrastructure providers, such as <Project>IronCore</Project> or <Project>CobaltCore</Project>.

    Both IronCore and CobaltCore provide block and object storage services. They integrate with the Key Management Service out of the box.

    A plugin mechanism allows to add support for additional infrastructure providers.

<ApeiroFigure src="/security/img/kms.svg"
  alt="OpenKCM, Apeiro's key management service"
  caption="OpenKCM, Apeiro's key management service"
  width="100%"/>