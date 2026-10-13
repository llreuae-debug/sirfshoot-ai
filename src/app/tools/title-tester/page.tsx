'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { BarChart2, Sparkles, ArrowRight, CheckCircle2, AlertTriangle, Smartphone, Monitor } from 'lucide-react';
import { checkTitle, TitleCheckResult } from '@/lib/tools/title';

export default function TitleTesterPage() {
  const [titleInput, setTitleInput] = useState('');
  const [thumbInput, setThumbInput] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<TitleCheckResult | null>(null);

  const handleTest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!titleInput.trim()) return;
    setAnalyzing(true);
    setTimeout(() => {
      setAnalyzing(false);
      const res = checkTitle(titleInput, thumbInput.trim() || undefined);
      setResult(res);
    }, 250);
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-emerald-400';
    if (score >= 60) return 'text-amber-400';
    return 'text-red-400';
  };

  const getScoreBand = (score: number) => {
    if (score >= 80) return 'High Retention & Search Packaging';
    if (score >= 60) return 'Workable · Few Lint Warnings';
    return 'Needs Revision · Truncation / Vague Keywords';
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
              <h1 className="text-3xl font-black text-white">Title Score & Linter</h1>
            </div>
            <p className="mt-2 text-sm text-slate-400 leading-relaxed">
              Deterministic title scoring engine: checks mobile 40-character feed cuts, desktop 60-character truncation, emotional contrast, vague buzzword linting, and thumbnail text de-duplication.
            </p>
          </div>

          <form onSubmit={handleTest} className="rounded-2xl border border-white/10 bg-[#141418] p-6 space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                YouTube Title to Lint
              </label>
              <input
                type="text"
                required
                value={titleInput}
                onChange={(e) => setTitleInput(e.target.value)}
                placeholder="e.g. Future of IT Exports: What TV News Won’t Tell You (2026 Ground Reality)"
                className="w-full rounded-xl border border-white/10 bg-black/40 p-3 text-sm text-slate-100 placeholder:text-slate-500 focus:border-red-500 focus:outline-none"
              />
              <div className="mt-1.5 flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span>Length: {titleInput.length} chars</span>
                <span>Mobile Cut: 40 chars · Desktop Cut: 60 chars</span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                Thumbnail Overlay Text (Optional)
              </label>
              <input
                type="text"
                value={thumbInput}
                onChange={(e) => setThumbInput(e.target.value)}
                placeholder="e.g. 24% REALITY OR HYPE? (Checks word repetition with title)"
                className="w-full rounded-xl border border-white/10 bg-black/40 p-3 text-sm text-slate-100 placeholder:text-slate-500 focus:border-red-500 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={analyzing || !titleInput.trim()}
              className="btn-shadow inline-flex items-center gap-2 rounded-full bg-[#E50914] px-6 py-2.5 text-xs font-bold text-white hover:bg-[#B91C1C] transition disabled:opacity-50 cursor-pointer"
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span>{analyzing ? 'Linting Title Heuristics...' : 'Audit & Score Title'}</span>
            </button>
          </form>

          {result && (
            <div className="rounded-2xl border border-white/10 bg-[#141418] p-6 sm:p-8 space-y-6 shadow-xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
                <div>
                  <h3 className="text-xl font-bold text-white">Title Quality Score</h3>
                  <p className="text-xs text-slate-400">{getScoreBand(result.score)}</p>
                </div>
                <div className="text-left sm:text-right">
                  <div className={`text-4xl font-black font-mono ${getScoreColor(result.score)}`}>
                    {result.score} <span className="text-base text-slate-400 font-sans">/ 100</span>
                  </div>
                  <span className="text-[10px] text-slate-400 uppercase font-mono">Deterministic Score</span>
                </div>
              </div>

              {/* Feed Previews */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4 space-y-2">
                  <div className="flex items-center gap-1.5 text-slate-300 font-bold uppercase text-[11px]">
                    <Smartphone className="h-3.5 w-3.5 text-amber-400" />
                    <span>Mobile Feed Cut (First 40 chars)</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-black/50 border border-white/5 font-mono text-slate-200">
                    {result.title.length > 40 ? `${result.title.slice(0, 40)}...` : result.title}
                  </div>
                  <p className="text-[11px] text-slate-400">
                    {result.title.length > 40 ? 'Mobile feeds truncate beyond this point.' : 'Complete title survives full mobile display.'}
                  </p>
                </div>

                <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4 space-y-2">
                  <div className="flex items-center gap-1.5 text-slate-300 font-bold uppercase text-[11px]">
                    <Monitor className="h-3.5 w-3.5 text-blue-400" />
                    <span>Desktop Search View (First 60 chars)</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-black/50 border border-white/5 font-mono text-slate-200">
                    {result.title.length > 60 ? `${result.title.slice(0, 60)}...` : result.title}
                  </div>
                  <p className="text-[11px] text-slate-400">
                    {result.title.length > 60 ? 'Desktop results cut titles after 60 characters.' : 'Optimal length inside desktop cutoff.'}
                  </p>
                </div>
              </div>

              {/* Strengths & Issues */}
              <div className="space-y-4">
                {result.good.length > 0 && (
                  <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4 space-y-2">
                    <span className="text-emerald-400 font-bold text-xs uppercase tracking-wide">
                      Verified Strengths ({result.good.length})
                    </span>
                    <ul className="space-y-1 text-xs text-slate-300">
                      {result.good.map((g, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{g}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {result.issues.length > 0 ? (
                  <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-4 space-y-2">
                    <span className="text-amber-400 font-bold text-xs uppercase tracking-wide">
                      Linter Warnings & Fixes ({result.issues.length})
                    </span>
                    <ul className="space-y-1.5 text-xs text-slate-300">
                      {result.issues.map(([code, msg], idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <AlertTriangle className="h-3.5 w-3.5 text-amber-400 shrink-0 mt-0.5" />
                          <span><strong className="uppercase font-mono text-[10px] text-amber-300">[{code}]</strong> {msg}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3 text-xs text-emerald-300 font-bold">
                    ✓ Zero linter warnings detected! High-clarity, non-spammy phrasing.
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
                <span className="text-xs text-slate-400">
                  Generate complete title variations and 9-agent video packages in Creative Studio.
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
