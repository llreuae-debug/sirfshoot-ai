'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { FileImage, Sparkles, ArrowRight } from 'lucide-react';

interface ThumbnailVariantIdea {
  name: string;
  ctr: string;
  overlay: string;
  visual: string;
  prompt: string;
}

export default function ThumbnailIdeasPage() {
  const [topic, setTopic] = useState('');
  const [generating, setGenerating] = useState(false);
  const [variants, setVariants] = useState<ThumbnailVariantIdea[]>([]);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    setGenerating(true);
    setTimeout(() => {
      setGenerating(false);
      setVariants([
        {
          name: 'Safe Formula',
          ctr: '11.4%',
          overlay: 'THE REAL TRUTH?',
          visual: 'Host looking skeptical at camera on left third; red warning banner on right.',
          prompt: `YouTube thumbnail portrait of a Pakistani creator with a curious skeptical expression, looking at camera on left third, dark navy cinematic studio lighting, bold high-contrast background with red accents, 16:9 --ar 16:9 --v 6.0`,
        },
        {
          name: 'Bold High-Emotion',
          ctr: '14.8%',
          overlay: '46% OF JOBS AT RISK?',
          visual: 'Host pointing back with open shock expression towards glowing red statistical meter.',
          prompt: `Viral YouTube thumbnail with intense shock facial expression of a Pakistani male host pointing backward, vibrant glowing crimson and white typography, razor sharp detail, cinematic studio lighting, 16:9 --ar 16:9 --v 6.0`,
        },
        {
          name: 'Experimental Minimalist',
          ctr: '12.6%',
          overlay: 'DECODED IN 10 MINS',
          visual: 'Monochrome profile turning forward with cyan laser line and crisp yellow typography.',
          prompt: `Minimalist modern YouTube thumbnail, silhouette of creator, glowing cyan laser data lines, editorial docuseries aesthetic, sophisticated high-end grade, 8k --ar 16:9 --v 6.0`,
        },
      ]);
    }, 700);
  };

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
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
                <FileImage className="h-5 w-5" />
              </div>
              <h1 className="text-3xl font-black text-white">Thumbnail Ideas Generator</h1>
            </div>
            <p className="mt-2 text-sm text-slate-400 leading-relaxed">
              Generate 3 high-performing thumbnail concepts (Safe, Bold, and Experimental) with ready-to-paste Midjourney & DALL-E prompts.
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
                placeholder="e.g. Bangladesh elections impact on India or AI coding tools reality"
                className="w-full rounded-xl border border-white/10 bg-black/40 p-3 text-sm text-slate-100 placeholder:text-slate-500 focus:border-red-500 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={generating || !topic.trim()}
              className="btn-shadow inline-flex items-center gap-2 rounded-full bg-[#E50914] px-6 py-2.5 text-xs font-bold text-white hover:bg-[#B91C1C] transition disabled:opacity-50"
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span>{generating ? 'Generating 3 Thumbnail Concepts...' : 'Generate Thumbnail Concepts'}</span>
            </button>
          </form>

          {variants.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {variants.map((v, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl border border-white/10 bg-[#141418] p-5 space-y-3 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sm text-white uppercase">{v.name}</span>
                      <span className="font-mono text-xs font-bold text-emerald-400">CTR: {v.ctr}</span>
                    </div>

                    <div className="rounded-lg bg-black/50 p-2.5 text-center font-black text-xs text-[#E50914] border border-white/5 uppercase">
                      &quot;{v.overlay}&quot;
                    </div>

                    <p className="text-xs text-slate-400 leading-relaxed">{v.visual}</p>

                    <div className="rounded-lg bg-white/5 p-2.5 font-mono text-[11px] text-slate-300 space-y-1">
                      <div className="flex items-center justify-between text-[10px] text-slate-500 font-bold uppercase">
                        <span>Midjourney Prompt</span>
                        <button
                          type="button"
                          onClick={() => handleCopy(v.prompt, `prompt-${idx}`)}
                          className="text-red-400 hover:underline"
                        >
                          {copiedKey === `prompt-${idx}` ? 'Copied' : 'Copy'}
                        </button>
                      </div>
                      <p className="line-clamp-3">{v.prompt}</p>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-white/10">
                    <Link
                      href="/create"
                      className="text-xs font-bold text-red-400 hover:underline flex items-center justify-between"
                    >
                      <span>Render in Studio</span>
                      <ArrowRight className="h-3 w-3" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
