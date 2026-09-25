'use client';

import React from 'react';
import { JsonLd } from '../components/JsonLd';
import { LastUpdated } from '../components/LastUpdated';
import { AeoAnswerBlock } from '../components/AeoAnswerBlock';
import { CONTENT_REGISTRY } from '../data/registry';

const SECTIONS: { h: string; p: string[] }[] = [
  {
    h: 'Decentralized authority, not decentralized money',
    p: [
      'Most things called "decentralized hosting" are marketplaces: a token pays anonymous providers to run your container. Decentralized.Host answers a different question — who gets the final say over a machine?',
      'Its answer: the machine\'s operator. A replicated control plane decides what should run and signs that intent, but every host checks each assignment against its own policy and pinned trust root before running it, and can refuse. Hosts keep their own hash-chained ledgers, so neither side can quietly rewrite what happened.',
    ],
  },
  {
    h: 'Three places authority is split',
    p: [
      'Between control plane and host: proposals are signed; admission is local; observations are signed by the host that made them.',
      'Inside the control plane: 3 or 5 Raft members, so no single member is the control plane, and bundles carry a state index so a deposed leader or restored backup cannot roll hosts back.',
      'Between clusters: federation lets one cluster grant another bounded capacity with a root-signed agreement. Placements are re-signed by the grantor, hosts still apply their own policy, and revoking the agreement stops the work.',
    ],
  },
  {
    h: 'What it is not',
    p: [
      'It has no token, rewards, payments or public marketplace. Hosts join a cluster by the operator\'s invite. It does not use IPFS or a blockchain; its audit ledger is a hash chain with signed checkpoints inside one cluster.',
    ],
  },
  {
    h: 'How far it has been proven',
    p: [
      'The mechanisms are implemented and exercised by multi-process tests and 17 chaos scenarios — on one machine. Decentralization only really matters across machines and networks that fail independently, and that is precisely what has not been validated yet. PV-1 does it in stages: Linux, a LAN of three machines, real partitions and power loss, then WAN and NAT.',
    ],
  },
];

export const DecentralizedHostingPillarView: React.FC = () => {
  const fm = CONTENT_REGISTRY['/decentralized-hosting/'];
  return (
    <div className="space-y-10 max-w-3xl mx-auto">
      <JsonLd frontmatter={fm} />
      <LastUpdated updatedAt={fm.updatedAt} />
      <header className="space-y-4 text-center">
        <h1 className="text-3xl sm:text-5xl font-bold font-display text-white uppercase">{fm.h1}</h1>
      </header>
      <AeoAnswerBlock question="What is decentralized hosting in Decentralized.Host?" answer={fm.extractableAnswer!} sourceContext="README.md, docs/trust-model.md" />
      {SECTIONS.map((s) => (
        <section key={s.h} className="space-y-3">
          <h2 className="text-xl font-bold text-white font-display">{s.h}</h2>
          {s.p.map((p) => <p key={p} className="text-sm sm:text-base text-white/70 leading-relaxed font-sans">{p}</p>)}
        </section>
      ))}
    </div>
  );
};
