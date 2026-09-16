import { CONTENT_REGISTRY } from '../../data/registry';
import { DOCS_DATA } from '../../data/docs';
import { GUIDES_DATA } from '../../data/guides';

// Real /llms-full.txt endpoint, resolved once at build time (output: 'export')
// from the same registry/docs/guides data every page renders from -- ported
// from the old scripts/generate-machine-files.ts pre-build step, which this
// Route Handler now replaces.
function buildLlmsFullTxt(): string {
  const pages = Object.values(CONTENT_REGISTRY)
    .map(
      (page) => `
================================================================================
URL: ${page.canonical}
H1: ${page.h1}
Type: ${page.contentType}
Summary: ${page.description}
Claim status: ${page.claimStatus}
AEO answer: ${page.extractableAnswer || 'N/A'}
`
    )
    .join('\n');

  const docs = DOCS_DATA.map(
    (d) => `
================================================================================
DOC: ${d.title}
URL: https://decentralized.host/docs/#${d.slug}
Category: ${d.category}

${d.content}
`
  ).join('\n');

  const guides = GUIDES_DATA.map(
    (g) => `
================================================================================
GUIDE: ${g.title}
URL: https://decentralized.host/guides/#${g.slug}
Difficulty: ${g.difficulty} (${g.timeMinutes} min)
Claim status: ${g.claimStatus}

${g.architectureOverview}

Steps:
${g.steps.map((s, i) => `${i + 1}. ${s.title} -- ${s.description}${s.command ? `\n   $ ${s.command}` : ''}`).join('\n')}
`
  ).join('\n');

  return `# decentralized.host -- Complete Technical Reference for LLM Retrieval
# Generated at build time from the real site data (data/registry.ts, data/docs.ts, data/guides.ts)

## Pages
${pages}

## Documentation
${docs}

## Guides
${guides}
`;
}

export const dynamic = 'force-static';

export function GET() {
  return new Response(buildLlmsFullTxt(), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
