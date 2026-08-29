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
