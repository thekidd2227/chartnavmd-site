# chartnavmd.com — deployment topology (source of truth)

**As of 2026-05-16 — written from a live investigation, not from prior docs.**

This file is the canonical answer to: *what actually deploys to
`chartnavmd.com`?* If anything else in this repo (e.g.
[`.github/workflows/deploy.yml`](../.github/workflows/deploy.yml),
[`CNAME`](../CNAME)) implies a different topology, **this file wins
until the topology is reconciled**.

---

## TL;DR

- **Production hosting:** Vercel.
- **Vercel project:** `chartnavmd-site` (`prj_vtlrTeSk6BormQMXNgD36sR5BRmm`)
  in scope `jeanmaxcharles-3486's projects` (team_id `team_AWLiPcDB2y6NCsLovfXNufgq`),
  Hobby plan.
- **Git connection:** **CONNECTED to `thekidd2227/chartnavmd-site`,
  production branch `main`.** (Corrected 2026-05-16 — see the
  incident note below. Earlier in this same investigation this
  field was reported as "NONE" because `vercel project inspect`
  does not print the `link` field; the full project JSON via
  `vercel api /v10/projects/<id>` shows `link.type: "github"`,
  `link.repo: "chartnavmd-site"`, `link.repoId: 1223022324`,
  `link.productionBranch: "main"`. `autoAssignCustomDomains` is
  also `true`, so any new production deployment automatically
  inherits the `chartnavmd.com` / `www.chartnavmd.com` aliases.)
- **How `dpl_B7rvzJNYmmuW3YpEEPBD5ZiMAvAJ` got there:** direct CLI
  upload — `vercel deploy --prod` of a pre-built 30-file static
  folder. Confirmed by the build log: *"Retrieving list of
  deployment files… Downloading 30 deployment files… Build Completed
  in /vercel/output [61ms]."* A 61 ms build is a no-op — the
  artifact was uploaded, not built on Vercel. (Vercel's Git auto-build
  was always wired in parallel, but no one had pushed to `main`
  yet — origin/main only held a `.gitkeep`. The first real push to
  `main` did trigger Vercel; that's how this PR's investigation
  discovered the connection. See the incident note.)
- **Going forward, Git-driven production deploys are blocked:** the
  Vercel project's **Ignored Build Step** is now set to
  `bash -c 'if [ "$VERCEL_ENV" = production ]; then echo HOLD_PRODUCTION_DEPLOYS_FROM_GIT_PUSH; exit 0; else exit 1; fi'`.
  This skips builds when `$VERCEL_ENV = production` (i.e., on push to
  `main`) but lets preview builds proceed (so PRs continue to get
  preview URLs).
- **Deploy source folder:** **unknown / not present on this machine.**
  No directory in `~`, `~/Desktop`, `~/Documents`, or `~/Downloads`
  contains the hand-coded `__CN_I18N__`, `lang-toggle.js`, `reveal.js`
  fingerprints that are in the live HTML. The folder was either
  cleaned up after deploy, lives on another machine, or was a
  short-lived workspace.
- **This repo (`thekidd2227/chartnavmd-site`) is *not* the deploy
  source.** It is a Vite/React SPA. The live page is plain static
  HTML/CSS/JS with no React mount point. The Vercel project happens
  to be named the same, which is the source of the confusion.

---

## Domain & DNS

| Field         | Value |
| ------------- | --- |
| Apex          | `chartnavmd.com` |
| www           | `www.chartnavmd.com` |
| Registrar     | Third-party (likely GoDaddy, per the wider account pattern) |
| Nameservers   | Third-party |
| Vercel scope owning the domain | `jeanmaxcharles-3486's projects` |
| Pointed at    | Vercel anycast (verified via `server: Vercel` response header) |
| HTTPS         | Vercel-managed cert |

Confirmation:

