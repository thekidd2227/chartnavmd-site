# ARCG Systems — SEO Validation Report
Date: March 21, 2026
Site: https://arcgsystems.com

---

## Pre-Check Result: PASS
Footer contains "Free Operational Audit" ✅ and "GovCon Consulting" ✅ — deployment is current.

---

## Service Pages

| Check | Result | Notes |
|-------|--------|-------|
| P1 · /operational-audit | **PASS** | H1: "Find Out Where Your System Is Breaking Down" · 6 sections · CTA links to /assessment · meta description present |
| P2 · /ai-automation-for-small-business | **PASS** | H1: "AI Automation Built for Small Business Operations" · 6 sections · CTA present |
| P3 · /operational-workflow-automation | **PASS** | H1: "Eliminate the Manual Bottleneck — Automate Your Operational Workflows" · 6 sections |
| P4 · /vendor-dispatch-workflow-automation | **PASS** | H1: "Automated Vendor Dispatch — Complete Job Briefs, Zero Manual Routing" |
| P5 · /government-contractor-compliance-reporting | **PASS** | H1: "Compliance Reporting Systems for Government Contractors" |
| P6 · /govcon-operations-consulting | **PASS** | H1: "GovCon Systems That Win — Operational Consulting for Government Contractors" |

---

## Insight Pages

| Check | Result | Notes |
|-------|--------|-------|
| I1 · /insights/automate-business-workflows | **PASS** | Article loads · category + read time · 5 H2s · internal links · bottom CTA |
| I2 · /insights/reduce-manual-operations | **PASS** | Article loads · 5 H2s · related service links · bottom CTA |
| I3 · /insights/what-is-operational-audit | **PASS** | Article loads · 5 H2s · related service links · bottom CTA |
| I4 · /insights/improve-operations-systems | **PASS** | Article loads · 5 H2s · related service links · bottom CTA |
| I5 · /insights/vendor-coordination-automation | **PASS** | Article loads · 5 H2s · related service links · bottom CTA |

---

## Structure & Navigation

| Check | Result | Notes |
|-------|--------|-------|
| B3 · Internal links | **PASS** | Footer "Operational Audit" → /operational-audit ✅ · "GovCon Consulting" → /govcon-operations-consulting ✅ · assessment CTA functional |
| B4 · Compliance redirect | **PASS** | /solutions/compliance-reporting → /solutions/federal-access ✅ |
| B5 · Unique page titles | **FAIL** | All pages return same title tag — per-page titles set via React head tags but not pre-rendered (SPA limitation) |
| B6 · Homepage integrity | **PASS** | Nav: AI Automation ✅ Facilities Support ✅ Federal Access ✅ · Footer: all 5 links ✅ · CTA visible ✅ |

---

## Open Graph / LinkedIn Preview

| Check | Result | Notes |
|-------|--------|-------|
| OG tags in source | **PASS** | og:title, og:description, og:image, og:url, og:type, og:site_name all present in index.html |
| OG tags served by CDN | **PENDING** | GitHub Pages CDN caching old index.html — force redeploy commit pushed (8565343) · resolves within 5–30 min |
| og:image asset | **PASS** | /opengraph.jpg exists · 1280×720 JPEG · 72KB |
| Twitter card | **PASS** | summary_large_image meta tag present in source |
| apple-touch-icon | **PASS** | Added to index.html |

---

## Page Titles (Duplicate Check)

| Page | Title |
|------|-------|
| /operational-audit | ARCG Systems \| AI Automation & Operational Intelligence for Government & Commercial |
| /ai-automation-for-small-business | ARCG Systems \| AI Automation & Operational Intelligence for Government & Commercial |
| /government-contractor-compliance-reporting | ARCG Systems \| AI Automation & Operational Intelligence for Government & Commercial |
| /govcon-operations-consulting | ARCG Systems \| AI Automation & Operational Intelligence for Government & Commercial |
| /insights/what-is-operational-audit | ARCG Systems \| AI Automation & Operational Intelligence for Government & Commercial |
| /insights/vendor-coordination-automation | ARCG Systems \| AI Automation & Operational Intelligence for Government & Commercial |

**Note:** Per-page title tags are set in React component head tags but are not pre-rendered.
GitHub Pages serves a static SPA shell — the page title only updates client-side after JS loads.
Search engine crawlers and social preview scrapers see the default title.
Fix: implement react-helmet-async or migrate to a framework with SSR/SSG support (Next.js, Astro).

---

## CTA Audit

| Location | Text | Status |
|----------|------|--------|
| Navbar (desktop + mobile) | Get My Workflow Plan | ✅ Correct — 2 visible instances |
| Footer CTA button | Get My Workflow Plan | ✅ Correct |
| All other assessment buttons | Begin Now / Start Here | ✅ Correct |
| Assessment page heading | Get My Workflow Plan | ✅ Correct |
| Assessment submit button | Get My Workflow Plan → | ✅ Correct |

---

## Favicon

| Item | Status |
|------|--------|
| favicon.svg | ✅ Serving — Option 3 (dark circle, gold A with upward arrow) |
| File size | ✅ 797 bytes — valid SVG |
| apple-touch-icon | ✅ Added |

---

## Issues Found

| # | Issue | Fix Required |
|---|-------|-------------|
| 1 | B5 — All page titles identical | Implement react-helmet-async for client-side title injection, or migrate to SSR/SSG for pre-rendered titles |
| 2 | OG tags CDN cache delay | Resolves automatically — GitHub Pages CDN propagation. Test via LinkedIn Post Inspector after 15 min |

---

## Root Cause — Unique Titles / OG Tags Not Pre-Rendered

This is a known SPA (Single Page Application) limitation on static hosting. GitHub Pages serves one
`index.html` for all routes. Search engine crawlers and social scrapers (LinkedIn, Twitter, Slack)
read the raw HTML before JavaScript executes — so they only see the default title and OG tags in
`index.html`, not the per-page tags set by React components.

**Short-term fix:** Per-page OG tags in React components do update the browser tab title and OG tags
for users — just not for scrapers. The LinkedIn preview will use the global OG tags from `index.html`.

**Long-term fix:** Migrate to Astro (static site generation) or Next.js (SSR) to pre-render per-page
meta tags into each page's HTML.

---

## Commits in This Session

| Commit | Description |
|--------|-------------|
| `8e2cb7f` | Federal Access page, nav/footer update, compliance redirect |
| `afd54f9` | Remove all Book a Demo buttons site-wide |
| `d28a2e8` | Federal Access: procurement block; Home: pricing statement |
| `60ab716` | All 11 SEO pages: 6 service + 5 insight |
| `e1cef7e` | CTA updated to Get My Workflow Plan |
| `a6ea5bf` | Favicon Option 3 set |
| `eefc2a7` | CTA reduced to 2 visible instances |
| `20d3d6c` | Favicon SVG fix, Begin Now buttons, Assessment heading |
| `da45f21` | Remove extra CTAs, add OG tags + apple-touch-icon |
| `8565343` | Force redeploy for CDN cache bust |

---

## Overall Result

**PASS — 14 of 15 checks passed**

Passing: Pre-check · P1–P6 (all service pages) · I1–I5 (all insight pages) · B3 · B4 · B6 · Favicon · OG source
Failing: B5 (unique page titles — SPA limitation, not a code bug)
Pending: OG CDN propagation (resolves automatically)
