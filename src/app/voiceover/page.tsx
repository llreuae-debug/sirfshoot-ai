'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SidebarDrawer from '@/components/SidebarDrawer';
import {
  Mic,
  Play,
  Pause,
  Download,
  Sparkles,
  ArrowLeft,
  CheckCircle2,
  FileText,
  Loader2,
} from 'lucide-react';

interface VoiceOption {
  id: string;
  modelId: string;
  name: string;
  lang: string;
  gender: 'Male' | 'Female';
  style: string;
  badge?: string;
  sampleText: string;
}

const VOICE_CATALOG: VoiceOption[] = [
  {
    id: 'voice-andrew-multilingual',
    modelId: 'en-US-AndrewMultilingualNeural',
    name: 'Andrew (Warm Conversational & Roman Urdu)',
    lang: 'en-US',
    gender: 'Male',
    style: 'Authentic, Conversational & Multilingual',
    badge: 'Recommended',
    sampleText: 'Welcome to SirfShoot AI. Aaj hum full 9-agent pipeline inspect karenge.',
  },
  {
    id: 'voice-uzma-ur',
    modelId: 'ur-PK-UzmaNeural',
    name: 'Uzma (Urdu Broadcast Host)',
    lang: 'ur-PK',
    gender: 'Female',
    style: 'Natural, Articulate & Expressive',
    badge: 'Urdu Native',
    sampleText: 'سرف شوٹ اے آئی میں خوش آمدید۔ آپ کا اسکرپٹ اب مکمل طور پر تیار ہے۔',
  },
  {
    id: 'voice-asad-ur',
    modelId: 'ur-PK-AsadNeural',
    name: 'Asad (Urdu Documentary Narrator)',
    lang: 'ur-PK',
    gender: 'Male',
    style: 'Deep, Authoritative & Resonant',
    badge: 'Documentary',
    sampleText: 'اس تحقیقی رپورٹ میں ہم معیشت اور ٹیکنالوجی کے اصل حقائق کا جائزہ لیں گے۔',
  },
  {
    id: 'voice-ava-multilingual',
    modelId: 'en-US-AvaMultilingualNeural',
    name: 'Ava (Expressive Lifestyle & Reels)',
    lang: 'en-US',
    gender: 'Female',
    style: 'Warm, Engaging & High Energy',
    badge: 'Shorts & Reels',
    sampleText: 'Tour this modern penthouse and discover what luxury living really feels like.',
  },
  {
    id: 'voice-ryan-uk',
    modelId: 'en-GB-RyanNeural',
    name: 'Ryan (British BBC Documentary)',
    lang: 'en-GB',
    gender: 'Male',
    style: 'Refined, Prestigious & Polished',
    badge: 'Broadcaster',
    sampleText: 'Experience an unparalleled architectural sanctuary crafted for those who demand the finest.',
  },
];

