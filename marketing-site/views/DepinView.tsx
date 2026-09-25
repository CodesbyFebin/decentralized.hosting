'use client';

import React from 'react';
import { JsonLd } from '../components/JsonLd';
import { LastUpdated } from '../components/LastUpdated';
import { AeoAnswerBlock } from '../components/AeoAnswerBlock';
import { CommandBlock } from '../components/CommandBlock';
import { CONTENT_REGISTRY } from '../data/registry';

// Verbatim from pkg/policy/policy.go (DefaultYAML) at the validated commit.
const DEFAULT_POLICY = `# Host-local sovereign policy. The control plane cannot change this file.
# Every assignment is checked against it before anything executes.
sovereign: true
maxWorkloads: 40
maxCPU: "32"
maxMem: 128Gi
acceptTiers: [local, trusted]
denyImagesWithoutDigest: true
# When true, only artifacts attested by a trusted publisher key run here.
# "cluster-root" means the root key this host pinned when it joined.
requireImageSignature: false
trustedPublishers: [cluster-root]
allowRuntimes: [process, docker]
allowFederated: false
allowExec: false
# deny: keep admitted work, refuse new work while the control plane is stale.
# stop: also stop admitted work while the control plane is stale.
offlineAdmission: deny
maxClockSkew: 30s
freshWindow: 10s
storageQuota: 10Gi`;

export const DepinView: React.FC = () => {
  const fm = CONTENT_REGISTRY['/depin/'];
  return (
    <div className="space-y-10 max-w-4xl mx-auto">
      <JsonLd frontmatter={fm} />
      <LastUpdated updatedAt={fm.updatedAt} />
      <header className="space-y-4 text-center">
        <h1 className="text-3xl sm:text-5xl font-bold font-display text-white uppercase">{fm.h1}</h1>
        <p className="text-sm sm:text-base text-white/60 leading-relaxed font-sans">
          A host is any machine running <code className="text-[#00FF41]">dh-noded</code> that a cluster operator has invited.
          It keeps the final say over what runs on it.
        </p>
      </header>

      <AeoAnswerBlock question="How does a machine become a host?" answer={fm.extractableAnswer!} sourceContext="docs/runbooks/install.md §4" />

      <section className="p-5 rounded-lg border border-[#ffbd2e]/30 bg-[#ffbd2e]/5 text-sm text-white/75 font-sans leading-relaxed">
        This is not a DePIN network. There is no token, reward, staking or public marketplace, and none is planned.
        (The earlier Python prototype paid Solana devnet credits for uptime; the Go implementation has nothing like it.)
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-white font-display">Joining</h2>
        <p className="text-sm text-white/65 font-sans">The operator creates a single-use invite; the token pins the cluster root and CA, so the host speaks HTTPS from its first request.</p>
        <CommandBlock lines={['# operator machine', 'dh node invite --out host-1.token', '# the new host', 'dh-noded --data /var/lib/dh-noded --join-file host-1.token --name host-1 --region eu-west --zone a --host rack1-u12 --mesh 0.0.0.0:51820 --mesh-advertise host-1.example.net:51820', '# operator machine', 'dh node approve host-1']} />
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-white font-display">Your policy, on your machine</h2>
        <p className="text-sm text-white/65 font-sans">
          On first start the host writes <code className="text-[#00FF41]">policy.yaml</code> to its data directory. This is the default,
          verbatim from the source. Edit it and restart the agent to change it; the control plane can read it but never change it.
        </p>
        <pre className="p-4 rounded-lg border border-white/10 bg-[#050505] text-xs font-mono text-white/80 overflow-x-auto">{DEFAULT_POLICY}</pre>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-white font-display">What you keep control of</h2>
        <ul className="text-sm text-white/70 font-sans space-y-1.5">
          <li>› Which tiers, runtimes and resource ceilings you accept, and whether artifacts must be attested.</li>
          <li>› Whether federated work from other clusters may run here (off by default).</li>
          <li>› Whether anyone may exec into workloads (off by default).</li>
          <li>› What happens when the control plane is unreachable: keep admitted work (default) or stop it.</li>
          <li>› Your own hash-chained journal of every decision, readable with <code className="text-[#00FF41]">dh-noded status</code>.</li>
        </ul>
        <p className="text-sm text-white/55 font-sans">
          Revocation cuts a host from the mesh and routing and blocks new admissions, but work it already admitted may
          continue under its own policy. Revoked is not the same as lost.
        </p>
      </section>
    </div>
  );
};
