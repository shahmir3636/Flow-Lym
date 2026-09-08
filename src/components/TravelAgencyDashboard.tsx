import React, { useMemo, useState } from 'react';
import {
  Activity,
  AlertTriangle,
  BarChart3,
  Bell,
  Bot,
  CalendarDays,
  Check,
  ChevronDown,
  ChevronRight,
  CircleDollarSign,
  Clock3,
  Download,
  FileText,
  Filter,
  LayoutDashboard,
  MessageCircle,
  MoreHorizontal,
  Package,
  Phone,
  Plane,
  RefreshCw,
  Search,
  Send,
  Settings,
  Sparkles,
  UserRound,
  Users,
  Wallet,
  X,
  Zap,
} from 'lucide-react';

interface Lead {
  id: number;
  name: string;
  phone: string;
  destination: string;
  budget: number;
  passengers: number;
  dates: string;
  stage: 'new' | 'interested' | 'qualified' | 'quoted' | 'booked';
  lastContact: string;
}

interface ChatMessage {
  from: 'customer' | 'ai';
  text: string;
  time: string;
}

const leads: Lead[] = [
  { id: 1, name: 'James Carter', phone: '+1 415 238 9041', destination: 'Bali, Indonesia', budget: 3200, passengers: 4, dates: '12–18 Sep', stage: 'qualified', lastContact: '2 min ago' },
  { id: 2, name: 'Sofia Reyes', phone: '+34 612 445 871', destination: 'Amalfi Coast, Italy', budget: 4800, passengers: 2, dates: '20–26 Sep', stage: 'interested', lastContact: '8 min ago' },
  { id: 3, name: 'Liam Thompson', phone: '+44 7911 234567', destination: 'Queenstown, NZ', budget: 2800, passengers: 5, dates: '05–09 Oct', stage: 'new', lastContact: '12 min ago' },
  { id: 4, name: 'Emma Wilson', phone: '+61 412 098 432', destination: 'Santorini, Greece', budget: 3600, passengers: 3, dates: '27 Sep–02 Oct', stage: 'booked', lastContact: '19 min ago' },
  { id: 5, name: 'Noah Garcia', phone: '+1 310 882 5541', destination: 'Tokyo, Japan', budget: 2200, passengers: 2, dates: '14–16 Oct', stage: 'quoted', lastContact: '31 min ago' },
  { id: 6, name: 'Isabella Chen', phone: '+65 9182 7734', destination: 'Maldives', budget: 5200, passengers: 4, dates: '08–13 Oct', stage: 'qualified', lastContact: '43 min ago' },
  { id: 7, name: 'Oliver Smith', phone: '+44 7890 654321', destination: 'Bali, Indonesia', budget: 6400, passengers: 6, dates: '01–08 Nov', stage: 'booked', lastContact: '1 hr ago' },
  { id: 8, name: 'Ava Johnson', phone: '+1 212 544 9810', destination: 'Amalfi Coast, Italy', budget: 3800, passengers: 2, dates: '22–27 Oct', stage: 'interested', lastContact: '1 hr ago' },
  { id: 9, name: 'Lucas Brown', phone: '+49 171 234 5678', destination: 'Dubai, UAE', budget: 1900, passengers: 2, dates: '18–20 Sep', stage: 'new', lastContact: '1 hr ago' },
  { id: 10, name: 'Mia Davis', phone: '+33 6 12 34 56 78', destination: 'Maldives', budget: 3400, passengers: 4, dates: '11–16 Oct', stage: 'booked', lastContact: '1 hr ago' },
  { id: 11, name: 'Ethan Martinez', phone: '+1 646 312 8821', destination: 'Queenstown, NZ', budget: 2600, passengers: 3, dates: '04–07 Nov', stage: 'qualified', lastContact: '2 hrs ago' },
  { id: 12, name: 'Charlotte Lee', phone: '+65 8231 9047', destination: 'Kyoto, Japan', budget: 4200, passengers: 4, dates: '15–20 Oct', stage: 'interested', lastContact: '2 hrs ago' },
  { id: 13, name: 'Aiden Taylor', phone: '+1 503 771 4402', destination: 'Santorini, Greece', budget: 2100, passengers: 2, dates: '09–11 Oct', stage: 'new', lastContact: '2 hrs ago' },
  { id: 14, name: 'Harper Anderson', phone: '+61 403 721 984', destination: 'Amalfi Coast, Italy', budget: 7200, passengers: 5, dates: '25 Sep–02 Oct', stage: 'booked', lastContact: '3 hrs ago' },
  { id: 15, name: 'Elijah Harris', phone: '+1 702 558 1239', destination: 'Bali, Indonesia', budget: 2900, passengers: 2, dates: '03–07 Nov', stage: 'quoted', lastContact: '3 hrs ago' },
];

const conversations: Record<string, ChatMessage[]> = {
  '0': [
    { from: 'customer', text: 'Hi, I\'m looking for a Bali trip for 4 people in September.', time: '10:42 AM' },
    { from: 'ai', text: 'Great choice! I can help with that. What dates in September work for you, and what budget should I work with?', time: '10:42 AM' },
    { from: 'customer', text: 'Around $3,200. We\'d love comfortable stays and airport transfers included.', time: '10:43 AM' },
    { from: 'ai', text: 'Perfect. I found a 7-day Bali package within your budget with airport transfers, boutique hotel stays, and guided temple tours. Let me prepare the full itinerary.', time: '10:43 AM' },
  ],
  '1': [
    { from: 'customer', text: 'Can you suggest an Amalfi Coast package for two people?', time: '10:21 AM' },
    { from: 'ai', text: 'Absolutely. For two people, I have Amalfi Coast options from $3,800 to $6,200 depending on villa category and private boat transfers.', time: '10:21 AM' },
    { from: 'customer', text: 'Show me something around $4,800 for 6 nights.', time: '10:22 AM' },
    { from: 'ai', text: 'A 7-day Amalfi Luxury escape fits that range. It includes private transfers, clifftop hotel accommodation, and boat trips to Positano and Ravello.', time: '10:22 AM' },
  ],
  '2': [
    { from: 'customer', text: 'What do you have for New Zealand under $3,000?', time: '09:58 AM' },
    { from: 'ai', text: 'I found a great Queenstown adventure package within that range. Tell me your travel dates and number of passengers and I\'ll narrow it down.', time: '09:58 AM' },
  ],
};

