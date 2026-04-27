import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import { Button, BrandText } from "./primitives";
import { useForms } from "./FormsContext";
import { track } from "./submitLead";
import home from "@/content/chartnav/home.en.json";

/** Render any literal "ChartNav" token inside a nav label as the
 *  two-tone brand wordmark so "Why ChartNav" reads with the same
 *  styling the rest of the site uses. Plain labels pass through. */
function navLabel(label: string) {
  if (!label.includes("ChartNav")) return label;
  return label.split(/(ChartNav)/).map((part, i) =>
    part === "ChartNav" ? <BrandText key={i} /> : part
  );
}

export function StickyNav() {
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const { openFromAction, openAssessment } = useForms();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close drawer on Escape + lock scroll + restore focus to hamburger on close
  useEffect(() => {
    if (!drawerOpen) {
      // On close, return focus to the trigger so keyboard users don't lose place
      if (hamburgerRef.current && document.activeElement === document.body) {
        hamburgerRef.current.focus();
      }
      return;
    }
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setDrawerOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [drawerOpen]);

  const { links, ctaPrimary } = home.nav;

  const onPrimaryClick = () => {
    track("nav.cta_click", { label: "primary" });
    openFromAction(ctaPrimary.action);
  };

  return (
    <>
      <header className="cn-nav" data-scrolled={scrolled} role="banner">
        <div className="cn-nav__inner">
          <Link href="/chartnav" className="cn-brand" aria-label="ChartNav home">
            <img
              src="/chartnav/brand/chartnav-mark.svg"
              alt=""
              aria-hidden="true"
              className="cn-brand__icon"
              width="36"
              height="36"
              loading="eager"
              decoding="async"
            />
            <span className="cn-brand__text">
              <span className="cn-brand__mark">
                <span className="cn-brand__mark-a">Chart</span>
                <span className="cn-brand__mark-b">Nav</span>
                <sup className="cn-brand-tm" aria-hidden="true">™</sup>
              </span>
              <span className="cn-brand__sub">{home.nav.subBrand}</span>
            </span>
          </Link>

          <nav aria-label="Primary">
            <ul className="cn-nav__links">
              {links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href}>{navLabel(l.label)}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="cn-nav__cta">
            <Button variant="primary" onClick={onPrimaryClick}>{ctaPrimary.label}</Button>
            <button
              ref={hamburgerRef}
              type="button"
              className="cn-hamburger"
              aria-label="Open menu"
              aria-expanded={drawerOpen}
              onClick={() => setDrawerOpen(true)}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <path d="M4 7h16" /><path d="M4 12h16" /><path d="M4 17h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {drawerOpen && (
        <div className="cn-drawer" role="dialog" aria-modal="true" aria-label="Menu">
          <button
            type="button"
            className="cn-drawer__close"
            onClick={() => setDrawerOpen(false)}
            aria-label="Close menu"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <path d="M6 6l12 12M18 6l-12 12" />
            </svg>
          </button>
          <ul className="cn-drawer__list">
            {links.map((l) => (
              <li key={l.href}>
                <Link href={l.href} onClick={() => setDrawerOpen(false)}>{navLabel(l.label)}</Link>
              </li>
            ))}
          </ul>
          <div className="cn-drawer__actions">
            <Button
              variant="primary"
              onClick={() => {
                setDrawerOpen(false);
                track("nav.cta_click", { label: "mobile" });
                openAssessment();
              }}
            >
              Request a Workflow Assessment
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
