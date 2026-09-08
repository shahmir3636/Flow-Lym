import React, { useState, useEffect } from 'react';
import { PageRoute } from '../types';
import { FlowlymLogo } from './FlowlymLogo';
import { Menu, X, ArrowRight, ChevronRight, Zap } from 'lucide-react';

interface NavbarProps {
  activeRoute: PageRoute;
  onNavigate: (route: PageRoute) => void;
  onOpenStartProject: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeRoute, onNavigate, onOpenStartProject }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 18);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks: { label: string; route: PageRoute }[] = [
    { label: 'Home', route: 'home' },
    { label: 'Services', route: 'services' },
    { label: 'Projects', route: 'projects' },
    { label: 'AI Demos', route: 'ai-demos' },
    { label: 'Team', route: 'team' },
    { label: 'ROI Calculator', route: 'roi-calculator' },
    { label: 'About', route: 'about' },
    { label: 'Contact', route: 'contact' },
  ];

  const handleNavClick = (route: PageRoute) => {
    onNavigate(route);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'py-2.5' : 'py-4'}`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative">
            <div className="absolute -inset-1 rounded-[1.5rem] bg-zinc-500/10 blur-lg pointer-events-none" />
            <div className="relative overflow-hidden rounded-2xl border border-zinc-100/90 bg-white/95 backdrop-blur-xl shadow-[0_12px_32px_rgba(15,42,102,0.08)]">
              <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-zinc-400 to-transparent opacity-50" />
              <div className="flex items-center justify-between px-3 sm:px-5 py-2.5">
                <button onClick={() => handleNavClick('home')} className="flex items-center text-left group cursor-pointer focus:outline-none">
                  <FlowlymLogo size={34} />
                </button>

                <nav className="hidden xl:flex items-center gap-1">
                  {navLinks.map((link) => {
                    const isActive = activeRoute === link.route;
                    return (
                      <button
                        key={link.route}
                        onClick={() => handleNavClick(link.route)}
                        className={`px-3 py-2 rounded-xl text-xs font-bold transition-all relative cursor-pointer ${
                          isActive
                            ? 'text-zinc-800 bg-zinc-50 border border-zinc-100 shadow-2xs'
                            : 'text-zinc-600 hover:text-zinc-800 hover:bg-zinc-50/50'
                        }`}
                      >
                        {link.label}
                      </button>
                    );
                  })}
                </nav>

                <div className="hidden lg:flex items-center gap-2.5">
                  <button
                    onClick={onOpenStartProject}
                    className="group inline-flex items-center gap-1.5 px-4.5 py-2.5 bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-bold rounded-xl transition-all shadow-md shadow-zinc-500/20 hover:scale-105 cursor-pointer"
                  >
                    <span>Let's Talk</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </div>

                <div className="flex lg:hidden items-center gap-2">
                  <button onClick={onOpenStartProject} className="px-3.5 py-2 bg-zinc-900 text-white text-xs font-bold rounded-xl shadow-xs">Let's Talk</button>
                  <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 text-zinc-700 bg-zinc-100 rounded-xl" aria-label="Toggle menu">
                    {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden bg-white/95 backdrop-blur-xl pt-24 pb-8 px-6 flex flex-col justify-between animate-in fade-in duration-150">
          <div className="space-y-1">
            {navLinks.map((link) => {
              const isActive = activeRoute === link.route;
              return (
                <button key={link.route} onClick={() => handleNavClick(link.route)} className={`w-full py-3.5 px-4 rounded-xl text-left text-sm font-bold flex items-center justify-between ${isActive ? 'bg-zinc-900 text-white' : 'text-zinc-600 hover:bg-zinc-50'}`}>
                  <span>{link.label}</span>
                  <ChevronRight className="w-4 h-4 opacity-60" />
                </button>
              );
            })}
          </div>
          <div className="pt-6 border-t border-zinc-200 space-y-3">
            <button onClick={() => { setMobileMenuOpen(false); onOpenStartProject(); }} className="w-full py-3.5 bg-zinc-900 text-white font-bold text-sm rounded-xl flex items-center justify-center gap-2 shadow-md shadow-zinc-500/20">
              Start a Project <ArrowRight className="w-4 h-4" />
            </button>
            <p className="text-xs text-zinc-500 text-center font-mono">info@flowlym.tech</p>
          </div>
        </div>
      )}
    </>
  );
};
