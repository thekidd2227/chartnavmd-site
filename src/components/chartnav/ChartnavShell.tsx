import { useEffect, type ReactNode } from "react";
import { Helmet } from "react-helmet-async";
import { FormsProvider } from "./FormsContext";
import { StickyNav } from "./StickyNav";
import { Footer } from "./Footer";
import { SkipLink } from "./primitives";
import { CHARTNAV_BASE_URL, CHARTNAV_OG_IMAGE } from "@/content/chartnav/config";
import "./chartnav.css";

type ShellProps = {
  title: string;
  description: string;
  canonical: string;
  ogImage?: string;
  noIndex?: boolean;
  jsonLd?: Record<string, unknown> | Array<Record<string, unknown>>;
  children: ReactNode;
};

export function ChartnavShell({
  title,
  description,
  canonical,
  ogImage = CHARTNAV_OG_IMAGE,
  noIndex = false,
  jsonLd,
  children,
}: ShellProps) {
  const url = canonical.startsWith("http") ? canonical : `${CHARTNAV_BASE_URL}${canonical}`;

  // Scroll handling:
  // - on route mount: if URL has #hash, scroll that element; else scroll to top.
  // - on subsequent hashchange (in-page anchor nav): scroll that element into view.
  useEffect(() => {
    const scrollToHashOrTop = () => {
      const hash = window.location.hash;
      if (hash && hash.length > 1) {
        requestAnimationFrame(() => {
          const el = document.querySelector(hash);
          if (el) {
            el.scrollIntoView({ behavior: "instant" as ScrollBehavior, block: "start" });
          } else {
            window.scrollTo(0, 0);
          }
        });
      } else {
        window.scrollTo(0, 0);
      }
    };
    scrollToHashOrTop();
    window.addEventListener("hashchange", scrollToHashOrTop);
    return () => window.removeEventListener("hashchange", scrollToHashOrTop);
  }, [canonical]);

  // Mark body for brand-scoped CSS (e.g. hide ARCG chat widget on Chartnav)
  useEffect(() => {
    document.body.classList.add("chartnav-active");
    return () => document.body.classList.remove("chartnav-active");
  }, []);

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="theme-color" content="#0A0B0D" />
        <link rel="canonical" href={url} />
        {noIndex && <meta name="robots" content="noindex, nofollow" />}

        <meta property="og:type" content="website" />
        <meta property="og:url" content={url} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:site_name" content="Chartnav" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={ogImage} />

        {jsonLd && (
          <script type="application/ld+json">
            {JSON.stringify(Array.isArray(jsonLd) ? jsonLd : [jsonLd])}
          </script>
        )}
      </Helmet>

      <div className="chartnav-root">
        <FormsProvider>
          <SkipLink />
          <StickyNav />
          <main id="cn-main" style={{ flex: 1 }}>
            {children}
          </main>
          <Footer />
        </FormsProvider>
      </div>
    </>
  );
}
