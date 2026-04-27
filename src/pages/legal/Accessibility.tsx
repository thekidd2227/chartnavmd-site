import { LegalShell } from "./LegalShell";

export default function Accessibility() {
  return (
    <LegalShell
      title="Accessibility — ARCG Systems"
      description="Accessibility commitments for arcgsystems.com and the ChartNav marketing section, and how to reach us with feedback."
      canonical="/accessibility"
      lastUpdated="April 2026"
    >
      <p>
        ARCG Systems is committed to making arcgsystems.com and the ChartNav marketing section
        usable by the broadest possible audience, including people who rely on assistive
        technologies.
      </p>

      <h2>Our approach</h2>
      <p>
        We use the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA as our reference
        standard and work toward alignment with that standard across our public pages. Specific
        practices we apply to the ChartNav marketing surface include:
      </p>
      <ul>
        <li>
          <strong>Semantic structure.</strong> We use real headings, lists, tables, and landmarks
          so the page content is navigable by screen readers and keyboard users.
        </li>
        <li>
          <strong>Keyboard access.</strong> All interactive elements — navigation, modals, forms —
          are reachable and operable with a keyboard. Focus order is logical and focus rings are
          visible.
        </li>
        <li>
          <strong>Skip-to-content.</strong> A skip link is available on the ChartNav pages so
          keyboard users can bypass repeated navigation.
        </li>
        <li>
          <strong>Color and contrast.</strong> We design our body text to meet WCAG AA contrast
          targets and reserve bright signal colors for critical states.
        </li>
        <li>
          <strong>Reduced motion.</strong> The site honors the{" "}
          <code>prefers-reduced-motion</code> browser setting. When enabled, non-essential motion
          is disabled.
        </li>
        <li>
          <strong>Form labels and errors.</strong> Form fields are labeled, required fields are
          indicated, and validation errors are associated with their fields and announced to
          assistive technology.
        </li>
        <li>
          <strong>Alternative text.</strong> Meaningful images and diagrams have text alternatives,
          and our workflow diagram includes a plain-language description of the flow for screen
          reader users.
        </li>
      </ul>

      <h2>Known limitations</h2>
      <p>
        We test across modern browsers and common screen readers, but accessibility is an ongoing
        effort. If you encounter a barrier — a missing label, a trap in keyboard navigation, poor
        contrast, or any other issue — we want to know about it so we can address it.
      </p>

      <h2>Feedback and assistance</h2>
      <p>
        If any part of the site is not accessible to you, please contact us at{" "}
        <a href="mailto:info@arivergroup.com">info@arivergroup.com</a>. Include a description of
        the barrier, the page URL, and the assistive technology or browser you are using. We will
        respond promptly and work to provide the information you need in an accessible format.
      </p>

      <h2>Scope</h2>
      <p>
        This statement applies to the public ARCG Systems and ChartNav marketing surface. Accessibility
        commitments that apply to the ChartNav product within a deployed customer environment are
        addressed as part of the customer agreement and implementation plan.
      </p>
    </LegalShell>
  );
}
