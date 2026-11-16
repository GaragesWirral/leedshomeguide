# Home news: how to add and update stories

Stories live in `src/content/news/<slug>.md`. The hub is `/news/`, each story is `/news/<slug>/`, and the 3 newest show on the homepage. The sitemap uses each story's `dateISO` as its lastmod.

## Front matter
`title` (60 chars max), `h1`, `description` (140 to 155 chars), `topic` (Energy and EPC, Grants, Renting, Planning, Leeds council, Bins and waste, Building safety), `date` ("16 November 2026"), `dateISO`, `summary` (one or two sentences), `related` (trade listing key), `guides` (guide slugs), `sources` [{name, url, read}].

## Before you commit
Run `git fetch --depth=1000 origin main` if the clone is shallow, then `npm run lastmod`, so the sitemap gives each story its real date.

## Rules
- Every fact comes from an official source read on the day: GOV.UK, the Housing Hub, Ofgem, Planning Portal, Leeds City Council (news.leeds.gov.uk, leeds.gov.uk). Trade press is for finding stories, not for facts.
- Put the source date in the source name where it has one, and the date we read it in `read`.
- Rewrite in our own words. No copied paragraphs.
- UK English, no dashes. Link to the trade pages and cost guides that help with the story.
- Leeds first: say what the change means for a Leeds homeowner or landlord.
- If a story goes out of date (a deadline passes, a grant ends), add a short update line at the top with the date rather than deleting it.

## Where to look each month
- GOV.UK news for MHCLG (housing, planning, renting) and DESNZ (EPC, grants, energy)
- GOV.UK Housing Hub (Renters' Rights Act phases)
- Boiler Upgrade Scheme, Warm Homes Plan and Warm Homes Loan pages
- Planning Portal news (fees, permitted development)
- news.leeds.gov.uk (housing, bins, roads, planning, licensing, council tax) and Leeds executive board agendas
- Ofgem price cap announcements
- Building Safety Regulator and Gas Safe news

## Story ideas already spotted (not yet written)
- Ofgem energy price cap for January to March 2027
- Leeds affordable housing strategy 2026 to 2036
- EPC reform and the Home Energy Model (new EPC format, delayed)
- Renters' Rights Act: landlord ombudsman timing
