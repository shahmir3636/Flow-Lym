import React, { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { ProjectItem } from '../types';
import { ArrowUpRight, Layers3, Workflow, PlugZap } from 'lucide-react';

interface ProjectCardProps { project: ProjectItem; index: number; onSelectProject: (project: ProjectItem) => void; }

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, index, onSelectProject }) => {
  const ref = useRef<HTMLButtonElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.12 });
  const stages = project.workflowSteps?.length || project.diagramNodes?.length || 0;
  const integrations = project.integrations?.length || 0;
  const capabilities = project.keyCapabilities.length;

  return (
    <motion.button
      ref={ref}
      type="button"
      onClick={() => onSelectProject(project)}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.45, delay: (index % 2) * 0.07 }}
      whileHover={{ y: -6 }}
      className="group text-left w-full rounded-3xl bg-white border border-zinc-200 overflow-hidden shadow-sm hover:border-zinc-300 hover:shadow-[0_18px_50px_rgba(124,58,237,0.12)] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-zinc-900/30"
    >
      {project.image && (
        <div className="relative h-32 sm:h-36 overflow-hidden bg-zinc-100">
          <img src={project.image} alt="" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.025]" />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/55 via-transparent to-transparent" />
          <span className="absolute left-4 bottom-3 text-[10px] font-mono font-semibold text-white/90 tracking-wider">{project.client}</span>
        </div>
      )}

      <div className="p-5 sm:p-6">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[10px] font-mono font-bold tracking-wider text-zinc-800 bg-zinc-50 border border-zinc-100 px-2 py-1 rounded-full">{project.projectNumber}</span>
            {!project.image && project.client && <span className="text-[11px] text-zinc-400 font-medium">{project.client}</span>}
          </div>
          <span className="w-8 h-8 rounded-full border border-zinc-200 flex items-center justify-center text-zinc-400 group-hover:text-zinc-800 group-hover:border-zinc-200 group-hover:bg-zinc-50 transition-all shrink-0"><ArrowUpRight className="w-4 h-4" /></span>
        </div>

        <div className="mt-4 space-y-2">
          <h3 className="text-lg sm:text-xl font-bold tracking-tight text-zinc-900 group-hover:text-zinc-800 transition-colors">{project.title}</h3>
          <p className="text-sm text-zinc-500 leading-relaxed line-clamp-2">{project.shortDesc}</p>
        </div>

        <div className="mt-4 flex flex-wrap gap-1.5">{project.categoryTags.slice(0, 3).map((tag) => <span key={tag} className="px-2 py-1 rounded-md bg-zinc-50 border border-zinc-200 text-[10px] font-medium text-zinc-500">{tag}</span>)}</div>

        <div className="mt-5 pt-4 border-t border-zinc-100 grid grid-cols-3 gap-2">
          <CardMetric icon={<Workflow />} value={String(stages || '—')} label="Stages" />
          <CardMetric icon={<PlugZap />} value={String(integrations || '—')} label="Integrations" />
          <CardMetric icon={<Layers3 />} value={String(capabilities)} label="Capabilities" />
        </div>

        <div className="mt-4 flex items-center justify-between"><span className="text-[11px] text-zinc-400">{project.technologyStack.slice(0, 3).join(' · ')}</span><span className="text-[11px] font-semibold text-zinc-600 group-hover:text-zinc-800">Open case study →</span></div>
      </div>
    </motion.button>
  );
};

const CardMetric = ({ icon, value, label }: { icon: React.ReactElement<{ className?: string }>; value: string; label: string }) => (
  <div className="rounded-xl bg-zinc-50 border border-zinc-100 p-2.5"><div className="text-zinc-900">{React.cloneElement(icon, { className: 'w-3.5 h-3.5' })}</div><div className="text-sm font-bold text-zinc-800 mt-1">{value}</div><div className="text-[9px] uppercase tracking-wider text-zinc-400">{label}</div></div>
);
