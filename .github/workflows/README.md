# `.github/workflows/`

## Current state — production deploys via Vercel Git integration (planned)

`chartnavmd.com` is **served by Vercel**, not GitHub Pages. The
production deployment topology is documented in
[`../../docs/deployment-topology.md`](../../docs/deployment-topology.md)
and the cutover plan is in
[`../../docs/vercel-migration-checklist.md`](../../docs/vercel-migration-checklist.md).

Once the Vercel Git connection is set up (Vercel dashboard → project
`chartnavmd-site` → Settings → Git), every push to `main` will
auto-build a production deployment and every PR will auto-build a
preview deployment. **CI/CD lives in Vercel, not in
`.github/workflows/`.**

## `deploy.yml.disabled` — the quarantined GitHub Pages workflow

The previous deploy workflow targeted GitHub Pages (with
`CNAME=chartnavmd.com`). DNS for chartnavmd.com no longer points
at GitHub Pages — it points at Vercel — so the workflow would
publish a divergent artifact that nothing serves.

The file is intentionally renamed with a `.disabled` extension.
**GitHub Actions only loads workflow files ending in `.yml` or
`.yaml`**, so this filename is a hard kill switch.

### Do not rename it back to `.yml` until:

1. Vercel has been disconnected from `chartnavmd.com`, **and**
2. DNS has been re-pointed at GitHub Pages, **and**
3. The team has explicitly decided to abandon Vercel.

None of those are planned. The expected path is to **delete** the
`.disabled` file as part of the Vercel-cutover PR, not to revive it.

## No other workflows are expected here

If a new workflow is added (e.g. linting, tests on PR), it should
not also try to deploy. Production deploys go through Vercel.
