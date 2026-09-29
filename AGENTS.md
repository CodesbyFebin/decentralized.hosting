# AGENTS.md

project:
  name: decentralized.hosting
  repository: https://github.com/CodesbyFebin/decentralized.hosting
  domain: self-hosted-deployment
  status: phase-1-and-2-mvp
  license: MIT

summary:
  statement: Runnable self-hosted deployment mesh with a FastAPI control plane, Docker node agent, Traefik edge, local registry, dhost CLI, and optional Solana-devnet operator credits.
  source_of_truth: README.md

implemented:
  - FastAPI control plane
  - PostgreSQL state
  - Docker node execution
  - Traefik edge routing
  - local container registry
  - dhost CLI
  - resource-aware multi-node scheduling
  - snapshot-based deployment history and rollback
  - Git SSH deployment
  - MCP server backed by the control-plane API
  - web dashboard and Launchpad
  - optional Solana devnet operator credits
  - production Let's Encrypt TLS path

explicit_limits:
  - project status is Phase 1 and 2 MVP
  - confidential-computing enclaves are later-phase work
  - mainnet credit migration is later-phase work
  - Solana integration is optional, off by default, and devnet-only
  - sandbox reference entries are not all one-click deployable
  - do not infer production traffic, uptime, customer count, or deployment scale

verification:
  overview: README.md
  deployment: DEPLOY.md
  blockchain: blockchain/README.md
  mcp: mcp-server/README.md
  security: SECURITY.md
  machine_summary: llms.txt

rules_for_agents:
  - Preserve the distinction between implemented Phase 1/2 capabilities and roadmap work.
  - Never describe devnet credits as mainnet or real-funds operation.
  - Do not present reference-only sandbox entries as deployable.
  - Do not infer production scale or commercial adoption.
  - Prefer repository code and documented interfaces over marketing language.
