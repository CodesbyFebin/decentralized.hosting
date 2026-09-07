import { FeaturesView } from '../../views/FeaturesView';
import { CONTENT_REGISTRY } from '../../data/registry';
import { frontmatterToMetadata } from '../../lib/metadata';

export function generateMetadata() {
  return frontmatterToMetadata(CONTENT_REGISTRY['/features/']);
}

export default function Page() {
  return <FeaturesView />;
}
