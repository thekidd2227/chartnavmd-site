import { useParams, Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, ArrowLeft, AlertCircle, BookOpen } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Seo } from "@/components/Seo";
import { insightPages } from "@/data/insightPageData";

export default function SeoInsightPage() {
  const { slug } = useParams<{ slug: string }>();
  const data = slug ? insightPages[slug] : null;

  if (!data) {
    return (
      <Layout>
        <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 bg-[#0A0C12]">
          <AlertCircle className="w-16 h-16 text-[#C9941A] mb-6" />
          <h1 className="text-4xl font-bold text-white mb-4">Article Not Found</h1>
          <p className="text-[#A8B2BE] mb-8">The article you're looking for doesn't exist or has been moved.</p>
          <Link href="/" className="px-6 py-3 rounded-full bg-[#C9941A] text-[#0A0C12] font-bold">Return Home</Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <Seo title={data.seo.title} description={data.seo.description} />

      {/* ── HERO ── */}
      <section className="relative pt-32 pb-16 px-4 overflow-hidden bg-[#0A0C12] bg-grid-pattern">
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-[#1A6FA8]/5 rounded-full blur-[130px] pointer-events-none -translate-x-1/3 -translate-y-1/3" />

        <div className="max-w-3xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
          >
            <Link href="/" className="inline-flex items-center gap-2 text-[#A8B2BE] hover:text-[#C9941A] text-sm font-semibold mb-8 transition-colors">
              <ArrowLeft className="w-4 h-4" /> Back to Home
            </Link>

            <div className="flex items-center gap-3 mb-6">
              <BookOpen className="w-4 h-4 text-[#C9941A]" />
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#C9941A]">{data.category}</span>
              <span className="text-[#A8B2BE]/40">·</span>
              <span className="text-[11px] text-[#A8B2BE]/60 font-medium">{data.readTime}</span>
            </div>

            <h1 className="text-3xl md:text-4xl font-display font-black text-white tracking-[-0.02em] leading-tight mb-7">
              {data.title}
            </h1>

            <p className="text-lg text-[#A8B2BE] leading-relaxed border-l-2 border-[#C9941A]/40 pl-5">
              {data.intro}
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── ARTICLE BODY ── */}
      <section className="py-16 px-4 bg-[#0A0C12] border-t border-white/5">
        <div className="max-w-3xl mx-auto space-y-14">
          {data.sections.map((section, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.05 }}
            >
              <h2 className="text-xl md:text-2xl font-display font-black text-white leading-tight mb-5">
                {section.h2}
              </h2>

              <div className="space-y-4">
                {section.paragraphs.map((p, j) => {
                  const rendered = renderWithLinks(p, data.internalLinks);
                  return (
                    <p key={j} className="text-[#A8B2BE] leading-relaxed text-base" dangerouslySetInnerHTML={{ __html: rendered }} />
                  );
                })}
              </div>

              {section.list && (
                <ul className="mt-6 space-y-3">
                  {section.list.map((item, k) => (
                    <li key={k} className="flex items-start gap-4 group">
                      <span className="font-mono text-[10px] text-[#C9941A]/50 shrink-0 mt-1.5">—</span>
                      <span className="text-[#A8B2BE] text-sm leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── INTERNAL LINKS ── */}
      <section className="py-10 px-4 bg-[#0A0C12] border-t border-white/5">
        <div className="max-w-3xl mx-auto">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#A8B2BE]/40 mb-4">Related Services</p>
          <div className="flex flex-wrap gap-3">
            {data.internalLinks.map((link, i) => (
              <Link
                key={i}
                href={link.href}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/8 bg-white/[0.02] hover:border-[#C9941A]/30 hover:bg-[#C9941A]/5 text-sm text-[#A8B2BE] hover:text-[#C9941A] font-semibold transition-all"
              >
                {link.text} <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 relative text-center px-4 bg-[#0A0C12] overflow-hidden border-t border-white/5">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#C9941A]/6 rounded-full blur-[130px] pointer-events-none" />

        <div className="max-w-2xl mx-auto relative z-10">
          <div className="inline-block px-4 py-1.5 rounded-full border border-[#C9941A]/30 bg-[#C9941A]/5 mb-6">
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#C9941A]">Build My Plan</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-black text-white tracking-tight mb-5 leading-tight">
            {data.cta.headline}
          </h2>
          <p className="text-[#A8B2BE] text-lg mb-10 leading-relaxed">
            {data.cta.body}
          </p>
          <Link
            href="/assessment"
            className="inline-flex items-center justify-center gap-3 px-8 sm:px-10 py-4 sm:py-5 rounded-full bg-[#C9941A] text-[#0A0C12] font-black text-base sm:text-lg shadow-[0_0_40px_rgba(201,148,26,0.3)] hover:shadow-[0_0_70px_rgba(201,148,26,0.6)] hover:-translate-y-0.5 transition-all duration-300 w-full sm:w-auto"
          >
            Create My Plan <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </Layout>
  );
}

function renderWithLinks(text: string, links: { text: string; href: string }[]): string {
  let result = text;
  for (const link of links) {
    if (result.includes(link.text)) {
      result = result.replace(
        link.text,
        `<a href="${link.href}" class="text-[#C9941A] hover:text-[#C9941A]/80 font-semibold underline underline-offset-4 decoration-[#C9941A]/30 transition-colors">${link.text}</a>`
      );
    }
  }
  return result;
}
