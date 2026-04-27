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

There are **24 `REPLACE:` markers** in `index.html`. Search the file for `REPLACE` to find them all. The critical categories:

### 1. Author identity (5 spots in the author block)
- `.author-photo` — set `background-image: url('your-photo.jpg'); background-size: cover;` and remove the "YN" placeholder text
- `<h3>Your Name</h3>` — your real name
- The bio paragraph below your name
- (Optional) Add LinkedIn / X / YouTube links to the author block

### 2. Affiliate links (10 spots — every "Try X" button)
Every `href="#"` next to a `<!-- REPLACE: tracked ... affiliate link -->` comment. Use your **customer-facing** affiliate URLs, not partner-program signup URLs (the original site got this wrong on Emergent). Get them from your dashboard at PartnerStack, Impact, ShareASale, or the vendor's direct program.

### 3. Email forms (2 spots)
The lead-magnet form and the newsletter form both currently fake the submission. Wire them to your ESP. Beehiiv embed is simplest:

```html
<!-- Replace the existing form body with your Beehiiv embed -->
<iframe
  src="https://embeds.beehiiv.com/YOUR-EMBED-ID"
  data-test-id="beehiiv-embed"
  width="100%" height="320"
  frameborder="0" scrolling="no"
  style="border-radius: 0; background: transparent;"
></iframe>
```

Alternatives: ConvertKit, MailerLite, EmailOctopus. All offer embed snippets.

### 4. The Emergent.sh deep review body
Marked `<!-- REPLACE this paragraph with your actual first impression. -->` etc. Currently written as a credible template. Edit to match your real testing experience — keep the structure (verdict line → drop-cap opener → what works → pull quote → what falls short → pros/cons → final verdict).

### 5. The 4 secondary reviews (Beehiiv, Surfer, Taplio, Writesonic)
Same structure. Edit body copy to reflect your actual hands-on findings. The verdicts and structural takes are already written; replace specifics with your real numbers and screenshots.

### 6. Footer pages (3 spots)
`/about`, `/disclosure`, `/privacy`, `/contact` currently link to `#`. Either build real pages, or replace with `mailto:` links and a hosted privacy policy from [iubenda.com](https://www.iubenda.com) or [termly.io](https://termly.io).

### 7. Coming Soon product
The "$97 Stack Audit" is a placeholder. Either build the product (recommended once you have ~1K subs), update the price, or remove the section entirely.

---

## File structure

```
toolsthatworks/
├── index.html        ← the entire site
├── README.md         ← this file
├── .gitignore
├── netlify.toml      ← Netlify deploy config
├── vercel.json       ← Vercel deploy config
└── LICENSE           ← MIT
```

Single file by design. No build step means no broken builds, no version drift, no `node_modules` rotting after six months.

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
