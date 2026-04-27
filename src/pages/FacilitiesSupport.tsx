import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, ArrowLeft, Building2, Bug, Users, Wrench, ClipboardList, TrendingUp, CheckCircle, Shield } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";

const fadeUp = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } } };

export default function FacilitiesSupport() {
  const { t } = useTranslation();

  const services = [
    { icon: <Building2 className="w-6 h-6" />, title: t('fs.sv1title'), body: t('fs.sv1body'), naics: "561720" },
    { icon: <Bug className="w-6 h-6" />, title: t('fs.sv2title'), body: t('fs.sv2body'), naics: "561710" },
    { icon: <Users className="w-6 h-6" />, title: t('fs.sv3title'), body: t('fs.sv3body'), naics: "561320" },
    { icon: <Wrench className="w-6 h-6" />, title: t('fs.sv4title'), body: t('fs.sv4body'), naics: "561210" },
    { icon: <ClipboardList className="w-6 h-6" />, title: t('fs.sv5title'), body: t('fs.sv5body'), naics: "561210" },
    { icon: <TrendingUp className="w-6 h-6" />, title: t('fs.sv6title'), body: t('fs.sv6body'), naics: "518210" },
  ];

  const painBefore = [t('fs.pb1'), t('fs.pb2'), t('fs.pb3'), t('fs.pb4')];
  const painAfter  = [t('fs.pa1'), t('fs.pa2'), t('fs.pa3'), t('fs.pa4')];

  const audiences = [
    { label: t('fs.w1label'), text: t('fs.w1text') },
    { label: t('fs.w2label'), text: t('fs.w2text') },
    { label: t('fs.w3label'), text: t('fs.w3text') },
  ];

  const steps = [
    { num: "01", title: t('fs.h01title'), body: t('fs.h01body') },
    { num: "02", title: t('fs.h02title'), body: t('fs.h02body') },
    { num: "03", title: t('fs.h03title'), body: t('fs.h03body') },
    { num: "04", title: t('fs.h04title'), body: t('fs.h04body') },
  ];

  const terminalRows = [
    { label: "Janitorial — Site A", status: "COMPLETED", color: "#22c55e" },
    { label: "Pest Control — Site B", status: "SCHEDULED", color: "#C9941A" },
    { label: "PM Inspection — Site C", status: "IN PROGRESS", color: "#C9941A" },
    { label: "Vendor Dispatch", status: "AUTOMATED", color: "#22c55e" },
    { label: "SLA Compliance", status: "98.4%", color: "#22c55e" },
    { label: "Manual Coordination", status: "ELIMINATED", color: "#ef4444" },
  ];

  return (
    <Layout>
      <Helmet>
        <title>Property Management & Facilities Operations Consulting | ARCG Systems</title>
        <meta name="description" content="Property management and facilities operations consulting. ARCG diagnoses vendor fragmentation, dispatch gaps, and compliance drift across multi-site portfolios — then consolidates to one accountable operator. Janitorial, pest control, staffing, maintenance. SDVOSB · HUBZone certified." />
        <meta name="keywords" content="property management operations consulting, facilities operations consulting, vendor dispatch consulting, multi-site facilities management, SDVOSB facilities contractor, consolidated facilities operator" />
        <link rel="canonical" href="https://arcgsystems.com/solutions/facilities-support" />
        <meta property="og:title" content="Property Management & Facilities Operations Consulting | ARCG Systems" />
        <meta property="og:description" content="One accountable operator for multi-site portfolios. Diagnosis-first facilities operations." />
        <meta property="og:url" content="https://arcgsystems.com/solutions/facilities-support" />
        <meta property="og:type" content="website" />
      </Helmet>

      {/* HERO */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden bg-[#0A0C12] bg-grid-pattern">
        <div className="absolute top-0 left-0 w-[700px] h-[700px] bg-[#C9941A]/5 rounded-full blur-[140px] pointer-events-none -translate-x-1/3 -translate-y-1/3" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#1A6FA8]/5 rounded-full blur-[100px] pointer-events-none translate-x-1/4 translate-y-1/4" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <Link href="/" className="inline-flex items-center gap-2 text-[#A8B2BE] hover:text-[#C9941A] text-sm font-semibold mb-8 transition-colors">
              <ArrowLeft className="w-4 h-4" /> {t('fs.backHome')}
            </Link>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#C9941A] mb-5">{t('fs.badge')}</p>
            <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-black text-white tracking-[-0.03em] leading-tight mb-8">
              {t('fs.h1a')}<br /><span className="text-gradient-gold">{t('fs.h1b')}</span>
            </h1>
            <p className="text-xl text-[#A8B2BE] leading-relaxed max-w-3xl mx-auto mb-10">{t('fs.heroPara')}</p>
            <Link href="/assessment" className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#C9941A] text-[#0A0C12] font-black text-sm sm:text-base shadow-[0_0_30px_rgba(201,148,26,0.4)] hover:shadow-[0_0_50px_rgba(201,148,26,0.6)] hover:-translate-y-0.5 transition-all w-full sm:w-auto">
              {t('fs.heroBtn')} <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* STAT BAR */}
      <section className="bg-[#0A0C12] py-8 relative">
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#C9941A]/30 to-transparent" />
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {[
              { value: t('fs.s1value'), label: t('fs.s1label') },
              { value: t('fs.s2value'), label: t('fs.s2label') },
              { value: t('fs.s3value'), label: t('fs.s3label') },
              { value: t('fs.s4value'), label: t('fs.s4label') },
            ].map((s, i) => (
              <div key={i} className="glass-panel p-5 rounded-xl text-center">
                <div className="text-2xl font-display font-black text-gradient-gold mb-1">{s.value}</div>
                <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#A8B2BE]">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#C9941A]/30 to-transparent" />
      </section>

      {/* THE PROBLEM */}
      <section className="py-20 bg-[#0D1B35]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#C9941A] mb-3">{t('fs.probLabel')}</p>
            <h2 className="text-2xl sm:text-3xl font-display font-black text-white tracking-tight mb-4">{t('fs.probH2')}</h2>
            <p className="text-[#A8B2BE] text-lg leading-relaxed max-w-3xl">{t('fs.probPara')}</p>
          </div>
          <div className="glass-panel rounded-2xl border border-white/5 overflow-hidden">
            <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-white/5">
              <div className="p-6 sm:p-8">
                <div className="flex items-center gap-2 mb-5">
                  <span className="w-2 h-2 rounded-full bg-red-500" />
                  <span className="text-xs font-bold uppercase tracking-widest text-red-400">{t('fs.woLabel')}</span>
                </div>
                {painBefore.map((p, i) => (
                  <div key={i} className="flex items-start gap-3 mb-4 last:mb-0">
                    <span className="text-red-400 mt-0.5 shrink-0 text-sm">✕</span>
                    <p className="text-[#A8B2BE]/80 text-sm leading-relaxed">{p}</p>
                  </div>
                ))}
              </div>
              <div className="p-6 sm:p-8">
                <div className="flex items-center gap-2 mb-5">
                  <span className="w-2 h-2 rounded-full bg-[#C9941A]" />
                  <span className="text-xs font-bold uppercase tracking-widest text-[#C9941A]">{t('fs.wLabel')}</span>
                </div>
                {painAfter.map((p, i) => (
                  <div key={i} className="flex items-start gap-3 mb-4 last:mb-0">
                    <span className="text-[#C9941A] mt-0.5 shrink-0 text-sm">✓</span>
                    <p className="text-[#A8B2BE] text-sm leading-relaxed">{p}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CERT CALLOUT */}
      <section className="py-10 px-4 bg-[#0A0C12]">
        <div className="max-w-5xl mx-auto">
          <div className="glass-panel rounded-2xl border border-[#C9941A]/20 bg-[#C9941A]/5 px-8 py-7 flex items-start gap-5">
            <CheckCircle className="w-6 h-6 text-[#C9941A] shrink-0 mt-1" />
            <div>
              <p className="text-sm font-bold uppercase tracking-wider text-[#C9941A] mb-2">{t('fs.certTitle')}</p>
              <p className="text-[#A8B2BE] text-sm leading-relaxed">{t('fs.certBody')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-20 bg-[#0A0C12]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#C9941A] mb-3">{t('fs.svcLabel')}</p>
            <h2 className="text-2xl sm:text-3xl font-display font-black text-white tracking-tight">{t('fs.svcH2')}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s, i) => (
              <motion.div key={i} className="bg-[#0D1B35] border border-white/8 rounded-2xl overflow-hidden hover:border-[#C9941A]/25 transition-all duration-300 group"
                initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                <div className="p-6 sm:p-7">
                  <div className="flex items-start justify-between mb-5">
                    <div className="w-11 h-11 rounded-xl bg-[#C9941A]/12 flex items-center justify-center text-[#C9941A] group-hover:scale-110 transition-transform">{s.icon}</div>
                    <span className="font-mono text-[10px] text-[#A8B2BE]/30 tracking-wider mt-1">NAICS {s.naics}</span>
                  </div>
                  <h3 className="text-base font-black text-white mb-3 leading-snug">{s.title}</h3>
                  <p className="text-[#A8B2BE] text-sm leading-relaxed">{s.body}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-20 bg-[#0D1B35] relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-30" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="mb-12">
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#C9941A] mb-3">{t('fs.howLabel')}</p>
            <h2 className="text-2xl sm:text-3xl font-display font-black text-white tracking-tight">{t('fs.howH2')}</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div className="space-y-5">
              {steps.map((step, i) => (
                <div key={i} className="flex gap-5 p-5 rounded-xl border border-white/5 bg-[#0A0C12]/50 hover:border-[#C9941A]/20 transition-all">
                  <span className="font-mono text-[#C9941A]/50 text-sm font-black shrink-0 mt-0.5">{step.num}</span>
                  <div>
                    <h3 className="text-sm font-black text-white mb-1.5">{step.title}</h3>
                    <p className="text-[#A8B2BE] text-sm leading-relaxed">{step.body}</p>
                  </div>
                </div>
              ))}
            </div>
            {/* Terminal visual */}
            <div className="glass-panel rounded-2xl p-6 border border-[#C9941A]/20 bg-[#0A0C12]">
              <div className="flex items-center gap-2 mb-5 pb-4 border-b border-white/5">
                <div className="w-3 h-3 rounded-full bg-red-500/60" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                <div className="w-3 h-3 rounded-full bg-green-500/60" />
                <span className="ml-auto font-mono text-xs text-[#A8B2BE]/40">ARCG.FACILITIES</span>
              </div>
              <div className="space-y-3 font-mono text-xs">
                {terminalRows.map((row, i) => (
                  <div key={i} className="flex items-center justify-between px-3 py-2.5 rounded-lg bg-[#0D1B35]/80 border border-white/5">
                    <span className="text-[#A8B2BE]">{row.label}</span>
                    <span className="font-bold flex items-center gap-1.5" style={{ color: row.color }}>
                      <span className="w-1.5 h-1.5 rounded-full animate-pulse inline-block" style={{ background: row.color }} />
                      {row.status}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-5 pt-4 border-t border-white/5 flex items-center justify-between">
                <span className="text-[#A8B2BE]/40 text-xs font-mono">{t('fs.sysHealth')}</span>
                <span className="text-[#22c55e] text-xs font-bold font-mono">{t('fs.sysOk')}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHO THIS IS FOR */}
      <section className="py-20 bg-[#0A0C12]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#C9941A] mb-3">{t('fs.whoLabel')}</p>
            <h2 className="text-2xl sm:text-3xl font-display font-black text-white tracking-tight">{t('fs.whoH2')}</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {audiences.map(({ label, text }) => (
              <div key={label} className="glass-panel p-7 rounded-2xl border border-white/5 border-t-2 border-t-[#C9941A]/40">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#C9941A] mb-3">{label}</p>
                <p className="text-[#A8B2BE] text-sm leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CLOSING CTA */}

      {/* MHIC CREDENTIAL */}
      <section className="py-12 bg-[#0A0C12] px-4">
        <div className="max-w-4xl mx-auto">
          <div className="rounded-2xl border border-[#C9941A]/25 border-l-4 border-l-[#C9941A] bg-[#0D1B35]/60 p-6 md:p-8 flex flex-col sm:flex-row sm:items-center gap-6">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 rounded-xl bg-[#C9941A]/10 border border-[#C9941A]/30 flex items-center justify-center">
                <Shield className="w-6 h-6 text-[#C9941A]" />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#C9941A] mb-1.5">State Licensing</p>
              <p className="text-base font-black text-white leading-snug mb-1">
                Maryland Home Improvement Commission Licensed Contractor
              </p>
              <p className="text-sm text-[#A8B2BE] leading-relaxed">
                Ariel's River Contracting Group LLC — MHIC #05-163466 · Licensed through 05/06/2027
              </p>
              <p className="text-[11px] text-[#A8B2BE]/50 mt-1.5 leading-snug">
                Qualifying individual on record:{" "}
                <a href="/docs/licensing/mhic-supporting-credential-jean-max-charles-jr.pdf" target="_blank" rel="noopener noreferrer" className="hover:text-[#C9941A]/70 transition-colors underline-offset-2 hover:underline">
                  Jean Max Charles Jr — Authorized: 01 - Contractor/Salesman
                </a>
              </p>
            </div>
            <div className="flex-shrink-0">
              <a
                href="/docs/licensing/mhic-license-05-163466.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#C9941A]/40 text-[#C9941A] text-xs font-black hover:bg-[#C9941A]/10 transition-all duration-200"
              >
                View License <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 relative text-center px-4 bg-[#0A0C12] overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#C9941A]/6 rounded-full blur-[130px] pointer-events-none" />
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#C9941A]/30 to-transparent" />
        <div className="max-w-3xl mx-auto relative z-10">
          <div className="inline-block px-4 py-1.5 rounded-full border border-[#C9941A]/30 bg-[#C9941A]/5 mb-6">
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#C9941A]">{t('fs.closeBadge')}</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-black text-white tracking-tight mb-5 leading-tight">
            {t('fs.closeH2a')}<br /><span className="text-gradient-gold">{t('fs.closeH2b')}</span>
          </h2>
          <p className="text-[#A8B2BE] text-lg mb-10 max-w-xl mx-auto leading-relaxed">{t('fs.closePara')}</p>
          <Link href="/assessment" className="inline-flex items-center justify-center gap-3 px-8 sm:px-10 py-4 sm:py-5 rounded-full bg-[#C9941A] text-[#0A0C12] font-black text-base sm:text-lg shadow-[0_0_40px_rgba(201,148,26,0.3)] hover:shadow-[0_0_70px_rgba(201,148,26,0.6)] hover:-translate-y-0.5 transition-all duration-300 w-full sm:w-auto">
            {t('fs.closeBtn')} <ArrowRight className="w-5 h-5" />
          </Link>
          <p className="mt-5 text-sm text-[#A8B2BE]/40 font-medium">{t('fs.closeFoot')}</p>
        </div>
      </section>
    </Layout>
  );
}
