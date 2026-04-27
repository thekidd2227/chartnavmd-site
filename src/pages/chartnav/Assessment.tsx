import { ChartnavShell } from "@/components/chartnav/ChartnavShell";
import { Eyebrow } from "@/components/chartnav/primitives";
import { AssessmentForm } from "@/components/chartnav/AssessmentForm";

export default function ChartnavAssessment() {
  return (
    <ChartnavShell
      title="Request a Workflow Assessment — ChartNav"
      description="Request an ophthalmology workflow review. We assess your intake, scheduling, charting, imaging, and billing flow to determine implementation fit and rollout scope."
      canonical="/chartnav/assessment"
    >
      <section className="cn-section">
        <div className="cn-container" style={{ maxWidth: 720 }}>
          <Eyebrow>WORKFLOW ASSESSMENT</Eyebrow>
          <h1 style={{ marginTop: 12, marginBottom: 16 }}>
            Start with a workflow review, not a sign-up.
          </h1>
          <p style={{ color: "var(--color-text-secondary)", fontSize: 17, marginBottom: 20 }}>
            A short, ophthalmology-focused review of how your clinic day actually
            runs — intake, scheduling, charting, imaging, and billing. It takes
            a few minutes and gives us enough to respond with a real view of fit,
            rollout scope, and the clearest next step.
          </p>
          <p style={{ color: "var(--color-text-muted)", fontSize: 14, marginBottom: 32 }}>
            ChartNav is focused on ophthalmology practices today. If you're in
            another specialty, you can still complete the short version — we use
            it to gauge demand as we expand.
          </p>
          <div
            style={{
              background: "var(--color-surface)",
              border: "1px solid var(--color-border)",
              borderRadius: 16,
              padding: 28,
            }}
          >
            <AssessmentForm onSuccess={() => {}} />
          </div>
        </div>
      </section>
    </ChartnavShell>
  );
}
