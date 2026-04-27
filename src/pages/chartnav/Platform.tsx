import { Link } from "wouter";
import { ChartnavShell } from "@/components/chartnav/ChartnavShell";
import { Button, BrandText, Eyebrow, IconGold, withBrand } from "@/components/chartnav/primitives";
import { useForms } from "@/components/chartnav/FormsContext";
import { track } from "@/components/chartnav/submitLead";
import platform from "@/content/chartnav/platform.en.json";

/* ----- Small helpers ----- */

function Cta({
  label, action, href, variant,
}: {
  label: string;
  action?: string;
  href?: string;
  variant: "primary" | "ghost";
}) {
  const { openFromAction } = useForms();
  if (href) {
    return (
      <Button variant={variant} href={href} onClick={() => track("platform.cta_click")}>
        {label}
        {variant === "primary" && <IconGold name="arrow-right" size={16} />}
      </Button>
    );
  }
  return (
    <Button variant={variant} onClick={() => { track("platform.cta_click"); openFromAction(action); }}>
      {label}
      {variant === "primary" && <IconGold name="arrow-right" size={16} />}
    </Button>
  );
}

function SectionHeader({ eyebrow, headline, lead }: { eyebrow: string; headline: string; lead?: string }) {
  return (
    <header className="cn-section__header">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2>{headline}</h2>
      {lead && <p>{lead}</p>}
    </header>
  );
}

/* ----- Sections ----- */

