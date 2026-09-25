'use client';

import React from 'react';
import { JsonLd } from '../components/JsonLd';
import { LastUpdated } from '../components/LastUpdated';
import { AeoAnswerBlock } from '../components/AeoAnswerBlock';
import { RecordedSession } from '../components/RecordedSession';
import { CommandBlock } from '../components/CommandBlock';
import { CONTENT_REGISTRY } from '../data/registry';
import { REPO_URL, BASELINE, repoPath } from '../lib/project';
import { AlertTriangle } from 'lucide-react';

const H2: React.FC<{ n: string; children: React.ReactNode }> = ({ n, children }) => (
  <h2 className="text-xl sm:text-2xl font-bold font-display text-white flex items-baseline gap-3">
    <span className="text-xs font-mono text-[#00FF41]">{n}</span>
    <span>{children}</span>
  </h2>
);

export const DeployView: React.FC = () => {
  const fm = CONTENT_REGISTRY['/deploy/'];
  return (
    <div className="space-y-12 max-w-5xl mx-auto">
      <JsonLd frontmatter={fm} />
      <LastUpdated updatedAt={fm.updatedAt} />

      <header className="space-y-4 text-center max-w-3xl mx-auto">
        <h1 className="text-3xl sm:text-5xl font-bold font-display text-white uppercase">{fm.h1}</h1>
        <p className="text-sm sm:text-base text-white/60 leading-relaxed font-sans">
          No hosted demo, no simulator: you build the binaries and start a real cluster on your own
          machine. Every process, key, signature and WireGuard handshake is real; they just share
          one computer.
        </p>
      </header>

      <AeoAnswerBlock question="How do I try Decentralized.Host?" answer={fm.extractableAnswer!} sourceContext="README.md Quick start" />

      <section className="space-y-4">
        <H2 n="00">Requirements</H2>
        <ul className="text-sm text-white/65 font-sans space-y-1.5">
          <li>› <strong className="text-white">Go 1.26 or newer</strong>, git and make. Nothing else is needed for the local cluster.</li>
          <li>› Optional: Docker (container runtime and the <code className="text-[#00FF41]">oom</code> chaos scenario), Python 3 (independent conformance implementation), Postgres (evidence mirror).</li>
          <li>› Every run so far used macOS. Linux should work, but it has not been validated yet (PV1-S1 is pending).</li>
        </ul>
      </section>

      <section className="space-y-4">
        <H2 n="01">Build and start a local cluster</H2>
        <CommandBlock
          lines={[
            `git clone ${REPO_URL}.git decentralized.host`,
            'cd decentralized.host',
            '# optional: check out the exact revision that passed the reference run',
            `git checkout ${BASELINE.tag}`,
            'make build',
            './bin/dh dev up --dir ./devcluster',
          ]}
        />
        <p className="text-sm text-white/60 font-sans leading-relaxed">
          <code className="text-[#00FF41]">dev up</code> starts 3 control-plane members and 4 hosts (one of them an
          edge) as separate processes bound to loopback, pushes the <code className="text-[#00FF41]">dh-beacon</code> sample
          artifact, deploys a 3-replica app and prints a console URL. Dev clusters serve the API without TLS
          unless you pass <code className="text-[#00FF41]">--tls</code>; a real installation uses TLS by default.
        </p>
      </section>

      <section className="space-y-4">
        <H2 n="02">Look around</H2>
        <CommandBlock
          lines={[
            'export DH_HOME=./devcluster/operator',
            './bin/dh get apps',
            './bin/dh describe app web      # desired / admitted / observed, and every admission check',
            './bin/dh mesh peers            # WireGuard handshakes and measured RTT',
            './bin/dh audit verify          # fetch the ledger, verify chain and checkpoints locally',
            './bin/dh chaos run --scenario leader-crash',
          ]}
        />
        <p className="text-sm text-white/60 font-sans leading-relaxed">
          This is what those commands printed on the reference machine. Your identifiers, timings and
          ports will differ; the shape should not.
        </p>
        <RecordedSession />
      </section>

      <section className="space-y-4">
        <H2 n="03">Deploy your own executable</H2>
        <p className="text-sm text-white/60 font-sans leading-relaxed">
          The <code className="text-[#00FF41]">process</code> runtime runs an executable from the cluster&apos;s content-addressed
          store. It receives its port in <code className="text-[#00FF41]">$PORT</code> and should answer the health path.
          Build it for the hosts&apos; OS and architecture.
        </p>
        <CommandBlock
          lines={[
            './bin/dh artifact push ./myservice --name myservice --sign     # prints myservice@b3:<digest>',
          ]}
        />
        <CommandBlock
          title="web.yaml"
          lines={[
            'apiVersion: dh/v1',
            'kind: Application',
            'metadata: {name: web}',
            'spec:',
            '  replicas: 2',
            '  image: myservice@b3:<digest>',
            '  resources: {cpu: 100m, mem: 32Mi}',
            '  placement: {tiers: [trusted], spread: failure-domain, antiAffinity: hard}',
            '  ports: [{name: http}]',
            '  health: {http: /healthz, interval: 1s}',
          ]}
        />
        <CommandBlock
          lines={['./bin/dh apply -f web.yaml', './bin/dh rollout status app web', './bin/dh describe app web']}
        />
        <p className="text-sm text-white/60 font-sans leading-relaxed">
          For a container, set <code className="text-[#00FF41]">image</code> to a digest-pinned reference such as{' '}
          <code className="text-[#00FF41]">busybox@sha256:&lt;64 hex&gt;</code>; the manifest then selects the{' '}
          <code className="text-[#00FF41]">docker</code> runtime, which enforces memory and CPU limits. Unpinned images are
          refused. Manifests are strict: unknown fields are rejected.
        </p>
        <div className="p-4 rounded-lg border border-[#ffbd2e]/30 bg-[#ffbd2e]/5 flex gap-3 text-sm text-white/70 font-sans">
          <AlertTriangle className="w-4 h-4 text-[#ffbd2e] shrink-0 mt-0.5" />
          <span>
            There is no git-push deployment, image build or framework detection. Build your artifact with the
            tools you already use, then push it or reference its image digest. The process runtime does
            not enforce the CPU and memory you request; the admission details say so.
          </span>
        </div>
      </section>

      <section className="space-y-4">
        <H2 n="04">Open the console, then stop</H2>
        <CommandBlock
          lines={[
            './bin/dh console --read-only   # prints a URL; the session token is in the #fragment',
            './bin/dh dev down --dir ./devcluster',
          ]}
        />
      </section>

      <section className="space-y-3">
        <H2 n="05">Across real machines</H2>
        <p className="text-sm text-white/60 font-sans leading-relaxed">
          The install runbook covers a TLS cluster with three control-plane members and hosts that join
          with single-use tokens. It is scripted and passed on the reference machine, but it has not yet
          been run across separate machines — that is exactly what PV-1 stage 2 will test. Follow{' '}
          <a href={repoPath('docs/runbooks/install.md')} target="_blank" rel="noreferrer" className="text-[#00FF41] underline decoration-[#00FF41]/40 hover:text-white">
            docs/runbooks/install.md
          </a>{' '}
          or the <a href="/guides/" className="text-[#00FF41] underline decoration-[#00FF41]/40 hover:text-white">TLS install guide</a>.
        </p>
      </section>
    </div>
  );
};
