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

Drop files under `<grade folder>/<file>` or `<grade folder>/<subject folder>/<file>` — name the
folders however reads naturally in the Cloudflare dashboard, e.g. `5th Grade`, `Kindergarten`,
`1st Grade`. Sorting pulls the leading number out of the folder name (so "5th Grade" sorts after
"1st Grade"); `kindergarten`/`k` always sorts first; anything with no leading number sorts last,
alphabetically. Files dropped with no grade folder at all land in a catch-all "General" group.

Example: `5th Grade/ELA/fractions-review.pdf` shows up under "5th Grade" → "ELA" as
"fractions-review.pdf".
