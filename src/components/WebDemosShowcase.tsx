import React, { useState } from 'react';
import { ExternalLink, Monitor, Smartphone, Tablet, Zap, Sparkles, CheckCircle } from 'lucide-react';

const demos = [
  {
    id: 'fluence',
    title: 'Nexus Workspace',
    subtitle: 'VIBE CODED AI Platform',
    category: 'SaaS Platform',
    desc: 'High-performance interactive AI workspace platform built with smooth motion graphics, feature bento grids, and real-time interactive widgets.',
    url: '/demos/fluence/index.html',
    badge: '⚡ VIBE CODED',
    client: 'Engineered by FLOWLYM',
    tech: ['React', 'TypeScript', 'Tailwind CSS', 'Vite', 'Framer Motion']
  },
  {
    id: 'haven',
    title: 'Lumina Studio',
    subtitle: 'VIBE CODED Architecture Studio',
    category: 'Immersive Portfolio',
    desc: 'Minimalist, typography-driven architectural portfolio with editorial image layouts, smooth transitions, spatial structure, and refined aesthetics.',
    url: '/demos/haven/index.html',
    badge: '⚡ VIBE CODED',
    client: 'Engineered by FLOWLYM',
    tech: ['Modern CSS', 'Vite', 'Minimal UI', 'Spatial Design', 'Photography']
  },
  {
    id: 'macxfolio',
    title: 'OSX Portfolio',
    subtitle: 'VIBE CODED Interactive Desktop OS',
    category: 'Interactive UI',
    desc: 'Creative desktop operating system simulator featuring draggable windows, application dock, finder filesystem, and custom interactive widgets.',
    url: '/demos/macxfolio/index.html',
    badge: '⚡ VIBE CODED',
    client: 'Engineered by FLOWLYM',
    tech: ['Draggable UI', 'Zustand', 'Windowing System', 'OS Simulation', 'React']
  }
];

