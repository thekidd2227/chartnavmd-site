import { useEffect, useRef } from "react";
import { Link } from "wouter";
import { Button, BrandText, Eyebrow, IconGold, withBrand } from "./primitives";
import { useForms } from "./FormsContext";
import { track } from "./submitLead";
import home from "@/content/chartnav/home.en.json";

// ---------- SectionHeader ----------
function SectionHeader({ eyebrow, headline, lead }: { eyebrow: string; headline: string; lead?: string }) {
  return (
    <header className="cn-section__header" data-reveal>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2>{headline}</h2>
      {lead && <p>{lead}</p>}
    </header>
  );
}

// ---------- Before vs After ----------
// Two-column comparison shown between VideoShowcase and Problem on /chartnav.
// Drives a tight "what changes when you ship ChartNav" read.
export function BeforeAfter() {
  const b = (home as any).beforeAfter;
  if (!b) return null;
  return (
    <section
      id="before-after"
      aria-labelledby="cn-ba-h2"
      className="cn-section cn-section--alt cn-ba"
    >
      <style>{BEFORE_AFTER_CSS}</style>
      <div className="cn-container">
        <header className="cn-section__header" data-reveal>
          <Eyebrow>{b.eyebrow}</Eyebrow>
          <h2 id="cn-ba-h2">{b.headline}</h2>
        </header>
        <div className="cn-ba__grid" data-reveal>
          <div className="cn-ba__col cn-ba__col--before" aria-label={b.columns.before.label}>
            <div className="cn-ba__col-head">
              <span className="cn-ba__col-icon" aria-hidden="true">×</span>
              <h3 className="cn-ba__col-label">{b.columns.before.label}</h3>
            </div>
            <ul className="cn-ba__list">
              {b.columns.before.items.map((it: string, i: number) => (
                <li key={i}>{it}</li>
              ))}
            </ul>
          </div>
          <div className="cn-ba__col cn-ba__col--after" aria-label={b.columns.after.label}>
            <div className="cn-ba__col-head">
              <span className="cn-ba__col-icon" aria-hidden="true">✓</span>
              <h3 className="cn-ba__col-label">{b.columns.after.label}</h3>
            </div>
            <ul className="cn-ba__list">
              {b.columns.after.items.map((it: string, i: number) => (
                <li key={i}>{it}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

const BEFORE_AFTER_CSS = `
.cn-ba__grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-top: 32px;
}
@media (max-width: 768px) {
  .cn-ba__grid { grid-template-columns: 1fr; gap: 12px; }
}
.cn-ba__col {
  border-radius: 14px;
  padding: 24px 24px 20px;
  background: var(--color-surface, #fff);
  border: 1px solid var(--color-border, #DCE5EA);
}
.cn-ba__col--before {
  background: linear-gradient(180deg, rgba(252, 165, 165, 0.04) 0%, rgba(252, 165, 165, 0) 100%);
  border-color: rgba(180, 83, 9, 0.18);
}
.cn-ba__col--after {
  background: linear-gradient(180deg, rgba(20, 184, 166, 0.05) 0%, rgba(20, 184, 166, 0) 100%);
  border-color: rgba(11, 110, 121, 0.22);
}
.cn-ba__col-head {
  display: flex;
  align-items: center;
  gap: 10px;
  padding-bottom: 12px;
  margin-bottom: 12px;
  border-bottom: 1px solid var(--color-border, #DCE5EA);
}
.cn-ba__col-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
  border-radius: 999px;
  font-size: 14px;
  font-weight: 700;
  line-height: 1;
}
.cn-ba__col--before .cn-ba__col-icon {
  color: #b45309;
  background: rgba(180, 83, 9, 0.12);
}
.cn-ba__col--after .cn-ba__col-icon {
  color: #0B6E79;
  background: rgba(11, 110, 121, 0.14);
}
.cn-ba__col-label {
  margin: 0;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--color-text, #0F172A);
}
.cn-ba__col--before .cn-ba__col-label { color: #b45309; }
.cn-ba__col--after  .cn-ba__col-label { color: #0B6E79; }
.cn-ba__list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 10px;
}
.cn-ba__list li {
  position: relative;
  padding-left: 22px;
  font-size: 15.5px;
  line-height: 1.45;
  color: var(--color-text-secondary, #475569);
}
.cn-ba__list li::before {
  position: absolute;
  left: 0;
  top: 0.05em;
  font-weight: 700;
}
.cn-ba__col--before .cn-ba__list li::before {
  content: "×";
  color: rgba(180, 83, 9, 0.7);
}
.cn-ba__col--after .cn-ba__list li::before {
  content: "→";
  color: #0B6E79;
}
`;

// ---------- Trust Strip ----------
export function TrustStrip() {
  return (
    <section id="trust" aria-label="Capabilities" className="cn-trust">
      <div className="cn-container">
        <ul className="cn-trust__list" role="list">
          {home.trust.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}

// ---------- Problem ----------
export function Problem() {
  const p = home.problem;
  return (
    <section id="problem" aria-labelledby="cn-problem-h2" className="cn-section">
      <div className="cn-container">
        <header className="cn-section__header" data-reveal>
          <Eyebrow>{p.eyebrow}</Eyebrow>
          <h2 id="cn-problem-h2">{p.headline}</h2>
        </header>
        <p className="cn-problem__body" data-reveal>{p.body}</p>
        <div className="cn-grid-3">
          {p.cards.map((c, i) => (
            <article key={i} className="cn-card" data-reveal>
              <span className="cn-card__icon"><IconGold name={c.icon as any} size={24} /></span>
              <h3>{c.title}</h3>
              <p>{c.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------- Capabilities Grid ----------
export function CapabilitiesGrid() {
  const p = home.platform as typeof home.platform & {
    roadmap?: { title: string; items: string[] };
  };
  return (
    <section id="platform" aria-labelledby="cn-platform-h2" className="cn-section cn-section--alt">
      <div className="cn-container">
        <header className="cn-section__header" data-reveal>
          <Eyebrow>{p.eyebrow}</Eyebrow>
          <h2 id="cn-platform-h2">{p.headline}</h2>
          <p>{withBrand(p.lead)}</p>
        </header>
        <div className="cn-grid-3x3">
          {p.cards.map((c, i) => (
            <article key={i} className="cn-card" data-reveal>
              <span className="cn-card__icon"><IconGold name={c.icon as any} /></span>
              <h3>{c.title}</h3>
              <p>{c.body}</p>
            </article>
          ))}
        </div>
        {p.roadmap && p.roadmap.items?.length > 0 && (
          <div className="cn-roadmap" data-reveal aria-label="Roadmap">
            <h3 className="cn-roadmap__title">{p.roadmap.title}</h3>
            <ul className="cn-roadmap__list">
              {p.roadmap.items.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        )}
        <div className="cn-cta-row">
          <Button
            variant="text"
            href={p.cta.href}
            onClick={() => track("platform.cta_click")}
          >
            {p.cta.label} <IconGold name="arrow-right" size={16} />
          </Button>
        </div>
      </div>
    </section>
  );
}

// ---------- Audience ----------
export function Audience() {
  const a = home.audience;
  return (
    <section id="for-practices" aria-labelledby="cn-audience-h2" className="cn-section">
      <div className="cn-container">
        <header className="cn-section__header" data-reveal>
          <Eyebrow>{a.eyebrow}</Eyebrow>
          <h2 id="cn-audience-h2">{a.headline}</h2>
          <p>{withBrand(a.body)}</p>
        </header>
        <div className="cn-audience-grid" data-reveal>
          {a.rows.map((r, i) => (
            <div key={i} className="cn-audience-row">
              <h3>{r.title}</h3>
              <p>{r.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------- Shift ----------
export function Shift() {
  const s = home.shift;
  return (
    <section id="shift" aria-labelledby="cn-shift-h2" className="cn-section cn-section--alt">
      <div className="cn-container">
        <header className="cn-section__header" data-reveal>
          <Eyebrow>{s.eyebrow}</Eyebrow>
          <h2 id="cn-shift-h2">{s.headline}</h2>
        </header>
        <div className="cn-shift-wrap" data-reveal>
          <table className="cn-shift">
            <caption className="sr-only">Before ChartNav and with ChartNav — comparison.</caption>
            <thead>
              <tr>
                <th scope="col">{s.columns.before}</th>
                <th scope="col">
                  {/^With ChartNav$/i.test(s.columns.after)
                    ? <>With <BrandText /></>
                    : s.columns.after}
                </th>
              </tr>
            </thead>
            <tbody>
              {s.rows.map((r, i) => (
                <tr key={i}>
                  <td>{r.before}</td>
                  <td>{r.after}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

// ---------- Methodology ----------
export function Methodology() {
  const m = home.implementation;
  const { openFromAction } = useForms();
  return (
    <section id="implementation" aria-labelledby="cn-impl-h2" className="cn-section">
      <div className="cn-container">
        <header className="cn-section__header" data-reveal>
          <Eyebrow>{m.eyebrow}</Eyebrow>
          <h2 id="cn-impl-h2">{m.headline}</h2>
          <p>{withBrand(m.body)}</p>
        </header>
        <ol className="cn-steps">
          {m.steps.map((s, i) => (
            <li key={i} className="cn-step" data-reveal>
              <span className="cn-step__num" aria-hidden="true">{s.step}</span>
              <h3>{s.title}</h3>
              <p>{s.body}</p>
            </li>
          ))}
        </ol>
        <p className="cn-method__callout" data-reveal>{m.callout}</p>
        <div className="cn-cta-row">
          <Button
            variant="ghost"
            onClick={() => {
              track("implementation.cta_click");
              openFromAction(m.cta.action);
            }}
          >
            {m.cta.label} <IconGold name="arrow-right" size={16} />
          </Button>
        </div>
      </div>
    </section>
  );
}

// ---------- Outcomes ----------
export function Outcomes() {
  const o = home.outcomes;
  return (
    <section id="outcomes" aria-labelledby="cn-outcomes-h2" className="cn-section cn-section--alt">
      <div className="cn-container">
        <header className="cn-section__header" data-reveal>
          <Eyebrow>{o.eyebrow}</Eyebrow>
          <h2 id="cn-outcomes-h2">{o.headline}</h2>
        </header>
        <div className="cn-grid-4">
          {o.cards.map((c, i) => (
            <article key={i} className="cn-outcome" data-reveal>
              <h3>{c.title}</h3>
              <p>{c.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------- Proof ----------
export function Proof() {
  const p = home.proof;
  return (
    <section id="proof" aria-labelledby="cn-proof-h2" className="cn-section">
      <div className="cn-container">
        <header className="cn-section__header" data-reveal>
          <Eyebrow>{p.eyebrow}</Eyebrow>
          <h2 id="cn-proof-h2">
            {p.headline.split(/(ChartNav)/).map((part, i) =>
              part === "ChartNav" ? <BrandText key={i} /> : part
            )}
          </h2>
        </header>
        <p className="cn-proof__body" data-reveal>{withBrand(p.body)}</p>
        <div className="cn-proof__cols" data-reveal>
          {p.columns.map((c, i) => (
            <div key={i} className="cn-proof__col">
              <h3>{c.title}</h3>
              <p>{c.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------- Product Proof — homepage deal-closing proof block ----------
export function ProductProof() {
  const p = (home as any).productProof;
  if (!p) return null;
  return (
    <section
      id="product-proof"
      aria-labelledby="cn-pp-h2"
      className="cn-section"
    >
      <div className="cn-container">
        <header className="cn-section__header" data-reveal>
          <Eyebrow>{p.eyebrow}</Eyebrow>
          <h2 id="cn-pp-h2">{p.headline}</h2>
          {p.lead && <p>{p.lead}</p>}
        </header>
        <ul className="cn-reality-list">
          {p.items.map((it: { title: string; body: string }, i: number) => (
            <li key={i} data-reveal>
              <h3>{it.title}</h3>
              <p>{it.body}</p>
            </li>
          ))}
        </ul>
        {p.disclaimer && (
          <p className="cn-truth-statement" data-reveal>
            <strong>Honest scope:</strong> {p.disclaimer}
          </p>
        )}
      </div>
    </section>
  );
}

// ---------- Trust Env — "Built for clinical environments" ----------
export function TrustEnv() {
  const t = (home as any).trustEnv;
  if (!t) return null;
  return (
    <section
      id="trust-env"
      aria-labelledby="cn-te-h2"
      className="cn-section cn-section--alt"
    >
      <div className="cn-container">
        <header className="cn-section__header" data-reveal>
          <Eyebrow>{t.eyebrow}</Eyebrow>
          <h2 id="cn-te-h2">{t.headline}</h2>
        </header>
        <div className="cn-cards-grid">
          {t.items.map((it: { title: string; body: string }, i: number) => (
            <article key={i} className="cn-card" data-reveal>
              <h3>{it.title}</h3>
              <p>{it.body}</p>
            </article>
          ))}
        </div>
        {t.disclaimer && (
          <p className="cn-truth-statement" data-reveal>
            <strong>Honest scope:</strong> {t.disclaimer}
          </p>
        )}
      </div>
    </section>
  );
}

// ---------- Final CTA ----------
export function FinalCta() {
  const f = home.finalCta as typeof home.finalCta & { ctaSecondary?: { label: string; action?: string } };
  const { openFromAction } = useForms();
  return (
    <section id="contact" aria-labelledby="cn-contact-h2" className="cn-final">
      <div className="cn-container" data-reveal>
        <Eyebrow>{f.eyebrow}</Eyebrow>
        <h2 id="cn-contact-h2">
          {f.headline.split(/(ChartNav)/).map((part, i) =>
            part === "ChartNav" ? <BrandText key={i} /> : part
          )}
        </h2>
        <p className="cn-final__body">{f.body}</p>
        <div className="cn-final__ctas">
          <Button
            variant="primary"
            onClick={() => {
              track("final.cta_click", { label: "primary" });
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

// ---------- Reveal controller ----------
// Progressive enhancement: every [data-reveal] element starts invisible and
// animates in. Three independent triggers keep the page from ever getting
// stuck invisible:
//   1. Synchronous viewport check on mount — reveal everything already in view.
//   2. IntersectionObserver — reveal elements as they scroll in.
//   3. Safety timeout — reveal anything still unrevealed after 400ms. This
//      guarantees content is visible even if IO misfires under StrictMode,
//      tab-in-background, or other edge cases.
export function RevealController({ children }: { children: React.ReactNode }) {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const els = Array.from(root.querySelectorAll<HTMLElement>("[data-reveal]"));

    // Reduced motion → reveal everything immediately.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      els.forEach((el) => el.setAttribute("data-revealed", "true"));
      return;
    }

    const markRevealed = (el: HTMLElement) => el.setAttribute("data-revealed", "true");

    // 1. Immediate pass: reveal anything that already intersects the viewport.
    const vh = window.innerHeight || document.documentElement.clientHeight;
    const revealIfInView = (el: HTMLElement) => {
      if (el.getAttribute("data-revealed") === "true") return;
      const r = el.getBoundingClientRect();
      if (r.top < vh && r.bottom > 0) markRevealed(el);
    };
    requestAnimationFrame(() => els.forEach(revealIfInView));

    // 2. Scroll-triggered reveal for below-the-fold elements.
    let io: IntersectionObserver | null = null;
    if ("IntersectionObserver" in window) {
      io = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              markRevealed(entry.target as HTMLElement);
              io?.unobserve(entry.target);
            }
          }
        },
        { threshold: 0.08, rootMargin: "0px 0px -5% 0px" }
      );
      els.forEach((el) => io!.observe(el));
    }

    // 3. Safety net: if anything is still unrevealed after 400ms, reveal it.
    const fallback = window.setTimeout(() => {
      els.forEach((el) => markRevealed(el));
    }, 400);

    return () => {
      io?.disconnect();
      clearTimeout(fallback);
    };
  }, []);

  return <div ref={rootRef}>{children}</div>;
}
