import React from 'react';
import { GenerationMetrics } from '../types';
import { 
  CheckCircle2, 
  Zap, 
  TrendingUp, 
  RotateCcw, 
  BarChart3, 
  ArrowRight,
  Cpu,
  Layers,
  Sparkles
} from 'lucide-react';

interface CompletionCardProps {
  metrics: GenerationMetrics;
  onRunAgain: () => void;
  onViewBenchmark: () => void;
}

export const CompletionCard: React.FC<CompletionCardProps> = ({
  metrics,
  onRunAgain,
  onViewBenchmark
}) => {
  const speedupVal = metrics.speedup ? `${metrics.speedup.toFixed(2)}×` : '—';
  const acceptanceVal = `${metrics.acceptanceRate || 0}%`;
  const callsSaved = Math.max(0, (metrics.estimatedStandardCalls || 0) - (metrics.targetModelCalls || 0));

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 p-6 sm:p-8 space-y-6">

      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-800 pb-5 text-center sm:text-left">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-emerald-500/15 border border-emerald-800 flex items-center justify-center text-emerald-400">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2 justify-center sm:justify-start">
              <h2 className="text-xl sm:text-2xl font-semibold text-white tracking-tight">
                Speculative Decoding Complete
              </h2>
              <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950 border border-emerald-800 text-emerald-300 font-semibold">
                SUCCESS
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Inference accelerated with zero loss in output probability distribution.
            </p>
          </div>
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-800 border border-slate-700 text-slate-300 text-xs">
          <Sparkles className="w-3.5 h-3.5 text-red-400" />
          <span>{callsSaved} Target Passes Saved</span>
        </div>
      </div>

      {/* 4 Large Highlight Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">

        {/* Speedup */}
        <div className="p-4 rounded-lg bg-slate-950 border border-slate-800 text-center space-y-1">
          <div className="text-[11px] text-slate-500">
            Speedup
          </div>
          <div className="text-3xl sm:text-4xl font-semibold text-white font-mono">
            {speedupVal}
          </div>
          <div className="text-[10px] text-slate-500">
            vs. autoregressive
          </div>
        </div>

        {/* Acceptance Rate */}
        <div className="p-4 rounded-lg bg-slate-950 border border-slate-800 text-center space-y-1">
          <div className="text-[11px] text-slate-500">
            Acceptance Rate
          </div>
          <div className="text-3xl sm:text-4xl font-semibold text-white font-mono">
            {acceptanceVal}
          </div>
          <div className="text-[10px] text-slate-500">
            {metrics.acceptedTokens} / {metrics.draftTokens} proposed
          </div>
        </div>

        {/* Tokens Generated */}
        <div className="p-4 rounded-lg bg-slate-950 border border-slate-800 text-center space-y-1">
          <div className="text-[11px] text-slate-500">
            Tokens Generated
          </div>
          <div className="text-3xl sm:text-4xl font-semibold text-white font-mono">
            {metrics.totalTokensGenerated || 100}
          </div>
          <div className="text-[10px] text-slate-500">
            {metrics.tokensPerSecond || 0} tok/sec
          </div>
        </div>

        {/* Target Calls */}
        <div className="p-4 rounded-lg bg-slate-950 border border-slate-800 text-center space-y-1">
          <div className="text-[11px] text-slate-500">
            Target Model Calls
          </div>
          <div className="text-3xl sm:text-4xl font-semibold text-white font-mono">
            {metrics.targetModelCalls || 20}
          </div>
          <div className="text-[10px] text-rose-400 line-through">
            {metrics.estimatedStandardCalls || 100} standard
          </div>
        </div>

      </div>

      {/* Explanatory takeaway */}
      <div className="p-4 rounded-lg bg-slate-950 border border-slate-800 text-xs sm:text-sm text-slate-300 leading-relaxed">
        <span className="text-red-400 font-semibold">&gt; Conclusion:</span> Speculative decoding reduced the number of target-model generation steps by <strong className="text-emerald-400 font-semibold">{Math.round((1 - (metrics.targetModelCalls || 20)/(metrics.estimatedStandardCalls || 100)) * 100)}%</strong> in this simulation without altering output quality.
      </div>

      {/* Actions */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
        <button
          id="completion-run-again-btn"
          onClick={onRunAgain}
          className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-red-600 hover:bg-red-500 text-white font-semibold text-xs sm:text-sm transition-colors cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Run Again</span>
        </button>

        <button
          id="completion-view-benchmark-btn"
          onClick={onViewBenchmark}
          className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 font-medium text-xs sm:text-sm transition-colors cursor-pointer"
        >
          <BarChart3 className="w-4 h-4 text-slate-400" />
          <span>View Comprehensive Benchmarks</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
