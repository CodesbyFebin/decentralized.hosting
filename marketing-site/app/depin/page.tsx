import { DepinView } from '../../views/DepinView';
import { CONTENT_REGISTRY } from '../../data/registry';
import { frontmatterToMetadata } from '../../lib/metadata';

export function generateMetadata() {
  return frontmatterToMetadata(CONTENT_REGISTRY['/depin/']);
}

export default function Page() {
  return <DepinView />;
}
