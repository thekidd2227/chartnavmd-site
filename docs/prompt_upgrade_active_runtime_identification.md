# Active Runtime File Identification — Prompt Upgrade

**Date:** 2026-04-08
**Purpose:** Identify every runtime file the operator actually uses to run the LCC, so the prompt upgrades can be verified at the real runtime layer — not just build artifacts.

## Deployment topology (from `capacitor.config.ts` + `vite.pages.config.ts` + `CNAME`)

```
src/  + public/   ─ vite build ──▶   dist/   ─ GitHub Pages ──▶ arcgsystems.com
                                       │
                                       └── npx cap sync ios ──▶ ios/App/App/public/
                                                                (iOS app bundle)
```

Vite `webDir = dist`. Capacitor sync copies `dist/` → `ios/App/App/public/`. That means there are **three parallel live copies** of every static LCC HTML file that must stay in sync:

1. `public/` — Vite source of truth for static assets (developer edits here)
2. `dist/` — Vite build output, served to `arcgsystems.com` (browser runtime)
3. `ios/App/App/public/` — Capacitor iOS bundle, loaded inside the native iOS app (mobile runtime)

Any prompt change must land in all three or the deployment is partial.

## Files scanned

Full recursive scan of the repo (`find . -name '*.html' -not -path '*/node_modules/*' -not -path '*/.git/*'`) turned up the following LCC-related files:

| Path | Lines | Role | Active? |
|---|---|---|---|
| `public/ARCG_LCC_Mobile.html` | 2181 | Mobile LCC — Vite source | **YES** |
| `dist/ARCG_LCC_Mobile.html` | 2181 | Mobile LCC — browser runtime | **YES** |
| `ios/App/App/public/ARCG_LCC_Mobile.html` | 2181 | Mobile LCC — iOS app bundle | **YES** |
| `public/ARCG_Lead_Command_Center_v4_FINAL.html` | 2020 | Desktop LCC — Vite source | **YES** |
| `dist/ARCG_Lead_Command_Center_v4_FINAL.html` | 2020 | Desktop LCC — browser runtime | **YES** |
| `ios/App/App/public/ARCG_Lead_Command_Center_v4_FINAL.html` | 2020 | Desktop LCC — iOS app bundle | **YES** |
| `public/ARCG_Lead_Command_Center_Mobile_FINAL.html` | 11 | 11-line redirect stub | No — legacy stub |
| `dist/ARCG_Lead_Command_Center_Mobile_FINAL.html` | 11 | 11-line redirect stub | No — legacy stub |
| `ios/App/App/public/ARCG_Lead_Command_Center_Mobile_FINAL.html` | 11 | 11-line redirect stub | No — legacy stub |
| `public/ARCG_Content_Prompt_Library.html` | — | Ad content library — not LCC lead-gen or COR | No |
| `docs/arcg_master_documentation_v3.2.html` | — | Documentation reference | No |
| `docs/ARCG_Operations_Bible.html` | — | Documentation reference | No |
| `docs/ARCG_Operations_Bible_v1.2.html` | — | Documentation reference | No |
| `index.html` (root) | 181 | Vite React entry point (marketing site) | No — not LCC |

## No `v6.html` or desktop app resource exists

The mission brief mentioned `ARCG_Lead_Command_Center_v6.html` and "desktop app resource lcc.html" as candidates. Neither exists in the repo. The desktop LCC is still `ARCG_Lead_Command_Center_v4_FINAL.html`. The `v4_FINAL` file is the canonical desktop LCC runtime on every surface (browser + iOS app).

The `_Mobile_FINAL.html` variants are 11-line redirect stubs that forward to `ARCG_LCC_Mobile.html` — they carry no prompt logic and are not active prompt surfaces.

## Active runtime files requiring prompt-upgrade verification

Exactly **6 files** across the **3 surfaces** × **2 LCC apps**:

### Mobile LCC (commercial lead-gen prompt lives here)
1. `public/ARCG_LCC_Mobile.html`
2. `dist/ARCG_LCC_Mobile.html`
3. `ios/App/App/public/ARCG_LCC_Mobile.html`

### Desktop LCC (no lead-gen prompt — consumes from Airtable; COR function lives here)
4. `public/ARCG_Lead_Command_Center_v4_FINAL.html`
5. `dist/ARCG_Lead_Command_Center_v4_FINAL.html`
6. `ios/App/App/public/ARCG_Lead_Command_Center_v4_FINAL.html`

## Gap found during identification

The previous prompt-upgrade round updated `public/` and `dist/` but **did NOT update the iOS app bundle** at `ios/App/App/public/`. That meant the iOS runtime was still carrying:

- `ios/App/App/public/ARCG_LCC_Mobile.html` — old `REAL-SOUNDING but FICTIONAL` commercial prompt, no `VERIFIED LEADS ONLY`, no `corOutreachAnalysis`
- `ios/App/App/public/ARCG_Lead_Command_Center_v4_FINAL.html` — no `corOutreachAnalysis`

This gap was closed in the repair step by copying the already-patched `dist/` versions into `ios/App/App/public/` (see `prompt_upgrade_final_runtime_proof.md` for the post-repair audit table).
