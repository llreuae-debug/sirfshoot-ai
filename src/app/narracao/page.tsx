'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SidebarDrawer from '@/components/SidebarDrawer';
import { useCreatorStore } from '@/lib/store';
import {
  Mic,
  Play,
  Pause,
  Download,
  Sparkles,
  ArrowLeft,
  Volume2,
  Sliders,
  CheckCircle2,
  RefreshCw,
  Plus,
  Radio,
  Clock,
  FileText,
} from 'lucide-react';

interface VoiceOption {
  id: string;
  name: string;
  lang: string;
  gender: 'Male' | 'Female';
  style: string;
  badge?: string;
  sampleText: string;
}

const VOICE_CATALOG: VoiceOption[] = [
  {
    id: 'voice-james-uk',
    name: 'James (British Luxury Estate)',
    lang: 'en-GB',
    gender: 'Male',
    style: 'Refined, Prestigious & Polished',
    badge: 'Popular',
    sampleText: 'Experience an unparalleled architectural sanctuary crafted for those who demand the finest.',
  },
  {
    id: 'voice-sophia-us',
    name: 'Sophia (US Conversational Lifestyle)',
    lang: 'en-US',
    gender: 'Female',
    style: 'Crisp, Engaging & Warm',
    badge: 'Most Used',
    sampleText: 'Tour this modern high-rise and discover what luxury living really feels like.',
  },
  {
    id: 'voice-alexander-us',
    name: 'Alexander (Deep Cinematic Narrator)',
    lang: 'en-US',
    gender: 'Male',
    style: 'Resonant, Authoritative & Gripping',
    badge: 'Documentary',
    sampleText: 'Beyond the skyline lies an estate designed to stand the test of time.',
  },
  {
    id: 'voice-emma-us',
    name: 'Emma (Storytelling & Commercial)',
    lang: 'en-US',
    gender: 'Female',
    style: 'Dynamic, Friendly & Persuasive',
    sampleText: 'Looking for a home with a private rooftop pool? This rare gem is waiting for you.',
  },
  {
    id: 'voice-liam-au',
    name: 'Liam (Modern Tech & Real Estate)',
    lang: 'en-AU',
    gender: 'Male',
    style: 'Confident, Energetic & Direct',
    sampleText: 'Step inside this smart automated penthouse and explore panoramic skyline vistas.',
  },
];

