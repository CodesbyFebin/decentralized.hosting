import type { MetadataRoute } from 'next';
import { CONTENT_REGISTRY } from '../data/registry';

// Replaces scripts/generate-sitemap.ts -- same source of truth
// (CONTENT_REGISTRY), resolved via Next's typed sitemap convention instead of
// a separate pre-build script. Works under output: 'export' since it touches
// no request-time API.
const SITEMAP_META: Record<string, { changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency']; priority: number }> = {
  '/': { changeFrequency: 'daily', priority: 1.0 },
  '/features/': { changeFrequency: 'weekly', priority: 0.9 },
  '/architecture/': { changeFrequency: 'weekly', priority: 0.9 },
  '/security/': { changeFrequency: 'weekly', priority: 0.8 },
  '/docs/': { changeFrequency: 'weekly', priority: 0.9 },
  '/guides/': { changeFrequency: 'weekly', priority: 0.8 },
  '/alternatives/': { changeFrequency: 'weekly', priority: 0.8 },
  '/deploy/': { changeFrequency: 'weekly', priority: 0.8 },
  '/decentralized-hosting/': { changeFrequency: 'weekly', priority: 0.9 },
  '/self-hosted-paas/': { changeFrequency: 'weekly', priority: 0.9 },
  '/depin/': { changeFrequency: 'weekly', priority: 0.8 },
  '/roadmap/': { changeFrequency: 'weekly', priority: 0.7 },
  '/about/': { changeFrequency: 'monthly', priority: 0.7 },
  '/open-source/': { changeFrequency: 'monthly', priority: 0.7 },
  '/faq/': { changeFrequency: 'monthly', priority: 0.7 },
};

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  return Object.values(CONTENT_REGISTRY).map((page) => {
    const meta = SITEMAP_META[page.slug] ?? { changeFrequency: 'weekly' as const, priority: 0.6 };
    return {
      url: page.canonical,
      lastModified: page.updatedAt.slice(0, 10),
      changeFrequency: meta.changeFrequency,
      priority: meta.priority,
    };
  });
}
