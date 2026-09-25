import { GuideItem } from '../types';
import { SESSION } from './session';
import { REPO_URL, BASELINE } from '../lib/project';

// Each guide follows a document in the Go repository. Outputs are shown only
// where they were actually recorded (from data/session.ts); everything else
// is a command without invented output.

const out = (cmd: string) => SESSION.find((s) => s.command === cmd)?.output;

export const GUIDES_DATA: GuideItem[] = [
  {
    id: 'local-cluster',
    title: 'Run a real cluster on one machine',
    slug: 'local-cluster',
    difficulty: 'Beginner',
    prerequisites: ['Go 1.26+', 'git and make', 'macOS (Linux not yet validated)'],
    overview:
      'Build the binaries and start 3 control-plane members and 4 hosts as separate processes, with real keys, signatures, Raft and WireGuard — all on loopback. The outputs below were recorded on the reference machine.',
    source: 'README.md',
    steps: [
      { title: 'Clone and build', description: 'Produces dh, dh-control, dh-noded, dh-conformance and dh-beacon in bin/.', command: `git clone ${REPO_URL}.git decentralized.host && cd decentralized.host && make build` },
      { title: 'Start the cluster', description: 'Bootstraps Raft, joins 4 hosts (one edge), pushes the sample artifact and deploys a 3-replica app.', command: './bin/dh dev up --dir ./devcluster', output: out('dh dev up --dir ./devcluster') },
      { title: 'Point the CLI at it', description: 'The operator home holds the dev cluster\'s root key and CA.', command: 'export DH_HOME=./devcluster/operator' },
      { title: 'Compare desired, admitted and observed', description: 'Three separate numbers. If a host refused a replica, ADMITTED would be lower than DESIRED and describe would show why.', command: './bin/dh get apps', output: out('dh get apps') },
      { title: 'Verify the audit ledger yourself', description: 'The chain and signed checkpoints are verified on your machine, not reported by the server.', command: './bin/dh audit verify', output: out('dh audit verify') },
      { title: 'Stop everything', description: 'Stops every process and workload of the cluster.', command: './bin/dh dev down --dir ./devcluster', output: out('dh dev down --dir ./devcluster') },
    ],
    notes: [
      'Dev clusters serve the API without TLS unless you pass --tls.',
      'Ports start at 17700 by default; change with --base if something else uses them.',
    ],
  },
  {
    id: 'tls-install',
    title: 'Install a TLS cluster across machines',
    slug: 'tls-install',
    difficulty: 'Advanced',
    prerequisites: ['3 machines for control-plane members', '1 or more host machines', 'an operator machine that keeps the root key', 'reachable ports: API 7700, Raft 7800, WireGuard 51900 (members) and 51820 (hosts)'],
    overview:
      'The production shape: three members serving TLS from their first start, and hosts joining with single-use tokens that pin the root. The runbook is scripted (validation/pv1/tls-install.sh) and passed on the reference machine — but it has never been run across separate machines. That is PV-1 stage 2.',
    source: 'docs/runbooks/install.md',
    steps: [
      { title: 'Create the trust root', description: 'On the operator machine. Keep root/identity.key offline.', command: 'export DH_HOME=~/.dh && dh init --cluster prod' },
      { title: 'Start each member', description: 'Repeat on cp2 and cp3 with their own names. Each prints a certificate fingerprint and writes bootstrap.code and bootstrap.fingerprint.', command: 'dh-control --data /var/lib/dh-control --api 0.0.0.0:7700 --api-advertise cp1.example.net:7700 --raft 0.0.0.0:7800 --raft-advertise cp1.example.net:7800 --mesh 0.0.0.0:51900 --mesh-advertise cp1.example.net:51900 --tls' },
      { title: 'Bootstrap and add members', description: 'Copy each member\'s bootstrap.code and bootstrap.fingerprint to the operator machine over a trusted channel first. The CLI pins the fingerprint.', command: 'dh cp bootstrap --api cp1.example.net:7700 --code-file ./cp1/bootstrap.code && dh cp add-member --api cp2.example.net:7700 --code-file ./cp2/bootstrap.code && dh cp add-member --api cp3.example.net:7700 --code-file ./cp3/bootstrap.code' },
      { title: 'Check the control plane', description: 'Expect one leader, two followers, three voters.', command: 'dh cp status' },
      { title: 'Invite a host', description: 'One token per host; tokens are single-use. Add --roles edge for an edge host.', command: 'dh node invite --out host-1.token' },
      { title: 'Start the host', description: 'On the host. It writes its sovereign policy.yaml on first start.', command: 'dh-noded --data /var/lib/dh-noded --join-file host-1.token --name host-1 --region eu-west --zone a --host rack1-u12 --mesh 0.0.0.0:51820 --mesh-advertise host-1.example.net:51820' },
      { title: 'Approve it', description: 'Unless the invite used --auto.', command: 'dh get nodes && dh node approve host-1' },
      { title: 'Verify', description: 'Ledger, mesh consistency, protocol vectors, and a backup you can check offline.', command: 'dh audit verify && dh mesh doctor && dh-conformance run -self' },
    ],
    notes: [
      'Browsers must trust root-ca.pem to open the TLS console, or put your own TLS terminator in front of it.',
      'If a join token was already used, the host says so; give it a new token and restart it with --join-file.',
    ],
  },
  {
    id: 'deploy-executable',
    title: 'Deploy your own service',
    slug: 'deploy-executable',
    difficulty: 'Intermediate',
    prerequisites: ['a running cluster (local or installed)', 'an executable built for the hosts\' OS and architecture that listens on $PORT and answers a health path'],
    overview:
      'Push the executable into the cluster\'s content-addressed store, reference it by digest, and apply a manifest. Hosts fetch it from peers, verify every chunk and run it only if their policy admits it.',
    source: 'docs/runbooks/install.md §5',
    steps: [
      { title: 'Push the artifact', description: '--sign attests it with the root key, so hosts with requireImageSignature: true accept it.', command: 'dh artifact push ./myservice --name myservice --sign' },
      { title: 'Write the manifest', description: 'Replace <digest> with the one printed above. Unknown fields are rejected.', command: "cat > web.yaml <<'EOF'\napiVersion: dh/v1\nkind: Application\nmetadata: {name: web}\nspec:\n  replicas: 2\n  image: myservice@b3:<digest>\n  resources: {cpu: 100m, mem: 32Mi}\n  placement: {tiers: [trusted], spread: failure-domain, antiAffinity: hard}\n  ports: [{name: http}]\n  health: {http: /healthz, interval: 1s}\nEOF" },
      { title: 'Preview placement', description: 'The scheduler plan, per host and replica, with reasons — before anything is signed.', command: 'dh explain app web' },
      { title: 'Apply and wait', description: 'Completes when every replica is observed running the current generation.', command: 'dh apply -f web.yaml && dh rollout status app web' },
      { title: 'Inspect', description: 'Every replica with desired, admitted and observed state and each admission check.', command: 'dh describe app web', output: out('dh describe app web') },
    ],
    notes: [
      'The recorded output above is from the sample app on a dev cluster; yours will name your app and hosts.',
      'For a container, use image: <ref>@sha256:<digest>; the docker runtime is selected and enforces --memory and --cpus.',
      'The process runtime does not enforce CPU or memory limits.',
    ],
  },
  {
    id: 'chaos',
    title: 'Break it on purpose: chaos scenarios',
    slug: 'chaos',
    difficulty: 'Intermediate',
    prerequisites: ['a built checkout', 'Docker for the oom scenario, Postgres for postgres-outage (they SKIP otherwise)'],
    overview:
      'Each scenario starts its own disposable cluster, drives traffic through the edge, injects a real fault (SIGKILL, packet loss at UDP fault proxies, clock offset, ENOSPC …) and checks an invariant. Reports are signed.',
    source: 'pkg/chaos',
    steps: [
      { title: 'List scenarios', description: 'Topology, injection and invariant for each of the 17.', command: 'dh chaos list' },
      { title: 'Run one', description: 'Kills the Raft leader under traffic; a new leader must be elected with no failed request.', command: 'dh chaos run --scenario leader-crash' },
      { title: 'Run all of them', description: 'About 6–7 minutes on the reference machine.', command: 'dh chaos run --scenario all --out ./chaos-reports' },
    ],
    notes: ['`dh chaos soak --duration 10m` runs randomized faults on one cluster; the 24-hour soak has not been run yet.'],
  },
  {
    id: 'verify-evidence',
    title: 'Check the evidence behind this site',
    slug: 'verify-evidence',
    difficulty: 'Beginner',
    prerequisites: ['a clone of the Go repository at main', 'a build of dh'],
    overview:
      'The status on this site comes from signed validation records in the repository. You can re-verify them: the signature, every log and report hash, and the source digest they pin.',
    source: 'docs/evidence/README.md',
    steps: [
      { title: 'Verify the baseline record', description: 'Checks the signature and re-hashes every file in the record.', command: 'dh evidence verify --dir evidence/REF-MAC-A03' },
      { title: 'Check you are looking at the same source', description: `Must print ${BASELINE.sourceDigestShort} for commit ${BASELINE.commit}.`, command: `git checkout ${BASELINE.commit} && dh evidence digest` },
      { title: 'Read the history', description: 'Every attempt, including the failed and infrastructure-failed ones, and the defects each found.', command: 'cat evidence/INDEX.md evidence/PV1-S1-HISTORY.md' },
    ],
    notes: ['A record verifying means it is intact and signed; it does not make its scope wider than it states. REF-MAC-A03 is one macOS machine over loopback.'],
  },
  {
    id: 'validate-linux',
    title: 'Help validate on Linux (PV1-S1)',
    slug: 'validate-linux',
    difficulty: 'Advanced',
    prerequisites: ['an independent Linux x86_64 machine or VM (≥ 4 vCPU, 8 GB RAM, 40 GB SSD)', 'gcc, python3, tar, sha256sum', 'optional: Docker'],
    overview:
      'The first production-validation gate reproduces the macOS baseline on Linux. An offline kit (Go toolchain, module cache and the exact source) runs the whole gate with no network access and writes a signed evidence record.',
    source: 'validation/pv1/README.md',
    steps: [
      { title: 'Fetch the kit', description: 'Published in parts on its own branch. reassemble.sh checks every part and the rebuilt archive\'s SHA-256 before extracting.', command: `git clone --branch pv1-offline-kit --depth 1 ${REPO_URL}.git dh-kit && cd dh-kit && sh reassemble.sh` },
      { title: 'Verify the kit and the machine', description: 'Inputs, the official Go checksum, architecture and prerequisites.', command: 'cd dh-pv1-offline-kit-linux-amd64 && sha256sum -c KIT-SHA256SUMS && sh verify-kit.sh' },
      { title: 'Run the gate', description: 'State the machine exactly: VM or bare metal, provider, vCPU, RAM, disk. It stops unless the source digest is b3:2a23e1da….', command: 'sh run-pv1-s1-a03.sh "Ubuntu 24.04 VM on <provider>, 4 vCPU / 8 GB / 40 GB SSD, KVM"' },
    ],
    notes: [
      'Keep evidence/validator/identity.key private.',
      'A failing run is still evidence. Keep it; failures are recorded, never overwritten.',
    ],
  },
];
