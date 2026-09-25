'use client';

import React from 'react';
import { JsonLd } from '../components/JsonLd';
import { LastUpdated } from '../components/LastUpdated';
import { AeoAnswerBlock } from '../components/AeoAnswerBlock';
import { ClaimBadge } from '../components/ClaimBadge';
import { CONTENT_REGISTRY } from '../data/registry';
import { TRUST_ANCHORS, FAILURE_CASES, DELIBERATE_LIMITS } from '../data/architecture';
import { repoPath } from '../lib/project';
import { ClaimStatus } from '../types';

const SECURITY_TESTS: { t: string; s: ClaimStatus; e: string }[] = [
  { t: 'Signature tampering', s: 'VERIFIED', e: 'M1; chaos replay-forgery; conformance verify/tampered-payload' },
  { t: 'Wrong key', s: 'VERIFIED', e: 'M1; conformance key-substitution, key-not-allowed' },
  { t: 'Replay', s: 'VERIFIED', e: 'M1; chaos replay-forgery' },
  { t: 'Generation rollback', s: 'VERIFIED', e: 'sovereignty_test.go; chaos stale-generation' },
  { t: 'Revocation', s: 'VERIFIED', e: 'M1, M3; chaos revoked-host' },
  { t: 'Forged shell or command', s: 'VERIFIED', e: 'exec is policy-gated (allowExec); commands are argv, never a shell' },
  { t: 'Audit tampering', s: 'VERIFIED', e: 'pkg/audit; 14 conformance vectors; dh audit verify' },
  { t: 'Compromised control plane (valid member key)', s: 'VERIFIED', e: 'sovereignty_test.go' },
  { t: 'Canonicalization attacks', s: 'VERIFIED', e: '42 canon vectors: duplicate keys, lone surrogates, invalid UTF-8, floats, BOM' },
  { t: 'Transport interception', s: 'VERIFIED', e: 'tls_test.go: plain HTTP refused, certificates verify against the root, bootstrap pinned' },
  { t: 'Fuzzing', s: 'NOT_RUN', e: 'planned (P0-8)' },
  { t: 'External security review', s: 'NOT_RUN', e: 'planned (P0-8)' },
];

export const SecurityView: React.FC = () => {
  const fm = CONTENT_REGISTRY['/security/'];
  return (
    <div className="space-y-12 max-w-6xl mx-auto">
      <JsonLd frontmatter={fm} />
      <LastUpdated updatedAt={fm.updatedAt} />
      <header className="space-y-4 text-center max-w-3xl mx-auto">
        <h1 className="text-3xl sm:text-5xl font-bold font-display text-white uppercase">{fm.h1}</h1>
        <p className="text-sm sm:text-base text-white/60 leading-relaxed font-sans">
          The design goal is that compromising the control plane is not the same as compromising a host.
          Below: who holds which key, what each can and cannot do, what a host checks, and which attacks
          are tested — including the ones that are not yet.
        </p>
      </header>

      <AeoAnswerBlock question="Can a compromised control plane take over hosts?" answer={fm.extractableAnswer!} sourceContext="docs/trust-model.md" />

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-white font-display">Keys</h2>
        <div className="overflow-x-auto rounded-lg border border-white/10">
          <table className="w-full text-sm font-sans">
            <thead className="bg-white/[0.03] text-[10px] font-mono uppercase tracking-wider text-white/50">
              <tr><th className="text-left p-3">Key</th><th className="text-left p-3">Held by</th><th className="text-left p-3">Can</th><th className="text-left p-3">Cannot</th></tr>
            </thead>
            <tbody>
              {TRUST_ANCHORS.map((a) => (
                <tr key={a.key} className="border-t border-white/10 align-top">
                  <td className="p-3 font-bold text-white whitespace-nowrap">{a.key}</td>
                  <td className="p-3 text-white/60">{a.heldBy}</td>
                  <td className="p-3 text-white/70">{a.can}</td>
                  <td className="p-3 text-white/70">{a.cannot}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="p-6 rounded-lg bg-[#0a0a0a] border border-[#00FF41]/30 space-y-3">
        <h2 className="text-xl font-bold text-white font-display">What a host checks before it runs anything</h2>
        <ol className="text-sm text-white/70 font-sans space-y-1.5 list-decimal pl-5">
          <li>The bundle chains to the <strong className="text-white">pinned root</strong> — the root from its join token, or from a rotation that root signed.</li>
          <li>The bundle signer is in the root-signed roster, and its state index is not older than one already accepted.</li>
          <li>The assignment is signed by a roster member, names this host, and has a generation at least as high as any already admitted.</li>
          <li>The capability chain authorizes this assignment, host, generation, artifact digest and resources, down from the root.</li>
          <li>Its own <code className="text-[#00FF41]">policy.yaml</code>: tiers, runtimes, digest pinning, publisher attestation, federated work, caps.</li>
          <li>The artifact bytes hash to the assigned digest.</li>
        </ol>
        <p className="text-sm text-white/60 font-sans">
          If any check fails, nothing new starts; if the same generation is already running it is held, not stopped.
          Every decision goes into the host&apos;s own hash-chained ledger. In total the host evaluates 18 ordered checks
          (spec §9.3), shown per replica by <code className="text-[#00FF41]">dh describe app</code>.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-white font-display">Failure and attack cases</h2>
        <div className="overflow-x-auto rounded-lg border border-white/10">
          <table className="w-full text-sm font-sans">
            <thead className="bg-white/[0.03] text-[10px] font-mono uppercase tracking-wider text-white/50">
              <tr><th className="text-left p-3">Case</th><th className="text-left p-3">Outcome</th><th className="text-left p-3">Tested by</th></tr>
            </thead>
            <tbody>
              {FAILURE_CASES.map((f) => (
                <tr key={f.c} className="border-t border-white/10 align-top">
                  <td className="p-3 text-white font-medium">{f.c}</td>
                  <td className="p-3 text-white/70">{f.o}</td>
                  <td className="p-3 text-white/50 font-mono text-xs">{f.t}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-white font-display">Security tests</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {SECURITY_TESTS.map((x) => (
            <div key={x.t} className="p-3 rounded bg-[#0a0a0a] border border-white/10 flex items-start justify-between gap-3">
              <div>
                <div className="text-sm text-white font-medium">{x.t}</div>
                <div className="text-[11px] font-mono text-white/45 mt-0.5">{x.e}</div>
              </div>
              <ClaimBadge status={x.s} />
            </div>
          ))}
        </div>
      </section>

      <section className="p-6 rounded-lg bg-[#0a0a0a] border border-[#ffbd2e]/30 space-y-3">
        <h2 className="text-xl font-bold text-white font-display">Deliberate limits</h2>
        <ul className="text-sm text-white/70 font-sans space-y-1.5">
          {DELIBERATE_LIMITS.map((l) => <li key={l}>› {l}</li>)}
          <li>› Root key custody (offline signer or HSM) is not implemented.</li>
        </ul>
      </section>

      <p className="text-xs text-white/40 font-sans">
        Full model:{' '}
        <a href={repoPath('docs/trust-model.md')} target="_blank" rel="noreferrer" className="text-[#00FF41] underline decoration-[#00FF41]/40">docs/trust-model.md</a>.
        To report a suspected vulnerability, contact the maintainer privately through{' '}
        <a href="https://github.com/CodesbyFebin" target="_blank" rel="noreferrer" className="text-[#00FF41] underline decoration-[#00FF41]/40">github.com/CodesbyFebin</a>{' '}
        rather than opening a public issue.
      </p>
    </div>
  );
};
