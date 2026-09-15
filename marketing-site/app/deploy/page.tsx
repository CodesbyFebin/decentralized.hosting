import { DeployView } from '../../views/DeployView';
import { CONTENT_REGISTRY } from '../../data/registry';
import { frontmatterToMetadata } from '../../lib/metadata';

export function generateMetadata() {
  return frontmatterToMetadata(CONTENT_REGISTRY['/deploy/']);
}

export default function Page() {
  return <DeployView />;
}
