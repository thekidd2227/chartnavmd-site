# arcg-make-audit (example template)

> **Safe example, no live credentials.** Copy this file to
> `arcg-make-audit.md` in the same directory, fill in the values
> from your local secret store, and run the audit. The real
> `arcg-make-audit.md` is gitignored — it must never be committed.
> See [`../security-and-secrets.md`](../security-and-secrets.md) at
> the bottom of this file for the standing rule.

Full audit of all ARCG Make.com scenarios. Flags broken filters,
dormant scenarios, and silent failures. Force-sends eligible leads.
Reports three send metrics separately — never collapsed.

## CREDENTIALS — read from local environment, do NOT paste live values here

The audit needs these values at runtime. **Read them from your
local secret store (1Password / Bitwarden / a gitignored
`config.env`). Do not commit any of them.**

| Variable | Example placeholder | Where it lives |
| --- | --- | --- |
| Make.com Org ID | `<MAKE_ORG_ID>` | Make.com → Organization Settings |
| Make.com Team ID | `<MAKE_TEAM_ID>` | Make.com → Team Settings |
| Airtable base ID | `<AIRTABLE_BASE_ID>` (looks like `appXXXXXXXXXXXXXX`) | Airtable → API docs for the base |
| Airtable Leads table ID | `<AIRTABLE_LEADS_TABLE_ID>` (looks like `tblXXXXXXXXXXXXXX`) | Airtable → API docs for the base |
| **Airtable PAT** | `<AIRTABLE_PAT>` (looks like `patXXXXXXXXXXXXXX.<64-hex>`) | Airtable → Developer hub → Personal access tokens. **SECRET** |
| Instantly campaign ID | `<INSTANTLY_CAMPAIGN_ID>` (UUID) | Instantly → Campaigns → URL |
| **Instantly bearer** | `<INSTANTLY_BEARER>` (base64) | Instantly → Settings → API. **SECRET** |
| Scenario IDs | `<PROD-01-v2_ID>`, `<PROD-02_ID>`, … | Make.com → Scenarios → URL |

When you fill out a runnable copy of this file at
`./arcg-make-audit.md`, replace each placeholder with the live value
from your secret store. That file is gitignored.

---

## TASK 1 — SCENARIO AUDIT (run for every scenario)

For each scenario, use `scenarios_get` to pull the full blueprint,
then `executions_list` to check the last 3 runs. Evaluate and
report:

### A. Liveness Check
- Is scenario active (`isActive: true`)?
- Is it valid (`isinvalid: false`)?
- Last 3 executions: all `status: 1` (success)? Any errors or
  zero-ops runs?
- Is `nextExec` set and reasonable?

### B. Filter Audit
For every `filter` object in every module, check the condition
variable `a`:

- **BROKEN (flag red):** `{{N.statusCode}}` used in
  `number:greaterorequal/less` — Make.com legacy HTTP coerces empty
  to 0, so this always blocks
- **BROKEN (flag red):** `{{N.data.someField}}` used in a filter —
  only resolves if `parseResponse: true` AND the upstream API
  returns valid JSON AND the field exists; silently empty
  otherwise
- **SAFE:** Conditions on `{{N.data.records}}` length, string
  equality on webhook fields, or no filter at all

### C. Dormancy Check — **flag any scenario that can never fire due to data state**

- `<PROD-02_ID>`: polls for `Status='Qualified'` — query Airtable
  and report how many Qualified records exist. If zero: flag as
  **DORMANT — no Qualified leads exist**
- `<PROD-04_ID>`: polls Instantly for replies — report reply count
  in campaign
- `<PROD-08_ID>`: polls for `Status='New'` with email but no MX —
  report count
- `<PROD-10_ID>`: weekly Monday scrape — report next scheduled run
- `<PROD-11_ID>`: hourly delete of Disqualified — report
  Disqualified count
- For any scenario where the trigger pool is empty, mark
  **DORMANT** with the reason

### D. Per-Scenario Result Table

Print this table after the full audit:

```
Scenario    | Active | Valid | Last Run   | Last Status | Filter Issues       | Dormant?
PROD-01-v2  | ✅     | ✅    | <DATE>     | Success     | None                | No (webhook)
PROD-02     | ✅     | ✅    | <DATE>     | Success     | None                | ⚠️ 0 Qualified leads
PROD-03     | ✅     | ✅    | <DATE>     | Success     | None (filter removed)| No
...
```

If any scenario has issues, print a repair block immediately after
the table.

---

## TASK 2 — FIX ANY BROKEN FILTERS FOUND

For each scenario where a broken filter is detected:

1. If the scenario has NO `builtin:BasicRouter` → use
   `scenarios_update` via Make MCP to push corrected blueprint.
   Safe fix: remove the broken filter entirely (unconditional is
   always safer than a filter that silently blocks). Verify
   `isinvalid: false` after push.
2. If the scenario HAS `builtin:BasicRouter` (e.g.
   `<PROD-01-v2_ID>`, `<PROD-08_ID>`) → API update will fail. Print
   exact canvas instructions: module number, field name, current
   value, correct value. Do NOT attempt API update.

### Known permanent rule

**Never use `{{N.statusCode}}` or `{{N.data.someField}}` as filter
conditions in legacy HTTP modules (`http:ActionSendData`).** Safe
alternatives:

- No filter (unconditional + `handleErrors: false`)
- `{{length(N.data.records)}} > 0` for Airtable responses
- `{{N.data.items}}` length for Instantly list responses

