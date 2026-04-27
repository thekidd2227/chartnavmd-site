import { Link } from "wouter";
import { ChartnavShell } from "@/components/chartnav/ChartnavShell";
import { Button, BrandText, Eyebrow, IconGold } from "@/components/chartnav/primitives";
import { useForms } from "@/components/chartnav/FormsContext";
import { track } from "@/components/chartnav/submitLead";
import impl from "@/content/chartnav/implementation.en.json";

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

function withBrand(text: string) {
  return text.split(/(ChartNav)/).map((part, i) =>
    part === "ChartNav" ? <BrandText key={i} /> : part
  );
}

/* ----- Sections ----- */

function Hero() {
  const h = impl.hero;
  const { openFromAction } = useForms();
  return (
    <section id="hero" aria-labelledby="impl-h1" className="cn-hero cn-hero--centered">
      <div className="cn-container">
        <div className="cn-hero__grid">
          <div className="cn-hero__copy cn-hero__copy--centered">
            <Eyebrow>{h.eyebrow}</Eyebrow>
            <h1 id="impl-h1">{h.headline}</h1>
            <p>{withBrand(h.subhead)}</p>
            <div className="cn-hero__ctas">
              <Button
                variant="primary"
                onClick={() => { track("implementation.cta_click"); openFromAction(h.ctaPrimary.action); }}
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

function PilotScope() {
  const p = (impl as any).pilotScope as
    | { eyebrow: string; headline: string; body: string; bullets: string[] }
    | undefined;
  if (!p) return null;
  return (
    <section
      id="pilot-scope"
      aria-labelledby="pilot-scope-h2"
      className="cn-section cn-section--alt"
    >
      <div className="cn-container">
        <SectionHeader eyebrow={p.eyebrow} headline={p.headline} />
        <CenteredBody>{withBrand(p.body)}</CenteredBody>
        <ul className="cn-reality-list" data-testid="pilot-scope-bullets">
          {p.bullets.map((b, i) => (
            <li key={i}>
              <p>{b}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function HowIntroduced() {
  const h = impl.howIntroduced;
  return (
    <section id="how-introduced" aria-labelledby="how-introduced-h2" className="cn-section cn-section--alt">
      <div className="cn-container">
        <SectionHeader eyebrow={h.eyebrow} headline={h.headline} />
        <CenteredBody>{withBrand(h.body)}</CenteredBody>
        <ul className="cn-reality-list">
          {h.points.map((p, i) => (
            <li key={i}>
              <h3>{p.title}</h3>
              <p>{p.body}</p>
            </li>
          ))}
        </ul>
        <p className="cn-footnote">{h.note}</p>
      </div>
    </section>
  );
}

function SitsAcross() {
  const s = impl.sitsAcross;
  return (
    <section id="sits-across" aria-labelledby="sits-across-h2" className="cn-section">
      <div className="cn-container">
        <SectionHeader eyebrow={s.eyebrow} headline={s.headline} />
        <CenteredBody>{withBrand(s.body)}</CenteredBody>
        <div className="cn-points">
          {s.pairs.map((p, i) => (
            <div key={i} className="cn-point">
              <h3>{p.title}</h3>
              <p>{withBrand(p.body)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhatChanges() {
  const w = impl.whatChanges;
  return (
    <section id="what-changes" aria-labelledby="what-changes-h2" className="cn-section">
      <div className="cn-container">
        <SectionHeader eyebrow={w.eyebrow} headline={w.headline} />
        <CenteredBody>{w.body}</CenteredBody>
        <ul className="cn-reality-list">
          {w.items.map((it, i) => (
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

function PracticeProvides() {
  const p = impl.practiceProvides;
  return (
    <section id="practice-provides" aria-labelledby="practice-provides-h2" className="cn-section cn-section--alt">
      <div className="cn-container">
        <SectionHeader eyebrow={p.eyebrow} headline={p.headline} />
        <CenteredBody>{p.body}</CenteredBody>
        <ul className="cn-reality-list">
          {p.items.map((it, i) => (
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

function NotClaiming() {
  const n = impl.notClaiming;
  return (
    <section id="not-claiming" aria-labelledby="not-claiming-h2" className="cn-section">
      <div className="cn-container">
        <SectionHeader eyebrow={n.eyebrow} headline={n.headline} />
        <CenteredBody>{withBrand(n.body)}</CenteredBody>
        <ol className="cn-fit-list">
          {n.items.map((it, i) => (<li key={i}>{withBrand(it)}</li>))}
        </ol>
      </div>
    </section>
  );
}

function WhyImpl() {
  const w = impl.whyImpl;
  return (
    <section id="why-impl" aria-labelledby="why-impl-h2" className="cn-section cn-section--alt">
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

function Assessment() {
  const a = impl.assessment;
  return (
    <section id="assessment" aria-labelledby="assessment-h2" className="cn-section">
      <div className="cn-container">
        <SectionHeader eyebrow={a.eyebrow} headline={a.headline} />
        <CenteredBody>{withBrand(a.body)}</CenteredBody>
        <ul className="cn-reality-list">
          {a.reviews.map((r, i) => (
            <li key={i}>
              <h3>{r.title}</h3>
              <p>{r.body}</p>
            </li>
          ))}
        </ul>
        <p className="cn-method__callout">{a.deliverable}</p>
      </div>
    </section>
  );
}

function Mapping() {
  const m = impl.mapping;
  return (
    <section id="mapping" aria-labelledby="mapping-h2" className="cn-section cn-section--alt">
      <div className="cn-container">
        <SectionHeader eyebrow={m.eyebrow} headline={m.headline} />
        <CenteredBody>{m.body}</CenteredBody>
        <ol
          className="cn-flow"
          style={{ gridTemplateColumns: "repeat(6, 1fr)" }}
          aria-label="Current-state mapping"
        >
          {m.steps.map((s) => (
            <li key={s.num} className="cn-flow__step">
              <div className="cn-flow__step__num">STEP {s.num}</div>
              <h3>{s.title}</h3>
              <p>{s.body}</p>
            </li>
          ))}
        </ol>
        <div className="cn-connectors">
          {m.friction.map((f, i) => (<p key={i}>{f}</p>))}
        </div>
      </div>
    </section>
  );
}

function Configuration() {
  const c = impl.configuration;
  return (
    <section id="configuration" aria-labelledby="configuration-h2" className="cn-section">
      <div className="cn-container">
        <SectionHeader eyebrow={c.eyebrow} headline={c.headline} />
        <CenteredBody>{c.body}</CenteredBody>
        <ul className="cn-reality-list">
          {c.items.map((it, i) => (
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

function Phases() {
  const p = impl.phases;
  return (
    <section id="phases" aria-labelledby="phases-h2" className="cn-section cn-section--alt">
      <div className="cn-container">
        <SectionHeader eyebrow={p.eyebrow} headline={p.headline} lead={p.lead} />
        <div className="cn-stack">
          {p.blocks.map((b) => (
            <article key={b.id} id={`phase-${b.id}`} className="cn-subspec-card">
              <div className="cn-subspec-card__head">
                <div className="cn-subspec-card__eyebrow">{b.num}</div>
                <h3 className="cn-subspec-card__name">{b.name}</h3>
                <p className="cn-subspec-card__tagline">{b.tagline}</p>
                <div className="cn-subspec-card__roles">
                  {b.roles.map((r) => (<span key={r} className="cn-chip">{r}</span>))}
                </div>
              </div>
              <div className="cn-subspec-card__body">
                <div className="cn-subspec-card__group">
                  <h4>What happens</h4>
                  <ul className="cn-mini-list">
                    {b.happens.map((d) => (<li key={d}>{d}</li>))}
                  </ul>
                </div>
                <div className="cn-subspec-card__group">
                  <h4>What risk this reduces</h4>
                  <ul className="cn-mini-list cn-mini-list--muted">
                    {b.reduces.map((d) => (<li key={d}>{d}</li>))}
                  </ul>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Training() {
  const t = impl.training;
  return (
    <section id="training" aria-labelledby="training-h2" className="cn-section">
      <div className="cn-container">
        <SectionHeader eyebrow={t.eyebrow} headline={t.headline} />
        <CenteredBody>{t.body}</CenteredBody>
        <ul className="cn-reality-list">
          {t.items.map((it, i) => (
            <li key={i}>
              <h3>{it.title}</h3>
              <p>{it.body}</p>
            </li>
          ))}
        </ul>
        <p className="cn-footnote">{t.note}</p>
      </div>
    </section>
  );
}

function GoLive() {
  const g = impl.goLive;
  return (
    <section id="go-live" aria-labelledby="go-live-h2" className="cn-section cn-section--alt">
      <div className="cn-container">
        <SectionHeader eyebrow={g.eyebrow} headline={g.headline} />
        <CenteredBody>{g.body}</CenteredBody>
        <div className="cn-points">
          {g.items.map((p, i) => (
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

function Scope() {
  const s = impl.scope;
  return (
    <section id="scope" aria-labelledby="scope-h2" className="cn-section">
      <div className="cn-container">
        <SectionHeader eyebrow={s.eyebrow} headline={s.headline} />
        <CenteredBody>{s.body}</CenteredBody>
        <div className="cn-shift-wrap">
          <table className="cn-shift">
            <caption className="sr-only">Rollout scope examples and when each is a good fit.</caption>
            <thead>
              <tr>
                <th scope="col">Rollout shape</th>
                <th scope="col">When it fits</th>
              </tr>
            </thead>
            <tbody>
              {s.rows.map((r, i) => (
                <tr key={i}>
                  <td>{r.left}</td>
                  <td>{r.right}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

function Prevents() {
  const p = impl.prevents;
  return (
    <section id="prevents" aria-labelledby="prevents-h2" className="cn-section cn-section--alt">
      <div className="cn-container">
        <SectionHeader eyebrow={p.eyebrow} headline={p.headline} />
        <ul className="cn-reality-list">
          {p.items.map((it, i) => (
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

function Bridge() {
  const br = impl.bridge;
  const { openFromAction } = useForms();
  return (
    <section id="bridge" aria-labelledby="bridge-h2" className="cn-section">
      <div className="cn-container">
        <SectionHeader eyebrow={br.eyebrow} headline={br.headline} />
        <CenteredBody>{withBrand(br.body)}</CenteredBody>
        <div className="cn-bridge-cta">
          {br.links.map((l, i) =>
            "href" in l && l.href ? (
              <Link key={i} href={l.href} className="cn-btn cn-btn--ghost">
                {l.label} <IconGold name="arrow-right" size={16} />
              </Link>
            ) : (
              <Button
                key={i}
                variant="primary"
                onClick={() => {
                  track("implementation.cta_click");
                  openFromAction((l as any).action);
                }}
              >
                {l.label} <IconGold name="arrow-right" size={16} />
              </Button>
            )
          )}
        </div>
        <p className="cn-footnote">{withBrand(br.note)}</p>
      </div>
    </section>
  );
}

function Faq() {
  const f = impl.faq;
  return (
    <section id="faq" aria-labelledby="faq-h2" className="cn-section cn-section--alt">
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
  const f = impl.finalCta;
  const { openFromAction } = useForms();
  return (
    <section id="impl-cta" aria-labelledby="impl-cta-h2" className="cn-final">
      <div className="cn-container">
        <Eyebrow>{f.eyebrow}</Eyebrow>
        <h2 id="impl-cta-h2">{f.headline}</h2>
        <p className="cn-final__body">{f.body}</p>
        <div className="cn-final__ctas">
          <Button
            variant="primary"
            onClick={() => {
              track("implementation.cta_click");
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
  mainEntity: impl.faq.items.map((x) => ({
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
    { "@type": "ListItem", position: 2, name: "Implementation", item: "https://arcgsystems.com/chartnav/implementation" },
  ],
};

export default function Implementation() {
  return (
    <ChartnavShell
      title="ChartNav Implementation — Ophthalmology Workflow Assessment & Staged Pilot"
      description="How ChartNav is introduced into an ophthalmology practice: workflow assessment, role-based configuration, pilot scope and exit criteria, training, and 30/60/90 review. Staged ophthalmology workflow rollout — not a sign-up link."
      canonical="/chartnav/implementation"
      jsonLd={[faqJsonLd, breadcrumb]}
    >
      <Hero />
      <PilotScope />
      <HowIntroduced />
      <SitsAcross />
      <WhyImpl />
      <Assessment />
      <Mapping />
      <Configuration />
      <WhatChanges />
      <PracticeProvides />
      <Phases />
      <Scope />
      <Training />
      <GoLive />
      <Prevents />
      <NotClaiming />
      <Bridge />
      <Faq />
      <FinalCta />
    </ChartnavShell>
  );
}
