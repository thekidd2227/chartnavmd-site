/**
 * ChartNav lead submission adapter.
 *
 * Submission priority:
 *   1. Make.com webhook (VITE_CHARTNAV_LEAD_WEBHOOK set)       ← production
 *   2. Direct Airtable (secondary; opt-in only)                ← fallback
 *   3. Dev fallback (console.info so leads aren't silently lost)
 *
 * Production flow:
 *   ChartNav form submit → Make.com webhook → Airtable (+ other downstream)
 *
 * The Make webhook is the default production path because:
 *   - it keeps every credential (Airtable PAT, Slack, etc.) off the client
 *   - Make owns downstream routing, field mapping, and notifications
 *   - errors surface as non-2xx responses the user can see
 *
 * See config.ts for details.
 */

import {
  CHARTNAV_LEAD_WEBHOOK,
  CHARTNAV_AIRTABLE,
} from "@/content/chartnav/config";

export type LeadPayload = {
  form_id: "chartnav-demo" | "chartnav-assessment";
  submitted_at: string;                   // ISO-8601 UTC
  source_page: string;                    // human-readable label derived from landing_path
  landing_path: string | null;            // literal window.location.pathname
  referrer: string | null;
  utm: {
    utm_source:   string | null;
    utm_medium:   string | null;
    utm_campaign: string | null;
    utm_content:  string | null;
    utm_term:     string | null;
  };
  fields: Record<string, string | string[] | number | null>;
};

export type SubmitResult = { ok: boolean; error?: string };

function collectUTM(): LeadPayload["utm"] {
  const empty: LeadPayload["utm"] = {
    utm_source: null, utm_medium: null, utm_campaign: null,
    utm_content: null, utm_term: null,
  };
  try {
    const p = new URLSearchParams(window.location.search);
    return {
      utm_source:   p.get("utm_source")   || null,
      utm_medium:   p.get("utm_medium")   || null,
      utm_campaign: p.get("utm_campaign") || null,
      utm_content:  p.get("utm_content")  || null,
      utm_term:     p.get("utm_term")     || null,
    };
  } catch {
    return empty;
  }
}

/** Human-readable page label derived from the literal path. Stable values
 *  make it easy to route / group inside Make without parsing URLs. */
function deriveSourcePage(path: string | null): string {
  if (!path) return "unknown";
  if (path === "/chartnav")                     return "chartnav-home";
  if (path === "/chartnav/assessment")          return "chartnav-assessment-page";
  if (path === "/chartnav/thank-you")           return "chartnav-thank-you";
  if (path.startsWith("/chartnav/"))            return "chartnav-placeholder";
  return path;
}

export async function submitLead(
  payload: Pick<LeadPayload, "form_id" | "fields">
): Promise<SubmitResult> {
  const landing = typeof window !== "undefined" ? window.location.pathname : null;
  const full: LeadPayload = {
    form_id: payload.form_id,
    submitted_at: new Date().toISOString(),
    source_page: deriveSourcePage(landing),
    landing_path: landing,
    referrer: typeof document !== "undefined" ? (document.referrer || null) : null,
    utm: collectUTM(),
    fields: payload.fields,
  };

  // 1. Webhook (preferred)
  if (CHARTNAV_LEAD_WEBHOOK) {
    return postWebhook(full);
  }

  // 2. Direct Airtable (opt-in only)
  if (CHARTNAV_AIRTABLE.enabled && CHARTNAV_AIRTABLE.baseId && CHARTNAV_AIRTABLE.pat) {
    return postAirtable(full);
  }

  // 3. Dev fallback — log the payload so leads aren't silently lost.
  // If this runs in a production build, also emit a hard warning so the
  // missing env var is obvious in a browser console sweep.
  const env = (import.meta as any).env || {};
  // eslint-disable-next-line no-console
  console.info("[chartnav] lead submission (no destination configured):", full);
  if (env.PROD) {
    // eslint-disable-next-line no-console
    console.warn(
      "[chartnav] VITE_CHARTNAV_LEAD_WEBHOOK is not set in this build. " +
        "Submissions are NOT being delivered to Make.com. " +
        "Rebuild with the env var set before relying on this path."
    );
  }
  return { ok: true };
}

