'use client';

import React, { useState, useEffect, useRef } from 'react';
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
  Smartphone,
  Monitor,
  Volume2,
  AlertCircle,
  ExternalLink,
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
    subtitle: 'Contemporary architecture with ultra-luxury finishes and bespoke design.',
    durationSec: 4,
    imageUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1000&auto=format&fit=crop&q=80',
  },
  {
    id: 'scene-2',
    title: 'DOUBLE-HEIGHT LIVING SANCTUARY',
    subtitle: 'Abundant natural light with integrated entertainer terrace and smart automation.',
    durationSec: 4,
    imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1000&auto=format&fit=crop&q=80',
  },
  {
    id: 'scene-3',
    title: 'PRIVATE ROOFTOP POOL DECK',
    subtitle: 'Panoramic 360-degree skyline vistas overlooking the metropolitan capital.',
    durationSec: 4,
    imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1000&auto=format&fit=crop&q=80',
  },
  {
    id: 'scene-4',
    title: 'SPECIAL PRE-LAUNCH OPPORTUNITY',
    subtitle: 'Message via WhatsApp to schedule an exclusive viewing or receive the full dossier.',
    durationSec: 3,
    imageUrl: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1000&auto=format&fit=crop&q=80',
  },
];

export default function VideoAutomaticoPage() {
  const { state } = useCreatorStore();

  const [scenes, setScenes] = useState<SceneItem[]>(DEFAULT_SCENES);
  const [currentSceneIndex, setCurrentSceneIndex] = useState(0);
  const [orientation, setOrientation] = useState<'landscape' | 'shorts'>('landscape');
  const [voice, setVoice] = useState<'en-US-AndrewMultilingualNeural' | 'ur-PK-UzmaNeural' | 'ur-PK-AsadNeural'>(
    'en-US-AndrewMultilingualNeural'
  );
  const [isPlaying, setIsPlaying] = useState(false);
  const [isRendering, setIsRendering] = useState(false);
  const [renderError, setRenderError] = useState<string | null>(null);
  
  // Rendered video output
  const [renderedVideoUrl, setRenderedVideoUrl] = useState<string | null>(null);
  const [renderMetadata, setRenderMetadata] = useState<{
    duration: number;
    width: number;
    height: number;
  } | null>(null);

  const videoPlayerRef = useRef<HTMLVideoElement | null>(null);

  // Scene Carousel Loop (when no rendered video is loaded)
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined;
    if (isPlaying && !renderedVideoUrl) {
      const current = scenes[currentSceneIndex];
      timer = setTimeout(() => {
        setCurrentSceneIndex((prev) => (prev + 1) % scenes.length);
      }, (current?.durationSec || 3) * 1000);
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isPlaying, currentSceneIndex, scenes, renderedVideoUrl]);

  const handleUpdateScene = (id: string, field: 'title' | 'subtitle' | 'imageUrl', val: string) => {
    setScenes((prev) =>
      prev.map((s) => (s.id === id ? { ...s, [field]: val } : s))
    );
  };

  const handleAddScene = () => {
    const newId = `scene-${Date.now()}`;
    const newScene: SceneItem = {
      id: newId,
      title: 'NEW CINEMATIC HIGHLIGHT',
      subtitle: 'Add voiceover narration and key focal point description.',
      durationSec: 4,
      imageUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb18615f3?w=1000&auto=format&fit=crop&q=80',
    };
    setScenes([...scenes, newScene]);
    setCurrentSceneIndex(scenes.length);
  };

  const handleDeleteScene = (id: string) => {
    if (scenes.length <= 1) return;
    const filtered = scenes.filter((s) => s.id !== id);
    setScenes(filtered);
    setCurrentSceneIndex(0);
  };

  // Live Video Render via FFmpeg + Edge-TTS Engine
  const handleRenderVideo = async () => {
    setIsRendering(true);
    setRenderError(null);

    try {
      const payload = {
        title: state.channelName ? `${state.channelName} Showcase` : 'SirfShoot Production',
        orientation,
        voice,
        sections: scenes.map((sc, idx) => ({
          type: idx === 0 ? 'HOOK' : idx === scenes.length - 1 ? 'CTA' : 'BODY',
          title: sc.title,
          content: sc.subtitle || sc.title,
          image_url: sc.imageUrl,
        })),
      };

      const res = await fetch('/api/video/render', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setRenderedVideoUrl(data.videoUrl);
        setRenderMetadata({
          duration: data.duration,
          width: data.width,
          height: data.height,
        });
        setIsPlaying(true);
      } else {
        setRenderError(data.error || 'Failed to render video.');
      }
    } catch (err) {
      console.error(err);
      setRenderError('Network error connecting to video rendering gateway.');
    } finally {
      setIsRendering(false);
    }
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
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-red-600 to-rose-600 text-white shadow-md">
                <Video className="h-5 w-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                    Multi-Scene Video Creation Engine
                  </h1>
                  <span className="rounded-full bg-red-100 border border-red-300 px-2 py-0.5 text-[10px] font-black text-red-800 uppercase">
                    FFmpeg & Neural TTS
                  </span>
                </div>
                <p className="text-xs text-slate-500">
                  Assemble cinematic videos with Ken Burns motion, synchronized Edge-TTS speech, and burned-in typography.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              {renderedVideoUrl && (
                <a
                  href={renderedVideoUrl}
                  download="sirfshoot_rendered_video.mp4"
                  className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 transition shadow-xs"
                >
                  <Download className="h-4 w-4 text-[#E50914]" />
                  <span>Download MP4</span>
                </a>
              )}
              <button
                type="button"
                onClick={handleRenderVideo}
                disabled={isRendering}
                className="btn-shadow inline-flex items-center gap-2 rounded-full bg-[#E50914] px-6 py-2.5 text-xs sm:text-sm font-extrabold text-white shadow-md hover:bg-[#B91C1C] transition disabled:opacity-50"
              >
                {isRendering ? (
                  <>
                    <RefreshCw className="h-4 w-4 animate-spin" />
                    <span>Rendering with FFmpeg...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4" />
                    <span>Render High-Definition Video</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Grid Layout: Left 5 Cols (Video Preview) / Right 7 Cols (Timeline Editor & Controls) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left 5 Cols: Video Player & Output */}
            <div className="lg:col-span-5 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  {renderedVideoUrl ? 'Rendered Master MP4' : 'Storyboard Live Canvas'}
                </span>
                {renderMetadata && (
                  <span className="text-[11px] font-mono font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                    {renderMetadata.width}×{renderMetadata.height} • ~{Math.round(renderMetadata.duration)}s
                  </span>
                )}
              </div>

              {/* Player Container */}
              <div
                className={`relative overflow-hidden rounded-3xl bg-slate-950 shadow-2xl transition-all ${
                  orientation === 'shorts' ? 'aspect-[9/16] max-h-[620px] mx-auto w-full max-w-[350px]' : 'aspect-video w-full'
                }`}
              >
                {renderedVideoUrl ? (
                  <video
                    ref={videoPlayerRef}
                    src={renderedVideoUrl}
                    controls
                    autoPlay
                    playsInline
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <>
                    {/* Background Scene Image */}
                    <img
                      src={activeScene.imageUrl}
                      alt={activeScene.title}
                      className="absolute inset-0 h-full w-full object-cover transition-opacity duration-700"
                    />

                    {/* Dark Cinematic Vignette */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/60 pointer-events-none" />

                    {/* Top Watermark & Scene Badge */}
                    <div className="relative z-10 p-5 flex items-center justify-between text-white">
                      <span className="rounded-full bg-white/20 backdrop-blur-md px-3 py-1 text-[11px] font-bold">
                        Scene {currentSceneIndex + 1} of {scenes.length}
                      </span>
                      <span className="rounded-full bg-[#E50914] px-2.5 py-1 text-[10px] font-mono font-bold tracking-wider">
                        {orientation === 'shorts' ? '9:16 SHORTS' : '16:9 WIDESCREEN'}
                      </span>
                    </div>

                    {/* Center Play/Pause button */}
                    <div className="absolute inset-0 flex items-center justify-center z-10">
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

                    {/* Bottom Captions & Typography */}
                    <div className="absolute bottom-0 inset-x-0 p-5 z-10 space-y-1.5 text-white">
                      <div className="text-sm sm:text-base font-black leading-tight drop-shadow-md">
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
                              i === currentSceneIndex ? 'bg-[#E50914]' : 'bg-white/30'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>

              {renderError && (
                <div className="p-3 rounded-2xl bg-rose-50 border border-rose-200 text-xs text-rose-800 font-bold flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 text-rose-600" />
                  <span>{renderError}</span>
                </div>
              )}

              {renderedVideoUrl && (
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 space-y-2">
                  <div className="flex items-center justify-between font-bold">
                    <span className="flex items-center gap-1.5">
                      <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                      Video Successfully Compiled
                    </span>
                    <a
                      href={renderedVideoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[#E50914] hover:underline flex items-center gap-1"
                    >
                      <span>Full Screen</span>
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                  <p className="text-emerald-800 leading-relaxed text-[11px]">
                    Encoded via Apple Silicon H.264 hardware with Edge-TTS synchronized audio and Ken Burns pan/zoom motion.
                  </p>
                </div>
              )}
            </div>

            {/* Right 7 Cols: Multi-Scene Timeline Editor & Controls */}
            <div className="lg:col-span-7 space-y-6">
              {/* Format & Aspect Ratio Card */}
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <Settings2 className="h-4 w-4 text-[#E50914]" />
                    <h2 className="text-sm font-extrabold text-slate-900 uppercase tracking-wide">
                      Rendering Settings & Audio
                    </h2>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Aspect Ratio Selector */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Video Aspect Ratio
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setOrientation('landscape')}
                        className={`flex items-center justify-center gap-2 rounded-xl p-2.5 text-xs font-bold transition border ${
                          orientation === 'landscape'
                            ? 'bg-red-50 border-[#E50914] text-[#E50914]'
                            : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        <Monitor className="h-4 w-4" />
                        <span>16:9 Landscape</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setOrientation('shorts')}
                        className={`flex items-center justify-center gap-2 rounded-xl p-2.5 text-xs font-bold transition border ${
                          orientation === 'shorts'
                            ? 'bg-red-50 border-[#E50914] text-[#E50914]'
                            : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        <Smartphone className="h-4 w-4" />
                        <span>9:16 Shorts</span>
                      </button>
                    </div>
                  </div>

                  {/* Neural Speech Voice */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Neural Speech Voiceover
                    </label>
                    <select
                      value={voice}
                      onChange={(e) => setVoice(e.target.value as any)}
                      className="w-full rounded-xl border border-slate-300 p-2.5 text-xs text-slate-900 focus:border-[#E50914] focus:outline-none"
                    >
                      <option value="en-US-AndrewMultilingualNeural">Andrew (US / Multilingual)</option>
                      <option value="ur-PK-UzmaNeural">Uzma (Urdu Neural Female)</option>
                      <option value="ur-PK-AsadNeural">Asad (Urdu Neural Male)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Scene Timeline Box */}
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <Layers className="h-4 w-4 text-[#E50914]" />
                    <h2 className="text-sm font-extrabold text-slate-900 uppercase tracking-wide">
                      Multi-Scene Timeline ({scenes.length} Scenes)
                    </h2>
                  </div>

                  <button
                    type="button"
                    onClick={handleAddScene}
                    className="inline-flex items-center gap-1 text-xs font-bold text-[#E50914] hover:underline"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    <span>Add Scene</span>
                  </button>
                </div>

                {/* Scenes List */}
                <div className="space-y-4">
                  {scenes.map((sc, index) => (
                    <div
                      key={sc.id}
                      className={`rounded-2xl border p-4 transition space-y-3 ${
                        index === currentSceneIndex
                          ? 'border-red-300 bg-red-50/30 ring-1 ring-red-400/20'
                          : 'border-slate-200 bg-slate-50/50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-slate-900 text-white font-bold text-xs">
                            {index + 1}
                          </span>
                          <span className="font-extrabold text-xs text-slate-800">
                            Scene {index + 1} • {index === 0 ? 'Hook' : index === scenes.length - 1 ? 'CTA' : 'Pillar'}
                          </span>
                        </div>

                        <div className="flex items-center gap-3">
                          <button
                            type="button"
                            onClick={() => setCurrentSceneIndex(index)}
                            className="text-xs font-bold text-[#E50914] hover:underline"
                          >
                            Preview
                          </button>
                          {scenes.length > 1 && (
                            <button
                              type="button"
                              onClick={() => handleDeleteScene(sc.id)}
                              className="text-slate-400 hover:text-rose-600 transition"
                              title="Delete Scene"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          )}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <input
                          type="text"
                          value={sc.title}
                          onChange={(e) => handleUpdateScene(sc.id, 'title', e.target.value)}
                          placeholder="Scene headline overlay..."
                          className="w-full rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-800 focus:border-[#E50914] focus:outline-none"
                        />
                        <textarea
                          rows={2}
                          value={sc.subtitle}
                          onChange={(e) => handleUpdateScene(sc.id, 'subtitle', e.target.value)}
                          placeholder="Voiceover narration script for this scene..."
                          className="w-full rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-700 focus:border-[#E50914] focus:outline-none resize-y"
                        />
                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            value={sc.imageUrl}
                            onChange={(e) => handleUpdateScene(sc.id, 'imageUrl', e.target.value)}
                            placeholder="Background image URL..."
                            className="flex-1 rounded-xl border border-slate-200 bg-white px-3 py-1 text-[11px] font-mono text-slate-600 focus:border-[#E50914] focus:outline-none truncate"
                          />
                        </div>
                      </div>
                    </div>
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
