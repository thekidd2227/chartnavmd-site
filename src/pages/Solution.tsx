import { useParams, Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, AlertCircle, ArrowLeft } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { useTranslation } from "react-i18next";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } }
};

export default function Solution() {
  const { slug } = useParams<{ slug: string }>();
  const { t } = useTranslation();

  type SolutionContent = {
    title: string; subtitle: string; description: string;
    features: string[]; audience: string;
    stat?: { value: string; label: string; context?: string };
  };

  const solutionsData: Record<string, SolutionContent> = {
    "facilities-support": {
      title: t('solution.fs_title'),
      subtitle: t('solution.fs_subtitle'),
      description: t('solution.fs_desc'),
      features: [t('solution.fs_f1'), t('solution.fs_f2'), t('solution.fs_f3'), t('solution.fs_f4'), t('solution.fs_f5')],
      audience: t('solution.fs_audience'),
      stat: { value: "1", label: t('solution.fs_stat_label') }
    },
    "compliance-reporting": {
      title: t('solution.cr_title'),
      subtitle: t('solution.cr_subtitle'),
      description: t('solution.cr_desc'),
      features: [t('solution.cr_f1'), t('solution.cr_f2'), t('solution.cr_f3'), t('solution.cr_f4'), t('solution.cr_f5')],
      audience: t('solution.cr_audience'),
      stat: { value: "Audit-Ready", label: t('solution.cr_stat_label'), context: t('solution.cr_stat_ctx') }
    },
    "translation-interpreting": {
      title: t('solution.ti_title'),
      subtitle: t('solution.ti_subtitle'),
      description: t('solution.ti_desc'),
      features: [t('solution.ti_f1'), t('solution.ti_f2'), t('solution.ti_f3'), t('solution.ti_f4'), t('solution.ti_f5')],
      audience: t('solution.ti_audience'),
      stat: { value: "Certified", label: t('solution.ti_stat_label') }
    }
  };

  const content = slug ? solutionsData[slug] : null;

  if (!content) {
    return (
      <Layout>
        <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 bg-[#0A0C12]">
          <AlertCircle className="w-16 h-16 text-[#C9941A] mb-6" />
          <h1 className="text-4xl font-bold text-white mb-4">{t('solution.notFound')}</h1>
          <p className="text-[#A8B2BE] mb-8">{t('solution.notFoundSub')}</p>
          <Link href="/" className="px-6 py-3 rounded-full bg-[#C9941A] text-[#0A0C12] font-bold">{t('solution.returnHome')}</Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* HERO */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden bg-[#0A0C12] bg-grid-pattern">
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-[#C9941A]/5 rounded-full blur-[130px] pointer-events-none -translate-x-1/3 -translate-y-1/3" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#1A6FA8]/5 rounded-full blur-[100px] pointer-events-none translate-x-1/4 translate-y-1/4" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <Link href="/" className="inline-flex items-center gap-2 text-[#A8B2BE] hover:text-[#C9941A] text-sm font-semibold mb-8 transition-colors">
              <ArrowLeft className="w-4 h-4" /> {t('solution.backHome')}
            </Link>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#C9941A] mb-5">{content.subtitle}</p>
            <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-black text-white tracking-[-0.03em] leading-tight mb-8">
              {content.title}
            </h1>
            <p className="text-xl text-[#A8B2BE] leading-relaxed max-w-3xl mx-auto">{content.description}</p>
          </motion.div>
        </div>
      </section>

      {/* STAT BAR */}
      {content.stat && (
        <section className="bg-[#0A0C12] py-8 relative">
          <div className="absolute top-0 inset-x-0 section-divider" />
          <div className="max-w-4xl mx-auto px-4 flex justify-center">
            <div className="glass-panel px-5 sm:px-10 py-5 sm:py-6 rounded-2xl text-center">
              <div className="text-4xl font-display font-black text-gradient-gold mb-1">{content.stat.value}</div>
              <div className="text-xs font-bold uppercase tracking-[0.2em] text-[#A8B2BE]">{content.stat.label}</div>
              {content.stat.context && (
                <div className="text-[11px] text-[#A8B2BE]/60 mt-2 italic font-medium max-w-xs mx-auto">{content.stat.context}</div>
              )}
            </div>
          </div>
          <div className="absolute bottom-0 inset-x-0 section-divider" />
        </section>
      )}

      {/* CONTENT */}
      <section className="py-20 bg-[#0A0C12]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#C9941A] mb-6">{t('solution.keyCaps')}</p>
              <ul className="space-y-5">
                {content.features.map((feature, i) => (
                  <motion.li key={i} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.08 }} className="flex items-start gap-4 group">
                    <CheckCircle2 className="w-5 h-5 text-[#C9941A] shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                    <span className="text-[#A8B2BE] text-base leading-relaxed group-hover:text-white transition-colors">{feature}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
            <motion.div className="space-y-6" initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <div className="glass-panel p-8 rounded-2xl border border-white/5 border-t-2 border-t-[#1A6FA8]/60">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#1A6FA8] mb-4">{t('solution.whoFor')}</p>
                <p className="text-[#A8B2BE] leading-relaxed text-base">{content.audience}</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CLOSING CTA */}
      <section className="py-24 relative text-center px-4 bg-[#0A0C12] overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#C9941A]/8 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-0 inset-x-0 section-divider" />
        <div className="max-w-3xl mx-auto relative z-10">
          <div className="inline-block px-4 py-1.5 rounded-full border border-[#C9941A]/30 bg-[#C9941A]/5 mb-6">
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#C9941A]">{t('solution.buildPlanBadge')}</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-black text-white tracking-tight mb-5 leading-tight">
            {t('solution.buildPlanH2a')} <span className="text-gradient-gold">{t('solution.buildPlanH2b')}</span>
          </h2>
          <p className="text-[#A8B2BE] text-lg mb-10 max-w-xl mx-auto leading-relaxed">{t('solution.buildPlanSub')}</p>
          <Link href="/assessment" className="inline-flex items-center justify-center gap-3 px-8 sm:px-10 py-4 sm:py-5 rounded-full bg-[#C9941A] text-[#0A0C12] font-black text-base sm:text-lg shadow-[0_0_40px_rgba(201,148,26,0.3)] hover:shadow-[0_0_70px_rgba(201,148,26,0.6)] hover:-translate-y-0.5 transition-all duration-300 w-full sm:w-auto">
            {t('solution.buildPlanBtn')} <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </Layout>
  );
}
