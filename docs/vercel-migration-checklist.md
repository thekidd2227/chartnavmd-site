# Vercel migration checklist — chartnavmd.com → chartnavmd-site (Git-backed)

**Goal:** flip the Vercel project `chartnavmd-site`
(`prj_vtlrTeSk6BormQMXNgD36sR5BRmm`) from "direct CLI upload of a
hand-coded static folder" to "Git-connected, built from
`thekidd2227/chartnavmd-site` on push to `main`."

**Non-goal:** do not deploy anything in this PR. The live
chartnavmd.com page stays unchanged until preview parity is signed
off.

See [`deployment-topology.md`](./deployment-topology.md) for the
investigation that produced the current-state facts referenced
here.

---

## Pre-flight (do **not** start until each is checked)

- [x] **Decision log entry in
      [`deployment-topology.md`](./deployment-topology.md) is
      filled in** — confirmed by operator that
      `thekidd2227/chartnavmd-site` is the intended canonical
      source. *(Done 2026-05-16.)*
- [x] **GitHub Pages workflow quarantined.**
      `.github/workflows/deploy.yml` has been moved to
      `.github/workflows/deploy.yml.disabled` (GitHub Actions only
      loads `*.yml`/`*.yaml`; the `.disabled` extension is the
      hard kill switch). A README in the same directory explains
      why. *(Done 2026-05-16.)*
- [x] **`origin/main` reconciled.** Force-pushed local `main`
      (rewritten history with secrets scrubbed) to `origin/main`
      via `git push --force-with-lease`. The previous `.gitkeep`
      placeholder is gone. *(Done 2026-05-16.)*
- [x] **Production auto-deploy on Git push BLOCKED.** Both
      `chartnavmd-site` (canonical) and `chartnavmd-site-gqbw`
      (duplicate) Vercel projects have
      `commandForIgnoringBuildStep` set to skip any build where
      `$VERCEL_ENV = production`. Preview builds still run. This
      MUST stay in place until cutover. *(Done 2026-05-16.
      See incident note in deployment-topology.md.)*
- [ ] **Duplicate Vercel project `chartnavmd-site-gqbw` decision.**
      Currently Git-connected to the same repo and shadow-building
      previews. Holds no custom-domain aliases. Decide: delete it
      (cleanest), disconnect Git on it, or leave it blocked. **Do
      not** delete in this PR — confirm first that no automation
      depends on it.

---

## Parity audit (live chartnavmd.com vs this repo)

The current live page is a single static HTML at `/` (716 lines).
This repo's React app at `/` is a different page with different
copy, different IA, and partial coverage of the live sections.
The table below is the gap list. Treat each row as a separate
follow-up item; do not bundle into one large PR unless the row is
trivial.

### Top-of-page IA

| Area | Live chartnavmd.com | This repo (`chartnavmd-site`) | Gap |
| --- | --- | --- | --- |
| `<title>` | `ChartNav MD — Ophthalmology Workflow + Provider-Reviewed Documentation` | `ChartNav — Hands-Free Ophthalmology Scribing Software` | **Different positioning.** Live says "workflow + provider-reviewed documentation." React draft says "hands-free scribing software." Decide which is canonical; do not ship without alignment. |
| `<meta name="description">` | "Ophthalmology clinic workflow layer for provider-reviewed documentation, imaging metadata review, role-based dashboards…" | "ChartNav is hands-free scribing software for ophthalmology…" | Same positioning split as title. |
| `<link rel="canonical">` | `https://chartnavmd.com/` | `https://arcgsystems.com/chartnav` (in [`src/pages/chartnav/Home.tsx`](../src/pages/chartnav/Home.tsx)) | **Critical:** React canonical points at the legacy arcgsystems sub-path. Must change to `https://chartnavmd.com/` (or `https://chartnavmd.com/`-relative) before any preview deploy. |
| `<link rel="alternate" hreflang>` | `en`, `es`, `x-default` configured | Not present in Home.tsx JSON-LD or `<head>` | Add hreflang alternates pointing at `https://chartnavmd.com/` and `https://chartnavmd.com/?lang=es`. |
| `og:image` | `https://chartnavmd.com/og.jpg` | None set per page | Add OG image asset + meta. |
| JSON-LD `@graph` | Org + WebSite + MedicalApplication (3 nodes) | Org + WebSite + SoftwareApplication + FAQPage (4 nodes) | React has the richer FAQ schema. Worth keeping. Reconcile WebSite/MedicalApplication URLs to `chartnavmd.com` (currently say `arcgsystems.com/chartnav`). |

