'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Brain, Sparkles, ArrowRight } from 'lucide-react';

interface NicheRecommendation {
  primaryNiche: string;
  projectedRpm: string;
  competitionLevel: string;
  sponsorPotential: string;
  suggestedFirstTopic: string;
}

export default function NichePickerPage() {
  const [selectedInterest, setSelectedInterest] = useState('Geopolitics & World Affairs');
  const [selectedGoal, setSelectedGoal] = useState('High Trust & Long-Term Authority');
  const [recommendation, setRecommendation] = useState<NicheRecommendation | null>(null);

  const handlePick = (e: React.FormEvent) => {
    e.preventDefault();
    const isFaith = selectedInterest.includes('Christian') || selectedInterest.includes('Islamic') || selectedInterest.includes('Faith');
    setRecommendation({
      primaryNiche: selectedInterest,
      projectedRpm: selectedInterest.includes('Finance')
        ? 'PKR 280 – PKR 340'
        : isFaith
        ? 'PKR 180 – PKR 260 (Very High Audience Retention & Evergreen Watch Time)'
        : 'PKR 140 – PKR 200',
      competitionLevel: isFaith
        ? 'Low to Medium (High whitespace for premium production quality & heartfelt storytelling)'
        : 'Medium (High whitespace for conversational Roman Urdu & deep explainers)',
      sponsorPotential: isFaith
        ? 'High (Family apps, Publishing, Educational platforms, Community patronages)'
        : 'High (B2B SaaS, FinTech, Books, EdTech integrations)',
      suggestedFirstTopic: selectedInterest.includes('Christian')
        ? '5-Minute Morning Prayer for Strength, Gratitude & Peace'
        : selectedInterest.includes('Islamic')
        ? 'Bedtime Duas & The Story of the Prophet’s Kindness for Kids'
        : `Why [Key Event] Happened: The Ground Reality Explained`,
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
                <Brain className="h-5 w-5" />
              </div>
              <h1 className="text-3xl font-black text-white">YouTube Niche Picker</h1>
            </div>
            <p className="mt-2 text-sm text-slate-400 leading-relaxed">
              Find your ideal content niche based on Pakistani & Global PKR RPM rates, search whitespace, and community monetization potential.
            </p>
          </div>

          <form onSubmit={handlePick} className="rounded-2xl border border-white/10 bg-[#141418] p-6 space-y-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                What topic do you naturally read about or discuss?
              </label>
              <select
                value={selectedInterest}
                onChange={(e) => setSelectedInterest(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-black/40 p-3 text-sm text-slate-100 focus:border-red-500 focus:outline-none"
              >
                <option value="Geopolitics & World Affairs">Geopolitics & National Affairs</option>
                <option value="Personal Finance & Wealth Creation">Personal Finance, Stocks & Crypto</option>
                <option value="Artificial Intelligence & Tech Startups">Artificial Intelligence & Emerging Tech</option>
                <option value="Business Case Studies & Scams">Business Teardowns & Corporate Case Studies</option>
                <option value="Productivity & Self-Growth">Productivity, Books & High Performance</option>
                <option value="Faith & Spirituality / Christian Daily Prayer & Encouragement">
                  Faith & Spirituality / Christian Daily Prayer & Encouragement
                </option>
                <option value="Islamic Content for Children & Families (Moral Stories, Bedtime Duas, Lullabies)">
                  Islamic Content for Children & Families (Moral Stories, Bedtime Duas, Lullabies)
                </option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                What is your primary channel growth goal?
              </label>
              <select
                value={selectedGoal}
                onChange={(e) => setSelectedGoal(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-black/40 p-3 text-sm text-slate-100 focus:border-red-500 focus:outline-none"
              >
                <option value="High Trust & Long-Term Authority">High Trust & Long-Term Intellectual Authority</option>
                <option value="Maximum Monthly AdSense & Brand Sponsorships">Maximum AdSense RPM & Brand Revenue</option>
                <option value="Fast Viral Growth through Shorts & Trending News">Fast Viral Reach across Shorts & Long-Form</option>
              </select>
            </div>

            <button
              type="submit"
              className="btn-shadow inline-flex items-center gap-2 rounded-full bg-[#E50914] px-6 py-2.5 text-xs font-bold text-white hover:bg-[#B91C1C] transition"
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span>Evaluate Niche Strategy</span>
            </button>
          </form>

          {recommendation && (
            <div className="rounded-2xl border border-emerald-500/30 bg-[#141418] p-6 sm:p-8 space-y-6 shadow-xl">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <h3 className="text-xl font-bold text-white">Niche Assessment: {recommendation.primaryNiche}</h3>
                  <p className="text-xs text-slate-400">Strategic channel roadmap</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-black text-emerald-400 font-mono">{recommendation.projectedRpm}</div>
                  <span className="text-[10px] text-slate-400 uppercase font-mono">Estimated India RPM</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4 space-y-1">
                  <span className="text-slate-400 font-bold uppercase">Competition Level</span>
                  <div className="text-sm font-bold text-white">{recommendation.competitionLevel}</div>
                </div>

                <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4 space-y-1">
                  <span className="text-slate-400 font-bold uppercase">Sponsorship Monetization</span>
                  <div className="text-sm font-bold text-white">{recommendation.sponsorPotential}</div>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <span className="text-xs text-slate-400">
                  Ready to launch your first video in this niche?
                </span>
                <Link
                  href="/create"
                  className="btn-shadow inline-flex items-center gap-1.5 rounded-full bg-[#E50914] px-5 py-2 text-xs font-bold text-white hover:bg-[#B91C1C] transition"
                >
                  <span>Build First Video In Studio</span>
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
