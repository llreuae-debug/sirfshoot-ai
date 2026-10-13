import React from 'react';
import Link from 'next/link';
import { Film, Heart, ShieldCheck } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-[#0A0D14] text-slate-300">
      <div className="mx-auto max-w-7xl px-5 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand Info */}
          <div className="space-y-4 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#E50914] text-white shadow-md shadow-red-500/20 group-hover:scale-105 transition-transform">
                <Film className="h-5 w-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-black tracking-tight text-white">SirfShoot AI</span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest -mt-1">Content OS</span>
              </div>
            </Link>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              The AI Content OS for YouTube, Shorts and real estate creators. 9 autonomous tools handle research, tone calibration, fact-checking, storyboards, thumbnails, SEO, and vertical shorts — so you can just shoot.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://github.com/llreuae-debug/sirfshoot-ai"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-slate-300 hover:text-white hover:bg-white/10 transition"
                aria-label="GitHub Repository"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
                <span>Open Source Engine</span>
              </a>
            </div>
            <div className="pt-1 text-[11px] text-slate-500 font-mono">
              Built with precision for professional video creators in Pakistan 🇵🇰 and worldwide
            </div>
          </div>

          {/* Column 1: Product & Agents */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">9-Agent Pipeline</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link href="/create" className="hover:text-white transition">Creative Studio</Link></li>
              <li><Link href="/create" className="hover:text-white transition">Topic Research</Link></li>
              <li><Link href="/tools/tone-fingerprint" className="hover:text-white transition">Tone Fingerprint</Link></li>
              <li><Link href="/tools/ai-script-robot-score" className="hover:text-white transition">Fact-Check & Robot Audit</Link></li>
              <li><Link href="/images" className="hover:text-white transition">Visual Storyboard & B-Roll</Link></li>
              <li><Link href="/tools/thumbnail-ideas" className="hover:text-white transition">Thumbnail Designer</Link></li>
              <li><Link href="/video-creator" className="hover:text-white transition">Shorts Generator</Link></li>
            </ul>
          </div>

          {/* Column 2: Free Tools */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">12 Free Tools</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link href="/tools/tone-fingerprint" className="hover:text-white transition">Tone Fingerprint Test</Link></li>
              <li><Link href="/tools/youtube-seo-grader" className="hover:text-white transition">YouTube SEO Grader</Link></li>
              <li><Link href="/tools/hook-generator" className="hover:text-white transition">3-Sec Hook Generator</Link></li>
              <li><Link href="/tools/title-tester" className="hover:text-white transition">Title Score & Linter</Link></li>
              <li><Link href="/tools/hinglish-ratio" className="hover:text-white transition">Roman Urdu Word Balance</Link></li>
              <li><Link href="/tools/youtube-income-calculator" className="hover:text-white transition">PKR Income Calculator</Link></li>
              <li><Link href="/tools" className="text-red-400 hover:text-red-300 transition">View all 12 tools →</Link></li>
            </ul>
          </div>

          {/* Column 3: Platform & Legal */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">Platform & Legal</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link href="/pricing" className="hover:text-white transition">Pricing (PKR)</Link></li>
              <li><Link href="/academy" className="hover:text-white transition">Creator Academy</Link></li>
              <li><Link href="/blog" className="hover:text-white transition">Creator Playbooks</Link></li>
              <li><Link href="/settings" className="hover:text-white transition">API Keys & Settings</Link></li>
              <li><Link href="/privacy" className="hover:text-white transition">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-white transition">Terms of Service</Link></li>
              <li><Link href="/refund" className="hover:text-white transition">Refund & Cancellation</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
            <p>© 2026 SirfShoot AI. All rights reserved. All prices quoted in PKR.</p>
            <span className="inline-flex items-center gap-1 text-slate-300 font-medium bg-white/[0.04] px-2.5 py-1 rounded-full border border-white/10">
              <Heart className="h-3.5 w-3.5 text-red-500 fill-red-500" />
              Built for Pakistani Creators 🇵🇰
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1.5 text-emerald-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              9 Autonomous Tools Operational
            </span>
            <span>hello@tameeros.com</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
