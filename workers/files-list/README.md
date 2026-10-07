# files-list Worker

Lists objects in the `hailehq-files` R2 bucket as JSON, so the (fully static)
Astro site can show "what's actually in the bucket" at page-load time
instead of build time. Drop a file into the bucket via the Cloudflare
dashboard and it shows up on the next page load — no redeploy of the site.

- **Live URL**: `https://hailehq-files-list.files-list.workers.dev`
- **Endpoint**: `GET /list?prefix=school/algebra/` → `{ files: [{ name, key, size, uploaded, url }] }`
- **Bucket layout**: same convention the site already uses, e.g. `school/<topic>/file.pdf`.
- **Public reads**: the bucket has the free `pub-<id>.r2.dev` managed domain enabled, so `url` in
  the response is directly downloadable.

## Redeploying

Only needed when this Worker's code changes — new files dropped into the bucket need no redeploy.

```
cd workers/files-list
CLOUDFLARE_API_TOKEN=... CLOUDFLARE_ACCOUNT_ID=... npx wrangler deploy
```

## Frontend usage

`src/components/ui/FileBrowser.astro` fetches this endpoint client-side and renders results styled
to match `DownloadList.astro`. Any content entry with a `filesPrefix` field renders one — see the
`school` collection schema in `src/content.config.ts`.

`src/components/school/StudyGuidesBrowser.astro` powers `/school/study-guides/` — it lists the
**entire bucket** (prefix `""`) and groups client-side by top-level folder (grade), then by a
second folder level (subject) if one is present. One Worker, one bucket; grades and subjects are
just a folder-naming convention, not separate infrastructure. Because it reads the whole bucket,
keep this bucket dedicated to study guides — anything else downloadable on the site should use
its own bucket/prefix scheme with `FileBrowser.astro` instead, or it'll show up here too.

### Study guide folders

Drop files under `<grade folder>/<file>`, `<grade folder>/<subject folder>/<file>`, or
`<grade folder>/<subject folder>/<unit/chapter folder>/<file>` — name the folders however reads
naturally in the Cloudflare dashboard, e.g. `5th Grade`, `Kindergarten`, `1st Grade`,
`Unit 2 Ch 1 — Ghana Empire`. Sorting pulls the leading number out of the folder name at every
level (so "5th Grade" sorts after "1st Grade", "Unit 2 Ch 1" after "Unit 1 Ch 3"); `kindergarten`/`k`
always sorts first; anything with no leading number sorts last, alphabetically. Files dropped with
no grade folder at all land in a catch-all "General" group; a subject with no chapter folder still
renders as a flat list, same as before — the chapter level is opt-in per subject.

Example: `5th Grade/Social Studies/Unit 2 Ch 1 — Ghana Empire/vocabulary.pdf` shows up under
"5th Grade" → "Social Studies" → "Unit 2 Ch 1 — Ghana Empire" as "vocabulary.pdf".

Once a subject has more than a handful of files, add the chapter folder — that's the fix for a
cluttered subject list, not a new filter or a schema change.

### Never upload these here

This bucket is public with no auth — anyone with the URL can read anything in it. Study-pack output
sometimes includes files that must stay private:

- Anything named `*_KEY.pdf` (practice test / writing practice answer keys).
- `test.json` and its stimulus images, from a `*_practice_test_web.zip` — the answers and `why`
  text sit in plain JSON. These belong in the `practice.hailehq.com` project's own repo (a separate
  Vercel project), which grades server-side and never ships the key to the browser. Not this bucket.

Everything else from a study-pack run (vocabulary, GRAPES/CER guides, the parent cheat sheet, the
plain practice-test PDF with no answers, the read-aloud HTML, the student-facing writing-practice
PDF) is safe to publish here.
