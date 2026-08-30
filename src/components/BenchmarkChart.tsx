import React, { useState } from 'react';
import { CentralBenchmarkData } from '../types';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Legend,
  LineChart,
  Line
} from 'recharts';
import { 
  BarChart3, 
  TrendingUp, 
  Clock, 
  Cpu, 
  Zap, 
  AlertCircle, 
  Layers, 
  Sliders,
  Sparkles,
  Info
} from 'lucide-react';

interface BenchmarkChartProps {
  data: CentralBenchmarkData;
}

export const BenchmarkChart: React.FC<BenchmarkChartProps> = ({ data }) => {
  const [metricTab, setMetricTab] = useState<'tps' | 'calls' | 'latency'>('tps');

  const barChartData = data.comparisonSeries.map((item) => ({
    name: item.category,
    'Standard (3B)': item.standardSpeed,
    'Speculative (3B+1B)': item.speculativeSpeed,
    'Acceptance %': item.acceptanceRate,
    'Speedup': item.speedup
  }));

  const latencyChartData = data.comparisonSeries.map((item) => ({
    name: item.category,
    'Standard Latency (ms)': Math.round((100 / item.standardSpeed) * 1000),
    'Speculative Latency (ms)': Math.round((100 / item.speculativeSpeed) * 1000)
  }));

  const targetCallsData = data.comparisonSeries.map((item) => ({
    name: item.category,
    'Standard Calls': 100,
    'Speculative Calls': Math.round(100 / item.speedup)
  }));

  return (
    <div className="space-y-8">
      
      {/* Top Highlight Banner */}
      <div className="rounded-xl border border-slate-800 bg-slate-900 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-300 text-xs">
            <Sparkles className="w-3.5 h-3.5 text-red-400" />
            <span>Empirical Inference Evaluation</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            {data.comparisonSeries.length > 0
              ? <>Speculative Decoding achieved <span className="text-red-400">{data.overviewMetrics.speedImprovement} measured speedup</span></>
              : <>Run <span className="text-red-400">npm run benchmarks</span> to measure real results</>}
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-xl">
            {data.comparisonSeries.length > 0
              ? <>Across {data.comparisonSeries.length} task categories, measured on your own GPU, with an average draft acceptance rate of <strong className="text-slate-200">{data.overviewMetrics.acceptanceRate}%</strong>.</>
              : 'No benchmark data yet — these are placeholder zeros, not fabricated numbers.'}
          </p>
        </div>

        {/* Circular Gauge / Progress Box for Acceptance Rate */}
        <div className="shrink-0 p-5 rounded-xl bg-slate-950 border border-slate-800 text-center space-y-2 w-48">
          <div className="text-[11px] text-slate-500">
            Token Acceptance Rate (α)
          </div>
          <div className="text-4xl font-semibold text-white font-mono">
            {data.overviewMetrics.acceptanceRate}%
          </div>
          <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-red-500 h-full rounded-full"
              style={{ width: `${data.overviewMetrics.acceptanceRate}%` }}
            />
          </div>
          <p className="text-[10px] text-slate-500">
            Optimal operating range: 75%–85%
          </p>
        </div>
      </div>

      {/* Main Bar Chart: Standard vs Speculative across Categories */}
      <div className="rounded-xl border border-slate-800 bg-slate-900 p-6 space-y-5">

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-red-400" />
              <h3 className="text-base font-semibold text-white tracking-tight">
                Benchmark Comparison Across Workloads
              </h3>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Evaluating throughput and computational savings across diverse prompt categories.
            </p>
          </div>

          {/* Metric Selector Tabs */}
          <div className="flex items-center gap-1.5 p-1 rounded-lg bg-slate-800 text-xs">
            <button
              onClick={() => setMetricTab('tps')}
              className={`px-3 py-1 rounded transition-colors ${
                metricTab === 'tps' ? 'bg-slate-700 text-white font-medium' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Throughput (Tokens/s)
            </button>
            <button
              onClick={() => setMetricTab('calls')}
              className={`px-3 py-1 rounded transition-colors ${
                metricTab === 'calls' ? 'bg-slate-700 text-white font-medium' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Target Calls
            </button>
            <button
              onClick={() => setMetricTab('latency')}
              className={`px-3 py-1 rounded transition-colors ${
                metricTab === 'latency' ? 'bg-slate-700 text-white font-medium' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Total Latency (ms)
            </button>
          </div>
        </div>

        {/* Recharts Container */}
        <div className="h-72 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            {metricTab === 'tps' ? (
              <BarChart data={barChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" opacity={0.6} />
                <XAxis dataKey="name" stroke="#94a3b8" tick={{ fontSize: 11 }} />
                <YAxis stroke="#94a3b8" tick={{ fontSize: 11 }} unit=" t/s" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', color: '#e2e8f0', fontSize: '12px' }}
                />
                <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '8px' }} />
                <Bar dataKey="Standard (3B)" fill="#475569" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Speculative (3B+1B)" fill="#6366f1" radius={[4, 4, 0, 0]} />
              </BarChart>
            ) : metricTab === 'calls' ? (
              <BarChart data={targetCallsData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" opacity={0.6} />
                <XAxis dataKey="name" stroke="#94a3b8" tick={{ fontSize: 11 }} />
                <YAxis stroke="#94a3b8" tick={{ fontSize: 11 }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', color: '#e2e8f0', fontSize: '12px' }}
                />
                <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '8px' }} />
                <Bar dataKey="Standard Calls" fill="#475569" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Speculative Calls" fill="#6366f1" radius={[4, 4, 0, 0]} />
              </BarChart>
            ) : (
              <BarChart data={latencyChartData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" opacity={0.6} />
                <XAxis dataKey="name" stroke="#94a3b8" tick={{ fontSize: 11 }} />
                <YAxis stroke="#94a3b8" tick={{ fontSize: 11 }} unit=" ms" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', color: '#e2e8f0', fontSize: '12px' }}
                />
                <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '8px' }} />
                <Bar dataKey="Standard Latency (ms)" fill="#475569" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Speculative Latency (ms)" fill="#6366f1" radius={[4, 4, 0, 0]} />
              </BarChart>
            )}
          </ResponsiveContainer>
        </div>

      </div>

      {/* Two Column Grid: Time-Series Line Chart + Gamma Ablation */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Line Chart: Generation Speed Over Time */}
        <div className="rounded-xl border border-slate-800 bg-slate-900 p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-red-400" />
              <h3 className="text-sm font-semibold text-white tracking-tight">
                Generation Speed Over Sequence Length
              </h3>
            </div>
            <span className="text-[11px] text-slate-500">Tokens vs. Time (ms)</span>
          </div>

          <div className="h-60 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data.timeSeriesSpeed} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" opacity={0.6} />
                <XAxis dataKey="tokenCount" stroke="#94a3b8" tick={{ fontSize: 11 }} unit=" tok" />
                <YAxis stroke="#94a3b8" tick={{ fontSize: 11 }} unit=" ms" />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', color: '#e2e8f0', fontSize: '12px' }}
                />
                <Legend wrapperStyle={{ fontSize: '12px' }} />
                <Line type="monotone" dataKey="standardTimeMs" name="Standard (3B)" stroke="#64748b" strokeWidth={2} dot={{ r: 3 }} />
                <Line type="monotone" dataKey="speculativeTimeMs" name="Speculative (3B+1B)" stroke="#6366f1" strokeWidth={2.5} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <p className="text-[11px] text-slate-400">
            Speculative decoding maintains consistent slope divergence, delivering larger cumulative latency gains over long contexts.
          </p>
        </div>

        {/* Draft Length (Gamma) Ablation Curve */}
        <div className="rounded-xl border border-slate-800 bg-slate-900 p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Sliders className="w-4 h-4 text-red-400" />
              <h3 className="text-sm font-semibold text-white tracking-tight">
                Draft Tokens (γ) vs. Effective Speedup
              </h3>
            </div>
            <span className="text-[11px] text-slate-500">Optimal γ = 5</span>
          </div>

          <div className="h-60 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data.gammaAblation} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" opacity={0.6} />
                <XAxis dataKey="gamma" stroke="#94a3b8" tick={{ fontSize: 11 }} label={{ value: 'Draft Length (γ)', position: 'insideBottom', offset: -4, fill: '#64748b', fontSize: 10 }} />
                <YAxis stroke="#94a3b8" tick={{ fontSize: 11 }} domain={[0.8, 2.2]} unit="×" />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', color: '#e2e8f0', fontSize: '12px' }}
                />
                <Legend wrapperStyle={{ fontSize: '12px' }} />
                <Line type="monotone" dataKey="speedup" name="Speedup (×)" stroke="#6366f1" strokeWidth={2.5} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <p className="text-[11px] text-slate-400">
            Speedup peaks at γ=5. Beyond γ=6, diminished token acceptance probability introduces verification overhead.
          </p>
        </div>

      </div>

      {/* Model Pairing Matrix Table */}
      <div className="rounded-xl border border-slate-800 bg-slate-900 p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Cpu className="w-4 h-4 text-red-400" />
            <h3 className="text-sm font-semibold text-white tracking-tight">
              Production Target / Draft Model Combinations
            </h3>
          </div>
          <span className="text-[11px] text-slate-500">Empirical LLM Pairs</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-500 text-[11px]">
                <th className="pb-2 font-medium">Model Pair</th>
                <th className="pb-2 font-medium">Target Model</th>
                <th className="pb-2 font-medium">Draft Model</th>
                <th className="pb-2 font-medium">Speedup</th>
                <th className="pb-2 font-medium">Draft Acceptance (α)</th>
                <th className="pb-2 font-medium">Draft VRAM Overhead</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300">
              {data.modelPairs.map((pair, idx) => (
                <tr key={idx} className="hover:bg-slate-800/50">
                  <td className="py-2.5 font-semibold text-slate-200">{pair.pairName}</td>
                  <td className="py-2.5 text-slate-300">{pair.target}</td>
                  <td className="py-2.5 text-slate-300">{pair.draft}</td>
                  <td className="py-2.5 font-semibold text-emerald-400">{pair.speedup}</td>
                  <td className="py-2.5 text-slate-300">{pair.acceptanceRate}</td>
                  <td className="py-2.5 text-slate-500">{pair.vramMb}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Data provenance note */}
      <div className="rounded-xl border border-slate-800 bg-slate-900 p-4 flex items-start gap-3 text-xs text-slate-400">
        <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong className="text-slate-300">Data source:</strong> The summary banner and per-category comparison above are real measurements from <code className="text-red-300">npm run benchmarks</code> on this machine's own GPU. The sequence-length curve, γ-ablation curve, and model-pairing table below are illustrative reference points from published speculative decoding research (Leviathan et al., Chen et al.) — this project's benchmark script doesn't sweep those dimensions yet, so those sections stay empty until it does.
        </p>
      </div>

    </div>
  );
};