---

## TASK 3 — FORCE SEND ELIGIBLE LEADS

After confirming `<PROD-03_ID>` is healthy, execute this send loop:

**Step 1 — Fetch eligible Airtable leads:**

Formula: `AND({Status}='Synced to Notion',NOT({Email}=''),NOT({Validation Source URL}=''),OR(FIND('mx validated',LOWER(ARRAYJOIN({Validation Checks Passed},',')))>0,FIND('mx',LOWER(ARRAYJOIN({Validation Checks Passed},',')))>0),NOT({Lead Source}='AI Generated'))`

Paginate until all records retrieved. Count = **Metric A: Leads
eligible in Airtable**.

**Step 2 — POST each lead to Instantly:**

- Endpoint: `POST https://api.instantly.ai/api/v2/leads`
- Auth: `Authorization: Bearer <INSTANTLY_BEARER>` (from local
  environment)
- Body:
  ```json
  {
    "campaign": "<INSTANTLY_CAMPAIGN_ID>",
    "email": "{{Email}}",
    "first_name": "{{Contact Name or 'there'}}",
    "company_name": "{{Business Name}}",
    "personalization": "{{Location}}",
    "skip_if_in_workspace": true,
    "skip_if_in_campaign": true
  }
  ```
- Count 200 responses = **Metric B: Leads pushed to Instantly
  queue**.
- Stop at 194 (daily limit). Rate limit: 150 ms between calls.

**Step 3 — PATCH Airtable on each 200 response:**

- Endpoint: `PATCH /v0/<AIRTABLE_BASE_ID>/<AIRTABLE_LEADS_TABLE_ID>/{recordId}`
- Auth: `Authorization: Bearer <AIRTABLE_PAT>` (from local
  environment)
- Body: `{"fields":{"Status":"Contacted","fldiUW1Hux9aS6nU0":"YYYY-MM-DD"}}`
- Count successful 200 PATCHes = **Metric C: Airtable records
  marked Contacted**.

**Step 4 — Query Instantly for actual emails sent today:**

- Endpoint: `POST https://api.instantly.ai/api/v2/emails/list`
- Body: `{"campaign_id":"<INSTANTLY_CAMPAIGN_ID>","limit":100}`
- Filter results where `timestamp_created` is today's date (UTC).
  Count = **Metric D: Emails physically sent by Instantly today**.
- If the emails endpoint is unavailable, query
  `POST /api/v2/analytics/campaign/summary` with
  `{"campaign_id":"…","start_date":"YYYY-MM-DD","end_date":"YYYY-MM-DD"}`
  and extract `emails_sent` from the response.

---

## TASK 4 — FINAL REPORT

Print this exact format — never collapse the metrics:

```
════════════════════════════════════════════
ARCG PIPELINE REPORT — [DATE] [TIME UTC]
════════════════════════════════════════════

SEND METRICS (three separate numbers):
  A. Leads eligible in Airtable (Synced+MX):  ###
  B. Leads pushed to Instantly queue today:    ###  ← Instantly accepted the lead record
  C. Airtable records marked Contacted today:  ###  ← CRM updated
  D. Emails physically sent by Instantly today: ###  ← Actual outbound email fired

  ⚠️  B ≠ D is expected — Instantly queues leads and sends on its own schedule
  ⚠️  B ≠ C means the Airtable writeback partially failed — investigate
  ⚠️  D = 0 despite B > 0 means Instantly is holding sends (warmup, limit, paused)

SCENARIO HEALTH:
  [table from Task 1]

DORMANT SCENARIOS:
  [list any flagged dormant with reason and fix]

BROKEN FILTERS FOUND:
  [list with fix applied or canvas instructions]

AIRTABLE STATUS COUNTS:
  New:                ###
  Synced to Notion:   ###
  Contacted:          ###
  Replied:            ###
  Unverified:         ###
  Disqualified:       ###

NEXT ACTIONS:
  [any remaining items that need manual intervention]
════════════════════════════════════════════
```

---

## KNOWN PERMANENT CONSTRAINTS

- `scenarios_update` with `builtin:BasicRouter` always returns
  Internal Server Error on the production team. Never attempt it.
  Affected: `<PROD-01-v2_ID>`, `<PROD-08_ID>`. Canvas-only.
- `scheduling` must be a separate top-level param in
  `scenarios_update`, never inside `blueprint`.
- Instantly daily send limit: 194 emails/day from the configured
  sender.
- `<PROD-02_ID>` is effectively dormant — it syncs Qualified leads
  to Notion but the pipeline currently produces Contacted leads,
  not Qualified. Flag this every run until Qualified count > 0.

---

## Security and secrets — standing rule

- This file (`arcg-make-audit.example.md`) is the **only** version
  of this audit that may be committed.
- The runnable file `arcg-make-audit.md` (no `.example` suffix) is
  **gitignored** in [`../../.gitignore`](../../.gitignore) and must
  never be added with `git add -f` or `--no-verify`.
- Real Airtable PATs (`pat<14-chars>.<64-hex>`) and Instantly
  bearer tokens are credentials. They belong in your local secret
  store (1Password, etc.) and a gitignored `config.env`, not in any
  file under version control.
- If a token is ever pasted into a tracked file by accident: rotate
  the token at the issuer first, then scrub it from git history
  before re-pushing. GitHub push protection will block the push
  until both are done.
