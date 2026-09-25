'use client';

import React, { useState } from 'react';
import { JsonLd } from '../components/JsonLd';
import { LastUpdated } from '../components/LastUpdated';
import { CONTENT_REGISTRY } from '../data/registry';
import { LICENSE_STATUS, EVIDENCE_SCOPE } from '../lib/project';
import { ChevronDown } from 'lucide-react';

const FAQ: { q: string; a: string }[] = [
  {
    q: 'Is Decentralized.Host production-ready?',
    a: `No. M1–M8 are implemented and pass a signed reference run, but ${EVIDENCE_SCOPE} Public ACME, a 24-hour soak, upgrades, fuzzing and an external security review are also outstanding. The roadmap page lists exactly what must pass before a release candidate.`,
  },
  {
    q: 'What does "decentralized" mean here?',
    a: 'Authority is split. A replicated control plane can only propose work as signed intent; each host decides under its own policy whether to run it, keeps its own ledger, and reports signed observations. Independent clusters can cooperate through root-signed federation agreements. It does not mean a blockchain, a token or a public marketplace.',
  },
  {
    q: 'Is there a token, credits or rewards for running a host?',
    a: 'No. There is no token, payment, staking or reward mechanism, and none is planned. (The earlier Python prototype that used this domain had Solana devnet credits; the Go implementation does not.)',
  },
  {
    q: 'What happens if the control plane goes down?',
    a: 'Hosts enter offline-hold: work they already admitted keeps running, new work is refused, and observations queue in a local outbox that is flushed when the control plane returns. The cp-total-outage chaos scenario kills every member for 15 seconds under traffic and checks that no request fails.',
  },
  {
    q: 'Can a compromised control plane make my host run anything?',
    a: 'Not anything. A member key can only sign within its root delegation, and every host checks each assignment against its pinned root, the capability chain and its own policy.yaml (tiers, runtimes, digest pinning, attestation, caps) before running it. A member can still sign harmful-but-permitted work, such as scaling an app to zero; use `dh freeze` if you suspect compromise.',
  },
  {
    q: 'Do I need Docker?',
    a: 'No. The process runtime runs signed executables from the cluster\'s own content-addressed store. Docker is the second runtime, for digest-pinned container images, and the only one that enforces CPU and memory limits today.',
  },
  {
    q: 'Can I git push to deploy, or does it build my code?',
    a: 'No. There is no git-push deployment, build service or framework detection. You build an executable or image with your own tools, push it with `dh artifact push` (or reference an image by sha256 digest), and apply a dh/v1 manifest.',
  },
  {
    q: 'Does it run on Linux?',
    a: 'It is meant to, and an offline Linux amd64 kit exists to prove it, but the first authoritative Linux run (PV1-S1-A03) has not happened yet. Every verified result so far is from macOS. An earlier diagnostic run in a starved Linux container found two real defects, which were fixed with regression tests.',
  },
  {
    q: 'Is it open source?',
    a: `${LICENSE_STATUS.detail} The earlier Python prototype is MIT-licensed; that license does not cover the Go implementation.`,
  },
  {
    q: 'How is this different from Kubernetes, Nomad or Coolify?',
    a: 'Those tools assume the control plane is trusted to command nodes. Here the host is the final authority over its own machine, every state transition is signed and journaled, and desired, admitted and observed state stay separate. In exchange it is far smaller and younger: fewer runtimes, no build pipeline, no ecosystem, and no production validation yet.',
  },
  {
    q: 'Where does the data on this site come from?',
    a: 'From the Go repository: docs/BLUEPRINT.md for capability status, evidence/INDEX.md and the signed validation records for results, and a recorded session of the real binaries for the terminal output. Nothing on the site is generated in the browser or estimated.',
  },
  {
    q: 'What is not implemented?',
    a: 'Erasure-coded volumes, HTTP/3, containerd/gVisor/Firecracker runtimes, `dh volume snapshot`/`restore`, CPU and memory enforcement for the process runtime, signed release binaries and an upgrade path, automated browser tests, and did:dh owner identities.',
  },
];

export const FAQView: React.FC = () => {
  const fm = CONTENT_REGISTRY['/faq/'];
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="space-y-10 max-w-4xl mx-auto">
      <JsonLd frontmatter={fm} faqEntries={FAQ.map((f) => ({ question: f.q, answerText: f.a }))} />
      <LastUpdated updatedAt={fm.updatedAt} />
      <header className="space-y-4 text-center">
        <h1 className="text-3xl sm:text-5xl font-bold font-display text-white uppercase">{fm.h1}</h1>
      </header>
      <div className="space-y-2">
        {FAQ.map((f, i) => (
          <div key={f.q} className="rounded-lg bg-[#0a0a0a] border border-white/10">
            <button
              onClick={() => setOpen(open === i ? null : i)}
              aria-expanded={open === i}
              className="w-full flex items-center justify-between gap-4 p-4 text-left"
            >
              <h2 className="text-sm sm:text-base font-bold text-white font-display">{f.q}</h2>
              <ChevronDown className={`w-4 h-4 text-[#00FF41] shrink-0 transition-transform ${open === i ? 'rotate-180' : ''}`} />
            </button>
            {open === i && <p className="px-4 pb-4 text-sm text-white/70 leading-relaxed font-sans">{f.a}</p>}
          </div>
        ))}
      </div>
    </div>
  );
};
