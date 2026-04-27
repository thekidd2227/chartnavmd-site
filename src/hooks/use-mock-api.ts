import { useMutation } from "@tanstack/react-query";
import { z } from "zod";

const WEB3FORMS_KEY = "4feb412f-17c5-4b04-8036-66f66f5ce5e3";
const WEB3FORMS_URL = "https://api.web3forms.com/submit";

// Shared schemas
export const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  company: z.string().optional(),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  service: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export const assessmentSchema = z.object({
  // Step 1 — Business Profile (all clients)
  businessName: z.string().min(2, "Business name is required"),
  industry: z.string().min(2, "Industry is required"),
  website: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  email: z.string().email("Invalid email address"),

  // ── COMMERCIAL path fields (Steps 2–4) ──
  leadSource: z.string().optional(),
  weeklyInquiries: z.string().optional(),
  responseTime: z.string().optional(),
  afterHours: z.string().optional(),
  crm: z.string().optional(),
  automationGoals: z.string().optional(),
  painPoint: z.string().optional(),
  customerValue: z.string().optional(),
  desiredOutcome: z.string().optional(),

  // ── GOVCON path fields (Steps 2–4) ──
  samStatus: z.string().optional(),
  contractVehicle: z.string().optional(),
  certifications: z.string().optional(),
  bidHistory: z.string().optional(),
  complianceGap: z.string().optional(),
  subcontractRole: z.string().optional(),
  contractValue: z.string().optional(),
  govconGoal: z.string().optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;
export type AssessmentInput = z.infer<typeof assessmentSchema>;

// Determine if the industry selection is GovCon
export function isGovConIndustry(industry: string): boolean {
  const govconKeywords = [
    "government",
    "govcon",
    "federal",
    "defense",
    "dod",
    "military",
    "contracting",
    "contractor",
  ];
  return govconKeywords.some((kw) => industry.toLowerCase().includes(kw));
}

export function useSubmitContact() {
  return useMutation({
    mutationFn: async (data: ContactInput) => {
      const payload = {
        access_key: WEB3FORMS_KEY,
        subject: `New Contact — ${data.name} | ${data.company ?? "No Company"}`,
        from_name: "ARCG Systems Website",
        replyto: data.email,
        name: data.name,
        company: data.company ?? "",
        email: data.email,
        phone: data.phone ?? "",
        service: data.service ?? "",
        message: data.message,
      };

      const res = await fetch(WEB3FORMS_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });

      const json = await res.json();
      if (!json.success) throw new Error(json.message ?? "Submission failed");
      // Make.com webhook — fires silently
      fetch("https://hook.us2.make.com/6n9l20c9f7z299fqptegwwt5babph69s", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          company: data.company ?? "",
          phone: data.phone ?? "",
          service: data.service ?? "",
          message: data.message,
          source: "Site Contact Form",
          submitted_at: new Date().toISOString(),
        }),
      }).catch(() => {});
      return { success: true, message: "Message sent successfully" };
    },
  });
}

export function useSubmitAssessment() {
  return useMutation({
    mutationFn: async (data: AssessmentInput) => {
      const isGovCon = isGovConIndustry(data.industry);

      // ── Tier logic ──
      let tier = isGovCon ? "Federal Readiness Package" : "Growth Automation";
      if (isGovCon) {
        if (data.contractValue?.includes("1M+") || data.bidHistory?.includes("active")) {
          tier = "Full Federal Operations System";
        } else if (data.samStatus?.includes("not-registered")) {
          tier = "Federal Entry Package";
        }
      } else {
        if (data.weeklyInquiries?.includes("50+") || data.customerValue?.includes("10k")) {
          tier = "Advanced Automation";
        } else if (data.weeklyInquiries?.includes("1-10")) {
          tier = "Light Automation";
        }
      }

      // ── Build structured email body ──
      let emailBody = "";
      if (isGovCon) {
        emailBody = `
TRACK: Government Contracting
RECOMMENDED TIER: ${tier}

── BUSINESS PROFILE ──
Business Name: ${data.businessName}
Industry: ${data.industry}
Website: ${data.website ?? "Not provided"}
Email: ${data.email}

── FEDERAL STATUS ──
SAM.gov Status: ${data.samStatus ?? "Not provided"}
Contract Vehicle(s): ${data.contractVehicle ?? "Not provided"}
Active Certifications: ${data.certifications ?? "Not provided"}

── COMPLIANCE & EXPERIENCE ──
Biggest Compliance Gap: ${data.complianceGap ?? "Not provided"}
Subcontracting Role: ${data.subcontractRole ?? "Not provided"}
Bid / Proposal History: ${data.bidHistory ?? "Not provided"}

── CONTRACT GOALS ──
Target Contract Value: ${data.contractValue ?? "Not provided"}
Primary Goal with ARCG: ${data.govconGoal ?? "Not provided"}
        `.trim();
      } else {
        emailBody = `
TRACK: Commercial
RECOMMENDED TIER: ${tier}

── BUSINESS PROFILE ──
Business Name: ${data.businessName}
Industry: ${data.industry}
Website: ${data.website ?? "Not provided"}
Email: ${data.email}

── LEAD FLOW & VOLUME ──
Primary Lead Source: ${data.leadSource ?? "Not provided"}
Weekly Inquiries: ${data.weeklyInquiries ?? "Not provided"}
Current Response Time: ${data.responseTime ?? "Not provided"}
After-Hours Handling: ${data.afterHours ?? "Not provided"}

── CURRENT OPERATIONS ──
CRM: ${data.crm ?? "Not provided"}
#1 Operational Pain Point: ${data.painPoint ?? "Not provided"}
First Automation Target: ${data.automationGoals ?? "Not provided"}

── VALUE & GOALS ──
Average Customer LTV: ${data.customerValue ?? "Not provided"}
Desired Outcome from ARCG: ${data.desiredOutcome ?? "Not provided"}
        `.trim();
      }

      const payload = {
        access_key: WEB3FORMS_KEY,
        subject: `New Assessment — ${data.businessName} | ${tier} | ${isGovCon ? "GovCon" : "Commercial"}`,
        from_name: "ARCG Systems Assessment",
        replyto: data.email,
        message: emailBody,
      };

      const res = await fetch(WEB3FORMS_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });

      const json = await res.json();
      if (!json.success) throw new Error(json.message ?? "Submission failed");

      const recommendation = isGovCon
        ? `Based on your federal contracting profile, we recommend a ${tier} — covering compliance infrastructure, capability positioning, and teaming strategy aligned to your certification portfolio.`
        : `Based on your volume and goals, we recommend a ${tier} setup to capture after-hours leads, eliminate manual routing, and integrate with your CRM.`;

      return { success: true, tier, recommendation, isGovCon };
    },
  });
}
