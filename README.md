# Springfield Systems site

Static project showcase for Springfield Systems' public issue-evidence tools and examples. It is designed for GitHub Pages and requires no framework, package installation, external font, analytics service, form handler, or build step.

## Current state

- Jake Springfield is identified only as a public-facing business alias, not a staff profile.
- The primary project is the free, MIT-licensed Public Issue Evidence Capsule GitHub Action.
- The site documents a public-evidence method, one retrospective sample, and a public issue-triage guide.
- A neutral public Issue Form accepts one public GitHub issue URL for an ELIGIBLE or INELIGIBLE scope answer only.
- OpenAI Codex materially assists research and drafting; no separate human review is promised.
- Retrospective examples are labeled as non-customer work, and the Appwrite sample does not claim runtime reproduction or endorsement.
- No checkout, price, commercial transaction link, private data, credentials, tracking code, or owner-identifying link is included.

## Files

- `index.html`: semantic page structure and copy
- `github-issue-triage-checklist/index.html`: standalone search-intent guide for the reproduce, close, escalate, or fund decision
- `styles.css`: responsive visual system, accessibility states, and print rules
- `verify.mjs`: dependency-free content, link, disclosure, and accessibility checks
- `.github/ISSUE_TEMPLATE/fit-check.yml`: one-URL, public-only eligibility form with no analysis or sales path
- `.github/ISSUE_TEMPLATE/config.yml`: disables unstructured intake and links the security boundary
- `SECURITY.md`: directs vulnerability reports away from this non-security service
- `SAMPLE_PACKET.md`: public, retrospective example of the paid brief format
- `robots.txt` and `sitemap.xml`: crawler discovery for the two canonical public pages

## Verify locally

From this directory, run:

```powershell
node .\verify.mjs
```

For a local preview:

```powershell
python -m http.server 8080 --directory .
```

Then open `http://127.0.0.1:8080/`.

## GitHub Pages handoff

Publish these files at the root of `jakespringfield/jakespringfield.github.io`.
GitHub Pages serves that repository at `https://jakespringfield.github.io/`.
