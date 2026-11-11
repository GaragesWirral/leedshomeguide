import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { categories, groups, jobs, jobPath } from '../lib/data';
export const GET: APIRoute = async ({ site }) => {
  const arts = await getCollection('articles');
  const paths = ['/', '/trades/', '/guides/', '/how-we-choose/', '/get-listed/', '/about/', '/contact/', '/privacy/', '/terms/', ...categories.map((c) => `/trades/${c.slug}/`), ...groups.filter((g) => g.live.length > 0).map((g) => `/trades/${g.slug}/`), ...jobs.map(jobPath), ...arts.map((a) => `/guides/${a.id}/`)];
  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${paths.map((p) => `  <url><loc>${new URL(p, site).href}</loc><lastmod>2026-11-09</lastmod></url>`).join('\n')}\n</urlset>\n`;
  return new Response(body, { headers: { 'Content-Type': 'application/xml' } });
};
