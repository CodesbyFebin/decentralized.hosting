// GENERATED from a recorded terminal session -- do not edit by hand.
// Real output of the Go build, copied verbatim except for three redactions:
// the scratch directory is shown as ./devcluster, the console session
// capability is removed, and the machine's hostname is removed.
// Commands ran in the order listed.

export const SESSION_META = {
  "recordedAt": "2026-09-25T09:35:00Z",
  "os": "Darwin 24.6.0 x86_64",
  "cpu": "Intel(R) Core(TM) i5-8500B CPU @ 3.00GHz",
  "go": "go version go1.26.4 darwin/amd64",
  "commit": "ef849e2 (main 412c5a1, same source)",
  "sourceDigest": "b3:2a23e1dab10f7b043c228e5dd81702c8750085c615ad53c40a32c47d54926c7e"
};

export interface SessionStep { command: string; note: string; output: string; exit: number | null; elapsed: string | null }

export const SESSION: SessionStep[] = [
  {
    "command": "dh dev up --dir ./devcluster",
    "note": "Starts 3 control-plane members, 4 hosts (one of them the edge) as separate local processes, pushes the dh-beacon sample artifact and applies a 3-replica app.",
    "output": "cluster dev: root key EYpyLqc4JrBBnN9oKo9uR2PzyItlmh0W_thMZdRAI24 (dh1moxcikagjbglhwfnm3yhzxyi2i)\nroot CA ./devcluster/operator/dev/root-ca.pem\nKeep ./devcluster/operator/dev/root/identity.key private: it is the trust anchor every host pins.\n• starting 3 control-plane member(s)\nbootstrapped dh1cqtai3x2ugv27ajz6x6xvg43ob: cluster dev initialized\nmember dh1wy2x6dkhlmcdzay46pdsiu3rc4 added (roster v2, 2 members)\nmember dh1qn4s24gwcmp7ugv4c6ietg2u53 added (roster v3, 3 members)\n• starting 4 host(s) (1 edge)\n• pushing the dh-beacon artifact and applying the sample app\nattestation stored for b3:87f2505fb60558d69744209dc3540a9ac54c53d87a6e68c2966ebd01981ae34f\n  web: created (generation 1)\n\nCluster \"dev\" is running: 3 control-plane member(s), 4 host(s), 1 edge.\n  console:   http://127.0.0.1:17701/#token=<session capability — redacted>\n  operator:  export DH_HOME=./devcluster/operator\n  edge:      curl -H 'Host: web.dev.test' -H 'X-DH-No-Redirect: 1' http://127.0.0.1:18103/\n  logs:      ./devcluster/logs\n  stop:      dh dev down --dir ./devcluster",
    "exit": 0,
    "elapsed": "6.776"
  },
  {
    "command": "dh get apps",
    "note": "Desired, admitted and observed are separate columns: what you asked for, what hosts accepted under their own policy, and what they signed as running.",
    "output": "APP  GEN  IMAGE                                                                          RUNTIME  REPLICAS  DESIRED  ADMITTED  OBSERVED  DRIFT  STATE\nweb  1    dh-beacon@b3:87f2505fb60558d69744209dc3540a9ac54c53d87a6e68c2966ebd01981ae34f  process  3         3        3         3         0      active",
    "exit": 0,
    "elapsed": null
  },
  {
    "command": "dh get nodes",
    "note": "Each host has its own identity, failure domain and mesh address, and reports signed observations with sequence numbers.",
    "output": "NAME    ID                             STATUS  HEALTH  DOMAIN         MESH       ROLES  WORKLOADS  LAST OBSERVATION       MODE\nhost-b  dh13hn4aq4xuycgzoej4nabt3qpvr  ready   live    cell-b/host-b  10.77.0.3  -      1          FRESH seq 12 (0s ago)  normal\nhost-a  dh1h4qewobc5hcr4dhlvl3323xgrd  ready   live    cell-a/host-a  10.77.0.2  -      1          FRESH seq 12 (0s ago)  normal\nedge-1  dh1i7qwabwv7dumyvylgfqqoe3wl7  ready   live    cell-d/edge-1  10.77.0.4  edge   0          FRESH seq 12 (0s ago)  normal\nhost-c  dh1ucato7pd2zb3tjjznoasoqjdt2  ready   live    cell-c/host-c  10.77.0.1  -      1          FRESH seq 12 (0s ago)  normal",
    "exit": 0,
    "elapsed": null
  },
  {
    "command": "dh mesh peers",
    "note": "Real WireGuard handshakes and byte counters between the host processes. RTT appears only where it was measured.",
    "output": "HOST    PEER             ENDPOINT         HANDSHAKE  RX       TX      GOSSIP               RTT           BINDING\nhost-b  cp:dh1cqtai3x2u  127.0.0.1:17901  8s ago     9815156  284768  not-a-gossip-member  2125.74ms     true\nhost-b  host-a           127.0.0.1:18000  7s ago     23884    24164   alive                NOT MEASURED  true\nhost-b  edge-1           127.0.0.1:18003  7s ago     6692     6780    alive                NOT MEASURED  true\nhost-b  cp:dh1qn4s24gwc  127.0.0.1:17903  5s ago     284      936     not-a-gossip-member  NOT MEASURED  true\nhost-b  host-c           127.0.0.1:18002  7s ago     4236     22884   alive                NOT MEASURED  true\nhost-b  cp:dh1wy2x6dkhl  127.0.0.1:17902  10s ago    660      704     not-a-gossip-member  113.91ms      true\nhost-a  host-b           127.0.0.1:18001  7s ago     24164    24032   alive                NOT MEASURED  true\nhost-a  cp:dh1cqtai3x2u  127.0.0.1:17901  10s ago    9814692  244716  not-a-gossip-member  2.10ms        true\nhost-a  edge-1           127.0.0.1:18003  7s ago     7172     7276    alive                NOT MEASURED  true\nhost-a  cp:dh1qn4s24gwc  127.0.0.1:17903  10s ago    660      704     not-a-gossip-member  135.65ms      true\nhost-a  host-c           127.0.0.1:18002  7s ago     2684     2708    alive                NOT MEASURED  true\nhost-a  cp:dh1wy2x6dkhl  127.0.0.1:17902  10s ago    660      704     not-a-gossip-member  98.99ms       true\nedge-1  host-b           127.0.0.1:18001  7s ago     6956     7076    alive                NOT MEASURED  true\nedge-1  cp:dh1cqtai3x2u  127.0.0.1:17901  5s ago     380      936     not-a-gossip-member  NOT MEASURED  true\nedge-1  host-a           127.0.0.1:18000  7s ago     7276     7172    alive                NOT MEASURED  true\nedge-1  cp:dh1qn4s24gwc  127.0.0.1:17903  5s ago     380      936     not-a-gossip-member  NOT MEASURED  true\nedge-1  host-c           127.0.0.1:18002  7s ago     7100     7444    alive                NOT MEASURED  true\nedge-1  cp:dh1wy2x6dkhl  127.0.0.1:17902  10s ago    660      704     not-a-gossip-member  114.12ms      true\nhost-c  host-b           127.0.0.1:18001  7s ago     22612    4192    alive                NOT MEASURED  true\nhost-c  cp:dh1cqtai3x2u  127.0.0.1:17901  10s ago    660      556     not-a-gossip-member  2.85ms        true\nhost-c  host-a           127.0.0.1:18000  7s ago     2708     2832    alive                NOT MEASURED  true\nhost-c  edge-1           127.0.0.1:18003  7s ago     6852     6492    alive                NOT MEASURED  true\nhost-c  cp:dh1qn4s24gwc  127.0.0.1:17903  10s ago    660      704     not-a-gossip-member  156.26ms      true\nhost-c  cp:dh1wy2x6dkhl  127.0.0.1:17902  10s ago    660      704     not-a-gossip-member  134.37ms      true",
    "exit": 0,
    "elapsed": null
  },
  {
    "command": "dh audit verify",
    "note": "Fetches the control-plane ledger and verifies the hash chain and signed checkpoints on this machine.",
    "output": "audit verified locally: 48 entries, head b68dc824b42b, 2 signed checkpoint(s) by roster members",
    "exit": 0,
    "elapsed": null
  },
  {
    "command": "dh cp status",
    "note": "Raft membership: one leader, two followers, all voters.",
    "output": "MEMBER                         SUFFRAGE  RAFT             API              STATE     INDEX  LEADER\ndh1cqtai3x2ugv27ajz6x6xvg43ob  Voter     127.0.0.1:17801  127.0.0.1:17701  leader    69     *\ndh1wy2x6dkhlmcdzay46pdsiu3rc4  Voter     127.0.0.1:17802  127.0.0.1:17702  follower  69     \ndh1qn4s24gwcmp7ugv4c6ietg2u53  Voter     127.0.0.1:17803  127.0.0.1:17703  follower  69     \nroster v3, 3 member(s)",
    "exit": 0,
    "elapsed": null
  },
  {
    "command": "curl -H 'Host: web.dev.test' -H 'X-DH-No-Redirect: 1' http://127.0.0.1:18103/",
    "note": "A request through the edge host reaches one of the replicas over the mesh.",
    "output": "{\"app\":\"web\",\"assignment\":\"web/r0\",\"generation\":\"1\",\"hostname\":\"<hostname — redacted>\",\"message\":\"hello from a sovereign host\",\"node\":\"dh1ucato7pd2zb3tjjznoasoqjdt2\",\"ok\":true,\"pid\":7100,\"replica\":\"0\",\"uptimeMs\":6805,\"volume\":true}",
    "exit": 0,
    "elapsed": null
  },
  {
    "command": "dh rollout status app web --timeout 2m",
    "note": "Waits until every replica runs the current generation.",
    "output": "generation 1: 3/3 replicas observed running (admitted 3)\nrollout of web generation 1 complete",
    "exit": 0,
    "elapsed": null
  },
  {
    "command": "dh describe app web",
    "note": "Every replica with its desired, admitted and observed state, and the admission checks the host itself evaluated.",
    "output": "App web  generation 1  bf7ae06f6642  image dh-beacon@b3:87f2505fb60558d69744209dc3540a9ac54c53d87a6e68c2966ebd01981ae34f (process)\nDESIRED 3   ADMITTED 3   OBSERVED 3   DRIFT 0\n\nReplica 0 on host-c (dh1ucato7pd2)\n  Desired:   RUNNING generation 1\n  Admitted:  ADMITTED generation 1  [ADMITTED] already admitted; digest and policy unchanged\n  Observed:  RUNNING generation 1  pid 7100 container - mesh port 20000 restarts 0\n  Health:    ok=true HTTP 200 in 186µs (consecutive failures 0)\n  Status:    RUNNING   evidence FRESH ee65134b7d4a (1s ago)\n    ✓ ledger               host ledger verifies\n    ✓ plane                roster and bundle signer chain to the pinned root; state index not rolled back\n    ✓ assignment-signature signed by roster member dh1cqtai3x2u\n    ✓ audience             assignment is for dh1ucato7pd2zb3tjjznoasoqjdt2\n    ✓ generation           assignment generation 1, admitted 1\n    ✓ clock                bundle issued -2ms relative to host clock (limit 30000ms)\n    ✓ capability           chain of 2 block(s) anchored in the pinned root\n    ✓ revocation           host approval is current\n    ✓ frozen               control plane is not frozen\n    ✓ fresh                bundle within 10000ms fresh window\n    ✓ unchanged            same generation already admitted and running\n\nReplica 1 on host-a (dh1h4qewobc5)\n  Desired:   RUNNING generation 1\n  Admitted:  ADMITTED generation 1  [ADMITTED] already admitted; digest and policy unchanged\n  Observed:  RUNNING generation 1  pid 7101 container - mesh port 20000 restarts 0\n  Health:    ok=true HTTP 200 in 251µs (consecutive failures 0)\n  Status:    RUNNING   evidence FRESH afc772f5f71a (0s ago)\n    ✓ ledger               host ledger verifies\n    ✓ plane                roster and bundle signer chain to the pinned root; state index not rolled back\n    ✓ assignment-signature signed by roster member dh1cqtai3x2u\n    ✓ audience             assignment is for dh1h4qewobc5hcr4dhlvl3323xgrd\n    ✓ generation           assignment generation 1, admitted 1\n    ✓ clock                bundle issued -4ms relative to host clock (limit 30000ms)\n    ✓ capability           chain of 2 block(s) anchored in the pinned root\n    ✓ revocation           host approval is current\n    ✓ frozen               control plane is not frozen\n    ✓ fresh                bundle within 10000ms fresh window\n    ✓ unchanged            same generation already admitted and running\n\nReplica 2 on host-b (dh13hn4aq4xu)\n  Desired:   RUNNING generation 1\n  Admitted:  ADMITTED generation 1  [ADMITTED] already admitted; digest and policy unchanged\n  Observed:  RUNNING generation 1  pid 7102 container - mesh port 20000 restarts 0\n  Health:    ok=true HTTP 200 in 177µs (consecutive failures 0)\n  Status:    RUNNING   evidence FRESH 23b04a3bb285 (0s ago)\n    ✓ ledger               host ledger verifies\n    ✓ plane                roster and bundle signer chain to the pinned root; state index not rolled back\n    ✓ assignment-signature signed by roster member dh1cqtai3x2u\n    ✓ audience             assignment is for dh13hn4aq4xuycgzoej4nabt3qpvr\n    ✓ generation           assignment generation 1, admitted 1\n    ✓ clock                bundle issued -4ms relative to host clock (limit 30000ms)\n    ✓ capability           chain of 2 block(s) anchored in the pinned root\n    ✓ revocation           host approval is current\n    ✓ frozen               control plane is not frozen\n    ✓ fresh                bundle within 10000ms fresh window\n    ✓ unchanged            same generation already admitted and running",
    "exit": 0,
    "elapsed": null
  },
  {
    "command": "dh dev down --dir ./devcluster",
    "note": "Stops every process and workload of the cluster.",
    "output": "stopped 7 process(es) and 3 workload(s) of ./devcluster",
    "exit": 0,
    "elapsed": null
  }
];
