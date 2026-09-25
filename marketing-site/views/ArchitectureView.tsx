'use client';

import React from 'react';
import { JsonLd } from '../components/JsonLd';
import { LastUpdated } from '../components/LastUpdated';
import { AeoAnswerBlock } from '../components/AeoAnswerBlock';
import { ArchitectureVisualizer } from '../components/ArchitectureVisualizer';
import { CONTENT_REGISTRY } from '../data/registry';
import { repoPath } from '../lib/project';

const DECISIONS = [
  { id: '0001', title: 'One Go module', file: 'docs/decisions/0001-go-single-module.md' },
  { id: '0002', title: 'Canonical JSON for everything signed or hashed', file: 'docs/decisions/0002-canonical-json.md' },
  { id: '0003', title: 'Hosts hold, they do not stop', file: 'docs/decisions/0003-hosts-hold-not-stop.md' },
  { id: '0004', title: 'Raft is the source of truth; Postgres is an optional mirror', file: 'docs/decisions/0004-raft.md' },
  { id: '0005', title: 'Userspace WireGuard', file: 'docs/decisions/0005-userspace-wireguard.md' },
  { id: '0006', title: 'BLAKE3 and FastCDC', file: 'docs/decisions/0006-blake3-fastcdc.md' },
  { id: '0007', title: 'A console with no build step', file: 'docs/decisions/0007-console-no-build.md' },
  { id: '0008', title: 'TLS bootstrap by fingerprint pinning', file: 'docs/decisions/0008-tls-bootstrap-pinning.md' },
];

export const ArchitectureView: React.FC = () => {
  const fm = CONTENT_REGISTRY['/architecture/'];
  return (
    <div className="space-y-12 max-w-6xl mx-auto">
      <JsonLd frontmatter={fm} />
      <LastUpdated updatedAt={fm.updatedAt} />
      <header className="space-y-4 text-center max-w-3xl mx-auto">
        <h1 className="text-3xl sm:text-5xl font-bold font-display text-white uppercase">{fm.h1}</h1>
        <p className="text-sm sm:text-base text-white/60 leading-relaxed font-sans">
          Three binaries and one protocol. Authority is split on purpose: the control plane decides what
          should run, each host decides what will run on it, and neither can rewrite the other&apos;s record.
        </p>
      </header>

      <AeoAnswerBlock question="How is Decentralized.Host built?" answer={fm.extractableAnswer!} sourceContext="docs/architecture.md" />

      <ArchitectureVisualizer />

      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-lg bg-[#0a0a0a] border border-white/10 space-y-3">
          <h2 className="text-lg font-bold text-white font-display">Wire and storage formats</h2>
          <p className="text-sm text-white/65 font-sans leading-relaxed">
            Everything signed or hashed uses canonical JSON: integers only, sorted keys, and duplicate keys,
            lone surrogates and invalid UTF-8 rejected. Envelopes are Ed25519 signatures over a
            domain-separated context plus the canonical payload. Identifiers are <code className="text-[#00FF41]">dh1…</code>{' '}
            derived from public keys. The protocol is specified in{' '}
            <a className="text-[#00FF41] underline decoration-[#00FF41]/40" href={repoPath('docs/protocol/dh-v1.md')} target="_blank" rel="noreferrer">docs/protocol/dh-v1.md</a>{' '}
            and pinned by 136 conformance vectors.
          </p>
        </div>
        <div className="p-6 rounded-lg bg-[#0a0a0a] border border-white/10 space-y-3">
          <h2 className="text-lg font-bold text-white font-display">Where it differs from a typical orchestrator</h2>
          <ul className="text-sm text-white/65 font-sans leading-relaxed space-y-1.5">
            <li>› The control plane proposes; hosts admit or refuse under local policy.</li>
            <li>› Losing the control plane holds work in place instead of stopping it.</li>
            <li>› Nothing is reported as running until a host signs that it observed it.</li>
            <li>› Workloads are reached through per-assignment mesh forwarders, not routed per-workload IPs.</li>
            <li>› Postgres, if configured, only mirrors evidence; Raft is the source of truth.</li>
          </ul>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-white font-display">Architecture decision records</h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {DECISIONS.map((d) => (
            <li key={d.id}>
              <a href={repoPath(d.file)} target="_blank" rel="noreferrer" className="block p-3 rounded bg-white/[0.02] border border-white/10 hover:border-[#00FF41]/40 text-sm text-white/75 font-sans">
                <span className="font-mono text-[#00FF41] mr-2">ADR {d.id}</span>
                {d.title}
              </a>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};
