// Transcribed from evidence/INDEX.md and evidence/REF-MAC-A03/record.json in
// the Go repository. Attempts are never removed from this list, including
// failed and infrastructure-failed ones -- the same rule the evidence
// directory itself follows.

export type Outcome = 'PASS' | 'FAIL' | 'INFRA_FAILURE' | 'PENDING';

export interface Attempt {
  id: string;
  stage: string;
  environment: string;
  digest: string;
  outcome: Outcome;
  verified: 'VERIFIED' | 'no record' | '—';
  note: string;
}

export const ATTEMPTS: Attempt[] = [
  {
    id: 'PV1-S1-A01', stage: 'PV1-S1', environment: 'Colima VM on macOS',
    digest: 'b3:5bde0c09… (digest/0)', outcome: 'INFRA_FAILURE', verified: 'no record',
    note: 'The VM stopped before anything ran. Says nothing about the software.',
  },
  {
    id: 'PV1-S1-A02', stage: 'PV1-S1', environment: 'Linux container in a 2-vCPU Colima VM',
    digest: 'b3:5bde0c09… (digest/0)', outcome: 'FAIL', verified: 'VERIFIED',
    note: 'Diagnostic only. Found product defects D1 (an edge refused its own replica) and D2 (rolling updates dropped requests); both reproduced on macOS and were fixed with regression tests.',
  },
  {
    id: 'REF-MAC-A01', stage: 'REF-MAC', environment: 'macOS reference (Mac mini, i5-8500B, 8 GB)',
    digest: 'b3:73d7ee46… (digest/1)', outcome: 'PASS', verified: 'VERIFIED',
    note: 'All 13 steps passed, but digest/1 left pkg/evidence out of the source identity. Superseded.',
  },
  {
    id: 'REF-MAC-A02', stage: 'REF-MAC', environment: 'macOS reference, same machine',
    digest: 'b3:2832989a… (digest/2)', outcome: 'FAIL', verified: 'VERIFIED',
    note: 'A test race in the dead-holder regression test, and an M2 read timeout that refuted the first diagnosis of D4.',
  },
  {
    id: 'REF-MAC-A03', stage: 'REF-MAC', environment: 'macOS reference, same machine',
    digest: 'b3:2a23e1da… (digest/2)', outcome: 'PASS', verified: 'VERIFIED',
    note: 'Current baseline. All 13 steps on the first attempt: 10/10 integration, 17/17 chaos with no skips, gossip join 20/20, conformance including Python, scripted TLS install.',
  },
  {
    id: 'PV1-S1-A03', stage: 'PV1-S1', environment: 'independent Linux VM (≥ 4 vCPU, 8 GB)',
    digest: 'must be b3:2a23e1da…', outcome: 'PENDING', verified: '—',
    note: 'The first authoritative Linux run. An offline kit for Linux amd64 is published on the pv1-offline-kit branch.',
  },
];

// Steps of REF-MAC-A03, with wall-clock seconds from its signed record.
export const BASELINE_STEPS: { name: string; seconds: number }[] = [
  { name: 'build', seconds: 2 },
  { name: 'vet', seconds: 1 },
  { name: 'gofmt', seconds: 0 },
  { name: 'unit tests with -race', seconds: 13 },
  { name: 'gossip join × 20', seconds: 13 },
  { name: 'tools (Pebble)', seconds: 2 },
  { name: 'conformance drift check', seconds: 0 },
  { name: 'conformance — Go in process', seconds: 0 },
  { name: 'conformance — Go over stdio', seconds: 0 },
  { name: 'conformance — independent Python', seconds: 3 },
  { name: 'integration (M1–M7 + regressions)', seconds: 223 },
  { name: 'chaos (17 scenarios)', seconds: 397 },
  { name: 'scripted TLS install runbook', seconds: 10 },
];

export const BASELINE_SCOPE =
  'macOS reference environment: the development Mac mini (Intel i5-8500B, 6 cores, 8 GB, APFS), multi-process over loopback; Docker via Colima for the oom and postgres scenarios.';

export const BASELINE_EXCLUSIONS = [
  'multi-machine behaviour (single machine, loopback transport)',
  'public ACME (Pebble only)',
];

export const DEFECTS: { id: string; title: string; status: string }[] = [
  { id: 'D1', title: 'An edge host could not route to a replica it ran itself.', status: 'fixed; tests/integration/edge_self_test.go' },
  { id: 'D2', title: 'Rolling updates dropped requests (stop-before-start).', status: 'fixed with make-before-break; tests/integration/rollout_test.go' },
  { id: 'D3', title: 'A rescheduled replica could wait minutes on a dead artifact holder.', status: 'fixed with failed-holder backoff; fetch_dead_holder_test.go' },
  { id: 'D4', title: 'The D2 fallback could send a request to a dead host and hang it.', status: 'fixed: draining endpoints need proof of life within 3 s; pkg/edge/pick_test.go' },
  { id: 'D5', title: 'A revoking member kept the revoked host as a mesh peer for up to 2 s.', status: 'fixed: committed changes refresh the member\'s mesh at once; M3' },
  { id: 'M1', title: '"host-mode offline-hold" ledger entry missing after an outage (2 of 3 runs on 2026-09-24).', status: 'OPEN — not reproduced since; cause not established; diagnostics added' },
];

