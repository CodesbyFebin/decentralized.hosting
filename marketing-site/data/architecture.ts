// From docs/architecture.md and docs/trust-model.md in the Go repository.

export interface ArchComponent {
  id: string;
  name: string;
  binary: string;
  runsOn: string;
  holds: string[];
  responsibilities: string[];
  source: string;
}

export const ARCHITECTURE_COMPONENTS: ArchComponent[] = [
  {
    id: 'operator',
    name: 'Operator',
    binary: 'dh',
    runsOn: 'operator machines',
    holds: ['cluster root key (keep it offline)', 'root CA', 'config in $DH_HOME'],
    responsibilities: [
      'Creates the trust root (`dh init`), bootstraps members and invites hosts.',
      'Applies dh/v1 manifests, scales, drains, revokes, freezes.',
      'Verifies the audit ledger, backups and exports locally.',
      'Uses short-lived, attenuated capabilities derived from the root for day-to-day work.',
    ],
    source: 'cmd/dh',
  },
  {
    id: 'control',
    name: 'Control plane',
    binary: 'dh-control',
    runsOn: '1, 3 or 5 machines',
    holds: ['Raft log and snapshots (bbolt)', 'member identity and root-issued certificate', 'artifact CAS', 'optional Postgres mirror (never the source of truth)'],
    responsibilities: [
      'Replicates desired state through Raft over mutual TLS; the state machine is deterministic and holds the audit ledger.',
      'Only the verified leader issues bundles, signs assignments and reconciles; every bundle carries a state index so hosts refuse rollback.',
      'Scheduler plans placements deterministically; the reconciler turns plans into signed assignments with per-assignment capabilities and rolling updates.',
      'Verifies host observations (host key, monotonic seq) and projects views where every value carries a truth basis.',
      'Serves the operator console (no build step, CSP default-src \'self\').',
    ],
    source: 'pkg/control, cmd/dh-control',
  },
  {
    id: 'host',
    name: 'Sovereign host',
    binary: 'dh-noded',
    runsOn: 'every host',
    holds: ['host identity', 'policy.yaml (its own rules)', 'journal.jsonl (hash-chained, fsynced)', 'CAS and volume data', 'WireGuard key'],
    responsibilities: [
      'Every second: fetch the bundle and verify it chains to the pinned root, the roster and rollback protection.',
      'Admit each assignment through 18 ordered checks; on plane, clock, freeze, freshness or revocation failures, hold admitted work rather than stop it.',
      'Fetch artifacts from peers first, BLAKE3-verify every chunk, then start admitted generations (process or docker runtime).',
      'Measure processes, health, mesh, storage and edge, then sign an observation; queue it in an outbox if the control plane is unreachable.',
    ],
    source: 'pkg/node, pkg/policy, pkg/runtime, cmd/dh-noded',
  },
  {
    id: 'mesh',
    name: 'Mesh',
    binary: 'inside dh-noded',
    runsOn: 'every host and member',
    holds: ['signed wg-binding per host', 'gossip membership view'],
    responsibilities: [
      'wireguard-go on a gVisor netstack in userspace: no root, no kernel module.',
      'Hosts configure only peers whose signed key bindings verify; SWIM gossip runs inside the tunnel.',
      'The peer API serves verified chunks, Merkle bucket roots, ledgers and logs over mesh addresses.',
      'Each assignment\'s port is exposed by a forwarder that lives as long as the assignment.',
    ],
    source: 'pkg/mesh, pkg/peer',
  },
  {
    id: 'storage',
    name: 'Storage',
    binary: 'inside dh-noded',
    runsOn: 'hosts with volumes',
    holds: ['BLAKE3 content-addressed objects', 'snapshot manifests', 'replica and repair evidence'],
    responsibilities: [
      'Objects are verified on every read; corrupt objects are quarantined.',
      'Volumes are chunked with FastCDC into snapshots; a snapshot commits once two replicas return signed replica evidence.',
      'A moved replica restores the last committed snapshot, so an interrupted write rolls back cleanly.',
      'Replicas compare 256 Merkle bucket roots and repair only the differing buckets, recording evidence.',
    ],
    source: 'pkg/storage',
  },
  {
    id: 'edge',
    name: 'Edge',
    binary: 'dh-noded --roles edge',
    runsOn: 'edge hosts',
    holds: ['routing table from the bundle', 'certificates (cluster CA or ACME)'],
    responsibilities: [
      'L7 reverse proxy over the mesh, fed by the bundle\'s routing table and its own probes.',
      'Endpoints are routing, draining, ejected or pending; hung replicas are ejected on first-byte timeout.',
      'Certificates via ACME (HTTP-01, DNS-01, wildcards) or the cluster-local CA; states reported verbatim.',
    ],
    source: 'pkg/edge',
  },
];

