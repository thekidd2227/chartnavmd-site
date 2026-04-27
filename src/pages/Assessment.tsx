// Assessment.tsx
// ARCG Systems — Intake Assessment Form
// Version: 1.2 — Multi-select diagnostic fields
// feat(assessment): add multi-select diagnostic fields for better business issue discovery
//
// MULTI-SELECT FIELDS (stored as string[], serialized as comma-separated on submit):
//   govconBreakdownArea, govconPrimaryNeed
//   agencyBreakdownArea, agencyPrimaryAutomation
//   staffingPrimaryIssue
//   servicePrimaryLossPoint
//   professionalPipelineIssue
//   healthcarePrimaryIssue
//   ecommerceBottleneck
//
// SINGLE-SELECT FIELDS (string — current state, process, size, qualification):
//   govconCurrentManagement, agencyCurrentOnboarding, staffingCurrentConfirmation,
//   staffingIdealState, serviceCurrentLeadHandling, healthcareCurrentSystem,
//   healthcareIdealState, businessType, all Step 3 fields, all Step 4 fields

import React, { useState } from "react";
import { Helmet } from "react-helmet-async";

// ─── TYPES ────────────────────────────────────────────────────────────────────

interface FormState {
  // Step 1
  businessType: string;

  // Step 2A — GovCon
  govconCurrentManagement: string;
  govconBreakdownArea: string[];      // MULTI-SELECT
  govconPrimaryNeed: string[];        // MULTI-SELECT

  // Step 2B — Agency
  agencyBreakdownArea: string[];      // MULTI-SELECT
  agencyCurrentOnboarding: string;
  agencyPrimaryAutomation: string[];  // MULTI-SELECT

  // Step 2C — Staffing
  staffingPrimaryIssue: string[];     // MULTI-SELECT
  staffingCurrentConfirmation: string;
  staffingIdealState: string;

  // Step 2D — Service
  servicePrimaryLossPoint: string[];  // MULTI-SELECT
  serviceCurrentLeadHandling: string;

  // Step 2E — Professional
  professionalPipelineIssue: string[]; // MULTI-SELECT

  // Step 2F — E-commerce
  ecommerceBottleneck: string[];      // MULTI-SELECT

  // Step 2G — Other
  otherBreakdownArea: string;

  // Step 2H — Healthcare
  healthcarePrimaryIssue: string[];   // MULTI-SELECT
  healthcareCurrentSystem: string;
  healthcareIdealState: string;

  // Step 3 — Universal Qualification
  biggestProblem: string;
  currentTools: string;
  systemUsers: string;
  scaleScope: string;
  urgency: string;
  volume: string;
  averageLifetimeValue: string;
  desiredResult: string;

  // Step 4 — Contact
  businessName: string;
  contactName: string;
  workEmail: string;
}

// ─── CONSTANTS ────────────────────────────────────────────────────────────────

const TOTAL_STEPS = 4;

const stepLabels = [
  "Business Type",
  "Your Operation",
  "Scope & Qualification",
  "Contact Info",
];

// Which fields are required per branch for Step 2 validation
// Arrays must have length > 0; strings must be non-empty
const step2Required: Record<string, string[]> = {
  "Government Contractor / GovCon": [
    "govconCurrentManagement",
    "govconBreakdownArea",
    "govconPrimaryNeed",
  ],
  "AI / Automation Agency": [
    "agencyBreakdownArea",
    "agencyCurrentOnboarding",
    "agencyPrimaryAutomation",
  ],
  "Staffing / Workforce": [
    "staffingPrimaryIssue",
    "staffingCurrentConfirmation",
    "staffingIdealState",
  ],
  "Service Business (HVAC, Cleaning, Field Services, etc.)": [
    "servicePrimaryLossPoint",
    "serviceCurrentLeadHandling",
  ],
  "Professional Services (Legal, Medical, Consulting)": [
    "professionalPipelineIssue",
  ],
  "E-commerce / Online Business": ["ecommerceBottleneck"],
  Other: ["otherBreakdownArea"],
  "Healthcare / Medical Billing": [
    "healthcarePrimaryIssue",
    "healthcareCurrentSystem",
    "healthcareIdealState",
  ],
};

