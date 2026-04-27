import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [location] = useLocation();
  const { t } = useTranslation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { label: t('nav.aiAutomation'), href: "/diagnostics" },
    { label: t('nav.federalAccess'), href: "/solutions/federal-access" },
    { label: t('nav.capabilities'), href: "/capabilities" },
    { label: t('nav.compliance'), href: "/solutions/compliance-reporting" },
    { label: "ChartNav", href: "/chartnav" },
    { label: "SourceDeck", href: "https://sourcedeck.app/", external: true },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "glass-panel-heavy py-3 border-b border-[#C9941A]/20 shadow-[0_4px_30px_rgba(0,0,0,0.8)]" : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="hidden sm:flex flex-col">
                <div className="flex items-baseline gap-1">
                  <span className="font-display font-black text-xl leading-none tracking-wide text-white">ARCG</span>
                  <span className="font-bold text-sm text-[#C9941A] leading-none">Systems</span>
                </div>
                <span className="text-[9px] text-[#A8B2BE] uppercase tracking-[0.15em] font-bold mt-1">Intelligent Systems. Certified Execution.</span>
              </div>
            </Link>

            {/* Desktop Nav — compact gap + smaller text to handle long Spanish labels */}
            <nav className="hidden lg:flex items-center gap-4 xl:gap-6">
              {navLinks.map((link) => (
                (link as any).external ? (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-bold tracking-wide whitespace-nowrap transition-colors hover:text-[#C9941A] text-[#A8B2BE]"
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`text-xs font-bold tracking-wide whitespace-nowrap transition-colors hover:text-[#C9941A] ${
                      location === link.href ? "text-[#C9941A]" : "text-[#A8B2BE]"
                    }`}
                  >
                    {link.label}
                  </Link>
                )
              ))}
            </nav>

            {/* CTA + Mobile Toggle */}
            <div className="flex items-center gap-2 xl:gap-3">
              <Link
                href="/assessment"
                className="hidden lg:flex items-center gap-1.5 px-4 xl:px-5 py-2 rounded-full bg-[#C9941A] text-[#0A0C12] font-black text-xs whitespace-nowrap hover:bg-[#E8B84B] hover:-translate-y-0.5 transition-all shadow-[0_0_15px_rgba(201,148,26,0.3)]"
              >
                Book a Free Triage Call <ChevronRight className="w-3.5 h-3.5 shrink-0" />
              </Link>
              <button
                className="lg:hidden p-2 text-[#A8B2BE] hover:text-[#C9941A] transition-colors"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-[#0A0C12]/95 backdrop-blur-xl pt-24 pb-6 px-4 md:hidden flex flex-col border-b border-[#C9941A]/20"
          >
            <nav className="flex flex-col gap-4">
              <Link href="/" className="text-xl font-display font-black p-4 border-b border-white/5 text-white">
                Home
              </Link>
              {navLinks.map((link) => (
                (link as any).external ? (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xl font-display font-black p-4 border-b border-white/5 text-[#A8B2BE]"
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`text-xl font-display font-black p-4 border-b border-white/5 ${location === link.href ? 'text-[#C9941A]' : 'text-[#A8B2BE]'}`}
                  >
                    {link.label}
                  </Link>
                )
              ))}
            </nav>
            <div className="mt-auto pb-8">
              <Link
                href="/assessment"
                className="w-full flex justify-center items-center gap-2 p-4 rounded-xl bg-[#C9941A] text-[#0A0C12] font-black text-lg shadow-[0_0_20px_rgba(201,148,26,0.3)]"
              >
                Book a Free Triage Call
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
