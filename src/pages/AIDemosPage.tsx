import React, { useEffect, useRef, useState } from 'react';
import Vapi from '@vapi-ai/web';
import {
  ArrowRight,
  Bot,
  Brain,
  CheckCircle2,
  Mic,
  PenLine,
  PhoneOff,
  Sparkles,
  Zap,
  LockKeyhole,
  MessageCircle,
  Workflow,
  Radio,
  PhoneCall,
  Volume2,
  Clock,
  ShieldCheck,
  Calendar,
  Check
} from 'lucide-react';
import { TravelAgencyDashboard } from '../components/TravelAgencyDashboard';
import { CarRentalDashboard } from '../components/CarRentalDashboard';
import { LeadQualifierDemo } from '../components/LeadQualifierDemo';
import { MessageWriterDemo } from '../components/MessageWriterDemo';
import { WebDemosShowcase } from '../components/WebDemosShowcase';

interface AIDemosPageProps {
  onOpenStartProject: () => void;
}

const PUBLIC_KEY = '94a6394c-4637-4118-aa29-f05b239de763';
const ASSISTANT_ID = 'f731a385-3627-4319-87f5-1ea513de13a9';

export const AIDemosPage: React.FC<AIDemosPageProps> = ({ onOpenStartProject }) => {
  const vapiRef = useRef<Vapi | null>(null);
  const [isCalling, setIsCalling] = useState(false);
  const [status, setStatus] = useState('Voicebot Ready · Click to Speak');
  const [lastMessage, setLastMessage] = useState('Click "Start Voicebot Demo" below to speak directly with the FLOWLYM AI Voice Receptionist in real time.');
  const [copiedPrompt, setCopiedPrompt] = useState<string | null>(null);

  useEffect(() => {
    const vapi = new Vapi(PUBLIC_KEY);
    vapiRef.current = vapi;

    const onCallStart = () => {
      setIsCalling(true);
      setStatus('Live Call in Progress · Speak into your microphone');
      setLastMessage('The FLOWLYM voice agent is listening. Ask about our automation services, CRM pipelines, pricing, or request a meeting.');
    };
    const onCallEnd = () => {
      setIsCalling(false);
      setStatus('Demo Call Concluded · Ready for another test');
      setLastMessage('Call ended. Feel free to start another live test or contact our team to deploy one for your business.');
    };
    const onMessage = (message: any) => {
      if (message?.type === 'transcript' && message?.transcript) {
        setLastMessage(message.transcript);
      }
    };
    const onError = () => {
      setIsCalling(false);
      setStatus('Connection paused — click below to retry');
    };

    vapi.on('call-start', onCallStart);
    vapi.on('call-end', onCallEnd);
    vapi.on('message', onMessage);
    vapi.on('error', onError);

    return () => {
      vapi.stop();
      vapi.removeAllListeners();
      vapiRef.current = null;
    };
  }, []);

  const startDemo = async () => {
    try {
      setStatus('Connecting to FLOWLYM Voicebot…');
      await vapiRef.current?.start(ASSISTANT_ID);
    } catch {
      setStatus('Microphone access needed or connection unavailable.');
      setIsCalling(false);
    }
  };

  const endDemo = () => {
    vapiRef.current?.stop();
    setIsCalling(false);
    setStatus('Demo Call Concluded');
  };

  const samplePrompts = [
    'What AI automation services do you build?',
    'Can you qualify leads and sync to our CRM?',
    'How much does a custom WhatsApp AI agent cost?',
    'I want to schedule a discovery call with Shahmir'
  ];

  return (
    <div className="pt-28 pb-24 space-y-16 sm:space-y-20 font-sans">

      {/* SECTION 1: VOICEBOT HERO DEMO (Styled after high-impact Voicebot Banner) */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[2.5rem] border border-zinc-200/80 bg-gradient-to-br from-[#18181b] via-[#27272a] to-[#131316] text-white shadow-[0_25px_70px_rgba(15,42,102,0.25)]">

          {/* Ambient Lighting Orbs */}
          <div className="absolute -top-32 -left-20 w-96 h-96 rounded-full bg-zinc-500/20 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-40 right-0 w-[30rem] h-[30rem] rounded-full bg-zinc-400/20 blur-3xl pointer-events-none" />

          <div className="relative p-6 sm:p-10 lg:p-14">

            {/* Top Sub-Header */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-8 border-b border-white/10 mb-8">
              <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-zinc-500/20 border border-zinc-400/30 text-zinc-200 text-xs font-semibold uppercase tracking-wider">
                <Radio className="w-3.5 h-3.5 text-zinc-400 animate-pulse" />
                <span>FLOWLYM Voicebot Intelligence · Live Web Audio Demo</span>
              </div>

              <div className="flex items-center gap-3 text-xs text-zinc-200/80">
                <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
                <span className="font-mono text-emerald-400 font-medium">Sub-Second Latency (400ms)</span>
              </div>
            </div>

            {/* Grid Layout: Left Pitch + Right Interactive Controller */}
            <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-10 lg:gap-12 items-center">

              {/* Left Column: Heading & Value Prop */}
              <div className="space-y-6">
                <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-[1.12]">
                  Experience the Future of AI Voice Support.
                </h1>

                <p className="text-zinc-100/90 text-sm sm:text-base leading-relaxed max-w-xl">
                  Speak directly with our autonomous conversational receptionist. Built for dental clinics, law firms, real estate agencies, and e-commerce brands needing 24/7 human-sounding call triage.
                </p>

                {/* 4 Feature Badges */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  {[
                    { title: 'Natural Human Inflection', desc: 'Interruptible conversational flow' },
                    { title: 'Instant Lead Triage', desc: 'Qualifies intent & captures data' },
                    { title: 'CRM & WhatsApp Sync', desc: 'Updates HubSpot/Sheets instantly' },
                    { title: 'Autonomous Booking', desc: 'Books calendar appointments live' }
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 p-3 rounded-2xl bg-white/[0.06] border border-white/10 backdrop-blur-md">
                      <CheckCircle2 className="w-4 h-4 text-zinc-400 shrink-0 mt-0.5" />
                      <div>
                        <div className="text-xs font-bold text-white">{item.title}</div>
                        <div className="text-[11px] text-zinc-200/70">{item.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Test Prompts Pills */}
                <div className="pt-2">
                  <div className="text-xs font-semibold text-zinc-200/80 uppercase tracking-wider mb-2.5">
                    Try asking during the call:
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {samplePrompts.map((prompt, i) => (
                      <span
                        key={i}
                        className="text-xs px-3 py-1.5 rounded-xl bg-zinc-900/50 border border-zinc-400/20 text-zinc-100 hover:border-zinc-400 transition-colors cursor-default"
                      >
                        "{prompt}"
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={onOpenStartProject}
                    className="inline-flex items-center gap-2 text-xs font-semibold text-zinc-300 hover:text-white transition-colors"
                  >
                    Deploy a custom Voicebot for your business <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Right Column: Sleek Voice Controller Box */}
              <div className="relative">
                <div className="relative rounded-3xl border border-zinc-300/20 bg-white/[0.08] backdrop-blur-2xl p-6 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.3)]">

                  {/* Status Bar */}
                  <div className="flex items-center justify-between pb-6 border-b border-white/10">
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${
                        isCalling ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 shadow-lg shadow-emerald-500/20' : 'bg-zinc-500/20 text-zinc-300 border border-zinc-400/30'
                      }`}>
                        {isCalling ? <PhoneCall className="w-6 h-6 animate-pulse" /> : <Bot className="w-6 h-6" />}
                      </div>
                      <div>
                        <div className="text-sm font-bold text-white flex items-center gap-2">
                          FLOWLYM AI Receptionist
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-zinc-500/30 text-zinc-200 border border-zinc-400/30">v2.4</span>
                        </div>
                        <div className="text-xs text-zinc-200/80 mt-0.5">{status}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <span className={`w-3 h-3 rounded-full ${isCalling ? 'bg-emerald-400 animate-ping' : 'bg-zinc-400/40'}`} />
                    </div>
                  </div>

                  {/* Visualizer & Audio Wave Area */}
                  <div className="py-8 flex flex-col items-center justify-center text-center">

                    {/* Animated Pulsing Microphone Sphere */}
                    <div className="relative mb-6">
                      {isCalling && (
                        <>
                          <div className="absolute inset-0 -m-3 rounded-full bg-zinc-400/20 animate-ping" />
                          <div className="absolute inset-0 -m-6 rounded-full bg-zinc-400/10 animate-pulse" />
                        </>
                      )}

                      <div className={`relative w-28 h-28 rounded-full flex items-center justify-center border-2 transition-all duration-500 ${
                        isCalling
                          ? 'border-emerald-400 bg-gradient-to-tr from-emerald-500/30 to-zinc-400/20 shadow-[0_0_40px_rgba(52,211,153,0.4)]'
                          : 'border-zinc-400/40 bg-gradient-to-tr from-zinc-900/30 to-zinc-400/10 shadow-[0_0_30px_rgba(56,189,248,0.2)]'
                      }`}>
                        {isCalling ? (
                          <Volume2 className="w-10 h-10 text-emerald-300 animate-bounce" />
                        ) : (
                          <Mic className="w-10 h-10 text-zinc-300" />
                        )}
                      </div>
                    </div>

                    {/* Animated Frequency Bars when calling */}
                    <div className="flex items-center justify-center gap-1 h-8 mb-4 w-full">
                      {[12, 24, 18, 32, 16, 28, 20, 36, 14, 26, 30, 18, 22, 34, 15, 25].map((h, i) => (
                        <div
                          key={i}
                          className={`w-1 rounded-full transition-all duration-300 ${
                            isCalling ? 'bg-zinc-400 animate-pulse' : 'bg-white/20'
                          }`}
                          style={{
                            height: isCalling ? `${Math.max(6, (h * (i % 3 + 1)) % 32)}px` : '6px',
                            animationDelay: `${i * 70}ms`
                          }}
                        />
                      ))}
                    </div>

                    {/* Live Transcript Box */}
                    <div className="w-full bg-black/30 border border-white/10 rounded-2xl p-4 min-h-[72px] flex items-center justify-center text-center">
                      <p className="text-xs sm:text-sm text-zinc-100 leading-relaxed font-medium">
                        "{lastMessage}"
                      </p>
                    </div>
                  </div>

                  {/* Primary CTA Buttons */}
                  <div className="space-y-3 pt-2">
                    {isCalling ? (
                      <button
                        onClick={endDemo}
                        className="w-full flex items-center justify-center gap-2.5 py-4 px-6 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-sm tracking-wide shadow-lg shadow-rose-600/30 transition-all cursor-pointer"
                      >
                        <PhoneOff className="w-4 h-4" /> End Live Voicebot Call
                      </button>
                    ) : (
                      <button
                        onClick={startDemo}
                        className="w-full flex items-center justify-center gap-2.5 py-4 px-6 rounded-2xl bg-white hover:bg-zinc-200 text-zinc-950 font-bold text-sm tracking-wide shadow-xl shadow-black/40 transition-all hover:scale-[1.02] cursor-pointer"
                      >
                        <Mic className="w-4 h-4" /> Start Voicebot Demo Now
                      </button>
                    )}

                    <div className="flex items-center justify-center gap-2 text-[11px] text-zinc-200/60 font-mono">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Encrypted web-audio channel · Powered by Vapi AI Engine</span>
                    </div>
                  </div>

                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* SECTION 2: AI LEAD QUALIFIER (Light Blue & White Theme) */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl space-y-4 mb-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-zinc-50 px-3.5 py-1.5 text-xs font-mono font-semibold text-zinc-800">
            <Brain className="h-4 w-4 text-zinc-900" /> 01 / AI Workflow Screening
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900">
            See if your business processes are ready for automation.
          </h2>
          <p className="text-base text-zinc-600 leading-relaxed">
            Describe any repetitive task or operational bottleneck. Our AI screening algorithm calculates automation viability, estimates team hours saved, and recommends precise n8n/Make pipelines.
          </p>
        </div>
        <LeadQualifierDemo />
      </section>

      {/* SECTION 3: AI MESSAGE WRITER (Light Blue & White Theme) */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl space-y-4 mb-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-zinc-50 px-3.5 py-1.5 text-xs font-mono font-semibold text-zinc-800">
            <PenLine className="h-4 w-4 text-zinc-900" /> 02 / Multi-Channel Copywriter
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900">
            Generate high-converting customer messages in seconds.
          </h2>
          <p className="text-base text-zinc-600 leading-relaxed">
            Draft follow-up WhatsApp messages, proposal closing emails, and SMS alerts formatted specifically for customer conversion. Choose channel and tone for instant delivery templates.
          </p>
        </div>
        <MessageWriterDemo />
      </section>

      {/* SECTION 4: WEB DEVELOPMENT & VIBE CODED SHOWCASE */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl space-y-4 mb-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-zinc-50 px-3.5 py-1.5 text-xs font-mono font-semibold text-zinc-800">
            <Sparkles className="h-4 w-4 text-zinc-900" /> 03 / Custom Web Engineering · ⚡ VIBE CODED
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900">
            Custom Web Applications & Interactive Digital Experiences
          </h2>
          <p className="text-base text-zinc-600 leading-relaxed">
            Explore live interactive web platforms engineered and vibe coded by FLOWLYM. Toggle between responsive viewpoints, test interactive components, or launch the live sites in full screen.
          </p>
        </div>
        <WebDemosShowcase />
      </section>

      {/* SECTION 5: TRAVEL AGENCY OPERATIONS DASHBOARD */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl space-y-4 mb-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-zinc-50 px-3.5 py-1.5 text-xs font-mono font-semibold text-zinc-800">
            <Sparkles className="h-4 w-4 text-zinc-900" /> 04 / Global Travel Operations AI
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900">
            Explore a complete AI travel operations system.
          </h2>
          <p className="text-base text-zinc-600 leading-relaxed">
            Test a fully interactive global travel agency dashboard with safe demo data. Browse leads, WhatsApp conversations, packages, analytics, payments, escalations and automated follow-ups.
          </p>
          <div className="flex flex-wrap gap-2 text-xs font-semibold text-zinc-600 pt-1">
            <DemoPill icon={<LockKeyhole />} text="Read-only business data" />
            <DemoPill icon={<MessageCircle />} text="Interactive AI chat" />
            <DemoPill icon={<Workflow />} text="Workflow simulation" />
            <DemoPill icon={<Bot />} text="No real transactions" />
          </div>
        </div>
        <TravelAgencyDashboard />
      </section>

      {/* SECTION 6: CAR RENTAL CRM AUTOMATION */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl space-y-4 mb-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-zinc-50 px-3.5 py-1.5 text-xs font-mono font-semibold text-zinc-800">
            <Zap className="h-4 w-4 text-zinc-900" /> 05 / Automotive CRM & AI Calls
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900">
            Explore an AI-powered car rental operations system.
          </h2>
          <p className="text-base text-zinc-600 leading-relaxed">
            Test a fully interactive car rental CRM demo with safe sample data. Explore bookings, AI WhatsApp conversations, call automation, fleet management, follow-ups, workflow logic, agents and analytics.
          </p>
          <div className="flex flex-wrap gap-2 text-xs font-semibold text-zinc-600 pt-1">
            <DemoPill icon={<LockKeyhole />} text="Read-only demo data" />
            <DemoPill icon={<MessageCircle />} text="AI WhatsApp flow" />
            <DemoPill icon={<Workflow />} text="Booking automation" />
            <DemoPill icon={<Bot />} text="Fleet + CRM" />
          </div>
        </div>
        <CarRentalDashboard />
      </section>

      {/* SECTION 7: BOTTOM CALLOUT */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-[2.5rem] bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-900 p-8 sm:p-12 text-white shadow-xl">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-300">
                <CheckCircle2 className="h-4 w-4 text-zinc-300" /> What this demonstrates
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold">
                Production-grade AI systems tailored to your workflows.
              </h2>
              <p className="max-w-2xl text-sm sm:text-base leading-relaxed text-zinc-100/80">
                Every demo on this page represents real software, voice bots, and automation architectures built by FLOWLYM. Tell us what you want to automate and we'll deliver a working prototype in days.
              </p>
            </div>
            <button
              onClick={onOpenStartProject}
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-6 py-4 text-sm font-bold text-zinc-950 hover:bg-zinc-50 shadow-lg transition-all hover:scale-105 shrink-0"
            >
              Start Your Project <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};

const DemoPill = ({ icon, text }: { icon: React.ReactNode; text: string }) => (
  <span className="inline-flex items-center gap-1.5 rounded-full border border-zinc-100 bg-white px-3 py-1.5 shadow-xs">
    <span className="text-zinc-900">{React.cloneElement(icon as React.ReactElement, { className: 'h-3.5 w-3.5' })}</span>
    <span>{text}</span>
  </span>
);
