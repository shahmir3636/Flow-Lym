import React from 'react';
import { ArrowRight, Instagram, Mail, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

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
    role: 'AI Automation Engineer',
    bio: 'Designs practical AI-powered workflows that connect business processes, APIs, CRMs and intelligent agents into reliable systems. Focused on turning repetitive operations into measurable, maintainable automation.',
    focus: ['AI Automation', 'n8n Workflows', 'AI Agents', 'API Integrations'],
    gradient: 'from-zinc-400 via-zinc-500 to-zinc-500',
    image: '/assets/muhammad-shahmir-haider.jpeg'
  },
  {
    id: 'sajawal',
    name: 'Muhammad Sajawal Khan',
    role: 'Software Developer',
    bio: 'Builds modern web applications and custom software around the operational requirements of each project, with an emphasis on clean interfaces, dependable backend systems and practical product delivery.',
    focus: ['Web Applications', 'Backend Systems', 'APIs', 'Software Development'],
    gradient: 'from-zinc-500 via-zinc-400 to-zinc-400',
    image: '/assets/muhammad-sajawal-khan.jpeg'
  },
  {
    id: 'huzaifa',
    name: 'Muhammad Huzaifa',
    role: 'AI Solutions Engineer',
    bio: 'Works on AI-driven product ideas, intelligent interfaces and the engineering layer that turns AI capabilities into useful business tools.',
    focus: ['AI Solutions', 'LLM Integrations', 'AI Products', 'Automation'],
    gradient: 'from-zinc-400 via-zinc-400 to-zinc-300',
    image: '/assets/muhammad-huzaifa.jpeg'
  },
];

const MemberPortrait: React.FC<{ member: Member }> = ({ member }) => {
  return (
    <div className={`relative overflow-hidden rounded-l-[1.75rem] lg:rounded-tr-none lg:rounded-bl-[1.75rem] bg-gradient-to-br ${member.gradient} p-0 lg:p-0 h-[380px] sm:h-[420px]`}>
      <div className="relative h-full w-full overflow-hidden bg-zinc-100">
        {member.image ? (
          <img
            src={member.image}
            alt={member.name}
            className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-700 hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-zinc-50 via-zinc-50 to-white">
            <div className="text-center">
              <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-full border border-zinc-200 bg-zinc-100 text-4xl font-extrabold tracking-[-0.06em] text-zinc-800 backdrop-blur-sm">
                {member.name.split(' ').map(n => n[0]).join('')}
              </div>
              <p className="mt-4 text-xs font-medium uppercase tracking-[0.18em] text-zinc-400">Portrait coming soon</p>
            </div>
          </div>
        )}
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-zinc-900/40 via-zinc-900/10 to-transparent pointer-events-none" />
      </div>
    </div>
  );
};

const MemberDetails: React.FC<{ member: Member; index: number; onOpenStartProject: () => void }> = ({ member, index, onOpenStartProject }) => (
  <div className="flex flex-col justify-center p-7 sm:p-9 bg-white">
    <span className="text-[11px] uppercase tracking-[0.2em] text-zinc-500 font-mono font-semibold">FLOWLYM / 0{index + 1}</span>
    <h2 className="text-2xl sm:text-3xl mt-3 font-bold tracking-[-0.045em] text-zinc-900">{member.name}</h2>
    <p className="mt-2 text-sm font-semibold text-zinc-900">{member.role}</p>
    <p className="mt-5 max-w-xl text-sm leading-7 text-zinc-600">{member.bio}</p>
    <div className="mt-7 flex flex-wrap gap-2">
      {member.focus.map((item) => (
        <span key={item} className="px-3 py-1.5 rounded-full border border-zinc-100 bg-zinc-50 text-[11px] font-medium text-zinc-800">
          {item}
        </span>
      ))}
    </div>
    <div className="mt-8 flex items-center gap-3">
      <a href="https://www.instagram.com/flowlym.tech/" target="_blank" rel="noreferrer" className="p-2.5 rounded-xl border border-zinc-200 bg-white hover:border-zinc-300 hover:bg-zinc-50 transition-colors" aria-label="FLOWLYM Instagram">
        <Instagram className="w-4 h-4 text-zinc-600 hover:text-zinc-900 transition-colors" />
      </a>
      <a href="mailto:info@flowlym.tech" className="p-2.5 rounded-xl border border-zinc-200 bg-white hover:border-zinc-300 hover:bg-zinc-50 transition-colors" aria-label="Email FLOWLYM">
        <Mail className="w-4 h-4 text-zinc-600 hover:text-zinc-900 transition-colors" />
      </a>
      <button onClick={onOpenStartProject} className="ml-1 inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-zinc-900 text-white text-xs font-semibold hover:bg-zinc-800 hover:shadow-md hover:shadow-zinc-500/20 transition-all">
        Work with us <ArrowRight className="w-3.5 h-3.5" />
      </button>
    </div>
  </div>
);

export const TeamPage: React.FC<TeamPageProps> = ({ onOpenStartProject }) => {
  return (
    <div className="pt-28 pb-24 relative">
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="max-w-2xl"
        >
          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-zinc-900">
            <Sparkles className="w-3.5 h-3.5" /> The team
          </span>
          <h1 className="mt-4 text-4xl sm:text-5xl font-bold tracking-[-0.04em] text-zinc-900">Built by engineers who ship.</h1>
          <p className="mt-5 text-sm sm:text-base text-zinc-600 leading-7">No anonymous delivery team and no hand-offs between sales and engineering. The founders stay close to architecture, implementation and the final product.</p>
        </motion.div>

        <div className="mt-16 space-y-12">
          {TEAM.map((member, index) => (
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.15, ease: "easeOut" }}
              key={member.id}
              className="grid lg:grid-cols-[0.8fr_1.2fr] gap-0 items-stretch rounded-[1.75rem] border border-zinc-100 bg-white shadow-[0_8px_30px_rgba(59,130,246,0.08)] overflow-hidden hover:shadow-[0_20px_40px_rgba(59,130,246,0.12)] transition-shadow duration-500"
            >
              <MemberPortrait member={member} />
              <MemberDetails member={member} index={index} onOpenStartProject={onOpenStartProject} />
            </motion.article>
          ))}
        </div>
      </section>
    </div>
  );
};
