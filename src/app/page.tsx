'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Play,
  Search,
  FileText,
  Film,
  Image as ImageIcon,
  TrendingUp,
  Share2,
  Zap,
  ChevronDown,
  Building2,
  Check,
  Languages,
  Wrench,
  Gift,
  Bot,
  Mic,
  Calculator,
  Compass,
  GraduationCap,
  Users,
  ShieldCheck,
  Flame,
  Layers,
  ChevronRight,
  ExternalLink,
  Laptop,
  Copy,
} from 'lucide-react';

export default function HomePage() {
  const [activeTabCategory, setActiveTabCategory] = useState<string>('all');
  const [activeDemoTopic, setActiveDemoTopic] = useState<number>(0);
  const [activeStep, setActiveStep] = useState<number>(1);
  const [hinglishSlider, setHinglishSlider] = useState<number>(65);
  const [faqOpen, setFaqOpen] = useState<Record<number, boolean>>({ 0: true });
  const [copiedDraft, setCopiedDraft] = useState<boolean>(false);
  const [healthStatus, setHealthStatus] = useState<{ status: string; agentCount: number } | null>(null);

  useEffect(() => {
    fetch('/api/health')
      .then((res) => res.json())
      .then((data) => {
        if (data?.capabilities?.agents?.count) {
          setHealthStatus({ status: data.status, agentCount: data.capabilities.agents.count });
        }
      })
      .catch(() => {
        setHealthStatus({ status: 'operational', agentCount: 9 });
      });
  }, []);

  const toggleFaq = (idx: number) => {
    setFaqOpen((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  const handleCopyDemo = () => {
    setCopiedDraft(true);
    setTimeout(() => setCopiedDraft(false), 2000);
  };

  // Demo Topics Data
  const demoTopics = [
    {
      id: 'tech-exports',
      label: 'IT Exports & Economy',
      country: 'Pakistan & Global',
      title: 'Future of IT Exports: Ground Reality vs Hype',
      spike: '94/100 Spiking Trend',
      scriptHook: '[HOOK] Today’s headline isn’t just breaking news — it’s a critical case study. News channels par hype chal rahi hai, but ground reality yeh hai ki software exports and remote engineering expanded at record speed while foreign direct investment is shifting.',
      scenes: '14 Cinematic Scenes Ready',
      titleScore: 'Title Score: 88/100 (Heuristic)',
      keywords: 'pakistan it exports, tech freelance economy, remote software development',
    },
    {
      id: 'real-estate',
      label: 'Luxury Real Estate',
      country: 'Dubai & Regional',
      title: 'Palm Jumeirah Penthouse Tour & ROI Analysis',
      spike: '98/100 Spiking Demand',
      scriptHook: '[HOOK] If you have $4.2M to invest, do NOT buy a villa until you watch this walkthrough. Aaj hum Palm Jumeirah ke top penthouse ka full financial yield breakdown karenge — price per square foot se lekar expected rental yield tak.',
      scenes: '18 Drone & Interior Scenes',
      titleScore: 'Title Score: 92/100 (Heuristic)',
      keywords: 'dubai luxury real estate, palm penthouse tour, property investment yield',
    },
    {
      id: 'ai-creator',
      label: 'AI Automation Playbook',
      country: 'Creator Economy',
      title: 'How 1 Creator Replaces a 5-Person Video Agency with AI',
      spike: '91/100 Trending Topic',
      scriptHook: '[HOOK] Stop spending 12 hours writing scripts and searching for B-roll. In this video, main step-by-step dikhaunga how nine specialized AI agents handle the entire production pipeline so you only hit record.',
      scenes: '12 Studio Screen Cues',
      titleScore: 'Title Score: 89/100 (Heuristic)',
      keywords: 'ai video production, creator agency automation, youtube workflow tools',
    },
  ];

  // Pipeline steps for the interactive walkthrough
  const pipelineSteps = [
    {
      num: '01',
      name: 'Research Agent',
      chips: ['Live Signals', 'Google Trends', 'Ranked Angles'],
      icon: Search,
      badge: '10 Angles Ranked',
      desc: 'Analyzes live trends and competing videos to surface high-retention angles before you write a single sentence.',
      sampleOutput: 'Top Ranked Angle: "The Hidden Economic Signals That Explain Why Tech Exports Are Accelerating Across South Asia"',
    },
    {
      num: '02',
      name: 'Script Agent',
      chips: ['Tone Cloned', 'Spoken Cadence', 'Camera Cues'],
      icon: FileText,
      badge: '1,680 Words',
      desc: 'Generates conversational, teleprompter-ready scripts with inline [SCENE], [B-ROLL], and [PAUSE] director notes in your authentic voice.',
      sampleOutput: '[HOOK] Aaj ka mudda sirf headline nahi hai — yeh ek real economic case study hai. Let’s break down the satellite numbers layer by layer.',
    },
    {
      num: '03',
      name: 'Storyboard Agent',
      chips: ['14 Scenes', 'Visual Prompts', 'B-Roll Search'],
      icon: Film,
      badge: '14 Scenes Ready',
      desc: 'Creates a concrete production blueprint with shot types, camera lighting, visual Midjourney/DALL-E prompts, and editor keywords.',
      sampleOutput: 'Scene 01: Locked MCU, eye-level 50mm desk shot with warm key light. Visual cue: split-screen financial graph overlay with animated glow.',
    },
    {
      num: '04',
      name: 'Thumbnail Agent',
      chips: ['Safe', 'Bold', 'Experimental'],
      icon: ImageIcon,
      badge: 'Visual Heuristic: 88/100',
      desc: '3 high-converting visual concepts with text overlays, color palettes, and Midjourney image prompts designed to stop the scroll.',
      sampleOutput: 'Bold Strategy: High-contrast crimson & deep navy background with glowing chart arrow and curiosity text: "REALITY OR HYPE?"',
    },
    {
      num: '05',
      name: 'AEO & SEO Agent',
      chips: ['3 Titles', '800w Desc', 'Chapters'],
      icon: TrendingUp,
      badge: 'Rank #1 Target',
      desc: 'Optimizes for YouTube Suggested algorithm, Search, and Google AI Overviews with chapters, 30+ targeted tags, and pinned comment draft.',
      sampleOutput: 'Primary Title: "Future of IT Exports: What TV News Won’t Tell You About The Real Economy" (AEO Score: 96/100)',
    },
    {
      num: '06',
      name: 'Shorts Agent',
      chips: ['3-5 Clips', 'IG Reels', 'WhatsApp Draft'],
      icon: Share2,
      badge: '3 Viral Shorts',
      desc: 'Repurposes the core video into 3-5 vertical short-form scripts with 3-second hook variations, captions, and distribution copy.',
      sampleOutput: 'Short 1: "Why Software Developers Are Leaving Before Q4" (38s runtime, 3-sec shock hook, Instagram caption & targeted hashtags included)',
    },
  ];

  // Bento AI Tools Directory
  const aiTools = [
    {
      id: 'studio',
      category: 'video',
      name: 'Creative Studio',
      badge: 'Flagship OS',
      badgeColor: 'bg-red-500 text-white',
      desc: 'Full 9-agent autonomous pipeline: from raw idea or headline to research brief, spoken script, storyboard, thumbnails, and SEO.',
      inputs: 'Topic, Headline, Bullet Notes',
      href: '/create',
      cta: 'Start Studio',
      icon: Zap,
      featured: true,
      color: 'border-red-200 bg-gradient-to-br from-white via-red-50/20 to-white',
    },
    {
      id: 'voiceover',
      category: 'audio',
      name: 'AI Voiceover Studio',
      badge: 'Studio Audio',
      badgeColor: 'bg-purple-100 text-purple-700',
      desc: 'Natural neural voice synthesis with multilingual accents, speed control, pitch tuning, and broadcast-grade MP3/WAV download.',
      inputs: 'Script Text, Spoken Transcripts',
      href: '/voiceover',
      cta: 'Launch Voiceover',
      icon: Mic,
      color: 'border-purple-200 bg-white',
    },
    {
      id: 'visuals',
      category: 'visuals',
      name: 'Social Post Studio 2.0 & Image Enhancer',
      badge: 'Visual Engine',
      badgeColor: 'bg-amber-100 text-amber-800',
      desc: 'Generate photorealistic visuals, property staging, Instagram carousels, and high-DPI marketing graphics with one click.',
      inputs: 'Prompt, Style Preset, Aspect Ratio',
      href: '/images',
      cta: 'Generate Images',
      icon: ImageIcon,
      color: 'border-amber-200 bg-white',
    },
    {
      id: 'video-auto',
      category: 'video',
      name: 'Automated Video Creator',
      badge: 'Turnkey Video',
      badgeColor: 'bg-emerald-100 text-emerald-800',
      desc: 'Turn property specs, listings, or scripts into fully timed video reels with motion transitions, captions, and audio beds.',
      inputs: 'Property Details, Images, Script',
      href: '/video-creator',
      cta: 'Create Video',
      icon: Film,
      color: 'border-emerald-200 bg-white',
    },
    {
      id: 'valuation',
      category: 'realestate',
      name: 'AI Property Valuation',
      badge: 'Fintech AI',
      badgeColor: 'bg-blue-100 text-blue-800',
      desc: 'Instant comparative market analysis, price-per-sqft estimation, confidence score, and projected rental yields.',
      inputs: 'Location, Sqft, Bedrooms, Condition',
      href: '/valuation',
      cta: 'Calculate Value',
      icon: Calculator,
      color: 'border-blue-200 bg-white',
    },
    {
      id: 'financing',
      category: 'realestate',
      name: 'Mortgage & Installment Simulator',
      badge: 'Smart Finance',
      badgeColor: 'bg-indigo-100 text-indigo-800',
      desc: 'Simulate down payments, amortization curves, interest scenarios, and generate customer-ready financing proposals.',
      inputs: 'Property Price, Down Payment, Term',
      href: '/mortgage',
      cta: 'Simulate Loan',
      icon: Building2,
      color: 'border-indigo-200 bg-white',
    },
    {
      id: 'leads',
      category: 'realestate',
      name: 'CRM Leads Pipeline',
      badge: 'Conversion CRM',
      badgeColor: 'bg-emerald-100 text-emerald-800',
      desc: 'Manage high-intent real estate buyers, lead statuses, scheduled follow-up reminders, and instant WhatsApp chat drafts.',
      inputs: 'Client Contacts, Budget, Pipeline Stage',
      href: '/leads',
      cta: 'Open Leads CRM',
      icon: Users,
      color: 'border-emerald-200 bg-white',
    },
    {
      id: 'tone-fingerprint',
      category: 'video',
      name: 'Tone Fingerprint Analyzer',
      badge: 'Voice Cloning',
      badgeColor: 'bg-rose-100 text-rose-800',
      desc: 'Analyze your past videos to clone vocabulary tiers, signature hooks, transitions, and Hindi/English balance ratios.',
      inputs: 'YouTube URL, Sample Transcripts',
      href: '/tools/tone-fingerprint',
      cta: 'Test Fingerprint',
      icon: Bot,
      color: 'border-rose-200 bg-white',
    },
    {
      id: 'academy',
      category: 'education',
      name: 'Tameeros Academy',
      badge: 'Masterclass',
      badgeColor: 'bg-slate-100 text-slate-800',
      desc: 'Comprehensive creator curriculum covering video scripting, AEO ranking, YouTube monetization, and AI automation.',
      inputs: 'Video Modules, Practical Frameworks',
      href: '/academy',
      cta: 'Explore Academy',
      icon: GraduationCap,
      color: 'border-slate-200 bg-white',
    },
    {
      id: 'free-tools',
      category: 'tools',
      name: '12 Free Creator Micro-Tools',
      badge: '12 Free Tools',
      badgeColor: 'bg-emerald-500 text-white font-extrabold',
      desc: 'Free instant tools: 3-Second Hook Generator, Title Score & Linter, YouTube SEO Grader, PKR Income Calculator, and more.',
      inputs: 'Zero Signup Required',
      href: '/tools',
      cta: 'View All 12 Tools',
      icon: Wrench,
      color: 'border-emerald-300 bg-emerald-50/30',
    },
  ];

  const filteredTools = activeTabCategory === 'all'
    ? aiTools
    : aiTools.filter((t) => t.category === activeTabCategory || (activeTabCategory === 'video' && t.category === 'audio'));

  const faqs = [
    {
      q: 'Does Tameeros Shorts write generic robotic content, or scripts that sound like me?',
      a: 'Tameeros Shorts builds a dedicated Tone Fingerprint from your past transcripts or channel — analyzing your vocabulary level, hook style, sentence rhythm, Hindi/English blend ratio, identity markers, and signature transitions. Every script generation uses this fingerprint as core system context, so the output reads like you wrote it, never like generic ChatGPT.',
    },
    {
      q: 'What is included in the 7-day free trial?',
      a: 'The free trial gives you 2 full video packages (including all 9 agents: research brief, script, storyboard, 3 thumbnail prompts, SEO package, and viral shorts) with zero credit card required. You get complete access to test the studio before deciding.',
    },
    {
      q: 'How does Tameeros Shorts support Pakistani & international creators?',
      a: 'English, Urdu, and Roman Urdu are first-class citizens. All pricing is quoted transparently in PKR, SECP-safe financial disclaimers are built in, and payment methods support local credit/debit cards and international cards with zero hidden conversion markups.',
    },
    {
      q: 'Can I use Tameeros Shorts for real estate marketing and client leads?',
      a: 'Yes! Tameeros Shorts includes full real estate tools: AI Property Description generator, Automated Video Creator, AI Property Valuation, Mortgage Simulator, and a full CRM Leads pipeline with WhatsApp follow-up generation.',
    },
    {
      q: 'How long does a complete video package take to generate?',
      a: 'A 10-minute long-form video package runs end-to-end in approximately 3 minutes. You receive a research brief, full spoken script, fact-check report, storyboard with 14 camera cues, thumbnail prompts, SEO package, and 3-5 vertical shorts in one pass.',
    },
    {
      q: 'Can I cancel or upgrade my plan anytime?',
      a: 'Yes. You can manage, upgrade, or cancel your subscription directly from your settings with one click. Your access remains active until the end of the billing period without any penalties.',
    },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-[#F7F8FC] text-[#071B3A] antialiased selection:bg-[#FFD900] selection:text-[#071B3A]">
      <Navbar />

      <main className="flex-1">
        {/* ========================================================================= */}
        {/* HERO SECTION — 2027 GEN Z HIGH CONTRAST (ELECTRIC YELLOW & DEEP NAVY)    */}
        {/* ========================================================================= */}
        <section className="relative overflow-hidden bg-[#FFD900] pt-10 pb-20 sm:pt-14 sm:pb-28 border-b-2 border-[#071B3A]/10">
          {/* Subtle geometric circles in background inspired by reference */}
          <div className="pointer-events-none absolute -top-40 -right-40 h-[600px] w-[600px] rounded-full bg-[#FF681B]/25 blur-3xl"></div>
          <div className="pointer-events-none absolute -bottom-40 -left-40 h-[600px] w-[600px] rounded-full bg-white/40 blur-2xl"></div>

          <div className="relative mx-auto max-w-[1560px] px-4 sm:px-6 lg:px-8 xl:px-10 text-center">
            {/* Pill Tag */}
            <div className="inline-flex items-center gap-2 rounded-full border-2 border-[#071B3A] bg-white px-4 py-1.5 shadow-[0_4px_0_#071B3A] mb-7 transition-transform hover:-translate-y-0.5">
              <span className="flex h-2 w-2 rounded-full bg-[#F20D1B] animate-pulse"></span>
              <span className="text-[12px] font-black uppercase tracking-wider text-[#071B3A]">
                2027 NEXT-GEN CREATIVE OS · 9 SPECIALIST AI AGENTS
              </span>
            </div>

            {/* Bold Editorial Headline */}
            <h1 className="mx-auto max-w-5xl text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-[#071B3A] leading-[1.06]">
              Your Ideas. Our AI.{' '}
              <span className="relative inline-block text-[#F20D1B]">
                Limitless Creation.
                <span className="absolute -bottom-2.5 left-0 right-0 h-2 rounded-full bg-[#FF681B] opacity-80"></span>
              </span>
            </h1>

            {/* Subhead */}
            <p className="mx-auto mt-6 max-w-3xl text-base sm:text-xl font-medium text-[#071B3A]/85 leading-relaxed">
              Create, transform, and manage your creative workflow with <strong className="font-extrabold text-[#071B3A]">Tameeros Shorts</strong>.
              From deep research and tone-matched scripts to photorealistic visuals, storyboards, voiceovers, and CRM leads — all in one unified studio.
            </p>

            {/* CTA Buttons Cluster with Authentic 3D Tactile Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/create"
                className="inline-flex h-14 w-full sm:w-auto items-center justify-center gap-2.5 rounded-full border-2 border-[#071B3A] bg-[#F20D1B] px-9 text-[15.5px] font-black text-white shadow-[0_5px_0_#071B3A] hover:-translate-y-0.5 active:translate-y-0.5 active:shadow-[0_2px_0_#071B3A] transition-all cursor-pointer select-none"
              >
                <Zap className="h-4.5 w-4.5 fill-white" />
                <span>Start Creating</span>
                <ArrowRight className="h-4.5 w-4.5 stroke-[2.5]" />
              </Link>

              <Link
                href="/tools"
                className="inline-flex h-14 w-full sm:w-auto items-center justify-center gap-2.5 rounded-full border-2 border-[#071B3A] bg-white px-8 text-[15px] font-black text-[#071B3A] shadow-[0_5px_0_#071B3A] hover:-translate-y-0.5 active:translate-y-0.5 active:shadow-[0_2px_0_#071B3A] transition-all cursor-pointer select-none"
              >
                <Wrench className="h-4.5 w-4.5 text-[#FF681B]" />
                <span>Explore AI Tools</span>
              </Link>
            </div>

            {/* Trust points */}
            <div className="mt-5 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs sm:text-sm font-bold text-[#071B3A]/80">
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-[#071B3A]" />
                No credit card required
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-[#071B3A]" />
                7-day free trial
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-[#071B3A]" />
                2 full scripts included
              </span>
            </div>

            {/* ===================================================================== */}
            {/* 3 APP MOCKUPS SHOWCASE (INTERACTIVE DEMO / SAMPLE SIMULATION) */}
            {/* ===================================================================== */}
            <div className="mt-14 mx-auto max-w-6xl">
              <div className="mb-6 flex justify-center">
                <div className="inline-flex items-center gap-2 rounded-full border border-amber-300 bg-amber-50 px-4 py-1.5 text-xs font-bold text-amber-900 shadow-xs">
                  <span className="h-2 w-2 rounded-full bg-amber-500 animate-pulse"></span>
                  <span>Interactive Demo Preview · Sample Simulation Benchmark</span>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch text-left">
                
                {/* ----------------------------------------------------------------- */}
                {/* MOCKUP 1 (LEFT): DEEP NAVY + WARM ORANGE ARCH + YELLOW 3D CTA     */}
                {/* ----------------------------------------------------------------- */}
                <div className="relative overflow-hidden rounded-[36px] border-4 border-[#071B3A] bg-[#071B3A] p-7 text-white shadow-[0_20px_50px_rgba(7,27,58,0.25)] flex flex-col justify-between min-h-[460px] transition-transform duration-300 hover:-translate-y-1.5">
                  {/* Top Bar with brand icon */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-3.5 w-3.5 rounded-full bg-[#FF681B]"></div>
                      <span className="text-xs font-black tracking-wide uppercase text-white/90">Tameeros Shorts App</span>
                    </div>
                    <div className="flex gap-1">
                      <div className="h-1.5 w-1.5 rounded-full bg-white/60"></div>
                      <div className="h-1.5 w-1.5 rounded-full bg-white/60"></div>
                      <div className="h-1.5 w-1.5 rounded-full bg-white/60"></div>
                    </div>
                  </div>

                  {/* Warm Orange Arc Motif (from reference) */}
                  <div className="relative my-6">
                    <div className="absolute -top-10 -right-16 h-56 w-56 rounded-full bg-[#FF681B] opacity-90 -z-0"></div>
                    <div className="relative z-10 space-y-4">
                      <h3 className="text-3xl sm:text-4xl font-black text-white leading-tight tracking-tight max-w-[240px]">
                        Create Video Script in 3 minutes
                      </h3>
                      <p className="text-lg font-bold text-[#FFD900]">
                        Easy. Fast. Authentic.
                      </p>
                      <p className="text-xs text-slate-300 leading-relaxed max-w-[260px]">
                        Proprietary Tone Fingerprint matches your exact vocabulary and Hindi/English balance.
                      </p>
                    </div>
                  </div>

                  {/* Tactile Electric Yellow Pill CTA (with red dot, exactly like reference) */}
                  <div className="relative z-10 space-y-3 pt-2">
                    <Link
                      href="/create"
                      className="btn-3d-yellow flex w-full items-center justify-center gap-2 rounded-2xl py-3.5 text-center text-sm font-black text-[#071B3A]"
                    >
                      <span>Create Script</span>
                      <span className="h-2.5 w-2.5 rounded-full bg-[#F20D1B]"></span>
                    </Link>
                    <div className="text-center">
                      <Link href="/project/proj-india-pakistan-border" className="text-[11.5px] font-bold text-white/70 hover:text-white transition">
                        Already have a project? Open Studio →
                      </Link>
                    </div>
                  </div>
                </div>

                {/* ----------------------------------------------------------------- */}
                {/* MOCKUP 2 (CENTER): PURE WHITE CLEAN PHONE MOCKUP WITH METRIC CARD */}
                {/* ----------------------------------------------------------------- */}
                <div className="relative overflow-hidden rounded-[36px] border-4 border-[#071B3A] bg-white p-6 shadow-[0_20px_50px_rgba(7,27,58,0.25)] flex flex-col justify-between min-h-[460px] transition-transform duration-300 hover:-translate-y-1.5">
                  {/* Top Bar */}
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-[#F20D1B]"></div>
                      <span className="text-xs font-black tracking-wide text-slate-800">Studio Workspace</span>
                    </div>
                    <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-[10px] font-extrabold text-emerald-800">
                      ⚡ {healthStatus?.agentCount ?? 9} Agents Operational
                    </span>
                  </div>

                  {/* Top Yellow Card (Matching Reference's "Total Balance $12,983" Yellow Card) */}
                  <div className="rounded-2xl border-2 border-[#071B3A] bg-[#FFD900] p-4 text-[#071B3A] shadow-[0_3px_0_#071B3A] my-3">
                    <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wide opacity-80">
                      <span>Available Credits</span>
                      <Share2 className="h-3.5 w-3.5" />
                    </div>
                    <div className="mt-1 text-2xl sm:text-3xl font-black tracking-tight">
                      9,999 Credits (Sample)
                    </div>
                    <div className="mt-1 font-mono text-[10px] font-bold opacity-75">
                      TIER: STUDIO PRO (SAMPLE BENCHMARK)
                    </div>
                  </div>

                  {/* Real Pipeline Feed (Matching Reference's Transactions Feed) */}
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between text-xs font-extrabold text-slate-800">
                      <span>Live Generation Pipeline</span>
                      <Link href="/project/proj-india-pakistan-border" className="text-[#F20D1B] hover:underline flex items-center gap-0.5">
                        Inspect all <ArrowRight className="h-3 w-3" />
                      </Link>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 border border-slate-100">
                        <div className="flex items-center gap-2.5">
                          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-100 text-[#F20D1B]">
                            <Search className="h-4 w-4" />
                          </div>
                          <div>
                            <div className="text-xs font-bold text-slate-900">Topic Research</div>
                            <div className="text-[10px] text-slate-500">10 Angles · Spiking Signal</div>
                          </div>
                        </div>
                        <span className="text-xs font-black text-emerald-600">94/100</span>
                      </div>

                      <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 border border-slate-100">
                        <div className="flex items-center gap-2.5">
                          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-100 text-[#FF681B]">
                            <FileText className="h-4 w-4" />
                          </div>
                          <div>
                            <div className="text-xs font-bold text-slate-900">Spoken Script</div>
                            <div className="text-[10px] text-slate-500">1,680 Words · Tone Cloned</div>
                          </div>
                        </div>
                        <span className="text-xs font-black text-emerald-600">96% Match</span>
                      </div>

                      <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 border border-slate-100">
                        <div className="flex items-center gap-2.5">
                          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-100 text-purple-700">
                            <ImageIcon className="h-4 w-4" />
                          </div>
                          <div>
                            <div className="text-xs font-bold text-slate-900">3 Thumbnail Concepts</div>
                            <div className="text-[10px] text-slate-500">Safe, Bold, Experimental</div>
                          </div>
                        </div>
                        <span className="text-xs font-black text-emerald-600">Score 88/100</span>
                      </div>
                    </div>
                  </div>

                  {/* Mini Cards (Matching Reference's "My Cards" Orange & Navy Cards) */}
                  <div className="pt-2">
                    <div className="grid grid-cols-2 gap-2">
                      <div className="rounded-xl border border-[#FF681B] bg-gradient-to-br from-[#FF681B] to-[#E55500] p-2.5 text-white shadow-xs">
                        <div className="text-[10px] opacity-80">AI Voiceover</div>
                        <div className="font-extrabold text-xs">12 Voices</div>
                      </div>
                      <div className="rounded-xl border border-[#071B3A] bg-[#071B3A] p-2.5 text-white shadow-xs">
                        <div className="text-[10px] opacity-80">CRM Leads</div>
                        <div className="font-extrabold text-xs">Pipeline Live</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* ----------------------------------------------------------------- */}
                {/* MOCKUP 3 (RIGHT): PERFORMANCE GRAPH & HIGH-RPM REVENUE TRACKER    */}
                {/* ----------------------------------------------------------------- */}
                <div className="relative overflow-hidden rounded-[36px] border-4 border-[#071B3A] bg-white p-6 shadow-[0_20px_50px_rgba(7,27,58,0.25)] flex flex-col justify-between min-h-[460px] transition-transform duration-300 hover:-translate-y-1.5">
                  {/* Top Navy Card with Orange Arc (Matching Reference Mockup 3) */}
                  <div className="relative overflow-hidden rounded-2xl border-2 border-[#071B3A] bg-[#071B3A] p-4 text-white shadow-[0_3px_0_#071B3A]">
                    <div className="absolute -top-6 -right-6 h-20 w-20 rounded-full bg-[#FF681B] opacity-90"></div>
                    <div className="relative z-10">
                      <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-slate-300">
                        <span>Sample Video Revenue Model</span>
                        <span className="font-extrabold text-[#FFD900]">PKR TIER</span>
                      </div>
                      <div className="mt-1 text-2xl font-black text-white">
                        PKR 284,500 (Sample)
                      </div>
                      <div className="text-[10px] text-slate-300 font-mono mt-0.5">
                        Pakistan + Diaspora Audience Benchmark Model
                      </div>
                    </div>
                  </div>

                  {/* Timeframe Tab Switcher (Matching Reference's Weekly / Monthly / Yearly) */}
                  <div className="my-3 flex items-center justify-center gap-1 rounded-xl bg-slate-100 p-1 text-xs font-bold text-slate-600">
                    <span className="px-3 py-1 rounded-lg text-slate-500 hover:text-slate-900 cursor-pointer">Weekly</span>
                    <span className="px-3 py-1 rounded-lg bg-white text-[#071B3A] shadow-xs">Monthly</span>
                    <span className="px-3 py-1 rounded-lg text-slate-500 hover:text-slate-900 cursor-pointer">Yearly</span>
                  </div>

                  {/* Spline Graph Canvas Simulation (Matching Reference's Yellow Curve) */}
                  <div className="relative rounded-2xl border border-slate-100 bg-gradient-to-b from-[#FFFBE6] via-white to-white p-3 text-center">
                    <div className="inline-flex items-center gap-1 rounded-md bg-[#071B3A] text-[#FFD900] px-2 py-0.5 text-[11px] font-black">
                      $3,322.1 Sample RPM Benchmark
                    </div>
                    {/* SVG Spline curve matching the mockup */}
                    <div className="my-2 h-16 w-full">
                      <svg className="h-full w-full overflow-visible" viewBox="0 0 200 60" fill="none">
                        <path
                          d="M0 45 C 30 45, 50 35, 75 30 C 100 25, 120 10, 150 12 C 175 14, 185 28, 200 32"
                          stroke="#FFD900"
                          strokeWidth="4"
                          strokeLinecap="round"
                        />
                        <circle cx="150" cy="12" r="5" fill="#071B3A" stroke="#FFD900" strokeWidth="3" />
                      </svg>
                    </div>
                    <div className="flex justify-between text-[10px] font-bold text-slate-400 px-1">
                      <span>Feb</span>
                      <span>Mar</span>
                      <span>Apr</span>
                      <span className="text-[#071B3A] font-extrabold">May</span>
                      <span>Jun</span>
                      <span>Jul</span>
                      <span>Aug</span>
                    </div>
                  </div>

                  {/* Tactile Yellow Pill CTA at bottom */}
                  <div className="pt-2">
                    <Link
                      href="/create"
                      className="btn-3d-yellow flex w-full items-center justify-center gap-2 rounded-2xl py-3 text-center text-xs font-black text-[#071B3A]"
                    >
                      <span>Launch New Project</span>
                      <span className="h-2 w-2 rounded-full bg-[#F20D1B]"></span>
                    </Link>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* METRICS & VALUE BAR                                                       */}
        {/* ========================================================================= */}
        <section className="border-b-2 border-[#071B3A]/10 bg-white py-7">
          <div className="mx-auto max-w-[1560px] px-4 sm:px-6 lg:px-8 xl:px-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center md:text-left">
              <div className="flex items-center gap-3.5 justify-center md:justify-start">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border-2 border-[#071B3A] bg-[#FFD900] text-[#071B3A] shadow-[0_3px_0_#071B3A]">
                  <Bot className="h-6 w-6 stroke-[2.2]" />
                </div>
                <div>
                  <div className="text-base font-black text-[#071B3A]">9 AI Agents</div>
                  <div className="text-xs font-semibold text-slate-500">Autonomous workflow</div>
                </div>
              </div>

              <div className="flex items-center gap-3.5 justify-center md:justify-start">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border-2 border-[#071B3A] bg-[#FF681B] text-white shadow-[0_3px_0_#071B3A]">
                  <Languages className="h-6 w-6 stroke-[2.2]" />
                </div>
                <div>
                  <div className="text-base font-black text-[#071B3A]">Urdu, Roman Urdu & English</div>
                  <div className="text-xs font-semibold text-slate-500">English, Urdu & Roman Urdu</div>
                </div>
              </div>

              <div className="flex items-center gap-3.5 justify-center md:justify-start">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border-2 border-[#071B3A] bg-[#F20D1B] text-white shadow-[0_3px_0_#071B3A]">
                  <Wrench className="h-6 w-6 stroke-[2.2]" />
                </div>
                <div>
                  <div className="text-base font-black text-[#071B3A]">12 Free Tools</div>
                  <div className="text-xs font-semibold text-slate-500">Instant access without login</div>
                </div>
              </div>

              <div className="flex items-center gap-3.5 justify-center md:justify-start">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border-2 border-[#071B3A] bg-[#071B3A] text-[#FFD900] shadow-[0_3px_0_#FFD900]">
                  <Gift className="h-6 w-6 stroke-[2.2]" />
                </div>
                <div>
                  <div className="text-base font-black text-[#071B3A]">7-Day Trial</div>
                  <div className="text-xs font-semibold text-slate-500">2 full scripts · 0 card needed</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* INTERACTIVE AI TOOLS SHOWCASE (BENTO GRID WITH REAL FEATURES)             */}
        {/* ========================================================================= */}
        <section id="tools" className="py-20 sm:py-28 border-b-2 border-slate-200/80 bg-[#F7F8FC]">
          <div className="mx-auto max-w-[1560px] px-4 sm:px-6 lg:px-8 xl:px-10">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="inline-block rounded-full border border-red-300 bg-red-50 px-3.5 py-1 text-xs font-extrabold uppercase tracking-wider text-[#F20D1B] mb-2">
                VERIFIED AI CAPABILITIES
              </span>
              <h2 className="text-3xl sm:text-5xl font-black text-[#071B3A] tracking-tight">
                Everything You Need to Create at Scale.
              </h2>
              <p className="mt-3 text-slate-600 text-base sm:text-lg">
                Explore the complete suite of creative and real estate tools in SirfShoot AI. Each card connects to a dedicated tool workspace.
              </p>

              {/* Category Filter Pills */}
              <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
                {[
                  { id: 'all', label: 'All Tools (10)' },
                  { id: 'video', label: 'Video & Voice' },
                  { id: 'visuals', label: 'Images & Graphics' },
                  { id: 'realestate', label: 'Real Estate & CRM' },
                  { id: 'tools', label: 'Free Micro-Tools' },
                ].map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setActiveTabCategory(cat.id)}
                    className={`rounded-full px-5 py-2 text-xs sm:text-sm font-extrabold transition-all duration-150 cursor-pointer ${
                      activeTabCategory === cat.id
                        ? 'border-2 border-[#071B3A] bg-[#071B3A] text-[#FFD900] shadow-[0_3px_0_#071B3A]'
                        : 'border border-slate-300 bg-white text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Bento Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTools.map((tool) => {
                const ToolIcon = tool.icon;
                return (
                  <div
                    key={tool.id}
                    className={`group relative rounded-[28px] border-2 border-slate-200 bg-white p-7 shadow-sm transition-all duration-200 hover:-translate-y-1.5 hover:shadow-xl hover:border-[#071B3A] flex flex-col justify-between ${
                      tool.featured ? 'md:col-span-2 lg:col-span-2 border-red-300 bg-gradient-to-br from-white via-red-50/20 to-white' : ''
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl border-2 border-[#071B3A] bg-white text-[#071B3A] shadow-[0_2px_0_#071B3A] group-hover:bg-[#FFD900] transition-colors">
                          <ToolIcon className="h-6 w-6 stroke-[2.2]" />
                        </div>
                        <span className={`rounded-full px-3 py-1 text-xs font-extrabold uppercase tracking-wider ${tool.badgeColor}`}>
                          {tool.badge}
                        </span>
                      </div>

                      <h3 className="text-xl sm:text-2xl font-black text-[#071B3A] mb-2 tracking-tight">
                        {tool.name}
                      </h3>
                      <p className="text-sm text-slate-600 leading-relaxed mb-4">
                        {tool.desc}
                      </p>

                      <div className="rounded-xl border border-slate-100 bg-slate-50 p-3 mb-6">
                        <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 block mb-1">
                          Supported Inputs & Actions:
                        </span>
                        <span className="text-xs font-bold text-slate-800">
                          {tool.inputs}
                        </span>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-500">
                        Operational · Ready to use
                      </span>
                      <Link
                        href={tool.href}
                        className="btn-3d-white inline-flex items-center gap-1.5 rounded-full border border-slate-300 px-4 py-2 text-xs font-extrabold text-[#071B3A] hover:border-[#071B3A] transition"
                      >
                        <span>{tool.cta}</span>
                        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* DYNAMIC PRODUCT DEMONSTRATION — LIVE INTERACTIVE PIPELINE DEMO            */}
        {/* ========================================================================= */}
        <section id="demo" className="py-20 sm:py-28 border-b-2 border-slate-200/80 bg-white">
          <div className="mx-auto max-w-[1560px] px-4 sm:px-6 lg:px-8 xl:px-10">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <span className="inline-block rounded-full border border-amber-300 bg-amber-50 px-3.5 py-1 text-xs font-extrabold uppercase tracking-wider text-[#FF681B] mb-2">
                TEST BEFORE YOU COMMIT
              </span>
              <h2 className="text-3xl sm:text-5xl font-black text-[#071B3A] tracking-tight">
                Experience the 9-Agent Pipeline in Real Time.
              </h2>
              <p className="mt-3 text-slate-600 text-base sm:text-lg">
                Click across topics and agent outputs below to test the generation speed and tone fidelity. Does not consume your credits.
              </p>

              {/* Demo Topic Selector */}
              <div className="mt-7 flex flex-wrap items-center justify-center gap-2.5">
                {demoTopics.map((topic, idx) => (
                  <button
                    key={topic.id}
                    type="button"
                    onClick={() => setActiveDemoTopic(idx)}
                    className={`rounded-2xl px-5 py-2.5 text-xs sm:text-sm font-extrabold transition-all duration-150 cursor-pointer ${
                      activeDemoTopic === idx
                        ? 'border-2 border-[#071B3A] bg-[#FFD900] text-[#071B3A] shadow-[0_3px_0_#071B3A]'
                        : 'border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <span>{topic.label}</span>
                    <span className="ml-1.5 opacity-60 font-mono text-[11px]">({topic.country})</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Interactive Demo Window Container */}
            <div className="mx-auto max-w-5xl rounded-[32px] border-4 border-[#071B3A] bg-[#071B3A] p-2 sm:p-3 shadow-[0_25px_60px_rgba(7,27,58,0.2)]">
              {/* Top Chrome Header */}
              <div className="flex items-center justify-between px-4 py-3 bg-[#071B3A] rounded-t-2xl text-white">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-[#F20D1B]"></div>
                  <div className="h-3 w-3 rounded-full bg-[#FFD900]"></div>
                  <div className="h-3 w-3 rounded-full bg-emerald-400"></div>
                  <span className="ml-3 font-mono text-xs text-slate-300">
                    tameerosshorts.com/studio/{demoTopics[activeDemoTopic].id}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs font-bold text-[#FFD900]">
                  <span className="h-2 w-2 rounded-full bg-[#FFD900] animate-ping"></span>
                  <span>Pipeline Live</span>
                </div>
              </div>

              {/* Agent Stage Bar */}
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-1 bg-[#102B52] p-1.5 rounded-xl border border-white/10">
                {pipelineSteps.map((step, idx) => {
                  const StepIcon = step.icon;
                  const isActive = activeStep === idx;
                  return (
                    <button
                      key={step.num}
                      type="button"
                      onClick={() => setActiveStep(idx)}
                      className={`flex flex-col items-center justify-center p-2.5 rounded-lg text-center transition cursor-pointer ${
                        isActive
                          ? 'bg-[#FFD900] text-[#071B3A] font-black shadow-md'
                          : 'text-slate-300 hover:bg-white/10'
                      }`}
                    >
                      <StepIcon className="h-4 w-4 mb-1" />
                      <span className="text-[11px] font-bold leading-tight">{step.name.replace(' Agent', '')}</span>
                      <span className="text-[9px] font-mono opacity-70">Agent {step.num}</span>
                    </button>
                  );
                })}
              </div>

              {/* Main Demo Content Canvas */}
              <div className="mt-3 rounded-2xl bg-white p-6 sm:p-8 text-[#071B3A]">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  
                  {/* Left Column: Description & Tone Slider */}
                  <div className="lg:col-span-5 space-y-4">
                    <div className="inline-flex items-center gap-1.5 rounded-full bg-red-50 text-[#F20D1B] border border-red-200 px-3 py-0.5 text-xs font-black">
                      <span>Agent {pipelineSteps[activeStep].num} Active</span>
                    </div>

                    <h3 className="text-2xl font-black text-[#071B3A] tracking-tight">
                      {pipelineSteps[activeStep].name}
                    </h3>

                    <p className="text-sm text-slate-600 leading-relaxed">
                      {pipelineSteps[activeStep].desc}
                    </p>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {pipelineSteps[activeStep].chips.map((chip) => (
                        <span key={chip} className="rounded-md border border-slate-200 bg-slate-50 px-2 py-0.5 text-xs font-bold text-slate-700">
                          ✓ {chip}
                        </span>
                      ))}
                    </div>

                    {/* Interactive Voice Tone Slider if on script stage */}
                    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 space-y-2.5">
                      <div className="flex justify-between items-center text-xs font-bold text-slate-700">
                        <span>Hinglish Blend Tuning</span>
                        <span className="font-mono text-[#F20D1B] bg-red-100 px-2 py-0.5 rounded text-[11px]">
                          {hinglishSlider}% English Terms
                        </span>
                      </div>
                      <input
                        type="range"
                        min="10"
                        max="90"
                        value={hinglishSlider}
                        onChange={(e) => setHinglishSlider(Number(e.target.value))}
                        className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-slate-200 accent-[#F20D1B]"
                      />
                      <div className="flex justify-between text-[10px] text-slate-500 font-bold">
                        <span>Shuddh/Pure (10%)</span>
                        <span>Conversational (65%)</span>
                        <span>English First (90%)</span>
                      </div>
                    </div>

                    <div className="pt-2">
                      <Link
                        href="/create"
                        className="btn-3d-red inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-black text-white"
                      >
                        <span>Run Full Pipeline on Your Topic</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </div>

                  {/* Right Column: Live Output Card */}
                  <div className="lg:col-span-7">
                    <div className="rounded-2xl border-2 border-[#071B3A] bg-[#071B3A] p-6 text-white shadow-xl space-y-4">
                      <div className="flex items-center justify-between border-b border-white/10 pb-3">
                        <div className="flex items-center gap-2">
                          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
                          <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-black">
                            Generated Output ({pipelineSteps[activeStep].badge})
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={handleCopyDemo}
                          className="flex items-center gap-1 rounded bg-white/10 hover:bg-white/20 px-2.5 py-1 text-[11px] font-bold text-slate-200 transition"
                        >
                          <Copy className="h-3 w-3" />
                          <span>{copiedDraft ? 'Copied!' : 'Copy Preview'}</span>
                        </button>
                      </div>

                      <div className="space-y-3">
                        <div className="text-xs font-mono text-[#FFD900]">
                          TOPIC: {demoTopics[activeDemoTopic].title}
                        </div>

                        <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-sm font-sans text-slate-200 leading-relaxed">
                          {activeStep === 1
                            ? hinglishSlider > 75
                              ? `"[HOOK] Today’s headline isn't just breaking news — it’s a critical case study. The media hype is screaming one thing, but ground reality shows satellite data confirms 24% real growth."`
                              : hinglishSlider < 35
                              ? `"[HOOK] Aaj ka mudda sirf ek samachar nahi hai — yeh ek gambhir case study hai. Chaliye bina kisi sansanikhez daave ke, ground reality ko nishpaksh roop se samajhte hain."`
                              : `"[HOOK] ${demoTopics[activeDemoTopic].scriptHook}"`
                            : pipelineSteps[activeStep].sampleOutput}
                        </div>

                        <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-300 font-mono pt-1">
                          <div>⚡ Title Score: <span className="text-[#FFD900] font-bold">{demoTopics[activeDemoTopic].titleScore}</span></div>
                          <div>🎬 Scenes: <span className="text-emerald-400 font-bold">{demoTopics[activeDemoTopic].scenes}</span></div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-3 border-t border-white/10 text-xs">
                        <span className="text-slate-400">Want to see the complete project?</span>
                        <Link
                          href="/project/proj-india-pakistan-border"
                          className="text-[#FFD900] font-bold hover:underline flex items-center gap-1"
                        >
                          Open Live Project Studio →
                        </Link>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* HOW IT WORKS — VISUAL 4-STEP WORKFLOW                                    */}
        {/* ========================================================================= */}
        <section id="how-it-works" className="py-20 sm:py-28 border-b-2 border-slate-200/80 bg-[#F7F8FC]">
          <div className="mx-auto max-w-[1560px] px-4 sm:px-6 lg:px-8 xl:px-10">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="inline-block rounded-full border border-purple-300 bg-purple-50 px-3.5 py-1 text-xs font-extrabold uppercase tracking-wider text-purple-700 mb-2">
                FOUR SIMPLE STEPS
              </span>
              <h2 className="text-3xl sm:text-5xl font-black text-[#071B3A] tracking-tight">
                From Raw Idea to Publish-Ready in Minutes.
              </h2>
              <p className="mt-3 text-slate-600 text-base sm:text-lg">
                Stop staring at an empty teleprompter or spending 8 hours on research. Here is how Tameeros Shorts works.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
              {[
                {
                  step: '01',
                  color: 'bg-[#FFD900] text-[#071B3A]',
                  title: 'Pick Agent or Tool',
                  desc: 'Choose Creative Studio for full long-form video, Voiceover Studio for audio, or Real Estate tools for property tours.',
                  icon: Bot,
                },
                {
                  step: '02',
                  color: 'bg-[#FF681B] text-white',
                  title: 'Describe Your Idea',
                  desc: 'Paste a link, news headline, bullet list of talking points, or upload a rough property spec sheet.',
                  icon: FileText,
                },
                {
                  step: '03',
                  color: 'bg-[#F20D1B] text-white',
                  title: 'Calibrate Your Voice',
                  desc: 'Set your Tone Fingerprint, select your Hindi/English blend, and target audience tier (Beginner, Intermediate, Pro).',
                  icon: SlidersIcon,
                },
                {
                  step: '04',
                  color: 'bg-[#071B3A] text-[#FFD900]',
                  title: 'Export & Shoot',
                  desc: 'Receive your full teleprompter script, 14-scene storyboard, 3 thumbnail Midjourney prompts, SEO metadata, and 3 shorts.',
                  icon: Film,
                },
              ].map((item) => {
                const StepIcon = item.icon;
                return (
                  <div
                    key={item.step}
                    className="relative rounded-[28px] border-2 border-slate-200 bg-white p-7 shadow-sm flex flex-col justify-between transition-transform hover:-translate-y-1.5"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-5">
                        <span className={`flex h-11 w-11 items-center justify-center rounded-2xl border-2 border-[#071B3A] font-black text-sm shadow-[0_3px_0_#071B3A] ${item.color}`}>
                          {item.step}
                        </span>
                        <StepIcon className="h-6 w-6 text-slate-400" />
                      </div>

                      <h3 className="text-xl font-black text-[#071B3A] mb-2">
                        {item.title}
                      </h3>
                      <p className="text-sm text-slate-600 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>

                    <div className="mt-6 pt-3 border-t border-slate-100 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                      Seamless Automation
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* WHY TAMEEROS SHORTS — DISTINCTIVE BENEFIT CARDS                              */}
        {/* ========================================================================= */}
        <section className="py-20 sm:py-28 border-b-2 border-slate-200/80 bg-white">
          <div className="mx-auto max-w-[1560px] px-4 sm:px-6 lg:px-8 xl:px-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              <div className="lg:col-span-5 space-y-6">
                <span className="inline-block rounded-full border border-red-300 bg-red-50 px-3.5 py-1 text-xs font-extrabold uppercase tracking-wider text-[#F20D1B]">
                  WHY CREATORS SWITCH
                </span>
                <h2 className="text-3xl sm:text-5xl font-black text-[#071B3A] tracking-tight leading-tight">
                  Stop Babysitting AI. <span className="text-[#F20D1B]">Start Shipping.</span>
                </h2>
                <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
                  Most AI tools give you a generic 300-word essay with clichés like &quot;dive deep&quot; and &quot;unlock the power&quot;.
                  Tameeros Shorts is built specifically for creators who talk to a camera.
                </p>

                <div className="space-y-4">
                  <div className="flex items-start gap-3.5">
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs mt-0.5">
                      ✓
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-slate-900">Fact-Check & Sourced Claim Audit</h4>
                      <p className="text-sm text-slate-500">Every script runs through a dedicated Fact-Check agent that flags uncorroborated claims before you record.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs mt-0.5">
                      ✓
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-slate-900">Authentic Dialect & Cadence</h4>
                      <p className="text-sm text-slate-500">Fine-tuned for Pakistani & diaspora speech patterns (natural English, Urdu, and Roman Urdu without stiff translation).</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs mt-0.5">
                      ✓
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-slate-900">One Subscription Replaces 8 Tools</h4>
                      <p className="text-sm text-slate-500">Includes teleprompter, image generation, voiceovers, storyboards, SEO tagging, and CRM leads.</p>
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <Link
                    href="/create"
                    className="btn-3d-navy inline-flex items-center gap-2 rounded-full px-7 py-3 text-sm font-black text-white"
                  >
                    <span>Test Tameeros Shorts Risk-Free</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>

              {/* Right Column: Visual Comparison Bento */}
              <div className="lg:col-span-7 space-y-4">
                <div className="rounded-[32px] border-4 border-[#071B3A] bg-[#071B3A] p-7 text-white shadow-xl space-y-4">
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <span className="text-xs font-mono font-bold text-[#FFD900]">TRADITIONAL WORKFLOW (8+ HOURS)</span>
                    <span className="text-xs text-red-400 font-bold">Fragmented & Slow</span>
                  </div>
                  <div className="space-y-2 text-xs text-slate-400 font-mono">
                    <div className="flex items-center justify-between p-2 rounded bg-white/5 line-through">
                      <span>• ChatGPT for generic bullet points</span>
                      <span>2.5 hrs</span>
                    </div>
                    <div className="flex items-center justify-between p-2 rounded bg-white/5 line-through">
                      <span>• Rewriting robotic tone into spoken voice</span>
                      <span>2.0 hrs</span>
                    </div>
                    <div className="flex items-center justify-between p-2 rounded bg-white/5 line-through">
                      <span>• Searching B-roll and drafting storyboard</span>
                      <span>1.5 hrs</span>
                    </div>
                    <div className="flex items-center justify-between p-2 rounded bg-white/5 line-through">
                      <span>• Midjourney thumbnail prompts & SEO</span>
                      <span>1.5 hrs</span>
                    </div>
                  </div>
                </div>

                <div className="rounded-[32px] border-4 border-[#071B3A] bg-[#FFD900] p-7 text-[#071B3A] shadow-xl space-y-4">
                  <div className="flex items-center justify-between border-b border-[#071B3A]/20 pb-3">
                    <span className="text-xs font-mono font-black text-[#071B3A]">TAMEEROS SHORTS 9-AGENT PIPELINE (3 MINUTES)</span>
                    <span className="text-xs bg-[#071B3A] text-white px-2.5 py-0.5 rounded-full font-black">10x Speed</span>
                  </div>
                  <div className="space-y-2 text-xs font-extrabold text-[#071B3A]">
                    <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/80 border border-[#071B3A]/10">
                      <span>✓ Live Trend Research + Ranked Angles</span>
                      <span className="font-mono text-emerald-800">Done (30s)</span>
                    </div>
                    <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/80 border border-[#071B3A]/10">
                      <span>✓ 1,680-Word Script Cloned in Your Voice</span>
                      <span className="font-mono text-emerald-800">Done (45s)</span>
                    </div>
                    <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/80 border border-[#071B3A]/10">
                      <span>✓ 14-Scene Storyboard with Midjourney Prompts</span>
                      <span className="font-mono text-emerald-800">Done (25s)</span>
                    </div>
                    <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/80 border border-[#071B3A]/10">
                      <span>✓ 3 Visual Concept Thumbnails + SEO Package + 3 Shorts</span>
                      <span className="font-mono text-emerald-800">Done (30s)</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* HONEST PRICING PLANS (PKR TRANSPARENCY PRESERVED)                         */}
        {/* ========================================================================= */}
        <section id="pricing" className="py-20 sm:py-28 border-b-2 border-slate-200/80 bg-[#F7F8FC]">
          <div className="mx-auto max-w-[1560px] px-4 sm:px-6 lg:px-8 xl:px-10">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="inline-block rounded-full border border-red-300 bg-red-50 px-3.5 py-1 text-xs font-extrabold uppercase tracking-wider text-[#F20D1B] mb-2">
                HONEST PRICING
              </span>
              <h2 className="text-3xl sm:text-5xl font-black text-[#071B3A] tracking-tight">
                Every Plan Runs the Complete 9-Agent Pipeline.
              </h2>
              <p className="mt-3 text-slate-600 text-base sm:text-lg">
                No feature gating. Every subscriber gets research, tone fingerprinting, storyboards, thumbnails, SEO, and shorts. Plans differ only by monthly script volume.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              
              {/* Free Trial */}
              <div className="rounded-[28px] border-2 border-slate-200 bg-white p-7 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-black text-slate-900">Free Trial</h3>
                    <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[10px] font-extrabold uppercase text-slate-600">
                      7 Days
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mb-4">Try the full pipeline risk-free.</p>
                  <div className="mb-6">
                    <span className="text-3xl font-black text-slate-900">PKR 0</span>
                    <span className="text-xs text-slate-500 ml-1 font-bold">/ 7 days</span>
                  </div>
                  <ul className="space-y-2.5 text-xs text-slate-600 mb-6">
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-emerald-600" />
                      <strong className="text-slate-900">2 full video scripts</strong>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-emerald-600" />
                      Complete 9-agent pipeline
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-emerald-600" />
                      Tone Fingerprint generation
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-emerald-600" />
                      No credit card required
                    </li>
                  </ul>
                </div>
                <Link
                  href="/create"
                  className="btn-3d-white w-full inline-flex items-center justify-center rounded-2xl border border-slate-300 py-3 text-xs font-extrabold text-slate-800"
                >
                  Start Free Trial
                </Link>
              </div>

              {/* Starter */}
              <div className="rounded-[28px] border-2 border-slate-200 bg-white p-7 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-black text-slate-900">Starter</h3>
                    <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[10px] font-extrabold uppercase text-slate-600">
                      3 / mo
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mb-4">For consistent part-time creators.</p>
                  <div className="mb-6">
                    <span className="text-3xl font-black text-slate-900">PKR 499</span>
                    <span className="text-xs text-slate-500 ml-1 font-bold">/ month</span>
                  </div>
                  <ul className="space-y-2.5 text-xs text-slate-600 mb-6">
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-emerald-600" />
                      <strong className="text-slate-900">3 full scripts / month</strong>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-emerald-600" />
                      Complete 9-agent pipeline
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-emerald-600" />
                      Single channel tone profile
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-emerald-600" />
                      Teleprompter & export tools
                    </li>
                  </ul>
                </div>
                <Link
                  href="/create"
                  className="btn-3d-white w-full inline-flex items-center justify-center rounded-2xl border border-slate-300 py-3 text-xs font-extrabold text-slate-800"
                >
                  Choose Starter
                </Link>
              </div>

              {/* Creator (Most Popular) */}
              <div className="relative rounded-[28px] border-3 border-[#071B3A] bg-white p-7 shadow-2xl flex flex-col justify-between ring-4 ring-[#FFD900]">
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full border-2 border-[#071B3A] bg-[#FFD900] px-4 py-0.5 text-[10px] font-black uppercase tracking-widest text-[#071B3A]">
                  MOST POPULAR
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-black text-slate-900">Creator</h3>
                    <span className="rounded-full bg-red-100 px-2.5 py-0.5 text-[10px] font-extrabold uppercase text-[#F20D1B]">
                      7 / mo
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mb-4">Shipping 1-2 videos every week.</p>
                  <div className="mb-6">
                    <span className="text-3xl font-black text-slate-900">PKR 999</span>
                    <span className="text-xs text-slate-500 ml-1 font-bold">/ month</span>
                  </div>
                  <ul className="space-y-2.5 text-xs text-slate-600 mb-6">
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-[#F20D1B]" />
                      <strong className="text-slate-900">7 full scripts / month</strong>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-[#F20D1B]" />
                      Full 9-agent pipeline on all
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-[#F20D1B]" />
                      Unlimited Tone Fingerprints
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-[#F20D1B]" />
                      WhatsApp + Email priority support
                    </li>
                  </ul>
                </div>
                <Link
                  href="/create"
                  className="btn-3d-red w-full inline-flex items-center justify-center rounded-2xl py-3.5 text-xs font-black text-white"
                >
                  Go Creator Plan →
                </Link>
              </div>

              {/* Pro */}
              <div className="rounded-[28px] border-2 border-slate-200 bg-white p-7 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-black text-slate-900">Pro</h3>
                    <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-[10px] font-extrabold uppercase text-amber-800">
                      15 / mo
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mb-4">For daily and high-volume teams.</p>
                  <div className="mb-6">
                    <span className="text-3xl font-black text-slate-900">PKR 1,999</span>
                    <span className="text-xs text-slate-500 ml-1 font-bold">/ month</span>
                  </div>
                  <ul className="space-y-2.5 text-xs text-slate-600 mb-6">
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-emerald-600" />
                      <strong className="text-slate-900">15 full scripts / month</strong>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-emerald-600" />
                      Priority AI pipeline routing
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-emerald-600" />
                      Multi-channel workspace
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-emerald-600" />
                      Dedicated WhatsApp support
                    </li>
                  </ul>
                </div>
                <Link
                  href="/create"
                  className="btn-3d-white w-full inline-flex items-center justify-center rounded-2xl border border-slate-300 py-3 text-xs font-extrabold text-slate-800"
                >
                  Get Pro
                </Link>
              </div>

            </div>

            <div className="mt-10 text-center text-xs text-slate-500 font-mono">
              All prices quoted in PKR · Cancel anytime with 1 click · No rollover of unused scripts
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* FAQ ACCORDION                                                             */}
        {/* ========================================================================= */}
        <section id="faq" className="py-20 sm:py-28 border-b-2 border-slate-200/80 bg-white">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <span className="inline-block rounded-full border border-slate-300 bg-slate-100 px-3.5 py-1 text-xs font-extrabold uppercase tracking-wider text-slate-700 mb-2">
                FREQUENTLY ASKED QUESTIONS
              </span>
              <h2 className="text-3xl sm:text-5xl font-black text-[#071B3A] tracking-tight">
                Everything You Need to Know.
              </h2>
            </div>

            <div className="space-y-3.5">
              {faqs.map((faq, idx) => {
                const isOpen = faqOpen[idx];
                return (
                  <div
                    key={faq.q}
                    className="rounded-[22px] border-2 border-slate-200 bg-white overflow-hidden shadow-xs transition-colors hover:border-[#071B3A]"
                  >
                    <button
                      type="button"
                      onClick={() => toggleFaq(idx)}
                      className="flex w-full items-center justify-between p-5 sm:p-6 text-left font-black text-sm sm:text-base text-[#071B3A] transition hover:bg-slate-50 cursor-pointer"
                    >
                      <span className="pr-4">{faq.q}</span>
                      <ChevronDown
                        className={`h-5 w-5 shrink-0 text-slate-400 transition-transform duration-200 ${
                          isOpen ? 'rotate-180 text-[#F20D1B]' : ''
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-5 sm:px-6 pb-6 pt-1 text-sm text-slate-600 leading-relaxed border-t border-slate-100">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* FINAL CONVERSION SECTION — 2027 GEN Z CONTRAST CLOSING                   */}
        {/* ========================================================================= */}
        <section className="relative overflow-hidden bg-[#071B3A] py-24 sm:py-32 text-white text-center">
          {/* Subtle curved accents inspired by reference */}
          <div className="pointer-events-none absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-[#FF681B] opacity-80 blur-2xl"></div>
          <div className="pointer-events-none absolute -top-32 -left-32 h-96 w-96 rounded-full bg-[#FFD900] opacity-40 blur-2xl"></div>

          <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-6">
            <span className="inline-block rounded-full border border-[#FFD900]/40 bg-[#FFD900]/10 px-4 py-1 text-xs font-black uppercase tracking-widest text-[#FFD900]">
              YOUR NEXT BIG IDEA STARTS HERE
            </span>

            <h2 className="text-3xl sm:text-6xl font-black tracking-tight leading-[1.08] text-white">
              Open your creative workspace and discover what you can build.
            </h2>

            <p className="mx-auto max-w-2xl text-slate-300 text-base sm:text-xl font-medium leading-relaxed">
              Join Pakistani and global creators producing publish-ready YouTube scripts, storyboards, voiceovers, and SEO at 10x speed.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/create"
                className="btn-3d-yellow inline-flex h-14 w-full sm:w-auto items-center justify-center gap-2.5 rounded-full px-9 text-base font-black text-[#071B3A]"
              >
                <span>Start Studio Free (2 Scripts)</span>
                <span className="h-2.5 w-2.5 rounded-full bg-[#F20D1B]"></span>
              </Link>

              <Link
                href="/tools"
                className="btn-3d-white inline-flex h-14 w-full sm:w-auto items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 px-8 text-sm font-extrabold text-white hover:bg-white/20 transition"
              >
                <span>Explore 12 Free Tools</span>
              </Link>
            </div>

            <div className="text-xs text-slate-400 font-mono pt-2">
              7 days free · Zero credit card required · Instant pipeline setup
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

// Icon helper
function SlidersIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="4" x2="4" y1="21" y2="14" />
      <line x1="4" x2="4" y1="10" y2="3" />
      <line x1="12" x2="12" y1="21" y2="12" />
      <line x1="12" x2="12" y1="8" y2="3" />
      <line x1="20" x2="20" y1="21" y2="16" />
      <line x1="20" x2="20" y1="12" y2="3" />
      <line x1="1" x2="7" y1="14" y2="14" />
      <line x1="9" x2="15" y1="8" y2="8" />
      <line x1="17" x2="23" y1="16" y2="16" />
    </svg>
  );
}
