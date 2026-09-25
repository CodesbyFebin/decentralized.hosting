'use client';

import React, { useEffect } from 'react';
import { ShieldCheck, X } from 'lucide-react';
import { ATTEMPTS } from '../data/evidence';
import { FEATURE_COUNTS } from '../data/features';
import { EVIDENCE_SCOPE, BASELINE } from '../lib/project';
import { useNavigate } from './useNavigate';
import { CommandBlock } from './CommandBlock';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

// A summary of the signed validation records the site's claims rest on.
// (Kept under its old name so the app shell did not need to change.)
export const AuditModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const onNavigate = useNavigate();

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="evidence-title">
      <div className="w-full max-w-3xl bg-[#0a0a0a] border border-[#00FF41]/40 rounded-lg overflow-hidden flex flex-col max-h-[88vh]" onClick={(e) => e.stopPropagation()}>
        <div className="p-4 bg-white/5 border-b border-white/10 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-5 h-5 text-[#00FF41]" />
            <h3 id="evidence-title" className="text-base font-bold text-white font-display uppercase tracking-wide">Evidence summary</h3>
          </div>
          <button onClick={onClose} className="p-1.5 rounded hover:bg-white/10 text-white/60 hover:text-white" aria-label="Close">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 space-y-5 overflow-y-auto text-sm font-sans">
          <p className="text-white/70 leading-relaxed">
            Capabilities: <span className="text-[#00FF41]">{FEATURE_COUNTS.VERIFIED} verified</span>,{' '}
            <span className="text-[#ffbd2e]">{FEATURE_COUNTS.LIMITED} limited</span>,{' '}
            {FEATURE_COUNTS.NOT_IMPLEMENTED} not implemented, {FEATURE_COUNTS.NOT_RUN} not run. Baseline record{' '}
            <span className="font-mono text-white">REF-MAC-A03</span> passed on source{' '}
            <span className="font-mono text-white">{BASELINE.sourceDigestShort}</span>.
          </p>
          <p className="text-xs text-[#ffbd2e]/90 border-l-2 border-[#ffbd2e]/40 pl-3">{EVIDENCE_SCOPE}</p>

          <div className="rounded border border-white/10 divide-y divide-white/5">
            {ATTEMPTS.map((a) => (
              <div key={a.id} className="px-3 py-2 grid grid-cols-[110px_110px_1fr] gap-3 text-xs">
                <span className="font-mono text-white">{a.id}</span>
                <span className={`font-mono ${a.outcome === 'PASS' ? 'text-[#00FF41]' : a.outcome === 'FAIL' ? 'text-[#ff5f56]' : a.outcome === 'PENDING' ? 'text-[#00e5ff]' : 'text-white/50'}`}>{a.outcome.replace('_', ' ')}</span>
                <span className="text-white/55">{a.environment}</span>
              </div>
            ))}
          </div>

          <div className="space-y-2">
            <div className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Check it yourself</div>
            <CommandBlock lines={['dh evidence verify --dir evidence/REF-MAC-A03', 'dh evidence digest']} />
          </div>

          <button
            onClick={() => { onClose(); onNavigate('/roadmap/'); }}
            className="w-full py-2.5 rounded bg-[#00FF41]/10 hover:bg-[#00FF41]/20 text-[#00FF41] border border-[#00FF41]/30 font-mono text-xs uppercase tracking-wider"
          >
            Full status and roadmap
          </button>
        </div>
      </div>
    </div>
  );
};
