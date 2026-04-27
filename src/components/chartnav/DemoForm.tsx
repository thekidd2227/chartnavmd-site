import { useEffect, useState, type FormEvent } from "react";
import { useLocation } from "wouter";
import { Button } from "./primitives";
import { submitLead, track } from "./submitLead";

type FormState = {
  fullName: string;
  email: string;
  practiceName: string;
  role: string;
  practiceSize: string;
  message: string;
  website: string; // honeypot
};

type Errors = Partial<Record<keyof FormState, string>>;

const EMPTY: FormState = {
  fullName: "",
  email: "",
  practiceName: "",
  role: "",
  practiceSize: "",
  message: "",
  website: "",
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(values: FormState): Errors {
  const e: Errors = {};
  if (values.fullName.trim().length < 2) e.fullName = "Please enter your full name.";
  if (!EMAIL_RE.test(values.email.trim())) e.email = "Please enter a valid work email.";
  if (values.practiceName.trim().length < 2) e.practiceName = "Please enter your practice name.";
  if (!values.role) e.role = "Please select your role.";
  if (!values.practiceSize) e.practiceSize = "Please select your practice size.";
  if (values.message.length > 500) e.message = "Keep it under 500 characters.";
  return e;
}

export function DemoForm({ onSuccess }: { onSuccess: () => void }) {
  const [values, setValues] = useState<FormState>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const [started, setStarted] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [formOpenedAt] = useState<number>(Date.now());
  const [, setLocation] = useLocation();

  useEffect(() => {
    track("demo.form_view");
  }, []);

  function set<K extends keyof FormState>(key: K, value: FormState[K]) {
    if (!started) {
      setStarted(true);
      track("demo.form_start");
    }
    setValues((v) => ({ ...v, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setServerError(null);

    // Honeypot
    if (values.website) return;

    // Minimum time-on-form: 2.5s
    if (Date.now() - formOpenedAt < 2500) return;

    const v = validate(values);
    setErrors(v);
    if (Object.keys(v).length > 0) {
      track("demo.form_error", { field: Object.keys(v)[0] });
      return;
    }

    setSubmitting(true);
    const result = await submitLead({
      form_id: "chartnav-demo",
      fields: {
        full_name: values.fullName.trim(),
        work_email: values.email.trim(),
        practice_name: values.practiceName.trim(),
        role: values.role,
        practice_size: values.practiceSize,
        message: values.message.trim() || null,
      },
    });
    setSubmitting(false);

    if (result.ok) {
      track("demo.form_submit");
      onSuccess();
      setLocation("/chartnav/thank-you");
    } else {
      track("demo.form_error", { field: "server" });
      setServerError(result.error || "Something went wrong. Please try again.");
    }
  }

  return (
    <form noValidate onSubmit={onSubmit} aria-busy={submitting}>
      {serverError && <div className="cn-form__banner" role="alert">{serverError}</div>}

      <div className="cn-field" data-error={!!errors.fullName}>
        <label htmlFor="cn-demo-name">Full name</label>
        <input
          id="cn-demo-name"
          type="text"
          value={values.fullName}
          onChange={(e) => set("fullName", e.target.value)}
          autoComplete="name"
          required
          aria-describedby={errors.fullName ? "cn-demo-name-err" : undefined}
        />
        {errors.fullName && <span id="cn-demo-name-err" className="cn-field__error">{errors.fullName}</span>}
      </div>

      <div className="cn-field" data-error={!!errors.email}>
        <label htmlFor="cn-demo-email">Work email</label>
        <input
          id="cn-demo-email"
          type="email"
          value={values.email}
          onChange={(e) => set("email", e.target.value)}
          autoComplete="email"
          required
          aria-describedby={errors.email ? "cn-demo-email-err" : undefined}
        />
        {errors.email && <span id="cn-demo-email-err" className="cn-field__error">{errors.email}</span>}
      </div>

      <div className="cn-field" data-error={!!errors.practiceName}>
        <label htmlFor="cn-demo-practice">Practice name</label>
        <input
          id="cn-demo-practice"
          type="text"
          value={values.practiceName}
          onChange={(e) => set("practiceName", e.target.value)}
          autoComplete="organization"
          required
        />
        {errors.practiceName && <span className="cn-field__error">{errors.practiceName}</span>}
      </div>

      <div className="cn-field--row">
        <div className="cn-field" data-error={!!errors.role}>
          <label htmlFor="cn-demo-role">Role</label>
          <select
            id="cn-demo-role"
            value={values.role}
            onChange={(e) => set("role", e.target.value)}
            required
          >
            <option value="">Select…</option>
            <option value="physician">Physician</option>
            <option value="administrator">Administrator</option>
            <option value="director">Director</option>
            <option value="other">Other</option>
          </select>
          {errors.role && <span className="cn-field__error">{errors.role}</span>}
        </div>

        <div className="cn-field" data-error={!!errors.practiceSize}>
          <label htmlFor="cn-demo-size">Practice size</label>
          <select
            id="cn-demo-size"
            value={values.practiceSize}
            onChange={(e) => set("practiceSize", e.target.value)}
            required
          >
            <option value="">Select…</option>
            <option value="1">1 provider</option>
            <option value="2-5">2–5 providers</option>
            <option value="6-15">6–15 providers</option>
            <option value="16+">16+ providers</option>
          </select>
          {errors.practiceSize && <span className="cn-field__error">{errors.practiceSize}</span>}
        </div>
      </div>

      <div className="cn-field" data-error={!!errors.message}>
        <label htmlFor="cn-demo-msg">Message (optional)</label>
        <textarea
          id="cn-demo-msg"
          maxLength={500}
          value={values.message}
          onChange={(e) => set("message", e.target.value)}
        />
        {errors.message && <span className="cn-field__error">{errors.message}</span>}
      </div>

      {/* Honeypot */}
      <div className="cn-field--honeypot" aria-hidden="true">
        <label htmlFor="cn-demo-web">Website</label>
        <input
          id="cn-demo-web"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={values.website}
          onChange={(e) => setValues((v) => ({ ...v, website: e.target.value }))}
        />
      </div>

      <div className="cn-form__actions">
        <Button type="submit" variant="primary" disabled={submitting}>
          {submitting ? "Sending…" : "Send"}
        </Button>
      </div>
      <p className="cn-form__note">
        We use this only to schedule your walkthrough. No mass outreach.
      </p>
    </form>
  );
}
