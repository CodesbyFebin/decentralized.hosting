'use client';

import React, { useState } from 'react';
import { Check, Copy, Terminal } from 'lucide-react';
import { SESSION, SESSION_META } from '../data/session';

// Replaces the old "deployment simulator". Nothing here is generated in the
// browser: every line is the recorded output of the Go build (see
// data/session.ts for how it was captured and what was redacted).
export const RecordedSession: React.FC = () => {
  const [active, setActive] = useState(0);
  const [copied, setCopied] = useState<number | null>(null);
  const step = SESSION[active];

  const copy = (i: number) => {
    const text = SESSION[i].command;
    try {
      navigator.clipboard?.writeText(text);
      setCopied(i);
      setTimeout(() => setCopied(null), 1500);
    } catch {
      /* clipboard unavailable: the command is still visible */
    }
  };

  return (
    <div className="rounded-lg border border-[#00FF41]/30 bg-[#050505] overflow-hidden shadow-[0_0_40px_rgba(0,255,65,0.06)]">
      <div className="flex items-center justify-between gap-3 px-4 py-2.5 bg-white/[0.03] border-b border-white/10 flex-wrap">
        <div className="flex items-center gap-2 min-w-0">
          <Terminal className="w-4 h-4 text-[#00FF41] shrink-0" />
          <span className="text-xs font-mono text-white uppercase tracking-wider">Recorded session</span>
          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded border border-[#00FF41]/30 text-[#00FF41] bg-[#00FF41]/10 uppercase">
            real output · not a simulation
          </span>
        </div>
        <span className="text-[10px] font-mono text-white/40">
          {SESSION_META.recordedAt.replace('T', ' ').replace('Z', ' UTC')} · {SESSION_META.os} · commit {SESSION_META.commit.split(' ')[0]}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr]">
        <ol className="border-b lg:border-b-0 lg:border-r border-white/10 p-2 flex lg:flex-col gap-1 overflow-x-auto" aria-label="Commands in the recorded session">
          {SESSION.map((s, i) => (
            <li key={s.command} className="shrink-0">
              <button
                onClick={() => setActive(i)}
                aria-current={i === active}
                className={`w-full text-left px-2.5 py-1.5 rounded font-mono text-[11px] whitespace-nowrap transition-colors ${
                  i === active ? 'bg-[#00FF41]/10 text-[#00FF41] border border-[#00FF41]/30' : 'text-white/60 hover:text-white hover:bg-white/5 border border-transparent'
                }`}
              >
                <span className="text-white/30 mr-1.5">{String(i + 1).padStart(2, '0')}</span>
                {s.command.length > 30 ? s.command.slice(0, 29) + '…' : s.command}
              </button>
            </li>
          ))}
        </ol>

        <div className="min-w-0">
          <div className="px-4 pt-3 pb-2 space-y-2 border-b border-white/5">
            <div className="flex items-center justify-between gap-2">
              <code className="font-mono text-xs sm:text-sm text-white break-all">
                <span className="text-[#00FF41]">$ </span>
                {step.command}
              </code>
              <button
                onClick={() => copy(active)}
                className="shrink-0 p-1.5 rounded bg-white/5 hover:bg-white/10 border border-white/10 text-white/60 hover:text-white"
                title="Copy command"
                aria-label="Copy command"
              >
                {copied === active ? <Check className="w-3.5 h-3.5 text-[#00FF41]" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
            <p className="text-xs text-white/50 font-sans leading-relaxed">{step.note}</p>
          </div>
          <pre className="p-4 text-[11px] leading-relaxed font-mono text-white/80 overflow-x-auto max-h-[420px] overflow-y-auto whitespace-pre">
            {step.output}
          </pre>
          <div className="px-4 py-2 border-t border-white/5 text-[10px] font-mono text-white/40 flex gap-4 flex-wrap">
            <span>exit {step.exit ?? '—'}</span>
            {step.elapsed && <span>{step.elapsed}s wall clock</span>}
            <span>redacted: session token, scratch path, hostname</span>
          </div>
        </div>
      </div>
    </div>
  );
};
