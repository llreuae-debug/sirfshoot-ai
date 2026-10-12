'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SidebarDrawer from '@/components/SidebarDrawer';
import { useCreatorStore } from '@/lib/store';
import {
  Video,
  Play,
  Pause,
  Download,
  Sparkles,
  ArrowLeft,
  Music,
  Layers,
  Settings2,
  CheckCircle2,
  RefreshCw,
  Plus,
  Trash2,
  Image as ImageIcon,
} from 'lucide-react';

interface SceneItem {
  id: string;
  title: string;
  subtitle: string;
  durationSec: number;
  imageUrl: string;
}

const DEFAULT_SCENES: SceneItem[] = [
  {
    id: 'scene-1',
    title: 'EXCLUSIVE DUPLEX PENTHOUSE',
    subtitle: 'Contemporary architecture with ultra-luxury finishes',
    durationSec: 4,
    imageUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1000&auto=format&fit=crop&q=80',
  },
  {
    id: 'scene-2',
    title: 'DOUBLE-HEIGHT LIVING SANCTUARY',
    subtitle: 'Abundant natural light with integrated entertainer terrace',
    durationSec: 4,
    imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1000&auto=format&fit=crop&q=80',
  },
  {
    id: 'scene-3',
    title: 'PRIVATE ROOFTOP POOL DECK',
    subtitle: 'Panoramic 360-degree skyline vistas',
    durationSec: 4,
    imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1000&auto=format&fit=crop&q=80',
  },
  {
    id: 'scene-4',
    title: 'SPECIAL PRE-LAUNCH OPPORTUNITY',
    subtitle: 'Message via WhatsApp to schedule an exclusive viewing',
    durationSec: 3,
    imageUrl: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1000&auto=format&fit=crop&q=80',
  },
];

