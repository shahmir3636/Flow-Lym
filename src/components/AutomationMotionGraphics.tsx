import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bot, Database, Zap, Activity, Globe, Send, Workflow, ArrowRight } from 'lucide-react';

const NODES = [
  { id: 'source', label: 'Data Source', sub: 'Web / API / Email', icon: Globe, color: '#a1a1aa', glow: '#e4e4e7', x: 15, y: 50 },
  { id: 'ai', label: 'AI Processing', sub: 'NLP & Routing', icon: Bot, color: '#18181b', glow: '#e4e4e7', x: 45, y: 30 },
  { id: 'crm', label: 'CRM Sync', sub: 'Customer Records', icon: Database, color: '#3f3f46', glow: '#e4e4e7', x: 75, y: 50 },
  { id: 'action', label: 'Automated Action', sub: 'Email / WhatsApp', icon: Send, color: '#a1a1aa', glow: '#f4f4f5', x: 45, y: 70 },
  { id: 'dashboard', label: 'Analytics', sub: 'Live Feed', icon: Activity, color: '#18181b', glow: '#e4e4e7', x: 90, y: 30 },
];

const CONNECTIONS = [
  { source: 'source', target: 'ai', path: 'M 15 50 C 25 50, 30 30, 45 30' },
  { source: 'source', target: 'action', path: 'M 15 50 C 25 50, 30 70, 45 70' },
  { source: 'ai', target: 'crm', path: 'M 45 30 C 60 30, 60 50, 75 50' },
  { source: 'action', target: 'crm', path: 'M 45 70 C 60 70, 60 50, 75 50' },
  { source: 'ai', target: 'dashboard', path: 'M 45 30 C 60 30, 75 30, 90 30' },
  { source: 'crm', target: 'dashboard', path: 'M 75 50 C 85 50, 90 40, 90 30' },
];

