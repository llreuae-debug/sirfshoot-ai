'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Wrench,
  ArrowLeft,
  ShieldCheck,
  Lock,
  CheckCircle2,
  AlertTriangle,
  Play,
  RotateCcw,
  Check,
  X,
  FileCheck,
} from 'lucide-react';
import AdminLayout from '@/components/AdminLayout';
import { useGuardianStore } from '@/lib/guardian-store';
import { AllowlistedRepairAction } from '@/lib/guardian-types';

export default function GuardianRepairsPage() {
  const { data, executeRepair } = useGuardianStore();
  const [selectedAction, setSelectedAction] = useState<AllowlistedRepairAction | null>(null);
  const [executionResult, setExecutionResult] = useState<{
    success: boolean;
    message: string;
    actionName: string;
  } | null>(null);

  const handleExecute = (action: AllowlistedRepairAction) => {
    const res = executeRepair('INC-MANUAL', action.id);
    setExecutionResult({
      success: res.success,
      message: res.message,
      actionName: action.name,
    });
    setSelectedAction(null);
  };

  const getTierBadge = (tier: string) => {
    switch (tier) {
      case 'tier1_automatic':
        return (
          <span className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase bg-emerald-50 text-emerald-700 border border-emerald-200">
            Tier 1 · Autonomous Safe
          </span>
        );
      case 'tier2_approval_required':
        return (
          <span className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase bg-amber-50 text-amber-700 border border-amber-200">
            Tier 2 · Approval Required
          </span>
        );
      case 'tier3_restricted':
        return (
          <span className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase bg-red-100 text-red-800 border border-red-300">
            Tier 3 · Permanently Blocked
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <AdminLayout
      title="Self-Healing Repairs & Action Allowlist"
      subtitle="Strictly constrained autonomous recovery operations, pre-condition checks, post-repair verification, and rollback procedures."
      action={
        <Link
          href="/admin/guardian"
          className="px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 bg-white hover:bg-slate-50 flex items-center gap-1.5 transition"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Guardian Command Center</span>
        </Link>
      }
    >
      {executionResult && (
        <div
          className={`p-4 rounded-2xl text-xs font-bold flex items-start gap-3 animate-in fade-in ${
            executionResult.success
              ? 'bg-emerald-50 border border-emerald-200 text-emerald-900'
              : 'bg-rose-50 border border-rose-200 text-rose-900'
          }`}
        >
          {executionResult.success ? (
            <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
          ) : (
            <AlertTriangle className="h-5 w-5 text-rose-600 shrink-0 mt-0.5" />
          )}
          <div>
            <span className="block font-black text-sm">{executionResult.actionName}</span>
            <p className="mt-0.5 font-normal">{executionResult.message}</p>
          </div>
        </div>
      )}

      {/* Safety Policy Banner */}
      <div className="bg-[#071B3A] text-white rounded-3xl p-6 border border-white/10 shadow-lg space-y-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-purple-500/20 text-purple-400 border border-purple-500/30 flex items-center justify-center font-bold">
            <Lock className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-black text-white text-base">Allowlisted Self-Healing Invariants</h3>
            <p className="text-xs text-slate-300">
              The AI agent is never granted arbitrary shell or database access. Every operation must match a pre-tested allowlisted template.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2 border-t border-white/10 text-xs">
          <div className="p-3 bg-white/5 rounded-2xl border border-white/5 space-y-1">
            <span className="font-bold text-emerald-400 text-[11px] uppercase tracking-wider block">
              Tier 1: Safe Autonomous
            </span>
            <p className="text-slate-300 text-[11px]">
              Reversible recovery operations (cache rehydration, circuit breaker resets, queue retries) execute automatically.
            </p>
          </div>
          <div className="p-3 bg-white/5 rounded-2xl border border-white/5 space-y-1">
            <span className="font-bold text-[#FFD900] text-[11px] uppercase tracking-wider block">
              Tier 2: Approval Required
            </span>
            <p className="text-slate-300 text-[11px]">
              Connection pool resets and schema integrity migrations require explicit administrator confirmation signatures.
            </p>
          </div>
          <div className="p-3 bg-white/5 rounded-2xl border border-white/5 space-y-1">
            <span className="font-bold text-rose-400 text-[11px] uppercase tracking-wider block">
              Tier 3: Permanently Restricted
            </span>
            <p className="text-slate-300 text-[11px]">
              Destructive database wipes, user deletion, or ledger record purges are unconditionally rejected.
            </p>
          </div>
        </div>
      </div>

      {/* Actions Directory */}
      <div className="space-y-4">
        {data.repairActions.map((action) => (
          <div
            key={action.id}
            className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4 hover:border-slate-300 transition"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2.5">
                  <h4 className="font-black text-slate-900 text-base">{action.name}</h4>
                  {getTierBadge(action.tier)}
                </div>
                <p className="text-xs text-slate-500">{action.description}</p>
              </div>

              <div className="shrink-0">
                {action.tier !== 'tier3_restricted' ? (
                  <button
                    type="button"
                    onClick={() => setSelectedAction(action)}
                    className="btn-3d-yellow px-4 py-2.5 rounded-xl text-xs font-black text-[#071B3A] flex items-center gap-1.5 cursor-pointer shadow-md"
                  >
                    <Play className="h-3.5 w-3.5 fill-current" />
                    <span>Run Verification Action</span>
                  </button>
                ) : (
                  <span className="px-3 py-2 rounded-xl text-xs font-bold bg-slate-100 text-slate-400 flex items-center gap-1.5 cursor-not-allowed">
                    <Lock className="h-3.5 w-3.5" />
                    <span>Forbidden Action</span>
                  </span>
                )}
              </div>
            </div>

            {/* Technical Constraints Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-3 border-t border-slate-100 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl space-y-1">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Preconditions</span>
                <ul className="text-slate-700 space-y-0.5 text-[11px]">
                  {action.preconditions.map((p, i) => (
                    <li key={i} className="flex items-start gap-1">
                      <span className="text-slate-400">•</span>
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl space-y-1">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Verification Procedure</span>
                <p className="text-slate-700 text-[11px]">{action.verificationProcedure}</p>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl space-y-1">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Rollback Strategy</span>
                <p className="text-slate-700 text-[11px]">{action.rollbackProcedure}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Confirmation Modal */}
      {selectedAction && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full border border-slate-200 shadow-2xl p-6 space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-black text-slate-900 text-base">Confirm Recovery Action</h3>
              <button
                type="button"
                onClick={() => setSelectedAction(null)}
                className="p-1 rounded text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-2 text-xs">
              <p className="text-slate-700 leading-relaxed font-medium">
                Are you sure you want to execute <strong>{selectedAction.name}</strong>?
              </p>
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-amber-900 leading-relaxed">
                <strong>Post-Action Verification:</strong> Guardian AI will immediately run verification checks. If failure occurs, rollback procedure will be engaged automatically.
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setSelectedAction(null)}
                className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => handleExecute(selectedAction)}
                className="btn-3d-yellow px-5 py-2 rounded-xl text-xs font-black text-[#071B3A] cursor-pointer"
              >
                Execute & Verify
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
