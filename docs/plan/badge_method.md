# Jacky Chou (Indexsy) badge / awards method, adapted for Leeds Home Guide
Written 11 Nov 2026 (task d3a9e437). Nothing built, nothing sent.

## The videos (titles and links copied from YouTube)
1. **Getting DR90+ with Awards Link Building - BIP480** (main one, the full method)
   https://www.youtube.com/watch?v=OedUZSbTrAo  (published 20 Mar 2025, 12 min)
2. **Getting DR90+ on my directory - BIP503** (him doing it live on his B2B directory: badge page, embed code, email, follow ups, auto reply)
   https://www.youtube.com/watch?v=Udt0ambx9IM  (published 13 Apr 2025, 11 min)
3. Mentioned in passing: **My directory is FLYING, here's how I did it... - BIP488**
   https://www.youtube.com/watch?v=uUiOa6TyMTg  (he says his Eating Vancouver award outreach is "popping off" with backlinks, no numbers)

Source: YouTube's own auto captions for each video, read in full. His written email copy sits behind a signup sheet (marketingletter.com/bip-sheet); I did not sign up, so the email wording below is what he reads out on screen.
Live example of his badge page: https://www.eatingvancouver.ca/awards/

## His method, step by step
1. **Have a directory, ideally city level.** "Have a directory in a city... it works really well for Eating Vancouver because it's city specified." City level is easier than national.
2. **Pick niches with someone who runs the website.** Restaurants have in-house marketing people; he says roofers often won't know how to put a badge on a website, so with trades you "might even have to add people's award on their behalf".
3. **Scrape the businesses and their emails** (he uses Outscraper with the email option), clean the list (one row per email, drop rows with no email).
4. **Verify every email** before sending (NeverBounce, or "Vera mail"), export only deliverable = true. Otherwise "your emails are going to burn immediately".
5. **Never cold email from your main domain.** He buys separate unbranded sending domains in Instantly, about 30 emails per day per account, about 5 accounts per domain.
6. **Email 1 (his wording, as read out):** "Hi there, I'm happy to inform you that you've been voted for a very exclusive top [X] award by our readers over at website.com. Nothing to sell you, simply sharing the good news! Let me know if you want to showcase our badge on your homepage, I'll send over the link to the badge with instructions. [Name], website.com team." Subject in BIP503: "Top management company award" (he A/B tests subjects). Every line written in spintax (variants) so no two emails are identical.
7. **Follow ups (spintaxed too):** "Hi there, just wanted to follow up on the above" and then one "final follow up... if you don't respond it's all good".
8. **Anyone who says yes gets an automatic reply** (Instantly "subsequence"): "Congrats once again! Here's the info for displaying the badge on your site at no cost. You might want to share it with your web designer or developer." plus the link to the awards page.
9. **The awards page** (hidden from the site menu) shows the badge image, a box with the HTML embed code and a copy button "so there's less friction", and a "Need help? email us and we'll add it for you" line. Eating Vancouver's embed is a plain dofollow link to the homepage wrapping the badge image:
   `<a href="https://www.eatingvancouver.ca" target="_blank" title="Eating Vancouver Top Restaurant Award"><img src="https://www.eatingvancouver.ca/static/eating-vancouver-award.png" alt="Eating Vancouver Top Restaurant Award" width="200" height="auto"></a>`
   The link usually lands on the business's homepage, which is why he values it.

