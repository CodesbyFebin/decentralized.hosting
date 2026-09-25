import { PageFrontmatter } from '../types';
import { PILLARS } from './pillars';
import { REPO_URL } from '../lib/project';

// One entry per canonical URL. The URLs are unchanged from the previous site
// (search engines already index them); the content now describes the Go
// implementation.

const UPDATED = '2026-09-25T00:00:00Z';

type Entry = Omit<PageFrontmatter, 'id' | 'slug' | 'canonical' | 'updatedAt'> & { updatedAt?: string };

function page(slug: string, e: Entry): PageFrontmatter {
  return {
    id: `page${slug === '/' ? '-home' : slug.replace(/\//g, '-').replace(/-$/, '')}`,
    slug,
    canonical: `https://decentralized.host${slug}`,
    updatedAt: UPDATED,
    ...e,
  };
}

const BASE_REGISTRY: Record<string, PageFrontmatter> = {
  '/': page('/', {
    title: 'Decentralized.Host — Self-Hosted Infrastructure Where Hosts Stay Sovereign',
    description:
      'A replicated control plane proposes work as signed intent; every host admits it under its own policy, keeps its own hash-chained ledger and reports what it actually observed. Written in Go. Not yet production-validated.',
    h1: 'Host Anywhere. Run Everywhere. Own the Infrastructure.',
    intent: 'Product overview',
    primaryEntity: 'Decentralized.Host',
    secondaryEntities: ['self-hosted infrastructure', 'host sovereignty', 'Raft control plane', 'WireGuard mesh', 'signed observations'],
    contentType: 'homepage',
    audience: 'system-architects',
    sources: [REPO_URL, 'README.md', 'docs/BLUEPRINT.md'],
    relatedPages: ['/features/', '/architecture/', '/deploy/', '/roadmap/'],
    schemaTypes: ['Organization', 'WebSite', 'SoftwareApplication'],
    publishedAt: '2025-01-15T00:00:00Z',
    extractableAnswer:
      'Decentralized.Host is self-hosted infrastructure software, written in Go, in which a replicated control plane proposes work as signed intent and each host decides under its own local policy whether to run it. Hosts keep hash-chained ledgers and report signed observations, and desired, admitted and observed state stay separate. M1–M8 are implemented and verified on a single machine; multi-machine Linux validation is in progress.',
  }),
  '/features/': page('/features/', {
    title: 'Capabilities and Their Evidence — Decentralized.Host',
    description: 'Every capability of the Go implementation, labelled VERIFIED, LIMITED, NOT IMPLEMENTED or NOT RUN, with the test or chaos scenario behind it.',
    h1: 'Capabilities and Their Evidence',
    intent: 'Capability reference',
    primaryEntity: 'Decentralized.Host capabilities',
    secondaryEntities: ['host admission', 'content-addressed storage', 'Raft', 'WireGuard', 'ACME', 'chaos testing'],
    contentType: 'feature',
    audience: 'engineering-leads',
    sources: ['docs/BLUEPRINT.md §4–§9'],
    relatedPages: ['/architecture/', '/security/', '/roadmap/'],
    schemaTypes: ['TechArticle', 'BreadcrumbList'],
    publishedAt: '2025-01-20T00:00:00Z',
    extractableAnswer:
      'Decentralized.Host files each capability under one label: VERIFIED (exercised by an automated test with real processes and failures), LIMITED (works with a stated limitation), NOT IMPLEMENTED, or NOT RUN. All VERIFIED results so far come from one macOS machine over loopback.',
  }),
  '/architecture/': page('/architecture/', {
    title: 'Architecture — Control Plane, Sovereign Hosts, Mesh and Edge — Decentralized.Host',
    description: 'How dh-control, dh-noded and the dh CLI fit together: Raft, signed bundles, 18 admission checks on every host, userspace WireGuard, content-addressed storage and a health-gated edge.',
    h1: 'Architecture',
    intent: 'Technical architecture',
    primaryEntity: 'Decentralized.Host architecture',
    secondaryEntities: ['Raft', 'Ed25519', 'BLAKE3', 'FastCDC', 'WireGuard', 'memberlist'],
    contentType: 'architecture',
    audience: 'system-architects',
    sources: ['docs/architecture.md', 'docs/BLUEPRINT.md §3', 'docs/decisions/'],
    relatedPages: ['/features/', '/security/', '/docs/'],
    schemaTypes: ['TechArticle', 'BreadcrumbList'],
    publishedAt: '2025-01-25T00:00:00Z',
    extractableAnswer:
      'Decentralized.Host has three binaries: dh-control (a Raft control-plane member that signs desired state), dh-noded (a sovereign host agent that admits, runs, observes and journals work) and dh (the operator CLI). Hosts talk to each other over userspace WireGuard with SWIM gossip.',
  }),
  '/security/': page('/security/', {
    title: 'Security and Trust Model — Decentralized.Host',
    description: 'Why a compromised control plane is not a compromised host: pinned roots, capability chains, signed observations, TLS from first start, offline-verifiable audit — and what has not been reviewed yet.',
    h1: 'Security and Trust Model',
    intent: 'Security reference',
    primaryEntity: 'Decentralized.Host trust model',
    secondaryEntities: ['host sovereignty', 'capabilities', 'TLS bootstrap', 'audit ledger', 'key rotation'],
    contentType: 'security',
    audience: 'system-architects',
    sources: ['docs/trust-model.md', 'docs/BLUEPRINT.md §5, §9'],
    relatedPages: ['/architecture/', '/features/', '/roadmap/'],
    schemaTypes: ['TechArticle', 'BreadcrumbList'],
    publishedAt: '2025-02-01T00:00:00Z',
    extractableAnswer:
      'In Decentralized.Host a host pins the cluster root key and checks every assignment against 18 ordered checks before running it, so a control plane holding a valid member key still cannot make a host run work its policy refuses. Fuzzing and an external security review have not been done yet.',
  }),
  '/docs/': page('/docs/', {
    title: 'Documentation — Decentralized.Host',
    description: 'Build, run a local multi-process cluster, install a TLS cluster across machines, deploy an app with a dh/v1 manifest, and operate it with the dh CLI.',
    h1: 'Documentation',
    intent: 'Reference documentation',
    primaryEntity: 'Decentralized.Host documentation',
    secondaryEntities: ['dh CLI', 'dh/v1 manifest', 'install runbook', 'operations'],
    contentType: 'documentation',
    audience: 'devops',
    sources: ['README.md', 'docs/runbooks/install.md', 'docs/runbooks/operations.md'],
    relatedPages: ['/deploy/', '/guides/', '/architecture/'],
    schemaTypes: ['TechArticle', 'BreadcrumbList'],
    publishedAt: '2025-02-05T00:00:00Z',
    extractableAnswer:
      'Build with `make build` (Go 1.26+), then `./bin/dh dev up --dir ./devcluster` starts a real local cluster of 3 control-plane members and 4 hosts. For a real installation, follow docs/runbooks/install.md: dh init, dh-control on three machines, dh cp bootstrap, dh node invite, dh-noded --join-file.',
  }),
  '/guides/': page('/guides/', {
    title: 'Guides — Decentralized.Host',
    description: 'Step-by-step guides taken from the Go repository\'s runbooks: a local cluster, a TLS install, deploying an executable or container, chaos testing and verifying the audit ledger.',
    h1: 'Guides',
    intent: 'Tutorials',
    primaryEntity: 'Decentralized.Host guides',
    secondaryEntities: ['local cluster', 'TLS install', 'deploy', 'chaos', 'audit'],
    contentType: 'guide',
    audience: 'devops',
    sources: ['docs/runbooks/'],
    relatedPages: ['/docs/', '/deploy/'],
    schemaTypes: ['TechArticle', 'HowTo', 'BreadcrumbList'],
    publishedAt: '2025-02-10T00:00:00Z',
  }),
  '/alternatives/': page('/alternatives/', {
    title: 'How Decentralized.Host Differs From Self-Hosted PaaS Tools — Decentralized.Host',
    description: 'Coolify, Dokploy, CapRover, Dokku and hosted platforms solve a different problem. Where Decentralized.Host\'s model differs, and where those tools are the better choice today.',
    h1: 'Alternatives',
    intent: 'Comparison',
    primaryEntity: 'Decentralized.Host alternatives',
    secondaryEntities: ['Coolify', 'Dokploy', 'CapRover', 'Dokku', 'Heroku', 'Vercel'],
    contentType: 'comparison',
    audience: 'engineering-leads',
    sources: ['data/comparisons.ts'],
    relatedPages: ['/features/', '/self-hosted-paas/'],
    schemaTypes: ['TechArticle', 'BreadcrumbList'],
    publishedAt: '2025-02-15T00:00:00Z',
  }),
  '/deploy/': page('/deploy/', {
    title: 'Run It Yourself — Decentralized.Host',
    description: 'Build the Go binaries and start a real multi-process cluster on your own machine in about a minute. The recorded session shows exactly what you should see.',
    h1: 'Run It Yourself',
    intent: 'Getting started',
    primaryEntity: 'Decentralized.Host local cluster',
    secondaryEntities: ['dh dev up', 'dh-beacon', 'operator console', 'dh/v1 manifest'],
    contentType: 'deploy-recipe',
    audience: 'developers',
    sources: ['README.md Quick start', 'data/session.ts'],
    relatedPages: ['/docs/', '/guides/'],
    schemaTypes: ['TechArticle', 'HowTo', 'BreadcrumbList'],
    publishedAt: '2025-02-18T00:00:00Z',
    extractableAnswer:
      'To try Decentralized.Host, clone github.com/CodesbyFebin/Decentralized-, run `make build` with Go 1.26+, then `./bin/dh dev up --dir ./devcluster`. It starts 3 control-plane members and 4 hosts as local processes, deploys a sample app with 3 replicas, and prints a console URL.',
  }),
  '/decentralized-hosting/': page('/decentralized-hosting/', {
    title: 'What Decentralized Hosting Means Here — Decentralized.Host',
    description: 'Decentralization in Decentralized.Host means hosts that can refuse the control plane, not a token network: sovereign admission, signed evidence, federation between independent clusters.',
    h1: 'What Decentralized Hosting Means Here',
    intent: 'Concept explainer',
    primaryEntity: 'decentralized hosting',
    secondaryEntities: ['host sovereignty', 'federation', 'self-hosting', 'signed evidence'],
    contentType: 'pillar',
    audience: 'system-architects',
    sources: ['README.md', 'docs/trust-model.md'],
    relatedPages: ['/architecture/', '/security/', '/depin/'],
    schemaTypes: ['TechArticle', 'BreadcrumbList'],
    publishedAt: '2025-02-20T00:00:00Z',
    extractableAnswer:
      'In Decentralized.Host, decentralized hosting means authority is split: a replicated control plane can only propose work, each host enforces its own policy and keeps its own ledger, and independent clusters can federate through root-signed agreements. It has no token, marketplace or payments.',
  }),
  '/self-hosted-paas/': page('/self-hosted-paas/', {
    title: 'Is Decentralized.Host a Self-Hosted PaaS? — Decentralized.Host',
    description: 'Partly. It deploys and runs apps on hardware you control, but it has no git-push builds or buildpacks: you deploy signed executables or digest-pinned container images with a manifest.',
    h1: 'Is It a Self-Hosted PaaS?',
    intent: 'Category positioning',
    primaryEntity: 'self-hosted PaaS',
    secondaryEntities: ['deployment', 'manifests', 'artifacts', 'rolling updates'],
    contentType: 'pillar',
    audience: 'developers',
    sources: ['docs/runbooks/install.md §5'],
    relatedPages: ['/alternatives/', '/deploy/'],
    schemaTypes: ['TechArticle', 'BreadcrumbList'],
    publishedAt: '2025-02-22T00:00:00Z',
  }),
  '/depin/': page('/depin/', {
    title: 'Becoming a Host — Decentralized.Host',
    description: 'How a machine joins a cluster: a single-use invite, a pinned root, and a sovereign policy file the control plane can read but never change. There is no token, reward or marketplace.',
    h1: 'Becoming a Host',
    intent: 'Host operator guide',
    primaryEntity: 'Decentralized.Host host operators',
    secondaryEntities: ['node invite', 'policy.yaml', 'host sovereignty', 'DePIN'],
    contentType: 'depin',
    audience: 'node-operators',
    sources: ['docs/runbooks/install.md §4'],
    relatedPages: ['/security/', '/decentralized-hosting/'],
    schemaTypes: ['TechArticle', 'BreadcrumbList'],
    publishedAt: '2025-02-24T00:00:00Z',
    extractableAnswer:
      'A machine joins a Decentralized.Host cluster with a single-use invite token created by the operator (`dh node invite`), runs dh-noded with that token, and is approved with `dh node approve`. Decentralized.Host has no token, rewards or public marketplace.',
  }),
  '/roadmap/': page('/roadmap/', {
    title: 'Status and Roadmap — Decentralized.Host',
    description: 'Every validation attempt so far (including the failed ones), the PV-1 stages that must pass on real Linux machines, and the P0 work required before a release candidate.',
    h1: 'Status and Roadmap',
    intent: 'Project status',
    primaryEntity: 'Decentralized.Host roadmap',
    secondaryEntities: ['production validation', 'PV-1', 'evidence records', 'release candidate'],
    contentType: 'roadmap',
    audience: 'engineering-leads',
    sources: ['evidence/INDEX.md', 'docs/BLUEPRINT.md §12'],
    relatedPages: ['/features/', '/open-source/'],
    schemaTypes: ['TechArticle', 'BreadcrumbList'],
    publishedAt: '2025-02-25T00:00:00Z',
    extractableAnswer:
      'Decentralized.Host M1–M8 is implemented and verified on one macOS machine (record REF-MAC-A03, PASS). It is not yet a production release: the next gate is PV-1, reproducing that result on independent Linux machines, then across a LAN, under real failures, and over WAN and NAT.',
  }),
  '/about/': page('/about/', {
    title: 'About — Decentralized.Host',
    description: 'Why Decentralized.Host exists, the standard it holds itself to, and how the Go implementation relates to the earlier Python prototype.',
    h1: 'About',
    intent: 'Project background',
    primaryEntity: 'Decentralized.Host',
    secondaryEntities: ['principles', 'truthfulness', 'history'],
    contentType: 'about',
    audience: 'developers',
    sources: ['docs/BLUEPRINT.md §1, §13'],
    relatedPages: ['/open-source/', '/roadmap/'],
    schemaTypes: ['Organization', 'BreadcrumbList'],
    publishedAt: '2025-02-26T00:00:00Z',
  }),
  '/open-source/': page('/open-source/', {
    title: 'Source Code and License — Decentralized.Host',
    description: 'Where the source lives, how to verify what you downloaded, the conformance suite for independent implementations, and the current license status.',
    h1: 'Source Code and License',
    intent: 'Repository and license',
    primaryEntity: 'Decentralized.Host source code',
    secondaryEntities: ['GitHub', 'license', 'conformance', 'source digest'],
    contentType: 'about',
    audience: 'developers',
    sources: [REPO_URL],
    relatedPages: ['/about/', '/docs/'],
    schemaTypes: ['TechArticle', 'BreadcrumbList'],
    publishedAt: '2025-02-28T00:00:00Z',
  }),
  '/faq/': page('/faq/', {
    title: 'FAQ — Decentralized.Host',
    description: 'Straight answers: is it production-ready, does it need Docker, what happens when the control plane goes down, is there a token, what is not implemented.',
    h1: 'Frequently Asked Questions',
    intent: 'FAQ',
    primaryEntity: 'Decentralized.Host FAQ',
    secondaryEntities: ['production readiness', 'runtimes', 'outages', 'license'],
    contentType: 'faq',
    audience: 'developers',
    sources: ['docs/BLUEPRINT.md'],
    relatedPages: ['/roadmap/', '/features/'],
    schemaTypes: ['FAQPage', 'BreadcrumbList'],
    publishedAt: '2026-09-01T00:00:00Z',
  }),
  '/pillars/': page('/pillars/', {
    title: 'Topic Directory — Decentralized.Host',
    description: 'Reference pages on decentralized infrastructure, self-hosting and Web3 topics. Each one says plainly whether Decentralized.Host has anything to do with it.',
    h1: 'Topic Directory',
    intent: 'Topic directory',
    primaryEntity: 'Decentralized.Host topic directory',
    secondaryEntities: ['decentralized infrastructure', 'self-hosting', 'DevOps', 'Web3'],
    contentType: 'cluster',
    audience: 'developers',
    sources: ['data/pillars.ts'],
    relatedPages: ['/', '/features/', '/docs/'],
    schemaTypes: ['CollectionPage', 'BreadcrumbList'],
    publishedAt: '2026-09-03T00:00:00Z',
    extractableAnswer:
      'The Decentralized.Host topic directory is a set of reference pages on decentralized infrastructure, self-hosting and Web3 topics. Each page states whether the topic connects to what the software actually does; most do not.',
  }),
};