// Fields that are multi-select (string[]) — used for clearing and validation
const MULTISELECT_FIELDS = new Set([
  "govconBreakdownArea",
  "govconPrimaryNeed",
  "agencyBreakdownArea",
  "agencyPrimaryAutomation",
  "staffingPrimaryIssue",
  "servicePrimaryLossPoint",
  "professionalPipelineIssue",
  "healthcarePrimaryIssue",
  "ecommerceBottleneck",
]);

// All branch-specific fields that must clear on businessType change
const ALL_BRANCH_FIELDS: Array<keyof FormState> = [
  "govconCurrentManagement",
  "govconBreakdownArea",
  "govconPrimaryNeed",
  "agencyBreakdownArea",
  "agencyCurrentOnboarding",
  "agencyPrimaryAutomation",
  "staffingPrimaryIssue",
  "staffingCurrentConfirmation",
  "staffingIdealState",
  "servicePrimaryLossPoint",
  "serviceCurrentLeadHandling",
  "professionalPipelineIssue",
  "ecommerceBottleneck",
  "otherBreakdownArea",
  "healthcarePrimaryIssue",
  "healthcareCurrentSystem",
  "healthcareIdealState",
];

// ─── INITIAL STATE ─────────────────────────────────────────────────────────────

const initialState: FormState = {
  businessType: "",
  govconCurrentManagement: "",
  govconBreakdownArea: [],
  govconPrimaryNeed: [],
  agencyBreakdownArea: [],
  agencyCurrentOnboarding: "",
  agencyPrimaryAutomation: [],
  staffingPrimaryIssue: [],
  staffingCurrentConfirmation: "",
  staffingIdealState: "",
  servicePrimaryLossPoint: [],
  serviceCurrentLeadHandling: "",
  professionalPipelineIssue: [],
  ecommerceBottleneck: [],
  otherBreakdownArea: "",
  healthcarePrimaryIssue: [],
  healthcareCurrentSystem: "",
  healthcareIdealState: "",
  biggestProblem: "",
  currentTools: "",
  systemUsers: "",
  scaleScope: "",
  urgency: "",
  volume: "",
  averageLifetimeValue: "",
  desiredResult: "",
  businessName: "",
  contactName: "",
  workEmail: "",
};

// ─── HELPER: serialize form state for submission ───────────────────────────────

function serializeForm(form: FormState): Record<string, string> {
  const result: Record<string, string> = {};
  for (const [key, value] of Object.entries(form)) {
    if (Array.isArray(value)) {
      // Multi-select: comma-separated string
      result[key] = value.join(", ");
    } else {
      result[key] = value as string;
    }
  }
  return result;
}

// ─── HELPER: validate a field value ───────────────────────────────────────────

function isFieldValid(key: string, form: FormState): boolean {
  const value = form[key as keyof FormState];
  if (Array.isArray(value)) {
    return value.length > 0;
  }
  return (value as string).trim() !== "";
}

// ─── COMPONENT: MultiSelectCards ──────────────────────────────────────────────
// Checkbox-style pill cards. Mobile-friendly, ARCG brand design.

interface MultiSelectCardsProps {
  field: keyof FormState;
  options: string[];
  form: FormState;
  onChange: (field: keyof FormState, value: string[]) => void;
  error?: string;
  label: string;
  hint?: string;
}