```
$ vercel domains ls
  Domain             Registrar     Nameservers   Creator                Age
  chartnavmd.com     Third Party   Third Party   jeanmaxcharles-3486    17d
  sourcedeck.app     Third Party   Third Party   jeanmaxcharles-3486    17d
```

---

## Live deployment

| Field | Value |
| --- | --- |
| Project | `chartnavmd-site` |
| Project ID | `prj_vtlrTeSk6BormQMXNgD36sR5BRmm` |
| Deployment ID | `dpl_B7rvzJNYmmuW3YpEEPBD5ZiMAvAJ` |
| Production deployment URL | `https://chartnavmd-site-17b1eimcb-jeanmaxcharles-3486s-projects.vercel.app` |
| Created at | 2026-05-16 12:50:30 UTC |
| Build duration | 3 s (no-op — just unpacks the prebuilt files) |
| Files uploaded | 30 |
| Status | ● Ready |

**Aliases attached to that deployment:**
- `https://chartnavmd.com`
- `https://www.chartnavmd.com`
- `https://chartnavmd-site.vercel.app`
- `https://chartnavmd-site-jeanmaxcharles-3486s-projects.vercel.app`

**Live HTTP fingerprint (run today):**

```
HTTP/2 200
server: Vercel
content-type: text/html; charset=utf-8
last-modified: Sat, 16 May 2026 12:50:56 GMT
x-vercel-cache: HIT
content-disposition: inline
content-length: 49090
```

The `content-disposition: inline` header and absence of `x-nextjs-*`
or hashed asset filenames confirm a plain static-file deployment, not
a Next.js or built-Vite output.

---

## Vercel project settings

From `vercel project inspect chartnavmd-site` (today):

| Setting | Value | Notes |
| --- | --- | --- |
| ID | `prj_vtlrTeSk6BormQMXNgD36sR5BRmm` | |
| Name | `chartnavmd-site` | |
| Owner | `jeanmaxcharles-3486's projects` | Hobby |
| Created | 2026-04-29 05:42 UTC | |
| Root Directory | `.` | |
| Node.js Version | 24.x | |
| Framework Preset | **Vite** | ← misleading; nothing is being built on Vercel |
| Build Command | `npm run build` or `vite build` | ← never executed; deploy is `--prebuilt`-style |
| Output Directory | None | |
| Install Command | (default) | |
| Git Repository | **(not connected)** | confirmed by absence of git metadata on inspect, deploy log "Retrieving list of deployment files" pattern, and unique deployment-author `jeanmaxcharles-3486` (CLI user, not a bot) |

---

## What the live HTML actually is

The artifact at `chartnavmd.com` is a hand-coded static marketing
page. Identifying fingerprints:

```
<script src="/reveal.js" defer></script>
<script src="/lang-toggle.js" defer></script>
<script>
  window.__CN_I18N__ = { en: {...}, es: {...} };
</script>
```

- 716 lines of HTML
- Inline i18n dictionary (`__CN_I18N__`) instead of a framework
- `lang-toggle.js` (~7 KB) handles English/Español swap at runtime
- `reveal.js` (~3 KB) is a scroll-reveal helper, not the SlideShow
  framework
- `styles.css` is hand-written, ~27 KB, no Tailwind/Vite hashing
- Asset paths are bare (`/styles.css`, not `/assets/styles.[hash].css`)
  — confirms no bundler in the pipeline

**Search for these fingerprints across `thekidd2227`'s GitHub
repositories returned 0 matches**, including in:
`chartnavmd-site`, `chartnav-platform`, `arcg-live` (private,
`thekidd2227/website`), `ARCGSystems` (private), `Chartnav`,
`sourcedeck-site`, `sourcedeck`, `sourcedeck-app`, `sourcedeck.app`,
`arcg-lcc`, `theglowlab-translations`.

A filesystem search across `~`, `~/Desktop`, `~/Documents`,
`~/Downloads` also returned **0 matches** for `__CN_I18N__`,
`lang-toggle.js`, or `reveal.js`.