const packages = [
  { name: 'Bali Discovery', destination: 'Bali, Indonesia', duration: '7 Days / 6 Nights', price: 2990, highlights: 'Ubud Temples • Seminyak Beach • Tegallalang', tag: 'Popular', icon: '🌴' },
  { name: 'Amalfi Luxury Escape', destination: 'Amalfi Coast, Italy', duration: '7 Days / 6 Nights', price: 4800, highlights: 'Positano • Ravello • Private Boat', tag: 'Best Seller', icon: '⛵' },
  { name: 'Queenstown Adventure', destination: 'Queenstown, NZ', duration: '5 Days / 4 Nights', price: 2750, highlights: 'Milford Sound • Skyline • Bungee', tag: 'Adventure', icon: '🏔️' },
  { name: 'Santorini Getaway', destination: 'Santorini, Greece', duration: '6 Days / 5 Nights', price: 3400, highlights: 'Oia Sunset • Wine Tour • Caldera', tag: 'Romantic', icon: '🌅' },
  { name: 'Tokyo Explorer', destination: 'Tokyo, Japan', duration: '7 Days / 6 Nights', price: 3100, highlights: 'Shibuya • Kyoto Day Trip • Tsukiji', tag: 'Cultural', icon: '🗼' },
  { name: 'Maldives Overwater', destination: 'Maldives', duration: '6 Days / 5 Nights', price: 5200, highlights: 'Overwater Villa • Snorkeling • Sunset Cruise', tag: 'Luxury', icon: '🐠' },
  { name: 'Dubai City & Desert', destination: 'Dubai, UAE', duration: '6 Days / 5 Nights', price: 2900, highlights: 'Burj Khalifa • Desert Safari • Mall of Emirates', tag: 'Value', icon: '🏙️' },
  { name: 'Kyoto Cultural Immersion', destination: 'Kyoto, Japan', duration: '6 Days / 5 Nights', price: 3600, highlights: 'Fushimi Inari • Arashiyama • Geisha District', tag: 'Premium', icon: '⛩️' },
];

const stageMeta = {
  new: { label: 'New', cls: 'bg-zinc-50 text-zinc-800 border-zinc-100' },
  interested: { label: 'Interested', cls: 'bg-zinc-50 text-zinc-800 border-zinc-100' },
  qualified: { label: 'Qualified', cls: 'bg-amber-50 text-amber-700 border-amber-100' },
  quoted: { label: 'Quoted', cls: 'bg-rose-50 text-rose-700 border-rose-100' },
  booked: { label: 'Booked', cls: 'bg-emerald-50 text-emerald-700 border-emerald-100' },
};

const formatUSD = (value: number) => `$${value.toLocaleString('en-US')}`;
const initials = (name: string) => name.split(' ').map((x) => x[0]).slice(0, 2).join('');

