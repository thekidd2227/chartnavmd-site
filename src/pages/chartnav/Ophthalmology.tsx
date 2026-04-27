import { Link } from "wouter";
import { ChartnavShell } from "@/components/chartnav/ChartnavShell";
import { Button, BrandText, Eyebrow, IconGold } from "@/components/chartnav/primitives";
import { useForms } from "@/components/chartnav/FormsContext";
import { track } from "@/components/chartnav/submitLead";
import ophth from "@/content/chartnav/ophthalmology.en.json";

/* ----- Helpers ----- */

function SectionHeader({ eyebrow, headline, lead }: { eyebrow: string; headline: string; lead?: string }) {
  return (
    <header className="cn-section__header">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2>{headline}</h2>
      {lead && <p>{lead}</p>}
    </header>
  );
}

function CenteredBody({ children }: { children: React.ReactNode }) {
  return <p className="cn-centered-body">{children}</p>;
}

/** Replace every literal "ChartNav" token in a string with the branded
 *  two-tone wordmark so the product name stays visually consistent. */
function withBrand(text: string) {
  return text.split(/(ChartNav)/).map((part, i) =>
    part === "ChartNav" ? <BrandText key={i} /> : part
  );
}

/* ----- Sections ----- */

function Hero() {
  const h = ophth.hero;
  const { openFromAction } = useForms();
  return (
    <section id="hero" aria-labelledby="ophth-h1" className="cn-hero cn-hero--centered">
      <div className="cn-container">
        <div className="cn-hero__grid">
          <div className="cn-hero__copy cn-hero__copy--centered">
            <Eyebrow>{h.eyebrow}</Eyebrow>
            <h1 id="ophth-h1">{h.headline}</h1>
            <p>{withBrand(h.subhead)}</p>
            <div className="cn-hero__ctas">
              <Button
                variant="primary"
                onClick={() => {
                  track("ophthalmology.cta_click" as any);
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

function WhyFirst() {
  const w = ophth.whyFirst;
  return (
    <section id="why-first" aria-labelledby="why-first-h2" className="cn-section cn-section--alt">
      <div className="cn-container">
        <SectionHeader eyebrow={w.eyebrow} headline={w.headline} />
        <CenteredBody>{w.body}</CenteredBody>
        <div className="cn-points">
          {w.reasons.map((p, i) => (
            <div key={i} className="cn-point">
              <h3>{p.title}</h3>
              <p>{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Realities() {
  const r = ophth.realities;
  return (
    <section id="realities" aria-labelledby="realities-h2" className="cn-section">
      <div className="cn-container">
        <SectionHeader eyebrow={r.eyebrow} headline={r.headline} />
        <ul className="cn-reality-list">
          {r.items.map((it, i) => (
            <li key={i}>
              <h3>{it.title}</h3>
              <p>{it.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Subspecialties() {
  const s = ophth.subspecialties;
  return (
    <section id="subspecialties" aria-labelledby="subspec-h2" className="cn-section cn-section--alt">
      <div className="cn-container">
        <SectionHeader eyebrow={s.eyebrow} headline={s.headline} lead={s.lead} />
        <div className="cn-stack">
          {s.blocks.map((b) => (
            <article key={b.id} id={`subspec-${b.id}`} className="cn-subspec-card">
              <div className="cn-subspec-card__head">
                <div className="cn-subspec-card__eyebrow">SUBSPECIALTY</div>
                <h3 className="cn-subspec-card__name">{b.name}</h3>
                <p className="cn-subspec-card__tagline">{b.tagline}</p>
                <div className="cn-subspec-card__roles">
                  {b.roles.map((r) => (<span key={r} className="cn-chip">{r}</span>))}
                </div>
              </div>
              <div className="cn-subspec-card__body">
                <div className="cn-subspec-card__group">
                  <h4>What makes the workflow different</h4>
                  <ul className="cn-mini-list">
                    {b.different.map((d) => (<li key={d}>{d}</li>))}
                  </ul>
                </div>
                <div className="cn-subspec-card__group">
                  <h4>What tends to break in generic systems</h4>
                  <ul className="cn-mini-list cn-mini-list--muted">
                    {b.breaks.map((d) => (<li key={d}>{d}</li>))}
                  </ul>
                </div>
                <div className="cn-subspec-card__group">
                  <h4>What ChartNav is designed to coordinate</h4>
                  <ul className="cn-mini-list">
                    {b.coordinates.map((d) => (<li key={d}>{d}</li>))}
                  </ul>
                </div>
              </div>
            </article>
          ))}
        </div>
        <p className="cn-footnote">{s.footnote}</p>
      </div>
    </section>
  );
}

function Imaging() {
  const im = ophth.imaging;
  return (
    <section id="imaging" aria-labelledby="imaging-h2" className="cn-section">
      <div className="cn-container">
        <SectionHeader eyebrow={im.eyebrow} headline={im.headline} />
        <CenteredBody>{im.body}</CenteredBody>
        <ul className="cn-modalities">
          {im.modalities.map((m) => (
            <li key={m.label}>
              <h3>{m.label}</h3>
              <p>{m.body}</p>
            </li>
          ))}
        </ul>
        <div className="cn-points">
          {im.points.map((p, i) => (
            <div key={i} className="cn-point">
              <h3>{p.title}</h3>
              <p>{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function VisitFlow() {
  const v = ophth.visitFlow;
  return (
    <section id="visit-flow" aria-labelledby="visit-flow-h2" className="cn-section cn-section--alt">
      <div className="cn-container">
        <SectionHeader eyebrow={v.eyebrow} headline={v.headline} />
        <CenteredBody>{v.body}</CenteredBody>
        <ol
          className="cn-flow"
          style={{ gridTemplateColumns: "repeat(7, 1fr)" }}
          aria-label="Ophthalmology visit flow"
        >
          {v.steps.map((s) => (
            <li key={s.num} className="cn-flow__step">
              <div className="cn-flow__step__num">STEP {s.num}</div>
              <h3>{s.title}</h3>
              <p>{s.body}</p>
            </li>
          ))}
        </ol>
        <p className="cn-footnote">{v.note}</p>
      </div>
    </section>
  );
}

function Scheduling() {
  const sc = ophth.scheduling;
  return (
    <section id="scheduling" aria-labelledby="scheduling-h2" className="cn-section">
      <div className="cn-container">
        <SectionHeader eyebrow={sc.eyebrow} headline={sc.headline} />
        <CenteredBody>{sc.body}</CenteredBody>
        <ul className="cn-reality-list">
          {sc.points.map((p, i) => (
            <li key={i}>
              <h3>{p.title}</h3>
              <p>{p.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Billing() {
  const b = ophth.billing;
  return (
    <section id="billing" aria-labelledby="billing-h2" className="cn-section cn-section--alt">
      <div className="cn-container">
        <SectionHeader eyebrow={b.eyebrow} headline={b.headline} />
        <CenteredBody>{b.body}</CenteredBody>
        <ul className="cn-reality-list">
          {b.points.map((p, i) => (
            <li key={i}>
              <h3>{p.title}</h3>
              <p>{p.body}</p>
            </li>
          ))}
        </ul>
        <p className="cn-disclaimer">
          {withBrand(b.disclaimer)}
        </p>
      </div>
    </section>
  );
}

function Fit() {
  const f = ophth.fit;
  return (
    <section id="fit" aria-labelledby="fit-h2" className="cn-section">
      <div className="cn-container">
        <SectionHeader eyebrow={f.eyebrow} headline={f.headline} />
        <ol className="cn-fit-list">
          {f.items.map((it, i) => (<li key={i}>{it}</li>))}
        </ol>
      </div>
    </section>
  );
}

function Bridge() {
  const br = ophth.bridge;
  const { openFromAction } = useForms();
  return (
    <section id="bridge" aria-labelledby="bridge-h2" className="cn-section cn-section--alt">
      <div className="cn-container">
        <SectionHeader eyebrow={br.eyebrow} headline={br.headline} />
        <CenteredBody>{withBrand(br.body)}</CenteredBody>
        <div className="cn-bridge-cta">
          {br.links.map((l, i) => (
            "href" in l && l.href ? (
              <Link key={i} href={l.href} className="cn-btn cn-btn--ghost">
                {l.label} <IconGold name="arrow-right" size={16} />
              </Link>
            ) : (
              <Button
                key={i}
                variant="primary"
                onClick={() => {
                  track("ophthalmology.cta_click" as any);
                  openFromAction((l as any).action);
                }}
              >
                {l.label} <IconGold name="arrow-right" size={16} />
              </Button>
            )
          ))}
        </div>
        <p className="cn-footnote">{withBrand(br.note)}</p>
      </div>
    </section>
  );
}

function Faq() {
  const f = ophth.faq;
  return (
    <section id="faq" aria-labelledby="faq-h2" className="cn-section">
      <div className="cn-container">
        <SectionHeader eyebrow={f.eyebrow} headline={f.headline} />
        <div className="cn-faq">
          {f.items.map((item, i) => (
            <details key={i}>
              <summary>
                <span>{item.q}</span>
                <span aria-hidden="true" className="q-toggle">+</span>
              </summary>
              <div className="cn-faq__body">{withBrand(item.a)}</div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCta() {
  const f = ophth.finalCta;
  const { openFromAction } = useForms();
  return (
    <section id="ophth-cta" aria-labelledby="ophth-cta-h2" className="cn-final">
      <div className="cn-container">
        <Eyebrow>{f.eyebrow}</Eyebrow>
        <h2 id="ophth-cta-h2">
          {f.headline.split(/(ChartNav)/).map((part, i) =>
            part === "ChartNav" ? <BrandText key={i} /> : part
          )}
        </h2>
        <p className="cn-final__body">{f.body}</p>
        <div className="cn-final__ctas">
          <Button
            variant="primary"
            onClick={() => {
              track("ophthalmology.cta_click" as any);
              openFromAction(f.ctaPrimary.action);
            }}
          >
            {f.ctaPrimary.label} <IconGold name="arrow-right" size={16} />
          </Button>
        </div>
        <p className="cn-final__note">{f.note}</p>
      </div>
    </section>
  );
}

/* ----- Page ----- */

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: ophth.faq.items.map((x) => ({
    "@type": "Question",
    name: x.q,
    acceptedAnswer: { "@type": "Answer", text: x.a },
  })),
};

const breadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "ChartNav",       item: "https://arcgsystems.com/chartnav" },
    { "@type": "ListItem", position: 2, name: "Ophthalmology",  item: "https://arcgsystems.com/chartnav/ophthalmology" },
  ],
};

export default function Ophthalmology() {
  return (
    <ChartnavShell
      title="ChartNav for Ophthalmology — Retina, Glaucoma, Cataract Workflow + AI Scribe"
      description="Ophthalmology-first clinical documentation platform with hands-free AI scribing, retina / glaucoma / cataract templates, imaging-centered clinic flow, dilation-aware scheduling, and technician-to-physician handoffs — built around how eye care actually runs."
      canonical="/chartnav/ophthalmology"
      jsonLd={[faqJsonLd, breadcrumb]}
    >
      <Hero />
      <WhyFirst />
      <Realities />
      <Subspecialties />
      <Imaging />
      <VisitFlow />
      <Scheduling />
      <Billing />
      <Fit />
      <Bridge />
      <Faq />
      <FinalCta />
    </ChartnavShell>
  );
}
