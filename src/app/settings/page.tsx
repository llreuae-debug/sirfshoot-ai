'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useCreatorStore } from '@/lib/store';
import { Key, Shield, Sliders, CheckCircle2, User, Zap, Save } from 'lucide-react';

export default function SettingsPage() {
  const { state } = useCreatorStore();

  const [geminiKey, setGeminiKey] = useState('');
  const [openAiKey, setOpenAiKey] = useState('');
  const [channelName, setChannelName] = useState(state.channelName);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#F8FAFC]">
      <Navbar />

      <main className="flex-1 py-12 sm:py-16">
        <div className="mx-auto max-w-4xl px-5 sm:px-6 lg:px-8 space-y-8">
          <div>
            <h1 className="text-3xl font-black text-slate-900">Creator Settings & API Keys</h1>
            <p className="mt-1 text-sm text-slate-600">
              Manage your channel preferences, modular AI provider keys, and subscription details.
            </p>
          </div>

          {savedSuccess && (
            <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-xs font-bold text-emerald-800 flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
              <span>Settings and credentials updated successfully!</span>
            </div>
          )}

          <form onSubmit={handleSave} className="space-y-6">
            {/* Modular AI Providers */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 card-shadow space-y-4">
              <div className="flex items-center gap-2">
                <Key className="h-4 w-4 text-[#E50914]" />
                <h2 className="text-lg font-bold text-slate-900">AI Model Provider Configuration</h2>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                By default, SirfShoot runs using our built-in multi-agent intelligence server. You may optionally provide your own personal Google Gemini or OpenAI API keys for direct zero-latency quota usage.
              </p>

              <div className="space-y-4 pt-2">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Google Gemini API Key (Optional)
                  </label>
                  <input
                    type="password"
                    value={geminiKey}
                    onChange={(e) => setGeminiKey(e.target.value)}
                    placeholder="AIzaSy..."
                    className="w-full rounded-xl border border-slate-300 p-2.5 font-mono text-xs text-slate-900 focus:border-[#E50914] focus:outline-none"
                  />
                  <span className="text-[10px] text-slate-400">Used for fast multimodal thumbnail and script processing</span>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    OpenAI API Key (Optional)
                  </label>
                  <input
                    type="password"
                    value={openAiKey}
                    onChange={(e) => setOpenAiKey(e.target.value)}
                    placeholder="sk-proj-..."
                    className="w-full rounded-xl border border-slate-300 p-2.5 font-mono text-xs text-slate-900 focus:border-[#E50914] focus:outline-none"
                  />
                  <span className="text-[10px] text-slate-400">Used for DALL-E thumbnail prompts & GPT-4o synthesis</span>
                </div>
              </div>
            </div>

            {/* Channel Profile */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 card-shadow space-y-4">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-[#E50914]" />
                <h2 className="text-lg font-bold text-slate-900">Channel & Creator Profile</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Creator Name
                  </label>
                  <input
                    type="text"
                    defaultValue={state.name}
                    className="w-full rounded-xl border border-slate-300 p-2.5 text-xs text-slate-900 focus:border-[#E50914] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Account Email
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      disabled
                      value={state.email}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs text-slate-600 font-mono"
                    />
                    {state.role === 'admin' && (
                      <span className="rounded bg-purple-100 border border-purple-200 px-2 py-1 text-[10px] font-bold text-purple-700 uppercase">
                        Admin
                      </span>
                    )}
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Primary YouTube Channel
                  </label>
                  <input
                    type="text"
                    value={channelName}
                    onChange={(e) => setChannelName(e.target.value)}
                    className="w-full rounded-xl border border-slate-300 p-2.5 text-xs text-slate-900 focus:border-[#E50914] focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Subscription Info */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 card-shadow space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-base text-slate-900">Current Plan: {state.plan.toUpperCase()}</h3>
                  <p className="text-xs text-slate-500">
                    {state.creditsRemaining} of {state.creditsTotal} video generation credits remaining.
                  </p>
                </div>
                <button
                  type="button"
                  className="rounded-lg border border-slate-300 bg-slate-50 px-3 py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-100"
                >
                  Manage Billing
                </button>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="btn-shadow inline-flex items-center gap-2 rounded-full bg-[#E50914] px-6 py-2.5 text-xs font-bold text-white hover:bg-[#B91C1C] transition"
              >
                <Save className="h-4 w-4" />
                <span>Save Settings</span>
              </button>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}
