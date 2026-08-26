# hailehq.com

Family publishing platform — travel guides, school resources, and the odd interactive app, all in one Astro site with path-based routing.

## Structure

```
src/content/<domain>/   prose, schema-validated (see src/content.config.ts)
src/apps/               interactive React apps, mounted as islands
public/files/           downloadable artifacts (PDFs, CSVs)
```

## Development

```
npm install
npm run dev
```

## Adding content

See `AGENTS.md` for conventions (branch naming, commit style, how to add a trip guide or study resource).
