# Commercial Prompt — Active Runtime Verification

**Date:** 2026-04-08

## Scope

Verify that the upgraded `VERIFIED LEADS ONLY` commercial lead-generation prompt is present in every active mobile LCC runtime file — `public/`, `dist/`, and the iOS app bundle.

The desktop LCC (`ARCG_Lead_Command_Center_v4_FINAL.html`) does not host a commercial lead-generation prompt; it reads leads from Airtable. The commercial prompt lives only in `ARCG_LCC_Mobile.html`.

## Required markers

For each file, the upgraded prompt must contain:

| Marker | What it proves |
|---|---|
| `VERIFIED LEADS ONLY` | New anti-fabrication prompt header is present |
| `Generic Inbox Fallback` | Generic inboxes are explicitly downgraded to fallback-only |
| `contact_quality` | New email-quality classification field is in the required output schema |
| `source_urls` | Source-URL requirement is in the required output schema |
| `Do NOT guess emails` or `Do NOT invent` | Explicit anti-fabrication language is live |

## Audit (post-repair)

```
file                                                          VL  GIF  CQ  SRC
public/ARCG_LCC_Mobile.html                                    2    2   5   3
dist/ARCG_LCC_Mobile.html                                      2    2   5   3
ios/App/App/public/ARCG_LCC_Mobile.html                        2    2   5   3
```

(VL = "VERIFIED LEADS ONLY" hits, GIF = "Generic Inbox Fallback" hits, CQ = "contact_quality" hits, SRC = "source_urls" / "SOURCE_URLS" hits.)

All three mobile runtime surfaces have identical match counts — the upgrade is deployed symmetrically.

## Deeper-search language — present in all three

Each active mobile runtime file contains the full list of required public sources to search before accepting a generic inbox:

- official company website (home, about, team, staff, leadership, contact pages)
- LinkedIn company page
- LinkedIn public people pages — decision-makers, operations, facilities, property management, procurement, vendor relations, business development, contracts
- Hunter.io public company pages
- ZoomInfo public contact listings
- Facebook business page
- Google Business Profile and equivalent public directories
- industry directories (IREM, BOMA, NAA, SAM.gov, sba.gov, state licensing boards, and equivalents)

## Contact quality classifications — present in all three

Every runtime prompt enforces exactly these five contact-quality labels:

- `Direct Decision-Maker Email`
- `Named Employee / Team Email`
- `Departmental / Functional Inbox`
- `Generic Inbox Fallback`
- `No Verified Email`

## Anti-fabrication clauses — present in all three

- "Do NOT invent companies, people, titles, emails, phones, or URLs."
- "Do NOT guess emails. Do NOT infer private emails from naming patterns..."
- "Do NOT invent LinkedIn profiles, social handles, or phone numbers."
- "Every factual claim must be backed by a public source URL in source_urls. No source URL = do not include that claim."
- "If you cannot publicly verify ${count} real companies with at least one verifiable contact path, return fewer — never pad with invented data."

## Mock-fabrication JS fallback — removed from all three

The old JavaScript fallback that fabricated company names from `['Premier','Metro','Capital','Heritage','Landmark','Summit','Gateway',...]` plus guessed `firstname.lastname@company.com` emails has been removed from every active mobile runtime file. The post-repair search:

```
grep -c "Fallback: generate mock prospects\|Premier.*Metro.*Capital.*Heritage" \
  public/ARCG_LCC_Mobile.html \
  dist/ARCG_LCC_Mobile.html \
  ios/App/App/public/ARCG_LCC_Mobile.html
```

returns `0` in all three files. The function now hard-stops with a user-visible message when no API key is configured:

> *"Set OPENAI_KEY in config to run verified lead research. Mock generation is disabled — ARCG does not fabricate leads."*

## Verdict

Commercial lead-generation prompt upgrade is **LIVE on every active mobile runtime surface** — Vite source, browser deployment, and iOS app bundle.
