import React from 'react';
import { ShieldCheck, AlertTriangle, FileSearch } from 'lucide-react';

export default function Hero() {
  return (
    <header className="text-center py-6">
      <div className="inline-flex items-center justify-center p-2 bg-brand-500/10 rounded-2xl mb-6 ring-1 ring-brand-500/30">
        <ShieldCheck className="w-8 h-8 text-brand-400 mr-2" />
        <span className="text-brand-300 font-semibold tracking-wide uppercase text-sm">AI-Powered Protection</span>
      </div>
      
      <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">
        Fake Internship <br />
        <span className="text-gradient">Poster Detector</span>
      </h1>
      
      <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-8 leading-relaxed">
        Don't fall for scams. Upload a poster or screenshot of an internship offer, and our analyzer will instantly detect red flags, fraudulent language, and suspicious patterns.
      </p>

      <div className="flex flex-wrap justify-center gap-6 text-sm text-slate-400">
        <div className="flex items-center gap-2">
          <FileSearch className="w-5 h-5 text-brand-400" />
          <span>Real-time Text Extraction</span>
        </div>
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-amber-400" />
          <span>Heuristic Scam Detection</span>
        </div>
      </div>
    </header>
  );
}