export const AutomationMotionGraphics: React.FC = () => {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [throughput, setThroughput] = useState(3840);
  const [latency, setLatency] = useState(0.42);

  // Simulate live metrics
  useEffect(() => {
    const interval = setInterval(() => {
      setThroughput(prev => prev + Math.floor(Math.random() * 8));
      setLatency(prev => +(prev + (Math.random() * 0.04 - 0.02)).toFixed(2));
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full rounded-[2rem] border border-zinc-100 bg-gradient-to-br from-[#ffffff] via-[#f8fafc] to-[#fafafa] p-6 sm:p-10 shadow-[0_20px_50px_-12px_rgba(2,132,199,0.1)] overflow-hidden font-sans group">
      {/* Background Soft Glows */}
      <div className="absolute -top-32 -left-20 w-96 h-96 rounded-full bg-zinc-100/50 blur-[100px] transition-opacity duration-700 opacity-60 group-hover:opacity-100" />
      <div className="absolute -bottom-40 -right-20 w-[30rem] h-[30rem] rounded-full bg-zinc-200/40 blur-[120px] transition-opacity duration-700 opacity-60 group-hover:opacity-100" />

      {/* Floating Particles Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute rounded-full bg-zinc-400/20 blur-[1px]"
            style={{
              width: Math.random() * 6 + 2 + 'px',
              height: Math.random() * 6 + 2 + 'px',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
            }}
            animate={{
              y: [0, -40, 0],
              x: [0, Math.random() * 20 - 10, 0],
              opacity: [0, 0.6, 0]
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Header Info */}
      <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-12">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-zinc-200 bg-zinc-50 text-zinc-800 text-[11px] font-bold uppercase tracking-[0.15em] shadow-sm">
            <Zap className="w-3.5 h-3.5 text-zinc-900" /> Continuous Pipeline
          </div>
          <h3 className="mt-5 text-3xl sm:text-4xl font-bold text-zinc-900 tracking-tight">AI Automation Architecture</h3>
          <p className="mt-3 max-w-md text-sm sm:text-base leading-relaxed text-zinc-500">
            Hover over nodes to explore real-time data routing. Our autonomous systems classify, process, and sync records instantly.
          </p>
        </div>

        <div className="flex gap-6 px-6 py-4 rounded-xl border border-zinc-100 bg-white/80 backdrop-blur-md shadow-lg shadow-zinc-900/5">
          <div className="flex flex-col items-start gap-1.5 w-32">
            <span className="text-[10px] uppercase tracking-wider text-zinc-500 font-bold flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-zinc-500" /> Operations
            </span>
            <span className="text-2xl font-mono font-bold text-zinc-900 flex items-baseline gap-1">
              {throughput.toLocaleString()} <span className="text-[10px] text-zinc-500 font-sans font-semibold">/hr</span>
            </span>
          </div>
          <div className="w-px bg-zinc-200/60" />
          <div className="flex flex-col items-start gap-1.5 w-32">
            <span className="text-[10px] uppercase tracking-wider text-zinc-500 font-bold whitespace-nowrap">Avg Response</span>
            <span className="text-2xl font-mono font-bold text-zinc-900 flex items-baseline gap-1.5">
              {latency.toFixed(2)}<span className="text-xs text-zinc-500 font-sans font-semibold">sec</span>
            </span>
          </div>
        </div>
      </div>

      {/* Canvas Area */}
      <div className="relative w-full aspect-[4/4] sm:aspect-[21/9] min-h-[350px] mt-8 bg-white/40 rounded-[1.5rem] border border-white backdrop-blur-sm shadow-[inset_0_2px_20px_rgba(255,255,255,1)]">

        {/* SVG Paths representing connections */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
          {CONNECTIONS.map((conn, idx) => {
            const isHovered = hoveredNode === conn.source || hoveredNode === conn.target;
            const isFaded = hoveredNode && !isHovered;

            return (
              <g key={`conn-${idx}`}>
                {/* Base Path */}
                <motion.path
                  d={conn.path}
                  fill="none"
                  stroke={isHovered ? "url(#activeGradient)" : "#e4e4e7"}
                  strokeWidth="0.4"
                  className="transition-colors duration-300"
                  style={{ opacity: isFaded ? 0.3 : 1 }}
                />

                <defs>
                  <linearGradient id="activeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#a1a1aa" />
                    <stop offset="100%" stopColor="#18181b" />
                  </linearGradient>
                </defs>

                {/* Active Highlight Path */}
                <motion.path
                  d={conn.path}
                  fill="none"
                  stroke="url(#activeGradient)"
                  strokeWidth="0.8"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{
                    pathLength: isHovered ? 1 : 0,
                    opacity: isHovered ? 1 : 0
                  }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                />

                {/* Animated Data Packets (Dots travelling along path) */}
                {!isFaded && (
                  <motion.circle
                    r="1"
                    fill="#18181b"
                    filter="drop-shadow(0 0 4px #a1a1aa)"
                    initial={{ offsetDistance: "0%" } as any}
                    animate={{ offsetDistance: "100%" } as any}
                    transition={{
                      duration: 1.5 + Math.random() * 1.5,
                      repeat: Infinity,
                      ease: "linear",
                      delay: Math.random() * 2
                    }}
                    style={{
                      offsetPath: `path('${conn.path}')`,
                    } as any}
                  />
                )}

                {/* Secondary trailing particle for effect */}
                {!isFaded && (
                  <motion.circle
                    r="0.5"
                    fill="#a1a1aa"
                    initial={{ offsetDistance: "0%" } as any}
                    animate={{ offsetDistance: "100%" } as any}
                    transition={{
                      duration: 1.5 + Math.random() * 1.5,
                      repeat: Infinity,
                      ease: "linear",
                      delay: Math.random() * 2 + 0.2
                    }}
                    style={{
                      offsetPath: `path('${conn.path}')`,
                    } as any}
                  />
                )}
              </g>
            );
          })}
        </svg>

        {/* Nodes */}
        {NODES.map((node) => {
          const Icon = node.icon;
          const isHovered = hoveredNode === node.id;

          return (
            <motion.div
              key={node.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer z-20 focus-visible:outline-none group/node"
              style={{ left: `${node.x}%`, top: `${node.y}%` }}
              onMouseEnter={() => setHoveredNode(node.id)}
              onMouseLeave={() => setHoveredNode(null)}
              onFocus={() => setHoveredNode(node.id)}
              onBlur={() => setHoveredNode(null)}
              tabIndex={0}
              animate={{
                scale: isHovered ? 1.05 : 1,
                opacity: (hoveredNode && hoveredNode !== node.id && !CONNECTIONS.some(c => (c.source === node.id && c.target === hoveredNode) || (c.target === node.id && c.source === hoveredNode))) ? 0.3 : 1
              }}
              transition={{ duration: 0.2 }}
            >
              {/* Outer continuous pulsing ring */}
              <motion.div
                className="absolute inset-0 rounded-full pointer-events-none"
                style={{ backgroundColor: node.glow, opacity: 0.2 }}
                animate={{ scale: [1, 1.8], opacity: [0.6, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeOut", delay: node.x * 0.05 }}
              />

              {/* Node container */}
              <div
                className="relative flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-[1.25rem] bg-white transition-all duration-300"
                style={{
                  border: `2px solid ${isHovered ? node.color : '#e4e4e7'}`,
                  boxShadow: isHovered
                    ? `0 15px 30px -5px ${node.color}40, 0 0 0 4px ${node.glow}`
                    : '0 10px 25px -5px rgba(63,63,70, 0.1)',
                  zIndex: isHovered ? 30 : 20
                }}
              >
                <Icon
                  className="w-6 h-6 sm:w-7 sm:h-7 transition-all duration-300"
                  style={{
                    color: isHovered ? node.color : '#71717a',
                    transform: isHovered ? 'scale(1.1)' : 'scale(1)'
                  }}
                />

                {/* Active Indicator dot */}
                {isHovered && (
                  <span className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 rounded-full bg-zinc-500 border-2 border-white shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
                )}
              </div>

              {/* Labels */}
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 whitespace-nowrap text-center pointer-events-none flex flex-col items-center">
                <span className={`text-[11px] sm:text-xs font-bold uppercase tracking-wider transition-colors duration-300 ${isHovered ? 'text-zinc-900' : 'text-zinc-600'}`}>
                  {node.label}
                </span>
                <span className="text-[10px] text-zinc-400 font-medium mt-0.5">
                  {node.sub}
                </span>

                <AnimatePresence>
                  {isHovered && (
                    <motion.div
                      initial={{ opacity: 0, y: -5, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -5, scale: 0.9 }}
                      className="mt-2 flex items-center justify-center gap-1.5 bg-zinc-50 border border-zinc-100 rounded-full px-2 py-0.5 shadow-sm"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-zinc-500 animate-pulse" />
                      <span className="text-[9px] text-zinc-900 font-mono font-bold tracking-wide">ACTIVE</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Footer tags */}
      <div className="relative z-10 mt-20 pt-6 border-t border-zinc-200/60 flex flex-wrap items-center justify-between gap-4">
         <div className="flex flex-wrap gap-2.5">
           {['Webhook Triggers', 'LLM Routing', 'Data Enrichment', 'Auto-Replies'].map((tag, idx) => (
             <span key={`tag-${idx}`} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-zinc-100/50 bg-white/60 text-[10px] font-bold uppercase tracking-wider text-zinc-500 shadow-sm">
               <Workflow className="w-3 h-3 text-zinc-400" /> {tag}
             </span>
           ))}
         </div>

         <div className="flex items-center gap-2 text-[11px] font-bold text-zinc-900 uppercase tracking-widest cursor-pointer hover:bg-zinc-50 px-4 py-2 rounded-full transition-colors group/btn">
            Explore System <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1" />
         </div>
      </div>
    </div>
  );
};