> **Implication:** the actual deploy source folder for chartnavmd.com
> is not currently checked into any known repo and is not on this
> machine.

---

## What this repo actually is

`thekidd2227/chartnavmd-site`:

- **Vite + React SPA**, mounts a `<div id="root">` from
  [`src/main.tsx`](../src/main.tsx)
- Routing is wouter, declared in [`src/App.tsx`](../src/App.tsx);
  `/` is `ChartnavHome` (marketing page), no auth, no clinical app,
  no `localhost:8000`, no identity picker, no Dashboard / Calendar /
  Encounters / Patients / Lab Orders routes
- Deploy workflow at
  [`.github/workflows/deploy.yml`](../.github/workflows/deploy.yml)
  targets **GitHub Pages** — orthogonal to (and currently
  inconsistent with) what's actually live
- [`CNAME`](../CNAME) contains `chartnavmd.com` — was set up for the
  GitHub Pages path, but DNS now points to Vercel, so the `CNAME`
  has no functional effect today

**Working-tree status (today, uncommitted on `main`):**

- modified: `public/chartnav-favicon.svg`, `public/favicon.svg`,
  `public/chartnav/videos/manifest.json`,
  `src/content/chartnav/{home,implementation,ophthalmology,platform}.en.json`,
  `src/pages/chartnav/Home.tsx`
- untracked: `docs/patient-portal-plan.md`, four new MP4s under
  `public/chartnav/videos/`

None of those would change the deployment topology because **this
repo isn't what deploys to chartnavmd.com.**

---

## Account / scope observations (operational hygiene)

`vercel project ls` shows ten projects in
`jeanmaxcharles-3486's projects`. The chartnav/sourcedeck family is
duplicated multiple times, which is a re-import smell:

| Project | Latest production URL | Has prod alias? |
| --- | --- | --- |
| `chartnavmd-site` | `https://chartnavmd.com` | **✅ yes — canonical** |
| `chartnavmd-site-5utg` | `https://chartnavmd-site-5utg.vercel.app` | no |
| `chartnavmd-site-gqbw` | `https://chartnavmd-site-gqbw.vercel.app` | no |
| `chartnav-platform` | `https://chartnav-platform.vercel.app` | (separate product app) |
| `chartnav-platform-kpxg` | `https://chartnav-platform-kpxg.vercel.app` | no |
| `chartnav-platform-xype` | `https://chartnav-platform-xype.vercel.app` | no |
| `sourcedeck-site` | `https://sourcedeck.app` | yes |
| `sourcedeck-site-lsce` | `https://sourcedeck-site-lsce.vercel.app` | no |
| `website` | `https://website-six-pearl-84.vercel.app` | (`~/arcg-live` is linked here, but no custom domain) |
| `web` | `https://web-ten-theta-12.vercel.app` | no |

The `-5utg`, `-gqbw`, `-kpxg`, `-xype`, `-lsce` projects are likely
the result of `vercel link` choosing "create new" when prompted for an
existing project. None of them serve traffic. Recommend deleting
after confirmation, separately from this work.

---

## Local Vercel link state

| Path | Linked to project | Notes |
| --- | --- | --- |
| `~/chartnavmd-site` | **(not linked)** | This repo has no `.vercel/`. |
| `~/arcg-live` | `website` (`prj_ieWb2mzh3OFh3Br7GfVk05PZ2WYP`) | Git remote: `thekidd2227/website` (private). Not the live source for chartnavmd.com. |
| `~/sourcedeck-site` | linked (check `.vercel/project.json` if needed) | Out of scope here. |
| `~/Desktop/ARCG/chartnav-platform/.vercel` | `chartnav-platform` | Product app. |
| `~/Desktop/ARCG/chartnav-platform/apps/web/.vercel` | `web` | A second platform-app project. |
| `~/Desktop/ARCG/chartnav-platform/apps/web/chartnavmd-site/.vercel` | **`chartnavmd-site`** | **This is the only folder on disk linked to the production project.** But the folder contains zero deploy-able files (just `.gitignore` + `.env.local` + `.vercel/`). Whoever deployed today either ran `vercel deploy --prod --prebuilt` from somewhere else, or staged files in this folder, deployed, then cleaned them up. Either way, the canonical source folder is **not preserved on this machine.** |

