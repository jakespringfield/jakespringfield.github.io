# Springfield Systems site

Static, single-page site for Springfield Systems. It is designed
for GitHub Pages and requires no framework, package installation, external font,
analytics service, form handler, or build step.

## Current state

- Jake Springfield is identified only as a public-facing business alias, not a staff profile.
- The active product is a $29 Public Bug Evidence Decision Brief for one public, non-security GitHub issue.
- The buyer supplies one repository URL, one issue URL, and at most two additional same-repository public GitHub URLs.
- The output is a source-linked evidence classification, decisive evidence gap, bounded buyer-run acceptance proposal, and GO, NO-GO, or NEEDS-INPUT next action.
- OpenAI Codex materially assists research and drafting; no separate human review is promised.
- Checkout is handled by Moltgate at `https://moltgate.com/jakespringfield/public-bug-evidence-decision-brief/`.
- Retrospective examples are labeled as non-customer work, and the Appwrite sample does not claim runtime reproduction or endorsement.
- No private data, credentials, contact form, tracking code, or owner-identifying link is included.

## Files

- `index.html`: semantic page structure and copy
- `github-issue-triage-checklist/index.html`: standalone search-intent guide for the reproduce, close, escalate, or fund decision
- `styles.css`: responsive visual system, accessibility states, and print rules
- `verify.mjs`: dependency-free content, link, disclosure, and accessibility checks
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
