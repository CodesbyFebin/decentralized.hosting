import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

// Every crawler is allowed. AI crawlers are listed explicitly so that stance
// is visible in robots.txt rather than only implied by the wildcard rule.
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
