const mods = import.meta.glob('../data/listings/*.json', { eager: true }) as Record<string, any>;
export type Firm = { name: string; domain: string; url: string; phone: string; area: string; claims: string[]; services: string[]; why: string; logo?: string; logo_bg?: 'light' | 'dark' };
export type Category = { key: string; name: string; title: string; slug: string; kicker: string; intro: string; services_hint: string; firms: Firm[] };
const order = ['roofers', 'plumbers', 'electricians', 'asbestos'];
export const categories: Category[] = order.map((k) => ({ key: k, ...(mods[`../data/listings/${k}.json`].default) }));
export const icons: Record<string, string> = {
  roofers: '<path d="M3 11.5 12 4l9 7.5"/><path d="M5.5 10v10h13V10"/><path d="M10 20v-5h4v5"/>',
  plumbers: '<path d="M12 3.5s6 6.4 6 10.9a6 6 0 0 1-12 0C6 9.9 12 3.5 12 3.5z"/>',
  electricians: '<path d="M13 2.5 5 13.5h6l-1 8 8-11h-6l1-8z"/>',
  asbestos: '<path d="M12 3l7.5 3v5.5c0 4.8-3.2 8-7.5 9.5-4.3-1.5-7.5-4.7-7.5-9.5V6L12 3z"/><path d="m9 12 2.2 2.2L15.5 10"/>',
};
export const comingSoon = ['Builders', 'Damp and mould', 'Boiler installers', 'Windows and doors', 'Locksmiths', 'Painters and decorators', 'Loft conversions', 'Removals'];
export const UPDATED = 'November 2026';
export const CHECKED = '9 November 2026';
export const telHref = (p: string) => 'tel:' + p.replace(/[^0-9+]/g, '').replace(/^0/, '+44');