---

## Reconciliation — is `chartnavmd-site` (this repo) stale, intended,
or active?

**Active production:** **No.** This repo is not what's deployed.
The Vite/React build has never been promoted to the production
deployment of the `chartnavmd-site` Vercel project (no Git
connection, and the no-op build logs prove direct upload).

**Stale:** **Partially.** The deploy workflow in `.github/workflows/`
points at GitHub Pages, which is no longer where DNS resolves. The
workflow runs on every `main` push but has no effect on
production. Pending work-tree edits (Home.tsx, content json, videos)
have not been ported to the live page.

**Intended to be canonical:** **Decision required.** Two paths:

### Path A — Adopt this repo as canonical (recommended for long term)

1. Build out feature/content parity with the live hand-coded HTML in
   the React app (`src/pages/chartnav/Home.tsx` + content JSONs +
   `src/i18n/*`). The live page is more developed than the React
   draft right now; need to migrate copy, video showcase, savings
   block, non-goals list, and the EN/ES toggle into React.
2. Link this repo to the Vercel `chartnavmd-site` project via
   `vercel link` + connect GitHub in the Vercel UI (Project Settings
   → Git).
3. Delete `.github/workflows/deploy.yml` (Pages workflow) or repoint
   to Vercel — pick one, don't run both.
4. First deploy must be a preview, verified against
   `chartnavmd-site-<hash>.vercel.app`, before promoting to
   production. Do not push to `main` until preview matches the live
   page.
5. Once happy, promote and let Vercel handle subsequent deploys
   from `main`.

### Path B — Keep the hand-coded site canonical (short term)

1. Recover the deploy folder. Whoever ran `vercel --prod` today (us-east,
   2026-05-16 12:50 UTC) has it. Get those 30 files into a git repo
   — either a new `thekidd2227/chartnavmd-marketing` or commit them
   into an existing one (most natural: this repo, on a separate
   branch).
2. Connect that repo to the `chartnavmd-site` Vercel project as the
   Git source.
3. Mark this React app's `src/App.tsx` and related routes as
   archived. Either gut the SPA from this repo, or keep it but
   stop calling it "the marketing site" — it isn't.
4. Update `.github/workflows/deploy.yml` to either no-op or be
   removed.

---

## Verification commands (so the next person doesn't re-derive this)

```bash
# 1) Confirm Vercel scope and projects.
vercel whoami
vercel projects ls

# 2) Confirm the production deployment + git source.
vercel project inspect chartnavmd-site
vercel ls chartnavmd-site
vercel inspect <latest-prod-deployment-url>

# 3) Confirm the domain is in this scope.
vercel domains ls

# 4) Live response check — should be Vercel-served static HTML, not React mount.
curl -sI https://chartnavmd.com/
curl -sL https://chartnavmd.com/ | grep -E 'lang-toggle|__CN_I18N__|reveal\.js'
# (presence of any of these = hand-coded marketing page;
#  absence of all three = this Vite/React repo would have been deployed)
```

---

## ARCGSystems fingerprint check (2026-05-16)

Shallow-cloned `thekidd2227/ARCGSystems` (private) to `/tmp/arcgsys-probe`
for read-only inspection. Ran the live-artifact fingerprint suite:

