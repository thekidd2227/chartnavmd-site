import { Link } from "wouter";
import { motion } from "framer-motion";
import { Search, ClipboardList, Layers, ArrowRight, Target, FileText, CheckCircle } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};
const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

export default function Diagnostics() {
  const { t } = useTranslation();

  const pillars = [
    { icon: <Search className="w-7 h-7" />, title: t("diagnostics.p1title"), desc: t("diagnostics.p1desc") },
    { icon: <ClipboardList className="w-7 h-7" />, title: t("diagnostics.p2title"), desc: t("diagnostics.p2desc") },
    { icon: <FileText className="w-7 h-7" />, title: t("diagnostics.p3title"), desc: t("diagnostics.p3desc") },
    { icon: <Layers className="w-7 h-7" />, title: t("diagnostics.p4title"), desc: t("diagnostics.p4desc") },
  ];

  const stats = [
    { metric: t("diagnostics.stat1m"), label: t("diagnostics.stat1l") },
    { metric: t("diagnostics.stat2m"), label: t("diagnostics.stat2l") },
    { metric: t("diagnostics.stat3m"), label: t("diagnostics.stat3l") },
    { metric: t("diagnostics.stat4m"), label: t("diagnostics.stat4l") },
  ];

  const steps = [
    { icon: <Search className="w-6 h-6" />, num: t("diagnostics.s1num"), title: t("diagnostics.s1title"), desc: t("diagnostics.s1desc") },
    { icon: <ClipboardList className="w-6 h-6" />, num: t("diagnostics.s2num"), title: t("diagnostics.s2title"), desc: t("diagnostics.s2desc") },
    { icon: <CheckCircle className="w-6 h-6" />, num: t("diagnostics.s3num"), title: t("diagnostics.s3title"), desc: t("diagnostics.s3desc") },
  ];

  const flows = [
    { flow: t("diagnostics.f1flow"), title: t("diagnostics.f1title"), q: t("diagnostics.f1q") },
    { flow: t("diagnostics.f2flow"), title: t("diagnostics.f2title"), q: t("diagnostics.f2q") },
    { flow: t("diagnostics.f3flow"), title: t("diagnostics.f3title"), q: t("diagnostics.f3q") },
    { flow: t("diagnostics.f4flow"), title: t("diagnostics.f4title"), q: t("diagnostics.f4q") },
    { flow: t("diagnostics.f5flow"), title: t("diagnostics.f5title"), q: t("diagnostics.f5q") },
    { flow: t("diagnostics.f6flow"), title: t("diagnostics.f6title"), q: t("diagnostics.f6q") },
  ];

  return (
    <Layout>
      <Helmet>
        <title>Operational Waste Diagnostic | ARCG Systems</title>
        <meta name="description" content="ARCG's Operational Waste Diagnostic maps where your operation leaks time, money, visibility, and accountability. We expose breakdowns, score them by impact, and produce a formal blueprint before a single line of code is written." />
        <meta name="keywords" content="operational waste diagnostic, workflow audit, operations diagnosis, operational intelligence, business process blueprint, workflow analysis" />
        <link rel="canonical" href="https://arcgsystems.com/diagnostics" />
        <meta property="og:title" content="Operational Waste Diagnostic | ARCG Systems" />
        <meta property="og:description" content="Diagnose → Prioritize → Blueprint → Build. Clarity before software. Blueprint before build." />
        <meta property="og:url" content="https://arcgsystems.com/diagnostics" />
        <meta property="og:type" content="website" />
      </Helmet>

      {/* HERO */}
      <section className="relative min-h-[75vh] flex items-center pt-32 pb-20 overflow-hidden bg-[#0A0C12] bg-grid-pattern">
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-[#C9941A]/6 rounded-full blur-[130px] pointer-events-none -translate-x-1/3 -translate-y-1/3" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#1A6FA8]/6 rounded-full blur-[130px] pointer-events-none translate-x-1/4 translate-y-1/4" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div initial="hidden" animate="visible" variants={stagger} className="space-y-8">
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0A0C12] border border-[#C9941A] mx-auto">
              <Target className="w-4 h-4 text-[#C9941A]" />
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#C9941A]">{t("diagnostics.badge")}</span>
            </motion.div>
            <motion.h1 variants={fadeUp} className="text-5xl md:text-6xl lg:text-7xl font-display font-black tracking-[-0.04em] leading-[1.05] text-white">
              {t("diagnostics.h1a")}<br />
              {t("diagnostics.h1b")}<br />
              <span className="text-gradient-gold">{t("diagnostics.h1c")}</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="text-xl text-[#A8B2BE] max-w-3xl mx-auto leading-relaxed">
              {t("diagnostics.sub")}
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-4 pt-2">
              <Link href="/assessment" className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#C9941A] text-[#0A0C12] font-black text-base shadow-[0_0_40px_rgba(201,148,26,0.3)] hover:shadow-[0_0_70px_rgba(201,148,26,0.6)] hover:-translate-y-0.5 transition-all duration-300">
                {t("diagnostics.cta")} <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* STATS */}
      <section className="bg-[#0A0C12] py-10 relative">
        <div className="absolute top-0 inset-x-0 section-divider" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((s, i) => (
              <div key={i} className="glass-panel p-5 rounded-xl text-center">
                <div className="text-3xl font-display font-black text-gradient-gold mb-1">{s.metric}</div>
                <div className="text-xs font-semibold text-[#A8B2BE] uppercase tracking-wider">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="absolute bottom-0 inset-x-0 section-divider" />
        <p className="text-center text-sm text-[#A8B2BE]/60 font-medium mt-6 pb-2 max-w-xl mx-auto px-4">
          {t("diagnostics.statsLabel")}
        </p>
      </section>

      {/* GUARDRAIL */}
      <section className="py-16 bg-[#0A0C12]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass-panel rounded-2xl border border-[#C9941A]/20 p-8 md:p-10 text-center">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#C9941A] mb-4">{t("diagnostics.guardLabel")}</p>
            <h2 className="text-2xl md:text-3xl font-display font-black text-white mb-4">{t("diagnostics.guardH2")}</h2>
            <p className="text-[#A8B2BE] leading-relaxed max-w-2xl mx-auto">{t("diagnostics.guardSub")}</p>
          </div>
        </div>
      </section>

      {/* FOUR PILLARS */}
      <section className="py-24 bg-[#0A0C12]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#C9941A] mb-4">{t("diagnostics.pillarsLabel")}</p>
            <h2 className="text-4xl md:text-5xl font-display font-black text-white tracking-tight mb-6">{t("diagnostics.pillarsH2")}</h2>
            <p className="text-lg text-[#A8B2BE]">{t("diagnostics.pillarsSub")}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {pillars.map((p, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
                className="glass-panel p-8 rounded-2xl border-t-2 border-t-[#C9941A] bg-[#0D1B35]/80 group hover:-translate-y-1 transition-all duration-300">
                <div className="w-14 h-14 rounded-xl bg-[#C9941A]/15 text-[#C9941A] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">{p.icon}</div>
                <h3 className="text-xl font-bold mb-3 text-white">{p.title}</h3>
                <p className="text-[#A8B2BE] leading-relaxed">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3-STEP PROCESS */}
      <section className="py-24 bg-[#0A0C12] border-y border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-40" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#C9941A] mb-4">{t("diagnostics.processLabel")}</p>
            <h2 className="text-4xl md:text-5xl font-display font-black text-white tracking-tight">{t("diagnostics.processH2")}</h2>
            <p className="text-lg text-[#A8B2BE] mt-4 max-w-2xl mx-auto">{t("diagnostics.processSub")}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            <div className="hidden md:block absolute top-10 left-[16%] right-[16%] h-[1px] bg-gradient-to-r from-transparent via-[#C9941A]/40 to-transparent" />
            {steps.map((step, i) => (
              <div key={i} className="relative z-10 flex flex-col items-center text-center">
                <div className="w-20 h-20 rounded-full bg-[#0A0C12] border-2 border-[#C9941A]/30 shadow-[0_0_30px_rgba(201,148,26,0.12)] flex items-center justify-center mb-6 text-[#C9941A]">{step.icon}</div>
                <p className="text-[11px] font-bold uppercase tracking-widest text-[#C9941A] mb-2">{step.num}</p>
                <h3 className="text-2xl font-bold text-white mb-3">{step.title}</h3>
                <p className="text-[#A8B2BE] leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SIX FLOWS */}
      <section className="py-24 bg-[#0A0C12]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#C9941A] mb-4">{t("diagnostics.flowsLabel")}</p>
            <h2 className="text-4xl font-display font-black text-white tracking-tight">{t("diagnostics.flowsH2")}</h2>
            <p className="text-[#A8B2BE] mt-4 max-w-xl mx-auto">{t("diagnostics.flowsSub")}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {flows.map((f, i) => (
              <div key={i} className="glass-panel rounded-xl p-6 border border-white/5 hover:border-[#C9941A]/20 transition-colors">
                <div className="text-[10px] font-bold uppercase tracking-widest text-[#C9941A] mb-1">{f.flow}</div>
                <h3 className="text-sm font-bold text-white mb-3">{f.title}</h3>
                <p className="text-xs text-[#A8B2BE] leading-relaxed italic">"{f.q}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-28 relative text-center px-4 bg-[#0A0C12] overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#C9941A]/8 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-0 inset-x-0 section-divider" />
        <div className="max-w-3xl mx-auto relative z-10">
          <div className="inline-block px-4 py-1.5 rounded-full border border-[#C9941A]/30 bg-[#C9941A]/5 mb-6">
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#C9941A]">{t("diagnostics.ctaBadge")}</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-black mb-5 text-white tracking-tight leading-tight">
            {t("diagnostics.ctaH2a")} <span className="text-gradient-gold">{t("diagnostics.ctaH2b")}</span>
          </h2>
          <p className="text-lg text-[#A8B2BE] mb-10 max-w-xl mx-auto leading-relaxed">{t("diagnostics.ctaSub")}</p>
          <Link href="/assessment" className="inline-flex items-center justify-center gap-3 px-8 sm:px-10 py-4 sm:py-5 rounded-full bg-[#C9941A] text-[#0A0C12] font-black text-base sm:text-lg shadow-[0_0_40px_rgba(201,148,26,0.3)] hover:shadow-[0_0_70px_rgba(201,148,26,0.6)] hover:-translate-y-0.5 transition-all duration-300 w-full sm:w-auto">
            {t("diagnostics.ctaBtn")} <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </Layout>
  );
}
