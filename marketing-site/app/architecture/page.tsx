import { ArchitectureView } from '../../views/ArchitectureView';
import { CONTENT_REGISTRY } from '../../data/registry';
import { frontmatterToMetadata } from '../../lib/metadata';

export function generateMetadata() {
  return frontmatterToMetadata(CONTENT_REGISTRY['/architecture/']);
}

export default function Page() {
  return <ArchitectureView />;
}
