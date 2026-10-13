'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Zap, Sparkles, Copy, Check, Gauge, Wrench } from 'lucide-react';
import { score, HookScoreResult } from '@/lib/tools/hookscore';

interface ScoredHook {
  type: string;
  hookText: string;
  cameraCue: string;
  audit: HookScoreResult;
}

export default function HookGeneratorPage() {
  const [mode, setMode] = useState<'generate' | 'audit'>('generate');
  const [topic, setTopic] = useState('');
  const [niche, setNiche] = useState('Geopolitics');
  const [language, setLanguage] = useState('Hinglish');
  const [customHookInput, setCustomHookInput] = useState('');
  const [generating, setGenerating] = useState(false);
  const [hooks, setHooks] = useState<ScoredHook[]>([]);
  const [customAudit, setCustomAudit] = useState<HookScoreResult | null>(null);
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) return;
    setGenerating(true);
    setTimeout(() => {
      setGenerating(false);
      const rawHooks = [
        {
          type: 'Curiosity Gap / Contrarian',
          hookText: "Today's report is not just a viral headline — you are looking at an economic case study that 90% of news feeds got completely wrong.",
          cameraCue: 'Locked MCU, direct eye contact, zero smile, fast pace',
        },
        {
          type: 'Direct Stakes / Impact Shock',
          hookText: "If you think this news will not affect you in 2026, look at these 2 numbers before you spend another single rupee.",
          cameraCue: 'Slow push-in on presenter holding visual graphic card',
        },
        {
          type: 'Urgent Myth-Buster',
          hookText: `Before you believe what WhatsApp feeds tell you about ${topic.slice(0, 30)}, check this one verified primary government record.`,
          cameraCue: 'Side-profile turning immediately into center camera',
        },
      ];

      const scored = rawHooks.map((h) => ({
        ...h,
        audit: score(h.hookText),
      }));

      setHooks(scored);
    }, 300);
  };

  const handleAuditCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customHookInput.trim()) return;
    setCustomAudit(score(customHookInput));
  };

  const handleCopy = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  const getBandBadge = (band: 'STRONG' | 'WORKABLE' | 'WEAK') => {
    if (band === 'STRONG') return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
    if (band === 'WORKABLE') return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
    return 'bg-red-500/20 text-red-400 border-red-500/30';
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
              <h1 className="text-3xl font-black text-white">3-Second Hook Generator & Auditor</h1>
            </div>
            <p className="mt-2 text-sm text-slate-400 leading-relaxed">
              Generate verified cold-open hooks or score your own against 5 retention properties (Specificity, Address, Stakes, Curiosity, Brevity) and 21 proven viral formulas.
            </p>
          </div>

          {/* Mode Switcher */}
          <div className="flex rounded-xl bg-white/5 p-1 border border-white/10 max-w-sm">
            <button
              type="button"
              onClick={() => setMode('generate')}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition ${
                mode === 'generate' ? 'bg-red-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              Generate New Hooks
            </button>
            <button
              type="button"
              onClick={() => setMode('audit')}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition ${
                mode === 'audit' ? 'bg-red-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              Audit Custom Hook
            </button>
          </div>

          {mode === 'generate' ? (
            <form onSubmit={handleGenerate} className="rounded-2xl border border-white/10 bg-[#141418] p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                  Video Topic or Core Premise
                </label>
                <input
                  type="text"
                  required
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="e.g. IT exports expanding or why prime real estate yields are shifting"
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
                    <option value="Real Estate">Real Estate & Architecture</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                    Language Style
                  </label>
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-black/40 p-2.5 text-xs text-slate-200 focus:border-red-500 focus:outline-none"
                  >
                    <option value="Hinglish">Roman Urdu / Hindi Blend</option>
                    <option value="English">English (International)</option>
                    <option value="Urdu">Urdu Script Cadence</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                disabled={generating || !topic.trim()}
                className="btn-shadow inline-flex items-center gap-2 rounded-full bg-[#E50914] px-6 py-2.5 text-xs font-bold text-white hover:bg-[#B91C1C] transition disabled:opacity-50 cursor-pointer"
              >
                <Sparkles className="h-3.5 w-3.5" />
                <span>{generating ? 'Formulating Scored Hooks...' : 'Generate 3 Scored Hooks'}</span>
              </button>
            </form>
          ) : (
            <form onSubmit={handleAuditCustom} className="rounded-2xl border border-white/10 bg-[#141418] p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                  Your Cold-Open Hook Text
                </label>
                <textarea
                  required
                  rows={3}
                  value={customHookInput}
                  onChange={(e) => setCustomHookInput(e.target.value)}
                  placeholder="e.g. Stop spending 12 hours editing videos before you check these 3 automated workflows."
                  className="w-full rounded-xl border border-white/10 bg-black/40 p-3 text-sm text-slate-100 placeholder:text-slate-500 focus:border-red-500 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={!customHookInput.trim()}
                className="btn-shadow inline-flex items-center gap-2 rounded-full bg-[#E50914] px-6 py-2.5 text-xs font-bold text-white hover:bg-[#B91C1C] transition disabled:opacity-50 cursor-pointer"
              >
                <Gauge className="h-3.5 w-3.5" />
                <span>Run Heuristic Hook Audit</span>
              </button>
            </form>
          )}

          {/* Audit Results for Custom Mode */}
          {mode === 'audit' && customAudit && (
            <div className="rounded-2xl border border-white/10 bg-[#141418] p-6 space-y-6 shadow-xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2.5 py-0.5 rounded-full border text-[10px] font-mono font-bold ${getBandBadge(customAudit.band)}`}>
                      {customAudit.band} RETENTION BAND
                    </span>
                    <span className="text-xs font-bold text-slate-300 font-mono">
                      Formula: {customAudit.formula}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white mt-1">Hook Performance Audit</h3>
                </div>
                <div className="text-left sm:text-right">
                  <div className="text-3xl font-black text-emerald-400 font-mono">
                    {customAudit.verdict} <span className="text-sm text-slate-400 font-sans">/ 100</span>
                  </div>
                  <span className="text-[10px] text-slate-400 uppercase font-mono">Verdict Score</span>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {Object.entries(customAudit.properties).map(([prop, val]) => (
                  <div key={prop} className="rounded-xl border border-white/5 bg-white/[0.02] p-2.5 text-center space-y-1">
                    <span className="text-[10px] font-mono uppercase text-slate-400">{prop}</span>
                    <div className="text-base font-bold text-white font-mono">{val}</div>
                  </div>
                ))}
              </div>

              <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-4 space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-bold text-amber-400 uppercase">
                  <Wrench className="h-3.5 w-3.5" />
                  <span>Weakest Property: {customAudit.weakest.property}</span>
                </div>
                <p className="text-xs text-slate-300">
                  Recommended Fix: {customAudit.weakest.fix}
                </p>
              </div>
            </div>
          )}

          {/* Generated Hooks Display */}
          {mode === 'generate' && hooks.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white">Generated & Scored Cold-Open Hooks</h3>
              <div className="space-y-4">
                {hooks.map((h, idx) => (
                  <div
                    key={idx}
                    className="rounded-2xl border border-white/10 bg-[#141418] p-5 sm:p-6 space-y-4 hover:border-red-500/40 transition"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="rounded bg-red-500/20 px-2 py-0.5 text-xs font-mono font-bold text-red-400">
                          {h.type}
                        </span>
                        <span className="text-xs font-mono text-slate-400">
                          Pattern: {h.audit.formula}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold border ${getBandBadge(h.audit.band)}`}>
                          {h.audit.band}
                        </span>
                        <span className="font-mono text-xs font-bold text-emerald-400">
                          Score: {h.audit.verdict}/100
                        </span>
                      </div>
                    </div>

                    <p className="text-sm sm:text-base font-bold text-white leading-snug">
                      &quot;{h.hookText}&quot;
                    </p>

                    {/* Breakdown Chips */}
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-center text-[10px] font-mono text-slate-300">
                      <div className="bg-white/5 p-1.5 rounded">Specific: {h.audit.properties.SPECIFICITY}</div>
                      <div className="bg-white/5 p-1.5 rounded">Address: {h.audit.properties.ADDRESS}</div>
                      <div className="bg-white/5 p-1.5 rounded">Stakes: {h.audit.properties.STAKES}</div>
                      <div className="bg-white/5 p-1.5 rounded">Curiosity: {h.audit.properties.CURIOSITY}</div>
                      <div className="bg-white/5 p-1.5 rounded">Brevity: {h.audit.properties.BREVITY}</div>
                    </div>

                    <div className="text-xs text-slate-400 font-mono">
                      🎬 Director Cue: {h.cameraCue}
                    </div>

                    <div className="pt-2 border-t border-white/10 flex items-center justify-between">
                      <span className="text-xs text-slate-500">Duration: ~8-12 seconds</span>
                      <button
                        type="button"
                        onClick={() => handleCopy(h.hookText, idx)}
                        className="inline-flex items-center gap-1 text-xs font-bold text-red-400 hover:text-white transition cursor-pointer"
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
