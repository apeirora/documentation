---
title: "From Urgency to Reality: Building the Crypto Broker"
authors:
  - anselme-tueno
tags:
  - crypto-agility
  - post-quantum-cryptography
  - open-crypto-broker
  - fips
  - sidecar
---

## Recap: Why We Started

In late 2022 we published *"On the Urgency of Crypto-Agility"* [^1], arguing that the quantum threat, together with NIST's then-unfinished Post-Quantum Cryptography (PQC) standardization, meant applications had to change how they consume cryptography. The argument came down to one rule: applications should not call cryptographic algorithms by name. They should delegate cryptographic operations to a configurable broker that can be updated without touching application code.

Since then the deadline has moved closer. NIST finalized ML-KEM (formerly KYBER), ML-DSA (formerly DILITHIUM), and SLH-DSA (formerly SPHINCS+) in 2024 [^2], and organizations now face regulatory timelines for PQC migration. The whiteboard concept from 2022 is now a working open-source implementation, the Crypto Broker.

<!-- truncate -->

## What Is the Crypto Broker?

The Crypto Broker is a sidecar service that decouples an application from the cryptographic algorithms it uses. Applications call a thin client library, which talks over a Unix Domain Socket (UDS) to the Crypto Broker Server running as a co-located process. The server performs the operation and returns only the result. The application never names an algorithm, never links a crypto library, and never needs to be rebuilt to switch algorithms.

```
Application → Client Library → [Unix Socket] → Crypto Broker Server → Crypto Provider
                                                        ↑
                                               Profile Configuration
```

Crypto-agility lives in the profile: a YAML file that defines named profiles, each specifying the algorithms, key constraints, validity rules, and key-usage flags per operation. Swapping algorithms means editing that file and restarting the sidecar. The application binary is untouched.

Here is the call in Go:

```go
import cryptobrokerclientgo "github.com/open-crypto-broker/crypto-broker-client-go"

lib, _ := cryptobrokerclientgo.NewLibrary(ctx)

resp, _ := lib.HashData(ctx, cryptobrokerclientgo.HashDataPayload{
    Profile: "default",
    Input:   data,
})
// resp.HashValue is the digest. resp.HashAlgorithm tells you which algorithm was used.
```

And in TypeScript:

```typescript
import { CryptoBrokerClient } from "@open-crypto-broker/cryptobroker-client";

const client = await CryptoBrokerClient.NewLibrary();

const resp = await client.hashData({
    profile: "default",
    input: Buffer.from(data),
});
// resp.hashValue is the digest. resp.hashAlgorithm tells you which algorithm was used.
```

Note what is missing. The constructor takes no socket path, because the socket location is fixed and managed by the platform. And the profile name `"default"` is the only cryptographic decision the application makes. Which algorithm, which key size, whether FIPS is enforced: all of it lives in the profile YAML, controlled by the platform team.

## The Open-Source Ecosystem

