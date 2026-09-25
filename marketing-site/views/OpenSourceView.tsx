'use client';

import React from 'react';
import { JsonLd } from '../components/JsonLd';
import { LastUpdated } from '../components/LastUpdated';
import { CommandBlock } from '../components/CommandBlock';
import { CONTENT_REGISTRY } from '../data/registry';
import { REPO_URL, REPO_NAME, PROTOTYPE_REPO_URL, BASELINE, LICENSE_STATUS, repoPath } from '../lib/project';
import { AlertTriangle, ExternalLink } from 'lucide-react';

const LAYOUT = [
  ['cmd/dh', 'operator CLI'],
  ['cmd/dh-control', 'control-plane member (Raft, API, reconciler, console)'],
  ['cmd/dh-noded', 'host agent (admission, runtimes, journal, mesh, storage, edge)'],
  ['cmd/dh-conformance', 'vector generator and conformance runner'],
  ['pkg/canon, envelope, identity, audit, capability', 'protocol core'],
  ['pkg/control', 'FSM, API, views, reconciler, federation'],
  ['pkg/node, policy, runtime', 'host agent, sovereign policy, process and Docker runtimes'],
  ['pkg/storage, mesh, edge, peer, pki', 'CAS and FastCDC, WireGuard and gossip, L7 edge and ACME, peer API, certificates'],
  ['pkg/chaos, devcluster', 'chaos scenarios and the real multi-process cluster harness'],
  ['web/dist', 'operator console (no build step, embedded into dh-control)'],
  ['conformance/', 'vectors and the independent Python implementation'],
  ['evidence/', 'signed validation records (on main)'],
];

export const OpenSourceView: React.FC = () => {
  const fm = CONTENT_REGISTRY['/open-source/'];
  return (
    <div className="space-y-12 max-w-5xl mx-auto">
      <JsonLd frontmatter={fm} />
      <LastUpdated updatedAt={fm.updatedAt} />
      <header className="space-y-4 text-center max-w-3xl mx-auto">
        <h1 className="text-3xl sm:text-5xl font-bold font-display text-white uppercase">{fm.h1}</h1>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <a href={REPO_URL} target="_blank" rel="noreferrer" className="p-6 rounded-lg bg-[#0a0a0a] border border-[#00FF41]/30 hover:border-[#00FF41] space-y-2 block">
          <div className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Implementation</div>
          <div className="text-lg font-bold text-white font-display flex items-center gap-2">{REPO_NAME} <ExternalLink className="w-4 h-4 text-white/40" /></div>
          <p className="text-sm text-white/60 font-sans">Go, one module. Everything this site describes. Validated revision {BASELINE.commit} (tag {BASELINE.tag}).</p>
        </a>
        <div className="p-6 rounded-lg bg-[#0a0a0a] border border-[#ffbd2e]/30 space-y-2">
          <div className="text-[10px] font-mono text-white/40 uppercase tracking-widest">License</div>
          <div className="text-lg font-bold text-[#ffbd2e] font-display flex items-center gap-2"><AlertTriangle className="w-4 h-4" /> {LICENSE_STATUS.text}</div>
          <p className="text-sm text-white/60 font-sans">{LICENSE_STATUS.detail}</p>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-white font-display">Verify what you downloaded</h2>
        <p className="text-sm text-white/60 font-sans leading-relaxed">
          The source digest identifies a tree independently of git: it hashes every source file and its
          executable bit, and ignores build output and evidence. The validated tree must print{' '}
          <code className="text-[#00FF41] break-all">{BASELINE.sourceDigest}</code>.
        </p>
        <CommandBlock lines={[`git clone ${REPO_URL}.git decentralized.host && cd decentralized.host`, `git checkout ${BASELINE.commit}`, 'make build && ./bin/dh evidence digest']} />
        <p className="text-sm text-white/60 font-sans">
          The <a href={BASELINE.releaseUrl} target="_blank" rel="noreferrer" className="text-[#00FF41] underline decoration-[#00FF41]/40">{BASELINE.tag} release</a>{' '}
          carries the same tree as a deterministic archive, plus an offline Linux amd64 kit, each with a published SHA-256.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-white font-display">Repository layout</h2>
        <div className="rounded-lg border border-white/10 divide-y divide-white/5">
          {LAYOUT.map(([p, d]) => (
            <div key={p} className="px-3 py-2 grid grid-cols-1 sm:grid-cols-[300px_1fr] gap-1 sm:gap-4 text-sm">
              <code className="font-mono text-[#00FF41] text-xs">{p}</code>
              <span className="text-white/60 font-sans">{d}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-white font-display">Write your own implementation</h2>
        <p className="text-sm text-white/60 font-sans leading-relaxed">
          The protocol is specified in{' '}
          <a href={repoPath('docs/protocol/dh-v1.md')} target="_blank" rel="noreferrer" className="text-[#00FF41] underline decoration-[#00FF41]/40">docs/protocol/dh-v1.md</a>{' '}
          and pinned by 136 vectors. An independent Python implementation passes canonical JSON, identity, envelopes,
          audit, capabilities, chunking and Merkle roots. Any implementation can be run against the vectors through the
          adapter protocol.
        </p>
        <CommandBlock lines={['./bin/dh-conformance run -self', './bin/dh-conformance run -adapter "python3 conformance/python/adapter.py"']} />
        <p className="text-xs text-white/45 font-sans">Manifests, admission decisions, bundle verification and mesh bindings are specified but not yet covered by vectors.</p>
      </section>

      <section className="p-6 rounded-lg bg-[#0a0a0a] border border-white/10 space-y-2">
        <h2 className="text-lg font-bold text-white font-display">The earlier Python prototype</h2>
        <p className="text-sm text-white/60 font-sans leading-relaxed">
          This site used to describe{' '}
          <a href={PROTOTYPE_REPO_URL} target="_blank" rel="noreferrer" className="text-[#00FF41] underline decoration-[#00FF41]/40">CodesbyFebin/decentralized.hosting</a>
          , a Python prototype (FastAPI control plane, Docker node agents, Traefik, optional Solana devnet credits) that
          shares the name. It is a different codebase with a different design; none of the claims on this site apply to
          it, and none of its features (git-push deploys, framework detection, credits) exist in the Go implementation.
        </p>
      </section>
    </div>
  );
};
