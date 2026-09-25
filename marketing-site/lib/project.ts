// Facts about the implementation this site describes. Every page reads them
// from here, so a new release or validation result is a one-file change.
//
// The site describes the Go implementation (repository below). It does not
// describe the earlier Python prototype that shares this site's repository;
// see /open-source/ for how the two relate.

export const REPO_URL = 'https://github.com/CodesbyFebin/Decentralized-';
export const REPO_NAME = 'CodesbyFebin/Decentralized-';
export const PROTOTYPE_REPO_URL = 'https://github.com/CodesbyFebin/decentralized.hosting';

// The revision the latest validation record qualifies.
export const BASELINE = {
  tag: 'ref-mac-a03',
  commit: 'ef849e2',
  sourceDigest: 'b3:2a23e1dab10f7b043c228e5dd81702c8750085c615ad53c40a32c47d54926c7e',
  sourceDigestShort: 'b3:2a23e1da…',
  go: 'Go 1.26.4',
  protocol: 'dh/v1',
  releaseUrl: 'https://github.com/CodesbyFebin/Decentralized-/releases/tag/ref-mac-a03',
};

// There is no LICENSE file in the Go repository yet. Until one is added the
// code is public to read but not licensed for reuse -- the site must not call
// it open source or MIT.
export const LICENSE_STATUS = {
  declared: false,
  text: 'No license declared yet',
  detail:
    'The Go repository is public, but it has no LICENSE file yet. Until one is added, the default is all rights reserved: you can read the code and run it to evaluate it, but it is not licensed for redistribution or reuse.',
};

// The single most important caveat. Shown on the home page and wherever a
// page makes a capability claim.
export const EVIDENCE_SCOPE =
  'Every automated run so far is multi-process on one macOS machine over loopback. No test has crossed physical machines, a real WAN or NAT, or run on a Linux host. Linux validation (PV1-S1-A03) is pending.';

export const STATUS_DATE = '2026-09-25';

export function repoPath(path: string): string {
  return `${REPO_URL}/blob/${BASELINE.commit}/${path}`;
}

export function repoTree(path: string): string {
  return `${REPO_URL}/tree/${BASELINE.commit}/${path}`;
}

// Evidence records live on main (they were added after the validated commit).
export function repoMain(path: string): string {
  return `${REPO_URL}/blob/main/${path}`;
}
