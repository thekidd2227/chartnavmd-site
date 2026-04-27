import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, Shield, Zap, Building2, Bot, FileText, Users, CheckCircle, Search, ClipboardList, Layers } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";

const fadeUp = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } } };
const stagger = { visible: { transition: { staggerChildren: 0.1 } } };

const naicsCodes = [
  { code: "541611", label: "Management Consulting Services", primary: false },
  { code: "541512", label: "Computer Systems Design Services", primary: true },
  { code: "561110", label: "Office Administrative Services", primary: false },
  { code: "561210", label: "Facilities Support Services", primary: false },
  { code: "541990", label: "All Other Professional Services", primary: false },
  { code: "518210", label: "Data Processing & Hosting Services", primary: false },
];

export default function Capabilities() {
  const { t } = useTranslation();

  const capabilities = [
    { num: "01", icon: <Bot className="w-6 h-6" />, title: t('capabilities.cap1title'), body: t('capabilities.cap1body'), naics: "541512 · 541519" },
    { num: "02", icon: <FileText className="w-6 h-6" />, title: t('capabilities.cap2title'), body: t('capabilities.cap2body'), naics: "541618 · 541990" },
    { num: "03", icon: <Building2 className="w-6 h-6" />, title: t('capabilities.cap3title'), body: t('capabilities.cap3body'), naics: "561210 · 561720" },
    { num: "04", icon: <Shield className="w-6 h-6" />, title: t('capabilities.cap4title'), body: t('capabilities.cap4body'), naics: "541611 · 561110" },
    { num: "05", icon: <FileText className="w-6 h-6" />, title: t('capabilities.cap5title'), body: t('capabilities.cap5body'), naics: "518210 · 541990" },
    { num: "06", icon: <Users className="w-6 h-6" />, title: t('capabilities.cap6title'), body: t('capabilities.cap6body'), naics: "541611 · 541618" },
  ];

  const differentiators = [
    { title: t('capabilities.d1title'), body: t('capabilities.d1body') },
    { title: t('capabilities.d2title'), body: t('capabilities.d2body') },
    { title: t('capabilities.d3title'), body: t('capabilities.d3body') },
    { title: t('capabilities.d4title'), body: t('capabilities.d4body') },
  ];

  const samItems = [
    { label: t('capabilities.samLegal'), value: "Ariel's River Contracting Group LLC", sub: "d/b/a ARCG Systems" },
    { label: t('capabilities.samUei'), value: "KPHJM83ZJLJ4", mono: true },
    { label: t('capabilities.samCage'), value: "8FJ78", mono: true },
    { label: t('capabilities.samStatus'), value: t('capabilities.samActive2'), green: true },
    { label: t('capabilities.samLocation'), value: "Hyattsville, MD", sub: t('capabilities.samSub') },
    { label: "MD License", value: "MHIC #05-163466", mono: true, sub: "Licensed through 05/06/2027", mhic: true },
    { label: "Qualifying Individual", value: "Jean Max Charles Jr", sub: "Authorized: 01 - Contractor/Salesman · MHIC on Record", qualifier: true } as any,
  ];

  return (
    <Layout>
      <Helmet>
        <title>Capabilities & Federal Credentials | ARCG Systems</title>
        <meta name="description" content="ARCG Systems capabilities: operational waste diagnostic, operational intelligence consulting, facilities management, federal compliance reporting, and teaming strategy. Certified SDVOSB · HUBZone · MBE · DBE · SBE. Active SAM.gov — UEI KPHJM83ZJLJ4." />
        <meta name="keywords" content="SDVOSB, HUBZone, MBE, DBE, SBE, federal contractor, operations consulting capabilities, operational intelligence, teaming partner" />
        <link rel="canonical" href="https://arcgsystems.com/capabilities" />
        <meta property="og:title" content="Capabilities & Federal Credentials | ARCG Systems" />
        <meta property="og:description" content="Five federal certifications. Diagnosis-first operations consulting. SAM.gov active." />
        <meta property="og:url" content="https://arcgsystems.com/capabilities" />
        <meta property="og:type" content="website" />
      </Helmet>

      {/* HERO */}
      <section className="relative pt-36 pb-20 bg-[#0A0C12] bg-grid-pattern overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#C9941A]/5 rounded-full blur-[130px] pointer-events-none translate-x-1/3 -translate-y-1/4" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div initial="hidden" animate="visible" variants={stagger} className="max-w-4xl">
            <motion.div variants={fadeUp} className="inline-flex items-center gap-3 mb-6">
              <span className="w-8 h-px bg-[#C9941A]" />
              <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#C9941A] font-mono">{t('capabilities.dba')}</span>
            </motion.div>
            <motion.h1 variants={fadeUp} className="text-4xl sm:text-5xl lg:text-6xl font-black font-display tracking-tight leading-[1.04] text-white mb-6">
              {t('capabilities.h1a')}<br /><span className="text-gradient-gold">{t('capabilities.h1b')}</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="text-lg text-[#A8B2BE] leading-relaxed max-w-2xl mb-10">
              {t('capabilities.heroPara')}
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-wrap gap-3 mb-10">
              {["SDVOSB","HUBZone","MBE","DBE","SBE"].map(c => (
                <span key={c} className="px-4 py-2 rounded-lg border border-[#C9941A]/40 bg-[#C9941A]/8 text-[#C9941A] text-xs font-black uppercase tracking-widest">{c}</span>
              ))}
            </motion.div>
            <motion.div variants={fadeUp} className="flex flex-wrap gap-6 text-xs font-mono text-[#A8B2BE]/60 tracking-wider">
              <span>UEI: <span className="text-[#C9941A] font-bold">KPHJM83ZJLJ4</span></span>
              <span>CAGE: <span className="text-[#C9941A] font-bold">8FJ78</span></span>
              <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse inline-block" />{t('capabilities.samActive')}</span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CORE CAPABILITIES */}
      <section className="py-20 bg-[#0D1B35]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#C9941A] mb-3">{t('capabilities.capLabel')}</p>
            <h2 className="text-2xl sm:text-3xl font-display font-black text-white tracking-tight">{t('capabilities.capH2')}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {capabilities.map((cap, i) => (
              <motion.div key={i} className="bg-[#0A0C12] border border-white/8 rounded-2xl overflow-hidden hover:border-[#C9941A]/25 transition-all duration-300"
                initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                <div className="p-6 sm:p-7">
                  <div className="flex items-start justify-between mb-5">
                    <div className="w-11 h-11 rounded-xl bg-[#C9941A]/12 flex items-center justify-center text-[#C9941A]">{cap.icon}</div>
                    <span className="font-mono text-[28px] font-black leading-none text-[#2a2d35]">{cap.num}</span>
                  </div>
                  <h3 className="text-base font-black text-white mb-3 leading-snug">{cap.title}</h3>
                  <p className="text-[#A8B2BE] text-sm leading-relaxed mb-5">{cap.body}</p>
                  <div className="pt-4 border-t border-white/5">
                    <span className="font-mono text-[10px] text-[#A8B2BE]/40 tracking-wider uppercase">NAICS {cap.naics}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* ═══ DIAGNOSTIC ENTRY POINT ═══ */}
      <section className="py-20 bg-[#0A0C12] relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#C9941A]/5 rounded-full blur-[150px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-14">
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#C9941A] mb-4">Start Here</p>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-black text-white tracking-tight mb-4">
              Every Engagement Starts With a Diagnostic.
            </h2>
            <p className="text-[#A8B2BE] leading-relaxed">
              We do not scope work until we know where the operation is leaking. The diagnostic maps your workflows, scores every breakdown by revenue impact, and produces a formal blueprint before a single integration is built. You get clarity — not a proposal built on assumptions.
            </p>
          </div>

          {/* 3-column flow */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-14 relative">
            <div className="hidden md:block absolute top-10 left-[18%] right-[18%] h-px bg-gradient-to-r from-transparent via-[#C9941A]/30 to-transparent" />
            {[
              {
                icon: <Search className="w-6 h-6" />,
                num: "01",
                title: "Operational Waste Mapping",
                desc: "We map your real workflows across six core diagnostic flows — intake, handoffs, reporting, accountability gaps, and revenue leakage. Every breakdown documented, not assumed."
              },
              {
                icon: <ClipboardList className="w-6 h-6" />,
                num: "02",
                title: "Issue Scoring & Prioritization",
                desc: "Every finding scored by Revenue Impact (30%), Operational Pain (25%), Frequency (20%), Ease (10%), and Dependency (15%). Ranked list built around your constraints."
              },
              {
                icon: <Layers className="w-6 h-6" />,
                num: "03",
                title: "Formal Blueprint → Phased Build",
                desc: "Written blueprint: current-state, root cause, future-state, automation map, data model, KPI plan. Implementation only after blueprint is approved. Never the other way around."
              }
            ].map((step, i) => (
              <motion.div
                key={i}
                className="relative z-10 flex flex-col items-center text-center glass-panel rounded-2xl p-7 border border-white/5 hover:border-[#C9941A]/20 transition-all"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
              >
                <div className="w-16 h-16 rounded-full bg-[#0A0C12] border-2 border-[#C9941A]/30 flex items-center justify-center mb-5 text-[#C9941A]">
                  {step.icon}
                </div>
                <p className="text-[11px] font-bold uppercase tracking-widest text-[#C9941A] mb-2">{step.num}</p>
                <h3 className="text-base font-black text-white mb-3">{step.title}</h3>
                <p className="text-[#A8B2BE] text-sm leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Deliverables grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-12">
            <motion.div
              className="rounded-2xl border border-[#C9941A]/20 bg-[#0D1B35] p-7"
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            >
              <h3 className="text-sm font-black text-white mb-4 flex items-center gap-3">
                <span className="w-6 h-6 rounded-md bg-[#C9941A]/15 flex items-center justify-center text-[#C9941A] text-xs font-bold">A</span>
                Immediate Fixes
              </h3>
              <p className="text-[#A8B2BE] text-sm leading-relaxed mb-3">High impact, fast to implement, low dependency. These are the first wins that stop obvious leakage — broken routing, missing task assignment, no auto-response, duplicate data entry.</p>
              <div className="flex flex-wrap gap-2 mt-4">
                {["Broken routing", "No auto-response", "Missing ownership", "Duplicate entry"].map(tag => (
                  <span key={tag} className="text-[10px] font-bold px-2.5 py-1 rounded bg-[#C9941A]/10 border border-[#C9941A]/20 text-[#C9941A] uppercase tracking-wider">{tag}</span>
                ))}
              </div>
            </motion.div>

            <motion.div
              className="rounded-2xl border border-[#1A6FA8]/25 bg-[#0D1B35] p-7"
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            >
              <h3 className="text-sm font-black text-white mb-4 flex items-center gap-3">
                <span className="w-6 h-6 rounded-md bg-[#1A6FA8]/15 flex items-center justify-center text-[#60a5fa] text-xs font-bold">B</span>
                Core System Build
              </h3>
              <p className="text-[#A8B2BE] text-sm leading-relaxed mb-3">Foundational workflows and source-of-truth structures required for the business to run consistently — CRM architecture, pipeline and status structure, work order workflow, dashboards, and core automation rules.</p>
              <div className="flex flex-wrap gap-2 mt-4">
                {["CRM design", "Pipeline structure", "Work order flow", "Dashboards"].map(tag => (
                  <span key={tag} className="text-[10px] font-bold px-2.5 py-1 rounded bg-[#1A6FA8]/10 border border-[#1A6FA8]/20 text-[#60a5fa] uppercase tracking-wider">{tag}</span>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Guardrail callout */}
          <motion.div
            className="rounded-2xl border border-white/8 bg-[#0D1B35] p-7 mb-12 flex flex-col md:flex-row items-start md:items-center gap-5"
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
          >
            <div className="w-12 h-12 rounded-xl bg-[#C9941A]/10 flex items-center justify-center text-[#C9941A] shrink-0">
              <CheckCircle className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <p className="text-white font-black text-sm mb-1">We Never Automate Broken Logic</p>
              <p className="text-[#A8B2BE] text-sm leading-relaxed">The diagnostic determines what should be standardized, what should be automated, and what should remain human. That decision cannot be made without mapping the operation first. No exceptions.</p>
            </div>
            <Link href="/diagnostics" className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#C9941A]/30 text-[#C9941A] text-xs font-black hover:bg-[#C9941A]/10 transition-all whitespace-nowrap">
              See the Process <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </motion.div>

          {/* CTA pair */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/assessment" className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#C9941A] text-[#0A0C12] font-black text-sm shadow-[0_0_30px_rgba(201,148,26,0.3)] hover:shadow-[0_0_50px_rgba(201,148,26,0.55)] hover:-translate-y-0.5 transition-all w-full sm:w-auto justify-center">
              Start My Operational Waste Intake <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/diagnostics" className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-[#A8B2BE]/25 text-[#A8B2BE] font-bold text-sm hover:border-[#C9941A]/50 hover:text-[#C9941A] transition-all w-full sm:w-auto">
              View the Diagnostic Process
            </Link>
          </div>

        </div>
      </section>
      {/* ═══ END DIAGNOSTIC ENTRY POINT ═══ */}

      {/* DIFFERENTIATORS */}
      <section className="py-20 bg-[#0A0C12]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#C9941A] mb-3">{t('capabilities.diffLabel')}</p>
            <h2 className="text-2xl sm:text-3xl font-display font-black text-white tracking-tight">{t('capabilities.diffH2')}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {differentiators.map((d, i) => (
              <motion.div key={i} className="flex gap-5 p-6 sm:p-7 rounded-2xl border border-white/8 bg-[#0D1B35] hover:border-[#C9941A]/25 transition-all"
                initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                <CheckCircle className="w-5 h-5 text-[#C9941A] shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-sm font-black text-white mb-2">{d.title}</h3>
                  <p className="text-[#A8B2BE] text-sm leading-relaxed">{d.body}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* NAICS + SAM */}
      <section className="py-20 bg-[#0D1B35]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#C9941A] mb-3">{t('capabilities.naicsLabel')}</p>
              <h2 className="text-xl font-display font-black text-white mb-6">{t('capabilities.naicsH2')}</h2>
              <div className="space-y-2">
                {naicsCodes.map(({ code, label, primary }) => (
                  <div key={code} className={`flex items-center gap-4 px-5 py-3.5 rounded-xl border ${primary ? "border-[#C9941A]/35 bg-[#C9941A]/6" : "border-white/8 bg-[#0A0C12]/60"}`}>
                    <span className={`font-mono text-sm font-black ${primary ? "text-[#C9941A]" : "text-[#A8B2BE]"}`}>{code}</span>
                    {primary && <span className="w-1 h-1 rounded-full bg-[#C9941A] shrink-0" />}
                    <span className="text-[#A8B2BE] text-sm">{label}</span>
                    {primary && <span className="ml-auto text-[9px] font-black uppercase tracking-widest text-[#C9941A] font-mono">{t('capabilities.primaryTag')}</span>}
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#C9941A] mb-3">{t('capabilities.samLabel')}</p>
              <h2 className="text-xl font-display font-black text-white mb-6">{t('capabilities.samH2')}</h2>
              <div className="rounded-2xl border border-[#C9941A]/20 border-l-4 border-l-[#C9941A] bg-[#0A0C12] p-6 space-y-5">
                {samItems.map(({ label, value, sub, mono, green, mhic, qualifier }: any) => (
                  <div key={label} className="flex justify-between items-start gap-4 pb-5 border-b border-white/5 last:border-0 last:pb-0">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#A8B2BE]/50">{label}</span>
                    <div className="text-right">
                      {mhic ? (
                        <a href="/docs/licensing/mhic-license-05-163466.pdf" target="_blank" rel="noopener noreferrer" className="text-sm font-black block text-[#C9941A] font-mono tracking-wider hover:underline" title="View MHIC License Certificate">{value}</a>
                      ) : qualifier ? (
                        <a href="/docs/licensing/mhic-supporting-credential-jean-max-charles-jr.pdf" target="_blank" rel="noopener noreferrer" className="text-sm font-black block text-[#A8B2BE] hover:text-[#C9941A] transition-colors" title="View Supporting Credential — Jean Max Charles Jr">{value}</a>
                      ) : (
                        <span className={`text-sm font-black block ${green ? "text-green-400" : mono ? "text-[#C9941A] font-mono tracking-wider" : "text-white"}`}>{value}</span>
                      )}
                      {sub && <span className="text-[11px] text-[#A8B2BE]/50 font-medium">{sub}</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TEAMING CTA */}
      <section className="py-20 bg-[#0A0C12] relative overflow-hidden text-center">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#C9941A]/5 rounded-full blur-[150px] pointer-events-none" />
        <div className="max-w-3xl mx-auto px-4 relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <motion.p variants={fadeUp} className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#C9941A] mb-4">{t('capabilities.teamLabel')}</motion.p>
            <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl font-display font-black text-white tracking-tight leading-tight mb-5">
              {t('capabilities.teamH2a')}{" "}<br className="hidden sm:block" />{t('capabilities.teamH2b')}
            </motion.h2>
            <motion.p variants={fadeUp} className="text-[#A8B2BE] text-base leading-relaxed mb-8 max-w-xl mx-auto">{t('capabilities.teamPara')}</motion.p>
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/assessment" className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#C9941A] text-[#0A0C12] font-black text-sm shadow-[0_0_30px_rgba(201,148,26,0.35)] hover:shadow-[0_0_50px_rgba(201,148,26,0.55)] hover:-translate-y-0.5 transition-all w-full sm:w-auto justify-center">
                {t('capabilities.teamBtn')} <ArrowRight className="w-4 h-4" />
              </Link>
              <a href="mailto:info@arivergroup.com" className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-[#A8B2BE]/25 text-[#A8B2BE] font-bold text-sm hover:border-[#C9941A]/50 hover:text-[#C9941A] transition-all w-full sm:w-auto justify-center">
                {t('capabilities.teamEmail')}
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
