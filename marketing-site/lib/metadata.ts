import type { Metadata } from 'next';
import { PageFrontmatter } from '../types';

// Every page's generateMetadata() calls this with its own CONTENT_REGISTRY
// entry -- the single source of truth that used to only reach the DOM via a
// client-side useEffect in App.tsx (invisible to non-JS crawlers). Returning
// it from generateMetadata() instead puts title/description/canonical/OG/
// Twitter tags into the real server-rendered <head>.
export function frontmatterToMetadata(page: PageFrontmatter): Metadata {
  return {
    title: page.title,
    description: page.description,
    alternates: {
      canonical: page.canonical,
    },
    openGraph: {
      title: page.title,
      description: page.description,
      url: page.canonical,
      siteName: 'Decentralized.Host',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: page.title,
      description: page.description,
    },
  };
}
