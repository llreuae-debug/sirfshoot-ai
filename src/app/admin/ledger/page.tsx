'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  FileSpreadsheet,
  Download,
  Search,
  Filter,
  Coins,
  CreditCard,
  Plus,
  X,
  CheckCircle2,
  AlertTriangle,
  ArrowDownRight,
  ArrowUpRight,
  Sparkles,
  Shield,
  HelpCircle,
} from 'lucide-react';
import AdminLayout from '@/components/AdminLayout';
import { useAdminStore } from '@/lib/admin-store';
import { LedgerTransactionType, LedgerCategory } from '@/lib/types';

export default function LedgerAdminPage() {
  const { data, adjustMemberCredits, exportLedgerCSV } = useAdminStore();

  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'financial' | 'credit'>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  // Manual Adjustment Modal
  const [isAdjustModalOpen, setIsAdjustModalOpen] = useState(false);
  const [adjustForm, setAdjustForm] = useState({
    memberId: data.members[0]?.id || '',
    delta: 5,
    reason: 'Promotional package addition',
  });

  // Calculate High-level Ledger Integrity Metrics
  const metrics = useMemo(() => {
    let totalGrossRevenuePKR = 0;
    let totalRefundsPKR = 0;
    let totalCreditsGranted = 0;
    let totalCreditsConsumed = 0;

    data.ledger.forEach((tx) => {
      if (tx.category === 'financial' && tx.status === 'completed') {
        if (tx.type === 'purchase' || tx.type === 'subscription_payment') {
          totalGrossRevenuePKR += tx.amountPKR || 0;
        } else if (tx.type === 'refund') {
          totalRefundsPKR += tx.amountPKR || 0;
        }
      }
      if (tx.category === 'credit' && tx.amountCredits) {
        if (tx.amountCredits > 0) {
          totalCreditsGranted += tx.amountCredits;
        } else {
          totalCreditsConsumed += Math.abs(tx.amountCredits);
        }
      }
    });

    return {
      netRevenuePKR: totalGrossRevenuePKR - totalRefundsPKR,
      totalCreditsGranted,
      totalCreditsConsumed,
      activeCreditLiability: totalCreditsGranted - totalCreditsConsumed,
    };
  }, [data.ledger]);

  // Filter Transactions
  const filteredLedger = useMemo(() => {
    return data.ledger.filter((tx) => {
      const matchesSearch =
        tx.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tx.memberName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tx.memberEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tx.description.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory = categoryFilter === 'all' || tx.category === categoryFilter;
      const matchesType = typeFilter === 'all' || tx.type === typeFilter;
      const matchesStatus = statusFilter === 'all' || tx.status === statusFilter;

      return matchesSearch && matchesCategory && matchesType && matchesStatus;
    });
  }, [data.ledger, searchTerm, categoryFilter, typeFilter, statusFilter]);

  const totalPages = Math.ceil(filteredLedger.length / pageSize) || 1;
  const paginatedLedger = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredLedger.slice(start, start + pageSize);
  }, [filteredLedger, currentPage, pageSize]);

  // Handlers
  const handleDownloadCSV = () => {
    const csvContent = exportLedgerCSV();
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `tameeros_ledger_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleAdjustSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const targetMember = data.members.find((m) => m.id === adjustForm.memberId);
    if (!targetMember) return;
    if (!adjustForm.reason.trim()) {
      alert('A valid operational reason is required for auditable credit adjustments.');
      return;
    }

    adjustMemberCredits(targetMember.id, Number(adjustForm.delta), adjustForm.reason.trim());
    setIsAdjustModalOpen(false);
    setAdjustForm({
      memberId: data.members[0]?.id || '',
      delta: 5,
      reason: '',
    });
  };

  return (
    <AdminLayout
      title="Financial & Credit Ledger"
      subtitle="Auditable double-entry record separating real monetary transactions (PKR) from internal usage tokens."
      action={
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleDownloadCSV}
            className="px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 bg-white hover:bg-slate-50 flex items-center gap-1.5 transition cursor-pointer shadow-xs"
          >
            <Download className="h-4 w-4" />
            <span>Export CSV</span>
          </button>
          <button
            type="button"
            onClick={() => setIsAdjustModalOpen(true)}
            className="btn-3d-yellow px-4 py-2.5 rounded-xl text-xs font-black text-[#071B3A] flex items-center gap-1.5 cursor-pointer shadow-md"
          >
            <Coins className="h-4 w-4" />
            <span>Manual Credit Adjustment</span>
          </button>
        </div>
      }
    >
      {/* Ledger Integrity Principle Banner */}
      <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-4 flex items-start gap-3 text-xs text-amber-900 leading-relaxed">
        <HelpCircle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold">Accounting Separation Principle:</span> Monetary records (PKR) reflect actual banking and payment gateway receipts. Internal credits represent usage rights for AI video packages. They are strictly decoupled into independent auditable balances.
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Net Revenue */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span className="font-bold uppercase tracking-wider text-[11px]">Net Verified Revenue</span>
            <CreditCard className="h-4 w-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-black font-mono text-[#071B3A] mt-2">
            PKR {metrics.netRevenuePKR.toLocaleString()}
          </div>
          <div className="text-[11px] text-slate-400 mt-1">Stripe & PayFast gateway confirmed</div>
        </div>

        {/* Total Credits Granted */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span className="font-bold uppercase tracking-wider text-[11px]">Credits Granted</span>
            <ArrowUpRight className="h-4 w-4 text-blue-600" />
          </div>
          <div className="text-2xl font-black font-mono text-blue-900 mt-2">
            {metrics.totalCreditsGranted.toLocaleString()}
          </div>
          <div className="text-[11px] text-slate-400 mt-1">Through plans, trials & promotions</div>
        </div>

        {/* Total Credits Consumed */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span className="font-bold uppercase tracking-wider text-[11px]">Credits Consumed</span>
            <ArrowDownRight className="h-4 w-4 text-purple-600" />
          </div>
          <div className="text-2xl font-black font-mono text-purple-900 mt-2">
            {metrics.totalCreditsConsumed.toLocaleString()}
          </div>
          <div className="text-[11px] text-slate-400 mt-1">Successful 9-agent script packages</div>
        </div>

        {/* Active Credit Liability */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span className="font-bold uppercase tracking-wider text-[11px]">Outstanding Credits</span>
            <Coins className="h-4 w-4 text-amber-500" />
          </div>
          <div className="text-2xl font-black font-mono text-amber-900 mt-2">
            {metrics.activeCreditLiability.toLocaleString()}
          </div>
          <div className="text-[11px] text-slate-400 mt-1">Current creator balance liability</div>
        </div>
      </div>

      {/* Filter and Category Tabs */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm space-y-4">
        {/* Category Pill Tabs */}
        <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
          <button
            type="button"
            onClick={() => {
              setCategoryFilter('all');
              setCurrentPage(1);
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
              categoryFilter === 'all'
                ? 'bg-[#071B3A] text-white'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            All Ledger Records ({data.ledger.length})
          </button>
          <button
            type="button"
            onClick={() => {
              setCategoryFilter('financial');
              setCurrentPage(1);
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
              categoryFilter === 'financial'
                ? 'bg-blue-600 text-white'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <CreditCard className="h-3.5 w-3.5" />
            <span>Monetary (PKR)</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setCategoryFilter('credit');
              setCurrentPage(1);
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
              categoryFilter === 'credit'
                ? 'bg-amber-500 text-slate-900'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Coins className="h-3.5 w-3.5" />
            <span>Internal Credits</span>
          </button>
        </div>

        {/* Search & Filters */}
        <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search by transaction ID, member name, email or description..."
              className="w-full pl-10 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-[#071B3A]"
            />
          </div>

          <div className="flex items-center gap-2">
            <select
              value={typeFilter}
              onChange={(e) => {
                setTypeFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-medium text-slate-700 cursor-pointer"
            >
              <option value="all">All Event Types</option>
              <option value="purchase">Purchase</option>
              <option value="subscription_payment">Subscription Payment</option>
              <option value="credit_grant">Credit Grant</option>
              <option value="credit_usage">Credit Usage</option>
              <option value="admin_adjustment">Admin Adjustment</option>
              <option value="promotional_credit">Promotional Credit</option>
              <option value="refund">Refund</option>
            </select>

            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-medium text-slate-700 cursor-pointer"
            >
              <option value="all">All Statuses</option>
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
              <option value="failed">Failed</option>
              <option value="reversed">Reversed</option>
            </select>
          </div>
        </div>
      </div>

      {/* Ledger Table */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50/80 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-3.5 px-4">TX ID & Date</th>
                <th className="py-3.5 px-4">Member</th>
                <th className="py-3.5 px-4">Category & Type</th>
                <th className="py-3.5 px-4 text-center">Credit Change</th>
                <th className="py-3.5 px-4 text-center">Post-Balance</th>
                <th className="py-3.5 px-4 text-right">Monetary (PKR)</th>
                <th className="py-3.5 px-4">Description / Audit Reason</th>
                <th className="py-3.5 px-4 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
              {paginatedLedger.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-slate-400">
                    <FileSpreadsheet className="h-8 w-8 mx-auto mb-2 opacity-40" />
                    <p className="font-semibold text-slate-600">No transactions found</p>
                    <p className="text-xs text-slate-400 mt-1">Try resetting search filters.</p>
                  </td>
                </tr>
              ) : (
                paginatedLedger.map((tx) => (
                  <tr key={tx.id} className="hover:bg-slate-50/70 transition">
                    <td className="py-3.5 px-4">
                      <div className="font-mono text-slate-900 font-bold">{tx.id}</div>
                      <div className="text-[11px] text-slate-400">
                        {new Date(tx.timestamp).toLocaleString()}
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <Link
                        href={`/admin/members/${tx.memberId}`}
                        className="font-bold text-slate-900 hover:text-blue-600 transition block"
                      >
                        {tx.memberName}
                      </Link>
                      <div className="text-[11px] text-slate-500 font-mono">{tx.memberEmail}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="capitalize font-bold text-slate-900">
                        {tx.type.replace('_', ' ')}
                      </div>
                      <span
                        className={`inline-block px-1.5 py-0.5 rounded text-[10px] font-bold uppercase mt-0.5 ${
                          tx.category === 'financial'
                            ? 'bg-blue-50 text-blue-700 border border-blue-200'
                            : 'bg-amber-50 text-amber-800 border border-amber-200'
                        }`}
                      >
                        {tx.category}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-center font-mono font-bold">
                      {tx.amountCredits !== undefined ? (
                        <span
                          className={
                            tx.amountCredits > 0
                              ? 'text-emerald-600'
                              : tx.amountCredits < 0
                              ? 'text-rose-600'
                              : 'text-slate-500'
                          }
                        >
                          {tx.amountCredits > 0 ? `+${tx.amountCredits}` : tx.amountCredits}
                        </span>
                      ) : (
                        <span className="text-slate-300">-</span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-center font-mono font-bold text-slate-600">
                      {tx.balanceAfterCredits !== undefined ? tx.balanceAfterCredits : '-'}
                    </td>
                    <td className="py-3.5 px-4 text-right font-mono font-bold text-slate-900">
                      {tx.amountPKR ? `PKR ${tx.amountPKR.toLocaleString()}` : '-'}
                    </td>
                    <td className="py-3.5 px-4 text-slate-600 max-w-xs truncate" title={tx.reason || tx.description}>
                      <div>{tx.description}</div>
                      {tx.reason && (
                        <div className="text-[11px] text-slate-400 italic">
                          Reason: {tx.reason}
                        </div>
                      )}
                      <div className="text-[10px] text-slate-400">By: {tx.initiatedBy}</div>
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <span
                        className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-black uppercase ${
                          tx.status === 'completed'
                            ? 'bg-emerald-50 text-emerald-700'
                            : tx.status === 'pending'
                            ? 'bg-amber-50 text-amber-700'
                            : 'bg-rose-50 text-rose-700'
                        }`}
                      >
                        {tx.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Bar */}
        {totalPages > 1 && (
          <div className="p-4 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
            <div>
              Page <strong className="text-slate-900">{currentPage}</strong> of{' '}
              <strong className="text-slate-900">{totalPages}</strong>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                className="px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 disabled:opacity-40 font-semibold cursor-pointer"
              >
                Previous
              </button>
              <button
                type="button"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                className="px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 disabled:opacity-40 font-semibold cursor-pointer"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Manual Credit Adjustment Modal */}
      {isAdjustModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full border border-slate-200 shadow-2xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="h-9 w-9 rounded-xl bg-amber-500 text-slate-900 flex items-center justify-center font-bold">
                  <Coins className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-black text-slate-900 text-base">Atomic Credit Adjustment</h3>
                  <p className="text-xs text-slate-500">Modifies creator internal balance and logs transaction.</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsAdjustModalOpen(false)}
                className="p-1 rounded text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleAdjustSubmit} className="space-y-4 text-xs font-medium">
              <div>
                <label className="block text-slate-700 font-bold mb-1">Target Member</label>
                <select
                  value={adjustForm.memberId}
                  onChange={(e) => setAdjustForm({ ...adjustForm, memberId: e.target.value })}
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                >
                  {data.members.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.name} ({m.email}) — Current balance: {m.creditsRemaining}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">
                  Credit Delta (Positive to add, Negative to deduct)
                </label>
                <input
                  type="number"
                  required
                  value={adjustForm.delta}
                  onChange={(e) =>
                    setAdjustForm({ ...adjustForm, delta: Number(e.target.value) })
                  }
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono text-sm font-bold"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">
                  Mandatory Audit Reason <span className="text-red-500">*</span>
                </label>
                <textarea
                  required
                  rows={2}
                  value={adjustForm.reason}
                  onChange={(e) => setAdjustForm({ ...adjustForm, reason: e.target.value })}
                  placeholder="e.g. Compensation for timeout during high load on 10/12"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-[11px] text-slate-600">
                <strong>Idempotency & Integrity:</strong> This action updates the member balance atomically and commits both a ledger transaction and an administrative audit record with current admin attribution.
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAdjustModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-3d-yellow px-4 py-2 rounded-xl text-[#071B3A] font-black cursor-pointer"
                >
                  Commit Adjustment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