### Page sections (top-to-bottom)

| Order | Live section (`<h2>` text) | React equivalent | Status |
| ---: | --- | --- | --- |
| 1 | Hero — "Ophthalmology workflow that respects how the visit actually runs." | `<Hero />` (different headline copy) | **Copy gap.** |
| 2 | "Stop paying someone else to type the visit." (savings block) | Not present in React layout | **Section missing in React.** Copy exists in [`src/content/chartnav/home.en.json`](../src/content/chartnav/home.en.json) but not rendered by Home.tsx. |
| 3 | AI security strip ("Auditable AI by default —") | Not rendered as standalone strip | **Section missing in React.** Copy exists in content JSON. |
| 4 | "Watch a real ophthalmology visit run on ChartNav." (video showcase) | `<VideoShowcase />` | **Present, parity TBD.** Live uses 11 video files; this repo's `public/chartnav/videos/` has 4 untracked new MP4s. Inventory needs reconciling. |
| 5 | "Cleaner visits. Calmer notes." (before/after) | `<BeforeAfter />` | Likely parity, verify content match. |
| 6 | "Six workflow layers. One cleaner visit." | Not present (closest: `<ProductProof />`) | **Section missing or restructured in React.** |
| 7 | "What ChartNav does not do" (non-goals) | Not present | **Section missing in React.** Compliance-relevant — the live version negates "AI diagnoses," "100% accurate," "certified EHR," "autonomous charting." Must not silently drop. |
| 8 | "Start with a workflow assessment." (lead form) | Route exists at `/assessment` ([`src/pages/chartnav/Assessment.tsx`](../src/pages/chartnav/Assessment.tsx)); on Home the equivalent is `<FinalCta />` | **Form ergonomics gap.** Live has the form inline on `/`; React splits into a separate route. Decide which UX wins. |

### Routes (top nav)

| Route | Live (in top nav) | React (in [`src/App.tsx`](../src/App.tsx)) | Action |
| --- | --- | --- | --- |
| `/` | yes | yes (`ChartnavHome`) | — |
| `/platform` | yes | yes (`ChartnavPlatform`) | — |
| `/ophthalmology` | yes | yes (`ChartnavOphthalmology`) | — |
| `/implementation` | yes | yes (`ChartnavImplementation`) | — |
| `/security` | yes | yes (`Placeholder` — stub) | **Build out** `/security` page; React is a placeholder. |
| `/ehr/` | yes | not present | **Add** `/ehr` route. Live nav has it labelled `EMR/EHR`. |
| `/ai-security/` | yes | not present | **Add** `/ai-security` route (or fold under `/platform#ai-security` to match the JSON content). |
| `/why-chartnav` | not in nav | yes (`ChartnavWhy`) | Decide: drop from React or add to nav. |
| `/insights` | not in nav | yes (`Placeholder`) | Same. |
| `/assessment` | not in nav (form is on `/`) | yes (`ChartnavAssessment`) | Keep. Live's inline form can redirect here, or React can mount the form on `/` to match live. |
| `/thank-you` | not in nav | yes (`ChartnavThankYou`) | Keep as form post-submit destination. |
| `/privacy`, `/terms`, `/legal/security`, `/accessibility` | not visible in scraped HTML head; presumably footer-only or `/sourcedeck`-derived | yes | Likely no gap. Verify by viewing live footer. |

### Internationalization

