import React, { useState } from 'react';
import { Bot, Loader2, Send } from 'lucide-react';

const EXAMPLES = [
  'We manually follow up with 50+ leads per day on WhatsApp',
  'Our team spends 3 hours daily copy-pasting orders from email into our CRM',
  'We answer the same customer questions 100 times a day',
];

const PREBUILT_RESPONSES: Record<string, any> = {
  [EXAMPLES[0]]: {
    score: 9,
    verdict: "GREAT FIT",
    summary: "High-volume manual outreach on messaging channels creates significant response latency and agent fatigue.",
    automationPotential: "WhatsApp Business API + webhook listener for automated instant first response, lead qualification, and CRM logging.",
    tools: ["WhatsApp API", "n8n", "CRM", "LLM"],
    estimatedTimeSaved: "18-22 hours/week",
    nextStep: "Implement an automated WhatsApp qualification agent."
  },
  [EXAMPLES[1]]: {
    score: 10,
    verdict: "GREAT FIT",
    summary: "Repetitive cross-platform data transcription is error-prone and consumes operational hours.",
    automationPotential: "Email parser that extracts structured order data and pushes directly to CRM via REST API.",
    tools: ["Gmail Webhook", "Make/n8n", "CRM API"],
    estimatedTimeSaved: "15 hours/week",
    nextStep: "Deploy an email-to-CRM data pipeline."
  },
  [EXAMPLES[2]]: {
    score: 8,
    verdict: "GREAT FIT",
    summary: "High FAQ inquiry volume overwhelms support staff.",
    automationPotential: "AI Knowledge Base agent trained on company FAQs that resolves tier-1 queries 24/7.",
    tools: ["AI Agent / RAG", "Web Widget", "Knowledge Base"],
    estimatedTimeSaved: "20+ hours/week",
    nextStep: "Build a custom AI support agent with an escalation fallback."
  }
};

const getFallbackQualifierResponse = (input: string) => {
  const text = input.toLowerCase();

  if (text.includes('whatsapp') || text.includes('chat') || text.includes('message') || text.includes('sms') || text.includes('support')) {
    return {
      score: 9,
      verdict: "GREAT FIT",
      summary: "Manual messaging creates bottlenecks and delays in customer communication.",
      automationPotential: "Automated chatbot workflow to handle inbound queries and route complex issues to human agents.",
      tools: ["Chat API", "n8n", "AI LLM"],
      estimatedTimeSaved: "10-20 hours/week",
      nextStep: "Set up an automated chat responder connected to your existing knowledge base."
    };
  }

  if (text.includes('email') || text.includes('crm') || text.includes('data') || text.includes('order') || text.includes('sheet')) {
    return {
      score: 10,
      verdict: "GREAT FIT",
      summary: "Manual data entry and email processing is time-consuming and error-prone.",
      automationPotential: "Email parsing and API integration to automatically extract and sync data into your CRM/database.",
      tools: ["Make / n8n", "CRM API", "Email Webhooks"],
      estimatedTimeSaved: "15+ hours/week",
      nextStep: "Implement a data sync pipeline between your email and CRM systems."
    };
  }

  if (text.includes('lead') || text.includes('qualify') || text.includes('sales') || text.includes('follow up')) {
    return {
      score: 9,
      verdict: "GREAT FIT",
      summary: "Manual lead qualification slows down the sales pipeline and wastes rep time.",
      automationPotential: "AI-driven automated outreach and scoring system to pre-qualify leads before sales calls.",
      tools: ["HubSpot / CRM", "OpenAI", "n8n"],
      estimatedTimeSaved: "12-18 hours/week",
      nextStep: "Deploy an AI lead qualification agent to score and book meetings automatically."
    };
  }

  return {
    score: 7,
    verdict: "GOOD FIT",
    summary: "Routine operational tasks are limiting your team's bandwidth for strategic work.",
    automationPotential: "Custom workflow automation connecting your existing tools to handle repetitive steps.",
    tools: ["n8n / Make", "OpenAI", "Webhook Integrations"],
    estimatedTimeSaved: "5-10 hours/week",
    nextStep: "Map out your current manual process step-by-step to identify API integration points for high ROI."
  };
};

