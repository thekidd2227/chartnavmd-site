import { LegalShell } from "./LegalShell";

export default function Security() {
  return (
    <LegalShell
      title="Security — ARCG Systems"
      description="Security-minded design practices across ARCG Systems and ChartNav, and how to report vulnerabilities."
      canonical="/security"
      lastUpdated="April 2026"
    >
      <p>
        Security is a design requirement at ARCG Systems, not an afterthought. This page describes,
        in plain English, the security practices that apply to our marketing site and the
        security-minded principles that inform how ChartNav is designed for deployment into
        ophthalmology practices. It is written conservatively and does not claim certifications we
        have not earned.
      </p>

      <h2>Scope</h2>
      <p>
        This page covers two surfaces:
      </p>
      <ul>
        <li>
          <strong>Our public marketing site</strong> (arcgsystems.com and the ChartNav marketing
          section).
        </li>
        <li>
          <strong>The ChartNav product, at the design level</strong> — how it is built and how we
          approach deployments into healthcare environments. Specific controls applicable to a
          particular customer environment are addressed in that customer's written agreement,
          including, where applicable, a Business Associate Agreement (BAA).
        </li>
      </ul>

      <h2>Marketing site</h2>
      <ul>
        <li>
          The site is served over HTTPS with modern TLS. Submitted form data is encrypted in
          transit.
        </li>
        <li>
          We do not request or intend to receive Protected Health Information (PHI) through the
          marketing site. Please do not include patient identifiers or clinical details in demo or
          assessment submissions.
        </li>
        <li>
          We keep the number of third-party scripts on the site small and select providers we
          believe appropriate for a healthcare-oriented software company.
        </li>
        <li>
          Access to form submissions and analytics is limited to people inside ARCG Systems who need
          it to respond to inquiries and operate the business.
        </li>
      </ul>

      <h2>ChartNav — security-minded design</h2>
      <p>
        ChartNav is an ophthalmology-first platform designed for implementation in regulated
        healthcare environments. Our design approach is HIPAA-aware; it prioritizes least-privilege
        access, auditability, and careful data handling. We do not present these as legal
        conclusions; they describe how we build and deploy the product.
      </p>
      <ul>
        <li>
          <strong>Role-based access.</strong> The product is designed so that technicians, scanners,
          physicians, front-office staff, billers, and administrators see the screens appropriate
          to their scope, rather than a universal view.
        </li>
        <li>
          <strong>Audit trails.</strong> We treat the ability to attribute actions inside the
          system to a specific user as a first-class design requirement.
        </li>
        <li>
          <strong>Data in transit and at rest.</strong> We design for encryption in transit and
          for appropriate safeguards on stored data in customer environments.
        </li>
        <li>
          <strong>Least-privilege integrations.</strong> Where ChartNav connects to imaging devices,
          schedulers, or billing systems, we aim to request only the access required for the
          workflow being supported.
        </li>
        <li>
          <strong>Structured deployments.</strong> Every engagement begins with an assessment and a
          written plan before any configuration begins. This reduces the risk of an ad-hoc rollout
          introducing unsafe shortcuts.
        </li>
        <li>
          <strong>Change management.</strong> Product changes follow review and testing before
          release.
        </li>
      </ul>

      <h2>Business Associate Agreements</h2>
      <p>
        Where ChartNav is deployed in a manner that involves Protected Health Information on behalf
        of a covered entity, we will enter into a Business Associate Agreement with that customer
        before production use. BAAs are negotiated as part of the customer agreement and are not
        executed through the public marketing site.
      </p>

      <h2>What we do not claim</h2>
      <p>
        We do not claim on this page to be HIPAA "certified," SOC 2 certified, HITRUST certified,
        or to hold any other third-party certification unless and until such a status is actually
        earned and can be evidenced. When certifications or attestations are obtained, this page
        will be updated to reflect them accurately.
      </p>

      <h2>Reporting a vulnerability</h2>
      <p>
        If you believe you have found a security vulnerability in our marketing site or the
        ChartNav product, please email{" "}
        <a href="mailto:info@arivergroup.com">info@arivergroup.com</a> with a description of the
        issue, steps to reproduce, and any supporting materials. We ask that you:
      </p>
      <ul>
        <li>Give us a reasonable time to investigate and remediate before public disclosure.</li>
        <li>Avoid accessing or modifying data beyond what is necessary to demonstrate the issue.</li>
        <li>Do not perform denial-of-service testing against our production systems.</li>
      </ul>
      <p>
        We will acknowledge receipt promptly and keep you informed of progress where appropriate.
      </p>

      <h2>Contact</h2>
      <p>
        Security questions, BAA inquiries, or vulnerability reports:{" "}
        <a href="mailto:info@arivergroup.com">info@arivergroup.com</a>.
      </p>
    </LegalShell>
  );
}
