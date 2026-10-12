'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useCreatorStore } from '@/lib/store';
import { ProjectData, ScriptSection, StoryboardScene, ThumbnailVariant } from '@/lib/types';
import { SAMPLE_PROJECT } from '@/lib/mock-data';
import { generateThumbnailSvg } from '@/lib/thumbnail-generator';
import {
  FileText,
  Search,
  CheckCircle2,
  ShieldAlert,
  Film,
  Image as ImageIcon,
  TrendingUp,
  Share2,
  Download,
  Copy,
  Check,
  Play,
  Pause,
  Maximize2,
  Minimize2,
  Sliders,
  Sparkles,
  ArrowLeft,
  ExternalLink,
  ChevronRight,
  Flame,
  Wand2,
  Eye,
  Edit3,
  Tv,
  RotateCcw,
} from 'lucide-react';

function ProjectStudioContent() {
  const params = useParams();
  const router = useRouter();
  const projectId = (params?.id as string) || 'proj-india-pakistan-border';

  const { getProject, updateProject, state } = useCreatorStore();
  const [project, setProject] = useState<ProjectData>(() => {
    return getProject(projectId) || SAMPLE_PROJECT;
  });
  const [activeTab, setActiveTab] = useState<
    'script' | 'research' | 'factcheck' | 'storyboard' | 'thumbnails' | 'seo' | 'shorts'
  >('script');

  // Script tab mode: 'editor' | 'preview' | 'teleprompter'
  const [scriptMode, setScriptMode] = useState<'editor' | 'preview' | 'teleprompter'>('editor');
  const [editableScript, setEditableScript] = useState(() => {
    const initProj = getProject(projectId) || SAMPLE_PROJECT;
    return initProj.script.fullText;
  });
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Teleprompter Controls
  const [isPrompting, setIsPrompting] = useState(false);
  const [prompterSpeed, setPrompterSpeed] = useState(2);
  const [prompterFontSize, setPrompterFontSize] = useState(36);
  const [isMirrored, setIsMirrored] = useState(false);
  const prompterContainerRef = useRef<HTMLDivElement>(null);

  // Thumbnail visual previews map
  const [thumbnailPreviews, setThumbnailPreviews] = useState<Record<string, string>>({});
  const [selectedThumbVariant, setSelectedThumbVariant] = useState<'safe' | 'bold' | 'experimental'>('bold');

  useEffect(() => {
    const loaded = getProject(projectId);
    queueMicrotask(() => {
      if (loaded) {
        setProject(loaded);
        setEditableScript(loaded.script.fullText);
      } else {
        // Fallback to sample project if not found
        setProject(SAMPLE_PROJECT);
        setEditableScript(SAMPLE_PROJECT.script.fullText);
      }
    });
  }, [projectId, state.projects]);

  // Teleprompter smooth auto-scroll loop
  useEffect(() => {
    let animationId: number;
    if (isPrompting && scriptMode === 'teleprompter' && prompterContainerRef.current) {
      const scrollStep = () => {
        if (prompterContainerRef.current) {
          prompterContainerRef.current.scrollTop += prompterSpeed * 0.7;
        }
        animationId = requestAnimationFrame(scrollStep);
      };
      animationId = requestAnimationFrame(scrollStep);
    }
    return () => cancelAnimationFrame(animationId);
  }, [isPrompting, scriptMode, prompterSpeed]);

  // Helper for copy button feedback
  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  // Generate thumbnail SVG preview
  const handleGenerateThumbnail = (variant: ThumbnailVariant) => {
    const svgString = generateThumbnailSvg(variant, project.title);
    setThumbnailPreviews((prev) => ({ ...prev, [variant.id]: svgString }));
  };

  // Download export handlers
  const handleExportMarkdown = () => {
    const mdContent = `# ${project.title}
Niche: ${project.niche} | Duration: ${project.targetRuntimeMin} Min | Tone: ${project.toneFingerprintName}

## Spoken Script
${editableScript}

## Research Brief
${project.researchBrief.summary}

### Key Facts
${project.researchBrief.keyFacts.map((f) => `- ${f}`).join('\n')}

## YouTube SEO Package
Title: ${project.seo.titleVariants[0]?.title}
Description:
${project.seo.description}

Tags: ${project.seo.tags.join(', ')}
`;
    const blob = new Blob([mdContent], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${project.title.slice(0, 30).replace(/[^a-zA-Z0-9]/g, '_')}_package.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#F8FAFC]">
      <Navbar />

      {/* TOP STUDIO TOOLBAR */}
      <div className="border-b border-slate-200 bg-white sticky top-16 z-40 shadow-xs">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            {/* Back link and Project Title */}
            <div className="flex items-center gap-3 min-w-0">
              <Link
                href="/dashboard"
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 transition shrink-0"
                title="Back to Dashboard"
              >
                <ArrowLeft className="h-4 w-4" />
              </Link>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h1 className="text-base sm:text-lg font-black text-slate-900 truncate">
                    {project.title}
                  </h1>
                  <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-700 shrink-0">
                    ✓ 9 Agents Ready
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-x-2 text-xs text-slate-500 font-mono">
                  <span>{project.niche}</span>
                  <span>•</span>
                  <span>{project.targetRuntimeMin} Min Video</span>
                  <span>•</span>
                  <span className="capitalize">{project.language} Style</span>
                  <span>•</span>
                  <span>Tone: {project.toneFingerprintName}</span>
                </div>
              </div>
            </div>

            {/* Quick Action Export Dropdown */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => {
                  setScriptMode('teleprompter');
                  setActiveTab('script');
                }}
                className="inline-flex items-center gap-1.5 rounded-full border border-slate-300 bg-slate-50 px-3.5 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition"
              >
                <Tv className="h-3.5 w-3.5 text-[#E50914]" />
                <span className="hidden sm:inline">Teleprompter</span>
              </button>

              <button
                type="button"
                onClick={handleExportMarkdown}
                className="btn-shadow inline-flex items-center gap-1.5 rounded-full bg-[#E50914] px-4 py-1.5 text-xs font-bold text-white hover:bg-[#B91C1C] transition"
              >
                <Download className="h-3.5 w-3.5" />
                <span>Export Package (.md)</span>
              </button>
            </div>
          </div>

          {/* 7 AGENT WORKSPACE TABS */}
          <div className="mt-3 flex gap-1 overflow-x-auto border-t border-slate-100 pt-2 no-scrollbar">
            {([
              { id: 'script', label: 'Script Writer', icon: FileText, badge: `${project.script.wordCount}w` },
              { id: 'research', label: 'Research & Sources', icon: Search, badge: `${project.researchBrief.sources.length} Verified` },
              { id: 'factcheck', label: 'Fact-Check & Safety', icon: CheckCircle2, badge: `${project.factCheckList.length} Claims` },
              { id: 'storyboard', label: 'Storyboard Director', icon: Film, badge: `${project.storyboard.totalScenes} Scenes` },
              { id: 'thumbnails', label: 'Thumbnail Designer', icon: ImageIcon, badge: '3 Concepts' },
              { id: 'seo', label: 'SEO & AEO Metadata', icon: TrendingUp, badge: 'AEO 97%' },
              { id: 'shorts', label: 'Shorts & Distribution', icon: Share2, badge: `${project.shorts.clips.length} Clips` },
            ] as const).map((tab) => {
              const TabIcon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => {
                    setActiveTab(tab.id);
                    if (tab.id !== 'script' && scriptMode === 'teleprompter') {
                      setScriptMode('editor');
                    }
                  }}
                  className={`flex items-center gap-1.5 whitespace-nowrap rounded-lg px-3 py-1.5 text-xs font-bold transition ${
                    isActive
                      ? 'bg-[#E50914] text-white shadow-xs'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  <TabIcon className="h-3.5 w-3.5" />
                  <span>{tab.label}</span>
                  <span
                    className={`ml-1 rounded px-1.5 py-0.2 text-[10px] font-mono ${
                      isActive ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'
                    }`}
                  >
                    {tab.badge}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* MAIN WORKSPACE CONTENT */}
      <main className="flex-1 py-6 sm:py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* TAB 1: SCRIPT WRITER */}
          {activeTab === 'script' && (
            <div className="space-y-6">
              {/* Teleprompter Fullscreen Mode */}
              {scriptMode === 'teleprompter' ? (
                <div className="rounded-3xl border border-slate-800 bg-[#0C0C0F] text-white p-6 sm:p-10 shadow-2xl relative">
                  {/* Teleprompter Controller Bar */}
                  <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4 mb-6">
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => setIsPrompting(!isPrompting)}
                        className="inline-flex items-center gap-2 rounded-xl bg-[#E50914] px-4 py-2 text-sm font-bold text-white hover:bg-[#B91C1C] transition"
                      >
                        {isPrompting ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 fill-white" />}
                        <span>{isPrompting ? 'Pause Scroll' : 'Start Scroll'}</span>
                      </button>

                      <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
                        <span>Speed:</span>
                        <input
                          type="range"
                          min="1"
                          max="8"
                          value={prompterSpeed}
                          onChange={(e) => setPrompterSpeed(Number(e.target.value))}
                          className="h-1.5 w-24 accent-[#E50914] cursor-pointer"
                        />
                        <span className="w-4 font-bold">{prompterSpeed}x</span>
                      </div>

                      <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
                        <span>Size:</span>
                        <input
                          type="range"
                          min="24"
                          max="54"
                          value={prompterFontSize}
                          onChange={(e) => setPrompterFontSize(Number(e.target.value))}
                          className="h-1.5 w-24 accent-[#E50914] cursor-pointer"
                        />
                        <span className="w-6 font-bold">{prompterFontSize}px</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => setIsMirrored(!isMirrored)}
                        className={`rounded-lg border px-3 py-1.5 text-xs font-bold transition ${
                          isMirrored
                            ? 'border-emerald-500 bg-emerald-500/20 text-emerald-400'
                            : 'border-white/20 bg-white/5 text-slate-300 hover:bg-white/10'
                        }`}
                      >
                        Mirror Rig Mode (Flip)
                      </button>

                      <button
                        type="button"
                        onClick={() => setScriptMode('editor')}
                        className="rounded-lg border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-bold text-slate-300 hover:text-white"
                      >
                        Exit Teleprompter
                      </button>
                    </div>
                  </div>

                  {/* Scrollable Prompter Area */}
                  <div
                    ref={prompterContainerRef}
                    className={`h-[560px] overflow-y-auto px-4 sm:px-12 py-8 font-sans leading-relaxed tracking-wide ${
                      isMirrored ? 'teleprompter-mirrored' : ''
                    }`}
                    style={{ fontSize: `${prompterFontSize}px` }}
                  >
                    <div className="max-w-4xl mx-auto space-y-8 font-medium">
                      {editableScript.split('\n\n').map((paragraph, pIdx) => (
                        <p
                          key={pIdx}
                          className={
                            paragraph.startsWith('[')
                              ? 'text-red-400 font-mono text-sm tracking-wider uppercase'
                              : 'text-slate-100'
                          }
                        >
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                /* Regular Editor & Preview Mode */
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  {/* Left Column: Script Editor/Preview */}
                  <div className="lg:col-span-8 space-y-4">
                    <div className="rounded-2xl border border-slate-200 bg-white card-shadow overflow-hidden">
                      {/* Editor Sub-Header */}
                      <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-4 py-2.5">
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => setScriptMode('editor')}
                            className={`rounded-md px-3 py-1 text-xs font-bold transition ${
                              scriptMode === 'editor'
                                ? 'bg-white shadow-xs text-slate-900 border border-slate-200'
                                : 'text-slate-600 hover:text-slate-900'
                            }`}
                          >
                            <Edit3 className="h-3 w-3 inline mr-1" />
                            Editor Mode
                          </button>
                          <button
                            type="button"
                            onClick={() => setScriptMode('preview')}
                            className={`rounded-md px-3 py-1 text-xs font-bold transition ${
                              scriptMode === 'preview'
                                ? 'bg-white shadow-xs text-slate-900 border border-slate-200'
                                : 'text-slate-600 hover:text-slate-900'
                            }`}
                          >
                            <Eye className="h-3 w-3 inline mr-1" />
                            Formatted Cues
                          </button>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => handleCopy(editableScript, 'script')}
                            className="inline-flex items-center gap-1 rounded border border-slate-200 bg-white px-2 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-100"
                          >
                            {copiedKey === 'script' ? (
                              <Check className="h-3.5 w-3.5 text-emerald-600" />
                            ) : (
                              <Copy className="h-3.5 w-3.5" />
                            )}
                            <span>{copiedKey === 'script' ? 'Copied' : 'Copy All'}</span>
                          </button>
                        </div>
                      </div>

                      {/* Content Area */}
                      {scriptMode === 'editor' ? (
                        <div className="p-4 sm:p-6">
                          <textarea
                            rows={24}
                            value={editableScript}
                            onChange={(e) => setEditableScript(e.target.value)}
                            className="w-full font-mono text-sm leading-relaxed text-slate-900 border-0 focus:ring-0 focus:outline-none resize-y"
                          />
                        </div>
                      ) : (
                        /* Formatted Preview with Rich Cues */
                        <div className="p-4 sm:p-6 space-y-4">
                          {project.script.sections.map((sec) => (
                            <div
                              key={sec.id}
                              className="rounded-xl border border-slate-200 bg-slate-50/50 p-4 space-y-1.5 transition hover:bg-white"
                            >
                              <div className="flex items-center justify-between text-xs">
                                <span className="font-mono font-bold text-[#E50914] bg-red-50 border border-red-200 px-2 py-0.5 rounded">
                                  {sec.productionCue || `[${sec.type}]`}
                                </span>
                                <span className="font-mono text-slate-400 font-bold">
                                  {sec.timestamp} ({sec.durationSec}s)
                                </span>
                              </div>
                              <p className="text-sm font-sans text-slate-800 leading-relaxed pt-1">
                                {sec.content}
                              </p>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Script Footer Stats Bar */}
                      <div className="flex flex-wrap items-center justify-between border-t border-slate-200 bg-slate-50 px-4 py-2.5 text-xs text-slate-500 font-mono">
                        <div className="flex items-center gap-4">
                          <span>{editableScript.split(/\s+/).filter(Boolean).length} Words</span>
                          <span>Est. Read Time: ~{project.targetRuntimeMin} Mins</span>
                          <span>Language: {project.language.toUpperCase()}</span>
                        </div>
                        <span className="text-emerald-700 font-bold">Tone Match Verified (96%)</span>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Voice Cloning Block & Metrics */}
                  <div className="lg:col-span-4 space-y-6">
                    {/* Voice Cloning Box */}
                    <div className="rounded-2xl border border-slate-800 bg-[#0C0C0F] p-5 text-white shadow-xl space-y-4">
                      <div className="flex items-center justify-between border-b border-white/10 pb-3">
                        <span className="font-mono text-xs font-bold uppercase tracking-wider text-red-400">
                          Voice Cloning Block
                        </span>
                        <span className="text-[10px] font-mono text-slate-400">v2 active</span>
                      </div>

                      <div className="space-y-3">
                        <div>
                          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                            Signature Vocabulary Injected
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {(
                              state.activeFingerprints.find((t) => t.id === project.toneFingerprintId)?.signatureVocabulary ||
                              (project.language === 'english'
                                ? ['ground reality', 'catalyst', 'structural shift', 'first principles', 'unintended consequences']
                                : ['mudda', 'case study', 'ground reality', 'framework', 'layer by layer'])
                            ).map((w) => (
                              <span key={w} className="rounded border border-white/10 bg-white/5 px-2 py-0.5 font-mono text-xs text-slate-200">
                                {w}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div>
                          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                            Transitions Captured
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {(
                              state.activeFingerprints.find((t) => t.id === project.toneFingerprintId)?.signatureTransitions ||
                              (project.language === 'english'
                                ? ['to understand how we got here, look at this map', 'here is the twist nobody discussed']
                                : ['ab maan lijiye', 'lekin twist yahan hai', 'asal ground reality'])
                            ).map((t) => (
                              <span key={t} className="rounded border border-white/10 bg-white/5 px-2 py-0.5 font-mono text-xs text-slate-300">
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div>
                          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                            Banned Generic AI Words
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {(
                              state.activeFingerprints.find((t) => t.id === project.toneFingerprintId)?.bannedWords ||
                              (project.language === 'english'
                                ? ['smash that like button', 'mind-blown', 'insane hack']
                                : ['guys', 'amazing', 'unlock your potential'])
                            ).map((b) => (
                              <span key={b} className="rounded border border-red-500/20 bg-red-500/10 px-2 py-0.5 font-mono text-xs text-red-400 line-through">
                                {b}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="pt-2 border-t border-white/10 text-[11px] text-slate-400 leading-relaxed font-sans">
                        Applied 7 customized voice rules to script synthesis engine.
                      </div>
                    </div>

                    {/* Tone Analysis Score Card */}
                    <div className="rounded-2xl border border-slate-200 bg-white p-5 card-shadow space-y-4">
                      <h4 className="font-bold text-sm text-slate-900 uppercase tracking-wider">
                        Tone Quality Audit
                      </h4>

                      <div className="space-y-3">
                        {[
                          { label: 'Voice Fingerprint Match', val: 96 },
                          { label: 'Vocabulary Alignment', val: 94 },
                          { label: 'Rhythm & Sentence Cadence', val: 93 },
                          { label: 'Hook Impact Score', val: 97 },
                        ].map((m) => (
                          <div key={m.label} className="space-y-1">
                            <div className="flex justify-between text-xs">
                              <span className="text-slate-600 font-medium">{m.label}</span>
                              <span className="font-mono font-bold text-slate-900">{m.val}%</span>
                            </div>
                            <div className="h-1.5 w-full rounded-full bg-slate-100 overflow-hidden">
                              <div className="h-full bg-[#E50914] rounded-full" style={{ width: `${m.val}%` }}></div>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="rounded-xl border border-emerald-200 bg-emerald-50/70 p-3 space-y-1.5 text-xs text-emerald-800">
                        <div className="font-bold flex items-center gap-1.5">
                          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                          Retention Safeguards Passed
                        </div>
                        <p className="text-[11px] leading-relaxed">
                          3-second hook verified; zero robotic introductory padding.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: RESEARCH & SOURCES */}
          {activeTab === 'research' && (
            <div className="space-y-6">
              <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 card-shadow space-y-6">
                <div>
                  <div className="inline-flex items-center gap-2 rounded bg-red-50 text-[#E50914] px-2.5 py-0.5 text-xs font-bold uppercase mb-2">
                    Multi-Source Script Brief
                  </div>
                  <h3 className="text-2xl font-black text-slate-900">Research & Context Synthesizer</h3>
                  <p className="mt-2 text-sm text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-200">
                    {project.researchBrief.summary}
                  </p>
                </div>

                {/* Key Facts */}
                <div>
                  <h4 className="text-base font-bold text-slate-900 mb-3">Key Verifiable Facts</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {project.researchBrief.keyFacts.map((fact, idx) => (
                      <div
                        key={idx}
                        className="rounded-xl border border-slate-200 bg-white p-3.5 text-xs sm:text-sm text-slate-800 leading-relaxed flex items-start gap-2.5 card-shadow"
                      >
                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-100 text-[11px] font-bold text-[#E50914]">
                          {idx + 1}
                        </span>
                        <span>{fact}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Verified Sources */}
                <div>
                  <h4 className="text-base font-bold text-slate-900 mb-3">Verified Sources & Citations</h4>
                  <div className="space-y-2.5">
                    {project.researchBrief.sources.map((src, sIdx) => (
                      <div
                        key={sIdx}
                        className="rounded-xl border border-slate-200 bg-slate-50/50 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-white transition"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-sm text-slate-900">{src.name}</span>
                            <span className="rounded bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-800">
                              ✓ {src.credibility}
                            </span>
                          </div>
                          <p className="text-xs text-slate-600">{src.keyFinding}</p>
                        </div>
                        <a
                          href={src.url}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 text-xs font-bold text-[#E50914] hover:underline shrink-0"
                        >
                          <span>{src.domain}</span>
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: FACT-CHECK & SAFETY */}
          {activeTab === 'factcheck' && (
            <div className="space-y-6">
              <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 card-shadow space-y-6">
                <div>
                  <div className="inline-flex items-center gap-2 rounded bg-emerald-50 text-emerald-800 px-2.5 py-0.5 text-xs font-bold uppercase mb-2">
                    Claims Audit & Verification
                  </div>
                  <h3 className="text-2xl font-black text-slate-900">Per-Claim Fact Check Report</h3>
                  <p className="text-sm text-slate-600">
                    Claims made in the script have been cross-referenced against primary datasets and official records.
                  </p>
                </div>

                {/* Claim Cards */}
                <div className="space-y-3">
                  {project.factCheckList.map((item) => (
                    <div
                      key={item.id}
                      className={`rounded-xl border p-4 space-y-2 transition ${
                        item.status === 'verified'
                          ? 'border-emerald-200 bg-emerald-50/30'
                          : item.status === 'flagged'
                          ? 'border-red-200 bg-red-50/30'
                          : 'border-amber-200 bg-amber-50/30'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span
                          className={`rounded px-2.5 py-0.5 text-xs font-bold uppercase ${
                            item.status === 'verified'
                              ? 'bg-emerald-100 text-emerald-800'
                              : item.status === 'flagged'
                              ? 'bg-red-100 text-red-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {item.status.toUpperCase()}
                        </span>
                        <span className="font-mono text-xs font-bold text-slate-500">
                          Confidence: {item.confidenceScore}%
                        </span>
                      </div>
                      <p className="text-sm font-bold text-slate-900">&quot;{item.claim}&quot;</p>
                      <p className="text-xs text-slate-700 leading-relaxed">{item.explanation}</p>
                      <div className="text-[11px] font-mono text-slate-500 pt-1">
                        Corroborated by: {item.source}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Legal & Policy Compliance */}
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-5 space-y-3">
                  <h4 className="text-base font-bold text-slate-900">Legal & Fair Use Review</h4>
                  <ul className="space-y-2 text-xs text-slate-700">
                    {project.legalReview.notes.map((note, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{note}</span>
                      </li>
                    ))}
                  </ul>

                  {project.legalReview.sebiCompliance.disclaimerNeeded && (
                    <div className="rounded-lg border border-amber-200 bg-amber-50 p-3 text-xs text-amber-900 mt-3 font-mono">
                      <strong>SEBI Safety Notice Required:</strong>{' '}
                      {project.legalReview.sebiCompliance.disclaimerText}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: STORYBOARD DIRECTOR */}
          {activeTab === 'storyboard' && (
            <div className="space-y-6">
              <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 card-shadow space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                  <div>
                    <h3 className="text-2xl font-black text-slate-900">Visual Storyboard & Shot List</h3>
                    <p className="text-xs sm:text-sm text-slate-600">
                      12-16 scenes customized for your {project.targetRuntimeMin}-minute runtime with Midjourney / DALL-E prompts.
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="rounded bg-red-50 border border-red-200 px-3 py-1 text-xs font-bold text-[#E50914]">
                      {project.storyboard.totalScenes} Production Beats
                    </span>
                  </div>
                </div>

                {/* Scene Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {project.storyboard.scenes.map((scene) => (
                    <div
                      key={scene.sceneNumber}
                      className="rounded-2xl border border-slate-200 bg-white p-5 card-shadow space-y-3 hover:border-slate-300 transition"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="rounded bg-slate-900 text-white font-mono text-xs px-2 py-0.5 font-bold">
                            #{scene.sceneNumber}
                          </span>
                          <span className="font-mono text-xs text-slate-500 font-bold">
                            {scene.timestamp}
                          </span>
                        </div>
                        <span className="rounded bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-700">
                          {scene.framing}
                        </span>
                      </div>

                      <p className="text-xs font-bold text-slate-900 italic">
                        &quot;{scene.spokenTextSnippet}&quot;
                      </p>

                      <div className="space-y-1.5 text-xs">
                        <div>
                          <span className="font-bold text-slate-700">Visual Direction: </span>
                          <span className="text-slate-600">{scene.visualDirection}</span>
                        </div>

                        <div className="rounded-lg bg-blue-50/60 border border-blue-200 p-2.5 space-y-1 font-mono text-[11px] text-blue-950">
                          <div className="flex items-center justify-between text-[10px] text-blue-700 font-bold uppercase tracking-wider">
                            <span>AI Image Prompt</span>
                            <button
                              type="button"
                              onClick={() => handleCopy(scene.aiImagePrompt, `prompt-${scene.sceneNumber}`)}
                              className="text-blue-700 hover:underline"
                            >
                              {copiedKey === `prompt-${scene.sceneNumber}` ? 'Copied ✓' : 'Copy'}
                            </button>
                          </div>
                          <p>{scene.aiImagePrompt}</p>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100 text-[11px] text-slate-500">
                        <span>🎵 {scene.audioCue}</span>
                        <span>Transition: {scene.transition}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: THUMBNAIL DESIGNER */}
          {activeTab === 'thumbnails' && (
            <div className="space-y-6">
              <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 card-shadow space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                  <div>
                    <h3 className="text-2xl font-black text-slate-900">Thumbnail Designer & CTR Predictor</h3>
                    <p className="text-xs sm:text-sm text-slate-600">
                      3 distinct thumbnail formulas with exact Midjourney prompts and direct in-app visual rendering.
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="rounded bg-emerald-50 border border-emerald-200 px-3 py-1 text-xs font-bold text-emerald-800">
                      Projected CTR: {project.thumbnails.overallCtr}%
                    </span>
                  </div>
                </div>

                {/* 3 Variants Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {project.thumbnails.variants.map((thumb) => {
                    const isSelected = selectedThumbVariant === thumb.id;
                    const renderedSvg = thumbnailPreviews[thumb.id];
                    return (
                      <div
                        key={thumb.id}
                        className={`rounded-2xl border p-5 transition flex flex-col justify-between ${
                          isSelected ? 'border-[#E50914] bg-red-50/20 shadow-md' : 'border-slate-200 bg-white'
                        }`}
                      >
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="font-extrabold text-sm text-slate-900 uppercase tracking-wider">
                              {thumb.name} Concept
                            </span>
                            <span className="font-mono text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                              CTR: {thumb.predictedCtr}%
                            </span>
                          </div>

                          {/* Visual Preview Box */}
                          <div className="aspect-video w-full rounded-xl bg-slate-900 overflow-hidden relative border border-slate-800 flex items-center justify-center">
                            {renderedSvg ? (
                              <div
                                className="w-full h-full"
                                dangerouslySetInnerHTML={{ __html: renderedSvg }}
                              />
                            ) : (
                              <div className="text-center p-4 space-y-2">
                                <p className="text-xs text-white font-black tracking-wider uppercase">
                                  &quot;{thumb.textOverlay}&quot;
                                </p>
                                <button
                                  type="button"
                                  onClick={() => handleGenerateThumbnail(thumb)}
                                  className="rounded-lg bg-[#E50914] px-3 py-1.5 text-xs font-bold text-white hover:bg-[#B91C1C] transition inline-flex items-center gap-1.5"
                                >
                                  <Sparkles className="h-3 w-3" />
                                  <span>Render Visual</span>
                                </button>
                              </div>
                            )}
                          </div>

                          <div className="space-y-2 text-xs">
                            <div>
                              <span className="font-bold text-slate-700">Text Overlay: </span>
                              <span className="font-black text-[#E50914]">{thumb.textOverlay}</span>
                            </div>

                            <div>
                              <span className="font-bold text-slate-700">Composition: </span>
                              <span className="text-slate-600">{thumb.visualComposition}</span>
                            </div>

                            <div className="flex items-center gap-2 pt-1">
                              <span className="font-bold text-slate-700">Palette: </span>
                              <div className="flex gap-1.5">
                                {thumb.colorPalette.map((col) => (
                                  <span
                                    key={col}
                                    className="h-4 w-4 rounded-sm border border-slate-300"
                                    style={{ backgroundColor: col }}
                                    title={col}
                                  ></span>
                                ))}
                              </div>
                            </div>
                          </div>

                          {/* Midjourney prompt snippet */}
                          <div className="rounded-lg bg-slate-100 p-2.5 font-mono text-[11px] text-slate-700 space-y-1">
                            <div className="flex items-center justify-between text-[10px] text-slate-400 font-bold uppercase">
                              <span>Midjourney v6 Prompt</span>
                              <button
                                type="button"
                                onClick={() => handleCopy(thumb.midjourneyPrompt, `thumb-${thumb.id}`)}
                                className="text-[#E50914] hover:underline"
                              >
                                {copiedKey === `thumb-${thumb.id}` ? 'Copied' : 'Copy'}
                              </button>
                            </div>
                            <p className="line-clamp-3">{thumb.midjourneyPrompt}</p>
                          </div>
                        </div>

                        <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                          <button
                            type="button"
                            onClick={() => handleGenerateThumbnail(thumb)}
                            className="text-xs font-bold text-[#E50914] hover:underline inline-flex items-center gap-1"
                          >
                            <Sparkles className="h-3 w-3" />
                            <span>{renderedSvg ? 'Re-render' : 'Generate Visual'}</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => setSelectedThumbVariant(thumb.id)}
                            className={`rounded px-2.5 py-1 text-xs font-bold transition ${
                              isSelected ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                            }`}
                          >
                            {isSelected ? 'Selected' : 'Select'}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: SEO & AEO METADATA */}
          {activeTab === 'seo' && (
            <div className="space-y-6">
              <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 card-shadow space-y-6">
                <div>
                  <div className="inline-flex items-center gap-2 rounded bg-purple-50 text-purple-800 px-2.5 py-0.5 text-xs font-bold uppercase mb-2">
                    Answer Engine & Search Optimization
                  </div>
                  <h3 className="text-2xl font-black text-slate-900">SEO, Titles & Chapters Package</h3>
                  <p className="text-sm text-slate-600">
                    High-CTR title variations, 800+ word structured description, YouTube player chapter markers, and tagged chips.
                  </p>
                </div>

                {/* 3 Title Options */}
                <div>
                  <h4 className="text-sm font-bold uppercase tracking-wider text-slate-700 mb-3">
                    High-CTR Title Options
                  </h4>
                  <div className="space-y-2.5">
                    {project.seo.titleVariants.map((item, idx) => (
                      <div
                        key={idx}
                        className="rounded-xl border border-slate-200 bg-slate-50/50 p-4 flex items-center justify-between gap-3 hover:bg-white transition"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-xs font-bold text-slate-400">Option {idx + 1}</span>
                            <span className="rounded bg-purple-100 px-2 py-0.2 text-[10px] font-bold text-purple-800">
                              {item.hookCategory}
                            </span>
                          </div>
                          <p className="text-sm sm:text-base font-bold text-slate-900">{item.title}</p>
                        </div>
                        <div className="flex items-center gap-3 shrink-0">
                          <span className="font-mono text-xs font-bold text-purple-700">
                            CTR: {item.score}%
                          </span>
                          <button
                            type="button"
                            onClick={() => handleCopy(item.title, `title-${idx}`)}
                            className="rounded border border-slate-200 bg-white px-2.5 py-1 text-xs font-bold text-slate-700 hover:bg-slate-100"
                          >
                            {copiedKey === `title-${idx}` ? 'Copied' : 'Copy'}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Description & Chapters */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  <div className="lg:col-span-8 space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-bold uppercase tracking-wider text-slate-700">
                        Full Description (800+ Words)
                      </h4>
                      <button
                        type="button"
                        onClick={() => handleCopy(project.seo.description, 'desc')}
                        className="text-xs font-bold text-[#E50914] hover:underline"
                      >
                        {copiedKey === 'desc' ? 'Copied ✓' : 'Copy Description'}
                      </button>
                    </div>
                    <textarea
                      rows={12}
                      readOnly
                      value={project.seo.description}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 p-4 font-mono text-xs text-slate-800 focus:outline-none"
                    />
                  </div>

                  <div className="lg:col-span-4 space-y-4">
                    <div>
                      <h4 className="text-sm font-bold uppercase tracking-wider text-slate-700 mb-2">
                        YouTube Chapters
                      </h4>
                      <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 space-y-1.5 font-mono text-xs text-slate-700">
                        {project.seo.chapters.map((chap, cIdx) => (
                          <div key={cIdx} className="flex items-center justify-between">
                            <span className="font-bold text-[#E50914]">{chap.timestamp}</span>
                            <span className="truncate ml-2">{chap.title}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-bold uppercase tracking-wider text-slate-700 mb-2">
                        Pinned Comment Draft
                      </h4>
                      <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs text-slate-700 space-y-2">
                        <p>{project.seo.pinnedComment}</p>
                        <button
                          type="button"
                          onClick={() => handleCopy(project.seo.pinnedComment, 'pinned')}
                          className="text-xs font-bold text-[#E50914] hover:underline"
                        >
                          {copiedKey === 'pinned' ? 'Copied ✓' : 'Copy Comment'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* SEO Tags Chips */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-bold uppercase tracking-wider text-slate-700">
                      Target SEO Tags ({project.seo.tags.length})
                    </h4>
                    <button
                      type="button"
                      onClick={() => handleCopy(project.seo.tags.join(', '), 'all-tags')}
                      className="text-xs font-bold text-[#E50914] hover:underline"
                    >
                      {copiedKey === 'all-tags' ? 'Copied ✓' : 'Copy All Tags'}
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {project.seo.tags.map((tag) => (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => handleCopy(tag, `tag-${tag}`)}
                        className="rounded-md border border-slate-200 bg-slate-50 px-2 py-1 font-mono text-xs text-slate-700 hover:border-red-300 hover:bg-red-50 hover:text-[#E50914] transition"
                        title="Click to copy tag"
                      >
                        #{tag}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 7: SHORTS & DISTRIBUTION */}
          {activeTab === 'shorts' && (
            <div className="space-y-6">
              <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 card-shadow space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                  <div>
                    <h3 className="text-2xl font-black text-slate-900">Shorts, Reels & Multi-Platform Distribution</h3>
                    <p className="text-xs sm:text-sm text-slate-600">
                      3 vertical short scripts with cold-open hooks, Instagram captions, WhatsApp status snippets, and community posts.
                    </p>
                  </div>
                  <span className="font-mono text-xs font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded">
                    Schedule: {project.shorts.postingSchedule}
                  </span>
                </div>

                {/* Shorts Clips Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {project.shorts.clips.map((clip) => (
                    <div
                      key={clip.id}
                      className="rounded-2xl border border-slate-200 bg-white p-5 card-shadow space-y-4 flex flex-col justify-between"
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="rounded bg-[#E50914] px-2 py-0.5 text-xs font-mono font-bold text-white">
                            Short #{clip.clipNumber}
                          </span>
                          <span className="font-mono text-xs text-slate-500">{clip.durationSec}s Runtime</span>
                        </div>

                        <h4 className="font-bold text-base text-slate-900">{clip.title}</h4>

                        {/* 3-Second Hook */}
                        <div className="rounded-lg bg-red-50 border border-red-200 p-2.5 space-y-1">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-[#E50914]">
                            3-Second Cold Hook
                          </span>
                          <p className="text-xs font-semibold text-slate-900">&quot;{clip.hook3Sec}&quot;</p>
                        </div>

                        {/* Spoken Script */}
                        <div className="space-y-1">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                            Short Spoken Script
                          </span>
                          <p className="text-xs text-slate-700 leading-relaxed font-sans bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                            {clip.script}
                          </p>
                        </div>

                        {/* Instagram Caption & WhatsApp */}
                        <div className="space-y-1">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                            IG Caption & Hashtags
                          </span>
                          <p className="text-[11px] text-slate-600 line-clamp-2">{clip.igCaption}</p>
                          <div className="flex flex-wrap gap-1 pt-1">
                            {clip.hashtags.map((h) => (
                              <span key={h} className="text-[10px] text-blue-600 font-mono">
                                {h}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                        <button
                          type="button"
                          onClick={() => handleCopy(`${clip.hook3Sec}\n\n${clip.script}`, `short-${clip.id}`)}
                          className="text-xs font-bold text-[#E50914] hover:underline"
                        >
                          {copiedKey === `short-${clip.id}` ? 'Copied ✓' : 'Copy Script'}
                        </button>
                        <button
                          type="button"
                          onClick={() => handleCopy(clip.whatsAppStatusDraft, `wa-${clip.id}`)}
                          className="text-xs text-slate-500 hover:text-slate-900"
                        >
                          Copy WhatsApp
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function ProjectStudioPage() {
  return (
    <React.Suspense
      fallback={
        <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center space-y-3">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-300 border-t-[#E50914]"></div>
          <p className="font-mono text-xs text-slate-500">Loading Creative Studio...</p>
        </div>
      }
    >
      <ProjectStudioContent />
    </React.Suspense>
  );
}
