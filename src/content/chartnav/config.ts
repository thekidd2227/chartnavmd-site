/**
 * ChartNav — centralized production config.
 *
 * Everything the business may need to update for launch is in this one file.
 * Do not scatter URLs, emails, or env var references across components.
 *
 * Anything marked BUSINESS_INPUT is a known gap that needs a real value before
 * launch. They are safe as-is (no fake content, no broken routes) but should
 * be replaced with real destinations when available.
 */

export const CHARTNAV_BASE_URL = "https://arcgsystems.com";

/**
 * Public-facing contact for ChartNav (and ARCG Systems legal contact).
 * Used in footer, legal pages, and form error fallback copy.
 */
export const CHARTNAV_CONTACT_EMAIL = "info@arivergroup.com";

/**
 * OG image used by social previews. An on-brand ChartNav SVG lockup lives at
 * /public/chartnav/brand/chartnav-og.svg for in-site brand use. Social
 * platforms do not render SVG in previews, so we still point OG at the ARCG
 * site-wide raster until a rendered 1200x630 JPEG/PNG is produced from the
 * SVG.
 *
 * BUSINESS_INPUT (optional): render /public/chartnav/brand/chartnav-og.svg
 * to /public/chartnav/brand/chartnav-og.jpg (1200x630) and change the path
 * below.
 */
export const CHARTNAV_OG_IMAGE = `${CHARTNAV_BASE_URL}/opengraph.jpg`;

/**
 * Legal URLs shown in the footer. These resolve to real pages inside this
 * repo (see src/pages/legal/*).
 */
export const CHARTNAV_LEGAL_LINKS = {
  privacy: "/privacy",
  terms: "/terms",
  security: "/security",
  accessibility: "/accessibility",
} as const;

/**
 * Read-only view of the webhook env var.
 *
 * PRODUCTION PATH: set VITE_CHARTNAV_LEAD_WEBHOOK to the Make.com custom
 * webhook URL. The Make scenario owns all downstream work — Airtable write,
 * email notification, Slack ping, routing, etc. This keeps every credential
 * (Airtable PAT, Slack token, etc.) off the client bundle.
 *
 * Flow:
 *   ChartNav form submit  →  Make.com webhook  →  Airtable (+ anything else)
 *
 * If unset, submissions fall back to console logging so leads aren't silently
 * lost during staging.
 */
export const CHARTNAV_LEAD_WEBHOOK: string | undefined =
  (import.meta as any).env?.VITE_CHARTNAV_LEAD_WEBHOOK || undefined;

/**
 * Airtable DIRECT-CLIENT submission config.
 *
 * ⚠ SECURITY WARNING — SECONDARY PATH ONLY ⚠
 * The production path is the Make.com webhook above. This direct-to-Airtable
 * path exists as an isolated fallback only. Using it ships the PAT in the
 * public JavaScript bundle, where anyone can read it and write/read/delete
 * records in that base.
 *
 * This path is GATED behind an explicit opt-in flag and is never used when
 * VITE_CHARTNAV_LEAD_WEBHOOK is set.
 *
 * Only enable when:
 *   - The Make.com webhook is genuinely unavailable.
 *   - The PAT is scoped to a single base with write-only create permission.
 *   - The business has explicitly accepted the exposure risk in writing.
 */
export const CHARTNAV_AIRTABLE = {
  enabled: ((import.meta as any).env?.VITE_CHARTNAV_ALLOW_DIRECT_AIRTABLE || "")
    .toString()
    .toLowerCase() === "true",
  baseId:       (import.meta as any).env?.VITE_AIRTABLE_BASE_ID        as string | undefined,
  pat:          (import.meta as any).env?.VITE_AIRTABLE_PAT            as string | undefined,
  // Single-table or per-form-type tables. If the per-form names are set,
  // they win. Otherwise we fall back to a single combined table.
  demoTable:        (import.meta as any).env?.VITE_AIRTABLE_DEMO_TABLE        as string | undefined,
  assessmentTable:  (import.meta as any).env?.VITE_AIRTABLE_ASSESSMENT_TABLE  as string | undefined,
  table:            (import.meta as any).env?.VITE_AIRTABLE_TABLE_NAME        as string | undefined,
};
