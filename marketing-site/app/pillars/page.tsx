import { PillarsIndexView } from '../../views/PillarsIndexView';
import { CONTENT_REGISTRY } from '../../data/registry';
import { frontmatterToMetadata } from '../../lib/metadata';

export function generateMetadata() {
  return frontmatterToMetadata(CONTENT_REGISTRY['/pillars/']);
}

export default function Page() {
  return <PillarsIndexView />;
}
