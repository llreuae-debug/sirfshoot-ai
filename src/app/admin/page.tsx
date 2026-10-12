'use client';

import React from 'react';
import Link from 'next/link';
import AdminLayout from '@/components/AdminLayout';
import { useAdminStore } from '@/lib/admin-store';
import {
  Users,
  CreditCard,
  FileSpreadsheet,
  Globe,
  TrendingUp,
  AlertCircle,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  DollarSign,
  Activity,
  Plus,
} from 'lucide-react';

export default function AdminDashboardPage() {
  const { data } = useAdminStore();

  // Calculate live verified stats from store
  const totalMembers = data.members.length;
  const activeMembers = data.members.filter((m) => m.membershipStatus === 'active').length;
  const trialMembers = data.members.filter((m) => m.membershipStatus === 'trial').length;
  const suspendedMembers = data.members.filter((m) => m.membershipStatus === 'suspended').length;
  const pastDueMembers = data.members.filter((m) => m.membershipStatus === 'past_due').length;

  const totalRevenuePKR = data.members.reduce((acc, m) => acc + (m.totalSpentPKR || 0), 0);
  const totalCreditsRemaining = data.members.reduce((acc, m) => acc + (m.creditsRemaining || 0), 0);

  const failedTransactions = data.ledger.filter((tx) => tx.status === 'failed');

  return (
    <AdminLayout
      title="Admin Control Center"
      subtitle="Operational monitoring, member management, financial ledger, and SEO oversight."
      action={
        <Link
          href="/admin/members"
          className="btn-3d-yellow inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-black text-[#071B3A]"
        >
          <Plus className="h-4 w-4" />
          <span>Add Member</span>
        </Link>
      }
    >
      {/* Top Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Total Members */}
        <div className="rounded-3xl border-2 border-slate-200 bg-white p-6 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-black uppercase tracking-wider text-slate-400">Total Members</span>
            <div className="h-10 w-10 rounded-2xl bg-blue-50 text-blue-600 border border-blue-200 flex items-center justify-center">
              <Users className="h-5 w-5" />
            </div>
          </div>
          <div>
            <div className="text-3xl font-black text-[#071B3A]">{totalMembers}</div>
            <div className="flex items-center gap-2 mt-2 text-xs font-bold text-slate-500">
              <span className="text-emerald-600 font-extrabold">{activeMembers} Active</span>
              <span>•</span>
              <span className="text-amber-600 font-extrabold">{trialMembers} Trial</span>
              {suspendedMembers > 0 && (
                <>
                  <span>•</span>
                  <span className="text-red-600 font-extrabold">{suspendedMembers} Suspended</span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Verified Revenue */}
        <div className="rounded-3xl border-2 border-slate-200 bg-white p-6 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-black uppercase tracking-wider text-slate-400">Verified Revenue</span>
            <div className="h-10 w-10 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center">
              <TrendingUp className="h-5 w-5" />
            </div>
          </div>
          <div>
            <div className="text-3xl font-black text-[#071B3A]">
              PKR {totalRevenuePKR.toLocaleString()}
            </div>
            <div className="flex items-center gap-2 mt-2 text-xs font-bold text-slate-500">
              <span>Local Card & JazzCash Payments</span>
            </div>
          </div>
        </div>

        {/* Active Credit Pool */}
        <div className="rounded-3xl border-2 border-slate-200 bg-white p-6 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-black uppercase tracking-wider text-slate-400">Available Credits Pool</span>
            <div className="h-10 w-10 rounded-2xl bg-amber-50 text-amber-700 border border-amber-200 flex items-center justify-center">
              <FileSpreadsheet className="h-5 w-5" />
            </div>
          </div>
          <div>
            <div className="text-3xl font-black text-[#071B3A]">
              {totalCreditsRemaining.toLocaleString()}
            </div>
            <div className="flex items-center gap-2 mt-2 text-xs font-bold text-slate-500">
              <span>Across all creator & studio tiers</span>
            </div>
          </div>
        </div>

        {/* Failed Payments / Alerts */}
        <div className="rounded-3xl border-2 border-slate-200 bg-white p-6 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-black uppercase tracking-wider text-slate-400">Payment Alerts</span>
            <div className={`h-10 w-10 rounded-2xl flex items-center justify-center ${
              failedTransactions.length > 0
                ? 'bg-red-50 text-red-600 border border-red-200'
                : 'bg-emerald-50 text-emerald-600 border border-emerald-200'
            }`}>
              {failedTransactions.length > 0 ? <AlertCircle className="h-5 w-5" /> : <CheckCircle2 className="h-5 w-5" />}
            </div>
          </div>
          <div>
            <div className="text-3xl font-black text-[#071B3A]">
              {failedTransactions.length}
            </div>
            <div className="flex items-center gap-2 mt-2 text-xs font-bold text-slate-500">
              {failedTransactions.length > 0 ? (
                <span className="text-red-600 font-extrabold">{pastDueMembers} past due accounts</span>
              ) : (
                <span className="text-emerald-600 font-extrabold">All gateways operational</span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Live Ledger and SEO Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Recent Ledger Transactions */}
        <div className="lg:col-span-8 rounded-3xl border-2 border-slate-200 bg-white p-6 sm:p-7 shadow-xs space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h2 className="text-lg font-black text-[#071B3A]">Recent Financial & Credit Transactions</h2>
              <p className="text-xs text-slate-500">Auditable transaction log across monetary and internal credit units.</p>
            </div>
            <Link
              href="/admin/ledger"
              className="inline-flex items-center gap-1 text-xs font-black text-[#F20D1B] hover:underline"
            >
              <span>View Full Ledger</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-100 text-slate-400 font-bold uppercase tracking-wider">
                  <th className="pb-3">Member</th>
                  <th className="pb-3">Type</th>
                  <th className="pb-3">Amount</th>
                  <th className="pb-3">Balance</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {data.ledger.slice(0, 5).map((tx) => (
                  <tr key={tx.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 font-bold text-slate-900">
                      <div>{tx.memberName}</div>
                      <div className="text-[11px] text-slate-400 font-normal">{tx.memberEmail}</div>
                    </td>
                    <td className="py-3">
                      <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-extrabold text-slate-700 uppercase">
                        {tx.type.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="py-3 font-mono font-bold">
                      {tx.category === 'financial' ? (
                        <span className="text-emerald-700">PKR {tx.amountPKR?.toLocaleString()}</span>
                      ) : (
                        <span className={(tx.amountCredits || 0) >= 0 ? 'text-blue-600' : 'text-slate-600'}>
                          {(tx.amountCredits || 0) >= 0 ? `+${tx.amountCredits}` : tx.amountCredits} Credits
                        </span>
                      )}
                    </td>
                    <td className="py-3 font-mono text-slate-600">
                      {tx.balanceAfterCredits !== undefined ? `${tx.balanceAfterCredits} Credits` : '—'}
                    </td>
                    <td className="py-3">
                      <span className={`rounded-full px-2 py-0.5 text-[10px] font-extrabold uppercase ${
                        tx.status === 'completed'
                          ? 'bg-emerald-100 text-emerald-800'
                          : tx.status === 'failed'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}>
                        {tx.status}
                      </span>
                    </td>
                    <td className="py-3 text-slate-400 font-mono text-[11px]">
                      {new Date(tx.timestamp).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column: SEO Status & Fast Links */}
        <div className="lg:col-span-4 space-y-6">
          {/* SEO Health Card */}
          <div className="rounded-3xl border-2 border-slate-200 bg-white p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-purple-600" />
                <h3 className="font-black text-sm text-[#071B3A]">SEO & AEO Status</h3>
              </div>
              <span className="rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-black px-2 py-0.5">
                OPTIMIZED
              </span>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between items-center py-1 border-b border-slate-50">
                <span className="text-slate-500 font-bold">Public Indexable Pages:</span>
                <span className="font-mono font-bold text-slate-900">{data.seoConfigs.length} Pages</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-slate-50">
                <span className="text-slate-500 font-bold">XML Sitemap:</span>
                <span className="font-mono text-emerald-600 font-bold">/sitemap.xml (Active)</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-slate-50">
                <span className="text-slate-500 font-bold">Robots Policy:</span>
                <span className="font-mono text-emerald-600 font-bold">/robots.txt (Active)</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-slate-50">
                <span className="text-slate-500 font-bold">LLM GEO Standard:</span>
                <span className="font-mono text-emerald-600 font-bold">/llms.txt (Active)</span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className="text-slate-500 font-bold">Schema Structured Data:</span>
                <span className="font-mono text-emerald-600 font-bold">JSON-LD Validated</span>
              </div>
            </div>

            <div className="pt-2">
              <Link
                href="/admin/seo"
                className="w-full inline-flex items-center justify-center gap-2 rounded-2xl border-2 border-[#071B3A] bg-[#071B3A] text-[#FFD900] py-2.5 text-xs font-black hover:bg-[#102B52] transition"
              >
                <span>Open SEO Control Center</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          {/* Quick Actions Card */}
          <div className="rounded-3xl border-2 border-slate-200 bg-white p-6 shadow-xs space-y-3">
            <h3 className="font-black text-sm text-[#071B3A] pb-2 border-b border-slate-100">
              Quick Admin Operations
            </h3>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <Link
                href="/admin/members"
                className="p-3 rounded-2xl border border-slate-200 hover:border-[#071B3A] bg-slate-50 hover:bg-white text-center font-bold text-slate-800 transition"
              >
                <Users className="h-4 w-4 mx-auto mb-1 text-blue-600" />
                <span>Members ({totalMembers})</span>
              </Link>
              <Link
                href="/admin/memberships"
                className="p-3 rounded-2xl border border-slate-200 hover:border-[#071B3A] bg-slate-50 hover:bg-white text-center font-bold text-slate-800 transition"
              >
                <CreditCard className="h-4 w-4 mx-auto mb-1 text-purple-600" />
                <span>Plans ({data.plans.length})</span>
              </Link>
              <Link
                href="/admin/ledger"
                className="p-3 rounded-2xl border border-slate-200 hover:border-[#071B3A] bg-slate-50 hover:bg-white text-center font-bold text-slate-800 transition"
              >
                <FileSpreadsheet className="h-4 w-4 mx-auto mb-1 text-emerald-600" />
                <span>Ledger Log</span>
              </Link>
              <Link
                href="/admin/audit-logs"
                className="p-3 rounded-2xl border border-slate-200 hover:border-[#071B3A] bg-slate-50 hover:bg-white text-center font-bold text-slate-800 transition"
              >
                <Activity className="h-4 w-4 mx-auto mb-1 text-amber-600" />
                <span>Audit Logs</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
