# Prompt Upgrade — Verification

**Date:** 2026-04-08
**Covers:** Commercial lead generation prompt upgrade + GovCon / COR outreach analysis prompt addition.

## Scope

This verification confirms:

1. The old weaker commercial lead generation wording is no longer active in any production LCC HTML path.
2. The new `VERIFIED LEADS ONLY` commercial prompt is present in all active commercial lead surfaces.
3. The new `corOutreachAnalysis` function is present in all active LCC surfaces (mobile + desktop, public + dist mirrors).
4. The fabricating mock-prospect JavaScript fallback has been removed.
5. Anti-fabrication rules are strengthened, not weakened.
6. No changes were made to Make scenarios, Instantly routing, Airtable schema, validation lanes, or unrelated UI.

## Verification commands and results

### 1. Old weaker wording — fully removed

```bash
grep -rn "REAL-SOUNDING\|FICTIONAL\|firstname@domain.com\|Make email domains match company names" \
  /Users/jean-maxcharles/arcg-live/public \
  /Users/jean-maxcharles/arcg-live/dist \
  | grep -v upgrade
```

**Result:** `0 matches` — the old prompt wording is no longer present in any active production prompt path.

### 2. New `VERIFIED LEADS ONLY` prompt — present in both mobile surfaces

```bash
grep -c "VERIFIED LEADS ONLY" \
  public/ARCG_LCC_Mobile.html \
  dist/ARCG_LCC_Mobile.html
```

**Result:**
- `public/ARCG_LCC_Mobile.html: 2` (prompt block + inline reference)
- `dist/ARCG_LCC_Mobile.html: 2` (prompt block + inline reference)

### 3. `corOutreachAnalysis` function — present in all 4 LCC HTML surfaces

```bash
grep -c "corOutreachAnalysis" \
  public/ARCG_LCC_Mobile.html \
  dist/ARCG_LCC_Mobile.html \
  public/ARCG_Lead_Command_Center_v4_FINAL.html \
  dist/ARCG_Lead_Command_Center_v4_FINAL.html
```

**Result:**
- `public/ARCG_LCC_Mobile.html: 3`
- `dist/ARCG_LCC_Mobile.html: 3`
- `public/ARCG_Lead_Command_Center_v4_FINAL.html: 3`
- `dist/ARCG_Lead_Command_Center_v4_FINAL.html: 3`

Each file contains the function definition, the `window.corOutreachAnalysis = corOutreachAnalysis` export, and a header comment reference — 3 matches per file.

### 4. Mock-prospect fallback — fully removed

```bash
grep -c "Fallback: generate mock prospects\|Premier.*Metro.*Capital.*Heritage" \
  public/ARCG_LCC_Mobile.html \
  dist/ARCG_LCC_Mobile.html
```

**Result:** `0 matches` in both files. The JavaScript fabrication fallback is gone.

## Anti-fabrication guarantees — preserved and strengthened

| Rule | Status |
|---|---|
| No guessed emails | ✅ Explicit in prompt + no JS fallback that guesses emails |
| No invented contacts | ✅ Explicit in prompt + no JS fallback that invents contacts |
| No made-up LinkedIn profiles | ✅ Explicit in both prompts |
| No made-up social accounts | ✅ Explicit in both prompts |
| No unverifiable intelligence as fact | ✅ Every claim requires a source URL |
| Generic inboxes = low-priority fallback only | ✅ Explicit in commercial prompt |
| Source URLs required | ✅ `source_urls` field required on commercial leads; `---SOURCE_URLS---` section required on COR briefs |
| Verified-email / social-only / rejected lane logic | ✅ Untouched |

## Commercial prompt — new required output fields

Every commercial lead must now include these fields, in addition to the legacy fields (`name`, `contact`, `title`, `email`, `phone`, `size`, `units_or_headcount`, `pain`, `deal_value`):

- `contact_quality`
- `contact_quality_reason`
- `contact_source_type`
- `generic_inbox_fallback`
- `preferred_outreach_channel`
- `alternate_verified_contact_paths`
- `source_urls`

## COR prompt — all 14 required sections present

1. `---LINKEDIN_PROFILE---` ✅
2. `---SOCIAL_MEDIA---` ✅
3. `---TOP_3_ICEBREAKERS---` ✅
4. `---ADDITIONAL_ICEBREAKERS---` ✅
5. `---CONTACT_METHOD_RANK---` ✅
6. `---PERSONALIZED_EMAIL_DRAFT---` ✅
7. `---LINKEDIN_CONNECTION_REQUEST---` ✅
8. `---PHONE_CALL_OPENING_SCRIPT---` ✅
9. `---INTELLIGENCE_GATHERING---` ✅
10. `---RELATIONSHIP_NURTURING_PLAN---` ✅ (Month 1 / 2 / 3 with week-by-week + ongoing)
11. `---COMPETITIVE_INTELLIGENCE---` ✅
12. `---RED_FLAGS_AND_ETHICAL_BOUNDARIES---` ✅
13. `---SUCCESS_METRICS_AND_STAGE---` ✅
14. `---SOURCE_URLS---` ✅

## Out-of-scope items — confirmed untouched

- Make scenarios (PROD-01-v2, PROD-02, PROD-03, PROD-04, PROD-05, PROD-06, PROD-07) — not touched
- Instantly campaign, sender, schedule — not touched
- PROD-03 `filterByFormula` — not touched
- Airtable Leads table schema — not touched
- Lead Fingerprints registry — not touched
- Soft-delete / hard-delete handlers — not touched
- Reply Analyzer prompt — not touched
- Ad content / visual prompt logic — not touched
- Booking link / pre-call brief logic — not touched
- Delete-unverified-generated-leads cleanup task — not touched

## Files changed

- `public/ARCG_LCC_Mobile.html` — commercial prompt replaced + COR function added
- `dist/ARCG_LCC_Mobile.html` — commercial prompt replaced + COR function added
- `public/ARCG_Lead_Command_Center_v4_FINAL.html` — COR function added
- `dist/ARCG_Lead_Command_Center_v4_FINAL.html` — COR function added

## Files created

- `docs/commercial_lead_prompt_upgrade.md`
- `docs/govcon_cor_prompt_upgrade.md`
- `docs/prompt_upgrade_verification.md` (this file)
