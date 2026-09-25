// GENERATED from `dh help` of the ef849e2 build -- do not edit by hand.

export const CLI_COMMANDS: { command: string; summary: string }[] = [
  {
    "command": "dh apply",
    "summary": "apply a dh/v1 manifest: -f FILE"
  },
  {
    "command": "dh artifact ls",
    "summary": "list artifacts"
  },
  {
    "command": "dh artifact push",
    "summary": "upload an executable into the cluster CAS: FILE --name NAME [--sign]"
  },
  {
    "command": "dh artifact sign",
    "summary": "attest an artifact digest with the root key: DIGEST --name NAME"
  },
  {
    "command": "dh audit host",
    "summary": "fetch and verify a host's own ledger over the mesh: HOST"
  },
  {
    "command": "dh audit tail",
    "summary": "show recent audit entries: [-n 30]"
  },
  {
    "command": "dh audit verify",
    "summary": "fetch the full ledger and verify chain + checkpoints locally"
  },
  {
    "command": "dh chaos list",
    "summary": "list chaos scenarios with their injection and invariant"
  },
  {
    "command": "dh chaos run",
    "summary": "run chaos scenarios on real disposable clusters: [--scenario a,b|all] [--out DIR] [--submit]"
  },
  {
    "command": "dh chaos soak",
    "summary": "long-duration randomized faults on one cluster under traffic: --duration 10m [--out DIR] [--submit]"
  },
  {
    "command": "dh console",
    "summary": "print a console URL with a session capability: [--read-only] [--ttl 12h]"
  },
  {
    "command": "dh cp add-member",
    "summary": "add a control-plane member: --api ADDR --code CODE|--code-file FILE"
  },
  {
    "command": "dh cp backup",
    "summary": "write a signed control-plane backup: --out FILE [--secrets]"
  },
  {
    "command": "dh cp bootstrap",
    "summary": "bootstrap the first control-plane member: --api ADDR --code CODE|--code-file FILE"
  },
  {
    "command": "dh cp remove-member",
    "summary": "remove a control-plane member: --id MEMBER"
  },
  {
    "command": "dh cp restore",
    "summary": "restore a verified backup into a freshly bootstrapped cluster: FILE"
  },
  {
    "command": "dh cp rotate-root",
    "summary": "rotate the cluster root key (old root signs the rotation)"
  },
  {
    "command": "dh cp snapshot",
    "summary": "force a raft snapshot on the leader"
  },
  {
    "command": "dh cp status",
    "summary": "show raft membership, leader and each member's health"
  },
  {
    "command": "dh cp transfer-leadership",
    "summary": "ask the leader to hand leadership to another voter"
  },
  {
    "command": "dh delete app",
    "summary": "remove an application (volumes are retained): APP"
  },
  {
    "command": "dh describe app",
    "summary": "show every replica: desired, admitted, observed, admission checks: APP"
  },
  {
    "command": "dh describe node",
    "summary": "show a host: identity, policy, observation, mesh, storage"
  },
  {
    "command": "dh dev down",
    "summary": "stop a local cluster and its workloads: --dir DIR"
  },
  {
    "command": "dh dev status",
    "summary": "show processes of a local cluster: --dir DIR"
  },
  {
    "command": "dh dev up",
    "summary": "run a real local multi-process cluster: --dir DIR [--cps 3] [--hosts 3] [--edges 1] [--base 17700] [--sample]"
  },
  {
    "command": "dh evidence digest",
    "summary": "print the source-tree digest a validation record pins: [--src DIR]"
  },
  {
    "command": "dh evidence env",
    "summary": "print this machine's measured environment: [--data DIR]"
  },
  {
    "command": "dh evidence pack",
    "summary": "write exactly the digested source tree as a deterministic .tar.gz: --out FILE [--src DIR]"
  },
  {
    "command": "dh evidence run",
    "summary": "run and record one validation step: --dir EVID --name STEP [--retries N] -- COMMAND..."
  },
  {
    "command": "dh evidence seal",
    "summary": "sign a validation record over an evidence dir: --dir EVID --id EVIDENCE-ID --stage ID --claim TEXT --scope TEXT --require step,... [--parent ID] [--limitation T ...] [--exclude T ...] [--infra-failure REASON] [--machine env.json ...]"
  },
  {
    "command": "dh evidence verify",
    "summary": "verify a validation record and re-hash its files: --dir EVID"
  },
  {
    "command": "dh exec app",
    "summary": "run a command in a replica (needs host policy allowExec): APP [--replica 0] -- ARGV..."
  },
  {
    "command": "dh explain app",
    "summary": "show the scheduler plan for an app: APP"
  },
  {
    "command": "dh export",
    "summary": "write a signed, secret-free export of the installation: --out FILE"
  },
  {
    "command": "dh federation accept",
    "summary": "accept an agreement a peer granted this cluster: FILE"
  },
  {
    "command": "dh federation grant",
    "summary": "grant a peer cluster capacity here: --to NAME --to-root KEY [--tiers federated] [--max-replicas 3] [--max-cpu 1] [--max-mem 1Gi] [--runtimes process,docker] [--ttl 720h] --out FILE"
  },
  {
    "command": "dh federation ls",
    "summary": "list agreements and placements in both directions"
  },
  {
    "command": "dh federation revoke",
    "summary": "revoke an agreement this cluster granted: AGREEMENT-DIGEST [--reason R]"
  },
  {
    "command": "dh federation root",
    "summary": "print this cluster's name and root key (share it with a peer that will grant you capacity)"
  },
  {
    "command": "dh federation withdraw",
    "summary": "withdraw this cluster's app from a peer: APP"
  },
  {
    "command": "dh freeze",
    "summary": "freeze the control plane: hosts hold admitted work, refuse new work"
  },
  {
    "command": "dh get apps",
    "summary": "list applications with desired / admitted / observed"
  },
  {
    "command": "dh get nodes",
    "summary": "list hosts"
  },
  {
    "command": "dh get volumes",
    "summary": "alias of volume ls"
  },
  {
    "command": "dh import",
    "summary": "verify an export and re-apply its desired state here: FILE"
  },
  {
    "command": "dh init",
    "summary": "create a cluster trust root (root key + root CA) in --home"
  },
  {
    "command": "dh logs app",
    "summary": "tail a replica's output over the mesh: APP [--replica 0] [--tail 100]"
  },
  {
    "command": "dh mesh doctor",
    "summary": "check bindings, handshakes and gossip for inconsistencies"
  },
  {
    "command": "dh mesh peers",
    "summary": "show peer handshakes, traffic and measured RTT: [HOST]"
  },
  {
    "command": "dh mesh ping",
    "summary": "measure RTT from the control plane to a host over the mesh: HOST"
  },
  {
    "command": "dh mesh status",
    "summary": "show every host's WireGuard device and gossip view"
  },
  {
    "command": "dh node approve",
    "summary": "approve a pending host: HOST"
  },
  {
    "command": "dh node drain",
    "summary": "drain a host (replicas are rescheduled): HOST"
  },
  {
    "command": "dh node invite",
    "summary": "create a single-use join token: [--roles edge] [--auto] [--ttl 24h] [--out FILE]"
  },
  {
    "command": "dh node join",
    "summary": "print how to join a host with a token (runs on the host): TOKEN"
  },
  {
    "command": "dh node revoke",
    "summary": "revoke a host (blocks new work; admitted work may continue): HOST [--reason R]"
  },
  {
    "command": "dh node revoke-key",
    "summary": "emergency-revoke one host key: HOST --pub KEY [--reason R]"
  },
  {
    "command": "dh node undrain",
    "summary": "return a drained host to service: HOST"
  },
  {
    "command": "dh publishers set",
    "summary": "set artifact publisher keys (root is always included): KEY..."
  },
  {
    "command": "dh rollout status app",
    "summary": "wait until every replica runs the current generation: APP [--timeout 2m]"
  },
  {
    "command": "dh scale app",
    "summary": "change replica count: APP --replicas N"
  },
  {
    "command": "dh token",
    "summary": "print an operator bearer capability: [--read-only] [--ttl 1h]"
  },
  {
    "command": "dh unfreeze",
    "summary": "resume signing new work"
  },
  {
    "command": "dh verify backup",
    "summary": "verify a control-plane backup file offline: FILE"
  },
  {
    "command": "dh verify export",
    "summary": "verify an export file offline: FILE"
  },
  {
    "command": "dh volume export",
    "summary": "download a committed snapshot and verify it: VOLUME --out DIR [--snapshot ID]"
  },
  {
    "command": "dh volume ls",
    "summary": "list volumes with replica evidence"
  }
];
