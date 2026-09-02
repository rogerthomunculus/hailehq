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
    // Most guides are one trip, so the hero eyebrow is built from
    // startDate–endDate. A guide covering several visits (NYC) has no single
    // date range worth printing, so it can override the eyebrow text instead.
    dateLabel: z.string().optional(),
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
    // R2 key prefix (e.g. "school/algebra/") listed live by the files-list
    // Worker, so dropping a file into the bucket shows up with no redeploy.
    filesPrefix: z.string().optional(),
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
    grade: z.string(), // display label, e.g. "1st Grade"
    order: z.number(), // controls grade ordering on the page
    subjects: z.array(
      z.object({
        name: z.string(), // e.g. "ELA", "ELA (Novel Study)"
        sets: z.array(
          z.object({
            title: z.string(),
            url: z.string().url(),
          }),
        ),
      }),
    ),
  }),
});

// A filterable reference list (venues/activities), not day-by-day prose —
// rendered by a client island rather than MDX. See src/content/houston/.
const houston = defineCollection({
  loader: glob({ pattern: '**/*.{yaml,yml}', base: './src/content/houston' }),
  schema: z.object({
    order: z.number(),
    title: z.string(),
    note: z.string(),
    items: z.array(
      z.object({
        name: z.string(),
        where: z.string(),
        why: z.string(),
        tags: z.array(z.array(z.string()).min(1).max(2)), // [label] or [label, 'good'|'warn']
        filters: z.array(z.string()),
        site: z.string().url().optional(),
        map: z.string(),
        area: z.string().optional(), // neighborhood sub-heading, e.g. "Chinatown"
      }),
    ),
  }),
});

// One file per practice week, named by the Monday it starts (2026-08-31.yaml).
// The display title ("August 31st Spelling") is derived from weekStart, never
// typed, so it cannot drift from the filename. See src/lib/spelling.ts.
const spelling = defineCollection({
  loader: glob({ pattern: '**/*.{yaml,yml}', base: './src/content/spelling' }),
  schema: z.object({
    weekStart: z.coerce.date(),
    grade: z.string(), // display label, e.g. "2nd Grade"
    // A word is either a bare string or a word plus a dictation sentence. The
    // sentence is what makes a homophone (steak/stake, eight/ate) fair to test
    // out loud, so it is only worth writing for words that need it.
    words: z
      .array(
        z.union([
          z.string(),
          z.object({
            word: z.string(),
            sentence: z.string().optional(),
          }),
        ]),
      )
      .min(1),
  }),
});

export const collections = { travel, school, notes, blookets, houston, spelling };
