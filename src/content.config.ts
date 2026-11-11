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
export const collections = { articles };
