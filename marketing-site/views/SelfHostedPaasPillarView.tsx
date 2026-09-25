'use client';

import React from 'react';
import { JsonLd } from '../components/JsonLd';
import { LastUpdated } from '../components/LastUpdated';
import { CONTENT_REGISTRY } from '../data/registry';

const ROWS: [string, string, string][] = [
  ['Deploy an app to machines you own', 'Yes', 'dh apply -f app.yaml; hosts admit under their own policy'],
  ['Build from source / git push', 'No', 'bring an executable (dh artifact push) or a digest-pinned image'],
  ['Framework detection, buildpacks', 'No', '—'],
  ['Rolling updates', 'Yes', 'within maxUnavailable; make-before-break for stateless replicas'],
  ['Rollback', 'Yes', 're-apply the previous manifest (a new generation with old content)'],
  ['HTTPS routing', 'Limited', 'edge hosts with ACME; tested against Pebble only'],
  ['Persistent volumes', 'Yes', 'replicated, snapshot commits at quorum 2; no erasure coding'],
  ['Logs and exec', 'Yes', 'over the mesh; exec only where host policy allows it'],
  ['Managed databases, templates', 'No', '—'],
  ['Autoscaling', 'No', 'dh scale app'],
  ['Web dashboard', 'Yes', 'operator console served by the cluster'],
  ['Multi-server', 'Limited', 'many hosts, but validated on one machine only so far'],
];

export const SelfHostedPaasPillarView: React.FC = () => {
  const fm = CONTENT_REGISTRY['/self-hosted-paas/'];
  return (
    <div className="space-y-10 max-w-4xl mx-auto">
      <JsonLd frontmatter={fm} />
      <LastUpdated updatedAt={fm.updatedAt} />
      <header className="space-y-4 text-center">
        <h1 className="text-3xl sm:text-5xl font-bold font-display text-white uppercase">{fm.h1}</h1>
        <p className="text-sm sm:text-base text-white/60 leading-relaxed font-sans">
          Partly. It runs and routes your applications on hardware you control, but it is an infrastructure layer,
          not a developer platform: there is no build pipeline, and it is not production-validated.
        </p>
      </header>
      <div className="overflow-x-auto rounded-lg border border-white/10">
        <table className="w-full text-sm font-sans">
          <thead className="bg-white/[0.03] text-[10px] font-mono uppercase tracking-wider text-white/50">
            <tr><th className="text-left p-3">PaaS expectation</th><th className="text-left p-3">Here</th><th className="text-left p-3">How / notes</th></tr>
          </thead>
          <tbody>
            {ROWS.map(([a, b, c]) => (
              <tr key={a} className="border-t border-white/10">
                <td className="p-3 text-white">{a}</td>
                <td className={`p-3 font-mono text-xs ${b === 'Yes' ? 'text-[#00FF41]' : b === 'No' ? 'text-white/40' : 'text-[#ffbd2e]'}`}>{b}</td>
                <td className="p-3 text-white/60">{c}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-sm text-white/60 font-sans leading-relaxed">
        If you want a polished self-hosted PaaS today, see <a href="/alternatives/" className="text-[#00FF41] underline decoration-[#00FF41]/40">alternatives</a>.
        Decentralized.Host is for when the hosts themselves must be able to refuse the coordinator, and every
        transition must be signed and verifiable.
      </p>
    </div>
  );
};
