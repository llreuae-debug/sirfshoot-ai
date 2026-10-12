'use client';

import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { BookOpen, Sparkles, ArrowRight, Clock, User } from 'lucide-react';

export default function BlogDirectoryPage() {
  const posts = [
    {
      title: 'How To Write Hinglish Hooks That Hold 70%+ Audience Retention',
      slug: 'hinglish-hooks-retention',
      category: 'Scripting & Tone',
      readTime: '6 min read',
      date: 'March 2026',
      summary:
        'Why translating English YouTube scripts directly into Hindi fails, and how mixing English technical terms with spoken Hindi cadence unlocks watch time.',
    },
    {
      title: 'The 9-Agent Pipeline: How To Cut YouTube Pre-Production from 8 Hours to 3 Minutes',
      slug: '9-agent-pipeline-workflow',
      category: 'AI Workflow',
      readTime: '8 min read',
      date: 'February 2026',
      summary:
        'A comprehensive architectural breakdown of why multi-agent collaboration destroys single blank-box LLM prompts for serious creators.',
    },
    {
      title: 'SECP Compliance Guide For Pakistani Finance YouTubers',
      slug: 'sebi-compliance-finfluencers',
      category: 'Legal & Safety',
      readTime: '5 min read',
      date: 'February 2026',
      summary:
        'The 20 trigger words that attract regulatory penalties, and how to structure educational financial disclaimers that protect your channel.',
    },
    {
      title: 'Reverse Engineering 15%+ CTR YouTube Thumbnails: Safe vs Bold vs Experimental',
      slug: 'thumbnail-ctr-strategies',
      category: 'Thumbnails & Design',
      readTime: '7 min read',
      date: 'January 2026',
      summary:
        'Deconstructing 500 top-performing Urdu, Roman Urdu, and English thumbnails to extract color psychology, emotional expressions, and text overlays.',
    },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-[#F8FAFC]">
      <Navbar />

      <main className="flex-1 py-14 sm:py-20">
        <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8 space-y-12">
          <div className="max-w-2xl space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-[#E50914]">CREATOR PLAYBOOKS</span>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Playbooks & Guides for Modern Creators
            </h1>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Actionable frameworks, voice cloning strategies, and production blueprints tested across hundreds of Indian YouTube channels.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {posts.map((post) => (
              <article
                key={post.slug}
                className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-7 card-shadow space-y-4 hover:border-red-300 hover:shadow-lg transition flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs text-slate-500 font-mono">
                    <span className="rounded bg-red-50 text-[#E50914] px-2 py-0.5 font-bold">
                      {post.category}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {post.readTime}
                    </span>
                  </div>

                  <h2 className="text-xl font-bold text-slate-900 leading-snug hover:text-[#E50914] transition">
                    {post.title}
                  </h2>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {post.summary}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs text-slate-400 font-mono">{post.date}</span>
                  <Link
                    href="/create"
                    className="inline-flex items-center gap-1 text-xs font-bold text-[#E50914] hover:underline"
                  >
                    <span>Try In Studio</span>
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
