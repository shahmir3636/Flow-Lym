import React, { useState, useEffect, useRef } from 'react';
import { WorkflowDiagramNode } from '../types';
import { 
  Workflow, 
  Cpu, 
  Database, 
  Layers, 
  Send, 
  Activity, 
  CheckCircle2, 
  ArrowRight, 
  Play, 
  Pause, 
  RotateCcw, 
  ChevronRight, 
  Code2, 
  ShieldCheck, 
  Terminal, 
  Zap, 
  Sparkles, 
  Clock, 
  Lock, 
  Check, 
  Copy,
  AlertTriangle,
  Radio,
  FileJson,
  Cable,
  Maximize2
} from 'lucide-react';

interface WorkflowDiagramProps {
  nodes: WorkflowDiagramNode[];
  projectTitle: string;
  projectNumber: string;
  technologyStack: string[];
}

export const WorkflowDiagram: React.FC<WorkflowDiagramProps> = ({
  nodes,
  projectTitle,
  projectNumber,
  technologyStack
}) => {
  const [selectedNodeIndex, setSelectedNodeIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [simulationSpeed, setSimulationSpeed] = useState<1 | 2>(1);
  const [copiedPayload, setCopiedPayload] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<'canvas' | 'linear'>('canvas');
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const activeNode = nodes[selectedNodeIndex] || nodes[0];

  // Auto-play simulation effect
  useEffect(() => {
    if (isPlaying) {
      const intervalMs = simulationSpeed === 1 ? 2400 : 1200;
      timerRef.current = setInterval(() => {
        setSelectedNodeIndex((prev) => (prev + 1) % nodes.length);
      }, intervalMs);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, simulationSpeed, nodes.length]);

  const handleCopyPayload = () => {
    if (activeNode) {
      navigator.clipboard.writeText(activeNode.dataPayload);
      setCopiedPayload(true);
      setTimeout(() => setCopiedPayload(false), 2000);
    }
  };

  const getNodeColor = (category: WorkflowDiagramNode['category']) => {
    switch (category) {
      case 'trigger':
        return {
          badge: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
          accent: '#F59E0B',
          glow: 'shadow-amber-500/20',
          ring: 'ring-amber-500/40',
          border: 'border-amber-500/50'
        };
      case 'ai':
        return {
          badge: 'bg-purple-500/10 text-purple-400 border-purple-500/30',
          accent: '#A855F7',
          glow: 'shadow-purple-500/20',
          ring: 'ring-purple-500/40',
          border: 'border-purple-500/50'
        };
      case 'engine':
        return {
          badge: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
          accent: '#3B82F6',
          glow: 'shadow-blue-500/20',
          ring: 'ring-blue-500/40',
          border: 'border-blue-500/50'
        };
      case 'storage':
        return {
          badge: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30',
          accent: '#06B6D4',
          glow: 'shadow-cyan-500/20',
          ring: 'ring-cyan-500/40',
          border: 'border-cyan-500/50'
        };
      case 'crm':
        return {
          badge: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
          accent: '#10B981',
          glow: 'shadow-emerald-500/20',
          ring: 'ring-emerald-500/40',
          border: 'border-emerald-500/50'
        };
      case 'dispatch':
        return {
          badge: 'bg-rose-500/10 text-rose-400 border-rose-500/30',
          accent: '#F43F5E',
          glow: 'shadow-rose-500/20',
          ring: 'ring-rose-500/40',
          border: 'border-rose-500/50'
        };
      default:
        return {
          badge: 'bg-zinc-800 text-zinc-300 border-zinc-700',
          accent: '#71717A',
          glow: 'shadow-zinc-500/10',
          ring: 'ring-zinc-500/30',
          border: 'border-zinc-700'
        };
    }
  };

  const getNodeIcon = (category: WorkflowDiagramNode['category']) => {
    switch (category) {
      case 'trigger':
        return <Activity className="w-3.5 h-3.5 text-amber-400" />;
      case 'ai':
        return <Cpu className="w-3.5 h-3.5 text-purple-400" />;
      case 'engine':
        return <Workflow className="w-3.5 h-3.5 text-blue-400" />;
      case 'storage':
        return <Database className="w-3.5 h-3.5 text-cyan-400" />;
      case 'crm':
        return <Layers className="w-3.5 h-3.5 text-emerald-400" />;
      case 'dispatch':
        return <Send className="w-3.5 h-3.5 text-rose-400" />;
      default:
        return <Zap className="w-3.5 h-3.5 text-zinc-400" />;
    }
  };

  // Derive estimated protocol and latency if not explicitly specified
  const getProtocol = (node: WorkflowDiagramNode, idx: number) => {
    if (node.protocol) return node.protocol;
    switch (node.category) {
      case 'trigger':
        return 'HTTPS Webhook (TLS 1.3)';
      case 'ai':
        return 'AI Inference (Streaming / JSON Schema)';
      case 'crm':
        return 'OAuth 2.0 REST API (Mutations)';
      case 'storage':
        return 'Cloud Storage REST API';
      case 'dispatch':
        return 'Multi-Channel Push (Socket/REST)';
      default:
        return 'Event-Driven In-Memory Pipe';
    }
  };

  const getLatency = (node: WorkflowDiagramNode, idx: number) => {
    if (node.latency) return node.latency;
    switch (node.category) {
      case 'trigger':
        return '< 12ms';
      case 'ai':
        return '450ms - 820ms';
      case 'crm':
        return '140ms';
      case 'storage':
        return '95ms';
      case 'dispatch':
        return '180ms';
      default:
        return '24ms';
    }
  };

  const getNextTool = (idx: number) => {
    if (idx < nodes.length - 1) {
      return nodes[idx + 1].tool;
    }
    return 'Target Delivery Endpoint';
  };

  return (
    <div className="space-y-6 font-sans">
      
      {/* 1. Header Toolbar & Simulation Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-zinc-900/90 border border-zinc-800">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-white">
              Data Journey & Integrated Tool Pipeline
            </span>
            <span className="px-2 py-0.5 rounded bg-zinc-800 text-[10px] font-mono text-zinc-300 border border-zinc-700">
              {nodes.length} Stages
            </span>
          </div>
          <p className="text-xs text-zinc-400">
            Interactive visual architecture mapping live data transitions between CRM, AI inference, and APIs.
          </p>
        </div>

        {/* Playback Controls & View Switcher */}
        <div className="flex flex-wrap items-center gap-2 shrink-0">
          <div className="flex items-center bg-zinc-950 p-1 rounded-lg border border-zinc-800 text-xs">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className={`px-3 py-1.5 rounded-md font-mono flex items-center gap-1.5 transition-all cursor-pointer ${
                isPlaying 
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' 
                  : 'bg-zinc-800 text-zinc-200 hover:bg-zinc-700 hover:text-white'
              }`}
              title={isPlaying ? 'Pause simulation' : 'Run live simulation'}
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span>{isPlaying ? 'Pause' : 'Simulate'}</span>
            </button>

            <button
              onClick={() => {
                setSelectedNodeIndex(0);
                setIsPlaying(false);
              }}
              className="p-1.5 text-zinc-400 hover:text-white hover:bg-zinc-850 rounded-md transition-colors cursor-pointer"
              title="Reset to step 1"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>

            {isPlaying && (
              <button
                onClick={() => setSimulationSpeed(simulationSpeed === 1 ? 2 : 1)}
                className="px-2 py-1 text-[10px] font-mono font-semibold text-emerald-400 hover:text-emerald-300 transition-colors cursor-pointer"
                title="Toggle playback speed"
              >
                {simulationSpeed}x Speed
              </button>
            )}
          </div>

          <div className="flex bg-zinc-950 p-1 rounded-lg border border-zinc-800 text-xs">
            <button
              onClick={() => setViewMode('canvas')}
              className={`px-2.5 py-1 rounded-md text-[11px] font-mono transition-colors cursor-pointer ${
                viewMode === 'canvas' ? 'bg-zinc-800 text-white font-semibold' : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              Interactive Canvas
            </button>
            <button
              onClick={() => setViewMode('linear')}
              className={`px-2.5 py-1 rounded-md text-[11px] font-mono transition-colors cursor-pointer ${
                viewMode === 'linear' ? 'bg-zinc-800 text-white font-semibold' : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              Timeline View
            </button>
          </div>
        </div>
      </div>

      {/* 2. Visual Canvas View (SVG Grid & Connected Pipeline Flow) */}
      {viewMode === 'canvas' ? (
        <div className="relative rounded-2xl bg-zinc-950 border border-zinc-800 p-5 sm:p-7 overflow-hidden shadow-inner space-y-6">
          
          {/* Subtle SVG Grid Background Blueprint */}
          <div className="absolute inset-0 pointer-events-none opacity-20">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="wf-grid-pattern" width="24" height="24" patternUnits="userSpaceOnUse">
                  <path d="M 24 0 L 0 0 0 24" fill="none" stroke="#52525B" strokeWidth="0.6" strokeDasharray="1 3" />
                  <circle cx="24" cy="24" r="0.75" fill="#71717A" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#wf-grid-pattern)" />
            </svg>
          </div>

          {/* Top Live Stage Progress Bar */}
          <div className="relative z-10 flex items-center justify-between gap-2 pb-4 border-b border-zinc-800/80">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-zinc-400">
                ACTIVE STEP: <strong className="text-white">0{activeNode.stepNumber} of 0{nodes.length}</strong>
              </span>
              <span className="text-zinc-600">·</span>
              <span className="text-xs font-mono text-emerald-400">
                {activeNode.title}
              </span>
            </div>

            <div className="flex items-center gap-1.5 font-mono text-[11px] text-zinc-400">
              <Clock className="w-3 h-3 text-zinc-500" />
              <span>Est. Latency: <span className="text-zinc-200">{getLatency(activeNode, selectedNodeIndex)}</span></span>
            </div>
          </div>

          {/* Horizontal / Wrapped Interactive Nodes Graph */}
          <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {nodes.map((node, idx) => {
              const isSelected = selectedNodeIndex === idx;
              const colorInfo = getNodeColor(node.category);
              const isNext = selectedNodeIndex + 1 === idx;
              const isCompleted = isPlaying && selectedNodeIndex > idx;

              return (
                <div
                  key={node.id}
                  onClick={() => {
                    setSelectedNodeIndex(idx);
                    setIsPlaying(false);
                  }}
                  className={`group relative p-4 rounded-xl border transition-all duration-200 cursor-pointer flex flex-col justify-between space-y-3 ${
                    isSelected
                      ? `bg-zinc-900 ${colorInfo.border} ring-2 ${colorInfo.ring} ${colorInfo.glow} shadow-lg`
                      : isCompleted
                      ? 'bg-zinc-900/40 border-zinc-800 opacity-80 hover:opacity-100 hover:border-zinc-700'
                      : 'bg-zinc-900/60 border-zinc-800/90 hover:border-zinc-700 hover:bg-zinc-900/90'
                  }`}
                >
                  {/* Glowing Pulse Node Anchor for Active Step */}
                  {isSelected && (
                    <div className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 rounded-full bg-emerald-400 animate-ping opacity-75" />
                  )}

                  {/* Card Header: Step number & Category Badge */}
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <div className={`w-6 h-6 rounded-md font-mono text-xs flex items-center justify-center font-bold transition-colors ${
                        isSelected 
                          ? 'bg-white text-zinc-950' 
                          : 'bg-zinc-800 text-zinc-300 border border-zinc-700'
                      }`}>
                        0{node.stepNumber}
                      </div>

                      <span className={`px-2 py-0.5 rounded text-[10px] font-mono border uppercase tracking-wider flex items-center gap-1 ${colorInfo.badge}`}>
                        {getNodeIcon(node.category)}
                        <span>{node.category}</span>
                      </span>
                    </div>

                    {/* Step Link Arrow */}
                    {idx < nodes.length - 1 && (
                      <div className="hidden lg:flex items-center text-zinc-600 text-xs font-mono">
                        <span className={isSelected ? 'text-emerald-400 font-bold' : ''}>➔</span>
                      </div>
                    )}
                  </div>

                  {/* Title & Integrated Tool */}
                  <div className="space-y-1">
                    <h4 className={`text-sm font-semibold tracking-tight transition-colors ${
                      isSelected ? 'text-white' : 'text-zinc-200 group-hover:text-white'
                    }`}>
                      {node.title}
                    </h4>

                    <div className="flex items-center gap-1.5 text-xs text-zinc-400 font-mono">
                      <Terminal className="w-3 h-3 text-zinc-500 shrink-0" />
                      <span className="truncate text-zinc-300 font-medium">{node.tool}</span>
                    </div>
                  </div>

                  {/* Short Description */}
                  <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                    {node.description}
                  </p>

                  {/* Footer Stats & Payload Peek */}
                  <div className="pt-2 border-t border-zinc-800/80 flex items-center justify-between text-[10px] font-mono text-zinc-500">
                    <div className="flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                      <span>{getProtocol(node, idx).split(' ')[0]}</span>
                    </div>

                    <span className={`flex items-center gap-0.5 transition-colors ${
                      isSelected ? 'text-emerald-400 font-semibold' : 'group-hover:text-zinc-300'
                    }`}>
                      <span>{isSelected ? 'Inspecting' : 'Inspect'}</span>
                      <ChevronRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Connecting SVG Stream Pipeline Animation Banner */}
          <div className="relative z-10 p-3 bg-zinc-900/90 rounded-xl border border-zinc-800 flex flex-col md:flex-row items-center justify-between gap-3 text-xs font-mono">
            <div className="flex items-center gap-2 text-zinc-300">
              <Cable className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Data Transit Pipeline:</span>
              <span className="text-white font-bold">{activeNode.tool}</span>
              <span className="text-zinc-500">➔</span>
              <span className="text-zinc-300">{getNextTool(selectedNodeIndex)}</span>
            </div>

            <div className="flex items-center gap-3 text-[11px] text-zinc-400">
              <span className="flex items-center gap-1">
                <Lock className="w-3 h-3 text-zinc-500" />
                <span>Zero-Data Retention</span>
              </span>
              <span className="text-zinc-600">·</span>
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-emerald-400" />
                <span>DLQ Auto-Failover</span>
              </span>
            </div>
          </div>

        </div>
      ) : (
        /* Linear Timeline View with Step Journey Details */
        <div className="rounded-2xl bg-zinc-950 border border-zinc-800 p-6 space-y-6">
          <div className="space-y-4">
            {nodes.map((node, idx) => {
              const isSelected = selectedNodeIndex === idx;
              const colorInfo = getNodeColor(node.category);

              return (
                <div
                  key={node.id}
                  onClick={() => setSelectedNodeIndex(idx)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? `bg-zinc-900 ${colorInfo.border} ring-1 ${colorInfo.ring}`
                      : 'bg-zinc-900/40 border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900/70'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-zinc-800/80">
                    <div className="flex items-center gap-2.5">
                      <span className="w-6 h-6 rounded-md bg-zinc-800 border border-zinc-700 font-mono text-xs flex items-center justify-center font-bold text-white">
                        0{node.stepNumber}
                      </span>
                      <h4 className="text-sm font-semibold text-white">
                        {node.title}
                      </h4>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-mono border uppercase ${colorInfo.badge}`}>
                        {node.category}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 text-xs font-mono text-zinc-400">
                      <span>Tool: <strong className="text-zinc-200">{node.tool}</strong></span>
                      <span>·</span>
                      <span className="text-emerald-400">{getLatency(node, idx)}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4 pt-3">
                    <div className="md:col-span-7 text-xs text-zinc-300 leading-relaxed">
                      {node.description}
                    </div>
                    <div className="md:col-span-5 bg-zinc-950 p-2.5 rounded-lg border border-zinc-800 font-mono text-[10px] text-emerald-400 overflow-x-auto whitespace-pre-wrap">
                      {node.dataPayload}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 3. Deep Data Transformation Inspector Panel */}
      <div className="rounded-2xl bg-zinc-900 border border-zinc-800 overflow-hidden shadow-lg">
        
        {/* Inspector Header */}
        <div className="px-5 py-3.5 bg-zinc-950 border-b border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Code2 className="w-4 h-4 text-emerald-400" />
            <span className="font-mono text-xs font-semibold text-white">
              Data Journey Inspector: Step 0{activeNode.stepNumber} ({activeNode.title})
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyPayload}
              className="px-2.5 py-1 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white rounded-md text-[11px] font-mono flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              {copiedPayload ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
              <span>{copiedPayload ? 'Copied' : 'Copy Payload'}</span>
            </button>
          </div>
        </div>

        {/* Inspector Body Columns */}
        <div className="p-5 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Column: Data Journey Mapping & Architectural Rules */}
          <div className="lg:col-span-6 space-y-4">
            
            <div className="space-y-1.5">
              <div className="text-[11px] font-mono uppercase text-zinc-400 tracking-wider">
                Integrated Systems Route
              </div>
              <div className="p-3 bg-zinc-950 rounded-xl border border-zinc-800 flex items-center justify-between text-xs font-mono">
                <div className="space-y-0.5">
                  <div className="text-[10px] text-zinc-500 uppercase">Origin Tool</div>
                  <div className="text-white font-semibold">{activeNode.tool}</div>
                </div>
                <div className="px-2 py-1 bg-zinc-900 rounded text-emerald-400 font-bold">➔</div>
                <div className="space-y-0.5 text-right">
                  <div className="text-[10px] text-zinc-500 uppercase">Target Tool</div>
                  <div className="text-zinc-200 font-semibold">{getNextTool(selectedNodeIndex)}</div>
                </div>
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="text-[11px] font-mono uppercase text-zinc-400 tracking-wider">
                Operational Action & Logic
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed bg-zinc-950 p-3.5 rounded-xl border border-zinc-800">
                {activeNode.description}
              </p>
            </div>

            {/* Protocol & DLQ Specs */}
            <div className="grid grid-cols-2 gap-3 pt-1">
              <div className="p-3 bg-zinc-950 rounded-xl border border-zinc-800 space-y-1">
                <div className="text-[10px] font-mono text-zinc-400 uppercase">Communication Protocol</div>
                <div className="text-xs font-mono font-medium text-zinc-200">
                  {getProtocol(activeNode, selectedNodeIndex)}
                </div>
              </div>
              <div className="p-3 bg-zinc-950 rounded-xl border border-zinc-800 space-y-1">
                <div className="text-[10px] font-mono text-zinc-400 uppercase">Error / Failover Policy</div>
                <div className="text-xs font-mono font-medium text-emerald-400">
                  {activeNode.errorPolicy || 'DLQ Exponential Backoff (5x)'}
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Live Data Payload Schema Preview */}
          <div className="lg:col-span-6 space-y-2">
            <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400">
              <span className="uppercase tracking-wider">Transformed Payload Schema</span>
              <span className="text-emerald-400 font-medium">JSON Validated</span>
            </div>

            <div className="relative bg-zinc-950 p-4 rounded-xl border border-zinc-800 font-mono text-xs text-emerald-400 overflow-x-auto min-h-[180px] max-h-[260px]">
              <pre className="whitespace-pre-wrap leading-relaxed">
                {activeNode.dataPayload}
              </pre>

              <div className="mt-3 pt-3 border-t border-zinc-800/80 flex items-center justify-between text-[10px] text-zinc-500">
                <span>Schema: RFC 8259 JSON</span>
                <span className="text-zinc-400">State: Committed & Verified</span>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* 4. Complete Technology Ecosystem Integration Footprint */}
      <div className="p-4 sm:p-5 rounded-xl bg-zinc-950 border border-zinc-800 space-y-3">
        <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
          <span className="uppercase tracking-wider">Connected Infrastructure Stack for This System</span>
          <span className="text-zinc-500">{technologyStack.length} Integrated Tools</span>
        </div>

        <div className="flex flex-wrap gap-2">
          {technologyStack.map((tech, idx) => (
            <span
              key={idx}
              className="px-3 py-1 bg-zinc-900 border border-zinc-800 text-zinc-200 text-xs font-mono rounded-lg flex items-center gap-1.5"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              <span>{tech}</span>
            </span>
          ))}
        </div>
      </div>

    </div>
  );
};
