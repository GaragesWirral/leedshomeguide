const mods = import.meta.glob('../data/listings/*.json', { eager: true }) as Record<string, any>;
export type Firm = { name: string; domain: string; url: string; phone: string; area: string; claims: string[]; services: string[]; why: string; logo?: string; logo_bg?: 'light' | 'dark'; rating?: { score: string; count: number; url: string; read?: string } };
export type Category = { key: string; name: string; title: string; slug: string; kicker: string; intro: string; services_hint: string; firms: Firm[] };
import tradesData from '../data/trades.json';
import jobsData from '../data/jobs.json';
// Trades and groups come from one file: src/data/trades.json. A trade with "listing" has a page.
type TradeRow = { name: string; listing?: string };
type GroupRow = { key: string; name: string; slug: string; line: string; intro: string; trades: TradeRow[] };
export type Job = { trade: string; slug: string; name: string; title: string; description: string; h1?: string; intro: string; sections?: { h2: string; p?: string[]; ul?: string[] }[]; faqs?: { q: string; a: string }[] };
const order = (tradesData.groups as GroupRow[]).flatMap((g) => g.trades.filter((t) => t.listing).map((t) => t.listing as string));
for (const k of order) if (!mods[`../data/listings/${k}.json`]) throw new Error(`trades.json names listing "${k}" but src/data/listings/${k}.json is missing`);
export const categories: Category[] = order.map((k) => ({ key: k, ...(mods[`../data/listings/${k}.json`].default) }));
export type Group = GroupRow & { live: Category[]; soon: string[] };
export const groups: Group[] = (tradesData.groups as GroupRow[]).map((g) => ({
  ...g,
  live: g.trades.filter((t) => t.listing).map((t) => categories.find((c) => c.key === t.listing) as Category),
  soon: g.trades.filter((t) => !t.listing).map((t) => t.name),
}));
export const groupOf = (key: string) => groups.find((g) => g.live.some((c) => c.key === key));
export const jobs: Job[] = (jobsData.jobs as Job[]).filter((j) => categories.some((c) => c.key === j.trade));
export const jobsFor = (key: string) => jobs.filter((j) => j.trade === key);
export const jobPath = (j: Job) => `/trades/${(categories.find((c) => c.key === j.trade) as Category).slug}/${j.slug}/`;
export const icons: Record<string, string> = {
  roofers: '<path d="M3 11.5 12 4l9 7.5"/><path d="M5.5 10v10h13V10"/><path d="M10 20v-5h4v5"/>',
  plumbers: '<path d="M12 3.5s6 6.4 6 10.9a6 6 0 0 1-12 0C6 9.9 12 3.5 12 3.5z"/>',
  electricians: '<path d="M13 2.5 5 13.5h6l-1 8 8-11h-6l1-8z"/>',
  asbestos: '<path d="M12 3l7.5 3v5.5c0 4.8-3.2 8-7.5 9.5-4.3-1.5-7.5-4.7-7.5-9.5V6L12 3z"/><path d="m9 12 2.2 2.2L15.5 10"/>',
  locksmiths: '<circle cx="8" cy="12" r="4"/><path d="M12 12h9M18 12v3M15.5 12v2"/>',
  'skip-hire': '<path d="M3 8h18l-2 11H5L3 8z"/><path d="M7 8 8.5 5h7L17 8"/>',
  'carpet-cleaning': '<rect x="3" y="14" width="18" height="6" rx="1"/><path d="M12 14V4M9 4h6"/>',
  'asbestos-surveys': '<circle cx="11" cy="11" r="6"/><path d="m20 20-4.5-4.5"/>',
  removals: '<rect x="2" y="7" width="12" height="10"/><path d="M14 10h4l3 3v4h-7"/><circle cx="6" cy="18" r="1.5"/><circle cx="17" cy="18" r="1.5"/>',
  cleaners: '<path d="M7 21h10M9 21V10h6v11M10 10V5h4v5"/>',
  'damp-proofing': '<path d="M12 3.5s6 6.4 6 10.9a6 6 0 0 1-12 0C6 9.9 12 3.5 12 3.5z"/><path d="M9 15h6"/>',
  'pest-control': '<ellipse cx="12" cy="13" rx="4" ry="6"/><path d="M12 7V4M8 10 4 8M16 10l4-2M8 15l-4 1M16 15l4 1"/>',
  'window-cleaners': '<rect x="4" y="3" width="16" height="18" rx="1"/><path d="M12 3v18M4 12h16"/>',
  'garage-removal': '<path d="M3 21V9l9-5 9 5v12"/><path d="M7 21v-8h10v8M7 16h10"/>',
  handyman: '<path d="M14.5 5.5a4 4 0 0 0-5.3 5.3L3 17l4 4 6.2-6.2a4 4 0 0 0 5.3-5.3l-2.5 2.5-2.5-.5-.5-2.5 2.5-2.5z"/>',
  'rubbish-removal': '<path d="M4 7h16M9 7V4h6v3M6 7l1 14h10l1-14"/>',
};
// Coming soon trades, in group order, from trades.json.
export const comingSoon: string[] = groups.flatMap((g) => g.soon);
export const genericIcon = '<rect x="4" y="4" width="16" height="16" rx="3"/><path d="M9 12h6M12 9v6"/>';
export const iconFor = (k: string) => icons[k] || genericIcon;
export const UPDATED = 'November 2026';
export const CHECKED = '9 November 2026';
export const telHref = (p: string) => 'tel:' + p.replace(/[^0-9+]/g, '').replace(/^0/, '+44');
