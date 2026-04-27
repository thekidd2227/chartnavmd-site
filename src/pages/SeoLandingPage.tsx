import { useLocation, Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, ArrowLeft, AlertCircle, CheckCircle2 } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Seo } from "@/components/Seo";
import { servicePages } from "@/data/servicePageData";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export default function SeoLandingPage() {
  const [location] = useLocation();
  const slug = location.replace(/^\//, "");
  const data = servicePages[slug];

  if (!data) {
    return (
      <Layout>
        <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 bg-[#0A0C12]">
          <AlertCircle className="w-16 h-16 text-[#C9941A] mb-6" />
          <h1 className="text-4xl font-bold text-white mb-4">Page Not Found</h1>
          <p className="text-[#A8B2BE] mb-8">The page you're looking for doesn't exist or has been moved.</p>
          <Link href="/" className="px-6 py-3 rounded-full bg-[#C9941A] text-[#0A0C12] font-bold">Return Home</Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <Seo title={data.seo.title} description={data.seo.description} />

      {/* ── HERO ── */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden bg-[#0A0C12] bg-grid-pattern">
        <div className="absolute top-0 left-0 w-[700px] h-[700px] bg-[#C9941A]/5 rounded-full blur-[140px] pointer-events-none -translate-x-1/3 -translate-y-1/3" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#1A6FA8]/5 rounded-full blur-[100px] pointer-events-none translate-x-1/4 translate-y-1/4" />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.45 }}>
            <Link href="/" className="inline-flex items-center gap-2 text-[#A8B2BE] hover:text-[#C9941A] text-sm font-semibold mb-8 transition-colors">
              <ArrowLeft className="w-4 h-4" /> Back to Home
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#C9941A]/30 bg-[#C9941A]/5 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C9941A]" />
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#C9941A]">{data.hero.eyebrow}</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-display font-black text-white tracking-[-0.03em] leading-tight mb-7">
              {data.hero.h1}
            </h1>
            <p className="text-lg text-[#A8B2BE] leading-relaxed max-w-3xl mx-auto">
              {data.hero.intro}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              href="/assessment"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#C9941A] text-[#0A0C12] font-black text-base shadow-[0_0_30px_rgba(201,148,26,0.35)] hover:shadow-[0_0_55px_rgba(201,148,26,0.55)] hover:-translate-y-0.5 transition-all duration-300"
            >
              Create My Plan <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── PROBLEM ── */}
      <section className="py-20 px-4 bg-[#0A0C12] border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="grid md:grid-cols-2 gap-12 items-start"
          >
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#C9941A] mb-5">The Problem</p>
              <h2 className="text-2xl md:text-3xl font-display font-black text-white leading-tight mb-5">
                {data.problem.headline}
              </h2>
              <p className="text-[#A8B2BE] leading-relaxed text-base">{data.problem.body}</p>
            </div>

            <div className="glass-panel rounded-2xl border border-white/5 overflow-hidden">
              <div className="px-6 py-4 border-b border-white/5">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#A8B2BE]/60">Common Failure Points</span>
              </div>
              <ul className="divide-y divide-white/5">
                {data.problem.points.map((pt, i) => (
                  <li key={i} className="flex items-start gap-4 px-6 py-4 group hover:bg-white/[0.02] transition-colors">
                    <span className="font-mono text-[10px] text-[#C9941A]/50 shrink-0 mt-1">0{i + 1}</span>
                    <span className="text-[#A8B2BE] text-sm leading-relaxed group-hover:text-white/80 transition-colors">{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── SYSTEM ── */}
      <section className="py-20 px-4 bg-[#0A0C12] border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
          >
            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#C9941A] mb-5">The System</p>
            <h2 className="text-2xl md:text-3xl font-display font-black text-white leading-tight mb-5 max-w-3xl">
              {data.system.headline}
            </h2>
            <p className="text-[#A8B2BE] leading-relaxed text-base max-w-3xl mb-12">{data.system.body}</p>

            <div className="grid sm:grid-cols-2 gap-5">
              {data.system.items.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: i * 0.08 }}
                  className="glass-panel p-6 rounded-2xl border border-white/5 hover:border-[#C9941A]/15 transition-colors group"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <CheckCircle2 className="w-4 h-4 text-[#C9941A] shrink-0" />
                    <span className="font-bold text-white text-sm">{item.title}</span>
                  </div>
                  <p className="text-[#A8B2BE] text-sm leading-relaxed">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── OUTCOME ── */}
      <section className="py-20 px-4 bg-[#0A0C12] border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
          >
            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#C9941A] mb-5">Outcome</p>
            <h2 className="text-2xl md:text-3xl font-display font-black text-white leading-tight mb-12">
              {data.outcome.headline}
            </h2>

            <div className="grid sm:grid-cols-3 gap-6">
              {data.outcome.metrics.map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: i * 0.1 }}
                  className="glass-panel p-8 rounded-2xl border border-white/5 text-center"
                >
                  <div className="text-3xl font-display font-black text-gradient-gold mb-1">{m.value}</div>
                  <div className="text-xs font-bold uppercase tracking-[0.2em] text-[#A8B2BE] mb-3">{m.label}</div>
                  <p className="text-[#A8B2BE]/70 text-xs leading-relaxed">{m.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── IMPLEMENTATION ── */}
      <section className="py-20 px-4 bg-[#0A0C12] border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
          >
            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#C9941A] mb-5">Implementation</p>
            <h2 className="text-2xl md:text-3xl font-display font-black text-white leading-tight mb-12">
              {data.implementation.headline}
            </h2>

            <div className="space-y-4">
              {data.implementation.steps.map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: i * 0.08 }}
                  className="glass-panel p-6 rounded-2xl border border-white/5 flex items-start gap-6 hover:border-[#C9941A]/15 transition-colors group"
                >
                  <span className="font-mono text-2xl font-black text-[#C9941A]/30 shrink-0 group-hover:text-[#C9941A]/60 transition-colors">{step.step}</span>
                  <div>
                    <p className="font-bold text-white text-sm mb-1">{step.title}</p>
                    <p className="text-[#A8B2BE] text-sm leading-relaxed">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── RELATED LINKS ── */}
      <section className="py-10 px-4 bg-[#0A0C12] border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#A8B2BE]/40 mr-2">Related</span>
            {data.relatedLinks.map((link, i) => (
              <Link
                key={i}
                href={link.href}
                className="text-sm text-[#1A6FA8] hover:text-[#C9941A] font-semibold transition-colors underline underline-offset-4 decoration-[#1A6FA8]/30 hover:decoration-[#C9941A]/50"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── CLOSING CTA ── */}
      <section className="py-24 relative text-center px-4 bg-[#0A0C12] overflow-hidden border-t border-white/5">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#C9941A]/6 rounded-full blur-[130px] pointer-events-none" />

        <div className="max-w-3xl mx-auto relative z-10">
          <div className="inline-block px-4 py-1.5 rounded-full border border-[#C9941A]/30 bg-[#C9941A]/5 mb-6">
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#C9941A]">Build My Plan</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-black text-white tracking-tight mb-5 leading-tight">
            {data.cta.headline}
          </h2>
          <p className="text-[#A8B2BE] text-lg mb-10 max-w-xl mx-auto leading-relaxed">
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
