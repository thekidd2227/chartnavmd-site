import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, ArrowLeft, Shield, FileText, Users, Unlock, CheckCircle, AlertTriangle } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Helmet } from 'react-helmet-async';
import { useTranslation } from "react-i18next";

const fadeUp = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } };

const CERT_CODES = ["SDVOSB","HUBZone","DBE","MBE","SBE"];

export default function FederalAccess() {
  const { t } = useTranslation();

  const CERTS = [
    { code: "SDVOSB", label: "Service-Disabled Veteran-Owned Small Business", note: "Federal set-aside eligibility + evaluation preference" },
    { code: "HUBZone", label: "Historically Underutilized Business Zone", note: "10% price evaluation preference on full-and-open competitions" },
    { code: "DBE", label: "Disadvantaged Business Enterprise", note: "Required participation on federally funded transportation projects" },
    { code: "MBE", label: "Minority Business Enterprise", note: "State and local government procurement preference programs" },
    { code: "SBE", label: "Small Business Enterprise", note: "Subcontracting plan compliance for prime contractors" },
  ];

  const PRIME_NEEDS = [
    { need: t('federalAccess.pn1need'), detail: t('federalAccess.pn1detail') },
    { need: t('federalAccess.pn2need'), detail: t('federalAccess.pn2detail') },
    { need: t('federalAccess.pn3need'), detail: t('federalAccess.pn3detail') },
    { need: t('federalAccess.pn4need'), detail: t('federalAccess.pn4detail') },
  ];

  const SECTIONS = [
    {
      icon: Shield, id: "compliance",
      eyebrow: t('federalAccess.sec1eyebrow'),
      headline: t('federalAccess.sec1headline'),
      body: t('federalAccess.sec1body'),
      points: t('federalAccess.sec1pts', { returnObjects: true }) as string[],
      cardLabel: t('federalAccess.sec1card'),
    },
    {
      icon: Users, id: "teaming",
      eyebrow: t('federalAccess.sec2eyebrow'),
      headline: t('federalAccess.sec2headline'),
      body: t('federalAccess.sec2body'),
      points: t('federalAccess.sec2pts', { returnObjects: true }) as string[],
      cardLabel: "",
    },
    {
      icon: FileText, id: "proposal",
      eyebrow: t('federalAccess.sec3eyebrow'),
      headline: t('federalAccess.sec3headline'),
      body: t('federalAccess.sec3body'),
      points: t('federalAccess.sec3pts', { returnObjects: true }) as string[],
      cardLabel: t('federalAccess.sec3card'),
    },
    {
      icon: Unlock, id: "access",
      eyebrow: t('federalAccess.sec4eyebrow'),
      headline: t('federalAccess.sec4headline'),
      body: t('federalAccess.sec4body'),
      points: t('federalAccess.sec4pts', { returnObjects: true }) as string[],
      cardLabel: t('federalAccess.sec4card'),
    },
  ];

  const WHO = [
    { label: t('federalAccess.who1label'), text: t('federalAccess.who1text') },
    { label: t('federalAccess.who2label'), text: t('federalAccess.who2text') },
    { label: t('federalAccess.who3label'), text: t('federalAccess.who3text') },
  ];

  return (
    <Layout>
      <Helmet>
        <title>Federal Contractor Operations Consulting & GovCon Teaming | ARCG Systems</title>
        <meta name="description" content="Federal contractor operations consulting for prime + subcontract execution. ARCG holds SDVOSB, HUBZone, MBE, DBE, and SBE — five active certifications for teaming arrangements. Diagnosis-first operational intelligence for government contracts. Active on SAM.gov." />
        <meta name="keywords" content="federal contractor operations consulting, govcon consulting, SDVOSB teaming partner, HUBZone subcontractor, federal compliance reporting, bid operations, set-aside subcontractor" />
        <link rel="canonical" href="https://arcgsystems.com/solutions/federal-access" />
        <meta property="og:title" content="Federal Contractor Operations Consulting | ARCG Systems" />
        <meta property="og:description" content="Five federal certifications. Diagnosis-first operations consulting for GovCon. SAM.gov active — UEI KPHJM83ZJLJ4." />
        <meta property="og:url" content="https://arcgsystems.com/solutions/federal-access" />
        <meta property="og:type" content="website" />
      </Helmet>

      {/* HERO */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden bg-[#0A0C12] bg-grid-pattern">
        <div className="absolute top-0 left-0 w-[700px] h-[700px] bg-[#C9941A]/5 rounded-full blur-[140px] pointer-events-none -translate-x-1/3 -translate-y-1/3" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#1A6FA8]/5 rounded-full blur-[100px] pointer-events-none translate-x-1/4 translate-y-1/4" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.5 }}>
            <Link href="/" className="inline-flex items-center gap-2 text-[#A8B2BE] hover:text-[#C9941A] text-sm font-semibold mb-8 transition-colors">
              <ArrowLeft className="w-4 h-4" /> Back to Home
            </Link>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#C9941A]/30 bg-[#C9941A]/5 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C9941A]" />
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#C9941A]">{t('federalAccess.badge')}</span>
            </div>
            <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-black text-white tracking-[-0.03em] leading-tight mb-8">
              {t('federalAccess.h1a')}<br /><span className="text-gradient-gold">{t('federalAccess.h1b')}</span>
            </h1>
            <p className="text-xl text-[#A8B2BE] leading-relaxed max-w-3xl mx-auto mb-10">{t('federalAccess.heroPara')}</p>
            <Link href="/assessment" className="inline-flex items-center justify-center gap-3 px-8 sm:px-10 py-4 sm:py-5 rounded-full bg-[#C9941A] text-[#0A0C12] font-black text-base sm:text-lg shadow-[0_0_40px_rgba(201,148,26,0.3)] hover:shadow-[0_0_70px_rgba(201,148,26,0.6)] hover:-translate-y-0.5 transition-all duration-300 w-full sm:w-auto">
              {t('federalAccess.heroBtn')} <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CERT BAR */}
      <section className="bg-[#0A0C12] py-6 relative">
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#C9941A]/30 to-transparent" />
        <div className="max-w-5xl mx-auto px-4">
          <p className="text-center text-[10px] font-bold uppercase tracking-[0.25em] text-[#A8B2BE]/50 mb-5">{t('federalAccess.regBar')}</p>
          <div className="flex flex-wrap justify-center gap-3">
            {CERT_CODES.map(code => (
              <div key={code} className="px-4 py-2 border border-[#C9941A]/25 bg-[#C9941A]/5 rounded-lg">
                <span className="font-display font-black text-sm text-[#C9941A]">{code}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#C9941A]/30 to-transparent" />
      </section>

      {/* PRIME NEEDS */}
      <section className="py-20 px-4 bg-[#0A0C12] border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#C9941A]">{t('federalAccess.primeLabel')}</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-black text-white mb-4 leading-tight">
              {t('federalAccess.primeH2')}
            </h2>
            <p className="text-[#A8B2BE] text-lg mb-12 max-w-3xl leading-relaxed">{t('federalAccess.primePara')}</p>
            <div className="grid md:grid-cols-2 gap-5">
              {PRIME_NEEDS.map(({ need, detail }) => (
                <div key={need} className="glass-panel p-6 rounded-2xl border border-white/5 hover:border-[#C9941A]/20 transition-colors group">
                  <div className="flex items-start gap-3 mb-3">
                    <CheckCircle className="w-5 h-5 text-[#C9941A] shrink-0 mt-0.5" />
                    <p className="text-sm font-bold uppercase tracking-wider text-[#C9941A]">{need}</p>
                  </div>
                  <p className="text-[#A8B2BE] text-sm leading-relaxed group-hover:text-white/80 transition-colors">{detail}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* WARNING */}
      <section className="py-10 px-4 bg-[#0A0C12]">
        <div className="max-w-5xl mx-auto">
          <div className="glass-panel rounded-2xl border border-[#C9941A]/20 bg-[#C9941A]/5 px-8 py-7 flex items-start gap-5">
            <AlertTriangle className="w-6 h-6 text-[#C9941A] shrink-0 mt-1" />
            <div>
              <p className="text-sm font-bold uppercase tracking-wider text-[#C9941A] mb-2">{t('federalAccess.warnTitle')}</p>
              <p className="text-[#A8B2BE] text-sm leading-relaxed">{t('federalAccess.warnBody')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* FOUR SECTIONS */}
      <div className="bg-[#0A0C12]">
        {SECTIONS.map((section, idx) => {
          const Icon = section.icon;
          const isEven = idx % 2 === 0;
          return (
            <section key={section.id} className={`py-20 px-4 ${idx > 0 ? "border-t border-white/5" : ""}`}>
              <div className="max-w-5xl mx-auto">
                <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
                  className={`grid md:grid-cols-2 gap-12 items-start ${!isEven ? "md:[&>*:first-child]:order-2" : ""}`}>
                  <div>
                    <div className="flex items-center gap-3 mb-5">
                      <div className="w-10 h-10 rounded-xl bg-[#C9941A]/10 border border-[#C9941A]/25 flex items-center justify-center shrink-0">
                        <Icon className="w-5 h-5 text-[#C9941A]" />
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#C9941A]">{section.eyebrow}</span>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-display font-black text-white leading-tight mb-5">{section.headline}</h2>
                    <p className="text-[#A8B2BE] leading-relaxed mb-8 text-base">{section.body}</p>
                  </div>
                  <div className="space-y-4">
                    {section.id === "teaming" ? (
                      <div className="grid grid-cols-1 gap-3 mb-4">
                        {CERTS.map(({ code, label, note }) => (
                          <div key={code} className="glass-panel px-5 py-4 rounded-xl border border-white/5 flex items-start gap-4 group hover:border-[#C9941A]/20 transition-colors">
                            <span className="font-display font-black text-[#C9941A] text-sm w-20 shrink-0 mt-0.5">{code}</span>
                            <div>
                              <p className="text-white/80 text-xs font-semibold mb-0.5">{label}</p>
                              <p className="text-[#A8B2BE] text-xs leading-snug">{note}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="glass-panel rounded-2xl border border-white/5 overflow-hidden">
                        <div className="px-6 py-4 border-b border-white/5">
                          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#C9941A]">{section.cardLabel}</span>
                        </div>
                        <ul className="divide-y divide-white/5">
                          {(Array.isArray(section.points) ? section.points : []).map((pt: string, i: number) => (
                            <li key={i} className="flex items-start gap-4 px-6 py-5 group hover:bg-white/[0.02] transition-colors">
                              <span className="font-mono text-[10px] text-[#C9941A]/60 shrink-0 mt-1">0{i+1}</span>
                              <span className="text-[#A8B2BE] text-sm leading-relaxed group-hover:text-white/80 transition-colors">{pt}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </motion.div>
              </div>
            </section>
          );
        })}
      </div>

      {/* WHO THIS IS FOR */}
      <section className="py-16 px-4 bg-[#0A0C12] border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#C9941A] mb-6">{t('federalAccess.whoLabel')}</p>
            <div className="grid md:grid-cols-3 gap-5">
              {WHO.map(({ label, text }) => (
                <div key={label} className="glass-panel p-7 rounded-2xl border border-white/5 border-t-2 border-t-[#1A6FA8]/50">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#1A6FA8] mb-3">{label}</p>
                  <p className="text-[#A8B2BE] text-sm leading-relaxed">{text}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CLOSING CTA */}
      <section className="py-24 relative text-center px-4 bg-[#0A0C12] overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#C9941A]/6 rounded-full blur-[130px] pointer-events-none" />
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#C9941A]/30 to-transparent" />
        <div className="max-w-3xl mx-auto relative z-10">
          <div className="inline-block px-4 py-1.5 rounded-full border border-[#C9941A]/30 bg-[#C9941A]/5 mb-6">
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#C9941A]">{t('federalAccess.closeBadge')}</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-black text-white tracking-tight mb-5 leading-tight">
            {t('federalAccess.closeH2a')}<br /><span className="text-gradient-gold">{t('federalAccess.closeH2b')}</span>
          </h2>
          <p className="text-[#A8B2BE] text-lg mb-10 max-w-xl mx-auto leading-relaxed">{t('federalAccess.closePara')}</p>
          <Link href="/assessment" className="inline-flex items-center justify-center gap-3 px-8 sm:px-10 py-4 sm:py-5 rounded-full bg-[#C9941A] text-[#0A0C12] font-black text-base sm:text-lg shadow-[0_0_40px_rgba(201,148,26,0.3)] hover:shadow-[0_0_70px_rgba(201,148,26,0.6)] hover:-translate-y-0.5 transition-all duration-300 w-full sm:w-auto">
            {t('federalAccess.closeBtn')} <ArrowRight className="w-5 h-5" />
          </Link>
          <p className="mt-6 text-sm text-[#A8B2BE]/50 font-medium tracking-wide">{t('federalAccess.closeFoot')}</p>
        </div>
      </section>
    </Layout>
  );
}