export default function NarracaoPage() {
  const { state } = useCreatorStore();

  const [scriptText, setScriptText] = useState(
    'Discover the rare privilege of residing in an exclusive 350-square-meter penthouse. Featuring four expansive suites, a private heated pool on the terrace, and breathtaking panoramic skyline views. Schedule your private walkthrough today.'
  );

  const [selectedVoiceId, setSelectedVoiceId] = useState<string>('voice-james-uk');
  const [pitch, setPitch] = useState<number>(1);
  const [rate, setRate] = useState<number>(1);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isCloningModalOpen, setIsCloningModalOpen] = useState<boolean>(false);
  const [recordingSeconds, setRecordingSeconds] = useState<number>(0);
  const [isRecordingVoice, setIsRecordingVoice] = useState<boolean>(false);
  const [customCloneSuccess, setCustomCloneSuccess] = useState<boolean>(false);

  const speechRef = useRef<SpeechSynthesisUtterance | null>(null);

  const selectedVoice =
    VOICE_CATALOG.find((v) => v.id === selectedVoiceId) || VOICE_CATALOG[0];

  // Words count & runtime estimate
  const wordCount = scriptText.trim() ? scriptText.trim().split(/\s+/).length : 0;
  const estimatedSeconds = Math.max(1, Math.round(wordCount / 2.5));

  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const handlePlayAudio = () => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      alert('Your browser does not support native speech synthesis.');
      return;
    }

    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(scriptText);
    utterance.lang = selectedVoice.lang;
    utterance.pitch = pitch;
    utterance.rate = rate;

    utterance.onend = () => setIsPlaying(false);
    utterance.onerror = () => setIsPlaying(false);

    speechRef.current = utterance;
    window.speechSynthesis.speak(utterance);
    setIsPlaying(true);
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
                  <span className="rounded-full bg-amber-100 border border-amber-300 px-2 py-0.5 text-[10px] font-black text-amber-800 uppercase">
                    Premium
                  </span>
                </div>
                <p className="text-xs text-slate-500">
                  Transform written scripts into lifelike neural audio with +100 voice models and instant voice cloning.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsCloningModalOpen(true)}
                className="btn-shadow inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 px-5 py-2.5 text-xs sm:text-sm font-extrabold text-black shadow-md shadow-amber-500/20 hover:opacity-95 transition"
              >
                <Sparkles className="h-4 w-4" />
                <span>+ Clone My Voice</span>
              </button>
            </div>
          </div>

          {/* Main Voiceover Workspace */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left 7 Cols: Script Input & Waveform Simulation */}
            <div className="lg:col-span-7 space-y-6">
              <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-7 shadow-sm space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-amber-500" />
                    <span className="text-xs font-extrabold text-slate-900 uppercase tracking-wide">
                      Script for Voiceover
                    </span>
                  </div>

                  <span className="text-xs font-mono text-slate-400">
                    {wordCount} words • ~{estimatedSeconds}s estimated audio length
                  </span>
                </div>

                {/* Textarea */}
                <textarea
                  rows={6}
                  value={scriptText}
                  onChange={(e) => setScriptText(e.target.value)}
                  placeholder="Paste or type your video script here to generate lifelike voice narration..."
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 p-4 text-xs sm:text-sm text-slate-800 leading-relaxed placeholder:text-slate-400 focus:border-amber-500 focus:outline-none"
                />

                {/* Audio Waveform Simulator */}
                <div className="rounded-2xl border border-slate-200 bg-slate-950 p-5 space-y-3">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <div className="flex items-center gap-2">
                      <Radio className={`h-3.5 w-3.5 ${isPlaying ? 'text-emerald-400 animate-pulse' : 'text-slate-500'}`} />
                      <span className="font-mono">{selectedVoice.name}</span>
                    </div>
                    <span className="font-mono text-amber-400">{selectedVoice.style}</span>
                  </div>

                  {/* Animated Waveform Bars */}
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

                  {/* Play & Audio Sliders */}
                  <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <button
                      type="button"
                      onClick={handlePlayAudio}
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-amber-500 hover:bg-amber-600 px-5 py-2.5 text-xs font-black text-black transition shadow-md"
                    >
                      {isPlaying ? (
                        <>
                          <Pause className="h-4 w-4" />
                          <span>Pause Audio</span>
                        </>
                      ) : (
                        <>
                          <Play className="h-4 w-4 fill-black" />
                          <span>Preview Audio Voiceover</span>
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => alert('WAV audio file downloaded to your device.')}
                      className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-slate-800 bg-slate-900 px-4 py-2.5 text-xs font-bold text-slate-300 hover:text-white transition"
                    >
                      <Download className="h-3.5 w-3.5" />
                      <span>Download .WAV</span>
                    </button>
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
                      min="0.7"
                      max="1.3"
                      step="0.1"
                      value={pitch}
                      onChange={(e) => setPitch(Number(e.target.value))}
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
                      min="0.7"
                      max="1.5"
                      step="0.1"
                      value={rate}
                      onChange={(e) => setRate(Number(e.target.value))}
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
                    Voice Catalog & Personas
                  </h3>
                  <span className="text-[11px] font-bold text-amber-600">
                    {VOICE_CATALOG.length} Voices
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
                        onClick={() => setSelectedVoiceId(voice.id)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') setSelectedVoiceId(voice.id);
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
              &ldquo;Hello, I am a luxury real estate consultant, and this is a sample recording to clone my voice for high-converting marketing videos.&rdquo;
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
                className="w-full rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 py-3 text-xs font-black text-black shadow-md hover:opacity-95 transition"
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
              className="w-full py-2 text-xs font-bold text-slate-400 hover:text-slate-700 transition"
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
