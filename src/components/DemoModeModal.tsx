import React, { useState, useEffect } from 'react';
import { 
  Play, 
  RotateCcw, 
  X, 
  Zap, 
  Cpu, 
  CheckCircle2, 
  XCircle, 
  Sparkles, 
  Activity, 
  Check, 
  ArrowRight,
  TrendingUp
} from 'lucide-react';

interface DemoModeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onJumpToPlayground: () => void;
}

export const DemoModeModal: React.FC<DemoModeModalProps> = ({
  isOpen,
  onClose,
  onJumpToPlayground
}) => {
  const [seconds, setSeconds] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);

  useEffect(() => {
    if (!isOpen) {
      setSeconds(0);
      return;
    }

    let interval: number;
    if (isPlaying && seconds < 20) {
      interval = window.setInterval(() => {
        setSeconds((prev) => {
          if (prev >= 20) {
            setIsPlaying(false);
            return 20;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isOpen, isPlaying, seconds]);

  if (!isOpen) return null;

  const restartDemo = () => {
    setSeconds(0);
    setIsPlaying(true);
  };

  // Determine stage based on elapsed seconds (0 to 20s)
  const isStage1 = seconds >= 0 && seconds < 2;    // Initializing
  const isStage2 = seconds >= 2 && seconds < 6;    // Draft generating
  const isStage3 = seconds >= 6 && seconds < 10;   // Target verifying
  const isStage4 = seconds >= 10 && seconds < 13;  // Accepted / rejected
  const isStage5 = seconds >= 13 && seconds < 16;  // Metrics updating
  const isStage6 = seconds >= 16;                  // Final result complete

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-2xl rounded-xl border border-slate-800 bg-slate-900 p-6 sm:p-8 space-y-6">

        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center text-red-400">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-semibold text-white">
                  Hackathon 20-Second Guided Demo
                </h3>
                <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">
                  {seconds}s / 20s
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Automated 6-stage walkthrough of speculative inference.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
          <div
            className="bg-red-500 h-full transition-all duration-1000"
            style={{ width: `${(seconds / 20) * 100}%` }}
          />
        </div>

        {/* Dynamic Stage Display Container */}
        <div className="min-h-[220px] rounded-lg border border-slate-800 bg-slate-950 p-6 flex flex-col justify-center text-center space-y-4">

          {/* Stage 1 (0-2s): Initializing */}
          {isStage1 && (
            <div className="space-y-3 animate-in fade-in">
              <div className="inline-flex p-3 rounded-full bg-slate-800 text-red-400 animate-pulse">
                <Cpu className="w-8 h-8" />
              </div>
              <h4 className="text-lg font-semibold text-white">Initializing Models &amp; Unified GPU Memory...</h4>
              <p className="text-xs text-slate-500 font-mono">
                Target Model: Llama-3-70B &bull; Draft Model: Llama-3-8B (γ=5)
              </p>
            </div>
          )}

          {/* Stage 2 (2-6s): Draft Generation */}
          {isStage2 && (
            <div className="space-y-3 animate-in fade-in">
              <div className="inline-flex p-2.5 rounded-full bg-slate-800 text-red-400">
                <Zap className="w-6 h-6 animate-bounce" />
              </div>
              <h4 className="text-base font-semibold text-slate-200">Phase 1: Draft Model Generates 5 Candidate Tokens</h4>
              <div className="flex flex-wrap justify-center gap-2 font-mono text-xs">
                {['Neural', 'networks', 'learn', 'from', 'patterns'].map((t, idx) => (
                  <span key={idx} className="px-3 py-1 rounded bg-slate-800 border border-slate-700 text-slate-200 animate-pulse">
                    [{t}]
                  </span>
                ))}
              </div>
              <p className="text-[11px] text-slate-500 font-mono">
                Rapid autoregression &bull; ~3ms per token &bull; Total draft time: 15ms
              </p>
            </div>
          )}

          {/* Stage 3 (6-10s): Target Verification */}
          {isStage3 && (
            <div className="space-y-3 animate-in fade-in">
              <div className="inline-flex p-2.5 rounded-full bg-slate-800 text-red-400">
                <Cpu className="w-6 h-6 animate-spin" />
              </div>
              <h4 className="text-base font-semibold text-slate-200">Phase 2: Target Model (70B) Verifies All 5 Tokens in Parallel</h4>
              <div className="grid grid-cols-5 gap-2 max-w-md mx-auto font-mono text-xs">
                {['Neural', 'networks', 'learn', 'from', 'patterns'].map((t, idx) => (
                  <div key={idx} className="p-2 rounded bg-slate-800 border border-slate-700 text-slate-200">
                    <div className="text-[9px] text-slate-500">P(tok)</div>
                    <div className="font-semibold truncate">{t}</div>
                  </div>
                ))}
              </div>
              <p className="text-[11px] text-slate-400 font-mono">
                1 Single Target Forward Pass instead of 5 Sequential Passes!
              </p>
            </div>
          )}

          {/* Stage 4 (10-13s): Accepted / Rejected States */}
          {isStage4 && (
            <div className="space-y-3 animate-in fade-in">
              <div className="inline-flex p-2.5 rounded-full bg-emerald-950 text-emerald-400">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h4 className="text-base font-semibold text-slate-200">Phase 3: Acceptance &amp; Correction Resolution</h4>
              <div className="flex flex-wrap justify-center gap-2 font-mono text-xs">
                <span className="px-2.5 py-1 rounded bg-emerald-950 border border-emerald-700 text-emerald-300 flex items-center gap-1 font-semibold">
                  <Check className="w-3.5 h-3.5" /> Neural
                </span>
                <span className="px-2.5 py-1 rounded bg-emerald-950 border border-emerald-700 text-emerald-300 flex items-center gap-1 font-semibold">
                  <Check className="w-3.5 h-3.5" /> networks
                </span>
                <span className="px-2.5 py-1 rounded bg-emerald-950 border border-emerald-700 text-emerald-300 flex items-center gap-1 font-semibold">
                  <Check className="w-3.5 h-3.5" /> learn
                </span>
                <span className="px-2.5 py-1 rounded bg-emerald-950 border border-emerald-700 text-emerald-300 flex items-center gap-1 font-semibold">
                  <Check className="w-3.5 h-3.5" /> from
                </span>
                <span className="px-2.5 py-1 rounded bg-rose-950 border border-rose-700 text-rose-300 line-through">
                  patterns
                </span>
                <span className="px-2.5 py-1 rounded bg-red-950 border border-red-700 text-red-200 font-semibold flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> data.
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-mono">
                4 Draft Tokens Accepted + 1 Target Correction = 5 Tokens Emitted
              </p>
            </div>
          )}

          {/* Stage 5 (13-16s): Metrics Update */}
          {isStage5 && (
            <div className="space-y-3 animate-in fade-in">
              <div className="inline-flex p-2.5 rounded-full bg-slate-800 text-red-400">
                <Activity className="w-6 h-6" />
              </div>
              <h4 className="text-base font-semibold text-slate-200">Phase 4: Telemetry &amp; Throughput Computation</h4>
              <div className="grid grid-cols-3 gap-3 max-w-sm mx-auto font-mono text-center">
                <div className="p-2 rounded bg-slate-900 border border-slate-800">
                  <div className="text-[10px] text-slate-500">Throughput</div>
                  <div className="text-lg font-semibold text-white">82.4 t/s</div>
                </div>
                <div className="p-2 rounded bg-slate-900 border border-slate-800">
                  <div className="text-[10px] text-slate-500">Acceptance (α)</div>
                  <div className="text-lg font-semibold text-white">81%</div>
                </div>
                <div className="p-2 rounded bg-slate-900 border border-slate-800">
                  <div className="text-[10px] text-slate-500">Target Calls</div>
                  <div className="text-lg font-semibold text-white">20</div>
                </div>
              </div>
            </div>
          )}

          {/* Stage 6 (16-20s): Final Results */}
          {isStage6 && (
            <div className="space-y-4 animate-in fade-in">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950 border border-emerald-700 text-emerald-300 text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Demo Complete</span>
              </div>
              <div className="grid grid-cols-3 gap-3 max-w-md mx-auto font-mono text-center">
                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                  <div className="text-[10px] text-slate-500">Speedup</div>
                  <div className="text-2xl sm:text-3xl font-semibold text-white">1.8×</div>
                </div>
                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                  <div className="text-[10px] text-slate-500">Acceptance Rate</div>
                  <div className="text-2xl sm:text-3xl font-semibold text-white">81%</div>
                </div>
                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                  <div className="text-[10px] text-slate-500">Target Calls</div>
                  <div className="text-2xl sm:text-3xl font-semibold text-white">20</div>
                </div>
              </div>
              <p className="text-xs text-slate-400">
                Speculative decoding successfully reduced target-model forward passes from 100 to 20 with zero loss in output quality.
              </p>
            </div>
          )}

        </div>

        {/* Footer Actions */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          <button
            onClick={restartDemo}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-medium text-slate-200 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
            <span>Replay Demo</span>
          </button>

          <button
            onClick={() => { onClose(); onJumpToPlayground(); }}
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-red-600 hover:bg-red-500 text-white font-semibold text-xs sm:text-sm transition-colors cursor-pointer"
          >
            <span>Open Interactive Playground</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
