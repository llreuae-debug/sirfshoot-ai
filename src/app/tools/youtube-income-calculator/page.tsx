'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Calculator, Banknote, ArrowRight } from 'lucide-react';

export default function YouTubeIncomeCalculatorPage() {
  const [longViews, setLongViews] = useState(250000);
  const [shortsViews, setShortsViews] = useState(1000000);
  const [niche, setNiche] = useState('Geopolitics & Commentary');
  const [sponsorsCount, setSponsorsCount] = useState(1);

  // RPM rates in PKR per 1000 long-form views
  const rpmRates: Record<string, number> = {
    'Finance & Investing': 320,
    'Technology & AI': 240,
    'Geopolitics & Commentary': 160,
    'Startups & Business': 280,
    'Lifestyle & Vlogging': 80,
    'Gaming': 70,
  };

  const selectedRpm = rpmRates[niche] || 160;
  const longEarnings = Math.round((longViews / 1000) * selectedRpm);
  const shortsEarnings = Math.round((shortsViews / 1000) * 3.5); // ~PKR 3.50 per 1k shorts views in Pakistan
  const sponsorshipRate = Math.round((longViews / 1000) * 180); // Standard Pakistani creator brand integration rate
  const sponsorEarnings = sponsorsCount * sponsorshipRate;

  const totalMonthly = longEarnings + shortsEarnings + sponsorEarnings;
  const totalAnnual = totalMonthly * 12;

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
                <Calculator className="h-5 w-5" />
              </div>
              <h1 className="text-3xl font-black text-white">YouTube Income Calculator for Pakistani Creators</h1>
            </div>
            <p className="mt-2 text-sm text-slate-400 leading-relaxed">
              Estimate your monthly channel income in Pakistani Rupees (PKR) based on realistic regional RPM data, AdSense, YouTube Shorts, and brand sponsorships.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {/* Input Controls */}
            <div className="md:col-span-7 rounded-2xl border border-white/10 bg-[#141418] p-6 space-y-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                  Content Niche
                </label>
                <select
                  value={niche}
                  onChange={(e) => setNiche(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-black/40 p-2.5 text-xs text-slate-200 focus:border-red-500 focus:outline-none"
                >
                  <option value="Geopolitics & Commentary">Geopolitics & News (~PKR 160 RPM)</option>
                  <option value="Finance & Investing">Finance & Investing (~PKR 320 RPM)</option>
                  <option value="Technology & AI">Technology & AI (~PKR 240 RPM)</option>
                  <option value="Startups & Business">Startups & Business (~PKR 280 RPM)</option>
                  <option value="Lifestyle & Vlogging">Lifestyle & Vlogging (~PKR 80 RPM)</option>
                  <option value="Gaming">Gaming (~PKR 70 RPM)</option>
                </select>
              </div>

              {/* Long Form Views */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300 font-bold">Monthly Long-Form Video Views</span>
                  <span className="font-mono text-red-400 font-bold">{longViews.toLocaleString('en-PK')}</span>
                </div>
                <input
                  type="range"
                  min="10000"
                  max="3000000"
                  step="10000"
                  value={longViews}
                  onChange={(e) => setLongViews(Number(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg accent-[#E50914] cursor-pointer"
                />
              </div>

              {/* Shorts Views */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300 font-bold">Monthly YouTube Shorts Views</span>
                  <span className="font-mono text-red-400 font-bold">{shortsViews.toLocaleString('en-PK')}</span>
                </div>
                <input
                  type="range"
                  min="50000"
                  max="10000000"
                  step="50000"
                  value={shortsViews}
                  onChange={(e) => setShortsViews(Number(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg accent-[#E50914] cursor-pointer"
                />
              </div>

              {/* Brand Deals */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300 font-bold">Brand Integrations / Month</span>
                  <span className="font-mono text-red-400 font-bold">{sponsorsCount} Deals</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="5"
                  step="1"
                  value={sponsorsCount}
                  onChange={(e) => setSponsorsCount(Number(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg accent-[#E50914] cursor-pointer"
                />
              </div>
            </div>

            {/* Income Breakdown Card */}
            <div className="md:col-span-5 rounded-2xl border border-red-500/30 bg-[#141418] p-6 space-y-6 flex flex-col justify-between shadow-xl">
              <div className="space-y-4">
                <span className="text-xs font-mono uppercase tracking-wider text-red-400 font-bold flex items-center gap-1.5">
                  <Banknote className="h-4 w-4" />
                  Estimated Channel Earnings (PKR)
                </span>

                <div className="border-b border-white/10 pb-4">
                  <div className="text-3xl sm:text-4xl font-black text-white font-mono">
                    PKR {totalMonthly.toLocaleString('en-PK')}
                  </div>
                  <div className="text-xs text-slate-400 mt-1">Per month estimated net income</div>
                </div>

                <div className="space-y-2.5 text-xs">
                  <div className="flex justify-between text-slate-300">
                    <span>AdSense (Long-form):</span>
                    <span className="font-mono font-bold text-white">PKR {longEarnings.toLocaleString('en-PK')}</span>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>Shorts Feed Revenue:</span>
                    <span className="font-mono font-bold text-white">PKR {shortsEarnings.toLocaleString('en-PK')}</span>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>Brand Sponsorships:</span>
                    <span className="font-mono font-bold text-white">PKR {sponsorEarnings.toLocaleString('en-PK')}</span>
                  </div>
                  <div className="pt-2 border-t border-white/10 flex justify-between text-emerald-400 font-bold">
                    <span>Annual Projected:</span>
                    <span className="font-mono text-sm">PKR {totalAnnual.toLocaleString('en-PK')}</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10">
                <Link
                  href="/create"
                  className="btn-shadow w-full inline-flex items-center justify-center gap-1.5 rounded-full bg-[#E50914] py-2.5 text-xs font-bold text-white hover:bg-[#B91C1C] transition"
                >
                  <span>Produce High-RPM Scripts with Tameeros Shorts</span>
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
