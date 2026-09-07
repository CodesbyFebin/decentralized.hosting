import { GuidesView } from '../../views/GuidesView';
import { CONTENT_REGISTRY } from '../../data/registry';
import { frontmatterToMetadata } from '../../lib/metadata';

export function generateMetadata() {
  return frontmatterToMetadata(CONTENT_REGISTRY['/guides/']);
}

export default function Page() {
  return <GuidesView />;
}
