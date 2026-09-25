// GENERATED from `dh chaos list` of the ef849e2 build -- do not edit by hand.
// Topology: control-plane members / hosts / edges.

export const CHAOS_SCENARIOS: { id: string; topology: string; injection: string; invariant: string }[] = [
  {
    "id": "leader-crash",
    "topology": "3cp/3h/1e",
    "injection": "SIGKILL the raft leader while traffic flows through the edge",
    "invariant": "a new leader is elected, committed writes survive, new writes succeed, and no workload request fails"
  },
  {
    "id": "cp-total-outage",
    "topology": "1cp/2h/1e",
    "injection": "SIGKILL every control-plane member for 15s, then restart",
    "invariant": "hosts enter offline-hold, admitted workloads keep running with the same PIDs, no request fails, buffered observations are delivered after recovery"
  },
  {
    "id": "host-crash",
    "topology": "1cp/4h/1e",
    "injection": "SIGKILL a host agent and all of its workloads (machine loss)",
    "invariant": "the edge stops routing to the dead replica without failed requests, the host is marked lost, and the replica is rescheduled and observed running elsewhere"
  },
  {
    "id": "agent-restart",
    "topology": "1cp/2h/0e",
    "injection": "SIGKILL dh-noded only (workloads keep running) and restart it",
    "invariant": "the restarted agent re-adopts every workload by PID and kernel start time without restarting it"
  },
  {
    "id": "journal-corruption",
    "topology": "1cp/2h/0e",
    "injection": "stop a host agent, flip bytes inside one entry of its hash-chained journal, restart it",
    "invariant": "the host detects the named break, enters ledger-corrupt mode, keeps admitted work, refuses new work, and never appends to the broken chain; after the local operator seals the journal (kept byte-for-byte) the host admits work again and its new chain records the break"
  },
  {
    "id": "network-partition",
    "topology": "1cp/4h/1e",
    "injection": "drop every WireGuard packet to and from one host at the fault proxies and cut its control-plane channel for 25s, then heal",
    "invariant": "the isolated host keeps its admitted workload, gossip suspects it, the control plane marks it lost and reschedules, no request fails, and after healing the cluster converges to exactly the desired replicas"
  },
  {
    "id": "packet-chaos",
    "topology": "1cp/3h/1e",
    "injection": "on every WireGuard path: 5% loss, 10% duplication, 10% reordering, +40ms delay for 20s",
    "invariant": "WireGuard and TCP absorb the faults: no request fails, the measured mesh RTT reflects the injected delay, and it returns to baseline when faults are cleared"
  },
  {
    "id": "clock-skew",
    "topology": "1cp/2h/0e",
    "injection": "shift one host's clock +120s, then −120s, then restore",
    "invariant": "a skewed host detects it from signed bundle timestamps, holds admitted work, refuses new work (CLOCK_SKEW / stale plane), and returns to normal when the clock is corrected"
  },
  {
    "id": "stale-generation",
    "topology": "1cp/3h/1e",
    "injection": "cut one host from the control plane, roll the app to a new generation, heal",
    "invariant": "the cut-off host keeps the generation it admitted (never runs an unsigned one), the console shows it as stale, other hosts roll within maxUnavailable, and after healing every replica runs the new generation"
  },
  {
    "id": "replay-forgery",
    "topology": "1cp/2h/0e",
    "injection": "resend a committed host observation; send one signed by a foreign key; send one with a flipped field",
    "invariant": "each is rejected with a specific reason and recorded; the host's real state is unchanged"
  },
  {
    "id": "revoked-host",
    "topology": "1cp/4h/1e",
    "injection": "revoke a host that serves a replica while traffic flows",
    "invariant": "the revoked host keeps its admitted workload but is removed from the mesh and the edge routing table, the replica is rescheduled, and no request fails"
  },
  {
    "id": "storage-replica-loss",
    "topology": "1cp/4h/1e",
    "injection": "delete every stored object on one replica host while it runs",
    "invariant": "anti-entropy detects the missing objects by Merkle comparison, repairs them from peers with signed evidence, and the volume returns to HEALTHY with identical data"
  },
  {
    "id": "disk-full",
    "topology": "1cp/4h/1e",
    "injection": "make every new write on one replica host fail with ENOSPC (storage-layer injection), write new data, then clear it",
    "invariant": "the volume is reported DEGRADED — never falsely HEALTHY — while the replica cannot store data; writes still commit on the other replicas; after the disk frees, anti-entropy restores HEALTHY"
  },
  {
    "id": "oom",
    "topology": "1cp/1h/0e",
    "injection": "run a container limited to 32 MiB that allocates without bound",
    "invariant": "the container runtime kills it (OOMKilled=true), the host reports oom-killed from runtime evidence, audits it, and restarts it with backoff"
  },
  {
    "id": "interrupted-deployment",
    "topology": "3cp/3h/1e",
    "injection": "apply a new generation and SIGKILL the raft leader as soon as the first replica has rolled",
    "invariant": "the new leader resumes the rollout, it completes, and requests keep succeeding (maxUnavailable respected)"
  },
  {
    "id": "interrupted-storage-write",
    "topology": "1cp/4h/1e",
    "injection": "write 24 MiB, then SIGKILL the primary host (agent and workload) while the new snapshot is still pending",
    "invariant": "committed data is intact after recovery, and the interrupted write is either fully committed or absent — never partial"
  },
  {
    "id": "postgres-outage",
    "topology": "1cp/1h/0e",
    "injection": "stop the Postgres evidence mirror, keep operating, restart it",
    "invariant": "while Postgres is down the console reports JOURNAL ONLY (never DB COMMITTED), writes still commit through raft, and the mirror catches up to DB COMMITTED after recovery"
  }
];
