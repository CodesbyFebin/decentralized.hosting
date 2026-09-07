import { FAQView } from '../../views/FAQView';
import { CONTENT_REGISTRY } from '../../data/registry';
import { frontmatterToMetadata } from '../../lib/metadata';

export function generateMetadata() {
  return frontmatterToMetadata(CONTENT_REGISTRY['/faq/']);
}

export default function Page() {
  return <FAQView />;
}
