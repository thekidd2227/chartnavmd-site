import { ChartnavShell } from "@/components/chartnav/ChartnavShell";
import {
  Button,
  BrandText,
  Eyebrow,
  IconGold,
} from "@/components/chartnav/primitives";
import { useForms } from "@/components/chartnav/FormsContext";
import { track } from "@/components/chartnav/submitLead";
import { RevealController } from "@/components/chartnav/Sections";
import why from "@/content/chartnav/why-chartnav.en.json";

/* ----- Helpers ----- */

function SectionHeader({
  eyebrow, headline, lead,
}: { eyebrow: string; headline: string; lead?: string }) {
  return (
    <header className="cn-section__header" data-reveal>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2>{headline}</h2>
      {lead && <p>{lead}</p>}
    </header>
  );
}

function withBrand(text: string) {
  return text.split(/(ChartNav)/).map((part, i) =>
    part === "ChartNav" ? <BrandText key={i} /> : part
  );
}

/* ----- Sections ----- */

function Hero() {
  const h = why.hero;
  const { openFromAction } = useForms();
  return (
    <section
      id="hero"
      aria-labelledby="why-h1"
      className="cn-hero cn-hero--centered"
    >
      <div className="cn-container">
        <div className="cn-hero__grid">
          <div className="cn-hero__copy cn-hero__copy--centered" data-reveal>
            <Eyebrow>{h.eyebrow}</Eyebrow>
            <h1 id="why-h1">{h.headline}</h1>
            <p>{withBrand(h.subhead)}</p>
            <div className="cn-hero__ctas">
              <Button
                variant="primary"
                onClick={() => {
                  track("why_chartnav.cta_click" as any);
                  openFromAction(h.ctaPrimary.action);
                }}
              >
                {h.ctaPrimary.label} <IconGold name="arrow-right" size={16} />
              </Button>
              <Button variant="ghost" href={h.ctaSecondary.href}>
                {h.ctaSecondary.label}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function EncounterWorkspace() {
  const w = why.encounterWorkspace;
  return (
    <section
      id="encounter-workspace"
      aria-labelledby="ew-h2"
      className="cn-section cn-section--alt"
    >
      <div className="cn-container">
        <SectionHeader eyebrow={w.eyebrow} headline={w.headline} lead={w.lead} />
        <div className="cn-cards-grid">
          {w.cards.map((c, i) => (
            <article key={i} className="cn-card" data-reveal>
              <h3>{c.title}</h3>
              <p>{c.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function AIDocumentation() {
  const a = why.aiDocumentation;
  return (
    <section
      id="ai-documentation"
      aria-labelledby="ai-h2"
      className="cn-section"
    >
      <div className="cn-container">
        <SectionHeader eyebrow={a.eyebrow} headline={a.headline} lead={a.lead} />
        <ul className="cn-reality-list">
          {a.items.map((it, i) => (
            <li key={i} data-reveal>
              <h3>{it.title}</h3>
              <p>{it.body}</p>
            </li>
          ))}
        </ul>
        <p className="cn-truth-statement" data-reveal>
          <strong>Honest scope:</strong> {a.disclaimer}
        </p>
      </div>
    </section>
  );
}

function SpecialtyTemplates() {
  const s = why.specialtyTemplates;
  return (
    <section
      id="specialty-templates"
      aria-labelledby="st-h2"
      className="cn-section cn-section--alt"
    >
      <div className="cn-container">
        <SectionHeader eyebrow={s.eyebrow} headline={s.headline} lead={s.lead} />
        <div className="cn-cards-grid cn-cards-grid--compact">
          {s.templates.map((t) => (
            <article key={t.key} className="cn-card cn-card--compact" data-reveal>
              <h3>{t.label}</h3>
              <p>{t.body}</p>
            </article>
          ))}
        </div>
        <p className="cn-truth-statement" data-reveal>{s.note}</p>
      </div>
    </section>
  );
}

function CodingBilling() {
  const c = why.codingBilling;
  return (
    <section
      id="coding-billing"
      aria-labelledby="cb-h2"
      className="cn-section"
    >
      <div className="cn-container">
        <SectionHeader eyebrow={c.eyebrow} headline={c.headline} lead={c.lead} />
        <ul className="cn-reality-list">
          {c.items.map((it, i) => (
            <li key={i} data-reveal>
              <h3>{it.title}</h3>
              <p>{it.body}</p>
            </li>
          ))}
        </ul>
        <p className="cn-truth-statement" data-reveal>
          <strong>Honest scope:</strong> {c.disclaimer}
        </p>
      </div>
    </section>
  );
}

function Imaging() {
  const m = why.imaging;
  return (
    <section
      id="imaging"
      aria-labelledby="img-h2"
      className="cn-section cn-section--alt"
    >
      <div className="cn-container">
        <SectionHeader eyebrow={m.eyebrow} headline={m.headline} lead={m.lead} />
        <div className="cn-cards-grid">
          {m.items.map((it, i) => (
            <article key={i} className="cn-card" data-reveal>
              <h3>{it.title}</h3>
              <p>{it.body}</p>
            </article>
          ))}
        </div>
        <p className="cn-truth-statement" data-reveal>
          <strong>Future pathways:</strong> {m.futurePathways}
        </p>
      </div>
    </section>
  );
}

function QualityReadiness() {
  const q = why.qualityReadiness;
  return (
    <section
      id="quality-readiness"
      aria-labelledby="qr-h2"
      className="cn-section"
    >
      <div className="cn-container">
        <SectionHeader eyebrow={q.eyebrow} headline={q.headline} lead={q.lead} />
        <ul className="cn-reality-list">
          {q.items.map((it, i) => (
            <li key={i} data-reveal>
              <h3>{it.title}</h3>
              <p>{it.body}</p>
            </li>
          ))}
        </ul>
        <p className="cn-truth-statement" data-reveal>
          <strong>Honest scope:</strong> {q.disclaimer}
        </p>
      </div>
    </section>
  );
}

function TabletFlow() {
  const t = why.tabletFlow;
  return (
    <section
      id="tablet-flow"
      aria-labelledby="tf-h2"
      className="cn-section cn-section--alt"
    >
      <div className="cn-container">
        <SectionHeader eyebrow={t.eyebrow} headline={t.headline} lead={t.lead} />
        <div className="cn-cards-grid">
          {t.items.map((it, i) => (
            <article key={i} className="cn-card" data-reveal>
              <h3>{it.title}</h3>
              <p>{it.body}</p>
            </article>
          ))}
        </div>
        <p className="cn-truth-statement" data-reveal>
          <strong>Today's limitation:</strong> {t.limitation}
        </p>
      </div>
    </section>
  );
}

function Interoperability() {
  const i = why.interoperability;
  return (
    <section
      id="interoperability"
      aria-labelledby="io-h2"
      className="cn-section"
    >
      <div className="cn-container">
        <SectionHeader eyebrow={i.eyebrow} headline={i.headline} lead={i.lead} />
        <div className="cn-integrations">
          <table className="cn-integrations__table" data-reveal>
            <thead>
              <tr>
                <th scope="col">Integration kind</th>
                <th scope="col">Status</th>
                <th scope="col">Notes</th>
              </tr>
            </thead>
            <tbody>
              {i.rows.map((r, k) => (
                <tr key={k}>
                  <th scope="row">{r.kind}</th>
                  <td>
                    <span
                      className={`cn-pill cn-pill--${r.status.replace(/[^a-z]/g, "-")}`}
                    >
                      {r.status}
                    </span>
                  </td>
                  <td>{r.body}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="cn-truth-statement" data-reveal>
          <strong>Honest scope:</strong> {i.disclaimer}
        </p>
      </div>
    </section>
  );
}

function Proof() {
  const p = why.proof;
  return (
    <section
      id="proof"
      aria-labelledby="pf-h2"
      className="cn-section cn-section--alt"
    >
      <div className="cn-container">
        <SectionHeader eyebrow={p.eyebrow} headline={p.headline} lead={p.lead} />
        <ul className="cn-reality-list">
          {p.facts.map((f, i) => (
            <li key={i} data-reveal>
              <h3>{f.label}</h3>
              <p>{f.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Summary() {
  const s = why.summary;
  return (
    <section
      id="why-summary"
      aria-labelledby="ws-h2"
      className="cn-section"
    >
      <div className="cn-container">
        <SectionHeader eyebrow={s.eyebrow} headline={s.headline} />
        <div className="cn-cards-grid">
          {s.points.map((pt, i) => (
            <article key={i} className="cn-card" data-reveal>
              <h3>{pt.title}</h3>
              <p>{pt.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCta() {
  const f = why.finalCta;
  const { openFromAction } = useForms();
  return (
    <section
      id="why-final-cta"
      aria-labelledby="wf-h2"
      className="cn-section cn-final"
    >
      <div className="cn-container" data-reveal>
        <Eyebrow>{f.eyebrow}</Eyebrow>
        <h2 id="wf-h2">{f.headline}</h2>
        <p className="cn-final__body">{f.body}</p>
        <div className="cn-final__ctas">
          <Button
            variant="primary"
            onClick={() => {
              track("why_chartnav.final_cta" as any);
              openFromAction(f.ctaPrimary.action);
            }}
          >
            {f.ctaPrimary.label} <IconGold name="arrow-right" size={16} />
          </Button>
          <Button variant="ghost" href={f.ctaSecondary.href}>
            {f.ctaSecondary.label}
          </Button>
        </div>
      </div>
    </section>
  );
}

/* ----- Page ----- */

export default function ChartnavWhy() {
  return (
    <ChartnavShell
      title="Why ChartNav — Hands-Free Ophthalmology Scribing & Workflow Platform"
      description="ChartNav is the ophthalmology-first workflow platform with hands-free scribing, AI documentation support, specialty visit templates, imaging routing, consult letters, and operational visibility. Honest scope, staged rollout, no fake traction."
      canonical="/chartnav/why-chartnav"
      jsonLd={[
        {
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Why ChartNav",
          url: "https://arcgsystems.com/chartnav/why-chartnav",
          isPartOf: {
            "@type": "WebSite",
            name: "ChartNav",
            url: "https://arcgsystems.com/chartnav",
          },
          about: [
            "ophthalmology EHR workflow",
            "ophthalmology AI scribe",
            "AI medical scribe for ophthalmology",
            "ophthalmology clinical documentation",
            "ophthalmology imaging workflow",
            "ophthalmology billing visibility",
            "ophthalmology practice management workflow",
            "retina workflow",
            "glaucoma workflow",
            "cataract workflow",
          ],
        },
        {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            {
              "@type": "Question",
              name: "Is ChartNav an ophthalmology EHR replacement?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "ChartNav is an ophthalmology-first workflow platform that can run standalone, alongside an existing EHR (integrated read-through), or as the documentation source of record (integrated write-through). The deployment mode is decided per practice during the workflow assessment.",
              },
            },
            {
              "@type": "Question",
              name: "Does ChartNav include an AI scribe?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Yes — hands-free scribing during the exam is the lead capability. The physician dictates, ChartNav captures the transcript, and a structured SOAP draft is produced for review. AI features support clinicians; they do not make final clinical, coding, or billing decisions.",
              },
            },
            {
              "@type": "Question",
              name: "Does ChartNav handle billing and claims?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "ChartNav surfaces structured fields that support coding decisions and produces a documented handoff bundle for the practice's PM/RCM system. ChartNav does not transmit claims and is not a clearinghouse. Final coding and billing decisions remain with qualified coders and billers.",
              },
            },
            {
              "@type": "Question",
              name: "Is ChartNav certified for MIPS / quality reporting?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Not today. ChartNav is designed to capture structured data that can support quality reporting workflows, but it is not a certified MIPS or quality-program reporting tool. Practices extend ChartNav's structured outputs with their own reporting stack.",
              },
            },
          ],
        },
      ]}
    >
      <RevealController>
        <Hero />
        <EncounterWorkspace />
        <AIDocumentation />
        <SpecialtyTemplates />
        <CodingBilling />
        <Imaging />
        <QualityReadiness />
        <TabletFlow />
        <Interoperability />
        <Proof />
        <Summary />
        <FinalCta />
      </RevealController>
    </ChartnavShell>
  );
}
