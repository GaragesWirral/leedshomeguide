import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
const articles = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/articles' }),
  schema: z.object({
    title: z.string(), h1: z.string(), description: z.string(), kicker: z.string(),
    category: z.string(), updated: z.string(), updatedISO: z.string(),
    quick: z.object({ label: z.string(), value: z.string(), note: z.string() }).optional(),
    related: z.string().optional(),
    intro: z.string().optional(),
    sources: z.array(z.object({ name: z.string(), url: z.string() })),
    faqs: z.array(z.object({ q: z.string(), a: z.string() })).default([]),
    sponsored: z.boolean().default(false),
  }),
});
const news = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/news' }),
  schema: z.object({
    title: z.string(), h1: z.string(), description: z.string(),
    topic: z.enum(['Energy and EPC', 'Grants', 'Renting', 'Planning', 'Leeds council', 'Bins and waste', 'Building safety']),
    date: z.string(), dateISO: z.string(),
    summary: z.string(),
    related: z.string().optional(),
    guides: z.array(z.string()).default([]),
    sources: z.array(z.object({ name: z.string(), url: z.string(), read: z.string() })),
  }),
});
export const collections = { articles, news };
