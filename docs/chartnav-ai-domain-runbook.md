# chartnav.ai — Domain Runbook

Target canonical URL: **`https://arcgsystems.com/chartnav/`**
Registrar: **GoDaddy**
Primary hosting: **GitHub Pages for `arcgsystems.com` (this repo)**

ChartNav's marketing site is a *path* on `arcgsystems.com` rather than a
separate origin, so DNS alone cannot complete the link — the registrar
must perform an HTTP-level 301 redirect. This doc is the operator
runbook for finishing the job in GoDaddy, plus the safety-net that's
already live in this repo.

---

## 1. Preferred solution — GoDaddy 301 forwarding

This is the cleanest fast path. No code/DNS-record changes required;
GoDaddy handles the 301 at the edge.

### Apex — `chartnav.ai`

1. Sign in at https://dcc.godaddy.com/control/portfolio
2. Open **chartnav.ai** → **Website → Forwarding** (or **Domain Settings
   → Forwarding** on the legacy UI).
3. Add a forwarding rule:
   - **Forward to:** `https://arcgsystems.com/chartnav/`
   - **Forward type:** **Permanent (301)**
   - **Settings / Masking:** **Forward only** (do NOT enable masking —
     masking would trap visitors on `chartnav.ai` and block HTTPS cert
     delivery downstream).
   - **Update my nameservers and DNS settings to support this change:** ✅ yes
4. Save.

### www — `www.chartnav.ai`

GoDaddy forwards the `www` subdomain by adding the same rule under
**Forwarding → Subdomains** (or via a `CNAME www → @` + forwarding
combo; the UI wizard handles both depending on current DNS state).

- **Subdomain:** `www`
- **Forward to:** `https://arcgsystems.com/chartnav/`
- **Forward type:** **Permanent (301)**
- **Masking:** off.

### What GoDaddy writes to DNS

When you save the above, GoDaddy replaces the apex A records with its
parking-and-forwarding IPs (typically `3.33.x.x` / `15.197.x.x` on
AWS) and points `www` to `@`. These are ParkWeb's forwarding edge;
they terminate TLS, serve the 301, and redirect to the target.

### Expected propagation

- **Forwarding active:** under 10 minutes globally, usually under 2.
- **TLS on the forwarding edge:** GoDaddy provisions the cert
  automatically on the forwarding IPs. If a stale cert from a
  previous DNS setup is cached on the edge, allow up to ~1 hour for
  the fresh cert to appear.

### Verification

```bash
# Expect 301 → https://arcgsystems.com/chartnav/
curl -I http://chartnav.ai
curl -I https://chartnav.ai
curl -I https://www.chartnav.ai
```

The `Location:` header on all three must be
`https://arcgsystems.com/chartnav/`.

---

## 2. In-repo safety net (already deployed by this commit)

In case DNS is ever pointed at GitHub Pages instead of GoDaddy
forwarding (e.g. a future operator experiments with custom-domain
verification for `chartnav.ai`), the ARCG website now includes a
host-based redirect:

- `index.html` — a tiny script runs before React mounts and calls
  `location.replace('https://arcgsystems.com/chartnav/...')` whenever
  `hostname` is `chartnav.ai` or `www.chartnav.ai`.
- `public/404.html` — the same safety-net runs before the GitHub Pages
  SPA redirect, so deep-link navigation is covered too.

The safety-net is a **belt-and-suspenders**; GoDaddy forwarding is the
canonical mechanism. If the forwarding is disabled deliberately the
safety-net keeps traffic out of `arcgsystems.com`'s 404.

---

## 3. What this runbook intentionally does NOT do

- **Does not** add `chartnav.ai` to the GitHub Pages `CNAME` file.
  `arcgsystems.com` remains the single custom domain served by Pages.
  Adding a second CNAME would break the primary site.
- **Does not** require any ACME / Let's Encrypt coordination — GoDaddy
  provisions TLS for the forwarding edge automatically.
- **Does not** introduce a third-party redirector or URL-shortener.

---

## 4. Rollback

If GoDaddy forwarding causes unexpected behavior:

1. Delete the forwarding rules in the GoDaddy UI.
2. Restore the original DNS (or leave DNS pointing at GoDaddy Parking).

The in-repo safety-net has no effect unless DNS actually serves the
arcg-live bundle under `chartnav.ai` — it's dormant in the GoDaddy
forwarding configuration.
