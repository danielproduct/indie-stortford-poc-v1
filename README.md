# Indie Stortford — public-preview preparation

A free, static directory for discovering local businesses in Bishop's Stortford.

**Current live URL**: https://danielproduct.github.io/indie-stortford-poc-v1/

## Design and data policy

- No account, cookies, analytics, tracking, paid APIs, backend or runtime dependencies.
- Businesses may appear before their independent ownership has been verified. Never label ownership as confirmed without supporting public evidence.
- Business biographies are draft editorial summaries, **not sources**. A `sourceUrl` is a public record or first-party source about listing details; it does not itself verify ownership.
- Do not invent map pins. The Maps action searches the business by name or uses a public address where checked.
- The Gent's Barber Club is the correct business confirmed by the project owner. Its address and services have an independent public source; classification as independently owned remains a separate evidence check.
- The `Doxy’s` entry still requires a name/identity check. Do not replace it with `Doyy's` without establishing that it is the same business.
- Public correction requests use GitHub Issues as a temporary mechanism. A no-login option is required for a wider consumer launch.

## Local checks

Use a local static server (`python3 -m http.server 8000`) and open `http://localhost:8000/`.

```sh
node --check app.js
node --check data.js
node --test tests/*.test.mjs
```

## Approval gates

- Changes go to feature branches and pull requests; never push directly to main for a release.
- Raymond reviews code, security and tests; Jony verifies rendered desktop/mobile.
- Human review of business names and independent status is required.
- No merges, deployments, domain purchases or ads without explicit owner sign-off.