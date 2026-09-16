// Real /llms.txt endpoint, following the actual llmstxt.org convention
// (Jeremy Howard / Answer.AI, Sept 2024): one H1, a blockquote summary,
// then ## sections of real markdown links. Served as static text under
// output: 'export' -- resolved once at build time since it touches no
// request-time-only API.
//
// Caveat (tell the user, not the crawler): as of 2026 no major AI provider
// has publicly confirmed consuming llms.txt for crawling, training, or
// retrieval. This costs nothing to serve correctly and might matter later,
// but it isn't a proven visibility lever -- don't oversell it.
const LLMS_TXT = `# Decentralized.Host

> Decentralized.Host is an open-source self-hosted deployment platform and distributed compute mesh for running containerized web applications across independently operated compute nodes. MIT licensed. Repository: https://github.com/CodesbyFebin/decentralized.hosting

## Docs

- [Homepage](https://decentralized.host/): Product overview and interactive deployment simulator
- [Features](https://decentralized.host/features/): Verified capability matrix with source-file citations
- [Architecture](https://decentralized.host/architecture/): Control plane, scheduler, node-agent, and Traefik edge subsystems
- [Security](https://decentralized.host/security/): Threat matrix, authentication model, RFC 9116 security.txt
- [Documentation](https://decentralized.host/docs/): CLI manual, quickstart, self-hosting runbook
- [Guides](https://decentralized.host/guides/): Step-by-step technical guides (Git push, multi-node mesh, rollbacks)
- [Deploy Recipes](https://decentralized.host/deploy/): Framework auto-detection (FastAPI, Next.js, Django, Express, Docker)
- [FAQ](https://decentralized.host/faq/): Direct answers to common scope questions

## Topic Directory

- [Pillar Directory](https://decentralized.host/pillars/): 69-page topic index across decentralized infrastructure, self-hosting, and Web3 -- each page states plainly whether it connects to the real product
- [Decentralized Hosting](https://decentralized.host/decentralized-hosting/): Category overview
- [Self-Hosted PaaS](https://decentralized.host/self-hosted-paas/): Category overview
- [DePIN Compute](https://decentralized.host/depin/): Distributed physical infrastructure and the Solana devnet credit system

## Optional

- [Alternatives](https://decentralized.host/alternatives/): Evidence-backed comparisons with Coolify, Dokploy, CapRover, Dokku, Heroku, Vercel, AWS
- [Roadmap](https://decentralized.host/roadmap/): Public engineering milestones
- [About](https://decentralized.host/about/): Project philosophy
- [Open Source](https://decentralized.host/open-source/): License and contribution guidelines
- [Full reference](https://decentralized.host/llms-full.txt): Every page's content, plus full docs and guides text, in one file
`;

export const dynamic = 'force-static';

export function GET() {
  return new Response(LLMS_TXT, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
