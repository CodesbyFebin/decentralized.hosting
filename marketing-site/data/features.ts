import { FeatureItem } from '../types';

// Transcribed from docs/BLUEPRINT.md §4–§9 in the Go repository (revision 2,
// evidence date 2026-09-24). A label may only change here when the blueprint
// changes it, and the blueprint only changes it with new evidence.
// "Single machine" applies to every VERIFIED row: see EVIDENCE_SCOPE.

export const FEATURES_DATA: FeatureItem[] = [
  // ---------- M1 Sovereign runtime ----------
  {
    id: 'sovereign-admission', milestone: 'M1', category: 'runtime', claimStatus: 'VERIFIED',
    title: 'Hosts admit work under their own policy',
    summary:
      'Every assignment passes 18 ordered checks on the host before anything runs: signatures, audience, generation, clock, capability chain, revocation, freeze, freshness, tier, runtime, digest, attestation, federation and resource caps. The control plane proposes; the host decides.',
    evidence: 'pkg/node/sovereignty_test.go — a host refuses a control plane that holds a genuine member key',
    cliCommand: 'dh describe app web',
  },
  {
    id: 'signed-observations', milestone: 'M1', category: 'runtime', claimStatus: 'VERIFIED',
    title: 'Signed observations, replay and rollback refused',
    summary:
      'Hosts report what they actually measured in Ed25519-signed observations with monotonic sequence numbers. Replayed, forged or stale-generation messages are rejected, and signed bundles carry a state index so the control plane cannot be rolled back.',
    evidence: 'tests/integration/m1_test.go; chaos replay-forgery, stale-generation',
  },
  {
    id: 'hold-semantics', milestone: 'M1', category: 'runtime', claimStatus: 'VERIFIED',
    title: 'Control-plane outage is not a workload outage',
    summary:
      'If the control plane is frozen, unreachable or stale, admitted work keeps running (hold, not stop), new admissions are refused, and observations queue in an outbox that flushes on recovery.',
    evidence: 'chaos cp-total-outage (854/854 requests OK); m1_test.go',
    limitation:
      'One M1 subtest ("host-mode offline-hold" ledger entry) failed intermittently in 2 of 3 full-suite runs on 2026-09-24 and has not reproduced since. The cause is not established; it stays open until explained.',
  },
  {
    id: 'audit-ledger', milestone: 'M1', category: 'runtime', claimStatus: 'VERIFIED',
    title: 'Hash-chained audit you verify yourself',
    summary:
      'The control plane keeps a hash-chained ledger with signed checkpoints, and every host keeps its own fsynced journal. `dh audit verify` fetches the ledger and verifies the chain locally; backups and exports verify offline.',
    evidence: 'pkg/audit tests; 14 conformance vectors; chaos journal-corruption',
    cliCommand: 'dh audit verify',
  },

  // ---------- M2 Sovereign storage ----------
  {
    id: 'cas-storage', milestone: 'M2', category: 'storage', claimStatus: 'VERIFIED',
    title: 'Content-addressed volumes with committed snapshots',
    summary:
      'BLAKE3 content addressing with FastCDC chunking, verified on every read. Snapshots commit only when 2 replicas return signed evidence; an interrupted write rolls back to the last committed snapshot, and a lost host is restored from peers byte for byte.',
    evidence: 'tests/integration/m2_test.go; chaos interrupted-storage-write, storage-replica-loss, disk-full',
  },
  {
    id: 'anti-entropy', milestone: 'M2', category: 'storage', claimStatus: 'VERIFIED',
    title: 'Merkle anti-entropy and repair',
    summary:
      'Replicas compare 256-bucket Merkle roots and repair divergent or corrupt objects from peers, recording repair evidence per object. Corrupt objects are quarantined, not served.',
    evidence: 'chaos storage-replica-loss',
  },
  {
    id: 'erasure-coding', milestone: 'M2', category: 'storage', claimStatus: 'NOT_IMPLEMENTED',
    title: 'Erasure-coded volumes',
    summary: 'Volumes are replicated. `durability.erasure` accepts only `none`.',
    evidence: 'pkg/manifest (validation rejects other values)',
  },
  {
    id: 'volume-cli', milestone: 'M2', category: 'storage', claimStatus: 'NOT_IMPLEMENTED',
    title: '`dh volume snapshot` / `dh volume restore`',
    summary:
      'Snapshots are automatic and restore happens through rescheduling; `dh volume export` downloads and verifies a committed snapshot. Explicit snapshot and restore commands do not exist yet.',
    evidence: 'docs/BLUEPRINT.md §4 M2',
  },

  // ---------- M3 Trust and mesh ----------
  {
    id: 'capabilities', milestone: 'M3', category: 'trust', claimStatus: 'VERIFIED',
    title: 'Attenuable capability chains',
    summary:
      'Authority flows as chains of Ed25519 blocks anchored in the cluster root: root → member, member → per-assignment capability bound to host, generation, digest and resource ceilings, expiring operator sessions, and single-use join tokens.',
    evidence: 'm3_test.go; 29 conformance vectors',
    cliCommand: 'dh token --read-only --ttl 1h',
  },
  {
    id: 'key-rotation', milestone: 'M3', category: 'trust', claimStatus: 'VERIFIED',
    title: 'Host and root key rotation, emergency revocation',
    summary:
      'Host keys rotate with dual signatures and a grace window; a single key can be revoked in an emergency; the root key rotates with the old root signing the rotation and assignments re-signed.',
    evidence: 'tests/integration/m3_test.go',
    limitation: 'Root key custody (offline signer or HSM) is a hardening item, not implemented.',
  },
  {
    id: 'wireguard-mesh', milestone: 'M3', category: 'mesh', claimStatus: 'LIMITED',
    title: 'Userspace WireGuard mesh with gossip',
    summary:
      'wireguard-go on a gVisor netstack (no root, no kernel interface) with signed key bindings, and SWIM gossip inside the tunnel. Workloads are reached through per-assignment forwarders, not routed per-workload IPs.',
    evidence: 'm3_test.go; chaos network-partition',
    limitation:
      'Many real host processes, each with its own identity and WireGuard device, but all on one machine. No cross-machine, NAT or WAN run yet (PV1-S2 and PV1-S4).',
    cliCommand: 'dh mesh peers',
  },

  // ---------- M4 Edge and TLS ----------
  {
    id: 'edge-routing', milestone: 'M4', category: 'edge', claimStatus: 'VERIFIED',
    title: 'Health-gated L7 edge',
    summary:
      'Edge hosts probe replicas over the mesh and route only to healthy ones, with routing / draining / ejected / pending states. Hung replicas are ejected; rolling updates are make-before-break for stateless replicas.',
    evidence: 'm4_test.go, m5_test.go; tests/integration/rollout_test.go (0 of 139 requests failed)',
  },
  {
    id: 'acme', milestone: 'M4', category: 'edge', claimStatus: 'LIMITED',
    title: 'Automatic TLS via ACME or the cluster CA',
    summary:
      'HTTP-01, DNS-01 and wildcard issuance, with certificate state (REQUESTED … ISSUED … UNKNOWN) reported in observations.',
    evidence: 'pebble_test.go',
    limitation: 'Verified only against Pebble, locally. Never exercised against a public CA or public DNS (P0-3).',
  },
  {
    id: 'http3', milestone: 'M4', category: 'edge', claimStatus: 'NOT_IMPLEMENTED',
    title: 'HTTP/3',
    summary: 'Not implemented; the edge reports `UDP 443: NOT LISTENING`.',
    evidence: 'docs/BLUEPRINT.md §4 M4',
  },

  // ---------- M5 HA control plane ----------
  {
    id: 'raft', milestone: 'M5', category: 'control-plane', claimStatus: 'VERIFIED',
    title: 'Replicated control plane (Raft, mutual TLS)',
    summary:
      'Three or five members, a deterministic state machine, a leader-only bundle issuer, membership changes and leadership transfer. Leader loss does not interrupt workloads.',
    evidence: 'm5_test.go; chaos leader-crash — 1.2–2.2 s to a new leader, 0 failed requests (single machine, loopback)',
    cliCommand: 'dh cp status',
  },
  {
    id: 'backup-restore', milestone: 'M5', category: 'control-plane', claimStatus: 'VERIFIED',
    title: 'Signed backups and total-loss restore',
    summary: 'Control-plane backups are signed, verify offline, and restore into a freshly bootstrapped cluster after losing every member.',
    evidence: 'm5_test.go',
    cliCommand: 'dh cp backup --out cp.json && dh verify backup cp.json',
  },
  {
    id: 'tls-transport', milestone: '—', category: 'control-plane', claimStatus: 'VERIFIED',
    title: 'TLS from the first start',
    summary:
      'Members serve TLS before they have credentials; bootstrap pins the throwaway certificate by fingerprint, then members serve root-issued certificates. Hosts join over HTTPS with a token that pins the root, and Raft uses mutual TLS.',
    evidence: 'tls_test.go; validation/pv1/tls-install.sh (the install runbook, scripted)',
  },

  // ---------- M6 Chaos ----------
  {
    id: 'chaos', milestone: 'M6', category: 'resilience', claimStatus: 'VERIFIED',
    title: '17 chaos scenarios on real disposable clusters',
    summary:
      'Leader crash, total control-plane outage, host crash, agent restart, journal corruption, network partition, packet chaos, clock skew, stale generation, replay/forgery, revoked host, storage replica loss, disk full, OOM, interrupted deployment, interrupted storage write and Postgres outage — each under traffic with invariants checked and a signed report.',
    evidence: 'dh chaos run --scenario all (17/17 in REF-MAC-A03)',
    cliCommand: 'dh chaos run --scenario leader-crash',
  },
  {
    id: 'soak', milestone: 'M6', category: 'resilience', claimStatus: 'NOT_RUN',
    title: 'Long-duration soak',
    summary: '`dh chaos soak` exists but has not been run on the final build. The target is 24 hours under traffic on a multi-machine cluster (P0-2).',
    evidence: 'docs/BLUEPRINT.md §4 M6',
  },

  // ---------- M7 Federation ----------
  {
    id: 'federation', milestone: 'M7', category: 'federation', claimStatus: 'VERIFIED',
    title: 'Federation between independent clusters',
    summary:
      'Root-signed agreements let one cluster grant another bounded capacity. Placements are re-signed by the grantor, hosts still apply their own policy (quotas, allowFederated), and revocation stops the work.',
    evidence: 'tests/integration/m7_test.go (two clusters with separate roots, one machine)',
    cliCommand: 'dh federation grant --to peer --to-root KEY --out grant.json',
  },

  // ---------- M8 Conformance ----------
  {
    id: 'conformance', milestone: 'M8', category: 'protocol', claimStatus: 'LIMITED',
    title: 'Published protocol with conformance vectors',
    summary:
      'The dh/v1 specification, 136 test vectors, an adapter-protocol runner, and an independent Python implementation that passes canonical JSON, identity, envelopes, audit, capabilities, chunking and Merkle roots.',
    evidence: 'dh-conformance; go test ./pkg/conformance; conformance/python',
    limitation: 'Manifests, admission decisions, bundle verification and mesh bindings are specified but not yet pinned by vectors (P1-4).',
    cliCommand: 'dh-conformance run -self',
  },

  // ---------- Runtimes and operations ----------
  {
    id: 'runtimes', milestone: '—', category: 'runtime', claimStatus: 'LIMITED',
    title: 'Process and Docker runtimes',
    summary:
      'Run a signed executable from the cluster CAS (`process`) or a digest-pinned container image (`docker`, with enforced --memory/--cpus and OOM detection).',
    evidence: 'pkg/runtime; chaos oom (Docker)',
    limitation:
      'The process runtime does not enforce CPU or memory limits and says so in admission details (P0-6). containerd, gVisor and Firecracker are not implemented.',
  },
  {
    id: 'console', milestone: '—', category: 'operations', claimStatus: 'LIMITED',
    title: 'Operator console served by the cluster',
    summary:
      '14 screens served by every control-plane member with no third-party requests. Desired, admitted and observed state are separate everywhere; every value carries a truth basis (OBSERVED, DERIVED, CONFIGURED, PLANNED, UNKNOWN); a stalled view turns into LAST KNOWN STATE — NOT CURRENT.',
    evidence: 'web/dist; checked manually in a live browser',
    limitation: 'No automated browser test suite or accessibility audit yet (P0-7).',
    cliCommand: 'dh console --read-only',
  },
  {
    id: 'export', milestone: '—', category: 'operations', claimStatus: 'LIMITED',
    title: 'Signed, secret-free export',
    summary:
      '`dh export` writes manifests, rosters, trust configuration, host records and policies, volume metadata, artifact references, audit and federation state; `dh import` verifies and re-applies it.',
    evidence: 'cmd/dh',
    limitation: 'No automated export → import → equivalence test yet (P0-5).',
  },
  {
    id: 'no-telemetry', milestone: '—', category: 'operations', claimStatus: 'VERIFIED',
    title: 'No SaaS dependency, no telemetry',
    summary:
      'No outbound calls except those the operator configures (ACME, optional Postgres mirror). The console CSP is default-src \'self\'.',
    evidence: 'by construction and header tests; no traffic audit yet',
  },
];

export const FEATURE_COUNTS = FEATURES_DATA.reduce(
  (acc, f) => {
    acc[f.claimStatus] += 1;
    return acc;
  },
  { VERIFIED: 0, LIMITED: 0, NOT_IMPLEMENTED: 0, NOT_RUN: 0 } as Record<FeatureItem['claimStatus'], number>,
);
