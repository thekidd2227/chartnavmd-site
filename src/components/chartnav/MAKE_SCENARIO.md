# Chartnav — Make.com + Airtable integration

This is the complete, self-contained handoff for wiring Chartnav form
submissions into your existing Make.com → Airtable pipeline. Nothing in the
code needs further changes; this document covers what to configure in Make
and Airtable.

Production flow:

```
Chartnav form submit   →   Make.com webhook   →   Airtable
```

---

## 1. Webhook payload shape

The site has a **single public funnel** — `chartnav-assessment`. Every CTA
opens the Workflow Assessment and posts the same outer envelope. The
question set is ophthalmology-first with a short non-ophthalmology branch;
`fields` vary based on the visitor's practice type.

```json
{
  "form_id":       "chartnav-assessment",
  "submitted_at":  "2026-04-17T14:22:11.000Z",
  "source_page":   "chartnav-home",
  "landing_path":  "/chartnav",
  "referrer":      "https://google.com/",
  "utm": {
    "utm_source":   null,
    "utm_medium":   null,
    "utm_campaign": null,
    "utm_content":  null,
    "utm_term":     null
  },
  "fields": {
    "practice_type":              "ophthalmology",
    "practice_type_other":        null,
    "subspecialties":             ["Retina", "Glaucoma"],
    "full_name":                  "Sample Name",
    "work_email":                 "sample@practice.com",
    "phone":                      null,
    "practice_name":              "Sample Ophthalmology",
    "role":                       "administrator",
    "providers":                  12,
    "locations":                  3,
    "workup_before_physician":    "yes",
    "imaging_before_physician":   "yes",
    "dilation_timing_impact":     "yes",
    "surgical_post_op":           "regularly",
    "imaging_modalities":         ["OCT", "Fundus photography", "Visual field"],
    "image_to_chart_ease":        "workable",
    "documentation_slows_visits": "sometimes",
    "schedule_dilation_aware":    "manual",
    "front_desk_readiness":       "partial",
    "checkin_friction":           "sometimes",
    "billing_signal_timing":      "month_end",
    "leadership_visibility":      "partial",
    "scope_first":                "one_workflow",
    "timeline":                   "30-90",
    "priorities":                 null
  }
}
```

### Envelope (always present)

| Path | Type | Notes |
|---|---|---|
| `form_id` | string | `"chartnav-assessment"` |
| `submitted_at` | string (ISO-8601 UTC) | Generated client-side at submit |
| `source_page` | string | Stable label: `chartnav-home`, `chartnav-assessment-page`, `chartnav-placeholder`, or `unknown` |
| `landing_path` | string or `null` | Literal `window.location.pathname` |
| `referrer` | string or `null` | `document.referrer` if present |
| `utm.utm_source` … `utm.utm_term` | string or `null` | Captured from URL at submit time |

### `fields` — Section A · Practice fit

| Path | Type | Required | Values |
|---|---|---|---|
| `fields.practice_type` | string | required | `ophthalmology` · `optometry` · `other` |
| `fields.practice_type_other` | string or `null` | required when `practice_type === "other"` | Free-text specialty |
| `fields.subspecialties` | array of strings or `null` | optional (ophthalmology only) | Any of: `Comprehensive`, `Retina`, `Glaucoma`, `Cataract`, `Cornea`, `Pediatric`, `Oculoplastics`, `Other` |

### `fields` — Section B · Practice profile (always)

| Path | Type | Required | Values |
|---|---|---|---|
| `fields.full_name` | string | required | — |
| `fields.work_email` | string | required | — |
| `fields.phone` | string or `null` | optional | — |
| `fields.practice_name` | string | required | — |
| `fields.role` | string | required | `physician` · `administrator` · `director` · `ops` · `other` |
| `fields.providers` | number or `null` | required (ophthalmology + optometry) | 1–500 |
| `fields.locations` | number or `null` | required (ophthalmology + optometry) | 1–99 |

### `fields` — Sections C–F · Ophthalmology clinical context

Populated only when `practice_type === "ophthalmology"`; `null` otherwise.