// PV-1 and the Production Validation Release, from docs/BLUEPRINT.md §12.
export const PV1_STAGES = [
  { id: 'PV1-S1', title: 'Linux parity', env: 'one independent Linux VM or machine', establishes: 'moving from macOS to Linux changes no protocol or runtime behaviour', status: 'pending (A03)' },
  { id: 'PV1-S2', title: 'LAN multi-machine', env: '3 separate Linux machines on one LAN', establishes: 'identity, TLS bootstrap, WireGuard, gossip, storage replication, edge routing, failover — across real machine boundaries', status: 'not started' },
  { id: 'PV1-S3', title: 'Partition and failure', env: 'same cluster', establishes: 'power-off, NIC down, real firewall partitions, disk-full on a real filesystem, latency, loss, reordering', status: 'not started' },
  { id: 'PV1-S4', title: 'WAN and NAT', env: '≥ 2 networks, at least one behind NAT', establishes: 'mesh through NAT, edge over WAN, failover under WAN latency', status: 'not started' },
];

export const P0_ITEMS = [
  { id: 'P0-1', title: 'Multi-machine and Linux validation', exit: 'M1–M7 integration and all 17 chaos scenarios on ≥ 5 Linux machines across ≥ 2 networks, including NAT.' },
  { id: 'P0-2', title: 'Long-duration soak', exit: '`dh chaos soak` ≥ 24 h under traffic; zero invariant violations; bounded memory and file descriptors; signed report.' },
  { id: 'P0-3', title: 'Public ACME', exit: "Let's Encrypt staging then production on a public domain; HTTP-01, DNS-01 with a real provider; renewal observed." },
  { id: 'P0-4', title: 'Measured performance', exit: 'A benchmark harness that records hardware, version, configuration, sample size, method and timestamp.' },
  { id: 'P0-5', title: 'Export and restore round trip', exit: 'Automated export → fresh cluster → import → volume export → byte equality; plus volume snapshot/restore commands.' },
  { id: 'P0-6', title: 'Process-runtime enforcement', exit: 'cgroup v2 limits on Linux, or policy that refuses limits it cannot enforce.' },
  { id: 'P0-7', title: 'Automated browser tests', exit: 'Headless tests for all 14 console screens, including accessibility checks.' },
  { id: 'P0-8', title: 'Security hardening', exit: 'Fuzzing of parsers, external review of the trust model and TLS bootstrap, root key custody.' },
  { id: 'P0-9', title: 'Packaging and upgrades', exit: 'Signed release artifacts, systemd units, rolling upgrades across versions.' },
];

export const P1_ITEMS = [
  'containerd runtime; gVisor and Firecracker behind the runtime interface',
  'Erasure-coded volumes',
  'HTTP/3 at the edge',
  'Conformance vectors for manifests, admission, bundles and mesh bindings',
  'did:dh owner identities validated in manifests',
  'Opt-in, self-hosted metrics export (never telemetry)',
  'Console TLS trust UX and finer-grained operator roles',
];

// Measured on the development machine (darwin/amd64, loopback). Indicative,
// not benchmarks. Everything not listed is NOT MEASURED. BLUEPRINT.md §10.
export const MEASUREMENTS = [
  { what: 'Control-plane failover', result: '1.2–2.2 s to a new leader', method: 'M5 test and chaos leader-crash (several runs)' },
  { what: 'Requests failed during leader loss', result: '0 of 204–240', method: 'edge traffic every 20 ms during failover' },
  { what: 'Userspace WireGuard throughput', result: '~73 MiB/s', method: 'pkg/mesh benchmark, loopback' },
  { what: 'Mesh RTT', result: '~1–2 ms', method: 'host-measured HTTP round trips over WireGuard' },
  { what: 'Artifact fetch (9 MiB, 125 chunks)', result: '~45 ms', method: 'host journal artifact-verified timing' },
  { what: 'Anti-entropy repair (26–28 objects)', result: '~3.7–4.0 s', method: 'chaos storage-replica-loss' },
  { what: 'Conformance run (136 vectors)', result: '~60 ms in process', method: 'dh-conformance' },
];

export const NOT_MEASURED = [
  'scheduling rate', 'storage IOPS', 'replication throughput', 'agent CPU and memory overhead',
  'edge requests per second', 'any multi-machine latency',
];