// Every pillar in data/pillars.ts gets a generated entry, so sitemap.xml and
// llms.txt pick up all pillar routes automatically.
function pillarFrontmatter(): Record<string, PageFrontmatter> {
  const out: Record<string, PageFrontmatter> = {};
  for (const p of PILLARS) {
    const slugPath = `/${p.slug}/`;
    out[slugPath] = {
      id: `page-pillar-${p.slug}`,
      slug: slugPath,
      title: `${p.title} — Decentralized.Host Topic Directory`,
      description: p.oneLine,
      h1: p.title,
      intent: 'Topic reference',
      primaryEntity: p.title,
      secondaryEntities: [p.group],
      contentType: 'pillar',
      audience: 'developers',
      sources: ['data/pillars.ts'],
      relatedPages: ['/pillars/'],
      canonical: `https://decentralized.host/${p.slug}/`,
      schemaTypes: ['TechArticle', 'BreadcrumbList'],
      publishedAt: '2026-09-03T00:00:00Z',
      updatedAt: UPDATED,
      extractableAnswer: `${p.oneLine} ${p.productNote}`,
    };
  }
  return out;
}

// Real pages win over topic entries that share a slug (guides, pillars).
export const CONTENT_REGISTRY: Record<string, PageFrontmatter> = {
  ...pillarFrontmatter(),
  ...BASE_REGISTRY,
};
