import { REPO_URL, BASELINE, EVIDENCE_SCOPE, LICENSE_STATUS } from '../../lib/project';

// /llms.txt in the llmstxt.org shape: one H1, a blockquote summary, then
// sections of links. Resolved once at build time.
const LLMS_TXT = `# Decentralized.Host

> Self-hosted infrastructure software written in Go, in which a replicated (Raft) control plane proposes work as signed intent and each host admits it only under its own local policy, keeps its own hash-chained ledger, and reports signed observations. Desired, admitted and observed state are kept separate. Milestones M1–M8 are implemented and verified on a single macOS machine (validation record REF-MAC-A03, source ${BASELINE.sourceDigestShort}); ${EVIDENCE_SCOPE} It is not production-ready. There is no token, marketplace or git-push build pipeline. License: ${LICENSE_STATUS.text.toLowerCase()}. Repository: ${REPO_URL}

## Docs

- [Home](https://decentralized.host/): What it is, a recorded session of the real binaries, console screenshots
- [Capabilities](https://decentralized.host/features/): Every capability labelled VERIFIED, LIMITED, NOT IMPLEMENTED or NOT RUN, with its evidence
- [Architecture](https://decentralized.host/architecture/): dh-control, dh-noded, dh; Raft, admission, WireGuard mesh, storage, edge
- [Security](https://decentralized.host/security/): Trust anchors, host admission checks, failure and attack cases, untested areas
- [Documentation](https://decentralized.host/docs/): Build, local cluster, TLS install, manifests, operations, CLI reference
- [Guides](https://decentralized.host/guides/): Local cluster, TLS install, deploying a service, chaos, verifying evidence, Linux validation
- [Run it yourself](https://decentralized.host/deploy/): Build and start a real local cluster
- [Status and roadmap](https://decentralized.host/roadmap/): Every validation attempt, PV-1 stages, P0 and P1 work
- [FAQ](https://decentralized.host/faq/): Production readiness, tokens, outages, runtimes, license

## Optional

- [What decentralized means here](https://decentralized.host/decentralized-hosting/)
- [Is it a self-hosted PaaS?](https://decentralized.host/self-hosted-paas/)
- [Becoming a host](https://decentralized.host/depin/)
- [Alternatives](https://decentralized.host/alternatives/)
- [Source and license](https://decentralized.host/open-source/)
- [About](https://decentralized.host/about/)
- [Topic directory](https://decentralized.host/pillars/): General reference pages; each says whether it relates to the product (most do not)
- [Full reference](https://decentralized.host/llms-full.txt): All of the above as plain text
`;

export const dynamic = 'force-static';

export function GET() {
  return new Response(LLMS_TXT, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
