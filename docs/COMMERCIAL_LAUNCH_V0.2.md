# Indie Stortford — Commercial launch readiness v0.2
Date: 16 November 2026
Status: PREPARATION ONLY — no DNS changes, domain purchases, new hosting deployment, AdSense application or ad scripts authorised yet.
Source: Dan's approval in ChatGPT to prepare Cloudflare Pages migration and Google AdSense readiness.

## Verified existing build
- Repository: danielproduct/indie-stortford-poc-v1
- Review branch: feature/on-site-feedback. Original main / GitHub Pages remains unchanged.
- Existing public test alias: https://indie-stortford-preview.vercel.app/
- Root contents at review: README.md and index.html; static HTML/CSS/JS only, no database/backend.
- 42 listings in index.html as of 16 November 2026; map is schematic, not geocoded.
- Feedback: external Google Form, embedded on desktop, opens new tab on mobile.
- Business enquiries: mailto:danielthenews@gmail.com.
- Newly added pages on review branch: about.html and privacy.html; both are prelaunch drafts that need owner review.

## Hosting / GitHub deployment proposal
- Cloudflare Pages via GitHub integration, selecting this exact repository.
- Framework preset: None / static; build command: leave blank; output directory: root of repository.
- Prefer initial deployment of feature/on-site-feedback to a non-public review URL or branch preview before a launch merge.
- Verify site's routing for /, /about.html, /privacy.html and all CSS/JS; verify mobile and desktop forms and mailto.
- Confirm project ownership, plan, and cost limits in Cloudflare dashboard. Free Pages currently supports static sites, Git-connected builds, and free-plan project/build limits. Domain purchase, DNS edits and cutover require separate approval.
- Do not terminate or change Vercel alias until replacement has passed test.

## AdSense gate
- No AdSense publisher ID, site approval or owned custom domain provided yet. Do not manufacture an ads.txt record, publisher code, or ad slots.
- Once domain is selected and approved: register the site in the owner's AdSense account, complete ownership verification, request site review.
- Only a site marked Ready by AdSense can serve adverts.
- Integrate the certified TCF consent management platform required for serving ads to UK/EEA visitors; review privacy notice and cookie information before ad delivery.
- Validate policy-compliant original content and listing quality; directory size alone is not evidence of approval.
- When AdSense supplies the publisher ID, add verified code and ads.txt per Google's instructions, then test.
- Confirm actual page-view analytics and lawful implementation; do not invent visitor metrics.

## Prelaunch product / content checks
- Review site branding, contact identity, privacy/legal notice, and commercial operator details; owner to confirm before public release.
- Directory cards display numbers that could appear to rank businesses despite IDs being insertion order. Decide whether to remove.
- 'Things to Do' is empty although Ace of Lanes is currently Food & Drink. Review category model before wider launch.
- Independence filter taxonomy needs explanatory wording. 'Local only' currently matches any class including 'local', including hybrid labels.
- Audit business descriptions for source quality and stale claims; validate map directions and addresses.
- Check live email action, feedback form and mobile accessibility.
- The newly written privacy page is a factual starting draft, not legal sign-off; review it again after host/analytics/CMP decisions.

## Release gate
1. Dan approves domain and any associated cost.
2. Dan reviews about/privacy and public site copy.
3. New Pages build passes device/functional verification.
4. Dan explicitly approves DNS/public site cutover.
5. AdSense approval + certified CMP integrated before paid advertising goes live.
