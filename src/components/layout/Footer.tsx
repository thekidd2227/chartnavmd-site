import { Link } from "wouter";
import { ArrowRight, Shield, Linkedin, Twitter, Instagram, Facebook } from "lucide-react";
import { useTranslation } from "react-i18next";

const naicsCodes = [
  { code: "561710", label: "Pest Extermination & Control", primary: true },
  { code: "561210", label: "Facilities Support Services" },
  { code: "561720", label: "Janitorial Services" },
  { code: "561320", label: "Temporary Staffing Services" },
  { code: "541512", label: "Computer Systems Design" },
  { code: "541519", label: "Other IT Services" },
  { code: "541618", label: "Management Consulting" },
  { code: "541930", label: "Translation & Interpreting" },
];

export function Footer() {
  const currentYear = new Date().getFullYear() || 2026;
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language?.startsWith('es') ? 'es' : 'en';
  const toggleLang = () => {
    const next = currentLang === 'en' ? 'es' : 'en';
    i18n.changeLanguage(next);
    localStorage.setItem('arcg_lang', next);
    localStorage.setItem('arcg_lang_manual', '1');
  };

  return (
    <footer className="bg-[#0A0C12] bg-grid-pattern relative pt-16 pb-8 overflow-hidden">
      {/* Top gradient border */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#C9941A] to-transparent opacity-80" />
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#1A6FA8] to-transparent opacity-50 mt-[2px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* ── MAIN GRID ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-14">

          {/* Brand */}
          <div className="space-y-5 lg:col-span-1">
            <Link href="/" className="flex items-center gap-3">
              <img
                src={`${import.meta.env.BASE_URL}images/arcg-logo.png`}
                alt="ARCG Systems logo"
                className="w-11 h-11 object-contain"
              />
              <div className="flex flex-col">
                <span className="font-display font-black text-xl tracking-wide text-white leading-none">ARCG Systems</span>
                <span className="text-[9px] text-[#A8B2BE] uppercase tracking-[0.15em] font-bold mt-1">{t("footer.tagline")}</span>
              </div>
            </Link>
            <p className="text-[#A8B2BE] text-sm leading-relaxed font-medium">
              Operational waste diagnostics, operational intelligence consulting, and facilities support built for government buyers and commercial decision-makers.
            </p>
            <p className="text-[11px] text-[#A8B2BE]/50 font-medium leading-snug">
              Operating brand of Ariel's River Contracting Group LLC
            </p>
          </div>

          {/* Solutions */}
          <div>
            <h4 className="font-display font-black text-[#C9941A] uppercase tracking-widest text-xs mb-5">Solutions</h4>
            <ul className="space-y-3.5">
              <li><Link href="/diagnostics" className="text-sm font-semibold text-[#A8B2BE] hover:text-[#C9941A] transition-colors">Diagnostics</Link></li>
              <li><Link href="/solutions/facilities-support" className="text-sm font-semibold text-[#A8B2BE] hover:text-[#C9941A] transition-colors">Facilities Support</Link></li>
              <li><Link href="/solutions/federal-access" className="text-sm font-semibold text-[#A8B2BE] hover:text-[#C9941A] transition-colors">Federal Access</Link></li>
              <li><Link href="/solutions/compliance-reporting" className="text-sm font-semibold text-[#A8B2BE] hover:text-[#C9941A] transition-colors">Compliance Reporting</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-display font-black text-[#C9941A] uppercase tracking-widest text-xs mb-5">Company</h4>
            <ul className="space-y-3.5">
              <li><Link href="/#about" className="text-sm font-semibold text-[#A8B2BE] hover:text-[#C9941A] transition-colors">Leadership</Link></li>
              <li><Link href="/assessment" className="text-sm font-semibold text-[#A8B2BE] hover:text-[#C9941A] transition-colors">Book a Free Triage Call</Link></li>
              <li>
                <a
                  href="https://www.linkedin.com/in/jeanmaxc"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm font-semibold text-[#A8B2BE] hover:text-[#C9941A] transition-colors"
                >
                  <Linkedin className="w-4 h-4 shrink-0" />
                  LinkedIn
                </a>
              </li>
              <li>
                <div className="flex items-center gap-2 text-sm font-semibold text-[#A8B2BE]">
                  <Shield className="w-4 h-4 text-[#C9941A] shrink-0" />
                  <span>Certified Government Contractor</span>
                </div>
              </li>
            </ul>
          </div>

          {/* Contact — CTA driven */}
          <div>
            <h4 className="font-display font-black text-[#C9941A] uppercase tracking-widest text-xs mb-5">{t("footer.contact")}</h4>
            <p className="text-sm text-[#A8B2BE] leading-relaxed mb-5">
              Find out exactly where your operation is leaking. Book a short triage call — no pitch, no obligation.
            </p>
            <Link
              href="/assessment"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[#C9941A] text-[#0A0C12] font-black text-sm shadow-[0_0_15px_rgba(201,148,26,0.25)] hover:shadow-[0_0_30px_rgba(201,148,26,0.45)] hover:-translate-y-0.5 transition-all duration-300"
            >
              Book a Free Triage Call <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* ── GOVERNMENT PROCUREMENT IDENTITY PANEL ── */}
        <div className="rounded-2xl border border-[#C9941A]/20 border-l-4 border-l-[#C9941A] bg-[#0D1B35]/60 p-6 md:p-8 mb-10">
          <div className="flex flex-wrap items-center gap-3 mb-5">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#C9941A] bg-[#C9941A]/10 border border-[#C9941A]/20 rounded px-3 py-1">
              Procurement Identity
            </span>
          </div>

          {/* Legal Name + Core IDs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
            <div className="sm:col-span-2 lg:col-span-1">
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#A8B2BE]/50 mb-1">Legal Entity</p>
              <p className="text-sm font-black text-white leading-snug">Ariel's River Contracting Group LLC</p>
              <p className="text-[11px] font-semibold text-[#A8B2BE]/60 mt-0.5">d/b/a ARCG Systems</p>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#A8B2BE]/50 mb-1">UEI Number</p>
              <p className="text-sm font-black text-[#C9941A] font-mono tracking-wider">KPHJM83ZJLJ4</p>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#A8B2BE]/50 mb-1">CAGE Code</p>
              <p className="text-sm font-black text-[#C9941A] font-mono tracking-wider">8FJ78</p>
            </div>
            <div className="sm:col-span-2 lg:col-span-1">
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#A8B2BE]/50 mb-1">SAM.gov Status</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse shrink-0" />
                <p className="text-sm font-bold text-[#A8B2BE]">Active Registration</p>
              </div>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#A8B2BE]/50 mb-1">MD License</p>
              <a
                href="/docs/licensing/mhic-license-05-163466.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-black text-[#C9941A] font-mono tracking-wider hover:underline"
                title="MHIC License — ARIEL'S RIVER CONTRACTING GROUP LLC"
              >MHIC #05-163466</a>
              <p className="text-[11px] text-[#A8B2BE]/50 mt-0.5 font-medium">Licensed through 05/06/2027</p>
            </div>
          </div>

          {/* NAICS Codes */}
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#A8B2BE]/50 mb-3">NAICS Codes</p>
            <div className="flex flex-wrap gap-2">
              {naicsCodes.map(({ code, label, primary }) => (
                <span
                  key={code}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-bold border transition-colors ${
                    primary
                      ? "bg-[#C9941A]/15 border-[#C9941A]/40 text-[#C9941A]"
                      : "bg-white/5 border-white/10 text-[#A8B2BE]"
                  }`}
                  title={label}
                >
                  {primary && <span className="w-1 h-1 rounded-full bg-[#C9941A]" />}
                  <span className="font-mono">{code}</span>
                  <span className="hidden sm:inline text-[#A8B2BE]/60 font-medium">— {label}</span>
                </span>
              ))}
            </div>
            <p className="text-[10px] text-[#A8B2BE]/40 mt-2 font-medium">
              <span className="text-[#C9941A]/70">●</span> Primary NAICS
            </p>
          </div>
        </div>

        {/* ── CERTIFICATION BADGES ── */}
        <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-10 py-8 border-y border-white/10 mb-8">
          {[
            { src: "images/certs/mbe.png", alt: "MBE — Minority Business Enterprise" },
            { src: "images/certs/sbe.png", alt: "SBE — Small Business Enterprise" },
            { src: "images/certs/dbe.png", alt: "DBE — Disadvantaged Business Enterprise" },
            { src: "images/certs/sdvosb.png", alt: "SDVOSB — Service-Disabled Veteran-Owned Small Business" },
          ].map((cert) => (
            <img
              key={cert.alt}
              src={`${import.meta.env.BASE_URL}${cert.src}`}
              alt={cert.alt}
              title={cert.alt}
              className="h-14 w-14 object-contain grayscale-[15%] brightness-90 hover:grayscale-0 hover:brightness-100 transition-all duration-300"
            />
          ))}
          <img
            src={`${import.meta.env.BASE_URL}images/certs/hubzone.png`}
            alt="HUBZone Certified"
            title="HUBZone — Historically Underutilized Business Zone Certified"
            className="h-14 w-14 object-contain grayscale-[15%] brightness-90 hover:grayscale-0 hover:brightness-100 transition-all duration-300"
          />
        </div>

        {/* ── SOCIAL MEDIA + LANGUAGE TOGGLE ── */}
        <div className="flex flex-col items-center gap-4 py-8 border-b border-white/10 mb-8">
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#A8B2BE]/40">{t("footer.followUs")}</p>
          <div className="flex items-center gap-3">
            {/* LinkedIn — live */}
            <a href="https://www.linkedin.com/in/jeanmaxc" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="w-9 h-9 rounded-lg border border-[#A8B2BE]/20 flex items-center justify-center text-[#A8B2BE]/60 hover:border-[#C9941A]/60 hover:text-[#C9941A] hover:bg-[#C9941A]/8 transition-all duration-200">
              <Linkedin className="w-4 h-4" />
            </a>
            <span aria-label="X / Twitter — coming soon" title="X / Twitter — coming soon" className="w-9 h-9 rounded-lg border border-white/5 flex items-center justify-center text-[#A8B2BE]/20 cursor-not-allowed">
              <Twitter className="w-4 h-4" />
            </span>
            <a href="https://www.instagram.com/arcg.ai/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-9 h-9 rounded-lg border border-[#A8B2BE]/20 flex items-center justify-center text-[#A8B2BE]/60 hover:border-[#C9941A]/60 hover:text-[#C9941A] hover:bg-[#C9941A]/8 transition-all duration-200">
              <Instagram className="w-4 h-4" />
            </a>
            <a href="https://www.facebook.com/profile.php?id=100066907957468" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="w-9 h-9 rounded-lg border border-[#A8B2BE]/20 flex items-center justify-center text-[#A8B2BE]/60 hover:border-[#C9941A]/60 hover:text-[#C9941A] hover:bg-[#C9941A]/8 transition-all duration-200">
              <Facebook className="w-4 h-4" />
            </a>
            <a href="https://wa.me/15559063676" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="w-9 h-9 rounded-lg border border-[#A8B2BE]/20 flex items-center justify-center text-[#A8B2BE]/60 hover:border-[#C9941A]/60 hover:text-[#C9941A] hover:bg-[#C9941A]/8 transition-all duration-200">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            </a>
            {/* Divider */}
            <span className="w-px h-5 bg-white/10 mx-1" />
            {/* Language Toggle */}
            <button
              onClick={toggleLang}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#A8B2BE]/20 text-[#A8B2BE]/60 text-[10px] font-black tracking-widest hover:border-[#C9941A]/50 hover:text-[#C9941A] transition-all duration-200"
              title={currentLang === 'en' ? 'Ver en Español' : 'View in English'}
            >
              {currentLang === 'en' ? '🇩🇴 ES' : '🇺🇸 EN'}
            </button>
          </div>
        </div>

        {/* ── BOTTOM ROW ── */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-center md:text-left">
            <p className="text-xs font-semibold text-[#A8B2BE]/50 tracking-wider">
              &copy; {currentYear} Ariel's River Contracting Group LLC. All rights reserved.
            </p>
            <p className="text-[11px] text-[#A8B2BE]/35 mt-1 font-medium">
              ARCG Systems is a registered trade name of Ariel's River Contracting Group LLC.
            </p>
            <p className="text-[11px] text-[#A8B2BE]/35 mt-1 font-medium">
              MHIC Licensed Contractor ·{" "}
              <a href="/docs/licensing/mhic-license-05-163466.pdf" target="_blank" rel="noopener noreferrer" className="hover:text-[#C9941A]/60 transition-colors">
                License #05-163466
              </a>{" "}
              · Licensed through 05/06/2027 · Maryland Home Improvement Commission
            </p>
          </div>
          <div className="flex gap-6">
            <Link href="/privacy" className="text-xs font-semibold text-[#A8B2BE]/50 hover:text-[#C9941A] transition-colors tracking-wider uppercase">{t("footer.privacy")}</Link>
            <Link href="/terms" className="text-xs font-semibold text-[#A8B2BE]/50 hover:text-[#C9941A] transition-colors tracking-wider uppercase">{t("footer.terms")}</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
