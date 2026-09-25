'use client';

import React, { useState } from 'react';
import { ARCHITECTURE_COMPONENTS, LIFECYCLE } from '../data/architecture';
import { Terminal, Database, Server, Network, HardDrive, Globe, ArrowDown } from 'lucide-react';

const ICONS: Record<string, typeof Terminal> = {
  operator: Terminal,
  control: Database,
  host: Server,
  mesh: Network,
  storage: HardDrive,
  edge: Globe,
};

// A static diagram of the real components. Nothing here animates traffic or
// pretends to show live state -- the console of a running cluster does that.
export const ArchitectureVisualizer: React.FC = () => {
  const [selected, setSelected] = useState('control');
  const comp = ARCHITECTURE_COMPONENTS.find((c) => c.id === selected) ?? ARCHITECTURE_COMPONENTS[0];

  const Block: React.FC<{ id: string; sub: string }> = ({ id, sub }) => {
    const c = ARCHITECTURE_COMPONENTS.find((x) => x.id === id)!;
    const Icon = ICONS[id];
    const active = selected === id;
    return (
      <button
        onClick={() => setSelected(id)}
        aria-pressed={active}
        className={`w-full text-left p-3 sm:p-4 rounded-lg border transition-colors ${
          active ? 'bg-[#00FF41]/10 border-[#00FF41]' : 'bg-white/[0.02] border-white/10 hover:border-[#00FF41]/40'
        }`}
      >
        <div className="flex items-center gap-2">
          <Icon className="w-4 h-4 text-[#00FF41] shrink-0" />
          <span className="text-sm font-bold text-white font-display">{c.name}</span>
        </div>
        <div className="text-[11px] font-mono text-[#00FF41]/80 mt-1">{c.binary}</div>
        <div className="text-[11px] text-white/50 mt-0.5">{sub}</div>
      </button>
    );
  };

  const Arrow: React.FC<{ label: string }> = ({ label }) => (
    <div className="flex items-center justify-center gap-2 py-1.5 text-[10px] font-mono text-white/40 uppercase tracking-wider">
      <ArrowDown className="w-3.5 h-3.5 text-[#00FF41]/60" />
      <span>{label}</span>
    </div>
  );

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-6">
        <div className="p-4 sm:p-5 rounded-lg bg-[#0a0a0a] border border-white/10">
          <Block id="operator" sub="dh CLI or the console" />
          <Arrow label="attenuated capability · TLS" />
          <Block id="control" sub="Raft · 3 or 5 members · mutual TLS" />
          <Arrow label="signed bundles · stateIndex" />
          <div className="grid grid-cols-2 gap-2">
            <Block id="host" sub="admits under its own policy" />
            <Block id="edge" sub="health-gated L7 proxy" />
          </div>
          <div className="grid grid-cols-2 gap-2 mt-2">
            <Block id="mesh" sub="userspace WireGuard + gossip" />
            <Block id="storage" sub="BLAKE3 · FastCDC · Merkle" />
          </div>
          <Arrow label="signed observations back to the control plane" />
          <p className="text-[11px] text-white/40 font-sans text-center">
            Select a block for what it holds and does.
          </p>
        </div>

        <div className="p-5 sm:p-6 rounded-lg bg-[#0a0a0a] border border-[#00FF41]/30 space-y-4">
          <div>
            <h3 className="text-lg font-bold text-white font-display">{comp.name}</h3>
            <div className="text-xs font-mono text-white/50 mt-1">
              <span className="text-[#00FF41]">{comp.binary}</span> · runs on {comp.runsOn}
            </div>
          </div>
          <div>
            <div className="text-[10px] font-mono text-white/40 uppercase tracking-widest mb-1.5">Holds</div>
            <ul className="flex flex-wrap gap-1.5">
              {comp.holds.map((h) => (
                <li key={h} className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10 text-white/70">{h}</li>
              ))}
            </ul>
          </div>
          <div>
            <div className="text-[10px] font-mono text-white/40 uppercase tracking-widest mb-1.5">Does</div>
            <ul className="space-y-2">
              {comp.responsibilities.map((r) => (
                <li key={r} className="text-sm text-white/75 leading-relaxed font-sans flex gap-2">
                  <span className="text-[#00FF41] shrink-0">›</span>
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="pt-3 border-t border-white/10 text-[11px] font-mono text-white/40">source: {comp.source}</div>
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="text-base font-bold text-white font-display uppercase tracking-wide">The path of a deployment</h3>
        <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {LIFECYCLE.map((s, i) => (
            <li key={s.step} className="p-4 rounded-lg bg-[#0a0a0a] border border-white/10 space-y-1.5">
              <div className="flex items-center justify-between text-[10px] font-mono text-white/40 uppercase tracking-wider">
                <span>{String(i + 1).padStart(2, '0')} · {s.where}</span>
              </div>
              <div className="text-sm font-bold text-[#00FF41] font-display">{s.step}</div>
              <p className="text-xs text-white/60 leading-relaxed font-sans">{s.what}</p>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};