export const TravelAgencyDashboard: React.FC = () => {
  const [view, setView] = useState('dashboard');
  const [selectedLead, setSelectedLead] = useState('0');
  const [chatMessages, setChatMessages] = useState<Record<string, ChatMessage[]>>(conversations);
  const [input, setInput] = useState('');
  const [search, setSearch] = useState('');
  const [stageFilter, setStageFilter] = useState<'all' | Lead['stage']>('all');
  const [packageOpen, setPackageOpen] = useState<(typeof packages)[number] | null>(null);
  const [toast, setToast] = useState('');

  const showToast = (message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(''), 2200);
  };

  const filteredLeads = useMemo(() => leads.filter((lead) => {
    const matchesStage = stageFilter === 'all' || lead.stage === stageFilter;
    const q = search.toLowerCase().trim();
    const matchesSearch = !q || [lead.name, lead.phone, lead.destination, lead.stage].join(' ').toLowerCase().includes(q);
    return matchesStage && matchesSearch;
  }), [search, stageFilter]);

  const currentMessages = chatMessages[selectedLead] || [];

  const sendMessage = () => {
    const text = input.trim();
    if (!text) return;
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const reply = getDemoReply(text);
    setChatMessages((prev) => ({
      ...prev,
      [selectedLead]: [...(prev[selectedLead] || []), { from: 'customer', text, time: now }, { from: 'ai', text: reply, time: now }],
    }));
    setInput('');
  };

  const navItems = [
    { id: 'dashboard', label: 'Overview', icon: LayoutDashboard },
    { id: 'leads', label: 'Lead Management', icon: Users, badge: '15' },
    { id: 'conversations', label: 'WhatsApp Conversations', icon: MessageCircle },
    { id: 'packages', label: 'Travel Packages', icon: Package },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'payments', label: 'Payment Tracker', icon: Wallet },
    { id: 'escalations', label: 'Escalation Queue', icon: AlertTriangle, badge: '2' },
    { id: 'followups', label: 'Follow-up Scheduler', icon: RefreshCw },
  ];

  return (
    <div className="relative overflow-hidden rounded-[26px] border border-zinc-800 bg-[#0b0b0e] text-zinc-100 shadow-2xl">
      <div className="flex h-[640px] min-h-0">
        <aside className="hidden lg:flex h-full w-[230px] shrink-0 flex-col border-r border-zinc-800 bg-[#101013]">
          <div className="border-b border-zinc-800 p-5">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-zinc-400 to-zinc-900 text-lg">✈️</div>
              <div><div className="font-bold tracking-tight">TravelAI</div><div className="text-[9px] uppercase tracking-[0.18em] text-zinc-500">Travel Operations</div></div>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-3">
            <div className="mb-2 px-2 text-[9px] font-semibold uppercase tracking-[0.16em] text-zinc-600">Workspace</div>
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = view === item.id;
              return <button key={item.id} onClick={() => setView(item.id)} className={`mb-1 flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-left text-[11px] font-medium transition ${active ? 'bg-zinc-400/10 text-zinc-300' : 'text-zinc-400 hover:bg-zinc-800/70 hover:text-white'}`}><Icon className="h-4 w-4 shrink-0" />{item.label}{item.badge && <span className="ml-auto rounded-full bg-zinc-800 px-1.5 py-0.5 text-[9px] text-zinc-400">{item.badge}</span>}</button>;
            })}
          </div>
          <div className="border-t border-zinc-800 bg-zinc-900/40 p-4">
            <div className="mb-2 text-[9px] font-semibold uppercase tracking-[0.14em] text-zinc-600">AI Employee</div>
            <div className="flex items-center gap-2.5"><div className="relative flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-zinc-900 to-zinc-400"><Bot className="h-4 w-4" /><span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-[#101013] bg-emerald-400" /></div><div><div className="text-[11px] font-semibold">Aria</div><div className="text-[9px] text-emerald-400">Online · AI active</div></div></div>
          </div>
        </aside>

        <div className="min-w-0 flex-1 min-h-0 flex flex-col">
          <header className="flex h-[66px] items-center gap-3 border-b border-zinc-800 bg-[#0d0d10] px-4 sm:px-6">
            <div className="flex-1"><div className="text-sm font-semibold">{navItems.find((x) => x.id === view)?.label || 'Overview'}</div><div className="text-[10px] text-zinc-500">Global Travel AI Employee · Read-only demo environment</div></div>
            <div className="hidden sm:flex items-center gap-2 rounded-xl border border-zinc-800 bg-zinc-900 px-3 py-2 text-[10px] text-zinc-400"><Search className="h-3.5 w-3.5" /><span>Demo data only</span></div>
            <button onClick={() => showToast('No settings are editable in this demo.')} className="flex h-9 w-9 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900 text-zinc-400 hover:text-white"><Settings className="h-4 w-4" /></button>
            <button onClick={() => showToast('2 demo notifications available.')} className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900 text-zinc-400 hover:text-white"><Bell className="h-4 w-4" /><span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-rose-400" /></button>
          </header>

          <div className="flex gap-1 overflow-x-auto border-b border-zinc-800 bg-[#101013] p-2 lg:hidden">{navItems.map((item) => { const Icon = item.icon; return <button key={item.id} onClick={() => setView(item.id)} className={`flex shrink-0 items-center gap-1.5 rounded-lg px-2.5 py-2 text-[9px] font-medium ${view === item.id ? 'bg-zinc-400/10 text-zinc-300' : 'text-zinc-500'}`}><Icon className="h-3 w-3" />{item.label}</button>; })}</div>

          <div className="flex-1 min-h-0 overflow-y-auto p-4 sm:p-6">
            {view === 'dashboard' && <DashboardView onNavigate={setView} onSelectLead={(id) => { setSelectedLead(id); setView('conversations'); }} />}
            {view === 'leads' && <LeadsView leads={filteredLeads} search={search} setSearch={setSearch} stageFilter={stageFilter} setStageFilter={setStageFilter} onOpenConversation={(id) => { setSelectedLead(String(id)); setView('conversations'); }} showToast={showToast} />}
            {view === 'conversations' && <ConversationsView selectedLead={selectedLead} setSelectedLead={setSelectedLead} messages={currentMessages} input={input} setInput={setInput} sendMessage={sendMessage} showToast={showToast} />}
            {view === 'packages' && <PackagesView onOpen={setPackageOpen} />}
            {view === 'analytics' && <AnalyticsView />}
            {view === 'payments' && <PaymentsView showToast={showToast} />}
            {view === 'escalations' && <EscalationsView showToast={showToast} />}
            {view === 'followups' && <FollowupsView showToast={showToast} />}
          </div>
        </div>
      </div>

      {packageOpen && <PackageModal pkg={packageOpen} onClose={() => setPackageOpen(null)} />}
      {toast && <div className="absolute bottom-5 right-5 z-30 flex items-center gap-2 rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-[11px] text-white shadow-2xl"><Check className="h-4 w-4 text-emerald-400" />{toast}</div>}
    </div>
  );
};

