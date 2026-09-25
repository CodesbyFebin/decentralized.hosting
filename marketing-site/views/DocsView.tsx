'use client';

import React, { useMemo, useState } from 'react';
import { JsonLd } from '../components/JsonLd';
import { LastUpdated } from '../components/LastUpdated';
import { AeoAnswerBlock } from '../components/AeoAnswerBlock';
import { CommandBlock } from '../components/CommandBlock';
import { CONTENT_REGISTRY } from '../data/registry';
import { DOCS_DATA } from '../data/docs';
import { CLI_COMMANDS } from '../data/cli';
import { repoPath } from '../lib/project';

const REFERENCES = [
  { title: 'Protocol dh/v1', file: 'docs/protocol/dh-v1.md' },
  { title: 'Conformance', file: 'docs/protocol/conformance.md' },
  { title: 'Architecture', file: 'docs/architecture.md' },
  { title: 'Trust model', file: 'docs/trust-model.md' },
  { title: 'Install runbook', file: 'docs/runbooks/install.md' },
  { title: 'Operations runbook', file: 'docs/runbooks/operations.md' },
  { title: 'Production blueprint', file: 'docs/BLUEPRINT.md' },
  { title: 'Evidence records', file: 'docs/evidence/README.md' },
];

export const DocsView: React.FC = () => {
  const fm = CONTENT_REGISTRY['/docs/'];
  const [q, setQ] = useState('');
  const commands = useMemo(() => {
    const s = q.trim().toLowerCase();
    return s ? CLI_COMMANDS.filter((c) => c.command.includes(s) || c.summary.toLowerCase().includes(s)) : CLI_COMMANDS;
  }, [q]);

  return (
    <div className="space-y-10 max-w-6xl mx-auto">
      <JsonLd frontmatter={fm} />
      <LastUpdated updatedAt={fm.updatedAt} />
      <header className="space-y-4 text-center max-w-3xl mx-auto">
        <h1 className="text-3xl sm:text-5xl font-bold font-display text-white uppercase">{fm.h1}</h1>
        <p className="text-sm sm:text-base text-white/60 leading-relaxed font-sans">
          A summary of the documents in the Go repository. Where they differ, the repository is right.
        </p>
      </header>

      <AeoAnswerBlock question="How do I get started?" answer={fm.extractableAnswer!} sourceContext="README.md, docs/runbooks/install.md" />

      <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-8">
        <nav className="lg:sticky lg:top-20 self-start space-y-1 text-xs font-mono" aria-label="On this page">
          {DOCS_DATA.map((d) => (
            <a key={d.id} href={`#${d.id}`} className="block px-2 py-1 rounded text-white/60 hover:text-[#00FF41] hover:bg-white/5">{d.title}</a>
          ))}
          <a href="#cli" className="block px-2 py-1 rounded text-white/60 hover:text-[#00FF41] hover:bg-white/5">CLI reference</a>
          <a href="#references" className="block px-2 py-1 rounded text-white/60 hover:text-[#00FF41] hover:bg-white/5">Source documents</a>
        </nav>

        <div className="space-y-10 min-w-0">
          {DOCS_DATA.map((d) => (
            <section key={d.id} id={d.id} className="space-y-3 scroll-mt-24">
              <div className="flex items-baseline justify-between gap-3 flex-wrap">
                <h2 className="text-xl font-bold text-white font-display">{d.title}</h2>
                <a href={repoPath(d.source.split(' ')[0])} target="_blank" rel="noreferrer" className="text-[10px] font-mono text-white/40 hover:text-[#00FF41]">{d.source}</a>
              </div>
              {d.body.split('\n\n').map((p, i) => (
                <p key={i} className="text-sm text-white/70 leading-relaxed font-sans">{p}</p>
              ))}
              {d.commands && <CommandBlock lines={d.commands} />}
            </section>
          ))}

          <section id="cli" className="space-y-3 scroll-mt-24">
            <h2 className="text-xl font-bold text-white font-display">CLI reference</h2>
            <p className="text-sm text-white/60 font-sans">Generated from <code className="text-[#00FF41]">dh help</code> of the validated build. {CLI_COMMANDS.length} commands.</p>
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Filter commands…"
              aria-label="Filter commands"
              className="w-full sm:w-80 px-3 py-2 rounded bg-white/5 border border-white/10 text-sm text-white font-mono placeholder:text-white/30 focus:outline-none focus:border-[#00FF41]/50"
            />
            <div className="rounded-lg border border-white/10 divide-y divide-white/5">
              {commands.map((c) => (
                <div key={c.command} className="px-3 py-2 grid grid-cols-1 sm:grid-cols-[240px_1fr] gap-1 sm:gap-4">
                  <code className="text-xs font-mono text-[#00FF41]">{c.command}</code>
                  <span className="text-xs text-white/60 font-sans">{c.summary}</span>
                </div>
              ))}
              {commands.length === 0 && <div className="px-3 py-3 text-xs text-white/40">No command matches.</div>}
            </div>
          </section>

          <section id="references" className="space-y-3 scroll-mt-24">
            <h2 className="text-xl font-bold text-white font-display">Source documents</h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {REFERENCES.map((r) => (
                <li key={r.file}>
                  <a href={repoPath(r.file)} target="_blank" rel="noreferrer" className="block p-3 rounded bg-white/[0.02] border border-white/10 hover:border-[#00FF41]/40">
                    <div className="text-sm text-white font-medium">{r.title}</div>
                    <div className="text-[11px] font-mono text-white/40">{r.file}</div>
                  </a>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
};
