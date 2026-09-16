import { SelfHostedPaasPillarView } from '../../views/SelfHostedPaasPillarView';
import { CONTENT_REGISTRY } from '../../data/registry';
import { frontmatterToMetadata } from '../../lib/metadata';

export function generateMetadata() {
  return frontmatterToMetadata(CONTENT_REGISTRY['/self-hosted-paas/']);
}

export default function Page() {
  return <SelfHostedPaasPillarView />;
}