const DashboardView = ({ onNavigate, onSelectLead }: { onNavigate: (view: string) => void; onSelectLead: (id: string) => void }) => {
  const stages = [
    ['New', 3, 'bg-zinc-400'], ['Interested', 3, 'bg-zinc-300'], ['Qualified', 3, 'bg-amber-400'], ['Quoted', 2, 'bg-rose-400'], ['Booked', 4, 'bg-emerald-400'],
  ];
  const recent = leads.slice(0, 5);
  const spark = [28, 36, 31, 52, 45, 62, 58, 72, 68, 80, 74, 92];
  return <div className="space-y-5">
    <div className="grid grid-cols-2 gap-3 xl:grid-cols-4">
      <Kpi label="Total Leads" value="15" delta="↑ 4 this week" icon={<Users />} tone="cyan" />
      <Kpi label="Revenue (Month)" value="$42,300" delta="↑ 18% vs last month" icon={<CircleDollarSign />} tone="amber" />
      <Kpi label="Bookings" value="4" delta="↑ 2 this week" icon={<Check />} tone="emerald" />
      <Kpi label="Response Time" value="<30s" delta="AI 24/7 active" icon={<Zap />} tone="rose" />
    </div>
    <div className="grid grid-cols-1 gap-5 xl:grid-cols-[1fr_360px]">
      <div className="space-y-5">
        <Card title="Lead Pipeline" subtitle="Stage distribution across 15 demo leads" action={<span className="flex items-center gap-1 text-[9px] font-semibold text-emerald-400"><span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />LIVE</span>}>
          <div className="mx-5 mt-5 flex h-2 overflow-hidden rounded-full gap-1">{stages.map(([label, count, color]) => <div key={String(label)} title={`${label}: ${count}`} className={`${color} transition-all hover:brightness-125`} style={{ width: `${Number(count) / 15 * 100}%` }} />)}</div>
          <div className="grid grid-cols-2 gap-x-6 gap-y-3 p-5">{stages.map(([label, count, color]) => <div key={String(label)} className="flex items-center gap-2 text-[11px] text-zinc-400"><span className={`h-2 w-2 rounded-full ${color}`} />{label}<span className="ml-auto font-mono text-white">{count}</span></div>)}</div>
        </Card>
        <Card title="Recent Conversations" subtitle="AI handled · last 2 hours" action={<button onClick={() => onNavigate('conversations')} className="text-[10px] font-semibold text-zinc-300">View all →</button>}>
          {recent.map((lead) => <button key={lead.id} onClick={() => onSelectLead(String(lead.id - 1))} className="flex w-full items-center gap-3 border-b border-zinc-800/70 px-5 py-3 text-left last:border-0 hover:bg-zinc-400/[0.03]"><Avatar name={lead.name} /><div className="min-w-0 flex-1"><div className="text-[11px] font-semibold text-white">{lead.name}</div><div className="truncate text-[10px] text-zinc-500">Asked about {lead.destination}</div></div><div className="text-right"><div className="text-[9px] text-zinc-600">{lead.lastContact}</div><Stage stage={lead.stage} /></div></button>)}
        </Card>
        <Card title="This Month's Revenue" action={<span className="rounded-md border border-zinc-500/10 bg-zinc-500/5 px-2 py-1 text-[8px] font-semibold uppercase tracking-wider text-zinc-300">AI Converted</span>}>
          <div className="px-5 pt-5"><div className="text-2xl font-medium text-amber-300">$42,300</div><div className="mt-1 text-[10px] text-zinc-500">↑ $6,500 from AI bookings this week</div></div>
          <div className="flex h-24 items-end gap-1 px-5 pt-5">{spark.map((n, i) => <div key={i} className="flex-1 rounded-t bg-gradient-to-t from-zinc-400/60 to-zinc-300/70 hover:from-zinc-500 hover:to-zinc-300" style={{ height: `${n}%` }} title={`Week activity ${i + 1}`} />)}</div>
          <div className="flex justify-between px-5 py-3 text-[9px] text-zinc-600"><span>Week 1</span><span>Week 2</span><span>Week 3</span><span>Week 4</span></div>
        </Card>
      </div>
      <div className="space-y-5">
        <MiniChat onOpen={() => onNavigate('conversations')} />
        <Card title="AI Performance Today">
          {[['Messages handled', '47', 'text-zinc-300'], ['Leads qualified', '6', 'text-zinc-300'], ['Itineraries sent', '3', 'text-amber-300'], ['Payment links sent', '2', 'text-emerald-300'], ['Escalations raised', '1', 'text-rose-300'], ['Avg response time', '<30s', 'text-emerald-300']].map(([a, b, c]) => <div key={a} className="flex items-center justify-between border-b border-zinc-800/70 px-5 py-3 last:border-0"><span className="text-[10px] text-zinc-500">{a}</span><span className={`font-mono text-xs font-medium ${c}`}>{b}</span></div>)}
        </Card>
      </div>
    </div>
  </div>;
};

const MiniChat = ({ onOpen }: { onOpen: () => void }) => <Card title="Live WhatsApp Chat" action={<span className="rounded-md border border-zinc-300/10 bg-zinc-300/5 px-2 py-1 text-[8px] font-semibold text-zinc-300">🤖 ARIA</span>}>
  <div className="border-t border-zinc-800 bg-[#0a0a0c] p-4">
    <div className="mb-3 flex items-center justify-between"><div className="text-[10px] text-zinc-500">James Carter · +1 415 238 9041</div><MessageCircle className="h-4 w-4 text-emerald-400" /></div>
    <div className="space-y-2"><div className="ml-auto max-w-[85%] rounded-xl rounded-br-sm bg-zinc-800 px-3 py-2 text-[10px] leading-relaxed">Can you build a Bali itinerary for 4 people?</div><div className="max-w-[88%] rounded-xl rounded-bl-sm border border-zinc-500/10 bg-zinc-500/5 px-3 py-2 text-[10px] leading-relaxed">Absolutely. I can put together a package around your budget, dates and preferred hotel category.</div></div>
    <button onClick={onOpen} className="mt-4 text-[10px] font-semibold text-zinc-300">Open interactive conversation →</button>
  </div>
</Card>;

