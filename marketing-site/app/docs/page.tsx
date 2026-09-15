import { DocsView } from '../../views/DocsView';
import { CONTENT_REGISTRY } from '../../data/registry';
import { frontmatterToMetadata } from '../../lib/metadata';

export function generateMetadata() {
  return frontmatterToMetadata(CONTENT_REGISTRY['/docs/']);
}

export default function Page() {
  return <DocsView />;
}