The project is a family of repositories under the [open-crypto-broker](https://github.com/open-crypto-broker) GitHub organization:

| Repository | Role |
|------------|------|
| `crypto-broker-server` | The gRPC server |
| `crypto-broker-client-go` | Go client library |
| `crypto-broker-client-js` | Node.js / TypeScript client library |
| `crypto-broker-cli-go` | Go CLI for testing and benchmarking |
| `crypto-broker-cli-js` | Node.js CLI |
| `crypto-broker-proto` | Shared Protobuf definitions (Git submodule) |
| `crypto-broker-deployment` | Deployment recipes for Docker and Kubernetes |
| `crypto-broker-documentation` | Architecture docs, ADRs, and specs |

Splitting protocol, client SDK, server, CLI, and deployment lets each layer evolve on its own, and lets a new language client be added without touching the server.

## Key Architectural Decisions

### gRPC over Unix Domain Sockets

Between gRPC and plain HTTP, the team chose gRPC ([ADR-0004](https://github.com/open-crypto-broker/crypto-broker-documentation/blob/main/adr/overall/0004-communication-protocol.md)), for its binary Protobuf serialization, HTTP/2 multiplexing, multi-language code generation, and a contract-first interface defined in `.proto` files. Communication runs exclusively over a local Unix Domain Socket, so cryptographic material never leaves the pod boundary. There is no TLS to configure or pay for; the OS enforces isolation through file permissions on the socket.

### The Sidecar Pattern on Kubernetes

The broker runs as a second container in the application's pod ([ADR-0003](https://github.com/open-crypto-broker/crypto-broker-documentation/blob/main/adr/overall/0003-sidecar-alternatives.md)). Both containers mount a shared `emptyDir` volume at `/tmp`, which holds the Unix socket. That shared volume is what makes the socket reachable from the application container without any network configuration, and the socket is only accessible from within the pod.

```yaml
volumes:
  - name: socket-volume
    emptyDir: {}            # broker and app share /tmp for the UDS socket
containers:
  - name: app
    volumeMounts:
      - name: socket-volume
        mountPath: /tmp
  - name: crypto-broker
    env:
      - name: CRYPTO_BROKER_PROFILES_DIR
        value: /app/profiles
    volumeMounts:
      - name: socket-volume
        mountPath: /tmp
```

The Kubernetes deployment is packaged as a Helm chart (`kube-broker`).

### Profile-Driven Crypto-Agility

A profile is a named YAML document that specifies the full cryptographic policy for each API:

```yaml
- Name: default
  Settings:
    CryptoLibrary: native
    FIPS: true
  API:
    HashData:
      HashAlg: sha3-256
    SignCertificate:
      SignAlg: ecdsa
      HashAlg: sha-512
      Validity:
        ValidNotBeforeOffset: -1h
        ValidNotAfterOffset: 8760h
      KeyConstraints:
        Subject:
          ECDSA:
            MinKeySize: 256
            MaxKeySize: 521
```

When a PQC algorithm such as ML-DSA becomes available in the underlying provider, an operator who needs to migrate edits the profile and restarts the sidecar. The application code does not change. This is the "config-file update instead of rebuild" idea from the 2022 article, now running.

The zero-application-change promise holds within a class of algorithms. The first migration from classical to PQC is the exception, and the reason is size: PQC signatures and ciphertexts are much larger than their classical equivalents. An ML-DSA-65 signature is about 3,300 bytes; an ECDSA P-256 signature is 64 bytes. Applications with hardcoded buffer sizes, fixed database column widths, or message-size limits have to accommodate that on the first migration. Once they do, later migrations between PQC schemes are again just a profile edit.

### FIPS 140-3 Compliance

FIPS 140-3 compliance is a hard requirement for regulated customers, and the broker enforces it at two points: build and run ([ADR-0007](https://github.com/open-crypto-broker/crypto-broker-documentation/blob/main/adr/overall/0007-fips140-3-mode.md)).

```bash
# Build: pin the FIPS 140-3 module version
GOFIPS140=v1.0.0 go build -o bin/cryptobroker-server cmd/server/server.go

# Run: activate FIPS enforcement
GODEBUG=fips140=on ./cryptobroker-server
```

Go 1.24 introduced a native Go Cryptographic Module, under NIST CMVP review as of 2025. Pinning `GOFIPS140` at build time bakes an immutable reference to the validated code into the binary. The runtime flag then decides how strictly that code is used: `fips140=on` allows FIPS-approved algorithms, while `fips140=only` refuses any call to non-approved algorithms outright. Regulated environments (banking, healthcare, government) tend to want both the build-time proof and the runtime enforcement.

There is a caveat for regulated adopters: the FIPS-validated native provider and the PQC algorithms are not yet the same path. Today's FIPS build covers the classical algorithms in Go's validated module. ML-DSA and ML-KEM enter through the roadmap as they land in Go's standard library. Until they are part of a validated module, FIPS-mode and PQC are separate choices, not one.

FIPS mode is a platform concern. The application code is unchanged either way.

## Observability

A production sidecar has to be observable, and the Crypto Broker Server ships with OpenTelemetry instrumentation across traces, metrics, and logs.

Every gRPC handler opens a span carrying the profile, RPC method, input and output sizes, the algorithm actually used, and a `correlationId`. That correlation ID links the broker operation back to the originating application request, so an audit trail survives across the service boundary, which matters during a migration window when old and new algorithms coexist. Counters and histograms cover request totals, request duration, per-algorithm operation counts, and bytes processed. Logs use Go's `log/slog`, bridged to the OTel log exporter, and carry the same profile and algorithm attributes as the spans.

Telemetry goes to any OpenTelemetry-compatible backend (Grafana, Jaeger, Prometheus, SAP Cloud Logging) without rebuilding the server.

## The APIs Today

The server performs two cryptographic operations today:

| Procedure | Purpose |
|-----------|---------|
| `HashData` | Hashes arbitrary bytes using the algorithm named in the profile |
| `SignCertificate` | Signs an X.509 CSR with the CA cert and key, under the profile's constraints |

Two more gRPC endpoints exist for operating the broker rather than doing cryptography for callers: `Benchmark` runs server-side performance benchmarks, and `FakeEndpoint` is a test-only endpoint for connectivity checks.

Each request carries a `Metadata` envelope with a `TraceContext` (trace ID, span ID, correlation ID). Responses include algorithm metadata, `hashAlgorithm` on a hash response and the signed certificate bytes on a sign response, so a client can record what was actually used. That record is what a compliance audit needs, and what makes a migration window auditable while two algorithms are in play.

## From Concept to Ecosystem: What Changed

Turning the 2022 concept into an implementation clarified a few things.

A commenter on the original post asked, in January 2025, whether the Crypto Broker is a separate program, a separate node, or just a logically distinct component. It is a separate running process, a dedicated container or sidecar, not a library linked into the application. That is the choice that makes the upgrade path work: the sidecar is updated, the application binary is not.

The original article sketched a language-agnostic broker, but adoption turned out to depend on giving developers a client that feels native in Go and Node.js/TypeScript, so they can call the broker without knowing anything about gRPC or Protobuf. Leaving the socket path out of the constructor is part of that: the platform owns the socket location, and the developer never sets it.

PQC immaturity became the strongest argument for profiles. SIKE fell to a classical attack in 2022. KYBER and DILITHIUM had their security margins revised. When an algorithm is retired, even abruptly, the profile system lets an operations team swap it in configuration and redeploy the sidecar without touching the application. The one caveat is the same as before: the first classical-to-PQC migration asks the application to handle larger artifacts. The broker handles the algorithm change; the application only has to handle the larger sizes, and only on that first migration.

FIPS came up in every enterprise conversation. Enough teams asked about it early that FIPS 140-3 moved from a nice-to-have to a documented, ADR-backed decision requiring both the build-time module pin (`GOFIPS140`) and the runtime enforcement flag (`GODEBUG=fips140=on`).

On Kubernetes, mounting profiles from a ConfigMap gives them a GitOps lifecycle independent of the server image, so a policy change is a config change and does not touch the server build.

## What's Next

The two operations above are what runs today. The v1.0 roadmap adds more:

- `SignData` / `VerifyData`: signing and verifying arbitrary data, not just X.509 certificates. `VerifyData` matters for migration, because the profile's `AcceptedSignAlgs` list lets it verify both old and new signatures during a transition.
- `EncryptData` / `DecryptData`: symmetric AEAD encryption, with an `AcceptedEncAlgs` migration window for decryption.
- `EncapsulateKey` / `DecapsulateKey`: Key Encapsulation Mechanism (KEM) support, for quantum-safe key exchange, which NIST treats as the first and most urgent PQC requirement.
- `IssueToken`: JWT issuance with algorithm agility, so token signing gets the same profile-driven migration.

On the platform side: default PQC profiles for ML-DSA-65 and ML-KEM-768 as they land in Go's standard library; more client libraries (Java, Python, Rust); and KMS integration for broker-mediated key resolution and lifecycle management against external key management systems.

## Try It Yourself

The whole project is open source:

- Server: [github.com/open-crypto-broker/crypto-broker-server](https://github.com/open-crypto-broker/crypto-broker-server)
- Go client: [github.com/open-crypto-broker/crypto-broker-client-go](https://github.com/open-crypto-broker/crypto-broker-client-go)
- JS client: [github.com/open-crypto-broker/crypto-broker-client-js](https://github.com/open-crypto-broker/crypto-broker-client-js)
- Deployment: [github.com/open-crypto-broker/crypto-broker-deployment](https://github.com/open-crypto-broker/crypto-broker-deployment)

The CLI tools (`crypto-broker-cli-go`, `crypto-broker-cli-js`) let you exercise a running broker without writing any application code:

```bash
# Hash data with a specific profile
./go-client-cli hash --profile=default "Hello, Crypto Broker"

# Sign a certificate
./go-client-cli sign --profile=default \
  --csr=server.csr --caCert=ca.crt --caKey=ca.key

# Health check
./go-client-cli health
```

## Conclusion

Three years ago we argued that crypto-agility was urgent. With NIST's first PQC standards finalized, migration timelines being set, and candidate algorithms still falling to classical attacks, the case has only hardened.

What the Crypto Broker gives you is a place to absorb that change: a sidecar that isolates cryptographic operations behind a profile-driven API, so that when the next algorithm breaks or the next standard is mandated, the response is a configuration change rather than an emergency release. The application team adds one dependency and names a profile; the platform team owns the algorithm choice, the FIPS enforcement, and the audit trail.

Where things actually stand: `HashData` and `SignCertificate` run in production. Encryption, KEM, data signing, and JWT are on the roadmap, and PQC support tracks Go's standard-library maturity. The threat model from the 2022 article has not changed. The difference now is that an implementation exists to deploy against it.

*This article is based on the open-source Crypto Broker project. All architectural decisions referenced are documented in the `crypto-broker-documentation` repository ADR directory.*

[^1]: Tueno, A. *On the Urgency of Crypto-Agility*. SAP Community, November 2022. <https://community.sap.com/t5/application-development-and-automation-blog-posts/on-the-urgency-of-crypto-agility/ba-p/13564892>

[^2]: NIST. *Post-Quantum Cryptography Standardization: Final Standards*. NIST FIPS 203, 204, 205. August 2024. <https://csrc.nist.gov/projects/post-quantum-cryptography>

[^3]: Go Security. *FIPS 140-3 Compliance in Go*. <https://go.dev/doc/security/fips140>

[^4]: open-crypto-broker. *Architecture Documentation*. <https://github.com/open-crypto-broker/crypto-broker-documentation>

[^5]: Ott, D., Peikert, C., et al. *Identifying Research Challenges in Post Quantum Cryptography Migration and Cryptographic Agility*. CCC Workshop Report, 2019. arXiv:1909.07353.

[^6]: NIST. *Considerations for Achieving Crypto Agility*. NIST CSWP 39. December 2025. <https://nvlpubs.nist.gov/nistpubs/CSWP/NIST.CSWP.39.pdf>
