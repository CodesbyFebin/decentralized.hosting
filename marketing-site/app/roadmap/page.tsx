import { RoadmapView } from '../../views/RoadmapView';
import { CONTENT_REGISTRY } from '../../data/registry';
import { frontmatterToMetadata } from '../../lib/metadata';

export function generateMetadata() {
  return frontmatterToMetadata(CONTENT_REGISTRY['/roadmap/']);
}

export default function Page() {
  return <RoadmapView />;
}
