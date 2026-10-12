'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Check, Sparkles, ArrowRight, ChevronDown, ShieldCheck, Zap } from 'lucide-react';

export default function PricingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  const plans = [
    {
      name: 'Free Trial',
      price: 'PKR 0',
      period: '7 days',
      desc: 'Try the complete 9-agent pipeline risk-free.',
      volume: '2 full scripts included',
      features: [
        'Complete 9-agent pipeline',
        'Tone Fingerprint generation',
        'Visual storyboard with AI prompts',
        '3 thumbnail concepts & rendering',
        'Full SEO & chapter markers',
        'No credit card required',
      ],
      btnText: 'Start Free Trial',
      btnHref: '/create',
      isPopular: false,
    },
    {
      name: 'Starter',
      price: 'PKR 499',
      period: '/ month',
      desc: 'For part-time and beginning creators.',
      volume: '3 full scripts / month',
      features: [
        '3 complete video packages / mo',
        'Full 9-agent pipeline on all',
        '1 channel Tone Fingerprint',
        'Visual storyboard shot-lists',
        'Safe, Bold & Experimental thumbnails',
        'Teleprompter & Markdown export',
        'Email customer support',
      ],
      btnText: 'Choose Starter',
      btnHref: '/create',
      isPopular: false,
    },
    {
      name: 'Creator',
      price: 'PKR 999',
      period: '/ month',
      desc: 'Shipping consistently · 1-2 videos/week.',
      volume: '7 full scripts / month',
      features: [
        '7 complete video packages / mo',
        'Everything in Starter included',
        'Unlimited Tone Fingerprint profiles',
        'Same complete studio on every script',
        'Section-by-section script refinement',
        'Email + WhatsApp priority support',
        '3-5 vertical shorts on every video',
      ],
      btnText: 'Go Creator Plan',
      btnHref: '/create',
      isPopular: true,
    },
    {
      name: 'Pro',
      price: 'PKR 1,999',
      period: '/ month',
      desc: 'Daily uploaders & high-volume channels.',
      volume: '15 full scripts / month',
      features: [
        '15 complete video packages / mo',
        'Everything in Creator included',
        'Priority AI pipeline processing',
        'Multi-channel project workspaces',
        'Dedicated WhatsApp concierge',
        'Early access to new agent models',
        'Commercial studio rights',
      ],
      btnText: 'Get Pro Plan',
      btnHref: '/create',
      isPopular: false,
    },
  ];

  const comparisonRows = [
    { feature: 'Topic Research & Trend Scoring', trial: true, starter: true, creator: true, pro: true },
    { feature: 'Multi-Source Script Brief & Facts', trial: true, starter: true, creator: true, pro: true },
    { feature: 'Fact-Check & Claim Verification', trial: true, starter: true, creator: true, pro: true },
    { feature: 'Legal & SECP Safety Review', trial: true, starter: true, creator: true, pro: true },
    { feature: 'Tone Fingerprint Voice Cloning', trial: true, starter: true, creator: true, pro: true },
    { feature: 'Visual Storyboard & Shot List', trial: true, starter: true, creator: true, pro: true },
    { feature: '3 Thumbnail Concepts & Prompts', trial: true, starter: true, creator: true, pro: true },
    { feature: 'Live AI Thumbnail Visual Rendering', trial: true, starter: true, creator: true, pro: true },
    { feature: 'YouTube SEO, Titles & Chapters', trial: true, starter: true, creator: true, pro: true },
    { feature: '3–5 Vertical Shorts & IG Captions', trial: true, starter: true, creator: true, pro: true },
    { feature: 'Studio Teleprompter with Mirror Mode', trial: true, starter: true, creator: true, pro: true },
    { feature: 'Priority Queue Processing', trial: false, starter: false, creator: true, pro: true },
    { feature: 'Dedicated WhatsApp Support', trial: false, starter: false, creator: true, pro: true },
  ];

  const faqs = [
    {
      q: 'Why does every plan get the full 9-agent pipeline?',
      a: 'We do not believe in artificial feature-gating. You cannot ship a great video with just a script and no thumbnails or SEO. Every plan runs the entire 9-agent pipeline; plans differ only by how many videos you ship per month.',
    },
    {
      q: 'Are all prices quoted in PKR?',
      a: 'Yes. All prices listed on Tameeros Shorts are quoted in Pakistani Rupees (PKR). You will receive an official digital invoice upon subscription confirmation.',
    },
    {
      q: 'Do unused scripts roll over to the next month?',
      a: 'Unused script allocations reset at the start of each monthly billing cycle and do not roll over.',
    },
    {
      q: 'Can I cancel or upgrade anytime?',
      a: 'Yes. You can upgrade, downgrade, or cancel your subscription at any time with one click from your account settings. There are no cancellation penalties or retention calls.',
    },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-[#F8FAFC]">
      <Navbar />

      <main className="flex-1 py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8 space-y-16">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-[#E50914]">PRICING & PLANS</span>
            <h1 className="text-4xl sm:text-5xl font-black text-[#0F172A] tracking-tight">
              Simple, transparent pricing. <br className="hidden sm:inline" />
              <span className="text-[#E50914]">Every plan is full power.</span>
            </h1>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              No hidden add-ons. Every plan runs the full 9-agent production pipeline from research to ready-to-shoot.
            </p>
          </div>

          {/* Pricing Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {plans.map((p) => (
              <div
                key={p.name}
                className={`relative rounded-3xl border bg-white p-6 sm:p-7 flex flex-col justify-between transition ${
                  p.isPopular
                    ? 'border-2 border-[#E50914] shadow-xl'
                    : 'border-slate-200 card-shadow'
                }`}
              >
                {p.isPopular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-[#E50914] px-4 py-0.5 text-[10px] font-black uppercase tracking-widest text-white">
                    MOST POPULAR
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-bold text-slate-900">{p.name}</h3>
                    <span className="rounded bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-600 font-mono">
                      {p.volume.split(' ')[0]}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mb-4">{p.desc}</p>

                  <div className="mb-4">
                    <span className="text-3xl sm:text-4xl font-black text-slate-900">{p.price}</span>
                    <span className="text-xs text-slate-500 ml-1">{p.period}</span>
                  </div>

                  <div className="rounded-xl bg-slate-50 border border-slate-100 p-2.5 text-xs font-bold text-slate-800 mb-6">
                    {p.volume}
                  </div>

                  <ul className="space-y-2.5 text-xs text-slate-600 mb-8">
                    {p.features.map((feat) => (
                      <li key={feat} className="flex items-start gap-2">
                        <Check className="h-3.5 w-3.5 text-[#E50914] shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  href={p.btnHref}
                  className={`w-full inline-flex items-center justify-center rounded-full py-3 text-xs font-bold transition ${
                    p.isPopular
                      ? 'btn-shadow bg-[#E50914] text-white hover:bg-[#B91C1C]'
                      : 'border border-slate-300 bg-slate-50 text-slate-800 hover:bg-slate-100'
                  }`}
                >
                  {p.btnText}
                </Link>
              </div>
            ))}
          </div>

          <div className="text-center font-mono text-xs text-slate-500">
            All prices in Pakistani Rupees (PKR) • Cancel anytime with one click • Safe 256-bit encrypted checkout
          </div>

          {/* DETAILED FEATURE COMPARISON TABLE */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-10 card-shadow space-y-6">
            <h3 className="text-2xl font-black text-slate-900 text-center sm:text-left">
              Detailed Plan Comparison
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase text-[11px]">
                    <th className="py-3 pr-4">Pipeline Feature</th>
                    <th className="py-3 px-3 text-center">Trial</th>
                    <th className="py-3 px-3 text-center">Starter</th>
                    <th className="py-3 px-3 text-center text-[#E50914]">Creator</th>
                    <th className="py-3 px-3 text-center">Pro</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {comparisonRows.map((row) => (
                    <tr key={row.feature} className="hover:bg-slate-50/70 transition">
                      <td className="py-3.5 pr-4 font-medium text-slate-900">{row.feature}</td>
                      <td className="py-3.5 px-3 text-center">
                        {row.trial ? <Check className="h-4 w-4 text-emerald-600 inline" /> : '—'}
                      </td>
                      <td className="py-3.5 px-3 text-center">
                        {row.starter ? <Check className="h-4 w-4 text-emerald-600 inline" /> : '—'}
                      </td>
                      <td className="py-3.5 px-3 text-center bg-red-50/30">
                        {row.creator ? <Check className="h-4 w-4 text-[#E50914] inline" /> : '—'}
                      </td>
                      <td className="py-3.5 px-3 text-center">
                        {row.pro ? <Check className="h-4 w-4 text-emerald-600 inline" /> : '—'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* FAQS */}
          <div className="max-w-3xl mx-auto space-y-6">
            <h3 className="text-2xl font-black text-slate-900 text-center">
              Billing & Subscription FAQ
            </h3>

            <div className="space-y-3">
              {faqs.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div key={faq.q} className="rounded-2xl border border-slate-200 bg-white overflow-hidden card-shadow">
                    <button
                      type="button"
                      onClick={() => toggleFaq(idx)}
                      className="flex w-full items-center justify-between p-4 sm:p-5 text-left font-bold text-sm text-slate-900 hover:bg-slate-50 transition"
                    >
                      <span>{faq.q}</span>
                      <ChevronDown
                        className={`h-4 w-4 text-slate-400 transition-transform ${
                          isOpen ? 'rotate-180 text-[#E50914]' : ''
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
