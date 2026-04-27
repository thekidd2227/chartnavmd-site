import { ChartnavShell } from "@/components/chartnav/ChartnavShell";
import { Hero } from "@/components/chartnav/Hero";
import {
  BeforeAfter,
  Problem,
  ProductProof,
  TrustEnv,
  FinalCta,
  RevealController,
} from "@/components/chartnav/Sections";
import { VideoShowcase } from "@/components/chartnav/VideoShowcase";

export default function ChartnavHome() {
  return (
    <ChartnavShell
      title="ChartNav — Hands-Free Ophthalmology Scribing & Practice Workflow"
      description="ChartNav is the hands-free scribing platform built for ophthalmology. Dictate during the exam, get a structured SOAP draft ready to sign, and run intake, imaging, referrals, and operational metrics in one ophthalmology-first workflow."
      canonical="/chartnav"
      jsonLd={[
        {
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "ARCG Systems",
          url: "https://arcgsystems.com",
        },
        {
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "ChartNav",
          url: "https://arcgsystems.com/chartnav",
          publisher: { "@type": "Organization", name: "ARCG Systems" },
        },
        {
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: "ChartNav",
          applicationCategory: "MedicalApplication",
          applicationSubCategory: "Hands-Free Scribing for Ophthalmology",
          operatingSystem: "Web (modern browsers); iPad Safari supported",
          url: "https://arcgsystems.com/chartnav",
          publisher: { "@type": "Organization", name: "ARCG Systems" },
          description: "Hands-free ophthalmology scribing platform: dictate during the exam, receive a structured SOAP draft, and coordinate intake, imaging, referrals, and operational metrics in one workflow.",
          featureList: [
            "Hands-free scribing with live transcript-to-SOAP draft",
            "Ophthalmology-first encounter templates (general, glaucoma, cataract, retina)",
            "Digital intake → ready chart",
            "Technician workup that carries into the exam",
            "Imaging routed into the correct encounter context",
            "Consult letters generated from the signed note",
            "Operational metrics dashboard for practice leadership",
          ],
          audience: {
            "@type": "MedicalAudience",
            audienceType: "Ophthalmology practices",
          },
        },
        {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            {
              "@type": "Question",
              name: "What is hands-free scribing in ChartNav?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Hands-free scribing means the physician dictates during the exam and ChartNav captures the audio, produces a transcript, and structures it into a SOAP draft ready to review and sign — without a keyboard, mouse, or in-room scribe.",
              },
            },
            {
              "@type": "Question",
              name: "Is ChartNav specific to ophthalmology?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Yes. ChartNav is ophthalmology-first, with encounter templates, imaging routing, and trust-tier governance built around the way eye care actually runs.",
              },
            },
          ],
        },
      ]}
    >
      <RevealController>
        {/* Deal-closing flow: Hero → Video Proof → Before/After → Pain → Product Proof → Trust → CTA */}
        <Hero />
        <VideoShowcase />
        <BeforeAfter />
        <Problem />
        <ProductProof />
        <TrustEnv />
        <FinalCta />
      </RevealController>
    </ChartnavShell>
  );
}