| Property | Live | React | Action |
| --- | --- | --- | --- |
| Mechanism | Inline `window.__CN_I18N__ = { en, es }` + vanilla [`/lang-toggle.js`](https://chartnavmd.com/lang-toggle.js) (7 KB) reading `data-i18n="key"` attributes | `i18next` + `react-i18next`, dictionaries at [`src/i18n/en.json`](../src/i18n/en.json) and [`src/i18n/es.json`](../src/i18n/es.json) | Architecture is different; semantics should match. **Add a check that every key in live `__CN_I18N__.en` is reachable in `i18n/en.json` *and* `i18n/es.json` (101 keys live).** |
| Detection | URL `?lang=es` + footer toggle | `i18next-browser-languagedetector` (querystring, localStorage, navigator) | Verify `?lang=es` continues to switch language to keep inbound deep links working. |
| `hreflang` alternates | yes — apex / `?lang=es` / `x-default` | not present | Add. |

### Assets

| Asset class | Live path | This repo | Action |
| --- | --- | --- | --- |
| Favicon SVG | `/brand/chartnav-favicon.svg` | [`public/chartnav-favicon.svg`](../public/chartnav-favicon.svg) (modified, uncommitted) | Either move into `public/brand/` (preferred, matches live URLs) or update live HTML reference paths. |
| Logo lockup | `/brand/chartnav-logo.svg`, `/brand/chartnav-mark.svg` | [`public/chartnav/logo-lockup.svg`](../public/chartnav/logo-lockup.svg), [`public/chartnav/logo-mark.svg`](../public/chartnav/logo-mark.svg) | Path mismatch. Normalize on one location. |
| Videos — `/videos/*` (8 clips on live: `admin-dashboard`, `consult-letter`, `hands-free-scribing`, `imaging-in-chart`, `intake-ready-chart`, `phase-19j-demo`, `workup-ready-chart`, …) | served at site root `/videos/` | Not present in `public/videos/` | **Recover and stage all 8** under `public/videos/` before any preview deploy. |
| Videos — `/chartnav/videos/*` (4 clips on live: `chartnav-calendar-workflow`, `chartnav-doctor-final-signoff`, `chartnav-patient-handoff-workflow`, `chartnav-reminders-workflow`) | served at `/chartnav/videos/` | Present in [`public/chartnav/videos/`](../public/chartnav/videos/) (untracked — currently uncommitted on local `main`) | **Commit these 4 MP4s** in a separate small commit before deploy. |
| OG image | `/og.jpg` (referenced from `og:image`) | [`public/opengraph.jpg`](../public/opengraph.jpg) (different filename) | Rename or add `og.jpg` symlink/copy. |
| Stylesheet | `/styles.css` (~27 KB hand-written) | Tailwind v4 + custom CSS via Vite ([`src/index.css`](../src/index.css), [`src/components/chartnav/*.css`](../src/components/chartnav/)) | **Major.** Visual parity must be validated on preview deployments before flipping production. Use the live `/styles.css` as a visual reference; do not just port the CSS verbatim — Tailwind utility classes and React component scoping will require a deliberate translation. |
| Helper scripts | `/reveal.js` (3 KB scroll-reveal helper), `/lang-toggle.js` (7 KB) | React equivalents implied (`RevealController` in [`src/components/chartnav/Sections.tsx`](../src/components/chartnav/Sections.tsx), `i18next` for language) | Behaviors are present in different form. Verify on preview that reveal-on-scroll and language toggle work identically (timing, animation feel, persistence). |

### Security & response headers (live, served by Vercel)

| Header | Value (live) | Action |
| --- | --- | --- |
| `strict-transport-security` | `max-age=63072000; includeSubDomains; preload` | Vercel applies by default — preserve. |
| `x-frame-options` | `DENY` | Vercel default — preserve. |
| `x-content-type-options` | `nosniff` | Vercel default — preserve. |
| `referrer-policy` | `strict-origin-when-cross-origin` | Vercel default — preserve. |
| `permissions-policy` | `camera=(), microphone=(), geolocation=()` | **Not a Vercel default.** Currently applied at the project level (or via `vercel.json`). When migrating, ensure a [`vercel.json`](../vercel.json) (not yet present in this repo) defines the same `permissions-policy` so it doesn't disappear silently. |
| `content-security-policy` | not currently set on live | Out of scope for migration. Could be added later. |

### `vercel.json` requirement

This repo does not currently have a `vercel.json`. Before the Vercel
Git connection step, add `vercel.json` with at minimum:

```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "permissions-policy", "value": "camera=(), microphone=(), geolocation=()" }
      ]
    }
  ],
  "redirects": [
    { "source": "/chartnav", "destination": "/", "permanent": true },
    { "source": "/chartnav/:path*", "destination": "/:path*", "permanent": true }
  ]
}
```

(The redirects mirror the wouter-side legacy compatibility in
[`src/App.tsx`](../src/App.tsx); having them at the Vercel edge as
HTTP 308 is cheaper and more crawler-friendly than letting the SPA
swallow them.)

---

## Vercel connection plan (prepared — do not execute in this PR)

> **Update 2026-05-16:** Steps 1, 3, and 4 below have already been
> completed (the Git connection was latent at project creation and
> `origin/main` has been reconciled). The risk that remains is on
> step 5: production cutover. Until the Ignored Build Step is
> deliberately removed, **no `main` push will deploy to
> production**, which means parity work can proceed on branches
> without fear of accidentally promoting the live alias.

### 1. Reconcile `origin/main` *(done 2026-05-16)*

```bash
cd ~/chartnavmd-site
# Verify what's about to be pushed.
git log --oneline origin/main..main
git log --oneline main..origin/main
# Operator decision: force-push local main, or rebase the
# unsynced commit. The cleaner option here is force-push because
# origin/main has only a placeholder .gitkeep that no one is
# depending on.
git push --force-with-lease origin main
```

> ⚠️ **Known footgun (recorded for the next operator):** the first
> push to `origin/main` will trigger Vercel's GitHub-App-driven
> production build for any project whose `link.productionBranch` is
> `main`, **regardless of whether the project was previously
> "deployed via CLI."** If `autoAssignCustomDomains: true` is set
> on the project (default), the new build will also automatically
> claim the project's custom domain aliases. That is exactly how
> the 2026-05-16 incident happened. **Set the Ignored Build Step
> before the force-push next time.**

### 2. Stage a Vercel-build branch with preview parity

```bash
git switch -c migrate/canonical-vercel-deploy
# … apply the parity work (separate PRs per gap row above) …
# Open PR; merge into main only when preview deployment is
# visually verified against the live site.
```

### 3. Link local repo to the existing Vercel project

```bash
cd ~/chartnavmd-site
vercel link --yes --project chartnavmd-site
```

Confirm `.vercel/project.json` now contains:

```json
{
  "projectId": "prj_vtlrTeSk6BormQMXNgD36sR5BRmm",
  "orgId": "team_AWLiPcDB2y6NCsLovfXNufgq",
  "projectName": "chartnavmd-site"
}
```

(`.vercel/` is gitignored — confirm with `cat .gitignore | grep vercel`.)

### 4. Connect the Vercel project to GitHub

This step is **UI-only in the Vercel dashboard** — there is no
stable CLI command for it.

1. Open `https://vercel.com/jeanmaxcharles-3486s-projects/chartnavmd-site/settings/git`.
2. Click **Connect Git Repository**.
3. Authorize GitHub if not already, then select
   `thekidd2227/chartnavmd-site` from the list.
4. Set **Production Branch** to `main`.
5. Save.
6. Verify in the **Settings → Git** panel that the repo and
   branch are listed.

### 5. Preview-only deploy via Git push

```bash
git switch migrate/canonical-vercel-deploy
git push -u origin migrate/canonical-vercel-deploy
# Vercel will auto-build and create a preview deployment.
# URL pattern: https://chartnavmd-site-git-migrate-canonical-vercel-deploy-jeanmaxcharles-3486s-projects.vercel.app
```

**Do not merge this branch into `main` yet.** Validate the preview
against live by:

- Visual side-by-side on desktop and mobile (Chrome devtools width
  375, 768, 1024, 1440).
- Test the EN/ES toggle on every page.
- Test every nav link, every footer link, every CTA, every form.
- View source: confirm `<head>` JSON-LD, canonical, hreflang,
  OG/Twitter meta, and the `permissions-policy` header are all
  identical or intentionally improved relative to live.
- `curl -sI <preview-url>/` and `curl -sI https://chartnavmd.com/`
  — diff the response headers; only intentional differences are
  acceptable.

### 6. Cutover plan (when preview parity is signed off)

Production cutover is a **separate PR**, not this one. The
cutover PR should:

1. **Remove the Ignored Build Step** on `chartnavmd-site` (and
   `chartnavmd-site-gqbw` if it still exists) as the first
   commit of the cutover PR, **only** when ready to deploy:

   ```bash
   TOKEN=$(python3 -c "import json; print(json.load(open('/Users/jean-maxcharles/Library/Application Support/com.vercel.cli/auth.json'))['token'])")
   TEAM=team_AWLiPcDB2y6NCsLovfXNufgq
   PROJ=prj_vtlrTeSk6BormQMXNgD36sR5BRmm
   curl -sS -X PATCH "https://api.vercel.com/v10/projects/$PROJ?teamId=$TEAM" \
     -H "Authorization: Bearer $TOKEN" \
     -H "Content-Type: application/json" \
     -d '{"commandForIgnoringBuildStep":null}'
   ```

2. Merge the migration branch into `main`.
3. On the merge, Vercel will auto-build and promote the new
   production deployment, replacing the hand-coded static site.
4. Within the same window:
   - Save a copy of the current 30-file static deploy. Either
     `vercel pull` the production output before cutover, or
     download the live HTML/CSS/JS/MP4 set via `wget --mirror`.
     Store under `archive/legacy-static-deploy/` in this repo on
     a separate branch so it's never lost.
   - Delete the GitHub Pages workflow permanently (remove the
     `.disabled` file, not just rename it).
5. Watch the production deployment in Vercel for the first hour
   for runtime errors, 404s, broken links, broken videos.
6. **Rollback path** (test it before cutting over):
   `vercel promote dpl_B7rvzJNYmmuW3YpEEPBD5ZiMAvAJ --scope jeanmaxcharles-3486s-projects`.
   This is the same command that was used to recover from the
   2026-05-16 incident; it returns the `chartnavmd.com` aliases
   to the hand-coded deployment in seconds. Keep this command in
   the PR description.

---

## Deployment governance (post-migration steady state)

Once cutover is complete, the following becomes the standing rule:

- **Production deploys to `chartnavmd.com` happen via Vercel's Git
  integration only.** `vercel --prod` from a developer's laptop is
  forbidden and would bypass code review, CI, preview, and
  rollback. If it's needed for an incident, document the reason in
  a postmortem.
- The `chartnavmd-site` Vercel project's **Settings → Git** panel
  is the source of truth for which branch deploys to production.
- Pull requests against `main` automatically create Vercel preview
  deployments. The preview URL must be in the PR description for
  every UI change.
- No other Vercel project should hold the `chartnavmd.com`
  alias. Duplicate projects (`chartnavmd-site-5utg`,
  `chartnavmd-site-gqbw`) should be deleted after this migration
  is stable for ≥7 days.

---

## What this PR does NOT do

To be explicit, this PR:

- does **not** deploy anything to Vercel
- does **not** push to `origin/main`
- does **not** modify the live chartnavmd.com page
- does **not** modify any file in `apps/web` of `chartnav-platform`
- does **not** modify any file in `thekidd2227/ARCGSystems` (the
  shallow clone at `/tmp/arcgsys-probe` was read-only and safe to
  delete)
- does **not** decide whether the canonical positioning is
  "ophthalmology workflow layer" (live) or "hands-free scribing
  software" (React draft) — that copy decision is required
  separately, ideally in the first parity follow-up PR

It is **deployment-source cleanup**, not a hotfix to anything
the visitor sees.
