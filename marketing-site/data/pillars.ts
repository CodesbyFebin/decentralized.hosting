// The 69-page topic directory: general reference content on decentralized
// infrastructure, hosting and Web3 topics. Most topics have nothing to do
// with what Decentralized.Host does, and each page says so: relatesToProduct
// and productNote state the honest connection (or its absence) for the Go
// implementation.

export type PillarGroup = 'Decentralized Infrastructure' | 'Decentralized Hosting' | 'Web3 & Blockchain' | 'Platform';

export interface PillarSection {
  heading: string;
  body: string; // one or more paragraphs, \n\n separated
}

export interface Pillar {
  slug: string; // no leading/trailing slash
  title: string;
  group: PillarGroup;
  oneLine: string;
  written: boolean;
  /** Does Decentralized.Host's real, shipped product actually touch this topic? */
  relatesToProduct: boolean;
  /** If relatesToProduct, the specific honest connection. If not, an honest "this doesn't connect" note. */
  productNote: string;
  sections?: PillarSection[];
  externalHref?: string; // for Platform-group entries that point elsewhere (e.g. GitHub, existing site pages)
}

export const PILLARS: Pillar[] = [
  // ---------- Decentralized Infrastructure ----------
  {
    slug: 'decentralized-storage-tools', title: 'Decentralized Storage Tools', group: 'Decentralized Infrastructure',
    oneLine: 'Content-addressed and peer-distributed storage systems that replace a single provider\'s disks.',
    written: true, relatesToProduct: true,
    productNote: "Related, but not the same thing. Decentralized.Host volumes use content addressing (BLAKE3, FastCDC chunks, Merkle roots) and replicate across hosts with signed replica evidence -- but inside one cluster you operate, with no public network, pinning market or permanence guarantee. Erasure coding is not implemented.",
    sections: [
      { heading: 'What decentralized storage actually means', body: 'Traditional cloud storage (S3, a VPS\'s disk) puts your data on one provider\'s infrastructure, addressed by a path you choose ("my-bucket/file.jpg"). Decentralized storage systems instead address data by its content -- a cryptographic hash of the bytes themselves -- and spread copies across a network of independent peers, so no single operator can unilaterally delete, censor, or lose the only copy.\n\nThe best-known example is IPFS (InterPlanetary File System): you add a file, get back a CID (content identifier) derived from its hash, and anyone who has that CID can fetch the file from any peer that\'s pinned it -- not from a fixed URL you control. Filecoin and Arweave build economic incentive layers on top of similar ideas: Filecoin pays storage providers to keep your data pinned over time; Arweave charges once for storage it claims to keep permanently, funded by an up-front endowment.' },
      { heading: 'The real tradeoffs', body: 'Content addressing solves integrity (you can verify you got the exact bytes you asked for) and censorship-resistance (no single node can quietly swap or remove the file if others still pin it), but it doesn\'t solve availability by itself -- a file only stays retrievable as long as at least one peer keeps pinning it, which is why Filecoin\'s and Arweave\'s economic layers exist. Mutable data (a file that changes over time, like a database) is also awkward: IPFS itself is immutable per-CID, so mutability needs an additional layer (IPNS, or just re-pinning under a new CID and updating a pointer somewhere).' }
    ]
  },
  {
    slug: 'decentralized-identity-tools', title: 'Decentralized Identity Tools', group: 'Decentralized Infrastructure',
    oneLine: 'Self-sovereign identity and credentials that don\'t depend on a single issuing authority.',
    written: true, relatesToProduct: true,
    productNote: "Partial overlap. Every host, control-plane member and operator session in Decentralized.Host has an Ed25519 identity (dh1… ids) chained to a cluster root key. It is infrastructure identity, not personal identity: there are no user accounts, and did:dh owner identities are planned, not built.",
    sections: [
      { heading: 'What this covers', body: 'Decentralized identity (DID) systems let a person or organization hold and control their own identifiers and credentials -- a public/private keypair, plus signed claims about them ("this university issued this degree to this key") -- without a central authority like a government database or a single company\'s login system being the sole source of truth. W3C\'s DID and Verifiable Credentials specs are the standardized core most implementations build on; Ethereum\'s ENS (Ethereum Name Service) is a narrower, widely-used example that maps human-readable names to addresses and other records on-chain.' },
      { heading: 'Why it\'s hard in practice', body: 'The technical part (public-key cryptography, signed claims) is well-understood. The hard part is social and practical: who verifies that a credential issuer is legitimate, what happens when you lose your private key (there\'s no "forgot password" flow for a self-custodied identity), and getting enough real-world issuers (universities, governments, employers) to actually issue verifiable credentials instead of PDFs. Most decentralized identity today is used within crypto-native contexts (wallet-based logins, ENS names as profile identifiers) rather than as a replacement for government ID or enterprise SSO.' }
    ]
  },
  {
    slug: 'decentralized-compute-tools', title: 'Decentralized Compute Tools', group: 'Decentralized Infrastructure',
    oneLine: 'Running workloads across independently operated machines instead of one cloud provider\'s datacenters.',
    written: true, relatesToProduct: true,
    productNote: "This is the closest topic. Decentralized.Host runs workloads on hosts that each decide, under their own policy, whether to run what a replicated control plane proposes. It is not an open marketplace: hosts join a cluster by operator invite, and independent clusters cooperate only through signed federation agreements.",
    sections: [
      { heading: 'The core idea', body: 'Decentralized compute networks let anyone with spare hardware -- a home server, an idle VPS, a rack in a colo -- register that capacity with a scheduler, and let workloads (containers, VMs, batch jobs) run on whichever registered machine has room, instead of all running on one company\'s owned datacenters. This is sometimes called DePIN (Decentralized Physical Infrastructure Network) when there\'s a token-incentive layer paying operators for verified uptime or work done.' }
    ]
  },
  {
    slug: 'decentralized-dns-tools', title: 'Decentralized DNS Tools', group: 'Decentralized Infrastructure',
    oneLine: 'Name resolution systems (like ENS or Handshake) not controlled by ICANN-accredited registrars.',
    written: true, relatesToProduct: false,
    productNote: "No connection. Decentralized.Host's edge routes by ordinary Host headers and can get certificates via ACME; it does not provide or use blockchain naming.",
    sections: [
      { heading: 'How this differs from ordinary DNS', body: 'Regular DNS is a hierarchy of authorities: ICANN accredits registrars, registrars sell you a name, and your nameservers (often the registrar\'s, or a third party like Cloudflare) answer queries for it -- ultimate control sits with whoever holds the registrar account and, one level up, whoever runs the relevant top-level domain\'s registry. Decentralized alternatives remove that hierarchy: ENS (Ethereum Name Service) maps names like "alice.eth" to addresses and records via an Ethereum smart contract, so ownership is whatever address holds the corresponding NFT-like token -- no registrar can suspend it. Handshake goes further and decentralizes the root zone itself (the layer above .com/.eth/etc.), auctioning top-level names on its own blockchain instead of ICANN allocating them.' },
      { heading: 'The practical tradeoff', body: 'Ordinary DNS resolvers (browsers, OSes, ISPs) understand ENS and Handshake names only through a bridge -- either a browser extension, a gateway service that translates alice.eth into a normal HTTPS URL, or ENS names being made resolvable via a .limo/.eth.link gateway. That bridge is itself a centralization point in practice, even though the underlying name registry isn\'t.' }
    ]
  },
  {
    slug: 'decentralized-messaging-tools', title: 'Decentralized Messaging Tools', group: 'Decentralized Infrastructure',
    oneLine: 'Peer-to-peer or federated messaging protocols without one company owning the whole network.',
    written: true, relatesToProduct: false,
    productNote: "No messaging feature exists in Decentralized.Host. Its hosts gossip membership (SWIM) inside a WireGuard mesh, which is infrastructure plumbing, not messaging for users.",
    sections: [
      { heading: 'Two different decentralization models', body: "Federated messaging (Matrix, and email/XMPP before it) works like email at the protocol level: anyone can run their own server, servers talk to each other, and a user on one server can message a user on another -- no single company owns the whole network, but any given server operator still sees traffic passing through their own server. Fully peer-to-peer messaging (Signal's underlying protocol used peer-to-peer patterns in parts of its design; Briar goes further, routing over Tor or direct Bluetooth/Wi-Fi with no server at all) removes the server entirely, at real cost to reliability -- both parties typically need to be online simultaneously, or messages queue until they are." }
    ]
  },
  {
    slug: 'decentralized-database-tools', title: 'Decentralized Database Tools', group: 'Decentralized Infrastructure',
    oneLine: 'Distributed, multi-writer databases without one operator holding the only copy.',
    written: true, relatesToProduct: false,
    productNote: "Decentralized.Host offers no database product. Its own control-plane state is replicated with Raft across 3 or 5 members (with an optional Postgres mirror that is never the source of truth) -- replicated, not decentralized in this topic's sense.",
    sections: [
      { heading: 'What makes a database "decentralized"', body: 'Most distributed databases (CockroachDB, YugabyteDB, Cassandra) are decentralized in an operational sense -- data is sharded and replicated across multiple nodes so no single machine holds the only copy -- but still trust-centralized: one organization runs and owns all the nodes. A smaller set of blockchain-adjacent databases (OrbitDB over IPFS, or ledger-style databases like those behind some DeFi protocols) go further, distributing both the data AND control across mutually untrusting parties, using consensus rather than a trusted operator to agree on writes.' },
      { heading: 'Why this distinction matters in practice', body: "Operational distribution (multiple nodes, no single point of failure) solves availability and scale; it doesn't require giving up control of who can write. Trust distribution (no single party controls the data) solves a different problem -- collusion-resistance and censorship-resistance -- at a real cost in write latency and complexity (consensus rounds are slower than a single node committing a transaction). Raft-replicated systems (etcd, Consul, the Decentralized.Host control plane) sit in between: operationally distributed across 3 or 5 members, but run by one operator, so they tolerate crashes, not a malicious majority." }
    ]
  },
  {
    slug: 'decentralized-file-sharing-tools', title: 'Decentralized File Sharing Tools', group: 'Decentralized Infrastructure',
    oneLine: 'Peer-to-peer file transfer and sync without a central file host.',
    written: true, relatesToProduct: false,
    productNote: "No file-sharing feature exists in Decentralized.Host.",
    sections: [
      { heading: 'How this differs from a central file host', body: "A central host (Dropbox, Google Drive) stores the one authoritative copy on its own servers and serves it to every requester. Peer-to-peer file sharing instead has the file (or pieces of it) live directly on participants' own machines -- BitTorrent is the canonical example: a file is split into pieces, peers download different pieces from different other peers simultaneously, and a peer that has a piece can immediately start serving it to others (swarming), which is why popular torrents often download faster the more people are sharing them, the opposite of a central server under heavy load." }
    ]
  },
  {
    slug: 'decentralized-authentication-tools', title: 'Decentralized Authentication Tools', group: 'Decentralized Infrastructure',
    oneLine: 'Wallet-based and cryptographic login flows instead of a central account database.',
    written: true, relatesToProduct: true,
    productNote: "Some overlap in mechanism. Decentralized.Host authorizes with attenuable, expiring capability chains of Ed25519 signatures anchored in the cluster root, not passwords -- but for operators and hosts of one cluster, not end users of applications.",
    sections: [
      { heading: 'What this typically means', body: 'Rather than a username/password checked against a company\'s account database, decentralized authentication proves identity cryptographically: "Sign-In with Ethereum" (a standardized flow, EIP-4361) has a site ask your wallet to sign a specific, time-limited message, and if the signature checks out against your public address, you\'re authenticated -- no password to leak, no central database of credentials to breach, though the site still needs its own session/authorization logic on top.' }
    ]
  },
  {
    slug: 'decentralized-payment-tools', title: 'Decentralized Payment Tools', group: 'Decentralized Infrastructure',
    oneLine: 'Peer-to-peer value transfer without a payment processor in the middle.',
    written: true, relatesToProduct: false,
    productNote: "No connection. Decentralized.Host has no token, credits, payments or rewards of any kind.",
    sections: [
      { heading: 'How this differs from Stripe/PayPal-style payments', body: "A traditional payment processor sits between payer and payee, holding the actual settlement authority: it debits one account and credits another in its own ledger, and the money only really moves when the processor's own bank rails clear. Blockchain-based payments settle directly between the two parties' addresses on a shared public ledger -- no intermediary custodies the funds mid-transfer, and settlement finality is defined by the chain's own consensus rules (Solana's is sub-second; Bitcoin's classically wants several confirmations) rather than a company's internal database commit." }
    ]
  },
  {
    slug: 'decentralized-governance-tools', title: 'Decentralized Governance Tools', group: 'Decentralized Infrastructure',
    oneLine: 'On-chain voting and proposal systems for collective decision-making.',
    written: true, relatesToProduct: false,
    productNote: "No governance system exists. A cluster has an operator who holds the root key; hosts retain a veto over their own machine through local policy, which is sovereignty, not governance.",
    sections: [
      { heading: 'The general infrastructure category', body: "This overlaps with DAO Governance Tools but is broader: it covers any collective-decision infrastructure, not just token-voting DAOs specifically -- multi-sig-gated treasury changes, off-chain signaling (Snapshot-style polls that inform but don't automatically execute a decision), and hybrid models where a small elected council executes what a broader vote approved." }
    ]
  },
  {
    slug: 'decentralized-oracle-tools', title: 'Decentralized Oracle Tools', group: 'Decentralized Infrastructure',
    oneLine: 'Getting real-world data onto a blockchain via multiple independent reporters instead of one trusted feed.',
    written: true, relatesToProduct: false,
    productNote: "No oracle functionality exists in Decentralized.Host.",
    sections: [
      { heading: 'Why oracles exist at all', body: "Blockchains can't natively see the outside world -- a smart contract can't directly ask \"what's the current ETH/USD price\" or \"did this flight land on time.\" An oracle bridges that gap by bringing external data on-chain, and a decentralized oracle (Chainlink is the dominant example) does this via multiple independent node operators reporting the same data, with the result aggregated (often a median) so no single reporter can manipulate the feed -- important because a bad price feed has directly caused real, large exploits in DeFi history when a single trusted source was compromised or manipulated." }
    ]
  },
  {
    slug: 'decentralized-registry-tools', title: 'Decentralized Registry Tools', group: 'Decentralized Infrastructure',
    oneLine: 'On-chain or peer-verified name/asset registries.',
    written: true, relatesToProduct: true,
    productNote: "Partial overlap. Executables are pushed into the cluster's own content-addressed store and referenced by BLAKE3 digest, optionally with a signed publisher attestation that hosts can require. It is a per-cluster store, not a public registry. Container images are pulled from ordinary registries by digest.",
    sections: [
      { heading: 'What a decentralized registry actually is', body: 'A registry maps names to something authoritative -- a domain to an IP, a name to an owner, a package name to its publisher. Decentralizing it (ENS for names, or a package registry with signed, peer-verifiable entries) means no single company can unilaterally reassign, censor, or delete an entry; verification happens against a shared, tamper-evident record instead of trusting one operator\'s database.' }
    ]
  },
  {
    slug: 'decentralized-marketplace-tools', title: 'Decentralized Marketplace Tools', group: 'Decentralized Infrastructure',
    oneLine: 'Peer-to-peer buying and selling without a platform taking a cut in the middle.',
    written: true, relatesToProduct: false,
    productNote: "No marketplace exists or is planned in the current roadmap. Federation lets one cluster grant another bounded capacity by signed agreement, with no pricing or settlement.",
    sections: [
      { heading: 'How a decentralized marketplace typically works', body: 'Rather than a platform (eBay, Amazon) matching buyers and sellers and taking a cut on every transaction, a decentralized marketplace uses smart contracts to hold funds in escrow and release them automatically when conditions are met (delivery confirmed, a dispute period passes) -- removing the platform\'s custody of funds and often its transaction fee, at the cost of needing the contract logic itself to correctly handle disputes, which is genuinely hard to get right without SOME trusted arbiter for edge cases.' }
    ]
  },
  {
    slug: 'decentralized-reputation-tools', title: 'Decentralized Reputation Tools', group: 'Decentralized Infrastructure',
    oneLine: 'Portable, verifiable track records not owned by one platform.',
    written: true, relatesToProduct: false,
    productNote: "No reputation system exists in Decentralized.Host.",
    sections: [
      { heading: 'The portability problem this solves', body: "A reputation score on a centralized platform (an Uber rating, an eBay seller score) is trapped there -- it can't move with you to a competitor, and the platform can reset or revoke it unilaterally. Decentralized reputation systems try to make a track record portable and independently verifiable: attestations signed by counterparties, stored somewhere that isn't controlled by any single platform (on-chain, or in a verifiable-credential format), so a new platform could in principle trust a reputation earned elsewhere without asking the original platform's permission." }
    ]
  },
  {
    slug: 'decentralized-access-control-tools', title: 'Decentralized Access Control Tools', group: 'Decentralized Infrastructure',
    oneLine: 'Token- or credential-gated permissions without a central admin panel.',
    written: true, relatesToProduct: true,
    productNote: "Directly related. Authority in Decentralized.Host is a chain of Ed25519-signed capability blocks: root to member, member to a per-assignment capability bound to one host, generation, digest and resource ceilings, and read/write/admin operator sessions that expire. Each block can only narrow what the previous one allowed.",
    sections: [
      { heading: 'What this covers', body: 'A central admin panel model has one party (a company\'s backend) deciding who can do what, checked against its own database on every request. Decentralized access control instead encodes permission into something the requester can prove cryptographically -- holding a specific NFT unlocks a Discord role, holding a DAO governance token unlocks a voting right, a signed credential proves you\'re a verified member of some group -- without any central party approving the check at request time. The permission logic itself usually still lives somewhere centralized (a smart contract, which IS a form of centralization even if not corporate-owned), but no single company\'s database is the source of truth for who\'s allowed in.' }
    ]
  },
  {
    slug: 'decentralized-encryption-tools', title: 'Decentralized Encryption Tools', group: 'Decentralized Infrastructure',
    oneLine: 'End-to-end and threshold encryption schemes with no single key holder.',
    written: true, relatesToProduct: false,
    productNote: "Beyond transport security (TLS on every API from first start, mutual TLS for Raft, WireGuard between hosts), Decentralized.Host has no encryption feature. Volume data is not encrypted at rest by the system.",
    sections: [
      { heading: 'End-to-end vs. threshold encryption', body: "End-to-end encryption (E2EE) means the message is encrypted on the sender's device and only decryptable on the recipient's -- the transport in between, including any server that relays it, never sees plaintext. Threshold encryption is a different, additive idea: the DECRYPTION key itself is split into N shares distributed to different parties, and some threshold (e.g. 3 of 5) must cooperate to reconstruct it -- useful when you deliberately don't want any single party (including the sender) to unilaterally decrypt later, common in multi-party custody and some DAO treasury designs." }
    ]
  },
  {
    slug: 'decentralized-backup-tools', title: 'Decentralized Backup Tools', group: 'Decentralized Infrastructure',
    oneLine: 'Redundant backups spread across independent peers instead of one provider\'s snapshot system.',
    written: true, relatesToProduct: true,
    productNote: "Partial overlap. Volume snapshots commit only when 2 replicas return signed evidence and are restored from peers after host loss; control-plane backups are signed and verify offline. There is no off-cluster backup target, and `dh volume snapshot`/`restore` commands are not implemented yet.",
    sections: [
      { heading: 'How this differs from a normal cloud backup', body: "A normal backup (a cloud snapshot, an S3 bucket) still has one company as the custodian -- if their infrastructure fails catastrophically or they go out of business, your backup can go with it. Decentralized backup tools (Storj, Sia, or IPFS+Filecoin used specifically for backup) spread encrypted, redundant copies across many independent storage providers, so no single provider's failure takes out your backup -- the tradeoff is usually restore speed (reassembling from many peers can be slower than pulling from one fast cloud provider) and more moving parts to get right." }
    ]
  },
  {
    slug: 'decentralized-sync-tools', title: 'Decentralized Sync Tools', group: 'Decentralized Infrastructure',
    oneLine: 'Multi-device or multi-peer data sync without a central sync server.',
    written: true, relatesToProduct: true,
    productNote: "Mechanism overlap only: volume replicas converge by comparing 256-bucket Merkle roots and repairing differences from peers (anti-entropy). There is no file-sync feature for users.",
    sections: [
      { heading: 'How peer sync differs from cloud sync', body: 'Dropbox-style sync routes every change through a central server, which then pushes it to your other devices. Peer-to-peer sync tools (Syncthing is the best-known open-source example) instead have your own devices talk directly to each other -- no cloud intermediary sees your files at all, sync happens over your local network when devices are on the same LAN, or over the internet via relay/NAT traversal when they\'re not, and there\'s no third party that could be subpoenaed for your data or that could suffer a breach exposing it.' }
    ]
  },
  {
    slug: 'decentralized-search-tools', title: 'Decentralized Search Tools', group: 'Decentralized Infrastructure',
    oneLine: 'Indexing and search over peer-distributed content.',
    written: true, relatesToProduct: false,
    productNote: "No search feature exists in Decentralized.Host.",
    sections: [
      { heading: 'Why search is hard to decentralize', body: 'Search fundamentally needs a comprehensive index to be useful -- Google\'s value comes largely from having crawled and indexed most of the web in one place. Decentralized search projects (Presearch uses a hybrid model with distributed nodes and its own token incentive; some IPFS-adjacent tools index content-addressed data specifically) have to solve indexing without one party controlling the whole index, which is a genuinely unsolved problem at Google-scale -- most decentralized search efforts today cover a narrower slice (a specific content type, or federated with a centralized index underneath) rather than a full open-web replacement.' }
    ]
  },
  {
    slug: 'decentralized-analytics-tools', title: 'Decentralized Analytics Tools', group: 'Decentralized Infrastructure',
    oneLine: 'Usage and telemetry analysis without one party owning all the data.',
    written: true, relatesToProduct: false,
    productNote: "No analytics feature exists, and there is no telemetry. Hosts report signed observations to their own control plane only; unmeasured values are shown as NOT MEASURED rather than estimated.",
    sections: [
      { heading: 'What decentralization means for analytics specifically', body: 'Standard web analytics (Google Analytics) send every visitor\'s behavior to one company, which sees aggregate data across the entire web, not just your site. Privacy-focused alternatives (Plausible, Fathom) at least keep analytics siloed per-site, but still centralize your own site\'s data with one vendor. A genuinely decentralized analytics model would need each data point verified and aggregated without any single party holding the raw underlying data -- a much harder, less-solved problem, with few mature real-world implementations.' }
    ]
  },

  // ---------- Decentralized Hosting ----------
  {
    slug: 'vps-management-tools', title: 'VPS Management Tools', group: 'Decentralized Hosting',
    oneLine: 'Provisioning, monitoring, and maintaining virtual private servers.',
    written: true, relatesToProduct: true,
    productNote: "A VPS is a reasonable place to run a host (dh-noded) or a control-plane member (dh-control). Decentralized.Host does not create, patch or manage the VPS itself -- only the work it admits.",
    sections: [
      { heading: 'What VPS management covers', body: 'A VPS (virtual private server) gives you root access to an isolated slice of a physical machine -- your own IP, your own OS, your own processes -- without owning hardware. "Managing" one covers the full lifecycle: provisioning (choosing a region/size and booting it, via a provider\'s API or console), securing it (SSH key-only login, a firewall, unattended security updates), keeping services running (systemd units, process supervisors, restart policies), and monitoring (is it up, is disk filling, is memory exhausted).' }
    ]
  },
  {
    slug: 'dedicated-server-tools', title: 'Dedicated Server Tools', group: 'Decentralized Hosting',
    oneLine: 'Managing bare-metal servers you fully own or lease exclusively.',
    written: true, relatesToProduct: true,
    productNote: "Same relationship as with a VPS: run dh-noded on a dedicated server and it becomes a host that admits work under its own policy. Decentralized.Host does not manage the machine or its OS.",
    sections: [
      { heading: 'Dedicated vs. virtual', body: "A dedicated server gives you the entire physical machine -- every CPU core, all the RAM, no noisy-neighbor contention from other tenants -- either bought outright (colocation: you own the hardware, a datacenter provides power/cooling/network) or leased exclusively from a provider (Hetzner's and OVH's dedicated lines are common examples). This trades away a VPS's flexibility (resize in minutes, snapshot, migrate) for consistent, undiluted performance and, often, a meaningfully lower cost per core than an equivalent slice of a hyperscaler VM." }
    ]
  },
  {
    slug: 'cdn-configuration-tools', title: 'CDN Configuration Tools', group: 'Decentralized Hosting',
    oneLine: 'Configuring content delivery networks to cache and serve assets close to users.',
    written: true, relatesToProduct: false,
    productNote: "No CDN layer exists. Decentralized.Host's edge hosts are L7 proxies in front of replicas; there is no caching or points-of-presence network.",
    sections: [
      { heading: 'What a CDN actually does', body: "A CDN puts copies of your static content (images, JS/CSS bundles, whole HTML pages for cacheable routes) on servers physically closer to each visitor, so a user in Singapore fetches from a nearby edge node instead of round-tripping to wherever your origin server actually sits. Configuration mostly means deciding what's cacheable (immutable assets like a hashed JS bundle: cache aggressively; a logged-in dashboard: don't) and for how long (Cache-Control/TTL headers), plus purge rules for when you deploy new content that must invalidate old cached copies immediately." }
    ]
  },
  {
    slug: 'dns-management-tools', title: 'DNS Management Tools', group: 'Decentralized Hosting',
    oneLine: 'Creating and maintaining the DNS records that point domain names at real infrastructure.',
    written: true, relatesToProduct: true,
    productNote: "Indirectly. Ingress names (for example web.example.net) must point at your edge hosts in ordinary DNS, and ACME DNS-01 validation needs DNS records. Decentralized.Host does not manage DNS zones for you.",
    sections: [
      { heading: 'What DNS management actually involves day to day', body: 'Beyond the basics (A records pointing a name at an IP, CNAME records aliasing one name to another), real DNS management means keeping records correct as infrastructure changes: updating a record when a server\'s IP changes, adding CAA records to restrict which certificate authorities may issue certs for your domain, setting sensible TTLs (short while you\'re actively changing something, long once stable, to reduce query load), and verifying propagation -- a change isn\'t live everywhere the instant you save it, since resolvers along the path cache answers for up to the record\'s TTL.' }
    ]
  },
  {
    slug: 'ssl-tls-certificate-tools', title: 'SSL/TLS Certificate Tools', group: 'Decentralized Hosting',
    oneLine: 'Issuing, renewing, and configuring the certificates that make HTTPS work.',
    written: true, relatesToProduct: true,
    productNote: "Directly related. Edge hosts obtain certificates via ACME (HTTP-01, DNS-01, wildcard) or from the cluster-local CA, and report certificate state in signed observations. This is verified against Pebble locally only -- never yet against a public CA.",
    sections: [
      { heading: 'How automated certificate issuance actually works', body: "Let's Encrypt (and the ACME protocol it popularized) made TLS certificates free and automatable: a client proves it controls a domain -- usually by answering an HTTP challenge at a well-known path, or publishing a specific DNS TXT record -- and in exchange gets a short-lived certificate (Let's Encrypt's are valid ~90 days) that a tool like Traefik or Certbot renews automatically well before expiry. This replaced the older model of manually buying a certificate from a CA and installing it by hand." }
    ]
  },
  {
    slug: 'load-balancer-tools', title: 'Load Balancer Tools', group: 'Decentralized Hosting',
    oneLine: 'Distributing incoming traffic across multiple backend instances.',
    written: true, relatesToProduct: true,
    productNote: "Directly related. Edge hosts route to healthy replicas over the mesh, with routing, draining, ejected and pending states, ejection of hung replicas and make-before-break rolling updates.",
    sections: [
      { heading: 'What load balancing solves', body: "Once an application needs more capacity than one instance can serve, or needs to survive one instance crashing without downtime, something has to sit in front and spread requests across multiple running copies -- round-robin (rotate evenly), least-connections (send to whichever backend is least busy right now), or IP-hash (same client always hits the same backend, useful for sticky sessions) are the common strategies. Health checks matter as much as the distribution algorithm: a load balancer that keeps sending traffic to a backend that's actually down isn't doing its job." }
    ]
  },
  {
    slug: 'reverse-proxy-tools', title: 'Reverse Proxy Tools', group: 'Decentralized Hosting',
    oneLine: 'Software that sits in front of backend services, routing and terminating traffic on their behalf.',
    written: true, relatesToProduct: true,
    productNote: "The edge role of dh-noded is a reverse proxy: it terminates HTTP(S) and forwards over the WireGuard mesh through per-assignment forwarders. It is built in, not Traefik or nginx.",
    sections: [
      { heading: 'What a reverse proxy does', body: 'A reverse proxy sits between the public internet and your actual application servers: it receives every request first, then forwards it to the right backend based on rules (usually the requested hostname or URL path), and often also terminates TLS, adds compression, and handles routing changes without the backend needing to know anything changed. This is the opposite of a forward proxy (which sits in front of clients, not servers). Nginx, Caddy, HAProxy, and Traefik are the most common choices; each differs mainly in configuration style and how dynamically they can pick up new routes.' }
    ]
  },
  { slug: 'container-orchestration-tools', title: 'Container Orchestration Tools', group: 'Decentralized Hosting', oneLine: 'Systems that decide where containers run, keep them running, and reschedule them on failure.', written: true, relatesToProduct: true,
    productNote: "Decentralized.Host is an orchestrator with a different trust model: the scheduler proposes placements, but each host can refuse under its own policy, and desired, admitted and observed state are tracked separately. Runtimes are `process` and `docker` (digest-pinned images); it is far smaller than Kubernetes.",
    sections: [
      { heading: 'What orchestration actually decides', body: "At its core, a container orchestrator answers three questions continuously, not just at deploy time: which machine should this container run on right now (scheduling, usually based on available CPU/RAM and constraints), is it still running (health checking), and what happens if it isn't (rescheduling, restarting, or failing over). Kubernetes is the dominant general-purpose answer to all three, with an enormous surface area (deployments, services, ingress, operators, CRDs) built to handle arbitrary workloads at any scale." }
    ]
  },
  {
    slug: 'kubernetes-tools', title: 'Kubernetes Tools', group: 'Decentralized Hosting',
    oneLine: 'The dominant open-source container orchestration platform and its surrounding ecosystem.',
    written: true, relatesToProduct: false,
    productNote: "Decentralized.Host does not use Kubernetes and is not a Kubernetes distribution. The main difference is authority: in Kubernetes the control plane commands kubelets; here hosts admit or refuse signed proposals.",
    sections: [
      { heading: 'What Kubernetes actually is', body: 'Kubernetes (often "k8s") is a control plane for declaratively managing containerized workloads across a cluster of machines: you describe the desired state (run 3 replicas of this image, expose it on this port, mount this volume) in YAML, and Kubernetes\' controllers continuously reconcile the real cluster state toward that description -- restarting failed pods, rescheduling around a dead node, rolling out updates with configurable strategies. It originated at Google (based on their internal Borg system) and is now maintained by the CNCF.' },
      { heading: 'The real complexity tradeoff', body: 'Kubernetes\' generality is also its cost: a working cluster involves a control plane (API server, etcd, scheduler, controller manager), a networking model (CNI plugins, Services, Ingress controllers), and usually a whole ecosystem on top (Helm for packaging, cert-manager for TLS, an ingress controller, monitoring via Prometheus/Grafana) before it does anything a small team couldn\'t do more simply. Lighter distributions (K3s, K0s, MicroK8s) trim the packaging and footprint but keep the same conceptual model and most of the same operational surface. This is the gap lighter tools such as Coolify, Dokploy or Nomad exist in: for a team that just wants a running container with a real URL and TLS, full Kubernetes is frequently more machinery than the problem needs.' }
    ]
  },
  { slug: 'docker-management-tools', title: 'Docker Management Tools', group: 'Decentralized Hosting', oneLine: 'Building, running, and operating Docker containers and images day to day.', written: true, relatesToProduct: true,
    productNote: "Docker is one of two runtimes. With `runtime: docker`, hosts run digest-pinned images through the Docker CLI with enforced --memory/--cpus and OOM detection. Decentralized.Host does not build images or manage Docker itself.",
    sections: [
      { heading: 'The core Docker workflow', body: "Docker packages an application with its dependencies into an image (a layered, immutable filesystem snapshot built from a Dockerfile), which becomes a running container when started -- an isolated process tree with its own filesystem view, network namespace, and resource limits, sharing the host kernel rather than virtualizing a whole OS. Day-to-day management means building images (docker build), running and restarting containers (with restart policies so they survive a crash or host reboot), managing volumes for anything that needs to persist beyond a container's lifetime, and cleaning up unused images/layers before disk fills." }
    ]
  },
  {
    slug: 'database-hosting-tools', title: 'Database Hosting Tools', group: 'Decentralized Hosting',
    oneLine: 'Running and operating databases as a service, self-hosted or managed.',
    written: true, relatesToProduct: false,
    productNote: "Decentralized.Host offers no managed databases. You can run a database as a workload with a replicated volume, but nothing about that has been validated for production.",
    sections: [
      { heading: 'Managed vs. self-hosted, the real tradeoff', body: "A managed database service (RDS, Neon, PlanetScale) handles provisioning, automated backups, patching, and failover for you, in exchange for a markup and less low-level control. Self-hosting means you run the database yourself (usually as a container or systemd service) -- cheaper, fully controllable, but every operational concern (backup schedule, disk monitoring, version upgrades, replication if you want it) becomes your responsibility rather than a vendor's SLA." }
    ]
  },
  {
    slug: 'email-server-tools', title: 'Email Server Tools', group: 'Decentralized Hosting',
    oneLine: 'Self-hosting SMTP/IMAP mail infrastructure.',
    written: true, relatesToProduct: false,
    productNote: "No email hosting feature exists in Decentralized.Host.",
    sections: [
      { heading: 'Why self-hosted email is unusually hard', body: 'Running your own SMTP server (Postfix, Exim) and IMAP server (Dovecot) is technically straightforward; the hard part is deliverability. Gmail, Outlook, and other major providers heavily filter mail from unfamiliar IPs, and a self-hosted server has none of the reputation a large provider has built up -- getting mail delivered (not silently dropped or spam-foldered) requires correct SPF, DKIM, and DMARC DNS records, a clean-reputation IP (many cloud/VPS IP ranges are pre-flagged), and reverse DNS matching your sending domain. Miss any of these and mail to major providers frequently just vanishes with no error.' }
    ]
  },
  {
    slug: 'backup-recovery-tools', title: 'Backup & Recovery Tools', group: 'Decentralized Hosting',
    oneLine: 'Systems and practices for protecting data against loss and restoring it after failure.',
    written: true, relatesToProduct: true,
    productNote: "Partly. Signed control-plane backups verify offline and restore after total control-plane loss (tested). Volumes are snapshotted and restored from peers after host loss (tested). A full export → import round trip is not yet tested automatically.",
    sections: [
      { heading: 'Backup vs. failover -- a distinction worth being precise about', body: "These solve different failure modes and are easy to conflate. Failover keeps a service running when a machine dies, by moving the workload elsewhere -- it says nothing about data that only existed on the dead machine's disk. Backup protects against data loss specifically -- corruption, accidental deletion, ransomware -- by keeping point-in-time copies you can restore from, independent of whether the original service is still running. A system can have excellent failover and zero real backup, or vice versa; a mature setup needs both, and the classic 3-2-1 rule (3 copies, 2 different media, 1 offsite) is really about backup, not uptime." }
    ]
  },
  {
    slug: 'monitoring-logging-tools', title: 'Monitoring & Logging Tools', group: 'Decentralized Hosting',
    oneLine: 'Observing system health and capturing logs for debugging and alerting.',
    written: true, relatesToProduct: true,
    productNote: "Partly. Hosts sign observations and keep hash-chained journals; `dh logs app` tails a replica over the mesh; the console shows the age of every value. There is no metrics history, alerting or telemetry export (a self-hosted metrics export is planned).",
    sections: [
      { heading: 'Monitoring vs. logging, and why both matter', body: "Monitoring answers \"is the system healthy right now\" via numeric time-series (CPU%, request latency, error rate) that tools like Prometheus scrape and Grafana visualize, usually with alerting rules that page someone when a threshold is crossed. Logging answers \"what exactly happened\" -- discrete, timestamped events (a request came in, an exception was thrown) that you search after the fact to debug a specific incident. A mature setup has both: monitoring tells you something's wrong, logs tell you why." }
    ]
  },
  {
    slug: 'performance-optimization-tools', title: 'Performance Optimization Tools', group: 'Decentralized Hosting',
    oneLine: 'Profiling and tuning infrastructure and application performance.',
    written: true, relatesToProduct: false,
    productNote: "No profiling or optimization feature exists. Decentralized.Host publishes only values it measured, with their method, and labels everything else NOT MEASURED.",
    sections: [
      { heading: 'The discipline, done right', body: 'Real performance work starts with measurement, not guessing: profile first (find where time or memory actually goes), form a specific hypothesis about the bottleneck, change exactly one thing, and measure again before trying the next idea -- changing several things at once makes it impossible to know which change mattered. The most common mistake is optimizing what\'s easy to change instead of what the profiler actually says is slow.' }
    ]
  },
  {
    slug: 'security-hardening-tools', title: 'Security Hardening Tools', group: 'Decentralized Hosting',
    oneLine: 'Reducing attack surface and following secure-by-default configuration practices.',
    written: true, relatesToProduct: true,
    productNote: "Related in approach: hosts enforce local policy (18 ordered checks), exec is policy-gated, commands are argv not shell, and adversarial tests cover tampering, replay, rollback and canonicalization attacks. Fuzzing and an external review have not been done.",
    sections: [
      { heading: 'What hardening actually means in practice', body: 'It\'s rarely one big fix -- it\'s a long list of small defaults: SSH key-only login (no password auth), a firewall that denies by default and only opens needed ports, unattended security updates, containers running as non-root where possible, secrets kept out of source control and environment dumps, and dependencies kept patched. Automated scanners (Trivy for container images, git-secrets-style tools for source) catch some of this mechanically; the rest is discipline.' }
    ]
  },
  {
    slug: 'firewall-configuration-tools', title: 'Firewall Configuration Tools', group: 'Decentralized Hosting',
    oneLine: 'Controlling which network traffic is allowed to reach a server.',
    written: true, relatesToProduct: false,
    productNote: "Decentralized.Host does not configure host firewalls. You open the API, Raft, WireGuard and edge ports yourself.",
    sections: [
      { heading: 'The basic model', body: 'A firewall decides which network traffic is allowed to reach a machine, typically default-deny (block everything, then explicitly allow only what\'s needed -- SSH on a restricted IP range, HTTP/HTTPS on 80/443) rather than default-allow. Modern cloud providers usually offer this at two layers: a network-level security group/firewall (managed outside the OS, filtering before traffic even reaches the machine) and an OS-level firewall (ufw/iptables/nftables on Linux) as a second layer -- defense in depth, since a misconfiguration in one doesn\'t leave you fully exposed if the other is still correct.' }
    ]
  },
  {
    slug: 'auto-scaling-tools', title: 'Auto-scaling Tools', group: 'Decentralized Hosting',
    oneLine: 'Automatically adding or removing capacity in response to load.',
    written: true, relatesToProduct: false,
    productNote: "No autoscaling exists. Replica counts change only by operator action (`dh scale app`).",
    sections: [
      { heading: 'What auto-scaling actually automates', body: 'Auto-scaling watches a metric (CPU%, request queue depth, response latency) against thresholds and adds or removes running instances automatically -- scale out when load rises, scale back in when it drops, so you pay for capacity roughly matched to actual demand rather than provisioning for peak load permanently. Kubernetes\' Horizontal Pod Autoscaler and cloud providers\' auto-scaling groups are the common implementations; the hard parts are avoiding thrashing (scaling up and down rapidly on noisy metrics) and handling the ramp-up delay (a new instance takes real time to boot and become ready, during which load is still high).' }
    ]
  },
  { slug: 'ci-cd-pipeline-tools', title: 'CI/CD Pipeline Tools', group: 'Decentralized Hosting', oneLine: 'Automating build, test, and deployment on every code change.', written: true, relatesToProduct: false,
    productNote: "No build or CI pipeline exists in Decentralized.Host. You build artifacts elsewhere, push them with `dh artifact push` (or reference a digest-pinned image) and apply a manifest; any CI system can run those commands.",
    sections: [
      { heading: 'CI vs. CD, concretely', body: "Continuous Integration (CI) means every code change is automatically built and tested before it's trusted -- catching breakage the moment it's introduced rather than at release time. Continuous Deployment/Delivery (CD) means a change that passes CI is automatically pushed toward production (deployment) or made ready to release with one click (delivery). GitHub Actions, GitLab CI, Jenkins, and Buildkite are common engines for the CI half; how the CD half looks varies enormously by team." }
    ]
  },
  {
    slug: 'domain-management-tools', title: 'Domain Management Tools', group: 'Decentralized Hosting',
    oneLine: 'Registering, renewing, and configuring domain names.',
    written: true, relatesToProduct: false,
    productNote: "No domain management feature exists in Decentralized.Host.",
    sections: [
      { heading: 'The moving parts', body: "Owning a domain means three separable things: registration (paying a registrar to hold the name, renewed annually or it lapses), nameserver delegation (which DNS provider actually answers queries -- often different from the registrar), and the records themselves within that zone (A/CNAME for where traffic goes, CAA for which certificate authorities may issue TLS certs, MX for mail, TXT for verification/SPF/DKIM). Getting any one of these wrong independently breaks things in different ways -- a lapsed registration takes the domain down entirely; a wrong nameserver delegation makes your DNS provider's records irrelevant; a wrong record just breaks that one service." }
    ]
  },

  // ---------- Web3 & Blockchain ----------
  {
    slug: 'smart-contract-tools', title: 'Smart Contract Tools', group: 'Web3 & Blockchain',
    oneLine: 'Writing, testing, deploying, and auditing on-chain contract code.',
    written: true, relatesToProduct: false,
    productNote: "No connection. Decentralized.Host has no blockchain integration.",
    sections: [
      { heading: 'The real workflow', body: "Smart contracts (Solidity on EVM chains, Rust-based programs on Solana) are code that runs deterministically on-chain, where every node in the network executes it identically and agrees on the result. The real toolchain around this is substantial: a framework for compiling and testing locally against a simulated chain (Hardhat/Foundry for EVM, Anchor for Solana), a way to deploy to a real network, and -- because bugs here can directly mean stolen funds, unlike a normal app bug -- a real auditing discipline (static analysis tools, and for anything holding real value, a paid professional audit) before mainnet deployment." }
    ]
  },
  {
    slug: 'wallet-management-tools', title: 'Wallet Management Tools', group: 'Web3 & Blockchain',
    oneLine: 'Generating, securing, and using cryptocurrency wallet keypairs.',
    written: true, relatesToProduct: false,
    productNote: "No connection. Decentralized.Host has no wallets. Its keys are Ed25519 identities for hosts, members and the cluster root.",
    sections: [
      { heading: 'The core security model', body: "A crypto wallet is fundamentally a keypair: a private key that can sign transactions (moving funds, approving actions) and a public key/address others can send to. \"Managing\" a wallet well means never exposing that private key -- hardware wallets keep it on a dedicated offline device, software wallets encrypt it at rest, and the cardinal rule (\"not your keys, not your coins\") is about custody: whoever holds the private key has full, unrecoverable control, with no password reset if it's lost." }
    ]
  },
  {
    slug: 'gas-estimation-tools', title: 'Gas Estimation Tools', group: 'Web3 & Blockchain',
    oneLine: 'Predicting transaction fees before submitting them on-chain.',
    written: true, relatesToProduct: false,
    productNote: "No connection. Decentralized.Host has no blockchain integration.",
    sections: [
      { heading: 'Why gas estimation exists as a problem', body: "On Ethereum and similar EVM chains, every operation a transaction performs (storage writes, computation) costs \"gas,\" and gas price fluctuates with network demand -- submit with too low a price and a transaction can sit unconfirmed for hours or get dropped; overpay and you've wasted real money for no benefit. Estimation tools predict the current fair price by looking at recent block gas prices and pending mempool activity, often offering a fast/standard/slow tradeoff." }
    ]
  },
  {
    slug: 'token-standards-tools', title: 'Token Standards Tools', group: 'Web3 & Blockchain',
    oneLine: 'Working with fungible/non-fungible token specifications (ERC-20, SPL, etc).',
    written: true, relatesToProduct: false,
    productNote: "No connection. Decentralized.Host has no token.",
    sections: [
      { heading: 'What a token standard actually standardizes', body: 'A token standard is an interface contract: ERC-20 (Ethereum\'s fungible-token standard) guarantees any compliant token implements the same balanceOf/transfer/approve functions, so wallets and exchanges can support any ERC-20 token without custom integration work per token. ERC-721/1155 do the same for NFTs (unique, non-interchangeable tokens). Solana\'s SPL Token program plays the equivalent role on Solana -- one shared, audited program that any fungible or non-fungible token can be minted through, rather than every project deploying its own token logic from scratch.' }
    ]
  },
  {
    slug: 'nft-metadata-tools', title: 'NFT Metadata Tools', group: 'Web3 & Blockchain',
    oneLine: 'Generating and pinning the JSON metadata standard NFTs point to.',
    written: true, relatesToProduct: false,
    productNote: "No connection. Decentralized.Host has no blockchain integration.",
    sections: [
      { heading: 'How NFT metadata actually works', body: "An NFT's on-chain record is deliberately minimal -- typically just a token ID and a URI pointing somewhere else. The actual name, image, description, and attributes live in a separate JSON metadata file that URI points to, following a standard shape (ERC-721/1155's metadata JSON schema on Ethereum, Metaplex's token-metadata standard on Solana). That JSON file, and the image it references, are usually stored off-chain -- on IPFS for censorship-resistance (a CID baked into the NFT is much harder to rug than a URL on a company's server that can go offline), sometimes on Arweave for permanence." }
    ]
  },
  {
    slug: 'defi-analytics-tools', title: 'DeFi Analytics Tools', group: 'Web3 & Blockchain',
    oneLine: 'Tracking yields, liquidity, and protocol activity across decentralized finance.',
    written: true, relatesToProduct: false,
    productNote: "No connection. Decentralized.Host has no blockchain integration.",
    sections: [
      { heading: 'What these tools actually track', body: "DeFi analytics platforms (DeFiLlama is the best-known example) aggregate on-chain data across many protocols into comparable metrics -- Total Value Locked (TVL, how much capital sits in a protocol's contracts), trading volume, yield rates, and protocol-level risk signals -- since raw on-chain data alone is just a firehose of transactions, not directly comparable insight, and a real understanding of a protocol's health means pulling data from many contracts and normalizing it consistently." }
    ]
  },
  {
    slug: 'bridge-monitoring-tools', title: 'Bridge Monitoring Tools', group: 'Web3 & Blockchain',
    oneLine: 'Watching cross-chain bridge activity and security.',
    written: true, relatesToProduct: false,
    productNote: "No connection. Decentralized.Host has no blockchain integration.",
    sections: [
      { heading: 'Why bridges need dedicated monitoring', body: "A cross-chain bridge moves value between otherwise-incompatible blockchains, usually by locking an asset on the source chain and minting a representative token on the destination chain (or vice versa to redeem). Bridges have historically been the single largest category of blockchain security losses -- billions across incidents like Ronin and Wormhole -- because the lock/mint logic concentrates enormous value in one place and has repeatedly had subtle validation bugs. Bridge monitoring tools watch for anomalies (a mint happening without a corresponding lock, unusual volume spikes) as an early-warning layer, precisely because the stakes of a bridge failure are so high." }
    ]
  },
  {
    slug: 'node-management-tools', title: 'Node Management Tools', group: 'Web3 & Blockchain',
    oneLine: 'Running and maintaining blockchain full nodes or validators.',
    written: true, relatesToProduct: false,
    productNote: "Different kind of node. Decentralized.Host 'hosts' run application workloads; they are not blockchain nodes, and the system runs no blockchain.",
    sections: [
      { heading: 'A genuine, important naming collision', body: 'This pillar\'s topic -- running a blockchain full node or validator (syncing and verifying the entire chain state, or actively participating in consensus and earning rewards for it) -- is a completely different thing from what "host" or "node" means in Decentralized.Host, where it is a machine that runs application workloads. Blockchain node operation typically means real hardware requirements (fast SSD, meaningful bandwidth for chain sync), meaningful uptime commitments, and for a validator, real slashing risk if you misbehave or go offline at the wrong time.' }
    ]
  },
  {
    slug: 'blockchain-explorer-tools', title: 'Blockchain Explorer Tools', group: 'Web3 & Blockchain',
    oneLine: 'Browsing and searching on-chain transaction history.',
    written: true, relatesToProduct: false,
    productNote: "No connection. Decentralized.Host's audit ledger is a hash chain with signed checkpoints inside one cluster, verified with `dh audit verify` -- not a blockchain, and it has no explorer.",
    sections: [
      { heading: 'What an explorer actually provides', body: "A blockchain explorer (Etherscan for Ethereum, Solscan/explorer.solana.com for Solana) indexes every transaction, block, and account on a chain into a searchable web UI -- since the raw chain data itself is just a sequence of encoded transactions, an explorer is what makes it human-readable: search a wallet address to see its balance and history, search a transaction signature to see exactly what it did and whether it succeeded, verify a contract's source code against its deployed bytecode. This is independent, third-party infrastructure -- no single project runs its own explorer for a whole chain; they index the public chain state." }
    ]
  },
  {
    slug: 'ipfs-tools', title: 'IPFS Tools', group: 'Web3 & Blockchain',
    oneLine: 'Working with the InterPlanetary File System -- adding, pinning, and retrieving content-addressed files.',
    written: true, relatesToProduct: false,
    productNote: "Decentralized.Host does not use IPFS. It shares ideas (content addressing, chunking, Merkle roots) but its store is private to one cluster.",
    sections: [
      { heading: 'The basics', body: 'IPFS identifies content by the hash of its bytes (a CID), not by a location, so the same file added from two different machines produces the same identifier. Nodes running the IPFS daemon (kubo is the reference implementation) can fetch content from any peer that has it, and "pinning" a CID tells your own node (or a pinning service) to keep a copy so it doesn\'t disappear if the original uploader goes offline.' }
    ]
  },
  {
    slug: 'ens-management-tools', title: 'ENS Management Tools', group: 'Web3 & Blockchain',
    oneLine: 'Registering and managing Ethereum Name Service domains and records.',
    written: true, relatesToProduct: false,
    productNote: "No connection. Decentralized.Host has no blockchain integration.",
    sections: [
      { heading: 'What ENS management involves', body: 'Beyond the initial registration (a smart-contract transaction, paid in ETH gas, renewable annually like a normal domain), ENS names carry a resolver contract that maps the name to records -- not just an Ethereum address, but potentially a website content hash (for IPFS-hosted sites), other cryptocurrency addresses, and text records for social profiles. Managing an ENS name well means keeping these records current and understanding that, unlike DNS, changes are on-chain transactions with real gas costs, not free instant edits.' }
    ]
  },
  {
    slug: 'dao-governance-tools', title: 'DAO Governance Tools', group: 'Web3 & Blockchain',
    oneLine: 'On-chain proposal and voting systems for decentralized organizations.',
    written: true, relatesToProduct: false,
    productNote: "No connection. A cluster has an operator; hosts keep a veto over their own machines through local policy. There is no DAO and none is planned.",
    sections: [
      { heading: 'How on-chain governance typically works', body: "A DAO (Decentralized Autonomous Organization) replaces a traditional company's board decisions with token-weighted or membership-weighted on-chain voting: someone submits a proposal (often after an off-chain discussion phase on a forum), token holders vote within a window, and if it passes, execution can be automatic (a smart contract carries out the approved action directly, common for treasury spending) or manual (a multisig of elected signers carries it out, common when the action is too complex to safely automate). Tools like Snapshot (off-chain, gasless voting signaling) and on-chain governance modules (Compound Governor, Aragon) are the common infrastructure." }
    ]
  },
  {
    slug: 'staking-calculator-tools', title: 'Staking Calculator Tools', group: 'Web3 & Blockchain',
    oneLine: 'Estimating returns from staking tokens to secure a network.',
    written: true, relatesToProduct: false,
    productNote: "No connection. Decentralized.Host has no token or staking.",
    sections: [
      { heading: 'What staking actually is', body: "Proof-of-stake networks (Solana included, at the protocol level) have validators lock up (stake) tokens as collateral backing their participation in consensus -- in exchange, they earn a share of network inflation/fees, and can lose a portion of their stake (slashing) for provable misbehavior. A staking calculator estimates expected annual return given a network's current inflation rate, total staked supply, and a validator's commission -- useful because these numbers shift as more of a network's supply gets staked." }
    ]
  },
  {
    slug: 'yield-farming-tools', title: 'Yield Farming Tools', group: 'Web3 & Blockchain',
    oneLine: 'Optimizing returns across DeFi lending and liquidity protocols.',
    written: true, relatesToProduct: false,
    productNote: "No connection. Decentralized.Host has no token or DeFi feature.",
    sections: [
      { heading: 'What yield farming actually is', body: 'Yield farming means moving capital between DeFi protocols (lending markets like Aave, liquidity pools like Uniswap) to chase the best available return, which shifts constantly as capital flows in and out of each pool. Providing liquidity typically earns trading fees plus, often, additional token incentives a protocol pays to bootstrap usage -- but carries real risks distinct from simply holding: impermanent loss (a liquidity pool\'s two assets diverging in price costs the provider value relative to just holding them) and smart-contract risk (a bug or exploit in the protocol itself).' }
    ]
  },
  {
    slug: 'multi-sig-wallet-tools', title: 'Multi-sig Wallet Tools', group: 'Web3 & Blockchain',
    oneLine: 'Requiring multiple signatures to authorize a transaction.',
    written: true, relatesToProduct: false,
    productNote: "No multi-signature feature exists. Some operations use two signatures (host key rotation is signed by old and new keys; root rotation is signed by the old root), but there is no multi-party approval.",
    sections: [
      { heading: 'The core idea', body: "A multi-sig wallet requires M-of-N signatures (e.g., 2 of 3 designated keyholders) to authorize a transaction, rather than any single key being sufficient -- protecting against one compromised or lost key being catastrophic, and often used for DAO treasuries or team-controlled funds where no individual should unilaterally control significant value. Gnosis Safe is the dominant EVM implementation; Solana has its own native multi-sig program support (Squads is a common interface for it)." }
    ]
  },
  {
    slug: 'signature-verification-tools', title: 'Signature Verification Tools', group: 'Web3 & Blockchain',
    oneLine: 'Confirming a message or transaction was really signed by a given key.',
    written: true, relatesToProduct: true,
    productNote: "Central to Decentralized.Host. Every assignment, observation, capability, bundle and audit checkpoint is an Ed25519 signature over canonical JSON with a domain-separated context, and 136 published conformance vectors let independent implementations check their verification.",
    sections: [
      { heading: 'The underlying cryptography', body: 'Digital signatures all rest on the same asymmetric-cryptography foundation regardless of context: a private key signs a piece of data, producing a signature that anyone holding the corresponding public key can verify -- confirming both that the claimed signer really produced it (authenticity) and that the data hasn\'t been altered since (integrity), without the verifier ever needing the private key itself. Ethereum wallet signatures ("sign this message to prove you own this address"), Bitcoin transaction signatures, and SSH key authentication are all applications of this same core primitive, just with different key formats and signing algorithms (ECDSA/secp256k1 for most crypto wallets, Ed25519 increasingly common for SSH and Solana).' }
    ]
  },
  {
    slug: 'abi-encoder-decoder-tools', title: 'ABI Encoder/Decoder Tools', group: 'Web3 & Blockchain',
    oneLine: 'Converting between human-readable contract calls and the binary format the EVM expects.',
    written: true, relatesToProduct: false,
    productNote: "No connection. Decentralized.Host has no smart-contract interaction. Its wire format is canonical JSON (integers only, duplicate keys and invalid UTF-8 rejected).",
    sections: [
      { heading: 'What ABI encoding actually is', body: 'The EVM only understands raw bytes -- calling a function like transfer(address,uint256) on-chain requires encoding the function selector (a 4-byte hash of the function signature) plus the arguments into a specific binary layout the ABI (Application Binary Interface) specification defines. Tools like ethers.js/viem\'s encodeFunctionData, or standalone decoders, translate between this binary format and human-readable calls -- essential for debugging a raw transaction\'s calldata, or for any tool that needs to construct a contract call without a full SDK.' }
    ]
  },
  {
    slug: 'transaction-simulator-tools', title: 'Transaction Simulator Tools', group: 'Web3 & Blockchain',
    oneLine: 'Dry-running a transaction to predict its effects before submitting it.',
    written: true, relatesToProduct: false,
    productNote: "No transaction simulation exists. The closest feature is `dh explain app`, which shows the scheduler's plan before anything is signed.",
    sections: [
      { heading: 'Why simulation matters', body: "Submitting a transaction that reverts still costs real gas on most chains, and a complex DeFi transaction's actual effects (exact token amounts received after slippage, whether an approval is missing) aren't always obvious from the raw call alone. Simulators (Tenderly is a well-known example) execute a transaction against current chain state without actually broadcasting it, showing the exact state changes, gas cost, and any revert reason in advance -- letting a user or dApp catch a failing transaction before paying to submit it." }
    ]
  },
  {
    slug: 'gas-optimization-tools', title: 'Gas Optimization Tools', group: 'Web3 & Blockchain',
    oneLine: 'Reducing the on-chain execution cost of contract code.',
    written: true, relatesToProduct: false,
    productNote: "No connection. Decentralized.Host has no smart-contract code.",
    sections: [
      { heading: 'What gas optimization actually involves', body: 'Every EVM opcode a contract executes costs gas, so optimization means restructuring contract code to do the same job with fewer, cheaper operations -- packing multiple small values into one storage slot (storage writes are among the most expensive operations), avoiding redundant storage reads by caching in memory, choosing cheaper data types, and minimizing external calls. Tools like Foundry\'s gas snapshots or Hardhat\'s gas reporter measure exactly where a contract\'s gas cost concentrates so developers can target the worst offenders.' }
    ]
  },
  {
    slug: 'web3-authentication-tools', title: 'Web3 Authentication Tools', group: 'Web3 & Blockchain',
    oneLine: '"Sign in with wallet" flows using a cryptographic signature instead of a password.',
    written: true, relatesToProduct: false,
    productNote: "No wallet-based login exists. Operators authenticate with expiring capability tokens derived from the cluster root.",
    sections: [
      { heading: 'How wallet-based sign-in works', body: 'The standard flow (Sign-In with Ethereum, EIP-4361, or Solana\'s equivalent wallet-adapter patterns) has a site generate a unique, time-limited message, ask the user\'s wallet extension to sign it, and verify the returned signature matches the claimed public address -- proving control of that address without ever transmitting a private key or password. The site then typically issues its own session token for subsequent requests, same as any login system, just with wallet signature replacing password as the initial proof.' }
    ]
  },

  // ---------- Platform (meta pillars) ----------
  // Entries kept for their existing URLs. Each maps to what actually exists
  // for the Go implementation.
  {
    slug: 'decentralized-studio', title: 'Decentralized Studio', group: 'Platform',
    oneLine: 'There is no hosted studio. The operator console is served by your own cluster.',
    written: true, relatesToProduct: true,
    productNote: "The nearest real thing is the operator console served by every control-plane member: 14 screens, no third-party requests, and a truth basis on every value. There is no hosted 'studio'.",
    sections: [
      { heading: 'What the console is', body: 'Every dh-control member serves the same console (plain ES modules, no build step, no framework, no third-party requests). `dh console` prints a URL whose session capability travels in the URL fragment, which browsers never send to servers; add --read-only for a session that cannot change anything.\n\nIts 14 screens are Overview, Runtime, Hosts, Workloads, Storage, Mesh, Edge, Policy, Audit, Diagnostics, Capabilities, Federation, Conformance and Settings. Desired, admitted and observed state are separate counters, never one health score, and every value carries a truth basis: OBSERVED, DERIVED, CONFIGURED, PLANNED or UNKNOWN.' },
      { heading: 'Limits', body: 'The console is checked manually in a live browser; there is no automated browser test suite yet (P0-7). Over TLS, browsers must trust the cluster root CA, or you front the console with your own TLS terminator.' }
    ]
  },
  {
    slug: 'openhost', title: 'OpenHost', group: 'Platform',
    oneLine: 'Not a separate product: the self-hosting path for Decentralized.Host itself.',
    written: true, relatesToProduct: true,
    productNote: "This is Decentralized.Host itself -- not a separate product. Start with /deploy/ to run a local cluster.",
    sections: [
      { heading: 'The getting-started path', body: 'Clone the Go repository, run `make build` (Go 1.26+), then `./bin/dh dev up --dir ./devcluster`. That starts 3 control-plane members and 4 hosts as real local processes and deploys a sample app. For a real installation across machines, follow docs/runbooks/install.md: dh init, dh-control on three machines, dh cp bootstrap, dh node invite, and dh-noded --join-file on each host.' }
    ]
  },
  {
    slug: 'downloads', title: 'Downloads', group: 'Platform',
    oneLine: 'Build from source; signed release binaries do not exist yet.',
    written: true, relatesToProduct: true,
    productNote: "There are no signed release binaries yet (planned under P0-9). Build from source with Go 1.26+ (`make build`). A source bundle and an offline kit for Linux amd64 are attached to the ref-mac-a03 GitHub release.",
    sections: [
      { heading: 'What exists today', body: 'The ref-mac-a03 GitHub release carries the exact source tree that passed the macOS reference run (dh-src-b3-2a23e1da.tgz, whose `dh evidence digest` must print b3:2a23e1da…), a master archive, and an offline Linux amd64 kit (Go toolchain, module cache and source) for validating on machines without internet access. The same kit is published in parts on the pv1-offline-kit branch for networks that cannot reach GitHub\'s release download host.\n\nEach file has a published SHA-256. Verify it before use.' },
      { heading: 'What does not exist yet', body: 'Signed release artifacts, packages, systemd units and a documented upgrade path between versions are planned (P0-9). Until then, build from source.' }
    ]
  },
  {
    slug: 'how-it-works', title: 'How It Works', group: 'Platform',
    oneLine: 'Propose, admit, run, observe, verify.',
    written: true, relatesToProduct: true,
    productNote: "See /architecture/ for the real design: Raft control plane, sovereign hosts with 18 admission checks, userspace WireGuard mesh, content-addressed storage and a health-gated edge.",
    sections: [
      { heading: 'The loop', body: 'An operator applies a dh/v1 manifest. The Raft control plane records it as desired state, the scheduler plans placements, and the reconciler turns them into signed assignments, each carrying a capability bound to one host, generation, digest and resource ceiling. Each host checks the assignment against its pinned root and its own policy (18 ordered checks), runs it if every check passes, journals what it did, and reports signed observations. The control plane never marks anything running until a host has observed it.' }
    ]
  },
  {
    slug: 'use-cases', title: 'Use Cases', group: 'Platform',
    oneLine: 'What Decentralized.Host is appropriate for today.',
    written: true, relatesToProduct: true,
    productNote: "See /features/ for what is verified, limited and missing. Honestly, today's use case is evaluation and validation, not production hosting.",
    sections: [
      { heading: 'Appropriate today', body: 'Evaluating the architecture on your own machine; studying or re-implementing the dh/v1 protocol against its conformance vectors; running validation on your own Linux hardware and contributing the evidence; experiments where hosts must be able to refuse a coordinator.' },
      { heading: 'Not appropriate yet', body: 'Production workloads. Multi-machine, WAN and NAT behaviour, public ACME, long-duration operation and upgrades have not been validated, and there has been no external security review. The process runtime does not enforce CPU or memory limits.' }
    ]
  },
  {
    slug: 'documentation', title: 'Documentation', group: 'Platform',
    oneLine: 'CLI, manifest, install and operations reference.',
    written: true, relatesToProduct: true,
    productNote: "Maps to /docs/, which follows the runbooks in the Go repository.",
    sections: [
      { heading: 'Where the reference lives', body: 'The authoritative documents are in the Go repository: docs/protocol/dh-v1.md (the protocol), docs/architecture.md and docs/trust-model.md, docs/runbooks/install.md and operations.md, the architecture decision records in docs/decisions/, and docs/BLUEPRINT.md for the status of every capability. /docs/ on this site summarizes them.' }
    ]
  },
  {
    slug: 'guides', title: 'Guides', group: 'Platform',
    oneLine: 'Step-by-step walkthroughs taken from the runbooks.',
    written: true, relatesToProduct: true,
    productNote: "Maps to /guides/, which follows the runbooks in the Go repository.",
    sections: [
      { heading: 'How this differs from Documentation', body: 'Documentation describes what each command and file does; guides walk through a task end to end -- a local cluster, a TLS install across machines, deploying your own executable, running chaos scenarios, verifying the audit ledger.' }
    ]
  },
  {
    slug: 'blog', title: 'Blog', group: 'Platform',
    oneLine: 'Engineering updates and release notes.',
    written: true, relatesToProduct: false,
    productNote: "No blog exists.",
    sections: [
      { heading: 'Where changes are recorded instead', body: 'The git history of the Go repository, and the validation records under evidence/ (indexed in evidence/INDEX.md), which keep every attempt -- including failed ones -- with the defects each found.' }
    ]
  },
  {
    slug: 'pillars', title: 'Topic Directory', group: 'Platform',
    oneLine: 'Browse all 69 topic pages in one place.',
    written: true, relatesToProduct: true,
    productNote: "This directory -- see /pillars/.",
    sections: [
      { heading: 'What this directory is', body: 'Reference pages on decentralized infrastructure, hosting and Web3 topics, grouped into four categories. Each page carries a note stating plainly whether the topic connects to what Decentralized.Host does. Most do not, and the pages say so.' }
    ]
  }
];

export const PILLAR_GROUPS: PillarGroup[] = ['Decentralized Infrastructure', 'Decentralized Hosting', 'Web3 & Blockchain', 'Platform'];

export function getPillar(slug: string): Pillar | undefined {
  return PILLARS.find((p) => p.slug === slug);
}
