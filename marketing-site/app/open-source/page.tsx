import { OpenSourceView } from '../../views/OpenSourceView';
import { CONTENT_REGISTRY } from '../../data/registry';
import { frontmatterToMetadata } from '../../lib/metadata';

export function generateMetadata() {
  return frontmatterToMetadata(CONTENT_REGISTRY['/open-source/']);
}

export default function Page() {
  return <OpenSourceView />;
}
