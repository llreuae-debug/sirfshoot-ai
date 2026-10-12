'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SidebarDrawer from '@/components/SidebarDrawer';
import { useCreatorStore } from '@/lib/store';
import {
  CreditCard,
  ShieldCheck,
  Zap,
  Calendar,
  Sparkles,
  ArrowLeft,
  CheckCircle2,
  RefreshCw,
  ExternalLink,
} from 'lucide-react';

export default function MinhaAssinaturaPage() {
  const { state, loginAsAdmin } = useCreatorStore();
  const [refillSuccess, setRefillSuccess] = useState(false);

  const handleRefillCredits = () => {
    loginAsAdmin();
    setRefillSuccess(true);
    setTimeout(() => setRefillSuccess(false), 3000);
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#F8FAFC]">
      <SidebarDrawer />
      <Navbar />

      <main className="flex-1 py-8 sm:py-12">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-8">
          {/* Header */}
          <div className="flex items-center gap-3 border-b border-slate-200 pb-6">
            <Link
              href="/dashboard"
              className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition"
              title="Back to Dashboard"
            >
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-white shadow-md">
              <CreditCard className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                My Subscription
              </h1>
              <p className="text-xs text-slate-500">
                Manage your production AI credits, billing cycles, and workspace account details.
              </p>
            </div>
          </div>

          {/* Current Plan Card */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-6">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Current Active Plan
                </span>
                <div className="flex items-center gap-2 mt-1">
                  <h2 className="text-2xl font-black text-slate-900 capitalize">
                    {state.plan} Studio Tier
                  </h2>
                  {state.role === 'admin' ? (
                    <span className="rounded-full bg-purple-100 border border-purple-200 px-2.5 py-0.5 text-xs font-bold text-purple-700 uppercase flex items-center gap-1">
                      <ShieldCheck className="h-3 w-3" />
                      ADMIN VIP
                    </span>
                  ) : (
                    <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-bold text-emerald-700 uppercase">
                      Active
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  Account registered to: <strong className="text-slate-800">{state.email}</strong>
                </p>
              </div>

              <Link
                href="/planos"
                className="btn-shadow inline-flex items-center justify-center rounded-xl bg-slate-900 hover:bg-slate-800 px-5 py-2.5 text-xs font-bold text-white transition"
              >
                Change Plan
              </Link>
            </div>

            {/* Credits & Usage Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="rounded-2xl border border-slate-100 bg-slate-50/80 p-4 space-y-1">
                <span className="text-[10px] font-bold uppercase text-slate-400">Credits Remaining</span>
                <div className="text-2xl font-black text-[#E50914] font-mono">
                  {state.creditsRemaining}{' '}
                  <span className="text-sm font-normal text-slate-400">/ {state.creditsTotal}</span>
                </div>
                <p className="text-[10px] text-slate-500">Renews in {state.trialDaysRemaining} days</p>
              </div>

              <div className="rounded-2xl border border-slate-100 bg-slate-50/80 p-4 space-y-1">
                <span className="text-[10px] font-bold uppercase text-slate-400">Produced Projects</span>
                <div className="text-2xl font-black text-slate-900 font-mono">
                  {state.projects.length}
                </div>
                <p className="text-[10px] text-emerald-600 font-semibold">9 AI agents executed per video</p>
              </div>

              <div className="rounded-2xl border border-slate-100 bg-slate-50/80 p-4 space-y-1">
                <span className="text-[10px] font-bold uppercase text-slate-400">CRM Active Leads</span>
                <div className="text-2xl font-black text-slate-900 font-mono">
                  {(state.leads || []).length}
                </div>
                <p className="text-[10px] text-slate-500">With instant WhatsApp messaging</p>
              </div>
            </div>

            {/* Quick Refill Button */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-2xl bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent border border-amber-200/60 p-4">
              <div className="flex items-center gap-2.5">
                <Zap className="h-5 w-5 text-amber-600" />
                <div>
                  <div className="text-xs font-bold text-slate-900">
                    Need more production credits to render video projects?
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Refill immediately or activate Creator &amp; Real Estate mode.
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={handleRefillCredits}
                className="rounded-xl bg-amber-500 hover:bg-amber-600 px-4 py-2 text-xs font-black text-black shadow-xs transition"
              >
                {refillSuccess ? (
                  <span className="flex items-center gap-1 text-black">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    Credits Refilled (9,999)!
                  </span>
                ) : (
                  'Refill Credits (Admin Mode)'
                )}
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
