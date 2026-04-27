# Chartnav — Homepage v1

Ophthalmology-first platform section under ARCGSystems.com.
Lives at `/chartnav`. Self-contained shell — does not use ARCG's `Layout`,
`Navbar`, or `Footer`. Everything is scoped under `.chartnav-root` so no
styles bleed into the rest of the site.

## Files you will actually touch

| File | What it owns |
|---|---|
| `src/content/chartnav/config.ts`      | Base URL, contact email, OG image, legal URLs, webhook env var. **Business-input lives here.** |
| `src/content/chartnav/home.en.json`   | All homepage copy, nav labels, footer labels. |
| `src/components/chartnav/ChartnavShell.tsx` | Per-route SEO (Helmet), JSON-LD, `body.chartnav-active` gate, scroll + hash handling. |
| `src/components/chartnav/chartnav.css` | The full design system (scoped under `.chartnav-root`). |
| `src/components/chartnav/submitLead.ts` | Lead webhook adapter + `track()` analytics helper. |

## Routes

| Path | Index | Purpose |
|---|---|---|
| `/chartnav` | yes | Homepage |
| `/chartnav/assessment` | yes | Standalone assessment form |
| `/chartnav/thank-you` | noindex | Post-submit |
| `/chartnav/platform` | noindex | Placeholder until detail page ships |
| `/chartnav/ophthalmology` | noindex | ” |
| `/chartnav/security` | noindex | ” |
| `/chartnav/implementation` | noindex | ” |
| `/chartnav/insights` | noindex | ” |

Wired in `src/App.tsx` via wouter. Only the homepage and assessment page are in
`public/sitemap.xml`.

## Environment variable

```
VITE_CHARTNAV_LEAD_WEBHOOK=https://hook.us2.make.com/XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

Production flow:
```
Chartnav form submit → Make.com webhook → Airtable downstream
```

When unset, `submitLead` falls back to `console.info` — safe for dev, but the
webhook **must** be set in production before the site ships or leads will only
exist in the browser console.

See `.env.example` at repo root.

## Make.com + Airtable integration

See **[MAKE_SCENARIO.md](./MAKE_SCENARIO.md)** for the complete handoff:
- exact webhook payload shape (envelope + per-form fields)
- recommended Airtable schema (one shared table, one single-select default)
- step-by-step Make scenario build (3 modules, ~10 minutes)
- failure / retry handling
- local + production test steps

## Analytics

All events are namespaced `chartnav.*`:

- `chartnav.nav.cta_click` (label: `primary` | `mobile`)
- `chartnav.hero.cta_click` (label: `primary` | `secondary`)
- `chartnav.platform.cta_click`
- `chartnav.implementation.cta_click`
- `chartnav.workflow.cta_click`
- `chartnav.final.cta_click` (label: `primary` | `secondary`)
- `chartnav.demo.form_view` / `form_start` / `form_submit` / `form_error`
- `chartnav.assessment.form_view` / `form_start` / `form_submit` / `form_error`

Routing: `window.dataLayer.push` → `window.gtag` → dev-console debug.
Plug into GA4/GTM by mounting the loader in `index.html` (already present
site-wide for ARCG). No PII in event payloads.

## Local preview

```bash
npm run dev
# → http://localhost:5173/chartnav
```

## Production build

```bash
VITE_CHARTNAV_LEAD_WEBHOOK=https://your.webhook/chartnav npm run build
```

Output goes to `dist/`. Deploy with the existing ARCG pipeline.
SPA fallback to `index.html` must be enabled on the host; GitHub Pages (already
in use — see `public/404.html`) handles it.
