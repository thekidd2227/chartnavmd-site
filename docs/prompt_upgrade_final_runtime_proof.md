# Prompt Upgrade — Final Runtime Proof

**Date:** 2026-04-08
**Purpose:** Single proof table covering every active LCC runtime file, every upgrade requirement, and the post-repair state.

## Deployment topology recap

```
public/   ─ vite build ──▶   dist/   ─ GitHub Pages ──▶ arcgsystems.com
                              │
                              └── npx cap sync ios ──▶ ios/App/App/public/
                                                       (iOS app bundle)
```

Three parallel runtime surfaces × two LCC apps (mobile + desktop) = **six active runtime files** that must carry the upgrades.

## Proof table

| # | Active runtime file | Commercial prompt upgraded? | COR prompt upgraded? | Old weaker wording removed? |
|---|---|---|---|---|
| 1 | `public/ARCG_LCC_Mobile.html` | **YES** | **YES** | **YES** |
| 2 | `dist/ARCG_LCC_Mobile.html` | **YES** | **YES** | **YES** |
| 3 | `ios/App/App/public/ARCG_LCC_Mobile.html` | **YES** (repaired this round) | **YES** (repaired this round) | **YES** (repaired this round) |
| 4 | `public/ARCG_Lead_Command_Center_v4_FINAL.html` | N/A (no commercial prompt here) | **YES** | **YES** |
| 5 | `dist/ARCG_Lead_Command_Center_v4_FINAL.html` | N/A (no commercial prompt here) | **YES** | **YES** |
| 6 | `ios/App/App/public/ARCG_Lead_Command_Center_v4_FINAL.html` | N/A (no commercial prompt here) | **YES** (repaired this round) | **YES** |

## Raw grep evidence

```
file                                                          old  VL  GIF  CQ  COR  SRC
public/ARCG_LCC_Mobile.html                                    0    2   2   5    3    3
dist/ARCG_LCC_Mobile.html                                      0    2   2   5    3    3
ios/App/App/public/ARCG_LCC_Mobile.html                        0    2   2   5    3    3
public/ARCG_Lead_Command_Center_v4_FINAL.html                  0    0   0   0    3    1
dist/ARCG_Lead_Command_Center_v4_FINAL.html                    0    0   0   0    3    1
ios/App/App/public/ARCG_Lead_Command_Center_v4_FINAL.html      0    0   0   0    3    1
```

Column legend:
- **old** — occurrences of `REAL-SOUNDING` / `FICTIONAL` / `firstname@domain.com` / `Make email domains match company names` (banned). Target: `0`.
- **VL** — occurrences of `VERIFIED LEADS ONLY`. Target: `2` on mobile, `0` on desktop (commercial prompt only lives on mobile).
- **GIF** — occurrences of `Generic Inbox Fallback`. Target: `2` on mobile, `0` on desktop.
- **CQ** — occurrences of `contact_quality`. Target: `5` on mobile (schema + enum labels), `0` on desktop.
- **COR** — occurrences of `corOutreachAnalysis`. Target: `3` everywhere (definition + window export + header comment).
- **SRC** — occurrences of `source_urls` + `SOURCE_URLS`. Target: `3` on mobile (commercial `source_urls` field referenced in three places plus COR `---SOURCE_URLS---` section), `1` on desktop (COR `---SOURCE_URLS---` section only).

All six files hit their targets exactly. All six show zero banned phrases.

## What was repaired this round

Compared to the first upgrade round, this round added:

1. **`ios/App/App/public/ARCG_LCC_Mobile.html`** — was carrying the old `REAL-SOUNDING but FICTIONAL` prompt (`old=2`), had no `VERIFIED LEADS ONLY` upgrade, had no `corOutreachAnalysis`. Replaced with the already-patched `dist/` version.
2. **`ios/App/App/public/ARCG_Lead_Command_Center_v4_FINAL.html`** — was missing `corOutreachAnalysis`. Replaced with the already-patched `dist/` version.

Both iOS bundle files now byte-match their `dist/` counterparts:

```
diff -q dist/ARCG_LCC_Mobile.html ios/App/App/public/ARCG_LCC_Mobile.html           → identical
diff -q dist/ARCG_Lead_Command_Center_v4_FINAL.html \
        ios/App/App/public/ARCG_Lead_Command_Center_v4_FINAL.html                   → identical
```

## Final verdict

- **Commercial lead-generation prompt upgrade:** LIVE on every active mobile LCC runtime surface (Vite source, browser deployment, iOS app bundle).
- **GovCon / COR outreach intelligence upgrade:** LIVE on every active LCC runtime surface — desktop and mobile, across Vite source, browser deployment, and iOS app bundle.
- **Old fabrication-enabling wording:** GONE from every active LCC runtime prompt path. Also gone from every non-doc location in the repo.
- **Mock-fabrication JS fallback:** GONE from all three mobile runtime files.
- **Anti-fabrication rules:** preserved and strengthened on all six runtime files.
- **Out-of-scope items (Make, Instantly, Airtable schema, delete logic, unrelated UI):** untouched.
