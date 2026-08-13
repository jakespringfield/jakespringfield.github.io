import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";

const requiredFiles = [
  "index.html",
  "github-issue-triage-checklist/index.html",
  "styles.css",
  "README.md",
  "SECURITY.md",
  "SAMPLE_PACKET.md",
  "robots.txt",
  "sitemap.xml",
  "f3e1c6c368f2466793856b801117f396.txt",
  "verify.mjs",
  ".github/ISSUE_TEMPLATE/config.yml",
  ".github/ISSUE_TEMPLATE/fit-check.yml",
];

for (const file of requiredFiles) await access(new URL(file, import.meta.url));

const [html, guide, css, readme, sample, robots, sitemap, indexNowKey, issueConfig, fitCheck] = await Promise.all([
  readFile(new URL("index.html", import.meta.url), "utf8"),
  readFile(new URL("github-issue-triage-checklist/index.html", import.meta.url), "utf8"),
  readFile(new URL("styles.css", import.meta.url), "utf8"),
  readFile(new URL("README.md", import.meta.url), "utf8"),
  readFile(new URL("SAMPLE_PACKET.md", import.meta.url), "utf8"),
  readFile(new URL("robots.txt", import.meta.url), "utf8"),
  readFile(new URL("sitemap.xml", import.meta.url), "utf8"),
  readFile(new URL("f3e1c6c368f2466793856b801117f396.txt", import.meta.url), "utf8"),
  readFile(new URL(".github/ISSUE_TEMPLATE/config.yml", import.meta.url), "utf8"),
  readFile(new URL(".github/ISSUE_TEMPLATE/fit-check.yml", import.meta.url), "utf8"),
]);

const actionUrl = "https://github.com/jakespringfield/public-issue-evidence-capsule";
const fitCheckUrl = "https://github.com/jakespringfield/jakespringfield.github.io/issues/new?template=fit-check.yml";

for (const [name, document] of [["home", html], ["guide", guide]]) {
  assert.match(document, /^<!doctype html>/i, `${name} must use an HTML5 doctype`);
  assert.match(document, /<html lang="en">/i, `${name} must declare English`);
  assert.match(document, /name="viewport"/i, `${name} requires responsive metadata`);
  assert.match(document, /class="skip-link"/i, `${name} requires skip navigation`);
  assert.match(document, /<main id="main">/i, `${name} requires a main landmark`);
  assert.doesNotMatch(document, /<form\b/i, `${name} must not collect data directly`);
  assert.doesNotMatch(document, /\b(?:mailto|tel|javascript):/i, `${name} may not add active contact or script links`);
  assert.doesNotMatch(document, /moltgate\.com|\$\s?\d+|order the|checkout|payment|paid request/i, `${name} must remain a project showcase, not a transaction funnel`);
}

assert.match(html, /Make public issue evidence reviewable/i, "project-first headline is required");
assert.match(html, /Public Issue Evidence Capsule/i, "free Action must be the primary project");
assert.match(html, /no target-code execution, telemetry, private data, or vulnerability intake/i, "runtime and data boundaries are required");
assert.match(html, /Request a free public scope check/i, "free public scope path is required");
assert.match(html, /no analysis or purchase is included/i, "scope check must be non-commercial and non-analytical");
assert.match(html, /Jake Springfield is the public-facing business alias/i, "alias boundary is required");
assert.match(html, /OpenAI Codex materially assists/i, "AI authorship disclosure is required");
assert.match(html, /independent of OpenAI/i, "OpenAI independence boundary is required");
assert.match(html, /rel="canonical" href="https:\/\/jakespringfield\.github\.io\/"/i, "home canonical URL is required");

assert.match(guide, /GitHub issue triage for the decision before the fix/i, "guide title is required");
assert.match(guide, /Eight steps before anyone starts fixing/i, "eight-step checklist is required");
assert.match(guide, /Reporter-reported/i, "guide must distinguish reporter evidence");
assert.match(guide, /Supported by public evidence/i, "guide must distinguish source support");
assert.match(guide, /Independently reproduced/i, "guide must define runtime reproduction");
assert.match(guide, /Insufficient public evidence/i, "guide must name insufficient evidence");
assert.match(guide, /Request a free public scope check/i, "guide needs the public scope path");
assert.match(guide, /No analysis, recommendation, quote, purchase, or follow-up is included/i, "guide must preserve the neutral scope-check boundary");
assert.match(guide, /rel="canonical" href="https:\/\/jakespringfield\.github\.io\/github-issue-triage-checklist\/"/i, "guide canonical URL is required");

assert.match(sample, /Sample Public Issue Evidence Packet/i, "sample title must match the public method");
assert.match(sample, /not customer work, a paid engagement, or an endorsement/i, "sample provenance boundary is required");
assert.match(sample, /no separate human review is claimed/i, "sample review boundary is required");