/* ============================================================
   Webhook path
   ------------------------------------------------------------
   Posts to the Make.com custom webhook with a 15s client-side
   abort. Non-2xx responses are surfaced to the user via the form
   banner so leads never fail silently. Network + abort errors are
   logged to console so the payload is at least recoverable from
   devtools during triage.
   ============================================================ */
async function postWebhook(full: LeadPayload): Promise<SubmitResult> {
  const controller =
    typeof AbortController !== "undefined" ? new AbortController() : null;
  const timeoutId = controller
    ? setTimeout(() => controller.abort(), 15_000)
    : null;
  try {
    const res = await fetch(CHARTNAV_LEAD_WEBHOOK as string, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(full),
      signal: controller ? controller.signal : undefined,
    });
    if (!res.ok) {
      const text = await res.text().catch(() => "");
      // eslint-disable-next-line no-console
      console.error("[chartnav] lead webhook non-2xx:", res.status, text, full);
      return { ok: false, error: `Submission failed (${res.status}). ${text}`.trim() };
    }
    return { ok: true };
  } catch (err: any) {
    // eslint-disable-next-line no-console
    console.error("[chartnav] lead webhook error:", err, full);
    return { ok: false, error: "Network error. Please try again or email us directly." };
  } finally {
    if (timeoutId) clearTimeout(timeoutId);
  }
}

/* ============================================================
   Direct Airtable path
   ------------------------------------------------------------
   Uses the Airtable REST API:
     POST https://api.airtable.com/v0/{baseId}/{tableName}
   Body:
     { "records": [ { "fields": { ...flat fields... } } ] }
   Auth:
     Authorization: Bearer {PAT}
   ============================================================ */
async function postAirtable(full: LeadPayload): Promise<SubmitResult> {
  const { baseId, pat, demoTable, assessmentTable, table } = CHARTNAV_AIRTABLE;
  const tableName =
    full.form_id === "chartnav-demo"
      ? (demoTable || table)
      : (assessmentTable || table);

  if (!tableName) {
    return {
      ok: false,
      error: "Form destination is not fully configured. Please try again later.",
    };
  }

  const url = `https://api.airtable.com/v0/${encodeURIComponent(
    baseId as string
  )}/${encodeURIComponent(tableName)}`;

  const airtableFields = toAirtableFields(full);

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${pat}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        records: [{ fields: airtableFields }],
        typecast: true,
      }),
    });
    if (!res.ok) {
      const text = await res.text().catch(() => "");
      // eslint-disable-next-line no-console
      console.error("[chartnav] airtable error:", res.status, text, full);
      return {
        ok: false,
        error: `Submission failed (${res.status}). Please try again or email info@arivergroup.com.`,
      };
    }
    return { ok: true };
  } catch (err: any) {
    // eslint-disable-next-line no-console
    console.error("[chartnav] airtable network error:", err, full);
    return {
      ok: false,
      error: "Network error. Please try again or email info@arivergroup.com.",
    };
  }
}

/**
 * Flatten a LeadPayload into a single-level Airtable fields object.
 *
 * Target field names (single-line text unless noted) — create these in the
 * Airtable table. Any Airtable field that is a single-select or multi-select
 * will be accepted thanks to typecast: true, which lets Airtable auto-create
 * options as they appear.
 *
 *   Form ID              (single-line text)
 *   Submitted At         (single-line text or ISO date)
 *   Source Page          (single-line text)    ← landing_path
 *   Referrer             (single-line text)
 *   UTM Source / Medium / Campaign / Content / Term   (each: single-line text)
 *   Full Name            (single-line text)
 *   Work Email           (email)
 *   Phone                (phone / single-line text)
 *   Practice Name        (single-line text)
 *   Role                 (single-select)
 *   Practice Size        (single-select)      ← demo only
 *   Locations            (number)             ← assessment only
 *   Providers            (number)             ← assessment only
 *   Subspecialties       (multi-select)       ← assessment only
 *   Current Systems      (long text)          ← assessment only
 *   Timeline             (single-select)      ← assessment only
 *   Message              (long text)          ← demo only
 */