// The path a deployment takes. Each step names where it happens.
export const LIFECYCLE = [
  { step: 'Apply', where: 'dh → control plane', what: 'A dh/v1 manifest is validated strictly (unknown fields rejected), normalized, hashed and committed through Raft as desired state.' },
  { step: 'Plan', where: 'control plane', what: 'The deterministic scheduler filters hosts by tier, resources, architecture, features, anti-affinity and failure domain. `dh explain app` shows the plan.' },
  { step: 'Sign', where: 'control plane (leader)', what: 'The reconciler issues signed assignments, each with a capability bound to one host, generation, artifact digest and resource ceiling.' },
  { step: 'Admit', where: 'host', what: 'The host checks the pinned root, roster, signature, audience, generation, clock, capability chain, revocation, freeze, freshness and its own policy — 18 checks, in order.' },
  { step: 'Run', where: 'host', what: 'Artifact chunks are fetched from peers and BLAKE3-verified; the admitted generation starts under the process or docker runtime.' },
  { step: 'Observe', where: 'host → control plane', what: 'The host signs what it measured. Nothing is shown as running until a host has observed it; desired, admitted and observed stay separate.' },
  { step: 'Route', where: 'edge', what: 'Edge hosts probe replicas over the mesh and route only to healthy ones.' },
  { step: 'Verify', where: 'anyone with the ledger', what: '`dh audit verify` checks the hash chain and signed checkpoints locally; hosts keep their own ledgers too.' },
];

export const TRUST_ANCHORS = [
  { key: 'Cluster root', heldBy: 'operator, offline', can: 'sign rosters, delegate to members, create invites, sign root rotations, grant federation, attest artifacts', cannot: 'run anything on a host whose policy refuses it' },
  { key: 'Member key', heldBy: 'each control-plane member', can: 'sign bundles and assignments within its root delegation', cannot: 'enlarge the roster, change host policy, roll a host back, issue work for a revoked host' },
  { key: 'Host key', heldBy: 'each host', can: 'sign enrollment, observations, wg-binding, storage evidence, its own ledger', cannot: 'speak for another host; its signed seq cannot be replayed' },
  { key: 'Session capability', heldBy: 'operator browser or CLI', can: 'act as api.read / api.write / api.admin until it expires', cannot: 'exceed the caveats of any block in its chain' },
];

export const FAILURE_CASES = [
  { c: 'Control plane down or partitioned', o: 'offline-hold: admitted work continues, new work refused, observations queued', t: 'chaos cp-total-outage, network-partition; M1' },
  { c: 'Compromised member (valid member key)', o: 'can only sign within its delegation; every host still applies its own policy; rollbacks and impostor keys refused', t: 'pkg/node/sovereignty_test.go' },
  { c: 'Replayed, forged or tampered observation', o: 'rejected with a specific reason; state unchanged', t: 'chaos replay-forgery; M1' },
  { c: 'Stolen host key', o: '`dh node revoke-key` revokes that key', t: 'M3' },
  { c: 'Revoked host', o: 'cut from mesh and routing, replicas rescheduled, new admission blocked', t: 'chaos revoked-host; M3' },
  { c: 'Host clock skew', o: 'CLOCK_SKEW detected from bundle timestamps; admitted work held', t: 'chaos clock-skew' },
  { c: 'Host ledger tampering', o: 'LEDGER_CORRUPT; no appends to the broken chain; operator seal recovers with the break recorded', t: 'chaos journal-corruption' },
  { c: 'Audit ledger truncation or rewrite', o: 'detected offline by hash chain and signed checkpoints', t: 'pkg/audit; M1' },
  { c: 'Storage corruption', o: 'BLAKE3 verification on read; quarantine; repair from peers with evidence', t: 'M2; chaos storage-replica-loss, disk-full' },
  { c: 'Network observer', o: 'TLS on member APIs from first start, pinned bootstrap, mutual-TLS Raft, WireGuard between hosts', t: 'tls_test.go; M7' },
];

export const DELIBERATE_LIMITS = [
  'The root key is the single anchor. Rotation is supported, but a stolen root can sign a rotation — keep it offline.',
  'A member with a valid delegation can sign harmful-but-permitted work (for example, scaling an app to zero). Host policy bounds what runs; it cannot judge intent. Use `dh freeze` if you suspect compromise.',
  'The process runtime does not enforce CPU or memory limits; admission details say so. Use the docker runtime for enforcement.',
  'Session capabilities are bearer tokens. They stay in sessionStorage and the URL fragment, never server logs, and expire.',
];
