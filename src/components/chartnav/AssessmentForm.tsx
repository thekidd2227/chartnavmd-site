import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import { useLocation } from "wouter";
import { Button } from "./primitives";
import { submitLead, track } from "./submitLead";

/* ============================================================
   ChartNav — Workflow Assessment
   ------------------------------------------------------------
   Ophthalmology-first question set. Visible wording is plain
   and short; the underlying logic surfaces imaging dependence,
   workup-to-exam handoff, dilation/lane sequencing, billing
   visibility, and implementation fit.

   Non-ophthalmology practices see a polite "coming soon"
   notice and a short demand-capture version of the form.
   ============================================================ */

type PracticeType = "" | "ophthalmology" | "optometry" | "other";

type FormState = {
  // Section A — fit
  practice_type: PracticeType;
  practice_type_other: string;
  subspecialties: string[];

  // Section B — profile
  full_name: string;
  work_email: string;
  phone: string;
  practice_name: string;
  role: string;
  providers: string;
  locations: string;

  // Section C — how the clinic runs (ophthalmology branch)
  workup_before_physician: string;
  imaging_before_physician: string;
  dilation_timing_impact: string;
  surgical_post_op: string;

  // Section D — imaging & documentation (ophthalmology branch)
  imaging_modalities: string[];
  image_to_chart_ease: string;
  documentation_slows_visits: string;

  // Section E — scheduling & front desk (ophthalmology branch)
  schedule_dilation_aware: string;
  front_desk_readiness: string;
  checkin_friction: string;

  // Section F — billing & visibility (ophthalmology branch)
  billing_signal_timing: string;
  leadership_visibility: string;

  // Section G — implementation readiness (always)
  scope_first: string;
  timeline: string;
  priorities: string;

  // anti-spam
  website: string;
};

type Errors = Partial<Record<keyof FormState, string>>;

