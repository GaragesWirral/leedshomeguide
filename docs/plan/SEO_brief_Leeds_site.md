SEO BRIEF FOR THE NEW LEEDS "BEST OF" TRADES SITE
(For Claude to build from. Written 12 Nov 2026 from: the asbestos site SEO audit of 3 Nov 2026, the All Right network research of 11 Nov, the HomeGuide comparison of 11 Nov, and what we learned building Leeds Home Guide.)

THE GOAL
Rank on page 1 in Leeds for "best [trade] Leeds", "[trade] Leeds", "[trade] near me", "[job] Leeds" and "[job] cost" searches. Then sell clearly labelled featured spots to the firms listed. Every decision below serves that.

LESSONS FROM THE AUDIT (what held the asbestos site back, so do not repeat it)
1. Authority, not on-page, is what stalls rankings on pages 3 to 5. Plan links and citations from day one (see section 9).
2. One page per search. Six asbestos pages competed for "asbestos removal Leeds" and none won. Every page must have ONE main keyword that no other page targets. Keep a keyword map (sheet: URL, main keyword, secondary keywords) and check it before adding any page.
3. No templated thin pages. 120 suburb x service pages drew 7% of impressions and 54 drew none. Google's spam policy targets scaled template pages. Never auto-generate area x trade pages. Only make a page when it has real, unique content.
4. Claims must be checkable. Every badge, rating, licence or "years in business" needs a source a reader can click. Never invent anything.
5. Small technical faults add up: a typo in every H1 from the template, a meta description cut off at 178 characters, a font file loading twice and blocking the page, a sitemap with no last-modified dates, a footer still saying © 2025.
6. Mobile is where the calls come from. All clicks were mobile. Build and test mobile first.

1. TECHNICAL SETUP
- Static site (Astro or similar) on Cloudflare Pages. Fast by default. Aim for Lighthouse 90+ on mobile, LCP under 2.5 s, CLS under 0.1.
- HTTPS only. One version of the domain (non-www OR www), the other 301 redirects to it.
- Clean URLs, lowercase, no dates: /plumbers/, /plumbers/emergency-plumber/, /costs/boiler-replacement-cost/, /areas/headingley/, /guides/how-to-choose-a-roofer/.
- Trailing slash consistent everywhere.
- Every page: a self-referencing canonical tag, meta robots index,follow (except thank-you pages, search results and admin: noindex).
- XML sitemap at /sitemap.xml with a lastmod date on every URL, updated on each build. Linked in robots.txt. Submit it in Search Console.
- robots.txt: allow everything public, block only admin and form thank-you pages.
- Custom 404 page with links to the main trades.
- No render-blocking fonts or scripts. Self-host fonts (woff2, font-display: swap), load each font file once.
- Images: WebP/AVIF, width and height set, lazy-loaded below the fold, descriptive file names and unique alt text (never the same alt text twice).
- Breadcrumbs on every page below the homepage.
- Open Graph and Twitter tags with a share image on every page (Leeds Home Guide was missing og:image).
- GA4 plus a "generate_lead" event when any form is sent, and a click event on phone and website buttons for each firm. These numbers are what you show firms when selling featured spots.
- Search Console from day one, on its own Google account.

2. SITE STRUCTURE (hub and spoke)
Home
 > Trades hub (/trades/), grouped: Repairs, Heating and energy, Home improvements, Outdoor and garden, Cleaning and moving, Specialist
   > Trade page: "Best [trade] in Leeds 2026" (/plumbers/)  <- main money page
     > Job pages under the trade (/plumbers/emergency-plumber/, /plumbers/boiler-installation/)
 > Cost guides hub (/costs/)
   > Cost guide per job ("Boiler replacement cost UK 2026")
 > Guides hub (/guides/): how to choose, what to check, hiring tips
 > Areas (later): hub pages for Headingley, Horsforth, Chapel Allerton, Roundhay, Kirkstall
 > For trades (/for-trades/): free listing, badge, featured spot, listing form
 > About, How we choose, Contact, Privacy, Terms, Advertising disclosure
No page more than 3 clicks from the homepage.

3. KEYWORDS
- Main keyword per trade page: "[trade] Leeds" (it also catches "best [trade] Leeds").
- Job pages: "[job] Leeds" (e.g. emergency plumber Leeds, roof repair Leeds, boiler installation Leeds, resin driveway Leeds).
- Cost guides: "[job] cost" (UK wide searches, much bigger volume than Leeds ones).
- Order of building: most searched in Leeds first. The ready ranked lists are in the trades, job pages and cost guides rollout sheets already sent.
- Never two pages on one main keyword. Check the keyword map first.

4. ON-PAGE RULES (every page)
- Title tag: main keyword near the start, under 60 characters, the year where it fits. Example: "Best Plumbers in Leeds 2026: 6 Checked Local Firms".
- Meta description: 140 to 155 characters, main keyword once, a reason to click, a call to action. Never repeat the keyword 3 times.
- One H1 containing the main keyword (different wording from the title is fine). Check the template for typos.
- Main keyword in the first sentence (first 100 words).
- H2s and H3s that answer real questions (use People Also Ask and NeuronWriter terms).
- Short paragraphs, lists and tables. Real "Last updated" date that changes when the page changes.
- Optimise each page with NeuronWriter for its keyword (content score in the green), but write for people.
- UK English. No dashes.
- Internal links in the body to the parent, the children and related pages, using descriptive anchor text (not "click here").

