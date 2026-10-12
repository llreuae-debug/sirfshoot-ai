'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import {
  Shield,
  Lock,
  CheckCircle2,
  AlertCircle,
  Mail,
  ExternalLink,
  Cpu,
  Globe,
} from 'lucide-react';

export default function PrivacyPolicyPage() {
  const [activeSection, setActiveSection] = useState('overview');

  const sections = [
    { id: 'overview', title: '1. Executive Overview & Scope' },
    { id: 'data-collected', title: '2. Information We Collect' },
    { id: 'ai-processing', title: '3. AI Processing & Zero-Training Pledge' },
    { id: 'voice-fingerprint', title: '4. Voice Fingerprint & Biometrics' },
    { id: 'youtube-integration', title: '5. YouTube API & Third Parties' },
    { id: 'retention-security', title: '6. Storage, Security & Retention' },
    { id: 'user-rights', title: '7. Your Privacy Rights (GDPR & PECA)' },
    { id: 'cookies-tracking', title: '8. Cookies & Telemetry' },
    { id: 'contact', title: '9. Contact & Data Protection Officer' },
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
            <span className="text-white">Privacy Policy</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pt-2">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold mb-3">
                <Shield className="h-3.5 w-3.5" />
                <span>Effective Date: October 12, 2026 · Version 3.4</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
                SirfShoot AI <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-amber-500">Privacy Policy</span>
              </h1>
              <p className="mt-3 text-base text-slate-300 max-w-2xl leading-relaxed">
                How SirfShoot AI collects, protects, isolates, and respects your creative data, voice fingerprints, video scripts, and platform account credentials.
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <a
                href="mailto:privacy@sirfshoot.ai"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.08] hover:bg-white/[0.14] border border-white/10 text-xs font-bold text-white transition"
              >
                <Mail className="h-4 w-4 text-[#E50914]" />
                Contact Privacy Officer
              </a>
            </div>
          </div>

          {/* Quick Highlights Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6">
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] space-y-2">
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
                <Lock className="h-4 w-4" />
                <span>Zero Model Training</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                We never use your proprietary video drafts, scripts, or channel transcripts to train public AI models.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] space-y-2">
              <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-wider">
                <Cpu className="h-4 w-4" />
                <span>Encrypted Fingerprints</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Tone Fingerprints and audio samples are hashed using AES-256 and kept strictly siloed to your account.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] space-y-2">
              <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
                <Globe className="h-4 w-4" />
                <span>PECA & GDPR Compliant</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Full compliance with Pakistan Electronic Crimes Act 2016 and GDPR global data subject rights.
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
                <p>Need a signed Data Processing Addendum (DPA) for your media agency?</p>
                <a
                  href="mailto:legal@sirfshoot.ai"
                  className="inline-flex items-center gap-1 text-[#E50914] font-bold hover:underline"
                >
                  Request Agency DPA →
                </a>
              </div>
            </div>
          </aside>

          {/* Legal Body */}
          <article className="lg:col-span-8 space-y-12 text-sm leading-relaxed text-slate-300">

            {/* Section 1 */}
            <section id="overview" className="scroll-mt-28 space-y-4">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#E50914]/20 text-[#E50914] text-xs font-black">1</span>
                Executive Overview & Scope
              </h2>
              <p>
                Welcome to SirfShoot AI (&quot;SirfShoot&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;). SirfShoot AI operates the creative operating system for video creators, providing autonomous 9-agent workflows, tone fingerprinting, scriptwriting, teleprompter tools, thumbnail generation, and YouTube SEO optimization.
              </p>
              <p>
                This Privacy Policy applies to all services provided across <code className="text-emerald-400 bg-white/[0.05] px-1.5 py-0.5 rounded">sirfshoot-ai.vercel.app</code> and associated domain names, APIs, and client-side web applications. By accessing or using our platform, you acknowledge that you have read and understood how we handle personal data as set forth herein.
              </p>
              <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs space-y-1">
                <p className="font-bold flex items-center gap-1.5">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  Key Commitment:
                </p>
                <p>
                  You own 100% of your created scripts, audio clones, prompts, and video packages. We do not claim intellectual property rights over any creator assets processed on SirfShoot AI.
                </p>
              </div>
            </section>

            {/* Section 2 */}
            <section id="data-collected" className="scroll-mt-28 space-y-4 border-t border-white/[0.08] pt-8">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#E50914]/20 text-[#E50914] text-xs font-black">2</span>
                Information We Collect
              </h2>
              <p>
                We only collect data necessary to generate video packages, maintain creator accounts, and verify billing transactions. The data collected falls into three categories:
              </p>
              <div className="space-y-3">
                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-1">
                  <h4 className="font-bold text-white text-xs uppercase tracking-wide text-red-400">A. Account & Profile Data</h4>
                  <p className="text-xs text-slate-300">
                    Full name, email address, password hashes (salted Argon2/bcrypt), YouTube channel handle, profile avatar, role (e.g. Creator or Administrator), and subscription tier status.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-1">
                  <h4 className="font-bold text-white text-xs uppercase tracking-wide text-red-400">B. Creative Inputs & Workflow Artifacts</h4>
                  <p className="text-xs text-slate-300">
                    Video topic titles, research notes, script drafts, reference video transcripts, custom vocabulary preferences (such as Roman Urdu or English terminology balance), and storyboard prompt settings.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-1">
                  <h4 className="font-bold text-white text-xs uppercase tracking-wide text-red-400">C. Financial & Transaction Data (PKR & USD)</h4>
                  <p className="text-xs text-slate-300">
                    Payment transaction IDs, billing contact email, subscription renewal cycle, and credit ledger allocations. We do not store raw credit card numbers or banking PINs; all payments are processed through PCI-DSS Level 1 certified gateways (Stripe, JazzCash, EasyPaisa, PayFast).
                  </p>
                </div>
              </div>
            </section>

            {/* Section 3 */}
            <section id="ai-processing" className="scroll-mt-28 space-y-4 border-t border-white/[0.08] pt-8">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#E50914]/20 text-[#E50914] text-xs font-black">3</span>
                AI Processing & Zero-Training Pledge
              </h2>
              <p>
                SirfShoot AI integrates advanced enterprise language and vision models through strictly bounded API endpoints with enterprise zero-retention agreements:
              </p>
              <ul className="space-y-2 list-disc list-inside text-xs text-slate-300 pl-2">
                <li><strong>No Public Model Training:</strong> Your private video concepts, teleprompter scripts, and unreleased hooks are NEVER fed into model training weights or shared across competing creators.</li>
                <li><strong>Stateless Model Inference:</strong> Prompts sent to backend LLMs exist only in volatile server memory during the multi-agent generation pass and are purged from inference provider logs within 30 days per enterprise SLA.</li>
                <li><strong>Grounding & Redaction:</strong> Sensitive identifiers, private URLs, and auth tokens are automatically stripped by our backend sanitization pipeline before payload dispatch.</li>
              </ul>
            </section>

            {/* Section 4 */}
            <section id="voice-fingerprint" className="scroll-mt-28 space-y-4 border-t border-white/[0.08] pt-8">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#E50914]/20 text-[#E50914] text-xs font-black">4</span>
                Voice Fingerprint & Biometrics
              </h2>
              <p>
                When you use the Tone Fingerprint and Voice Clone features:
              </p>
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-2 text-xs">
                <p>
                  <strong>1. Explicit Consent:</strong> You must only submit audio samples of your own voice or voices for which you possess verified written consent. Impersonation of third-party public figures without permission is strictly prohibited.
                </p>
                <p>
                  <strong>2. Mathematical Embeddings:</strong> We convert voice samples into mathematical voice vectors. We do not store uncompressed biometric audio on public servers.
                </p>
                <p>
                  <strong>3. Permanent Deletion:</strong> You can wipe your Tone Fingerprint at any time inside your Account Settings with 1-click irreversible deletion.
                </p>
              </div>
            </section>

            {/* Section 5 */}
            <section id="youtube-integration" className="scroll-mt-28 space-y-4 border-t border-white/[0.08] pt-8">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#E50914]/20 text-[#E50914] text-xs font-black">5</span>
                YouTube API & Third-Party Integrations
              </h2>
              <p>
                SirfShoot AI allows optional integration with YouTube to fetch public video performance and upload drafts:
              </p>
              <ul className="space-y-2 list-disc list-inside text-xs text-slate-300 pl-2">
                <li>SirfShoot AI uses YouTube API Services. By connecting your channel, you agree to the <a href="https://www.youtube.com/t/terms" target="_blank" rel="noopener noreferrer" className="text-[#E50914] underline inline-flex items-center gap-1">YouTube Terms of Service <ExternalLink className="h-3 w-3 inline" /></a>.</li>
                <li>Your access to Google data is governed by the <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-[#E50914] underline inline-flex items-center gap-1">Google Privacy Policy <ExternalLink className="h-3 w-3 inline" /></a>.</li>
                <li>We only request the minimum required scopes (<code className="text-emerald-400 bg-white/[0.05] px-1 rounded">youtube.readonly</code> and <code className="text-emerald-400 bg-white/[0.05] px-1 rounded">youtube.upload</code>). We never modify existing videos or delete channel content.</li>
                <li>You may revoke SirfShoot AI&apos;s access at any moment via <a href="https://myaccount.google.com/permissions" target="_blank" rel="noopener noreferrer" className="text-cyan-400 underline inline-flex items-center gap-1">Google Security Settings <ExternalLink className="h-3 w-3 inline" /></a>.</li>
              </ul>
            </section>

            {/* Section 6 */}
            <section id="retention-security" className="scroll-mt-28 space-y-4 border-t border-white/[0.08] pt-8">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#E50914]/20 text-[#E50914] text-xs font-black">6</span>
                Storage, Security & Retention
              </h2>
              <p>
                We implement state-of-the-art defense-in-depth security measures to protect your creative projects:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06] space-y-1">
                  <div className="flex items-center gap-2 text-white font-bold">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    <span>AES-256 & TLS 1.3</span>
                  </div>
                  <p className="text-slate-400">All data in transit is encrypted using modern TLS 1.3 ciphers; all databases are encrypted at rest with AES-256 keys.</p>
                </div>

                <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06] space-y-1">
                  <div className="flex items-center gap-2 text-white font-bold">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    <span>Guardian AI Auditing</span>
                  </div>
                  <p className="text-slate-400">Automated operations agents monitor database anomalies, rate-limit abuse, and unauthorized access attempts 24/7.</p>
                </div>
              </div>
            </section>

            {/* Section 7 */}
            <section id="user-rights" className="scroll-mt-28 space-y-4 border-t border-white/[0.08] pt-8">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#E50914]/20 text-[#E50914] text-xs font-black">7</span>
                Your Privacy Rights (GDPR & PECA)
              </h2>
              <p>
                Regardless of your geographic location, SirfShoot AI provides universal data control rights:
              </p>
              <div className="space-y-2 text-xs">
                <p>• <strong>Right to Access & Portability:</strong> Export all your scripts, storyboards, and project packages in JSON or Markdown format at any time.</p>
                <p>• <strong>Right to Rectification:</strong> Update your profile data, email, or connected channels immediately in your dashboard.</p>
                <p>• <strong>Right to Erasure (&quot;Right to be Forgotten&quot;):</strong> Request full account deletion by emailing <a href="mailto:privacy@sirfshoot.ai" className="text-[#E50914] font-semibold">privacy@sirfshoot.ai</a>. All project drafts, voice vectors, and cached assets are permanently purged within 14 business days.</p>
                <p>• <strong>Pakistan PECA Compliance:</strong> We adhere strictly to the Prevention of Electronic Crimes Act 2016 and local consumer protection guidelines regarding digital transaction transparency.</p>
              </div>
            </section>

            {/* Section 8 */}
            <section id="cookies-tracking" className="scroll-mt-28 space-y-4 border-t border-white/[0.08] pt-8">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#E50914]/20 text-[#E50914] text-xs font-black">8</span>
                Cookies & Telemetry
              </h2>
              <p>
                We use strictly necessary cookies to keep you signed in securely and remember your local creator preferences (such as selected language dialect, dark mode tokens, and teleprompter scroll speed). We do not sell tracking cookies to third-party ad networks or data brokers.
              </p>
            </section>

            {/* Section 9 */}
            <section id="contact" className="scroll-mt-28 space-y-4 border-t border-white/[0.08] pt-8">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#E50914]/20 text-[#E50914] text-xs font-black">9</span>
                Contact & Data Protection Officer
              </h2>
              <p>
                If you have questions regarding this Privacy Policy, wish to file a data subject access request, or have concerns regarding your creative data, contact our legal and security desk:
              </p>
              <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.08] space-y-3 text-xs">
                <div className="flex items-center gap-2 text-white font-bold text-sm">
                  <Shield className="h-4 w-4 text-[#E50914]" />
                  <span>SirfShoot AI Legal & Compliance</span>
                </div>
                <p className="text-slate-300">
                  Email: <a href="mailto:privacy@sirfshoot.ai" className="text-[#E50914] font-bold">privacy@sirfshoot.ai</a> / <a href="mailto:legal@sirfshoot.ai" className="text-slate-200">legal@sirfshoot.ai</a>
                </p>
                <p className="text-slate-300">
                  General Inquiries: <a href="mailto:hello@sirfshoot.ai" className="text-slate-200">hello@sirfshoot.ai</a>
                </p>
                <p className="text-slate-400">
                  Headquarters: SirfShoot AI Creative Technologies, Gulberg III, Lahore, Pakistan · Dubai Silicon Oasis, UAE.
                </p>
              </div>
            </section>

            {/* Quick Links Footer */}
            <div className="pt-8 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-4 text-xs text-slate-400">
              <div className="flex items-center gap-4">
                <Link href="/terms" className="hover:text-white transition font-medium">Terms of Service →</Link>
                <Link href="/refund" className="hover:text-white transition font-medium">Refund & Cancellation →</Link>
              </div>
              <Link href="/create" className="text-[#E50914] font-bold hover:underline">
                Launch Creative Studio →
              </Link>
            </div>

          </article>
        </div>
      </main>

      <Footer />
    </div>
  );
}
