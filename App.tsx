
import React, { useState, useCallback } from 'react';
import { PRIMAVERA_ALTERNATIVES_TEXT } from './constants';
import { analyzeAlternatives } from './services/geminiService';
import type { AnalysisResult } from './types';
import { AlternativeCard } from './components/AlternativeCard';
import { MigrationTips } from './components/MigrationTips';
import { BrainCircuitIcon, CodeIcon } from './components/icons';

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);

  const handleAnalyze = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setAnalysisResult(null);
    try {
      const result = await analyzeAlternatives(PRIMAVERA_ALTERNATIVES_TEXT);
      setAnalysisResult(result);
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
      } else {
        setError('An unexpected error occurred.');
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600 mb-2">
            Primavera P6 Alternative Finder
          </h1>
          <p className="text-lg text-slate-400">
            Using Gemini to analyze and structure project management software options.
          </p>
        </header>

        <main>
          {!analysisResult && !isLoading && !error && (
            <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700 shadow-lg">
              <h2 className="text-2xl font-semibold text-cyan-300 mb-4 flex items-center">
                <CodeIcon className="w-6 h-6 mr-3" />
                Raw Data for Analysis
              </h2>
              <div className="max-h-80 overflow-y-auto bg-slate-900 rounded-lg p-4 text-sm text-slate-300 border border-slate-600 mb-6 font-mono whitespace-pre-wrap">
                {PRIMAVERA_ALTERNATIVES_TEXT}
              </div>
              <div className="text-center">
                <button
                  onClick={handleAnalyze}
                  className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold py-3 px-8 rounded-full hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-cyan-300/50 shadow-lg"
                  disabled={isLoading}
                >
                  <span className="flex items-center justify-center">
                    <BrainCircuitIcon className="w-6 h-6 mr-2"/>
                    Analyze with Gemini
                  </span>
                </button>
              </div>
            </div>
          )}

          {isLoading && (
            <div className="flex flex-col items-center justify-center p-12 bg-slate-800/50 rounded-xl border border-slate-700">
              <div className="w-12 h-12 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="text-xl text-slate-300">Analyzing data with Gemini...</p>
              <p className="text-slate-400">This may take a moment.</p>
            </div>
          )}

          {error && (
            <div className="bg-red-900/50 border border-red-700 text-red-200 p-6 rounded-xl">
              <h3 className="text-2xl font-bold mb-2">Analysis Failed</h3>
              <p>{error}</p>
              <button
                onClick={handleAnalyze}
                className="mt-4 bg-red-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-red-700 transition-colors"
              >
                Try Again
              </button>
            </div>
          )}

          {analysisResult && (
            <div className="space-y-12">
              <div>
                <h2 className="text-3xl font-bold text-cyan-300 mb-6 border-b-2 border-cyan-500/30 pb-2">Software Alternatives</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {analysisResult.alternatives.map((alt) => (
                    <AlternativeCard key={alt.name} alternative={alt} />
                  ))}
                </div>
              </div>
              <div>
                <h2 className="text-3xl font-bold text-cyan-300 mb-6 border-b-2 border-cyan-500/30 pb-2">Migration & Cloning Tips</h2>
                <MigrationTips tips={analysisResult.migrationTips} />
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default App;
