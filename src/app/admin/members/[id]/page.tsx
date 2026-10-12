'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import {
  ArrowLeft,
  Users,
  Shield,
  Coins,
  CreditCard,
  FileSpreadsheet,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Ban,
  Calendar,
  Mail,
  Edit2,
  Trash2,
  X,
  History,
  AlertCircle,
} from 'lucide-react';
import AdminLayout from '@/components/AdminLayout';
import { useAdminStore } from '@/lib/admin-store';
import { MembershipStatus, PlanType, AdminRole } from '@/lib/types';

function MemberDetailContent() {
  const params = useParams();
  const memberId = (params?.id as string) || '';
  const router = useRouter();

  const {
    data,
    updateMember,
    setMemberStatus,
    adjustMemberCredits,
  } = useAdminStore();

  const member = data.members.find((m) => m.id === memberId);

  // Modals state
  const [isAdjustCreditsOpen, setIsAdjustCreditsOpen] = useState(false);
  const [creditDelta, setCreditDelta] = useState(5);
  const [creditReason, setCreditReason] = useState('');

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editForm, setEditForm] = useState({
    name: member?.name || '',
    plan: (member?.plan || 'creator') as PlanType,
    role: (member?.role || 'creator') as AdminRole,
    notes: member?.notes || '',
  });

  if (!member) {
    return (
      <AdminLayout title="Member Not Found" subtitle="Requested member record does not exist in the platform registry.">
        <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center max-w-md mx-auto space-y-4">
          <AlertCircle className="h-10 w-10 text-rose-500 mx-auto" />
          <h3 className="font-bold text-slate-900 text-lg">Member Not Found</h3>
          <p className="text-xs text-slate-500">
            No member record exists with ID <code className="font-mono text-slate-800">{memberId}</code>.
          </p>
          <Link
            href="/admin/members"
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#071B3A] text-white rounded-xl text-xs font-bold hover:bg-slate-800"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Return to Member Directory</span>
          </Link>
        </div>
      </AdminLayout>
    );
  }

  // Filter member-specific ledger & audit logs
  const memberLedger = data.ledger.filter((tx) => tx.memberId === member.id || tx.memberEmail === member.email);
  const memberAuditLogs = data.auditLogs.filter((log) => log.targetId === member.id);

  const handleAdjustCredits = (e: React.FormEvent) => {
    e.preventDefault();
    if (!creditReason.trim()) {
      alert('A valid operational reason is required for auditable credit adjustments.');
      return;
    }
    adjustMemberCredits(member.id, Number(creditDelta), creditReason.trim());
    setIsAdjustCreditsOpen(false);
    setCreditReason('');
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateMember(member.id, {
      name: editForm.name,
      plan: editForm.plan,
      role: editForm.role,
      notes: editForm.notes,
    });
    setIsEditModalOpen(false);
  };

  return (
    <AdminLayout
      title={member.name}
      subtitle={`Member Account: ${member.email} • ID: ${member.id}`}
      action={
        <div className="flex items-center gap-2">
          <Link
            href="/admin/members"
            className="px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 bg-white hover:bg-slate-50 flex items-center gap-1.5 transition"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Back to Members</span>
          </Link>
          <button
            type="button"
            onClick={() => {
              setEditForm({
                name: member.name,
                plan: member.plan,
                role: member.role,
                notes: member.notes || '',
              });
              setIsEditModalOpen(true);
            }}
            className="px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 bg-white hover:bg-slate-50 flex items-center gap-1.5 transition cursor-pointer"
          >
            <Edit2 className="h-3.5 w-3.5" />
            <span>Edit Profile</span>
          </button>
          <button
            type="button"
            onClick={() => setIsAdjustCreditsOpen(true)}
            className="btn-3d-yellow px-4 py-2 rounded-xl text-xs font-black text-[#071B3A] flex items-center gap-1.5 cursor-pointer shadow-sm"
          >
            <Coins className="h-3.5 w-3.5" />
            <span>Adjust Credits</span>
          </button>
        </div>
      }
    >
      {/* Top Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Profile Card */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-2xl bg-[#071B3A] text-white flex items-center justify-center font-black text-base shrink-0">
              {member.name.slice(0, 2).toUpperCase()}
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-black text-slate-900 text-base">{member.name}</h3>
                {member.role === 'super_admin' && <Shield className="h-4 w-4 text-purple-600" />}
              </div>
              <p className="text-xs text-slate-500 font-mono">{member.email}</p>
            </div>
          </div>

          <div className="space-y-2 pt-2 border-t border-slate-100 text-xs">
            <div className="flex justify-between py-1">
              <span className="text-slate-500">Account Status</span>
              <span className="font-bold capitalize text-slate-900">{member.membershipStatus}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-slate-500">Role</span>
              <span className="font-bold capitalize text-slate-900">{member.role.replace('_', ' ')}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-slate-500">Member Since</span>
              <span className="font-mono font-medium text-slate-700">
                {new Date(member.createdAt).toLocaleDateString()}
              </span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-slate-500">Last Active</span>
              <span className="font-mono font-medium text-slate-700">
                {member.lastActiveAt ? new Date(member.lastActiveAt).toLocaleString() : 'Never'}
              </span>
            </div>
          </div>

          {member.notes && (
            <div className="pt-2 border-t border-slate-100">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                Admin Notes
              </span>
              <p className="text-xs text-slate-600 italic bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                &ldquo;{member.notes}&rdquo;
              </p>
            </div>
          )}
        </div>

        {/* Subscription & Tier Card */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-blue-600" />
              <h3 className="font-black text-slate-900 text-sm">Subscription Tier</h3>
            </div>
            <span className="text-xs font-bold px-2.5 py-1 bg-blue-50 text-blue-700 rounded-lg capitalize border border-blue-200">
              {member.plan} Plan
            </span>
          </div>

          <div className="space-y-2 pt-2 text-xs">
            <div className="flex justify-between py-1">
              <span className="text-slate-500">Billing Cadence</span>
              <span className="font-bold capitalize text-slate-900">{member.billingInterval}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-slate-500">Total Spent (PKR)</span>
              <span className="font-mono font-bold text-slate-900">
                PKR {member.totalSpentPKR.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-slate-500">Subscribed At</span>
              <span className="font-mono font-medium text-slate-700">
                {member.subscriptionStartedAt
                  ? new Date(member.subscriptionStartedAt).toLocaleDateString()
                  : 'N/A'}
              </span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-slate-500">Renewal / Expiry</span>
              <span className="font-mono font-medium text-slate-700">
                {member.subscriptionExpiresAt
                  ? new Date(member.subscriptionExpiresAt).toLocaleDateString()
                  : 'Never'}
              </span>
            </div>
          </div>
        </div>

        {/* Credits Balance Card */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Coins className="h-5 w-5 text-amber-500" />
              <h3 className="font-black text-slate-900 text-sm">Credit Balance</h3>
            </div>
            <span className="text-xs font-bold px-2.5 py-1 bg-amber-50 text-amber-800 rounded-lg border border-amber-200">
              Internal Token
            </span>
          </div>

          <div className="py-2 text-center">
            <div className="font-black text-4xl text-[#071B3A] font-mono tracking-tight">
              {member.creditsRemaining}
            </div>
            <p className="text-xs text-slate-500 mt-1 font-medium">
              of {member.creditsTotal} lifetime total credits granted
            </p>
          </div>

          <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
            <button
              type="button"
              onClick={() => setIsAdjustCreditsOpen(true)}
              className="w-full btn-3d-yellow py-2 rounded-xl text-xs font-black text-[#071B3A] flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Coins className="h-3.5 w-3.5" />
              <span>Modify Balance</span>
            </button>
          </div>
        </div>
      </div>

      {/* Member Transaction Ledger */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm space-y-0">
        <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-2">
            <FileSpreadsheet className="h-4 w-4 text-slate-600" />
            <h3 className="font-black text-slate-900 text-sm">Ledger Activity History</h3>
          </div>
          <span className="text-xs text-slate-500 font-medium">
            {memberLedger.length} recorded events
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50/80 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-3 px-4">TX ID</th>
                <th className="py-3 px-4">Timestamp</th>
                <th className="py-3 px-4">Type</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4 text-center">Credit Change</th>
                <th className="py-3 px-4 text-right">Monetary (PKR)</th>
                <th className="py-3 px-4">Description / Reason</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
              {memberLedger.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-400">
                    No ledger transactions recorded for this member.
                  </td>
                </tr>
              ) : (
                memberLedger.map((tx) => (
                  <tr key={tx.id} className="hover:bg-slate-50/70">
                    <td className="py-3 px-4 font-mono text-[11px] text-slate-500">{tx.id}</td>
                    <td className="py-3 px-4 text-slate-500 text-[11px]">
                      {new Date(tx.timestamp).toLocaleString()}
                    </td>
                    <td className="py-3 px-4 font-bold capitalize text-slate-900">{tx.type}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                          tx.category === 'financial'
                            ? 'bg-blue-50 text-blue-700'
                            : 'bg-amber-50 text-amber-700'
                        }`}
                      >
                        {tx.category}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center font-mono font-bold">
                      {tx.amountCredits !== undefined ? (
                        <span className={tx.amountCredits >= 0 ? 'text-emerald-600' : 'text-rose-600'}>
                          {tx.amountCredits > 0 ? `+${tx.amountCredits}` : tx.amountCredits}
                        </span>
                      ) : (
                        '-'
                      )}
                    </td>
                    <td className="py-3 px-4 text-right font-mono font-bold text-slate-900">
                      {tx.amountPKR ? `PKR ${tx.amountPKR.toLocaleString()}` : '-'}
                    </td>
                    <td className="py-3 px-4 text-slate-600">{tx.reason || tx.description}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Member Audit Events */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
        <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-2">
            <History className="h-4 w-4 text-slate-600" />
            <h3 className="font-black text-slate-900 text-sm">Administrative Audit Trail</h3>
          </div>
          <span className="text-xs text-slate-500 font-medium">
            {memberAuditLogs.length} audit logs
          </span>
        </div>

        <div className="divide-y divide-slate-100 p-4 space-y-3">
          {memberAuditLogs.length === 0 ? (
            <p className="text-center text-xs text-slate-400 py-4">No audit events recorded.</p>
          ) : (
            memberAuditLogs.map((log) => (
              <div key={log.id} className="pt-2 text-xs flex items-start justify-between gap-4">
                <div>
                  <div className="font-bold text-slate-900 flex items-center gap-2">
                    <span className="font-mono text-purple-700 bg-purple-50 px-2 py-0.5 rounded text-[10px]">
                      {log.action}
                    </span>
                    <span>{log.details}</span>
                  </div>
                  {log.reason && (
                    <p className="text-slate-500 text-[11px] mt-0.5 italic">Reason: &ldquo;{log.reason}&rdquo;</p>
                  )}
                </div>
                <div className="text-right text-[11px] text-slate-400 shrink-0">
                  <div>{log.adminEmail}</div>
                  <div>{new Date(log.timestamp).toLocaleTimeString()}</div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Adjust Credits Modal */}
      {isAdjustCreditsOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full border border-slate-200 shadow-2xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-black text-slate-900 text-base">Adjust Credits</h3>
              <button
                type="button"
                onClick={() => setIsAdjustCreditsOpen(false)}
                className="p-1 rounded text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <form onSubmit={handleAdjustCredits} className="space-y-4 text-xs font-medium">
              <div>
                <label className="block text-slate-700 font-bold mb-1">Delta (add or subtract)</label>
                <input
                  type="number"
                  required
                  value={creditDelta}
                  onChange={(e) => setCreditDelta(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono text-sm font-bold"
                />
              </div>
              <div>
                <label className="block text-slate-700 font-bold mb-1">
                  Audit Reason <span className="text-red-500">*</span>
                </label>
                <textarea
                  required
                  rows={2}
                  value={creditReason}
                  onChange={(e) => setCreditReason(e.target.value)}
                  placeholder="e.g. VIP onboarding gift approved by admin"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAdjustCreditsOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-3d-yellow px-4 py-2 rounded-xl text-[#071B3A] font-black cursor-pointer"
                >
                  Confirm
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Profile Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full border border-slate-200 shadow-2xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-black text-slate-900 text-base">Edit Member Profile</h3>
              <button
                type="button"
                onClick={() => setIsEditModalOpen(false)}
                className="p-1 rounded text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <form onSubmit={handleEditSubmit} className="space-y-4 text-xs font-medium">
              <div>
                <label className="block text-slate-700 font-bold mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={editForm.name}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Plan</label>
                  <select
                    value={editForm.plan}
                    onChange={(e) => setEditForm({ ...editForm, plan: e.target.value as PlanType })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl capitalize"
                  >
                    <option value="trial">Trial</option>
                    <option value="starter">Starter</option>
                    <option value="creator">Creator</option>
                    <option value="pro">Pro</option>
                    <option value="studio">Studio</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Role</label>
                  <select
                    value={editForm.role}
                    onChange={(e) => setEditForm({ ...editForm, role: e.target.value as AdminRole })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl capitalize"
                  >
                    <option value="creator">Creator</option>
                    <option value="support">Support</option>
                    <option value="content_manager">Content Manager</option>
                    <option value="analyst">Analyst</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-slate-700 font-bold mb-1">Notes</label>
                <textarea
                  rows={3}
                  value={editForm.notes}
                  onChange={(e) => setEditForm({ ...editForm, notes: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-3d-yellow px-4 py-2 rounded-xl text-[#071B3A] font-black cursor-pointer"
                >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </AdminLayout>
    );
  }

  export default function MemberDetailPage() {
    return (
      <Suspense
        fallback={
          <div className="min-h-screen bg-[#F7F8FC] flex flex-col items-center justify-center space-y-3">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-300 border-t-[#071B3A]"></div>
            <p className="font-mono text-xs text-slate-500">Loading Member Profile...</p>
          </div>
        }
      >
        <MemberDetailContent />
      </Suspense>
    );
  }
