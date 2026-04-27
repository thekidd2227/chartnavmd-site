import { ChartnavShell } from "@/components/chartnav/ChartnavShell";
import { Eyebrow, Button, BrandText, IconGold } from "@/components/chartnav/primitives";
import { useForms } from "@/components/chartnav/FormsContext";

/** Splits a string on the literal "ChartNav" and wraps each occurrence with
 *  the two-tone <BrandText /> treatment so placeholder H1/body text carries
 *  the same brand styling as the rest of the site. */
function withBrand(text: string) {
  return text.split(/(ChartNav)/).map((part, i) =>
    part === "ChartNav" ? <BrandText key={i} /> : part
  );
}

type Props = {
  eyebrow: string;
  title: string;
  body: string;
  canonical: string;
  metaTitle: string;
  metaDescription: string;
};

export function ChartnavPlaceholder({
  eyebrow,
  title,
  body,
  canonical,
  metaTitle,
  metaDescription,
}: Props) {
  return (
    <ChartnavShell
      title={metaTitle}
      description={metaDescription}
      canonical={canonical}
      noIndex
    >
      <Inner eyebrow={eyebrow} title={title} body={body} />
    </ChartnavShell>
  );
}

function Inner({ eyebrow, title, body }: { eyebrow: string; title: string; body: string }) {
  const { openAssessment } = useForms();
  return (
    <section className="cn-placeholder">
      <div className="cn-container">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1 style={{ marginTop: 12 }}>{withBrand(title)}</h1>
        <p>{withBrand(body)}</p>
        <div
          style={{
            display: "flex",
            gap: 12,
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <Button variant="primary" onClick={openAssessment}>
            Request a Workflow Assessment <IconGold name="arrow-right" size={16} />
          </Button>
        </div>
      </div>
    </section>
  );
}

// ---- Concrete placeholder pages (each is a thin export) ----

export function PlatformPage() {
  return (
    <ChartnavPlaceholder
      eyebrow="PLATFORM"
      title="The ChartNav platform — detail coming soon."
      body="We're preparing a deeper walkthrough of charting, imaging workflow, intake, scheduling, front-office coordination, billing visibility, reporting, and role-based views. In the meantime, the homepage covers the full scope — or request a walkthrough."
      canonical="/chartnav/platform"
      metaTitle="Platform — ChartNav"
      metaDescription="The ChartNav platform: charting, imaging, intake, scheduling, front-office coordination, billing visibility, and reporting — built for ophthalmology."
    />
  );
}

export function OphthalmologyPage() {
  return (
    <ChartnavPlaceholder
      eyebrow="OPHTHALMOLOGY"
      title="Built for ophthalmology. Detail page coming soon."
      body="ChartNav is built for multi-provider groups, retina, glaucoma, and cataract practices, multilingual populations, and administrators who need one view of how the clinic runs. Talk to us and we'll speak to your specific setup."
      canonical="/chartnav/ophthalmology"
      metaTitle="Ophthalmology — ChartNav"
      metaDescription="ChartNav for multi-provider ophthalmology groups, retina, glaucoma, and cataract practices, and multilingual patient populations."
    />
  );
}

export function SecurityPage() {
  return (
    <ChartnavPlaceholder
      eyebrow="SECURITY POSTURE"
      title="Honest about what ships today."
      body="ChartNav today runs a four-role RBAC model (admin, clinician, reviewer, front desk) with a configurable security-admin allowlist, per-organization data scoping on every write, an append-oriented security audit trail with configurable retention, and bearer-JWT auth against a customer-managed identity provider (JWKS-verified). Enterprise control plane shipped in wave 2 adds org-configurable MFA-required-claim enforcement, idle and absolute session timeouts with admin-initiated revocation, and outbound audit-sink forwarding (JSONL file or HTTPS webhook). SBOM plus image-digest tracking ships with every release. Enterprise SSO (SAML / OIDC), SCIM provisioning, and a published HIPAA technical-safeguards mapping remain on the roadmap — not claimed here as shipped. Specifics that apply to a deployed environment are set in the customer agreement after the workflow assessment."
      canonical="/chartnav/security"
      metaTitle="Security — ChartNav"
      metaDescription="ChartNav security posture: 4-role RBAC with security-admin allowlist, per-org scoping, audit trail with JSONL or HTTPS webhook forwarding, MFA-required-claim enforcement, session idle/absolute timeouts, bearer-JWT auth, SBOM per release. Enterprise SSO and SCIM remain on the roadmap."
    />
  );
}

export function ImplementationPage() {
  return (
    <ChartnavPlaceholder
      eyebrow="IMPLEMENTATION"
      title="A structured rollout, not a sign-up link."
      body="Every ChartNav engagement starts with an assessment and a written plan before any configuration begins. A detailed implementation page is in the works — for now, the homepage covers the four-step approach."
      canonical="/chartnav/implementation"
      metaTitle="Implementation — ChartNav"
      metaDescription="ChartNav is delivered through a structured assessment and staged rollout built around the realities of an ophthalmology practice."
    />
  );
}

export function InsightsPage() {
  return (
    <ChartnavPlaceholder
      eyebrow="INSIGHTS"
      title="Not yet publishing."
      body="ChartNav's insights section opens once there are pilot results worth publishing. In the meantime, the shortest path to a concrete conversation is the workflow assessment."
      canonical="/chartnav/insights"
      metaTitle="Insights — ChartNav"
      metaDescription="ChartNav insights open once there are pilot results worth publishing."
    />
  );
}