function Hero() {
  const h = platform.hero as typeof platform.hero & {
    ctaSecondary?: { label: string; action?: string; href?: string };
  };
  return (
    <section id="hero" aria-labelledby="platform-h1" className="cn-hero cn-hero--centered">
      <div className="cn-container">
        <div className="cn-hero__grid">
          <div className="cn-hero__copy cn-hero__copy--centered">
            <Eyebrow>{h.eyebrow}</Eyebrow>
            <h1 id="platform-h1">{h.headline}</h1>
            <p>{withBrand(h.subhead, { tmFirst: true })}</p>
            <div className="cn-hero__ctas">
              <Cta label={h.ctaPrimary.label} action={h.ctaPrimary.action} variant="primary" />
              {h.ctaSecondary && (
                <Cta
                  label={h.ctaSecondary.label}
                  action={h.ctaSecondary.action}
                  href={h.ctaSecondary.href}
                  variant="ghost"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Summary() {
  const s = platform.summary;
  return (
    <section id="summary" aria-labelledby="summary-h2" className="cn-section cn-section--alt">
      <div className="cn-container">
        <SectionHeader eyebrow={s.eyebrow} headline={s.headline} lead={s.lead} />
        <div className="cn-layers">
          {s.layers.map((l) => (
            <article key={l.num} className="cn-layer">
              <div className="cn-layer__num">{l.num}</div>
              <div className="cn-layer__icon"><IconGold name={l.icon as any} size={20} /></div>
              <h3>{l.title}</h3>
              <p>{l.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Rationale() {
  const r = platform.rationale;
  return (
    <section id="rationale" aria-labelledby="rationale-h2" className="cn-section">
      <div className="cn-container">
        <SectionHeader eyebrow={r.eyebrow} headline={r.headline} />
        <p className="cn-centered-body">{withBrand(r.body)}</p>
        <div className="cn-points">
          {r.points.map((p, i) => (
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

function Modules() {
  return (
    <section id="modules" aria-labelledby="modules-h2" className="cn-section cn-section--alt">
      <div className="cn-container">
        <SectionHeader
          eyebrow="CORE MODULES"
          headline="The five operating modules, in detail."
          lead="Each module is a real surface in the product — a set of screens, records, and handoffs that a specific role uses on a specific part of the clinic day."
        />
        <div className="cn-modules">
          {platform.modules.map((m) => {
            const status = (m as any).status as
              | "available"
              | "partial"
              | "roadmap"
              | undefined;
            const statusLabel = (m as any).statusLabel as string | undefined;
            return (
            <article
              key={m.id}
              id={`module-${m.id}`}
              className="cn-module"
              data-module-status={status ?? "available"}
            >
              <div className="cn-module__head">
                <div className="cn-module__num">{m.num} / {m.name.toUpperCase()}</div>
                {statusLabel && (
                  <span
                    className="cn-module__status"
                    data-status={status ?? "available"}
                    aria-label={`Status: ${statusLabel}`}
                  >
                    {statusLabel}
                  </span>
                )}
                <div className="cn-module__icon"><IconGold name={m.icon as any} size={24} /></div>
                <h3 className="cn-module__name">{m.name}</h3>
                <p className="cn-module__tagline">{m.tagline}</p>
                <div className="cn-module__users">
                  {m.users.map((u) => (<span key={u} className="cn-chip">{u}</span>))}
                </div>
              </div>

              <div className="cn-module__body">
                <div className="cn-module__group">
                  <h4>What it covers</h4>
                  <ul className="cn-module__list">
                    {m.covers.map((c) => (<li key={c}>{c}</li>))}
                  </ul>
                </div>

                <div className="cn-module__group">
                  <h4>Problems it solves</h4>
                  <ul className="cn-module__list cn-module__list--dim">
                    {m.problems.map((p) => (<li key={p}>{p}</li>))}
                  </ul>
                </div>

                <div className="cn-module__group">
                  <h4>Workflow objects</h4>
                  <div className="cn-module__objects">
                    {m.objects.map((o) => (<span key={o} className="cn-chip cn-chip--neutral">{o}</span>))}
                  </div>
                </div>

                <p className="cn-module__outcome">{m.outcomes}</p>
              </div>
            </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Roles() {
  const r = platform.roles;
  return (
    <section id="roles" aria-labelledby="roles-h2" className="cn-section">
      <div className="cn-container">
        <SectionHeader eyebrow={r.eyebrow} headline={r.headline} lead={r.lead} />
        <div className="cn-roles" role="table" aria-label="Role-based views">
          <div className="cn-role-row cn-role-row--head" role="row">
            <div role="columnheader">Role</div>
            <div role="columnheader">What they need</div>
            <div role="columnheader">What the platform surfaces</div>
            <div role="columnheader">What handoff they own</div>
          </div>
          {r.items.map((it) => (
            <div key={it.role} className="cn-role-row" role="row">
              <div className="cn-role-row__role" role="cell">{it.role}</div>
              <div role="cell" data-label="What they need">{it.needs}</div>
              <div role="cell" data-label="What the platform surfaces">{it.sees}</div>
              <div role="cell" data-label="What handoff they own">{it.owns}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Flow() {
  const f = platform.flow;
  const { openFromAction } = useForms();
  return (
    <section id="flow" aria-labelledby="flow-h2" className="cn-section cn-section--alt">
      <div className="cn-container">
        <SectionHeader eyebrow={f.eyebrow} headline={f.headline} lead={f.lead} />
        <ol className="cn-flow" aria-label="System flow">
          {f.steps.map((s) => (
            <li key={s.num} className="cn-flow__step">
              <div className="cn-flow__step__num">STEP {s.num}</div>
              <h3>{s.title}</h3>
              <p>{s.body}</p>
            </li>
          ))}
        </ol>
        <div className="cn-connectors">
          {f.connectors.map((c, i) => (<p key={i}>{c}</p>))}
        </div>
        <div className="cn-bridge-cta">
          <Button variant="text" onClick={() => { track("platform.cta_click"); openFromAction(f.cta.action); }}>
            {f.cta.label} <IconGold name="arrow-right" size={16} />
          </Button>
        </div>
      </div>
    </section>
  );
}

function Continuity() {
  const c = platform.continuity;
  return (
    <section id="continuity" aria-labelledby="continuity-h2" className="cn-section">
      <div className="cn-container">
        <SectionHeader eyebrow={c.eyebrow} headline={c.headline} />
        <p className="cn-centered-body">{withBrand(c.body)}</p>
        <div className="cn-continuity">
          {c.points.map((p, i) => (
            <div key={i}>
              <h3>{p.title}</h3>
              <p>{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Ophthalmology() {
  const o = platform.ophthalmology;
  return (
    <section id="ophthalmology" aria-labelledby="ophthalmology-h2" className="cn-section cn-section--alt">
      <div className="cn-container">
        <SectionHeader eyebrow={o.eyebrow} headline={o.headline} />
        <p className="cn-centered-body">{o.body}</p>
        <div className="cn-subspec">
          {o.subspecialties.map((s) => (
            <div key={s.label}>
              <h3>{s.label}</h3>
              <p>{s.body}</p>
            </div>
          ))}
        </div>
        <div className="cn-bridge-cta">
          <Link href={o.cta.href} className="cn-btn cn-btn--text">
            {o.cta.label} <IconGold name="arrow-right" size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}

function Implementation() {
  const im = platform.implementation;
  const { openFromAction } = useForms();
  return (
    <section id="implementation" aria-labelledby="impl-h2" className="cn-section">
      <div className="cn-container">
        <SectionHeader eyebrow={im.eyebrow} headline={im.headline} />
        <p className="cn-centered-body">{im.body}</p>
        <ol className="cn-impl-steps">
          {im.steps.map((s) => (
            <li key={s.num}>
              <span className="num">{s.num}</span>
              <h3>{s.title}</h3>
              <p>{s.body}</p>
            </li>
          ))}
        </ol>
        <div className="cn-bridge-cta">
          <Button variant="primary" onClick={() => { track("platform.cta_click"); openFromAction(im.cta.action); }}>
            {im.cta.label} <IconGold name="arrow-right" size={16} />
          </Button>
        </div>
      </div>
    </section>
  );
}

function Faq() {
  const f = platform.faq;
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
              <div className="cn-faq__body">{item.a}</div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCta() {
  const f = platform.finalCta;
  return (
    <section id="platform-cta" aria-labelledby="platform-cta-h2" className="cn-final">
      <div className="cn-container">
        <Eyebrow>{f.eyebrow}</Eyebrow>
        <h2 id="platform-cta-h2">{f.headline}</h2>
        <p className="cn-final__body">{f.body}</p>
        <div className="cn-final__ctas">
          <Cta label={f.ctaPrimary.label} action={f.ctaPrimary.action} variant="primary" />
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
  mainEntity: platform.faq.items.map((x) => ({
    "@type": "Question",
    name: x.q,
    acceptedAnswer: { "@type": "Answer", text: x.a },
  })),
};

const breadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "ChartNav",          item: "https://arcgsystems.com/chartnav" },
    { "@type": "ListItem", position: 2, name: "Platform",          item: "https://arcgsystems.com/chartnav/platform" },
  ],
};

export default function Platform() {
  return (
    <ChartnavShell
      title="ChartNav Platform — Ophthalmology EHR Workflow with AI Documentation Support"
      description="ChartNav's ophthalmology workflow platform: hands-free scribing, AI documentation support, intake, scheduling, imaging routing, consult letters, billing visibility, and operational metrics — built around how ophthalmology practices actually run."
      canonical="/chartnav/platform"
      jsonLd={[faqJsonLd, breadcrumb]}
    >
      <Hero />
      <Summary />
      <Rationale />
      <Modules />
      <Roles />
      <Flow />
      <Continuity />
      <Ophthalmology />
      <Implementation />
      <Faq />
      <FinalCta />
    </ChartnavShell>
  );
}
