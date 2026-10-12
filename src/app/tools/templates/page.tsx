'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { FileText, Copy, Check, ArrowRight } from 'lucide-react';

export default function TemplatesPage() {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const templates = [
    {
      id: 'geopolitics-breakdown',
      title: 'Geopolitical Deep-Dive Explainer',
      niche: 'Geopolitics & News',
      structure: 'Headline Shock Hook → Historical Timeline → 3 Hidden Factors → Ground Reality Verdict',
      snippet: `[HOOK]
Aaj ka mudda sirf ek headline nahi hai — yeh ek international case study hai. Pichle 72 ghanto mein aapne har TV channel par sirens dekhi hongi.

[SCENE: MCU, neutral studio backdrop, warm directional key light]
Lekin kya aapne socha hai ki headline ke peeche ki actual ground reality kya hai?

[TIMELINE]
Timeline par nazar daaliye. 2021 mein jab treaty sign hui thi, tab numbers kuch aur keh rahe the...`,
    },
    {
      id: 'finance-loophole',
      title: 'Personal Finance & Loophole Teardown',
      niche: 'Finance & Wealth',
      structure: 'Direct Rupee Loss Hook → The Bank Trap → Step-by-Step Calculation → Golden Rule Disclaimer',
      snippet: `[HOOK]
Dekhiye seedhi baat hai: agar aap yeh ek galti kar rahe hain, toh aap har saal ₹45,000 silently lose kar rahe hain.

[CALCULATION]
Math bilkul simple hai. Let’s break down compounding framework step-by-step. Yahan par bank aapko interest rate batata hai, par hidden charges par silent rehta hai...`,
    },
    {
      id: 'tech-review-truth',
      title: 'Tech Spec vs Real-World Teardown',
      niche: 'Technology & AI',
      structure: 'Blind Benchmark Hook → Thermal / Battery Reality → Value-for-Money Verdict',
      snippet: `[HOOK]
Spec sheet par yeh smartphone beast lagta hai, lekin 7 din primary phone use karne ke baad, sach kuch aur hai.

[BODY]
Benchmarking numbers dekhne mein acche lagte hain, par daily camera aur battery life mein kya? Chaliye practical blind test karte hain...`,
    },
  ];

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
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
                <FileText className="h-5 w-5" />
              </div>
              <h1 className="text-3xl font-black text-white">Hinglish Script Template Pack</h1>
            </div>
            <p className="mt-2 text-sm text-slate-400 leading-relaxed">
              Tested high-retention frameworks crafted specifically for Indian audiences. Copy, customize, or generate automatically in SirfShoot Studio.
            </p>
          </div>

          <div className="space-y-6">
            {templates.map((tpl) => (
              <div
                key={tpl.id}
                className="rounded-2xl border border-white/10 bg-[#141418] p-6 space-y-4 shadow-lg hover:border-red-500/30 transition"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-lg text-white">{tpl.title}</span>
                    <span className="rounded bg-red-500/20 text-red-400 font-mono text-[11px] px-2 py-0.5">
                      {tpl.niche}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopy(tpl.snippet, tpl.id)}
                    className="inline-flex items-center gap-1 text-xs font-bold text-red-400 hover:text-white transition"
                  >
                    {copiedId === tpl.id ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                    <span>{copiedId === tpl.id ? 'Copied Template' : 'Copy'}</span>
                  </button>
                </div>

                <div className="text-xs text-slate-400 font-mono">
                  Structure: {tpl.structure}
                </div>

                <div className="rounded-xl border border-white/5 bg-black/40 p-4 font-mono text-xs text-slate-300 whitespace-pre-wrap leading-relaxed">
                  {tpl.snippet}
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 text-center space-y-3">
            <h3 className="font-bold text-base text-white">Need a script written in your custom voice from scratch?</h3>
            <p className="text-xs text-slate-400 max-w-md mx-auto">
              Our 9-agent pipeline writes complete spoken scripts tailored to your specific video topic in under 3 minutes.
            </p>
            <Link
              href="/create"
              className="btn-shadow inline-flex items-center gap-1.5 rounded-full bg-[#E50914] px-6 py-2.5 text-xs font-bold text-white hover:bg-[#B91C1C] transition"
            >
              <span>Generate Custom Script Free</span>
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
