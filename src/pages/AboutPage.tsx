import React from 'react';
import { PageRoute } from '../types';
import { 
  AGENCY_MISSION, 
  AGENCY_STATS, 
  AGENCY_VALUES, 
  AGENCY_STORY, 
  ENGINEERING_STANDARDS 
} from '../data/agencyData';
import { 
  ArrowRight, 
  ArrowUpRight, 
  CheckCircle2, 
  ShieldCheck, 
  Cpu, 
  Network, 
  Zap, 
  Lock, 
  Users, 
  Building2, 
  Layers, 
  Terminal, 
  Sparkles,
  Award,
  Compass,
  Check
} from 'lucide-react';
import { motion } from 'motion/react';

interface AboutPageProps {
  onNavigate: (route: PageRoute) => void;
  onOpenStartProject: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({
  onNavigate,
  onOpenStartProject
}) => {
  const getValueIcon = (name: string) => {
    switch (name) {
      case 'Cpu': return <Cpu className="w-5 h-5 text-zinc-900" />;
      case 'ShieldCheck': return <ShieldCheck className="w-5 h-5 text-zinc-900" />;
      case 'Network': return <Network className="w-5 h-5 text-zinc-900" />;
      case 'Zap': return <Zap className="w-5 h-5 text-zinc-900" />;
      case 'Lock': return <Lock className="w-5 h-5 text-zinc-900" />;
      case 'Users': return <Users className="w-5 h-5 text-zinc-900" />;
      default: return <Sparkles className="w-5 h-5 text-zinc-900" />;
    }
  };

  return (
    <div className="space-y-24 sm:space-y-32 pb-24 font-sans">
      
      {/* SECTION 1: ABOUT HERO & MISSION */}
      <section className="pt-32 sm:pt-40 pb-16 sm:pb-20 border-b border-zinc-200/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left Content */}
            <div className="lg:col-span-8 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-zinc-100 border border-zinc-200/80 rounded-full text-xs font-mono font-medium text-zinc-800">
                <Building2 className="w-3.5 h-3.5 text-zinc-600" />
                <span>About FLOWLYM</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-zinc-950 leading-[1.1]">
                Engineering high-reliability software & automation for ambitious companies.
              </h1>

              <p className="text-base sm:text-lg text-zinc-600 leading-relaxed max-w-3xl">
                {AGENCY_MISSION.headline} {AGENCY_MISSION.subheadline}
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={onOpenStartProject}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-zinc-950 text-white text-xs sm:text-sm font-semibold rounded-full hover:bg-zinc-800 transition-colors shadow-xs"
                >
                  <span>Work With FLOWLYM</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

              </div>
            </div>

            {/* Right Meta Card */}
            <div className="lg:col-span-4 p-6 sm:p-7 rounded-2xl bg-white border border-zinc-200/90 shadow-xs space-y-5">
              <div className="text-xs font-mono font-semibold uppercase tracking-wider text-zinc-400 pb-3 border-b border-zinc-100 flex items-center justify-between">
                <span>Agency Snapshot</span>
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              </div>

              <div className="space-y-4 text-xs">
                <div>
                  <span className="text-zinc-400 block font-mono">Agency Name</span>
                  <span className="font-semibold text-zinc-950 text-sm">FLOWLYM Automation</span>
                </div>
                <div>
                  <span className="text-zinc-400 block font-mono">Experience</span>
                  <span className="font-semibold text-zinc-900 text-sm">3+ Years of AI Automation Experience</span>
                </div>
                <div>
                  <span className="text-zinc-400 block font-mono">Engineering HQ</span>
                  <span className="font-semibold text-zinc-900 text-sm">Pakistan · Remote Delivery</span>
                </div>
                <div>
                  <span className="text-zinc-400 block font-mono">Specialization</span>
                  <span className="font-semibold text-zinc-900 text-sm">AI Automation, Web Development, Custom Software</span>
                </div>
                <div>
                  <span className="text-zinc-400 block font-mono">Service Standard</span>
                  <span className="font-semibold text-zinc-900 text-sm">Practical security & reliable workflow design</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-zinc-50 border border-zinc-200/80 text-[11px] text-zinc-600 leading-relaxed">
                "We don't build temporary hacks. We build deterministic, maintainable digital engines designed to scale with your business."
              </div>
            </div>
          </div>

          {/* Key Agency Statistics Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 pt-6">
            {AGENCY_STATS.map((stat, idx) => (
              <div 
                key={idx} 
                className="p-5 sm:p-6 rounded-2xl bg-white border border-zinc-200/90 shadow-2xs space-y-2 hover:border-zinc-300 transition-colors"
              >
                <div className="text-3xl sm:text-4xl font-bold font-mono text-zinc-950 tracking-tight">
                  {stat.value}
                </div>
                <div className="font-semibold text-xs sm:text-sm text-zinc-900">
                  {stat.label}
                </div>
                <p className="text-[11px] sm:text-xs text-zinc-500 leading-relaxed">
                  {stat.detail}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* SECTION 2: OUR STORY & WHY WE EXIST */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          <div className="lg:col-span-5 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-zinc-100 border border-zinc-200/80 rounded-full text-xs font-mono font-medium text-zinc-800">
              <Compass className="w-3.5 h-3.5 text-zinc-600" />
              <span>Our Origins</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-zinc-950">
              {AGENCY_STORY.originTitle}
            </h2>
            <p className="text-sm text-zinc-600 leading-relaxed">
              FLOWLYM was created to turn hands-on automation experience into practical systems that growing businesses can actually use and maintain.
            </p>
          </div>

          <div className="lg:col-span-7 space-y-5 text-sm sm:text-base text-zinc-700 leading-relaxed bg-white p-6 sm:p-8 rounded-2xl border border-zinc-200/90 shadow-2xs">
            <p>{AGENCY_STORY.paragraph1}</p>
            <p>{AGENCY_STORY.paragraph2}</p>
            <p className="text-zinc-900 font-medium">{AGENCY_STORY.paragraph3}</p>
          </div>

        </div>
      </section>

      {/* SECTION 3: CORE ENGINEERING PRINCIPLES & VALUES */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-zinc-100 border border-zinc-200/80 rounded-full text-xs font-mono font-medium text-zinc-800">
            <Award className="w-3.5 h-3.5 text-zinc-600" />
            <span>Guiding Principles</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-zinc-950">
            How We Build: The FLOWLYM Engineering Standard
          </h2>
          <p className="text-zinc-600 text-xs sm:text-sm max-w-2xl leading-relaxed">
            Every software system, AI pipeline, and automated workflow we produce is governed by strict engineering values.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {AGENCY_VALUES.map((val) => (
            <div
              key={val.id}
              className="p-6 sm:p-7 rounded-2xl bg-white border border-zinc-200/90 shadow-2xs hover:border-zinc-300 hover:shadow-xs transition-all duration-150 flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-zinc-100 border border-zinc-200/80 flex items-center justify-center">
                  {getValueIcon(val.iconName)}
                </div>
                <h3 className="text-base sm:text-lg font-bold text-zinc-950 tracking-tight">
                  {val.title}
                </h3>
                <div className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider">
                  {val.tagline}
                </div>
                <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                  {val.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 5: RELIABILITY PROTOCOL & ENGINEERING STANDARDS */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-10 rounded-2xl bg-zinc-950 text-white space-y-8 shadow-md">
          
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-zinc-900 border border-zinc-800 rounded-full text-xs font-mono text-zinc-300">
              <Terminal className="w-3.5 h-3.5 text-zinc-300" />
              <span>Production Protocol</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Defensive Engineering Standards
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
              We design workflows with the reality of third-party APIs in mind: rate limits, transient failures, malformed data and network interruptions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {ENGINEERING_STANDARDS.map((std, idx) => (
              <div 
                key={idx}
                className="p-5 rounded-xl bg-zinc-900 border border-zinc-800 space-y-2"
              >
                <div className="flex items-center gap-2 text-sm font-semibold text-white">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{std.title}</span>
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  {std.desc}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* SECTION 6: HOW WE COLLABORATE (DELIVERY SPRINT ROADMAP) */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-zinc-100 border border-zinc-200/80 rounded-full text-xs font-mono font-medium text-zinc-800">
            <Layers className="w-3.5 h-3.5 text-zinc-600" />
            <span>Collaboration Workflow</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-zinc-950">
            How You Work With FLOWLYM
          </h2>
          <p className="text-zinc-600 text-xs sm:text-sm max-w-2xl leading-relaxed">
            Direct, senior-led execution with no account managers in the middle. We move from discovery to production swiftly.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              step: '01',
              title: 'Technical Discovery Call',
              desc: 'We review your workflows, existing software APIs, data schemas, and identify high-leverage bottlenecks.'
            },
            {
              step: '02',
              title: 'Blueprint & Architecture',
              desc: 'We deliver an interactive visual node map, data flow diagram, and fixed milestone scope proposal.'
            },
            {
              step: '03',
              title: 'Agile Staging Sprints',
              desc: 'We build in live sandboxes with automated retry queues, guardrails, and demo video walk-throughs.'
            },
            {
              step: '04',
              title: 'Live Launch & Handoff',
              desc: 'Seamless deployment to production with complete runbooks, team onboarding, and proactive monitoring.'
            }
          ].map((item, idx) => (
            <div 
              key={idx}
              className="p-6 rounded-2xl bg-white border border-zinc-200/90 shadow-2xs space-y-3"
            >
              <span className="text-2xl font-mono font-bold text-zinc-900 block">
                {item.step}
              </span>
              <h3 className="text-base font-bold text-zinc-950">
                {item.title}
              </h3>
              <p className="text-xs text-zinc-600 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 7: FINAL CTA BANNER */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-2xl bg-zinc-950 text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-8 shadow-lg">
          <div className="space-y-3 max-w-xl">
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white">
              Ready to automate your operations with FLOWLYM?
            </h2>
            <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
              Tell us about the process you want to improve. We'll map the workflow, identify the highest-value automation opportunities and recommend a practical implementation path.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
            <button
              onClick={onOpenStartProject}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white text-zinc-950 text-xs sm:text-sm font-semibold rounded-full hover:bg-zinc-100 transition-colors shrink-0 shadow-xs"
            >
              <span>Start Technical Discovery</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onNavigate('roi-calculator')}
              className="inline-flex items-center justify-center gap-2 px-5 py-3.5 bg-zinc-900 text-zinc-200 border border-zinc-800 text-xs sm:text-sm font-medium rounded-full hover:bg-zinc-800 transition-colors shrink-0"
            >
              <span>Calculate Savings</span>
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
