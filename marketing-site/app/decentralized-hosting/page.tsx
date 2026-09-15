import { DecentralizedHostingPillarView } from '../../views/DecentralizedHostingPillarView';
import { CONTENT_REGISTRY } from '../../data/registry';
import { frontmatterToMetadata } from '../../lib/metadata';

export function generateMetadata() {
  return frontmatterToMetadata(CONTENT_REGISTRY['/decentralized-hosting/']);
}

export default function Page() {
  return <DecentralizedHostingPillarView />;
}
