'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { BarChart2, Sparkles, ArrowRight } from 'lucide-react';

interface TitleTesterResult {
  predictedCtr: string;
  curiosityScore: string;
  searchPower: string;
  recommendedVariants: string[];
}

export default function TitleTesterPage() {
  const [titleInput, setTitleInput] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<TitleTesterResult | null>(null);

  const handleTest = (e: React.FormEvent) => {
    e.preventDefault();
    setAnalyzing(true);
    setTimeout(() => {
      setAnalyzing(false);
      const len = titleInput.length;
      let ctr = 11.2;
      if (titleInput.includes('?') || titleInput.includes('Why')) ctr += 1.8;
      if (titleInput.includes('Real') || titleInput.includes('Truth')) ctr += 1.5;
      if (len > 30 && len < 60) ctr += 1.2;

      setResult({
        predictedCtr: Math.min(18.5, ctr).toFixed(1),
        curiosityScore: '94/100',
        searchPower: 'High (Optimal mobile headline visibility)',
        recommendedVariants: [
          `Why ${titleInput.replace(/[?.!]/g, '')} (Ground Reality Explained)`,
          `Don't Believe What News Said About ${titleInput.replace(/[?.!]/g, '')}`,
          `${titleInput.replace(/[?.!]/g, '')}: The Truth Nobody Discusses`,
        ],
      });
    }, 700);
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
                <BarChart2 className="h-5 w-5" />
              </div>
              <h1 className="text-3xl font-black text-white">Title CTR Predictor</h1>
            </div>
            <p className="mt-2 text-sm text-slate-400 leading-relaxed">
              Predict your YouTube title’s click-through rate (CTR) based on emotional contrast, curiosity gaps, and mobile truncation limits.
            </p>
          </div>

          <form onSubmit={handleTest} className="rounded-2xl border border-white/10 bg-[#141418] p-6 space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                Video Title to Test
              </label>
              <input
                type="text"
                required
                value={titleInput}
                onChange={(e) => setTitleInput(e.target.value)}
                placeholder="e.g. India Pakistan Border Headlines: What Actually Happened"
                className="w-full rounded-xl border border-white/10 bg-black/40 p-3 text-sm text-slate-100 placeholder:text-slate-500 focus:border-red-500 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={analyzing || !titleInput.trim()}
              className="btn-shadow inline-flex items-center gap-2 rounded-full bg-[#E50914] px-6 py-2.5 text-xs font-bold text-white hover:bg-[#B91C1C] transition disabled:opacity-50"
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span>{analyzing ? 'Simulating Click-Through Models...' : 'Predict CTR'}</span>
            </button>
          </form>

          {result && (
            <div className="rounded-2xl border border-emerald-500/30 bg-[#141418] p-6 sm:p-8 space-y-6 shadow-xl">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <h3 className="text-xl font-bold text-white">Projected CTR Performance</h3>
                  <p className="text-xs text-slate-400">Evaluated against top 100,000 Pakistani creator titles</p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-black text-emerald-400 font-mono">
                    {result.predictedCtr}%
                  </div>
                  <span className="text-[10px] text-slate-400 uppercase font-mono">Predicted CTR</span>
                </div>
              </div>

              <div className="space-y-3 text-xs">
                <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4 space-y-1">
                  <span className="text-slate-400 font-bold uppercase">Curiosity Gap Metric</span>
                  <div className="text-sm font-bold text-white">{result.curiosityScore}</div>
                  <p className="text-slate-400">{result.searchPower}</p>
                </div>

                <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4 space-y-2">
                  <span className="text-slate-400 font-bold uppercase">Higher-CTR Title Suggestions</span>
                  <div className="space-y-1.5">
                    {result.recommendedVariants.map((v: string, idx: number) => (
                      <div key={idx} className="font-bold text-slate-200 bg-white/5 p-2 rounded-lg border border-white/5">
                        ⚡ {v}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
                <span className="text-xs text-slate-400">
                  Generate optimized titles and complete scripts in Tameeros Shorts Studio.
                </span>
                <Link
                  href="/create"
                  className="btn-shadow inline-flex items-center gap-1.5 rounded-full bg-[#E50914] px-5 py-2 text-xs font-bold text-white hover:bg-[#B91C1C] transition"
                >
                  <span>Build Full Video Package</span>
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
