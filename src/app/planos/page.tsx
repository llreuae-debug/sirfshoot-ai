'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SidebarDrawer from '@/components/SidebarDrawer';
import { useCreatorStore } from '@/lib/store';
import { PlanType } from '@/lib/types';
import {
  Sparkles,
  Check,
  Zap,
  Crown,
  ShieldCheck,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
} from 'lucide-react';

export default function PlanosPage() {
  const { state, loginAsAdmin } = useCreatorStore();
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('annual');
  const [activatedPlan, setActivatedPlan] = useState<string | null>(null);

  const plans: Array<{
    id: PlanType;
    name: string;
    badge?: string;
    priceMonthly: string;
    priceAnnual: string;
    description: string;
    features: string[];
    highlighted?: boolean;
    cta: string;
  }> = [
    {
      id: 'starter',
      name: 'Starter Creator',
      priceMonthly: '$39 / PKR 5,500',
      priceAnnual: '$29 / PKR 4,500',
      description: 'Ideal for solo agents and creators looking to professionalize their video marketing.',
      features: [
        'Up to 10 Video Projects with 9 AI Agents',
        'Social Post Studio 2.0 (High-res templates)',
        'Unlimited AI Property Descriptions',
        'Leads CRM Pipeline (Up to 50 active contacts)',
        'Standard Email & Community Support',
      ],
      cta: 'Start with Starter',
    },
    {
      id: 'creator',
      name: 'PRO Real Estate',
      badge: 'Most Popular',
      priceMonthly: '$69 / PKR 11,000',
      priceAnnual: '$55 / PKR 8,900',
      description: 'For active brokers and creators who demand high traction and rapid turnarounds.',
      highlighted: true,
      features: [
        'Unlimited Video Scripts & 9-Agent Pipeline',
        'Automated Multi-Scene Video Generator',
        'Neural AI Voiceovers & Voice Cloning',
        'AI Property Valuation Engine',
        'Multi-Bank Mortgage Simulator',
        'Unlimited Leads CRM & WhatsApp Integration',
        'Full Access to SirfShoot Academy',
      ],
      cta: 'Upgrade to PRO',
    },
    {
      id: 'studio',
      name: 'Studio VIP & Agency',
      badge: 'Enterprise VIP',
      priceMonthly: '$129 / PKR 22,000',
      priceAnnual: '$99 / PKR 17,900',
      description: 'For top-producing brokerages, production agencies, and media channels.',
      features: [
        'Everything in PRO, plus:',
        '9,999 Production Credits per Month',
        'Priority 4K Cloud Video Rendering',
        'Custom Brand Overlays & White-Label Exports',
        'Dedicated Account Manager & VIP Support',
      ],
      cta: 'Unlock Studio VIP',
    },
  ];

  const handleSelectPlan = (planId: string) => {
    setActivatedPlan(planId);
    setTimeout(() => setActivatedPlan(null), 3000);
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#F8FAFC]">
      <SidebarDrawer />
      <Navbar />

      <main className="flex-1 py-8 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-red-100 px-3 py-1 text-xs font-bold text-[#E50914] uppercase tracking-wide">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Investment Plans & Access Levels</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
              Scale Your Listings with the <span className="text-[#E50914]">Ultimate AI Suite</span>
            </h1>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Choose the tier that matches your production volume. All plans include full access to the 9-Agent Video Studio.
            </p>

            {/* Monthly / Annual Switcher */}
            <div className="inline-flex items-center rounded-2xl border border-slate-200 bg-white p-1.5 shadow-xs">
              <button
                type="button"
                onClick={() => setBillingCycle('monthly')}
                className={`rounded-xl px-4 py-2 text-xs font-black transition ${
                  billingCycle === 'monthly'
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Monthly Billing
              </button>
              <button
                type="button"
                onClick={() => setBillingCycle('annual')}
                className={`flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-black transition ${
                  billingCycle === 'annual'
                    ? 'bg-[#E50914] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <span>Annual (Save 20%)</span>
                <span className="rounded-full bg-white/20 px-1.5 py-0.2 text-[9px] font-black uppercase">
                  Best Value
                </span>
              </button>
            </div>
          </div>

          {/* Pricing Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            {plans.map((p) => {
              const price = billingCycle === 'annual' ? p.priceAnnual : p.priceMonthly;
              const isCurrent = state.plan === p.id;

              return (
                <div
                  key={p.id}
                  className={`relative flex flex-col justify-between rounded-3xl p-8 transition-all duration-300 ${
                    p.highlighted
                      ? 'border-2 border-[#E50914] bg-white shadow-2xl ring-4 ring-red-500/10'
                      : 'border border-slate-200 bg-white shadow-sm hover:shadow-lg'
                  }`}
                >
                  {p.badge && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                      <span className="rounded-full bg-[#E50914] px-4 py-1 text-[11px] font-black uppercase tracking-wider text-white shadow-md">
                        {p.badge}
                      </span>
                    </div>
                  )}

                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-black text-slate-900">{p.name}</h3>
                      <p className="text-xs text-slate-500 mt-1 min-h-[32px] leading-relaxed">
                        {p.description}
                      </p>
                    </div>

                    <div className="border-y border-slate-100 py-4">
                      <div className="text-2xl sm:text-3xl font-black text-slate-900 font-mono">
                        {price}
                      </div>
                      <span className="text-[11px] text-slate-400">
                        {billingCycle === 'annual' ? 'billed annually' : 'billed monthly'}
                      </span>
                    </div>

                    <ul className="space-y-3">
                      {p.features.map((feat) => (
                        <li key={feat} className="flex items-start gap-2.5 text-xs text-slate-700">
                          <Check className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span className="leading-relaxed">{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-8">
                    <button
                      type="button"
                      onClick={() => handleSelectPlan(p.id)}
                      className={`w-full flex items-center justify-center gap-2 rounded-2xl py-3.5 text-xs sm:text-sm font-extrabold transition shadow-md ${
                        p.highlighted
                          ? 'bg-[#E50914] text-white hover:bg-[#B91C1C]'
                          : 'bg-slate-900 text-white hover:bg-slate-800'
                      }`}
                    >
                      <span>{isCurrent ? 'Current Plan' : p.cta}</span>
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quick Admin Override Link */}
          {state.email !== 'llre.uae@gmail.com' && (
            <div className="text-center pt-4">
              <button
                type="button"
                onClick={loginAsAdmin}
                className="text-xs font-bold text-slate-400 hover:text-purple-700 transition"
              >
                Sign in with Super-Admin credentials (llre.uae@gmail.com)
              </button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
