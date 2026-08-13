import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";

const requiredFiles = ["index.html", "github-issue-triage-checklist/index.html", "styles.css", "README.md", "SECURITY.md", "SAMPLE_PACKET.md", "robots.txt", "sitemap.xml", "f3e1c6c368f2466793856b801117f396.txt", "verify.mjs", ".github/ISSUE_TEMPLATE/config.yml"];

for (const file of requiredFiles) {
  await access(new URL(file, import.meta.url));
}

const [html, guide, css, readme, sample, robots, sitemap, indexNowKey, issueConfig] = await Promise.all([
  readFile(new URL("index.html", import.meta.url), "utf8"),
  readFile(new URL("github-issue-triage-checklist/index.html", import.meta.url), "utf8"),
  readFile(new URL("styles.css", import.meta.url), "utf8"),
  readFile(new URL("README.md", import.meta.url), "utf8"),
  readFile(new URL("SAMPLE_PACKET.md", import.meta.url), "utf8"),
  readFile(new URL("robots.txt", import.meta.url), "utf8"),
  readFile(new URL("sitemap.xml", import.meta.url), "utf8"),
  readFile(new URL("f3e1c6c368f2466793856b801117f396.txt", import.meta.url), "utf8"),
  readFile(new URL(".github/ISSUE_TEMPLATE/config.yml", import.meta.url), "utf8"),
]);

const checkoutUrl = "https://moltgate.com/jakespringfield/public-bug-evidence-decision-brief/#contactForm";

assert.match(html, /^<!doctype html>/i, "index.html must use an HTML5 doctype");
assert.match(html, /<html lang="en">/i, "document language is required");
assert.match(html, /name="viewport"/i, "responsive viewport metadata is required");
assert.match(html, /class="skip-link"/i, "skip navigation is required");
assert.match(html, /<main id="main">/i, "a labeled main landmark is required");
assert.match(html, /aria-label="Primary navigation"/i, "primary navigation must be labeled");
assert.doesNotMatch(html, /<form\b/i, "the static site must not collect data directly");
assert.doesNotMatch(html, /\b(?:mailto|tel|javascript):/i, "no active contact or script links are allowed");
assert.match(html, /\$29 fixed brief/i, "the concrete fixed price is required");
assert.match(html, /one public, non-security GitHub bug/i, "the one-issue boundary is required");
assert.match(html, /no more than four buyer-supplied public GitHub URLs total, including the repository and issue/i, "the four-total source cap is required");
assert.equal((html.match(/no more than four buyer-supplied public GitHub URLs total/g) ?? []).length, 2, "both homepage scope statements must use the four-total rule");
assert.match(html, /within two business days/i, "the delivery target is required");
assert.match(html, /no separate human review is promised/i, "the human-review boundary is required");
assert.match(sample, /Sample Public Bug Evidence Decision Brief/i, "the sample must match the live product");
assert.match(sample, /no separate human review is claimed/i, "the sample must disclose its review boundary");
assert.match(issueConfig, /blank_issues_enabled: false/i, "unstructured intake must be disabled");
assert.match(html, /rel="canonical" href="https:\/\/jakespringfield\.github\.io\/"/i, "home canonical URL is required");
assert.match(html, /href="github-issue-triage-checklist\/"/i, "the public triage guide must be linked from home");

assert.match(guide, /^<!doctype html>/i, "the guide must use an HTML5 doctype");
assert.match(guide, /<main id="main">/i, "the guide requires a main landmark");
assert.match(guide, /GitHub issue triage for the decision before the fix/i, "the search-intent guide title is required");
assert.match(guide, /Eight steps before anyone starts fixing/i, "the eight-step checklist is required");
assert.match(guide, /Reporter-reported/i, "the guide must distinguish reported evidence");
assert.match(guide, /Supported by public evidence/i, "the guide must distinguish public source support");
assert.match(guide, /Independently reproduced/i, "the guide must define the stronger runtime claim");
assert.match(guide, /Insufficient public evidence/i, "the guide must name insufficient evidence");
assert.match(guide, /no separate human review is promised/i, "the guide must disclose the review boundary");
assert.match(guide, /rel="canonical" href="https:\/\/jakespringfield\.github\.io\/github-issue-triage-checklist\/"/i, "the guide canonical URL is required");
assert.match(guide, /TRIAGE-CHECKLIST/, "the guide needs a privacy-preserving attribution token");
assert.match(guide, /no more than four buyer-supplied same-repository public GitHub URLs total, including the repository and issue/i, "the guide must preserve the four-total source cap");
assert.match(readme, /one repository URL, one issue URL, and at most two additional same-repository public GitHub URLs/i, "the README must preserve the four-total source cap");
assert.match(guide, /"datePublished": "2026-08-12"/, "the structured publication date must match the Chicago publication date");
assert.match(guide, /"dateModified": "2026-08-12"/, "the structured modification date must match the Chicago publication date");
assert.match(guide, /Updated August 12, 2026/, "the visible update date must match the Chicago publication date");
assert.doesNotMatch(guide, /<form\b/i, "the guide must not collect data directly");
assert.doesNotMatch(guide, /\b(?:mailto|tel|javascript):/i, "the guide may not create an active contact route");

