import React, { useState } from 'react';
import { X, CheckCircle2, ArrowRight, Clock3, Sparkles } from 'lucide-react';

interface StartProjectModalProps { isOpen: boolean; onClose: () => void; }

export const StartProjectModal: React.FC<StartProjectModalProps> = ({ isOpen, onClose }) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    serviceCategory: 'AI Automation',
    timeline: 'Not sure yet',
    details: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`New FLOWLYM project inquiry — ${formData.serviceCategory}`);
    const body = encodeURIComponent([
      `Name: ${formData.name}`,
      `Email: ${formData.email}`,
      `Company: ${formData.company || 'Not provided'}`,
      `Service: ${formData.serviceCategory}`,
      `Preferred timeline: ${formData.timeline}`,
      '',
      'Project details:',
      formData.details || 'Not provided'
    ].join('\n'));
    window.location.href = `mailto:info@flowlym.tech?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormData({ name: '', email: '', company: '', serviceCategory: 'AI Automation', timeline: 'Not sure yet', details: '' });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-zinc-900/65 backdrop-blur-md modal-backdrop-in" onClick={onClose}>
      <div className="relative w-full max-w-xl bg-white rounded-[2rem] shadow-2xl border border-white/80 overflow-hidden text-zinc-800 modal-card-in form-modal-shell" onClick={(e) => e.stopPropagation()}>
        <div className="h-1.5 flowlym-gradient-line" />
        <div className="relative flex items-start justify-between p-6 sm:p-7 border-b border-zinc-100 overflow-hidden">
          <div className="absolute -top-16 -right-10 w-40 h-40 rounded-full bg-zinc-200/50 blur-3xl form-orb" />
          <div className="absolute -bottom-24 -left-16 w-48 h-48 rounded-full bg-zinc-100/60 blur-3xl form-orb form-orb-delay" />
          <div className="relative">
            <div className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-zinc-700"><Sparkles className="w-3.5 h-3.5 text-zinc-500" /> Let's build something useful</div>
            <h3 className="mt-2 text-xl sm:text-2xl font-bold tracking-tight">Start a Project</h3>
            <p className="text-xs sm:text-sm text-zinc-400 mt-1 max-w-md">Give us enough context to understand the opportunity. No sales script — just the project details.</p>
          </div>
          <button onClick={onClose} className="relative p-2 text-zinc-400 hover:text-zinc-800 hover:bg-zinc-100 rounded-xl transition-all"><X className="w-5 h-5" /></button>
        </div>

        {submitted ? (
          <div className="p-8 sm:p-10 text-center space-y-5 animate-in fade-in zoom-in-95 duration-300">
            <div className="relative w-16 h-16 mx-auto"><div className="absolute inset-0 rounded-full bg-emerald-400/20 animate-ping" /><div className="relative w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center border border-emerald-100"><CheckCircle2 className="w-7 h-7" /></div></div>
            <div><h4 className="text-2xl font-bold">Ready to send</h4><p className="text-zinc-500 text-sm max-w-sm mx-auto mt-2 leading-6">Your email app should open with the project details addressed to <span className="font-semibold text-zinc-800">info@flowlym.tech</span>.</p></div>
            <div className="p-4 bg-zinc-50 border border-zinc-200 rounded-2xl text-left text-xs space-y-2"><div><span className="text-zinc-400">Service:</span> <span className="font-semibold">{formData.serviceCategory}</span></div><div><span className="text-zinc-400">Timeline:</span> <span className="font-semibold">{formData.timeline}</span></div><div><span className="text-zinc-400">Company:</span> <span className="font-semibold">{formData.company || 'Not provided'}</span></div></div>
            <button onClick={handleReset} className="w-full py-3 bg-zinc-900 text-white text-sm font-semibold rounded-2xl hover:bg-zinc-700 transition-all">Done</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="relative p-6 sm:p-7 space-y-4 text-sm">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field label="Full Name *"><input required type="text" placeholder="Your name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="formlym-input" /></Field>
              <Field label="Work Email *"><input required type="email" placeholder="you@company.com" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="formlym-input" /></Field>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field label="Company"><input type="text" placeholder="Company or project name" value={formData.company} onChange={(e) => setFormData({ ...formData, company: e.target.value })} className="formlym-input" /></Field>
              <Field label="What do you need?"><select value={formData.serviceCategory} onChange={(e) => setFormData({ ...formData, serviceCategory: e.target.value })} className="formlym-input"><option>AI Automation</option><option>AI Voice Agent</option><option>Web Development</option><option>Custom Software</option><option>AI Solutions & LLM Integration</option><option>Other</option></select></Field>
            </div>
            <div>
              <Field label="Preferred timeline"><select value={formData.timeline} onChange={(e) => setFormData({ ...formData, timeline: e.target.value })} className="formlym-input"><option>Not sure yet</option><option>As soon as possible</option><option>Within 2–4 weeks</option><option>Within 1–2 months</option><option>2+ months</option></select></Field>
            </div>
            <Field label="Project overview"><textarea rows={4} placeholder="What are you doing manually today, and what would you like the system to handle?" value={formData.details} onChange={(e) => setFormData({ ...formData, details: e.target.value })} className="formlym-input resize-none" /></Field>
            <div className="flex items-center gap-2 text-[11px] text-zinc-400"><Clock3 className="w-3.5 h-3.5 text-zinc-500" /> We review project inquiries personally and respond through email.</div>
            <button type="submit" className="group relative overflow-hidden w-full py-3.5 bg-zinc-900 text-white text-sm font-semibold rounded-2xl hover:bg-zinc-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-zinc-800/10 form-submit-button"><span>Send Inquiry</span><ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></button>
          </form>
        )}
      </div>
    </div>
  );
};

const Field: React.FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => <div className="space-y-1.5"><label className="text-xs font-semibold text-zinc-600">{label}</label>{children}</div>;
