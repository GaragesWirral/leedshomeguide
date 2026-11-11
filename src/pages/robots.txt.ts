import type { APIRoute } from 'astro';
const PREVIEW = (process.env.PREVIEW ?? '1') === '1';
export const GET: APIRoute = ({ site }) => new Response(PREVIEW ? 'User-agent: *\nDisallow: /\n' : `User-agent: *\nAllow: /\n\nSitemap: ${new URL('/sitemap.xml', site).href}\n`, { headers: { 'Content-Type': 'text/plain' } });
