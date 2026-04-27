# Active Runtime — Old Weaker Wording Removal Verification

**Date:** 2026-04-08

## Scope

Confirm that every fabrication-enabling phrase from the pre-upgrade prompts has been removed from all active LCC runtime files, not just `public/` and `dist/`. This explicitly includes the iOS app bundle at `ios/App/App/public/`, which was missed by the first-round upgrade and has now been synced.

## Search terms

The following phrases are banned in any active runtime prompt path:

| Pattern | Why it was banned |
|---|---|
| `REAL-SOUNDING` | Old prompt language that authorized model to emit plausible-looking fake companies |
| `FICTIONAL` | Old prompt told the model to generate fictional companies on purpose |
| `firstname@domain.com` | Example template that implied guessing pattern-based emails was acceptable |
| `Make email domains match company names` | Old instruction that actively encouraged email guessing |
| `Fallback: generate mock prospects` | Comment above the removed JavaScript fabrication fallback |
| `Premier.*Metro.*Capital.*Heritage` | The fabrication array used by the removed JS fallback |

## Audit (post-repair)

```
file                                                          banned-hit-count
public/ARCG_LCC_Mobile.html                                          0
dist/ARCG_LCC_Mobile.html                                            0
ios/App/App/public/ARCG_LCC_Mobile.html                              0
public/ARCG_Lead_Command_Center_v4_FINAL.html                        0
dist/ARCG_Lead_Command_Center_v4_FINAL.html                          0
ios/App/App/public/ARCG_Lead_Command_Center_v4_FINAL.html            0
```

Zero banned phrases remain in any active LCC runtime file.

## Wider-scope repo sweep

For completeness, the same search was run across the entire repo excluding `docs/`, `node_modules/`, and `.git/`:

```bash
grep -rn "REAL-SOUNDING\|FICTIONAL\|firstname@domain.com\|Make email domains match company names" \
  /Users/jean-maxcharles/arcg-live \
  --exclude-dir=node_modules --exclude-dir=.git --exclude-dir=docs
```

Result: **0 matches** in any source, runtime, or build artifact. The old wording does not exist anywhere that the operator's toolchain could load it back into production.

(The docs directory intentionally references the old phrases in the upgrade write-ups. Those are historical documentation, not executable prompt paths.)

## JavaScript fabrication fallback — confirmed removed

The pre-upgrade `geoGenerateLeads` function contained a non-API fallback that fabricated 15 company names × 10 first names × 10 last names × 5 titles × 4 pain points plus random phone numbers plus guessed emails. That entire branch has been replaced with:

```js
} else {
  // Anti-fabrication policy: no mock companies, no guessed emails, no invented contacts.
  // Lead research requires a real LLM with web knowledge. If no key is set, return empty.
  prospects = [];
  if(st)st.textContent='Set OPENAI_KEY in config to run verified lead research. Mock generation is disabled — ARCG does not fabricate leads.';
  toast('Set an API key — mock leads are disabled','err');
}
```

This replacement is present identically in all three mobile runtime files.

## Verdict

Every fabrication-enabling phrase and every fabrication-enabling code path has been removed from every active LCC runtime file — `public/`, `dist/`, and the iOS app bundle at `ios/App/App/public/`.
