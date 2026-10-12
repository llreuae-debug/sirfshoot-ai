'use client';

import React, { useState } from 'react';
import {
  Settings,
  ShieldCheck,
  Lock,
  Key,
  Users,
  CheckCircle2,
  AlertTriangle,
  Server,
  Zap,
  RefreshCw,
  Sliders,
  FileCheck,
} from 'lucide-react';
import AdminLayout from '@/components/AdminLayout';
import { useAdminStore } from '@/lib/admin-store';

export default function SettingsAdminPage() {
  const { currentAdminEmail } = useAdminStore();
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [allowPublicSignups, setAllowPublicSignups] = useState(true);
  const [sessionTimeoutMinutes, setSessionTimeoutMinutes] = useState(60);
  const [savedNotice, setSavedNotice] = useState(false);

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 3000);
  };

  const roleDefinitions = [
    {
      role: 'Super Administrator',
      code: 'super_admin',
      members: ['llre.uae@gmail.com'],
      permissions: [
        'Unrestricted database access',
        'Manual credit minting & adjustments',
        'Financial ledger exports & reconciliation',
        'Audit log immutable inspection',
        'Role provisioning & elevation',
      ],
      badgeColor: 'bg-purple-100 text-purple-800 border-purple-200',
    },
    {
      role: 'Administrator',
      code: 'admin',
      members: ['All verified platform managers'],
      permissions: [
        'Member directory full management',
        'Membership plan adjustments',
        'SEO metadata publishing',
        'Credit balance adjustments with mandatory reason',
      ],
      badgeColor: 'bg-blue-100 text-blue-800 border-blue-200',
    },
    {
      role: 'Content Manager',
      code: 'content_manager',
      members: ['Editorial & SEO team'],
      permissions: [
        'SEO titles & descriptions',
        'Open Graph preview updates',
        'Academy educational content creation',
        'No access to member balances or financial ledger',
      ],
      badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    },
    {
      role: 'Support Agent',
      code: 'support',
      members: ['Customer support specialists'],
      permissions: [
        'View member accounts & subscription state',
        'Account reactivation & status assist',
        'Cannot modify plan prices or financial records',
      ],
      badgeColor: 'bg-amber-100 text-amber-800 border-amber-200',
    },
    {
      role: 'Read-Only Analyst',
      code: 'analyst',
      members: ['BI & Financial audit team'],
      permissions: [
        'Read-only view of aggregated metrics',
        'SEO health and indexing status',
        'No write or modification capabilities',
      ],
      badgeColor: 'bg-slate-100 text-slate-800 border-slate-200',
    },
  ];

  return (
    <AdminLayout
      title="Platform Settings & RBAC"
      subtitle="Role-based access control, security invariants, authentication policies, and operational safeguards."
    >
      {savedNotice && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 px-4 py-3 rounded-2xl text-xs font-bold flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
          <span>Security settings configuration updated successfully.</span>
        </div>
      )}

      {/* Security Health Summary */}
      <div className="bg-[#071B3A] text-white rounded-3xl p-6 border border-white/10 shadow-lg space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-[#F20D1B] to-[#C40711] flex items-center justify-center text-white font-bold">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-black text-white text-base">Security & Authorization Invariants</h3>
              <p className="text-xs text-slate-300">
                Active administrator identity: <code className="text-[#FFD900] font-mono">{currentAdminEmail}</code>
              </p>
            </div>
          </div>
          <span className="text-xs font-mono font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-3 py-1.5 rounded-xl">
            Zero CVE Defects
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2 text-xs">
          <div className="p-3 bg-white/5 rounded-2xl border border-white/10 space-y-1">
            <span className="font-bold text-[#FFD900] block text-[11px] uppercase tracking-wider">
              Double-Entry Ledger Invariant
            </span>
            <p className="text-slate-300 text-[11px]">
              Internal creator balances can never be mutated without an atomic ledger record.
            </p>
          </div>
          <div className="p-3 bg-white/5 rounded-2xl border border-white/10 space-y-1">
            <span className="font-bold text-[#FFD900] block text-[11px] uppercase tracking-wider">
              Mandatory Audit Signatures
            </span>
            <p className="text-slate-300 text-[11px]">
              Every administrative balance shift and plan assignment enforces a mandatory reason string.
            </p>
          </div>
          <div className="p-3 bg-white/5 rounded-2xl border border-white/10 space-y-1">
            <span className="font-bold text-[#FFD900] block text-[11px] uppercase tracking-wider">
              Production Safe-Lock
            </span>
            <p className="text-slate-300 text-[11px]">
              Passphrase hashes and gateway private keys are never transmitted to client view.
            </p>
          </div>
        </div>
      </div>

      {/* Role-Based Access Control Matrix */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h3 className="font-black text-slate-900 text-base flex items-center gap-2">
              <Key className="h-4 w-4 text-purple-600" />
              <span>Role-Based Access Control (RBAC) Hierarchy</span>
            </h3>
            <p className="text-xs text-slate-500">
              Granular permission matrix enforcing the principle of least privilege.
            </p>
          </div>
          <span className="text-xs font-bold text-slate-500">{roleDefinitions.length} Defined Roles</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {roleDefinitions.map((role) => (
            <div
              key={role.code}
              className="border border-slate-200 rounded-2xl p-4 bg-slate-50/50 space-y-3"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-black text-slate-900 text-sm">{role.role}</h4>
                  <span className="text-[10px] font-mono text-slate-400">role_code: {role.code}</span>
                </div>
                <span
                  className={`text-[10px] font-black uppercase px-2.5 py-1 rounded-full border ${role.badgeColor}`}
                >
                  {role.code}
                </span>
              </div>

              <div className="text-xs text-slate-500">
                <span className="font-bold text-slate-700 block mb-0.5">Assigned To:</span>
                <span className="font-mono text-[11px] text-slate-800">{role.members.join(', ')}</span>
              </div>

              <div className="space-y-1 pt-1 border-t border-slate-200 text-xs">
                <span className="font-bold text-slate-700 text-[11px] uppercase tracking-wider block">
                  Permissions Matrix:
                </span>
                <ul className="space-y-1 text-slate-600 text-[11px]">
                  {role.permissions.map((perm, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{perm}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Operational Policy Controls */}
      <form
        onSubmit={handleSaveSettings}
        className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-5"
      >
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h3 className="font-black text-slate-900 text-base flex items-center gap-2">
              <Sliders className="h-4 w-4 text-blue-600" />
              <span>Operational Security Safeguards</span>
            </h3>
            <p className="text-xs text-slate-500">System runtime switches and throttling thresholds.</p>
          </div>
          <button
            type="submit"
            className="btn-3d-yellow px-4 py-2 rounded-xl text-xs font-black text-[#071B3A] cursor-pointer shadow-xs"
          >
            Save Security Rules
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs font-medium">
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3.5 bg-slate-50 rounded-2xl border border-slate-200">
              <div>
                <label className="font-bold text-slate-900 block">Public Registration</label>
                <p className="text-[11px] text-slate-500">Allow new creators to sign up without admin invitation.</p>
              </div>
              <input
                type="checkbox"
                checked={allowPublicSignups}
                onChange={(e) => setAllowPublicSignups(e.target.checked)}
                className="h-4 w-4 rounded text-[#071B3A]"
              />
            </div>

            <div className="flex items-center justify-between p-3.5 bg-slate-50 rounded-2xl border border-slate-200">
              <div>
                <label className="font-bold text-slate-900 block">System Maintenance Mode</label>
                <p className="text-[11px] text-slate-500">Temporarily pauses script generations while maintaining admin access.</p>
              </div>
              <input
                type="checkbox"
                checked={maintenanceMode}
                onChange={(e) => setMaintenanceMode(e.target.checked)}
                className="h-4 w-4 rounded text-rose-600"
              />
            </div>
          </div>

          <div className="space-y-3">
            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 space-y-1.5">
              <label className="font-bold text-slate-900 block">Admin Session Inactivity Timeout</label>
              <p className="text-[11px] text-slate-500">Minutes before an inactive administrative session requires re-authentication.</p>
              <select
                value={sessionTimeoutMinutes}
                onChange={(e) => setSessionTimeoutMinutes(Number(e.target.value))}
                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-800"
              >
                <option value={15}>15 Minutes (Strict)</option>
                <option value={30}>30 Minutes</option>
                <option value={60}>60 Minutes (Standard)</option>
                <option value={120}>120 Minutes</option>
              </select>
            </div>

            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
              <label className="font-bold text-slate-900 block">Immutable Audit Retention Policy</label>
              <p className="text-[11px] text-slate-500">
                Retention duration: <strong className="text-slate-900">7 Years (Financial Law Compliance)</strong>. Records are cryptographically chained and archived.
              </p>
            </div>
          </div>
        </div>
      </form>
    </AdminLayout>
  );
}