export const WebDemosShowcase: React.FC = () => {
  const [activeDemo, setActiveDemo] = useState(demos[0]);
  const [device, setDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');

  const getWidth = () => {
    switch (device) {
      case 'mobile': return 'w-[375px] max-w-full';
      case 'tablet': return 'w-[768px] max-w-full';
      case 'desktop': return 'w-full';
    }
  };

  return (
    <div className="rounded-[2.5rem] border border-zinc-200/80 bg-white overflow-hidden shadow-lg shadow-zinc-950/5 font-sans">

      {/* Header Tabs */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between p-4 sm:p-5 border-b border-zinc-100 gap-4 bg-gradient-to-r from-zinc-50/60 to-zinc-50/40">
        <div className="flex overflow-x-auto hide-scrollbar gap-2 p-1">
          {demos.map((demo) => {
            const isSelected = activeDemo.id === demo.id;
            return (
              <button
                key={demo.id}
                onClick={() => setActiveDemo(demo)}
                className={`flex flex-col items-start px-4 py-2.5 rounded-2xl text-xs transition-all whitespace-nowrap cursor-pointer ${
                  isSelected
                    ? 'bg-zinc-900 shadow-md shadow-zinc-900/20 text-white font-bold'
                    : 'text-zinc-600 hover:text-zinc-800 hover:bg-zinc-100/60 border border-transparent font-semibold'
                }`}
              >
                <div className="flex items-center gap-1.5 mb-0.5">
                  <span className={`text-[9px] uppercase tracking-wider font-mono ${isSelected ? 'text-zinc-200' : 'text-zinc-900 font-bold'}`}>
                    {demo.badge}
                  </span>
                </div>
                <span className="text-sm">{demo.title}</span>
              </button>
            );
          })}
        </div>

        {/* Device Switcher & Launch Button */}
        <div className="flex items-center gap-3 self-end sm:self-center">
          <div className="flex items-center p-1 bg-white rounded-2xl border border-zinc-200/80 shadow-xs">
            <button
              onClick={() => setDevice('desktop')}
              className={`p-2 rounded-xl transition-all cursor-pointer ${device === 'desktop' ? 'bg-zinc-900 shadow-xs text-white' : 'text-zinc-500 hover:text-zinc-900'}`}
              title="Desktop View"
            >
              <Monitor className="w-4 h-4" />
            </button>
            <button
              onClick={() => setDevice('tablet')}
              className={`p-2 rounded-xl transition-all cursor-pointer ${device === 'tablet' ? 'bg-zinc-900 shadow-xs text-white' : 'text-zinc-500 hover:text-zinc-900'}`}
              title="Tablet View"
            >
              <Tablet className="w-4 h-4" />
            </button>
            <button
              onClick={() => setDevice('mobile')}
              className={`p-2 rounded-xl transition-all cursor-pointer ${device === 'mobile' ? 'bg-zinc-900 shadow-xs text-white' : 'text-zinc-500 hover:text-zinc-900'}`}
              title="Mobile View"
            >
              <Smartphone className="w-4 h-4" />
            </button>
          </div>

          <div className="w-px h-6 bg-zinc-200 hidden sm:block"></div>

          <a
            href={activeDemo.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-zinc-900 hover:bg-zinc-800 text-white rounded-2xl text-xs font-bold shadow-md shadow-zinc-900/20 transition-all hover:scale-105"
          >
            <span>Launch Demo</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Interactive Frame Container */}
      <div className="bg-zinc-100/90 p-3 sm:p-6 lg:p-8 flex justify-center items-start min-h-[580px] overflow-hidden transition-all duration-500 relative">
        <div
          className={`${getWidth()} h-[680px] bg-white rounded-3xl shadow-2xl transition-all duration-300 border border-zinc-200/80 overflow-hidden relative flex flex-col`}
        >
          {/* Top Browser Chrome */}
          <div className="h-11 bg-zinc-50 border-b border-zinc-200 flex items-center px-4 gap-2 w-full shrink-0">
             <div className="flex gap-1.5">
               <div className="w-2.5 h-2.5 rounded-full bg-rose-400"></div>
               <div className="w-2.5 h-2.5 rounded-full bg-amber-400"></div>
               <div className="w-2.5 h-2.5 rounded-full bg-emerald-400"></div>
             </div>
             <div className="flex-1 bg-white mx-4 rounded-xl border border-zinc-100 h-7 flex items-center px-3 justify-center gap-2 shadow-xs">
               <span className="text-[11px] text-zinc-800 font-mono font-medium truncate">
                 https://flowlym.tech{activeDemo.url}
               </span>
               <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-zinc-50 text-zinc-900 border border-zinc-200">
                 ⚡ VIBE CODED
               </span>
             </div>
          </div>

          <div className="w-full flex-1 relative bg-white">
            <iframe
              key={activeDemo.url}
              src={activeDemo.url}
              className="w-full h-full border-none"
              title={activeDemo.title}
              loading="lazy"
            />
          </div>
        </div>
      </div>

      {/* Visual Cards Grid */}
      <div className="p-6 sm:p-8 bg-white border-t border-zinc-100">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
          <div>
            <h3 className="text-base font-extrabold text-zinc-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-zinc-900" /> Web Engineering & VIBE CODED Catalog
            </h3>
            <p className="text-xs text-zinc-500 mt-0.5">
              Every showcase is built and vibe coded from scratch by FLOWLYM. Open in full screen or inspect code.
            </p>
          </div>
          <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-zinc-900 bg-zinc-50 px-3 py-1.5 rounded-full border border-zinc-200 w-fit">
            <Zap className="w-3.5 h-3.5 text-zinc-900 fill-zinc-900" /> 3 Live Interactive Apps
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {demos.map((d) => {
            const isSelected = activeDemo.id === d.id;
            return (
              <div
                key={d.id}
                className={`rounded-3xl border p-6 flex flex-col justify-between transition-all duration-200 ${
                  isSelected
                    ? 'border-zinc-900 bg-zinc-50/40 shadow-md shadow-zinc-900/10 ring-1 ring-zinc-900/30'
                    : 'border-zinc-100 bg-white hover:border-zinc-300 hover:shadow-md'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[10px] font-extrabold px-2.5 py-1 rounded-full bg-zinc-900 text-white tracking-wide flex items-center gap-1">
                      <Zap className="w-3 h-3 fill-white" /> VIBE CODED
                    </span>
                    <button
                      onClick={() => setActiveDemo(d)}
                      className="text-xs text-zinc-900 hover:text-zinc-800 font-bold cursor-pointer"
                    >
                      Preview Above ↑
                    </button>
                  </div>

                  <h4 className="font-extrabold text-zinc-900 text-lg mb-1">{d.title}</h4>
                  <div className="text-xs font-bold text-zinc-900 mb-2.5">{d.subtitle}</div>
                  <p className="text-xs text-zinc-600 leading-relaxed mb-4">{d.desc}</p>

                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {d.tech.map((t, idx) => (
                      <span key={idx} className="text-[10px] bg-zinc-100 border border-zinc-200 text-zinc-700 px-2.5 py-1 rounded-lg font-mono font-medium">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <a
                  href={d.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 bg-zinc-900 hover:bg-zinc-700 text-white rounded-2xl text-xs font-bold tracking-wide transition-all shadow-sm group cursor-pointer"
                >
                  <span>Launch Live Fullscreen</span>
                  <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
