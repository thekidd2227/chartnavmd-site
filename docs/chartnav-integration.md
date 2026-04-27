# Chartnav Lead Pipeline — Integration Handoff

This is the top-level pointer doc. The two canonical sources of truth for
the Chartnav lead pipeline live next to the code:

- Design + routing: [`src/components/chartnav/README.md`](../src/components/chartnav/README.md)
- Make.com + Airtable wiring: [`src/components/chartnav/MAKE_SCENARIO.md`](../src/components/chartnav/MAKE_SCENARIO.md)

Keep this file short. If you need to change anything, update the canonical
docs above and mirror only the quick-start here.

---

## Production flow (locked)

```
Chartnav form submit  →  Make.com webhook  →  Airtable (Chartnav Leads)
```

### Live production endpoints

| Thing | Value |
|---|---|
| Make webhook URL | `https://hook.us2.make.com/2lwu4p6nufolxv6kca16y38di6y5fidb` |
| Make hook id / name | `2175194` — `ARCG \| Chartnav Leads` |
| Make scenario id / name | `4775310` — `Chartnav \| Lead Intake → Airtable (Chartnav Leads)` |
| Scenario mode | `scheduling.type: "immediately"` / `metadata.instant: true` (processes on POST, no polling) |
| Airtable base | `appfQRV1tGk3sWMCb` |
| Airtable table id | `tbldxPA8E6uiZvAHS` (table name: `Chartnav Leads`) |
| Airtable connection | Make connection `8008305` (airtable2 token) |
| Org / team | `ARCG Systems` (org 7022889) / team 2049492, region us2 |

### End-to-end verification (already run)
- 4 test payloads posted `2026-04-17T05:10–05:16Z`, all reached the webhook
  (HTTP 200 "Accepted") and were written to the `Chartnav Leads` Airtable
  table. Execution `d2197c273f614517a21f3d42b48f0694` was the `instant: true`
  live-hit test after the scheduling patch. Archive these records before
  going live.
- Status shows "Warning" rather than "Success" because `typecast: true` is
  on the Airtable module — when a new `role`, `practice_size`, `timeline`,
  or `subspecialties` value appears, Airtable auto-creates the option.
  That's the intended behavior so the form never hard-fails on a new
  option; the warning is informational.

- Primary destination: `VITE_CHARTNAV_LEAD_WEBHOOK` (Make.com custom webhook).
- Direct-Airtable path: **opt-in only**, gated by `VITE_CHARTNAV_ALLOW_DIRECT_AIRTABLE=true`.
  Do **not** enable in production if the Make webhook is usable — enabling it
  ships the Airtable PAT in the client bundle.
- If neither is configured, `submitLead` logs the payload via `console.info`
  so leads aren't silently lost in dev. A `console.warn` is also emitted
  when this path runs in a production build.

## Required env var (production)

```
VITE_CHARTNAV_LEAD_WEBHOOK=https://hook.us2.make.com/XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

Vite inlines this at build time — rebuild after changing.

## Airtable table (one shared)

Table name: **`Chartnav Leads`**.

Field list + single/multi-select values are in
[`MAKE_SCENARIO.md §2`](../src/components/chartnav/MAKE_SCENARIO.md#2-airtable-schema).

## Make scenario (three modules)

1. **Webhooks → Custom webhook** (copy URL into the env var)
2. *(Optional)* **Router** on `{{1.form_id}}` if you want separate tables
3. **Airtable → Create a Record** into `Chartnav Leads`

Exact field mapping is in
[`MAKE_SCENARIO.md §3`](../src/components/chartnav/MAKE_SCENARIO.md#3-makecom-scenario--build-steps).

## Minimal manual checklist

Most of the pipeline is already built and tested. What remains for you to
do by hand:

1. **GitHub secret** — in this repo on github.com, go to
   **Settings → Secrets and variables → Actions → New repository secret**
   and add:
   - Name: `VITE_CHARTNAV_LEAD_WEBHOOK`
   - Value: `https://hook.us2.make.com/2lwu4p6nufolxv6kca16y38di6y5fidb`

   The deploy workflow (`.github/workflows/deploy.yml`) already pipes this
   secret into the `Build` step and will fail the build early if the URL
   isn't successfully inlined into the bundle.
2. **Trigger a deploy** — push any commit to `main`, or re-run the latest
   `Deploy to GitHub Pages` workflow under **Actions**. GitHub Pages will
   publish a fresh `dist/` with the webhook baked in.
3. **Smoke test** — visit `https://arcgsystems.com/chartnav`, submit one
   Demo request with a recognizable test name (e.g. `Launch Smoke Test`),
   confirm the row arrives in the Airtable `Chartnav Leads` table, then
   archive the test record (and the 4 `Launch Test*` rows already written
   during setup).
4. **Airtable field verification** — the scenario uses `typecast: true`,
   so Airtable auto-creates single-select options as they appear. If the
   table doesn't yet have the recommended shape from `MAKE_SCENARIO.md §2`,
   verify the existing columns accept the mapped names (see `Live
   production endpoints` above for baseId / tableId).

### Already completed during setup
- Make webhook `ARCG | Chartnav Leads` created (hook 2175194).
- Make scenario `Chartnav | Lead Intake → Airtable` created, wired to the
  existing Airtable connection 8008305 / base `appfQRV1tGk3sWMCb` / table
  `tbldxPA8E6uiZvAHS`, switched to instant mode, and activated.
- `.env.local` populated with the webhook URL for local dev (git-ignored).
- Local build verified: `grep dist/assets/*.js` confirms the URL is
  inlined in the production bundle.
- `.github/workflows/deploy.yml` updated to pass `VITE_CHARTNAV_LEAD_WEBHOOK`
  from a GitHub secret into `npm run build`, with a verification step that
  fails the build if the URL is not present in `dist/assets`.
- Live end-to-end test: 5 POSTs sent, 4 processed through to Airtable
  (`Launch Test` x3, `Launch Test FINAL`, `Launch Test INSTANT`).
