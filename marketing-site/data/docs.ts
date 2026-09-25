import { DocSection } from '../types';

// Summaries of README.md, docs/runbooks/install.md and operations.md in the
// Go repository. Commands are copied from those documents.

export const DOCS_DATA: DocSection[] = [
  {
    id: 'build',
    title: 'Build',
    source: 'README.md',
    body:
      'Requirements: Go 1.26 or newer. Optional: Docker (container runtime and the oom chaos scenario), Python 3 (the independent conformance implementation) and Postgres (evidence mirror).\n\n`make build` produces five binaries in bin/: dh (operator CLI), dh-control (control-plane member), dh-noded (host agent), dh-conformance (vector generator and runner) and dh-beacon (the sample workload).',
    commands: ['make build'],
  },
  {
    id: 'local-cluster',
    title: 'Local cluster',
    source: 'README.md',
    body:
      '`dh dev up` starts 3 control-plane members and 4 hosts (one of them an edge) as real local processes bound to loopback, pushes the dh-beacon artifact, deploys a 3-replica app and prints a console URL with a session capability in its fragment. It serves the API without TLS unless you pass --tls. Flags: --cps, --hosts, --edges, --base (first port, default 17700).',
    commands: ['./bin/dh dev up --dir ./devcluster', 'export DH_HOME=./devcluster/operator', './bin/dh dev status --dir ./devcluster', './bin/dh dev down --dir ./devcluster'],
  },
  {
    id: 'trust-root',
    title: 'Install: trust root',
    source: 'docs/runbooks/install.md §1',
    body:
      '`dh init` creates the cluster root key and root CA in $DH_HOME. The root key is the trust anchor every host pins: keep it offline or on a hardware-protected machine. You need it to bootstrap and change membership, create invites, and sign rosters, federation agreements and root rotations. Day-to-day operations use short-lived capabilities derived from it. TLS is on by default.',
    commands: ['export DH_HOME=~/.dh', 'dh init --cluster prod'],
  },
  {
    id: 'members',
    title: 'Install: control-plane members',
    source: 'docs/runbooks/install.md §2–3',
    body:
      'Run dh-control on three machines. Before it has credentials a member serves a throwaway self-signed certificate and writes its fingerprint to bootstrap.fingerprint, next to the one-time bootstrap.code. Copy both to the operator machine over a channel you trust. The CLI pins that certificate while bootstrapping, so the code and credentials never travel in cleartext; afterwards members serve root-issued certificates and the CLI verifies them against root-ca.pem. Expected `dh cp status`: one leader, two followers, three voters.',
    commands: [
      'dh-control --data /var/lib/dh-control --api 0.0.0.0:7700 --api-advertise cp1.example.net:7700 --raft 0.0.0.0:7800 --raft-advertise cp1.example.net:7800 --mesh 0.0.0.0:51900 --mesh-advertise cp1.example.net:51900 --tls',
      'dh cp bootstrap  --api cp1.example.net:7700 --code-file ./cp1/bootstrap.code',
      'dh cp add-member --api cp2.example.net:7700 --code-file ./cp2/bootstrap.code',
      'dh cp add-member --api cp3.example.net:7700 --code-file ./cp3/bootstrap.code',
      'dh cp status',
    ],
  },
  {
    id: 'hosts',
    title: 'Install: hosts',
    source: 'docs/runbooks/install.md §4',
    body:
      'Invites are single-use; create one per host (add --roles edge for an edge host, --auto to skip approval). The token pins the root key and root CA, so the host speaks HTTPS from its first request. On first start the host writes policy.yaml — its sovereign policy — which the control plane can read but never change. Approve pending hosts with `dh node approve`.',
    commands: [
      'dh node invite --out host-1.token',
      'dh-noded --data /var/lib/dh-noded --join-file host-1.token --name host-1 --region eu-west --zone a --host rack1-u12 --mesh 0.0.0.0:51820 --mesh-advertise host-1.example.net:51820',
      'dh get nodes',
      'dh node approve host-1',
    ],
  },
  {
    id: 'deploy',
    title: 'Deploy',
    source: 'docs/runbooks/install.md §5',
    body:
      'Push an executable into the cluster CAS (optionally attested with the root key), reference it by digest in a dh/v1 manifest, and apply it. Process workloads get their port in $PORT. For a container, use a digest-pinned image (ref@sha256:…) and the docker runtime is selected. For ingress, add an edge host and `ingress: [{host: web.example.net, port: http, tls: acme}]`; edge hosts take --edge-http, --edge-https, --acme-directory and --acme-email.',
    commands: ['dh artifact push ./myservice --name myservice --sign', 'dh apply -f web.yaml', 'dh rollout status app web', 'dh describe app web'],
  },
  {
    id: 'manifest',
    title: 'Manifest (dh/v1)',
    source: 'pkg/manifest',
    body:
      'apiVersion: dh/v1, kind: Application, metadata.name, and a spec with: replicas; runtime (process or docker, inferred from the image); image (name@b3:<digest> or ref@sha256:<digest> — unpinned images are refused); command, args, env; resources (cpu, mem); placement (tiers, spread, antiAffinity, arch, features, preferRegion, federation); ports; volumes (name, size, mount, replicas, durability, snapshot every/retain); ingress (host, port, tls); health (http, interval, timeout, failureThreshold); update strategy (maxUnavailable).\n\nParsing is strict: unknown fields are rejected. The manifest is normalized and hashed, and the hash appears in `dh describe app`. durability.erasure accepts only `none`.',
  },
  {
    id: 'console',
    title: 'Console',
    source: 'docs/runbooks/install.md §6',
    body:
      'Every member serves the console. `dh console` prints https://<member>/#token=…; the session capability travels in the URL fragment, which browsers never send to servers. Use --read-only for a session that cannot change anything, and --ttl to shorten it. Over TLS, browsers must trust root-ca.pem, or you front the console with your own TLS terminator.',
    commands: ['dh console --read-only --ttl 1h'],
  },
  {
    id: 'operations',
    title: 'Day-2 operations',
    source: 'docs/runbooks/operations.md',
    body:
      'Updates roll out a new generation within maxUnavailable; the new artifact is fetched and verified on each host before the old generation stops. Rolling back means re-applying the previous manifest — generations only increase. Drain hosts for maintenance; revoke a host you trust less (revocation blocks new admission, while work it already admitted may continue under its own policy); revoke a single suspect key; rotate host keys with a grace period.\n\nIf a leader is lost, a new one is elected in about 1–2 s and hosts keep running. If quorum is lost, hosts enter offline-hold. After total control-plane loss, bootstrap new members with the same operator home and run `dh cp restore`.',
    commands: [
      'dh scale app web --replicas 5',
      'dh explain app web',
      'dh logs app web --replica 0',
      'dh node drain host-1',
      'dh node revoke host-1 --reason "…"',
      'dh cp backup --out cp.json && dh verify backup cp.json',
      'dh cp transfer-leadership',
    ],
  },
  {
    id: 'incidents',
    title: 'Incidents',
    source: 'docs/runbooks/operations.md',
    body:
      'Suspected control-plane compromise: `dh freeze` — hosts hold admitted work and refuse all new work — then investigate with `dh audit verify` and `dh audit host`. A host reporting ledger-corrupt keeps running admitted work, refuses new work and never appends to the broken chain; after investigating, `dh-noded ledger-seal` keeps the corrupt file byte for byte and starts a new chain that records the break and your reason. CLOCK_SKEW holds work until NTP is fixed. Storage DEGRADED repairs from peers automatically, with every repaired object listed.',
    commands: ['dh freeze', 'dh audit host host-1', 'dh-noded ledger-seal --data /var/lib/dh-noded --reason "…"', 'dh unfreeze'],
  },
  {
    id: 'federation',
    title: 'Federation',
    source: 'docs/runbooks/operations.md',
    body:
      'One cluster grants another bounded capacity with a root-signed agreement. Placements are re-signed by the grantor, and hosts on the granting side accept federated work only if their own policy sets allowFederated: true. With TLS the agreement carries the grantor\'s root CA. Revoking the agreement stops placements under it.',
    commands: [
      'dh federation root',
      'dh federation grant --to alpha --to-root <key> --tiers federated --max-replicas 3 --ttl 720h --out agreement.json',
      'dh federation accept agreement.json',
      'dh federation ls',
      'dh federation revoke <agreement-digest> --reason "…"',
    ],
  },
  {
    id: 'verify',
    title: 'Verifying claims yourself',
    source: 'docs/runbooks/operations.md',
    body:
      'You do not have to trust this site. `dh audit verify` checks the control-plane ledger locally. `dh chaos run --scenario all` runs the 17 failure scenarios on disposable clusters and signs a report for each. `dh-conformance run -self` runs the protocol vectors against your build, and `-adapter` runs them against any other implementation. `dh evidence verify --dir evidence/REF-MAC-A03` re-hashes and verifies the signed validation record the site\'s status is based on.',
    commands: ['dh audit verify', 'dh chaos run --scenario all', 'dh-conformance run -self', 'dh evidence verify --dir evidence/REF-MAC-A03'],
  },
];
