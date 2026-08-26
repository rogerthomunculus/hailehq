# hailehq.com

Family site. Astro, static output, deployed on Vercel.

## Structure

- `src/content/<domain>/` — prose, schema-validated. See `src/content.config.ts`.
- `src/apps/` — interactive React apps, mounted as islands.
- `public/files/` — downloadable artifacts (PDFs, CSVs).

## Conventions

- Never commit directly to `main`. Branch, PR, merge.
- Branch names: `content/<slug>`, `feat/<slug>`, `fix/<slug>`.
- Conventional commits: `content:`, `feat:`, `fix:`, `chore:`, `style:`.
- New content = new `.mdx` file (or `.yaml` for the `blookets` data collection). Do not add routes; `[slug].astro` handles it.
- Colours and type come from `src/styles/tokens.css`. Do not hardcode hex values.
- Run `npx astro check` before opening a PR.

## Adding a trip guide

1. `src/content/travel/<destination>-<year>.mdx`
2. Fill frontmatter per the `travel` schema in `src/content.config.ts`
3. Images → `public/images/travel/<slug>/`
4. Use `<Section>`, `<Note>`, `<Day>`/`<DayList>`, `<PlaceList>`, `<SkipList>`, `<KidFacts>`, `<FactGrid>` from `src/components/travel/` and `src/components/ui/` — don't hand-write the wrapper markup.

## Adding a study resource

1. `src/content/school/<topic>.mdx`
2. Generated PDFs/CSVs → `public/files/school/<topic>/`
3. List them in the `downloads` frontmatter array

## Adding a Blooket set

Append to the matching file under `src/content/blookets/<grade>-<subject>.yaml`, or create a new one — it's a `type: 'data'` collection, so it just needs to match the schema. No page edits needed.

## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)
