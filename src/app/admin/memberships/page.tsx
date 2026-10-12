'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  CreditCard,
  Edit2,
  Users,
  CheckCircle2,
  AlertCircle,
  Plus,
  Shield,
  Coins,
  FileSpreadsheet,
  X,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import AdminLayout from '@/components/AdminLayout';
import { useAdminStore } from '@/lib/admin-store';
import { MembershipPlan, PlanType } from '@/lib/types';

export default function MembershipsAdminPage() {
  const { data, updatePlan, updateMember } = useAdminStore();
  const [editingPlan, setEditingPlan] = useState<MembershipPlan | null>(null);
  const [assignModalOpen, setAssignModalOpen] = useState(false);
  const [assignForm, setAssignForm] = useState({
    memberId: data.members[0]?.id || '',
    newPlan: 'creator' as PlanType,
    reason: 'Upgraded after consultation',
  });

  // Calculate MRR/ARR per plan
  const planStats = data.plans.map((p) => {
    const subscriberCount = data.members.filter((m) => m.plan === p.id).length;
    const monthlyRevenue = subscriberCount * p.pricePKR;
    return {
      ...p,
      realSubscribers: subscriberCount,
      monthlyRevenue,
    };
  });

  const totalMonthlyRunRate = planStats.reduce((sum, p) => sum + p.monthlyRevenue, 0);

  const handleEditPlanSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPlan) return;

    updatePlan(editingPlan.id, {
      name: editingPlan.name,
      pricePKR: Number(editingPlan.pricePKR),
      includedScripts: Number(editingPlan.includedScripts),
      includedCredits: Number(editingPlan.includedCredits),
      status: editingPlan.status,
      features: editingPlan.features,
    });

    setEditingPlan(null);
  };

  const handleAssignPlanSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const targetMember = data.members.find((m) => m.id === assignForm.memberId);
    if (!targetMember) return;

    updateMember(targetMember.id, {
      plan: assignForm.newPlan,
      notes: `${targetMember.notes ? targetMember.notes + ' | ' : ''}Plan assigned to ${assignForm.newPlan}: ${assignForm.reason}`,
    });

    setAssignModalOpen(false);
    alert(`Successfully assigned ${assignForm.newPlan.toUpperCase()} tier to ${targetMember.name}.`);
  };

  return (
    <AdminLayout
      title="Plans & Membership Control"
      subtitle="SaaS tier pricing, included credits allocation, feature entitlements, and active subscriber distribution."
      action={
        <button
          type="button"
          onClick={() => setAssignModalOpen(true)}
          className="btn-3d-yellow px-4 py-2.5 rounded-xl text-xs font-black text-[#071B3A] flex items-center gap-2 cursor-pointer shadow-md"
        >
          <CreditCard className="h-4 w-4" />
          <span>Assign Membership Plan</span>
        </button>
      }
    >
      {/* Top MRR Summary Bar */}
      <div className="bg-[#071B3A] text-white rounded-3xl p-6 border border-white/10 shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <span className="text-xs uppercase font-black text-[#FFD900] tracking-wider">
            Verified Recurring Revenue
          </span>
          <div className="text-3xl font-black font-mono tracking-tight text-white mt-1">
            PKR {totalMonthlyRunRate.toLocaleString()}
            <span className="text-xs text-slate-400 font-sans font-normal ml-2">/ month (MRR)</span>
          </div>
          <p className="text-xs text-slate-300 mt-1">
            Calculated across {data.members.length} registered member accounts.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/admin/ledger"
            className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold text-white transition flex items-center gap-2"
          >
            <FileSpreadsheet className="h-4 w-4" />
            <span>View Verified Ledger</span>
          </Link>
          <button
            type="button"
            onClick={() => setAssignModalOpen(true)}
            className="btn-3d-yellow px-4 py-2.5 rounded-xl text-xs font-black text-[#071B3A] cursor-pointer"
          >
            Assign Member
          </button>
        </div>
      </div>

      {/* Plan Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {planStats.map((plan) => (
          <div
            key={plan.id}
            className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col justify-between hover:shadow-md transition"
          >
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <span
                    className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase mb-1 ${
                      plan.status === 'active'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {plan.status}
                  </span>
                  <h3 className="font-black text-slate-900 text-lg">{plan.name}</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setEditingPlan(plan)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition cursor-pointer"
                  title="Edit Plan"
                >
                  <Edit2 className="h-4 w-4" />
                </button>
              </div>

              {/* Price & Cadence */}
              <div className="py-2 border-y border-slate-100">
                <div className="text-2xl font-black font-mono text-[#071B3A]">
                  PKR {plan.pricePKR.toLocaleString()}
                  <span className="text-xs font-sans text-slate-400 font-normal">
                    {' '}
                    / {plan.billingInterval}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-xs text-slate-500 mt-1">
                  <span>{plan.includedCredits} monthly credits</span>
                  <span>•</span>
                  <span>{plan.includedScripts} video scripts</span>
                </div>
              </div>

              {/* Subscribers stat */}
              <div className="flex items-center justify-between text-xs py-1">
                <span className="text-slate-500 font-medium flex items-center gap-1.5">
                  <Users className="h-3.5 w-3.5 text-slate-400" /> Active Subscribers
                </span>
                <span className="font-bold text-slate-900">{plan.realSubscribers} members</span>
              </div>

              {/* Features list */}
              <div className="space-y-1.5 pt-2">
                <span className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">
                  Entitlements
                </span>
                <ul className="space-y-1 text-xs text-slate-600">
                  {plan.features.map((feat, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-100 mt-4">
              <button
                type="button"
                onClick={() => {
                  setAssignForm({
                    memberId: data.members[0]?.id || '',
                    newPlan: plan.id as PlanType,
                    reason: `Administrative assignment to ${plan.name}`,
                  });
                  setAssignModalOpen(true);
                }}
                className="w-full py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 flex items-center justify-center gap-1.5 transition cursor-pointer"
              >
                <span>Assign to Member</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Plan Modal */}
      {editingPlan && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full border border-slate-200 shadow-2xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-black text-slate-900 text-base">Edit Plan: {editingPlan.name}</h3>
              <button
                type="button"
                onClick={() => setEditingPlan(null)}
                className="p-1 rounded text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleEditPlanSubmit} className="space-y-4 text-xs font-medium">
              <div>
                <label className="block text-slate-700 font-bold mb-1">Plan Display Name</label>
                <input
                  type="text"
                  required
                  value={editingPlan.name}
                  onChange={(e) => setEditingPlan({ ...editingPlan, name: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Price (PKR)</label>
                  <input
                    type="number"
                    min="0"
                    required
                    value={editingPlan.pricePKR}
                    onChange={(e) =>
                      setEditingPlan({ ...editingPlan, pricePKR: Number(e.target.value) })
                    }
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Monthly Credits</label>
                  <input
                    type="number"
                    min="0"
                    required
                    value={editingPlan.includedCredits}
                    onChange={(e) =>
                      setEditingPlan({ ...editingPlan, includedCredits: Number(e.target.value) })
                    }
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Plan Status</label>
                <select
                  value={editingPlan.status}
                  onChange={(e) =>
                    setEditingPlan({ ...editingPlan, status: e.target.value as 'active' | 'inactive' })
                  }
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                >
                  <option value="active">Active (Available for subscription)</option>
                  <option value="inactive">Inactive (Grandfathered only)</option>
                </select>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-[11px] text-amber-900 leading-relaxed">
                <strong>Safety Policy:</strong> Price modifications only take effect on new subscription cycles or newly subscribed accounts. Existing members retain their established rate.
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingPlan(null)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-3d-yellow px-4 py-2 rounded-xl text-[#071B3A] font-black cursor-pointer"
                >
                  Save Plan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Assign Plan Modal */}
      {assignModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full border border-slate-200 shadow-2xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-black text-slate-900 text-base">Assign Membership Plan</h3>
              <button
                type="button"
                onClick={() => setAssignModalOpen(false)}
                className="p-1 rounded text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleAssignPlanSubmit} className="space-y-4 text-xs font-medium">
              <div>
                <label className="block text-slate-700 font-bold mb-1">Target Member</label>
                <select
                  value={assignForm.memberId}
                  onChange={(e) => setAssignForm({ ...assignForm, memberId: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                >
                  {data.members.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.name} ({m.email}) — Currently {m.plan}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Target Plan Tier</label>
                <select
                  value={assignForm.newPlan}
                  onChange={(e) =>
                    setAssignForm({ ...assignForm, newPlan: e.target.value as PlanType })
                  }
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl uppercase font-bold"
                >
                  <option value="trial">Trial Plan (0 PKR)</option>
                  <option value="starter">Starter Plan (499 PKR)</option>
                  <option value="creator">Creator Plan (999 PKR)</option>
                  <option value="pro">Pro Studio Plan (1,999 PKR)</option>
                  <option value="studio">Enterprise Studio (4,999 PKR)</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">
                  Reason for Assignment <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={assignForm.reason}
                  onChange={(e) => setAssignForm({ ...assignForm, reason: e.target.value })}
                  placeholder="e.g. VIP promotional partner upgrade"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setAssignModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-3d-yellow px-4 py-2 rounded-xl text-[#071B3A] font-black cursor-pointer"
                >
                  Confirm Assignment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
