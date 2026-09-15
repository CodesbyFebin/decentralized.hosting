import { notFound } from 'next/navigation';
import { PillarDetailView } from '../../views/PillarDetailView';
import { PILLARS, getPillar } from '../../data/pillars';
import { CONTENT_REGISTRY } from '../../data/registry';
import { frontmatterToMetadata } from '../../lib/metadata';

// All 69 pillar slugs, known fully at build time -- required under
// `output: 'export'` since there's no server left to render an unknown slug
// on demand. Anything not in PILLARS 404s below.
export function generateStaticParams() {
  return PILLARS.map((pillar) => ({ slug: pillar.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!getPillar(slug)) return {};
  return frontmatterToMetadata(CONTENT_REGISTRY[`/${slug}/`]);
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!getPillar(slug)) {
    notFound();
  }

  return <PillarDetailView slug={slug} />;
}
