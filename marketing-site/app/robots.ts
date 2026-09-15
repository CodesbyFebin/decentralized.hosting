import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

// Real crawlers Allow: / already covers via the wildcard rule below -- these
// are listed explicitly (not to change access, which is already open) so the
// project's own "LLM-READY" stance is a verifiable fact in robots.txt, not
// just marketing copy. Deliberately allows training crawlers too (GPTBot,
// ClaudeBot), not just the search/answer variants, since an open-source
// project trying to get adopted has no reason to opt out of model training.
const AI_CRAWLER_USER_AGENTS = [
  'GPTBot',
  'ChatGPT-User',
  'OAI-SearchBot',
  'ClaudeBot',
  'Claude-User',
  'Claude-SearchBot',
  'PerplexityBot',
  'Perplexity-User',
  'Google-Extended',
  'Applebot-Extended',
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/' },
      { userAgent: AI_CRAWLER_USER_AGENTS, allow: '/' },
    ],
    sitemap: 'https://decentralized.host/sitemap.xml',
  };
}
