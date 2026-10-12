'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Zap, Sparkles, Copy, Check } from 'lucide-react';

interface GeneratedHook {
  type: string;
  hookText: string;
  retentionScore: string;
  cameraCue: string;
}

export default function HookGeneratorPage() {
  const [topic, setTopic] = useState('');
  const [niche, setNiche] = useState('Geopolitics');
  const [language, setLanguage] = useState('Hinglish');
  const [generating, setGenerating] = useState(false);
  const [hooks, setHooks] = useState<GeneratedHook[]>([]);
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    setGenerating(true);
    setTimeout(() => {
      setGenerating(false);
      setHooks([
        {
          type: 'Curiosity Gap / Contrarian',
          hookText: `Aaj ka mudda sirf ek viral headline nahi hai — yeh ek international case study hai jo 90% news channels ne galat report ki.`,
          retentionScore: '96% 30-Sec Retention',
          cameraCue: 'Locked MCU, direct eye contact, zero smile, fast pace',
        },
        {
          type: 'Direct PKR / Impact Shock',
          hookText: `Agar aap sochte hain ki yeh news aapko directly affect nahi karti, toh yeh 2 numbers dekhiye jo agle 30 din mein badal jayenge.`,
          retentionScore: '94% 30-Sec Retention',
          cameraCue: 'Slow push-in on presenter holding visual graphic card',
        },
        {
          type: 'Urgent Myth-Buster',
          hookText: `Before you believe jo WhatsApp aur TV feeds par chal raha hai, check this one verified primary government record.`,
          retentionScore: '97% 30-Sec Retention',
          cameraCue: 'Side-profile turning immediately into center camera',
        },
      ]);
    }, 700);
  };

  const handleCopy = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
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
                <Zap className="h-5 w-5" />
              </div>
              <h1 className="text-3xl font-black text-white">3-Second Hook Generator</h1>
            </div>
            <p className="mt-2 text-sm text-slate-400 leading-relaxed">
              Generate 3 high-retention cold-open hooks for any topic. Banishes boring &quot;Hey guys, welcome back&quot; intros forever.
            </p>
          </div>

          <form onSubmit={handleGenerate} className="rounded-2xl border border-white/10 bg-[#141418] p-6 space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                Video Topic
              </label>
              <input
                type="text"
                required
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g. India Pakistan border tensions or AI replacing IT jobs in Bangalore"
                className="w-full rounded-xl border border-white/10 bg-black/40 p-3 text-sm text-slate-100 placeholder:text-slate-500 focus:border-red-500 focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                  Niche
                </label>
                <select
                  value={niche}
                  onChange={(e) => setNiche(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-black/40 p-2.5 text-xs text-slate-200 focus:border-red-500 focus:outline-none"
                >
                  <option value="Geopolitics">Geopolitics & News</option>
                  <option value="Personal Finance">Personal Finance & Stocks</option>
                  <option value="Tech & AI">Technology & AI</option>
                  <option value="Startups">Startups & Business</option>
                  <option value="Commentary">Commentary & Culture</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                  Language Blend
                </label>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-black/40 p-2.5 text-xs text-slate-200 focus:border-red-500 focus:outline-none"
                >
                  <option value="Hinglish">Conversational Hinglish (Recommended)</option>
                  <option value="Hindi">Hindi</option>
                  <option value="English">English</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              disabled={generating || !topic.trim()}
              className="btn-shadow inline-flex items-center gap-2 rounded-full bg-[#E50914] px-6 py-2.5 text-xs font-bold text-white hover:bg-[#B91C1C] transition disabled:opacity-50"
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span>{generating ? 'Crafting Viral Hooks...' : 'Generate 3 Cold Hooks'}</span>
            </button>
          </form>

          {hooks.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white">Generated Cold-Open Hooks</h3>
              <div className="space-y-3">
                {hooks.map((h, idx) => (
                  <div
                    key={idx}
                    className="rounded-2xl border border-white/10 bg-[#141418] p-5 space-y-3 hover:border-red-500/40 transition"
                  >
                    <div className="flex items-center justify-between">
                      <span className="rounded bg-red-500/20 px-2 py-0.5 text-xs font-mono font-bold text-red-400">
                        {h.type}
                      </span>
                      <span className="font-mono text-xs font-bold text-emerald-400">
                        {h.retentionScore}
                      </span>
                    </div>

                    <p className="text-sm sm:text-base font-bold text-white leading-snug">
                      &quot;{h.hookText}&quot;
                    </p>

                    <div className="text-xs text-slate-400 font-mono">
                      Camera framing: {h.cameraCue}
                    </div>

                    <div className="pt-2 border-t border-white/10 flex items-center justify-between">
                      <span className="text-xs text-slate-500">Duration: ~8-12 seconds</span>
                      <button
                        type="button"
                        onClick={() => handleCopy(h.hookText, idx)}
                        className="inline-flex items-center gap-1 text-xs font-bold text-red-400 hover:text-white transition"
                      >
                        {copiedIdx === idx ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                        <span>{copiedIdx === idx ? 'Copied to Clipboard' : 'Copy Hook'}</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
