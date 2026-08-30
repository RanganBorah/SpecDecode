import React, { useState } from 'react';
import { 
  User, 
  Monitor, 
  Server, 
  Zap, 
  Cpu, 
  Shuffle, 
  CheckCircle2, 
  XCircle, 
  FileText, 
  Activity,
  Layers,
  Sparkles,
  Database,
  ArrowDown
} from 'lucide-react';

export const ArchitectureDiagram: React.FC = () => {
  const [activeNode, setActiveNode] = useState<string>('decoder');

  const nodes = [
    {
      id: 'user',
      title: 'User Client',
      role: 'Prompt Submission & Token Streaming',
      icon: <User className="w-5 h-5 text-red-400" />,
      desc: 'Dispatches prompts to the inference engine and receives streaming accelerated tokens in real-time.',
      specs: 'WebSocket / SSE Stream • React SPA'
    },
    {
      id: 'frontend',
      title: 'React Visualizer',
      role: 'UI & Telemetry State Engine',
      icon: <Monitor className="w-5 h-5 text-red-400" />,
      desc: 'Controls sampling temperature, batch draft lengths (γ), and renders token-by-token verification diagnostics.',
      specs: 'Client State Manager • Framer & CSS Motion'
    },
    {
      id: 'gateway',
      title: 'API Gateway',
      role: 'Inference Orchestrator',
      icon: <Server className="w-5 h-5 text-red-400" />,
      desc: 'Routes requests to the unified GPU memory cluster hosting both the target and draft model weights.',
      specs: 'gRPC / REST Gateway • PagedAttention Manager'
    },
    {
      id: 'draft',
      title: 'Draft Model Engine (8B)',
      role: 'Candidate Token Proposer',
      icon: <Zap className="w-5 h-5 text-blue-400" />,
      desc: 'Executes rapid autoregression to generate γ candidate tokens with minimal memory bandwidth consumption.',
      specs: '8B Parameters • ~3ms per token proposal'
    },
    {
      id: 'target',
      title: 'Target Model Verifier (70B)',
      role: 'Ground Truth Parallel Verifier',
      icon: <Cpu className="w-5 h-5 text-red-400" />,
      desc: 'Evaluates entire draft candidate sequences in a single batched tensor forward pass on GPU tensor cores.',
      specs: '70B Parameters • 1 Forward Pass (~28ms)'
    },
    {
      id: 'decoder',
      title: 'Speculative Decoder & Verifier',
      role: 'Distribution Alignment Algorithm',
      icon: <Shuffle className="w-5 h-5 text-red-400" />,
      desc: 'Performs speculative sampling: accept tokens where P_target(x) >= P_draft(x); reject and resample otherwise.',
      specs: 'Zero-Quality-Loss Theorem (Leviathan 2023)'
    },
    {
      id: 'accepted',
      title: 'Accepted Tokens Buffer',
      role: 'KV-Cache Append',
      icon: <CheckCircle2 className="w-5 h-5 text-emerald-400" />,
      desc: 'Draft tokens that passed target verification are committed directly to the persistent KV Cache.',
      specs: '81% Average Acceptance Rate (α)'
    },
    {
      id: 'rejected',
      title: 'Correction & Fallback',
      role: 'Target Distribution Resampler',
      icon: <XCircle className="w-5 h-5 text-rose-400" />,
      desc: 'Rejected tokens are trimmed from the speculative tree, replaced immediately with target model samples.',
      specs: 'Zero extra target calls required'
    },
    {
      id: 'output',
      title: 'Final Output & Telemetry',
      role: 'Accelerated Token Stream',
      icon: <Activity className="w-5 h-5 text-red-400" />,
      desc: 'Emits complete verified token stream with live latency, TPS throughput, and speedup metrics.',
      specs: '1.8× Effective Throughput Speedup'
    }
  ];

  const selectedNodeInfo = nodes.find(n => n.id === activeNode) || nodes[5];

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-red-400" />
            <h2 className="text-xl sm:text-2xl font-semibold text-white tracking-tight">
              SpecDecode System Architecture
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            End-to-end tensor pipeline from draft candidate generation to parallel target verification.
          </p>
        </div>

        <span className="text-xs px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-300">
          ● Interactive Architecture Node Inspector
        </span>
      </div>

      {/* Main Visual Node Diagram Container */}
      <div className="relative rounded-xl border border-slate-800 bg-slate-900 p-6 sm:p-8 overflow-hidden">

        {/* Animated Background Flow Paths */}
        <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none" />

        <div className="relative max-w-4xl mx-auto space-y-6">

          {/* Layer 1: Client & Frontend */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <button
              onClick={() => setActiveNode('user')}
              className={`p-4 rounded-lg border text-left transition-colors cursor-pointer ${
                activeNode === 'user'
                  ? 'bg-slate-950 border-red-500/50'
                  : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-slate-800">
                  <User className="w-5 h-5 text-red-400" />
                </div>
                <div>
                  <div className="text-xs text-slate-500 font-medium">1. Client Layer</div>
                  <h4 className="text-sm font-semibold text-white">User Prompt Input</h4>
                </div>
              </div>
            </button>

            <button
              onClick={() => setActiveNode('frontend')}
              className={`p-4 rounded-lg border text-left transition-colors cursor-pointer ${
                activeNode === 'frontend'
                  ? 'bg-slate-950 border-red-500/50'
                  : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-slate-800">
                  <Monitor className="w-5 h-5 text-red-400" />
                </div>
                <div>
                  <div className="text-xs text-slate-500 font-medium">2. Dashboard Layer</div>
                  <h4 className="text-sm font-semibold text-white">React SpecDecode UI</h4>
                </div>
              </div>
            </button>

          </div>

          {/* Flow Connector Arrow */}
          <div className="flex justify-center text-red-400">
            <ArrowDown className="w-5 h-5 animate-bounce" />
          </div>

          {/* Layer 2: API Gateway */}
          <div className="max-w-md mx-auto">
            <button
              onClick={() => setActiveNode('gateway')}
              className={`w-full p-4 rounded-lg border text-left transition-colors cursor-pointer ${
                activeNode === 'gateway'
                  ? 'bg-slate-950 border-red-500/50'
                  : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center gap-3 justify-center text-center">
                <div className="p-2 rounded-lg bg-slate-800">
                  <Server className="w-5 h-5 text-red-400" />
                </div>
                <div>
                  <div className="text-xs text-slate-500 font-medium">3. Orchestrator</div>
                  <h4 className="text-sm font-semibold text-white">API Gateway &amp; Shared GPU Memory</h4>
                </div>
              </div>
            </button>
          </div>

          {/* Flow Connector Split */}
          <div className="flex justify-center text-red-400">
            <ArrowDown className="w-5 h-5" />
          </div>

          {/* Layer 3: Dual Models (Draft + Target) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            {/* Draft Model */}
            <button
              onClick={() => setActiveNode('draft')}
              className={`p-4 rounded-lg border text-left transition-colors cursor-pointer ${
                activeNode === 'draft'
                  ? 'bg-slate-950 border-blue-500/60'
                  : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-slate-800">
                  <Zap className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <div className="text-xs text-slate-500 font-medium">Draft Model (8B)</div>
                  <h4 className="text-sm font-semibold text-white">Candidate Proposer (γ=5)</h4>
                  <div className="text-[11px] text-slate-500 font-mono mt-0.5">Rapid Autoregressive Loop</div>
                </div>
              </div>
            </button>

            {/* Target Model */}
            <button
              onClick={() => setActiveNode('target')}
              className={`p-4 rounded-lg border text-left transition-colors cursor-pointer ${
                activeNode === 'target'
                  ? 'bg-slate-950 border-red-500/60'
                  : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-slate-800">
                  <Cpu className="w-5 h-5 text-red-400" />
                </div>
                <div>
                  <div className="text-xs text-slate-500 font-medium">Target Model (70B)</div>
                  <h4 className="text-sm font-semibold text-white">Parallel Tensor Verifier</h4>
                  <div className="text-[11px] text-slate-500 font-mono mt-0.5">1 Forward Pass Verification</div>
                </div>
              </div>
            </button>

          </div>

          {/* Flow Connector Convergence */}
          <div className="flex justify-center text-red-400">
            <ArrowDown className="w-5 h-5" />
          </div>

          {/* Layer 4: Speculative Decoder Engine */}
          <div className="max-w-lg mx-auto">
            <button
              onClick={() => setActiveNode('decoder')}
              className={`w-full p-4 rounded-lg border text-left transition-colors cursor-pointer ${
                activeNode === 'decoder'
                  ? 'bg-slate-950 border-red-500/60'
                  : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center gap-3 justify-center text-center">
                <div className="p-2 rounded-lg bg-slate-800">
                  <Shuffle className="w-5 h-5 text-red-400" />
                </div>
                <div>
                  <div className="text-xs text-slate-500 font-medium">Core Speculative Engine</div>
                  <h4 className="text-sm font-semibold text-white">Token Verifier &amp; Distribution Sampler</h4>
                  <div className="text-[11px] text-slate-400 font-mono mt-0.5">P_target(x) &ge; P_draft(x) Test</div>
                </div>
              </div>
            </button>
          </div>

          {/* Flow Connector to Output */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg mx-auto">

            <button
              onClick={() => setActiveNode('accepted')}
              className={`p-3 rounded-lg border text-left transition-colors cursor-pointer ${
                activeNode === 'accepted' ? 'bg-emerald-950/60 border-emerald-700' : 'bg-slate-950/60 border-slate-800'
              }`}
            >
              <div className="flex items-center gap-2 text-emerald-300 text-xs font-semibold">
                <CheckCircle2 className="w-4 h-4" /> Accepted Tokens
              </div>
              <p className="text-[10px] text-slate-500 mt-1">Appended to KV Cache</p>
            </button>

            <button
              onClick={() => setActiveNode('rejected')}
              className={`p-3 rounded-lg border text-left transition-colors cursor-pointer ${
                activeNode === 'rejected' ? 'bg-rose-950/60 border-rose-700' : 'bg-slate-950/60 border-slate-800'
              }`}
            >
              <div className="flex items-center gap-2 text-rose-300 text-xs font-semibold">
                <XCircle className="w-4 h-4" /> Rejected Tokens
              </div>
              <p className="text-[10px] text-slate-500 mt-1">Replaced via Target Sample</p>
            </button>

          </div>

          {/* Layer 5: Output & Dashboard */}
          <div className="flex justify-center pt-2">
            <button
              onClick={() => setActiveNode('output')}
              className={`p-4 rounded-lg border text-center max-w-md w-full transition-colors cursor-pointer ${
                activeNode === 'output' ? 'bg-slate-950 border-red-500/60' : 'bg-slate-950/60 border-slate-800'
              }`}
            >
              <div className="flex items-center justify-center gap-2 text-slate-200 font-semibold text-sm">
                <Activity className="w-4 h-4 text-red-400" /> Final Verified Output &amp; Telemetry Stream
              </div>
              <p className="text-xs text-slate-500 mt-1 font-mono">
                1.8× Effective Speedup Emitted to User
              </p>
            </button>
          </div>

        </div>

      </div>

      {/* Selected Node Detailed Inspector Card */}
      <div className="rounded-xl border border-slate-800 bg-slate-900 p-6 space-y-3">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-slate-950 border border-slate-800">
              {selectedNodeInfo.icon}
            </div>
            <div>
              <h3 className="text-base font-semibold text-white">
                {selectedNodeInfo.title}
              </h3>
              <p className="text-xs text-red-400">
                {selectedNodeInfo.role}
              </p>
            </div>
          </div>
          <span className="text-xs px-2.5 py-1 rounded bg-slate-950 text-slate-400 border border-slate-800 font-mono">
            {selectedNodeInfo.specs}
          </span>
        </div>

        <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
          {selectedNodeInfo.desc}
        </p>
      </div>

    </div>
  );
};
