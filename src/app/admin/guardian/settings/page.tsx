'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Sliders,
  ArrowLeft,
  CheckCircle2,
  AlertTriangle,
  Bell,
  Clock,
  ShieldCheck,
  Zap,
  Save,
} from 'lucide-react';
import AdminLayout from '@/components/AdminLayout';
import { useGuardianStore } from '@/lib/guardian-store';

export default function GuardianSettingsPage() {
  const { data, updateSettings } = useGuardianStore();
  const [form, setForm] = useState({
    monitoringIntervalSeconds: data.settings.monitoringIntervalSeconds,
    autoRepairTier1Enabled: data.settings.autoRepairTier1Enabled,
    p0AlertImmediate: data.settings.p0AlertImmediate,
    alertEmail: data.settings.alertEmail,
    circuitBreakerErrorThreshold: data.settings.circuitBreakerErrorThreshold,
    maintenanceMode: data.settings.maintenanceMode,
  });

  const [savedNotice, setSavedNotice] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings({
      monitoringIntervalSeconds: Number(form.monitoringIntervalSeconds),
      autoRepairTier1Enabled: form.autoRepairTier1Enabled,
      p0AlertImmediate: form.p0AlertImmediate,
      alertEmail: form.alertEmail.trim(),
      circuitBreakerErrorThreshold: Number(form.circuitBreakerErrorThreshold),
      maintenanceMode: form.maintenanceMode,
    });
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 3000);
  };

  return (
    <AdminLayout
      title="Guardian Operational Policies & SRE Settings"
      subtitle="Configure autonomous monitoring cadence, alert thresholds, self-healing authorization levels, and escalation contacts."
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
      {savedNotice && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 px-4 py-3 rounded-2xl text-xs font-bold flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
          <span>Guardian operational policy settings updated successfully.</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Monitoring Cadence & Health Probes Card */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2.5 border-b border-slate-100 pb-3">
            <Clock className="h-4 w-4 text-blue-600" />
            <h3 className="font-black text-slate-900 text-base">Monitoring Intervals & SRE Cadence</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-medium">
            <div>
              <label className="block text-slate-700 font-bold mb-1.5">Background Health Probe Cadence</label>
              <select
                value={form.monitoringIntervalSeconds}
                onChange={(e) =>
                  setForm({ ...form, monitoringIntervalSeconds: Number(e.target.value) })
                }
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-bold"
              >
                <option value={30}>Every 30 Seconds (High Frequency)</option>
                <option value={60}>Every 60 Seconds (Standard Production)</option>
                <option value={300}>Every 5 Minutes (Low Overhead)</option>
              </select>
              <p className="text-[11px] text-slate-400 mt-1">Controls how often automated probes ping active API routes.</p>
            </div>

            <div>
              <label className="block text-slate-700 font-bold mb-1.5">Circuit Breaker Trip Threshold</label>
              <select
                value={form.circuitBreakerErrorThreshold}
                onChange={(e) =>
                  setForm({ ...form, circuitBreakerErrorThreshold: Number(e.target.value) })
                }
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-bold"
              >
                <option value={2}>2% Failure Rate (Ultra Strict)</option>
                <option value={5}>5% Failure Rate (Balanced)</option>
                <option value={10}>10% Failure Rate (Permissive)</option>
              </select>
              <p className="text-[11px] text-slate-400 mt-1">Automatically reroutes traffic to fallback providers when threshold is exceeded.</p>
            </div>
          </div>
        </div>

        {/* Self-Healing Automation Rules Card */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2.5 border-b border-slate-100 pb-3">
            <Zap className="h-4 w-4 text-amber-500" />
            <h3 className="font-black text-slate-900 text-base">Autonomous Recovery Policies</h3>
          </div>

          <div className="space-y-3 text-xs font-medium">
            <div className="flex items-center justify-between p-3.5 bg-slate-50 rounded-2xl border border-slate-200">
              <div>
                <label className="font-bold text-slate-900 block">Tier 1 Automatic Self-Healing</label>
                <p className="text-[11px] text-slate-500">
                  Allow Guardian AI to autonomously execute pre-tested, reversible actions (cache rehydration, circuit breaker resets).
                </p>
              </div>
              <input
                type="checkbox"
                checked={form.autoRepairTier1Enabled}
                onChange={(e) => setForm({ ...form, autoRepairTier1Enabled: e.target.checked })}
                className="h-4 w-4 rounded text-[#071B3A]"
              />
            </div>

            <div className="flex items-center justify-between p-3.5 bg-slate-50 rounded-2xl border border-slate-200">
              <div>
                <label className="font-bold text-slate-900 block">Immediate P0 Outage Dispatch</label>
                <p className="text-[11px] text-slate-500">
                  Instantly dispatch critical incident alerts and trigger automatic diagnostics upon service degradation.
                </p>
              </div>
              <input
                type="checkbox"
                checked={form.p0AlertImmediate}
                onChange={(e) => setForm({ ...form, p0AlertImmediate: e.target.checked })}
                className="h-4 w-4 rounded text-red-600"
              />
            </div>
          </div>
        </div>

        {/* Notification Targets */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2.5 border-b border-slate-100 pb-3">
            <Bell className="h-4 w-4 text-purple-600" />
            <h3 className="font-black text-slate-900 text-base">Alert Destinations & Dispatch</h3>
          </div>

          <div className="text-xs font-medium space-y-3">
            <div>
              <label className="block text-slate-700 font-bold mb-1.5">Primary Incident Dispatch Email</label>
              <input
                type="email"
                required
                value={form.alertEmail}
                onChange={(e) => setForm({ ...form, alertEmail: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-mono text-slate-800"
              />
              <p className="text-[11px] text-slate-400 mt-1">Super Administrator notification target.</p>
            </div>
          </div>
        </div>

        {/* Submit Action Bar */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="submit"
            className="btn-3d-yellow px-6 py-3 rounded-2xl text-xs font-black text-[#071B3A] flex items-center gap-2 cursor-pointer shadow-md"
          >
            <Save className="h-4 w-4" />
            <span>Save Guardian Settings</span>
          </button>
        </div>
      </form>
    </AdminLayout>
  );
}
