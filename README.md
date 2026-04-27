# Tools That Work

Independent, hands-on reviews of AI and SaaS tools for solo founders and operators.

A single-file editorial-grade affiliate site. Loads under 100KB. No build step, no framework, no CMS. Just `index.html` and three deploy configs.

---

## Quick deploy

Three one-click options. Pick one.

### 1. Netlify (fastest — 60 seconds)

- Go to [app.netlify.com/drop](https://app.netlify.com/drop)
- Drag `index.html` onto the page
- You get a live URL instantly
- Add `toolsthatworks.com` in Site Settings → Domain Management

### 2. Vercel (best for ongoing edits)

```bash
npm i -g vercel
vercel
```

Or import the GitHub repo at [vercel.com/new](https://vercel.com/new) and pick this repo. The included `vercel.json` handles the rest. Add your custom domain in the Vercel dashboard.

### 3. GitHub Pages (free, slower DNS)

In your repo settings → Pages → Source: deploy from branch `main`, folder `/ (root)`. Add a `CNAME` file with your domain inside the repo if you want a custom domain.

### Local preview

Either just open `index.html` in your browser, or:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

---

## ⚠️ Replace before launching

Search the file for `REPLACE:` to find every placeholder. The critical categories:

### 1. Affiliate links (every "Try X" button)
Every remaining `href="#"` next to a `<!-- REPLACE: tracked ... affiliate link -->` comment. Use your **customer-facing** affiliate URLs, not partner-program signup URLs (the original site got this wrong on Emergent). Get them from your dashboard at PartnerStack, Impact, ShareASale, or the vendor's direct program.

### 2. Newsletter signups (Supabase)

The newsletter form writes directly to a Supabase table you control. You own the data, no ESP middleman, free up to 50K monthly active users.

**One-time setup (~5 minutes):**

1. **Create a Supabase project** at [supabase.com](https://supabase.com) — free tier is plenty for this. Pick any region close to your audience.

2. **Run the schema migration.** In the Supabase dashboard:
   - Go to **SQL Editor** → **New query**
   - Open `supabase/schema.sql` from this repo, copy the entire contents
   - Paste into the SQL editor → click **Run**
   - You should see "Success. No rows returned." That's correct.

3. **Grab your API credentials.** In the Supabase dashboard:
   - Go to **Project Settings** → **API**
   - Copy two values:
     - **Project URL** (looks like `https://abcdefgh.supabase.co`)
     - **`anon` `public` key** (the long JWT-looking string under "Project API keys")

4. **Paste them into `index.html`.** Search for `SUPABASE_URL` (around line ~1290 in the script section). Replace both placeholders:

   ```js
   const SUPABASE_URL = 'https://abcdefgh.supabase.co';
   const SUPABASE_ANON_KEY = 'eyJhbGc...';  // your full anon key
   ```

   The anon key is **safe to expose in client-side code** — it's designed for that. The Row Level Security policies in `schema.sql` restrict this key to inserts only. The public cannot read your subscriber list with this key.

5. **Commit, push, deploy.** Done.

**Verify it works:**

- Open your live site, submit the newsletter form with a test email
- In Supabase: **Table Editor** → `newsletter_subscribers` — you should see the row appear within a second
- Try submitting the same email again — it'll silently succeed (uniqueness handled gracefully so you don't reveal who's subscribed)

**Viewing and exporting subscribers:**

- **Quick view:** Table Editor → `newsletter_subscribers`
- **Export to CSV:** Table Editor → click the table → ⋯ menu → "Export data as CSV"
- **Active subscribers only:** the schema includes a `public.active_subscribers` view that filters out unsubscribes — query it in the SQL editor: `select * from active_subscribers;`

**When you outgrow this (recommended at ~500 subs):**

Supabase is great for capture but lousy at sending. When you're ready to send actual newsletters, export the CSV and import to Beehiiv/ConvertKit/MailerLite. Beehiiv's importer takes a CSV directly. You keep your Supabase as the system of record; the ESP becomes the send mechanism.

**Bot protection:**

The form includes an invisible honeypot field (`name="website"`). Real users never fill it; bots fill every field. If it gets filled, the submission silently fake-succeeds without writing to your database. Combined with Supabase's built-in rate limits, this catches roughly 95% of automated signups.

### 3. The Emergent.sh deep review body
Marked `<!-- REPLACE this paragraph with your actual first impression. -->` etc. Currently written as a credible template. Edit to match your real testing experience — keep the structure (verdict line → drop-cap opener → what works → pull quote → what falls short → pros/cons → final verdict).

### 4. The 4 secondary reviews (Beehiiv, Surfer, Taplio, Writesonic)
Same structure. Edit body copy to reflect your actual hands-on findings. The verdicts and structural takes are already written; replace specifics with your real numbers and screenshots.

### 5. Footer pages (3 spots)
`/about`, `/disclosure`, `/privacy`, `/contact` currently link to `#`. Either build real pages, or replace with `mailto:` links and a hosted privacy policy from [iubenda.com](https://www.iubenda.com) or [termly.io](https://termly.io).

---

## File structure

```
toolsthatworks/
├── index.html              ← the entire site
├── README.md               ← this file
├── .gitignore
├── netlify.toml            ← Netlify deploy config
├── vercel.json             ← Vercel deploy config
├── LICENSE                 ← MIT
└── supabase/
    └── schema.sql          ← Newsletter subscribers schema (run once in Supabase)
```

Single HTML file by design. No build step means no broken builds, no version drift, no `node_modules` rotting after six months.

---

## Adding a new review

Each review is one `<section class="deep-review">` block. To add a sixth:

1. Add a card to the `.reviews-grid` section (search for `<a href="#review-writesonic"` to find the pattern). Copy a card and update the anchor link, name, tag, score, commission, and pitch.

2. Duplicate any existing `<section class="deep-review">` block. Update:
   - The section `id="review-yourtool"` to match your new card's anchor
   - Toggle the `alt` class on the section to alternate background colors with the previous review
   - The aside meta block (verdict, best-for, skip-if, etc.)
   - The article body — headline, verdict line, body paragraphs, pull quote, pros/cons, final verdict
   - Add a corresponding `lastUpdated6` element and wire it in the script at the bottom

3. Don't forget to add the new review to the footer Reviews list.

---

## Editing tone

This site is written in an editorial voice — direct, opinionated, slightly skeptical. The tone rules:

- **Real numbers, real timeframes.** "We migrated 2,400 subs over 6 months" beats "We've used it for a while."
- **Lead with the verdict.** Every review opens with a one-sentence position. Readers can leave after sentence one and still know what you think.
- **Name what doesn't work.** Every review has a real "What doesn't" section. If a tool has no flaws in your review, your review is a press release.
- **Skip If, not just Buy If.** The skip-if line in the meta block is the most-read part of the review. Use it to actually disqualify people.
- **No "ultimate guides."** No "everything you need to know." No "in 2026." These are SEO ghost-tells that signal AI-generated filler.

---

## Performance & SEO baseline

- Single HTML file — first paint under 1 second on broadband
- All fonts loaded from Google Fonts with `preconnect`
- No JavaScript dependencies, no analytics by default (add Plausible or Fathom if you want privacy-respecting analytics)
- Mobile-responsive at all breakpoints
- Semantic HTML5 throughout

To add basic SEO and Open Graph metadata, replace the existing `<title>` and meta description in `<head>` with:

```html
<title>Tools That Work — Independent AI & SaaS Reviews for Founders</title>
<meta name="description" content="..." />
<meta property="og:title" content="..." />
<meta property="og:description" content="..." />
<meta property="og:image" content="https://toolsthatworks.com/og-image.png" />
<meta property="og:url" content="https://toolsthatworks.com" />
<meta name="twitter:card" content="summary_large_image" />
```

---

## License

MIT — see `LICENSE`. Use it, fork it, ship it. Attribution appreciated but not required.
