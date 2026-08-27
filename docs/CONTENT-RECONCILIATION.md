# hailehq Reconciliation — Content Is Ground Truth

Hand this to Claude Code. It supersedes the styling guidance in `REPO-SETUP.md` where the two conflict.

**The rule for this pass: nothing gets summarized, condensed, or rewritten. Every piece of copy below was fetched live from what's actually serving traffic right now. Transcribe it exactly.**

---

## Why this document exists

The house style is now the passport-stamp theme (dark maroon/pink, Big Shoulders Display + Libre Franklin + Space Mono) — not the basalt/glacier theme currently in the `hailehq` repo's components. That part is a restyle.

But a styling pass is not the same as a content pass, and this repo has four pieces of real content at four different states of readiness:

| Piece         | Content status                                 | Work needed                                             |
| ------------- | ---------------------------------------------- | ------------------------------------------------------- |
| Landing page  | Never in git                                   | Full port — markup + copy, restyled onto shared tokens  |
| Iceland guide | Already correct in `iceland-2026.mdx`          | **Restyle only** — do not touch the prose               |
| Houston guide | Never in git, grown well beyond earlier drafts | Full port — but as a **data collection**, not MDX prose |
| Blookets      | Never in git, 82 real entries                  | Full port — data collection, exact entries              |

---

## 1. Design tokens — verified against the live deployment

```css
:root {
  --bg: #1b1216;
  --surface: #24171e;
  --surface2: #2e1a24;
  --rule: #4a293a;
  --text: #f2d8e5;
  --muted: #b888a0;
  --gold: #7fabe8;
  --stamp: #ff6fa8;
}
```

Fonts: `Big Shoulders Display` (700/800) for display, `Libre Franklin` (400/500/600) for body, `Space Mono` (400/700) for labels and mono accents.

