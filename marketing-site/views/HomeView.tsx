'use client';

import React from 'react';
import { useNavigate } from '../components/useNavigate';
import { RecordedSession } from '../components/RecordedSession';
import { TerminalCursor } from '../components/TerminalCursor';
import { ArchitectureVisualizer } from '../components/ArchitectureVisualizer';
import { ClaimBadge } from '../components/ClaimBadge';
import { AeoAnswerBlock } from '../components/AeoAnswerBlock';
import { CommandBlock } from '../components/CommandBlock';
import { JsonLd } from '../components/JsonLd';
import { CONTENT_REGISTRY } from '../data/registry';
import { FEATURES_DATA, FEATURE_COUNTS } from '../data/features';
import { ATTEMPTS } from '../data/evidence';
import { BASELINE, EVIDENCE_SCOPE, REPO_URL } from '../lib/project';
import { ArrowRight, ExternalLink, AlertTriangle, ShieldCheck, Eye, Scale } from 'lucide-react';

const HIGHLIGHT_IDS = ['sovereign-admission', 'hold-semantics', 'audit-ledger', 'cas-storage', 'raft', 'chaos'];

export const HomeView: React.FC = () => {
  const onNavigate = useNavigate();
  const frontmatter = CONTENT_REGISTRY['/'];
  const highlights = HIGHLIGHT_IDS.map((id) => FEATURES_DATA.find((f) => f.id === id)!);
  const baseline = ATTEMPTS.find((a) => a.id === 'REF-MAC-A03')!;

  return (
    <div className="space-y-16 sm:space-y-24">
      <JsonLd frontmatter={frontmatter} />

      {/* HERO */}
      <section className="relative pt-6 sm:pt-12 pb-4 text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] sm:text-xs font-mono flex-wrap justify-center">
          <span className="text-white/70">Go · protocol {BASELINE.protocol}</span>
          <span className="text-white/20">|</span>
          <span className="text-[#ffbd2e]">not yet production-validated</span>
        </div>

        <div className="space-y-4 max-w-4xl mx-auto px-2">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold font-display tracking-tight text-white leading-[0.95] uppercase">
            Host anywhere. Run everywhere.<br />
            <span className="text-transparent" style={{ WebkitTextStroke: '1px #00FF41' }}>
              Own the infrastructure.
            </span>
            <TerminalCursor className="ml-2 inline-block" />
          </h1>
          <p className="text-base sm:text-xl text-white/60 leading-relaxed max-w-2xl mx-auto font-sans">
            Self-hosted infrastructure where hosts stay sovereign. A replicated control plane
            proposes work as signed intent; each host checks it against its own policy before
            anything runs, keeps its own hash-chained ledger, and reports what it actually observed.
          </p>
        </div>

        <div className="flex items-center justify-center gap-3 pt-2 flex-wrap">
          <button
            onClick={() => onNavigate('/deploy/')}
            className="px-6 py-3 rounded bg-[#00FF41] hover:bg-[#00FF41]/90 text-black font-mono font-bold text-xs uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(0,255,65,0.4)] flex items-center gap-2"
          >
            <span>Run it yourself</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => onNavigate('/roadmap/')}
            className="px-6 py-3 rounded bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-[#00FF41]/40 font-mono text-xs uppercase tracking-wider transition-all"
          >
            Status &amp; evidence
          </button>
          <a
            href={REPO_URL}
            target="_blank"
            rel="noreferrer"
            className="px-6 py-3 rounded bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-[#00FF41]/40 font-mono text-xs uppercase tracking-wider transition-all flex items-center gap-2"
          >
            <span>Source</span>
            <ExternalLink className="w-3.5 h-3.5 text-white/40" />
          </a>
        </div>

        <div className="max-w-3xl mx-auto px-2 text-left pt-2">
          <AeoAnswerBlock question="What is Decentralized.Host?" answer={frontmatter.extractableAnswer!} sourceContext="README.md, docs/BLUEPRINT.md" />
        </div>
      </section>

      {/* STATUS */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-5 rounded-lg bg-[#0a0a0a] border border-white/10 space-y-2">
          <div className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Implemented</div>
          <div className="text-2xl font-bold font-mono text-white">M1–M8</div>
          <p className="text-xs text-white/55 font-sans leading-relaxed">
            Sovereign runtime, storage, trust and mesh, edge and TLS, HA control plane, chaos,
            federation and protocol conformance. {FEATURE_COUNTS.VERIFIED} capabilities verified,{' '}
            {FEATURE_COUNTS.LIMITED} limited, {FEATURE_COUNTS.NOT_IMPLEMENTED + FEATURE_COUNTS.NOT_RUN} missing or not run.
          </p>
        </div>
        <div className="p-5 rounded-lg bg-[#0a0a0a] border border-[#00FF41]/30 space-y-2">
          <div className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Latest record</div>
          <div className="text-2xl font-bold font-mono text-[#00FF41]">{baseline.id} · {baseline.outcome}</div>
          <p className="text-xs text-white/55 font-sans leading-relaxed">
            13/13 gate steps on the macOS reference machine, signed and re-verifiable: 10/10 integration,
            17/17 chaos, conformance including an independent Python implementation. Source {BASELINE.sourceDigestShort}.
          </p>
        </div>
        <div className="p-5 rounded-lg bg-[#0a0a0a] border border-[#ffbd2e]/30 space-y-2">
          <div className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Not yet shown</div>
          <div className="text-2xl font-bold font-mono text-[#ffbd2e]">Linux · multi-machine</div>
          <p className="text-xs text-white/55 font-sans leading-relaxed">{EVIDENCE_SCOPE}</p>
        </div>
      </section>

      {/* RECORDED SESSION */}
      <section className="space-y-5">
        <div className="max-w-2xl space-y-2">
          <span className="text-[10px] sm:text-[11px] font-mono text-[#00FF41] uppercase tracking-[0.2em]">
            <span className="text-white/30">&gt;</span> Real output
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold font-display text-white">A real cluster, started on one machine</h2>
          <p className="text-sm text-white/60 leading-relaxed font-sans">
            This replaces the old deployment simulator. It is a recording of the Go build: every line
            below was printed by the real binaries while 7 processes formed a cluster, admitted a
            3-replica app and served it through the edge. You get the same by running the commands on{' '}
            <button onClick={() => onNavigate('/deploy/')} className="text-[#00FF41] underline decoration-[#00FF41]/40 hover:text-white">/deploy/</button>.
          </p>
        </div>
        <RecordedSession />
      </section>

      {/* THE IDEA */}
      <section className="space-y-6">
        <div className="max-w-2xl space-y-2">
          <span className="text-[10px] sm:text-[11px] font-mono text-[#00FF41] uppercase tracking-[0.2em]">
            <span className="text-white/30">&gt;</span> The idea
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold font-display text-white">The control plane proposes. The host decides.</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { icon: Scale, title: 'Desired ≠ admitted ≠ observed', body: 'What you asked for, what hosts accepted under their own policy, and what they measured and signed are separate everywhere: API, CLI and console. Drift is derived, never hidden in one health score.' },
            { icon: ShieldCheck, title: 'Hosts can say no', body: 'Each host pins the cluster root and runs 18 ordered checks before starting anything. A control plane holding a genuine member key still cannot make a host run work its policy refuses.' },
            { icon: Eye, title: 'Unknown stays unknown', body: 'Values carry a truth basis: OBSERVED, DERIVED, CONFIGURED, PLANNED or UNKNOWN. Latency appears only where it was measured. A stalled view says LAST KNOWN STATE — NOT CURRENT.' },
          ].map(({ icon: Icon, title, body }) => (
            <div key={title} className="p-5 rounded-lg bg-[#0a0a0a] border border-white/10 space-y-2">
              <Icon className="w-5 h-5 text-[#00FF41]" />
              <h3 className="text-base font-bold text-white font-display">{title}</h3>
              <p className="text-xs sm:text-sm text-white/60 leading-relaxed font-sans">{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CONSOLE */}
      <section className="space-y-5">
        <div className="max-w-2xl space-y-2">
          <span className="text-[10px] sm:text-[11px] font-mono text-[#00FF41] uppercase tracking-[0.2em]">
            <span className="text-white/30">&gt;</span> Operator console
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold font-display text-white">Served by the cluster itself</h2>
          <p className="text-sm text-white/60 leading-relaxed font-sans">
            Screenshots of the same recorded cluster, taken through a read-only session. The console
            is served by every control-plane member and loads nothing from third parties.
          </p>
        </div>
        <figure className="space-y-2">
          <img
            src="/assets/console/console-overview.png"
            alt="Console overview: desired 3, admitted 3, observed 3, refused 0, drift 0; 4 of 4 hosts with fresh evidence; Raft leader with 3 voters; audit head verified; milestone cards derived from live evidence."
            width={1440}
            height={900}
            loading="lazy"
            className="w-full h-auto rounded-lg border border-white/10"
          />
          <figcaption className="text-[11px] font-mono text-white/40">Overview — separate counts, never one health score. Recorded 2026-09-25 on a local dev cluster.</figcaption>
        </figure>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <figure className="space-y-2">
            <img src="/assets/console/console-hosts.png" alt="Console hosts screen: four hosts, each ACTIVE, READY, new admission ALLOWED, with fresh signed observations; three control-plane members, one leader." width={1440} height={900} loading="lazy" className="w-full h-auto rounded-lg border border-white/10" />
            <figcaption className="text-[11px] font-mono text-white/40">Hosts — identity, admission and runtime are separate columns.</figcaption>
          </figure>
          <figure className="space-y-2">
            <img src="/assets/console/console-audit.png" alt="Console audit screen: chain head verified, 3 signed checkpoints verified, ledger entries for snapshot commits, health passes and workload starts." width={1440} height={900} loading="lazy" className="w-full h-auto rounded-lg border border-white/10" />
            <figcaption className="text-[11px] font-mono text-white/40">Audit — hash chain and signed checkpoints, re-verifiable with dh audit verify.</figcaption>
          </figure>
        </div>
      </section>

      {/* ARCHITECTURE */}
      <section className="space-y-6">
        <div className="max-w-2xl space-y-2">
          <span className="text-[10px] sm:text-[11px] font-mono text-[#00FF41] uppercase tracking-[0.2em]">
            <span className="text-white/30">&gt;</span> Architecture
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold font-display text-white">Three binaries, one protocol</h2>
        </div>
        <ArchitectureVisualizer />
      </section>

      {/* CAPABILITIES */}
      <section className="space-y-6">
        <div className="flex items-end justify-between gap-4 flex-wrap">
          <div className="space-y-2">
            <span className="text-[10px] sm:text-[11px] font-mono text-[#00FF41] uppercase tracking-[0.2em]">
              <span className="text-white/30">&gt;</span> Capabilities
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-white">Each claim names its evidence</h2>
          </div>
          <button onClick={() => onNavigate('/features/')} className="text-xs font-mono text-[#00FF41] hover:underline flex items-center gap-1 uppercase tracking-wider">
            <span>All {FEATURES_DATA.length}, including what is missing</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {highlights.map((f) => (
            <div key={f.id} className="p-5 rounded-lg bg-[#0a0a0a] border border-white/10 space-y-3 flex flex-col">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[10px] font-mono text-white/40">{f.milestone}</span>
                <ClaimBadge status={f.claimStatus} />
              </div>
              <h3 className="font-bold text-white text-base font-display">{f.title}</h3>
              <p className="text-xs text-white/60 leading-relaxed font-sans flex-1">{f.summary}</p>
              <div className="pt-3 border-t border-white/10 text-[10px] font-mono text-white/40">evidence: {f.evidence}</div>
            </div>
          ))}
        </div>
      </section>

      {/* LIMITS */}
      <section className="p-6 sm:p-8 rounded-lg bg-[#0a0a0a] border border-[#ffbd2e]/30 space-y-4">
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-[#ffbd2e]" />
          <h2 className="text-lg sm:text-xl font-bold font-display text-white">What it does not do yet</h2>
        </div>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 text-sm text-white/65 font-sans">
          <li>› No run has crossed physical machines, a WAN or NAT, or used Linux.</li>
          <li>› ACME is tested only against Pebble, never a public CA.</li>
          <li>› The process runtime does not enforce CPU or memory limits.</li>
          <li>› No 24-hour soak, fuzzing or external security review yet.</li>
          <li>› No git-push builds or buildpacks: you deploy executables or digest-pinned images.</li>
          <li>› No signed release binaries or upgrade path yet; build from source.</li>
          <li>› Erasure coding, HTTP/3, containerd, gVisor and Firecracker are not implemented.</li>
          <li>› No token, credits or marketplace — and none are planned.</li>
        </ul>
      </section>

      {/* CTA */}
      <section className="p-8 sm:p-12 rounded-lg bg-[#0a0a0a] border border-[#00FF41]/30 space-y-6 text-center">
        <div className="max-w-2xl mx-auto space-y-3">
          <h2 className="text-3xl sm:text-4xl font-bold font-display text-white uppercase">See it for yourself</h2>
          <p className="text-white/60 text-sm leading-relaxed font-sans">
            You need Go 1.26 or newer. Every run so far has been on macOS; Linux validation is pending.
            Once built, the recorded cluster started in 6.8 seconds.
          </p>
        </div>
        <div className="max-w-2xl mx-auto text-left">
          <CommandBlock
            lines={[
              `git clone ${REPO_URL}.git decentralized.host`,
              'cd decentralized.host && make build',
              './bin/dh dev up --dir ./devcluster',
            ]}
          />
        </div>
      </section>
    </div>
  );
};
