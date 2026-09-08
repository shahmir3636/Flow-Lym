import React from 'react';
import { PageRoute } from '../types';
import { ArrowRight, Mail, Instagram } from 'lucide-react';
import { FlowlymLogo } from './FlowlymLogo';

interface FooterProps { onNavigate: (route: PageRoute) => void; onOpenStartProject: () => void; }

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenStartProject }) => (
  <footer className="flowlym-footer mt-12 text-white overflow-hidden">
    <div className="flowlym-footer__ambient flowlym-footer__ambient--one" />
    <div className="flowlym-footer__ambient flowlym-footer__ambient--two" />
    <div className="h-px bg-gradient-to-r from-transparent via-zinc-600 to-transparent opacity-80" />

    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-7 sm:py-8 relative">
      <div className="grid grid-cols-1 md:grid-cols-[1.4fr_1fr_1.15fr] gap-7 items-start">
        <div className="space-y-3">
          <FlowlymLogo size={31} showWordmark theme="dark" />
          <p className="text-xs sm:text-[13px] text-zinc-400 leading-5 max-w-md">
            AI automation, web development and custom software for businesses that want less manual work and better systems.
          </p>
        </div>

        <div>
          <h3 className="text-[10px] font-semibold uppercase tracking-[0.18em] text-zinc-400 mb-3">Explore</h3>
          <div className="grid grid-cols-2 gap-x-5 gap-y-1.5 text-xs">
            {(['home','services','projects','ai-demos','team','roi-calculator','about','contact'] as PageRoute[]).map((route) => (
              <button key={route} onClick={() => onNavigate(route)} className="text-left text-zinc-400 hover:text-white hover:translate-x-0.5 capitalize transition-all">
                {route === 'roi-calculator' ? 'ROI Calculator' : route === 'ai-demos' ? 'AI Demos' : route}
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.045] p-4 backdrop-blur-sm shadow-[0_18px_50px_rgba(0,0,0,.18)]">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-xs font-semibold text-white">Start a project</h3>
              <p className="text-[11px] text-zinc-400 mt-1">Tell us what you want to automate or build.</p>
            </div>
            <span className="footer-live-dot" />
          </div>
          <div className="flex flex-wrap gap-2 mt-3">
            <button onClick={onOpenStartProject} className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-white text-zinc-900 text-[11px] font-semibold hover:bg-zinc-200 transition-all hover:-translate-y-0.5">
              Let's talk <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <a href="https://www.instagram.com/flowlym.tech/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg border border-white/10 text-zinc-300 text-[11px] font-semibold hover:border-zinc-400/60 hover:text-white transition-all">
              <Instagram className="w-3.5 h-3.5" /> Instagram
            </a>
          </div>
          <a href="mailto:info@flowlym.tech" className="flex items-center gap-2 mt-3 text-[11px] text-zinc-400 hover:text-white transition-colors">
            <Mail className="w-3.5 h-3.5" /> info@flowlym.tech
          </a>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-white/8 flex flex-col sm:flex-row justify-between gap-2 text-[10px] text-zinc-500">
        <span>© {new Date().getFullYear()} FLOWLYM. All rights reserved.</span>
        <span>Built around your business process.</span>
      </div>
    </div>
  </footer>
);
