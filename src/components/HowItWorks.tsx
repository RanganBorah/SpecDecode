import React, { useState, useEffect } from 'react';
import { 
  Zap, 
  Cpu, 
  CheckCircle2, 
  XCircle, 
  Play, 
  Pause, 
  RotateCcw, 
  ArrowRight, 
  Sparkles, 
  BookOpen,
  Layers,
  Check,
  X
} from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  useEffect(() => {
    let timer: number;
    if (isPlaying) {
      timer = window.setInterval(() => {
        setActiveStep((prev) => (prev + 1) % 4);
      }, 3000);
    }
    return () => clearInterval(timer);
  }, [isPlaying]);

  const steps = [
    {
      id: 0,
      title: 'Step 1 — Draft Candidate Generation',
      subtitle: 'The small draft model rapidly predicts several future tokens.',
      tag: 'Fast Autoregression',
      color: 'purple',
      explanation: 'A lightweight draft model (e.g. Llama-3-8B) runs autoregressively for γ=5 iterations. Because small models require drastically less memory bandwidth per step, candidate tokens are generated at near-zero latency (~3ms/token).',
      visual: (
        <div className="p-4 rounded-lg bg-slate-950 border border-slate-800 space-y-3 font-mono">
          <div className="flex items-center justify-between text-xs text-slate-300">
            <span className="flex items-center gap-1.5 font-semibold">
              <Zap className="w-3.5 h-3.5 text-blue-400" /> Draft Model (8B)
            </span>
            <span className="text-slate-500">~3ms / step</span>
          </div>
          <div className="flex flex-wrap items-center gap-2 pt-1">
            {['Quantum', 'superposition', 'enables', 'ultra', 'fast'].map((tok, i) => (
              <span key={i} className="px-2.5 py-1 rounded-lg bg-slate-800 border border-slate-700 text-slate-200 text-xs font-medium animate-pulse">
                [{tok}]
              </span>
            ))}
          </div>
          <div className="text-[11px] text-slate-500 font-sans">
            5 candidate tokens proposed in ~15ms total draft time.
          </div>
        </div>
      )
    },
    {
      id: 1,
      title: 'Step 2 — Batched Target Verification',
      subtitle: 'The large target model evaluates all proposed tokens simultaneously.',
      tag: 'Single Forward Pass',
      color: 'cyan',
      explanation: 'Instead of evaluating 5 separate target model steps, the large 70B target model processes the entire candidate sequence in a single forward pass. Deep neural networks are computationally parallel on tensor cores, so evaluating 5 tokens simultaneously takes virtually the same time as 1 token.',
      visual: (
        <div className="p-4 rounded-lg bg-slate-950 border border-slate-800 space-y-3 font-mono">
          <div className="flex items-center justify-between text-xs text-slate-300">
            <span className="flex items-center gap-1.5 font-semibold">
              <Cpu className="w-3.5 h-3.5 text-red-400" /> Target Model (70B) Parallel Verification
            </span>
            <span className="text-slate-500">1 Forward Pass (~28ms)</span>
          </div>
          <div className="grid grid-cols-5 gap-2 pt-1 text-center">
            {['Quantum', 'superposition', 'enables', 'ultra', 'fast'].map((tok, i) => (
              <div key={i} className="p-2 rounded-lg bg-slate-800 border border-slate-700 text-slate-200 text-xs">
                <div className="text-[10px] text-slate-500 font-mono">P(w_{i})</div>
                <div className="font-semibold truncate">{tok}</div>
              </div>
            ))}
          </div>
          <div className="text-[11px] text-slate-400 font-sans">
            Parallel tensor verification runs simultaneously across all candidate positions.
          </div>
        </div>
      )
    },
    {
      id: 2,
      title: 'Step 3 — Speculative Acceptance',
      subtitle: 'Correct predictions matching the target distribution are accepted.',
      tag: 'Acceptance Criterion',
      color: 'green',
      explanation: 'The verification algorithm checks candidate tokens against target probability distributions. If Draft Probability satisfies acceptance criteria (via speculative sampling), tokens are accepted with guaranteed mathematical equivalence.',
      visual: (
        <div className="p-4 rounded-lg bg-slate-950 border border-slate-800 space-y-3 font-mono">
          <div className="flex items-center justify-between text-xs text-slate-300">
            <span className="flex items-center gap-1.5 font-semibold">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Probability Verification Test
            </span>
            <span className="text-slate-500">Tokens 1, 2, 3 Passed</span>
          </div>
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className="px-3 py-1.5 rounded-lg bg-emerald-950 border border-emerald-700 text-emerald-300 text-xs font-semibold flex items-center gap-1">
              <Check className="w-3 h-3" /> Quantum
            </span>
            <span className="px-3 py-1.5 rounded-lg bg-emerald-950 border border-emerald-700 text-emerald-300 text-xs font-semibold flex items-center gap-1">
              <Check className="w-3 h-3" /> superposition
            </span>
            <span className="px-3 py-1.5 rounded-lg bg-emerald-950 border border-emerald-700 text-emerald-300 text-xs font-semibold flex items-center gap-1">
              <Check className="w-3 h-3" /> enables
            </span>
            <span className="px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-slate-400 text-xs">
              ...
            </span>
          </div>
          <div className="text-[11px] text-slate-400 font-sans">
            3 tokens accepted instantly from 1 forward pass!
          </div>
        </div>
      )
    },
    {
      id: 3,
      title: 'Step 4 — Rejection & Target Correction',
      subtitle: 'Incorrect predictions are replaced by the target model at zero extra cost.',
      tag: 'Distribution Recovery',
      color: 'amber',
      explanation: 'At the first candidate mismatch, the candidate is discarded. Crucially, the target model already computed the true next-token probability distribution during verification, allowing it to immediately output the exact correct token without an additional model call.',
      visual: (
        <div className="p-4 rounded-lg bg-slate-950 border border-slate-800 space-y-3 font-mono">
          <div className="flex items-center justify-between text-xs text-slate-300">
            <span className="flex items-center gap-1.5 font-semibold">
              <XCircle className="w-3.5 h-3.5 text-rose-400" /> Rejection &amp; Correction Step
            </span>
            <span className="text-slate-500">Target Correction Emitted</span>
          </div>
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className="px-2.5 py-1 rounded-lg bg-rose-950 border border-rose-700 text-rose-300 text-xs line-through flex items-center gap-1">
              <X className="w-3 h-3" /> ultra
            </span>
            <span className="text-slate-500">&rarr;</span>
            <span className="px-3 py-1 rounded-lg bg-red-950 border border-red-700 text-red-200 text-xs font-semibold flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-red-400" /> parallel
            </span>
          </div>
          <div className="text-[11px] text-slate-400 font-sans">
            Result: 4 valid output tokens emitted from 1 target verification pass!
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-8">
      
      {/* Header and Interactive Stepper Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-red-400" />
            <h2 className="text-xl sm:text-2xl font-semibold text-white tracking-tight">
              How Speculative Decoding Works
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            The mathematical and computational mechanics of lossless inference acceleration.
          </p>
        </div>

        {/* Player Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold transition-colors ${
              isPlaying
                ? 'bg-amber-600 hover:bg-amber-500 text-white'
                : 'bg-red-600 hover:bg-red-500 text-white'
            }`}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span>{isPlaying ? 'Pause Stepper' : 'Play Explanation'}</span>
          </button>

          <button
            onClick={() => { setActiveStep(0); setIsPlaying(false); }}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-400 hover:text-white"
            title="Reset stepper"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 4 Step Selector Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {steps.map((step) => {
          const isCurrent = activeStep === step.id;
          return (
            <button
              key={step.id}
              onClick={() => { setActiveStep(step.id); setIsPlaying(false); }}
              className={`p-4 rounded-lg border text-left transition-colors cursor-pointer ${
                isCurrent
                  ? 'bg-slate-900 border-red-500/50'
                  : 'bg-slate-950 border-slate-800 hover:border-slate-700 opacity-75 hover:opacity-100'
              }`}
            >
              <div className="flex items-center justify-between text-xs mb-2">
                <span className={`px-2 py-0.5 rounded font-semibold font-mono ${
                  isCurrent ? 'bg-red-950 text-red-300 border border-red-700' : 'bg-slate-800 text-slate-400'
                }`}>
                  0{step.id + 1}
                </span>
                <span className="text-[10px] text-slate-500">{step.tag}</span>
              </div>
              <h4 className="text-xs font-semibold text-white leading-snug">
                {step.title}
              </h4>
            </button>
          );
        })}
      </div>

      {/* Active Step Deep Dive Card */}
      <div className="rounded-xl border border-slate-800 bg-slate-900 p-6 sm:p-8 space-y-6">

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-4">
          <div>
            <span className="text-xs text-red-400 font-semibold">
              Deep Dive &bull; Phase {activeStep + 1} of 4
            </span>
            <h3 className="text-xl font-semibold text-white mt-1">
              {steps[activeStep].title}
            </h3>
            <p className="text-sm text-slate-400 mt-1">
              {steps[activeStep].subtitle}
            </p>
          </div>
        </div>

        {/* Interactive Visual Demonstration Box */}
        <div className="space-y-3">
          <div className="text-xs font-medium text-slate-400">
            Pipeline Visual State:
          </div>
          {steps[activeStep].visual}
        </div>

        {/* Detailed Mathematical & Engineering Explanation */}
        <div className="p-4 rounded-lg bg-slate-950 border border-slate-800 space-y-2">
          <div className="text-xs font-semibold text-slate-200 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-red-400" />
            Engineering Details:
          </div>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            {steps[activeStep].explanation}
          </p>
        </div>

        {/* Next Step Nav Button */}
        <div className="flex justify-end pt-2">
          <button
            onClick={() => setActiveStep((prev) => (prev + 1) % 4)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-medium text-slate-200 transition-colors"
          >
            <span>Next Step ({((activeStep + 1) % 4) + 1}/4)</span>
            <ArrowRight className="w-3.5 h-3.5 text-red-400" />
          </button>
        </div>

      </div>

    </div>
  );
};
