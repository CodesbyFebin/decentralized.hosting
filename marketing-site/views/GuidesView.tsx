'use client';

import React from 'react';
import { JsonLd } from '../components/JsonLd';
import { LastUpdated } from '../components/LastUpdated';
import { CommandBlock } from '../components/CommandBlock';
import { CONTENT_REGISTRY } from '../data/registry';
import { GUIDES_DATA } from '../data/guides';
import { repoPath } from '../lib/project';

export const GuidesView: React.FC = () => {
  const fm = CONTENT_REGISTRY['/guides/'];
  return (
    <div className="space-y-10 max-w-5xl mx-auto">
      <JsonLd frontmatter={fm} />
      <LastUpdated updatedAt={fm.updatedAt} />
      <header className="space-y-4 text-center max-w-3xl mx-auto">
        <h1 className="text-3xl sm:text-5xl font-bold font-display text-white uppercase">{fm.h1}</h1>
        <p className="text-sm sm:text-base text-white/60 leading-relaxed font-sans">
          Each guide follows a document in the Go repository. Output is shown only where it was actually
          recorded; otherwise you get the command and what it should do.
        </p>
      </header>

      <nav className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3" aria-label="Guides">
        {GUIDES_DATA.map((g) => (
          <a key={g.id} href={`#${g.slug}`} className="p-4 rounded-lg bg-[#0a0a0a] border border-white/10 hover:border-[#00FF41]/40 space-y-1">
            <div className="text-[10px] font-mono text-white/40 uppercase tracking-wider">{g.difficulty}</div>
            <div className="text-sm font-bold text-white font-display">{g.title}</div>
          </a>
        ))}
      </nav>

      {GUIDES_DATA.map((g) => (
        <article key={g.id} id={g.slug} className="space-y-5 scroll-mt-24 pt-6 border-t border-white/10">
          <div className="space-y-2">
            <div className="flex items-center gap-3 flex-wrap text-[10px] font-mono uppercase tracking-wider">
              <span className="text-[#00FF41]">{g.difficulty}</span>
              <a href={repoPath(g.source.split(' ')[0])} target="_blank" rel="noreferrer" className="text-white/40 hover:text-[#00FF41]">follows {g.source}</a>
            </div>
            <h2 className="text-2xl font-bold text-white font-display">{g.title}</h2>
            <p className="text-sm text-white/65 font-sans leading-relaxed">{g.overview}</p>
            <div className="text-xs text-white/50 font-sans">
              <span className="font-mono text-white/40 uppercase text-[10px] tracking-wider mr-2">Needs</span>
              {g.prerequisites.join(' · ')}
            </div>
          </div>
          <ol className="space-y-5">
            {g.steps.map((s, i) => (
              <li key={s.title} className="space-y-2">
                <h3 className="text-sm font-bold text-white font-display">
                  <span className="font-mono text-[#00FF41] mr-2">{String(i + 1).padStart(2, '0')}</span>
                  {s.title}
                </h3>
                <p className="text-sm text-white/60 font-sans">{s.description}</p>
                {s.command && <CommandBlock lines={s.command.includes('\n') && s.command.startsWith('cat') ? [s.command] : s.command.split(' && ')} />}
                {s.output && (
                  <div className="rounded-lg border border-[#00FF41]/20 bg-[#050505]">
                    <div className="px-3 py-1.5 border-b border-white/10 text-[10px] font-mono text-[#00FF41]/80 uppercase tracking-wider">recorded output</div>
                    <pre className="p-3 text-[11px] font-mono text-white/75 overflow-x-auto max-h-80 overflow-y-auto">{s.output}</pre>
                  </div>
                )}
              </li>
            ))}
          </ol>
          {g.notes.length > 0 && (
            <ul className="text-xs text-white/50 font-sans space-y-1 border-l-2 border-white/10 pl-3">
              {g.notes.map((n) => <li key={n}>{n}</li>)}
            </ul>
          )}
        </article>
      ))}
    </div>
  );
};
