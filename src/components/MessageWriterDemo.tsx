import React, { useState } from 'react';
import { Check, Copy, Loader2, MessageCircle, Send, Sparkles } from 'lucide-react';

const TONES = ['Professional', 'Friendly', 'Urgent', 'Follow-up', 'Closing'];
const CHANNELS = ['WhatsApp', 'Email', 'SMS'];

const EXAMPLES = [
  'Follow up with a lead who asked for pricing 3 days ago',
  'Confirm a meeting scheduled for tomorrow at 2pm',
  'Upsell a customer who just completed their first project',
];

const generateTemplate = (context: string, channel: string, tone: string) => {
  const ctx = context.trim().toLowerCase() || "your inquiry";

  if (channel === 'WhatsApp') {
    if (tone === 'Professional' || tone === 'Closing' || tone === 'Urgent') {
      return `Hello [Name], following up regarding the ${ctx}. Please let us know if you require any clarification on the deliverables or scope. Best regards, FLOWLYM`;
    } else {
      // Friendly, Follow-up, default
      return `Hi [Name]! 👋 Just checking in about ${ctx}. Happy to hop on a quick 10-minute call to answer any questions. Let me know what works!`;
    }
  }

  if (channel === 'Email') {
    return `Subject: Following up regarding your inquiry\n\nHi [Name],\n\nI hope your week is going well.\n\nI wanted to reach out regarding ${ctx}...\n\nWould you have 10 minutes this week for a brief walkthrough?\n\nBest regards,\nFLOWLYM`;
  }

  // SMS fallback
  return `Hi [Name], following up from FLOWLYM regarding ${ctx}. Let us know if you need any assistance: flowlym.tech`;
};

export const MessageWriterDemo: React.FC = () => {
  const [context, setContext] = useState('');
  const [tone, setTone] = useState('Professional');
  const [channel, setChannel] = useState('WhatsApp');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const generate = async (textContext: string = context, selectedChannel: string = channel, selectedTone: string = tone) => {
    if (!textContext.trim() || loading) return;
    setLoading(true);
    setResult('');

    // Simulate AI generation time
    setTimeout(() => {
      setResult(generateTemplate(textContext, selectedChannel, selectedTone));
      setLoading(false);
    }, 600);
  };

  const handleExampleClick = (ex: string) => {
    setContext(ex);
    generate(ex, channel, tone);
  };

  const handleToneChange = (t: string) => {
    setTone(t);
    if (context.trim()) {
      generate(context, channel, t);
    }
  };

  const handleChannelChange = (c: string) => {
    setChannel(c);
    if (context.trim()) {
      generate(context, c, tone);
    }
  };

  const copy = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="overflow-hidden rounded-[26px] border border-zinc-700 bg-[#0b0b10]  shadow-2xl">
      <div className="border-b border-zinc-700 bg-zinc-800/60 px-6 py-5 flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-zinc-400/20 text-zinc-300">
          <MessageCircle className="h-5 w-5" />
        </div>
        <div>
          <div className="font-semibold text-sm">AI Message Writer</div>
          <div className="text-[10px] text-zinc-400">Generate WhatsApp, Email & SMS messages in seconds</div>
        </div>
        <span className="ml-auto inline-flex items-center gap-1.5 rounded-full border border-zinc-500/20 bg-zinc-500/10 px-2.5 py-1 text-[9px] font-semibold text-zinc-300">
          <Sparkles className="h-3 w-3" />LIVE AI
        </span>
      </div>

      <div className="p-6 space-y-4">
        <div className="flex flex-wrap gap-3">
          <div className="flex gap-1.5">
            {CHANNELS.map((c) => (
              <button
                key={c}
                onClick={() => handleChannelChange(c)}
                className={`rounded-lg border px-3 py-1.5 text-[10px] font-semibold transition-colors ${
                  channel === c
                    ? 'border-zinc-500/40 bg-zinc-500/10 text-zinc-300'
                    : 'border-zinc-600 text-zinc-400 hover:'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
          <div className="flex gap-1.5 flex-wrap">
            {TONES.map((t) => (
              <button
                key={t}
                onClick={() => handleToneChange(t)}
                className={`rounded-lg border px-3 py-1.5 text-[10px] font-semibold transition-colors ${
                  tone === t
                    ? 'border-zinc-300/40 bg-zinc-300/10 text-zinc-300'
                    : 'border-zinc-600 text-zinc-400 hover:'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {EXAMPLES.map((ex) => (
            <button
              key={ex}
              onClick={() => handleExampleClick(ex)}
              className="rounded-full border border-zinc-600 bg-zinc-800 px-3 py-1.5 text-[10px] text-zinc-400 hover:border-zinc-400/40 hover:text-zinc-300 transition-colors text-left"
            >
              {ex}
            </button>
          ))}
        </div>

        <div className="flex gap-3">
          <input
            value={context}
            onChange={(e) => setContext(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && generate(context, channel, tone)}
            placeholder="Describe what the message is for..."
            className="flex-1 rounded-xl border border-zinc-600 bg-zinc-800 px-4 py-3 text-[13px] text-zinc-900 outline-none placeholder:text-zinc-500 focus:border-zinc-400/60"
          />
          <button
            onClick={() => generate(context, channel, tone)}
            disabled={loading || !context.trim()}
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white text-zinc-900 hover:bg-zinc-200 disabled:opacity-40 transition-colors"
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
          </button>
        </div>

        {result && (
          <div className="relative rounded-2xl border border-zinc-600 bg-zinc-800/60 p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="text-[9px] uppercase tracking-wider text-zinc-400">{channel} · {tone}</div>
              <button
                onClick={copy}
                className="flex items-center gap-1.5 rounded-lg border border-zinc-600 bg-zinc-800 px-3 py-1.5 text-[10px] text-zinc-400 hover: transition-colors"
              >
                {copied ? <><Check className="h-3 w-3 text-emerald-400" />Copied</> : <><Copy className="h-3 w-3" />Copy</>}
              </button>
            </div>
            <pre className="whitespace-pre-wrap text-[12px] leading-relaxed text-zinc-200 font-sans">{result}</pre>
          </div>
        )}
      </div>
    </div>
  );
};
