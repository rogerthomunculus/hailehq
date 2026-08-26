import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Shared across every domain
const base = {
  title: z.string(),
  summary: z.string(),
  updated: z.coerce.date(),
  draft: z.boolean().default(false),
  order: z.number().default(0),
};

const travel = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/travel' }),
  schema: z.object({
    ...base,
    destination: z.string(),
    year: z.number(),
    startDate: z.coerce.date(),
    endDate: z.coerce.date(),
    dayCount: z.number(),
    travellers: z.string(),
    bases: z
      .array(
        z.object({
          name: z.string(),
          nights: z.number(),
          color: z.string(),
        }),
      )
      .optional(),
    appUrl: z.string().optional(), // link to a planner
    sections: z
      .array(
        z.object({
          id: z.string(),
          label: z.string(),
        }),
      )
      .optional(), // powers the in-page jump nav
  }),
});

const school = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/school' }),
  schema: z.object({
    ...base,
    subject: z.enum(['reading', 'social-studies', 'math', 'science', 'other']),
    grade: z.string(), // "5" or "K-2"
    child: z.enum(['hailey', 'lucas', 'both']).optional(),
    resourceType: z.enum(['study-pack', 'worksheet', 'blooket', 'read-aloud', 'reference']),
    downloads: z
      .array(
        z.object({
          label: z.string(),
          file: z.string(), // path under /files/
          kind: z.enum(['pdf', 'csv', 'html', 'zip']),
        }),
      )
      .optional(),
  }),
});

const notes = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/notes' }),
  schema: z.object({
    ...base,
    tags: z.array(z.string()).default([]),
  }),
});

const blookets = defineCollection({
  loader: glob({ pattern: '**/*.{yaml,yml}', base: './src/content/blookets' }),
  schema: z.object({
    grade: z.string(),
    subject: z.string(),
    child: z.enum(['hailey', 'lucas', 'both']),
    order: z.number().default(0),
    sets: z.array(
      z.object({
        title: z.string(),
        url: z.string().url(),
        added: z.coerce.date(),
        notes: z.string().optional(),
      }),
    ),
  }),
});

export const collections = { travel, school, notes, blookets };