assert.match(fitCheck, /name: Free public-issue eligibility check/i, "fit-check name is required");
assert.match(fitCheck, /One existing https:\/\/github\.com\/OWNER\/REPO\/issues\/NUMBER URL only/i, "fit-check must accept one issue URL only");
assert.match(fitCheck, /This is not a security vulnerability/i, "fit-check needs a non-security attestation");
assert.match(fitCheck, /contains only the URL above/i, "fit-check must exclude extra submitted data");
assert.match(fitCheck, /only ELIGIBLE or INELIGIBLE and no analysis, recommendation, purchase link, or follow-up/i, "fit-check response boundary is required");
assert.equal((fitCheck.match(/required: true/g) ?? []).length, 5, "URL plus four attestations must be required");
assert.doesNotMatch(fitCheck, /type: textarea|type: upload|moltgate\.com|\$\s?\d+/i, "fit-check may not collect free text/uploads or sell");
assert.match(issueConfig, /blank_issues_enabled: false/i, "unstructured intake must remain disabled");

const allowedHomeExternal = new Set([
  "https://jakespringfield.github.io/",
  actionUrl,
  fitCheckUrl,
  "https://github.com/pallets/click/issues/3502",
  "https://github.com/appwrite/appwrite/issues/9904",
  "https://github.com/jakespringfield/jakespringfield.github.io/blob/main/SAMPLE_PACKET.md",
]);
const allowedGuideExternal = new Set([
  "https://jakespringfield.github.io/github-issue-triage-checklist/",
  actionUrl,
  fitCheckUrl,
]);

function validateLinks(document, allowedExternal, allowedLocal, name) {
  const hrefs = [...document.matchAll(/\bhref="([^"]+)"/gi)].map((match) => match[1]);
  for (const href of hrefs) {
    if (href.startsWith("#")) {
      assert.match(document, new RegExp(`\\bid="${href.slice(1)}"`), `${name} missing target ${href}`);
    } else if (/^https:\/\//i.test(href)) {
      assert.ok(allowedExternal.has(href), `${name} external link not allowlisted: ${href}`);
    } else {
      assert.ok(allowedLocal.has(href), `${name} local link not allowlisted: ${href}`);
    }
  }
  for (const link of allowedExternal) assert.ok(hrefs.includes(link), `${name} missing required link: ${link}`);
  return hrefs;
}

const homeHrefs = validateLinks(html, allowedHomeExternal, new Set(["styles.css", "github-issue-triage-checklist/"]), "home");
const guideHrefs = validateLinks(guide, allowedGuideExternal, new Set(["../index.html", "../styles.css"]), "guide");
assert.equal(homeHrefs.filter((href) => href === actionUrl).length, 3, "home needs three free-Action paths");
assert.equal(homeHrefs.filter((href) => href === fitCheckUrl).length, 2, "home needs two public fit-check paths");
assert.equal(guideHrefs.filter((href) => href === actionUrl).length, 1, "guide needs one free-Action path");
assert.equal(guideHrefs.filter((href) => href === fitCheckUrl).length, 1, "guide needs one public fit-check path");

assert.match(robots, /^User-agent: \*/m, "robots.txt must address all crawlers");
assert.match(robots, /Sitemap: https:\/\/jakespringfield\.github\.io\/sitemap\.xml/, "robots must advertise sitemap");
assert.match(sitemap, /https:\/\/jakespringfield\.github\.io\/github-issue-triage-checklist\//, "sitemap must include guide");
assert.equal(indexNowKey.trim(), "f3e1c6c368f2466793856b801117f396", "IndexNow key must match");
assert.doesNotMatch(readme, /moltgate\.com|\$\s?\d+/i, "README must describe a project showcase, not commerce");

assert.match(css, /@media \(max-width: 720px\)/, "mobile layout rules are required");
assert.match(css, /@media \(prefers-reduced-motion: reduce\)/, "reduced-motion rules are required");
assert.match(css, /:focus-visible/, "visible keyboard focus rules are required");

function luminance(hex) {
  const channels = hex.match(/[a-f\d]{2}/gi).map((value) => {
    const channel = Number.parseInt(value, 16) / 255;
    return channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2];
}
function contrast(foreground, background) {
  const light = Math.max(luminance(foreground), luminance(background));
  const dark = Math.min(luminance(foreground), luminance(background));
  return (light + 0.05) / (dark + 0.05);
}
assert.ok(contrast("#17242d", "#f4f1e9") >= 7, "primary contrast must remain strong");
assert.ok(contrast("#59666e", "#f4f1e9") >= 4.5, "muted contrast must meet WCAG AA");

console.log(`PASS ${requiredFiles.length} required files present`);
console.log("PASS project-first GitHub Pages scope with no commercial transaction links");
console.log("PASS free Action, public examples, guide, and neutral fit-check boundaries");
console.log("PASS public-only, non-security, alias, AI, privacy, and independence disclosures");
console.log("PASS allowlisted links, responsive rules, accessibility, and contrast checks");
