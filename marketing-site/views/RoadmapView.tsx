'use client';

import React from 'react';
import { JsonLd } from '../components/JsonLd';
import { LastUpdated } from '../components/LastUpdated';
import { AeoAnswerBlock } from '../components/AeoAnswerBlock';
import { CONTENT_REGISTRY } from '../data/registry';
import {
  ATTEMPTS, BASELINE_STEPS, BASELINE_SCOPE, BASELINE_EXCLUSIONS, DEFECTS,
  PV1_STAGES, P0_ITEMS, P1_ITEMS, MEASUREMENTS, NOT_MEASURED, Outcome,
} from '../data/evidence';
import { BASELINE, repoMain } from '../lib/project';

const OUTCOME_CLS: Record<Outcome, string> = {
  PASS: 'text-[#00FF41] border-[#00FF41]/40 bg-[#00FF41]/10',
  FAIL: 'text-[#ff5f56] border-[#ff5f56]/40 bg-[#ff5f56]/10',
  INFRA_FAILURE: 'text-white/60 border-white/20 bg-white/5',
  PENDING: 'text-[#00e5ff] border-[#00e5ff]/40 bg-[#00e5ff]/10',
};

const PROGRESSION = ['M1–M8 implementation', 'Production validation (PV-1, P0)', 'Release candidate', 'Externally reproduced evidence', 'Production release'];

