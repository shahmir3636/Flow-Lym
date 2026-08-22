import React, { useMemo, useState } from 'react';
import { motion } from 'motion/react';
import { PageRoute, ProjectItem } from '../types';
import { PROJECTS_DATA } from '../data/projectsData';
import { ProjectCard } from '../components/ProjectCard';
import { ArrowRight, Sparkles, Play, MessageCircle } from 'lucide-react';

interface ProjectsPageProps {
  onNavigate: (route: PageRoute) => void;
  onOpenStartProject: () => void;
  onSelectProject: (project: ProjectItem) => void;
}

export const ProjectsPage: React.FC<ProjectsPageProps> = ({ onNavigate, onOpenStartProject, onSelectProject }) => {
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'ai-automation', label: 'AI Automation' },
    { id: 'crm-workflow', label: 'CRM & Workflows' },
    { id: 'social-ai', label: 'Social Media' },
    { id: 'ecommerce-automation', label: 'E-commerce' },
    { id: 'ai-content', label: 'AI Content' },
    { id: 'marketing-crm', label: 'Lead Routing' }
  ];

  const filteredProjects = useMemo(() => PROJECTS_DATA.filter((project) => {
    return activeCategory === 'all' || project.category === activeCategory;
  }), [activeCategory]);

  return (
    <div className="pt-32 sm:pt-36 pb-24 space-y-14 sm:space-y-18">
      <motion.section initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 border border-zinc-200 text-zinc-800 text-[11px] font-mono font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-zinc-600" /> Selected work
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-zinc-950 leading-[1.05]">Systems built around real business processes.</h1>
          <p className="text-base sm:text-lg text-zinc-600 leading-relaxed max-w-2xl">Explore production workflows, AI document pipelines, CRM integrations and operational systems. Open a card for the complete case study.</p>
        </div>

        <div className="mt-9 rounded-3xl bg-white border border-zinc-200 text-zinc-900 p-4 sm:p-5 shadow-xs relative overflow-hidden">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-3.5 py-2 rounded-xl text-[11px] font-semibold transition-all ${
                  activeCategory === category.id
                    ? 'bg-zinc-950 text-white shadow-xs'
                    : 'bg-zinc-100 text-zinc-600 hover:text-zinc-950 hover:bg-zinc-200 border border-zinc-200'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
      </motion.section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-5 text-xs text-zinc-500">
          <span>{filteredProjects.length} project{filteredProjects.length === 1 ? '' : 's'}</span>
          <span>Click a card for the full case study</span>
        </div>
        {filteredProjects.length ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {filteredProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} onSelectProject={onSelectProject} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-zinc-200 bg-white p-12 text-center">
            <p className="text-sm text-zinc-500">No projects found in this category.</p>
          </div>
        )}
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-zinc-200 bg-white p-6 sm:p-8 shadow-xs">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-3xl">
              <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-zinc-100 px-2.5 py-1 text-[10px] font-semibold text-zinc-800 border border-zinc-200">
                <Play className="h-3 w-3" /> LIVE DEMO
              </div>
              <h2 className="text-2xl font-bold tracking-tight text-zinc-950 sm:text-3xl">Test the Pakistan Travel AI Employee</h2>
              <p className="mt-2 text-sm leading-relaxed text-zinc-600">Open the interactive read-only dashboard to explore lead management, WhatsApp AI conversations, package recommendations, analytics, payments, escalations and automated follow-ups.</p>
            </div>
            <button onClick={() => onNavigate('ai-demos')} className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-zinc-950 px-5 py-3 text-sm font-semibold text-white hover:bg-zinc-800 transition-colors">
              <MessageCircle className="h-4 w-4" /> Open AI Demo <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-white border border-zinc-200 p-8 sm:p-10 text-zinc-950 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xs">
          <div className="max-w-2xl space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold">Have a workflow that should be automated?</h2>
            <p className="text-zinc-600 text-sm leading-relaxed">Tell us what is manual, repetitive or slowing your team down. We will map the process and suggest the simplest practical solution.</p>
          </div>
          <button onClick={onOpenStartProject} className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-zinc-950 text-white text-sm font-semibold hover:bg-zinc-800 transition-colors shrink-0 border border-zinc-950">
            Start a project <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>
    </div>
  );
};

