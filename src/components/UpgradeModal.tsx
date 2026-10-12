'use client';

import React from 'react';
import Link from 'next/link';
import { Crown, Check, X, Zap } from 'lucide-react';
import { useCreatorStore } from '@/lib/store';

interface UpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  toolName?: string;
}

export default function UpgradeModal({ isOpen, onClose, toolName }: UpgradeModalProps) {
  const { state, loginAsAdmin } = useCreatorStore();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        role="button"
        tabIndex={0}
        onClick={onClose}
        onKeyDown={(e) => {
          if (e.key === 'Escape') onClose();
        }}
        className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity animate-in fade-in"
        aria-label="Close dialog"
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-md rounded-3xl border border-amber-200/60 bg-gradient-to-b from-white to-amber-50/40 p-6 sm:p-8 shadow-2xl animate-in zoom-in-95 duration-200">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="text-center space-y-3">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 text-white shadow-lg shadow-amber-500/30">
            <Crown className="h-7 w-7" />
          </div>

          <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Premium Studio Feature
          </h3>

          <p className="text-sm text-slate-600 leading-relaxed">
            {toolName ? (
              <>The <strong className="text-slate-900">{toolName}</strong> tool is an exclusive feature for PRO and Studio VIP members.</>
            ) : (
              <>Unlock advanced AI valuation, neural voiceovers, automated video renders, and mortgage simulators.</>
            )}
          </p>
        </div>

        {/* Feature bullets */}
        <div className="my-6 rounded-2xl border border-amber-200/50 bg-white/80 p-4 space-y-2.5 text-xs text-slate-700 font-medium">
          <div className="flex items-center gap-2">
            <Check className="h-4 w-4 text-emerald-600 shrink-0" />
            <span>Automated AI Multi-Scene Video Generator</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="h-4 w-4 text-emerald-600 shrink-0" />
            <span>Neural AI voiceovers with +100 personas and voice cloning</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="h-4 w-4 text-emerald-600 shrink-0" />
            <span>AI Property Valuation & comparative market analysis</span>
          </div>
          <div className="flex items-center gap-2">
            <Check className="h-4 w-4 text-emerald-600 shrink-0" />
            <span>Leads CRM pipeline with instant WhatsApp messaging</span>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-2.5">
          <Link
            href="/planos"
            onClick={onClose}
            className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 text-sm font-extrabold text-white shadow-lg shadow-amber-500/25 hover:opacity-95 transition"
          >
            <Zap className="h-4 w-4 fill-white" />
            <span>Explore Plans & Unlock Access</span>
          </Link>

          {state.email !== 'llre.uae@gmail.com' && (
            <button
              type="button"
              onClick={() => {
                loginAsAdmin();
                onClose();
              }}
              className="w-full py-2 text-xs font-bold text-slate-500 hover:text-purple-700 transition"
            >
              Activate Developer VIP Access (Admin Mode)
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
