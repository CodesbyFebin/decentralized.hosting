import { API_ROUTES } from '../../data/api';
import { REPO_URL, BASELINE } from '../../lib/project';

// /openapi.json: the control plane's real routes, extracted from the Go
// source. Paths and methods only -- request and response schemas are not
// described here; the handlers in pkg/control are the reference.
const GROUP_NOTE: Record<string, string> = {
  operator: 'Operator API. Bearer capability (dhcap1.…) with api.read / api.write / api.admin caveats.',
  host: 'Host API. Called by enrolled hosts with signed envelopes; not for operators.',
  federation: 'Federation API between clusters under a root-signed agreement.',
  peer: 'Peer API on mesh addresses.',
};

function build() {
  const paths: Record<string, Record<string, unknown>> = {};
  for (const r of API_ROUTES) {
    paths[r.path] ??= {};
    paths[r.path][r.method.toLowerCase()] = {
      tags: [r.group],
      summary: `${r.method} ${r.path}`,
      description: GROUP_NOTE[r.group],
      responses: { default: { description: 'See the handler in pkg/control.' } },
    };
  }
  return {
    openapi: '3.1.0',
    info: {
      title: 'Decentralized.Host control plane (dh-control)',
      version: BASELINE.commit,
      description: `Routes registered by dh-control at ${BASELINE.commit}, extracted from the source (${REPO_URL}/tree/${BASELINE.commit}/pkg/control). There is no public instance: every cluster runs its own control plane, served over TLS on the member API address (default port 7700). Schemas are not documented here.`,
    },
    servers: [{ url: 'https://{member}:7700', variables: { member: { default: 'cp1.example.net' } } }],
    tags: Object.entries(GROUP_NOTE).map(([name, description]) => ({ name, description })),
    paths,
  };
}

export const dynamic = 'force-static';

export function GET() {
  return new Response(JSON.stringify(build(), null, 2), { headers: { 'Content-Type': 'application/json' } });
}