### Numbers and results (HIS CLAIMS, not checked)
- "restaurantguru.com got DR90 with this tactic" (he means top ~2,000 sites by Ahrefs DR).
- Set up "takes maybe 30 minutes max".
- His list was "20 something K" emails, needing about 50 sending accounts. He gives no reply rate.
- The one hard-ish number: in "Road to a $5k/mo DIRECTORY UPDATE - BIP517" (https://www.youtube.com/watch?v=WW2bxjruaxU, 27 Apr 2025) he counts Eating Vancouver at about 19 backlinks, "8 links built... from my award" outreach. So his own city directory got roughly 8 badge links in its first weeks, not hundreds.

### Tools he names
Outscraper (scrape + emails), NeverBounce / Veramail (verify), Instantly (sending domains, spintax, subsequences), Cursor / AI to clean the CSV and write the badge page CSS. All paid; none needed at our size.

### Pitfalls (from him, plus mine marked)
- Sending from your main domain gets it flagged as spam "forever" (his words).
- No verification = bounces = burned inbox.
- Trades are slower to add badges than businesses with marketing staff; offer to add it for them or send it to their web person.
- MINE: his email says "voted by our readers". Leeds Home Guide has no reader vote, so we must not say that. We say what is true: they are featured / recommended on our guide.
- MINE: Google's spam rules treat badge or widget links with keyword-stuffed or hidden anchors as a link scheme. Keep the alt text and title brand only ("Featured on Leeds Home Guide"), visible, one per site. My reading of Google's guidelines, not a test.
- MINE: UK PECR. Joseph's standing rule is Ltd/LLP only for cold email; sole traders count as individuals. For these 12 we are writing about a page that already features them, which is a softer case, but check entity type before sending anyway.

## Plan for Leeds Home Guide (for Joseph's OK, nothing done yet)
1. **Badge.** A small square or 200px wide PNG/SVG in the site's colours with the logo mark. Wording ideas:
   - "Featured on Leeds Home Guide 2026" (safest, true today)
   - "Recommended Roofer 2026, Leeds Home Guide" (one per trade: Roofer, Plumber, Electrician, Asbestos Removal)
   - "Leeds Home Guide Top Pick 2026"
   Avoid "#1", "Best", "Award winning" or "voted" unless we can stand behind it.
2. **Pages to build.** One hidden page, e.g. leedshomeguide.co.uk/featured-badge/ (noindex is fine, keep out of the menu): badge image, the embed code in a copy box, a line for their web person, and "Email us and we can send it to whoever runs your site". Optionally one badge per trade. The badge should link to the trade page they appear on (better for them and us than the homepage):
   - /trades/asbestos-removal/ (YAS, BLS Asbestos, Asbestos Yorkshire)
   - /trades/electricians/ (AJOB, Martin Day, CRE)
   - /trades/plumbers/ (BASI, LS1 Plumbing, Same Day Plumber Leeds)
   - /trades/roofers/ (DPR Roofing, Pickles Bros, The Family Roofing Company)
   YAS: Joseph can add it himself on asbestosremoval-leeds.co.uk (one link, fine; don't turn his sites into a network).
3. **Embed snippet** (plain link, dofollow because there is no rel attribute):
```html
<a href="https://leedshomeguide.co.uk/trades/roofers/" target="_blank" title="Featured on Leeds Home Guide 2026">
  <img src="https://leedshomeguide.co.uk/badges/featured-2026.png" alt="Featured on Leeds Home Guide 2026" width="160" height="160" loading="lazy">
</a>
```
   (Swap the trade path per firm. The image path is a placeholder until the badge is built.)
4. **Outreach.** Only 11 firms (12 minus YAS), so no Instantly, no spintax, no scraping. Send one by one from josephq@mail.tab.bot as Joseph Gough, after a check that each address works and each firm is a Ltd/LLP (or that Joseph is happy writing to a sole trader about their own listing). One short follow up after 5 to 7 days, then stop. Every new firm added to the guide gets the same email. Draft, UK English, for Joseph's OK:

   **Subject:** You're featured on Leeds Home Guide

   Hi [first name or team],

   Good news: [Business name] is one of the [roofers] we recommend on Leeds Home Guide, our guide to trusted home and trade services in Leeds. You can see your listing here: [trade page URL]

   Nothing to buy and no catch, we just wanted to let you know.

   If you'd like to show it on your website, we've made a small "Featured on Leeds Home Guide 2026" badge. Reply and I'll send it over with the code to paste in, or I can send it straight to whoever looks after your site.

   Thanks, and congratulations.

   Joseph
   Leeds Home Guide
   https://leedshomeguide.co.uk

   **Follow up (one only):**
   Hi [first name], just following up on the note below about your Leeds Home Guide listing. If you'd like the badge for your site, just reply and I'll send it. If not, no problem at all.
   Joseph

   **Reply to a yes:**
   Brilliant, thanks [first name]. Here's the badge and how to add it: [badge page URL]. Copy the code in the box and paste it onto your homepage or wherever you'd like it to show. If it's easier, forward this to your web designer, or send me their email and I'll send it to them.
   Joseph

   Optional first: fix hello@leedshomeguide.co.uk forwarding so replies to the site's own address reach Joseph.
5. **Track** it in a small sheet: firm, email, sent date, follow up date, reply, badge live (URL), link dofollow yes/no (check their page after they say done).

Realistic note: with 11 firms, expect a handful of badges at best (my guess, untested). The method scales with the number of firms listed, so adding more firms to the guide is what grows it.


## Email signature (Joseph Nov 11 9:44 AM m:e481ea10)
Joseph wants a professional signature with the LHG logo. Make an LHG logo (PNG) and an HTML signature (logo, Joseph Gough, Editor, Leeds Home Guide, hello@leedshomeguide.co.uk, leedshomeguide.co.uk) and set it in the Zoho hello@ inbox for replies and follow ups. FIRST cold email: text-only signature (name, Leeds Home Guide, site address as plain text, no image, no link) to protect deliverability on the new inbox; switch to the logo signature once the warm up is done (~week 2). Show Joseph both in the Friday bubble.
