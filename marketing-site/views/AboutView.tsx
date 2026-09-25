'use client';

import React from 'react';
import { JsonLd } from '../components/JsonLd';
import { LastUpdated } from '../components/LastUpdated';
import { CONTENT_REGISTRY } from '../data/registry';

const PRINCIPLES = [
  ['Self-hosted by default', 'A single-binary control plane and host agent. No SaaS dependency.'],
  ['No telemetry, no phone-home', 'No outbound calls except the ones the operator configures.'],
  ['Hosts remain sovereign', 'Local policy decides admission; the control plane can read it but never change it.'],
  ['Desired ≠ admitted ≠ observed', 'Separate everywhere, end to end.'],
  ['Every consequential transition is observable', 'Hash-chained ledgers on the control plane and on every host.'],
  ['Offline operation is expected', 'Hold semantics, an outbox, buffered observations.'],
  ['Failure is part of the product', '17 chaos scenarios with invariants, run under traffic.'],
  ['UNKNOWN remains UNKNOWN', 'Nothing unmeasured is estimated or implied.'],
];

export const AboutView: React.FC = () => {
  const fm = CONTENT_REGISTRY['/about/'];
  return (
    <div className="space-y-12 max-w-4xl mx-auto">
      <JsonLd frontmatter={fm} />
      <LastUpdated updatedAt={fm.updatedAt} />
      <header className="space-y-4 text-center">
        <h1 className="text-3xl sm:text-5xl font-bold font-display text-white uppercase">{fm.h1}</h1>
        <p className="text-sm sm:text-base text-white/60 leading-relaxed font-sans">
          Decentralized.Host lets independent operators run applications on hardware they control, coordinated
          by a control plane that can propose but never command.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-white font-display">Principles, each with an enforcement point</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {PRINCIPLES.map(([t, d]) => (
            <div key={t} className="p-4 rounded-lg bg-[#0a0a0a] border border-white/10">
              <div className="text-sm font-bold text-white font-display">{t}</div>
              <div className="text-xs text-white/55 font-sans mt-1">{d}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="p-6 rounded-lg bg-[#0a0a0a] border border-[#00FF41]/30 space-y-3">
        <h2 className="text-xl font-bold text-white font-display">The standard</h2>
        <p className="text-sm text-white/70 font-sans leading-relaxed">
          Do not call a single control plane HA. Do not call a simulated failure chaos. Do not call a browser
          visualization mesh state. Do not call planned capabilities implemented. Do not publish numbers that were
          not measured.
        </p>
        <p className="text-sm text-white/60 font-sans leading-relaxed">
          This site follows the same rule. That is why it shows a recorded session instead of a simulator, labels
          every capability with its evidence, keeps failed validation attempts on the record, and says plainly that
          production readiness has not been demonstrated yet.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-white font-display">History</h2>
        <p className="text-sm text-white/65 font-sans leading-relaxed">
          The name first belonged to a Python prototype: a FastAPI control plane scheduling Docker containers onto
          node agents behind Traefik. The Go implementation is a redesign around host sovereignty, signed evidence and
          a published protocol, built milestone by milestone (M1 sovereign runtime through M8 protocol conformance).
          It is now in production validation, which runs the same gate on real Linux machines before anything is
          called production-ready.
        </p>
      </section>
    </div>
  );
};
