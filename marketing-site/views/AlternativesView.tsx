'use client';

import React from 'react';
import { JsonLd } from '../components/JsonLd';
import { LastUpdated } from '../components/LastUpdated';
import { CONTENT_REGISTRY } from '../data/registry';
import { COMPARISONS_DATA } from '../data/comparisons';
import { ExternalLink } from 'lucide-react';

const OURS: [string, string][] = [
  ['Model', 'Raft control plane proposes signed work; sovereign hosts admit it under local policy'],
  ['Runtime', 'process (signed executables) or docker (digest-pinned images)'],
  ['Multi-server', 'Yes by design; validated on one machine only so far'],
  ['Build / git deploy', 'None — bring an executable or an image digest'],
  ['CLI', 'dh (68 commands)'],
  ['Dashboard', 'Operator console served by the cluster'],
  ['Automatic TLS', 'ACME or cluster CA; tested against Pebble only'],
  ['Rollback', 'Re-apply the previous manifest (new generation)'],
  ['Observability', 'Signed observations, hash-chained ledgers, logs over the mesh; no metrics history'],
  ['License', 'None declared yet'],
];

export const AlternativesView: React.FC = () => {
  const fm = CONTENT_REGISTRY['/alternatives/'];
  return (
    <div className="space-y-10 max-w-6xl mx-auto">
      <JsonLd frontmatter={fm} />
      <LastUpdated updatedAt={fm.updatedAt} />
      <header className="space-y-4 text-center max-w-3xl mx-auto">
        <h1 className="text-3xl sm:text-5xl font-bold font-display text-white uppercase">{fm.h1}</h1>
        <p className="text-sm sm:text-base text-white/60 leading-relaxed font-sans">
          If you want to host applications reliably today, the mature tools below are the better choice.
          Decentralized.Host is for a narrower requirement: hosts that can refuse the coordinator, and state
          transitions that are signed and independently verifiable.
        </p>
      </header>

      <section className="p-5 rounded-lg bg-[#0a0a0a] border border-[#00FF41]/30 space-y-3">
        <h2 className="text-lg font-bold text-white font-display">Decentralized.Host, in the same terms</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-1.5 text-sm">
          {OURS.map(([k, v]) => (
            <div key={k} className="grid grid-cols-[130px_1fr] gap-3">
              <span className="text-white/40 font-mono text-xs uppercase tracking-wider pt-0.5">{k}</span>
              <span className="text-white/75 font-sans">{v}</span>
            </div>
          ))}
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {COMPARISONS_DATA.map((c) => (
          <article key={c.id} id={c.slug} className="p-5 rounded-lg bg-[#0a0a0a] border border-white/10 space-y-3">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-lg font-bold text-white font-display">{c.name}</h2>
              <a href={c.officialUrl} target="_blank" rel="noreferrer" className="text-white/40 hover:text-[#00FF41]" aria-label={`${c.name} website`}>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
            <p className="text-sm text-white/70 font-sans leading-relaxed">{c.summaryComparison}</p>
            <dl className="grid grid-cols-[120px_1fr] gap-x-3 gap-y-1 text-xs font-sans">
              <dt className="text-white/40">License</dt><dd className="text-white/65">{c.license}</dd>
              <dt className="text-white/40">Model</dt><dd className="text-white/65">{c.deploymentModel}</dd>
              <dt className="text-white/40">Multi-server</dt><dd className="text-white/65">{c.multiServerSupport}</dd>
              <dt className="text-white/40">Git deploy</dt><dd className="text-white/65">{c.gitDeployment}</dd>
              <dt className="text-white/40">TLS</dt><dd className="text-white/65">{c.automaticTls}</dd>
            </dl>
            <div className="pt-2 border-t border-white/10 text-[10px] font-mono text-white/35">
              recorded {c.lastVerifiedAt}, not re-checked since · {c.evidenceSource}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};
