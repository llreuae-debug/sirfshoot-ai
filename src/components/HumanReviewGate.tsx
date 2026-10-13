'use client';

import React, { useState } from 'react';
import { ProjectData } from '@/lib/types';
import { checkTitle } from '@/lib/tools/title';
import { score as scoreHook } from '@/lib/tools/hookscore';
import {
  ShieldCheck,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Upload,
  Play,
  Pause,
  Copy,
  Check,
  Film,
  ExternalLink,
  Sparkles,
  AlertCircle,
  FileText,
  Volume2,
  Clock,
  Tag,
  Download,
  Flame,
  Info,
} from 'lucide-react';

interface HumanReviewGateProps {
  project: ProjectData;
  onUpdateProject: (updated: ProjectData) => void;
}

export default function HumanReviewGate({ project, onUpdateProject }: HumanReviewGateProps) {
  const [reviewStatus, setReviewStatus] = useState<'pending' | 'approved' | 'rejected'>(
    (project.reviewStatus as 'pending' | 'approved' | 'rejected') || 'pending'
  );
  const [reviewNotes] = useState(project.reviewNotes || '');
  const [activeSectionId, setActiveSectionId] = useState<string | null>(
    project.script.sections?.[0]?.id || null
  );

  // Editable fields in review gate
  const [editableTitle, setEditableTitle] = useState(project.title);
  const [editableSections, setEditableSections] = useState(project.script.sections || []);
  // selectedThumbnailIndex reserved

  // Audio synthesis state
  const [isSynthesizing, setIsSynthesizing] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioError, setAudioError] = useState<string | null>(null);
  const audioRef = React.useRef<HTMLAudioElement | null>(null);

  // YouTube Upload Modal
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadPrivacy, setUploadPrivacy] = useState<'private' | 'unlisted' | 'public'>('private');
  const [uploadCategory, setUploadCategory] = useState('27');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadResult, setUploadResult] = useState<{
    success: boolean;
    videoId?: string;
    videoUrl?: string;
    studioUrl?: string;
    message?: string;
    isSimulated?: boolean;
  } | null>(null);

  // Revision Request Modal
  const [showRevisionModal, setShowRevisionModal] = useState(false);
  const [revisionFeedback, setRevisionFeedback] = useState('');
  const [revisionSubmitted, setRevisionSubmitted] = useState(false);

  // Copied tag state
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Title Quality & Hook Metrics
  const titleReport = checkTitle(editableTitle);
  const hookSection = editableSections.find((s) => s.type === 'HOOK') || editableSections[0];
  const hookReport = hookSection ? scoreHook(hookSection.content) : null;

  // Handle Section Content Change
  const handleSectionTextChange = (id: string, newText: string) => {
    const updated = editableSections.map((sec) =>
      sec.id === id ? { ...sec, content: newText } : sec
    );
    setEditableSections(updated);
  };

  // Synthesize voice for full script
  const handleSynthesizeReviewAudio = async () => {
    setIsSynthesizing(true);
    setAudioError(null);
    try {
      const fullText = editableSections.map((s) => s.content).join(' ');
      const res = await fetch('/api/voice/synthesize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: fullText.slice(0, 3000), // Safety limit for single pass
          voice: project.language === 'urdu' ? 'ur-PK-UzmaNeural' : 'en-US-AndrewMultilingualNeural',
        }),
      });

      const data = await res.json();
      if (res.ok && data.audioUrl) {
        setAudioUrl(data.audioUrl);
      } else {
        setAudioError(data.error || 'Speech synthesis failed. Please try again.');
      }
    } catch (err) {
      console.error(err);
      setAudioError('Failed to synthesize review audio.');
    } finally {
      setIsSynthesizing(false);
    }
  };

  const toggleAudioPlay = () => {
    if (!audioRef.current && audioUrl) {
      audioRef.current = new Audio(audioUrl);
      audioRef.current.onended = () => setIsPlayingAudio(false);
    }
    if (audioRef.current) {
      if (isPlayingAudio) {
        audioRef.current.pause();
        setIsPlayingAudio(false);
      } else {
        audioRef.current.play();
        setIsPlayingAudio(true);
      }
    }
  };

  // Human Gate: Approve
  const handleApprove = () => {
    setReviewStatus('approved');
    const updatedProject: ProjectData = {
      ...project,
      title: editableTitle,
      reviewStatus: 'approved',
      reviewedAt: new Date().toISOString(),
      script: {
        ...project.script,
        sections: editableSections,
        fullText: editableSections.map((s) => s.content).join('\n\n'),
      },
    };
    onUpdateProject(updatedProject);
    setShowUploadModal(true);
  };

  // Human Gate: Reject
  const handleReject = () => {
    setReviewStatus('rejected');
    const updatedProject: ProjectData = {
      ...project,
      reviewStatus: 'rejected',
      reviewNotes: reviewNotes || 'Rejected during human quality review.',
      reviewedAt: new Date().toISOString(),
    };
    onUpdateProject(updatedProject);
  };

  // Request AI Revision
  const handleSubmitRevision = () => {
    setRevisionSubmitted(true);
    const updatedProject: ProjectData = {
      ...project,
      reviewStatus: 'changes_requested',
      reviewNotes: revisionFeedback,
      reviewedAt: new Date().toISOString(),
    };
    onUpdateProject(updatedProject);
    setTimeout(() => {
      setShowRevisionModal(false);
      setRevisionSubmitted(false);
    }, 1800);
  };

  // Execute YouTube Upload
  const handleExecuteUpload = async () => {
    setIsUploading(true);
    setUploadResult(null);

    try {
      const tags = (project.seo?.tags || [project.topic, project.niche, 'Explainer', 'Shorts']).slice(0, 15);
      const res = await fetch('/api/youtube/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: editableTitle,
          description: project.seo?.description || project.researchBrief.summary,
          tags,
          privacyStatus: uploadPrivacy,
          categoryId: uploadCategory,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setUploadResult(data);
        const updatedProject: ProjectData = {
          ...project,
          youtubeUpload: {
            status: data.isSimulated ? 'simulated' : 'published',
            videoId: data.videoId,
            videoUrl: data.videoUrl,
            uploadedAt: new Date().toISOString(),
            privacy: uploadPrivacy,
          },
        };
        onUpdateProject(updatedProject);
      } else {
        setUploadResult({
          success: false,
          message: data.error || 'Failed to complete YouTube upload.',
        });
      }
    } catch (err) {
      console.error(err);
      setUploadResult({
        success: false,
        message: 'Network error connecting to YouTube upload gateway.',
      });
    } finally {
      setIsUploading(false);
    }
  };

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  // Export full creator kit
  const handleDownloadCreatorKit = () => {
    const lines = [
      `# ${editableTitle}`,
      `Topic: ${project.topic}`,
      `Niche: ${project.niche}`,
      `Language: ${project.language}`,
      `Status: Human Reviewed & Approved (${new Date().toLocaleDateString()})`,
      '',
      '## DESCRIPTION',
      project.seo?.description || project.researchBrief.summary,
      '',
      '## TAGS',
      (project.seo?.tags || []).map((t: string) => `#${t}`).join(' '),
      '',
      '## SCRIPT BREAKDOWN',
      ...editableSections.map(
        (sec, idx) => `\n### Section ${idx + 1}: ${sec.type}\n${sec.content}\n`
      ),
    ];
    const blob = new Blob([lines.join('\n')], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${editableTitle.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_review_package.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* 1. REVIEW GATE HERO BANNER */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 card-shadow space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div
              className={`flex h-12 w-12 items-center justify-center rounded-2xl ${
                reviewStatus === 'approved'
                  ? 'bg-emerald-100 text-emerald-700'
                  : reviewStatus === 'rejected'
                  ? 'bg-rose-100 text-rose-700'
                  : 'bg-amber-100 text-amber-700'
              }`}
            >
              <ShieldCheck className="h-6 w-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-black text-slate-900">Autonomous Human Review Gate</h2>
                <span
                  className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-bold ${
                    reviewStatus === 'approved'
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : reviewStatus === 'rejected'
                      ? 'bg-rose-50 text-rose-700 border border-rose-200'
                      : 'bg-amber-50 text-amber-700 border border-amber-200'
                  }`}
                >
                  {reviewStatus === 'approved' && <CheckCircle2 className="h-3 w-3" />}
                  {reviewStatus === 'rejected' && <XCircle className="h-3 w-3" />}
                  {reviewStatus === 'pending' && <Clock className="h-3 w-3" />}
                  {reviewStatus === 'approved'
                    ? 'Approved for Publication'
                    : reviewStatus === 'rejected'
                    ? 'Rejected by Reviewer'
                    : 'Awaiting Human Decision'}
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Inspect script sections, listen to neural speech, verify Hook & Title score, and approve before publishing to YouTube.
              </p>
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex items-center gap-2 flex-wrap">
            <button
              type="button"
              onClick={handleDownloadCreatorKit}
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 transition"
            >
              <Download className="h-3.5 w-3.5" />
              <span>Export Package</span>
            </button>
            <button
              type="button"
              onClick={() => setShowRevisionModal(true)}
              className="inline-flex items-center gap-1.5 rounded-xl border border-amber-300 bg-amber-50 px-3 py-2 text-xs font-bold text-amber-800 hover:bg-amber-100 transition"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Request Revision</span>
            </button>
            <button
              type="button"
              onClick={handleReject}
              className="inline-flex items-center gap-1.5 rounded-xl border border-rose-300 bg-rose-50 px-3.5 py-2 text-xs font-bold text-rose-700 hover:bg-rose-100 transition"
            >
              <XCircle className="h-3.5 w-3.5" />
              <span>Reject</span>
            </button>
            <button
              type="button"
              onClick={handleApprove}
              className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 px-4 py-2 text-xs font-bold text-white hover:bg-emerald-700 transition shadow-sm"
            >
              <CheckCircle2 className="h-3.5 w-3.5" />
              <span>Approve & Upload</span>
            </button>
          </div>
        </div>

        {/* Audit timestamp or YouTube status if uploaded */}
        {project.youtubeUpload && (
          <div className="mt-2 rounded-xl bg-slate-50 border border-slate-200 p-3 text-xs flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Upload className="h-4 w-4 text-emerald-600" />
              <span className="font-medium text-slate-700">
                YouTube Status:{' '}
                <strong className="text-slate-900 capitalize">
                  {project.youtubeUpload.status}
                </strong>{' '}
                ({project.youtubeUpload.privacy} mode)
              </span>
            </div>
            {project.youtubeUpload.videoUrl && (
              <a
                href={project.youtubeUpload.videoUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 font-bold text-[#E50914] hover:underline"
              >
                <span>View on YouTube</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            )}
          </div>
        )}
      </div>

      {/* 2. SPLIT LAYOUT: LEFT (MEDIA & SCRIPT) / RIGHT (METRICS & ALGORITHMIC REVIEW) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT COLUMN: 7 COLS (SCRIPT SECTIONS & AUDIO REVIEW) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Audio Review Bar */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 card-shadow space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Volume2 className="h-4 w-4 text-[#E50914]" />
                <h3 className="text-sm font-bold text-slate-900">Neural Speech Verification</h3>
              </div>
              <span className="text-[11px] font-mono font-medium text-slate-500">
                Voice: {project.language === 'urdu' ? 'ur-PK-UzmaNeural' : 'en-US-AndrewMultilingualNeural'}
              </span>
            </div>

            <p className="text-xs text-slate-500">
              Listen to the neural voiceover generated for this script to verify inflection, timing, and pacing before release.
            </p>

            <div className="flex items-center gap-3 pt-1">
              {!audioUrl ? (
                <button
                  type="button"
                  onClick={handleSynthesizeReviewAudio}
                  disabled={isSynthesizing}
                  className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2 text-xs font-bold text-white hover:bg-slate-800 disabled:opacity-50 transition"
                >
                  <Sparkles className="h-3.5 w-3.5 text-amber-400" />
                  <span>{isSynthesizing ? 'Synthesizing Audio via Edge-TTS...' : 'Generate Review Audio'}</span>
                </button>
              ) : (
                <div className="flex items-center gap-3 w-full">
                  <button
                    type="button"
                    onClick={toggleAudioPlay}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E50914] text-white hover:bg-[#B91C1C] transition shadow-sm"
                  >
                    {isPlayingAudio ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 ml-0.5" />}
                  </button>
                  <div className="flex-1 bg-slate-100 rounded-lg p-2.5 flex items-center justify-between">
                    <span className="text-xs font-medium text-slate-700">
                      {isPlayingAudio ? 'Playing neural voiceover...' : 'Review audio ready'}
                    </span>
                    <a
                      href={audioUrl}
                      download="review_narration.mp3"
                      className="text-xs font-bold text-[#E50914] hover:underline"
                    >
                      Download .mp3
                    </a>
                  </div>
                </div>
              )}
            </div>
            {audioError && (
              <p className="text-xs text-rose-600 font-medium">{audioError}</p>
            )}
          </div>

          {/* Script Sections Review List */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 card-shadow space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-[#E50914]" />
                <h3 className="text-sm font-bold text-slate-900">
                  Script Sections ({editableSections.length})
                </h3>
              </div>
              <span className="text-xs font-mono text-slate-500">
                Total Words: {editableSections.reduce((acc, s) => acc + s.content.split(/\s+/).length, 0)}
              </span>
            </div>

            <div className="space-y-3">
              {editableSections.map((sec, idx) => {
                const isSelected = activeSectionId === sec.id;
                const words = sec.content.split(/\s+/).filter(Boolean).length;
                const seconds = Math.round((words / 140) * 60);

                return (
                  <div
                    key={sec.id || idx}
                    className={`rounded-xl border transition p-4 ${
                      isSelected
                        ? 'border-[#E50914] bg-red-50/20'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div
                      className="flex items-center justify-between cursor-pointer mb-2"
                      onClick={() => setActiveSectionId(isSelected ? null : sec.id)}
                    >
                      <div className="flex items-center gap-2">
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-slate-900 text-[10px] font-bold text-white">
                          {idx + 1}
                        </span>
                        <span className="text-xs font-bold text-slate-800">
                          {sec.speakerLabel || `Section ${idx + 1}`}
                        </span>
                        <span className="rounded bg-slate-100 px-2 py-0.5 text-[10px] font-mono font-medium text-slate-600 uppercase">
                          {sec.type}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-slate-500 font-mono">
                        <span>{words}w</span>
                        <span>•</span>
                        <span>~{seconds}s</span>
                      </div>
                    </div>

                    {/* Editable Section Content */}
                    <textarea
                      value={sec.content}
                      onChange={(e) => handleSectionTextChange(sec.id, e.target.value)}
                      rows={isSelected ? 4 : 2}
                      className="w-full rounded-lg border border-slate-200 p-2.5 text-xs text-slate-800 focus:border-[#E50914] focus:outline-none transition leading-relaxed resize-y font-sans"
                    />

                    {sec.productionCue && (
                      <div className="mt-2 flex items-center gap-1.5 text-[11px] text-slate-500 font-mono">
                        <Film className="h-3 w-3 text-slate-400" />
                        <span>Cue: {sec.productionCue}</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: 5 COLS (ALGORITHMIC REVIEW & METRICS) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Editable Video Title & Score */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 card-shadow space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Video Title
              </label>
              <span
                className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                  titleReport.score >= 80
                    ? 'bg-emerald-100 text-emerald-800'
                    : titleReport.score >= 60
                    ? 'bg-amber-100 text-amber-800'
                    : 'bg-rose-100 text-rose-800'
                }`}
              >
                Title Score: {titleReport.score}/100 
              </span>
            </div>

            <textarea
              value={editableTitle}
              onChange={(e) => setEditableTitle(e.target.value)}
              rows={2}
              className="w-full rounded-xl border border-slate-300 p-2.5 text-xs font-bold text-slate-900 focus:border-[#E50914] focus:outline-none"
            />

            <div className="flex items-center justify-between text-[11px] text-slate-500">
              <span>{titleReport.chars} / 100 characters (optimal: 40–60)</span>
              <span className="font-mono text-emerald-600 font-semibold truncate max-w-[220px]">
                {titleReport.issues.length > 0 ? titleReport.issues[0][1] : '✓ High CTR title'}
              </span>
            </div>
          </div>

          {/* "Why Now?" Algorithmic Urgency Box (matching reference repo) */}
          <div className="rounded-2xl border border-amber-300 bg-gradient-to-br from-amber-50 to-orange-50/30 p-5 card-shadow space-y-2">
            <div className="flex items-center gap-2 text-amber-900">
              <Flame className="h-4 w-4 text-amber-600" />
              <h4 className="text-xs font-bold uppercase tracking-wider">
                Why Now? (Algorithmic Timing)
              </h4>
            </div>
            <p className="text-xs text-amber-900 leading-relaxed font-medium">
              {project.researchBrief.summary.slice(0, 220)}...
            </p>
            <div className="pt-1 text-[11px] text-amber-800 flex items-center gap-2">
              <span className="font-bold">Primary Signal:</span>
              <span className="bg-amber-200/60 px-2 py-0.5 rounded text-[10px] font-mono">
                {project.topics?.[project.selectedTopicIndex]?.sourceSignal || 'Google Trends & YouTube'}
              </span>
            </div>
          </div>

          {/* 3-Second Hook Audit */}
          {hookReport && (
            <div className="rounded-2xl border border-slate-200 bg-white p-5 card-shadow space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-[#E50914]" />
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                    Hook Evaluation (0–3s)
                  </h4>
                </div>
                <span className="text-xs font-bold text-indigo-700 bg-indigo-50 border border-indigo-200 px-2 py-0.5 rounded-full">
                  Score: {hookReport.verdict}/100 ({hookReport.band})
                </span>
              </div>
              <p className="text-xs text-slate-600 italic bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                &ldquo;{hookSection.content.slice(0, 160)}...&rdquo;
              </p>
              <div className="flex flex-wrap gap-1 text-[11px]">
                <span className="rounded bg-emerald-50 text-emerald-700 px-2 py-0.5 font-medium border border-emerald-200">
                  Formula: {hookReport.formula}
                </span>
                {hookReport.weakest?.fix && (
                  <span className="rounded bg-amber-50 text-amber-700 px-2 py-0.5 font-medium border border-amber-200">
                    Tip: {hookReport.weakest.fix}
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Tags Cloud */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 card-shadow space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Tag className="h-4 w-4 text-[#E50914]" />
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Target Tags ({project.seo?.tags?.length || 0})
                </h4>
              </div>
              <button
                type="button"
                onClick={() =>
                  copyToClipboard(
                    (project.seo?.tags || []).map((t: string) => `#${t}`).join(' '),
                    'all_tags'
                  )
                }
                className="text-[11px] font-bold text-[#E50914] hover:underline flex items-center gap-1"
              >
                {copiedKey === 'all_tags' ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                <span>{copiedKey === 'all_tags' ? 'Copied' : 'Copy All'}</span>
              </button>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {(project.seo?.tags || [project.topic, project.niche]).map((tag: string, i: number) => (
                <span
                  key={i}
                  className="rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-[11px] font-mono text-slate-700 hover:bg-slate-100 cursor-pointer"
                  onClick={() => copyToClipboard(`#${tag}`, `tag_${i}`)}
                  title="Click to copy"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 3. YOUTUBE UPLOAD DIALOG MODAL */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-xl rounded-2xl bg-white p-6 shadow-2xl space-y-5 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-red-100 text-[#E50914]">
                  <Upload className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">Publish Video to YouTube</h3>
                  <p className="text-xs text-slate-500">
                    Human review approved. Configure release metadata & privacy status.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowUploadModal(false)}
                className="text-slate-400 hover:text-slate-600 text-lg font-bold"
              >
                ✕
              </button>
            </div>

            {!uploadResult ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Video Title (YouTube 100 character limit)
                  </label>
                  <input
                    type="text"
                    value={editableTitle}
                    onChange={(e) => setEditableTitle(e.target.value)}
                    maxLength={100}
                    className="w-full rounded-xl border border-slate-300 p-2.5 text-xs text-slate-900 focus:border-[#E50914] focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Privacy Visibility
                    </label>
                    <select
                      value={uploadPrivacy}
                      onChange={(e) => setUploadPrivacy(e.target.value as 'private' | 'unlisted' | 'public')}
                      className="w-full rounded-xl border border-slate-300 p-2.5 text-xs text-slate-900 focus:border-[#E50914] focus:outline-none"
                    >
                      <option value="private">Private (Only you can view)</option>
                      <option value="unlisted">Unlisted (Anyone with link)</option>
                      <option value="public">Public (Published immediately)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      YouTube Category
                    </label>
                    <select
                      value={uploadCategory}
                      onChange={(e) => setUploadCategory(e.target.value)}
                      className="w-full rounded-xl border border-slate-300 p-2.5 text-xs text-slate-900 focus:border-[#E50914] focus:outline-none"
                    >
                      <option value="27">Education</option>
                      <option value="28">Science & Technology</option>
                      <option value="24">Entertainment</option>
                      <option value="25">News & Politics</option>
                    </select>
                  </div>
                </div>

                <div className="rounded-xl bg-slate-50 border border-slate-200 p-3 text-xs text-slate-600 space-y-1">
                  <div className="flex items-center gap-1.5 font-bold text-slate-800">
                    <Info className="h-3.5 w-3.5 text-slate-500" />
                    <span>Upload Mode</span>
                  </div>
                  <p>
                    If YouTube OAuth token is connected in Creator Settings, this uploads directly to your channel via YouTube Data API v3. Otherwise, verified 1-click YouTube Studio deep links are generated.
                  </p>
                </div>

                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowUploadModal(false)}
                    className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleExecuteUpload}
                    disabled={isUploading}
                    className="inline-flex items-center gap-2 rounded-xl bg-[#E50914] px-5 py-2 text-xs font-bold text-white hover:bg-[#B91C1C] disabled:opacity-50 transition shadow-sm"
                  >
                    <Upload className="h-4 w-4" />
                    <span>{isUploading ? 'Packaging & Uploading...' : 'Confirm & Upload'}</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div
                  className={`rounded-xl p-4 text-xs ${
                    uploadResult.success
                      ? 'bg-emerald-50 border border-emerald-200 text-emerald-900'
                      : 'bg-rose-50 border border-rose-200 text-rose-900'
                  }`}
                >
                  <div className="flex items-center gap-2 font-bold mb-1">
                    {uploadResult.success ? (
                      <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                    ) : (
                      <AlertCircle className="h-4 w-4 text-rose-600" />
                    )}
                    <span>{uploadResult.success ? 'Upload Action Completed' : 'Upload Notice'}</span>
                  </div>
                  <p>{uploadResult.message}</p>
                </div>

                {uploadResult.videoUrl && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs font-mono bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                      <span className="truncate">{uploadResult.videoUrl}</span>
                      <a
                        href={uploadResult.videoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 font-bold text-[#E50914] hover:underline ml-2"
                      >
                        <span>Open</span>
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </div>
                    {uploadResult.studioUrl && (
                      <div className="flex items-center justify-between text-xs font-mono bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                        <span className="truncate">Edit in YouTube Studio</span>
                        <a
                          href={uploadResult.studioUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 font-bold text-slate-800 hover:underline ml-2"
                        >
                          <span>Studio</span>
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      </div>
                    )}
                  </div>
                )}

                <div className="flex justify-end pt-2">
                  <button
                    type="button"
                    onClick={() => setShowUploadModal(false)}
                    className="rounded-xl bg-slate-900 px-5 py-2 text-xs font-bold text-white hover:bg-slate-800 transition"
                  >
                    Done
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 4. REVISION REQUEST MODAL */}
      {showRevisionModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <RotateCcw className="h-5 w-5 text-amber-600" />
                <h3 className="text-base font-bold text-slate-900">Request AI Agent Revision</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowRevisionModal(false)}
                className="text-slate-400 hover:text-slate-600 text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-600">
              Provide feedback for what should be updated (e.g. &ldquo;make the hook punchier&rdquo;, &ldquo;shorten the middle explanation&rdquo;, &ldquo;add more Roman Urdu colloquialisms&rdquo;).
            </p>

            <textarea
              value={revisionFeedback}
              onChange={(e) => setRevisionFeedback(e.target.value)}
              placeholder="Enter revision notes for the scriptwriting agent..."
              rows={4}
              className="w-full rounded-xl border border-slate-300 p-3 text-xs text-slate-900 focus:border-amber-500 focus:outline-none"
            />

            {revisionSubmitted && (
              <div className="rounded-xl bg-amber-50 border border-amber-200 p-3 text-xs font-bold text-amber-800 flex items-center gap-2">
                <Check className="h-4 w-4 text-amber-600" />
                <span>Revision instructions logged. Agent updating draft...</span>
              </div>
            )}

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowRevisionModal(false)}
                className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 transition"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSubmitRevision}
                disabled={!revisionFeedback.trim() || revisionSubmitted}
                className="rounded-xl bg-amber-600 px-5 py-2 text-xs font-bold text-white hover:bg-amber-700 disabled:opacity-50 transition"
              >
                Submit Revision Request
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
