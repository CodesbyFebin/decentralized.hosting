'use client';

import React, { useState } from 'react';
import { Check, Copy } from 'lucide-react';

interface Props {
  lines: string[];
  title?: string;
}

// Shell commands to copy. Lines starting with '#' are shown as comments and
// left out of the copied text.
export const CommandBlock: React.FC<Props> = ({ lines, title }) => {
  const [copied, setCopied] = useState(false);
  const text = lines.filter((l) => !l.startsWith('#')).join('\n');

  const copy = () => {
    try {
      navigator.clipboard?.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* clipboard unavailable: the text is still selectable */
    }
  };

  return (
    <div className="rounded-lg border border-white/10 bg-[#050505] overflow-hidden">
      <div className="flex items-center justify-between px-3 py-1.5 bg-white/[0.03] border-b border-white/10">
        <span className="text-[10px] font-mono text-white/40 uppercase tracking-wider">{title ?? 'shell'}</span>
        <button
          onClick={copy}
          className="p-1 rounded text-white/50 hover:text-white hover:bg-white/10"
          aria-label="Copy commands"
          title="Copy commands"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-[#00FF41]" /> : <Copy className="w-3.5 h-3.5" />}
        </button>
      </div>
      <pre className="p-3 text-xs font-mono overflow-x-auto leading-relaxed">
        {lines.map((l, i) => (
          <div key={i} className={l.startsWith('#') ? 'text-white/35' : 'text-white/85'}>
            {!l.startsWith('#') && <span className="text-[#00FF41] select-none">$ </span>}
            {l}
          </div>
        ))}
      </pre>
    </div>
  );
};
