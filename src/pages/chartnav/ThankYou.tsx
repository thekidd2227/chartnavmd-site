import { ChartnavShell } from "@/components/chartnav/ChartnavShell";
import { Eyebrow, Button, BrandText, IconGold } from "@/components/chartnav/primitives";

export default function ChartnavThankYou() {
  return (
    <ChartnavShell
      title="Thank You — ChartNav"
      description="We received your request. A member of the ChartNav team will be in touch shortly."
      canonical="/chartnav/thank-you"
      noIndex
    >
      <section className="cn-thanks">
        <div className="cn-container">
          <Eyebrow>RECEIVED</Eyebrow>
          <h1>Thank you — we'll be in touch.</h1>
          <p>
            A member of the <BrandText /> team will reach out within one business day
            to schedule your conversation. All inquiries are handled privately.
          </p>
          <Button variant="ghost" href="/chartnav">
            Back to <BrandText /> <IconGold name="arrow-right" size={16} />
          </Button>
        </div>
      </section>
    </ChartnavShell>
  );
}
