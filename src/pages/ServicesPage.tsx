import React, { useMemo, useState } from 'react';
import { PageRoute } from '../types';
import { SERVICES_DATA } from '../data/servicesData';
import { Globe, Smartphone, Cpu, Server, Sparkles, Bot, ShieldCheck, CheckCircle2, ArrowRight, Code, Workflow } from 'lucide-react';
import { motion } from 'motion/react';

interface ServicesPageProps { onNavigate: (route: PageRoute) => void; onOpenStartProject: () => void; }

export const ServicesPage: React.FC<ServicesPageProps> = ({ onOpenStartProject }) => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'ai-automation' | 'development'>('all');

  const getServiceIcon = (name: string) => {
    const props = { className: 'w-5 h-5' };
    switch (name) {
      case 'Globe': return <Globe {...props} />;
      case 'Smartphone': return <Smartphone {...props} />;
      case 'Cpu': return <Cpu {...props} />;
      case 'Server': return <Server {...props} />;
      case 'Sparkles': return <Sparkles {...props} />;
      case 'Bot': return <Bot {...props} />;
      case 'ShieldCheck': return <ShieldCheck {...props} />;
      default: return <Code {...props} />;
    }
  };

  const aiServices = SERVICES_DATA.filter((s) => s.category === 'ai-automation');
  const otherServices = SERVICES_DATA.filter((s) => s.category !== 'ai-automation');
  const filtered = useMemo(() => activeCategory === 'all' ? SERVICES_DATA : SERVICES_DATA.filter((s) => s.category === activeCategory), [activeCategory]);

  const ServiceCard = ({ service, index }: { service: typeof SERVICES_DATA[number]; index: number }) => (
    <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .12 }} transition={{ duration: .4, delay: Math.min(index * .04, .2) }} className="group p-6 sm:p-7 rounded-3xl bg-white border border-zinc-200 hover:border-zinc-300 hover:shadow-xs transition-all flex flex-col justify-between space-y-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between"><div className="w-11 h-11 rounded-2xl bg-zinc-100 border border-zinc-200 flex items-center justify-center text-zinc-900 group-hover:scale-105 transition-transform">{getServiceIcon(service.iconName)}</div><span className="text-[10px] font-mono text-zinc-400">{service.avgTimeline}</span></div>
        <div className="space-y-1.5"><h2 className="text-xl font-bold tracking-tight text-zinc-950 group-hover:text-zinc-700 transition-colors">{service.title}</h2><p className="text-zinc-600 text-xs leading-relaxed">{service.fullDesc}</p></div>
        <div className="pt-3 border-t border-zinc-100 space-y-2"><span className="text-[10px] font-mono font-semibold text-zinc-400 uppercase tracking-wider">Typical deliverables</span><ul className="space-y-1.5 text-xs text-zinc-700">{service.deliverables.slice(0, 4).map((item) => <li key={item} className="flex items-start gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" /><span>{item}</span></li>)}</ul></div>
        <div className="flex flex-wrap gap-1.5">{service.techStack.slice(0, 6).map((tech) => <span key={tech} className="px-2 py-0.5 bg-zinc-100 text-zinc-600 font-mono text-[10px] rounded-md">{tech}</span>)}</div>
      </div>
      <div className="pt-4 border-t border-zinc-100 flex items-center justify-between gap-3"><span className="text-[11px] text-zinc-500 leading-relaxed">{service.businessImpact}</span><button onClick={onOpenStartProject} className="px-4 py-2.5 bg-zinc-950 text-white text-xs font-semibold rounded-xl hover:bg-zinc-800 transition-colors flex items-center gap-1.5 shrink-0">Discuss <ArrowRight className="w-3 h-3" /></button></div>
    </motion.div>
  );

  return (
    <div className="pt-32 pb-24 space-y-16 sm:space-y-20">
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl space-y-5"><div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 border border-zinc-200 text-zinc-800 text-[11px] font-mono font-semibold"><Workflow className="w-3.5 h-3.5 text-zinc-600" /> Services</div><h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-zinc-950 leading-[1.05]">Automation first. Software when the process needs it.</h1><p className="text-base sm:text-lg text-zinc-600 leading-relaxed max-w-2xl">AI automation is our primary focus, supported by web development, backend engineering, mobile apps and custom software.</p></div>
        <div className="mt-8 flex flex-wrap gap-2">{[{id:'all',label:'All services'},{id:'ai-automation',label:'AI & Automation'},{id:'development',label:'Web & Software'}].map((cat) => <button key={cat.id} onClick={() => setActiveCategory(cat.id as typeof activeCategory)} className={`px-4 py-2 rounded-xl text-xs font-semibold border transition-all ${activeCategory === cat.id ? 'bg-zinc-950 text-white border-zinc-950' : 'bg-white text-zinc-600 border-zinc-200 hover:border-zinc-300 hover:text-zinc-950'}`}>{cat.label}</button>)}</div>
      </section>

      {activeCategory === 'all' ? <>
        <ServiceSection title="AI automation & intelligent workflows" description="The services closest to the work we do most often: connecting business tools, automating repetitive operations and adding AI where it creates real leverage." services={aiServices} renderCard={ServiceCard} />
        <ServiceSection title="Web, software & engineering" description="When automation needs a custom application, interface or backend layer, we build the software around it." services={otherServices} renderCard={ServiceCard} />
      </> : <ServiceSection title={activeCategory === 'ai-automation' ? 'AI automation & intelligent workflows' : 'Web & software engineering'} description="Focused engineering services built around the project's actual requirements." services={filtered} renderCard={ServiceCard} />}

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"><div className="rounded-3xl bg-zinc-950 border border-zinc-800 p-8 sm:p-10 text-white flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl"><div><p className="text-xs font-mono uppercase tracking-widest text-zinc-400 mb-2">Let's build the right layer</p><h2 className="text-2xl sm:text-3xl font-bold">Have a manual process worth fixing?</h2><p className="text-sm text-zinc-400 mt-2 max-w-xl">Bring the workflow, tools and constraints. We'll tell you what should be automated, what should stay human and what software is actually necessary.</p></div><button onClick={onOpenStartProject} className="px-5 py-3 rounded-xl bg-white text-zinc-950 text-sm font-semibold hover:bg-zinc-100 transition-colors shrink-0">Start a project <ArrowRight className="w-4 h-4 inline ml-1" /></button></div></section>
    </div>
  );
};

const ServiceSection = ({ title, description, services, renderCard }: { title: string; description: string; services: typeof SERVICES_DATA; renderCard: React.ComponentType<{ service: typeof SERVICES_DATA[number]; index: number }> }) => { const RenderCard = renderCard; return <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-7"><div className="max-w-2xl"><h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-950">{title}</h2><p className="text-sm text-zinc-500 mt-2 leading-relaxed">{description}</p></div><div className="grid grid-cols-1 md:grid-cols-2 gap-5">{services.map((service, index) => <RenderCard key={service.id} service={service} index={index} />)}</div></section>; }
