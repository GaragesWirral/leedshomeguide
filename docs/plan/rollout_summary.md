# Leeds Home Guide rollout plan (11 Nov 2026)

This is a plan only. Nothing on the site was changed.

Files:
- trades_rollout_2026-11-11.csv: 75 trades (4 already live, 71 new), 3 a week, weeks 1 to 24
- job_pages_rollout_2026-11-11.csv: 92 job pages, 4 a week, weeks 1 to 23
- cost_guides_rollout_2026-11-11.csv: 91 cost guides, 2 a week, weeks 1 to 46 (weeks 25 to 46 are guides only, May to Sep 2027)
- lhg_rollout_plan.pdf: 2 phone-sized pages showing each week's trades, jobs and guides
- data/dfs_leeds_volumes_2026-11-11.csv and data/dfs_uk_cost_volumes_2026-11-11.csv: the raw search volumes

Week 1 is w/c 16 Nov 2026.

## First 4 weeks
- Week 1 (w/c 16 Nov): trades Locksmiths, Skip hire, Carpet cleaning. Jobs: Emergency locksmith, Car locksmith, uPVC door lock repair, Emergency plumber. Guides: Locksmith cost, New boiler cost.
- Week 2 (w/c 23 Nov): trades Asbestos surveys, Removals, Cleaners. Jobs: Asbestos testing, Artex & asbestos ceiling removal, Roof repair, Emergency electrician. Guides: Asbestos survey cost, Skip hire cost (Leeds).
- Week 3 (w/c 30 Nov): trades Damp proofing, Pest control, Window cleaners. Jobs: Damp survey, Condensation & ventilation, Rising damp treatment, Wasp nest removal. Guides: Damp survey cost, EICR cost.
- Week 4 (w/c 7 Dec): trades Garage removal, Handyman, Rubbish & house clearance. Jobs: Shed & outbuilding removal, House clearance, Mini skip hire, Grab hire & wait-and-load. Guides: Garage demolition cost, Roof replacement cost.

## How the order was set
- **Trades**: sorted by monthly Leeds searches, most first. That's the highest "X leeds" variant plus "X near me", both searched from Leeds.
  - Three of your own specialist trades were moved earlier, one a week in weeks 2 to 4: Asbestos surveys, Damp proofing and Garage removal. They're the pages that can link on to YAS and your garage removal pages.
  - Self storage was moved down to the Medium trades. It gets 1.3K Leeds searches, but chains dominate it and few firms there will want the badge.
- **Job pages**: each week has 4. The first is the best job from that week's new trade, and the rest are the most-searched jobs whose trade page is already live. A job never launches before its trade page.
- **Cost guides**: each week has 2. The first is for the busiest trade page that doesn't have a guide yet. The second is the most-searched guide left whose trade page is live.
  - New boiler cost (8.1K UK searches a month) goes in week 1 and links from Plumbers, because the homepage already has a "New boiler: coming soon" card.
- **Priority**:
  - Trades: High at 500+ Leeds searches or one of your own trades, Medium 150 to 499, Low under 150.
  - Jobs: High at 200+ or one of your own, Medium 50 to 199, Low under 50.
  - Guides: High at 2,000+ UK searches or one of your own, Medium 500 to 1,999, Low under 500.

## Where the numbers come from
- `leeds_monthly_range_kp_8nov` / `uk_range_kp_8nov`: ranges from our Keyword Planner export of 8 Nov (files/seo/leeds_keywords_kp_2026-11-08.csv). It covers 81 keywords, so most rows say "unknown".
- `*_searches_dfs`: the gap needed real numbers to put things in order, so I ran one DataForSEO pull (Google Ads search volume, 12-month average) on 11 Nov.
  - 417 keywords searched from Leeds, plus 238 cost keywords UK-wide.
  - It was 2 calls costing $0.18 in total, under the $0.50 limit.
  - Where both sources cover a keyword they agree (for example locksmith leeds: KP 1K to 10K, DataForSEO 1,900). One exception: bathroom fitters leeds is 100 to 1K in KP but 30 here.
- Google gives no volume for damp terms (damp proofing, damp survey, rising damp), and the 8 Nov export had none either. These say "no data", which means unknown, not zero.
- Google merges close variants (plumber/plumbers leeds), so the highest one is used rather than adding them up.
- Some trade numbers include shop searches ("carpets leeds", "blinds leeds"). The CSV notes say which.

## Cost guide sources
- Every guide has at least one real UK source page: Checkatrade or MyBuilder cost guides, plus gov.uk, Ofgem, Energy Saving Trust, HSE, Gas Safe Register, RICS, Planning Portal, Which? and Leeds council pages where they apply.
- I found these through search on 11 Nov and haven't read them in full yet.
  - The official ones loaded (200).
  - Checkatrade and MyBuilder block scripted fetches (403), so open them in a browser when writing.
- No prices are in this plan. Each guide should say it gives UK ranges from the named sources and show the date they were read, unless we collect real Leeds quotes.
- Recheck grant amounts (Boiler Upgrade Scheme, insulation schemes) on gov.uk/Ofgem the day the guide is written.

## Left out (US-only on HomeGuide)
AC/HVAC installation and tune-ups, ADU contractors, swimming pool builders, septic tanks, termite control, siding, hurricane shutters, sprinkler systems, snow removal, home inspectors (US-style), well drilling, storm shelters and the like.

## Live now (no new page needed)
- Trades: Plumbers, Electricians, Roofers, Asbestos removal.
- Guides: asbestos garage roof removal (Leeds) and selective licensing (Leeds).

## Duplicates removed from the job list
These would have repeated a trade page: asbestos survey, garage demolition, house removals, blocked drains, air source heat pumps. Office cleaning and office removals were also cut, because this is a home guide.

## Later phase (not planned yet)
Area pages, one per job (for example "emergency plumber Horsforth"), as Joseph said. They come after the job pages are live.
