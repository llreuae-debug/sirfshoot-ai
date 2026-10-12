'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SidebarDrawer from '@/components/SidebarDrawer';
import UpgradeModal from '@/components/UpgradeModal';
import { useCreatorStore } from '@/lib/store';
import {
  Sparkles,
  Plus,
  ArrowRight,
  ShieldCheck,
  Search,
  FileText,
  Sliders,
  Image as ImageIcon,
  GraduationCap,
  Users,
  Mic,
  Video,
  Calculator,
  Building,
  Crown,
  CheckCircle2,
  X,
} from 'lucide-react';

export default function DashboardPage() {
  const { state } = useCreatorStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [showSubscriptionBanner, setShowSubscriptionBanner] = useState(true);
  const [upgradeModalOpen, setUpgradeModalOpen] = useState(false);
  const [selectedUpgradeTool] = useState<string>('');

  const isAdmin = state.role === 'admin' || state.email === 'llre.uae@gmail.com';

  const filteredProjects = state.projects.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.niche.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = selectedFilter === 'All' || p.niche.includes(selectedFilter);
    return matchesSearch && matchesFilter;
  });

  const mainTools = [
    {
      id: 'imagens',
      title: 'Social Post Studio 2.0',
      description: 'Transform property photos into high-converting Instagram posts with brand badges and WhatsApp tags.',
      icon: ImageIcon,
      gradient: 'from-amber-500 to-amber-700',
      accentColor: 'text-amber-500',
      borderColor: 'border-amber-200/80',
      badge: 'Available',
      features: ['Automatic high-res filters', 'AI-generated captions & hashtags', 'Direct WhatsApp & agent branding'],
      cta: 'Create Posts',
      link: '/imagens',
    },
    {
      id: 'imagens-1',
      title: 'Classic Image Enhancer',
      description: 'The beloved photo enhancer. Polish property shots with HDR clarity, sky replacement, and tone adjustments.',
      icon: Sliders,
      gradient: 'from-cyan-500 to-blue-600',
      accentColor: 'text-cyan-600',
      borderColor: 'border-cyan-200/80',
      badge: 'Classic Mode',
      features: ['Automatic photo enhancement', 'HDR clarity presets', 'Sharpening & brightness controls'],
      cta: 'Launch Enhancer',
      link: '/imagens',
    },
    {
      id: 'descricoes',
      title: 'AI Description Generator',
      description: 'Craft compelling, high-converting property listings and descriptions with voice dictation.',
      icon: FileText,
      gradient: 'from-orange-500 to-red-600',
      accentColor: 'text-orange-500',
      borderColor: 'border-orange-200/80',
      badge: 'New',
      features: ['Conversion-optimized listing copy', 'Multi-platform formatting', 'Strategic real estate hashtags included'],
      cta: 'Generate Copy',
      link: '/descricoes',
    },
    {
      id: 'cursos',
      title: 'SirfShoot Academy',
      description: 'Master practical paid advertising, video creatives, and conversion funnels that close deals.',
      icon: GraduationCap,
      gradient: 'from-purple-600 to-pink-600',
      accentColor: 'text-purple-600',
      borderColor: 'border-purple-200/80',
      badge: 'New',
      features: ['Step-by-step video playbooks', 'High-retention video formulas', 'Paid advertising blueprints'],
      cta: 'Access Academy',
      link: '/cursos',
    },
    {
      id: 'assistente',
      title: 'AI Real Estate Copilot',
      description: 'Specialized 24/7 AI chat trained on real estate sales scripts and objection handling.',
      icon: Sparkles,
      gradient: 'from-amber-400 to-orange-500',
      accentColor: 'text-amber-500',
      borderColor: 'border-amber-200/80',
      badge: 'New',
      features: ['Personalized sales strategies', 'Real-time market insights', 'Objection-handling scripts & checklists'],
      cta: 'Open Copilot',
      link: '/assistente',
    },
    {
      id: 'leads',
      title: 'Leads CRM Pipeline',
      description: 'Manage buyers and listings in an interactive Kanban board with direct WhatsApp follow-ups.',
      icon: Users,
      gradient: 'from-blue-600 to-indigo-600',
      accentColor: 'text-blue-600',
      borderColor: 'border-blue-200/80',
      badge: 'Available',
      features: ['Organized client pipeline', 'Visual 5-stage Kanban board', 'WhatsApp follow-ups & reminders'],
      cta: 'Open CRM',
      link: '/leads',
    },
  ];

  const premiumTools = [
    {
      id: 'narracao',
      title: 'AI Voiceover Studio',
      description: 'Convert scripts into lifelike voiceovers with +100 neural voices and custom voice cloning.',
      icon: Mic,
      gradient: 'from-amber-500 to-amber-700',
      accentColor: 'text-amber-500',
      borderColor: 'border-amber-300/80',
      badge: 'Premium',
      features: ['+100 natural voices in multiple accents', 'Clone your voice in seconds', 'Optimized for Reels, Shorts & YouTube'],
      cta: 'Create Voiceover',
      link: '/narracao',
    },
    {
      id: 'videos-automaticos',
      title: 'Automated Video Generator',
      description: 'Generate complete promotional videos with AI scenes, cinematic transitions, and soundtracks.',
      icon: Video,
      gradient: 'from-pink-600 to-purple-600',
      accentColor: 'text-pink-600',
      borderColor: 'border-pink-300/80',
      badge: 'Premium',
      features: ['100% automated multi-scene rendering', 'Cinematic zoom & pan transitions', 'Royalty-free soundtracks & 4K export'],
      cta: 'Generate Video',
      link: '/video-automatico',
    },
    {
      id: 'precificacao',
      title: 'AI Property Valuation',
      description: 'Estimate market price and square-meter value using comparable market data.',
      icon: Calculator,
      gradient: 'from-amber-500 to-amber-700',
      accentColor: 'text-amber-500',
      borderColor: 'border-amber-300/80',
      badge: 'Premium',
      features: ['Comparative market data analysis', 'Square-meter benchmark valuation', 'Printable PDF appraisal dossier'],
      cta: 'Calculate Value',
      link: '/precificacao',
    },
    {
      id: 'financiamento',
      title: 'Mortgage Simulator',
      description: 'Compare real loan rates, monthly installments, and qualification limits across major banks.',
      icon: Building,
      gradient: 'from-amber-500 to-amber-700',
      accentColor: 'text-amber-500',
      borderColor: 'border-amber-300/80',
      badge: 'Premium',
      features: ['Multi-bank interest rate comparison', 'SAC and fixed installment schedules', 'Income eligibility qualification checks'],
      cta: 'Simulate Loan',
      link: '/financiamento',
    },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-[#F8FAFC]">
      <SidebarDrawer />
      <Navbar />

      <main className="flex-1 py-8 sm:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-10">
          {/* Top User & Account Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
            <div>
              <div className="flex items-center gap-2.5">
                <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  Creator & Real Estate Dashboard
                </h1>
                {isAdmin ? (
                  <span className="rounded-full bg-purple-100 border border-purple-200 px-3 py-1 text-xs font-bold text-purple-700 uppercase flex items-center gap-1 shadow-2xs">
                    <ShieldCheck className="h-3.5 w-3.5" />
                    SUPER ADMIN STUDIO
                  </span>
                ) : (
                  <span className="rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-bold text-[#E50914] uppercase">
                    {state.plan} Plan
                  </span>
                )}
              </div>
              <p className="mt-1 text-xs sm:text-sm text-slate-500">
                Welcome back, <strong className="text-slate-800">{state.name}</strong> • Connected as{' '}
                <span className="text-slate-700 font-mono">{state.email}</span>
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href="/create"
                className="btn-shadow inline-flex items-center gap-2 rounded-full bg-[#E50914] px-6 py-2.5 text-xs sm:text-sm font-bold text-white hover:bg-[#B91C1C] transition active:scale-95 shadow-md shadow-red-500/20"
              >
                <Plus className="h-4 w-4" />
                <span>New Video Project (9 AI Agents)</span>
              </Link>
            </div>
          </div>

          {/* Shimmering Active Subscription Banner */}
          {showSubscriptionBanner && (
            <div className="relative overflow-hidden rounded-3xl border-2 border-emerald-500 bg-gradient-to-r from-emerald-500 via-emerald-600 to-green-600 p-5 sm:p-6 text-white shadow-xl shadow-emerald-500/20 ring-4 ring-emerald-500/10 animate-in fade-in">
              <div className="absolute inset-0 -translate-x-full animate-[shimmer_3s_ease-in-out_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />

              <button
                type="button"
                onClick={() => setShowSubscriptionBanner(false)}
                className="absolute right-3.5 top-3.5 flex h-7 w-7 items-center justify-center rounded-full text-white/70 hover:bg-white/20 hover:text-white transition"
                aria-label="Close announcement"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-4 pr-8">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/25 ring-2 ring-white/40 backdrop-blur-xs">
                    <Crown className="h-6 w-6 text-white drop-shadow-md" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="rounded-full bg-white px-2.5 py-0.5 text-[11px] font-black uppercase tracking-wider text-emerald-800 shadow-xs">
                        VIP / STUDIO UNLOCKED
                      </span>
                      <span className="text-xs font-bold text-emerald-100 hidden sm:inline">
                        Unlimited Access Active
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-emerald-50 font-medium mt-1">
                      You have full access to all AI tools: Social Post Studio, Neural Voiceover, Automated Videos, and Property Valuation.
                    </p>
                  </div>
                </div>

                <Link
                  href="/minha-assinatura"
                  className="rounded-xl bg-white px-4 py-2 text-xs font-black text-emerald-800 hover:bg-emerald-50 transition shrink-0 shadow-md text-center"
                >
                  Manage Subscription
                </Link>
              </div>
            </div>
          )}

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 card-shadow space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Video Projects</span>
              <div className="text-2xl sm:text-3xl font-black text-slate-900 font-mono">{state.projects.length}</div>
              <p className="text-[11px] text-emerald-600 font-semibold">✓ 9 agents per script</p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 card-shadow space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Credits Remaining</span>
              <div className="text-2xl sm:text-3xl font-black text-[#E50914] font-mono">
                {state.creditsRemaining} <span className="text-sm text-slate-400 font-normal">/ {state.creditsTotal}</span>
              </div>
              <p className="text-[11px] text-slate-500">Renews in {state.trialDaysRemaining} days</p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 card-shadow space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">CRM Active Leads</span>
              <div className="text-2xl sm:text-3xl font-black text-slate-900 font-mono">
                {(state.leads || []).length}
              </div>
              <p className="text-[11px] text-blue-600 font-semibold">Kanban Pipeline & WhatsApp</p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 card-shadow space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Hours Saved</span>
              <div className="text-2xl sm:text-3xl font-black text-slate-900 font-mono">
                ~{state.projects.length * 6 + (state.savedDescriptions?.length || 1) * 2} hrs
              </div>
              <p className="text-[11px] text-slate-500">Automated production</p>
            </div>
          </div>

          {/* Section 1: Core Tools (Main Tools Grid) */}
          <section className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500/15 text-amber-600">
                <Sparkles className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  Core <span className="text-amber-600">Tools</span>
                </h2>
                <p className="text-xs text-slate-500">
                  Essential tools to create listings, generate marketing assets, and close deals.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {mainTools.map((tool) => {
                const Icon = tool.icon;
                return (
                  <Link
                    key={tool.id}
                    href={tool.link}
                    className={`group relative flex flex-col justify-between rounded-3xl border bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${tool.borderColor}`}
                  >
                    <div>
                      <div className="flex items-start justify-between mb-5">
                        <div
                          className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${tool.gradient} text-white shadow-lg`}
                        >
                          <Icon className="h-7 w-7" />
                        </div>
                        <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[10px] font-bold text-slate-600">
                          {tool.badge}
                        </span>
                      </div>

                      <h3 className="text-lg font-black text-slate-900 mb-2 group-hover:text-[#E50914] transition-colors">
                        {tool.title}
                      </h3>

                      <p className="text-xs text-slate-600 leading-relaxed mb-4 min-h-[36px]">
                        {tool.description}
                      </p>

                      <ul className="space-y-2 mb-6 border-t border-slate-100 pt-3">
                        {tool.features.map((feat) => (
                          <li key={feat} className="flex items-start gap-2 text-xs text-slate-600">
                            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-slate-400 shrink-0" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="w-full h-11 rounded-xl bg-slate-900 group-hover:bg-[#E50914] text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md">
                      <span>{tool.cta}</span>
                      <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>

          {/* Section 2: Premium Tools (Premium Tools Grid) */}
          <section className="space-y-6 pt-4">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 text-black shadow-xs">
                <Crown className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  Premium <span className="text-amber-500">Tools</span>
                </h2>
                <p className="text-xs text-slate-500">
                  Advanced neural voiceovers, square-meter valuation, and automated video workflows.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {premiumTools.map((tool) => {
                const Icon = tool.icon;
                return (
                  <Link
                    key={tool.id}
                    href={tool.link}
                    className={`group relative flex flex-col justify-between rounded-3xl border bg-white p-6 sm:p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${tool.borderColor}`}
                  >
                    <div>
                      <div className="flex items-start justify-between mb-5">
                        <div
                          className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${tool.gradient} text-white shadow-lg`}
                        >
                          <Icon className="h-7 w-7" />
                        </div>
                        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500 text-white px-2.5 py-1 text-[10px] font-black uppercase tracking-wide shadow-xs">
                          <CheckCircle2 className="h-3 w-3" />
                          Unlocked
                        </span>
                      </div>

                      <h3 className="text-xl font-black text-slate-900 mb-2 group-hover:text-amber-600 transition-colors">
                        {tool.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                        {tool.description}
                      </p>

                      <ul className="space-y-2 mb-6 border-t border-slate-100 pt-3">
                        {tool.features.map((feat) => (
                          <li key={feat} className="flex items-start gap-2 text-xs text-slate-600">
                            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-amber-500 shrink-0" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="w-full h-12 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-black font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-md group-hover:opacity-95">
                      <span>{tool.cta}</span>
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>

          {/* Section 3: Existing Video Projects List & Studio */}
          <section className="space-y-6 pt-6 border-t border-slate-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-black text-slate-900">Your Video Projects (9 AI Agents)</h2>
                <p className="text-xs text-slate-500">
                  Open any project to review scripts, run the teleprompter, or inspect high-CTR thumbnails.
                </p>
              </div>

              {/* Search & Filter Controls */}
              <div className="flex flex-wrap items-center gap-2">
                <div className="relative">
                  <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search projects..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="rounded-xl border border-slate-200 bg-white pl-9 pr-3 py-1.5 text-xs text-slate-800 placeholder:text-slate-400 focus:border-[#E50914] focus:outline-none w-48 sm:w-64"
                  />
                </div>

                <div className="flex gap-1">
                  {['All', 'Geopolitics', 'Finance', 'Tech'].map((filt) => (
                    <button
                      key={filt}
                      type="button"
                      onClick={() => setSelectedFilter(filt)}
                      className={`rounded-lg px-2.5 py-1 text-xs font-bold transition ${
                        selectedFilter === filt
                          ? 'bg-slate-900 text-white'
                          : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      {filt}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Project Cards List */}
            {filteredProjects.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center space-y-3">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-slate-400">
                  <FileText className="h-6 w-6" />
                </div>
                <h3 className="font-bold text-base text-slate-800">No projects found</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Start a new project now with our complete 9-agent autonomous video studio.
                </p>
                <Link
                  href="/create"
                  className="inline-flex items-center gap-1.5 rounded-full bg-[#E50914] px-4 py-2 text-xs font-bold text-white hover:bg-[#B91C1C] transition"
                >
                  <Plus className="h-3.5 w-3.5" />
                  <span>Create Project</span>
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProjects.map((p) => (
                  <div
                    key={p.id}
                    className="rounded-2xl border border-slate-200 bg-white p-5 card-shadow transition hover:border-slate-300 hover:shadow-lg flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="rounded bg-red-50 border border-red-200 px-2 py-0.5 text-[10px] font-bold text-[#E50914]">
                          {p.niche}
                        </span>
                        <span className="font-mono text-[10px] text-slate-400">
                          {p.targetRuntimeMin} Min Video
                        </span>
                      </div>

                      <h3 className="font-extrabold text-base text-slate-900 leading-snug line-clamp-2">
                        {p.title}
                      </h3>

                      <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                        {p.topic}
                      </p>

                      <div className="pt-2 border-t border-slate-100 space-y-1.5 text-xs text-slate-600 font-mono">
                        <div className="flex justify-between">
                          <span>Script:</span>
                          <span className="font-bold text-slate-800">{p.script.wordCount} words</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Voice Match:</span>
                          <span className="font-bold text-emerald-600">{p.script.toneMatchScore}% Match</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Thumbnails:</span>
                          <span className="font-bold text-slate-800">3 CTR Concepts</span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-[10px] text-slate-400 font-mono">
                        {new Date(p.createdAt).toLocaleDateString()}
                      </span>
                      <Link
                        href={`/project/${p.id}`}
                        className="inline-flex items-center gap-1 rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-bold text-white hover:bg-slate-800 transition"
                      >
                        <span>Open Studio</span>
                        <ArrowRight className="h-3 w-3" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Section 4: Tone Fingerprints & 12 Free Tools Promo */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-6 border-t border-slate-200">
            {/* Tone Fingerprint Profiles Box */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 card-shadow space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-base text-slate-900">Voice Profiles & Tone Fingerprints</h3>
                <Link href="/tools/tone-fingerprint" className="text-xs font-bold text-[#E50914] hover:underline">
                  Analyze Channel →
                </Link>
              </div>

              <div className="space-y-3">
                {state.activeFingerprints.slice(0, 3).map((tf) => (
                  <div key={tf.id} className="rounded-xl border border-slate-100 bg-slate-50/70 p-3.5 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sm text-slate-800">{tf.name}</span>
                      <span className="font-mono text-xs text-slate-500 font-bold bg-white px-2 py-0.5 rounded border border-slate-200">
                        {tf.hinglishRatio}% Match
                      </span>
                    </div>
                    <p className="text-xs text-slate-500">{tf.channelName} • {tf.niche}</p>
                    <div className="flex flex-wrap gap-1 pt-1">
                      {tf.signatureVocabulary.slice(0, 4).map((w) => (
                        <span key={w} className="rounded bg-white px-1.5 py-0.5 font-mono text-[10px] text-slate-600 border border-slate-200">
                          #{w}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 12 Free Creator Tools Box */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 card-shadow space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-base text-slate-900">12 Free Creator & Marketing Tools</h3>
                <Link href="/tools" className="text-xs font-bold text-[#E50914] hover:underline">
                  Explore All Free Tools →
                </Link>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                {[
                  { name: 'Tone Fingerprint', link: '/tools/tone-fingerprint', desc: 'Channel voice analyzer' },
                  { name: 'YouTube SEO Grader', link: '/tools/youtube-seo-grader', desc: 'Title & metadata score' },
                  { name: 'Hook Generator (3s)', link: '/tools/hook-generator', desc: 'High-retention hooks' },
                  { name: 'Title CTR Tester', link: '/tools/title-tester', desc: 'Click-through prediction' },
                  { name: 'Income Calculator', link: '/tools/youtube-income-calculator', desc: 'RPM & revenue estimates' },
                  { name: 'Hinglish Ratio Tool', link: '/tools/hinglish-ratio', desc: 'Vocabulary balance tool' },
                ].map((tool) => (
                  <Link
                    key={tool.name}
                    href={tool.link}
                    className="rounded-xl border border-slate-100 bg-slate-50/70 p-3 hover:bg-red-50/50 hover:border-red-200 transition group"
                  >
                    <div className="text-xs font-bold text-slate-800 group-hover:text-[#E50914]">
                      {tool.name}
                    </div>
                    <div className="text-[10px] text-slate-500 mt-0.5 truncate">{tool.desc}</div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Upgrade Modal */}
      <UpgradeModal
        isOpen={upgradeModalOpen}
        onClose={() => setUpgradeModalOpen(false)}
        toolName={selectedUpgradeTool}
      />

      <Footer />
    </div>
  );
}
