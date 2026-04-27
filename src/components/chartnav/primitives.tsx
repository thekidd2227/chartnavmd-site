import { forwardRef, type ReactNode, type ButtonHTMLAttributes, type AnchorHTMLAttributes } from "react";

// ---------- Eyebrow ----------
export function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="cn-eyebrow">{children}</p>;
}

// ---------- BrandText — two-tone "ChartNav" wordmark inline ----------
// Use inside any ChartNav-shell surface where the product name appears in
// running text and deserves the brand treatment. "Chart" inherits the
// surrounding text color; "Nav" renders in the primary teal accent.
//
// Set `tm` to append the ™ superscript. Reserve that for the first branded
// mention on a page (hero, footer lockup, top of a bridge/proof section).
// Don't spam ™ into every paragraph — it looks cheap.
//
// For meta, schema, aria-label, or any plain-text context, use the literal
// string "ChartNav" instead.
export function BrandText({ className = "", tm = false }: { className?: string; tm?: boolean }) {
  return (
    <span className={`cn-brand-text ${className}`.trim()}>
      <span className="cn-brand-text__a">Chart</span>
      <span className="cn-brand-text__b">Nav</span>
      {tm && <sup className="cn-brand-tm" aria-hidden="true">™</sup>}
    </span>
  );
}

// Shared helper — splits a string on the literal "ChartNav" token and wraps
// every occurrence with the two-tone <BrandText /> treatment. Pass `tmFirst`
// to add the ™ superscript to the first occurrence only.
export function withBrand(text: string, opts?: { tmFirst?: boolean }) {
  const tmFirst = opts?.tmFirst ?? false;
  let used = false;
  return text.split(/(ChartNav)/).map((part, i) => {
    if (part !== "ChartNav") return part;
    const showTm = tmFirst && !used;
    used = true;
    return <BrandText key={i} tm={showTm} />;
  });
}

// ---------- Skip Link ----------
export function SkipLink() {
  return (
    <a href="#cn-main" className="cn-skip-link">Skip to content</a>
  );
}

// ---------- Button ----------
type CNButtonVariant = "primary" | "ghost" | "text";
type BaseProps = {
  variant?: CNButtonVariant;
  children: ReactNode;
  className?: string;
};

type ButtonAsButton = BaseProps & ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };
type ButtonAsAnchor = BaseProps & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };
type ButtonProps = ButtonAsButton | ButtonAsAnchor;

export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  ({ variant = "primary", children, className = "", ...rest }, ref) => {
    const cls = `cn-btn cn-btn--${variant} ${className}`.trim();
    if ("href" in rest && rest.href) {
      return (
        <a
          ref={ref as React.Ref<HTMLAnchorElement>}
          className={cls}
          {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          {children}
        </a>
      );
    }
    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        type="button"
        className={cls}
        {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}
      >
        {children}
      </button>
    );
  }
);
Button.displayName = "CNButton";

// ---------- Icon set (inline, aria-hidden) ----------
type IconName =
  | "chart-break" | "schedule-gap" | "billing-late"
  | "chart" | "imaging" | "intake" | "schedule" | "comms"
  | "frontdesk" | "billing" | "report" | "roles"
  | "arrow-right";

export function IconGold({ name, size = 28 }: { name: IconName; size?: number }) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.25,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
    focusable: false,
  };
  switch (name) {
    case "chart-break":
      return (
        <svg {...common}><path d="M4 4v16h6" /><path d="M20 20h-6" /><path d="M14 10l-3 3" /><path d="M11 10l3 3" /></svg>
      );
    case "schedule-gap":
      return (
        <svg {...common}><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M3 9h18" /><path d="M8 3v4" /><path d="M16 3v4" /><path d="M10 15h4" /></svg>
      );
    case "billing-late":
      return (
        <svg {...common}><circle cx="12" cy="12" r="9" /><path d="M12 8v4l2.5 2" /></svg>
      );
    case "chart":
      return (
        <svg {...common}><path d="M6 3h9l4 4v14H6z" /><path d="M15 3v4h4" /><path d="M9 12h6" /><path d="M9 16h6" /></svg>
      );
    case "imaging":
      return (
        <svg {...common}><circle cx="12" cy="12" r="8" /><circle cx="12" cy="12" r="3" /><path d="M2 12h2" /><path d="M20 12h2" /><path d="M12 2v2" /><path d="M12 20v2" /></svg>
      );
    case "intake":
      return (
        <svg {...common}><path d="M8 3h8l2 3v13a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V6z" /><path d="M9 11h6" /><path d="M9 15h6" /></svg>
      );
    case "schedule":
      return (
        <svg {...common}><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M3 9h18" /><path d="M8 3v4" /><path d="M16 3v4" /></svg>
      );
    case "comms":
      return (
        <svg {...common}><path d="M4 5h16v11H8l-4 4z" /><path d="M8 10h8" /><path d="M8 13h5" /></svg>
      );
    case "frontdesk":
      return (
        <svg {...common}><path d="M3 20V8l9-4 9 4v12" /><path d="M3 20h18" /><path d="M10 20v-6h4v6" /></svg>
      );
    case "billing":
      return (
        <svg {...common}><rect x="3" y="6" width="18" height="12" rx="2" /><path d="M3 10h18" /><path d="M7 15h3" /></svg>
      );
    case "report":
      return (
        <svg {...common}><path d="M4 4v16h16" /><path d="M8 14v-4" /><path d="M12 14V8" /><path d="M16 14v-6" /></svg>
      );
    case "roles":
      return (
        <svg {...common}><circle cx="9" cy="9" r="3" /><circle cx="17" cy="10" r="2.5" /><path d="M3 19c0-2.5 3-5 6-5s6 2.5 6 5" /><path d="M14.5 19c.3-2 2-3.5 4-3.5s2.5 1 2.5 3.5" /></svg>
      );
    case "arrow-right":
      return (
        <svg {...common} width={16} height={16}><path d="M5 12h14" /><path d="M13 6l6 6-6 6" /></svg>
      );
  }
}
