import React from 'react';
import { Code, BookOpen, AlertOctagon, MailWarning, DollarSign } from 'lucide-react';

export default function Methodology() {
  const rules = [
    {
      icon: <MailWarning className="w-6 h-6 text-indigo-400" />,
      title: "Suspicious Email Domains",
      desc: "Legitimate corporations rarely use @gmail.com or @yahoo.com for official hiring. We flag non-corporate email addresses."
    },
    {
      icon: <DollarSign className="w-6 h-6 text-rose-400" />,
      title: "Requests for Payment",
      desc: "An internship should pay you, or at least be free. Phrases like 'registration fee', 'processing cost', or 'deposit required' are major red flags."
    },
    {
      icon: <AlertOctagon className="w-6 h-6 text-amber-400" />,
      title: "Excessive Urgency & Over-promises",
      desc: "Scams often create false urgency ('apply within 24 hours') or make impossible promises ('100% Guaranteed Placement')."
    }
  ];

  return (
    <section className="mt-12 glass-panel p-8">
      <div className="flex items-center gap-3 mb-6 border-b border-slate-700/50 pb-4">
        <BookOpen className="w-6 h-6 text-brand-400" />
        <h2 className="text-2xl font-bold">How It Works: The Methodology</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div>
          <p className="text-slate-300 leading-relaxed mb-6 font-medium">
            This tool uses a two-step process to identify fraudulent internship offers without needing a complex backend server. Everything runs entirely in your browser to protect your privacy.
          </p>
          
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-brand-500/20 text-brand-400 flex items-center justify-center font-bold flex-shrink-0 border border-brand-500/30">1</div>
              <div>
                <h3 className="font-semibold text-lg text-brand-200 mb-1">Optical Text Extraction</h3>
                <p className="text-sm text-slate-400">
                  We use <code className="bg-slate-800 text-brand-300 px-1 py-0.5 rounded">Tesseract.js</code>, a powerful client-side OCR library, to "read" the image you upload and convert it into machine-readable text.
                </p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold flex-shrink-0 border border-emerald-500/30">2</div>
              <div>
                <h3 className="font-semibold text-lg text-emerald-200 mb-1">Heuristics Engine</h3>
                <p className="text-sm text-slate-400">
                  The extracted text is then passed through our rules-based Natural Language engine. We score the text based on common scam patterns (heuristics) identified by career experts.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-slate-800/40 rounded-2xl p-6 border border-slate-700/50">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Code className="w-5 h-5 text-slate-400" /> Key Indicators Checked
          </h3>
          <div className="space-y-4">
            {rules.map((rule, idx) => (
              <div key={idx} className="flex gap-4 bg-slate-900/50 p-4 rounded-xl">
                <div className="flex-shrink-0">{rule.icon}</div>
                <div>
                  <h4 className="font-medium text-slate-200 mb-1">{rule.title}</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">{rule.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
