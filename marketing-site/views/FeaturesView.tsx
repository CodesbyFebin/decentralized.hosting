'use client';

import React, { useState } from 'react';
import { JsonLd } from '../components/JsonLd';
import { LastUpdated } from '../components/LastUpdated';
import { AeoAnswerBlock } from '../components/AeoAnswerBlock';
import { ClaimBadge, CLAIM_DESCRIPTIONS } from '../components/ClaimBadge';
import { CONTENT_REGISTRY } from '../data/registry';
import { FEATURES_DATA, FEATURE_COUNTS } from '../data/features';
import { EVIDENCE_SCOPE, repoPath } from '../lib/project';
import { ClaimStatus } from '../types';
import { CHAOS_SCENARIOS } from '../data/chaos';

const FILTERS: (ClaimStatus | 'ALL')[] = ['ALL', 'VERIFIED', 'LIMITED', 'NOT_IMPLEMENTED', 'NOT_RUN'];

export const FeaturesView: React.FC = () => {
  const fm = CONTENT_REGISTRY['/features/'];
  const [filter, setFilter] = useState<ClaimStatus | 'ALL'>('ALL');
  const shown = FEATURES_DATA.filter((f) => filter === 'ALL' || f.claimStatus === filter);
  const milestones = Array.from(new Set(shown.map((f) => f.milestone)));

  return (
    <div className="space-y-10 max-w-6xl mx-auto">
      <JsonLd frontmatter={fm} />
      <LastUpdated updatedAt={fm.updatedAt} />

      <header className="space-y-4 text-center max-w-3xl mx-auto">
        <h1 className="text-3xl sm:text-5xl font-bold font-display text-white uppercase">{fm.h1}</h1>
        <p className="text-sm sm:text-base text-white/60 leading-relaxed font-sans">
          Transcribed from the production blueprint in the Go repository. A label changes only when new
          evidence changes it — never because code exists.
        </p>
      </header>

      <AeoAnswerBlock question="How are capabilities labelled?" answer={fm.extractableAnswer!} sourceContext="docs/BLUEPRINT.md" />

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {(['VERIFIED', 'LIMITED', 'NOT_IMPLEMENTED', 'NOT_RUN'] as ClaimStatus[]).map((s) => (
          <div key={s} className="p-4 rounded-lg bg-[#0a0a0a] border border-white/10 space-y-2">
            <div className="flex items-center justify-between">
              <ClaimBadge status={s} />
              <span className="text-xl font-bold font-mono text-white">{FEATURE_COUNTS[s]}</span>
            </div>
            <p className="text-[11px] text-white/50 font-sans leading-relaxed">{CLAIM_DESCRIPTIONS[s].description}</p>
          </div>
        ))}
      </section>

      <p className="text-xs text-[#ffbd2e]/90 font-mono border-l-2 border-[#ffbd2e]/50 pl-3">{EVIDENCE_SCOPE}</p>

      <div className="flex gap-2 flex-wrap" role="group" aria-label="Filter by status">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            aria-pressed={filter === f}
            className={`px-3 py-1.5 rounded text-[11px] font-mono uppercase tracking-wider border transition-colors ${
              filter === f ? 'bg-[#00FF41]/10 text-[#00FF41] border-[#00FF41]/40' : 'bg-white/5 text-white/60 border-white/10 hover:text-white'
            }`}
          >
            {f === 'ALL' ? `All (${FEATURES_DATA.length})` : f.replace('_', ' ')}
          </button>
        ))}
      </div>

      {milestones.map((m) => (
        <section key={m} className="space-y-3">
          <h2 className="text-sm font-mono text-white/50 uppercase tracking-widest">
            {m === '—' ? 'Cross-cutting' : m}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {shown
              .filter((f) => f.milestone === m)
              .map((f) => (
                <article key={f.id} id={f.id} className="p-5 rounded-lg bg-[#0a0a0a] border border-white/10 space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-bold text-white text-base font-display">{f.title}</h3>
                    <ClaimBadge status={f.claimStatus} />
                  </div>
                  <p className="text-sm text-white/65 leading-relaxed font-sans">{f.summary}</p>
                  {f.limitation && (
                    <p className="text-xs text-[#ffbd2e]/90 leading-relaxed font-sans border-l-2 border-[#ffbd2e]/40 pl-3">
                      Limitation: {f.limitation}
                    </p>
                  )}
                  <div className="pt-3 border-t border-white/10 space-y-1.5 font-mono text-[11px]">
                    <div className="text-white/45">evidence: {f.evidence}</div>
                    {f.cliCommand && (
                      <div className="text-[#00FF41] bg-[#00FF41]/5 px-2 py-1 rounded border border-[#00FF41]/20 overflow-x-auto whitespace-nowrap">$ {f.cliCommand}</div>
                    )}
                  </div>
                </article>
              ))}
          </div>
        </section>
      ))}

      <section id="chaos-scenarios" className="space-y-3 scroll-mt-24">
        <h2 className="text-xl font-bold text-white font-display">The 17 chaos scenarios</h2>
        <p className="text-sm text-white/60 font-sans">
          From <code className="text-[#00FF41]">dh chaos list</code>. Topology is control-plane members / hosts / edges; every
          scenario runs on its own disposable cluster, under traffic. All 17 passed in REF-MAC-A03 — on one machine.
        </p>
        <div className="overflow-x-auto rounded-lg border border-white/10">
          <table className="w-full text-xs font-sans">
            <thead className="bg-white/[0.03] text-[10px] font-mono uppercase tracking-wider text-white/50">
              <tr><th className="text-left p-2.5">Scenario</th><th className="text-left p-2.5">Topology</th><th className="text-left p-2.5">Injection</th><th className="text-left p-2.5">Invariant checked</th></tr>
            </thead>
            <tbody>
              {CHAOS_SCENARIOS.map((c) => (
                <tr key={c.id} className="border-t border-white/10 align-top">
                  <td className="p-2.5 font-mono text-[#00FF41] whitespace-nowrap">{c.id}</td>
                  <td className="p-2.5 font-mono text-white/50 whitespace-nowrap">{c.topology}</td>
                  <td className="p-2.5 text-white/70 min-w-[200px]">{c.injection}</td>
                  <td className="p-2.5 text-white/60 min-w-[260px]">{c.invariant}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <p className="text-xs text-white/40 font-sans">
        Source of truth:{' '}
        <a href={repoPath('docs/BLUEPRINT.md')} target="_blank" rel="noreferrer" className="text-[#00FF41] underline decoration-[#00FF41]/40">
          docs/BLUEPRINT.md
        </a>
        . If this page and the blueprint disagree, the blueprint wins.
      </p>
    </div>
  );
};
