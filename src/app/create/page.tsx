'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useCreatorStore } from '@/lib/store';
import { runFullPipeline } from '@/lib/ai-pipeline';
import { LanguageMode, ToneFingerprint } from '@/lib/types';
import confetti from 'canvas-confetti';
import {
  Sparkles,
  Zap,
  Bot,
  CheckCircle2,
  ArrowRight,
  Flame,
  Home,
} from 'lucide-react';

export default function CreateProjectPage() {
  const router = useRouter();
  const { state, addProject } = useCreatorStore();

  const [topic, setTopic] = useState('');
  const [niche, setNiche] = useState('Geopolitics');
  const [language, setLanguage] = useState<LanguageMode>('hinglish');
  const [runtime, setRuntime] = useState<number>(10);
  const [selectedToneId, setSelectedToneId] = useState<string>(
    state.activeFingerprints[0]?.id || 'tone-hinglish-explainer'
  );

  // Pipeline execution state
  const [isGenerating, setIsGenerating] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [createdProjectId, setCreatedProjectId] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [progressPercent, setProgressPercent] = useState(0);
  const [liveLogs, setLiveLogs] = useState<string[]>([]);

  const trendingTopics = [
    {
      title: 'Daily Christian Morning Prayer: 5 Minutes of Peace, Strength & Overcoming Worry',
      niche: 'Faith & Spirituality / Christian Daily Prayer & Encouragement',
    },
    {
      title: 'Islamic Bedtime Duas & Moral Story: The Honest Merchant & Prophet’s Kindness',
      niche: 'Islamic Content for Children & Families (Moral Stories, Bedtime Duas, Lullabies)',
    },
    {
      title: 'Pakistan tech & AI boom: Will it transform 500,000 freelance developers by 2027?',
      niche: 'Technology & AI',
    },
    {
      title: 'Regional diplomacy & LoC headlines: Why sensational news spreads',
      niche: 'Geopolitics',
    },
    {
      title: 'SECP compliance rules for Pakistani finance creators & finfluencers',
      niche: 'Personal Finance & Investing',
    },
    {
      title: 'Pakistan IT exports & digital banking: Why fintech giants are expanding',
      niche: 'Startups & Business',
    },
  ];

  const agentSteps = [
    { id: 1, name: 'Topic Research Agent', desc: 'Ranking search volume, angles & competition...' },
    { id: 2, name: 'Script Research Agent', desc: 'Synthesizing historical facts & multi-source citations...' },
    { id: 3, name: 'Fact-Check & Verification', desc: 'Analyzing claims against primary government records...' },
    { id: 4, name: 'Legal & Policy Review', desc: 'Checking defamation, fair use & advertiser guidelines...' },
    { id: 5, name: 'Script Writer Agent', desc: 'Injecting Tone Fingerprint & drafting camera-ready spoken script...' },
    { id: 6, name: 'Storyboard Director', desc: 'Planning 12-16 scenes with camera angles & AI image prompts...' },
    { id: 7, name: 'Thumbnail Designer', desc: 'Crafting Safe, Bold, and Experimental visual concepts...' },
    { id: 8, name: 'SEO & AEO Metadata', desc: 'Generating 3 title options, 800-word description & chapters...' },
    { id: 9, name: 'Shorts & Distribution', desc: 'Extracting 3 vertical short clips, IG captions & WhatsApp drafts...' },
  ];

  const handleStartPipeline = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) return;

    setIsGenerating(true);
    setProgressPercent(5);
    setCurrentStep(1);
    setLiveLogs([`[00:01] Initializing Tameeros Shorts 9-Agent Pipeline for: "${topic.slice(0, 40)}..."`]);

    const chosenTone: ToneFingerprint =
      state.activeFingerprints.find((t) => t.id === selectedToneId) || state.activeFingerprints[0];

    // Simulate animated step progression through the 9 agents
    for (let i = 1; i <= 9; i++) {
      setCurrentStep(i);
      const stepInfo = agentSteps[i - 1];
      setLiveLogs((prev) => [
        `[Agent ${i}/9] ${stepInfo.name}: ${stepInfo.desc}`,
        ...prev.slice(0, 8),
      ]);
      setProgressPercent(Math.round((i / 9) * 95));
      await new Promise((res) => setTimeout(res, 450));
    }

    // Run actual full pipeline generator
    const newProject = await runFullPipeline({
      topic,
      niche,
      language,
      targetRuntimeMin: runtime,
      toneFingerprint: chosenTone,
      channelName: state.channelName,
    });

    setProgressPercent(100);
    setLiveLogs((prev) => ['[SUCCESS] All 9 agents completed. Packaging Studio workspace...', ...prev]);

    // Save project into creator store
    addProject(newProject);
    setCreatedProjectId(newProject.id);
    setIsCompleted(true);

    try {
      confetti({ particleCount: 70, spread: 70, origin: { y: 0.6 } });
    } catch {
      // ignore
    }

    // Auto-navigate after 2.5 seconds or let user click Next immediately
    setTimeout(() => {
      router.push(`/project/${newProject.id}`);
    }, 2500);
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#F8FAFC]">
      <Navbar />

      <main className="flex-1 py-10 sm:py-14">
        <div className="mx-auto max-w-5xl px-5 sm:px-6 lg:px-8">
          {/* Top navigation row */}
          <div className="mb-6 flex items-center justify-between">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition shadow-xs"
            >
              <Home className="h-3.5 w-3.5 text-slate-500" />
              <span>Home</span>
            </Link>

            <Link
              href="/dashboard"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 transition"
            >
              <span>← Back to Dashboard</span>
            </Link>
          </div>

          {/* Header */}
          <div className="mb-8">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-red-50 border border-red-200 px-3 py-1 text-xs font-bold text-[#E50914] mb-3">
              <Sparkles className="h-3.5 w-3.5" />
              <span>9-AGENT CREATIVE STUDIO</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-[#0F172A] tracking-tight">
              Create New Video Project
            </h1>
            <p className="mt-2 text-sm sm:text-base text-slate-600">
              Enter any video idea or select a trending angle. Our 9 specialized AI agents will deliver your complete research brief, tone-cloned script, storyboard, thumbnails, SEO, and shorts.
            </p>
          </div>

          {/* PIPELINE PROGRESS OVERLAY IF GENERATING */}
          {isGenerating ? (
            <div className="rounded-3xl border border-slate-300 bg-white p-6 sm:p-10 shadow-2xl card-shadow">
              <div className="text-center max-w-xl mx-auto space-y-5">
                <div
                  className={`inline-flex h-16 w-16 items-center justify-center rounded-2xl text-white shadow-lg ${
                    isCompleted
                      ? 'bg-emerald-600 scale-105 transition-transform'
                      : 'bg-gradient-to-tr from-[#E50914] to-orange-500 animate-pulse'
                  }`}
                >
                  {isCompleted ? <CheckCircle2 className="h-8 w-8" /> : <Bot className="h-8 w-8" />}
                </div>

                <h2 className="text-2xl font-black text-slate-900">
                  {isCompleted ? 'Pipeline Complete!' : 'Running 9-Agent Pipeline...'}
                </h2>

                <p className="text-sm text-slate-600">
                  {isCompleted ? (
                    <span className="font-bold text-emerald-600 flex items-center justify-center gap-1">
                      <CheckCircle2 className="h-4 w-4" />
                      All 9 AI Agents Finished — Studio Workspace Ready
                    </span>
                  ) : (
                    <>
                      Step {currentStep} of 9: <span className="font-bold text-[#E50914]">{agentSteps[currentStep - 1]?.name}</span>
                    </>
                  )}
                </p>

                {/* Progress bar */}
                <div className="h-3 w-full overflow-hidden rounded-full bg-slate-100 border border-slate-200">
                  <div
                    className={`h-full transition-all duration-300 ${
                      isCompleted ? 'bg-emerald-500' : 'bg-gradient-to-r from-[#E50914] to-orange-500'
                    }`}
                    style={{ width: `${progressPercent}%` }}
                  ></div>
                </div>

                <div className="flex justify-between font-mono text-xs text-slate-500">
                  <span>{isCompleted ? 'Production Package Ready' : agentSteps[currentStep - 1]?.desc}</span>
                  <span className="font-bold text-slate-900">{progressPercent}%</span>
                </div>

                {/* ACTION BUTTONS: NEXT / HOME / DASHBOARD */}
                <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                  {createdProjectId ? (
                    <Link
                      href={`/project/${createdProjectId}`}
                      className="btn-shadow inline-flex items-center justify-center gap-2 rounded-full bg-[#E50914] px-6 py-3 text-sm font-bold text-white hover:bg-[#B91C1C] transition active:scale-95 shadow-lg shadow-red-500/20"
                    >
                      <span>Next: Open Studio Workspace</span>
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  ) : (
                    <button
                      type="button"
                      disabled
                      className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-200 px-6 py-3 text-sm font-bold text-slate-500 cursor-not-allowed"
                    >
                      <span>Processing Agents ({progressPercent}%)...</span>
                    </button>
                  )}

                  <Link
                    href="/"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-100 transition shadow-xs"
                  >
                    <Home className="h-4 w-4 text-slate-500" />
                    <span>Home</span>
                  </Link>

                  <Link
                    href="/dashboard"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-100 transition"
                  >
                    <span>Dashboard</span>
                  </Link>
                </div>

                {/* Live Agent Activity Log */}
                <div className="mt-4 rounded-xl border border-slate-800 bg-[#0C0C0F] p-4 text-left font-mono text-xs text-emerald-400 space-y-1.5 overflow-hidden shadow-inner">
                  <div className="text-[10px] uppercase tracking-wider text-slate-500 border-b border-white/10 pb-1.5 mb-2">
                    Agent Coordination Log Stream
                  </div>
                  {liveLogs.map((log, idx) => (
                    <div key={idx} className="truncate">
                      {log}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            /* PROJECT SETUP FORM */
            <form onSubmit={handleStartPipeline} className="space-y-8">
              {/* Card 1: Video Topic / Idea */}
              <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 card-shadow space-y-4">
                <div className="flex items-center justify-between">
                  <label htmlFor="topic" className="block text-base font-bold text-slate-900">
                    What is your video idea or topic? <span className="text-red-500">*</span>
                  </label>
                  <span className="text-xs text-slate-500 font-mono">English, Hindi or Hinglish</span>
                </div>

                <div className="relative">
                  <textarea
                    id="topic"
                    rows={3}
                    required
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    placeholder="e.g. Pakistan IT freelancing boom, regional geopolitics breakdown, or solar energy surge in Pakistan..."
                    className="w-full rounded-xl border border-slate-300 p-4 text-sm sm:text-base text-slate-900 placeholder:text-slate-400 focus:border-[#E50914] focus:ring-1 focus:ring-[#E50914] focus:outline-none"
                  />
                </div>

                {/* Trending Topics Quick Pills */}
                <div>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                    <Flame className="h-3.5 w-3.5 text-[#E50914]" />
                    <span>Or Pick A High-Demand Trending Angle</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {trendingTopics.map((item) => (
                      <button
                        key={item.title}
                        type="button"
                        onClick={() => {
                          setTopic(item.title);
                          setNiche(item.niche);
                        }}
                        className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-700 hover:border-red-300 hover:bg-red-50 hover:text-[#E50914] transition text-left"
                      >
                        ⚡ {item.title}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card 2: Configuration & Parameters */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Niche & Runtime */}
                <div className="rounded-2xl border border-slate-200 bg-white p-6 card-shadow space-y-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                      Primary Niche / Category
                    </label>
                    <select
                      value={niche}
                      onChange={(e) => {
                        const val = e.target.value;
                        setNiche(val);
                        if (val.includes('Christian Daily Prayer')) {
                          const cpTone = state.activeFingerprints.find((t) => t.id === 'tone-christian-prayer');
                          if (cpTone) setSelectedToneId(cpTone.id);
                          setLanguage('english');
                        } else if (val.includes('Islamic Content for Children')) {
                          const ifTone = state.activeFingerprints.find((t) => t.id === 'tone-islamic-family');
                          if (ifTone) setSelectedToneId(ifTone.id);
                        }
                      }}
                      className="w-full rounded-xl border border-slate-300 p-2.5 text-sm text-slate-800 focus:border-[#E50914] focus:outline-none"
                    >
                      <option value="Geopolitics">Geopolitics & National Security</option>
                      <option value="Personal Finance & Investing">Personal Finance & Investing</option>
                      <option value="Technology & AI">Technology, AI & Gadgets</option>
                      <option value="Startups & Business">Startups, Business & Economy</option>
                      <option value="Commentary & Culture">Culture & Social Commentary</option>
                      <option value="Science & History">Science, Defense & History</option>
                      <option value="Faith & Spirituality / Christian Daily Prayer & Encouragement">
                        Faith & Spirituality / Christian Daily Prayer & Encouragement
                      </option>
                      <option value="Islamic Content for Children & Families (Moral Stories, Bedtime Duas, Lullabies)">
                        Islamic Content for Children & Families (Moral Stories, Bedtime Duas, Lullabies)
                      </option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                      Target Video Duration: <span className="text-[#E50914]">{runtime} Minutes</span>
                    </label>
                    <div className="grid grid-cols-4 gap-2">
                      {[5, 10, 15, 20].map((mins) => (
                        <button
                          key={mins}
                          type="button"
                          onClick={() => setRuntime(mins)}
                          className={`rounded-xl border py-2 text-xs font-bold transition ${
                            runtime === mins
                              ? 'border-[#E50914] bg-red-50 text-[#E50914]'
                              : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                          }`}
                        >
                          {mins} Min
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                      Language Style
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { id: 'hinglish', label: 'Hinglish (Blend)' },
                        { id: 'hindi', label: 'Hindi (Shuddh)' },
                        { id: 'english', label: 'English' },
                      ].map((lang) => (
                        <button
                          key={lang.id}
                          type="button"
                          onClick={() => setLanguage(lang.id as LanguageMode)}
                          className={`rounded-xl border py-2 text-xs font-bold transition ${
                            language === lang.id
                              ? 'border-[#E50914] bg-red-50 text-[#E50914]'
                              : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                          }`}
                        >
                          {lang.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Tone Fingerprint Selector */}
                <div className="rounded-2xl border border-slate-200 bg-white p-6 card-shadow space-y-4">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                      Channel Tone Fingerprint
                    </label>
                    <span className="text-[11px] text-emerald-600 font-bold">Voice Cloner</span>
                  </div>

                  <div className="space-y-2">
                    {state.activeFingerprints.map((tf) => (
                      <div
                        key={tf.id}
                        onClick={() => {
                          setSelectedToneId(tf.id);
                          if (tf.language === 'english') {
                            setLanguage('english');
                          }
                          if (tf.id === 'tone-christian-prayer') {
                            setNiche('Faith & Spirituality / Christian Daily Prayer & Encouragement');
                          } else if (tf.id === 'tone-islamic-family') {
                            setNiche('Islamic Content for Children & Families (Moral Stories, Bedtime Duas, Lullabies)');
                          }
                        }}
                        className={`cursor-pointer rounded-xl border p-3.5 transition flex items-start gap-3 ${
                          selectedToneId === tf.id
                            ? 'border-[#E50914] bg-red-50/40 shadow-xs'
                            : 'border-slate-200 bg-white hover:bg-slate-50'
                        }`}
                      >
                        <input
                          type="radio"
                          name="tone"
                          checked={selectedToneId === tf.id}
                          onChange={() => {
                            setSelectedToneId(tf.id);
                            if (tf.language === 'english') setLanguage('english');
                            if (tf.id === 'tone-christian-prayer') {
                              setNiche('Faith & Spirituality / Christian Daily Prayer & Encouragement');
                            } else if (tf.id === 'tone-islamic-family') {
                              setNiche('Islamic Content for Children & Families (Moral Stories, Bedtime Duas, Lullabies)');
                            }
                          }}
                          className="mt-1 h-4 w-4 text-[#E50914] accent-[#E50914]"
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-bold text-slate-900">{tf.name}</span>
                            <span
                              className={`font-mono text-[10px] rounded px-1.5 py-0.5 font-bold ${
                                tf.language === 'english' || tf.hinglishRatio === 0
                                  ? 'bg-blue-100 text-blue-700'
                                  : 'bg-slate-100 text-slate-600'
                              }`}
                            >
                              {tf.language === 'english' || tf.hinglishRatio === 0
                                ? '100% English'
                                : `${tf.hinglishRatio}% Hinglish`}
                            </span>
                          </div>
                          <p className="text-xs text-slate-500 mt-0.5">{tf.hookStyle}</p>
                          <div className="mt-1.5 flex flex-wrap gap-1">
                            {tf.signatureVocabulary.slice(0, 4).map((v) => (
                              <span key={v} className="text-[10px] font-mono text-slate-500 bg-slate-100 rounded px-1">
                                #{v}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Submit & Credit Notice */}
              <div className="rounded-2xl border border-slate-200 bg-white p-6 card-shadow flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-700 font-mono font-bold text-xs">
                    {state.creditsRemaining}/{state.creditsTotal}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-slate-900">
                      Credits Available: {state.creditsRemaining} of {state.creditsTotal}
                    </div>
                    <div className="text-xs text-slate-500">
                      Running the complete 9-agent pipeline uses 1 credit · Unused trial scripts: 2
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={!topic.trim()}
                  className="btn-shadow inline-flex h-12 w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-[#E50914] px-8 text-base font-bold text-white transition hover:bg-[#B91C1C] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Zap className="h-4 w-4 fill-white" />
                  <span>Run 9-Agent Pipeline</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </form>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
