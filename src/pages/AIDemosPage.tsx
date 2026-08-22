import React, { useEffect, useRef, useState } from 'react';
import Vapi from '@vapi-ai/web';
import { ArrowRight, Bot, CheckCircle2, Mic, PhoneOff, Sparkles, Zap, LockKeyhole, MessageCircle, Workflow } from 'lucide-react';
import { TravelAgencyDashboard } from '../components/TravelAgencyDashboard';
import { CarRentalDashboard } from '../components/CarRentalDashboard';

interface AIDemosPageProps { onOpenStartProject: () => void; }

const PUBLIC_KEY = '94a6394c-4637-4118-aa29-f05b239de763';
const ASSISTANT_ID = 'f731a385-3627-4319-87f5-1ea513de13a9';

export const AIDemosPage: React.FC<AIDemosPageProps> = ({ onOpenStartProject }) => {
  const vapiRef = useRef<Vapi | null>(null);
  const [isCalling, setIsCalling] = useState(false);
  const [status, setStatus] = useState('Ready for a live demo');
  const [lastMessage, setLastMessage] = useState('Click the button to speak with the FLOWLYM AI receptionist.');

  useEffect(() => {
    const vapi = new Vapi(PUBLIC_KEY);
    vapiRef.current = vapi;

    const onCallStart = () => {
      setIsCalling(true);
      setStatus('Live call in progress');
      setLastMessage('The AI receptionist is listening. Try asking about services, pricing, or booking a call.');
    };
    const onCallEnd = () => {
      setIsCalling(false);
      setStatus('Demo call ended');
      setLastMessage('Thanks for testing it. Start another call whenever you want.');
    };
    const onMessage = (message: any) => {
      if (message?.type === 'transcript' && message?.transcript) {
        setLastMessage(message.transcript);
      }
    };
    const onError = () => {
      setIsCalling(false);
      setStatus('Connection issue — please try again');
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
      setStatus('Connecting to AI receptionist…');
      await vapiRef.current?.start(ASSISTANT_ID);
    } catch {
      setStatus('Could not start the demo');
      setIsCalling(false);
    }
  };

  const endDemo = () => {
    vapiRef.current?.stop();
    setIsCalling(false);
    setStatus('Demo call ended');
  };

  return (
    <div className="pt-28 pb-20">
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[2rem] border border-zinc-800 bg-[#0b0b10] text-white shadow-2xl">
          <div className="absolute -top-32 -left-20 w-80 h-80 rounded-full bg-violet-600/25 blur-3xl" />
          <div className="absolute -bottom-40 right-0 w-96 h-96 rounded-full bg-cyan-500/15 blur-3xl" />
          <div className="relative grid lg:grid-cols-[1.05fr_.95fr] gap-10 p-7 sm:p-10 lg:p-14">
            <div className="flex flex-col justify-center">
              <div className="inline-flex w-fit items-center gap-2 px-3 py-1.5 rounded-full border border-violet-400/20 bg-violet-400/10 text-violet-200 text-[11px] font-semibold uppercase tracking-[0.18em]">
                <Sparkles className="w-3.5 h-3.5" /> AI Demos
              </div>
              <h1 className="mt-6 text-4xl sm:text-5xl font-bold tracking-[-0.04em] leading-tight">Talk to an AI receptionist we actually built.</h1>
              <p className="mt-5 max-w-xl text-sm sm:text-base leading-7 text-zinc-400">Test a live voice agent directly from the website. Ask questions, describe a project, or see how an AI receptionist can handle first-line conversations for a business.</p>

              <div className="mt-7 grid sm:grid-cols-3 gap-3">
                {['Natural voice interaction', '24/7 first response', 'Built for real workflows'].map((item) => (
                  <div key={item} className="rounded-2xl border border-white/10 bg-white/[0.035] p-4">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <p className="mt-2 text-xs text-zinc-300 leading-5">{item}</p>
                  </div>
                ))}
              </div>

              <button onClick={onOpenStartProject} className="mt-7 inline-flex w-fit items-center gap-2 text-sm font-semibold text-white hover:text-violet-200 transition-colors">
                Want one for your business? <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="relative flex items-center justify-center">
              <div className="w-full max-w-md rounded-[2rem] border border-white/10 bg-white/[0.055] backdrop-blur-xl p-5 sm:p-7 shadow-[0_30px_90px_rgba(0,0,0,.35)]">
                <div className="flex items-center justify-between pb-5 border-b border-white/10">
                  <div className="flex items-center gap-3">
                    <div className={`w-11 h-11 rounded-2xl flex items-center justify-center ${isCalling ? 'bg-emerald-400/15 text-emerald-300' : 'bg-violet-400/15 text-violet-300'}`}>
                      <Bot className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold">FLOWLYM Receptionist</div>
                      <div className="text-[11px] text-zinc-500">{status}</div>
                    </div>
                  </div>
                  <span className={`w-2.5 h-2.5 rounded-full ${isCalling ? 'bg-emerald-400 animate-pulse' : 'bg-zinc-600'}`} />
                </div>

                <div className="min-h-40 flex flex-col items-center justify-center text-center px-4">
                  <div className={`relative w-24 h-24 rounded-full flex items-center justify-center border ${isCalling ? 'border-emerald-400/40 bg-emerald-400/10' : 'border-violet-400/30 bg-violet-400/10'}`}>
                    {isCalling && <span className="absolute inset-0 rounded-full border border-emerald-300/20 animate-ping" />}
                    <Mic className={`w-8 h-8 ${isCalling ? 'text-emerald-300' : 'text-violet-300'}`} />
                  </div>
                  <p className="mt-5 text-xs leading-5 text-zinc-400 max-w-xs">{lastMessage}</p>
                </div>

                {isCalling ? (
                  <button onClick={endDemo} className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-red-500/90 hover:bg-red-500 py-3.5 text-sm font-semibold transition-all">
                    <PhoneOff className="w-4 h-4" /> End demo call
                  </button>
                ) : (
                  <button onClick={startDemo} className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-white text-zinc-950 hover:bg-violet-100 py-3.5 text-sm font-semibold transition-all shadow-lg">
                    <Mic className="w-4 h-4" /> Start live demo
                  </button>
                )}
                <div className="mt-4 flex items-center justify-center gap-1.5 text-[10px] text-zinc-600"><Zap className="w-3 h-3" /> Powered by Vapi voice AI</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <div className="max-w-3xl space-y-5 mb-7">
          <div className="inline-flex items-center gap-2 rounded-full border border-violet-100 bg-violet-50 px-3 py-1 text-[11px] font-mono font-semibold text-violet-700"><Sparkles className="h-3.5 w-3.5" /> Travel Agency AI Employee</div>
          <h2 className="text-3xl font-bold tracking-tight text-zinc-950 sm:text-4xl">Explore a complete AI travel operations system.</h2>
          <p className="max-w-2xl text-sm leading-relaxed text-zinc-600 sm:text-base">Test the Pakistan-focused travel agency dashboard with safe demo data. Browse leads, WhatsApp conversations, packages, analytics, payments, escalations and automated follow-ups. Business data is read-only.</p>
          <div className="flex flex-wrap gap-2 text-[10px] font-semibold text-zinc-600">
            <DemoPill icon={<LockKeyhole />} text="Read-only business data" />
            <DemoPill icon={<MessageCircle />} text="Interactive AI chat" />
            <DemoPill icon={<Workflow />} text="Workflow simulation" />
            <DemoPill icon={<Bot />} text="No real transactions" />
          </div>
        </div>
        <TravelAgencyDashboard />
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="max-w-3xl space-y-5 mb-7">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-100 bg-cyan-50 px-3 py-1 text-[11px] font-mono font-semibold text-cyan-700"><Zap className="h-3.5 w-3.5" /> Car Rental AI Automation</div>
          <h2 className="text-3xl font-bold tracking-tight text-zinc-950 sm:text-4xl">Explore an AI-powered car rental operations system.</h2>
          <p className="max-w-2xl text-sm leading-relaxed text-zinc-600 sm:text-base">Test the Pakistan-focused car rental CRM demo with safe sample data. Explore bookings, AI WhatsApp conversations, call automation, fleet management, follow-ups, workflow logic, agents and analytics.</p>
          <div className="flex flex-wrap gap-2 text-[10px] font-semibold text-zinc-600">
            <DemoPill icon={<LockKeyhole />} text="Read-only demo data" />
            <DemoPill icon={<MessageCircle />} text="AI WhatsApp flow" />
            <DemoPill icon={<Workflow />} text="Booking automation" />
            <DemoPill icon={<Bot />} text="Fleet + CRM" />
          </div>
        </div>
        <CarRentalDashboard />
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="rounded-3xl bg-zinc-950 p-7 text-white sm:p-10">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div><div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-violet-300"><CheckCircle2 className="h-4 w-4" /> What this demonstrates</div><h2 className="text-2xl font-bold sm:text-3xl">A complete AI travel operations layer — not just a chatbot.</h2><p className="mt-3 max-w-2xl text-sm leading-relaxed text-zinc-400">The production workflow can capture WhatsApp enquiries, qualify travellers, retrieve packages, create itineraries, save lead data, schedule follow-ups, escalate edge cases and trigger payment workflows.</p></div>
            <button onClick={onOpenStartProject} className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-zinc-950 hover:bg-violet-50">Build something similar <ArrowRight className="h-4 w-4" /></button>
          </div>
        </div>
      </section>
    </div>
  );
};

const DemoPill = ({ icon, text }: { icon: React.ReactNode; text: string }) => <span className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 bg-white px-2.5 py-1.5"><span className="text-violet-600">{React.cloneElement(icon as React.ReactElement, { className: 'h-3 w-3' })}</span>{text}</span>;