export default function VideoAutomaticoPage() {
  const { state } = useCreatorStore();

  const [scenes, setScenes] = useState<SceneItem[]>(DEFAULT_SCENES);
  const [currentSceneIndex, setCurrentSceneIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [transitionStyle, setTransitionStyle] = useState<'fade' | 'slide' | 'zoom'>('fade');
  const [soundtrack, setSoundtrack] = useState('Luxury Acoustic Piano');
  const [isExporting, setIsExporting] = useState(false);
  const [exportSuccess, setExportSuccess] = useState(false);

  // Playback timer loop
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined;
    if (isPlaying) {
      const current = scenes[currentSceneIndex];
      timer = setTimeout(() => {
        setCurrentSceneIndex((prev) => (prev + 1) % scenes.length);
      }, (current?.durationSec || 3) * 1000);
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isPlaying, currentSceneIndex, scenes]);

  const handleUpdateScene = (id: string, field: 'title' | 'subtitle', val: string) => {
    setScenes((prev) =>
      prev.map((s) => (s.id === id ? { ...s, [field]: val } : s))
    );
  };

  const handleExportVideo = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      setExportSuccess(true);
      setTimeout(() => setExportSuccess(false), 4000);
    }, 2500);
  };

  const activeScene = scenes[currentSceneIndex] || scenes[0];

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
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-pink-600 to-purple-600 text-white shadow-md">
                <Video className="h-5 w-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                    Automated Video Generator
                  </h1>
                  <span className="rounded-full bg-pink-100 border border-pink-300 px-2 py-0.5 text-[10px] font-black text-pink-800 uppercase">
                    Premium
                  </span>
                </div>
                <p className="text-xs text-slate-500">
                  Generate cinematic promotional videos with AI scenes, dynamic motion transitions, and music.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleExportVideo}
                disabled={isExporting}
                className="btn-shadow inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-pink-600 to-purple-600 px-6 py-2.5 text-xs sm:text-sm font-extrabold text-white shadow-md shadow-pink-500/20 hover:opacity-95 transition disabled:opacity-50"
              >
                {isExporting ? (
                  <>
                    <RefreshCw className="h-4 w-4 animate-spin" />
                    <span>Rendering 4K MP4...</span>
                  </>
                ) : (
                  <>
                    <Download className="h-4 w-4" />
                    <span>Export Video (4K)</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Main 2-Col Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left 5 Cols: 9:16 Video Player Mockup */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center">
              <div className="relative w-[300px] sm:w-[340px] h-[540px] sm:h-[600px] rounded-3xl overflow-hidden bg-black shadow-2xl border-4 border-slate-900 flex flex-col justify-between p-5">
                {/* Scene Image with Dynamic Zoom / Ken Burns effect */}
                <img
                  src={activeScene.imageUrl}
                  alt="Video frame"
                  className={`absolute inset-0 h-full w-full object-cover transition-all duration-700 ${
                    transitionStyle === 'zoom'
                      ? 'scale-110'
                      : transitionStyle === 'slide'
                      ? 'translate-x-1'
                      : 'opacity-95'
                  }`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/60 pointer-events-none" />

                {/* Top Overlay */}
                <div className="relative z-10 flex items-center justify-between text-white">
                  <span className="rounded-full bg-pink-600 px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider shadow-xs">
                    Scene {currentSceneIndex + 1}/{scenes.length}
                  </span>
                  <span className="text-[10px] text-white/80 font-mono bg-black/40 backdrop-blur-md px-2 py-0.5 rounded">
                    {soundtrack}
                  </span>
                </div>

                {/* Center Play/Pause button */}
                <div className="relative z-10 mx-auto">
                  <button
                    type="button"
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="flex h-16 w-16 items-center justify-center rounded-full bg-white/20 backdrop-blur-md text-white border border-white/30 hover:scale-105 active:scale-95 transition"
                    aria-label={isPlaying ? 'Pause video' : 'Play video'}
                  >
                    {isPlaying ? (
                      <Pause className="h-7 w-7 fill-white" />
                    ) : (
                      <Play className="h-7 w-7 fill-white ml-1" />
                    )}
                  </button>
                </div>

                {/* Bottom Captions */}
                <div className="relative z-10 space-y-1.5 text-white">
                  <div className="text-base sm:text-lg font-black leading-tight drop-shadow-md">
                    {activeScene.title}
                  </div>
                  <p className="text-xs text-slate-200 line-clamp-2 drop-shadow">
                    {activeScene.subtitle}
                  </p>

                  {/* Progress Indicator */}
                  <div className="flex gap-1 pt-2">
                    {scenes.map((_, i) => (
                      <div
                        key={i}
                        className={`h-1 flex-1 rounded-full transition-all ${
                          i === currentSceneIndex ? 'bg-pink-500' : 'bg-white/30'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {exportSuccess && (
                <div className="mt-3 p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 font-bold flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  <span>Video successfully rendered and exported in 4K resolution!</span>
                </div>
              )}
            </div>

            {/* Right 7 Cols: Multi-Scene Timeline Editor */}
            <div className="lg:col-span-7 space-y-6">
              {/* Scene Timeline Box */}
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <Layers className="h-4 w-4 text-pink-600" />
                    <h2 className="text-sm font-extrabold text-slate-900 uppercase tracking-wide">
                      Multi-Scene Timeline ({scenes.length} Scenes)
                    </h2>
                  </div>

                  {/* Transitions Selector */}
                  <div className="flex items-center gap-1 text-xs">
                    <span className="text-slate-400 font-semibold mr-1">Transition:</span>
                    {(['fade', 'slide', 'zoom'] as const).map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setTransitionStyle(t)}
                        className={`rounded-lg px-2.5 py-1 font-bold capitalize transition ${
                          transitionStyle === t
                            ? 'bg-pink-600 text-white'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Scenes List */}
                <div className="space-y-3">
                  {scenes.map((sc, index) => (
                    <div
                      key={sc.id}
                      className={`rounded-2xl border p-4 transition space-y-3 ${
                        index === currentSceneIndex
                          ? 'border-pink-300 bg-pink-50/40 ring-1 ring-pink-400/20'
                          : 'border-slate-200 bg-slate-50/50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-slate-900 text-white font-bold text-xs">
                            {index + 1}
                          </span>
                          <span className="font-extrabold text-xs text-slate-800">
                            Scene {index + 1} ({sc.durationSec}s)
                          </span>
                        </div>

                        <button
                          type="button"
                          onClick={() => setCurrentSceneIndex(index)}
                          className="text-xs font-bold text-pink-600 hover:underline"
                        >
                          Preview Scene
                        </button>
                      </div>

                      <div className="space-y-2">
                        <input
                          type="text"
                          value={sc.title}
                          onChange={(e) => handleUpdateScene(sc.id, 'title', e.target.value)}
                          placeholder="Scene headline overlay..."
                          className="w-full rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-800 focus:border-pink-500 focus:outline-none"
                        />
                        <input
                          type="text"
                          value={sc.subtitle}
                          onChange={(e) => handleUpdateScene(sc.id, 'subtitle', e.target.value)}
                          placeholder="Scene descriptive subtitle..."
                          className="w-full rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-700 focus:border-pink-500 focus:outline-none"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Soundtrack Selector Box */}
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-3">
                <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                  <Music className="h-4 w-4 text-purple-600" />
                  <h3 className="text-xs font-extrabold text-slate-900 uppercase tracking-wide">
                    Royalty-Free Audio Soundtrack
                  </h3>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    'Luxury Acoustic Piano',
                    'Modern Chill Lo-Fi',
                    'Cinematic Ambient Strings',
                    'Upbeat Inspiring Beats',
                  ].map((track) => (
                    <button
                      key={track}
                      type="button"
                      onClick={() => setSoundtrack(track)}
                      className={`rounded-xl p-2.5 text-left text-xs font-bold transition border ${
                        soundtrack === track
                          ? 'bg-purple-50 border-purple-300 text-purple-900'
                          : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      🎵 {track}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