**Note the naming:** the variable is still called `--gold` in the source but its actual value is blue (`#7fabe8`) — it went through at least one iteration where gold became blue and nobody renamed the variable. Keep the variable name as-is when porting (don't "fix" it to `--accent-blue` or similar) so future diffs against the live source stay legible. Same principle applies to `--stamp`, which is pink, not literal postage-stamp red.

This differs from the Houston guide's own palette (see §4) — Houston was styled independently and never reconciled to the landing page's tokens. Bringing it into this repo is the chance to put it on the shared system for the first time.

---

## 2. Landing page — port verbatim, restyle onto shared components

Full live source, fetched from `hailehq.com`:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
    <title>Hai Le HQ</title>
    <meta name="theme-color" content="#1b1216" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Big+Shoulders+Display:wght@700;800&family=Libre+Franklin:wght@400;500;600&family=Space+Mono:wght@400;700&display=swap"
      rel="stylesheet"
    />
    <style>
      :root {
        --bg: #1b1216;
        --surface: #24171e;
        --surface2: #2e1a24;
        --rule: #4a293a;
        --text: #f2d8e5;
        --muted: #b888a0;
        --gold: #7fabe8;
        --stamp: #ff6fa8;
        --sp: clamp(16px, 4vw, 28px);
      }
      * {
        box-sizing: border-box;
      }
      body {
        margin: 0;
        background: var(--bg);
        color: var(--text);
        font-family: 'Libre Franklin', system-ui, sans-serif;
        font-size: 16px;
        line-height: 1.6;
      }
      a {
        color: inherit;
        text-decoration: none;
      }
      .mono {
        font-family: 'Space Mono', monospace;
      }

      .shell {
        display: flex;
        min-height: 100vh;
      }

      .sidebar {
        width: 250px;
        flex: 0 0 250px;
        background: var(--surface);
        border-right: 1px solid var(--rule);
        padding: 26px 20px;
        position: sticky;
        top: 0;
        height: 100vh;
        overflow-y: auto;
      }
      .brand {
        font-family: 'Big Shoulders Display', sans-serif;
        font-weight: 800;
        font-size: 26px;
        letter-spacing: 0.02em;
        margin-bottom: 34px;
      }
      .brand span {
        color: var(--gold);
      }
      nav {
        display: flex;
        flex-direction: column;
        gap: 2px;
      }
      .nav-link {
        padding: 9px 10px;
        border-radius: 8px;
        font-size: 14.5px;
        font-weight: 500;
        color: var(--muted);
      }
      .nav-link.active {
        background: var(--surface2);
        color: var(--text);
      }
      .nav-link:hover {
        color: var(--text);
      }
      .nav-group-toggle {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        background: none;
        border: 0;
        color: var(--muted);
        font:
          500 14.5px 'Libre Franklin',
          sans-serif;
        padding: 9px 10px;
        cursor: pointer;
        border-radius: 8px;
      }
      .nav-group-toggle:hover {
        color: var(--text);
      }
      .nav-group-toggle svg {
        width: 12px;
        height: 12px;
        transition: transform 0.18s;
        stroke: currentColor;
      }
      .nav-group-toggle[aria-expanded='true'] svg {
        transform: rotate(90deg);
      }
      .nav-group {
        display: flex;
        flex-direction: column;
        gap: 1px;
        padding-left: 14px;
        margin: 2px 0 6px;
        border-left: 1px solid var(--rule);
        overflow: hidden;
        max-height: 0;
        transition: max-height 0.22s ease;
      }
      .nav-group.open {
        max-height: 200px;
      }
      .nav-group a {
        padding: 8px 12px;
        border-radius: 7px;
        font-size: 13.5px;
        color: var(--muted);
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      .nav-group a:hover {
        color: var(--text);
        background: var(--surface2);
      }
      .badge {
        font-family: 'Space Mono', monospace;
        font-size: 9.5px;
        letter-spacing: 0.05em;
        text-transform: uppercase;
        color: var(--muted);
        border: 1px solid var(--rule);
        border-radius: 4px;
        padding: 2px 5px;
      }
      .sidebar-foot {
        margin-top: 30px;
        padding-top: 16px;
        border-top: 1px solid var(--rule);
        font-family: 'Space Mono', monospace;
        font-size: 11px;
        color: var(--muted);
      }

      .menu-toggle {
        display: none;
        position: fixed;
        top: 16px;
        left: 16px;
        z-index: 30;
        background: var(--surface);
        border: 1px solid var(--rule);
        color: var(--text);
        width: 40px;
        height: 40px;
        border-radius: 8px;
        font-size: 18px;
        cursor: pointer;
      }

      .content {
        flex: 1;
        min-width: 0;
      }
      .wrap {
        max-width: 760px;
        margin: 0 auto;
        padding: 0 var(--sp);
      }

      .hero {
        padding: calc(var(--sp) * 1.8) 0 var(--sp);
      }
      .eyebrow {
        font-family: 'Space Mono', monospace;
        font-size: 12px;
        letter-spacing: 0.14em;
        text-transform: uppercase;
        color: var(--gold);
        margin: 0 0 14px;
      }
      h1 {
        font-family: 'Big Shoulders Display', sans-serif;
        font-weight: 800;
        font-size: clamp(42px, 9vw, 72px);
        line-height: 0.94;
        letter-spacing: 0.01em;
        text-transform: uppercase;
        margin: 0 0 16px;
      }
      .standfirst {
        color: var(--muted);
        max-width: 48ch;
        margin: 0 0 26px;
        font-size: 16px;
      }

      .stamps {
        display: flex;
        gap: 14px;
        flex-wrap: wrap;
      }
      .stamp {
        width: 104px;
        height: 104px;
        border-radius: 50%;
        border: 2px dashed var(--stamp);
        color: var(--stamp);
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        font-family: 'Space Mono', monospace;
        font-size: 11px;
        font-weight: 700;
        letter-spacing: 0.04em;
        text-transform: uppercase;
        line-height: 1.4;
        transform: rotate(-6deg);
        flex: 0 0 auto;
      }
      .stamp:nth-child(2) {
        transform: rotate(4deg);
      }
      .stamp:hover {
        border-style: solid;
        color: var(--text);
        background: var(--surface2);
      }

      .illustration {
        margin: calc(var(--sp) * 1.6) 0;
        border: 1px solid var(--rule);
        border-radius: 16px;
        overflow: hidden;
        background: var(--surface);
      }
      .illustration svg {
        display: block;
        width: 100%;
        height: auto;
      }
      .caption {
        margin: 0;
        padding: 12px var(--sp);
        font-family: 'Space Mono', monospace;
        font-size: 11.5px;
        color: var(--muted);
        border-top: 1px solid var(--rule);
      }

      .destinations {
        padding-bottom: calc(var(--sp) * 2);
      }
      .destinations h2 {
        font-family: 'Big Shoulders Display', sans-serif;
        font-weight: 800;
        font-size: 26px;
        text-transform: uppercase;
        letter-spacing: 0.01em;
        margin: 0 0 16px;
      }
      .cards {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 14px;
      }
      @media (max-width: 560px) {
        .cards {
          grid-template-columns: 1fr;
        }
      }
      .card {
        display: block;
        border: 1px solid var(--rule);
        border-radius: 14px;
        padding: 20px;
        background: var(--surface);
        transition: 0.15s;
      }
      a.card:hover {
        border-color: var(--gold);
      }
      .card-eyebrow {
        font-family: 'Space Mono', monospace;
        font-size: 11px;
        letter-spacing: 0.05em;
        text-transform: uppercase;
        color: var(--gold);
        display: block;
        margin-bottom: 8px;
      }
      .card h3 {
        font-family: 'Big Shoulders Display', sans-serif;
        font-weight: 800;
        font-size: 22px;
        text-transform: uppercase;
        margin: 0 0 8px;
      }
      .card p {
        margin: 0;
        color: var(--muted);
        font-size: 14px;
      }

      @media (max-width: 820px) {
        .sidebar {
          position: fixed;
          left: 0;
          top: 0;
          z-index: 25;
          transform: translateX(-100%);
          transition: transform 0.2s;
          box-shadow: 0 0 40px rgba(0, 0, 0, 0.4);
        }
        .sidebar.open {
          transform: translateX(0);
        }
        .menu-toggle {
          display: block;
        }
        .content {
          padding-top: 8px;
        }
      }
      @media (prefers-reduced-motion: reduce) {
        * {
          transition: none !important;
        }
      }
    </style>
  </head>
  <body>
    <button class="menu-toggle" id="menuToggle" aria-label="Toggle menu">☰</button>

    <div class="shell">
      <aside class="sidebar" id="sidebar">
        <div class="brand">Hai Le <span>HQ</span></div>
        <nav>
          <a class="nav-link active" href="#">Home</a>
          <button class="nav-group-toggle" id="travelToggle" aria-expanded="true">
            Travel
            <svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round">
              <path d="M9 6l6 6-6 6" />
            </svg>
          </button>
          <div class="nav-group open" id="travelGroup">
            <a href="https://houston.hailehq.com" target="_blank" rel="noopener">Houston</a>
            <a href="https://iceland.hailehq.com" target="_blank" rel="noopener">Iceland</a>
          </div>
          <button class="nav-group-toggle" id="schoolToggle" aria-expanded="true">
            School
            <svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round">
              <path d="M9 6l6 6-6 6" />
            </svg>
          </button>
          <div class="nav-group open" id="schoolGroup">
            <a href="/school/blookets/">Blookets</a>
          </div>
        </nav>
        <div class="sidebar-foot">hailehq.com</div>
      </aside>

      <main class="content">
        <div class="wrap">
          <header class="hero">
            <p class="eyebrow">Hai Le HQ · Family Travel Log</p>
            <h1>Where we've<br />been stamped</h1>
            <p class="standfirst">
              A running log of the trips we plan, book, and actually take — kept somewhere more
              permanent than a group chat.
            </p>
            <div class="stamps">
              <a class="stamp" href="https://iceland.hailehq.com" target="_blank" rel="noopener"
                >Iceland<br />Jul 2026</a
              >
              <a class="stamp" href="https://houston.hailehq.com" target="_blank" rel="noopener"
                >Houston<br />Sep 2026</a
              >
            </div>
          </header>

          <section class="illustration">
            <svg
              viewBox="0 0 760 360"
              xmlns="http://www.w3.org/2000/svg"
              role="img"
              aria-label="Illustrated placeholder of a family looking at the northern lights in Iceland"
            >
              <!-- full SVG preserved verbatim in the live source — copy exactly, do not regenerate -->
            </svg>
            <p class="caption">Placeholder illustration — swap in your own artwork here.</p>
          </section>

          <section class="destinations">
            <h2>Guides</h2>
            <div class="cards">
              <a class="card" href="https://houston.hailehq.com" target="_blank" rel="noopener">
                <span class="card-eyebrow">Sept 2026</span>
                <h3>Houston</h3>
                <p>Group experiences with the cousins, ranked and categorized.</p>
              </a>
              <a class="card" href="https://iceland.hailehq.com" target="_blank" rel="noopener">
                <span class="card-eyebrow">Jul 2026</span>
                <h3>Iceland</h3>
                <p>The full 12-day trip guide — bookings, gear, what went wrong.</p>
              </a>
            </div>
          </section>

          <section class="destinations">
            <h2>School</h2>
            <div class="cards">
              <a class="card" href="/school/blookets/">
                <span class="card-eyebrow">Study Sets</span>
                <h3>Blookets</h3>
                <p>Every Blooket set, grouped by grade and subject.</p>
              </a>
            </div>
          </section>
        </div>
      </main>
    </div>

    <script>
      // sidebar toggle + mobile menu — three click handlers, preserved verbatim in live source
    </script>
  </body>
</html>
```

**Port target:** `src/pages/index.astro` for the markup + copy, `Sidebar.astro` component for the reusable nav shell (every other page in the repo — Iceland, Houston, Blookets — should use the same sidebar, not reimplement it). The inline SVG illustration and the three `<script>` handlers should be copied byte-for-byte from the live source (fetch `https://hailehq.com` directly to get the untruncated SVG paths — they're omitted above only for length, not because they're optional).

---

## 3. Iceland guide — restyle only, content is frozen

**Do not edit `src/content/travel/iceland-2026.mdx`.** Its prose is already the correct, final content — verified by fetching `iceland.hailehq.com` live and confirming it matches the MDX word for word.

The only work here: restyle `Note.astro`, `Day.astro`, `Section.astro`, `FactGrid.astro`, `PlaceList.astro`, `SkipList.astro`, `KidFacts.astro`, and the travel layout to use the tokens in §1 instead of the current basalt/glacier ones. Structure, copy, section order, day count — none of it changes.

---

## 4. Houston guide — new content collection, not MDX

This is the piece that needs the most care, for two reasons: it's never been in git at all, and its actual shape is fundamentally different from Iceland's.

**It's not a day-by-day narrative.** It's a filterable reference list — ten ranked categories, each with several venues, each venue carrying tags, a Maps link, sometimes a website, and filter flags that drive client-side show/hide. That's a data structure with a render function, not prose with embedded components. Forcing it into the `travel` MDX schema would mean either losing the filtering entirely or faking it with something clunkier than what's already live and working.

**Recommended shape:** a `houston` content collection, `type: 'data'`, one JSON or YAML file per category, or one file holding the full `SECTIONS` array — whichever keeps the 10-category, ~90-item structure easiest to maintain. The category/item schema, inferred directly from the live JS:

```ts
const houstonSection = z.object({
  title: z.string(),
  note: z.string(),
  items: z.array(
    z.object({
      name: z.string(),
      where: z.string(),
      why: z.string(),
      tags: z.array(z.tuple([z.string(), z.enum(['good', 'warn']).optional()])),
      filters: z.array(z.string()),
      site: z.string().url().optional(),
      map: z.string(),
    }),
  ),
});
```

The filter chip bar (`Everything`, `Food`, `Indoor / AC`, `Free`, `Open Monday`, `Open late`, `Book ahead`, `Active`, `Group of 9`, `Obscure pile`) and the render/count logic should be ported as a small client island (`client:load`), not server-rendered — it's genuinely interactive and that's core to how the page gets used on a phone mid-weekend.

**The exact live content, fetched from `houston.hailehq.com`, to transcribe into that structure — all ten sections, verbatim:**

1. **Immersive & strange** — Meow Wolf Radio Tave, Buffalo Bayou Park Cistern, Seismique, Museum of Illusions, Kemah Boardwalk
2. **Active — everyone participates** — Buffalo Bayou kayak/bat tour, Korean BBQ + karaoke, Momentum Silver Street, Immersive Gamebox, Chicken N Pickle, The Escape Game, Sandbox VR, Battlefield Houston, Topgolf, iFLY
3. **Make something you take home** — Glassblowing Houston, The Mad Potter, Cooking With A Twist, Painting with a Twist, The Printing Museum
4. **Compete** — Curling Club of Houston, Cidercade, K1 Speed, Pinstripes, BATL Grounds, Home Run Dugout, Main Event
5. **Free & short** — Waugh Drive bat colony, Dan Flavin at Richmond Hall, "The Light Inside" (Turrell, MFAH), Lee & Joe Jamail Skatepark, Waterwall Park, Twilight Epiphany Skyspace, Discovery Green
6. **Weird Houston** — Orange Show Monument, Smither Park, Beer Can House
7. **Catharsis & oddities** — iSmash Cypress, Cypress Trails Ranch, Texas TreeVentures, Crabbing off a pier
8. **Soup dumplings** — Wanna Bao, One Dragon, Loves Dumpling House, Xiaolong Dumpling, Trendy Dumpling, Shanghai Dumpling, Bee Bite Dumpling, Golden Dumpling House, 88 Dumpling House, Dough Zone Dumpling House
9. **Ramen** — Mensho, Tiger Den, AFURI, Ramen Tatsu-ya, Kazzan Ramen & Bar, Ramen Bar Ichi, JINYA Ramen Bar, Ramen Moto, RAKKAN Ramen, Toyori, Moonlight Miso
10. **Family dinner for 9** — Taste of Texas, Lost & Found, Winsome Prime, Casa do Brasil, Athena's Greek & European Kitchen, The Butcher's Grille, Niko Niko's, Goode Company Seafood, Prima Pasta, Ouisie's Table
11. **Interesting dining experiences for 9** — Saigon Pagolac, Liuyishou Hot Pot, Tourão, Blue Nile, Crawfish & Noodles, Fung's Kitchen, POST Market, Traveler's Table, The Original Ninfa's on Navigation, Hobbit Cafe
12. **Obscure pile — deep cuts** — Patis & Toyo, Mikiya Wagyu Shabu House, Vishala, ChòpnBlọk, Kasra Persian Grill, Sarabell Calabar, Foreign Grill, Triple Pepper, Chopan Kabob House, Govinda's
13. **Full-day trips** — Space Center Houston, Moody Gardens, Baywatch Dolphin Tours, Galveston Pleasure Pier

Plus three static sections at the bottom: **Combos that stack** (6 pairings), **The Monday problem** (closures + the restaurant-specific Monday closures), **Considered and skipped** (10 items, including the note that Ninja Ramen closed permanently Dec 30 2025).

**Every `why`, every tag, every rating-and-review-count, every hours caveat above exists verbatim in the live HTML already retrieved this session — Claude Code should fetch `https://houston.hailehq.com` directly to pull the complete `SECTIONS` JS array rather than retype from this summary, since the array is the actual source of truth and copy-paste from it eliminates transcription risk entirely.**

---

## 5. Blookets — new content collection, exact entries

Real, live, substantial: **82 Blooket sets across 5 grades** (1st–5th), each grade broken into subjects (ELA, Math, Science, Social Studies, and for 5th grade an "ELA (Novel Study)" subgroup for Esperanza Rising).

Schema — this matches what I proposed earlier in `REPO-SETUP.md`, just now with real data instead of placeholders:

```ts
const blookets = defineCollection({
  type: 'data',
  schema: z.object({
    grade: z.string(),
    subjects: z.array(
      z.object({
        name: z.string(),
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
```

**Fetch `https://hailehq.com/school/blookets/` directly and transcribe all 82 entries exactly** — titles and Blooket URLs both matter (the URLs are the actual join links; a typo breaks the set). Preserve grade order (1st→5th) and subject order within each grade as they appear live. The standfirst copy ("82 Blooket sets, grouped by grade and subject. Tap a set to open it and grab the join code to play.") should update its count automatically from the data rather than being hardcoded, so it doesn't drift out of sync the next time a set gets added.

---

## 6. What "done" looks like

- `hailehq.com` renders the passport-stamp home page, sidebar nav functional, both stamps and both card sections linking correctly, SVG illustration intact.
- `hailehq.com/travel/iceland-2026` (or wherever the route lands) has the _exact same words_ as today's `iceland.hailehq.com`, in the new visual system.
- `hailehq.com/travel/houston-2026` has all 13 sections, all ~90 venues, the filter chips actually filtering, and the three closing sections (combos, Monday problem, skipped) intact.
- `hailehq.com/school/blookets` has all 82 sets, grouped correctly, every link opening the right Blooket set.
- All four pull from one `Sidebar.astro` and one `tokens.css` — no page reimplementing its own nav or its own color variables.

Diff against the three live URLs (`hailehq.com`, `iceland.hailehq.com`, `houston.hailehq.com`) and the fetched Blookets page when in doubt — they're the ground truth this whole document was built from.
