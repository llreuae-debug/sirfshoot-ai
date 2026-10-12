'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SidebarDrawer from '@/components/SidebarDrawer';
import { useCreatorStore } from '@/lib/store';
import {
  Image as ImageIcon,
  Sparkles,
  Sliders,
  Download,
  Share2,
  RefreshCw,
  ArrowLeft,
  CheckCircle2,
  Maximize2,
  Wand2,
  Camera,
} from 'lucide-react';

export default function ImagensPage() {
  const { state } = useCreatorStore();
  const [activeTab, setActiveTab] = useState<'2.0' | '1.0'>('2.0');

  // Tab 2.0 State
  const [postTitle, setPostTitle] = useState('Luxury Contemporary Villa in Gated Community');
  const [postPrice, setPostPrice] = useState('PKR 85,000,000');
  const [postLocation, setPostLocation] = useState('Gulberg III, Lahore');
  const [postPhone, setPostPhone] = useState('+92 300 1234567');
  const [postTagline, setPostTagline] = useState('Prime Location • Book Your Private Walkthrough Today');
  const [selectedRatio, setSelectedRatio] = useState<'9:16' | '1:1' | '16:9'>('9:16');
  const [bgImage, setBgImage] = useState(
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1000&auto=format&fit=crop&q=80'
  );

  // Tab 1.0 State
  const [brightness, setBrightness] = useState(105);
  const [contrast, setContrast] = useState(110);
  const [saturation, setSaturation] = useState(115);
  const [warmth, setWarmth] = useState(5);
  const [sharpness, setSharpness] = useState(10);
  const [appliedPreset, setAppliedPreset] = useState('Golden Hour HDR');

  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const PRESETS = [
    { name: 'Golden Hour HDR', b: 110, c: 115, s: 120, w: 10, sh: 15 },
    { name: 'Crisp Architectural', b: 105, c: 120, s: 100, w: 0, sh: 25 },
    { name: 'Vibrant Daylight', b: 115, c: 105, s: 130, w: 5, sh: 10 },
    { name: 'Clean Minimalist', b: 100, c: 105, s: 95, w: -5, sh: 5 },
  ];

  const handleApplyPreset = (p: (typeof PRESETS)[0]) => {
    setAppliedPreset(p.name);
    setBrightness(p.b);
    setContrast(p.c);
    setSaturation(p.s);
    setWarmth(p.w);
    setSharpness(p.sh);
  };

  const handleDownload = () => {
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 2500);
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#F8FAFC]">
      <SidebarDrawer />
      <Navbar />

      <main className="flex-1 py-8 sm:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
            <div>
              <div className="flex items-center gap-2">
                <Link
                  href="/dashboard"
                  className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition"
                  title="Back to Dashboard"
                >
                  <ArrowLeft className="h-5 w-5" />
                </Link>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 text-white shadow-md">
                  <ImageIcon className="h-5 w-5" />
                </div>
                <div>
                  <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                    Image Studio {activeTab === '2.0' ? '2.0 (Social Posts)' : '1.0 (Classic Enhancer)'}
                  </h1>
                  <p className="text-xs text-slate-500">
                    Transform real estate and product photos into high-converting visuals for social media and property portals.
                  </p>
                </div>
              </div>
            </div>

            {/* Version Switcher */}
            <div className="flex items-center rounded-xl border border-slate-200 bg-white p-1 shadow-xs">
              <button
                type="button"
                onClick={() => setActiveTab('2.0')}
                className={`flex items-center gap-1.5 rounded-lg px-4 py-2 text-xs font-black transition ${
                  activeTab === '2.0'
                    ? 'bg-amber-500 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Sparkles className="h-3.5 w-3.5" />
                <span>Post Studio 2.0</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('1.0')}
                className={`flex items-center gap-1.5 rounded-lg px-4 py-2 text-xs font-black transition ${
                  activeTab === '1.0'
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Sliders className="h-3.5 w-3.5" />
                <span>Classic Enhancer 1.0</span>
              </button>
            </div>
          </div>

          {/* TAB 2.0: Social Post Creator */}
          {activeTab === '2.0' ? (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Controls */}
              <div className="lg:col-span-5 space-y-6">
                <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-7 shadow-sm space-y-5">
                  <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
                    <Wand2 className="h-4 w-4 text-amber-500" />
                    <h2 className="text-sm font-extrabold text-slate-900 uppercase tracking-wide">
                      Post Customization
                    </h2>
                  </div>

                  {/* Ratio Selector */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">Aspect Ratio</label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { id: '9:16', label: 'Story (9:16)' },
                        { id: '1:1', label: 'Feed (1:1)' },
                        { id: '16:9', label: 'Landscape (16:9)' },
                      ].map((r) => (
                        <button
                          key={r.id}
                          type="button"
                          onClick={() => setSelectedRatio(r.id as '9:16' | '1:1' | '16:9')}
                          className={`rounded-xl py-2 text-xs font-bold transition text-center ${
                            selectedRatio === r.id
                              ? 'bg-amber-500 text-white shadow-xs'
                              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                          }`}
                        >
                          {r.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Text Inputs */}
                  <div className="space-y-3">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700">Property Title</label>
                      <input
                        type="text"
                        value={postTitle}
                        onChange={(e) => setPostTitle(e.target.value)}
                        className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2 text-xs text-slate-800 focus:border-amber-500 focus:outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-700">Asking Price</label>
                        <input
                          type="text"
                          value={postPrice}
                          onChange={(e) => setPostPrice(e.target.value)}
                          className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2 text-xs text-slate-800 font-mono focus:border-amber-500 focus:outline-none"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-700">Location</label>
                        <input
                          type="text"
                          value={postLocation}
                          onChange={(e) => setPostLocation(e.target.value)}
                          className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2 text-xs text-slate-800 focus:border-amber-500 focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700">WhatsApp / Contact Tag</label>
                      <input
                        type="text"
                        value={postPhone}
                        onChange={(e) => setPostPhone(e.target.value)}
                        className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2 text-xs text-slate-800 font-mono focus:border-amber-500 focus:outline-none"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700">Sub-headline / Call to Action</label>
                      <input
                        type="text"
                        value={postTagline}
                        onChange={(e) => setPostTagline(e.target.value)}
                        className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2 text-xs text-slate-800 focus:border-amber-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Sample Photo Selector */}
                  <div className="space-y-2 pt-2">
                    <label className="text-xs font-bold text-slate-700">Select Architecture Photo</label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1000&auto=format&fit=crop&q=80',
                        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1000&auto=format&fit=crop&q=80',
                        'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1000&auto=format&fit=crop&q=80',
                      ].map((img, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => setBgImage(img)}
                          className={`aspect-video rounded-xl overflow-hidden border-2 transition ${
                            bgImage === img ? 'border-amber-500 ring-2 ring-amber-400' : 'border-transparent'
                          }`}
                        >
                          <img src={img} alt="Property thumb" className="h-full w-full object-cover" />
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Export Button */}
                  <button
                    type="button"
                    onClick={handleDownload}
                    className="w-full flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 py-3.5 text-xs sm:text-sm font-extrabold text-black shadow-lg shadow-amber-500/25 hover:opacity-95 transition"
                  >
                    <Download className="h-4 w-4" />
                    <span>Download Ready-to-Post Visual</span>
                  </button>
                </div>
              </div>

              {/* Right Canvas Mockup Preview */}
              <div className="lg:col-span-7 flex flex-col items-center justify-center">
                <div
                  className={`relative overflow-hidden rounded-3xl bg-slate-950 shadow-2xl border-4 border-slate-900 transition-all duration-300 ${
                    selectedRatio === '9:16'
                      ? 'w-[320px] sm:w-[360px] h-[570px] sm:h-[640px]'
                      : selectedRatio === '1:1'
                      ? 'w-[340px] sm:w-[460px] h-[340px] sm:h-[460px]'
                      : 'w-full max-w-[560px] aspect-video'
                  }`}
                >
                  {/* Background Photo */}
                  <img
                    src={bgImage}
                    alt="Property visual"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                  {/* Subtle Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/60 pointer-events-none" />

                  {/* Top Overlay Badge */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                    <span className="rounded-full bg-amber-500 text-black px-3 py-1 text-[10px] font-black uppercase tracking-wider shadow-md">
                      Featured Exclusive
                    </span>
                    <span className="rounded-full bg-black/60 backdrop-blur-md text-white px-2.5 py-0.5 text-[10px] font-bold border border-white/20">
                      SirfShoot AI
                    </span>
                  </div>

                  {/* Bottom Text Content */}
                  <div className="absolute bottom-5 left-5 right-5 z-10 space-y-2 text-white">
                    <div className="text-xl sm:text-2xl font-black leading-tight drop-shadow-md">
                      {postTitle}
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="rounded-lg bg-emerald-500 text-black font-black px-2.5 py-1 text-xs font-mono shadow-sm">
                        {postPrice}
                      </span>
                      <span className="text-xs text-slate-200 font-semibold drop-shadow">
                        📍 {postLocation}
                      </span>
                    </div>

                    <p className="text-[11px] text-slate-300 line-clamp-2">
                      {postTagline}
                    </p>

                    <div className="pt-2 border-t border-white/20 flex items-center justify-between text-xs">
                      <span className="font-mono text-emerald-400 font-bold">
                        💬 {postPhone}
                      </span>
                      <span className="text-[10px] text-slate-400 font-medium">
                        Schedule Tour Today
                      </span>
                    </div>
                  </div>
                </div>

                {downloadSuccess && (
                  <p className="mt-3 text-xs font-bold text-emerald-600 flex items-center gap-1">
                    <CheckCircle2 className="h-4 w-4" />
                    <span>Visual downloaded to your device successfully!</span>
                  </p>
                )}
              </div>
            </div>
          ) : (
            /* TAB 1.0: Classic Image Enhancer */
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Sliders on Left */}
              <div className="lg:col-span-5 space-y-6">
                <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-7 shadow-sm space-y-5">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                      <Sliders className="h-4 w-4 text-cyan-600" />
                      <h2 className="text-sm font-extrabold text-slate-900 uppercase tracking-wide">
                        HDR & Enhancement Sliders
                      </h2>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setBrightness(100);
                        setContrast(100);
                        setSaturation(100);
                        setWarmth(0);
                        setSharpness(0);
                      }}
                      className="text-xs font-bold text-slate-400 hover:text-slate-700"
                    >
                      Reset
                    </button>
                  </div>

                  {/* Preset Pills */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">Quick HDR Presets</label>
                    <div className="flex flex-wrap gap-1.5">
                      {PRESETS.map((p) => (
                        <button
                          key={p.name}
                          type="button"
                          onClick={() => handleApplyPreset(p)}
                          className={`rounded-full px-3 py-1 text-[11px] font-bold transition ${
                            appliedPreset === p.name
                              ? 'bg-cyan-600 text-white shadow-xs'
                              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                          }`}
                        >
                          {p.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Sliders */}
                  <div className="space-y-4 pt-2">
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs font-bold text-slate-700">
                        <span>Brightness</span>
                        <span className="font-mono text-cyan-600">{brightness}%</span>
                      </div>
                      <input
                        type="range"
                        min="70"
                        max="140"
                        value={brightness}
                        onChange={(e) => setBrightness(Number(e.target.value))}
                        className="w-full accent-cyan-600"
                      />
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between text-xs font-bold text-slate-700">
                        <span>Contrast</span>
                        <span className="font-mono text-cyan-600">{contrast}%</span>
                      </div>
                      <input
                        type="range"
                        min="70"
                        max="140"
                        value={contrast}
                        onChange={(e) => setContrast(Number(e.target.value))}
                        className="w-full accent-cyan-600"
                      />
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between text-xs font-bold text-slate-700">
                        <span>Color Saturation</span>
                        <span className="font-mono text-cyan-600">{saturation}%</span>
                      </div>
                      <input
                        type="range"
                        min="50"
                        max="160"
                        value={saturation}
                        onChange={(e) => setSaturation(Number(e.target.value))}
                        className="w-full accent-cyan-600"
                      />
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between text-xs font-bold text-slate-700">
                        <span>Warmth / Tone</span>
                        <span className="font-mono text-cyan-600">{warmth > 0 ? `+${warmth}` : warmth}</span>
                      </div>
                      <input
                        type="range"
                        min="-20"
                        max="20"
                        value={warmth}
                        onChange={(e) => setWarmth(Number(e.target.value))}
                        className="w-full accent-cyan-600"
                      />
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between text-xs font-bold text-slate-700">
                        <span>Sharpness & Clarity</span>
                        <span className="font-mono text-cyan-600">+{sharpness}</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="40"
                        value={sharpness}
                        onChange={(e) => setSharpness(Number(e.target.value))}
                        className="w-full accent-cyan-600"
                      />
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleDownload}
                    className="w-full flex items-center justify-center gap-2 rounded-2xl bg-cyan-600 hover:bg-cyan-700 py-3.5 text-xs sm:text-sm font-extrabold text-white shadow-lg shadow-cyan-600/25 transition"
                  >
                    <Download className="h-4 w-4" />
                    <span>Download Enhanced Photo</span>
                  </button>
                </div>
              </div>

              {/* Photo Canvas on Right with Live CSS Filters */}
              <div className="lg:col-span-7 flex flex-col items-center justify-center">
                <div className="relative overflow-hidden rounded-3xl bg-slate-950 shadow-2xl border-4 border-slate-900 w-full max-w-[620px] aspect-[4/3]">
                  <img
                    src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&auto=format&fit=crop&q=80"
                    alt="Real estate preview"
                    style={{
                      filter: `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%) sepia(${
                        Math.max(0, warmth) * 1.5
                      }%) hue-rotate(${warmth < 0 ? warmth * 2 : 0}deg)`,
                    }}
                    className="h-full w-full object-cover transition-all duration-100"
                  />

                  {/* Corner Badge */}
                  <div className="absolute top-4 right-4 rounded-full bg-black/60 backdrop-blur-md px-3 py-1 text-[11px] font-bold text-white border border-white/20">
                    Live Preview • {appliedPreset}
                  </div>
                </div>

                {downloadSuccess && (
                  <p className="mt-3 text-xs font-bold text-emerald-600 flex items-center gap-1">
                    <CheckCircle2 className="h-4 w-4" />
                    <span>Enhanced photo downloaded to your device successfully!</span>
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
