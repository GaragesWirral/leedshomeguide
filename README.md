# Leeds Home Guide

Astro static site for https://leedshomeguide.co.uk. With PREVIEW=1 (the default) every page is noindex and robots.txt blocks crawlers; build with PREVIEW=0 for the live site.

**Cloudflare Pages settings:** framework preset Astro, build command `npx astro build`, output directory `dist`, environment variable `PREVIEW=0`, Node 20 (`NODE_VERSION=20`).

Build: `npm install && npm run build`, then `node --test test/site.test.mjs` (reads `dist/`).

## Site settings

`src/site.config.ts` holds the site wide settings. Change a value there and every page updates.

- `CONTACT_EMAIL` is `hello@leedshomeguide.co.uk`. The domain is bought (Namecheap, Nov 2026).
  **Set up hello@ as a forwarding address** (most registrars
  offer free email forwarding) to whoever handles messages, and send a test email. Until then mail
  to this address goes nowhere. It is used on Contact, Privacy and Get listed.
- Buy the domain with WHOIS / domain privacy on. The site names no person, address or phone:
  Privacy says only "Leeds Home Guide".

## Expert tips

Each trade page (`src/pages/trades/[slug].astro`, `expertTips`) and the garage roof guide carry one
"Expert tip" box. Each tip is our own paraphrase of a public authoritative source, credited with a
link (HSE, Citizens Advice, Electrical Safety First, Leeds City Council). Tips are never attributed to
a listed firm and never quote a named person.

## Contact form

The form on /contact/ is disabled ("Form coming soon"). No third party form service is wired up yet.
