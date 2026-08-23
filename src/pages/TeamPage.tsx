import React from 'react';
import { ArrowRight, Instagram, Mail, Sparkles } from 'lucide-react';

interface TeamPageProps { 
  onOpenStartProject: () => void; 
}

type Member = {
  id: string;
  name: string;
  role: string;
  bio: string;
  focus: string[];
  gradient: string;
  image?: string;
};

const TEAM: Member[] = [
  {
    id: 'shahmir',
    name: 'Muhammad Shahmir Haider',
    role: 'AI Automation Engineer ',
    bio: 'Designs practical AI-powered workflows that connect business processes, APIs, CRMs and intelligent agents into reliable systems. Focused on turning repetitive operations into measurable, maintainable automation.',
    focus: ['AI Automation', 'n8n Workflows', 'AI Agents', 'API Integrations'],
    gradient: 'from-violet-500 via-fuchsia-500 to-cyan-400',
    image: '/assets/muhammad-shahmir-haider.jpeg'
  },
  {
    id: 'sajawal',
    name: 'Muhammad Sajawal Khan',
    role: 'Software Developer ',
    bio: 'Builds modern web applications and custom software around the operational requirements of each project, with an emphasis on clean interfaces, dependable backend systems and practical product delivery.',
    focus: ['Web Applications', 'Backend Systems', 'APIs', 'Software Development'],
    gradient: 'from-cyan-400 via-blue-500 to-violet-500',
    image: '/assets/muhammad-sajawal-khan.jpeg'
  },
  {
    id: 'huzaifa',
    name: 'Muhammad Huzaifa',
    role: 'AI Solutions Engineer ',
    bio: 'Works on AI-driven product ideas, intelligent interfaces and the engineering layer that turns AI capabilities into useful business tools.',
    focus: ['AI Solutions', 'LLM Integrations', 'AI Products', 'Automation'],
    gradient: 'from-fuchsia-500 via-violet-500 to-amber-400',
    image: '/assets/muhammad-huzaifa.jpeg'
  },
];

const MemberPortrait: React.FC<{ member: Member }> = ({ member }) => {
  return (
    <div className={`relative overflow-hidden rounded-[1.75rem] bg-gradient-to-br ${member.gradient} p-[1px] shadow-xl h-[380px] sm:h-[420px]`}>
      <div className="relative h-full w-full overflow-hidden rounded-[1.65rem] bg-zinc-900">
        {member.image ? (
          <img
            src={member.image}
            alt={member.name}
            className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-700 hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-950">
            <div className="text-center">
              <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-full border border-white/15 bg-white/10 text-4xl font-extrabold tracking-[-0.06em] text-white backdrop-blur-sm">
                {member.name.split(' ').map(n => n[0]).join('')}
              </div>
              <p className="mt-4 text-xs font-medium uppercase tracking-[0.18em] text-zinc-400">Portrait coming soon</p>
            </div>
          </div>
        )}
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/30 via-black/10 to-transparent pointer-events-none" />
      </div>
    </div>
  );
};

const MemberDetails: React.FC<{ member: Member; index: number; onOpenStartProject: () => void }> = ({ member, index, onOpenStartProject }) => (
  <div className="flex flex-col justify-center p-7 sm:p-9">
    <span className="text-[11px] uppercase tracking-[0.2em] text-zinc-500 font-mono">FLOWLYM / 0{index + 1}</span>
    <h2 className="text-2xl sm:text-3xl mt-3 font-bold tracking-[-0.045em] text-zinc-950">{member.name}</h2>
    <p className="mt-2 text-sm font-semibold text-zinc-800">{member.role}</p>
    <p className="mt-5 max-w-xl text-sm leading-7 text-zinc-600">{member.bio}</p>
    <div className="mt-7 flex flex-wrap gap-2">
      {member.focus.map((item) => (
        <span key={item} className="px-3 py-1.5 rounded-full border border-zinc-200 bg-zinc-50 text-[11px] font-medium text-zinc-600">
          {item}
        </span>
      ))}
    </div>
    <div className="mt-8 flex items-center gap-2">
      <a href="https://www.instagram.com/flowlym.tech/" target="_blank" rel="noreferrer" className="p-2.5 rounded-xl border border-zinc-200 bg-white hover:border-zinc-300 hover:bg-zinc-100 transition-colors" aria-label="FLOWLYM Instagram">
        <Instagram className="w-4 h-4 text-zinc-600" />
      </a>
      <a href="mailto:info@flowlym.tech" className="p-2.5 rounded-xl border border-zinc-200 bg-white hover:border-zinc-300 hover:bg-zinc-100 transition-colors" aria-label="Email FLOWLYM">
        <Mail className="w-4 h-4 text-zinc-600" />
      </a>
      <button onClick={onOpenStartProject} className="ml-1 inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-zinc-950 text-white text-xs font-semibold hover:bg-zinc-800 transition-colors">
        Work with us <ArrowRight className="w-3.5 h-3.5" />
      </button>
    </div>
  </div>
);

export const TeamPage: React.FC<TeamPageProps> = ({ onOpenStartProject }) => {
  return (
    <div className="pt-28 pb-24">
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-zinc-800">
            <Sparkles className="w-3.5 h-3.5 text-zinc-600" /> The team
          </span>
          <h1 className="mt-4 text-4xl sm:text-5xl font-bold tracking-[-0.04em] text-zinc-950">The people building the systems.</h1>
          <p className="mt-5 text-sm sm:text-base text-zinc-600 leading-7">No anonymous delivery team and no hand-offs between sales and engineering. The founders stay close to architecture, implementation and the final product.</p>
        </div>

        {/* Unified team cards — mapped evenly for all members */}
        <div className="mt-12 space-y-6">
          {TEAM.map((member, index) => (
            <article 
              key={member.id} 
              className="grid lg:grid-cols-[0.85fr_1.15fr] gap-6 items-stretch rounded-[2rem] border border-zinc-200 bg-white shadow-[0_18px_55px_rgba(24,24,27,0.06)] overflow-hidden"
            >
              <MemberPortrait member={member} />
              <MemberDetails member={member} index={index} onOpenStartProject={onOpenStartProject} />
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};
