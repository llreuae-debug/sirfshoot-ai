'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import {
  Scale,
  CheckCircle2,
  ShieldAlert,
  Mail,
  Zap,
  Ban,
} from 'lucide-react';

export default function TermsOfServicePage() {
  const [activeSection, setActiveSection] = useState('acceptance');

  const sections = [
    { id: 'acceptance', title: '1. Acceptance of Terms' },
    { id: 'service-description', title: '2. Description of Service & AI OS' },
    { id: 'ownership', title: '3. Intellectual Property & Commercial Rights' },
    { id: 'acceptable-use', title: '4. Acceptable Use Policy (AUP)' },
    { id: 'voice-ethics', title: '5. Voice Cloning & Ethics Rules' },
    { id: 'plans-billing', title: '6. Subscription Plans, PKR Pricing & Credits' },
    { id: 'disclaimer', title: '7. AI Content Disclaimer & Fact Checking' },
    { id: 'limitation', title: '8. Limitation of Liability' },
    { id: 'governing-law', title: '9. Governing Law & Dispute Resolution' },
    { id: 'contact', title: '10. Contact Information' },
  ];

  const scrollTo = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

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
            <span className="text-white">Terms of Service</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pt-2">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold mb-3">
                <Scale className="h-3.5 w-3.5" />
                <span>Effective Date: October 12, 2026 · Master Terms v3.4</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
                SirfShoot AI <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-amber-500">Terms of Service</span>
              </h1>
              <p className="mt-3 text-base text-slate-300 max-w-2xl leading-relaxed">
                Rules, creator ownership rights, acceptable use, billing guidelines, and legal agreements governing the use of SirfShoot AI.
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <a
                href="mailto:legal@sirfshoot.ai"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.08] hover:bg-white/[0.14] border border-white/10 text-xs font-bold text-white transition"
              >
                <Mail className="h-4 w-4 text-[#E50914]" />
                Contact Legal Counsel
              </a>
            </div>
          </div>

          {/* Quick Highlights Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6">
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] space-y-2">
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
                <CheckCircle2 className="h-4 w-4" />
                <span>100% Creator Ownership</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                You retain complete, unencumbered commercial copyright to all scripts, thumbnails, and concepts generated.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] space-y-2">
              <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-wider">
                <Zap className="h-4 w-4" />
                <span>Transparent PKR Pricing</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                No hidden conversion fees. Monthly and annual plans billed directly via JazzCash, EasyPaisa, PayFast, or Cards.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] space-y-2">
              <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
                <ShieldAlert className="h-4 w-4" />
                <span>Zero Deepfake Tolerance</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Voice cloning is restricted strictly to authorized personal voices. Impersonation of third parties results in immediate account ban.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Layout */}
      <main className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Sticky Navigation Sidebar */}
          <aside className="lg:col-span-4 hidden lg:block">
            <div className="sticky top-28 p-5 rounded-2xl bg-white/[0.02] border border-white/[0.08] space-y-3">
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 pb-2 border-b border-white/[0.06]">
                Table of Contents
              </h3>
              <nav className="space-y-1 text-xs font-medium">
                {sections.map((sec) => (
                  <button
                    key={sec.id}
                    onClick={() => scrollTo(sec.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg transition flex items-center justify-between ${
                      activeSection === sec.id
                        ? 'bg-[#E50914]/15 text-[#E50914] font-bold border border-[#E50914]/30'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]'
                    }`}
                  >
                    <span className="truncate">{sec.title}</span>
                  </button>
                ))}
              </nav>

              <div className="pt-4 border-t border-white/[0.06] text-[11px] text-slate-400 space-y-2">
                <p>Have questions regarding enterprise multi-seat licensing?</p>
                <Link href="/pricing" className="text-[#E50914] font-bold hover:underline">
                  View Creator & Agency Plans →
                </Link>
              </div>
            </div>
          </aside>

          {/* Legal Body */}
          <article className="lg:col-span-8 space-y-12 text-sm leading-relaxed text-slate-300">

            {/* Section 1 */}
            <section id="acceptance" className="scroll-mt-28 space-y-4">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#E50914]/20 text-[#E50914] text-xs font-black">1</span>
                Acceptance of Terms
              </h2>
              <p>
                These Terms of Service (&quot;Terms&quot;) constitute a legally binding agreement between you (&quot;Creator&quot;, &quot;User&quot;, or &quot;You&quot;) and SirfShoot AI (&quot;SirfShoot&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;).
              </p>
              <p>
                By creating an account, initiating a project, testing our micro-tools, or subscribing to any plan on <code className="text-emerald-400 bg-white/[0.05] px-1.5 py-0.5 rounded">sirfshoot-ai.vercel.app</code>, you represent that you are at least 18 years old (or have parental/guardian consent if between 13 and 18) and possess full legal capacity to enter into this agreement.
              </p>
            </section>

            {/* Section 2 */}
            <section id="service-description" className="scroll-mt-28 space-y-4 border-t border-white/[0.08] pt-8">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#E50914]/20 text-[#E50914] text-xs font-black">2</span>
                Description of Service & AI OS
              </h2>
              <p>
                SirfShoot AI provides an autonomous 9-Agent Content OS designed specifically for YouTube, Shorts, TikTok, and Reels creators:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                  <strong className="text-white block mb-1">Agent 01–03: Discovery & Scripting</strong>
                  <span className="text-slate-400">Trend scraping, viral hook ideation, spoken teleprompter script creation, and verified fact-checking.</span>
                </div>
                <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                  <strong className="text-white block mb-1">Agent 04–06: Compliance & Storyboard</strong>
                  <span className="text-slate-400">SECP & copyright guardrails, custom voice clone matching, and 14-scene visual B-roll storyboarding.</span>
                </div>
                <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                  <strong className="text-white block mb-1">Agent 07–09: CTR Design & Packaging</strong>
                  <span className="text-slate-400">Triple thumbnail visual concepts (Safe, Bold, Experimental), high-CTR SEO metadata, and 3 vertical shorts cuts.</span>
                </div>
                <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                  <strong className="text-white block mb-1">Guardian AI Reliability Engine</strong>
                  <span className="text-slate-400">Real-time autonomous site reliability and self-healing engine verifying uptime and preventing pipeline degradation.</span>
                </div>
              </div>
            </section>

            {/* Section 3 */}
            <section id="ownership" className="scroll-mt-28 space-y-4 border-t border-white/[0.08] pt-8">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#E50914]/20 text-[#E50914] text-xs font-black">3</span>
                Intellectual Property & Commercial Rights
              </h2>
              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs space-y-1">
                <p className="font-bold flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 shrink-0" />
                  Your Creative Property:
                </p>
                <p>
                  As between you and SirfShoot AI, you own all rights, title, and interest in and to your Input Prompts and Output Results (including full YouTube scripts, thumbnails, voiceover audio, and SEO descriptions).
                </p>
              </div>
              <p>
                SirfShoot AI hereby grants you an irrevocable, perpetual, worldwide, royalty-free, exclusive commercial license to monetize, broadcast, publish, distribute, and license all outputs created using your account across all platforms (including YouTube AdSense, brand sponsorships, and syndication).
              </p>
            </section>

            {/* Section 4 */}
            <section id="acceptable-use" className="scroll-mt-28 space-y-4 border-t border-white/[0.08] pt-8">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#E50914]/20 text-[#E50914] text-xs font-black">4</span>
                Acceptable Use Policy (AUP)
              </h2>
              <p>
                To preserve platform integrity, you agree NOT to use SirfShoot AI to create, generate, or distribute:
              </p>
              <ul className="space-y-2.5 text-xs text-slate-300">
                <li className="flex items-start gap-2">
                  <Ban className="h-4 w-4 text-red-500 shrink-0 mt-0.5" />
                  <span><strong>Illegal Content & Cybercrimes:</strong> Any material violating the Prevention of Electronic Crimes Act 2016 (PECA) or international laws.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Ban className="h-4 w-4 text-red-500 shrink-0 mt-0.5" />
                  <span><strong>Financial Fraud & Unregulated Schemes:</strong> Scripts promoting fraudulent Ponzi schemes, unauthorized cryptocurrency trading bots, or deceptive financial advice that violates SECP guidelines.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Ban className="h-4 w-4 text-red-500 shrink-0 mt-0.5" />
                  <span><strong>Defamation & Harassment:</strong> Defamatory scripts, non-consensual deepfakes, hate speech targeting religious or ethnic communities, or incitement to violence.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Ban className="h-4 w-4 text-red-500 shrink-0 mt-0.5" />
                  <span><strong>Infrastructure Abuse:</strong> Reverse engineering backend agent prompts, scraping API endpoints without authorization, or bypassing platform rate limits.</span>
                </li>
              </ul>
            </section>

            {/* Section 5 */}
            <section id="voice-ethics" className="scroll-mt-28 space-y-4 border-t border-white/[0.08] pt-8">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#E50914]/20 text-[#E50914] text-xs font-black">5</span>
                Voice Cloning & Ethics Rules
              </h2>
              <p>
                When uploading voice samples to train the Tone Cloner (Agent 05):
              </p>
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-2 text-xs">
                <p>
                  1. You must own or have explicit written licensing rights to clone the speaker&apos;s voice.
                </p>
                <p>
                  2. Impersonating politicians, news anchors, military officials, celebrities, or private citizens without express authorization is an irremediable breach leading to immediate account termination without refund.
                </p>
                <p>
                  3. SirfShoot AI reserves the right to append invisible watermarks or audio provenance metadata to synthesized tracks for auditability.
                </p>
              </div>
            </section>

            {/* Section 6 */}
            <section id="plans-billing" className="scroll-mt-28 space-y-4 border-t border-white/[0.08] pt-8">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#E50914]/20 text-[#E50914] text-xs font-black">6</span>
                Subscription Plans, PKR Pricing & Credits
              </h2>
              <p>
                SirfShoot AI offers transparent subscription tiers quoted in Pakistani Rupees (PKR):
              </p>
              <ul className="space-y-2 text-xs text-slate-300 list-disc list-inside pl-2">
                <li><strong>Free Trial:</strong> 7-day trial with 2 complete video production packages.</li>
                <li><strong>Starter Plan:</strong> PKR 499 / month (3 full video packages per month).</li>
                <li><strong>Creator Plan:</strong> PKR 999 / month (7 full video packages per month).</li>
                <li><strong>Pro Agency Plan:</strong> PKR 2,499 / month (20 full video packages per month + multi-channel support).</li>
              </ul>
              <p className="text-xs text-slate-400">
                Subscriptions renew automatically at the end of each billing cycle unless cancelled prior to the renewal date. All credit allocations and balances are auditable in real-time in your Account Dashboard.
              </p>
            </section>

            {/* Section 7 */}
            <section id="disclaimer" className="scroll-mt-28 space-y-4 border-t border-white/[0.08] pt-8">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#E50914]/20 text-[#E50914] text-xs font-black">7</span>
                AI Content Disclaimer & Fact Checking
              </h2>
              <p>
                While Agent 03 (Fact Checker) and Agent 04 (Legal & Safety Guardrail) perform automated cross-referencing of factual and regulatory claims, generative artificial intelligence can occasionally produce inaccuracies or outdated statistics.
              </p>
              <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs">
                <strong>Creator Responsibility Notice:</strong> You remain solely responsible for reviewing, verifying, and approving all generated scripts, citations, and titles before uploading them to public channels or executing paid advertising.
              </div>
            </section>

            {/* Section 8 */}
            <section id="limitation" className="scroll-mt-28 space-y-4 border-t border-white/[0.08] pt-8">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#E50914]/20 text-[#E50914] text-xs font-black">8</span>
                Limitation of Liability
              </h2>
              <p className="text-xs text-slate-400 leading-relaxed">
                TO THE MAXIMUM EXTENT PERMITTED UNDER APPLICABLE LAW, IN NO EVENT SHALL SIRFSHOOT AI, ITS DIRECTORS, EMPLOYEES, OR AFFILIATES BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, OR CONSEQUENTIAL DAMAGES, INCLUDING LOSS OF YOUTUBE AD REVENUE, ALGORITHMIC PERFORMANCE FLUCTUATIONS, OR CHANNEL STRIKES ARISING OUT OF THIRD-PARTY PLATFORM POLICY CHANGES. OUR TOTAL AGGREGATE LIABILITY SHALL NOT EXCEED THE AMOUNT PAID BY YOU TO SIRFSHOOT AI IN THE THREE (3) MONTHS PRECEDING THE CLAIM.
              </p>
            </section>

            {/* Section 9 */}
            <section id="governing-law" className="scroll-mt-28 space-y-4 border-t border-white/[0.08] pt-8">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#E50914]/20 text-[#E50914] text-xs font-black">9</span>
                Governing Law & Dispute Resolution
              </h2>
              <p>
                These Terms shall be governed by and construed in accordance with the laws of the Islamic Republic of Pakistan, without regard to conflict of law principles. Any unresolved disputes shall be submitted to confidential, binding arbitration in Lahore, Pakistan, conducted in the English language.
              </p>
            </section>

            {/* Section 10 */}
            <section id="contact" className="scroll-mt-28 space-y-4 border-t border-white/[0.08] pt-8">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#E50914]/20 text-[#E50914] text-xs font-black">10</span>
                Contact Information
              </h2>
              <p>
                For questions regarding these Terms or formal legal correspondence, reach our legal department:
              </p>
              <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.08] space-y-3 text-xs">
                <div className="flex items-center gap-2 text-white font-bold text-sm">
                  <Scale className="h-4 w-4 text-[#E50914]" />
                  <span>SirfShoot AI Legal Desk</span>
                </div>
                <p className="text-slate-300">
                  Email: <a href="mailto:legal@sirfshoot.ai" className="text-[#E50914] font-bold">legal@sirfshoot.ai</a>
                </p>
                <p className="text-slate-400">
                  Corporate Office: SirfShoot AI Creative Technologies, Gulberg III, Lahore, Pakistan.
                </p>
              </div>
            </section>

            {/* Quick Links Footer */}
            <div className="pt-8 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-4 text-xs text-slate-400">
              <div className="flex items-center gap-4">
                <Link href="/privacy" className="hover:text-white transition font-medium">Privacy Policy →</Link>
                <Link href="/refund" className="hover:text-white transition font-medium">Refund & Cancellation →</Link>
              </div>
              <Link href="/pricing" className="text-[#E50914] font-bold hover:underline">
                Explore Subscription Plans →
              </Link>
            </div>

          </article>
        </div>
      </main>

      <Footer />
    </div>
  );
}
