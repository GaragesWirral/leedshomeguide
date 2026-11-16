# Leeds Home Guide: handover for a new chat

Last updated 16 November 2026. Read this first, then `docs/plan/`.

**First task in a new chat:** if `docs/plan/`, `docs/sources.md` or `docs/tools/` are missing from the repo, they are in `leeds-home-guide-handover.zip`. Joseph will attach it; it is also in his `Projects/lhg-transfer` folder and in `Projects/leedshomeguide/docs`. Commit its `docs/` folder to this repo first.

## 1. What the site is

- **Site:** https://leedshomeguide.co.uk. A "best of Leeds" directory of local trades, with job pages and UK cost guides.
- **Code:** this repo, `GaragesWirral/leedshomeguide`. Astro static site.
- **Hosting:** Cloudflare Pages. **Merging into `main` deploys the live site automatically** in about 2 minutes.
- **Pull requests:** every PR gets a Cloudflare preview at `https://<branch>.leedshomeguide-9w5.pages.dev/`. Use it to check and score pages before merging.
- **Owner:** Joseph. He merges, or tells you to merge. Never merge without his clear OK in the chat.
- **Email:** hello@leedshomeguide.co.uk (Zoho Mail, separate Zoho account, set up 14 Nov 2026).
- **Cloudflare:** the account was set up by Tab (another AI assistant). Joseph is moving it to his own account.

## 2. Status on 16 Nov 2026

| | Live | Planned total | Left |
|---|---|---|---|
| Trade pages | 22 | 75 | 53 |
| Job pages | 24 | 92 | 68 |
| Cost guides | 18 (plus 2 Leeds guides) | 91 | 73 |

**Trades live:** Plumbers, Electricians, Roofers, Asbestos removal, Locksmiths, Skip hire, Carpet cleaning, Asbestos surveys, Removals, Cleaners, Damp proofing, Pest control, Window cleaners, Garage removal, Handyman, Rubbish removal and house clearance, Painters and decorators, Gardeners, Plasterers, Man and van, Blinds and shutters, Builders.

**Weeks 1 to 6 of the plan are done.** Weeks 1 to 4 were merged from the `rollout-month-1` branch, weeks 5 and 6 in PR #1, NeuronWriter boosts in PRs #2 and #3.

**NeuronWriter scores (week 5 and 6 pages, 16 Nov):** all 20 between 71 and 80. Month 1 pages scored 61 to 74 when built; they have not been rescored or boosted to 70 yet. That is the first job for the new chat (see section 9).

## 3. How the code works

| What | Where |
|---|---|
| Trade groups and which trades are live | `src/data/trades.json`. A trade with `"listing": "<key>"` has a page. Without it, it shows as "coming soon". |
| Trade page content and firms | `src/data/listings/<key>.json` |
| Job pages | `src/data/jobs.json` (array `jobs`, each with `trade` = listing key and `slug`) |
| Cost guides and other guides | `src/content/articles/<slug>.md` (front matter: title, h1, description, kicker "Costs", category, updated, updatedISO, quick {label, value, note}, related = trade key, sources [], faqs []) |
| Trade page template | `src/pages/trades/[slug].astro` and `src/components/TradePage.astro` |
| Icons per trade | `src/lib/data.ts` (`icons`) |
| Homepage tiles, short lines, search map, "who do I need" list | `src/pages/index.astro` (`short`, `which`, the `map` in the search script) |
| Firm logos | `public/firm-logos/<domain>.webp` (cards fall back to a letter tile) |
| Tests | `test/site.test.mjs`, run against `dist/` |

**URLs:** `/trades/<slug>/`, `/trades/<slug>/<job>/`, `/guides/<slug>/`. Keep them; never change a live URL.

**Build and test:**
```
npm install
PREVIEW=0 npx astro build
node --test test/site.test.mjs
```
The tests check 3 firms per live trade, unique titles, no banned words (for example "vetted"), links and so on. All 23 must pass before a PR.

### Listing JSON fields (one trade)
`name, title, slug, kicker, intro, services_hint, seo_title, seo_desc, h1, list_label, checks[3], expert_tip{by, src, url, body} (optional), firms[3], guide[{h2, p[] or ul[]}], faqs[{q, a}]`

Each firm: `name, domain, url, phone, area, rating{score, count, url (Google Maps search link), read}, claims[], services[3], why, logo_bg`.