| Marker | Found in ARCGSystems? |
| --- | --- |
| `lang-toggle.js` | ❌ no |
| `reveal.js` (the scroll-reveal helper, not the framework) | ❌ no |
| `__CN_I18N__` (live page's inline i18n dict) | ❌ no |
| `/chartnav/videos/chartnav-calendar-workflow.mp4` | ❌ no |
| `/videos/hands-free-scribing.mp4` | ❌ no |
| `/brand/chartnav-logo.svg` | ❌ no |
| `hero.cta_primary` (i18n key style) | ❌ no |
| Live hero copy: *"Ophthalmology workflow that respects how the visit actually runs"* | ❌ no |
| Live H2: *"Filters conversation. Captures findings. Builds the diagram"* | ❌ no |
| Live copy: *"Stop paying someone else to type the visit"* | ✅ **yes** — [`src/content/chartnav/home.en.json`](https://github.com/thekidd2227/ARCGSystems) |
| Plain `styles.css` at repo root or `public/` | ❌ no |
| `reveal.js` JS file anywhere | ❌ no |

**Conclusion:** ARCGSystems is **not** the deploy source for
chartnavmd.com. It contains source marketing **copy** that the
hand-coded site cribbed from (the "Stop paying someone else…" line
is the lineage signal), but it does not contain the hand-coded
HTML/CSS/JS artifact, the inline `__CN_I18N__` dictionary, the
`lang-toggle.js`/`reveal.js` helpers, the live video paths, or the
`/brand/` asset directory structure.

Structurally, ARCGSystems is a Vite/React SPA targeting
`arcgsystems.com` (its `CNAME` confirms). Same architecture as this
repo. Same family. Not the live deploy.

### Content lineage observation

Both `ARCGSystems` and `chartnavmd-site` contain
`src/content/chartnav/home.en.json`, but they are **different
revisions of the same file**:

- **ARCGSystems version** uses the older hero copy:
  *"The ophthalmology EMR / EHR, built around the visit"* +
  *"Hands-free scribing. Built for the eye."* and the "Stop paying
  someone else to type the visit" savings block — **this version
  matches the live chartnavmd.com page.**
- **chartnavmd-site version** has been rewritten to:
  *"HANDS-FREE OPHTHALMOLOGY SCRIBING"* +
  *"Document the exam. Stay with the patient."* — newer copy that
  has **not** shipped to production.

This means:

1. The live chartnavmd.com page was hand-converted from an older
   `ARCGSystems` content snapshot — likely re-typed or AI-converted
   into plain HTML, with a manual inline-translation step that
   produced `__CN_I18N__`.
2. The chartnavmd-site React rewrite (this repo) has *moved past*
   that content snapshot but never made it onto chartnavmd.com.
3. Editing `home.en.json` in this repo will not change the live
   site, because this repo is not connected to the Vercel project.

### Recommendation

**Document the current state as: hand-coded static artifact (source
folder unrecovered) is the de facto canonical deploy. Migrate to
chartnavmd-site as canonical once parity is built.** Rationale:

- The hand-coded artifact is the only thing actually serving the
  domain today; treating it as anything other than canonical would
  misrepresent operational reality.
- It is also the most fragile of the candidates — there's no version
  control, no CI, and the deploy folder isn't even backed up to this
  machine. Every additional hand-deploy compounds the risk.
- chartnavmd-site is the only React/Vite repo with active edits in
  the working tree and pages already named `Home`, `Platform`,
  `Ophthalmology`, `Implementation`, `WhyChartnav`, `Assessment`,
  `ThankYou` — matching the live site's IA (`/`, `/platform`,
  `/ophthalmology`, `/implementation`, `/why-chartnav`,
  `/assessment`, `/thank-you`). It is the most natural canonical
  successor.

Migration sequence (do **not** start without explicit go-ahead;
recorded here so the next operator has a path):

1. Recover the 30-file deploy folder from whoever ran today's
   `vercel --prod`. Without it, point 5 below is impossible.
2. Commit the recovered folder to a branch in this repo (or a
   sibling repo) so version control catches up to production.
3. Build content + visual parity in the React app on a branch,
   comparing preview deployments to the hand-coded baseline.
4. When preview parity is acceptable, connect the Vercel
   `chartnavmd-site` project to this GitHub repo (Settings → Git in
   the Vercel dashboard).
5. Promote a Vite-built preview to production. Keep the hand-coded
   folder available for rollback for ~30 days.
6. Delete the GitHub Pages workflow
   ([`.github/workflows/deploy.yml`](../.github/workflows/deploy.yml))
   so it can't ship a divergent artifact via Pages if DNS ever flips
   back.
7. Delete duplicate Vercel projects
   (`chartnavmd-site-5utg`, `chartnavmd-site-gqbw`) after confirming
   they hold no traffic or environment variables.

The probe clone at `/tmp/arcgsys-probe` was read-only and contains no
edits. Safe to delete; left in place in case follow-up grepping is
needed.

---

## Open questions for the operator

1. **Where is the deploy source folder?** Need the path or repo
   containing the 30 hand-coded files actually serving
   chartnavmd.com. Without it, every future deploy is a manual
   re-paste.
2. **Is the React rebuild in this repo abandoned or planned?**
   `git log --oneline` shows one initial commit; the work tree has
   real edits today. Either the React rebuild is the intended
   next-generation marketing site (Path A), or this repo should be
   archived (Path B).
3. **Should the duplicate Vercel projects be deleted?**
   `chartnavmd-site-5utg`, `chartnavmd-site-gqbw`,
   `chartnav-platform-kpxg`, `chartnav-platform-xype`,
   `sourcedeck-site-lsce` look like accidental re-imports.
4. **Should `.github/workflows/deploy.yml` be removed now?** It
   silently builds and publishes to GitHub Pages on every
   `main`/`staging` push, but DNS doesn't go there. Risk if DNS ever
   flips back. Recommend removing or fencing behind
   `if: false` until the topology decision is made.

---

## Incident: 2026-05-16 ~18:55 UTC — unintended production deploy

**Summary.** A force-push of local `main` to `origin/main` (authorized
by the operator solely to reconcile the empty-initializer
`origin/main` so that a docs-only PR could be opened) cascaded into
an unintended production deployment of the React/Vite build of this
repo. The live `chartnavmd.com` briefly served the unprepared SPA
instead of the hand-coded marketing site. Rolled back within minutes.

**Timeline (UTC).**

- `12:50` — last known-good hand-coded production deployment
  `dpl_B7rvzJNYmmuW3YpEEPBD5ZiMAvAJ` (the one the migration plan
  was supposed to preserve).
- `18:53` — `git push --force-with-lease origin main` (authorized
  for PR opening). Vercel's GitHub App saw the push and started a
  production build for both `chartnavmd-site` and the duplicate
  `chartnavmd-site-gqbw`.
- `18:55` — build completed, deployment
  `dpl_3ZFSSNoyBXEZMJnJpsHgWhpidKtJ` promoted to production.
  `autoAssignCustomDomains: true` moved the `chartnavmd.com` /
  `www.chartnavmd.com` aliases to the new deployment automatically.
- `19:00` — incident detected. `curl -sI https://chartnavmd.com/`
  showed `content-length: 4419` (SPA shell) instead of `49090`
  (hand-coded HTML).
- `19:03` — `vercel promote dpl_B7rvzJNYmmuW3YpEEPBD5ZiMAvAJ`
  returned the aliases to the hand-coded deployment. Live site
  restored.
- `19:04` — Ignored Build Step set on both `chartnavmd-site` and
  `chartnavmd-site-gqbw` to block future production deploys via
  Git push.

**Root cause.** Two compounding misunderstandings:

1. The earlier topology investigation reported "Git connection:
   NONE" based on `vercel project inspect` output. That command
   does not surface the `link` field of a project. The Git
   connection had existed since project creation (29 April 2026,
   `link.createdAt: 1777455747578`); it was simply latent because
   no commit had ever been pushed to `origin/main` until 18:53 UTC
   today.
2. `autoAssignCustomDomains: true` is the Vercel default and means
   "any new production deployment claims the project's custom
   domains automatically." Even with a Git-connected project, this
   behavior is what makes a push to `main` capable of replacing a
   live alias without explicit intent.

**Mitigations now in place.**

- `commandForIgnoringBuildStep` set on `chartnavmd-site` and
  `chartnavmd-site-gqbw` to skip any production-environment build.
  Preview builds (PRs, non-`main` branches) still run, so iteration
  on parity work can proceed.
- This PR documents the corrected understanding so the next
  operator does not repeat the assumption.

**Still required (separate, not in this PR).**

- Decide whether `chartnavmd-site-gqbw` should be deleted or just
  left blocked. It has no custom-domain aliases and is shadowing
  every push.
- When the parity branch is ready, the cutover PR must explicitly
  remove the Ignored Build Step (or change it to no-op for the
  intended target) at the same time as the merge — not before, not
  after.

---

## Decisions log

| Date | Decision | By |
| --- | --- | --- |
| 2026-05-16 | **Current live source confirmed:** Vercel project `chartnavmd-site` (`prj_vtlrTeSk6BormQMXNgD36sR5BRmm`), no Git connection, deployed via direct `vercel --prod` CLI upload of a hand-coded 30-file static folder. Source folder is not present on this machine and not in any GitHub repo under `thekidd2227`. | operator + investigation |
| 2026-05-16 | **Intended canonical source-of-truth:** `thekidd2227/chartnavmd-site` (this repo). Path A from the topology doc: adopt this repo, build content/visual parity, connect Vercel to Git, promote on push to `main`. | operator |
| 2026-05-16 | **Migration strategy:** preview-parity-first. No production deploy until a preview deployment from a non-`main` branch has been visually and behaviorally signed off against the live page. Cutover is a separate PR, not this one. Steps written in [`vercel-migration-checklist.md`](./vercel-migration-checklist.md). | operator |
| 2026-05-16 | **GitHub Pages workflow quarantined.** `.github/workflows/deploy.yml` renamed to `deploy.yml.disabled` so GitHub Actions cannot load it. Removed permanently as part of the cutover PR, not before. Reason: the workflow targets GitHub Pages but DNS now points to Vercel — leaving it active is a footgun. | this PR |
| 2026-05-16 | **No production deploy was made by this PR.** This is deployment-source documentation cleanup only. The live chartnavmd.com page is unchanged. | this PR |
| 2026-05-16 | **Correction:** Vercel project was Git-connected to `thekidd2227/chartnavmd-site` with productionBranch=`main` from inception. The earlier "Git connection: NONE" finding was wrong; `vercel project inspect` does not surface the `link` field. Verified via `vercel api /v10/projects/...`. | follow-up to PR #1 |
| 2026-05-16 | **Incident:** force-push of `main` (authorized for PR opening) inadvertently triggered a production deploy of the React build. `chartnavmd.com` briefly served the unprepared SPA. Rolled back via `vercel promote dpl_B7rvzJNYmmuW3YpEEPBD5ZiMAvAJ` within ~3 minutes. Live site restored to the hand-coded version. | follow-up to PR #1 |
| 2026-05-16 | **Production deploys blocked.** `commandForIgnoringBuildStep` set on both `chartnavmd-site` (`prj_vtlrTeSk6BormQMXNgD36sR5BRmm`) and the duplicate `chartnavmd-site-gqbw` (`prj_tiddSHYnRjKF0ZyZFDSNoNywLnU2`). The step skips any build where `$VERCEL_ENV = production`. Preview builds still run. Removing this block is now a deliberate, audited step in the cutover PR. | follow-up to PR #1 |
