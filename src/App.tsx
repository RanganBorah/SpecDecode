import React, { useState, useEffect } from 'react';
import { PageTab } from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { DemoModeModal } from './components/DemoModeModal';
import { Landing } from './pages/Landing';
import { Overview } from './pages/Overview';
import { LiveDemo } from './pages/LiveDemo';
import { Benchmark } from './pages/Benchmark';
import { HowItWorksPage } from './pages/HowItWorksPage';
import { Architecture } from './pages/Architecture';
import { AboutDetails } from './pages/AboutDetails';
import { apiService } from './services/api';
import { 
  CentralBenchmarkData, 
  ModelOption, 
  PresetPrompt 
} from './types';

export default function App() {
  const [hasEntered, setHasEntered] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<PageTab>('overview');
  const [isDemoModalOpen, setIsDemoModalOpen] = useState<boolean>(false);
  const [benchmarkData, setBenchmarkData] = useState<CentralBenchmarkData | null>(null);
  const [targetModels, setTargetModels] = useState<ModelOption[]>([]);
  const [draftModels, setDraftModels] = useState<ModelOption[]>([]);
  const [presetPrompts, setPresetPrompts] = useState<PresetPrompt[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [backendError, setBackendError] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      const presets = await apiService.getPresetPrompts();
      setPresetPrompts(presets);

      const [bench, targets, drafts] = await Promise.allSettled([
        apiService.getBenchmarkData(),
        apiService.getTargetModels(),
        apiService.getDraftModels(),
      ]);

      if (bench.status === 'fulfilled') setBenchmarkData(bench.value);
      if (targets.status === 'fulfilled') setTargetModels(targets.value);
      if (drafts.status === 'fulfilled') setDraftModels(drafts.value);

      const rejected = [bench, targets, drafts].filter(
        (r): r is PromiseRejectedResult => r.status === 'rejected'
      );
      if (rejected.length > 0) {
        console.error('Failed to load initial data from backend', rejected.map(r => r.reason));
        setBackendError(
          'Cannot reach the local backend. Start it with "npm run server" (or "npm run dev:full" to run both), see SETUP.md.'
        );
        // Fall back to an empty/placeholder shape so the UI can still render.
        setBenchmarkData(prev => prev ?? {
          overviewMetrics: {
            speedImprovement: '—', tokensPerSecond: 0, standardTokensPerSecond: 0,
            acceptanceRate: 0, targetModelCalls: 0, standardTargetModelCalls: 0,
            averageLatencyMs: 0, memoryEfficiencyPct: 0,
          },
          comparisonSeries: [], timeSeriesSpeed: [], gammaAblation: [], modelPairs: [],
        });
      }

      setIsLoading(false);
    }
    loadData();
  }, []);

  const handleTabChange = (tab: PageTab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!hasEntered) {
    return <Landing onEnter={() => setHasEntered(true)} />;
  }

  if (isLoading || !benchmarkData) {
    return (
      <div className="min-h-screen bg-[#020617] flex flex-col items-center justify-center space-y-4 text-cyan-400 font-mono text-xs">
        <div className="w-10 h-10 rounded-xl border border-cyan-500/40 bg-cyan-500/10 flex items-center justify-center animate-spin">
          &bull;
        </div>
        <p>Loading SpecDecode Inference Engine...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 flex flex-col selection:bg-cyan-500/30 selection:text-cyan-200">
      
      {/* 1. Global Navigation Bar */}
      <Navbar
        activeTab={activeTab}
        onTabChange={handleTabChange}
        onTriggerDemo={() => setIsDemoModalOpen(true)}
      />

      {backendError && (
        <div className="px-4 py-2 text-center text-xs font-mono bg-rose-950/60 border-b border-rose-500/40 text-rose-300">
          {backendError}
        </div>
      )}

      {/* 2. Main Tab View Router */}
      <main className="flex-1 pt-4">
        {activeTab === 'overview' && (
          <Overview
            benchmarkData={benchmarkData}
            onTabChange={handleTabChange}
            onTriggerGuidedDemo={() => setIsDemoModalOpen(true)}
          />
        )}

        {activeTab === 'demo' && (
          <LiveDemo
            onTabChange={handleTabChange}
            presetPrompts={presetPrompts}
            targetModels={targetModels}
            draftModels={draftModels}
          />
        )}

        {activeTab === 'benchmark' && (
          <Benchmark
            benchmarkData={benchmarkData}
            onTabChange={handleTabChange}
          />
        )}

        {activeTab === 'how-it-works' && (
          <HowItWorksPage
            onTabChange={handleTabChange}
          />
        )}

        {activeTab === 'architecture' && (
          <Architecture
            onTabChange={handleTabChange}
          />
        )}

        {activeTab === 'about' && (
          <AboutDetails
            onTabChange={handleTabChange}
          />
        )}
      </main>

      {/* 3. Global Footer */}
      <Footer onTabChange={handleTabChange} />

      {/* 4. Automated 20-Second Guided Demo Modal */}
      <DemoModeModal
        isOpen={isDemoModalOpen}
        onClose={() => setIsDemoModalOpen(false)}
        onJumpToPlayground={() => handleTabChange('demo')}
      />

    </div>
  );
}