**Card style (Joseph's decision, 14 Nov):** no "(per website)" or "(checked date)" tags on cards. Claims look like:
- `G Swailes Painter and Decorator Ltd: Companies House 14763870, active since 2023`
- `Member of the Federation of Master Builders, listed on the FMB register`
- `No limited company matched on Companies House under this name`

## 4. Rules (never break these)

1. Max **3 firms per trade**.
2. Every cost guide price comes from a **named real UK source**, read on the day. Record it in `docs/sources.md`.
3. **Never invent** reviews, quotes, ratings, accreditations, years trading or anything else. If you could not check it, leave it out.
4. Paid spots are labelled **Sponsored** and linked with `rel="sponsored"`.
5. **UK English. No hyphens or dashes** in prose (write "made to measure", "one off", "two storey").
6. **One main keyword per page.** Check the plan CSVs and existing titles before adding a page, so two pages never target the same search.
7. **No thin templated pages.** No auto generated area x trade pages.
8. **NeuronWriter score 70 or more on every page.**
9. Show Joseph **phone screenshots** before pages go live (Playwright, iPhone 13).
10. Google ratings are shown without the date read.
11. Do not list Joseph's own rank and rent lead sites as firms (for example garageremovaldemolitionleeds.co.uk, garageremovalleeds.co.uk).
12. Exclude firms that are dissolved, in liquidation or with an active proposal to strike off on Companies House.
13. Ask Joseph before using his DataForSEO account; he sets a spend limit each time.
14. Badge emails and outreach are **not** this job. The job is building the site, SEO and making it look good.

## 5. Weekly workflow (what a "week" of rollout is)

Each week: **3 trades, 4 job pages, 3 cost guides** (Joseph's decision 12 Nov: 3 cost guides a week). Follow the order in `docs/plan/*.csv`, rows with `status = todo`, top first. A job page never goes live before its trade page.

1. **NeuronWriter queries:** create one per new page's main keyword (section 7).
2. **Find firms** for each new trade:
   - Google Maps / local pack for "<trade> leeds": strong rating and review count, a real website, based in Leeds.
   - Google blocks heavy automated searching (CAPTCHA). Do not bypass it. Bing works for finding sites.
   - Check each firm's own website for services, phone and claims.
   - Check **Companies House** (find-and-update.company-information.service.gov.uk) for the company number, status and incorporation date.
   - Check trade registers where they apply: Gas Safe, NICEIC, NAPIT, TrustMark, FMB (fmb.org.uk "find a builder"), MLA, HSE licensed asbestos list, BPCA and so on. Only say "member" if the register shows it.
3. **Read cost sources** for each guide: the URLs are in `docs/plan/cost_guides_rollout.csv` (Checkatrade, MyBuilder, gov.uk, Planning Portal, Leeds City Council and others). Note figures and the "updated" date in `docs/sources.md`.
4. **Write** listings, jobs and guides. Add the trades to `trades.json`, icons to `data.ts`, and the homepage short line and search terms to `index.astro`. Replace any "coming in a later update" placeholders that the new guides answer.
5. **Build and test.** Run the NeuronWriter gap check and boost until 70+ (score the PR preview URL).
6. **Phone screenshots** to Joseph.
7. **Branch, PR, preview**, then merge when Joseph says so.

## 6. SEO standards

From Joseph's SEO brief (`docs/plan/SEO_brief_Leeds_site.md`, in summary):

- **Title:** main keyword near the start, about 60 characters, the year where it fits. Example: `Plasterer in Leeds: 3 Local Plastering Services (2026)`.
- **Meta description:** 140 to 155 characters, keyword once, a reason to click.
- **H1:** one per page, containing the main keyword.
- **Opening:** main keyword in the first 100 words.
- **Headings:** H2s that answer real questions, and use NeuronWriter's H2 terms.
- **Links:** internal links in the body to the parent trade, the job pages, related trades and cost guides, with descriptive anchor text.
- **Schema:** already built in the templates (Organization, WebSite, Breadcrumbs, ItemList of LocalBusiness, Article, FAQPage).
- **Keyword types:**
  - Trade pages target "<trade> leeds".
  - Job pages target "<job> leeds".
  - Cost guides target "<job> cost" (UK searches).
- **Keyword choice:** prefer buyer intent over raw volume. Check the SERP before choosing a keyword. Example: "skimming leeds" returned car body repair results, so that page now targets "skimming plasterer leeds".

## 7. NeuronWriter

- **Project:** `7cba57c80fa099d5` (leedshomeguide.co.uk).
- **Query IDs:** `docs/neuronwriter_queries.json`, keyword to query ID, 63 so far. Add each new query you create.
- **API key:** in Joseph's NeuronWriter account (Profile > API). Joseph gave it in chat; **do not commit it to this repo.**
- **How to call it:**
  - The cloud workspace and the device shell cannot reach the NeuronWriter API (the proxy blocks it).
  - What works: open https://app.neuronwriter.com in the browser and run `fetch()` from that page to `/neuron-api/0.5/writer/<endpoint>` with header `X-API-KEY`.
  - Endpoints:
    - `new-query`: body `{project, keyword, engine: "google.co.uk", language: "English"}`.
    - `get-query`: body `{query}`. It returns `terms.title / h1 / h2 / content_basic (with sugg_usage) / content_extended`. The output is huge, so summarise it in the browser.
    - `evaluate-content`: body `{query, url, html: ""}`, which scores a live or preview URL, or `{query, html}` for raw HTML. It returns only `content_score`.
  - The NeuronWriter connector (MCP) tools also exist in Cowork and can be used instead.
- **Gap check (what made every page reach 70+):** `docs/tools/nw_gap_check.js`.
  - It runs on the app.neuronwriter.com page.
  - It fetches each page's HTML (leedshomeguide.co.uk allows it) and the query's terms.
  - It lists terms under their suggested count, extended terms missing from the body, and title and H2 terms missing.
  - Then fix the title, rename H2s to include missing H2 terms, and add one natural section covering the missing body terms.

## 8. Cost source notes

`docs/sources.md` has every figure read so far, with source and date: boiler, locksmith, skip hire, asbestos survey, EICR, roof replacement, damp survey, asbestos removal, carpet cleaning, garage demolition, removals, pest control, cleaner, house clearance, window cleaner, extension, planning (Planning Portal £548 householder fee from 1 Apr 2026, Leeds pre app £156), handyman, skimming. Reuse them where they fit, but reread a source if it is more than a few weeks old.

## 9. To do next (in this order)

1. **Rescore month 1 pages** (the 12 trades, 16 jobs and 12 guides from weeks 1 to 4) and boost any below 70. Query IDs are in `docs/neuronwriter_queries.json`.
2. **Week 7** (from `docs/plan`):
   - **Trades:** Self storage, Carpet fitters, Appliance repair.
   - **Jobs:** Leak repair, Lock change, Hedge cutting, Asbestos garage roof removal (a Leeds guide already exists at `/guides/asbestos-garage-roof-removal-leeds/`: do not compete with it, check before writing).
   - **Cost guides:**
     - Self storage cost Leeds.
     - Boiler service cost: belongs to week 8's gas engineer trade, so it goes with week 8 unless the trade page is built first.
     - Gutter cleaning cost: its trade page comes later, so link it to Window cleaners and Roofers for now.
3. **Week 8:**
   - **Trades:** Joiners and carpenters, Gas and heating engineers, Landscapers.
   - **Jobs:** Boiler service, Boiler repair, Boiler installation, Internal doors.
4. **Gaps on live cards:**
   - Google ratings are missing for TJD Building Solutions, Masonwood and Gardener in Leeds (Google was blocking automated searches on 16 Nov).
   - Gardener in Leeds has no phone number on its website.
   - L.R Decorators' website did not load on 16 Nov; recheck it.
5. **Firm logos** for the week 5 and 6 firms (`public/firm-logos/`).
6. **Not started yet, for Joseph's OK:**
   - Search Console (sitemap.xml).
   - og:image share images.
   - A "For trades" page and the listing form.
   - The badge page (method in `docs/plan/badge_method.md`).
   - Area hub pages.
   - A local news page.

## 10. Prompt to paste in the new chat

> Read docs/HANDOVER.md in GaragesWirral/leedshomeguide and follow it. First rescore the month 1 pages in NeuronWriter and boost any below 70, then start week 7 of the rollout. Open a PR for each batch, score the Cloudflare preview, send me phone screenshots, and wait for my OK before merging. My NeuronWriter API key is: <paste it here>.