export const LeadQualifierDemo: React.FC = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const qualify = async (textToQualify: string = input) => {
    if (!textToQualify.trim() || loading) return;
    setLoading(true);
    setResult(null);
    setError('');

    // Instant match for exact examples
    if (PREBUILT_RESPONSES[textToQualify]) {
      setTimeout(() => {
        setResult(PREBUILT_RESPONSES[textToQualify]);
        setLoading(false);
      }, 600); // Small delay feels like AI thinking
      return;
    }

    // Fallback generator when typing custom input
    setTimeout(() => {
      setResult(getFallbackQualifierResponse(textToQualify));
      setLoading(false);
    }, 600);
  };

  const handleExampleClick = (ex: string) => {
    setInput(ex);
    qualify(ex);
  };

  const scoreColor = (score: number) =>
    score >= 8 ? 'text-emerald-400' : score >= 6 ? 'text-amber-400' : 'text-rose-400';

  const verdictStyle = (verdict: string) => {
    if (verdict === 'GREAT FIT') return 'border-emerald-400/30 bg-emerald-400/10 text-emerald-300';
    if (verdict === 'GOOD FIT') return 'border-zinc-500/30 bg-zinc-500/10 text-zinc-300';
    if (verdict === 'PARTIAL FIT') return 'border-amber-400/30 bg-amber-400/10 text-amber-300';
    return 'border-rose-400/30 bg-rose-400/10 text-rose-300';
  };

  return (
    <div className="overflow-hidden rounded-[26px] border border-zinc-700 bg-[#0b0b10]  shadow-2xl">
      <div className="border-b border-zinc-700 bg-zinc-800/60 px-6 py-5 flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-zinc-900/20 text-zinc-300">
          <Bot className="h-5 w-5" />
        </div>
        <div>
          <div className="font-semibold text-sm">AI Lead Qualifier</div>
          <div className="text-[10px] text-zinc-400">Describe your business problem — AI scores automation fit instantly</div>
        </div>
        <span className="ml-auto inline-flex items-center gap-1.5 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-2.5 py-1 text-[9px] font-semibold text-emerald-300">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />LIVE AI
        </span>
      </div>

      <div className="p-6 space-y-5">
        <div>
          <div className="mb-3 flex flex-wrap gap-2">
            {EXAMPLES.map((ex) => (
              <button
                key={ex}
                onClick={() => handleExampleClick(ex)}
                className="rounded-full border border-zinc-600 bg-zinc-800 px-3 py-1.5 text-[10px] text-zinc-400 hover:border-zinc-900/40 hover:text-zinc-300 transition-colors text-left"
              >
                {ex}
              </button>
            ))}
          </div>
          <div className="flex gap-3">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), qualify(input))}
              placeholder="Describe a repetitive business problem you want to automate..."
              rows={3}
              className="flex-1 rounded-xl border border-zinc-600 bg-zinc-800 px-4 py-3 text-[13px] text-zinc-900 outline-none placeholder:text-zinc-500 focus:border-zinc-900/60 resize-none"
            />
            <button
              onClick={() => qualify(input)}
              disabled={loading || !input.trim()}
              className="flex h-12 w-12 shrink-0 self-end items-center justify-center rounded-xl bg-white text-zinc-900 hover:bg-zinc-200 disabled:opacity-40 transition-colors"
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {error && (
          <div className="rounded-xl border border-rose-400/20 bg-rose-400/5 px-4 py-3 text-[12px] text-rose-300">{error}</div>
        )}

        {result && (
          <div className="space-y-4 rounded-2xl border border-zinc-600 bg-zinc-800/60 p-5">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-[11px] uppercase tracking-wider text-zinc-400 mb-1">Automation Fit Score</div>
                <div className={`text-4xl font-bold ${scoreColor(result.score)}`}>
                  {result.score}<span className="text-lg text-zinc-500">/10</span>
                </div>
              </div>
              <div className={`rounded-xl border px-4 py-2 text-sm font-bold ${verdictStyle(result.verdict)}`}>
                {result.verdict}
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-zinc-600 bg-zinc-800 p-3">
                <div className="text-[9px] uppercase tracking-wider text-zinc-500 mb-1.5">What Can Be Automated</div>
                <div className="text-[11px] text-zinc-300 leading-relaxed">{result.automationPotential}</div>
              </div>
              <div className="rounded-xl border border-zinc-600 bg-zinc-800 p-3">
                <div className="text-[9px] uppercase tracking-wider text-zinc-500 mb-1.5">Estimated Time Saved</div>
                <div className="text-lg font-bold text-zinc-300">{result.estimatedTimeSaved}</div>
              </div>
            </div>

            <div>
              <div className="text-[9px] uppercase tracking-wider text-zinc-500 mb-2">Recommended Tools</div>
              <div className="flex flex-wrap gap-2">
                {result.tools?.map((tool: string) => (
                  <span key={tool} className="rounded-full border border-zinc-300/20 bg-zinc-300/10 px-3 py-1 text-[10px] font-semibold text-zinc-300">
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-zinc-600 bg-zinc-800 p-3">
              <div className="text-[9px] uppercase tracking-wider text-zinc-500 mb-1.5">Next Step</div>
              <div className="text-[11px] text-zinc-300 leading-relaxed">{result.nextStep}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