| Path | Required (when ophth.) | Values |
|---|---|---|
| `fields.workup_before_physician`    | ✓ | `yes` · `sometimes` · `no` |
| `fields.imaging_before_physician`   | ✓ | `yes` · `sometimes` · `no` |
| `fields.dilation_timing_impact`     | — | `yes` · `some` · `no` · `unsure` |
| `fields.surgical_post_op`           | — | `regularly` · `sometimes` · `no` |
| `fields.imaging_modalities`         | — | Any of: `OCT`, `Fundus photography`, `Visual field`, `Topography`, `A-scan / B-scan`, `Other` |
| `fields.image_to_chart_ease`        | ✓ | `easy` · `workable` · `problem` |
| `fields.documentation_slows_visits` | — | `rarely` · `sometimes` · `often` |
| `fields.schedule_dilation_aware`    | ✓ | `built_around` · `manual` · `generic` |
| `fields.front_desk_readiness`       | — | `yes` · `partial` · `no` |
| `fields.checkin_friction`           | — | `rarely` · `sometimes` · `often` |
| `fields.billing_signal_timing`      | ✓ | `same_week` · `month_end` · `later` |
| `fields.leadership_visibility`      | — | `yes` · `partial` · `no` |

### `fields` — Section G · Implementation readiness (always)

| Path | Type | Required | Values |
|---|---|---|---|
| `fields.scope_first` | string or `null` | optional | `one_workflow` · `several_modules` · `full` · `exploring` |
| `fields.timeline` | string | required | `0-30` · `30-90` · `90+` · `exploratory` |
| `fields.priorities` | string or `null` | optional | Free text, up to 1000 chars |

---

## 2. Airtable schema

### Recommended strategy

**One shared table named `ChartNav Leads`.** Single public funnel, single
view to triage, single set of automations. For non-ophthalmology
submissions the ophthalmology-specific columns stay empty and the lead can
still be routed as "future specialty interest."

### Columns

| Airtable column | Airtable type | Source path in payload | Required |
|---|---|---|---|
| Form ID | Single select (`chartnav-assessment`) | `form_id` | ✓ |
| Submitted At | Date (with time, ISO) | `submitted_at` | ✓ |
| Source Page | Single-line text | `source_page` | ✓ |
| Landing Path | Single-line text | `landing_path` | — |
| Referrer | URL | `referrer` | — |
| UTM Source / Medium / Campaign / Content / Term | Single-line text (×5) | `utm.*` | — |
| **Practice Type** | Single select (`ophthalmology`, `optometry`, `other`) | `fields.practice_type` | ✓ |
| **Practice Type Other** | Single-line text | `fields.practice_type_other` | when `other` |
| Subspecialties | Multiple select (`Comprehensive`, `Retina`, `Glaucoma`, `Cataract`, `Cornea`, `Pediatric`, `Oculoplastics`, `Other`) | `fields.subspecialties` | — |
| Full Name | Single-line text | `fields.full_name` | ✓ |
| Work Email | Email | `fields.work_email` | ✓ |
| Phone | Phone | `fields.phone` | — |
| Practice Name | Single-line text | `fields.practice_name` | ✓ |
| Role | Single select (`physician`, `administrator`, `director`, `ops`, `other`) | `fields.role` | ✓ |
| Providers | Number (integer, ≥ 1) | `fields.providers` | for ophth + optom |
| Locations | Number (integer, ≥ 1) | `fields.locations` | for ophth + optom |
| **Workup Before Physician** | Single select (`yes`, `sometimes`, `no`) | `fields.workup_before_physician` | ophth only |
| **Imaging Before Physician** | Single select (`yes`, `sometimes`, `no`) | `fields.imaging_before_physician` | ophth only |
| **Dilation Timing Impact** | Single select (`yes`, `some`, `no`, `unsure`) | `fields.dilation_timing_impact` | — |
| **Surgical / Post-Op** | Single select (`regularly`, `sometimes`, `no`) | `fields.surgical_post_op` | — |
| **Imaging Modalities** | Multiple select (`OCT`, `Fundus photography`, `Visual field`, `Topography`, `A-scan / B-scan`, `Other`) | `fields.imaging_modalities` | — |
| **Image-to-Chart Ease** | Single select (`easy`, `workable`, `problem`) | `fields.image_to_chart_ease` | ophth only |
| **Documentation Slows Visits** | Single select (`rarely`, `sometimes`, `often`) | `fields.documentation_slows_visits` | — |
| **Schedule Dilation Aware** | Single select (`built_around`, `manual`, `generic`) | `fields.schedule_dilation_aware` | ophth only |
| **Front Desk Readiness** | Single select (`yes`, `partial`, `no`) | `fields.front_desk_readiness` | — |
| **Check-In Friction** | Single select (`rarely`, `sometimes`, `often`) | `fields.checkin_friction` | — |
| **Billing Signal Timing** | Single select (`same_week`, `month_end`, `later`) | `fields.billing_signal_timing` | ophth only |
| **Leadership Visibility** | Single select (`yes`, `partial`, `no`) | `fields.leadership_visibility` | — |
| **Scope First** | Single select (`one_workflow`, `several_modules`, `full`, `exploring`) | `fields.scope_first` | — |
| Timeline | Single select (`0-30`, `30-90`, `90+`, `exploratory`) | `fields.timeline` | ✓ |
| **Priorities** | Long text | `fields.priorities` | — |
| Status | Single select (`New`, `Contacted`, `Qualified`, `Disqualified`, `Closed`) | — (default: `New`, set in Airtable) | — |

