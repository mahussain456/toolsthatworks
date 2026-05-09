# Tools That Work

Independent AI and SaaS reviews for founders, operators, creators, and builders.

This version is a multi-page static editorial site built for:

- Hands-on product reviews
- Focused comparison pages
- SEO-friendly category guides
- Clear review methodology and affiliate disclosure
- Fast deployment with no build step

## Pages

```text
index.html                    Homepage
reviews.html                  Review index
compare.html                  AI tool comparison hub
how-we-test.html              Methodology and disclosure
category-ai-app-builders.html AI app builders category page
category-ai-writing-seo.html  AI writing and SEO category page
category-ai-video-image.html  AI video and image category page
styles.css                    Shared visual system
site.js                       Mobile nav, date, newsletter placeholder
robots.txt                    Crawl rules
sitemap.xml                   Sitemap for deployed clean URLs
llms.txt                      Machine-readable site context for AI systems
```

## Local Preview

From the `files` folder:

```bash
python -m http.server 8088
```

Then open:

```text
http://localhost:8088/index.html
```

## Deployment

The included `vercel.json` uses clean URLs. Deploy the `files` folder to Vercel, Netlify, or any static host.

Recommended production URLs:

```text
/
/reviews
/compare
/how-we-test
/category-ai-app-builders
/category-ai-writing-seo
/category-ai-video-image
```

## Before Launch

1. Wire newsletter forms in `site.js` to Beehiiv, ConvertKit, MailerLite, or your ESP.
2. Replace placeholder review CTAs with tracked affiliate links where applicable.
3. Add real author/contact details.
4. Expand individual review pages once each product review is ready.
5. Update `sitemap.xml` if you add or rename pages.
6. Add Open Graph images if you want richer social previews.

## Editorial Rules

- Reviews should be based on real workflows.
- Every review should include who should buy, who should skip, and what breaks.
- Affiliate links must be disclosed near the listing or CTA.
- No paid placements.
