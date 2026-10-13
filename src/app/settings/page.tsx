'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useCreatorStore } from '@/lib/store';
import { Key, Shield, Sliders, CheckCircle2, User, Zap, Save, Lock } from 'lucide-react';

export default function SettingsPage() {
  const { state, updateChannelName } = useCreatorStore();

  const [geminiKey, setGeminiKey] = useState('');
  const [openAiKey, setOpenAiKey] = useState('');
  const [pexelsKey, setPexelsKey] = useState('');
  const [youtubeKey, setYoutubeKey] = useState('');
  const [channelName, setChannelName] = useState(state.channelName);
  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [keyStatus, setKeyStatus] = useState<{
    hasGemini: boolean;
    geminiSource: string;
    hasOpenAI: boolean;
    openAiSource: string;
    hasPexels: boolean;
    pexelsSource: string;
    hasYouTube?: boolean;
    youtubeSource?: string;
  }>({
    hasGemini: false,
    geminiSource: 'none',
    hasOpenAI: false,
    openAiSource: 'none',
    hasPexels: false,
    pexelsSource: 'none',
    hasYouTube: false,
    youtubeSource: 'none',
  });

  useEffect(() => {
    fetch('/api/user/keys')
      .then((res) => res.json())
      .then((data) => {
        if (data) setKeyStatus(data);
      })
      .catch(() => {});
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      if (channelName !== state.channelName) {
        updateChannelName(channelName);
      }

      const res = await fetch('/api/user/keys', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          geminiKey: geminiKey.trim() || undefined,
          openAiKey: openAiKey.trim() || undefined,
          pexelsKey: pexelsKey.trim() || undefined,
          youtubeKey: youtubeKey.trim() || undefined,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setGeminiKey('');
        setOpenAiKey('');
        setPexelsKey('');
        setYoutubeKey('');
        setSavedSuccess(true);
        setTimeout(() => setSavedSuccess(false), 4000);

        // Refresh key status
        fetch('/api/user/keys')
          .then((r) => r.json())
          .then((d) => setKeyStatus(d))
          .catch(() => {});
      }
    } catch (err) {
      console.error('Failed to save keys:', err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#F8FAFC]">
      <Navbar />

      <main className="flex-1 py-12 sm:py-16">
        <div className="mx-auto max-w-4xl px-5 sm:px-6 lg:px-8 space-y-8">
          <div>
            <h1 className="text-3xl font-black text-slate-900">Creator Settings & API Keys</h1>
            <p className="mt-1 text-sm text-slate-600">
              Manage your channel preferences, modular AI provider keys, and security credentials.
            </p>
          </div>

          {savedSuccess && (
            <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-xs font-bold text-emerald-800 flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
              <span>Settings and credentials encrypted and updated successfully!</span>
            </div>
          )}

          <form onSubmit={handleSave} className="space-y-6">
            {/* Modular AI Providers */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 card-shadow space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Key className="h-4 w-4 text-[#E50914]" />
                  <h2 className="text-lg font-bold text-slate-900">AI Model Provider Configuration (BYOK)</h2>
                </div>
                <span className="inline-flex items-center gap-1 text-[11px] font-mono font-medium text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                  <Lock className="h-3 w-3" />
                  AES-256 Encrypted at Rest
                </span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                By default, SirfShoot AI runs using our built-in multi-agent intelligence server and deterministic tools. You may optionally bring your own personal Google Gemini, OpenAI, or Pexels API keys for zero-latency dedicated quota.
              </p>

              <div className="space-y-4 pt-2">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                      Google Gemini API Key (Optional)
                    </label>
                    {keyStatus.hasGemini && (
                      <span className="text-[10px] font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                        Active ({keyStatus.geminiSource === 'user_byok' ? 'Custom BYOK' : 'Server Default'})
                      </span>
                    )}
                  </div>
                  <input
                    type="password"
                    value={geminiKey}
                    onChange={(e) => setGeminiKey(e.target.value)}
                    placeholder={keyStatus.hasGemini ? "•••••••••••••••••••••••• (Configured — enter new key to overwrite)" : "AIzaSy..."}
                    className="w-full rounded-xl border border-slate-300 p-2.5 font-mono text-xs text-slate-900 focus:border-[#E50914] focus:outline-none"
                  />
                  <span className="text-[10px] text-slate-400">Used for Gemini 2.5 Flash research & scriptwriting fallback chain</span>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                      OpenAI API Key (Optional)
                    </label>
                    {keyStatus.hasOpenAI && (
                      <span className="text-[10px] font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                        Active ({keyStatus.openAiSource === 'user_byok' ? 'Custom BYOK' : 'Server Default'})
                      </span>
                    )}
                  </div>
                  <input
                    type="password"
                    value={openAiKey}
                    onChange={(e) => setOpenAiKey(e.target.value)}
                    placeholder={keyStatus.hasOpenAI ? "•••••••••••••••••••••••• (Configured — enter new key to overwrite)" : "sk-proj-..."}
                    className="w-full rounded-xl border border-slate-300 p-2.5 font-mono text-xs text-slate-900 focus:border-[#E50914] focus:outline-none"
                  />
                  <span className="text-[10px] text-slate-400">Used for GPT-4o synthesis and visual storyboard scenes</span>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                      Pexels API Key (Optional)
                    </label>
                    {keyStatus.hasPexels && (
                      <span className="text-[10px] font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                        Active ({keyStatus.pexelsSource === 'user_byok' ? 'Custom BYOK' : 'Server Default'})
                      </span>
                    )}
                  </div>
                  <input
                    type="password"
                    value={pexelsKey}
                    onChange={(e) => setPexelsKey(e.target.value)}
                    placeholder={keyStatus.hasPexels ? "•••••••••••••••••••••••• (Configured — enter new key to overwrite)" : "Enter Pexels API Key..."}
                    className="w-full rounded-xl border border-slate-300 p-2.5 font-mono text-xs text-slate-900 focus:border-[#E50914] focus:outline-none"
                  />
                  <span className="text-[10px] text-slate-400">Used for automatic stock image downloads per script section</span>
                </div>
              </div>

              <div className="rounded-xl bg-slate-50 border border-slate-200 p-3 text-[11px] text-slate-500 flex items-start gap-2">
                <Shield className="h-4 w-4 text-slate-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Zero Client Exposure:</strong> Your credentials are encrypted on the server with AES-256-GCM. They are never stored in plain text, never saved in localStorage, never logged, and never transmitted back to the browser.
                </span>
              </div>
            </div>

            {/* Channel Preferences */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 card-shadow space-y-4">
              <div className="flex items-center gap-2">
                <Sliders className="h-4 w-4 text-[#E50914]" />
                <h2 className="text-lg font-bold text-slate-900">Channel Identity & Attribution</h2>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                These settings personalize your title branding, video intros, and exported metadata.
              </p>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Default Channel Name
                </label>
                <input
                  type="text"
                  value={channelName}
                  onChange={(e) => setChannelName(e.target.value)}
                  placeholder="e.g. Daily Tech Pakistan"
                  className="w-full rounded-xl border border-slate-300 p-2.5 text-xs text-slate-900 focus:border-[#E50914] focus:outline-none"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="submit"
                disabled={saving}
                className="inline-flex items-center gap-2 rounded-xl bg-[#E50914] hover:bg-[#c90812] px-6 py-2.5 text-xs font-bold text-white shadow-sm transition disabled:opacity-50"
              >
                <Save className="h-4 w-4" />
                <span>{saving ? 'Encrypting & Saving...' : 'Save Settings'}</span>
              </button>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}
