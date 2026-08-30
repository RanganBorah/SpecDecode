import React from 'react';
import { PageTab } from '../types';
import { ArchitectureDiagram } from '../components/ArchitectureDiagram';
import { Cpu, Zap, Database, ArrowRight, Layers, Sparkles, Server } from 'lucide-react';

interface ArchitectureProps {
  onTabChange: (tab: PageTab) => void;
}

export const Architecture: React.FC<ArchitectureProps> = ({ onTabChange }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 py-4">
      
      {/* 1. Interactive Architecture Diagram */}
      <ArchitectureDiagram />

      {/* 2. Deep Dive: Memory Bandwidth vs Tensor Compute */}
      <div className="rounded-xl border border-slate-800 bg-slate-900 p-6 sm:p-8 space-y-6">
        <div className="flex items-center gap-2.5 border-b border-slate-800 pb-4">
          <div className="p-2 rounded-lg bg-slate-800 text-red-400">
            <Cpu className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">
              Why Speculative Decoding Accelerates Inference: Memory Bandwidth Bottlenecks
            </h3>
            <p className="text-xs text-slate-400">
              Understanding the hardware memory wall during LLM autoregressive token generation.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs">

          <div className="p-4 rounded-lg bg-slate-950 border border-slate-800 space-y-2.5">
            <div className="text-slate-500 font-semibold text-[11px] flex items-center gap-1.5">
              <span>01.</span> Memory Bandwidth Bound
            </div>
            <h4 className="text-sm font-semibold text-white">Standard Autoregression</h4>
            <p className="text-slate-400 leading-relaxed">
              Generating 1 single token on a 70B model requires transferring ~140 GB of model weights from GPU HBM memory into compute registers. The GPU tensor cores sit 95% idle waiting for memory transfer.
            </p>
          </div>

          <div className="p-4 rounded-lg bg-slate-950 border border-slate-800 space-y-2.5">
            <div className="text-slate-500 font-semibold text-[11px] flex items-center gap-1.5">
              <span>02.</span> Lightweight Draft
            </div>
            <h4 className="text-sm font-semibold text-white">Small Model Arithmetic</h4>
            <p className="text-slate-400 leading-relaxed">
              An 8B draft model requires only ~16 GB per step. It can generate 5 candidate tokens in ~15ms, consuming a fraction of the memory bandwidth of the large 70B target model.
            </p>
          </div>

          <div className="p-4 rounded-lg bg-slate-950 border border-slate-800 space-y-2.5">
            <div className="text-slate-500 font-semibold text-[11px] flex items-center gap-1.5">
              <span>03.</span> Parallel Verification
            </div>
            <h4 className="text-sm font-semibold text-white">Compute Bound Batches</h4>
            <p className="text-slate-400 leading-relaxed">
              When verifying 5 tokens simultaneously, the 70B target model loads its 140 GB weights only ONCE. It performs matrix-matrix operations instead of matrix-vector operations, fully saturating tensor cores.
            </p>
          </div>

        </div>

        {/* KV Cache Strategy Card */}
        <div className="p-4 rounded-lg bg-slate-950 border border-slate-800 space-y-2 text-xs">
          <div className="flex items-center gap-2 text-slate-200 font-semibold">
            <Database className="w-4 h-4 text-red-400" />
            <span>KV Cache Tree Management &amp; PagedAttention</span>
          </div>
          <p className="text-slate-400 leading-relaxed">
            In production deployments (e.g. vLLM, Medusa, TensorRT-LLM), draft candidates are organized as a speculative tree. Key-Value tensors for accepted branches are committed permanently to the target KV cache, while rejected branches are instantly rolled back with zero memory leak.
          </p>
        </div>

      </div>

    </div>
  );
};
