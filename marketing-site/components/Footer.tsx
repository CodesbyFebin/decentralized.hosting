'use client';

import React from 'react';
import { useNavigate } from './useNavigate';
import { REPO_URL, BASELINE, LICENSE_STATUS, STATUS_DATE } from '../lib/project';

interface Props {
  onOpenAudit: () => void;
}

const COLUMNS: { title: string; links: [string, string][] }[] = [
  { title: 'Product', links: [['Capabilities', '/features/'], ['Architecture', '/architecture/'], ['Security', '/security/'], ['Status & roadmap', '/roadmap/']] },
  { title: 'Use it', links: [['Run it yourself', '/deploy/'], ['Documentation', '/docs/'], ['Guides', '/guides/'], ['Becoming a host', '/depin/']] },
  { title: 'Context', links: [['What “decentralized” means', '/decentralized-hosting/'], ['Is it a PaaS?', '/self-hosted-paas/'], ['Alternatives', '/alternatives/'], ['FAQ', '/faq/']] },
  { title: 'Project', links: [['About', '/about/'], ['Source & license', '/open-source/'], ['Topic directory', '/pillars/'], ['llms.txt', '/llms.txt']] },
];

export const Footer: React.FC<Props> = ({ onOpenAudit }) => {
  const onNavigate = useNavigate();
  return (
    <footer className="w-full bg-[#050505] border-t border-white/10 text-white/60 font-sans text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 space-y-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {COLUMNS.map((c) => (
            <div key={c.title} className="space-y-3">
              <div className="text-[10px] font-mono text-white/40 uppercase tracking-widest">{c.title}</div>
              <ul className="space-y-2">
                {c.links.map(([label, href]) => (
                  <li key={href}>
                    {href.endsWith('.txt') ? (
                      <a href={href} className="hover:text-[#00FF41]">{label}</a>
                    ) : (
                      <button onClick={() => onNavigate(href)} className="hover:text-[#00FF41] text-left">{label}</button>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-6 border-t border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4 font-mono text-[10px] text-white/40">
          <div className="space-y-1">
            <div>
              Decentralized.Host · Go implementation ·{' '}
              <a href={REPO_URL} target="_blank" rel="noreferrer" className="hover:text-[#00FF41]">{REPO_URL.replace('https://', '')}</a>
            </div>
            <div>
              Status as of {STATUS_DATE}: validated revision {BASELINE.commit} ({BASELINE.sourceDigestShort}) · {LICENSE_STATUS.text}
            </div>
          </div>
          <button onClick={onOpenAudit} className="self-start md:self-auto px-3 py-1.5 rounded border border-white/10 hover:border-[#00FF41]/40 hover:text-[#00FF41] uppercase tracking-wider">
            Evidence summary
          </button>
        </div>
      </div>
    </footer>
  );
};
