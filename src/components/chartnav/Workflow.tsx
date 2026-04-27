import { Button, Eyebrow, IconGold } from "./primitives";
import { useForms } from "./FormsContext";
import { track } from "./submitLead";
import home from "@/content/chartnav/home.en.json";

const LANES: { id: string; label: string; nodes: string[] }[] = [
  { id: "patient",     label: "PATIENT",      nodes: ["Digital Intake", "Reminders", "Pre-Op / Post-Op", "Messaging"] },
  { id: "frontoffice", label: "FRONT OFFICE", nodes: ["Check-In", "Scheduling", "Insurance & Eligibility"] },
  { id: "clinical",    label: "CLINICAL",     nodes: ["Tech Workup", "Exam Documentation", "Imaging Workflow", "Physician Review", "Encounter Sign-Off"] },
  { id: "operational", label: "OPERATIONAL",  nodes: ["Role-Based Views", "Handoffs", "Reporting"] },
  { id: "billing",     label: "BILLING",      nodes: ["Charge Capture", "Claim Preparation", "Billing Visibility"] },
];

export function Workflow() {
  const w = home.workflow;
  const { openFromAction } = useForms();

  const flowDescription =
    "The ChartNav workflow spans five lanes. The patient lane flows from digital multilingual intake to reminders, pre-op and post-op instructions, and messaging. The front-office lane covers check-in, scheduling, and insurance and eligibility. The clinical lane runs from tech workup through exam documentation, imaging workflow for OCT, fundus, visual field, and topography studies, physician review, and encounter sign-off. The operational lane covers role-based views, handoffs, and reporting. The billing lane covers charge capture, claim preparation, and billing visibility. The chart, imaging, and schedule share one source. Each role sees the screen built for its work. Billing sees the visit while it is still fresh.";

  return (
    <section id="workflow" aria-labelledby="cn-workflow-h2" className="cn-section cn-workflow">
      <div className="cn-container cn-workflow__inner">
        <header className="cn-section__header" data-reveal>
          <Eyebrow>{w.eyebrow}</Eyebrow>
          <h2 id="cn-workflow-h2">{w.headline}</h2>
          <p>{w.subhead}</p>
        </header>

        <figure className="cn-workflow__figure" data-reveal>
          <DesktopDiagram />
          <MobileDiagram />
          <figcaption className="sr-only">{flowDescription}</figcaption>
        </figure>

        <div className="cn-workflow__micro" data-reveal>
          {w.microcopy.map((line, i) => (
            <p key={i}>{line}</p>
          ))}
        </div>

        <div className="cn-workflow__cta-row">
          <Button
            variant="text"
            onClick={() => {
              track("workflow.cta_click");
              openFromAction(w.cta.action);
            }}
          >
            {w.cta.label} <IconGold name="arrow-right" size={16} />
          </Button>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Desktop: grid-aligned lanes, left-to-right flow ---------------- */
function DesktopDiagram() {
  const laneH = 110;
  const labelW = 150;
  const padX = 16;
  const padY = 32;
  const maxNodes = Math.max(...LANES.map((l) => l.nodes.length));
  const nodeW = 160;
  const nodeH = 58;
  const nodeGap = 28;
  const innerW = labelW + maxNodes * (nodeW + nodeGap);
  const svgW = innerW + padX * 2;
  const svgH = padY * 2 + LANES.length * laneH;

  return (
    <svg
      className="cn-workflow__svg cn-workflow__svg-desktop"
      viewBox={`0 0 ${svgW} ${svgH}`}
      role="img"
      aria-label="ChartNav workflow diagram"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <marker id="cnArrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M0 0 L10 5 L0 10 z" fill="#0B6E79" opacity="0.9" />
        </marker>
      </defs>

      {LANES.map((lane, li) => {
        const y = padY + li * laneH + laneH / 2;
        return (
          <g key={lane.id}>
            {/* Lane label */}
            <text x={padX} y={y - 4} fill="#0B6E79" fontSize="11" letterSpacing="2"
                  fontFamily="ui-monospace" fontWeight={600}>{lane.label}</text>
            <text x={padX} y={y + 14} fill="#94A3B8" fontSize="10" letterSpacing="1"
                  fontFamily="ui-monospace">LANE {li + 1}</text>

            {/* Nodes */}
            {lane.nodes.map((node, ni) => {
              const x = padX + labelW + ni * (nodeW + nodeGap);
              const cy = y - nodeH / 2;
              return (
                <g key={ni} aria-label={node} role="img">
                  <rect x={x} y={cy} width={nodeW} height={nodeH} rx={12}
                        fill="#FFFFFF" stroke="#DCE5EA" />
                  <text x={x + nodeW / 2} y={y + 4} textAnchor="middle"
                        fill="#0F172A" fontSize="13" fontWeight={600}>
                    {node}
                  </text>
                  {/* Arrow to next node in lane */}
                  {ni < lane.nodes.length - 1 && (
                    <line
                      x1={x + nodeW}
                      y1={y}
                      x2={x + nodeW + nodeGap - 2}
                      y2={y}
                      stroke="#0B6E79" strokeOpacity="0.55" strokeWidth="1.25"
                      markerEnd="url(#cnArrow)"
                    />
                  )}
                </g>
              );
            })}
          </g>
        );
      })}
    </svg>
  );
}

/* ---------------- Mobile: vertical stack ---------------- */
function MobileDiagram() {
  return (
    <div className="cn-workflow__svg-mobile" role="list">
      {LANES.map((lane) => (
        <div key={lane.id} role="listitem" style={{ marginBottom: 24 }}>
          <div style={{
            fontFamily: "ui-monospace",
            fontSize: 11,
            letterSpacing: "0.16em",
            color: "#0B6E79",
            fontWeight: 600,
            marginBottom: 10,
          }}>
            {lane.label}
          </div>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 8 }}>
            {lane.nodes.map((n, i) => (
              <li key={i}>
                <div style={{
                  border: "1px solid #DCE5EA",
                  background: "#FFFFFF",
                  borderRadius: 12,
                  padding: "14px 16px",
                  color: "#0F172A",
                  fontSize: 14,
                  fontWeight: 600,
                }}>
                  {n}
                </div>
                {i < lane.nodes.length - 1 && (
                  <div aria-hidden="true" style={{
                    height: 14,
                    width: 1,
                    background: "rgba(11,110,121,0.55)",
                    margin: "2px auto",
                  }} />
                )}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
