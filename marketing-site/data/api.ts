// GENERATED from the HandleFunc registrations in pkg/control at ef849e2 -- do not edit by hand.
// Groups: operator (/api/v1, bearer capability), host (/v1, signed envelopes from enrolled hosts),
// federation (/fed/v1, between clusters under a signed agreement), peer (/peer/v1).

export const API_ROUTES: { method: string; path: string; group: 'operator' | 'host' | 'federation' | 'peer' }[] = [
  {
    "method": "POST",
    "path": "/api/v1/apply",
    "group": "operator"
  },
  {
    "method": "POST",
    "path": "/api/v1/apps/{name}/delete",
    "group": "operator"
  },
  {
    "method": "POST",
    "path": "/api/v1/apps/{name}/scale",
    "group": "operator"
  },
  {
    "method": "POST",
    "path": "/api/v1/artifacts",
    "group": "operator"
  },
  {
    "method": "POST",
    "path": "/api/v1/attest",
    "group": "operator"
  },
  {
    "method": "GET",
    "path": "/api/v1/audit",
    "group": "operator"
  },
  {
    "method": "GET",
    "path": "/api/v1/audit/verify",
    "group": "operator"
  },
  {
    "method": "POST",
    "path": "/api/v1/bootstrap",
    "group": "operator"
  },
  {
    "method": "POST",
    "path": "/api/v1/chaos/report",
    "group": "operator"
  },
  {
    "method": "GET",
    "path": "/api/v1/conformance",
    "group": "operator"
  },
  {
    "method": "POST",
    "path": "/api/v1/cp/add-voter",
    "group": "operator"
  },
  {
    "method": "POST",
    "path": "/api/v1/cp/backup",
    "group": "operator"
  },
  {
    "method": "GET",
    "path": "/api/v1/cp/raft",
    "group": "operator"
  },
  {
    "method": "POST",
    "path": "/api/v1/cp/remove-server",
    "group": "operator"
  },
  {
    "method": "POST",
    "path": "/api/v1/cp/restore",
    "group": "operator"
  },
  {
    "method": "POST",
    "path": "/api/v1/cp/snapshot",
    "group": "operator"
  },
  {
    "method": "POST",
    "path": "/api/v1/cp/transfer-leadership",
    "group": "operator"
  },
  {
    "method": "GET",
    "path": "/api/v1/export",
    "group": "operator"
  },
  {
    "method": "POST",
    "path": "/api/v1/federation/accept",
    "group": "operator"
  },
  {
    "method": "POST",
    "path": "/api/v1/federation/grant",
    "group": "operator"
  },
  {
    "method": "POST",
    "path": "/api/v1/federation/revoke",
    "group": "operator"
  },
  {
    "method": "POST",
    "path": "/api/v1/federation/withdraw",
    "group": "operator"
  },
  {
    "method": "POST",
    "path": "/api/v1/freeze",
    "group": "operator"
  },
  {
    "method": "GET",
    "path": "/api/v1/health",
    "group": "operator"
  },
  {
    "method": "POST",
    "path": "/api/v1/invites",
    "group": "operator"
  },
  {
    "method": "POST",
    "path": "/api/v1/join-cluster",
    "group": "operator"
  },
  {
    "method": "POST",
    "path": "/api/v1/lab/attenuate",
    "group": "operator"
  },
  {
    "method": "POST",
    "path": "/api/v1/lab/mint",
    "group": "operator"
  },
  {
    "method": "POST",
    "path": "/api/v1/lab/verify",
    "group": "operator"
  },
  {
    "method": "GET",
    "path": "/api/v1/member",
    "group": "operator"
  },
  {
    "method": "POST",
    "path": "/api/v1/mesh/ping",
    "group": "operator"
  },
  {
    "method": "POST",
    "path": "/api/v1/nodes/{id}/approve",
    "group": "operator"
  },
  {
    "method": "POST",
    "path": "/api/v1/nodes/{id}/drain",
    "group": "operator"
  },
  {
    "method": "POST",
    "path": "/api/v1/nodes/{id}/exec",
    "group": "operator"
  },
  {
    "method": "GET",
    "path": "/api/v1/nodes/{id}/ledger",
    "group": "operator"
  },
  {
    "method": "GET",
    "path": "/api/v1/nodes/{id}/logs",
    "group": "operator"
  },
  {
    "method": "POST",
    "path": "/api/v1/nodes/{id}/revoke",
    "group": "operator"
  },
  {
    "method": "POST",
    "path": "/api/v1/nodes/{id}/revoke-key",
    "group": "operator"
  },
  {
    "method": "POST",
    "path": "/api/v1/nodes/{id}/undrain",
    "group": "operator"
  },
  {
    "method": "GET",
    "path": "/api/v1/plans",
    "group": "operator"
  },
  {
    "method": "POST",
    "path": "/api/v1/publishers",
    "group": "operator"
  },
  {
    "method": "POST",
    "path": "/api/v1/root-rotate",
    "group": "operator"
  },
  {
    "method": "POST",
    "path": "/api/v1/roster",
    "group": "operator"
  },
  {
    "method": "GET",
    "path": "/api/v1/state",
    "group": "operator"
  },
  {
    "method": "GET",
    "path": "/api/v1/view",
    "group": "operator"
  },
  {
    "method": "GET",
    "path": "/api/v1/volumes/export",
    "group": "operator"
  },
  {
    "method": "POST",
    "path": "/fed/v1/object",
    "group": "federation"
  },
  {
    "method": "POST",
    "path": "/fed/v1/request",
    "group": "federation"
  },
  {
    "method": "GET",
    "path": "/peer/v1/ping",
    "group": "peer"
  },
  {
    "method": "POST",
    "path": "/v1/binding",
    "group": "host"
  },
  {
    "method": "POST",
    "path": "/v1/bundle",
    "group": "host"
  },
  {
    "method": "POST",
    "path": "/v1/cert",
    "group": "host"
  },
  {
    "method": "POST",
    "path": "/v1/chunk",
    "group": "host"
  },
  {
    "method": "POST",
    "path": "/v1/enroll",
    "group": "host"
  },
  {
    "method": "POST",
    "path": "/v1/evidence",
    "group": "host"
  },
  {
    "method": "POST",
    "path": "/v1/observe",
    "group": "host"
  },
  {
    "method": "POST",
    "path": "/v1/rotate",
    "group": "host"
  }
];
