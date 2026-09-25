// The same four labels the production blueprint uses (docs/BLUEPRINT.md in
// the Go repository). Nothing on the site is filed higher than its evidence.
//   VERIFIED         implemented and exercised by an automated test or chaos
//                    scenario with real processes, sockets and failures
//   LIMITED          works, with a stated limitation or narrower evidence
//   NOT_IMPLEMENTED  absent
//   NOT_RUN          the tooling exists but the run has not happened
export type ClaimStatus = 'VERIFIED' | 'LIMITED' | 'NOT_IMPLEMENTED' | 'NOT_RUN';

export type ContentType =
  | 'homepage'
  | 'pillar'
  | 'cluster'
  | 'feature'
  | 'architecture'
  | 'security'
  | 'documentation'
  | 'guide'
  | 'comparison'
  | 'deploy-recipe'
  | 'depin'
  | 'roadmap'
  | 'about'
  | 'faq';

export type AudienceType = 'developers' | 'devops' | 'system-architects' | 'node-operators' | 'engineering-leads';

export interface PageFrontmatter {
  id: string;
  slug: string;
  title: string;
  description: string;
  h1: string;
  intent: string;
  primaryEntity: string;
  secondaryEntities: string[];
  contentType: ContentType;
  audience: AudienceType;
  sources: string[];
  relatedPages: string[];
  canonical: string;
  schemaTypes: string[];
  publishedAt: string;
  updatedAt: string;
  extractableAnswer?: string;
}

export interface FeatureItem {
  id: string;
  milestone: string; // M1..M8, or '—' for cross-cutting
  title: string;
  category: 'runtime' | 'storage' | 'trust' | 'mesh' | 'edge' | 'control-plane' | 'resilience' | 'federation' | 'protocol' | 'operations';
  claimStatus: ClaimStatus;
  summary: string;
  evidence: string; // test file, chaos scenario or command that backs the claim
  limitation?: string;
  cliCommand?: string;
}

export interface CompetitorComparison {
  id: string;
  name: string;
  slug: string;
  officialUrl: string;
  license: string;
  deploymentModel: string;
  runtime: string;
  multiServerSupport: string;
  gitDeployment: string;
  cliTool: string;
  dashboard: string;
  dockerSupport: string;
  composeSupport: string;
  automaticTls: string;
  databaseTemplates: string;
  rollbackSupport: string;
  observability: string;
  decentralizedOrMesh: string;
  lastVerifiedAt: string;
  evidenceSource: string;
  summaryComparison: string;
}

export interface GuideStep {
  title: string;
  description: string;
  command?: string;
  output?: string; // only real, recorded output -- never invented
}

export interface GuideItem {
  id: string;
  title: string;
  slug: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  prerequisites: string[];
  overview: string;
  source: string; // the runbook or doc in the Go repository this guide follows
  steps: GuideStep[];
  notes: string[];
}

export interface DocSection {
  id: string;
  title: string;
  body: string; // paragraphs separated by \n\n
  commands?: string[];
  source: string;
}
