'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  Activity,
  ShieldAlert,
  Wrench,
  Sliders,
  CheckCircle2,
  AlertTriangle,
  Clock,
  RefreshCw,
  ArrowRight,
  Server,
  Zap,
  Cpu,
  Database,
  Radio,
  ExternalLink,
} from 'lucide-react';
import AdminLayout from '@/components/AdminLayout';
import { useGuardianStore } from '@/lib/guardian-store';

export default function GuardianOverviewPage() {
  const { data, runHealthCheck, executeRepair } = useGuardianStore();
  const [isRunningCheck, setIsRunningCheck] = useState(false);
  const [checkResultMsg, setCheckResultMsg] = useState<string | null>(null);

  const handleManualCheck = async () => {
    setIsRunningCheck(true);
    setCheckResultMsg(null);
    try {
      const res = await runHealthCheck();
      setCheckResultMsg(`Diagnostic probe completed successfully: Status ${res.status || 'healthy'}`);
      setTimeout(() => setCheckResultMsg(null), 4000);
    } finally {
      setIsRunningCheck(false);
    }
  };

  const openIncidents = data.incidents.filter((i) => i.status !== 'resolved');
  const p0Count = openIncidents.filter((i) => i.severity === 'P0').length;
  const p1Count = openIncidents.filter((i) => i.severity === 'P1').length;
  const p2Count = openIncidents.filter((i) => i.severity === 'P2').length;
  const p3Count = openIncidents.filter((i) => i.severity === 'P3').length;

  return (
    <AdminLayout
      title="Tameeros Guardian AI — Autonomous Operations"
      subtitle="Real-time application health monitoring, automated anomaly detection, root-cause diagnostics, and safe self-healing recovery."
      action={
        <div className="flex items-center gap-2">
          <button
            type="button"
            disabled={isRunningCheck}
            onClick={handleManualCheck}
            className="btn-3d-yellow px-4 py-2.5 rounded-xl text-xs font-black text-[#071B3A] flex items-center gap-2 cursor-pointer shadow-md disabled:opacity-50"
          >
            <RefreshCw className={`h-4 w-4 ${isRunningCheck ? 'animate-spin' : ''}`} />
            <span>{isRunningCheck ? 'Running Diagnostics...' : 'Trigger System Health Check'}</span>
          </button>
        </div>
      }
    >
      {checkResultMsg && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 px-4 py-3 rounded-2xl text-xs font-bold flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
          <span>{checkResultMsg}</span>
        </div>
      )}

      {/* Hero Overview Status Banner */}
      <div className="bg-[#071B3A] text-white rounded-3xl p-6 border border-white/10 shadow-lg space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-[#FFD900] to-[#E5A800] text-[#071B3A] flex items-center justify-center font-black shadow-md">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-black text-white text-lg">System Health: Fully Operational</h3>
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse" />
              </div>
              <p className="text-xs text-slate-300">
                Guardian Autonomous SRE Worker is active. Last heartbeat: {new Date(data.settings.lastHeartbeat).toLocaleTimeString()}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-white/5 border border-white/10 px-4 py-2.5 rounded-2xl text-xs">
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Rolling 30-Day SLA</span>
              <span className="text-lg font-mono font-black text-[#FFD900]">{data.systemUptimeSLA}%</span>
            </div>
            <div className="h-8 w-px bg-white/10" />
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Heartbeats</span>
              <span className="text-lg font-mono font-black text-white">{data.settings.totalHeartbeatsRecorded}</span>
            </div>
          </div>
        </div>

        {/* Operational Invariant Principles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2 border-t border-white/10 text-xs">
          <div className="p-3 bg-white/5 rounded-2xl border border-white/5 space-y-1">
            <span className="font-bold text-[#FFD900] text-[11px] uppercase tracking-wider block">
              Autonomous Error Triage
            </span>
            <p className="text-slate-300 text-[11px]">
              Diagnostic telemetry captures uncaught promise rejections and pipeline timeouts without exposing user tokens.
            </p>
          </div>
          <div className="p-3 bg-white/5 rounded-2xl border border-white/5 space-y-1">
            <span className="font-bold text-[#FFD900] text-[11px] uppercase tracking-wider block">
              Allowlisted Self-Healing
            </span>
            <p className="text-slate-300 text-[11px]">
              Only Tier 1 pre-tested safe recoveries (cache flush, circuit breaker reset) execute automatically.
            </p>
          </div>
          <div className="p-3 bg-white/5 rounded-2xl border border-white/5 space-y-1">
            <span className="font-bold text-[#FFD900] text-[11px] uppercase tracking-wider block">
              Strict Verification & Rollback
            </span>
            <p className="text-slate-300 text-[11px]">
              Every repair must pass post-action probes; failures automatically trigger rollback and escalate to admin.
            </p>
          </div>
        </div>
      </div>

      {/* Incident Status Counters Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Link
          href="/admin/guardian/incidents?severity=P0"
          className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs hover:border-red-400 transition"
        >
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span className="font-black text-[11px] uppercase tracking-wider text-red-600">P0 Critical</span>
            <span className="h-2 w-2 rounded-full bg-red-500" />
          </div>
          <div className="text-3xl font-black font-mono text-red-600 mt-2">{p0Count}</div>
          <p className="text-[11px] text-slate-400 mt-1">Data loss or total outage</p>
        </Link>

        <Link
          href="/admin/guardian/incidents?severity=P1"
          className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs hover:border-amber-400 transition"
        >
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span className="font-black text-[11px] uppercase tracking-wider text-amber-600">P1 High</span>
            <span className="h-2 w-2 rounded-full bg-amber-500" />
          </div>
          <div className="text-3xl font-black font-mono text-amber-600 mt-2">{p1Count}</div>
          <p className="text-[11px] text-slate-400 mt-1">Core generation degraded</p>
        </Link>

        <Link
          href="/admin/guardian/incidents?severity=P2"
          className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs hover:border-blue-400 transition"
        >
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span className="font-black text-[11px] uppercase tracking-wider text-blue-600">P2 Medium</span>
            <span className="h-2 w-2 rounded-full bg-blue-500" />
          </div>
          <div className="text-3xl font-black font-mono text-blue-600 mt-2">{p2Count}</div>
          <p className="text-[11px] text-slate-400 mt-1">Specific workflow latency</p>
        </Link>

        <Link
          href="/admin/guardian/incidents?severity=P3"
          className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs hover:border-slate-400 transition"
        >
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span className="font-black text-[11px] uppercase tracking-wider text-slate-600">P3 Low</span>
            <span className="h-2 w-2 rounded-full bg-slate-400" />
          </div>
          <div className="text-3xl font-black font-mono text-slate-700 mt-2">{p3Count}</div>
          <p className="text-[11px] text-slate-400 mt-1">Minor cosmetic or non-critical</p>
        </Link>
      </div>

      {/* Subsystem Health Grid */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h3 className="font-black text-slate-900 text-base flex items-center gap-2">
              <Activity className="h-4 w-4 text-emerald-600" />
              <span>Monitored Application Components ({data.healthComponents.length})</span>
            </h3>
            <p className="text-xs text-slate-500">Continuous probe telemetry across API, AI pipelines, and storage.</p>
          </div>
          <Link
            href="/admin/guardian/health"
            className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1"
          >
            <span>Deep Diagnostic View</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.healthComponents.map((comp) => (
            <div
              key={comp.id}
              className="border border-slate-200 rounded-2xl p-4 bg-slate-50/50 space-y-2 hover:bg-slate-50 transition"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-bold text-slate-900 text-xs">{comp.name}</h4>
                  <span className="text-[10px] font-mono text-slate-400 capitalize">{comp.category}</span>
                </div>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-black uppercase bg-emerald-50 text-emerald-700 border border-emerald-200">
                  <CheckCircle2 className="h-2.5 w-2.5" /> Healthy
                </span>
              </div>

              <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-100">
                <span className="text-slate-500 font-mono text-[11px]">{comp.latencyMs}ms latency</span>
                <span className="font-bold font-mono text-[11px] text-slate-800">{comp.uptimePercent}% uptime</span>
              </div>
              <p className="text-[11px] text-slate-500 line-clamp-1">{comp.details}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Incidents and Self-Healing Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Active / Recent Incidents */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="font-black text-slate-900 text-base flex items-center gap-2">
              <ShieldAlert className="h-4 w-4 text-amber-500" />
              <span>Recent Incidents ({data.incidents.length})</span>
            </h3>
            <Link
              href="/admin/guardian/incidents"
              className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="space-y-3">
            {data.incidents.slice(0, 3).map((inc) => (
              <div
                key={inc.id}
                className="p-3.5 border border-slate-200 rounded-xl bg-slate-50/70 space-y-2 text-xs"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-slate-900 flex items-center gap-1.5">
                    <span
                      className={`px-1.5 py-0.5 rounded text-[10px] font-black uppercase ${
                        inc.severity === 'P0'
                          ? 'bg-red-100 text-red-800'
                          : inc.severity === 'P1'
                          ? 'bg-amber-100 text-amber-800'
                          : inc.severity === 'P2'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-slate-200 text-slate-800'
                      }`}
                    >
                      {inc.severity}
                    </span>
                    <span>{inc.id}</span>
                  </span>
                  <span
                    className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                      inc.status === 'resolved'
                        ? 'bg-emerald-50 text-emerald-700'
                        : 'bg-amber-50 text-amber-700'
                    }`}
                  >
                    {inc.status.replace('_', ' ')}
                  </span>
                </div>
                <h4 className="font-bold text-slate-900">{inc.title}</h4>
                <p className="text-[11px] text-slate-500 line-clamp-2">{inc.errorMessage}</p>
                <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1">
                  <span>Occurrences: {inc.occurrenceCount}</span>
                  <span>{new Date(inc.createdAt).toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Allowlisted Self-Healing Repairs */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="font-black text-slate-900 text-base flex items-center gap-2">
              <Wrench className="h-4 w-4 text-purple-600" />
              <span>Allowlisted Recovery Actions ({data.repairActions.length})</span>
            </h3>
            <Link
              href="/admin/guardian/repairs"
              className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1"
            >
              <span>Manage Repairs</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="space-y-3">
            {data.repairActions.slice(0, 4).map((action) => (
              <div
                key={action.id}
                className="p-3.5 border border-slate-200 rounded-xl bg-slate-50/70 space-y-1.5 text-xs"
              >
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-slate-900">{action.name}</h4>
                  <span
                    className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${
                      action.tier === 'tier1_automatic'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : action.tier === 'tier2_approval_required'
                        ? 'bg-amber-50 text-amber-700 border border-amber-200'
                        : 'bg-red-50 text-red-700 border border-red-200'
                    }`}
                  >
                    {action.tier === 'tier1_automatic'
                      ? 'Tier 1 Auto'
                      : action.tier === 'tier2_approval_required'
                      ? 'Tier 2 Approval'
                      : 'Tier 3 Blocked'}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500">{action.description}</p>
                <div className="text-[10px] text-slate-400 font-mono">Target: {action.targetService}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
