import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, ArrowLeft, FileText, ShieldCheck, Database, Bell, BarChart3, AlertTriangle, CheckCircle, Zap } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";

const fadeUp = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } } };

export default function ComplianceReporting() {
  const { t } = useTranslation();

  const features = [
    { icon: <Database className="w-6 h-6" />, title: t('cr.f1title'), body: t('cr.f1body') },
    { icon: <FileText className="w-6 h-6" />, title: t('cr.f2title'), body: t('cr.f2body') },
    { icon: <ShieldCheck className="w-6 h-6" />, title: t('cr.f3title'), body: t('cr.f3body') },
    { icon: <BarChart3 className="w-6 h-6" />, title: t('cr.f4title'), body: t('cr.f4body') },
    { icon: <Bell className="w-6 h-6" />, title: t('cr.f5title'), body: t('cr.f5body') },
    { icon: <Zap className="w-6 h-6" />, title: t('cr.f6title'), body: t('cr.f6body') },
  ];

  const painBefore = [t('cr.pb1'), t('cr.pb2'), t('cr.pb3'), t('cr.pb4')];
  const painAfter  = [t('cr.pa1'), t('cr.pa2'), t('cr.pa3'), t('cr.pa4')];

  const audiences = [
    { label: t('cr.w1label'), text: t('cr.w1text') },
    { label: t('cr.w2label'), text: t('cr.w2text') },
    { label: t('cr.w3label'), text: t('cr.w3text') },
  ];

  const steps = [
    { num: "01", title: t('cr.step01title'), body: t('cr.step01body') },
    { num: "02", title: t('cr.step02title'), body: t('cr.step02body') },
    { num: "03", title: t('cr.step03title'), body: t('cr.step03body') },
    { num: "04", title: t('cr.step04title'), body: t('cr.step04body') },
    { num: "05", title: t('cr.step05title'), body: t('cr.step05body') },
  ];

  const regTags = ["OSHA 300/300A", "EPA Tier II", "FAR 52.219-9", "DCAA Audit-Ready", "SDVOSB Compliance", "HUBZone Recertification", "DBE/MBE Utilization", "Contract Performance Reports", "ISO 9001 Documentation", "Local Law 97 (NYC)"];

  return (
    <Layout>
      <Helmet>
        <title>Compliance Reporting Visibility & Audit Diagnostic | ARCG Systems</title>
        <meta name="description" content="ARCG diagnoses compliance reporting blind spots before building anything. Audit-readiness assessment, regulatory documentation gaps, and real-time visibility for government contractors and regulated operators. OSHA, EPA, FAR — diagnosed first, then blueprinted." />
        <meta name="keywords" content="compliance reporting visibility, audit diagnostic, regulatory compliance consulting, federal compliance reporting, OSHA EPA FAR compliance, contractor compliance systems" />
        <link rel="canonical" href="https://arcgsystems.com/solutions/compliance-reporting" />
        <meta property="og:title" content="Compliance Reporting Visibility & Audit Diagnostic | ARCG Systems" />
        <meta property="og:description" content="Diagnose compliance blind spots before building anything. Audit-ready documentation systems." />
        <meta property="og:url" content="https://arcgsystems.com/solutions/compliance-reporting" />
        <meta property="og:type" content="website" />
      </Helmet>

      {/* HERO */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden bg-[#0A0C12] bg-grid-pattern">
        <div className="absolute top-0 left-0 w-[700px] h-[700px] bg-[#C9941A]/5 rounded-full blur-[140px] pointer-events-none -translate-x-1/3 -translate-y-1/3" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#1A6FA8]/5 rounded-full blur-[100px] pointer-events-none translate-x-1/4 translate-y-1/4" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <Link href="/" className="inline-flex items-center gap-2 text-[#A8B2BE] hover:text-[#C9941A] text-sm font-semibold mb-8 transition-colors">
              <ArrowLeft className="w-4 h-4" /> {t('cr.backHome')}
            </Link>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#C9941A] mb-5">{t('cr.badge')}</p>
            <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-black text-white tracking-[-0.03em] leading-tight mb-8">
              {t('cr.h1a')}<br /><span className="text-gradient-gold">{t('cr.h1b')}</span>
            </h1>
            <p className="text-xl text-[#A8B2BE] leading-relaxed max-w-3xl mx-auto mb-10">{t('cr.heroPara')}</p>
            <Link href="/assessment" className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#C9941A] text-[#0A0C12] font-black text-sm sm:text-base shadow-[0_0_30px_rgba(201,148,26,0.4)] hover:shadow-[0_0_50px_rgba(201,148,26,0.6)] hover:-translate-y-0.5 transition-all w-full sm:w-auto">
              {t('cr.heroBtn')} <ArrowRight className="w-5 h-5" />
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
              { value: t('cr.s1value'), label: t('cr.s1label') },
              { value: t('cr.s2value'), label: t('cr.s2label') },
              { value: t('cr.s3value'), label: t('cr.s3label') },
              { value: t('cr.s4value'), label: t('cr.s4label') },
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
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#C9941A] mb-3">{t('cr.probLabel')}</p>
            <h2 className="text-2xl sm:text-3xl font-display font-black text-white tracking-tight mb-4">{t('cr.probH2')}</h2>
            <p className="text-[#A8B2BE] text-lg leading-relaxed max-w-3xl">{t('cr.probPara')}</p>
          </div>
          <div className="glass-panel rounded-2xl border border-red-500/15 overflow-hidden">
            <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-white/5">
              <div className="p-6 sm:p-8">
                <div className="flex items-center gap-2 mb-5">
                  <span className="w-2 h-2 rounded-full bg-red-500" />
                  <span className="text-xs font-bold uppercase tracking-widest text-red-400">{t('cr.woLabel')}</span>
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
                  <span className="text-xs font-bold uppercase tracking-widest text-[#C9941A]">{t('cr.wLabel')}</span>
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

      {/* WARNING */}
      <section className="py-10 px-4 bg-[#0A0C12]">
        <div className="max-w-5xl mx-auto">
          <div className="glass-panel rounded-2xl border border-[#C9941A]/20 bg-[#C9941A]/5 px-8 py-7 flex items-start gap-5">
            <AlertTriangle className="w-6 h-6 text-[#C9941A] shrink-0 mt-1" />
            <div>
              <p className="text-sm font-bold uppercase tracking-wider text-[#C9941A] mb-2">{t('cr.warnTitle')}</p>
              <p className="text-[#A8B2BE] text-sm leading-relaxed">{t('cr.warnBody')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-20 bg-[#0A0C12]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#C9941A] mb-3">{t('cr.whatLabel')}</p>
            <h2 className="text-2xl sm:text-3xl font-display font-black text-white tracking-tight">{t('cr.whatH2')}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <motion.div key={i} className="glass-panel p-6 sm:p-7 rounded-2xl border border-white/5 hover:border-[#C9941A]/20 transition-all duration-300 group"
                initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                <div className="w-12 h-12 rounded-xl bg-[#C9941A]/12 flex items-center justify-center text-[#C9941A] mb-5 group-hover:scale-110 transition-transform">{f.icon}</div>
                <h3 className="text-base font-black text-white mb-3 leading-snug">{f.title}</h3>
                <p className="text-[#A8B2BE] text-sm leading-relaxed">{f.body}</p>
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
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#C9941A] mb-3">{t('cr.howLabel')}</p>
            <h2 className="text-2xl sm:text-3xl font-display font-black text-white tracking-tight">{t('cr.howH2')}</h2>
          </div>
          <div className="space-y-5">
            {steps.map((step, i) => (
              <motion.div key={i} className="flex gap-6 p-6 sm:p-7 rounded-2xl border border-white/5 bg-[#0A0C12]/60 hover:border-[#C9941A]/20 transition-all"
                initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                <span className="font-mono text-[#C9941A]/50 text-sm font-black shrink-0 mt-0.5">{step.num}</span>
                <div>
                  <h3 className="text-sm font-black text-white mb-2">{step.title}</h3>
                  <p className="text-[#A8B2BE] text-sm leading-relaxed">{step.body}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* WHO THIS IS FOR */}
      <section className="py-20 bg-[#0A0C12]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#C9941A] mb-3">{t('cr.whoLabel')}</p>
            <h2 className="text-2xl sm:text-3xl font-display font-black text-white tracking-tight">{t('cr.whoH2')}</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {audiences.map(({ label, text }) => (
              <div key={label} className="glass-panel p-7 rounded-2xl border border-white/5 border-t-2 border-t-[#1A6FA8]/50">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#1A6FA8] mb-3">{label}</p>
                <p className="text-[#A8B2BE] text-sm leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REGULATORY COVERAGE */}
      <section className="py-16 bg-[#0D1B35]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#C9941A] mb-6">{t('cr.regLabel')}</p>
          <div className="flex flex-wrap gap-3">
            {regTags.map(tag => (
              <span key={tag} className="px-4 py-2 rounded-lg border border-[#C9941A]/25 bg-[#C9941A]/5 text-[#C9941A] text-xs font-bold">{tag}</span>
            ))}
          </div>
        </div>
      </section>

      {/* CLOSING CTA */}
      <section className="py-24 relative text-center px-4 bg-[#0A0C12] overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#C9941A]/6 rounded-full blur-[130px] pointer-events-none" />
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#C9941A]/30 to-transparent" />
        <div className="max-w-3xl mx-auto relative z-10">
          <div className="inline-block px-4 py-1.5 rounded-full border border-[#C9941A]/30 bg-[#C9941A]/5 mb-6">
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#C9941A]">{t('cr.closeBadge')}</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-black text-white tracking-tight mb-5 leading-tight">
            {t('cr.closeH2a')}<br /><span className="text-gradient-gold">{t('cr.closeH2b')}</span>
          </h2>
          <p className="text-[#A8B2BE] text-lg mb-10 max-w-xl mx-auto leading-relaxed">{t('cr.closePara')}</p>
          <Link href="/assessment" className="inline-flex items-center justify-center gap-3 px-8 sm:px-10 py-4 sm:py-5 rounded-full bg-[#C9941A] text-[#0A0C12] font-black text-base sm:text-lg shadow-[0_0_40px_rgba(201,148,26,0.3)] hover:shadow-[0_0_70px_rgba(201,148,26,0.6)] hover:-translate-y-0.5 transition-all duration-300 w-full sm:w-auto">
            {t('cr.closeBtn')} <ArrowRight className="w-5 h-5" />
          </Link>
          <p className="mt-5 text-sm text-[#A8B2BE]/40 font-medium">{t('cr.closeFoot')}</p>
        </div>
      </section>
    </Layout>
  );
}
