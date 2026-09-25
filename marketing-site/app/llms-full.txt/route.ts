import { CONTENT_REGISTRY } from '../../data/registry';
import { DOCS_DATA } from '../../data/docs';
import { GUIDES_DATA } from '../../data/guides';
import { FEATURES_DATA } from '../../data/features';
import { ATTEMPTS } from '../../data/evidence';
import { CLI_COMMANDS } from '../../data/cli';
import { REPO_URL, BASELINE, EVIDENCE_SCOPE, LICENSE_STATUS } from '../../lib/project';

// /llms-full.txt, built once at build time from the same data every page renders.
function build(): string {
  const rule = '='.repeat(80);
  const pages = Object.values(CONTENT_REGISTRY)
    .filter((p) => p.contentType !== 'pillar' || !p.slug.includes('-tools'))
    .map((p) => `${rule}\nURL: ${p.canonical}\nH1: ${p.h1}\nSummary: ${p.description}${p.extractableAnswer ? `\nAnswer: ${p.extractableAnswer}` : ''}`)
    .join('\n\n');
  const features = FEATURES_DATA.map(
    (f) => `- [${f.claimStatus}] ${f.milestone} ${f.title}: ${f.summary} Evidence: ${f.evidence}.${f.limitation ? ` Limitation: ${f.limitation}` : ''}`,
  ).join('\n');
  const attempts = ATTEMPTS.map((a) => `- ${a.id} (${a.environment}, ${a.digest}): ${a.outcome}. ${a.note}`).join('\n');
  const docs = DOCS_DATA.map(
    (d) => `${rule}\nDOC: ${d.title} (https://decentralized.host/docs/#${d.id}, source ${d.source})\n\n${d.body}${d.commands ? `\n\n${d.commands.map((c) => `$ ${c}`).join('\n')}` : ''}`,
  ).join('\n\n');
  const guides = GUIDES_DATA.map(
    (g) => `${rule}\nGUIDE: ${g.title} (https://decentralized.host/guides/#${g.slug}, follows ${g.source})\n\n${g.overview}\n\n${g.steps
      .map((s, i) => `${i + 1}. ${s.title} -- ${s.description}${s.command ? `\n   $ ${s.command.replace(/\n/g, '\n     ')}` : ''}`)
      .join('\n')}`,
  ).join('\n\n');
  const cli = CLI_COMMANDS.map((c) => `- ${c.command}: ${c.summary}`).join('\n');

  return `# Decentralized.Host -- full reference
# Built from the site's data, which is transcribed from ${REPO_URL}
# (validated revision ${BASELINE.commit}, source ${BASELINE.sourceDigest}).

Scope of all evidence: ${EVIDENCE_SCOPE}
License: ${LICENSE_STATUS.detail}

## Capabilities
${features}

## Validation attempts
${attempts}

## Pages
${pages}

## Documentation
${docs}

## Guides
${guides}

## CLI
${cli}
`;
}

export const dynamic = 'force-static';

export function GET() {
  return new Response(build(), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