function toAirtableFields(full: LeadPayload): Record<string, unknown> {
  const f = full.fields as Record<string, any>;
  return {
    // Envelope
    "Form ID":       full.form_id,
    "Submitted At":  full.submitted_at,
    "Source Page":   full.source_page,
    "Landing Path":  full.landing_path,
    "Referrer":      full.referrer,
    "UTM Source":    full.utm.utm_source,
    "UTM Medium":    full.utm.utm_medium,
    "UTM Campaign":  full.utm.utm_campaign,
    "UTM Content":   full.utm.utm_content,
    "UTM Term":      full.utm.utm_term,

    // Section A — practice fit
    "Practice Type":       f.practice_type,
    "Practice Type Other": f.practice_type_other,
    "Subspecialties":      f.subspecialties,

    // Section B — profile
    "Full Name":     f.full_name,
    "Work Email":    f.work_email,
    "Phone":         f.phone,
    "Practice Name": f.practice_name,
    "Role":          f.role,
    "Providers":     f.providers,
    "Locations":     f.locations,

    // Section C — how the clinic runs
    "Workup Before Physician":  f.workup_before_physician,
    "Imaging Before Physician": f.imaging_before_physician,
    "Dilation Timing Impact":   f.dilation_timing_impact,
    "Surgical / Post-Op":       f.surgical_post_op,

    // Section D — imaging & documentation
    "Imaging Modalities":         f.imaging_modalities,
    "Image-to-Chart Ease":        f.image_to_chart_ease,
    "Documentation Slows Visits": f.documentation_slows_visits,

    // Section E — scheduling & front desk
    "Schedule Dilation Aware": f.schedule_dilation_aware,
    "Front Desk Readiness":    f.front_desk_readiness,
    "Check-In Friction":       f.checkin_friction,

    // Section F — billing & visibility
    "Billing Signal Timing": f.billing_signal_timing,
    "Leadership Visibility": f.leadership_visibility,

    // Section G — implementation readiness
    "Scope First": f.scope_first,
    "Timeline":    f.timeline,
    "Priorities":  f.priorities,

    // Legacy (kept for backward compatibility with existing Airtable views)
    "Practice Size":   f.practice_size ?? null,
    "Current Systems": f.current_systems ?? null,
    "Message":         f.message ?? null,
  };
}

/* ============================================================
   Analytics
   ============================================================ */
type EventName =
  | "nav.cta_click"
  | "hero.cta_click"
  | "platform.cta_click"
  | "implementation.cta_click"
  | "workflow.cta_click"
  | "final.cta_click"
  | "demo.form_view"     | "demo.form_start"     | "demo.form_submit"     | "demo.form_error"
  | "assessment.form_view" | "assessment.form_start" | "assessment.form_submit" | "assessment.form_error";

export function track(event: EventName, data?: Record<string, string>) {
  try {
    const w = window as any;
    const payload = { event: `chartnav.${event}`, ...(data || {}) };
    if (w.dataLayer && typeof w.dataLayer.push === "function") {
      w.dataLayer.push(payload);
    } else if (typeof w.gtag === "function") {
      w.gtag("event", `chartnav.${event}`, data || {});
    } else if ((import.meta as any).env?.DEV) {
      // eslint-disable-next-line no-console
      console.debug("[chartnav] event:", payload);
    }
  } catch {
    // Never let analytics throw into the UI
  }
}