> **Tip:** create the `Status` column with a default value of `New`. Make
> does not need to write it; it lets whoever triages leads track state
> directly in Airtable.
>
> **Enable `typecast: true` on the Make Airtable module** so new single-/
> multi-select options are auto-created as they appear. This is already
> part of the submission adapter for the fallback direct-Airtable path.

---

## 3. Make scenario — build steps

Target scenario: **3 modules** (or 4 with routing). Takes ~10 minutes to build.

### Module 1 — Webhooks › Custom webhook
1. Add a **Webhooks → Custom webhook** module.
2. Click **Add**, name it `Chartnav Leads`.
3. Copy the generated URL. This is the value you will set as the build-time
   env var `VITE_CHARTNAV_LEAD_WEBHOOK` on the repo's hosting.
4. Click **Re-determine data structure** and then submit one Chartnav form
   from a running preview build so Make sees a real sample payload and
   auto-detects the fields. (Exact steps below in §5.)
5. Save.

### Module 2 — (Optional) Router by `form_id`
Only add this if you want Demo and Assessment to land in separate Airtable
tables. Otherwise skip to Module 3.

1. Add a **Router**.
2. Route A filter: `{{1.form_id}}` **equal to** `chartnav-demo`.
3. Route B filter: `{{1.form_id}}` **equal to** `chartnav-assessment`.

### Module 3 — Airtable › Create a record

1. Add an **Airtable → Create a Record** module.
2. Connection: pick (or create) an OAuth connection to your Airtable workspace.
3. Base: select the base that will hold leads.
4. Table: `Chartnav Leads` (or `Demo Requests` / `Assessment Requests` if you
   used the router).
5. Map each Airtable column to the corresponding payload path using the
   mapping table in §2. Quick reference:

   ```
   Form ID         = {{1.form_id}}
   Submitted At    = {{1.submitted_at}}
   Source Page     = {{1.source_page}}
   Landing Path    = {{1.landing_path}}
   Referrer        = {{1.referrer}}
   UTM Source      = {{1.utm.utm_source}}
   UTM Medium      = {{1.utm.utm_medium}}
   UTM Campaign    = {{1.utm.utm_campaign}}
   UTM Content     = {{1.utm.utm_content}}
   UTM Term        = {{1.utm.utm_term}}

   Full Name       = {{1.fields.full_name}}
   Work Email      = {{1.fields.work_email}}
   Phone           = {{1.fields.phone}}
   Practice Name   = {{1.fields.practice_name}}
   Role            = {{1.fields.role}}
   Practice Size   = {{1.fields.practice_size}}
   Locations       = {{1.fields.locations}}
   Providers       = {{1.fields.providers}}
   Subspecialties  = {{1.fields.subspecialties}}          ← pass the array directly
   Current Systems = {{1.fields.current_systems}}
   Timeline        = {{1.fields.timeline}}
   Message         = {{1.fields.message}}
   ```

6. Save the module and the scenario.
7. Toggle the scenario **ON** (top-left).