5. TRADE PAGE TEMPLATE (the money page; modelled on All Right, done honestly)
1. H1 "Best [Trade] in Leeds 2026" + byline (real editor name) + "Last updated [date]"
2. Quick answer box: the top picks in 2 to 3 lines
3. "How we chose" box: the real criteria for this trade (Companies House, accreditations checked on the official register, Google rating and review count, years trading, areas covered)
4. Jump list of the firms
5. For each firm: name, short honest summary (150 words, our words, no invented experience), what they do, areas covered, address, phone, opening hours, website button, Google rating + review count with the date we read it and a link to their reviews, accreditations with links to the register, pros and cons
6. A clearly labelled "Featured" or "Sponsored" spot at the top when a firm pays (link with rel="sponsored")
7. Cost box: typical prices for this trade, linking to the full cost guide
8. Hiring tips: what to ask, red flags, what certificates to check
9. FAQ (5 to 8 real questions)
10. Related: job pages under this trade, related trades, related cost guides
11. "Get quotes" form and "Is your firm missing? Get listed" link
Length: about 1,800 to 3,000 words. All Right's ranking lists run 1,900 to 3,800.

6. JOB PAGES AND COST GUIDES
- Job page: the same layout as the trade page but focused on one job (who in Leeds does it, typical cost, how long, what to check, FAQ). Never live before its trade page.
- Cost guide: headline price range up top, a cost table by job size, what changes the price, call-out and hidden costs, regional note for Leeds/Yorkshire, FAQ, "updated" date, and links to the Leeds firms. Every price from a named UK source (Checkatrade, MyBuilder, Which?, Ofgem, gov.uk) with the date read. Never invented.

7. SCHEMA (JSON-LD)
- Site wide: Organization (name, logo, url, sameAs to socials, contact email) and WebSite.
- Every page: BreadcrumbList.
- Trade and job pages: ItemList where each item is a LocalBusiness (name, address, telephone, url, areaServed, openingHours). Do NOT add aggregateRating or review markup for third-party firms; Google treats self-serving or third-party review markup as spam and can ignore or penalise it.
- Guides and cost guides: Article (headline, author as a Person with a profile page, datePublished, dateModified, publisher).
- FAQ blocks: FAQPage (Google rarely shows them now, but it does no harm).
- Test every template in Google's Rich Results Test.

8. TRUST (E-E-A-T)
- A real "About" page: who runs it, why, the real editor (Joseph Gough, Editor), a photo, contact details.
- A "How we choose firms" page that explains the checks. Link it from every list.
- An "Advertising disclosure" page: what is paid (featured spots), what is free, that paid spots are labelled. UK law (DMCC Act 2024, CAP Code) requires paid placements to be labelled.
- Branded email (hello@domain), not Gmail. A real contact page.
- Real dates. No invented reviews, quotes, testing or "we tried them".
- Author box on every article linking to the author page.

9. AUTHORITY (links) FROM DAY ONE
- The badge: every listed firm gets a "Featured on [site] 2026" badge with embed code linking back. This is where All Right Leeds gets most of its links (28 of its 36 real linking sites are badges).
- Email the badge to every firm listed (Ltd/LLP only for UK email rules). First email has no links.
- Local citations for the site itself (free directories, Leeds business directories).
- Broken link outreach: find dead links on Leeds pages (community sites, councils, residents' groups) and offer a working page. This won the asbestos site a dofollow link from Headingley Development Trust.
- Journalist requests (Qwoted, Featured, SourceBottle): answer home improvement questions as the editor.
- Parasite and Google Docs links pointing at key pages, as we do for asbestos.

10. INTERNAL LINKING
- Every trade page links to its job pages and cost guides, and back.
- Every cost guide links to the matching trade page with the keyword as anchor ("plumbers in Leeds").
- Each page ends with three blocks: related trades, related jobs, related cost guides (this is how HomeGuide spreads strength across 1,000+ pages).
- The homepage links to every trade group and the top trades.
- No orphan pages (every page linked from at least one other page).

11. AREAS (later, carefully)
Only make area hub pages with real local content: housing types, conservation areas, which listed firms cover the area, local job examples. No area x trade copy pages. Start with Headingley, Horsforth, Chapel Allerton, Roundhay, Kirkstall.

12. WHAT TO MEASURE (monthly)
Search Console: impressions, clicks, average position per page, and which searches each page ranks for. GA4: form leads, phone and website clicks per firm. These are what you show a firm when you offer a featured spot.

13. CHECKLIST BEFORE EACH PAGE GOES LIVE
[ ] One main keyword, not used by any other page
[ ] Title under 60 characters, meta description 140 to 155
[ ] One H1, keyword in the first sentence, no template typos
[ ] NeuronWriter score green
[ ] Every firm fact and price has a source and date
[ ] Paid spots labelled, links rel="sponsored"
[ ] Schema passes the Rich Results Test
[ ] Linked from its parent and at least 2 related pages
[ ] Images compressed, alt text unique
[ ] Checked on a phone
[ ] In the sitemap with today's lastmod
