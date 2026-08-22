import React, { useState } from 'react';
import { PageRoute, ProjectItem } from '../types';
import { SERVICES_DATA } from '../data/servicesData';
import { PROJECTS_DATA } from '../data/projectsData';
import { AGENCY_VALUES, AGENCY_STATS, AGENCY_MISSION } from '../data/agencyData';
import { 
  ArrowRight, 
  ArrowUpRight, 
  CheckCircle2, 
  Code, 
  Smartphone, 
  Cpu, 
  Globe, 
  Bot, 
  Cloud, 
  Layout, 
  Terminal,
  Zap,
  ChevronRight,
  ShieldCheck,
  Server,
  Users,
  Building2,
  Lock,
  Clock,
  Mail,
  Linkedin,
  Github,
  Check,
  Activity,
  Workflow,
  Sparkles
} from 'lucide-react';
import { FlowlymLogo } from '../components/FlowlymLogo';
import BlurText from '../components/BlurText';

interface HomePageProps {
  onNavigate: (route: PageRoute) => void;
  onOpenStartProject: () => void;
  onSelectProject: (project: ProjectItem) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onOpenStartProject,
  onSelectProject
}) => {
  const [activeCodeTab, setActiveCodeTab] = useState<'api' | 'automation' | 'cloud'>('automation');

  const getServiceIcon = (name: string) => {
    switch (name) {
      case 'Globe': return <Globe className="w-5 h-5 text-zinc-900" />;
      case 'Smartphone': return <Smartphone className="w-5 h-5 text-zinc-900" />;
      case 'Cpu': return <Cpu className="w-5 h-5 text-zinc-900" />;
      case 'Bot': return <Bot className="w-5 h-5 text-zinc-900" />;
      case 'Cloud': return <Cloud className="w-5 h-5 text-zinc-900" />;
      case 'Layout': return <Layout className="w-5 h-5 text-zinc-900" />;
      default: return <Workflow className="w-5 h-5 text-zinc-900" />;
    }
  };

  const techBadges = [
    'n8n', 'HubSpot CRM', 'Google Workspace', 'Tally', 'Meta APIs', 'Shopify', 'PostgreSQL', 'Python', 'TypeScript', 'Node.js'
  ];

  return (
    <div className="space-y-24 sm:space-y-32 pb-24 font-sans">
      
      {/* SECTION 1: HERO SECTION */}
      <section className="pt-32 sm:pt-40 pb-16 sm:pb-24 border-b border-zinc-200/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Column: Typography & CTAs */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-zinc-950 text-white rounded-full text-xs font-mono font-medium shadow-xs hero-enter" style={{'--hero-delay': '80ms'} as React.CSSProperties}>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>FLOWLYM · AI Automation & Software</span>
              </div>

              <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-zinc-950 leading-[1.08]">
                <BlurText
                  text="Custom AI automation systems that power growing businesses."
                  delay={95}
                  animateBy="words"
                  direction="top"
                  className="block"
                />
              </h1>

              <p className="text-zinc-600 text-base sm:text-lg leading-relaxed max-w-2xl hero-enter" style={{'--hero-delay': '720ms'} as React.CSSProperties}>
                We engineer intelligent, fault-tolerant automations and AI pipelines that connect your CRMs, documents, marketing, and operational workflows into seamless engines.
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2 hero-enter" style={{'--hero-delay': '840ms'} as React.CSSProperties}>
                <button
                  onClick={onOpenStartProject}
                  className="group inline-flex items-center gap-2 px-6 py-3.5 bg-zinc-950 text-white text-xs sm:text-sm font-semibold rounded-full hover:bg-zinc-800 transition-colors shadow-xs cursor-pointer"
                >
                  <span>Book Technical Discovery</span>
                  <ArrowRight className="w-4 h-4 text-zinc-400 group-hover:translate-x-0.5 group-hover:text-white transition-all" />
                </button>
                <button
                  onClick={() => onNavigate('projects')}
                  className="inline-flex items-center gap-2 px-5 py-3.5 bg-white text-zinc-950 border border-zinc-300 text-xs sm:text-sm font-semibold rounded-full hover:border-zinc-400 hover:bg-zinc-50 transition-all shadow-2xs cursor-pointer"
                >
                  <span>Explore Projects</span>
                  <ArrowUpRight className="w-4 h-4 text-zinc-500" />
                </button>
              </div>

              {/* Honest experience signals */}
              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-zinc-200/80 hero-enter" style={{'--hero-delay': '980ms'} as React.CSSProperties}>
                <div><div className="text-xl sm:text-2xl font-bold font-mono text-zinc-950">3+</div><div className="text-[11px] text-zinc-500 font-medium">Years in AI Automation</div></div>
                <div><div className="text-xl sm:text-2xl font-bold font-mono text-zinc-950">Real</div><div className="text-[11px] text-zinc-500 font-medium">Production Workflows</div></div>
                <div><div className="text-xl sm:text-2xl font-bold font-mono text-zinc-950">Direct</div><div className="text-[11px] text-zinc-500 font-medium">Technical Collaboration</div></div>
              </div>

              <button onClick={() => onNavigate('roi-calculator')} className="inline-flex items-center gap-2 text-xs font-semibold text-zinc-900 hover:text-zinc-700 transition-colors">Estimate automation savings <ArrowRight className="w-3.5 h-3.5" /></button>

            </div>

            {/* Right Column: Interactive Code & Architecture Visualizer */}
            <div className="lg:col-span-5">
              <div className="automation-terminal rounded-2xl bg-zinc-950 text-zinc-300 border border-zinc-800 shadow-xl overflow-hidden font-mono text-xs">
                
                {/* Visualizer Top Bar */}
                <div className="automation-terminal__bar px-4 py-3 bg-zinc-900/90 border-b border-zinc-800 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-zinc-700"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-zinc-700"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-zinc-700"></span>
                    <span className="text-[10px] text-zinc-400 ml-2 font-medium">flowlym-orchestrator.ts</span>
                  </div>
                  <div className="flex gap-1 bg-zinc-950 p-1 rounded-lg border border-zinc-800 text-[10px]">
                    <button
                      onClick={() => setActiveCodeTab('automation')}
                      className={`px-2 py-0.5 rounded ${activeCodeTab === 'automation' ? 'bg-zinc-800 text-white font-bold' : 'text-zinc-400 hover:text-zinc-200'}`}
                    >
                      Pipeline
                    </button>
                    <button
                      onClick={() => setActiveCodeTab('api')}
                      className={`px-2 py-0.5 rounded ${activeCodeTab === 'api' ? 'bg-zinc-800 text-white font-bold' : 'text-zinc-400 hover:text-zinc-200'}`}
                    >
                      Schema
                    </button>
                    <button
                      onClick={() => setActiveCodeTab('cloud')}
                      className={`px-2 py-0.5 rounded ${activeCodeTab === 'cloud' ? 'bg-zinc-800 text-white font-bold' : 'text-zinc-400 hover:text-zinc-200'}`}
                    >
                      DLQ Queue
                    </button>
                  </div>
                </div>

                {/* Visualizer Content */}
                <div className="p-4 sm:p-5 overflow-x-auto space-y-2 text-[11px] leading-relaxed text-zinc-300">
                  {activeCodeTab === 'automation' && (
                    <>
                      <p><span className="text-purple-400">import</span> &#123; <span className="text-amber-300">AutomationWorkflow</span>, <span className="text-amber-300">RetryHandler</span> &#125; <span className="text-purple-400">from</span> <span className="text-emerald-400">'n8n / automation layer'</span>;</p>
                      <p className="text-zinc-500">// 1. Listen for CRM Webhook & Inbound Lead</p>
                      <p><span className="text-blue-400">const</span> workflow = <span className="text-purple-400">new</span> <span className="text-amber-300">AutomationWorkflow</span>(&#123;</p>
                      <p className="pl-4">source: <span className="text-emerald-400">'hubspot.lead_submitted'</span>,</p>
                      <p className="pl-4">aiModel: <span className="text-emerald-400">'structured AI model'</span>,</p>
                      <p className="pl-4">retryPolicy: <span className="text-purple-400">new</span> <span className="text-amber-300">RetryHandler</span>(&#123; maxRetries: <span className="text-amber-300">5</span> &#125;)</p>
                      <p>&#125;);</p>
                      <p className="text-zinc-500">// 2. Execute Document Extraction & CRM Sync</p>
                      <p><span className="text-blue-400">await</span> workflow.<span className="text-blue-300">dispatch</span>(&#123;</p>
                      <p className="pl-4">enrichWith: [<span className="text-emerald-400">'WhatsApp'</span>, <span className="text-emerald-400">'GoogleDrive'</span>, <span className="text-emerald-400">'Stripe'</span>],</p>
                      <p className="pl-4">status: <span className="text-emerald-400">'STATUS: COMPLETED'</span></p>
                      <p>&#125;);</p>
                    </>
                  )}

                  {activeCodeTab === 'api' && (
                    <>
                      <p><span className="text-blue-400">interface</span> <span className="text-amber-300">EnterpriseSchema</span> &#123;</p>
                      <p className="pl-4">applicantId: <span className="text-cyan-300">string</span>;</p>
                      <p className="pl-4">confidenceScore: <span className="text-cyan-300">number</span>;</p>
                      <p className="pl-4">extractedFields: <span className="text-cyan-300">Record&lt;string, unknown&gt;</span>;</p>
                      <p className="pl-4">validation: <span className="text-emerald-400">'PASSED'</span>;</p>
                      <p className="pl-4">crmSyncStatus: <span className="text-emerald-400">'READY'</span>;</p>
                      <p>&#125;</p>
                    </>
                  )}

                  {activeCodeTab === 'cloud' && (
                    <>
                      <p className="text-emerald-400">&#10003; Redis Queue Depth: 0 (Instant throughput)</p>
                      <p className="text-emerald-400">&#10003; Structured retries &amp; failure handling</p>
                      <p className="text-emerald-400">&#10003; Dead-Letter Queue: Active &amp; Isolated</p>
                      <p className="text-zinc-400">&#10003; API, CRM &amp; webhook integrations</p>
                    </>
                  )}
                </div>

                <div className="px-4 py-2.5 bg-zinc-900/60 border-t border-zinc-800 text-[10px] text-zinc-400 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                    <span>FLOWLYM Engine: Production workflow engineering</span>
                  </div>
                  <span className="font-mono text-zinc-500">Latency: 140ms</span>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 2: SERVICES SHOWCASE */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-zinc-200 pb-6">
          <div className="space-y-1">
            <span className="text-xs font-mono text-zinc-500 uppercase tracking-wider">
              Core Capabilities
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-950">
              What FLOWLYM Builds
            </h2>
          </div>
          <button
            onClick={() => onNavigate('services')}
            className="text-xs font-semibold text-zinc-900 hover:text-zinc-600 flex items-center gap-1 transition-colors cursor-pointer"
          >
            <span>View All Services</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES_DATA.slice(0, 6).map((service) => (
            <div
              key={service.id}
              onClick={() => onNavigate('services')}
              className="p-6 rounded-2xl bg-white border border-zinc-200/90 shadow-2xs hover:border-zinc-300 hover:shadow-xs transition-all duration-150 flex flex-col justify-between group cursor-pointer"
            >
              <div className="space-y-4">
                <div className="w-10 h-10 rounded-xl bg-zinc-100 border border-zinc-200/80 flex items-center justify-center group-hover:bg-zinc-950 group-hover:text-white transition-colors">
                  {getServiceIcon(service.iconName)}
                </div>
                <div>
                  <h3 className="text-base font-bold text-zinc-950 tracking-tight">
                    {service.title}
                  </h3>
                  <p className="text-xs text-zinc-600 mt-1 leading-relaxed line-clamp-2">
                    {service.shortDesc}
                  </p>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-zinc-100 flex items-center justify-between text-xs text-zinc-500 font-medium">
                <span>{service.techStack.slice(0, 2).join(' · ')}</span>
                <ArrowRight className="w-3.5 h-3.5 text-zinc-400 group-hover:translate-x-1 group-hover:text-zinc-950 transition-all" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 3: AI DEMO */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[2rem] border border-zinc-800 bg-zinc-950 text-white p-7 sm:p-9">
          <div className="absolute -top-24 right-10 w-72 h-72 rounded-full bg-violet-600/20 blur-3xl" />
          <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-7">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] font-bold text-violet-300">
                <Sparkles className="w-3.5 h-3.5" /> Live AI Demo
              </div>
              <h2 className="mt-3 text-2xl sm:text-3xl font-bold tracking-tight">Don't just read about AI. Talk to one.</h2>
              <p className="mt-3 text-sm text-zinc-400 leading-6">Test our AI receptionist directly in the browser and see what a production-minded voice agent can feel like for a real business.</p>
            </div>
            <button onClick={() => onNavigate('ai-demos')} className="shrink-0 inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl bg-white text-zinc-950 text-xs font-bold hover:bg-violet-100 transition-all">Open AI Demos <ArrowRight className="w-4 h-4" /></button>
          </div>
        </div>
      </section>

      {/* SECTION 3: FEATURED AUTOMATION PROJECTS */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-zinc-200 pb-6">
          <div className="space-y-1">
            <span className="text-xs font-mono text-zinc-500 uppercase tracking-wider">
              Selected Systems Portfolio
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-950">
              Featured Case Studies & Workflows
            </h2>
          </div>
          <button
            onClick={() => onNavigate('projects')}
            className="text-xs font-semibold text-zinc-900 hover:text-zinc-600 flex items-center gap-1 transition-colors cursor-pointer"
          >
            <span>View All Projects</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {PROJECTS_DATA.slice(0, 4).map((project) => (
            <div
              key={project.id}
              onClick={() => onSelectProject(project)}
              className="p-6 sm:p-7 rounded-2xl bg-white border border-zinc-200/90 shadow-2xs hover:border-zinc-300 hover:shadow-xs transition-all duration-150 flex flex-col justify-between group cursor-pointer space-y-5"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-[11px] font-mono text-zinc-500">
                  <span className="font-semibold text-zinc-900">{project.client}</span>
                  <span className="px-2 py-0.5 bg-zinc-100 rounded border border-zinc-200">{project.category}</span>
                </div>
                
                <h3 className="text-lg font-bold text-zinc-950 group-hover:text-zinc-700 transition-colors">
                  {project.title}
                </h3>

                <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                  {project.shortDesc}
                </p>

                {/* Key Capabilities Preview */}
                <div className="space-y-1 pt-1">
                  <div className="text-[10px] font-mono uppercase text-zinc-400 tracking-wider">Key Capabilities</div>
                  <ul className="space-y-1">
                    {project.keyCapabilities.slice(0, 2).map((cap, idx) => (
                      <li key={idx} className="flex items-center gap-1.5 text-xs text-zinc-700">
                        <Check className="w-3 h-3 text-emerald-600 shrink-0" />
                        <span className="truncate">{cap}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-4 border-t border-zinc-100 flex items-center justify-between">
                <div className="flex flex-wrap gap-1">
                  {project.technologyStack.slice(0, 3).map((tech, idx) => (
                    <span key={idx} className="px-2 py-0.5 bg-zinc-100 text-zinc-700 text-[10px] font-mono rounded">
                      {tech}
                    </span>
                  ))}
                </div>
                <span className="text-xs font-semibold text-zinc-900 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  <span>View Case Study</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-zinc-500" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 4: HOW WE WORK */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-[2rem] border border-zinc-200 bg-white p-7 sm:p-9 shadow-sm">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5">
            <div className="max-w-2xl">
              <span className="text-[10px] uppercase tracking-[0.18em] font-bold text-violet-600">A practical delivery process</span>
              <h2 className="mt-2 text-2xl sm:text-3xl font-bold tracking-tight text-zinc-950">From messy manual work to a system your team can actually use.</h2>
              <p className="mt-3 text-sm leading-6 text-zinc-600">We start with the business process, not the AI model. Then we build the integrations, automate the repetitive steps and leave clear human hand-off points for exceptions.</p>
            </div>
            <button onClick={() => onNavigate('contact')} className="inline-flex items-center gap-2 text-xs font-bold text-zinc-900 hover:text-violet-700">Talk through your process <ArrowRight className="w-4 h-4" /></button>
          </div>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-3">
            {[
              ['01', 'Map the workflow', 'We identify triggers, decisions, systems, bottlenecks and the parts that still need a human.'],
              ['02', 'Build the automation', 'n8n, APIs, AI agents, CRM logic and dashboards are connected into one operational flow.'],
              ['03', 'Test & hand over', 'We test edge cases, add failure paths and make the final system understandable to the people using it.']
            ].map(([num, title, text]) => (
              <div key={num} className="rounded-2xl border border-zinc-100 bg-zinc-50 p-5">
                <span className="font-mono text-[10px] font-bold text-violet-600">{num}</span>
                <h3 className="mt-3 text-sm font-bold text-zinc-950">{title}</h3>
                <p className="mt-2 text-xs leading-5 text-zinc-600">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: TEAM TEASER */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-[2rem] border border-zinc-200 bg-white p-7 sm:p-9 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5">
            <div>
              <span className="text-[10px] uppercase tracking-[0.18em] font-bold text-violet-600">The people behind the systems</span>
              <h2 className="mt-2 text-2xl sm:text-3xl font-bold tracking-tight">Meet the FLOWLYM team.</h2>
              <p className="mt-2 max-w-2xl text-sm text-zinc-600 leading-6">AI automation, software engineering and AI solutions — with the people building the work staying close to the implementation.</p>
            </div>
            <button onClick={() => onNavigate('team')} className="inline-flex items-center gap-2 text-xs font-bold text-zinc-900 hover:text-violet-600 transition-colors">Meet the team <ArrowRight className="w-4 h-4" /></button>
          </div>
          <div className="mt-7 grid grid-cols-1 md:grid-cols-3 gap-3">
            {['Muhammad Shahmir · AI Automation Engineer', 'Muhammad Sajawal · Software Developer', 'Muhammad Huzaifa · AI Solutions Engineer'].map((person, i) => (
              <div key={person} className="flex items-center gap-3 rounded-2xl border border-zinc-100 bg-zinc-50 p-4">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${['from-violet-500 to-cyan-400','from-cyan-400 to-blue-500','from-fuchsia-500 to-amber-400'][i]} p-px`}><div className="w-full h-full rounded-[11px] bg-zinc-950 text-white flex items-center justify-center text-[10px] font-bold">{i === 2 ? 'MH' : 'MS'}</div></div>
                <span className="text-xs font-semibold text-zinc-800">{person}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5: DEDICATED ABOUT FLOWLYM SECTION (Before Contact) */}
      <section id="homepage-about-section" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-zinc-200 pb-6">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold text-zinc-500 uppercase tracking-wider">
              <Building2 className="w-3.5 h-3.5" />
              <span>About FLOWLYM</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-zinc-950">
              Deterministic Engineering. Zero AI Slop.
            </h2>
          </div>
          <button
            onClick={() => onNavigate('about')}
            className="text-xs font-semibold text-zinc-900 hover:text-zinc-600 flex items-center gap-1 transition-colors shrink-0 cursor-pointer"
          >
            <span>Read Full Agency Story</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Mission & Story Box */}
          <div className="lg:col-span-6 p-6 sm:p-8 rounded-2xl bg-white border border-zinc-200/90 shadow-2xs space-y-4">
            <h3 className="text-lg font-bold text-zinc-950 tracking-tight">
              {AGENCY_MISSION.headline}
            </h3>
            <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
              {AGENCY_MISSION.subheadline}
            </p>
            <div className="pt-3 border-t border-zinc-100 flex items-center justify-between text-xs font-mono text-zinc-500">
              <span>3+ Years of AI Automation Experience</span>
              <span>Pakistan · Remote Delivery</span>
            </div>
          </div>

          {/* Core Values Mini Cards */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {AGENCY_VALUES.slice(0, 4).map((val) => (
              <div key={val.id} className="p-4 sm:p-5 rounded-2xl bg-zinc-50 border border-zinc-200/80 space-y-2">
                <h4 className="text-xs font-bold text-zinc-950 uppercase tracking-tight">
                  {val.title}
                </h4>
                <p className="text-[11px] text-zinc-600 leading-relaxed">
                  {val.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 7: FINAL CALLOUT / CONTACT PREPARATION SECTION */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-2xl bg-zinc-950 text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 max-w-xl">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Ready to eliminate manual operational friction?
            </h2>
            <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
              Tell us what you want to automate or build. We'll map the process and recommend a practical next step.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0">
            <button
              onClick={onOpenStartProject}
              className="px-6 py-3.5 bg-white text-zinc-950 text-xs sm:text-sm font-semibold rounded-full hover:bg-zinc-100 transition-colors shadow-xs flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Start a Project</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onNavigate('contact')}
              className="px-5 py-3.5 bg-zinc-900 text-zinc-200 border border-zinc-800 text-xs sm:text-sm font-medium rounded-full hover:bg-zinc-800 transition-colors flex items-center justify-center cursor-pointer"
            >
              <span>Contact Us</span>
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