### Module 4 — (Optional) Notification
Add whatever downstream notification pattern you already use in Make (Slack,
Gmail, iMessage, etc.). Keep this consistent with existing ARCG scenarios so
the Chartnav lead flow isn't a one-off. Skip if leads are already monitored
via an Airtable view.

### Failure handling

1. In Make, open the scenario **Settings** (bottom bar).
2. Under **Scheduling**, set to **Immediately** (webhook-triggered).
3. Under **Error handling**, enable **Store incomplete executions**. This
   means if Airtable throws (rate limit, schema mismatch, invalid select
   value), the run is saved and re-runnable from the History. No lead is lost.
4. Recommended: add a **Break** handler on the Airtable module with
   **Number of attempts: 3** and **Interval: 60 seconds**. This retries on
   transient Airtable errors before giving up.

---

## 4. Repo side — what's already done in code

- `submitLead.ts` sends the exact payload shape in §1.
- Webhook path is the primary destination when `VITE_CHARTNAV_LEAD_WEBHOOK`
  is set.
- Direct-Airtable fallback is gated behind an explicit opt-in flag and is
  **not** used when the webhook env var is set.
- No Airtable secrets are exposed in the browser via the webhook path.
- All form-level validation, honeypot, time-on-form guard, success redirect,
  and error banner behavior preserved.
- Empty-string optional fields are normalized to `null` so Airtable doesn't
  accumulate empty-string single-select values.
- Both forms route through the same adapter — no per-form webhook config
  needed.

---

## 5. Testing

### Local (no env var)
```bash
npm run dev
# → http://localhost:5173/chartnav
```
Submit a form. DevTools Console shows:
```
[chartnav] lead submission (no destination configured): { … full payload … }
```
Use this to verify the payload shape before wiring Make.

### Local (with Make webhook live)
```bash
cp .env.example .env.local
# paste the webhook URL into VITE_CHARTNAV_LEAD_WEBHOOK
npm run dev
```
Submit a form.
- DevTools → Network tab: a `POST` to the webhook URL returning `2xx`.
- Make → Scenarios → your scenario → History: new execution, click it,
  confirm the payload and the Airtable row that was created.
- Airtable: a new row in `Chartnav Leads` with all the fields populated.

### Production smoke test
After deploy, visit `https://arcgsystems.com/chartnav` and submit one demo
request using a recognizable test name (e.g. `Launch Smoke Test`). Verify the
row arrives in Airtable, then archive the test record.

### Intentional failure test
1. Remove one required Airtable column (e.g. rename `Full Name` to `Full Nm`).
2. Submit a test form.
3. Confirm the Make run fails and is stored as an incomplete execution.
4. Rename the column back; re-run the incomplete execution; confirm the row
   is created. This validates the no-lead-loss behavior.

---

## 6. Env var

```
VITE_CHARTNAV_LEAD_WEBHOOK=https://hook.us2.make.com/XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

Set on the build host. Vite reads this at build time — a rebuild is required
after changing the value.

### Where to set it on this project

This repo deploys via **GitHub Actions → GitHub Pages** (see
`.github/workflows/deploy.yml`). The workflow's `Build` step is wired to
read `${{ secrets.VITE_CHARTNAV_LEAD_WEBHOOK }}` and pass it into `npm run
build`, so Vite can inline it.

To enable the production flow end to end:

1. Create the Make scenario (§3) and copy the webhook URL.
2. Go to GitHub → this repo → **Settings → Secrets and variables → Actions**.
3. Click **New repository secret**.
   - Name: `VITE_CHARTNAV_LEAD_WEBHOOK`
   - Value: the Make webhook URL
4. Re-run the latest **Deploy to GitHub Pages** workflow (or push any commit
   to `main`). The workflow will rebuild with the secret inlined and fail
   early if the URL did not end up in `dist/assets` (guardrail added in
   `deploy.yml` — "Verify Chartnav webhook is wired into the bundle").

### Local dev override

For local testing before the Make scenario is live, put the URL in
`.env.local` at the repo root (git-ignored):

```
VITE_CHARTNAV_LEAD_WEBHOOK=https://hook.us2.make.com/XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

Then run `npm run dev` and submit one test form.
