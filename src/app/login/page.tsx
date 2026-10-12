'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useCreatorStore } from '@/lib/store';
import { Sparkles, ArrowRight, CheckCircle2, ShieldCheck, X } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const { loginAsAdmin, loginWithEmail } = useCreatorStore();

  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [channelName, setChannelName] = useState('');
  const [loading, setLoading] = useState(false);
  const [googleModalOpen, setGoogleModalOpen] = useState(false);
  const [customGoogleEmail, setCustomGoogleEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      loginWithEmail(email, name);
      setLoading(false);
      router.push('/dashboard');
    }, 600);
  };

  const handleQuickDemo = () => {
    setLoading(true);
    setTimeout(() => {
      loginWithEmail('creator@sirfshoot.ai', 'Hamza Khan');
      setLoading(false);
      router.push('/dashboard');
    }, 300);
  };

  const handleAdminLogin = () => {
    setLoading(true);
    setTimeout(() => {
      loginAsAdmin();
      setLoading(false);
      router.push('/dashboard');
    }, 400);
  };

  const handleGoogleSelect = (selectedEmail: string, selectedName: string) => {
    setLoading(true);
    setGoogleModalOpen(false);
    setTimeout(() => {
      if (selectedEmail.toLowerCase() === 'llre.uae@gmail.com') {
        loginAsAdmin();
      } else {
        loginWithEmail(selectedEmail, selectedName);
      }
      setLoading(false);
      router.push('/dashboard');
    }, 500);
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#F8FAFC]">
      <Navbar />

      <main className="flex-1 flex items-center justify-center py-14 px-4 sm:px-6">
        <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 rounded-3xl border border-slate-200 bg-white card-shadow overflow-hidden">
          {/* Left Hero Panel */}
          <div className="bg-[#0C0C0F] p-8 sm:p-10 text-white flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <Link href="/" className="inline-flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#E50914] text-white">
                  <Sparkles className="h-4 w-4" />
                </div>
                <span className="font-extrabold text-xl">
                  Sirf<span className="text-[#E50914]">Shoot</span>
                </span>
              </Link>

              <h2 className="text-2xl font-black leading-snug">
                {isSignUp ? 'Start your 7-day free trial.' : 'Welcome back to your Creative Studio.'}
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                The AI Content OS for YouTube creators. Turn 1 video topic into research, tone-cloned scripts, storyboards, thumbnails, and SEO.
              </p>
            </div>

            <div className="space-y-3 pt-6 border-t border-white/10 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                <span>9 specialized AI agents in every project</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                <span>Custom Tone Fingerprint in your exact voice</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                <span>Admin access & multi-channel management</span>
              </div>
            </div>
          </div>

          {/* Right Form Panel */}
          <div className="p-8 sm:p-10 flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-slate-900">
                  {isSignUp ? 'Create your account' : 'Sign in to your account'}
                </h3>
              </div>

              {/* Google Sign In Button */}
              <div className="space-y-3 mb-5">
                <button
                  type="button"
                  onClick={() => setGoogleModalOpen(true)}
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-3 rounded-full border border-slate-300 bg-white py-2.5 px-4 text-xs font-bold text-slate-700 hover:bg-slate-50 transition shadow-xs hover:border-slate-400 active:scale-98"
                >
                  <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                    />
                  </svg>
                  <span>Continue with Google</span>
                </button>
              </div>

              {/* ADMIN ACCOUNT ACCESS PILL */}
              <div className="mb-5 rounded-2xl border border-purple-200 bg-purple-50/70 p-3.5 space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-purple-900">
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck className="h-4 w-4 text-purple-600" />
                    <span>Admin Account</span>
                  </div>
                  <span className="rounded bg-purple-200/80 px-1.5 py-0.5 font-mono text-[10px] text-purple-800 font-bold uppercase">
                    Super Admin
                  </span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-purple-800">
                  <span className="font-mono font-bold">llre.uae@gmail.com</span>
                  <span className="text-[10px] text-purple-600">Studio Tier • 9,999 Credits</span>
                </div>
                <button
                  type="button"
                  onClick={handleAdminLogin}
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-1.5 rounded-xl bg-purple-700 py-2 text-xs font-bold text-white hover:bg-purple-800 transition shadow-xs"
                >
                  <ShieldCheck className="h-3.5 w-3.5" />
                  <span>Sign in as Admin (llre.uae@gmail.com)</span>
                </button>
              </div>

              {/* Demo Creator Access */}
              <div className="mb-5 rounded-xl border border-slate-200 bg-slate-50 p-3 space-y-1.5">
                <div className="text-[11px] font-bold text-slate-700 flex items-center justify-between">
                  <span>🚀 Instant Demo Creator</span>
                  <span className="font-mono text-[10px] text-slate-500">Free Tier</span>
                </div>
                <button
                  type="button"
                  onClick={handleQuickDemo}
                  disabled={loading}
                  className="w-full rounded-lg bg-slate-900 py-1.5 text-xs font-bold text-white hover:bg-slate-800 transition"
                >
                  Continue as Demo Creator →
                </button>
              </div>

              <div className="relative my-4 text-center">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200"></div>
                </div>
                <span className="relative bg-white px-2 text-[10px] uppercase font-bold text-slate-400">
                  Or with email
                </span>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {isSignUp && (
                  <>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Your Name</label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Hamza Khan"
                        className="w-full rounded-xl border border-slate-300 p-2.5 text-xs text-slate-900 focus:border-[#E50914] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Channel Name</label>
                      <input
                        type="text"
                        required
                        value={channelName}
                        onChange={(e) => setChannelName(e.target.value)}
                        placeholder="e.g. Tech Explainer PK"
                        className="w-full rounded-xl border border-slate-300 p-2.5 text-xs text-slate-900 focus:border-[#E50914] focus:outline-none"
                      />
                    </div>
                  </>
                )}

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="creator@channel.com or llre.uae@gmail.com"
                    className="w-full rounded-xl border border-slate-300 p-2.5 text-xs text-slate-900 focus:border-[#E50914] focus:outline-none"
                  />
                  {email.trim().toLowerCase() === 'llre.uae@gmail.com' && (
                    <div className="mt-1 flex items-center gap-1 text-[11px] font-bold text-purple-700">
                      <ShieldCheck className="h-3 w-3" />
                      <span>Admin account detected. Signing in grants Super Admin privileges.</span>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Password</label>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full rounded-xl border border-slate-300 p-2.5 text-xs text-slate-900 focus:border-[#E50914] focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-shadow w-full rounded-full bg-[#E50914] py-3 text-xs font-bold text-white hover:bg-[#B91C1C] transition"
                >
                  {loading
                    ? 'Authenticating...'
                    : email.trim().toLowerCase() === 'llre.uae@gmail.com'
                    ? 'Sign In as Super Admin'
                    : isSignUp
                    ? 'Start Free Trial (7 Days)'
                    : 'Sign In'}
                </button>
              </form>
            </div>

            <div className="text-center text-xs text-slate-500 space-y-2">
              <div>
                {isSignUp ? (
                  <span>
                    Already have an account?{' '}
                    <button
                      type="button"
                      onClick={() => setIsSignUp(false)}
                      className="text-[#E50914] font-bold hover:underline"
                    >
                      Sign in
                    </button>
                  </span>
                ) : (
                  <span>
                    Don&apos;t have an account yet?{' '}
                    <button
                      type="button"
                      onClick={() => setIsSignUp(true)}
                      className="text-[#E50914] font-bold hover:underline"
                    >
                      Start free trial
                    </button>
                  </span>
                )}
              </div>

              <p className="text-[11px] text-slate-400">
                By continuing, you agree to SirfShoot AI&apos;s{' '}
                <Link href="/terms" className="text-slate-600 font-semibold hover:text-[#E50914] underline">
                  Terms
                </Link>
                ,{' '}
                <Link href="/privacy" className="text-slate-600 font-semibold hover:text-[#E50914] underline">
                  Privacy
                </Link>
                , &amp;{' '}
                <Link href="/refund" className="text-slate-600 font-semibold hover:text-[#E50914] underline">
                  Refund Policy
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* GOOGLE SIGN-IN MODAL DIALOG */}
      {googleModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-fadeIn">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2.5">
                <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                  />
                </svg>
                <span className="font-bold text-sm text-slate-800">Sign in with Google</span>
              </div>
              <button
                type="button"
                onClick={() => setGoogleModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 rounded-lg p-1"
                aria-label="Close dialog"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <p className="text-xs text-slate-500">
              Choose a Google account to continue to <strong>SirfShoot AI</strong>:
            </p>

            <div className="space-y-2">
              {/* Option 1: Admin Account */}
              <button
                type="button"
                onClick={() => handleGoogleSelect('llre.uae@gmail.com', 'LLRE UAE Admin')}
                className="w-full flex items-center justify-between p-3 rounded-xl border-2 border-purple-300 bg-purple-50/60 hover:bg-purple-100/70 transition text-left group"
              >
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-full bg-purple-600 text-white font-bold flex items-center justify-center text-xs shadow-xs">
                    LL
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                      <span>LLRE UAE</span>
                      <span className="rounded bg-purple-200 px-1.5 py-0.2 text-[9px] font-bold text-purple-800 uppercase">
                        Admin
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-600 font-mono">llre.uae@gmail.com</div>
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 text-purple-600 transition group-hover:translate-x-0.5" />
              </button>

              {/* Option 2: Demo Creator Account */}
              <button
                type="button"
                onClick={() => handleGoogleSelect('creator@sirfshoot.ai', 'Hamza Khan')}
                className="w-full flex items-center justify-between p-3 rounded-xl border border-slate-200 hover:bg-slate-50 transition text-left group"
              >
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-full bg-slate-900 text-white font-bold flex items-center justify-center text-xs">
                    HK
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900">Hamza Khan (Creator)</div>
                    <div className="text-[11px] text-slate-500 font-mono">creator@sirfshoot.ai</div>
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 text-slate-400 transition group-hover:translate-x-0.5" />
              </button>
            </div>

            {/* Custom Google Email input */}
            <div className="pt-2 border-t border-slate-100 space-y-2">
              <label className="block text-[11px] font-bold text-slate-600">
                Or sign in with another Google account:
              </label>
              <div className="flex gap-2">
                <input
                  type="email"
                  value={customGoogleEmail}
                  onChange={(e) => setCustomGoogleEmail(e.target.value)}
                  placeholder="name@gmail.com"
                  className="flex-1 rounded-xl border border-slate-300 px-3 py-1.5 text-xs text-slate-900 focus:border-[#E50914] focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => {
                    if (customGoogleEmail.trim()) {
                      handleGoogleSelect(customGoogleEmail, customGoogleEmail.split('@')[0]);
                    }
                  }}
                  disabled={!customGoogleEmail.trim()}
                  className="rounded-xl bg-[#E50914] px-3.5 py-1.5 text-xs font-bold text-white hover:bg-[#B91C1C] transition disabled:opacity-50"
                >
                  Continue
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
