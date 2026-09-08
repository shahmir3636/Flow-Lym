import React, { useEffect, useState } from 'react';
import { ProjectItem } from '../types';
import { X, ArrowRight, Check, Workflow, Cpu, Layers3, Target, PlugZap, Images } from 'lucide-react';
import { motion } from 'motion/react';

interface ProjectModalProps { project: ProjectItem | null; onClose: () => void; onStartProject: () => void; onOpenDemo?: () => void; }

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose, onStartProject, onOpenDemo }) => {
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    if (!project) return;
    setActiveImage(0);
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const handleKey = (event: KeyboardEvent) => event.key === 'Escape' && onClose();
    window.addEventListener('keydown', handleKey);
    return () => { document.body.style.overflow = previous; window.removeEventListener('keydown', handleKey); };
  }, [project, onClose]);

  if (!project) return null;
  const gallery = project.gallery?.length ? project.gallery : project.image ? [project.image] : [];
  const stages = project.workflowSteps?.length || project.diagramNodes?.length || 0;
  const integrations = project.integrations?.length || 0;
  const capabilities = project.keyCapabilities.length;

  return (
    <div className="fixed inset-0 z-[100] bg-zinc-900/80 backdrop-blur-md p-2 sm:p-5 flex items-center justify-center" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className="w-full max-w-6xl max-h-[96vh] overflow-y-auto rounded-[28px] bg-white shadow-2xl border border-white/20">
        <div className="sticky top-0 z-20 bg-white/95 backdrop-blur border-b border-zinc-200 px-4 sm:px-7 py-3.5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0"><span className="px-2.5 py-1 rounded-full bg-zinc-50 text-zinc-800 border border-zinc-100 text-[10px] font-mono font-bold">PROJECT {project.projectNumber}</span>{project.client && <span className="text-xs text-zinc-400 truncate">{project.client}</span>}</div>
          <button onClick={onClose} aria-label="Close project details" className="w-9 h-9 rounded-full bg-zinc-100 hover:bg-zinc-200 flex items-center justify-center text-zinc-500 shrink-0"><X className="w-4 h-4" /></button>
        </div>

        <div className="p-5 sm:p-8 space-y-8">
          <header className="max-w-4xl space-y-4">
            <div className="flex flex-wrap gap-2">{project.categoryTags.map((tag) => <span key={tag} className="px-2.5 py-1 rounded-full bg-zinc-100 border border-zinc-200 text-[10px] text-zinc-500">{tag}</span>)}</div>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-zinc-900">{project.title}</h2>
            <p className="text-zinc-500 leading-relaxed max-w-3xl">{project.fullDesc}</p>
          </header>

          <div className="grid grid-cols-3 gap-3">
            <ArchitectureMetric label="Workflow stages" value={String(stages || '—')} />
            <ArchitectureMetric label="Integrations" value={String(integrations || '—')} />
            <ArchitectureMetric label="Capabilities" value={String(capabilities)} />
          </div>

          {gallery.length > 0 && (
            <section className="rounded-3xl bg-zinc-900 p-3 sm:p-4 space-y-3">
              <div className="flex items-center justify-between px-1"><div className="flex items-center gap-2 text-white text-sm font-semibold"><Images className="w-4 h-4 text-zinc-300" /> Workflow gallery</div><span className="text-[10px] font-mono text-zinc-400">{activeImage + 1} / {gallery.length}</span></div>
              <div className="rounded-2xl overflow-hidden bg-zinc-800 border border-zinc-700 aspect-[16/7]"><motion.img key={gallery[activeImage]} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: .25 }} src={gallery[activeImage]} alt={`${project.title} workflow ${activeImage + 1}`} className="w-full h-full object-contain" /></div>
              {gallery.length > 1 && <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">{gallery.map((src, idx) => <button key={src} onClick={() => setActiveImage(idx)} className={`rounded-xl overflow-hidden border ${idx === activeImage ? 'border-zinc-300 ring-2 ring-zinc-900/20' : 'border-zinc-700 opacity-70 hover:opacity-100'}`}><img src={src} alt="" className="w-full h-14 object-cover" /></button>)}</div>}
            </section>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="rounded-2xl bg-amber-50 border border-amber-100 p-5 space-y-2"><div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-800"><Target className="w-4 h-4" /> Business challenge</div><p className="text-sm text-amber-950/80 leading-relaxed">{project.businessProblem}</p></div>
            <div className="rounded-2xl bg-zinc-50 border border-zinc-100 p-5 space-y-2"><div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-zinc-800"><Workflow className="w-4 h-4" /> Solution architecture</div><p className="text-sm text-zinc-950/80 leading-relaxed">{project.solutionArchitecture}</p></div>
          </div>

          <section className="space-y-4"><div className="flex items-center gap-2"><Cpu className="w-4 h-4 text-zinc-800" /><h3 className="text-lg font-bold text-zinc-900">What was built</h3></div><div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">{project.keyCapabilities.map((cap) => <div key={cap} className="flex gap-2.5 p-3 rounded-xl bg-zinc-50 border border-zinc-100 text-sm text-zinc-600"><Check className="w-4 h-4 text-zinc-800 shrink-0 mt-0.5" />{cap}</div>)}</div></section>

          {project.workflowSteps?.length ? <section className="space-y-4"><div className="flex items-center gap-2"><Workflow className="w-4 h-4 text-zinc-800" /><h3 className="text-lg font-bold text-zinc-900">Workflow</h3></div><div className="grid grid-cols-1 sm:grid-cols-2 gap-3">{project.workflowSteps.map((step, index) => <div key={step} className="flex gap-3 items-start p-4 rounded-xl border border-zinc-200"><span className="w-7 h-7 rounded-full bg-zinc-100 text-zinc-800 text-xs font-bold flex items-center justify-center shrink-0">{String(index + 1).padStart(2, '0')}</span><span className="text-sm text-zinc-600 leading-relaxed">{step}</span></div>)}</div></section> : null}

          <section className="rounded-3xl bg-zinc-900 p-5 sm:p-6 text-white space-y-5"><div className="flex items-center gap-2"><Layers3 className="w-4 h-4 text-zinc-300" /><h3 className="font-bold">Technology & integrations</h3></div><div className="flex flex-wrap gap-2">{project.technologyStack.map((tech) => <span key={tech} className="px-2.5 py-1.5 rounded-lg bg-zinc-800 border border-zinc-700 text-xs text-zinc-300">{tech}</span>)}</div><div className="flex items-center gap-2 text-xs text-zinc-400"><PlugZap className="w-3.5 h-3.5" /> {integrations} connected systems or interfaces represented in this case study.</div>{project.businessImpact && <p className="text-sm text-zinc-300 leading-relaxed border-t border-zinc-700 pt-4"><strong className="text-white">Business impact:</strong> {project.businessImpact}</p>}</section>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-2"><div className="flex items-center gap-3"><p className="text-xs text-zinc-400">Want a similar system for your business?</p>{project.id === 'travel-agency-ai-employee' && onOpenDemo && <button onClick={() => { onClose(); onOpenDemo(); }} className="inline-flex items-center gap-2 rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-2.5 text-xs font-semibold text-zinc-800 hover:bg-zinc-100">Live demo →</button>}</div><button onClick={() => { onClose(); onStartProject(); }} className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-zinc-800 text-white text-sm font-semibold hover:bg-zinc-700">Discuss your project <ArrowRight className="w-4 h-4" /></button></div>
        </div>
      </div>
    </div>
  );
};

const ArchitectureMetric = ({ label, value }: { label: string; value: string }) => <div className="rounded-2xl bg-zinc-50 border border-zinc-200 p-4"><div className="text-2xl font-bold text-zinc-900">{value}</div><div className="text-[10px] uppercase tracking-wider text-zinc-400 mt-1">{label}</div></div>;