const LeadsView = ({ leads: visibleLeads, search, setSearch, stageFilter, setStageFilter, onOpenConversation, showToast }: { leads: Lead[]; search: string; setSearch: (v: string) => void; stageFilter: 'all' | Lead['stage']; setStageFilter: (v: 'all' | Lead['stage']) => void; onOpenConversation: (id: number) => void; showToast: (m: string) => void }) => <div className="space-y-5">
  <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end"><div><div className="text-xl font-semibold">Lead Management</div><div className="text-[11px] text-zinc-500">All inquiries tracked and qualified by AI · demo data is read-only</div></div><button onClick={() => showToast('CSV export simulated for the demo.')} className="inline-flex items-center gap-2 self-start rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-[10px] font-semibold text-zinc-300 hover:text-white"><Download className="h-3.5 w-3.5" /> Export CSV</button></div>
  <Card title="Lead Database">
    <div className="flex flex-wrap gap-2 border-b border-zinc-800 p-4"><div className="flex min-w-[220px] flex-1 items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-2"><Search className="h-3.5 w-3.5 text-zinc-600" /><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search name, phone, destination…" className="w-full bg-transparent text-[10px] text-white outline-none placeholder:text-zinc-600" /></div>{(['all', 'new', 'interested', 'qualified', 'booked'] as const).map((stage) => <button key={stage} onClick={() => setStageFilter(stage)} className={`rounded-lg border px-3 py-2 text-[9px] font-semibold capitalize ${stageFilter === stage ? 'border-zinc-500/40 bg-zinc-500/10 text-zinc-300' : 'border-zinc-800 bg-zinc-900 text-zinc-500 hover:text-white'}`}>{stage === 'all' ? 'All' : stage}</button>)}</div>
    <div className="overflow-x-auto"><table className="w-full min-w-[850px] text-left"><thead><tr className="border-b border-zinc-800 text-[9px] uppercase tracking-wider text-zinc-600"><th className="px-5 py-3">Customer</th><th>Destination</th><th>Budget</th><th>Passengers</th><th>Travel Dates</th><th>Stage</th><th>Last Contact</th><th /></tr></thead><tbody>{visibleLeads.map((lead) => <tr key={lead.id} className="border-b border-zinc-800/60 text-[10px] text-zinc-400 hover:bg-zinc-400/[0.02]"><td className="px-5 py-3"><div className="flex items-center gap-2.5"><Avatar name={lead.name} size="sm" /><div><div className="font-semibold text-white">{lead.name}</div><div className="font-mono text-[8px] text-zinc-600">{lead.phone}</div></div></div></td><td>{lead.destination}</td><td className="font-mono text-amber-300">{formatUSD(lead.budget)}</td><td>{lead.passengers}</td><td>{lead.dates}</td><td><Stage stage={lead.stage} /></td><td>{lead.lastContact}</td><td><button onClick={() => onOpenConversation(lead.id - 1)} className="flex h-7 w-7 items-center justify-center rounded-md border border-zinc-800 bg-zinc-900 text-zinc-500 hover:border-zinc-500/40 hover:text-zinc-300"><MessageCircle className="h-3.5 w-3.5" /></button></td></tr>)}</tbody></table></div>
    {!visibleLeads.length && <div className="p-12 text-center text-[11px] text-zinc-600">No demo leads matched your filters.</div>}
  </Card>
</div>;

const ConversationsView = ({ selectedLead, setSelectedLead, messages, input, setInput, sendMessage, showToast }: { selectedLead: string; setSelectedLead: (v: string) => void; messages: ChatMessage[]; input: string; setInput: (v: string) => void; sendMessage: () => void; showToast: (m: string) => void }) => <div className="space-y-5">
  <div><div className="text-xl font-semibold">WhatsApp Conversations</div><div className="text-[11px] text-zinc-500">Interactive sandbox — type as a customer; nothing is persisted.</div></div>
  <div className="grid grid-cols-1 gap-5 xl:grid-cols-[260px_1fr]">
    <Card title="Active Threads"><div>{leads.slice(0, 8).map((lead, index) => <button key={lead.id} onClick={() => setSelectedLead(String(index))} className={`flex w-full items-center gap-2.5 border-b border-zinc-800/70 px-4 py-3 text-left ${String(index) === selectedLead ? 'bg-zinc-400/[0.06]' : 'hover:bg-zinc-800/40'}`}><Avatar name={lead.name} size="sm" /><div className="min-w-0"><div className="truncate text-[10px] font-semibold text-white">{lead.name}</div><div className="truncate text-[8px] text-zinc-600">{lead.destination}</div></div></button>)}</div></Card>
    <Card title={leads[Number(selectedLead)]?.name || 'New Conversation'} action={<div className="flex gap-2"><button onClick={() => showToast('Calling is simulated in this demo.')} className="rounded-lg border border-zinc-800 px-2.5 py-1.5 text-[9px] text-zinc-400 hover:text-white"><Phone className="mr-1 inline h-3 w-3" /> Call</button><button onClick={() => showToast('Escalation sent to the demo human-agent queue.')} className="rounded-lg border border-rose-400/20 bg-rose-400/5 px-2.5 py-1.5 text-[9px] text-rose-300">Escalate</button></div>}>
      <div className="flex h-[520px] flex-col bg-[#0a0a0c]"><div className="flex-1 space-y-3 overflow-y-auto p-5">{messages.map((m, i) => <div key={i} className={m.from === 'customer' ? 'ml-auto max-w-[78%]' : 'max-w-[82%]'}><div className={`rounded-xl px-3 py-2.5 text-[11px] leading-relaxed ${m.from === 'customer' ? 'rounded-br-sm bg-zinc-800 text-white' : 'rounded-bl-sm border border-zinc-500/10 bg-zinc-500/5 text-zinc-200'}`}>{m.from === 'ai' && <div className="mb-1 flex items-center gap-1 text-[8px] font-semibold text-zinc-300"><Bot className="h-3 w-3" /> Aria AI</div>}{m.text}</div><div className={`mt-1 text-[8px] text-zinc-700 ${m.from === 'customer' ? 'text-right' : ''}`}>{m.time}</div></div>)}</div><div className="border-t border-zinc-800 p-3"><div className="mb-2 flex flex-wrap gap-1.5">{['Show Bali package', 'Budget $3,000', 'Need itinerary', 'Talk to agent'].map((q) => <button key={q} onClick={() => setInput(q)} className="rounded-full border border-zinc-500/15 bg-zinc-500/5 px-2.5 py-1 text-[8px] text-zinc-300 hover:bg-zinc-500/10">{q}</button>)}</div><div className="flex gap-2"><input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && sendMessage()} placeholder="Type as customer to test the AI…" className="flex-1 rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-2.5 text-[10px] text-white outline-none focus:border-zinc-400/50" /><button onClick={sendMessage} className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-zinc-400 to-zinc-900 text-white"><Send className="h-3.5 w-3.5" /></button></div></div></div>
    </Card>
  </div>