function MultiSelectCards({
  field,
  options,
  form,
  onChange,
  error,
  label,
  hint,
}: MultiSelectCardsProps) {
  const selected = form[field] as string[];

  function toggle(option: string) {
    if (selected.includes(option)) {
      onChange(field, selected.filter((v) => v !== option));
    } else {
      onChange(field, [...selected, option]);
    }
  }

  return (
    <div className="form-field">
      <label className="field-label">
        {label}
        {hint && <span className="field-hint"> — {hint}</span>}
      </label>
      <p className="field-subtext">Select all that apply</p>
      <div className="multi-select-grid">
        {options.map((option) => {
          const isSelected = selected.includes(option);
          return (
            <button
              key={option}
              type="button"
              className={`multi-select-card ${isSelected ? "selected" : ""}`}
              onClick={() => toggle(option)}
              aria-pressed={isSelected}
            >
              <span className="multi-select-check">
                {isSelected ? (
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path
                      d="M2 6l3 3 5-5"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : null}
              </span>
              <span className="multi-select-label">{option}</span>
            </button>
          );
        })}
      </div>
      {error && <p className="field-error">{error}</p>}
      {selected.length > 0 && (
        <p className="field-selection-count">
          {selected.length} selected
        </p>
      )}
    </div>
  );
}

// ─── COMPONENT: SingleSelectDropdown ──────────────────────────────────────────

interface SingleSelectProps {
  field: keyof FormState;
  options: string[];
  form: FormState;
  onChange: (field: keyof FormState, value: string) => void;
  error?: string;
  label: string;
  placeholder?: string;
  hint?: string;
}

function SingleSelectDropdown({
  field,
  options,
  form,
  onChange,
  error,
  label,
  placeholder = "Select an option",
  hint,
}: SingleSelectProps) {
  const value = form[field] as string;
  return (
    <div className="form-field">
      <label className="field-label">
        {label}
        {hint && <span className="field-hint"> — {hint}</span>}
      </label>
      <select
        className={`field-select ${error ? "has-error" : ""}`}
        value={value}
        onChange={(e) => onChange(field, e.target.value)}
      >
        <option value="">{placeholder}</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
      {error && <p className="field-error">{error}</p>}
    </div>
  );
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────

export default function Assessment() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitState, setSubmitState] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [submitError, setSubmitError] = useState("");

  // ── Field setters ─────────────────────────────────────────────────────────

  function setField(field: keyof FormState, value: string | string[]) {
    setForm((prev) => {
      const next = { ...prev, [field]: value };

      // Branch variable clearing: when businessType changes,
      // reset all branch-specific fields to their empty initial values
      if (field === "businessType") {
        for (const f of ALL_BRANCH_FIELDS) {
          (next[f] as string | string[]) = MULTISELECT_FIELDS.has(f)
            ? []
            : "";
        }
      }

      return next;
    });

    // Clear error on change
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  }

  // ── Validation ────────────────────────────────────────────────────────────

  function validateStep(s: number): boolean {
    const newErrors: Record<string, string> = {};

    if (s === 1) {
      if (!form.businessType) {
        newErrors.businessType = "This field is required";
      }
    }

    if (s === 2) {
      const required = step2Required[form.businessType] ?? [];
      for (const key of required) {
        if (!isFieldValid(key, form)) {
          newErrors[key] = MULTISELECT_FIELDS.has(key)
            ? "Select at least one option"
            : "This field is required";
        }
      }
    }

    if (s === 3) {
      const step3Fields = [
        "biggestProblem",
        "currentTools",
        "systemUsers",
        "scaleScope",
        "urgency",
        "volume",
        "averageLifetimeValue",
        "desiredResult",
      ];
      for (const key of step3Fields) {
        if (!isFieldValid(key, form)) {
          newErrors[key] = "This field is required";
        }
      }
    }

    if (s === 4) {
      if (!form.businessName.trim()) newErrors.businessName = "This field is required";
      if (!form.contactName.trim()) newErrors.contactName = "This field is required";
      if (!form.workEmail.trim()) {
        newErrors.workEmail = "This field is required";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.workEmail)) {
        newErrors.workEmail = "Enter a valid email address";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  // ── Navigation ────────────────────────────────────────────────────────────

  function handleNext() {
    if (validateStep(step)) {
      setStep((s) => s + 1);
    }
  }

  function handleBack() {
    setErrors({});
    setStep((s) => s - 1);
  }

  // ── Submission ────────────────────────────────────────────────────────────

  async function submit() {
    if (!validateStep(4)) return;

    setSubmitState("submitting");

    // Serialize multi-select arrays as comma-separated strings
    const serialized = serializeForm(form);

    const urgencyTag =
      form.urgency === "Immediately"
        ? "🔴"
        : form.urgency === "Within 30 days"
        ? "🟡"
        : "⚪";

    // Route 1: Web3Forms (email notification)
    const web3Payload = {
      ...serialized,
      access_key: "4feb412f-17c5-4b04-8036-66f66f5ce5e3",
      subject: `${urgencyTag} New ARCG Assessment — ${form.businessName} | ${form.businessType}`,
      from_name: "ARCG Systems Assessment",
      replyto: form.workEmail,
      botcheck: "",
    };

    // Route 2: Make.com webhook → Airtable (structured CRM routing)
    const airtablePayload = {
      business_name: form.businessName || "",
      businessType: form.businessType || "",
      email: form.workEmail || "",
      phone: "",
      contact_name: form.contactName || "",
      biggestProblem: form.biggestProblem || "",

      urgency: form.urgency || "",
      source: "Website Assessment",
      subject_line: `${urgencyTag} Assessment — ${form.businessName} | ${form.businessType}`,
      disqualified: "No",
      currentTools: Array.isArray(form.currentTools) ? form.currentTools.join(", ") : (form.currentTools || ""),
      desiredResult: form.desiredResult || "",
      volume: form.volume || "",
      scaleScope: form.scaleScope || "",
      systemUsers: form.systemUsers || "",
      averageLifetimeValue: form.averageLifetimeValue || "",
      timestamp: new Date().toISOString(),
    };

    try {
      // PROD-06 AI diagnosis payload — full branch data
      const diagnosisPayload = {
        business_name: form.businessName || "",
        email: form.workEmail || "",
        phone: "",
        businessType: form.businessType || "",
        biggestProblem: form.biggestProblem || "",
        urgency: form.urgency || "",
        currentTools: form.currentTools || "",
        systemUsers: form.systemUsers || "",
        desiredResult: form.desiredResult || "",
        govconCurrentManagement: form.govconCurrentManagement || "",
        govconBreakdownArea: Array.isArray(form.govconBreakdownArea) ? form.govconBreakdownArea.join(", ") : (form.govconBreakdownArea || ""),
        govconPrimaryNeed: Array.isArray(form.govconPrimaryNeed) ? form.govconPrimaryNeed.join(", ") : (form.govconPrimaryNeed || ""),
        staffingPrimaryIssue: Array.isArray(form.staffingPrimaryIssue) ? form.staffingPrimaryIssue.join(", ") : (form.staffingPrimaryIssue || ""),
        staffingCurrentConfirmation: form.staffingCurrentConfirmation || "",
        staffingIdealState: form.staffingIdealState || "",
        healthcarePrimaryIssue: Array.isArray(form.healthcarePrimaryIssue) ? form.healthcarePrimaryIssue.join(", ") : (form.healthcarePrimaryIssue || ""),
        healthcareCurrentSystem: form.healthcareCurrentSystem || "",
        healthcareIdealState: form.healthcareIdealState || "",
        servicePrimaryLossPoint: Array.isArray(form.servicePrimaryLossPoint) ? form.servicePrimaryLossPoint.join(", ") : (form.servicePrimaryLossPoint || ""),
        serviceCurrentLeadHandling: form.serviceCurrentLeadHandling || "",
        agencyBreakdownArea: Array.isArray(form.agencyBreakdownArea) ? form.agencyBreakdownArea.join(", ") : (form.agencyBreakdownArea || ""),
        agencyCurrentOnboarding: form.agencyCurrentOnboarding || "",
        agencyPrimaryAutomation: Array.isArray(form.agencyPrimaryAutomation) ? form.agencyPrimaryAutomation.join(", ") : (form.agencyPrimaryAutomation || ""),
        professionalPipelineIssue: Array.isArray(form.professionalPipelineIssue) ? form.professionalPipelineIssue.join(", ") : (form.professionalPipelineIssue || ""),
        ecommerceBottleneck: Array.isArray(form.ecommerceBottleneck) ? form.ecommerceBottleneck.join(", ") : (form.ecommerceBottleneck || ""),
        submitted_at: new Date().toISOString(),
        source: "Website Assessment",
        subject_line: `${urgencyTag} Assessment — ${form.businessName} | ${form.businessType}`,
        disqualified: "No",
      };

      // Fire all three routes in parallel — Web3Forms, PROD-01 (Airtable), PROD-06 (AI Diagnosis)
      const [web3Res, makeRes] = await Promise.allSettled([
        fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(web3Payload),
        }),
        fetch("https://hook.us2.make.com/1f5o32721bofnolh872munptdhsfucx9", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(airtablePayload),
        }),
      ]);

      // PROD-06 fires non-blocking — AI diagnosis doesn't affect form success
      fetch("https://hook.us2.make.com/8dw1vgnzn5stl67274pphirtk13ulpa9", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(diagnosisPayload),
      }).catch(() => {}); // silent fail — never blocks submission

      // Consider success if either main route works
      const web3Ok = web3Res.status === "fulfilled" && web3Res.value.ok;
      const makeOk = makeRes.status === "fulfilled";

      if (web3Ok || makeOk) {
        setSubmitState("success");
      } else {
        setSubmitState("error");
        setSubmitError("Submission failed. Please try again.");
      }
    } catch {
      setSubmitState("error");
      setSubmitError("Network error. Please check your connection and try again.");
    }
  }

  // ── Success Screen ────────────────────────────────────────────────────────

  if (submitState === "success") {
    return (
      <div className="assessment-success">
        <div className="success-icon">
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
            <circle cx="20" cy="20" r="19" stroke="#C9941A" strokeWidth="2" />
            <path
              d="M12 20l6 6 10-10"
              stroke="#C9941A"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <h2>Intake Received</h2>
        <p>Your workflow plan will arrive within 24 hours. No commitment required.</p>
      </div>
    );
  }

  // ── Step 1 — Business Type ─────────────────────────────────────────────────

  const businessTypes = [
    "Government Contractor / GovCon",
    "AI / Automation Agency",
    "Staffing / Workforce",
    "Service Business (HVAC, Cleaning, Field Services, etc.)",
    "Professional Services (Legal, Medical, Consulting)",
    "E-commerce / Online Business",
    "Other",
    "Healthcare / Medical Billing",
  ];

  // ── Step 2 — Branch Renderers ──────────────────────────────────────────────

  function renderStep2() {
    const bt = form.businessType;

    if (bt === "Government Contractor / GovCon") {
      return (
        <>
          <SingleSelectDropdown
            field="govconCurrentManagement"
            label="How are you currently managing subcontractors or vendors?"
            options={["Email / phone", "Spreadsheets", "Mixed tools", "Structured system"]}
            form={form}
            onChange={setField}
            error={errors.govconCurrentManagement}
          />
          <MultiSelectCards
            field="govconBreakdownArea"
            label="Where are breakdowns happening most?"
            hint="Select all that apply"
            options={["Missed deliverables", "Lack of visibility", "Communication delays", "Compliance / reporting issues"]}
            form={form}
            onChange={setField}
            error={errors.govconBreakdownArea}
          />
          <MultiSelectCards
            field="govconPrimaryNeed"
            label="What do you need most?"
            hint="Select all that apply"
            options={["Centralized subcontractor tracking", "Automated reporting", "Performance monitoring", "Compliance tracking"]}
            form={form}
            onChange={setField}
            error={errors.govconPrimaryNeed}
          />
        </>
      );
    }

    if (bt === "AI / Automation Agency") {
      return (
        <>
          <MultiSelectCards
            field="agencyBreakdownArea"
            label="Where does your workflow break down most?"
            hint="Select all that apply"
            options={["Client onboarding", "Project execution", "Internal coordination", "Delivery timelines"]}
            form={form}
            onChange={setField}
            error={errors.agencyBreakdownArea}
          />
          <SingleSelectDropdown
            field="agencyCurrentOnboarding"
            label="What happens today when a new client closes?"
            options={["Manual setup every time", "Some templates, still manual", "Fully structured process"]}
            form={form}
            onChange={setField}
            error={errors.agencyCurrentOnboarding}
          />
          <MultiSelectCards
            field="agencyPrimaryAutomation"
            label="What do you want automated first?"
            hint="Select all that apply"
            options={["Client onboarding → project setup", "Task generation + assignment", "Internal workflow automation"]}
            form={form}
            onChange={setField}
            error={errors.agencyPrimaryAutomation}
          />
        </>
      );
    }

    if (bt === "Staffing / Workforce") {
      return (
        <>
          <MultiSelectCards
            field="staffingPrimaryIssue"
            label="What is your biggest operational issue?"
            hint="Select all that apply"
            options={["Shift confirmation", "No-shows", "Last-minute coverage gaps", "Communication with workers"]}
            form={form}
            onChange={setField}
            error={errors.staffingPrimaryIssue}
          />
          <SingleSelectDropdown
            field="staffingCurrentConfirmation"
            label="How do workers currently confirm shifts?"
            options={["Text", "Phone", "Email", "No system"]}
            form={form}
            onChange={setField}
            error={errors.staffingCurrentConfirmation}
          />
          <SingleSelectDropdown
            field="staffingIdealState"
            label="What would ideal look like?"
            options={["Auto scheduling + confirmation", "Auto replacement if no response", "Real-time workforce visibility"]}
            form={form}
            onChange={setField}
            error={errors.staffingIdealState}
          />
        </>
      );
    }

    if (bt === "Service Business (HVAC, Cleaning, Field Services, etc.)") {
      return (
        <>
          <MultiSelectCards
            field="servicePrimaryLossPoint"
            label="Where are you losing jobs or time?"
            hint="Select all that apply"
            options={["Slow response time", "Scheduling issues", "Poor lead tracking", "Follow-ups falling through"]}
            form={form}
            onChange={setField}
            error={errors.servicePrimaryLossPoint}
          />
          <SingleSelectDropdown
            field="serviceCurrentLeadHandling"
            label="How are leads or work requests handled today?"
            options={["Phone only", "Email", "Manual tracking", "CRM (limited use)"]}
            form={form}
            onChange={setField}
            error={errors.serviceCurrentLeadHandling}
          />
        </>
      );
    }

    if (bt === "Professional Services (Legal, Medical, Consulting)") {
      return (
        <MultiSelectCards
          field="professionalPipelineIssue"
          label="What is breaking your client pipeline?"
          hint="Select all that apply"
          options={["Slow response to leads", "No follow-up system", "Poor intake process"]}
          form={form}
          onChange={setField}
          error={errors.professionalPipelineIssue}
        />
      );
    }

    if (bt === "E-commerce / Online Business") {
      return (
        <MultiSelectCards
          field="ecommerceBottleneck"
          label="Where is the bottleneck?"
          hint="Select all that apply"
          options={["Customer support", "Order processing", "Returns / refunds"]}
          form={form}
          onChange={setField}
          error={errors.ecommerceBottleneck}
        />
      );
    }

    if (bt === "Other") {
      return (
        <div className="form-field">
          <label className="field-label">
            What part of your operation breaks down most often?
          </label>
          <textarea
            className={`field-textarea ${errors.otherBreakdownArea ? "has-error" : ""}`}
            placeholder="Describe where execution slows down or fails..."
            value={form.otherBreakdownArea}
            onChange={(e) => setField("otherBreakdownArea", e.target.value)}
            rows={4}
          />
          {errors.otherBreakdownArea && (
            <p className="field-error">{errors.otherBreakdownArea}</p>
          )}
        </div>
      );
    }

    if (bt === "Healthcare / Medical Billing") {
      return (
        <>
          <MultiSelectCards
            field="healthcarePrimaryIssue"
            label="What are your primary billing challenges?"
            hint="Select all that apply"
            options={["Claim denials", "Slow collections / A/R days", "Coding errors", "Eligibility verification failures", "Underpayments"]}
            form={form}
            onChange={setField}
            error={errors.healthcarePrimaryIssue}
          />
          <SingleSelectDropdown
            field="healthcareCurrentSystem"
            label="What system are you currently using?"
            options={["Manual / spreadsheets", "Legacy EHR/PM", "Modern EHR/PM (limited automation)", "No system"]}
            form={form}
            onChange={setField}
            error={errors.healthcareCurrentSystem}
          />
          <SingleSelectDropdown
            field="healthcareIdealState"
            label="What would your ideal billing operation look like?"
            options={["Automated claim submission", "Real-time denial alerts", "Full revenue cycle visibility", "Reduced A/R days"]}
            form={form}
            onChange={setField}
            error={errors.healthcareIdealState}
          />
        </>
      );
    }

    return null;
  }

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <div className="assessment-wrap">
      <Helmet>
        <title>Operational Waste Intake | ARCG Systems Diagnostic</title>
        <meta name="description" content="Start your Operational Waste Diagnostic. Share operating detail before a triage call and ARCG will map where your business is losing time, money, visibility, and accountability. Diagnosis-first. Blueprint before build." />
        <meta name="robots" content="noindex,follow" />
        <link rel="canonical" href="https://arcgsystems.com/assessment" />
        <meta property="og:title" content="Start Your Operational Waste Diagnostic | ARCG Systems" />
        <meta property="og:url" content="https://arcgsystems.com/assessment" />
      </Helmet>
      {/* ARCG hero header */}
      <div className="assessment-hero">
        <a href="/" className="ah-back">← Back to arcgsystems.com</a>
        <div className="ah-badge">Operational Waste Intake</div>
        <h1>Start Your Operational Waste Diagnostic</h1>
        <p>
          This intake feeds directly into your Operational Waste Diagnostic. We use your operating detail to map workflows, identify where time and money are leaking, and build a prioritized blueprint before any implementation begins. Clarity first. Software second.
        </p>
      </div>

      {/* Progress bar */}
      <div className="progress-bar">
        {Array.from({ length: TOTAL_STEPS }, (_, i) => (
          <div
            key={i}
            className={`progress-segment ${i < step ? "filled" : ""}`}
          />
        ))}
      </div>

      <div className="step-label">
        Step {step} of {TOTAL_STEPS} — {stepLabels[step - 1]}
      </div>

      <form onSubmit={(e) => e.preventDefault()} className="assessment-form">

        {/* ── STEP 1 ── */}
        {step === 1 && (
          <div className="step-content">
            <h2>What best describes your business?</h2>
            <div className="business-type-grid">
              {businessTypes.map((bt) => (
                <button
                  key={bt}
                  type="button"
                  className={`business-type-card ${form.businessType === bt ? "selected" : ""}`}
                  onClick={() => setField("businessType", bt)}
                >
                  {bt}
                </button>
              ))}
            </div>
            {errors.businessType && (
              <p className="field-error">{errors.businessType}</p>
            )}
          </div>
        )}

        {/* ── STEP 2 ── */}
        {step === 2 && (
          <div className="step-content">
            <h2>Tell us about your operation</h2>
            {renderStep2()}
          </div>
        )}

        {/* ── STEP 3 ── */}
        {step === 3 && (
          <div className="step-content">
            <h2>Scope & Qualification</h2>

            <div className="form-field">
              <label className="field-label">
                What is the biggest operational problem slowing your business right now?
              </label>
              <textarea
                className={`field-textarea ${errors.biggestProblem ? "has-error" : ""}`}
                placeholder="Be specific — this drives the recommendation..."
                value={form.biggestProblem}
                onChange={(e) => setField("biggestProblem", e.target.value)}
                rows={4}
              />
              {errors.biggestProblem && (
                <p className="field-error">{errors.biggestProblem}</p>
              )}
            </div>

            <SingleSelectDropdown field="currentTools" label="What tools do you currently use?" placeholder="Select primary tool"
              options={["CRM", "Spreadsheets", "Email", "QuickBooks", "Phone", "None", "Other"]}
              form={form} onChange={setField} error={errors.currentTools} />

            <SingleSelectDropdown field="systemUsers" label="How many people would use this system?"
              hint="Include anyone inputting data or viewing dashboards"
              options={["Just me", "2–5 people", "6–15 people", "16+ people"]}
              form={form} onChange={setField} error={errors.systemUsers} />

            <SingleSelectDropdown field="scaleScope" label="How many locations, vendors, or teams?"
              hint="Locations, field crews, vendors, accounts, properties"
              options={["1–3", "4–10", "11–25", "25+"]}
              form={form} onChange={setField} error={errors.scaleScope} />

            <SingleSelectDropdown field="urgency" label="How quickly do you need this solved?"
              hint="'Immediately' = active pain affecting revenue"
              options={["Immediately", "Within 30 days", "1–3 months", "Just exploring"]}
              form={form} onChange={setField} error={errors.urgency} />



            <SingleSelectDropdown field="volume" label="How many requests, jobs, or workflows monthly?"
              hint="Service calls, orders, leads, contracts, shifts"
              options={["Under 20", "20–100", "100–300", "300+"]}
              form={form} onChange={setField} error={errors.volume} />

            <SingleSelectDropdown field="averageLifetimeValue" label="What is the average LTV of a customer or contract?"
              hint="Total revenue from one client over full duration"
              options={["Under $1K", "$1K–$10K", "$10K–$50K", "$50K+"]}
              form={form} onChange={setField} error={errors.averageLifetimeValue} />

            <SingleSelectDropdown field="desiredResult" label="What result matters most right now?"
              options={["Reduce manual work", "Increase revenue", "Improve execution / control", "Scale operations"]}
              form={form} onChange={setField} error={errors.desiredResult} />
          </div>
        )}

        {/* ── STEP 4 ── */}
        {step === 4 && (
          <div className="step-content">
            <h2>Contact Information</h2>

            <div className="form-field">
              <label className="field-label">Business Name</label>
              <input
                type="text"
                className={`field-input ${errors.businessName ? "has-error" : ""}`}
                placeholder="Your company name"
                value={form.businessName}
                onChange={(e) => setField("businessName", e.target.value)}
              />
              {errors.businessName && <p className="field-error">{errors.businessName}</p>}
            </div>

            <div className="form-field">
              <label className="field-label">Your Name</label>
              <input
                type="text"
                className={`field-input ${errors.contactName ? "has-error" : ""}`}
                placeholder="First and last name"
                value={form.contactName}
                onChange={(e) => setField("contactName", e.target.value)}
              />
              {errors.contactName && <p className="field-error">{errors.contactName}</p>}
            </div>

            <div className="form-field">
              <label className="field-label">Work Email</label>
              <input
                type="email"
                className={`field-input ${errors.workEmail ? "has-error" : ""}`}
                placeholder="you@company.com"
                value={form.workEmail}
                onChange={(e) => setField("workEmail", e.target.value)}
              />
              {errors.workEmail && <p className="field-error">{errors.workEmail}</p>}
            </div>

            {submitState === "error" && (
              <div className="submit-error">{submitError}</div>
            )}

            <p className="submit-support">
              Your plan arrives within 24 hours. No commitment required.
            </p>
          </div>
        )}

        {/* ── Navigation ── */}
        <div className="form-nav">
          {step > 1 && (
            <button type="button" className="btn-back" onClick={handleBack}>
              Back
            </button>
          )}
          {step < TOTAL_STEPS ? (
            <button type="button" className="btn-next" onClick={handleNext}>
              Next
            </button>
          ) : (
            <button
              type="button"
              className="btn-submit"
              onClick={submit}
              disabled={submitState === "submitting"}
            >
              {submitState === "submitting" ? "Submitting..." : "Get My Workflow Plan"}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

// ─── CSS — append to your global stylesheet or Assessment.css ─────────────────
// Add these styles to your Assessment.css / global styles:
//
// .multi-select-grid {
//   display: flex;
//   flex-wrap: wrap;
//   gap: 8px;
//   margin-top: 8px;
// }
//
// .multi-select-card {
//   display: flex;
//   align-items: center;
//   gap: 8px;
//   padding: 10px 16px;
//   background: #121621;
//   border: 1px solid #272f3d;
//   border-radius: 6px;
//   cursor: pointer;
//   font-size: 13px;
//   color: #98A3B3;
//   transition: all 0.15s;
//   text-align: left;
// }
//
// .multi-select-card:hover {
//   border-color: rgba(201, 148, 26, 0.4);
//   color: #E8ECF2;
// }
//
// .multi-select-card.selected {
//   border-color: #C9941A;
//   background: rgba(201, 148, 26, 0.12);
//   color: #E8ECF2;
// }
//
// .multi-select-check {
//   width: 16px;
//   height: 16px;
//   border: 1px solid #272f3d;
//   border-radius: 3px;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   flex-shrink: 0;
//   background: transparent;
//   color: #C9941A;
// }
//
// .multi-select-card.selected .multi-select-check {
//   background: #C9941A;
//   border-color: #C9941A;
//   color: #0A0C12;
// }
//
// .field-selection-count {
//   font-size: 11px;
//   color: #C9941A;
//   margin-top: 6px;
//   font-family: 'DM Mono', monospace;
//   letter-spacing: 0.5px;
// }
//
// .field-subtext {
//   font-size: 11.5px;
//   color: #5a6478;
//   margin-bottom: 8px;
//   font-style: italic;
// }
//
// .dq-banner {
//   padding: 12px 16px;
//   background: rgba(201, 148, 26, 0.08);
//   border: 1px solid rgba(201, 148, 26, 0.25);
//   border-radius: 4px;
//   font-size: 13px;
//   color: #C9941A;
//   margin: 8px 0 16px;
// }

