import { Link } from "wouter";
import { BrandText } from "./primitives";
import { CHARTNAV_CONTACT_EMAIL, CHARTNAV_LEGAL_LINKS } from "@/content/chartnav/config";
import home from "@/content/chartnav/home.en.json";

type LinkDef = { label: string; href: string };

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  // External (http/mailto/tel) → native <a>; internal → wouter Link.
  if (/^(https?:|mailto:|tel:)/i.test(href)) {
    const rel = href.startsWith("http") ? "noopener noreferrer" : undefined;
    const target = href.startsWith("http") ? "_blank" : undefined;
    return (
      <a href={href} rel={rel} target={target}>
        {children}
      </a>
    );
  }
  return <Link href={href}>{children}</Link>;
}

export function Footer() {
  const { groups } = home.footer;
  // The legal line text is assembled inline below using the shared BrandText
  // treatment, so `home.footer.legal.line` is no longer rendered from JSON.

  const legalLinks: LinkDef[] = [
    { label: "Privacy",       href: CHARTNAV_LEGAL_LINKS.privacy },
    { label: "Terms",         href: CHARTNAV_LEGAL_LINKS.terms },
    { label: "Security",      href: CHARTNAV_LEGAL_LINKS.security },
    { label: "Accessibility", href: CHARTNAV_LEGAL_LINKS.accessibility },
  ];

  return (
    <footer className="cn-footer" role="contentinfo">
      <div className="cn-container">
        {/* Brand lockup — pulse mark + two-tone "ChartNav™" wordmark. */}
        <Link href="/chartnav" className="cn-footer__brand" aria-label="ChartNav home">
          <img
            src="/chartnav/brand/chartnav-mark.svg"
            alt=""
            aria-hidden="true"
            className="cn-footer__brand-mark"
            width="44"
            height="44"
            loading="lazy"
            decoding="async"
          />
          <span className="cn-footer__brand-text">
            <span className="cn-footer__brand-wordmark">
              <BrandText tm />
            </span>
            <span className="cn-footer__brand-caption">by ARCG Systems</span>
          </span>
        </Link>

        <div className="cn-footer__grid">
          {groups.map((g) => (
            <div className="cn-footer__group" key={g.title}>
              <h4>{g.title}</h4>
              <ul>
                {g.links.map((l) => (
                  <li key={`${g.title}-${l.label}`}>
                    <FooterLink href={l.href}>{l.label}</FooterLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="cn-footer__legal">
          <span className="cn-footer__legal-line">
            <BrandText /> is built by{" "}
            <a
              href="https://arcgsystems.com/"
              rel="noopener noreferrer"
              target="_blank"
            >
              ARCG Systems
            </a>
            . · © 2026 ARCG Systems.
            <a
              href={`mailto:${CHARTNAV_CONTACT_EMAIL}`}
              className="cn-footer__legal-email"
            >
              {CHARTNAV_CONTACT_EMAIL}
            </a>
          </span>
          <ul>
            {legalLinks.map((l) => (
              <li key={l.label}>
                <FooterLink href={l.href}>{l.label}</FooterLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
