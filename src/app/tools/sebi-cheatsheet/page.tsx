'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ShieldCheck, Copy, Check, ArrowRight } from 'lucide-react';

export default function SebiCheatsheetPage() {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const rules = [
    {
      risky: 'Guaranteed 25% profit / Multibagger PSX stock',
      safe: 'Historical benchmark analysis / High-growth potential case study',
      why: 'SECP prohibits promising guaranteed returns on stock market securities.',
    },
    {
      risky: 'Buy this stock tomorrow at market opening',
      safe: 'Analyzing fundamental quarterly earnings and market indicators',
      why: 'Tantamount to unlicensed investment advisory and market tip-giving.',
    },
    {
      risky: 'Best mutual fund scheme to get rich quick',
      safe: 'Long-term wealth compounding framework for disciplined asset allocation',
      why: 'Misleading consumer protection and advertising regulation violation.',
    },
    {
      risky: 'Forex & crypto secret signals for daily PKR profit',
      safe: 'Understanding foreign exchange risk mechanics and high-probability retail losses',
      why: 'Mandatory risk disclosure required on all leveraged and speculative financial topics.',
    },
  ];

  const standardDisclaimer = `Disclaimer: The content presented in this video is strictly for educational, informational, and academic case-study purposes only. The creator is not an SECP-registered Investment Advisor or Research Analyst. Financial investments and securities are subject to market risks; please read all related scheme documents carefully and consult a certified financial advisor before deploying capital.`;

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#0C0C0F] text-slate-100">
      <Navbar />

      <main className="flex-1 py-12 sm:py-16">
        <div className="mx-auto max-w-4xl px-5 sm:px-6 lg:px-8 space-y-8">
          <div>
            <Link href="/tools" className="text-xs text-red-400 hover:underline mb-2 inline-block font-mono">
              ← Back to All Tools
            </Link>
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-500/15 border border-red-500/30 text-red-400">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <h1 className="text-3xl font-black text-white">SECP-Safe Phrasing Cheatsheet</h1>
            </div>
            <p className="mt-2 text-sm text-slate-400 leading-relaxed">
              Essential compliance guide for Pakistani finance creators. Replace penalized trigger phrases with compliant educational frameworks.
            </p>
          </div>

          {/* Master Disclaimer Box */}
          <div className="rounded-2xl border border-white/10 bg-[#141418] p-6 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400 font-mono">
                Standard Compliant Disclaimer Template
              </span>
              <button
                type="button"
                onClick={() => handleCopy(standardDisclaimer, 'disclaimer')}
                className="text-xs font-bold text-red-400 hover:underline inline-flex items-center gap-1"
              >
                {copiedKey === 'disclaimer' ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
                <span>{copiedKey === 'disclaimer' ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
            <p className="rounded-xl border border-white/5 bg-black/40 p-4 font-mono text-xs text-slate-300 leading-relaxed">
              {standardDisclaimer}
            </p>
          </div>

          {/* Trigger vs Safe Table */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white">Risky vs Compliant Phrasing Matrix</h3>

            <div className="space-y-3">
              {rules.map((r, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl border border-white/10 bg-[#141418] p-5 space-y-3"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-3 space-y-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-red-400">
                        ✕ High-Risk Trigger Phrase
                      </span>
                      <p className="text-xs font-mono font-bold text-red-300">{r.risky}</p>
                    </div>

                    <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-3 space-y-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                        ✓ SECP-Compliant Educational Rewrite
                      </span>
                      <p className="text-xs font-mono font-bold text-emerald-300">{r.safe}</p>
                    </div>
                  </div>

                  <p className="text-xs text-slate-400 border-t border-white/5 pt-2">
                    <strong className="text-slate-300">Regulatory Rationale:</strong> {r.why}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 text-center space-y-3">
            <h3 className="font-bold text-base text-white">Automatic Financial Safety Audits</h3>
            <p className="text-xs text-slate-400 max-w-md mx-auto">
              SirfShoot&apos;s Legal & Policy Agent 4 automatically audits every finance script for SECP compliance and injects appropriate disclaimers.
            </p>
            <Link
              href="/create"
              className="btn-shadow inline-flex items-center gap-1.5 rounded-full bg-[#E50914] px-6 py-2.5 text-xs font-bold text-white hover:bg-[#B91C1C] transition"
            >
              <span>Build Safe Scripts in Studio</span>
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
