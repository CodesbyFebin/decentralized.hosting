import { AlternativesView } from '../../views/AlternativesView';
import { CONTENT_REGISTRY } from '../../data/registry';
import { frontmatterToMetadata } from '../../lib/metadata';

export function generateMetadata() {
  return frontmatterToMetadata(CONTENT_REGISTRY['/alternatives/']);
}

export default function Page() {
  return <AlternativesView />;
}
