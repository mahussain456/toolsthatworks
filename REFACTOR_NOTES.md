# Phase 1 Refactor Notes

## Assumptions
- The active hosting target is Vercel because `vercel.json` and `.vercel/project.json` are present.
- URL fragments such as `index.html#review-beehiiv` cannot be handled by server-side 301 redirects because browsers do not send fragments to the server. Vercel redirects were added for path-style fallbacks, and a client-side legacy hash redirect map was added in `site.js`.
- The bundled `toolsthatworks.zip` copy of the original long homepage was treated as the canonical source for review body copy and the editorial visual identity.
- The existing newsletter form had only a local JavaScript placeholder handler, so the new Insider Edition checkbox is included in the submitted `FormData` and captured by the placeholder handler until the owner connects a real ESP/form endpoint.

## Owner TODOs
- Replace reviewer placeholders in the homepage "Who tests these tools" card.
- Replace each review page `Last Updated` date with the true original publish/update date if different from `2026-05-09`.
- Connect `#newsForm` to Beehiiv, Netlify Forms, or the final email service and store the `insider_interest` field.
- Write the newsletter platform comparison content at `/comparisons/newsletter-platforms.html`.
- Replace placeholder `href="#"` affiliate CTAs with tracked destination URLs where applicable.

## Deviations
- True 301 redirects for old hash URLs are technically impossible at the server layer; client-side redirects were added for those exact legacy hashes.
