# Commercial Lead Generation Prompt — Upgrade

**Date:** 2026-04-08
**Scope:** LCC commercial lead generation prompt only. No changes to Make scenarios, Instantly routing, validation lanes, delete logic, or unrelated UI.

## What changed

The commercial lead generation prompt used by the Geo Lead Generator in the LCC mobile surface was rewritten. The old prompt explicitly instructed the model to generate **"REAL-SOUNDING but FICTIONAL"** companies with guessed emails matching the domain pattern — a direct violation of ARCG's anti-fabrication rules and the root cause of the `Unverified Generated Lead` pool that was filling Airtable.

The new prompt enforces **VERIFIED LEADS ONLY** discipline:

1. Return only real, currently operating, publicly verifiable companies.
2. No guessed emails. No inferred private addresses from naming patterns.
3. No invented LinkedIn profiles, social handles, or phone numbers.
4. Every factual claim requires a public source URL.
5. A mandatory search order before accepting any generic inbox.
6. A mandatory contact path priority (decision-maker direct email → decision-maker LinkedIn → department mailbox → generic inbox fallback).
7. Explicit email quality classification on every lead.
8. Explicit generic-inbox labeling and downgrading.

## Where it changed

| File | Line range (before) | Change |
|---|---|---|
| `public/ARCG_LCC_Mobile.html` | 1925–1955 | Prompt body replaced. Mock-prospect fallback removed. |
| `dist/ARCG_LCC_Mobile.html` | 1925–1955 | Same change applied to the built mirror. |

The desktop LCC (`ARCG_Lead_Command_Center_v4_FINAL.html`) does not contain a commercial lead generation prompt — it consumes leads from Airtable. No change was needed there for this part.

## How generic inboxes are now handled

Generic inboxes — `info@`, `contact@`, `hello@`, `sales@`, `office@`, `admin@`, `support@`, `team@` — are now treated as **LOW-PRIORITY FALLBACK ONLY**. The prompt requires the model to:

1. Exhaustively search official website, LinkedIn (company + people), Hunter.io, ZoomInfo public pages, Facebook business pages, Google Business Profile, and public industry directories *before* accepting a generic inbox.
2. Label generic inboxes with `contact_quality = "Generic Inbox Fallback"` and `generic_inbox_fallback = true`.
3. Explain in `contact_quality_reason` exactly which public sources were searched and why no stronger path was found.
4. Never present a generic inbox as a preferred or high-quality contact.

Leads with generic inboxes are still allowed through the funnel but are scored lower and clearly flagged.

## How direct contacts are now prioritized

The prompt enforces a strict priority order:

```
A. Named decision-maker + verified direct public email
B. Named decision-maker + verified LinkedIn / public direct contact path
C. Department / function mailbox tied to a specific role
   (leasing@, operations@, facilities@, procurement@, vendor@, bd@, contracts@)
D. Generic inbox fallback — ONLY if nothing stronger is publicly verifiable
```

The model is also required to search for role-relevant contact paths (operations, facilities, property management, procurement, vendor relations, business development, contracts) before settling at tier D.

## New required output fields

Every lead now includes these additional fields in the JSON output:

- `contact_quality` — one of `Direct Decision-Maker Email` / `Named Employee / Team Email` / `Departmental / Functional Inbox` / `Generic Inbox Fallback` / `No Verified Email`
- `contact_quality_reason` — which public sources were searched, what was or wasn't found, why this was the best verifiable path
- `contact_source_type` — `website-team-page` / `website-contact-page` / `linkedin-person` / `linkedin-company` / `hunter` / `zoominfo` / `facebook` / `google-business-profile` / `directory` / `other`
- `generic_inbox_fallback` — boolean
- `preferred_outreach_channel` — `email` / `linkedin` / `phone` / `facebook` / `web-form`
- `alternate_verified_contact_paths` — array of verified URLs/handles
- `source_urls` — array of public source URLs backing every factual claim

## Mock fallback removed

The old `geoGenerateLeads` function included a JavaScript fallback that fabricated company names from arrays like `['Premier','Metro','Capital','Heritage','Landmark','Summit','Gateway',...]` combined with random person names and guessed emails of the form `firstname.lastname@companyname.com`. This fallback produced the fabricated rows that polluted Airtable under `Unverified Generated Lead`.

The fallback has been replaced with a hard stop: if no OpenAI or Claude key is configured, the function returns an empty list and shows a status message:

> *"Set OPENAI_KEY in config to run verified lead research. Mock generation is disabled — ARCG does not fabricate leads."*

## Anti-fabrication guarantees preserved

The upgrade strengthens, not weakens, the existing rules:

- No guessed emails ✅
- No invented contacts ✅
- No made-up LinkedIn profiles ✅
- No made-up social accounts ✅
- No unverifiable intelligence presented as fact ✅
- Source URLs required for every factual claim ✅
- Verified-email / social-only / rejected lane logic untouched ✅
- Existing Airtable `Validation Source URL`, `Validation Checks Passed`, and `Lead Fingerprint` fields untouched ✅

## What was NOT changed

- Make scenarios (PROD-03, PROD-02, PROD-01-v2, PROD-04, PROD-05, PROD-06, PROD-07)
- Instantly routing, campaign config, sender config
- PROD-03 filterByFormula
- Airtable Leads table schema
- Lead Fingerprints registry
- Soft-delete / hard-delete handlers
- Reply analyzer prompt
- Ad content prompt
- Booking link / pre-call brief logic
