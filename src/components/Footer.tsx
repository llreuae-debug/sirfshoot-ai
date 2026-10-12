import React from 'react';
import Link from 'next/link';
import { Sparkles, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#0C0C0F] text-slate-300 border-t border-white/[0.08] transition-colors">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8 py-14">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[#E50914] to-[#B91C1C] text-white">
                <Sparkles className="h-4 w-4 fill-white/20" />
              </div>
              <div className="font-extrabold text-lg tracking-tight">
                <span className="text-white">Sirf</span>
                <span className="text-[#E50914]">Shoot</span>
                <span className="ml-1 text-[10px] text-red-400 font-mono">AI</span>
              </div>
            </Link>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              The AI Content OS for YouTube and video creators. 9 specialized AI agents handle research, tone cloning, fact-checking, storyboards, thumbnails, SEO, and shorts — so you can just shoot.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 transition"
                aria-label="YouTube"
              >
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
              <a
                href="https://x.com"
                target="_blank"
                rel="noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 transition"
                aria-label="X / Twitter"
              >
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 transition"
                aria-label="Instagram"
              >
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
            </div>
            <div className="pt-2 text-xs text-slate-500 font-mono">
              Built with precision for professional video creators and marketing teams worldwide
            </div>
          </div>

          {/* Column 1: Product & Agents */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">9-Agent Pipeline</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link href="/create" className="hover:text-white transition">Creative Studio</Link></li>
              <li><Link href="/#agents" className="hover:text-white transition">Topic Research</Link></li>
              <li><Link href="/#agents" className="hover:text-white transition">Tone Fingerprint</Link></li>
              <li><Link href="/#agents" className="hover:text-white transition">Fact-Checking Agent</Link></li>
              <li><Link href="/#agents" className="hover:text-white transition">Visual Storyboard</Link></li>
              <li><Link href="/#agents" className="hover:text-white transition">Thumbnail Designer</Link></li>
              <li><Link href="/#agents" className="hover:text-white transition">Shorts Generator</Link></li>
            </ul>
          </div>

          {/* Column 2: Free Tools */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">12 Free Tools</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link href="/tools/tone-fingerprint" className="hover:text-white transition">Tone Fingerprint Test</Link></li>
              <li><Link href="/tools/youtube-seo-grader" className="hover:text-white transition">YouTube SEO Grader</Link></li>
              <li><Link href="/tools/hook-generator" className="hover:text-white transition">3-Sec Hook Generator</Link></li>
              <li><Link href="/tools/title-tester" className="hover:text-white transition">Title CTR Predictor</Link></li>
              <li><Link href="/tools/hinglish-ratio" className="hover:text-white transition">Roman Urdu Word Balance</Link></li>
              <li><Link href="/tools/youtube-income-calculator" className="hover:text-white transition">PKR Income Calculator</Link></li>
              <li><Link href="/tools" className="text-red-400 hover:text-red-300 transition">View all 12 tools →</Link></li>
            </ul>
          </div>

          {/* Column 3: Platform & Legal */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">Company & Legal</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link href="/pricing" className="hover:text-white transition">Pricing (PKR)</Link></li>
              <li><Link href="/dashboard" className="hover:text-white transition">Creator Dashboard</Link></li>
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
              Love made in Pakistan 🇵🇰
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1.5 text-emerald-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              9 Agents Operational
            </span>
            <span>hello@sirfshoot.ai</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
