import { LegalShell } from "./LegalShell";

export default function Privacy() {
  return (
    <LegalShell
      title="Privacy Policy — ARCG Systems"
      description="How ARCG Systems and ChartNav collect, use, and safeguard information, including demo and assessment submissions."
      canonical="/privacy"
      lastUpdated="April 2026"
    >
      <p>
        ARCG Systems ("<strong>we</strong>," "<strong>us</strong>," "<strong>our</strong>") operates
        arcgsystems.com and the ChartNav product section at <a href="/chartnav">/chartnav</a>. This
        Privacy Policy explains what information we collect when you visit the site or submit a form,
        how we use it, and your choices. It is written in plain English and applies to visitors to our
        marketing and lead-capture surfaces.
      </p>

      <p>
        This policy describes the handling of information we receive through our own marketing
        website. It does <strong>not</strong> govern any production ChartNav clinical software
        environment provided to a customer practice; that is addressed separately in a written
        customer agreement, including, where applicable, a Business Associate Agreement (BAA).
      </p>

      <h2>1. Information we collect</h2>

      <h3>Information you submit voluntarily</h3>
      <ul>
        <li>
          <strong>Workflow assessment forms.</strong> When you click "Request a Workflow
          Assessment," we collect the information you provide — for example, name, work email,
          phone (optional), practice or organization name, role, number of locations or providers,
          subspecialties, a brief description of current systems, timeline, and any message you
          include.
        </li>
        <li>
          <strong>Email correspondence.</strong> If you write to us at{" "}
          <a href="mailto:info@arivergroup.com">info@arivergroup.com</a>, we receive your email
          address and the contents of your message.
        </li>
      </ul>

      <h3>Information collected automatically</h3>
      <ul>
        <li>
          <strong>Basic usage data.</strong> Like most sites, our hosting and analytics tools may
          record standard request metadata (IP address, browser type, referring URL, pages viewed,
          and approximate timing).
        </li>
        <li>
          <strong>Marketing attribution parameters.</strong> When you arrive from a link with UTM
          parameters, we capture those values so we can understand which campaigns and referrers
          drive qualified interest. We do not combine these parameters with identifiers that reveal
          a specific individual beyond what you have already provided to us.
        </li>
      </ul>

      <h3>Protected Health Information (PHI)</h3>
      <p>
        Our marketing site is <strong>not intended</strong> to receive PHI. Please do not include
        patient identifiers, clinical details, or any information about an identifiable individual
        patient in a demo or assessment submission. If you believe PHI was inadvertently submitted,
        contact us at <a href="mailto:info@arivergroup.com">info@arivergroup.com</a> and we will
        promptly delete it from our marketing systems.
      </p>

      <h2>2. How we use information</h2>
      <ul>
        <li>To respond to your demo or assessment request and schedule follow-up.</li>
        <li>To operate, maintain, and improve the site and ChartNav's marketing content.</li>
        <li>
          To communicate with you about the ChartNav product or ARCG Systems services you have
          expressed interest in. We do not send unsolicited bulk marketing.
        </li>
        <li>To comply with legal obligations and enforce our terms.</li>
      </ul>

      <h2>3. Cookies and analytics</h2>
      <p>
        We use a small number of cookies and similar technologies that are necessary for the site to
        function, and privacy-respecting analytics to understand aggregate traffic patterns. We do
        not sell personal information. Where analytics is configured, no form field values are
        included in analytics event payloads — only the name of the field that was interacted with
        or failed validation.
      </p>

      <h2>4. Third-party services</h2>
      <p>
        We rely on a small set of service providers to operate the site. These currently include,
        or may include:
      </p>
      <ul>
        <li>A hosting provider for the marketing site.</li>
        <li>An email provider for correspondence.</li>
        <li>A form-routing or CRM provider that receives demo and assessment submissions.</li>
        <li>A web analytics provider that reports aggregate traffic.</li>
      </ul>
      <p>
        Each of these providers processes information subject to its own terms and security
        practices. We select providers we believe are appropriate for a healthcare-oriented software
        company and keep the list intentionally small.
      </p>

      <h2>5. How long we retain information</h2>
      <p>
        We retain demo and assessment submissions for as long as we are actively evaluating a
        potential engagement and for a reasonable period afterward for business-record purposes.
        You can ask us to delete your submission at any time by contacting the address below.
      </p>

      <h2>6. Security</h2>
      <p>
        We take appropriate administrative, technical, and organizational safeguards to protect the
        information we receive from the marketing site, consistent with the sensitivity of that
        information. See our <a href="/security">Security</a> page for a more detailed description
        of our security-minded design approach. No system is perfectly secure; please do not use the
        marketing site to transmit information that requires formal healthcare safeguards.
      </p>

      <h2>7. Your choices</h2>
      <ul>
        <li>
          <strong>Access, correction, deletion.</strong> You can ask us to access, correct, or delete
          information you have submitted. Reasonable requests will be honored promptly.
        </li>
        <li>
          <strong>Do Not Track.</strong> Our site does not currently respond to browser "Do Not
          Track" signals. Where feasible, we minimize tracking by default.
        </li>
      </ul>

      <h2>8. Children</h2>
      <p>
        The site is intended for healthcare and business audiences. It is not directed to children
        under 13, and we do not knowingly collect information from children.
      </p>

      <h2>9. Changes to this policy</h2>
      <p>
        We may update this policy from time to time. The "Last updated" date at the top of the page
        reflects the most recent revision. Material changes will be reflected at the top of this
        page.
      </p>

      <h2>10. Contact</h2>
      <p>
        Questions about this Privacy Policy or requests regarding your information:{" "}
        <a href="mailto:info@arivergroup.com">info@arivergroup.com</a>.
      </p>
    </LegalShell>
  );
}
