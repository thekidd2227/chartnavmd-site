import { Button, Eyebrow, IconGold, withBrand } from "./primitives";
import { useForms } from "./FormsContext";
import { track } from "./submitLead";
import home from "@/content/chartnav/home.en.json";

export function Hero() {
  const { openFromAction } = useForms();
  const h = home.hero as typeof home.hero & {
    ctaSecondary?: { label: string; action?: string; href?: string };
  };

  const firePrimary = () => {
    track("hero.cta_click", { label: "primary" });
    openFromAction(h.ctaPrimary.action);
  };
  const fireSecondary = () => {
    track("hero.cta_click", { label: "secondary" });
    if (h.ctaSecondary?.action) openFromAction(h.ctaSecondary.action);
  };

  return (
    <section id="hero" aria-labelledby="cn-hero-h1" className="cn-hero">
      <div className="cn-container">
        <div className="cn-hero__grid">
          <div className="cn-hero__copy" data-reveal>
            <Eyebrow>{h.eyebrow}</Eyebrow>
            <h1 id="cn-hero-h1">{h.headline}</h1>
            <p>{withBrand(h.subhead, { tmFirst: true })}</p>
            <div className="cn-hero__ctas">
              <Button variant="primary" onClick={firePrimary}>
                {h.ctaPrimary.label} <IconGold name="arrow-right" size={16} />
              </Button>
              {h.ctaSecondary?.href ? (
                <Button variant="ghost" href={h.ctaSecondary.href}
                        onClick={() => track("hero.cta_click", { label: "secondary" })}>
                  {h.ctaSecondary.label}
                </Button>
              ) : h.ctaSecondary?.action ? (
                <Button variant="ghost" onClick={fireSecondary}>
                  {h.ctaSecondary.label}
                </Button>
              ) : null}
            </div>
          </div>
          <div className="cn-composite" data-reveal aria-hidden="true">
            <HeroComposite />
          </div>
        </div>
      </div>
    </section>
  );
}

function HeroComposite() {
  // Pure SVG composite — med-tech light theme:
  //   white surfaces, slate text, teal accents, one red state highlight.
  return (
    <svg
      viewBox="0 0 560 560"
      width="100%"
      height="100%"
      role="img"
      aria-hidden="true"
      style={{ display: "block" }}
    >
      <defs>
        <radialGradient id="cnHaloG" cx="70%" cy="35%" r="60%">
          <stop offset="0%" stopColor="#0B6E79" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#0B6E79" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Faint iris schematic (teal, low opacity) */}
      <g opacity="0.22" stroke="#0B6E79" strokeWidth="1" fill="none">
        <circle cx="400" cy="150" r="110" />
        <circle cx="400" cy="150" r="80" />
        <circle cx="400" cy="150" r="50" />
        <circle cx="400" cy="150" r="24" />
        {Array.from({ length: 18 }).map((_, i) => {
          const a = (i / 18) * Math.PI * 2;
          const x1 = 400 + Math.cos(a) * 52;
          const y1 = 150 + Math.sin(a) * 52;
          const x2 = 400 + Math.cos(a) * 108;
          const y2 = 150 + Math.sin(a) * 108;
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} />;
        })}
      </g>

      <rect x="0" y="0" width="560" height="560" fill="url(#cnHaloG)" />

      {/* Chart card */}
      <g>
        <rect x="40" y="60" width="480" height="150" rx="14"
              fill="#FFFFFF" stroke="#DCE5EA" />
        <text x="60" y="88" fill="#64748B" fontSize="11" fontFamily="ui-monospace" letterSpacing="2">
          CHART · SAMPLE PATIENT
        </text>
        <text x="60" y="118" fill="#0F172A" fontSize="20" fontWeight="600">
          Cataract Follow-Up
        </text>
        <text x="60" y="144" fill="#64748B" fontSize="13">
          Post-op Day 14 · IOP 16/15 · VA 20/25
        </text>
        <rect x="60" y="164" width="88" height="22" rx="11"
              fill="#DCFCE7" stroke="#15803D" strokeOpacity="0.35" />
        <text x="104" y="179" textAnchor="middle" fill="#15803D" fontSize="11"
              fontFamily="ui-monospace" letterSpacing="1.5" fontWeight="600">SIGNED</text>
        <rect x="158" y="164" width="100" height="22" rx="11"
              fill="#EEF8FA" stroke="#D6F0F3" />
        <text x="208" y="179" textAnchor="middle" fill="#0B6E79" fontSize="11"
              fontFamily="ui-monospace" letterSpacing="1.5" fontWeight="600">IMAGING · 2</text>
      </g>

      {/* Imaging queue */}
      <g>
        <rect x="40" y="230" width="480" height="140" rx="14"
              fill="#FFFFFF" stroke="#DCE5EA" />
        <text x="60" y="258" fill="#64748B" fontSize="11" fontFamily="ui-monospace" letterSpacing="2">
          IMAGING QUEUE
        </text>
        {[
          { x: 60,  label: "OCT",    n: "#1094" },
          { x: 210, label: "FUNDUS", n: "#1095" },
          { x: 360, label: "VF",     n: "#1096" },
        ].map((b) => (
          <g key={b.label}>
            <rect x={b.x} y={272} width={140} height={80} rx={10}
                  fill="#F8FBFC" stroke="#DCE5EA" />
            <rect x={b.x + 12} y={284} width={36} height={24} rx={4}
                  fill="#D6F0F3" />
            <rect x={b.x + 12} y={314} width={72} height={6} rx={3} fill="#DCE5EA" />
            <rect x={b.x + 12} y={326} width={50} height={6} rx={3} fill="#EEF8FA" />
            <text x={b.x + 118} y={296} textAnchor="end" fill="#0B6E79"
                  fontSize="11" fontFamily="ui-monospace" letterSpacing="1.2" fontWeight="600">
              {b.label}
            </text>
            <text x={b.x + 118} y={340} textAnchor="end" fill="#94A3B8" fontSize="10" fontFamily="ui-monospace">
              {b.n}
            </text>
          </g>
        ))}
      </g>

      {/* Intake status row */}
      <g>
        <rect x="40" y="390" width="480" height="110" rx="14"
              fill="#FFFFFF" stroke="#DCE5EA" />
        <text x="60" y="418" fill="#64748B" fontSize="11" fontFamily="ui-monospace" letterSpacing="2">
          INTAKE
        </text>
        {[
          { x: 60,  label: "Ready",      tone: "#0B6E79", bg: "#EEF8FA", stroke: "#D6F0F3" },
          { x: 170, label: "Verified",   tone: "#15803D", bg: "#DCFCE7", stroke: "rgba(21,128,61,0.35)" },
          { x: 290, label: "Translated", tone: "#0F172A", bg: "#F8FBFC", stroke: "#DCE5EA" },
          { x: 420, label: "Consents",   tone: "#B45309", bg: "#FEF3C7", stroke: "rgba(180,83,9,0.35)" },
        ].map((p) => (
          <g key={p.label}>
            <rect x={p.x} y={438} width={p.label === "Translated" ? 108 : (p.label === "Consents" ? 92 : 88)}
                  height={26} rx={13} fill={p.bg} stroke={p.stroke} />
            <text x={p.x + 14} y={455} fill={p.tone} fontSize="12" fontWeight="600">{p.label}</text>
          </g>
        ))}
      </g>
    </svg>
  );
}
