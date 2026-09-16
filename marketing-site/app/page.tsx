import { HomeView } from '../views/HomeView';
import { CONTENT_REGISTRY } from '../data/registry';
import { frontmatterToMetadata } from '../lib/metadata';

export function generateMetadata() {
  return frontmatterToMetadata(CONTENT_REGISTRY['/']);
}

export default function Page() {
  return <HomeView />;
}
