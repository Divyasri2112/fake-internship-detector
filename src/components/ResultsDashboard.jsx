import React from 'react';
import { Target, CheckCircle, XCircle, AlertPolygon, ShieldAlert, BadgeCheck } from 'lucide-react';
import clsx from 'clsx';

export default function ResultsDashboard({ results, isAnalyzing }) {
  if (isAnalyzing) {
    return (
      <div className="glass-panel p-6 h-full flex flex-col justify-center items-center text-center">
        <div className="w-24 h-24 mb-6 relative">
          <div className="absolute inset-0 border-4 border-slate-700/50 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-brand-400 rounded-full border-t-transparent animate-spin"></div>
          <Target className="absolute inset-0 m-auto text-brand-300 w-8 h-8 animate-pulse" />
        </div>
        <h3 className="text-2xl font-bold mb-2">Analyzing Poster...</h3>
        <p className="text-slate-400 max-w-sm">
          Extracting text and scanning for known fraudulent patterns, restricted keywords, and scam heuristics.
        </p>
      </div>
    );
  }

  if (!results) {
    return (
      <div className="glass-panel p-6 h-full flex flex-col justify-center items-center text-center opacity-50">
        <Target className="w-16 h-16 text-slate-500 mb-4" />
        <h3 className="text-xl font-medium text-slate-300 mb-2">Awaiting Image</h3>
        <p className="text-slate-400">Upload an internship poster to see the analysis results here.</p>
      </div>
    );
  }

  const isFake = results.verdict === 'Fake';

  return (
    <div className="glass-panel p-6 h-full flex flex-col gap-6">
      <div className="flex justify-between items-center pb-4 border-b border-slate-700/50">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Target className="text-brand-400 w-5 h-5" />
          Analysis Results
        </h2>
        <div className="px-3 py-1 bg-slate-800 rounded-full text-xs font-medium text-slate-400 border border-slate-700">
          Confidence: {results.confidence}%
        </div>
      </div>

      <div className={clsx(
        "flex items-center gap-6 p-6 rounded-2xl border",
        isFake 
          ? "bg-danger-surface border-danger-border" 
          : "bg-success-surface border-success-border"
      )}>
        <div className={clsx(
          "p-4 rounded-full",
          isFake ? "bg-red-500/20 text-red-400" : "bg-emerald-500/20 text-emerald-400"
        )}>
          {isFake ? <XCircle className="w-12 h-12" /> : <CheckCircle className="w-12 h-12" />}
        </div>
        
        <div>
          <h3 className="text-3xl font-bold mb-1">
            {isFake ? "Likely Fake" : "Looks Legitimate"}
          </h3>
          <p className={clsx(
            "text-sm font-medium",
            isFake ? "text-red-300/80" : "text-emerald-300/80"
          )}>
            Authenticity Score: <span className="text-lg font-bold">{results.score}/100</span>
          </p>
        </div>
      </div>

      <div className="flex-1">
        <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-400 mb-4 flex items-center gap-2">
          {isFake ? <ShieldAlert className="w-4 h-4" /> : <BadgeCheck className="w-4 h-4" />}
          {isFake ? "Detected Red Flags" : "Safety Checks Passed"}
        </h4>
        
        {results.flags.length > 0 ? (
          <ul className="space-y-3">
            {results.flags.map((flag, index) => (
              <li key={index} className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-4 flex gap-3">
                <AlertPolygon className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h5 className="font-medium text-amber-300/90 text-sm mb-1">{flag.type}</h5>
                  <p className="text-sm text-slate-300">{flag.rule}</p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="bg-slate-800/30 border border-slate-700/30 rounded-xl p-6 text-center">
            <CheckCircle className="w-8 h-8 text-emerald-500/50 mx-auto mb-2" />
            <p className="text-slate-400 text-sm">No suspicious patterns detected in the provided text.</p>
          </div>
        )}
      </div>

      {results.extractedText && (
        <div className="mt-auto pt-4 border-t border-slate-700/50">
          <p className="text-xs font-medium uppercase tracking-wider text-slate-500 mb-2">Extracted Text Preview</p>
          <div className="bg-black/30 rounded-lg p-3 text-xs text-slate-400 font-mono h-20 overflow-y-auto border border-slate-800">
            {results.extractedText}
          </div>
        </div>
      )}
    </div>
  );
}
