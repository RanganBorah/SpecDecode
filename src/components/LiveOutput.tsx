import React, { useState } from 'react';
import { 
  FileText, 
  Copy, 
  Check, 
  Terminal, 
  Sparkles, 
  Layers, 
  RotateCcw,
  Zap
} from 'lucide-react';

interface LiveOutputProps {
  outputText: string;
  totalTokensGenerated: number;
  maxTokens: number;
  progressPercent: number;
  isRunning: boolean;
  isCompleted: boolean;
  mode: 'speculative' | 'standard' | 'demo';
}

export const LiveOutput: React.FC<LiveOutputProps> = ({
  outputText,
  totalTokensGenerated,
  maxTokens,
  progressPercent,
  isRunning,
  isCompleted,
  mode
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (!outputText) return;
    navigator.clipboard.writeText(outputText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900 p-5 space-y-3.5">

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <FileText className="w-4 h-4 text-red-400" />
          <h3 className="text-sm font-semibold text-slate-200">
            Generated Response
          </h3>
          <span className="text-[11px] px-2 py-0.5 rounded bg-emerald-950/60 border border-emerald-800 text-emerald-300">
            Local Inference
          </span>
        </div>

        {/* Copy & Status Controls */}
        <div className="flex items-center gap-2">
          {outputText && (
            <button
              onClick={handleCopy}
              className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-800 hover:bg-slate-700 border border-slate-700 text-[11px] text-slate-300 transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3 text-slate-400" />}
              <span>{copied ? 'Copied' : 'Copy Text'}</span>
            </button>
          )}
        </div>
      </div>

      {/* Progress Bar Container */}
      <div className="space-y-1">
        <div className="flex justify-between items-center text-xs">
          <span className="text-slate-400 flex items-center gap-1.5 text-[11px]">
            {isRunning && <span className="animate-spin text-red-400">&bull;</span>}
            {isCompleted ? 'Generation Complete' : isRunning ? 'Streaming tokens...' : 'Idle'}
          </span>
          <span className="text-slate-300 font-medium text-[11px] font-mono">
            {totalTokensGenerated} / {maxTokens} tokens ({progressPercent}%)
          </span>
        </div>
        <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-red-500 transition-all duration-300"
            style={{ width: `${Math.min(100, Math.max(0, progressPercent))}%` }}
          />
        </div>
      </div>

      {/* Main Text Output Box */}
      <div className="relative rounded-lg border border-slate-800 bg-slate-950 p-4 min-h-[160px] max-h-[280px] overflow-y-auto">
        {outputText ? (
          <div className="font-mono text-xs sm:text-sm text-slate-100 whitespace-pre-wrap leading-relaxed">
            {outputText}
            {isRunning && (
              <span className="inline-block w-2 h-4 bg-red-400 ml-1 animate-pulse" />
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-10 text-center text-slate-500 space-y-2">
            <Terminal className="w-8 h-8 text-slate-600" />
            <p className="text-xs">
              Awaiting prompt execution. Click "Run Speculative Decoding" above.
            </p>
          </div>
        )}
      </div>

      {/* Bottom Footer Note */}
      <div className="flex items-center justify-between text-[11px] text-slate-500">
        <span>Verified by Target Model: <strong className="text-slate-300">100% Quality Equivalence</strong></span>
        <span>Mode: <strong className="text-red-300">{mode.toUpperCase()}</strong></span>
      </div>

    </div>
  );
};
