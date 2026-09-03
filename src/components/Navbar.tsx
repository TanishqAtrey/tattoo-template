import React, { useState, useEffect, useRef } from 'react';
import { Calendar, Shield, Sparkles, Menu, X, MapPin } from 'lucide-react';

export type AppView = 'home' | 'categories' | 'artists' | 'aftercare' | 'faq' | 'locate';

interface NavbarProps {
  currentView: AppView;
  onNavigate: (view: AppView, sectionId?: string) => void;
  onOpenBooking: () => void;
}

interface NavItem {
  label: string;
  view: AppView;
  sectionId?: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  onOpenBooking,
}) => {
  const headerRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Blur slide-in animation on mount
    const headerEl = headerRef.current;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (headerEl) {
      if (reduce) {
        headerEl.style.transform = 'none';
        headerEl.style.filter = 'none';
        headerEl.style.opacity = '1';
      } else {
        headerEl.animate(
          [
            { transform: 'translateY(-100%)', filter: 'blur(16px)', opacity: 0 },
            { transform: 'translateY(0)', filter: 'blur(0px)', opacity: 1 },
          ],
          {
            duration: 650,
            delay: 50,
            easing: 'cubic-bezier(.22,.61,.36,1)',
            fill: 'both',
          }
        );
      }
    }

    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 40);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems: NavItem[] = [
    { label: 'Tattoo Categories', view: 'categories', sectionId: 'categories' },
    { label: 'Artists', view: 'artists', sectionId: 'artists' },
    { label: 'Aftercare', view: 'aftercare', sectionId: 'aftercare' },
    { label: 'FAQ', view: 'faq', sectionId: 'faq' },
    { label: 'Locate Us', view: 'locate' },
    { label: 'Reviews', view: 'home', sectionId: 'reviews' },
  ];

  const handleNavClick = (item: NavItem) => {
    setMobileMenuOpen(false);
    onNavigate(item.view, item.sectionId);
  };

  return (
    <header
      ref={headerRef}
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 will-change-transform ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm py-3.5'
          : 'bg-white/80 backdrop-blur-sm border-b border-slate-100 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <button
          type="button"
          onClick={() => onNavigate('home')}
          className="flex items-center gap-2.5 text-left group focus:outline-none"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center text-slate-950 font-black shadow-md shadow-amber-500/20 group-hover:scale-105 transition-transform">
            <span className="font-serif-heading text-xl tracking-tighter">X</span>
          </div>
          <div>
            <span className="font-serif-heading font-extrabold text-lg sm:text-xl tracking-wider text-slate-950 block leading-tight">
              XYZ
            </span>
            <span className="text-[10px] tracking-widest uppercase text-amber-700 font-bold block">
              Custom Tattoo Atelier
            </span>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-semibold text-slate-700">
          {navItems.map((item) => {
            const isActive =
              (item.view === 'categories' && currentView === 'categories') ||
              (item.view === 'artists' && currentView === 'artists') ||
              (item.view === 'aftercare' && currentView === 'aftercare') ||
              (item.view === 'faq' && currentView === 'faq') ||
              (item.view === 'locate' && currentView === 'locate');

            return (
              <button
                key={item.label}
                type="button"
                onClick={() => handleNavClick(item)}
                className={`transition-colors duration-200 relative py-1 ${
                  isActive
                    ? 'text-amber-700 font-extrabold'
                    : 'text-slate-700 hover:text-amber-700'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-600 rounded-full animate-fade-in" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Direct Connect Action Buttons (WhatsApp, Call, & Locate Us) */}
        <div className="hidden sm:flex items-center gap-2.5">
          {/* WhatsApp Direct Connect */}
          <a
            href="https://wa.me/919876543210?text=Hi%20XYZ!%20I%20would%20like%20to%20inquire%20about%20a%20tattoo%20or%20piercing%20appointment."
            target="_blank"
            rel="noreferrer"
            className="w-10 h-10 rounded-full bg-emerald-500/10 hover:bg-emerald-500 text-emerald-600 hover:text-white border border-emerald-500/20 hover:border-emerald-500 flex items-center justify-center transition-all duration-300 shadow-sm group"
            title="Chat on WhatsApp"
            aria-label="WhatsApp"
          >
            <svg
              className="w-5 h-5 fill-current transition-transform group-hover:scale-110"
              viewBox="0 0 24 24"
            >
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
            </svg>
          </a>

          {/* Direct Phone Call */}
          <a
            href="tel:+919876543210"
            className="w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-950 text-slate-700 hover:text-white border border-slate-250 hover:border-slate-950 flex items-center justify-center transition-all duration-300 shadow-sm group"
            title="Call Studio Directly"
            aria-label="Phone Call"
          >
            <svg
              className="w-4 h-4 fill-current transition-transform group-hover:scale-110"
              viewBox="0 0 24 24"
            >
              <path d="M20 15.5c-1.25 0-2.45-.2-3.57-.57a1.02 1.02 0 0 0-1.02.24l-2.2 2.2a15.045 15.045 0 0 1-6.59-6.59l2.2-2.21a.96.96 0 0 0 .25-1A11.36 11.36 0 0 1 8.5 4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1 0 9.39 7.61 17 17 17 .55 0 1-.45 1-1v-3.5c0-.55-.45-1-1-1zM19 12h2a9 9 0 0 0-9-9v2a7 7 0 0 1 7 7zm-4 0h2a5 5 0 0 0-5-5v2a3 3 0 0 1 3 3z" />
            </svg>
          </a>

          {/* Locate Us Map Option */}
          <button
            type="button"
            onClick={() => onNavigate('locate')}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 shadow-sm border group ${
              currentView === 'locate'
                ? 'bg-amber-500 text-slate-950 border-amber-600 shadow-amber-500/20'
                : 'bg-slate-100 hover:bg-amber-50 text-slate-700 hover:text-amber-700 border-slate-250 hover:border-amber-400'
            }`}
            title="Locate Us on Map"
            aria-label="Locate Us"
          >
            <MapPin className="w-4 h-4 transition-transform group-hover:scale-110" />
          </button>
        </div>

        {/* Mobile Action Buttons & Menu Trigger */}
        <div className="flex sm:hidden items-center gap-2">
          <a
            href="https://wa.me/919876543210"
            target="_blank"
            rel="noreferrer"
            className="p-2 rounded-lg bg-emerald-50 text-emerald-600 border border-emerald-200"
            aria-label="WhatsApp"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
            </svg>
          </a>
          <a
            href="tel:+919876543210"
            className="p-2 rounded-lg bg-slate-100 text-slate-800 border border-slate-200"
            aria-label="Call"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M20 15.5c-1.25 0-2.45-.2-3.57-.57a1.02 1.02 0 0 0-1.02.24l-2.2 2.2a15.045 15.045 0 0 1-6.59-6.59l2.2-2.21a.96.96 0 0 0 .25-1A11.36 11.36 0 0 1 8.5 4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1 0 9.39 7.61 17 17 17 .55 0 1-.45 1-1v-3.5c0-.55-.45-1-1-1z" />
            </svg>
          </a>
          <button
            onClick={() => handleNavClick({ label: 'Locate Us', view: 'locate' })}
            className="p-2 rounded-lg bg-slate-100 border border-slate-200 text-slate-800"
            aria-label="Locate Us"
          >
            <MapPin className="w-4 h-4 text-amber-700" />
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-slate-100 border border-slate-200 text-slate-800"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-white/95 border-b border-slate-200 px-5 pt-4 pb-6 mt-3 space-y-4 animate-fade-in backdrop-blur-xl shadow-xl">
          <div className="grid grid-cols-2 gap-2 text-sm">
            {navItems.map((item) => {
              const isActive =
                (item.view === 'categories' && currentView === 'categories') ||
                (item.view === 'artists' && currentView === 'artists') ||
                (item.view === 'aftercare' && currentView === 'aftercare') ||
                (item.view === 'faq' && currentView === 'faq') ||
                (item.view === 'locate' && currentView === 'locate');

              return (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => handleNavClick(item)}
                  className={`py-2 px-3 rounded-md text-left transition-colors ${
                    isActive
                      ? 'bg-amber-50 text-amber-800 font-bold border border-amber-300'
                      : 'bg-slate-50 text-slate-800 hover:text-amber-700 border border-slate-200'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          <div className="pt-3 border-t border-slate-200 grid grid-cols-2 gap-2">
            <a
              href="https://wa.me/919876543210"
              target="_blank"
              rel="noreferrer"
              className="py-2.5 rounded-lg bg-[#00a82d] text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm"
            >
              <span>WhatsApp</span>
            </a>
            <a
              href="tel:+919876543210"
              className="py-2.5 rounded-lg bg-black text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm"
            >
              <span>Call Direct</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
