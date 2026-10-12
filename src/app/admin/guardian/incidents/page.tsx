'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  ShieldAlert,
  ArrowLeft,
  Search,
  Filter,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Eye,
  Wrench,
  X,
  FileText,
  User,
  History,
  ShieldCheck,
  RotateCcw,
} from 'lucide-react';
import AdminLayout from '@/components/AdminLayout';
import { useGuardianStore } from '@/lib/guardian-store';
import { Incident, IncidentSeverity, IncidentStatus } from '@/lib/guardian-types';

export default function GuardianIncidentsPage() {
  const { data, updateIncidentStatus, executeRepair } = useGuardianStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [severityFilter, setSeverityFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedIncident, setSelectedIncident] = useState<Incident | null>(null);
  const [repairMsg, setRepairMsg] = useState<string | null>(null);

  const filteredIncidents = useMemo(() => {
    return data.incidents.filter((inc) => {
      const matchesSearch =
        inc.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        inc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        inc.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
        inc.errorMessage.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (inc.route && inc.route.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesSeverity = severityFilter === 'all' || inc.severity === severityFilter;
      const matchesStatus = statusFilter === 'all' || inc.status === statusFilter;

      return matchesSearch && matchesSeverity && matchesStatus;
    });
  }, [data.incidents, searchTerm, severityFilter, statusFilter]);

  const handleApplyRepair = (incident: Incident, actionId: string) => {
    const res = executeRepair(incident.id, actionId);
    setRepairMsg(res.message);
    setTimeout(() => setRepairMsg(null), 5000);
    // Refresh selected incident from state
    const refreshed = data.incidents.find((i) => i.id === incident.id);
    if (refreshed) setSelectedIncident(refreshed);
  };

  const getSeverityBadge = (sev: IncidentSeverity) => {
    switch (sev) {
      case 'P0':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase bg-red-100 text-red-800 border border-red-200">P0 Critical</span>;
      case 'P1':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase bg-amber-100 text-amber-800 border border-amber-200">P1 High</span>;
      case 'P2':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase bg-blue-100 text-blue-800 border border-blue-200">P2 Medium</span>;
      case 'P3':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase bg-slate-100 text-slate-800 border border-slate-200">P3 Low</span>;
    }
  };

  const getStatusBadge = (status: IncidentStatus) => {
    switch (status) {
      case 'resolved':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase bg-emerald-50 text-emerald-700 border border-emerald-200">Resolved</span>;
      case 'repair_proposed':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase bg-purple-50 text-purple-700 border border-purple-200">Repair Proposed</span>;
      case 'investigating':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase bg-amber-50 text-amber-700 border border-amber-200">Investigating</span>;
      case 'awaiting_approval':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase bg-rose-50 text-rose-700 border border-rose-200">Awaiting Approval</span>;
      default:
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase bg-slate-100 text-slate-700 capitalize">{status.replace('_', ' ')}</span>;
    }
  };

  return (
    <AdminLayout
      title="Guardian Incident Management Center"
      subtitle="Automated failure detection, AI root-cause analysis, severity classification, and resolution timeline."
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
      {repairMsg && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 px-4 py-3 rounded-2xl text-xs font-bold flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
          <span>{repairMsg}</span>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by ID, error message, service, or route..."
            className="w-full pl-10 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-[#071B3A]"
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-slate-400 hidden sm:block" />
          <select
            value={severityFilter}
            onChange={(e) => setSeverityFilter(e.target.value)}
            className="text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-medium text-slate-700 cursor-pointer"
          >
            <option value="all">All Severities</option>
            <option value="P0">P0 Critical</option>
            <option value="P1">P1 High</option>
            <option value="P2">P2 Medium</option>
            <option value="P3">P3 Low</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-medium text-slate-700 cursor-pointer"
          >
            <option value="all">All Statuses</option>
            <option value="new">New</option>
            <option value="investigating">Investigating</option>
            <option value="repair_proposed">Repair Proposed</option>
            <option value="awaiting_approval">Awaiting Approval</option>
            <option value="resolved">Resolved</option>
          </select>
        </div>
      </div>

      {/* Incidents Table */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50/80 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-3.5 px-4">Incident ID & Created</th>
                <th className="py-3.5 px-4">Severity & Status</th>
                <th className="py-3.5 px-4">Service & Target Route</th>
                <th className="py-3.5 px-4">Error Summary</th>
                <th className="py-3.5 px-4 text-center">Occurrences</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
              {filteredIncidents.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-400">
                    <ShieldAlert className="h-8 w-8 mx-auto mb-2 opacity-40" />
                    <p className="font-semibold text-slate-600">No incidents match your criteria</p>
                    <p className="text-xs text-slate-400 mt-1">System is healthy with zero active alerts.</p>
                  </td>
                </tr>
              ) : (
                filteredIncidents.map((inc) => (
                  <tr key={inc.id} className="hover:bg-slate-50/70 transition">
                    <td className="py-3.5 px-4">
                      <div className="font-mono font-bold text-slate-900">{inc.id}</div>
                      <div className="text-[11px] text-slate-400">
                        {new Date(inc.createdAt).toLocaleString()}
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="flex flex-col gap-1 items-start">
                        {getSeverityBadge(inc.severity)}
                        {getStatusBadge(inc.status)}
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-slate-900">{inc.service}</div>
                      <div className="text-[11px] font-mono text-slate-400">{inc.route || 'Global'}</div>
                    </td>
                    <td className="py-3.5 px-4 max-w-sm truncate" title={inc.errorMessage}>
                      <div className="font-bold text-slate-800">{inc.title}</div>
                      <div className="text-[11px] text-slate-500 truncate">{inc.errorMessage}</div>
                    </td>
                    <td className="py-3.5 px-4 text-center font-mono font-bold text-slate-800">
                      {inc.occurrenceCount}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        type="button"
                        onClick={() => setSelectedIncident(inc)}
                        className="px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 flex items-center gap-1.5 ml-auto transition cursor-pointer"
                      >
                        <Eye className="h-3 w-3" />
                        <span>Inspect & Heal</span>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Incident Deep Inspection Modal */}
      {selectedIncident && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full border border-slate-200 shadow-2xl p-6 space-y-5 my-8 animate-in fade-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="h-9 w-9 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center font-bold">
                  <ShieldAlert className="h-5 w-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-black text-slate-900 text-base">{selectedIncident.id}</h3>
                    {getSeverityBadge(selectedIncident.severity)}
                    {getStatusBadge(selectedIncident.status)}
                  </div>
                  <p className="text-xs text-slate-500">{selectedIncident.service} • {selectedIncident.route}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedIncident(null)}
                className="p-1 rounded text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Error Message & Stack Trace */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-2">
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
                Sanitized Error Message
              </span>
              <p className="text-xs font-mono font-bold text-rose-700 bg-white p-2.5 rounded-xl border border-rose-200">
                {selectedIncident.errorMessage}
              </p>
              {selectedIncident.sanitizedStackTrace && (
                <div className="pt-1">
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block mb-1">
                    Sanitized Stack Trace
                  </span>
                  <pre className="text-[11px] font-mono text-slate-600 bg-white p-2.5 rounded-xl border border-slate-200 overflow-x-auto whitespace-pre-wrap">
                    {selectedIncident.sanitizedStackTrace}
                  </pre>
                </div>
              )}
            </div>

            {/* AI Root-Cause Analysis Card */}
            {selectedIncident.rootCauseAnalysis && (
              <div className="bg-purple-500/5 border border-purple-500/20 rounded-2xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-purple-900 flex items-center gap-1.5">
                    <ShieldCheck className="h-4 w-4 text-purple-700" />
                    <span>Guardian AI Root-Cause Assessment</span>
                  </span>
                  <span className="text-[10px] font-mono uppercase bg-purple-100 text-purple-800 px-2 py-0.5 rounded font-bold">
                    Risk: {selectedIncident.rootCauseAnalysis.riskLevel}
                  </span>
                </div>

                <p className="text-xs text-slate-700 leading-relaxed font-medium">
                  {selectedIncident.rootCauseAnalysis.summary}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-1">
                  <div className="p-2.5 bg-white rounded-xl border border-slate-200">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Likely Cause</span>
                    <p className="text-slate-800">{selectedIncident.rootCauseAnalysis.likelyCause}</p>
                  </div>
                  <div className="p-2.5 bg-white rounded-xl border border-slate-200">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">User Impact</span>
                    <p className="text-slate-800">{selectedIncident.rootCauseAnalysis.userImpact}</p>
                  </div>
                </div>

                {/* Proposed Repair CTA */}
                {selectedIncident.suggestedRepairId && selectedIncident.status !== 'resolved' && (
                  <div className="pt-2 border-t border-purple-500/10 flex items-center justify-between">
                    <div>
                      <span className="text-[11px] text-slate-500 font-medium block">
                        Recommended Recovery Action:
                      </span>
                      <strong className="text-xs text-slate-900 font-mono">
                        {selectedIncident.suggestedRepairId}
                      </strong>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleApplyRepair(selectedIncident, selectedIncident.suggestedRepairId!)}
                      className="btn-3d-yellow px-4 py-2 rounded-xl text-xs font-black text-[#071B3A] flex items-center gap-1.5 cursor-pointer shadow-md"
                    >
                      <Wrench className="h-3.5 w-3.5" />
                      <span>Execute Self-Healing Repair</span>
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Repair Result if applied */}
            {selectedIncident.repairResult && (
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 text-xs space-y-1">
                <span className="font-bold text-emerald-900 flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  <span>Repair Verified Successfully</span>
                </span>
                <p className="text-emerald-800 font-mono text-[11px]">{selectedIncident.repairResult.output}</p>
              </div>
            )}

            {/* Timeline */}
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
                Incident Timeline ({selectedIncident.timeline.length} events)
              </span>
              <div className="space-y-1.5">
                {selectedIncident.timeline.map((event, idx) => (
                  <div key={idx} className="text-xs flex items-start justify-between gap-3 bg-slate-50 p-2 rounded-xl">
                    <span className="text-slate-700 font-medium">{event.message}</span>
                    <span className="text-[10px] text-slate-400 font-mono shrink-0">
                      {new Date(event.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={() => setSelectedIncident(null)}
                className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 cursor-pointer"
              >
                Close Details
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
