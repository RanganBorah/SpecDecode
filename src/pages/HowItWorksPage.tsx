import React from 'react';
import { PageTab } from '../types';
import { HowItWorks } from '../components/HowItWorks';
import { BookOpen, Zap, Sparkles, CheckCircle2, ArrowRight, Layers, FileCode } from 'lucide-react';

interface HowItWorksPageProps {
  onTabChange: (tab: PageTab) => void;
}

export const HowItWorksPage: React.FC<HowItWorksPageProps> = ({ onTabChange }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 py-4">
      
      {/* 1. Main 4-Step Interactive Player */}
      <HowItWorks />

      {/* 2. Mathematical Foundation of Speculative Decoding */}
      <div className="rounded-xl border border-slate-800 bg-slate-900 p-6 sm:p-8 space-y-6">
        <div className="flex items-center gap-2.5 border-b border-slate-800 pb-4">
          <div className="p-2 rounded-lg bg-slate-800 text-red-400">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">
              The Mathematics of Speculative Sampling &amp; Lossless Guarantee
            </h3>
            <p className="text-xs text-slate-400">
              Why speculative decoding guarantees zero deviation from target model probabilities.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-slate-300">

          <div className="p-4 rounded-lg bg-slate-950 border border-slate-800 space-y-3">
            <h4 className="font-semibold text-slate-200 font-mono flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-400"></span>
              Acceptance Criterion Formula
            </h4>
            <p className="leading-relaxed">
              Given draft token <code className="text-slate-300">x</code> with draft probability <code className="text-slate-300">q(x)</code> and target probability <code className="text-slate-300">p(x)</code>:
            </p>
            <div className="p-3 rounded bg-slate-900 border border-slate-800 font-mono text-center text-xs text-emerald-400 font-semibold">
              Acceptance Probability = min(1,  p(x) / q(x) )
            </div>
            <p className="text-[11px] text-slate-400">
              If the target model assigns equal or higher probability than the draft model (p(x) &ge; q(x)), the draft token is accepted with 100% certainty.
            </p>
          </div>

          <div className="p-4 rounded-lg bg-slate-950 border border-slate-800 space-y-3">
            <h4 className="font-semibold text-slate-200 font-mono flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-400"></span>
              Target Resampling on Rejection
            </h4>
            <p className="leading-relaxed">
              If candidate token <code className="text-slate-300">x</code> is rejected, the target model draws a replacement token from modified residual distribution:
            </p>
            <div className="p-3 rounded bg-slate-900 border border-slate-800 font-mono text-center text-xs text-red-300 font-semibold">
              p'(x) = max(0, p(x) - q(x)) / &Sigma; max(0, p(y) - q(y))
            </div>
            <p className="text-[11px] text-slate-400">
              This exact resampling satisfies the marginal probability distribution: <strong className="text-slate-200">&Sigma; = p(x)</strong> identically.
            </p>
          </div>

        </div>

        {/* Reference Links & Key Takeaway */}
        <div className="p-4 rounded-lg bg-slate-950 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
          <div className="space-y-1">
            <span className="font-semibold text-slate-200">Key Scientific Result:</span>
            <p className="text-slate-400">
              Speculative decoding is strictly <strong className="text-slate-200">lossless</strong>. The output text is indistinguishable from running pure target-model autoregression.
            </p>
          </div>

          <button
            onClick={() => onTabChange('demo')}
            className="shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-lg bg-red-600 hover:bg-red-500 text-white font-semibold text-xs transition-colors cursor-pointer"
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Test in Playground</span>
          </button>
        </div>

      </div>

    </div>
  );
};
