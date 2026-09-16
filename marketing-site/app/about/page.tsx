import { AboutView } from '../../views/AboutView';
import { CONTENT_REGISTRY } from '../../data/registry';
import { frontmatterToMetadata } from '../../lib/metadata';

export function generateMetadata() {
  return frontmatterToMetadata(CONTENT_REGISTRY['/about/']);
}

export default function Page() {
  return <AboutView />;
}
