// Lists objects in the hailehq-files R2 bucket as JSON, so the (fully static)
// Astro site can fetch "what's actually in this folder" at page-load time
// instead of build time. Drop a file into the bucket and it shows up on the
// next page load — no redeploy.
//
// GET /list?prefix=school/algebra/  ->  { files: [{ name, size, uploaded, url }] }

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (request.method !== 'GET' || url.pathname !== '/list') {
      return new Response('Not found', { status: 404 });
    }

    const prefix = url.searchParams.get('prefix') ?? '';
    const listed = await env.BUCKET.list({ prefix });

    const files = listed.objects
      .filter((obj) => !obj.key.endsWith('/'))
      .map((obj) => ({
        name: obj.key.slice(prefix.length).replace(/^\//, ''),
        key: obj.key,
        size: obj.size,
        uploaded: obj.uploaded,
        url: `${env.PUBLIC_BASE_URL}/${obj.key.split('/').map(encodeURIComponent).join('/')}`,
      }))
      .sort((a, b) => a.name.localeCompare(b.name));

    return new Response(JSON.stringify({ files }), {
      headers: {
        'content-type': 'application/json',
        'access-control-allow-origin': '*',
        'cache-control': 'public, max-age=60',
      },
    });
  },
};
