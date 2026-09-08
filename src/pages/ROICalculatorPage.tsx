import React, { useMemo, useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Calculator, Clock3, DollarSign, TrendingUp } from 'lucide-react';
import { PageRoute } from '../types';

interface Props { onNavigate: (route: PageRoute) => void; onOpenStartProject: () => void; }

export const ROICalculatorPage: React.FC<Props> = ({ onNavigate, onOpenStartProject }) => {
  const [people, setPeople] = useState(3);
  const [hours, setHours] = useState(8);
  const [hourlyCost, setHourlyCost] = useState(18);
  const [automationRate, setAutomationRate] = useState(70);
  const [monthlyCost, setMonthlyCost] = useState(250);

  const result = useMemo(() => {
    const weeksPerMonth = 4.33;
    const currentMonthlyHours = people * hours * weeksPerMonth;
    const savedMonthlyHours = currentMonthlyHours * (automationRate / 100);
    const grossMonthlySavings = savedMonthlyHours * hourlyCost;
    const annualGrossSavings = grossMonthlySavings * 12;
    const annualInvestment = monthlyCost * 12;
    const annualNetSavings = annualGrossSavings - annualInvestment;
    const roi = annualInvestment > 0 ? (annualNetSavings / annualInvestment) * 100 : 0;
    return { currentMonthlyHours, savedMonthlyHours, grossMonthlySavings, annualGrossSavings, annualInvestment, annualNetSavings, roi };
  }, [people, hours, hourlyCost, automationRate, monthlyCost]);

  const money = (value: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(Math.max(0, value));
  const maxBar = Math.max(result.annualGrossSavings, result.annualInvestment, 1);

  return (
    <div className="pt-32 pb-24 space-y-14 sm:space-y-20">
      <motion.section initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 border border-zinc-200 text-zinc-700 text-[11px] font-mono font-semibold"><Calculator className="w-3.5 h-3.5 text-zinc-500" /> Planning tool</div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-zinc-900 leading-[1.05]">Estimate what automation could be worth.</h1>
          <p className="text-base sm:text-lg text-zinc-500 leading-relaxed max-w-2xl">Use your current manual workload to model potential time savings. This is a planning estimate, not a promise of ROI.</p>
        </div>
      </motion.section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-2 rounded-3xl bg-white border border-zinc-200 p-6 sm:p-7 shadow-xs space-y-6">
          <div><h2 className="text-lg font-bold text-zinc-900">Your current process</h2><p className="text-xs text-zinc-400 mt-1">Adjust the inputs to match one repetitive workflow.</p></div>
          {[
            ['People involved', people, setPeople, 1, 20, 1],
            ['Hours per person / week', hours, setHours, 1, 40, 1],
            ['Estimated hourly cost ($)', hourlyCost, setHourlyCost, 5, 200, 1],
            ['Potential work automated', automationRate, setAutomationRate, 5, 100, 5],
            ['Estimated automation cost / month ($)', monthlyCost, setMonthlyCost, 0, 5000, 50],
          ].map(([label, value, setter, min, max, step]) => (
            <label key={label as string} className="block space-y-2">
              <div className="flex items-center justify-between gap-3"><span className="text-xs font-semibold text-zinc-600">{label as string}</span><span className="text-xs font-mono font-semibold text-emerald-600">{value as number}{(label as string).includes('cost') ? '' : (label as string).includes('automated') ? '%' : ''}</span></div>
              <input type="range" min={min as number} max={max as number} step={step as number} value={value as number} onChange={(e) => (setter as React.Dispatch<React.SetStateAction<number>>)(Number(e.target.value))} className="w-full accent-emerald-500" />
            </label>
          ))}
        </div>

        <div className="lg:col-span-3 rounded-3xl bg-zinc-900 text-white p-6 sm:p-8 shadow-xl relative overflow-hidden border border-zinc-700">
          <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-emerald-500/10 blur-3xl" />
          <div className="relative space-y-7">
            <div><span className="text-[11px] uppercase tracking-widest text-emerald-400 font-mono">Estimated annual model</span><h2 className="text-3xl sm:text-4xl font-bold mt-2">{money(result.annualNetSavings)} net savings</h2></div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <Metric icon={<Clock3 />} label="Hours saved / month" value={result.savedMonthlyHours.toFixed(0)} />
              <Metric icon={<DollarSign />} label="Gross savings / year" value={money(result.annualGrossSavings)} />
              <Metric icon={<TrendingUp />} label="Modeled ROI" value={`${Math.max(0, result.roi).toFixed(0)}%`} />
            </div>
            <div className="space-y-4 pt-2">
              <Bar label="Potential annual savings" value={result.annualGrossSavings} max={maxBar} amount={money(result.annualGrossSavings)} />
              <Bar label="Estimated annual automation cost" value={result.annualInvestment} max={maxBar} amount={money(result.annualInvestment)} />
            </div>
            <p className="text-xs text-zinc-400 border-t border-zinc-700 pt-4">The model assumes 4.33 weeks per month and applies the automation percentage to the current manual workload. Actual results depend on process complexity, implementation scope and software costs.</p>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-zinc-900 border border-zinc-700 p-8 sm:p-10 text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xl">
          <div className="max-w-2xl"><p className="text-xs font-mono uppercase tracking-widest text-zinc-400 mb-2">Next step</p><h2 className="text-2xl sm:text-3xl font-bold">Turn the estimate into a real workflow map.</h2><p className="text-sm text-zinc-400 mt-2">We'll look at the actual process, tools and constraints before recommending what should be automated.</p></div>
          <div className="flex flex-wrap gap-2 shrink-0"><button onClick={onOpenStartProject} className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white text-zinc-900 text-sm font-semibold hover:bg-zinc-100 transition-colors">Discuss the workflow <ArrowRight className="w-4 h-4" /></button><button onClick={() => onNavigate('projects')} className="px-5 py-3 rounded-xl border border-zinc-700 text-zinc-300 text-sm font-semibold hover:bg-zinc-800 transition-colors">See projects</button></div>
        </div>
      </section>
    </div>
  );
};

const Metric = ({ icon, label, value }: { icon: React.ReactElement<{ className?: string }>; label: string; value: string }) => (
  <div className="rounded-2xl bg-white/[0.06] border border-white/10 p-4"><div className="text-emerald-400">{React.cloneElement(icon, { className: 'w-4 h-4' })}</div><div className="text-lg font-bold mt-3">{value}</div><div className="text-[10px] uppercase tracking-wider text-zinc-400 mt-1">{label}</div></div>
);

const Bar = ({ label, value, max, amount }: { label: string; value: number; max: number; amount: string }) => (
  <div><div className="flex justify-between text-xs mb-2"><span className="text-zinc-300">{label}</span><span className="font-mono text-zinc-400">{amount}</span></div><div className="h-3 rounded-full bg-white/10 overflow-hidden"><motion.div initial={{ width: 0 }} animate={{ width: `${Math.min(100, (value / max) * 100)}%` }} transition={{ duration: 0.7, ease: 'easeOut' }} className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-zinc-500" /></div></div>
);

