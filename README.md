# Tools That Work

Independent AI and SaaS reviews for solo founders.

This is a hand-rolled static editorial site. There is no build step, framework, or package manager required.

## Current Structure

```text
index.html                              Homepage / landing page
blog.html                               Standalone blog page
reviews/emergent-sh.html                Emergent.sh deep review
reviews/beehiiv.html                    Beehiiv deep review
reviews/surfer-seo.html                 Surfer SEO deep review
reviews/taplio.html                     Taplio deep review
reviews/writesonic.html                 Writesonic deep review
comparisons/ai-app-builders.html        AI app builders comparison
comparisons/newsletter-platforms.html   Newsletter platforms placeholder
about.html                              Trust page
disclosure.html                         Affiliate disclosure
privacy.html                            Privacy page
styles.css                              Shared editorial styles
site.js                                 Mobile nav, legacy hash redirects, newsletter placeholder
vercel.json                             Vercel headers and redirects
robots.txt                              Crawl rules
sitemap.xml                             XML sitemap
llms.txt                                AI-readable site context
REFACTOR_NOTES.md                       Phase 1 assumptions and TODOs
```

## Local Preview

```bash
python -m http.server 8088
```

Then open:

```text
http://localhost:8088/
```

## Phase 1 Notes

The five full review bodies now live on dedicated URLs under `/reviews/`. The homepage keeps the hero, review-card index, comparison-card section, evaluation rules, reviewer placeholder card, methodology, and newsletter signup.

The old hash URLs are handled with a client-side redirect map in `site.js` because URL fragments are not sent to Vercel. Path-style redirects are configured in `vercel.json`.

## Owner TODOs

See `REFACTOR_NOTES.md` for all assumptions, owner TODOs, and deviations from the refactor brief.
