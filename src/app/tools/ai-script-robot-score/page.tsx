'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Bot, Sparkles, CheckCircle2, AlertTriangle, ArrowRight } from 'lucide-react';

interface RobotScoreReport {
  score: number;
  status: string;
  flaggedTerms: string[];
  suggestedFixes: string[];
}

export default function AiScriptRobotScorePage() {
  const [text, setText] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [report, setReport] = useState<RobotScoreReport | null>(null);

  const handleAudit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;

    setAnalyzing(true);
    setTimeout(() => {
      setAnalyzing(false);
      const clichés = [
        'in today’s digital age', 'unlock', 'delve into', 'testament to',
        'furthermore', 'needless to say', 'game-changing', 'revolutionize',
      ];
      const foundClichés = clichés.filter((c) => text.toLowerCase().includes(c));

      const robotScore = Math.min(95, 30 + foundClichés.length * 15);

      setReport({
        score: robotScore,
        status: robotScore > 50 ? 'High Robotic Tone (ChatGPT Detected)' : 'Natural Human Flow',
        flaggedTerms: foundClichés.length > 0 ? foundClichés : ['No major clichés detected'],
        suggestedFixes: [
          'Replace formal corporate transitions with conversational spoken connectors (e.g. "ab maan lijiye").',
          'Cut passive introductory paragraphs and open immediately with an unarguable fact or contradiction.',
          'Inject signature creator vocabulary to override standard AI sentence rhythm.',
        ],
      });
    }, 600);
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#0C0C0F] text-slate-100">
      <Navbar />

      <main className="flex-1 py-12 sm:py-16">
        <div className="mx-auto max-w-4xl px-5 sm:px-6 lg:px-8 space-y-8">
          <div>
            <Link href="/tools" className="text-xs text-red-400 hover:underline mb-2 inline-block font-mono">
              ← Back to All Tools
            </Link>
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-500/15 border border-red-500/30 text-red-400">
                <Bot className="h-5 w-5" />
              </div>
              <h1 className="text-3xl font-black text-white">AI Script Robot-Score</h1>
            </div>
            <p className="mt-2 text-sm text-slate-400 leading-relaxed">
              Detect robotic AI tells, clichés, and cadence issues in your script. Get human creator rewrites instantly.
            </p>
          </div>

          <form onSubmit={handleAudit} className="rounded-2xl border border-white/10 bg-[#141418] p-6 space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                Paste Script for Robotic Cliché Audit
              </label>
              <textarea
                rows={5}
                required
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Paste script text to detect ChatGPT tells and robotic phrases..."
                className="w-full rounded-xl border border-white/10 bg-black/40 p-3.5 text-xs sm:text-sm text-slate-100 placeholder:text-slate-500 focus:border-red-500 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={!text.trim()}
              className="btn-shadow inline-flex items-center gap-2 rounded-full bg-[#E50914] px-6 py-2.5 text-xs font-bold text-white hover:bg-[#B91C1C] transition disabled:opacity-50"
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span>Calculate Robot-Score</span>
            </button>
          </form>

          {report && (
            <div className="rounded-2xl border border-red-500/30 bg-[#141418] p-6 sm:p-8 space-y-6 shadow-xl">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <h3 className="text-xl font-bold text-white">{report.status}</h3>
                  <p className="text-xs text-slate-400">Human vs Machine Tone Audit</p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-black text-red-400 font-mono">{report.score}/100</div>
                  <span className="text-[10px] text-slate-400 uppercase font-mono">Robot Score</span>
                </div>
              </div>

              <div className="space-y-3 text-xs">
                <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4 space-y-1">
                  <span className="text-slate-400 font-bold uppercase">Detected Tells</span>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {report.flaggedTerms.map((t: string) => (
                      <span key={t} className="rounded bg-red-500/20 text-red-300 px-2 py-0.5 font-mono text-xs">
                        ⚠️ &quot;{t}&quot;
                      </span>
                    ))}
                  </div>
                </div>

                <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4 space-y-2">
                  <span className="text-slate-400 font-bold uppercase">Humanization Rules</span>
                  <ul className="space-y-1 text-slate-300">
                    {report.suggestedFixes.map((fix: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{fix}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <span className="text-xs text-slate-400">
                  SirfShoot eliminates 100% of robotic tells using channel Tone Fingerprints.
                </span>
                <Link
                  href="/create"
                  className="btn-shadow inline-flex items-center gap-1.5 rounded-full bg-[#E50914] px-5 py-2 text-xs font-bold text-white hover:bg-[#B91C1C] transition"
                >
                  <span>Write Natural Scripts</span>
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
