import React from 'react';
import { GenerationMetrics } from '../types';
import { 
  Zap, 
  Activity, 
  CheckCircle2, 
  XCircle, 
  Cpu, 
  Clock, 
  TrendingUp, 
  Layers,
  Gauge,
  Percent
} from 'lucide-react';

interface MetricsPanelProps {
  metrics: GenerationMetrics;
  mode: 'speculative' | 'standard' | 'demo';
  isRunning: boolean;
}

export const MetricsPanel: React.FC<MetricsPanelProps> = ({
  metrics,
  mode,
  isRunning
}) => {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 p-5 space-y-4">

      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-red-400" />
          <h3 className="text-sm font-semibold text-slate-200">
            Real-Time Inference Telemetry
          </h3>
        </div>

        <div className="flex items-center gap-2">
          {isRunning && (
            <span className="flex items-center gap-1.5 text-[11px] text-red-400">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-red-500"></span>
              </span>
              Streaming...
            </span>
          )}
          <span className="text-[11px] px-2 py-0.5 rounded bg-slate-800 text-slate-400 capitalize">
            {mode} mode
          </span>
        </div>
      </div>

      {/* Primary Highlights 2x4 Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">

        {/* Metric 1: Speedup Ratio */}
        <div className="p-3.5 rounded-lg border border-slate-800 bg-slate-950">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span className="font-medium">Speedup</span>
            <TrendingUp className="w-3.5 h-3.5 text-slate-500" />
          </div>
          <div className="mt-2 flex items-baseline gap-1">
            <span className="text-2xl sm:text-3xl font-semibold text-white font-mono">
              {metrics.speedup ? `${metrics.speedup.toFixed(2)}×` : '—'}
            </span>
          </div>
          <p className="mt-1 text-[10px] text-slate-500">
            vs. autoregressive
          </p>
        </div>

        {/* Metric 2: Tokens / Second */}
        <div className="p-3.5 rounded-lg border border-slate-800 bg-slate-950">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span className="font-medium">Tokens / Sec</span>
            <Gauge className="w-3.5 h-3.5 text-slate-500" />
          </div>
          <div className="mt-2 flex items-baseline gap-1">
            <span className="text-2xl sm:text-3xl font-semibold text-white font-mono">
              {metrics.tokensPerSecond ? metrics.tokensPerSecond.toFixed(1) : '—'}
            </span>
            <span className="text-[11px] text-slate-400 font-mono">tok/s</span>
          </div>
          <p className="mt-1 text-[10px] text-slate-500">
            Measured on your GPU
          </p>
        </div>

        {/* Metric 3: Acceptance Rate */}
        <div className="p-3.5 rounded-lg border border-slate-800 bg-slate-950">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span className="font-medium">Acceptance Rate</span>
            <Percent className="w-3.5 h-3.5 text-slate-500" />
          </div>
          <div className="mt-2 flex items-baseline gap-1">
            <span className="text-2xl sm:text-3xl font-semibold text-white font-mono">
              {metrics.acceptanceRate ? `${metrics.acceptanceRate}%` : '—'}
            </span>
          </div>
          <p className="mt-1 text-[10px] text-slate-500">
            Draft accuracy
          </p>
        </div>

        {/* Metric 4: Target Model Calls */}
        <div className="p-3.5 rounded-lg border border-slate-800 bg-slate-950">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span className="font-medium">Target Model Calls</span>
            <Cpu className="w-3.5 h-3.5 text-slate-500" />
          </div>
          <div className="mt-2 flex items-baseline gap-1">
            <span className="text-2xl sm:text-3xl font-semibold text-white font-mono">
              {metrics.targetModelCalls || 0}
            </span>
            <span className="text-[11px] text-slate-400 font-mono">
              / {metrics.totalTokensGenerated || metrics.estimatedStandardCalls || 0} std
            </span>
          </div>
          <p className="mt-1 text-[10px] text-slate-500">
            {metrics.estimatedStandardCalls ? `${Math.max(0, metrics.estimatedStandardCalls - metrics.targetModelCalls)} calls saved` : 'Run a prompt to measure'}
          </p>
        </div>

      </div>

      {/* Secondary Detailed Metrics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2 border-t border-slate-800 text-xs">

        <div className="p-2.5 rounded-md bg-slate-950 border border-slate-800 flex justify-between items-center">
          <span className="text-slate-400 text-[11px]">Draft Proposed:</span>
          <span className="text-slate-200 font-semibold font-mono">{metrics.draftTokens || 0}</span>
        </div>

        <div className="p-2.5 rounded-md bg-slate-950 border border-slate-800 flex justify-between items-center">
          <span className="text-slate-400 text-[11px]">Tokens Accepted:</span>
          <span className="text-emerald-400 font-semibold font-mono flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" /> {metrics.acceptedTokens || 0}
          </span>
        </div>

        <div className="p-2.5 rounded-md bg-slate-950 border border-slate-800 flex justify-between items-center">
          <span className="text-slate-400 text-[11px]">Tokens Rejected:</span>
          <span className="text-rose-400 font-semibold font-mono flex items-center gap-1">
            <XCircle className="w-3 h-3" /> {metrics.rejectedTokens || 0}
          </span>
        </div>

        <div className="p-2.5 rounded-md bg-slate-950 border border-slate-800 flex justify-between items-center">
          <span className="text-slate-400 text-[11px]">Latency:</span>
          <span className="text-slate-200 font-semibold font-mono flex items-center gap-1">
            <Clock className="w-3 h-3 text-slate-400" /> {metrics.latencyMs || 0} ms
          </span>
        </div>

      </div>

    </div>
  );
};
