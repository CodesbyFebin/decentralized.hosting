# Decentralized.Host -- Marketing Site

The marketing/content site for [Decentralized.Host](https://decentralized.host), built with
Next.js 16 (App Router) and statically exported at build time -- every route, including all 69
pillar pages under `data/pillars.ts`, is real prerendered HTML, not a client-rendered shell.

## Stack

- **Next.js 16**, App Router, `output: 'export'` (fully static HTML/CSS/JS in `out/`, no Node
  server required)
- React 19, Tailwind CSS v4 (`@tailwindcss/postcss`)
- Content lives in `data/` (`registry.ts` is the single source of truth for every page's
  title/description/canonical/schema; `pillars.ts` holds the 69-page topic directory)

## Run locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

Produces a fully static `out/` directory. `app/sitemap.ts`, `app/robots.ts`, and the
`llms.txt`/`llms-full.txt`/`openapi.json` route handlers are all generated from the same
`data/registry.ts` source of truth at build time -- no separate pre-build script.

## Type check

```bash
npm run lint
```
