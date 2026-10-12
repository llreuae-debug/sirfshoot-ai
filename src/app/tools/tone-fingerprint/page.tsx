'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Fingerprint, Sparkles, ArrowRight } from 'lucide-react';

interface ToneAnalysisResult {
  channelScore: string;
  hinglishRatio: string;
  vocabularyLevel: string;
  signatureVocabulary: string[];
  hookPattern: string;
  signatureTransitions: string[];
  fillerWords: string[];
  prohibitedWords: string[];
  recommendedCadence: string;
}

export default function ToneFingerprintToolPage() {
  const [transcript, setTranscript] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<ToneAnalysisResult | null>(null);

  const sampleTranscripts = [
    {
      title: 'Geopolitical Explainer Sample',
      text: 'Aaj ka mudda sirf ek headline nahi hai — yeh ek international case study hai. Pichle 72 ghanto mein aapne har TV channel par sirens dekhi hongi. Lekin ground reality kya hai? Chaliye satellite records aur DGMO agreement ko layer by layer samajhte hain.',
    },
    {
      title: 'Finance & Stock Market Sample',
      text: 'Dekhiye seedhi baat hai, bank aapko yeh hidden charges kabhi nahi batayega. Agar aap 15 saal ke liye compounding framework use kar rahe hain, toh simple calculation dekhte hain. Step number 2 par aate hain...',
    },
  ];

  const handleAnalyze = (e: React.FormEvent) => {
    e.preventDefault();
    setAnalyzing(true);
    setTimeout(() => {
      setAnalyzing(false);
      setResult({
        channelScore: '96/100',
        hinglishRatio: '68% English / 32% Urdu (Roman Urdu)',
        vocabularyLevel: 'Conversational Smart (Tier 2)',
        signatureVocabulary: ['mudda', 'case study', 'ground reality', 'framework', 'layer by layer', 'khaas karke'],
        hookPattern: 'Contrarian question backed by rapid statistical counter-point',
        signatureTransitions: ['ab maan lijiye', 'lekin ground reality yeh hai ki', 'asal mein twist yahan hai'],
        fillerWords: ['basically', 'dekhiye', 'obviously'],
        prohibitedWords: ['hey guys', 'amazing', 'unlock your mind'],
        recommendedCadence: '145 words per minute (High Retention)',
      });
    }, 1000);
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
                <Fingerprint className="h-5 w-5" />
              </div>
              <h1 className="text-3xl font-black text-white">Tone Fingerprint Preview</h1>
            </div>
            <p className="mt-2 text-sm text-slate-400 leading-relaxed">
              Paste a sample YouTube script or video URL to generate an instant 7-signal voice fingerprint analysis.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleAnalyze} className="rounded-2xl border border-white/10 bg-[#141418] p-6 space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                Paste YouTube Video URL or Script Text
              </label>
              <textarea
                rows={4}
                required
                value={transcript}
                onChange={(e) => setTranscript(e.target.value)}
                placeholder="Paste 1-2 minutes of spoken script text here..."
                className="w-full rounded-xl border border-white/10 bg-black/40 p-3.5 text-xs sm:text-sm text-slate-100 placeholder:text-slate-500 focus:border-red-500 focus:outline-none"
              />
            </div>

            {/* Quick samples */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="text-xs text-slate-500 font-mono">Quick test with sample:</span>
              {sampleTranscripts.map((s, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setTranscript(s.text)}
                  className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-slate-300 hover:bg-white/10"
                >
                  {s.title}
                </button>
              ))}
            </div>

            <button
              type="submit"
              disabled={analyzing || !transcript.trim()}
              className="btn-shadow inline-flex items-center gap-2 rounded-full bg-[#E50914] px-6 py-2.5 text-xs font-bold text-white hover:bg-[#B91C1C] transition disabled:opacity-50"
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span>{analyzing ? 'Extracting Voice Signals...' : 'Analyze Tone Fingerprint'}</span>
            </button>
          </form>

          {/* Result Card */}
          {result && (
            <div className="rounded-2xl border border-emerald-500/30 bg-[#141418] p-6 sm:p-8 space-y-6 shadow-xl">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <h3 className="text-xl font-bold text-white">Extracted Tone Fingerprint</h3>
                  <p className="text-xs text-slate-400">Ready to inject into SirfShoot 9-agent pipeline</p>
                </div>
                <span className="rounded-md bg-emerald-500/20 text-emerald-400 font-mono text-xs px-2.5 py-1 font-bold">
                  Voice Score: {result.channelScore}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4 space-y-1">
                  <span className="text-slate-400 font-bold uppercase">Hinglish Ratio</span>
                  <div className="text-sm font-bold text-white font-mono">{result.hinglishRatio}</div>
                </div>

                <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4 space-y-1">
                  <span className="text-slate-400 font-bold uppercase">Vocabulary Tier</span>
                  <div className="text-sm font-bold text-white font-mono">{result.vocabularyLevel}</div>
                </div>

                <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4 space-y-1 sm:col-span-2">
                  <span className="text-slate-400 font-bold uppercase">Detected Signature Words</span>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {result.signatureVocabulary.map((w: string) => (
                      <span key={w} className="rounded bg-emerald-500/15 text-emerald-300 px-2 py-0.5 font-mono text-xs font-bold border border-emerald-500/20">
                        #{w}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4 space-y-1 sm:col-span-2">
                  <span className="text-slate-400 font-bold uppercase">Signature Transitions</span>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {result.signatureTransitions.map((t: string) => (
                      <span key={t} className="rounded bg-white/5 text-slate-200 px-2 py-0.5 font-mono text-xs border border-white/10">
                        &quot;{t}&quot;
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
                <span className="text-xs text-slate-400">
                  Save this voice profile directly into your SirfShoot studio account.
                </span>
                <Link
                  href="/create"
                  className="btn-shadow inline-flex items-center gap-1.5 rounded-full bg-[#E50914] px-5 py-2 text-xs font-bold text-white hover:bg-[#B91C1C] transition"
                >
                  <span>Generate Script in This Voice</span>
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