const EMPTY: FormState = {
  practice_type: "",
  practice_type_other: "",
  subspecialties: [],

  full_name: "",
  work_email: "",
  phone: "",
  practice_name: "",
  role: "",
  providers: "",
  locations: "",

  workup_before_physician: "",
  imaging_before_physician: "",
  dilation_timing_impact: "",
  surgical_post_op: "",

  imaging_modalities: [],
  image_to_chart_ease: "",
  documentation_slows_visits: "",

  schedule_dilation_aware: "",
  front_desk_readiness: "",
  checkin_friction: "",

  billing_signal_timing: "",
  leadership_visibility: "",

  scope_first: "",
  timeline: "",
  priorities: "",

  website: "",
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[0-9+\s().-]{7,20}$/;

const SUBSPECIALTIES = [
  "Comprehensive",
  "Retina",
  "Glaucoma",
  "Cataract",
  "Cornea",
  "Pediatric",
  "Oculoplastics",
  "Other",
];

const IMAGING_MODALITIES = [
  "OCT",
  "Fundus photography",
  "Visual field",
  "Topography",
  "A-scan / B-scan",
  "Other",
];

function validate(v: FormState): Errors {
  const e: Errors = {};
  const isOphth = v.practice_type === "ophthalmology";
  const isOther = v.practice_type === "other";

  // Always
  if (!v.practice_type) e.practice_type = "Please pick a practice type.";
  if (isOther && v.practice_type_other.trim().length < 2) {
    e.practice_type_other = "Let us know what specialty.";
  }
  if (v.full_name.trim().length < 2) e.full_name = "Please enter your full name.";
  if (!EMAIL_RE.test(v.work_email.trim())) e.work_email = "Please enter a valid work email.";
  if (v.phone && !PHONE_RE.test(v.phone.trim())) e.phone = "Phone doesn't look right.";
  if (v.practice_name.trim().length < 2) e.practice_name = "Please enter your practice name.";
  if (!v.role) e.role = "Please pick your role.";
  if (!v.timeline) e.timeline = "Please pick a timeline.";
  if (v.priorities.length > 1000) e.priorities = "Keep it under 1000 characters.";

  // Providers / locations — only required when the practice is staffed
  // (ophthalmology + optometry). For "other" specialties we keep it light.
  if (v.practice_type === "ophthalmology" || v.practice_type === "optometry") {
    const prov = parseInt(v.providers, 10);
    if (!v.providers || isNaN(prov) || prov < 1 || prov > 500) e.providers = "Enter 1–500.";
    const loc = parseInt(v.locations, 10);
    if (!v.locations || isNaN(loc) || loc < 1 || loc > 99) e.locations = "Enter 1–99.";
  }

  // Ophthalmology branch — require the fit-critical answers so we can
  // produce a real workflow view. Keep the rest optional.
  if (isOphth) {
    if (!v.workup_before_physician) e.workup_before_physician = "Please pick one.";
    if (!v.imaging_before_physician) e.imaging_before_physician = "Please pick one.";
    if (!v.image_to_chart_ease)      e.image_to_chart_ease      = "Please pick one.";
    if (!v.schedule_dilation_aware)  e.schedule_dilation_aware  = "Please pick one.";
    if (!v.billing_signal_timing)    e.billing_signal_timing    = "Please pick one.";
  }

  return e;
}

/* ---------- Small reusable bits ---------- */

function Section({
  label, caption, children,
}: { label: string; caption?: string; children: ReactNode }) {
  return (
    <div className="cn-form-section">
      <div className="cn-form-section__hd">
        <span className="cn-form-section__label">{label}</span>
        {caption && <span className="cn-form-section__caption">{caption}</span>}
      </div>
      {children}
    </div>
  );
}

function Select({
  id, label, value, onChange, required, error, options, placeholder = "Select…",
}: {
  id: string; label: string; value: string; onChange: (v: string) => void;
  required?: boolean; error?: string; options: Array<{ value: string; label: string }>;
  placeholder?: string;
}) {
  return (
    <div className="cn-field" data-error={!!error}>
      <label htmlFor={id}>{label}{required && <span aria-hidden="true"> *</span>}</label>
      <select id={id} value={value} onChange={(e) => onChange(e.target.value)} required={required}>
        <option value="">{placeholder}</option>
        {options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
      {error && <span className="cn-field__error">{error}</span>}
    </div>
  );
}

function ChipGroup({
  label, options, selected, onToggle, helper,
}: {
  label: string; options: string[]; selected: string[];
  onToggle: (v: string) => void; helper?: string;
}) {
  return (
    <div className="cn-field">
      <label>{label}</label>
      {helper && <p className="cn-field__helper">{helper}</p>}
      <div className="cn-chips">
        {options.map((s) => {
          const on = selected.includes(s);
          return (
            <button
              key={s}
              type="button"
              onClick={() => onToggle(s)}
              aria-pressed={on}
              className={`cn-chips__item${on ? " is-on" : ""}`}
            >
              {s}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ---------- Main form ---------- */

export function AssessmentForm({ onSuccess }: { onSuccess: () => void }) {
  const [values, setValues] = useState<FormState>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const [started, setStarted] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [formOpenedAt] = useState<number>(Date.now());
  const [, setLocation] = useLocation();

  useEffect(() => { track("assessment.form_view"); }, []);

  function set<K extends keyof FormState>(key: K, value: FormState[K]) {
    if (!started) { setStarted(true); track("assessment.form_start"); }
    setValues((v) => ({ ...v, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  }

  const toggleIn = (key: "subspecialties" | "imaging_modalities", value: string) => {
    const list = values[key];
    set(key, list.includes(value) ? list.filter((x) => x !== value) : [...list, value]);
  };

  const isOphth = values.practice_type === "ophthalmology";
  const isOther = values.practice_type === "other";
  const isOptom = values.practice_type === "optometry";
  const comingSoon = isOther || isOptom;

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setServerError(null);
    if (values.website) return;
    if (Date.now() - formOpenedAt < 2500) return;

    const v = validate(values);
    setErrors(v);
    if (Object.keys(v).length > 0) {
      track("assessment.form_error", { field: Object.keys(v)[0] });
      // Scroll the first error into view for long-form UX
      requestAnimationFrame(() => {
        document.querySelector<HTMLElement>('[data-error="true"]')?.scrollIntoView({ block: "center", behavior: "smooth" });
      });
      return;
    }

    setSubmitting(true);
    const result = await submitLead({
      form_id: "chartnav-assessment",
      fields: {
        // Section A — fit
        practice_type:       values.practice_type,
        practice_type_other: isOther ? values.practice_type_other.trim() : null,
        subspecialties:      isOphth && values.subspecialties.length ? values.subspecialties : null,

        // Section B — profile
        full_name:     values.full_name.trim(),
        work_email:    values.work_email.trim(),
        phone:         values.phone.trim() || null,
        practice_name: values.practice_name.trim(),
        role:          values.role,
        providers:     values.providers ? parseInt(values.providers, 10) : null,
        locations:     values.locations ? parseInt(values.locations, 10) : null,

        // Section C — ophthalmology branch only
        workup_before_physician:  isOphth ? (values.workup_before_physician  || null) : null,
        imaging_before_physician: isOphth ? (values.imaging_before_physician || null) : null,
        dilation_timing_impact:   isOphth ? (values.dilation_timing_impact   || null) : null,
        surgical_post_op:         isOphth ? (values.surgical_post_op         || null) : null,

        // Section D
        imaging_modalities:         isOphth && values.imaging_modalities.length ? values.imaging_modalities : null,
        image_to_chart_ease:        isOphth ? (values.image_to_chart_ease        || null) : null,
        documentation_slows_visits: isOphth ? (values.documentation_slows_visits || null) : null,

        // Section E
        schedule_dilation_aware: isOphth ? (values.schedule_dilation_aware || null) : null,
        front_desk_readiness:    isOphth ? (values.front_desk_readiness    || null) : null,
        checkin_friction:        isOphth ? (values.checkin_friction        || null) : null,

        // Section F
        billing_signal_timing: isOphth ? (values.billing_signal_timing || null) : null,
        leadership_visibility: isOphth ? (values.leadership_visibility || null) : null,

        // Section G
        scope_first: values.scope_first || null,
        timeline:    values.timeline,
        priorities:  values.priorities.trim() || null,
      },
    });
    setSubmitting(false);

    if (result.ok) {
      track("assessment.form_submit", { practice_type: values.practice_type });
      onSuccess();
      setLocation("/chartnav/thank-you");
    } else {
      track("assessment.form_error", { field: "server" });
      setServerError(result.error || "Something went wrong. Please try again.");
    }
  }

  /* ---------- Render ---------- */

  return (
    <form noValidate onSubmit={onSubmit} aria-busy={submitting}>
      {serverError && <div className="cn-form__banner" role="alert">{serverError}</div>}

      {/* ===== Section A — Practice type / fit ===== */}
      <Section label="A · Practice type" caption="We start here so we tailor the rest of the review.">
        <Select
          id="cn-a-type"
          label="What kind of practice is this?"
          required
          value={values.practice_type}
          onChange={(v) => set("practice_type", v as PracticeType)}
          error={errors.practice_type}
          options={[
            { value: "ophthalmology", label: "Ophthalmology" },
            { value: "optometry",     label: "Optometry" },
            { value: "other",         label: "Other specialty" },
          ]}
        />

        {comingSoon && (
          <div className="cn-form__notice" role="status">
            <strong>ChartNav is focused on ophthalmology practices today.</strong>
            <span> Support for other specialties is coming soon. We still want to hear from you — the short version of this review below will get you on the list.</span>
          </div>
        )}

        {isOther && (
          <div className="cn-field" data-error={!!errors.practice_type_other}>
            <label htmlFor="cn-a-typeother">Which specialty?</label>
            <input
              id="cn-a-typeother"
              type="text"
              value={values.practice_type_other}
              onChange={(e) => set("practice_type_other", e.target.value)}
              placeholder="e.g. ENT, dermatology, orthopedics"
            />
            {errors.practice_type_other && (
              <span className="cn-field__error">{errors.practice_type_other}</span>
            )}
          </div>
        )}

        {isOphth && (
          <ChipGroup
            label="Subspecialties at your practice (optional)"
            helper="Pick any that describe the work your providers regularly do."
            options={SUBSPECIALTIES}
            selected={values.subspecialties}
            onToggle={(v) => toggleIn("subspecialties", v)}
          />
        )}
      </Section>

      {/* ===== Section B — Practice profile ===== */}
      <Section label="B · About you and your practice">
        <div className="cn-field" data-error={!!errors.full_name}>
          <label htmlFor="cn-a-name">Your name <span aria-hidden="true">*</span></label>
          <input id="cn-a-name" type="text" autoComplete="name" value={values.full_name} onChange={(e) => set("full_name", e.target.value)} required />
          {errors.full_name && <span className="cn-field__error">{errors.full_name}</span>}
        </div>

        <div className="cn-field--row">
          <div className="cn-field" data-error={!!errors.work_email}>
            <label htmlFor="cn-a-email">Work email <span aria-hidden="true">*</span></label>
            <input id="cn-a-email" type="email" autoComplete="email" value={values.work_email} onChange={(e) => set("work_email", e.target.value)} required />
            {errors.work_email && <span className="cn-field__error">{errors.work_email}</span>}
          </div>
          <div className="cn-field" data-error={!!errors.phone}>
            <label htmlFor="cn-a-phone">Phone (optional)</label>
            <input id="cn-a-phone" type="tel" autoComplete="tel" value={values.phone} onChange={(e) => set("phone", e.target.value)} />
            {errors.phone && <span className="cn-field__error">{errors.phone}</span>}
          </div>
        </div>

        <div className="cn-field" data-error={!!errors.practice_name}>
          <label htmlFor="cn-a-practice">Practice name <span aria-hidden="true">*</span></label>
          <input id="cn-a-practice" type="text" autoComplete="organization" value={values.practice_name} onChange={(e) => set("practice_name", e.target.value)} required />
          {errors.practice_name && <span className="cn-field__error">{errors.practice_name}</span>}
        </div>

        <Select
          id="cn-a-role" label="Your role" required
          value={values.role} onChange={(v) => set("role", v)} error={errors.role}
          options={[
            { value: "physician",     label: "Physician" },
            { value: "administrator", label: "Practice administrator" },
            { value: "director",      label: "Medical director" },
            { value: "ops",           label: "Operations / ops lead" },
            { value: "other",         label: "Other" },
          ]}
        />

        {(isOphth || isOptom) && (
          <div className="cn-field--row">
            <div className="cn-field" data-error={!!errors.providers}>
              <label htmlFor="cn-a-prov">Number of providers <span aria-hidden="true">*</span></label>
              <input id="cn-a-prov" type="number" min={1} max={500} value={values.providers} onChange={(e) => set("providers", e.target.value)} required />
              {errors.providers && <span className="cn-field__error">{errors.providers}</span>}
            </div>
            <div className="cn-field" data-error={!!errors.locations}>
              <label htmlFor="cn-a-loc">Number of locations <span aria-hidden="true">*</span></label>
              <input id="cn-a-loc" type="number" min={1} max={99} value={values.locations} onChange={(e) => set("locations", e.target.value)} required />
              {errors.locations && <span className="cn-field__error">{errors.locations}</span>}
            </div>
          </div>
        )}
      </Section>

      {/* ===== Ophthalmology branch — Sections C–F ===== */}
      {isOphth && (
        <>
          <Section label="C · How the clinic runs" caption="A few quick questions about the day.">
            <Select
              id="cn-a-workup" label="Do technicians perform a workup before the physician sees the patient?" required
              value={values.workup_before_physician} onChange={(v) => set("workup_before_physician", v)}
              error={errors.workup_before_physician}
              options={[
                { value: "yes",       label: "Yes — always" },
                { value: "sometimes", label: "Sometimes" },
                { value: "no",        label: "No" },
              ]}
            />
            <Select
              id="cn-a-imgex" label="Is imaging usually captured before the physician's exam?" required
              value={values.imaging_before_physician} onChange={(v) => set("imaging_before_physician", v)}
              error={errors.imaging_before_physician}
              options={[
                { value: "yes",       label: "Yes — for most visits" },
                { value: "sometimes", label: "Sometimes — depends on the visit" },
                { value: "no",        label: "No — imaging happens after or separately" },
              ]}
            />
            <Select
              id="cn-a-dilation" label="Does dilation timing affect how your day runs?"
              value={values.dilation_timing_impact} onChange={(v) => set("dilation_timing_impact", v)}
              options={[
                { value: "yes",     label: "Yes — it drives the schedule" },
                { value: "some",    label: "Somewhat" },
                { value: "no",      label: "Not really" },
                { value: "unsure",  label: "Not sure" },
              ]}
            />
            <Select
              id="cn-a-postop" label="Does your practice handle surgical or post-op visits in-house?"
              value={values.surgical_post_op} onChange={(v) => set("surgical_post_op", v)}
              options={[
                { value: "regularly", label: "Yes — regularly (e.g. cataract, retina, glaucoma surgery)" },
                { value: "sometimes", label: "Sometimes" },
                { value: "no",        label: "No — medical only" },
              ]}
            />
          </Section>

          <Section label="D · Imaging and documentation">
            <ChipGroup
              label="Which imaging modalities do you use regularly? (optional)"
              options={IMAGING_MODALITIES}
              selected={values.imaging_modalities}
              onToggle={(v) => toggleIn("imaging_modalities", v)}
            />
            <Select
              id="cn-a-imgchart" label="How easy is it to get the right study into the right chart, in the right order?" required
              value={values.image_to_chart_ease} onChange={(v) => set("image_to_chart_ease", v)}
              error={errors.image_to_chart_ease}
              options={[
                { value: "easy",     label: "Easy — it just works" },
                { value: "workable", label: "Workable — it takes effort" },
                { value: "problem",  label: "It's often a problem" },
              ]}
            />
            <Select
              id="cn-a-docslows" label="Is documentation slowing your visits down?"
              value={values.documentation_slows_visits} onChange={(v) => set("documentation_slows_visits", v)}
              options={[
                { value: "rarely",    label: "Rarely" },
                { value: "sometimes", label: "Sometimes" },
                { value: "often",     label: "Often" },
              ]}
            />
          </Section>

          <Section label="E · Scheduling and front desk">
            <Select
              id="cn-a-sched" label="How does your schedule currently handle dilation and imaging timing?" required
              value={values.schedule_dilation_aware} onChange={(v) => set("schedule_dilation_aware", v)}
              error={errors.schedule_dilation_aware}
              options={[
                { value: "built_around", label: "Built around it" },
                { value: "manual",       label: "We work around it manually" },
                { value: "generic",      label: "Generic slots — dilation/imaging aren't part of the schedule" },
              ]}
            />
            <Select
              id="cn-a-ready" label="Does the front desk have clear visibility into which patients are ready for the lane?"
              value={values.front_desk_readiness} onChange={(v) => set("front_desk_readiness", v)}
              options={[
                { value: "yes",     label: "Yes" },
                { value: "partial", label: "Partially" },
                { value: "no",      label: "No" },
              ]}
            />
            <Select
              id="cn-a-checkin" label="Do missing intake forms, insurance, or language needs cause friction at check-in?"
              value={values.checkin_friction} onChange={(v) => set("checkin_friction", v)}
              options={[
                { value: "rarely",    label: "Rarely" },
                { value: "sometimes", label: "Sometimes" },
                { value: "often",     label: "Often" },
              ]}
            />
          </Section>

          <Section label="F · Billing and visibility">
            <Select
              id="cn-a-billing" label="When do you typically find out about billing or claim issues?" required
              value={values.billing_signal_timing} onChange={(v) => set("billing_signal_timing", v)}
              error={errors.billing_signal_timing}
              options={[
                { value: "same_week", label: "Same week as the visit" },
                { value: "month_end", label: "End of month" },
                { value: "later",     label: "Later than that" },
              ]}
            />
            <Select
              id="cn-a-lead" label="Does leadership have a current-week view of operational and revenue signals?"
              value={values.leadership_visibility} onChange={(v) => set("leadership_visibility", v)}
              options={[
                { value: "yes",     label: "Yes" },
                { value: "partial", label: "Partially" },
                { value: "no",      label: "No" },
              ]}
            />
          </Section>
        </>
      )}

      {/* ===== Section G — Implementation readiness (always) ===== */}
      <Section label="G · Implementation readiness">
        {isOphth && (
          <Select
            id="cn-a-scope" label="What scope are you considering first?"
            value={values.scope_first} onChange={(v) => set("scope_first", v)}
            options={[
              { value: "one_workflow",     label: "One workflow to start" },
              { value: "several_modules",  label: "Several modules" },
              { value: "full",             label: "Full rollout" },
              { value: "exploring",        label: "Just exploring" },
            ]}
          />
        )}

        <Select
          id="cn-a-timeline" label="Timeline" required
          value={values.timeline} onChange={(v) => set("timeline", v)} error={errors.timeline}
          options={[
            { value: "0-30",        label: "Within 30 days" },
            { value: "30-90",       label: "30–90 days" },
            { value: "90+",         label: "90+ days" },
            { value: "exploratory", label: "Just exploring" },
          ]}
        />

        <div className="cn-field" data-error={!!errors.priorities}>
          <label htmlFor="cn-a-priorities">Is there anything specific you want us to look at first? (optional)</label>
          <textarea
            id="cn-a-priorities"
            maxLength={1000}
            rows={3}
            value={values.priorities}
            onChange={(e) => set("priorities", e.target.value)}
            placeholder="A specific workflow, a known pain point, a current system you want to replace — anything helpful."
          />
          {errors.priorities && <span className="cn-field__error">{errors.priorities}</span>}
        </div>
      </Section>

      {/* ===== Honeypot ===== */}
      <div className="cn-field--honeypot" aria-hidden="true">
        <label htmlFor="cn-a-web">Website</label>
        <input id="cn-a-web" type="text" tabIndex={-1} autoComplete="off" value={values.website} onChange={(e) => setValues((v) => ({ ...v, website: e.target.value }))} />
      </div>

      <div className="cn-form__actions">
        <Button type="submit" variant="primary" disabled={submitting}>
          {submitting ? "Sending…" : "Request Workflow Assessment"}
        </Button>
      </div>
      <p className="cn-form__note">Private conversations. No mass outreach.</p>
    </form>
  );
}
