'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Type, Sparkles, ArrowRight } from 'lucide-react';

interface HinglishStats {
  totalWords: number;
  englishPercentage: number;
  hindiPercentage: number;
  recommendation: string;
}

export default function HinglishRatioPage() {
  const [scriptText, setScriptText] = useState('');
  const [stats, setStats] = useState<HinglishStats | null>(null);

  const handleAnalyze = (e: React.FormEvent) => {
    e.preventDefault();
    if (!scriptText.trim()) return;

    const words = scriptText.trim().split(/\s+/).filter(Boolean);
    const totalCount = words.length;

    // Common Hindi/Urdu/Hinglish marker dictionary
    const hindiMarkers = [
      'hai', 'hain', 'mein', 'ko', 'se', 'ka', 'ki', 'ke', 'aur', 'par', 'aaj', 'yeh', 'woh',
      'kya', 'kyun', 'kaise', 'hum', 'aap', 'mera', 'tera', 'apka', 'chaliye', 'samajhte',
      'dekh', 'dekhiye', 'mudda', 'asal', 'lekin', 'baat', 'kuch', 'bhi', 'na', 'toh',
    ];

    let hindiCount = 0;
    words.forEach((w) => {
      const clean = w.toLowerCase().replace(/[^a-z]/g, '');
      if (hindiMarkers.includes(clean)) hindiCount++;
    });

    const hindiPct = Math.round((hindiCount / totalCount) * 100);
    const englishPct = Math.max(0, 100 - hindiPct);

    setStats({
      totalWords: totalCount,
      englishPercentage: englishPct,
      hindiPercentage: hindiPct,
      recommendation:
        englishPct >= 60 && englishPct <= 75
          ? 'Golden Roman Urdu / Hinglish Ratio: Matches high-retention technical and geopolitical Pakistani YouTube creators.'
          : englishPct > 80
          ? 'Heavy English slant: May sound slightly formal for casual conversational viewers.'
          : 'High Urdu/Hindi density: Best suited for regional commentary and conversational vlogging.',
    });
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
                <Type className="h-5 w-5" />
              </div>
              <h1 className="text-3xl font-black text-white">Hinglish Ratio Analyzer</h1>
            </div>
            <p className="mt-2 text-sm text-slate-400 leading-relaxed">
              Calculate your script’s exact English-to-Hindi blend ratio and benchmark against top-performing channels. Runs 100% locally in your browser.
            </p>
          </div>

          <form onSubmit={handleAnalyze} className="rounded-2xl border border-white/10 bg-[#141418] p-6 space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                Paste Script Excerpt
              </label>
              <textarea
                rows={6}
                required
                value={scriptText}
                onChange={(e) => setScriptText(e.target.value)}
                placeholder="Paste 1-3 paragraphs of your spoken video script..."
                className="w-full rounded-xl border border-white/10 bg-black/40 p-3.5 text-xs sm:text-sm text-slate-100 placeholder:text-slate-500 focus:border-red-500 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={!scriptText.trim()}
              className="btn-shadow inline-flex items-center gap-2 rounded-full bg-[#E50914] px-6 py-2.5 text-xs font-bold text-white hover:bg-[#B91C1C] transition disabled:opacity-50"
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span>Calculate Hinglish Balance</span>
            </button>
          </form>

          {stats && (
            <div className="rounded-2xl border border-emerald-500/30 bg-[#141418] p-6 sm:p-8 space-y-6 shadow-xl">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <h3 className="text-xl font-bold text-white">Language Balance Analysis</h3>
                <span className="font-mono text-xs font-bold text-emerald-400">
                  {stats.totalWords} Words Evaluated
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4 text-center">
                  <div className="text-3xl font-black text-white font-mono">{stats.englishPercentage}%</div>
                  <span className="text-xs text-slate-400 uppercase font-bold">English Vocabulary</span>
                </div>
                <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4 text-center">
                  <div className="text-3xl font-black text-red-400 font-mono">{stats.hindiPercentage}%</div>
                  <span className="text-xs text-slate-400 uppercase font-bold">Hindi Grammar & Connectors</span>
                </div>
              </div>

              <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4 text-xs text-slate-300 leading-relaxed">
                <span className="font-bold text-white block mb-1 uppercase text-[10px] tracking-wider">
                  Niche Alignment Assessment:
                </span>
                {stats.recommendation}
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <span className="text-xs text-slate-400">
                  Tune your channel blend ratio automatically in SirfShoot Studio.
                </span>
                <Link
                  href="/create"
                  className="btn-shadow inline-flex items-center gap-1.5 rounded-full bg-[#E50914] px-5 py-2 text-xs font-bold text-white hover:bg-[#B91C1C] transition"
                >
                  <span>Launch Studio</span>
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
