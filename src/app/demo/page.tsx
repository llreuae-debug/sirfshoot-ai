'use client';

import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Play, Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function DemoPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#0C0C0F] text-white">
      <Navbar />

      <main className="flex-1 py-14 sm:py-20">
        <div className="mx-auto max-w-5xl px-5 sm:px-6 lg:px-8 space-y-10 text-center">
          <div className="max-w-3xl mx-auto space-y-4">
            <span className="rounded-full bg-red-500/20 px-3.5 py-1 text-xs font-bold uppercase tracking-widest text-red-400">
              Interactive Product Walkthrough
            </span>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              Watch SirfShoot in Action.
            </h1>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              See how a single video idea turns into a complete 9-agent production bundle — research, script in your tone, storyboard, thumbnail concepts, SEO, and shorts in ~3 minutes.
            </p>
          </div>

          {/* Interactive Player Box */}
          <div className="rounded-3xl border border-white/10 bg-[#141418] p-4 sm:p-8 card-shadow shadow-2xl overflow-hidden text-left space-y-6">
            <div className="aspect-video w-full rounded-2xl bg-gradient-to-br from-slate-950 via-slate-900 to-black border border-white/10 relative flex items-center justify-center overflow-hidden">
              <div className="text-center space-y-4 p-6">
                <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-[#E50914] text-white shadow-xl shadow-red-500/30">
                  <Play className="h-8 w-8 ml-1 fill-white" />
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-white">
                  9-Agent Pipeline Interactive Demo
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto">
                  Experience the live studio workspace with pre-populated research, teleprompter, thumbnail design, and multi-format shorts.
                </p>
                <div className="pt-2">
                  <Link
                    href="/project/proj-india-pakistan-border"
                    className="btn-shadow inline-flex items-center gap-2 rounded-full bg-[#E50914] px-8 py-3 text-sm font-bold text-white hover:bg-[#B91C1C] transition"
                  >
                    <span>Launch Pre-Loaded Studio Workspace</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-white/10 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                <span>Real-time voice cloning via Tone Fingerprint</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                <span>Automatic 800w SEO + YouTube chapter markers</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                <span>Safe, Bold & Experimental thumbnail strategies</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
