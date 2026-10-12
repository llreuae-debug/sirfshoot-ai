'use client';

import React, { useState, useMemo } from 'react';
import {
  ClipboardList,
  Search,
  Filter,
  ShieldCheck,
  Lock,
  ChevronDown,
  ChevronRight,
  User,
  Coins,
  Globe,
  Settings,
  HelpCircle,
} from 'lucide-react';
import AdminLayout from '@/components/AdminLayout';
import { useAdminStore } from '@/lib/admin-store';
import { AdminAuditLog } from '@/lib/types';

export default function AuditLogsAdminPage() {
  const { data } = useAdminStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [targetTypeFilter, setTargetTypeFilter] = useState<string>('all');
  const [expandedLogId, setExpandedLogId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 12;

  const filteredLogs = useMemo(() => {
    return data.auditLogs.filter((log) => {
      const matchesSearch =
        log.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.adminEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.details.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (log.reason && log.reason.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesTarget = targetTypeFilter === 'all' || log.targetType === targetTypeFilter;

      return matchesSearch && matchesTarget;
    });
  }, [data.auditLogs, searchTerm, targetTypeFilter]);

  const totalPages = Math.ceil(filteredLogs.length / pageSize) || 1;
  const paginatedLogs = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredLogs.slice(start, start + pageSize);
  }, [filteredLogs, currentPage, pageSize]);

  const getTargetIcon = (type: string) => {
    switch (type) {
      case 'member':
        return <User className="h-3.5 w-3.5 text-blue-600" />;
      case 'credit':
        return <Coins className="h-3.5 w-3.5 text-amber-500" />;
      case 'seo':
        return <Globe className="h-3.5 w-3.5 text-emerald-600" />;
      default:
        return <Settings className="h-3.5 w-3.5 text-slate-500" />;
    }
  };

  return (
    <AdminLayout
      title="Administrative Audit Logs"
      subtitle="Immutable event trail recording privileged modifications, balance adjustments, and platform actions."
    >
      {/* Immutability Banner */}
      <div className="bg-[#071B3A] text-white rounded-2xl p-4 flex items-center justify-between border border-white/10 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-purple-500/20 text-purple-400 border border-purple-500/30 flex items-center justify-center shrink-0">
            <Lock className="h-5 w-5" />
          </div>
          <div>
            <h4 className="font-black text-sm text-white">Append-Only Audit Security</h4>
            <p className="text-xs text-slate-300">
              Audit log records are cryptographically timestamped and cannot be deleted or rewritten by any administrator.
            </p>
          </div>
        </div>
        <span className="hidden sm:inline-block text-xs font-mono font-bold text-[#FFD900] bg-white/10 px-3 py-1 rounded-xl">
          {data.auditLogs.length} Logged Events
        </span>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Search by action, administrator, reason, or details..."
            className="w-full pl-10 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-[#071B3A]"
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-slate-400 hidden sm:block" />
          <select
            value={targetTypeFilter}
            onChange={(e) => {
              setTargetTypeFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-medium text-slate-700 cursor-pointer"
          >
            <option value="all">All Target Types</option>
            <option value="member">Member Accounts</option>
            <option value="credit">Credit Balance</option>
            <option value="membership">Membership Plans</option>
            <option value="seo">SEO Configurations</option>
          </select>
        </div>
      </div>

      {/* Audit Log Table */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50/80 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-3.5 px-4">Event ID & Time</th>
                <th className="py-3.5 px-4">Acting Administrator</th>
                <th className="py-3.5 px-4">Action</th>
                <th className="py-3.5 px-4">Target</th>
                <th className="py-3.5 px-4">Operational Details</th>
                <th className="py-3.5 px-4">Mandatory Reason</th>
                <th className="py-3.5 px-4 text-center">Diff</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
              {paginatedLogs.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-400">
                    <ClipboardList className="h-8 w-8 mx-auto mb-2 opacity-40" />
                    <p className="font-semibold text-slate-600">No audit events match your criteria</p>
                  </td>
                </tr>
              ) : (
                paginatedLogs.map((log) => {
                  const isExpanded = expandedLogId === log.id;
                  return (
                    <React.Fragment key={log.id}>
                      <tr className="hover:bg-slate-50/70 transition">
                        <td className="py-3.5 px-4">
                          <div className="font-mono text-slate-900 font-bold">{log.id}</div>
                          <div className="text-[11px] text-slate-400">
                            {new Date(log.timestamp).toLocaleString()}
                          </div>
                        </td>
                        <td className="py-3.5 px-4 font-mono text-[11px] text-slate-800">
                          {log.adminEmail}
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="font-mono font-bold text-[10px] px-2 py-0.5 rounded bg-purple-50 text-purple-700 border border-purple-200">
                            {log.action}
                          </span>
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-1.5 capitalize text-slate-900 font-bold">
                            {getTargetIcon(log.targetType)}
                            <span>{log.targetType}</span>
                          </div>
                          <div className="text-[10px] text-slate-400 font-mono truncate max-w-[120px]">
                            {log.targetId}
                          </div>
                        </td>
                        <td className="py-3.5 px-4 text-slate-800 max-w-sm truncate" title={log.details}>
                          {log.details}
                        </td>
                        <td className="py-3.5 px-4 text-slate-500 italic max-w-xs truncate" title={log.reason || 'None provided'}>
                          {log.reason ? `"${log.reason}"` : '-'}
                        </td>
                        <td className="py-3.5 px-4 text-center">
                          {(log.beforeValue || log.afterValue) && (
                            <button
                              type="button"
                              onClick={() => setExpandedLogId(isExpanded ? null : log.id)}
                              className="p-1 rounded text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition cursor-pointer"
                              title="Toggle Value Changes"
                            >
                              {isExpanded ? (
                                <ChevronDown className="h-4 w-4" />
                              ) : (
                                <ChevronRight className="h-4 w-4" />
                              )}
                            </button>
                          )}
                        </td>
                      </tr>
                      {/* Expanded Before/After Value Diff Drawer */}
                      {isExpanded && (
                        <tr className="bg-slate-50/80">
                          <td colSpan={7} className="px-6 py-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
                              <div className="p-3 bg-white rounded-xl border border-rose-200 space-y-1">
                                <span className="text-[10px] uppercase font-bold text-rose-700 block">
                                  State Before Operation
                                </span>
                                <pre className="text-slate-700 whitespace-pre-wrap break-all text-[11px]">
                                  {log.beforeValue || 'None'}
                                </pre>
                              </div>
                              <div className="p-3 bg-white rounded-xl border border-emerald-200 space-y-1">
                                <span className="text-[10px] uppercase font-bold text-emerald-700 block">
                                  State After Operation
                                </span>
                                <pre className="text-slate-700 whitespace-pre-wrap break-all text-[11px]">
                                  {log.afterValue || 'None'}
                                </pre>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  );
                })
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
    </AdminLayout>
  );
}
