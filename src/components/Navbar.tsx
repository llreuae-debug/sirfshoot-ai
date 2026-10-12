'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  Menu,
  X,
  ArrowRight,
  ShieldCheck,
  Check,
  UserCheck,
  Users,
} from 'lucide-react';
import { useCreatorStore } from '@/lib/store';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showAccountModal, setShowAccountModal] = useState(false);
  const { state, loginAsAdmin, loginWithEmail } = useCreatorStore();

  const isAdmin = state.role === 'admin' || state.email?.toLowerCase() === 'llre.uae@gmail.com';

  const handleSelectAccount = (accountType: 'admin' | 'creator') => {
    if (accountType === 'admin') {
      loginAsAdmin();
    } else {
      loginWithEmail('creator@tameeros.com', 'Hamza Khan');
    }
    setShowAccountModal(false);
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/95 backdrop-blur-md shadow-[0_1px_3px_0_rgba(15,23,42,0.03)] transition-all">
        <div className="mx-auto flex h-[76px] w-full max-w-[1560px] items-center justify-between px-4 sm:px-6 lg:px-8 xl:px-10">
          
          {/* Brand Logo & Wordmark */}
          <Link
            href="/"
            className="group flex items-center gap-3 shrink-0"
            aria-label="Tameeros Shorts Home"
          >
            {/* 3D Red Brand Icon */}
            <div className="relative flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl bg-gradient-to-b from-[#F0232D] via-[#E50914] to-[#C80711] text-white shadow-[0_3px_8px_rgba(229,9,20,0.32),inset_0_1px_0_rgba(255,255,255,0.4),inset_0_-2px_0_rgba(0,0,0,0.18)] transition-all duration-200 group-hover:scale-105 group-hover:shadow-[0_5px_12px_rgba(229,9,20,0.4),inset_0_1px_0_rgba(255,255,255,0.5)]">
              <Sparkles className="h-4.5 w-4.5 fill-white/20 text-white" />
            </div>

            {/* Wordmark */}
            <div className="flex items-center font-black text-[20px] sm:text-[21px] tracking-tight leading-none select-none">
              <span className="text-[#0F172A]">Tameeros</span>
              <span className="ml-1.5 rounded-md bg-[#E50914] text-white px-2 py-0.5 text-[10px] font-black tracking-wider uppercase leading-none shadow-xs">
                Shorts
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
              href="/cursos"
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
            {/* Secondary 3D Button — Creator & Real Estate */}
            <Link
              href="/dashboard"
              className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-purple-200/90 bg-gradient-to-b from-purple-50/90 via-purple-50/60 to-purple-100/70 px-3.5 py-1.5 text-[12.5px] 2xl:text-[13px] font-extrabold text-purple-700 shadow-[0_2px_6px_rgba(147,51,234,0.12),inset_0_1px_0_rgba(255,255,255,0.9),inset_0_-1px_0_rgba(147,51,234,0.1)] hover:border-purple-300 hover:shadow-[0_4px_12px_rgba(147,51,234,0.22),inset_0_1px_0_rgba(255,255,255,1)] hover:-translate-y-0.5 active:translate-y-0.5 whitespace-nowrap transition-all duration-150"
              title="Creator & Real Estate (Quick Access)"
            >
              <ShieldCheck className="h-3.5 w-3.5 text-purple-600 shrink-0" />
              <span>Creator & Real Estate</span>
            </Link>

            {/* Switch Account Action */}
            <button
              type="button"
              onClick={() => setShowAccountModal(true)}
              className="hidden lg:inline-flex items-center gap-1.5 whitespace-nowrap text-[13px] 2xl:text-[13.5px] font-semibold text-slate-700 hover:text-[#0F172A] px-2.5 py-1.5 rounded-lg transition-colors hover:bg-slate-100/80 active:scale-95"
              aria-label="Switch current account"
            >
              <Users className="h-3.5 w-3.5 text-slate-500" />
              <span>Switch Account</span>
            </button>

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
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Navigation</span>
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setShowAccountModal(true);
                }}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 px-2.5 py-1 rounded-full transition-colors"
              >
                <Users className="h-3 w-3 text-slate-500" />
                <span>Switch Account</span>
              </button>
            </div>

            <nav className="flex flex-col space-y-2">
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
                href="/cursos"
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
                  className="flex items-center justify-center gap-2 rounded-xl border border-purple-200 bg-purple-50/80 px-4 py-2.5 text-sm font-bold text-purple-700 shadow-sm"
                >
                  <ShieldCheck className="h-4 w-4 text-purple-600" />
                  <span>Creator & Real Estate</span>
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

      {/* Switch Account Modal */}
      {showAccountModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-150"
          onClick={() => setShowAccountModal(false)}
        >
          <div
            className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl border border-slate-200 animate-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-50 text-purple-600 border border-purple-200">
                  <UserCheck className="h-4.5 w-4.5" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-slate-900">Switch Account</h3>
                  <p className="text-xs text-slate-500">Select active profile or sign in</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowAccountModal(false)}
                className="h-8 w-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
                aria-label="Close dialog"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-5 space-y-3">
              {/* Creator Account Card */}
              <button
                type="button"
                onClick={() => handleSelectAccount('creator')}
                className={`w-full flex items-center justify-between p-3.5 rounded-xl border text-left transition-all ${
                  !isAdmin
                    ? 'border-emerald-500 bg-emerald-50/40 ring-2 ring-emerald-500/20 shadow-sm'
                    : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-sm">
                    HK
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-sm text-slate-900">Hamza Khan</span>
                      <span className="rounded bg-slate-100 text-slate-700 text-[10px] font-extrabold px-1.5 py-0.2">
                        Creator Plan
                      </span>
                    </div>
                    <span className="text-xs text-slate-500">creator@tameeros.com</span>
                  </div>
                </div>
                {!isAdmin && (
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-600 text-white">
                    <Check className="h-3.5 w-3.5 stroke-[3]" />
                  </div>
                )}
              </button>

              {/* Super Admin Account Card */}
              <button
                type="button"
                onClick={() => handleSelectAccount('admin')}
                className={`w-full flex items-center justify-between p-3.5 rounded-xl border text-left transition-all ${
                  isAdmin
                    ? 'border-purple-500 bg-purple-50/40 ring-2 ring-purple-500/20 shadow-sm'
                    : 'border-slate-200 hover:border-purple-200 hover:bg-purple-50/30'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-purple-600 to-indigo-700 text-white flex items-center justify-center font-bold text-sm">
                    <ShieldCheck className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-sm text-slate-900">LLRE UAE Admin</span>
                      <span className="rounded bg-purple-100 text-purple-700 text-[10px] font-extrabold px-1.5 py-0.2">
                        Super Admin
                      </span>
                    </div>
                    <span className="text-xs text-slate-500">llre.uae@gmail.com</span>
                  </div>
                </div>
                {isAdmin && (
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-purple-600 text-white">
                    <Check className="h-3.5 w-3.5 stroke-[3]" />
                  </div>
                )}
              </button>
            </div>

            <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
              <Link
                href="/login"
                onClick={() => setShowAccountModal(false)}
                className="text-xs font-bold text-red-600 hover:text-red-700 hover:underline"
              >
                Sign in with another email →
              </Link>
              <button
                type="button"
                onClick={() => setShowAccountModal(false)}
                className="rounded-lg px-3.5 py-1.5 text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