</div>;

const PackagesView = ({ onOpen }: { onOpen: (pkg: (typeof packages)[number]) => void }) => <div className="space-y-5"><div><div className="text-xl font-semibold">Travel Packages</div><div className="text-[11px] text-zinc-500">Global destinations available to the AI employee for recommendations.</div></div><div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">{packages.map((pkg) => <button key={pkg.name} onClick={() => onOpen(pkg)} className="group overflow-hidden rounded-2xl border border-zinc-800 bg-[#101013] text-left hover:border-zinc-400/30"><div className="flex h-24 items-center justify-center bg-gradient-to-br from-zinc-400/10 via-zinc-900/10 to-transparent text-5xl">{pkg.icon}</div><div className="p-4"><div className="text-sm font-semibold text-white">{pkg.name}</div><div className="mt-1 text-[10px] text-zinc-300">{pkg.destination}</div><div className="mt-2 text-[9px] text-zinc-500">{pkg.duration} · {pkg.highlights}</div><div className="mt-4 flex items-baseline justify-between"><span className="font-mono text-base text-amber-300">{formatUSD(pkg.price)}</span><span className="rounded bg-zinc-800 px-2 py-1 text-[8px] font-semibold text-zinc-400">{pkg.tag}</span></div></div></button>)}</div></div>;

const AnalyticsView = () => <div className="space-y-5"><div><div className="text-xl font-semibold">Analytics</div><div className="text-[11px] text-zinc-500">AI-driven conversion insights · August 2026 demo snapshot</div></div><div className="grid grid-cols-1 gap-3 md:grid-cols-3"><Kpi label="Conversion Rate" value="26.7%" delta="↑ 4.2% vs last month" icon={<Activity />} tone="amber" /><Kpi label="Avg Booking Value" value="$3,840" delta="↑ $420 average" icon={<Wallet />} tone="cyan" /><Kpi label="Leads from WhatsApp" value="87%" delta="AI captured 100%" icon={<MessageCircle />} tone="emerald" /></div><div className="grid grid-cols-1 gap-5 lg:grid-cols-2"><Card title="Monthly Revenue Trend"><SimpleChart values={[45, 55, 48, 62, 58, 71, 68, 79, 76, 88, 83, 96]} labels={['Sep','Oct','Nov','Dec','Jan','Feb','Mar','Apr','May','Jun','Jul','Aug']} /></Card><Card title="Top Destinations"><HorizontalBars items={[['Bali, Indonesia', 32], ['Amalfi Coast', 26], ['Maldives', 15], ['Santorini', 11], ['Tokyo', 9], ['Other', 7]]} /></Card><Card title="Conversion Funnel"><div className="space-y-4 p-5">{[['New Inquiries', 15, 100, 'bg-zinc-500'], ['Interested', 11, 73, 'bg-zinc-300'], ['Qualified', 7, 47, 'bg-amber-400'], ['Quoted', 5, 33, 'bg-rose-400'], ['Booked', 4, 27, 'bg-emerald-400']].map(([label, n, width, color]) => <div key={String(label)}><div className="mb-1 flex justify-between text-[9px] text-zinc-500"><span>{label}</span><span className="font-mono text-white">{n}</span></div><div className="h-1.5 overflow-hidden rounded-full bg-zinc-800"><div className={`h-full rounded-full ${color}`} style={{ width: `${width}%` }} /></div></div>)}</div></Card><Card title="Lead Stage Breakdown"><SimpleChart values={[4, 3, 3, 1, 4]} labels={['New','Interested','Qualified','Quoted','Booked']} /></Card></div></div>;

const PaymentsView = ({ showToast }: { showToast: (m: string) => void }) => <div className="space-y-5"><div><div className="text-xl font-semibold">Payment Tracker</div><div className="text-[11px] text-zinc-500">USD payment flow · demo only, no real transactions.</div></div><div className="grid grid-cols-2 gap-3 xl:grid-cols-4"><Kpi label="Collected" value="$36,000" delta="4 bookings" icon={<Check />} tone="emerald" /><Kpi label="Pending" value="$6,700" delta="2 links sent" icon={<Clock3 />} tone="amber" /><Kpi label="This Month" value="$42,300" delta="↑ 18%" icon={<BarChart3 />} tone="cyan" /><Kpi label="Failed" value="$1,900" delta="1 failed" icon={<AlertTriangle />} tone="rose" /></div><Card title="Payment Activity" action={<button onClick={() => showToast('Payment reminders simulated.')} className="text-[9px] font-semibold text-zinc-300">Send Reminders</button>}>{[['James Carter','Bali Discovery','$2,990','Paid'],['Emma Wilson','Santorini Getaway','$3,400','Paid'],['Oliver Smith','Bali Discovery','$6,400','Paid'],['Ava Johnson','Amalfi Luxury Escape','$4,800','Pending'],['Elijah Harris','Bali Discovery','$2,900','Pending'],['Noah Garcia','Tokyo Explorer','$1,900','Failed']].map(([name,pkg,amount,status]) => <div key={name} className="flex items-center gap-3 border-b border-zinc-800/70 px-5 py-3 last:border-0"><div className="flex h-9 w-9 items-center justify-center rounded-lg bg-zinc-800"><Wallet className="h-4 w-4 text-amber-300" /></div><div className="min-w-0 flex-1"><div className="text-[10px] font-semibold text-white">{name}</div><div className="text-[9px] text-zinc-600">{pkg}</div></div><div className="font-mono text-[10px] text-amber-300">{amount}</div><span className={`rounded px-2 py-1 text-[8px] font-bold uppercase ${status === 'Paid' ? 'bg-emerald-400/10 text-emerald-300' : status === 'Pending' ? 'bg-amber-400/10 text-amber-300' : 'bg-rose-400/10 text-rose-300'}`}>{status}</span></div>)}</Card></div>;

const EscalationsView = ({ showToast }: { showToast: (m: string) => void }) => <div className="space-y-5"><div><div className="text-xl font-semibold">Escalation Queue</div><div className="text-[11px] text-zinc-500">Cases flagged by Aria for human attention · demo queue</div></div><div className="grid grid-cols-1 gap-3 md:grid-cols-3"><Kpi label="High Priority" value="2" delta="Needs immediate action" icon={<AlertTriangle />} tone="rose" /><Kpi label="Medium Priority" value="2" delta="Review today" icon={<Clock3 />} tone="amber" /><Kpi label="Resolved Today" value="3" delta="Human team handled" icon={<Check />} tone="emerald" /></div><Card title="Open Escalations"><Escalation name="Lucas Brown" reason="Customer requested a corporate group quote" urgency="HIGH" summary="8 passengers, Dubai corporate retreat, requires custom hotel block and private transfers." onAction={() => showToast('Demo escalation marked for human review.')} /><Escalation name="Ava Johnson" reason="Payment question outside AI policy" urgency="HIGH" summary="Customer asked for a custom installment schedule and wants a human agent to confirm." onAction={() => showToast('Demo escalation assigned to the human queue.')} /><Escalation name="Ethan Martinez" reason="Complex multi-city route" urgency="MEDIUM" summary="Requested a custom Auckland + Queenstown + Milford route with a different return city." onAction={() => showToast('Demo escalation opened.')} /></Card></div>;

const FollowupsView = ({ showToast }: { showToast: (m: string) => void }) => <div className="space-y-5"><div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end"><div><div className="text-xl font-semibold">Follow-up Scheduler</div><div className="text-[11px] text-zinc-500">Automated re-engagement for unresponsive leads · read-only simulation</div></div><button onClick={() => showToast('Manual follow-up run simulated for 6 pending leads.')} className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-zinc-400 to-zinc-900 px-3 py-2 text-[9px] font-semibold text-white"><Zap className="h-3 w-3" /> Run Demo</button></div><div className="grid grid-cols-1 gap-3 md:grid-cols-3"><Kpi label="Sent Today" value="8" delta="Auto by AI" icon={<Send />} tone="emerald" /><Kpi label="Pending" value="6" delta="Next cycle: 10 AM" icon={<Clock3 />} tone="amber" /><Kpi label="Re-engaged" value="3" delta="from follow-ups" icon={<RefreshCw />} tone="cyan" /></div><Card title="Follow-up Timeline"><div className="divide-y divide-zinc-800/70">{[['10:00 AM','Liam Thompson','Just checking in — would you like me to refine the Queenstown package?','Sent'],['10:20 AM','Ava Johnson','I can hold the Amalfi Coast option while you confirm your dates.','Sent'],['11:00 AM','Aiden Taylor','Would you like a weekend Santorini itinerary under $2,500?','Scheduled'],['11:30 AM','Charlotte Lee','I found two Kyoto packages matching your budget.','Pending']].map(([time,name,msg,status]) => <div key={name} className="flex gap-4 px-5 py-4"><div className="w-16 shrink-0 font-mono text-[9px] text-zinc-600">{time}</div><div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-zinc-500" /><div className="flex-1"><div className="text-[10px] font-semibold text-white">{name}</div><div className="mt-1 text-[10px] leading-relaxed text-zinc-500">{msg}</div></div><span className="h-fit rounded bg-zinc-800 px-2 py-1 text-[8px] font-bold uppercase text-zinc-500">{status}</span></div>)}</div></Card></div>;

const PackageModal = ({ pkg, onClose }: { pkg: (typeof packages)[number]; onClose: () => void }) => <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm" onMouseDown={(e) => e.target === e.currentTarget && onClose()}><div className="w-full max-w-md overflow-hidden rounded-2xl border border-zinc-700 bg-[#101013] shadow-2xl"><div className="flex items-center justify-between border-b border-zinc-800 p-5"><div><div className="text-lg font-semibold">{pkg.name}</div><div className="text-[10px] text-zinc-300">{pkg.destination}</div></div><button onClick={onClose} className="text-zinc-500 hover:text-white"><X className="h-5 w-5" /></button></div><div className="space-y-4 p-5"><div className="flex h-28 items-center justify-center rounded-xl bg-gradient-to-br from-zinc-400/10 to-zinc-900/10 text-6xl">{pkg.icon}</div><div className="grid grid-cols-2 gap-3"><Info label="Duration" value={pkg.duration} /><Info label="Starting price" value={formatUSD(pkg.price)} /><Info label="Highlights" value={pkg.highlights} /><Info label="Package type" value={pkg.tag} /></div><div className="rounded-xl border border-zinc-500/10 bg-zinc-500/5 p-3 text-[10px] leading-relaxed text-zinc-400">This package is read-only demo data. In production, the AI reads package rows from a database before recommending an itinerary.</div></div></div></div>;

const getDemoReply = (text: string) => {
  const t = text.toLowerCase();
  if (t.includes('bali')) return 'For Bali, I recommend the 7-day Bali Discovery from around $2,990. If you share dates and passenger count, I can tailor the itinerary.';
  if (t.includes('amalfi') || t.includes('italy')) return 'For the Amalfi Coast, the Luxury Escape starts around $4,800 for 7 days. I can adjust hotel category and transfers to match your budget.';
  if (t.includes('maldives')) return 'The Maldives Overwater package starts at $5,200 for 6 days with an overwater villa, snorkeling, and sunset cruises. Want me to check availability?';
  if (t.includes('budget') || t.includes('$') || t.includes('price')) return 'Got it. I can compare available packages against your budget and suggest the closest fit. What destination and travel dates do you prefer?';
  if (t.includes('itinerary')) return 'Absolutely. I can generate a day-by-day itinerary after confirming destination, travel dates, passengers and budget.';
  if (t.includes('agent') || t.includes('human')) return 'I can escalate this conversation to a human travel consultant. I have flagged the demo conversation for review.';
  return 'Thanks! I can help with global tours, packages, dates and budgets. Tell me your preferred destination, approximate budget and number of passengers.';
};

const Kpi = ({ label, value, delta, icon, tone }: { label: string; value: string; delta: string; icon: React.ReactNode; tone: 'cyan' | 'amber' | 'emerald' | 'rose' }) => { const map = { cyan: 'border-zinc-400/20 text-zinc-300', amber: 'border-amber-500/20 text-amber-300', emerald: 'border-emerald-500/20 text-emerald-300', rose: 'border-rose-500/20 text-rose-300' }; return <div className={`relative overflow-hidden rounded-2xl border bg-[#101013] p-4 ${map[tone]}`}><div className="text-[8px] font-semibold uppercase tracking-[0.14em] text-zinc-600">{label}</div><div className="mt-2 text-xl font-medium text-white">{value}</div><div className="mt-1 text-[9px] text-emerald-300">{delta}</div><div className="absolute right-3 top-3 opacity-20">{React.cloneElement(icon as React.ReactElement, { className: 'h-5 w-5' })}</div></div>; };
const Card = ({ title, subtitle, action, children }: { title: string; subtitle?: string; action?: React.ReactNode; children: React.ReactNode }) => <div className="overflow-hidden rounded-2xl border border-zinc-800 bg-[#101013]"><div className="flex items-center justify-between gap-3 border-b border-zinc-800 px-5 py-4"><div><div className="text-[11px] font-semibold text-white">{title}</div>{subtitle && <div className="mt-0.5 text-[9px] text-zinc-600">{subtitle}</div>}</div>{action}</div>{children}</div>;
const Avatar = ({ name, size = 'md' }: { name: string; size?: 'sm' | 'md' }) => <div className={`${size === 'sm' ? 'h-7 w-7 text-[8px]' : 'h-9 w-9 text-[9px]'} flex shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-zinc-900 to-zinc-400 font-bold text-white`}>{initials(name)}</div>;
const Stage = ({ stage }: { stage: Lead['stage'] }) => <span className={`inline-flex rounded-full border px-2 py-0.5 text-[8px] font-bold uppercase ${stageMeta[stage].cls}`}>{stageMeta[stage].label}</span>;
const Info = ({ label, value }: { label: string; value: string }) => <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-3"><div className="text-[8px] uppercase tracking-wider text-zinc-600">{label}</div><div className="mt-1 text-[10px] text-zinc-300">{value}</div></div>;
const SimpleChart = ({ values, labels }: { values: number[]; labels: string[] }) => <div className="p-5"><div className="flex h-48 items-end gap-1.5 border-b border-zinc-800">{values.map((value, i) => <div key={i} className="group flex flex-1 flex-col justify-end"><div className="relative rounded-t bg-gradient-to-t from-zinc-400/70 to-zinc-300/80 hover:brightness-125" style={{ height: `${Math.max(value, 8)}%` }} title={`${labels[i]}: ${value}`} /></div>)}</div><div className="mt-2 flex justify-between text-[8px] text-zinc-600">{labels.map((label) => <span key={label}>{label}</span>)}</div></div>;
const HorizontalBars = ({ items }: { items: [string, number][] }) => <div className="space-y-4 p-5">{items.map(([label, value]) => <div key={label}><div className="mb-1 flex justify-between text-[9px] text-zinc-500"><span>{label}</span><span className="font-mono text-zinc-300">{value}%</span></div><div className="h-1.5 overflow-hidden rounded-full bg-zinc-800"><div className="h-full rounded-full bg-gradient-to-r from-zinc-500 to-zinc-300" style={{ width: `${value * 2.6}%` }} /></div></div>)}</div>;
const Escalation = ({ name, reason, urgency, summary, onAction }: { name: string; reason: string; urgency: 'HIGH' | 'MEDIUM'; summary: string; onAction: () => void }) => <div className="flex gap-3 border-b border-zinc-800/70 px-5 py-4 last:border-0"><span className={`h-fit rounded px-2 py-1 text-[8px] font-bold ${urgency === 'HIGH' ? 'bg-rose-400/10 text-rose-300' : 'bg-amber-400/10 text-amber-300'}`}>{urgency}</span><div className="min-w-0 flex-1"><div className="text-[10px] font-semibold text-white">{name}</div><div className="mt-1 text-[10px] text-zinc-400">{reason}</div><div className="mt-1 text-[9px] leading-relaxed text-zinc-600">{summary}</div></div><button onClick={onAction} className="h-fit rounded-lg border border-zinc-800 px-2.5 py-1.5 text-[8px] font-semibold text-zinc-500 hover:text-white">Review</button></div>;