const guideAllowedExternalLinks = new Set([
  checkoutUrl,
  "https://jakespringfield.github.io/github-issue-triage-checklist/",
]);
const guideHrefs = [...guide.matchAll(/\bhref="([^"]+)"/gi)].map((match) => match[1]);
for (const href of guideHrefs) {
  if (href.startsWith("#")) {
    const id = href.slice(1);
    assert.match(guide, new RegExp(`\\bid="${id}"`), `missing guide target: ${href}`);
  } else if (/^https:\/\//i.test(href)) {
    assert.ok(guideAllowedExternalLinks.has(href), `guide external link is not allowlisted: ${href}`);
  } else {
    assert.ok(new Set(["../index.html", "../styles.css"]).has(href), `unexpected guide local link: ${href}`);
  }
}

const guideCheckoutLinks = [...guide.matchAll(/<a\b[^>]*href="([^"]+)"[^>]*>/gi)]
  .map((match) => match[1])
  .filter((href) => href === checkoutUrl);
assert.equal(guideCheckoutLinks.length, 2, "the guide requires two visible checkout paths");

assert.match(robots, /^User-agent: \*/m, "robots.txt must address all crawlers");
assert.match(robots, /Sitemap: https:\/\/jakespringfield\.github\.io\/sitemap\.xml/, "robots.txt must advertise the sitemap");
assert.match(sitemap, /https:\/\/jakespringfield\.github\.io\/github-issue-triage-checklist\//, "the sitemap must include the triage guide");
assert.equal((sitemap.match(/<lastmod>2026-08-12<\/lastmod>/g) ?? []).length, 2, "both sitemap dates must match the Chicago publication date");
assert.equal(indexNowKey.trim(), "f3e1c6c368f2466793856b801117f396", "the IndexNow key file must contain the exact key");

const checkoutLinks = [...html.matchAll(/<a\b[^>]*href="([^"]+)"[^>]*>/gi)]
  .map((match) => match[1])
  .filter((href) => href === checkoutUrl);
assert.equal(checkoutLinks.length, 3, "three visible checkout paths are required");

const requiredTruths = [
  "Public, non-security data only.",
  "AI-assisted operation.",
  "Business alias, not a staff profile.",
  "Jake Springfield is the public-facing business alias",
  "No private credentials or data.",
  "Not an OpenAI service.",
  "Order the $29 brief",
  "Moltgate handles checkout.",
  "not customer engagements",
  "The free Action records facts only. It does not diagnose, reproduce, or recommend a fix.",
];

for (const truth of requiredTruths) {
  assert.ok(html.includes(truth), `missing required truth statement: ${truth}`);
}

const openAiMentions = html.match(/\bOpenAI\b/g) ?? [];
assert.equal(openAiMentions.length, 3, "OpenAI should appear only in the preflight, independence, and assistance boundaries");

const allowedExternalLinks = new Set([
  "https://jakespringfield.github.io/",
  checkoutUrl,
  "https://github.com/pallets/click/issues/3502",
  "https://github.com/appwrite/appwrite/issues/9904",
  "https://github.com/jakespringfield/jakespringfield.github.io/blob/main/SAMPLE_PACKET.md",
  "https://github.com/jakespringfield/public-issue-evidence-capsule",
]);

const hrefs = [...html.matchAll(/\bhref="([^"]+)"/gi)].map((match) => match[1]);
for (const href of hrefs) {
  if (href.startsWith("#")) {
    const id = href.slice(1);
    assert.match(html, new RegExp(`\\bid="${id}"`), `missing local target: ${href}`);
  } else if (/^https:\/\//i.test(href)) {
    assert.ok(allowedExternalLinks.has(href), `external link is not allowlisted: ${href}`);
  } else {
    assert.ok(new Set(["styles.css", "github-issue-triage-checklist/"]).has(href), `unexpected local resource link: ${href}`);
  }
}

for (const link of allowedExternalLinks) {
  assert.ok(hrefs.includes(link), `missing public evidence link: ${link}`);
}

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

assert.ok(contrast("#17242d", "#f4f1e9") >= 7, "primary text contrast must remain strong");
assert.ok(contrast("#59666e", "#f4f1e9") >= 4.5, "muted text contrast must meet WCAG AA");

console.log(`PASS ${requiredFiles.length} required files present`);
console.log(`PASS ${checkoutLinks.length} Moltgate checkout paths are active`);
console.log("PASS $29 fixed price, one-issue scope, source cap, delivery target, and review boundary");
console.log(`PASS ${allowedExternalLinks.size} external destinations are explicitly allowlisted`);
console.log("PASS required scope, disclosure, identity, accessibility, and contrast checks");
console.log("PASS search-intent guide, canonical URLs, sitemap, robots, and IndexNow ownership key");
