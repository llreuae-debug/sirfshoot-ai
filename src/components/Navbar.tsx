'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  Menu,
  X,
  ArrowRight,
  LayoutDashboard,
} from 'lucide-react';
import { useCreatorStore } from '@/lib/store';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { state } = useCreatorStore();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/95 backdrop-blur-md shadow-[0_1px_3px_0_rgba(15,23,42,0.03)] transition-all">
      <div className="mx-auto flex h-[76px] w-full max-w-[1560px] items-center justify-between px-4 sm:px-6 lg:px-8 xl:px-10">
        
        {/* Brand Logo & Wordmark */}
        <Link
          href="/"
          className="group flex items-center gap-3 shrink-0"
          aria-label="SirfShoot AI Home"
        >
          {/* 3D Red Brand Icon */}
          <div className="relative flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl bg-gradient-to-b from-[#F0232D] via-[#E50914] to-[#C80711] text-white shadow-[0_3px_8px_rgba(229,9,20,0.32),inset_0_1px_0_rgba(255,255,255,0.4),inset_0_-2px_0_rgba(0,0,0,0.18)] transition-all duration-200 group-hover:scale-105 group-hover:shadow-[0_5px_12px_rgba(229,9,20,0.4),inset_0_1px_0_rgba(255,255,255,0.5)]">
            <Sparkles className="h-4.5 w-4.5 fill-white/20 text-white" />
          </div>

          {/* Wordmark */}
          <div className="flex items-center font-black text-[20px] sm:text-[21px] tracking-tight leading-none select-none">
            <span className="text-[#0F172A]">SirfShoot</span>
            <span className="ml-1.5 rounded-md bg-[#E50914] text-white px-2 py-0.5 text-[10px] font-black tracking-wider uppercase leading-none shadow-xs">
              AI
            </span>
          </div>
        </Link>

        {/* Desktop Primary Navigation */}
        <nav
          aria-label="Primary Navigation"
          className="hidden xl:flex items-center gap-3.5 2xl:gap-5.5"
        >
          <Link
            href="/#how-it-works"
            className="whitespace-nowrap text-[13.5px] 2xl:text-[14px] font-semibold text-slate-700 hover:text-[#0F172A] transition-colors py-1.5 px-1"
          >
            How it works
          </Link>

          <Link
            href="/#agents"
            className="whitespace-nowrap text-[13.5px] 2xl:text-[14px] font-semibold text-slate-700 hover:text-[#0F172A] transition-colors py-1.5 px-1"
          >
            9 AI Agents
          </Link>

          {/* Free Tools + Centered 3D Green Badge */}
          <Link
            href="/tools"
            className="inline-flex items-center gap-1.5 whitespace-nowrap text-[13.5px] 2xl:text-[14px] font-semibold text-slate-700 hover:text-[#0F172A] transition-colors py-1.5 px-1 group"
          >
            <span>Free Tools</span>
            <span className="inline-flex h-5 min-w-[22px] items-center justify-center rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300/80 px-1.5 text-[11px] font-extrabold leading-none shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_1px_2px_rgba(16,185,129,0.12)] transition-transform group-hover:scale-105">
              12
            </span>
          </Link>

          <Link
            href="/leads"
            className="whitespace-nowrap text-[13.5px] 2xl:text-[14px] font-semibold text-slate-700 hover:text-[#0F172A] transition-colors py-1.5 px-1"
          >
            CRM Leads
          </Link>

          <Link
            href="/academy"
            className="whitespace-nowrap text-[13.5px] 2xl:text-[14px] font-semibold text-slate-700 hover:text-[#0F172A] transition-colors py-1.5 px-1"
          >
            Academy
          </Link>

          <Link
            href="/pricing"
            className="whitespace-nowrap text-[13.5px] 2xl:text-[14px] font-semibold text-slate-700 hover:text-[#0F172A] transition-colors py-1.5 px-1"
          >
            Pricing
          </Link>

          <Link
            href="/blog"
            className="whitespace-nowrap text-[13.5px] 2xl:text-[14px] font-semibold text-slate-700 hover:text-[#0F172A] transition-colors py-1.5 px-1"
          >
            Playbooks
          </Link>

          <Link
            href="/#faq"
            className="whitespace-nowrap text-[13.5px] 2xl:text-[14px] font-semibold text-slate-700 hover:text-[#0F172A] transition-colors py-1.5 px-1"
          >
            FAQ
          </Link>
        </nav>

        {/* Right Action Cluster */}
        <div className="flex items-center gap-2.5 sm:gap-3 2xl:gap-3.5 shrink-0">
          <Link
            href="/dashboard"
            className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-3.5 py-1.5 text-[12.5px] 2xl:text-[13px] font-bold text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition-colors"
          >
            <LayoutDashboard className="h-3.5 w-3.5 text-slate-500 shrink-0" />
            <span>Dashboard</span>
          </Link>

          {/* Primary 3D CTA Button — Start Studio */}
          <Link
            href="/create"
            className="group relative inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-b from-[#F0232D] via-[#E50914] to-[#C80711] px-5 py-2.5 text-[13.5px] font-extrabold text-white shadow-[0_4px_14px_rgba(229,9,20,0.38),inset_0_1px_0_rgba(255,255,255,0.38),inset_0_-2px_0_rgba(0,0,0,0.22)] hover:shadow-[0_6px_20px_rgba(229,9,20,0.48),inset_0_1px_0_rgba(255,255,255,0.45),inset_0_-2px_0_rgba(0,0,0,0.24)] hover:-translate-y-0.5 active:translate-y-0.5 active:shadow-[0_2px_6px_rgba(229,9,20,0.3),inset_0_1px_2px_rgba(0,0,0,0.3)] whitespace-nowrap transition-all duration-150"
          >
            <span>Start Studio</span>
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-150 group-hover:translate-x-0.5" />
          </Link>

          {/* Mobile Menu Hamburger Toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl text-slate-700 hover:bg-slate-100 xl:hidden transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-b border-slate-200 bg-white px-5 py-5 shadow-xl transition-all animate-in slide-in-from-top-2 duration-150">
          <nav className="flex flex-col space-y-1">
            <Link
              href="/#how-it-works"
              onClick={() => setMobileMenuOpen(false)}
              className="px-2 py-2 text-sm font-semibold text-slate-700 hover:text-[#E50914] rounded-lg hover:bg-slate-50 transition-colors"
            >
              How it works
            </Link>
            <Link
              href="/#agents"
              onClick={() => setMobileMenuOpen(false)}
              className="px-2 py-2 text-sm font-semibold text-slate-700 hover:text-[#E50914] rounded-lg hover:bg-slate-50 transition-colors"
            >
              9 AI Agents
            </Link>
            <Link
              href="/tools"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between px-2 py-2 text-sm font-semibold text-slate-700 hover:text-[#E50914] rounded-lg hover:bg-slate-50 transition-colors"
            >
              <span>Free Tools</span>
              <span className="rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 px-2 py-0.5 text-xs font-bold">12 Tools</span>
            </Link>
            <Link
              href="/leads"
              onClick={() => setMobileMenuOpen(false)}
              className="px-2 py-2 text-sm font-semibold text-slate-700 hover:text-[#E50914] rounded-lg hover:bg-slate-50 transition-colors"
            >
              CRM Leads
            </Link>
            <Link
              href="/academy"
              onClick={() => setMobileMenuOpen(false)}
              className="px-2 py-2 text-sm font-semibold text-slate-700 hover:text-[#E50914] rounded-lg hover:bg-slate-50 transition-colors"
            >
              Academy
            </Link>
            <Link
              href="/pricing"
              onClick={() => setMobileMenuOpen(false)}
              className="px-2 py-2 text-sm font-semibold text-slate-700 hover:text-[#E50914] rounded-lg hover:bg-slate-50 transition-colors"
            >
              Pricing
            </Link>
            <Link
              href="/blog"
              onClick={() => setMobileMenuOpen(false)}
              className="px-2 py-2 text-sm font-semibold text-slate-700 hover:text-[#E50914] rounded-lg hover:bg-slate-50 transition-colors"
            >
              Playbooks
            </Link>
            <Link
              href="/#faq"
              onClick={() => setMobileMenuOpen(false)}
              className="px-2 py-2 text-sm font-semibold text-slate-700 hover:text-[#E50914] rounded-lg hover:bg-slate-50 transition-colors"
            >
              FAQ
            </Link>
            <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
              <Link
                href="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm font-bold text-slate-700 shadow-sm"
              >
                <LayoutDashboard className="h-4 w-4 text-slate-600" />
                <span>Dashboard</span>
              </Link>
              <Link
                href="/create"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-b from-[#EF1E28] to-[#C80711] px-4 py-2.5 text-sm font-bold text-white shadow-md shadow-red-500/20"
              >
                <span>Start Studio</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
