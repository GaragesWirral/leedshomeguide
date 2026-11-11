import { test } from 'node:test';
import assert from 'node:assert';
import { readFileSync, existsSync } from 'node:fs';
const OUT = process.env.OUT || 'dist';
const pages = ['index.html', 'trades/roofers/index.html', 'trades/plumbers/index.html', 'trades/electricians/index.html', 'trades/asbestos-removal/index.html', 'guides/asbestos-garage-roof-removal-leeds/index.html', 'guides/selective-licensing-leeds/index.html'];
test('core pages exist with title, description, viewport, schema', () => {
  for (const p of pages) {
    const h = readFileSync(`${OUT}/${p}`, 'utf8');
    assert.match(h, /<title>[^<]{20,}<\/title>/, p);
    assert.match(h, /name="description" content="[^"]{60,}"/, p);
    assert.match(h, /name="viewport"/, p);
    assert.match(h, /application\/ld\+json/, p);
    assert.ok(!/lorem|TODO|undefined/i.test(h), `placeholder text in ${p}`);
    assert.ok(!/fonts\.googleapis|fonts\.gstatic/.test(h), `remote font in ${p}`);
    assert.ok(!/\u2014|\u2013/.test(h.replace(/<script[\s\S]*?<\/script>/g, '')), `long dash in ${p}`);
  }
});
test('Yorkshire Asbestos Solutions is the first asbestos listing: no rating, no #1, no ownership label', () => {
  const h = readFileSync(`${OUT}/trades/asbestos-removal/index.html`, 'utf8');
  const li = h.match(/<li class="card firm" id="asbestosremoval-leeds-co-uk">[\s\S]*?<\/li>\s*(?=<li class="card firm"|<\/ol>)/);
  assert.ok(li, 'YAS card present');
  const card = li[0];
  assert.match(card, /<h3>Yorkshire Asbestos Solutions<\/h3>/);
  assert.match(card, /href="tel:\+441135199653"/);
  assert.match(card, /href="https:\/\/asbestosremoval-leeds\.co\.uk\/"/);
  assert.ok(!/#1|number one|\u2605|rating|rated|best in/i.test(card), 'rating or #1 claim on YAS card');
  assert.ok(!/owned by|publisher|disclosure/i.test(card), 'ownership label on YAS card');
  const first = h.match(/<li class="card firm" id="([^"]+)"/)[1];
  assert.strictEqual(first, 'asbestosremoval-leeds-co-uk', 'YAS must be the first card');
});
test('firm cards show self-hosted firm logos (or the letter tile), never hotlinked', () => {
  for (const p of ['trades/roofers/index.html', 'trades/plumbers/index.html', 'trades/electricians/index.html', 'trades/asbestos-removal/index.html']) {
    const h = readFileSync(`${OUT}/${p}`, 'utf8');
    const cards = h.match(/<li class="card firm"[\s\S]*?<h3>/g) || [];
    assert.ok(cards.length >= 3, `cards on ${p}`);
    for (const c of cards) assert.ok(/<img[^>]+src="\/firm-logos\/[^"]+"[^>]+alt="[^"]+ logo"/.test(c) || /class="avatar"/.test(c), `logo or tile in a card on ${p}`);
    for (const m of h.matchAll(/src="\/firm-logos\/([^"]+)"/g)) assert.ok(existsSync(`${OUT}/firm-logos/${m[1]}`), m[1]);
    assert.ok(!/<img[^>]+src="https?:/.test(h), `hotlinked image on ${p}`);
  }
});
test('sitemap and robots exist', () => { assert.ok(existsSync(`${OUT}/sitemap.xml`)); assert.ok(existsSync(`${OUT}/robots.txt`)); });
test('homepage is focused: no selective licensing panel, register badges link to official searches, no logo images', () => {
  const h = readFileSync(`${OUT}/index.html`, 'utf8');
  const main = h.slice(h.indexOf('<main'), h.indexOf('</main>'));
  assert.ok(!/selective/i.test(main), 'selective licensing on homepage body');
  assert.ok(!/panel navy/.test(main), 'navy panel still on homepage');
  for (const u of ['find-and-update.company-information.service.gov.uk', 'gassaferegister.co.uk', 'niceic.com', 'search.napit.org.uk', 'trustmark.org.uk', 'coniac.org.uk']) assert.ok(main.includes(u), `register link ${u}`);
});
test('register strip shows self-hosted official logos, labelled "We check against", with the ownership note', () => {
  const names = ['Companies House', 'Gas Safe', 'NICEIC', 'NAPIT', 'TrustMark', 'HSE licensed asbestos'];
  for (const p of ['index.html', 'how-we-choose/index.html']) {
    const h = readFileSync(`${OUT}/${p}`, 'utf8');
    for (const n of names) assert.match(h, new RegExp(`<img[^>]+src="/logos/[^"]+"[^>]+alt="${n} register search"`), `${n} logo on ${p}`);
    assert.ok(!/<img[^>]+src="https?:/.test(h), `hotlinked image on ${p}`);
    assert.match(h, /We check against/, p);
    assert.match(h, /Logos belong to their owners\. Leeds Home Guide is independent and not affiliated with or endorsed by these organisations\./, p);
    assert.ok(!/accredited by|member of|approved by/i.test(h), `endorsement wording on ${p}`);
  }
  for (const f of ['companies-house.svg', 'gas-safe-register.png', 'niceic.svg', 'napit.png', 'trustmark.svg', 'hse.svg']) assert.ok(existsSync(`${OUT}/logos/${f}`), f);
});
test('register logos never appear on trade pages next to firms', () => {
  for (const p of ['trades/roofers/index.html', 'trades/plumbers/index.html', 'trades/electricians/index.html', 'trades/asbestos-removal/index.html']) {
    const h = readFileSync(`${OUT}/${p}`, 'utf8');
    assert.ok(!/\/logos\//.test(h), `register logo on ${p}`);
  }
});
test('landlord guide is linked from the guides list and the footer, with its plain intro', () => {
  const g = readFileSync(`${OUT}/guides/index.html`, 'utf8');
  assert.match(g, /For landlords/);
  assert.match(g, /href="\/guides\/selective-licensing-leeds\/"/);
  const h = readFileSync(`${OUT}/index.html`, 'utf8');
  const foot = h.slice(h.indexOf('<footer'));
  assert.match(foot, /href="\/guides\/selective-licensing-leeds\/"/);
  const a = readFileSync(`${OUT}/guides/selective-licensing-leeds/index.html`, 'utf8');
  assert.match(a, /requires private landlords in designated areas/);
});
test('each trade page lists exactly 3 firms, and schema and counts agree', () => {
  for (const p of ['trades/roofers/index.html', 'trades/plumbers/index.html', 'trades/electricians/index.html', 'trades/asbestos-removal/index.html']) {
    const h = readFileSync(`${OUT}/${p}`, 'utf8');
    assert.strictEqual((h.match(/<li class="card firm"/g) || []).length, 3, `card count on ${p}`);
    assert.match(h, /"numberOfItems":3/, `ItemList count on ${p}`);
    assert.match(h, /class="list-count">3 /, `visible count on ${p}`);
  }
});
test('no copy claims the order is neutral or that no one can pay to rank', () => {
  for (const p of ['index.html', 'trades/index.html', 'how-we-choose/index.html', 'trades/roofers/index.html', 'trades/asbestos-removal/index.html']) {
    const h = readFileSync(`${OUT}/${p}`, 'utf8');
    assert.ok(!/not a ranking|pay to rank|pay to change|move up|better spot|pay to be listed/i.test(h), `ranking claim on ${p}`);
  }
});
test('trust pages exist, are in the footer and sitemap, with no dashes; About has Organization schema', () => {
  const sm = readFileSync(`${OUT}/sitemap.xml`, 'utf8');
  const foot = readFileSync(`${OUT}/index.html`, 'utf8').split('<footer')[1];
  for (const p of ['about', 'contact', 'privacy', 'terms']) {
    const h = readFileSync(`${OUT}/${p}/index.html`, 'utf8');
    assert.match(h, /<title>[^<]{20,}<\/title>/, p);
    assert.match(h, /name="description" content="[^"]{60,}"/, p);
    assert.ok(!/\u2014|\u2013/.test(h.replace(/<script[\s\S]*?<\/script>/g, '')), `long dash in ${p}`);
    assert.ok(sm.includes(`/${p}/`), `${p} in sitemap`);
    assert.ok(foot.includes(`href="/${p}/"`), `${p} in footer`);
  }
  assert.match(readFileSync(`${OUT}/about/index.html`, 'utf8'), /"@type":"Organization"[^<]*"description"/);
});
test('optimised pages carry their guide copy and FAQ schema', () => {
  for (const p of ['index.html', 'trades/roofers/index.html', 'trades/plumbers/index.html', 'trades/electricians/index.html', 'trades/asbestos-removal/index.html', 'guides/asbestos-garage-roof-removal-leeds/index.html']) {
    const h = readFileSync(`${OUT}/${p}`, 'utf8');
    assert.match(h, /"@type":"FAQPage"/, `FAQ schema on ${p}`);
    assert.match(h, /class="faq"/, `FAQ block on ${p}`);
  }
});

test('expert tips: one per trade page and on the garage roof guide, sourced and credited, never from a listed firm', () => {
  const allowed = /href="https:\/\/(www\.hse\.gov\.uk|www\.citizensadvice\.org\.uk|www\.electricalsafetyfirst\.org\.uk|www\.leeds\.gov\.uk|www\.gassaferegister\.co\.uk)\//;
  for (const p of ['trades/roofers/index.html', 'trades/plumbers/index.html', 'trades/electricians/index.html', 'trades/asbestos-removal/index.html', 'guides/asbestos-garage-roof-removal-leeds/index.html']) {
    const h = readFileSync(`${OUT}/${p}`, 'utf8');
    const boxes = h.match(/<aside class="expert">[\s\S]*?<\/aside>/g) || [];
    assert.strictEqual(boxes.length, 1, `one tip box on ${p}`);
    const b = boxes[0];
    assert.match(b, /Based on [^<:]+:/, `credit line on ${p}`);
    assert.match(b, allowed, `authoritative source link on ${p}`);
    assert.ok(!/Yorkshire Asbestos|placeholder|\[Preview/i.test(b), `placeholder or firm attribution in tip on ${p}`);
    assert.ok(!/\u201C|"[^"]*" said|says:/.test(b.replace(/<[^>]+>/g, '')), `quote in tip on ${p}`);
  }
});
test('Yorkshire Asbestos Solutions card makes no licence claim either way', () => {
  const h = readFileSync(`${OUT}/trades/asbestos-removal/index.html`, 'utf8');
  const card = h.match(/<li class="card firm" id="asbestosremoval-leeds-co-uk">[\s\S]*?<\/li>\s*(?=<li class="card firm"|<\/ol>)/)[0];
  assert.ok(!/licen[cs]/i.test(card), 'licence wording on YAS card');
  assert.match(card, /Surveys and testing/);
  assert.match(card, /Garage roofs/);
  assert.match(card, /Encapsulation/);
});
test('no page says a firm is HSE licensed without our check, or promises a licence check', () => {
  const files = ['index.html', 'about/index.html', 'how-we-choose/index.html', 'trades/index.html', 'trades/asbestos-removal/index.html', 'guides/asbestos-garage-roof-removal-leeds/index.html', 'terms/index.html'];
  for (const p of files) {
    const h = readFileSync(`${OUT}/${p}`, 'utf8');
    assert.ok(!/says it is HSE licensed|check its licence|all (the )?firms we list are (HSE )?licensed|every firm we list is (HSE )?licensed/i.test(h), `licence claim on ${p}`);
  }
  assert.match(readFileSync(`${OUT}/how-we-choose/index.html`, 'utf8'), /we show on the card where a firm is on the HSE licence list/);
});
test('contact and privacy use the configured email, no personal details, no preview placeholders; form disabled', () => {
  const c = readFileSync(`${OUT}/contact/index.html`, 'utf8');
  const pr = readFileSync(`${OUT}/privacy/index.html`, 'utf8');
  const gl = readFileSync(`${OUT}/get-listed/index.html`, 'utf8');
  for (const [n, h] of [['contact', c], ['privacy', pr], ['get-listed', gl]]) {
    assert.match(h, /href="mailto:hello@leedshomeguide\.co\.uk"/, `email on ${n}`);
    assert.ok(!/\[Preview|placeholder\]/i.test(h), `placeholder on ${n}`);
    assert.ok(!/Joseph|Gough|Bramley|LS13|0113|\+44|07\d{3}/.test(h.replace(/<script[\s\S]*?<\/script>/g, '')), `personal detail on ${n}`);
  }
  assert.match(c, /<fieldset disabled/);
  assert.match(c, /Form coming soon/);
  assert.ok(!/<form[^>]+action=/.test(c), 'form posts somewhere');
  assert.match(pr, /<h2[^>]*>Who we are<\/h2>\s*<p>This website is run by Leeds Home Guide/);
});
test('register-checks line says which checks we made, never that every firm passes them', () => {
  for (const p of ['about/index.html', 'how-we-choose/index.html', 'trades/asbestos-removal/index.html', 'trades/plumbers/index.html']) {
    const h = readFileSync(`${OUT}/${p}`, 'utf8');
    assert.ok(!/pass our register checks/i.test(h), `old line on ${p}`);
    assert.match(h, /We list up to 3 firms per trade and show on each card which checks we have made/, `new line on ${p}`);
  }
});
test('side box no longer claims every firm is on Companies House or that insurance was checked', () => {
  for (const p of ['trades/asbestos-removal/index.html', 'trades/plumbers/index.html', 'trades/roofers/index.html', 'trades/electricians/index.html']) {
    const h = readFileSync(`${OUT}/${p}`, 'utf8');
    assert.ok(!/Company status checked on Companies House/.test(h), `old Companies House line on ${p}`);
    assert.ok(!/Insurance and trade accreditations checked with the scheme itself/.test(h), `old insurance line on ${p}`);
    assert.match(h, /Company status looked up on Companies House where the firm is registered/, `new Companies House line on ${p}`);
    assert.match(h, /Accreditations: where we have looked one up, the card says so/, `new accreditations line on ${p}`);
    assert.ok(!/Accreditations checked where the firm names a scheme/.test(h), `older accreditations line on ${p}`);
  }
});
test('honesty sweep: no copy says every listed firm was checked, insured or vetted', () => {
  const how = readFileSync(`${OUT}/how-we-choose/index.html`, 'utf8');
  assert.match(how, /Public liability insurance: ask the firm to show it before work starts\./, 'insurance line');
  assert.ok(!/we ask firms to confirm it/.test(how), 'older insurance line');
  assert.match(how, /Trade registrations: where we have looked a firm up on Gas Safe, NICEIC, NAPIT, TrustMark or the HSE licence list, the card says so\./, 'registrations line');
  assert.ok(!/where a firm names a scheme/.test(how), 'older registrations line');
  assert.ok(!/Trade registrations with the scheme itself/.test(how), 'old registrations line');
  assert.ok(!/<li>Public liability insurance\.<\/li>/.test(how), 'old insurance line');
  const home = readFileSync(`${OUT}/index.html`, 'utf8');
  assert.match(home, /<h1>Find local tradespeople in Leeds<\/h1>/, 'home h1');
  assert.match(home, /each card shows which checks we have made/, 'home how we check intro');
  const banned = /checked tradespeople|checked local trades|Checked Leeds trades|checked firms per trade|Checked Local|vetted|before any firm is listed|do the register checks for you|every card shows what we checked|We check each listed firm|We look each firm up|with the scheme itself|Gas Safe checks and|NICEIC and NAPIT checks and|featured spots/i;
  for (const p of [...pages, 'about/index.html', 'how-we-choose/index.html', 'trades/index.html', 'get-listed/index.html', 'terms/index.html', 'contact/index.html', 'privacy/index.html', 'guides/index.html']) {
    const h = readFileSync(`${OUT}/${p}`, 'utf8');
    assert.ok(!banned.test(h), `every-firm-checked claim on ${p}: ${(h.match(banned) || [])[0]}`);
  }
});
