'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import {
  RotateCcw,
  CheckCircle2,
  Clock,
  CreditCard,
  ShieldCheck,
  HelpCircle,
  FileCheck,
  Smartphone,
  Building,
} from 'lucide-react';

export default function RefundPolicyPage() {
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: 'How does the 14-Day Creator Guarantee work?',
      a: 'If you are a first-time subscriber on any paid plan (Starter, Creator, or Pro) and have generated fewer than 3 video production packages, you are entitled to a full 100% refund within 14 days of your initial payment — no questions asked.',
    },
    {
      q: 'Can I cancel my subscription anytime without penalties?',
      a: 'Yes. You can cancel your subscription with 1 click directly in your Account Settings at /settings. Your plan will remain active with full access to your remaining credits until the end of your current paid billing period, and your card will never be charged again.',
    },
    {
      q: 'How long do refunds take to reflect in JazzCash or EasyPaisa?',
      a: 'Mobile wallet refunds through JazzCash and EasyPaisa typically process within 2 to 4 business days once approved by our billing desk.',
    },
    {
      q: 'What happens to my generated scripts if I cancel?',
      a: 'You retain full commercial ownership of all scripts, thumbnails, and storyboards you created forever. They will remain downloadable in your project archive even after your subscription ends.',
    },
    {
      q: 'What if I was charged twice due to a network glitch?',
      a: 'Duplicate transactions or processing errors are verified immediately by our Guardian AI monitoring system and refunded automatically within 24 hours of notification.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#0C0C0F] text-slate-100 flex flex-col selection:bg-[#E50914] selection:text-white">
      <Navbar />

      {/* Hero Header */}
      <section className="relative border-b border-white/[0.08] bg-gradient-to-b from-white/[0.04] to-transparent pt-12 pb-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto space-y-4">
          <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-400">
            <Link href="/" className="hover:text-white transition">Home</Link>
            <span>/</span>
            <span className="text-[#E50914]">Legal</span>
            <span>/</span>
            <span className="text-white">Refund & Cancellation</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pt-2">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold mb-3">
                <ShieldCheck className="h-3.5 w-3.5" />
                <span>14-Day 100% Money-Back Creator Guarantee</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
                Tameeros Shorts <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-amber-500">Refund & Cancellation</span> Policy
              </h1>
              <p className="mt-3 text-base text-slate-300 max-w-2xl leading-relaxed">
                Fair, transparent, and hassle-free cancellation and refund guidelines for all Tameeros Shorts creators.
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <a
                href="mailto:refunds@tameeros.com"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.08] hover:bg-white/[0.14] border border-white/10 text-xs font-bold text-white transition"
              >
                <RotateCcw className="h-4 w-4 text-[#E50914]" />
                Request Refund Support
              </a>
            </div>
          </div>

          {/* Guarantee Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6">
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] space-y-2">
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
                <CheckCircle2 className="h-4 w-4" />
                <span>14-Day Risk-Free</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Full 100% refund for first-time paid users who generated fewer than 3 complete video packages.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] space-y-2">
              <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-wider">
                <Clock className="h-4 w-4" />
                <span>1-Click Cancellation</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Cancel instantly inside Account Settings. No need to speak to sales or navigate confusing phone lines.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] space-y-2">
              <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
                <FileCheck className="h-4 w-4" />
                <span>Keep Your Scripts</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                All scripts, thumbnails, and assets created remain yours to monetize and keep forever.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Body */}
      <main className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12 space-y-12 text-sm leading-relaxed text-slate-300">

        {/* Section 1: Cancellation Policy */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white flex items-center gap-3">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#E50914]/20 text-[#E50914] text-xs font-black">1</span>
            How Subscription Cancellation Works
          </h2>
          <p>
            At Tameeros Shorts, we believe in creator freedom. You are never locked into long-term contracts.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-2">
              <div className="flex items-center gap-2 text-white font-bold text-xs">
                <span className="h-5 w-5 rounded-full bg-red-500/20 text-[#E50914] flex items-center justify-center text-xs">A</span>
                Instant Self-Serve
              </div>
              <p className="text-xs text-slate-400">
                Navigate to <strong>Settings → Subscription & Billing</strong> and click &quot;Cancel Subscription&quot;. Your decision takes effect immediately.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-2">
              <div className="flex items-center gap-2 text-white font-bold text-xs">
                <span className="h-5 w-5 rounded-full bg-red-500/20 text-[#E50914] flex items-center justify-center text-xs">B</span>
                Active Until Expiry
              </div>
              <p className="text-xs text-slate-400">
                You retain full premium access to generate videos using your current credit allocation until the end of your billing cycle.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-2">
              <div className="flex items-center gap-2 text-white font-bold text-xs">
                <span className="h-5 w-5 rounded-full bg-red-500/20 text-[#E50914] flex items-center justify-center text-xs">C</span>
                Zero Surprise Charges
              </div>
              <p className="text-xs text-slate-400">
                Once cancelled, your payment method will never be billed again unless you manually re-subscribe in the future.
              </p>
            </div>
          </div>
        </section>

        {/* Section 2: 14-Day Refund Guarantee Details */}
        <section className="space-y-4 border-t border-white/[0.08] pt-8">
          <h2 className="text-2xl font-bold text-white flex items-center gap-3">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#E50914]/20 text-[#E50914] text-xs font-black">2</span>
            14-Day Money-Back Creator Guarantee Terms
          </h2>
          <p>
            We stand behind the quality of our autonomous 9-agent pipeline. If you are a first-time subscriber and test Tameeros Shorts, you can request a 100% refund under the following conditions:
          </p>
          <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs space-y-2">
            <p className="font-bold text-sm text-emerald-200">Eligibility Criteria:</p>
            <ul className="space-y-1.5 list-disc list-inside">
              <li>Your request is submitted within <strong>14 calendar days</strong> of your initial subscription purchase.</li>
              <li>You have generated <strong>fewer than 3 full video production packages</strong> during the subscription period.</li>
              <li>Your account has not violated our Acceptable Use Policy (no non-consensual voice cloning or illegal content).</li>
            </ul>
          </div>
        </section>

        {/* Section 3: Processing Timelines by Gateway */}
        <section className="space-y-4 border-t border-white/[0.08] pt-8">
          <h2 className="text-2xl font-bold text-white flex items-center gap-3">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#E50914]/20 text-[#E50914] text-xs font-black">3</span>
            Refund Processing Windows & Payment Gateways
          </h2>
          <p>
            Once approved by our billing desk, refunds are returned to the original payment method:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
            <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-1">
              <div className="flex items-center gap-2 text-white font-bold">
                <Smartphone className="h-4 w-4 text-emerald-400" />
                <span>JazzCash</span>
              </div>
              <p className="text-slate-400"><strong>2 to 4 business days</strong> credited directly to your mobile account wallet.</p>
            </div>

            <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-1">
              <div className="flex items-center gap-2 text-white font-bold">
                <Smartphone className="h-4 w-4 text-emerald-400" />
                <span>EasyPaisa</span>
              </div>
              <p className="text-slate-400"><strong>2 to 4 business days</strong> returned to your mobile balance or linked debit card.</p>
            </div>

            <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-1">
              <div className="flex items-center gap-2 text-white font-bold">
                <Building className="h-4 w-4 text-cyan-400" />
                <span>PayFast & 1Link</span>
              </div>
              <p className="text-slate-400"><strong>3 to 5 business days</strong> depending on your Pakistani issuing bank (HBL, Meezan, Alfalah).</p>
            </div>

            <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-1">
              <div className="flex items-center gap-2 text-white font-bold">
                <CreditCard className="h-4 w-4 text-amber-400" />
                <span>Cards (Visa/Mastercard)</span>
              </div>
              <p className="text-slate-400"><strong>5 to 10 business days</strong> per international banking settlement protocols.</p>
            </div>
          </div>
        </section>

        {/* Section 4: Non-Refundable Scenarios */}
        <section className="space-y-4 border-t border-white/[0.08] pt-8">
          <h2 className="text-2xl font-bold text-white flex items-center gap-3">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#E50914]/20 text-[#E50914] text-xs font-black">4</span>
            Exceptions & Non-Refundable Scenarios
          </h2>
          <p>
            Due to the real-time computational infrastructure costs incurred across AI inference clusters, the following are non-refundable:
          </p>
          <ul className="space-y-2 text-xs text-slate-300 list-disc list-inside pl-2">
            <li>Accounts that have already exhausted their monthly credit quotas or generated 3 or more video packages.</li>
            <li>Renewal charges older than 48 hours where services were actively utilized.</li>
            <li>Accounts suspended or terminated due to willful violations of our Acceptable Use Policy (e.g. copyright abuse or hate speech).</li>
          </ul>
        </section>

        {/* Section 5: Step-by-Step Request Guide */}
        <section className="space-y-4 border-t border-white/[0.08] pt-8">
          <h2 className="text-2xl font-bold text-white flex items-center gap-3">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#E50914]/20 text-[#E50914] text-xs font-black">5</span>
            How to Submit a Refund Request
          </h2>
          <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.08] space-y-4 text-xs">
            <p className="text-slate-200">
              To request a refund under the 14-Day Guarantee or report a billing anomaly, follow these simple steps:
            </p>
            <ol className="space-y-2 text-slate-300 list-decimal list-inside">
              <li>Send an email to <a href="mailto:refunds@tameeros.com" className="text-[#E50914] font-bold">refunds@tameeros.com</a> from your registered account email.</li>
              <li>Include your <strong>Account Email</strong> and <strong>Transaction ID / Receipt Number</strong>.</li>
              <li>Briefly mention the reason for your refund (e.g., &quot;Voice cloning tone did not match my channel dialect&quot;).</li>
            </ol>
            <p className="text-slate-400 pt-2 border-t border-white/[0.06]">
              Our billing support team responds to all refund inquiries within <strong>12 to 24 hours</strong>.
            </p>
          </div>
        </section>

        {/* Section 6: Interactive FAQ */}
        <section className="space-y-4 border-t border-white/[0.08] pt-8">
          <h2 className="text-2xl font-bold text-white flex items-center gap-3">
            <HelpCircle className="h-6 w-6 text-[#E50914]" />
            Frequently Asked Questions
          </h2>
          <div className="space-y-2">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="rounded-xl border border-white/[0.06] bg-white/[0.02] overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  className="w-full p-4 text-left font-bold text-xs sm:text-sm text-white flex items-center justify-between gap-4 hover:bg-white/[0.03] transition"
                >
                  <span>{faq.q}</span>
                  <span className="text-[#E50914] shrink-0">{activeFaq === idx ? '−' : '+'}</span>
                </button>
                {activeFaq === idx && (
                  <div className="px-4 pb-4 text-xs text-slate-300 border-t border-white/[0.04] pt-3 leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Quick Links Footer */}
        <div className="pt-8 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="hover:text-white transition font-medium">Privacy Policy →</Link>
            <Link href="/terms" className="hover:text-white transition font-medium">Terms of Service →</Link>
          </div>
          <Link href="/pricing" className="text-[#E50914] font-bold hover:underline">
            View Pricing in PKR →
          </Link>
        </div>

      </main>

      <Footer />
    </div>
  );
}