export const RoadmapView: React.FC = () => {
  const fm = CONTENT_REGISTRY['/roadmap/'];
  return (
    <div className="space-y-12 max-w-6xl mx-auto">
      <JsonLd frontmatter={fm} />
      <LastUpdated updatedAt={fm.updatedAt} />
      <header className="space-y-4 text-center max-w-3xl mx-auto">
        <h1 className="text-3xl sm:text-5xl font-bold font-display text-white uppercase">{fm.h1}</h1>
        <p className="text-sm sm:text-base text-white/60 leading-relaxed font-sans">
          No capability moves from limited to verified because its code exists. It moves when reproducible
          evidence from the environment the claim implies says so.
        </p>
      </header>

      <AeoAnswerBlock question="Is Decentralized.Host production-ready?" answer={fm.extractableAnswer!} sourceContext="evidence/INDEX.md, docs/BLUEPRINT.md §12" />

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-white font-display">Where it is</h2>
        <ol className="flex flex-wrap items-center gap-2 text-[11px] font-mono uppercase tracking-wide">
          {PROGRESSION.map((p, i) => (
            <li key={p} className="flex items-center gap-2">
              <span className={`px-3 py-1.5 rounded border ${i === 0 ? 'border-[#00FF41]/40 text-[#00FF41] bg-[#00FF41]/10' : i === 1 ? 'border-[#ffbd2e]/40 text-[#ffbd2e] bg-[#ffbd2e]/10' : 'border-white/10 text-white/40'}`}>
                {p}{i === 0 ? ' · done' : i === 1 ? ' · now' : ''}
              </span>
              {i < PROGRESSION.length - 1 && <span className="text-white/20">→</span>}
            </li>
          ))}
        </ol>
      </section>

      <section className="space-y-4">
        <div className="flex items-baseline justify-between gap-3 flex-wrap">
          <h2 className="text-xl font-bold text-white font-display">Every validation attempt</h2>
          <a href={repoMain('evidence/INDEX.md')} target="_blank" rel="noreferrer" className="text-[11px] font-mono text-white/40 hover:text-[#00FF41]">evidence/INDEX.md</a>
        </div>
        <p className="text-sm text-white/60 font-sans">Failed and infrastructure-failed attempts stay on the record next to the ones that superseded them.</p>
        <div className="overflow-x-auto rounded-lg border border-white/10">
          <table className="w-full text-sm font-sans">
            <thead className="bg-white/[0.03] text-[10px] font-mono uppercase tracking-wider text-white/50">
              <tr>
                <th className="text-left p-3">Record</th><th className="text-left p-3">Environment</th><th className="text-left p-3">Source</th>
                <th className="text-left p-3">Outcome</th><th className="text-left p-3">Signature</th><th className="text-left p-3">Notes</th>
              </tr>
            </thead>
            <tbody>
              {ATTEMPTS.map((a) => (
                <tr key={a.id} className="border-t border-white/10 align-top">
                  <td className="p-3 font-mono text-white whitespace-nowrap">{a.id}</td>
                  <td className="p-3 text-white/60 min-w-[160px]">{a.environment}</td>
                  <td className="p-3 font-mono text-[11px] text-white/50 whitespace-nowrap">{a.digest}</td>
                  <td className="p-3"><span className={`px-2 py-0.5 rounded border text-[11px] font-mono whitespace-nowrap ${OUTCOME_CLS[a.outcome]}`}>{a.outcome.replace('_', ' ')}</span></td>
                  <td className="p-3 text-[11px] font-mono text-white/50 whitespace-nowrap">{a.verified}</td>
                  <td className="p-3 text-white/65 min-w-[260px]">{a.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-6 rounded-lg bg-[#0a0a0a] border border-[#00FF41]/30 space-y-3">
          <h2 className="text-lg font-bold text-white font-display">The baseline: REF-MAC-A03</h2>
          <p className="text-xs text-white/55 font-sans leading-relaxed">{BASELINE_SCOPE}</p>
          <ul className="text-sm font-mono divide-y divide-white/5">
            {BASELINE_STEPS.map((s) => (
              <li key={s.name} className="py-1.5 flex justify-between gap-3">
                <span className="text-white/75"><span className="text-[#00FF41] mr-2">✓</span>{s.name}</span>
                <span className="text-white/40 text-xs">{s.seconds}s</span>
              </li>
            ))}
          </ul>
          <p className="text-xs text-white/45 font-sans">Excluded from this record: {BASELINE_EXCLUSIONS.join('; ')}.</p>
          <a href={BASELINE.releaseUrl} target="_blank" rel="noreferrer" className="inline-block text-[11px] font-mono text-[#00FF41] hover:underline">release {BASELINE.tag} · source {BASELINE.sourceDigestShort}</a>
        </div>
        <div className="p-6 rounded-lg bg-[#0a0a0a] border border-white/10 space-y-3">
          <h2 className="text-lg font-bold text-white font-display">Defects found by validation</h2>
          <p className="text-xs text-white/55 font-sans">Each fixed defect has a regression test that fails without the fix.</p>
          <ul className="space-y-2.5">
            {DEFECTS.map((d) => (
              <li key={d.id} className="text-sm font-sans">
                <span className={`font-mono mr-2 ${d.status.startsWith('OPEN') ? 'text-[#ffbd2e]' : 'text-[#00FF41]'}`}>{d.id}</span>
                <span className="text-white/80">{d.title}</span>
                <div className="text-[11px] font-mono text-white/45 ml-7">{d.status}</div>
              </li>
            ))}
          </ul>
          <a href={repoMain('evidence/PV1-S1-HISTORY.md')} target="_blank" rel="noreferrer" className="inline-block text-[11px] font-mono text-white/40 hover:text-[#00FF41]">evidence/PV1-S1-HISTORY.md</a>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-white font-display">PV-1: real infrastructure, in order</h2>
        <p className="text-sm text-white/60 font-sans">Each stage must pass before the next starts. WAN comes last. The development Mac is the reference only; it promotes nothing.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {PV1_STAGES.map((s) => (
            <div key={s.id} className="p-4 rounded-lg bg-[#0a0a0a] border border-white/10 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[#00FF41] text-sm">{s.id}</span>
                <span className="text-[10px] font-mono text-white/40 uppercase">{s.status}</span>
              </div>
              <div className="text-sm font-bold text-white font-display">{s.title}</div>
              <div className="text-[11px] text-white/45 font-sans">{s.env}</div>
              <p className="text-xs text-white/65 font-sans leading-relaxed">{s.establishes}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-white font-display">P0: required for a release candidate</h2>
        <div className="rounded-lg border border-white/10 divide-y divide-white/5">
          {P0_ITEMS.map((p) => (
            <div key={p.id} className="p-3 grid grid-cols-1 sm:grid-cols-[70px_220px_1fr] gap-1 sm:gap-4 text-sm">
              <span className="font-mono text-[#ffbd2e]">{p.id}</span>
              <span className="text-white font-medium">{p.title}</span>
              <span className="text-white/60 font-sans">{p.exit}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-6 rounded-lg bg-[#0a0a0a] border border-white/10 space-y-3">
          <h2 className="text-lg font-bold text-white font-display">P1: planned capability</h2>
          <ul className="text-sm text-white/65 font-sans space-y-1.5">{P1_ITEMS.map((p) => <li key={p}>› {p}</li>)}</ul>
        </div>
        <div className="p-6 rounded-lg bg-[#0a0a0a] border border-white/10 space-y-3">
          <h2 className="text-lg font-bold text-white font-display">Measured so far</h2>
          <p className="text-xs text-white/50 font-sans">One development machine, loopback. Indicative, not benchmarks.</p>
          <ul className="text-sm font-sans divide-y divide-white/5">
            {MEASUREMENTS.map((m) => (
              <li key={m.what} className="py-1.5">
                <div className="flex justify-between gap-3"><span className="text-white/75">{m.what}</span><span className="font-mono text-[#00FF41] text-xs whitespace-nowrap">{m.result}</span></div>
                <div className="text-[11px] text-white/40">{m.method}</div>
              </li>
            ))}
          </ul>
          <p className="text-xs text-white/45 font-sans">NOT MEASURED: {NOT_MEASURED.join(', ')}.</p>
        </div>
      </section>
    </div>
  );
};
