'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { HelpCircle, ArrowRight } from 'lucide-react';

export default function CreatorQuizPage() {
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [completed, setCompleted] = useState(false);

  const questions = [
    {
      q: 'What is your primary content format?',
      options: [
        'Deep-dive 10-15 minute researched explainers',
        'Quick 3-5 minute daily tech / news breakdowns',
        'Personal finance, budgeting & investing case studies',
        'High-energy vertical Shorts and Reels',
      ],
    },
    {
      q: 'What is your biggest bottleneck right now?',
      options: [
        'Spending 6-8 hours researching facts and sources',
        'Struggling to write scripts that sound conversational in Hinglish',
        'Designing high-CTR thumbnails and writing title variations',
        'Editing vertical shorts from long-form videos',
      ],
    },
    {
      q: 'How frequently do you currently ship videos?',
      options: [
        '1-2 videos per month (long research cycles)',
        '1 video every week consistently',
        '3-5 videos per week (high-volume news/tech)',
        'Daily short-form uploads',
      ],
    },
  ];

  const handleSelect = (optionIdx: number) => {
    const updated = [...answers, optionIdx];
    setAnswers(updated);
    if (currentQ < questions.length - 1) {
      setCurrentQ(currentQ + 1);
    } else {
      setCompleted(true);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#0C0C0F] text-slate-100">
      <Navbar />

      <main className="flex-1 py-12 sm:py-16">
        <div className="mx-auto max-w-3xl px-5 sm:px-6 lg:px-8 space-y-8">
          <div>
            <Link href="/tools" className="text-xs text-red-400 hover:underline mb-2 inline-block font-mono">
              ← Back to All Tools
            </Link>
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-500/15 border border-red-500/30 text-red-400">
                <HelpCircle className="h-5 w-5" />
              </div>
              <h1 className="text-3xl font-black text-white">What Kind of YouTuber Are You?</h1>
            </div>
            <p className="mt-2 text-sm text-slate-400 leading-relaxed">
              Answer 3 quick questions to identify your creator archetype, your primary leverage point, and your recommended 9-agent pipeline workflow.
            </p>
          </div>

          {!completed ? (
            <div className="rounded-2xl border border-white/10 bg-[#141418] p-6 sm:p-8 space-y-6 shadow-xl">
              <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                <span>Question {currentQ + 1} of {questions.length}</span>
                <span className="text-red-400">{Math.round(((currentQ + 1) / questions.length) * 100)}% Completed</span>
              </div>

              <h2 className="text-xl font-bold text-white leading-snug">
                {questions[currentQ].q}
              </h2>

              <div className="space-y-3">
                {questions[currentQ].options.map((opt, oIdx) => (
                  <button
                    key={oIdx}
                    type="button"
                    onClick={() => handleSelect(oIdx)}
                    className="w-full text-left rounded-xl border border-white/10 bg-white/5 p-4 text-sm font-medium text-slate-200 hover:border-red-500 hover:bg-white/10 transition"
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="rounded-2xl border border-emerald-500/30 bg-[#141418] p-6 sm:p-8 space-y-6 shadow-xl text-center">
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/20 text-emerald-400 text-3xl">
                🎙️
              </div>
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 font-mono">
                  Creator Archetype Diagnosed
                </span>
                <h3 className="text-2xl font-black text-white">The Analytical Deep-Dive Authority</h3>
                <p className="text-xs sm:text-sm text-slate-400 max-w-lg mx-auto leading-relaxed">
                  You thrive on intellectual depth and trust. Your biggest growth lever is accelerating research and script drafting with Agent 1 (Topic Research) and Agent 5 (Tone-Cloned Scripts) so you can ship weekly without burnout.
                </p>
              </div>

              <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4 max-w-md mx-auto text-xs text-slate-300 space-y-1.5 text-left">
                <div className="font-bold text-white">Recommended Production Stack:</div>
                <div>• Tone Fingerprint: Analytical Hinglish Explainer (65% Blend)</div>
                <div>• Ideal Plan: SirfShoot Creator Plan (7 scripts/month)</div>
                <div>• Estimated Time Saved: 24+ hours per month</div>
              </div>

              <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link
                  href="/create"
                  className="btn-shadow inline-flex items-center gap-1.5 rounded-full bg-[#E50914] px-8 py-3 text-sm font-bold text-white hover:bg-[#B91C1C] transition"
                >
                  <span>Launch Recommended Workspace Free</span>
                  <ArrowRight className="h-4 w-4" />
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
