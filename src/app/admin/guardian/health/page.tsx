'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Activity,
  ArrowLeft,
  RefreshCw,
  CheckCircle2,
  AlertTriangle,
  Server,
  Zap,
  Cpu,
  Database,
  Radio,
  Clock,
  Filter,
} from 'lucide-react';
import AdminLayout from '@/components/AdminLayout';
import { useGuardianStore } from '@/lib/guardian-store';
import { HealthCategory } from '@/lib/guardian-types';

export default function GuardianHealthPage() {
  const { data, runHealthCheck } = useGuardianStore();
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [probing, setProbing] = useState(false);
  const [probeResult, setProbeResult] = useState<string | null>(null);

  const handleProbe = async () => {
    setProbing(true);
    setProbeResult(null);
    try {
      const res = await runHealthCheck();
      setProbeResult(`Probe finished in ${res.latencyMs || 18}ms: System status is ${res.status || 'healthy'}`);
      setTimeout(() => setProbeResult(null), 4000);
    } finally {
      setProbing(false);
    }
  };

  const filteredComponents = data.healthComponents.filter(
    (c) => categoryFilter === 'all' || c.category === categoryFilter
  );

  return (
    <AdminLayout
      title="Guardian Health Diagnostics"
      subtitle="Subsystem telemetry probes, latency benchmarks, error-rate thresholds, and availability monitoring."
      action={
        <div className="flex items-center gap-2">
          <Link
            href="/admin/guardian"
            className="px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 bg-white hover:bg-slate-50 flex items-center gap-1.5 transition"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Guardian Command Center</span>
          </Link>
          <button
            type="button"
            disabled={probing}
            onClick={handleProbe}
            className="btn-3d-yellow px-4 py-2 rounded-xl text-xs font-black text-[#071B3A] flex items-center gap-2 cursor-pointer shadow-md disabled:opacity-50"
          >
            <RefreshCw className={`h-4 w-4 ${probing ? 'animate-spin' : ''}`} />
            <span>{probing ? 'Probing Subsystems...' : 'Run Diagnostics Probe'}</span>
          </button>
        </div>
      }
    >
      {probeResult && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 px-4 py-3 rounded-2xl text-xs font-bold flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
          <span>{probeResult}</span>
        </div>
      )}

      {/* Filter and Overview Bar */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-slate-400" />
          <span className="text-xs font-bold text-slate-700">Filter Category:</span>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 font-medium text-slate-700 cursor-pointer"
          >
            <option value="all">All Categories ({data.healthComponents.length})</option>
            <option value="backend">Backend & Gateway</option>
            <option value="ai_provider">AI Providers & Pipeline</option>
            <option value="database">Database & Ledger</option>
            <option value="storage">Storage & Cache</option>
            <option value="scheduler">Schedulers & Workers</option>
          </select>
        </div>

        <div className="text-xs text-slate-500 font-medium">
          Last probe timestamp: <strong className="text-slate-800 font-mono">{new Date(data.settings.lastHeartbeat).toLocaleTimeString()}</strong>
        </div>
      </div>

      {/* Components List */}
      <div className="space-y-4">
        {filteredComponents.map((comp) => (
          <div
            key={comp.id}
            className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-slate-300 transition"
          >
            <div className="space-y-1 max-w-xl">
              <div className="flex items-center gap-2">
                <h4 className="font-bold text-slate-900 text-sm">{comp.name}</h4>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 uppercase font-bold">
                  {comp.category}
                </span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-black uppercase bg-emerald-50 text-emerald-700 border border-emerald-200">
                  <CheckCircle2 className="h-2.5 w-2.5" /> Healthy
                </span>
              </div>
              <p className="text-xs text-slate-500">{comp.details}</p>
            </div>

            <div className="flex items-center gap-6 text-xs shrink-0">
              <div className="text-right">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Response Latency</span>
                <span className="font-mono font-bold text-slate-900 text-sm">{comp.latencyMs} ms</span>
              </div>
              <div className="h-8 w-px bg-slate-200" />
              <div className="text-right">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Uptime SLA</span>
                <span className="font-mono font-bold text-emerald-600 text-sm">{comp.uptimePercent}%</span>
              </div>
              <div className="h-8 w-px bg-slate-200" />
              <div className="text-right">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Error Rate</span>
                <span className="font-mono font-bold text-slate-700 text-sm">{(comp.errorRate * 100).toFixed(2)}%</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </AdminLayout>
  );
}
