// Writes src/data/lastmod.json: for every URL in the sitemap, the date its own content last changed in git.
// Run before committing content changes:  npm run lastmod
// Needs full git history (in a shallow clone run: git fetch --depth=1000 origin main).
// Template and style changes are ignored on purpose: lastmod should mean "this page's content changed".
import { execFileSync } from 'node:child_process';
import { readFileSync, readdirSync, writeFileSync, existsSync } from 'node:fs';

const git = (...a) => execFileSync('git', a, { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 });
const today = new Date().toISOString().slice(0, 10);
const dirty = (f) => git('status', '--porcelain', '--', f).trim() !== '';
const commits = (f) => git('log', '--format=%H %cs', '--', f).trim().split('\n').filter(Boolean).map((l) => l.split(' '));
const show = (h, f) => { try { return git('show', `${h}:${f}`); } catch { return null; } };

// Date a file (or a selected part of it) last changed. pick(text) returns the part to compare.
function changed(f, pick = (t) => t) {
  if (!existsSync(f)) return null;
  const now = pick(readFileSync(f, 'utf8'));
  if (dirty(f)) {
    const head = show('HEAD', f);
    if (head === null || pick(head) !== now) return today;
  }
  const list = commits(f);
  let date = null;
  for (const [h, d] of list) {
    const t = show(h, f);
    if (t === null || pick(t) !== now) break;
    date = d;
  }
  return date || today;
}
const max = (...ds) => ds.filter(Boolean).sort().pop() || today;
const json = (sel) => (t) => { try { return JSON.stringify(sel(JSON.parse(t))); } catch { return t; } };

const out = {};
const trades = JSON.parse(readFileSync('src/data/trades.json', 'utf8'));
const listingKeys = trades.groups.flatMap((g) => g.trades.filter((t) => t.listing).map((t) => t.listing));
const slugOf = {};
for (const k of listingKeys) {
  const f = `src/data/listings/${k}.json`;
  const slug = JSON.parse(readFileSync(f, 'utf8')).slug;
  slugOf[k] = slug;
  out[`/trades/${slug}/`] = changed(f);
}
for (const g of trades.groups) {
  if (!g.trades.some((t) => t.listing)) continue;
  out[`/trades/${g.slug}/`] = max(changed('src/data/trades.json', json((d) => d.groups.find((x) => x.slug === g.slug))), ...g.trades.filter((t) => t.listing).map((t) => out[`/trades/${slugOf[t.listing]}/`]));
}
const jobs = JSON.parse(readFileSync('src/data/jobs.json', 'utf8')).jobs;
for (const j of jobs) {
  if (!slugOf[j.trade]) continue;
  out[`/trades/${slugOf[j.trade]}/${j.slug}/`] = changed('src/data/jobs.json', json((d) => d.jobs.find((x) => x.trade === j.trade && x.slug === j.slug)));
}
const arts = readdirSync('src/content/articles').filter((f) => f.endsWith('.md'));
for (const f of arts) out[`/guides/${f.slice(0, -3)}/`] = changed(`src/content/articles/${f}`);
const news = readdirSync('src/content/news').filter((f) => f.endsWith('.md'));
for (const f of news) out[`/news/${f.slice(0, -3)}/`] = changed(`src/content/news/${f}`);

const pick = (prefix) => Object.entries(out).filter(([u]) => u.startsWith(prefix)).map(([, d]) => d);
out['/guides/'] = max(changed('src/pages/guides/index.astro'), ...pick('/guides/'));
out['/news/'] = max(changed('src/pages/news/index.astro'), ...pick('/news/'));
out['/trades/'] = max(changed('src/pages/trades/index.astro'), changed('src/data/trades.json'));
out['/'] = max(changed('src/pages/index.astro'), changed('src/data/trades.json'), ...pick('/news/'));
for (const p of ['how-we-choose', 'get-listed', 'about', 'contact', 'privacy', 'terms']) out[`/${p}/`] = changed(`src/pages/${p}.astro`);

const sorted = Object.fromEntries(Object.entries(out).sort(([a], [b]) => a.localeCompare(b)));
writeFileSync('src/data/lastmod.json', JSON.stringify(sorted, null, 1) + '\n');
console.log(`lastmod.json: ${Object.keys(sorted).length} URLs, newest ${max(...Object.values(sorted))}`);
