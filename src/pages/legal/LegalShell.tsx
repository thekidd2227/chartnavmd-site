import { type ReactNode } from "react";
import { Helmet } from "react-helmet-async";
import { Layout } from "@/components/layout/Layout";

type Props = {
  title: string;
  description: string;
  canonical: string;
  lastUpdated: string; // e.g. "April 2026"
  children: ReactNode;
};

const BASE_URL = "https://arcgsystems.com";

/**
 * Shared shell for the simple legal/policy pages (Privacy, Terms, Security,
 * Accessibility). Uses the existing ARCG site Layout so these pages look
 * native to the rest of the site.
 */
export function LegalShell({ title, description, canonical, lastUpdated, children }: Props) {
  const url = canonical.startsWith("http") ? canonical : `${BASE_URL}${canonical}`;
  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={url} />
        <meta name="robots" content="index,follow" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={url} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
      </Helmet>
      <Layout>
        <article className="max-w-3xl mx-auto px-5 sm:px-6 lg:px-8 py-24 sm:py-28 w-full">
          <header className="mb-10">
            <p className="text-[11px] tracking-[0.18em] uppercase text-[#C9941A] font-semibold mb-3">
              Legal
            </p>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
              {title.replace(" — ARCG Systems", "")}
            </h1>
            <p className="text-sm text-[#A8B2BE] mt-3">
              Last updated: {lastUpdated}
            </p>
          </header>

          <div className="prose prose-invert prose-headings:tracking-tight prose-headings:text-white prose-p:text-[#C8CED8] prose-li:text-[#C8CED8] prose-a:text-[#C9941A] prose-a:no-underline hover:prose-a:underline prose-strong:text-white max-w-none text-[15.5px] leading-relaxed">
            {children}
          </div>
        </article>
      </Layout>
    </>
  );
}
