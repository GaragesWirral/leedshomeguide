import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { categories, groups, jobs, jobPath } from '../lib/data';
import lastmod from '../data/lastmod.json';
// lastmod comes from src/data/lastmod.json (npm run lastmod): the date each page's own content last changed in git.
export const GET: APIRoute = async ({ site }) => {
  const arts = await getCollection('articles');
  const news = await getCollection('news');
  const paths = ['/', '/trades/', '/guides/', '/news/', '/how-we-choose/', '/get-listed/', '/about/', '/contact/', '/privacy/', '/terms/', ...categories.map((c) => `/trades/${c.slug}/`), ...groups.filter((g) => g.live.length > 0).map((g) => `/trades/${g.slug}/`), ...jobs.map(jobPath), ...arts.map((a) => `/guides/${a.id}/`), ...news.map((n) => `/news/${n.id}/`)];
  const lm = lastmod as Record<string, string>;
  const fallback = new Date().toISOString().slice(0, 10);
  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${paths.map((p) => `  <url><loc>${new URL(p, site).href}</loc><lastmod>${lm[p] || fallback}</lastmod></url>`).join('\n')}\n</urlset>\n`;
  return new Response(body, { headers: { 'Content-Type': 'application/xml' } });
};
