'use client';

import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import {
  Fingerprint,
  Search,
  Zap,
  BarChart2,
  FileImage,
  Type,
  Bot,
  Brain,
  Calculator,
  FileText,
  HelpCircle,
  ShieldCheck,
  ArrowUpRight,
  Sparkles,
} from 'lucide-react';

export default function ToolsDirectoryPage() {
  const tools = [
    {
      id: 'tone-fingerprint',
      title: 'Tone Fingerprint Preview',
      desc: 'Paste any YouTube URL or transcript → 7-signal voice breakdown in 30 sec with Hinglish ratio & signature transitions.',
      icon: Fingerprint,
      badge: 'Popular',
      link: '/tools/tone-fingerprint',
    },
    {
      id: 'youtube-seo-grader',
      title: 'YouTube SEO Grader',
      desc: 'Paste video title & description → 9-dimension SEO grade + ranked fix list + AEO AI Overview score.',
      icon: Search,
      badge: 'High Impact',
      link: '/tools/youtube-seo-grader',
    },
    {
      id: 'hook-generator',
      title: '3-Sec Hook Generator',
      desc: 'Niche + topic + language → 3 cold-open hook formats. Eliminates boring "Hey guys" openings completely.',
      icon: Zap,
      badge: 'Viral Retention',
      link: '/tools/hook-generator',
    },
    {
      id: 'title-tester',
      title: 'Title CTR Predictor',
      desc: 'Paste 1-3 title variants → CTR estimation + curiosity gap score + search ranking potential.',
      icon: BarChart2,
      badge: 'A/B Testing',
      link: '/tools/title-tester',
    },
    {
      id: 'thumbnail-ideas',
      title: 'Thumbnail Ideas Generator',
      desc: 'Topic + niche → 3 thumbnail concepts (Safe, Bold, Experimental) + ready Midjourney & DALL-E prompts.',
      icon: FileImage,
      badge: 'Designer AI',
      link: '/tools/thumbnail-ideas',
    },
    {
      id: 'hinglish-ratio',
      title: 'Hinglish Ratio Analyzer',
      desc: 'Paste script text → Hindi/English word mix ratio + niche-fit score. Runs 100% in browser.',
      icon: Type,
      badge: 'Language Match',
      link: '/tools/hinglish-ratio',
    },
    {
      id: 'ai-script-robot-score',
      title: 'AI Script Robot-Score',
      desc: 'Paste any script → Detects robotic AI clichés (0–100 score) and provides human creator rewrites.',
      icon: Bot,
      badge: 'Humanizer',
      link: '/tools/ai-script-robot-score',
    },
    {
      id: 'niche-picker',
      title: 'YouTube Niche Picker',
      desc: '7 quick questions → 3 best-fit niches with India CPM context, competition analysis, and growth trajectory.',
      icon: Brain,
      badge: 'Channel Strategy',
      link: '/tools/niche-picker',
    },
    {
      id: 'youtube-income-calculator',
      title: 'YouTube Income Calculator',
      desc: 'Estimate Indian channel earnings across AdSense, YouTube Shorts fund, brand sponsorships & affiliate revenue.',
      icon: Calculator,
      badge: 'Revenue Estimator',
      link: '/tools/youtube-income-calculator',
    },
    {
      id: 'templates',
      title: 'Hinglish Script Template Pack',
      desc: '30 high-retention script structures across 10 niches (commentary, finance, gaming, startups).',
      icon: FileText,
      badge: 'Free Pack',
      link: '/tools/templates',
    },
    {
      id: 'quiz',
      title: 'What Kind of YouTuber Are You?',
      desc: '7 quick questions → Identifies your creator archetype + recommended production workflow & cadence.',
      icon: HelpCircle,
      badge: 'Creator Quiz',
      link: '/tools/quiz',
    },
    {
      id: 'sebi-cheatsheet',
      title: 'SECP-Safe Phrasing Cheatsheet',
      desc: 'For Pakistani finance creators: 20 risky trigger words → SECP-safe rewrites and disclaimer templates.',
      icon: ShieldCheck,
      badge: 'Compliance',
      link: '/tools/sebi-cheatsheet',
    },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-[#0C0C0F] text-slate-100">
      <Navbar />

      <main className="flex-1 py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8 space-y-12">
          {/* Header */}
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-red-400">
              <Sparkles className="h-3.5 w-3.5" />
              <span>FREE TOOLS · HINGLISH-AWARE · 100% FREE TO USE</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight leading-tight">
              Free YouTube tools <span className="gradient-text">built for Indian creators</span>.
            </h1>
            <p className="text-base sm:text-lg text-slate-400 leading-relaxed">
              Powered by the exact same 9-agent intelligence engine that writes SirfShoot scripts. Hinglish-first, fast, and engineered for high retention.
            </p>
          </div>

          {/* 12 Tools Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tools.map((t) => {
              const ToolIcon = t.icon;
              return (
                <Link
                  key={t.id}
                  href={t.link}
                  className="group relative flex flex-col justify-between rounded-2xl border border-white/10 bg-[#141418] p-6 transition-all hover:-translate-y-1 hover:border-[#E50914]/50 hover:bg-white/[0.04] shadow-lg"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E50914]/15 border border-[#E50914]/30 text-[#E50914]">
                        <ToolIcon className="h-5 w-5" />
                      </div>
                      <span className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] font-mono font-bold text-slate-300">
                        {t.badge}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-white group-hover:text-red-400 transition-colors">
                      {t.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                      {t.desc}
                    </p>
                  </div>

                  <div className="pt-6 border-t border-white/5 flex items-center justify-between text-xs font-bold text-red-400">
                    <span>Open Free Tool</span>
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Bottom Callout Banner */}
          <div className="rounded-3xl border border-white/10 bg-gradient-to-r from-red-950/40 via-slate-900 to-slate-900 p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center sm:text-left">
              <h3 className="text-xl sm:text-2xl font-black text-white">
                Want all 9 agents running automatically on every video?
              </h3>
              <p className="text-xs sm:text-sm text-slate-400">
                Start your 7-day free trial on SirfShoot. 2 full scripts included, no credit card required.
              </p>
            </div>
            <Link
              href="/create"
              className="btn-shadow shrink-0 inline-flex items-center gap-2 rounded-full bg-[#E50914] px-7 py-3 text-sm font-bold text-white hover:bg-[#B91C1C] transition"
            >
              <span>Launch Studio Free</span>
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