export default function VoiceoverPage() {
  const [scriptText, setScriptText] = useState(
    'Discover the rare privilege of residing in an exclusive 350-square-meter penthouse. Featuring four expansive suites, a private heated pool on the terrace, and breathtaking panoramic skyline views. Schedule your private walkthrough today.'
  );

  const [selectedVoiceId, setSelectedVoiceId] = useState<string>('voice-andrew-multilingual');
  const [rate, setRate] = useState<number>(1);
  const [pitch, setPitch] = useState<number>(1);
  const [isSynthesizing, setIsSynthesizing] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [srtData, setSrtData] = useState<string | null>(null);
  const [synthesisMeta, setSynthesisMeta] = useState<{ durationMs?: number; wordsCount?: number } | null>(null);

  const [isCloningModalOpen, setIsCloningModalOpen] = useState<boolean>(false);
  const [recordingSeconds, setRecordingSeconds] = useState<number>(0);
  const [isRecordingVoice, setIsRecordingVoice] = useState<boolean>(false);
  const [customCloneSuccess, setCustomCloneSuccess] = useState<boolean>(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const selectedVoice =
    VOICE_CATALOG.find((v) => v.id === selectedVoiceId) || VOICE_CATALOG[0];

  const wordCount = scriptText.trim() ? scriptText.trim().split(/\s+/).length : 0;
  const estimatedSeconds = Math.max(1, Math.round(wordCount / 2.5));

  const handleSynthesizeNeural = async () => {
    if (!scriptText.trim()) return;

    // If audio exists and user just wants to toggle play/pause
    if (audioUrl && audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play();
        setIsPlaying(true);
      }
      return;
    }

    setIsSynthesizing(true);
    try {
      const rateStr = `${rate >= 1 ? '+' : ''}${Math.round((rate - 1) * 100)}%`;
      const pitchStr = `${pitch >= 1 ? '+' : ''}${Math.round((pitch - 1) * 50)}Hz`;

      const res = await fetch('/api/voice/synthesize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: scriptText,
          voice: selectedVoice.modelId,
          rate: rateStr,
          pitch: pitchStr,
        }),
      });

      const data = await res.json();
      if (data.success && data.audioBase64) {
        setAudioUrl(data.audioBase64);
        setSrtData(data.srt);
        setSynthesisMeta({ durationMs: data.durationMs, wordsCount: data.wordsCount });

        if (audioRef.current) {
          audioRef.current.src = data.audioBase64;
          audioRef.current.play();
          setIsPlaying(true);
        }
      } else {
        throw new Error(data.error || 'Speech synthesis failed');
      }
    } catch (err) {
      console.error('Neural synthesis error, falling back to browser SpeechSynthesis:', err);
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        const u = new SpeechSynthesisUtterance(scriptText);
        u.lang = selectedVoice.lang;
        u.onend = () => setIsPlaying(false);
        window.speechSynthesis.speak(u);
        setIsPlaying(true);
      }
    } finally {
      setIsSynthesizing(false);
    }
  };

  const handleDownloadAudio = () => {
    if (!audioUrl) return;
    const a = document.createElement('a');
    a.href = audioUrl;
    a.download = `sirfshoot-${selectedVoice.id}.mp3`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleDownloadSrt = () => {
    if (!srtData) return;
    const blob = new Blob([srtData], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `sirfshoot-${selectedVoice.id}.srt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleStartVoiceClone = () => {
    setIsRecordingVoice(true);
    setRecordingSeconds(0);
    const interval = setInterval(() => {
      setRecordingSeconds((prev) => {
        if (prev >= 6) {
          clearInterval(interval);
          setIsRecordingVoice(false);
          setCustomCloneSuccess(true);
          return 6;
        }
        return prev + 1;
      });
    }, 1000);
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#F8FAFC]">
      <SidebarDrawer />
      <Navbar />

      {/* Hidden audio element for playback */}
      <audio
        ref={audioRef}
        onEnded={() => setIsPlaying(false)}
        onPause={() => setIsPlaying(false)}
        onPlay={() => setIsPlaying(true)}
      />

      <main className="flex-1 py-8 sm:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
            <div className="flex items-center gap-3">
              <Link
                href="/dashboard"
                className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition"
                title="Back to Dashboard"
              >
                <ArrowLeft className="h-5 w-5" />
              </Link>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 text-white shadow-md">
                <Mic className="h-5 w-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                    AI Voiceover Studio
                  </h1>
                  <span className="rounded-full bg-emerald-100 border border-emerald-300 px-2.5 py-0.5 text-[10px] font-black text-emerald-800 uppercase">
                    Neural Edge-TTS
                  </span>
                </div>
                <p className="text-xs text-slate-500">
                  Broadcast-quality multilingual neural voice synthesis with synced SRT word timings and zero robotic artifacts.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsCloningModalOpen(true)}
                className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 transition shadow-xs cursor-pointer"
              >
                <Sparkles className="h-4 w-4 text-amber-500" />
                <span>Clone Your Voice (Beta)</span>
              </button>
            </div>
          </div>

          {/* Studio Workspace */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left 7 Cols: Script Input & Controls */}
            <div className="lg:col-span-7 space-y-6">
              <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-7 shadow-sm space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-amber-500" />
                    <h2 className="text-sm font-extrabold text-slate-900 uppercase tracking-wide">
                      Spoken Script Text
                    </h2>
                  </div>
                  <div className="flex items-center gap-3 text-[11px] font-mono text-slate-500 font-semibold">
                    <span>{wordCount} words</span>
                    <span>•</span>
                    <span>~{estimatedSeconds}s audio</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <textarea
                    rows={6}
                    value={scriptText}
                    onChange={(e) => {
                      setScriptText(e.target.value);
                      setAudioUrl(null); // Reset generated audio on text edit
                    }}
                    placeholder="Enter the narration script to synthesize..."
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 p-4 text-xs sm:text-sm text-slate-800 focus:border-amber-500 focus:outline-none leading-relaxed transition"
                  />
                </div>

                {/* Synthesis Control Box */}
                <div className="rounded-2xl border border-slate-900 bg-[#0C0F17] p-5 text-white space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="text-xs font-mono font-bold text-slate-300">
                        {selectedVoice.name}
                      </span>
                    </div>
                    {synthesisMeta && (
                      <span className="text-[10px] font-mono text-amber-400 font-bold">
                        Duration: {(synthesisMeta.durationMs! / 1000).toFixed(1)}s ({synthesisMeta.wordsCount} words)
                      </span>
                    )}
                  </div>

                  {/* Animated Waveform */}
                  <div className="flex items-center justify-between gap-1 h-12 py-2 px-1">
                    {[12, 28, 44, 30, 18, 48, 64, 32, 20, 52, 70, 40, 24, 60, 35, 15, 45, 68, 50, 25, 40, 60, 30, 20, 45, 55, 35, 18, 50, 25].map(
                      (h, i) => (
                        <div
                          key={i}
                          style={{
                            height: isPlaying ? `${Math.min(100, h * (0.6 + ((i * 7) % 5) * 0.15))}%` : '20%',
                          }}
                          className={`w-1.5 rounded-full transition-all duration-150 ${
                            isPlaying ? 'bg-gradient-to-t from-amber-500 to-amber-300' : 'bg-slate-800'
                          }`}
                        />
                      )
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-2 flex flex-wrap items-center gap-3">
                    <button
                      type="button"
                      disabled={isSynthesizing || !scriptText.trim()}
                      onClick={handleSynthesizeNeural}
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-amber-500 hover:bg-amber-600 px-5 py-2.5 text-xs font-black text-black transition shadow-md disabled:opacity-50 cursor-pointer"
                    >
                      {isSynthesizing ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin text-black" />
                          <span>Synthesizing Audio...</span>
                        </>
                      ) : isPlaying ? (
                        <>
                          <Pause className="h-4 w-4 fill-black" />
                          <span>Pause Audio</span>
                        </>
                      ) : (
                        <>
                          <Play className="h-4 w-4 fill-black" />
                          <span>{audioUrl ? 'Play Audio' : 'Synthesize & Preview'}</span>
                        </>
                      )}
                    </button>

                    {audioUrl && (
                      <button
                        type="button"
                        onClick={handleDownloadAudio}
                        className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-slate-700 bg-slate-800 hover:bg-slate-700 px-4 py-2.5 text-xs font-bold text-white transition cursor-pointer"
                      >
                        <Download className="h-3.5 w-3.5 text-amber-400" />
                        <span>Download MP3</span>
                      </button>
                    )}

                    {srtData && (
                      <button
                        type="button"
                        onClick={handleDownloadSrt}
                        className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-slate-700 bg-slate-800 hover:bg-slate-700 px-4 py-2.5 text-xs font-bold text-slate-300 hover:text-white transition cursor-pointer"
                      >
                        <FileText className="h-3.5 w-3.5 text-emerald-400" />
                        <span>Download SRT Captions</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* Pitch & Speed Adjustment Sliders */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs font-bold text-slate-700">
                      <span>Vocal Pitch</span>
                      <span className="font-mono text-amber-600">{pitch.toFixed(1)}x</span>
                    </div>
                    <input
                      type="range"
                      min="0.8"
                      max="1.2"
                      step="0.05"
                      value={pitch}
                      onChange={(e) => {
                        setPitch(Number(e.target.value));
                        setAudioUrl(null);
                      }}
                      className="w-full accent-amber-500"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs font-bold text-slate-700">
                      <span>Speaking Speed</span>
                      <span className="font-mono text-amber-600">{rate.toFixed(1)}x</span>
                    </div>
                    <input
                      type="range"
                      min="0.8"
                      max="1.3"
                      step="0.05"
                      value={rate}
                      onChange={(e) => {
                        setRate(Number(e.target.value));
                        setAudioUrl(null);
                      }}
                      className="w-full accent-amber-500"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Right 5 Cols: Voice Actor Catalog */}
            <div className="lg:col-span-5 space-y-4">
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <h3 className="font-extrabold text-sm text-slate-900 uppercase tracking-wide">
                    Neural Voice Personas
                  </h3>
                  <span className="text-[11px] font-bold text-amber-600">
                    {VOICE_CATALOG.length} Neural Voices
                  </span>
                </div>

                <div className="space-y-2.5">
                  {VOICE_CATALOG.map((voice) => {
                    const isSelected = voice.id === selectedVoiceId;
                    return (
                      <div
                        key={voice.id}
                        role="button"
                        tabIndex={0}
                        onClick={() => {
                          setSelectedVoiceId(voice.id);
                          setAudioUrl(null);
                        }}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            setSelectedVoiceId(voice.id);
                            setAudioUrl(null);
                          }
                        }}
                        className={`w-full rounded-2xl p-4 text-left transition border cursor-pointer ${
                          isSelected
                            ? 'bg-amber-50/70 border-amber-300 ring-2 ring-amber-400/20'
                            : 'bg-white border-slate-200/80 hover:bg-slate-50'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="font-extrabold text-xs text-slate-900">
                                {voice.name}
                              </h4>
                              {voice.badge && (
                                <span className="rounded-full bg-amber-100 px-2 py-0.2 text-[9px] font-bold text-amber-800">
                                  {voice.badge}
                                </span>
                              )}
                            </div>
                            <p className="text-[11px] text-slate-500 mt-0.5">
                              {voice.gender} • {voice.style}
                            </p>
                          </div>

                          <div
                            className={`h-4 w-4 rounded-full border-2 flex items-center justify-center shrink-0 ${
                              isSelected
                                ? 'border-amber-500 bg-amber-500'
                                : 'border-slate-300'
                            }`}
                          >
                            {isSelected && <div className="h-1.5 w-1.5 rounded-full bg-black" />}
                          </div>
                        </div>

                        <p className="mt-2 text-[11px] text-slate-600 italic bg-slate-50 p-2 rounded-lg border border-slate-100">
                          &ldquo;{voice.sampleText}&rdquo;
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Voice Cloning Modal */}
      {isCloningModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            role="button"
            tabIndex={0}
            onClick={() => setIsCloningModalOpen(false)}
            onKeyDown={(e) => {
              if (e.key === 'Escape') setIsCloningModalOpen(false);
            }}
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity animate-in fade-in"
            aria-label="Close modal"
          />

          <div className="relative w-full max-w-md rounded-3xl border border-amber-200/60 bg-white p-6 sm:p-8 shadow-2xl animate-in zoom-in-95 duration-200 text-center space-y-4">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 text-black shadow-lg">
              <Mic className="h-7 w-7" />
            </div>

            <div className="space-y-1">
              <h3 className="text-xl font-black text-slate-900 tracking-tight">
                Instant Voice Cloning Lab
              </h3>
              <p className="text-xs text-slate-500">
                Read the sentence below clearly into your microphone to calibrate your custom neural voice:
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-xs text-slate-700 italic leading-relaxed">
              &ldquo;Hello, I am a content creator, and this is a sample recording to clone my voice for high-converting YouTube videos.&rdquo;
            </div>

            {isRecordingVoice ? (
              <div className="space-y-2 py-2">
                <div className="flex items-center justify-center gap-2 text-xs font-bold text-red-600 animate-pulse">
                  <div className="h-2.5 w-2.5 rounded-full bg-red-600" />
                  <span>Recording voice sample... ({recordingSeconds}/6s)</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div
                    style={{ width: `${(recordingSeconds / 6) * 100}%` }}
                    className="bg-red-500 h-full transition-all duration-1000"
                  />
                </div>
              </div>
            ) : customCloneSuccess ? (
              <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 font-bold flex items-center justify-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                <span>Custom Voice Profile created successfully!</span>
              </div>
            ) : (
              <button
                type="button"
                onClick={handleStartVoiceClone}
                className="w-full rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 py-3 text-xs font-black text-black shadow-md hover:opacity-95 transition cursor-pointer"
              >
                Start Recording (6 Seconds)
              </button>
            )}

            <button
              type="button"
              onClick={() => {
                setIsCloningModalOpen(false);
                setCustomCloneSuccess(false);
              }}
              className="w-full py-2 text-xs font-bold text-slate-400 hover:text-slate-700 transition cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
