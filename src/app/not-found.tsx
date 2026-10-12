'use client';

import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Home, BookOpen, Wrench, MessageCircle, ArrowUpRight, Sparkles } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col bg-[#0C0C0F] text-white">
      <Navbar />

      <main className="flex-1 flex items-center justify-center py-20 px-6">
        <div className="max-w-3xl w-full text-center space-y-10">
          <div className="space-y-3">
            <p
              className="text-[120px] sm:text-[160px] font-black leading-none tracking-tighter"
              style={{
                background: 'linear-gradient(90deg, #E50914 0%, #F97316 55%, #FCA5A5 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              404
            </p>
            <h1 className="text-3xl sm:text-4xl font-black text-white">
              This page never shot.
            </h1>
            <p className="text-sm sm:text-base text-slate-400 max-w-lg mx-auto leading-relaxed">
              Either the URL was typed wrong, the page was renamed, or it never existed. The 9 agents are not the problem — they&apos;re waiting in your studio.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
            <Link
              href="/"
              className="group flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.02] p-4 transition hover:border-[#E50914]/50 hover:bg-white/[0.05]"
            >
              <div className="rounded-lg bg-[#E50914]/15 p-2 text-[#E50914] shrink-0">
                <Home className="h-4 w-4" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-sm text-white">Home</h3>
                <p className="text-xs text-slate-400">AI Content OS for video creators</p>
              </div>
              <ArrowUpRight className="h-4 w-4 text-slate-500 group-hover:text-white transition" />
            </Link>

            <Link
              href="/dashboard"
              className="group flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.02] p-4 transition hover:border-[#E50914]/50 hover:bg-white/[0.05]"
            >
              <div className="rounded-lg bg-[#E50914]/15 p-2 text-[#E50914] shrink-0">
                <Sparkles className="h-4 w-4" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-sm text-white">Creator Dashboard</h3>
                <p className="text-xs text-slate-400">Manage video projects and scripts</p>
              </div>
              <ArrowUpRight className="h-4 w-4 text-slate-500 group-hover:text-white transition" />
            </Link>

            <Link
              href="/tools"
              className="group flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.02] p-4 transition hover:border-[#E50914]/50 hover:bg-white/[0.05]"
            >
              <div className="rounded-lg bg-[#E50914]/15 p-2 text-[#E50914] shrink-0">
                <Wrench className="h-4 w-4" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-sm text-white">12 Free Tools</h3>
                <p className="text-xs text-slate-400">Tone Fingerprint, SEO Grader & more</p>
              </div>
              <ArrowUpRight className="h-4 w-4 text-slate-500 group-hover:text-white transition" />
            </Link>

            <Link
              href="/create"
              className="group flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.02] p-4 transition hover:border-[#E50914]/50 hover:bg-white/[0.05]"
            >
              <div className="rounded-lg bg-[#E50914]/15 p-2 text-[#E50914] shrink-0">
                <Sparkles className="h-4 w-4" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-sm text-white">Launch Studio</h3>
                <p className="text-xs text-slate-400">Run the 9-agent pipeline</p>
              </div>
              <ArrowUpRight className="h-4 w-4 text-slate-500 group-hover:text-white transition" />
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
