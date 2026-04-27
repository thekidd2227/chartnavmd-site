import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle, Zap, Shield, Building2, Bot, BarChart3, Users, Clock, TrendingUp } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } }
};
const stagger = { visible: { transition: { staggerChildren: 0.12 } } };

export default function Home() {
  const { t } = useTranslation();

  return (
    <Layout>
      <Helmet>
        <title>Operational Waste Diagnostic & Operations Consulting | ARCG Systems</title>
        <meta name="description" content="ARCG Systems is a diagnosis-first operational intelligence firm. We diagnose where your operation is leaking time, money, visibility, and accountability — then blueprint only what should actually be fixed. Clarity before software. Blueprint before build." />
        <meta name="keywords" content="operational waste diagnostic, operations consulting, operational intelligence consulting, workflow audit, business process diagnosis, SDVOSB" />
        <link rel="canonical" href="https://arcgsystems.com/" />
        <meta property="og:title" content="Operational Waste Diagnostic & Operations Consulting | ARCG Systems" />
        <meta property="og:description" content="Diagnosis-first operational intelligence firm. We find where your operation is leaking before we build anything." />
        <meta property="og:url" content="https://arcgsystems.com/" />
        <meta property="og:type" content="website" />
        <meta name="twitter:title" content="Operational Waste Diagnostic & Operations Consulting | ARCG Systems" />
        <meta name="twitter:description" content="Diagnosis-first operational intelligence firm. Clarity before software." />
      </Helmet>

      {/* HERO */}
      <section className="relative min-h-[90vh] flex items-center pt-20 pb-12 overflow-hidden bg-[#0A0C12] bg-grid-pattern">
        <div className="absolute top-0 left-0 w-[700px] h-[700px] bg-[#C9941A]/5 rounded-full blur-[140px] pointer-events-none -translate-x-1/3 -translate-y-1/3" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#1A6FA8]/5 rounded-full blur-[120px] pointer-events-none translate-x-1/4 translate-y-1/4" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <motion.div className="lg:col-span-7 space-y-6 lg:space-y-8" initial="hidden" animate="visible" variants={stagger}>
              <motion.div variants={fadeUp} className="inline-flex flex-wrap items-center gap-2 px-4 py-1.5 rounded-full bg-[#0A0C12] border border-[#C9941A]/50 max-w-full">
                <span className="w-2 h-2 rounded-full bg-[#C9941A] animate-pulse shrink-0" />
                <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider sm:tracking-widest text-[#C9941A] leading-tight">
                  {t('hero.badge')}
                </span>
              </motion.div>
              <motion.h1 variants={fadeUp} className="text-[2rem] sm:text-5xl lg:text-6xl xl:text-7xl font-black font-display tracking-[-0.03em] leading-[1.1] text-white">
                {t('hero.h1a')}{" "}<br className="hidden sm:block" />
                {t('hero.h1b')}{" "}<br className="hidden sm:block" />
                <span className="text-gradient-gold">{t('hero.h1c')}</span>
              </motion.h1>
              <motion.p variants={fadeUp} className="text-base sm:text-lg lg:text-xl text-[#A8B2BE] leading-relaxed max-w-xl">
                {t('hero.sub')}
              </motion.p>
              <motion.ul variants={fadeUp} className="space-y-3">
                {(['hero.li1','hero.li2','hero.li3'] as const).map((key, i) => (
                  <li key={i} className="flex items-center gap-3 text-[#A8B2BE] text-base font-medium">
                    <CheckCircle className="w-5 h-5 text-[#C9941A] shrink-0" />
                    {t(key)}
                  </li>
                ))}
              </motion.ul>
              <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 pt-2">
                <Link href="/assessment" className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-4 rounded-full bg-[#C9941A] text-[#0A0C12] font-black text-sm sm:text-base shadow-[0_0_30px_rgba(201,148,26,0.4)] hover:shadow-[0_0_50px_rgba(201,148,26,0.6)] hover:-translate-y-0.5 transition-all duration-300 w-full sm:w-auto text-center">
                  {t('hero.cta1')} <ArrowRight className="w-5 h-5" />
                </Link>
                <a href="#what-we-fix" className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-4 rounded-full border border-[#A8B2BE]/30 text-[#A8B2BE] font-bold text-sm sm:text-base hover:border-[#C9941A]/50 hover:text-[#C9941A] transition-all duration-300 w-full sm:w-auto text-center">
                  {t('hero.cta2')}
                </a>
              </motion.div>
            </motion.div>
            {/* System Visual */}
            <motion.div className="lg:col-span-5 hidden lg:block" initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.9, delay: 0.3 }}>
              <div className="relative w-full aspect-square glass-panel-heavy rounded-3xl p-6 border border-[#C9941A]/20 bg-[#0D1121]">
                <div className="absolute -inset-px bg-gradient-to-tr from-[#C9941A]/10 via-transparent to-[#1A6FA8]/10 rounded-3xl pointer-events-none" />
                <div className="flex items-center gap-2 mb-5 pb-4 border-b border-white/5">
                  <div className="w-3 h-3 rounded-full bg-red-500/60" /><div className="w-3 h-3 rounded-full bg-yellow-500/60" /><div className="w-3 h-3 rounded-full bg-green-500/60" />
                  <span className="ml-auto font-mono text-xs text-[#A8B2BE]/50 tracking-widest">ARCG.OPERATIONS</span>
                </div>
                <div className="space-y-4 font-mono text-sm">
                  {[
                    { label: "Lead Intake", status: "AUTOMATED", color: "#22c55e" },
                    { label: "Vendor Dispatch", status: "RUNNING", color: "#22c55e" },
                    { label: "Follow-Up Sequences", status: "ACTIVE", color: "#22c55e" },
                    { label: "SLA Monitoring", status: "TRACKING", color: "#C9941A" },
                    { label: "Compliance Reports", status: "SCHEDULED", color: "#C9941A" },
                    { label: "Manual Routing", status: "ELIMINATED", color: "#ef4444" },
                  ].map((row, i) => (
                    <div key={i} className="flex items-center justify-between px-3 py-2.5 rounded-lg bg-[#0A0C12]/80 border border-white/5">
                      <span className="text-[#A8B2BE] text-xs">{row.label}</span>
                      <span className="text-xs font-bold tracking-wider flex items-center gap-1.5" style={{ color: row.color }}>
                        <span className="w-1.5 h-1.5 rounded-full animate-pulse inline-block" style={{ background: row.color }} />{row.status}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="mt-5 pt-4 border-t border-white/5 flex items-center justify-between">
                  <span className="text-[#A8B2BE]/50 text-xs font-mono">SYSTEM HEALTH</span>
                  <span className="text-[#22c55e] text-xs font-bold font-mono">100% OPERATIONAL</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* TRUST STRIP */}
      <section className="bg-[#0A0C12] py-10 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-[10px] font-bold uppercase tracking-[0.28em] text-[#A8B2BE]/50 mb-7">{t('trust.label')}</p>
          <div className="flex flex-wrap justify-center gap-6 sm:gap-10 items-center">
            {[
              { src: "images/certs/mbe.png", label: "MBE" },
              { src: "images/certs/sbe.png", label: "SBE" },
              { src: "images/certs/dbe.png", label: "DBE" },
              { src: "images/certs/sdvosb.png", label: "SDVOSB" },
              { src: "images/certs/hubzone.png", label: "HUBZone" },
            ].map((cert) => (
              <div key={cert.label} className="flex flex-col items-center gap-2.5 group">
                <img src={`${import.meta.env.BASE_URL}${cert.src}`} alt={cert.label} className="h-12 w-12 object-contain opacity-60 group-hover:opacity-100 transition-all duration-300 drop-shadow-md" />
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#A8B2BE] font-bold group-hover:text-[#C9941A] transition-colors">{cert.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROBLEM */}
      <section id="what-we-fix" className="py-14 md:py-24 bg-[#0A0C12]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10 md:mb-14">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#C9941A] mb-4">{t('problem.label')}</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-black text-white tracking-tight leading-tight mb-4">{t('problem.h2')}</h2>
            <p className="text-[#A8B2BE] text-base sm:text-lg leading-relaxed">{t('problem.sub')}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: <Clock className="w-6 h-6" />, problem: t('problem.p1title'), cost: t('problem.p1') },
              { icon: <Zap className="w-6 h-6" />, problem: t('problem.p2title'), cost: t('problem.p2') },
              { icon: <BarChart3 className="w-6 h-6" />, problem: t('problem.p3title'), cost: t('problem.p3') },
            ].map((item, i) => (
              <motion.div key={i} className="glass-panel rounded-2xl p-5 sm:p-8 border border-white/5 hover:border-[#C9941A]/20 transition-all duration-300" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                <div className="w-11 h-11 rounded-xl bg-red-500/10 flex items-center justify-center mb-5 text-red-400">{item.icon}</div>
                <h3 className="text-base font-bold text-white mb-3">{item.problem}</h3>
                <p className="text-[#A8B2BE] text-sm leading-relaxed">{item.cost}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT WE DO */}
      <section className="py-14 md:py-24 bg-[#0D1B35]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10 md:mb-14">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#C9941A] mb-4">{t('whatwedo.label')}</p>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-display font-black text-white tracking-tight leading-tight mb-4">{t('whatwedo.h2')}</h2>
            <p className="text-[#A8B2BE] text-base sm:text-lg leading-relaxed">{t('whatwedo.sub')}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: <Bot className="w-7 h-7" />, title: t('whatwedo.c1title'), desc: t('whatwedo.c1'), link: "/diagnostics" },
              { icon: <Building2 className="w-7 h-7" />, title: t('whatwedo.c2title'), desc: t('whatwedo.c2'), link: "/solutions/facilities-support" },
              { icon: <Shield className="w-7 h-7" />, title: t('whatwedo.c3title'), desc: t('whatwedo.c3'), link: "/solutions/federal-access" },
            ].map((card, i) => (
              <motion.div key={i} className="glass-panel p-5 sm:p-8 rounded-2xl group hover:-translate-y-2 transition-all duration-300 border-t-2 border-t-[#C9941A] bg-[#0A0C12]/80" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                <div className="w-14 h-14 rounded-xl bg-[#C9941A]/15 flex items-center justify-center mb-6 text-[#C9941A] group-hover:scale-110 transition-transform">{card.icon}</div>
                <h3 className="text-xl font-bold mb-3 text-white">{card.title}</h3>
                <p className="text-[#A8B2BE] mb-6 leading-relaxed text-sm">{card.desc}</p>
                <Link href={card.link} className="text-[#C9941A] font-bold flex items-center gap-2 hover:gap-3 transition-all text-sm">
                  {t('whatwedo.learnMore')} <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* WHO WE HELP */}
      <section className="py-14 md:py-24 bg-[#0A0C12]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10 md:mb-14">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#C9941A] mb-4">{t('whoWeHelp.label')}</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-black text-white tracking-tight leading-tight mb-5">{t('whoWeHelp.h2')}</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: <Users className="w-6 h-6" />, who: t('whoWeHelp.w1'), problem: t('whoWeHelp.p1'), fix: t('whoWeHelp.f1') },
              { icon: <Building2 className="w-6 h-6" />, who: t('whoWeHelp.w2'), problem: t('whoWeHelp.p2'), fix: t('whoWeHelp.f2') },
              { icon: <Zap className="w-6 h-6" />, who: t('whoWeHelp.w3'), problem: t('whoWeHelp.p3'), fix: t('whoWeHelp.f3') },
              { icon: <Shield className="w-6 h-6" />, who: t('whoWeHelp.w4'), problem: t('whoWeHelp.p4'), fix: t('whoWeHelp.f4') },
            ].map((item, i) => (
              <motion.div key={i} className="rounded-2xl overflow-hidden border border-white/5 hover:border-[#C9941A]/20 transition-all duration-300" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                <div className="bg-[#0D1B35] px-5 sm:px-8 pt-6 sm:pt-8 pb-5">
                  <div className="w-10 h-10 rounded-lg bg-[#C9941A]/15 flex items-center justify-center mb-4 text-[#C9941A]">{item.icon}</div>
                  <h3 className="text-base sm:text-lg font-black text-white mb-2">{item.who}</h3>
                  <p className="text-[#A8B2BE]/70 text-sm leading-relaxed italic">"{item.problem}"</p>
                </div>
                <div className="bg-[#0A0C12] px-5 sm:px-8 py-4 sm:py-5 border-t border-white/5">
                  <p className="text-[#A8B2BE] text-sm leading-relaxed">
                    <span className="text-[#C9941A] font-bold">{t('whoWeHelp.whatWeDo')} </span>{item.fix}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* BEFORE / AFTER */}
      <section className="py-14 md:py-24 bg-[#0D1B35]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 md:mb-14">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#C9941A] mb-4">{t('beforeAfter.label')}</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-black text-white tracking-tight">{t('beforeAfter.h2')}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <motion.div className="rounded-2xl border border-red-500/20 bg-[#0A0C12] p-5 sm:p-8" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <div className="text-xs font-bold uppercase tracking-widest text-red-400 mb-6 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-red-500/15 flex items-center justify-center text-xs">✕</span>
                {t('beforeAfter.beforeTitle')}
              </div>
              {(['beforeAfter.b1','beforeAfter.b2','beforeAfter.b3','beforeAfter.b4','beforeAfter.b5'] as const).map((key, i) => (
                <div key={i} className="flex items-start gap-3 mb-4">
                  <span className="text-red-400 mt-0.5 shrink-0">✕</span>
                  <p className="text-[#A8B2BE]/80 text-sm leading-relaxed">{t(key)}</p>
                </div>
              ))}
            </motion.div>
            <motion.div className="rounded-2xl border border-[#C9941A]/30 bg-[#0A0C12] p-5 sm:p-8" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <div className="text-xs font-bold uppercase tracking-widest text-[#C9941A] mb-6 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-[#C9941A]/15 flex items-center justify-center text-xs">✓</span>
                {t('beforeAfter.afterTitle')}
              </div>
              {(['beforeAfter.a1','beforeAfter.a2','beforeAfter.a3','beforeAfter.a4','beforeAfter.a5'] as const).map((key, i) => (
                <div key={i} className="flex items-start gap-3 mb-4">
                  <span className="text-[#C9941A] mt-0.5 shrink-0">✓</span>
                  <p className="text-[#A8B2BE] text-sm leading-relaxed">{t(key)}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-14 md:py-24 bg-[#0A0C12] border-y border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-40" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12 md:mb-16">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#C9941A] mb-4">{t('howItWorks.label')}</p>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-display font-black text-white tracking-tight">{t('howItWorks.h2')}</h2>
            <p className="text-[#C9941A] text-sm font-semibold mt-3">{t('howItWorks.sub')}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12 relative">
            <div className="hidden md:block absolute top-10 left-[18%] right-[18%] h-px bg-gradient-to-r from-transparent via-[#C9941A]/40 to-transparent" />
            {[
              { num: t('howItWorks.s1num'), title: t('howItWorks.s1title'), desc: t('howItWorks.s1') },
              { num: t('howItWorks.s2num'), title: t('howItWorks.s2title'), desc: t('howItWorks.s2') },
              { num: t('howItWorks.s3num'), title: t('howItWorks.s3title'), desc: t('howItWorks.s3') },
            ].map((step, i) => (
              <motion.div key={i} className="relative z-10 flex flex-col items-center text-center" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                <div className="w-20 h-20 rounded-full bg-[#0A0C12] border-2 border-[#C9941A]/40 shadow-[0_0_24px_rgba(201,148,26,0.15)] flex items-center justify-center mb-7">
                  <span className="text-2xl font-black text-white font-mono">{step.num}</span>
                </div>
                <h3 className="text-xl font-black mb-3 text-white">{step.title}</h3>
                <p className="text-[#A8B2BE] leading-relaxed text-sm">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* OUTCOMES */}
      <section className="py-14 md:py-24 bg-[#0D1B35]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10 md:mb-14">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#C9941A] mb-4">{t('outcomes.label')}</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-black text-white tracking-tight">{t('outcomes.h2')}</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: <Clock className="w-6 h-6" />, result: t('outcomes.o1title'), detail: t('outcomes.o1') },
              { icon: <TrendingUp className="w-6 h-6" />, result: t('outcomes.o2title'), detail: t('outcomes.o2') },
              { icon: <Users className="w-6 h-6" />, result: t('outcomes.o3title'), detail: t('outcomes.o3') },
              { icon: <BarChart3 className="w-6 h-6" />, result: t('outcomes.o4title'), detail: t('outcomes.o4') },
            ].map((item, i) => (
              <motion.div key={i} className="glass-panel p-5 sm:p-7 rounded-2xl border-t border-t-[#C9941A] bg-[#0A0C12]/60 hover:-translate-y-1 transition-transform" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                <div className="w-11 h-11 rounded-xl bg-[#C9941A]/15 flex items-center justify-center mb-5 text-[#C9941A]">{item.icon}</div>
                <h3 className="text-base font-black text-white mb-2">{item.result}</h3>
                <p className="text-[#A8B2BE] text-sm leading-relaxed">{item.detail}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="py-20 sm:py-28 relative text-center px-4 bg-[#0A0C12] overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-[#C9941A]/6 rounded-full blur-[160px] pointer-events-none" />
        <div className="max-w-3xl mx-auto relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <motion.p variants={fadeUp} className="text-[#C9941A] text-xs font-bold tracking-[3px] uppercase mb-4">{t('cta.label')}</motion.p>
            <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl md:text-5xl font-display font-black mb-4 sm:mb-5 text-white tracking-tight leading-tight">
              {t('cta.h2a')}{" "}<br className="hidden sm:block" />{t('cta.h2b')}
            </motion.h2>
            <motion.p variants={fadeUp} className="text-base sm:text-lg text-[#A8B2BE] max-w-xl mx-auto mb-8 sm:mb-10 leading-relaxed">{t('cta.sub')}</motion.p>
            <motion.div variants={fadeUp}>
              <Link href="/assessment" className="inline-flex items-center justify-center gap-3 px-8 sm:px-10 py-4 sm:py-5 rounded-full bg-[#C9941A] text-[#0A0C12] font-black text-base sm:text-lg shadow-[0_0_40px_rgba(201,148,26,0.3)] hover:shadow-[0_0_70px_rgba(201,148,26,0.6)] hover:-translate-y-0.5 transition-all duration-300 w-full sm:w-auto">
                {t('cta.button')} <ArrowRight className="w-5 h-5 shrink-0" />
              </Link>
            </motion.div>
            <motion.p variants={fadeUp} className="mt-5 text-sm text-[#A8B2BE]/40 font-medium tracking-wide">{t('cta.footnote')}</motion.p>
          </motion.div>
        </div>
      </section>

    </Layout>
  );
}
