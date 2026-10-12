'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Users,
  CreditCard,
  FileSpreadsheet,
  Globe,
  ClipboardList,
  Settings,
  ShieldCheck,
  ArrowLeft,
  Sparkles,
  Menu,
  X,
  ExternalLink,
  Lock,
  Activity,
  ShieldAlert,
  Wrench,
  Sliders,
} from 'lucide-react';
import { useAdminStore } from '@/lib/admin-store';
import { useCreatorStore } from '@/lib/store';

interface AdminLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}

export default function AdminLayout({
  children,
  title,
  subtitle,
  action,
}: AdminLayoutProps) {
  const pathname = usePathname();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const { isSuperAdmin, currentAdminEmail } = useAdminStore();
  const { loginAsAdmin } = useCreatorStore();

  const navItems = [
    { name: 'Overview', href: '/admin', icon: LayoutDashboard },
    { name: 'Member Directory', href: '/admin/members', icon: Users },
    { name: 'Plans & Memberships', href: '/admin/memberships', icon: CreditCard },
    { name: 'Financial & Credit Ledger', href: '/admin/ledger', icon: FileSpreadsheet },
    { name: 'SEO Control Center', href: '/admin/seo', icon: Globe },
    { name: 'Audit Logs', href: '/admin/audit-logs', icon: ClipboardList },
    { name: 'Guardian AI Overview', href: '/admin/guardian', icon: ShieldCheck },
    { name: 'Health Diagnostics', href: '/admin/guardian/health', icon: Activity },
    { name: 'Incidents Center', href: '/admin/guardian/incidents', icon: ShieldAlert },
    { name: 'Self-Healing Repairs', href: '/admin/guardian/repairs', icon: Wrench },
    { name: 'Guardian Settings', href: '/admin/guardian/settings', icon: Sliders },
    { name: 'Settings & Security', href: '/admin/settings', icon: Settings },
  ];

  // If user is not admin, show an authentication barrier
  if (!isSuperAdmin) {
    return (
      <div className="min-h-screen bg-[#071B3A] text-white flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-[#102B52] border border-white/10 rounded-3xl p-8 text-center space-y-5 shadow-2xl">
          <div className="h-16 w-16 rounded-2xl bg-purple-500/20 text-purple-400 border border-purple-500/30 flex items-center justify-center mx-auto">
            <Lock className="h-8 w-8" />
          </div>
          <div>
            <h2 className="text-2xl font-black text-white">Admin Authentication Required</h2>
            <p className="text-sm text-slate-300 mt-2 leading-relaxed">
              This area is restricted to authorized administrators (<code className="text-[#FFD900] font-mono">llre.uae@gmail.com</code>).
            </p>
          </div>
          <div className="space-y-3 pt-2">
            <button
              type="button"
              onClick={() => loginAsAdmin()}
              className="btn-3d-yellow w-full py-3.5 rounded-2xl text-sm font-black text-[#071B3A] flex items-center justify-center gap-2 cursor-pointer"
            >
              <ShieldCheck className="h-4.5 w-4.5" />
              <span>Authenticate as Super Admin</span>
            </button>
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-white transition"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Return to Public Website</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-[#F7F8FC] text-[#071B3A] antialiased">
      {/* Sidebar for Desktop */}
      <aside className="hidden lg:flex w-72 flex-col bg-[#071B3A] text-white border-r border-[#071B3A]/20 shrink-0">
        {/* Brand Header */}
        <div className="h-20 flex items-center justify-between px-6 border-b border-white/10">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-[#F20D1B] to-[#C40711] flex items-center justify-center text-white shadow-md">
              <Sparkles className="h-4 w-4" />
            </div>
            <div className="font-black text-lg tracking-tight leading-none">
              <span className="text-white">Tameeros</span>
              <span className="text-[#F20D1B] ml-1">Shorts</span>
              <span className="ml-1 text-[10px] text-[#FFD900] font-mono uppercase bg-white/10 px-1 py-0.5 rounded">
                Admin
              </span>
            </div>
          </Link>
          <Link
            href="/"
            className="text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition"
            title="Exit to Studio"
          >
            <ExternalLink className="h-4 w-4" />
          </Link>
        </div>

        {/* Admin Identity Pill */}
        <div className="p-4 mx-4 my-4 rounded-2xl bg-[#102B52] border border-white/10">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-purple-500/20 text-purple-300 border border-purple-500/30 flex items-center justify-center shrink-0">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-xs font-black text-white truncate">Super Admin</div>
              <div className="text-[11px] text-[#FFD900] truncate font-mono">{currentAdminEmail}</div>
            </div>
          </div>
        </div>

        {/* Navigation List */}
        <nav className="flex-1 px-4 space-y-1.5 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3.5 py-3 rounded-2xl text-xs font-extrabold transition-all ${
                  active
                    ? 'bg-[#FFD900] text-[#071B3A] shadow-md shadow-black/20'
                    : 'text-slate-300 hover:bg-white/10 hover:text-white'
                }`}
              >
                <Icon className={`h-4.5 w-4.5 shrink-0 ${active ? 'text-[#071B3A]' : 'text-slate-400'}`} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Footer info */}
        <div className="p-5 border-t border-white/10 text-[11px] text-slate-400 font-mono flex items-center justify-between">
          <span>v2027.1 God Mode</span>
          <span className="flex items-center gap-1 text-emerald-400">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
            Operational
          </span>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="h-20 bg-white border-b border-slate-200/80 px-4 sm:px-8 flex items-center justify-between sticky top-0 z-30 shadow-xs">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
              className="lg:hidden h-10 w-10 rounded-xl border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-slate-50"
              aria-label="Toggle navigation"
            >
              {mobileSidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-[#071B3A] tracking-tight">{title}</h1>
              {subtitle && <p className="text-xs sm:text-sm text-slate-500 font-medium">{subtitle}</p>}
            </div>
          </div>

          <div className="flex items-center gap-3">
            {action}
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 px-3.5 py-2 rounded-xl transition"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Exit to</span> Studio
            </Link>
          </div>
        </header>

        {/* Mobile Sidebar Drawer */}
        {mobileSidebarOpen && (
          <div className="lg:hidden fixed inset-0 z-40 bg-[#071B3A]/80 backdrop-blur-sm" onClick={() => setMobileSidebarOpen(false)}>
            <div className="w-72 h-full bg-[#071B3A] text-white p-5 space-y-4" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <span className="font-black text-sm text-[#FFD900]">Admin Navigation</span>
                <button type="button" onClick={() => setMobileSidebarOpen(false)}>
                  <X className="h-5 w-5 text-slate-400" />
                </button>
              </div>
              <nav className="space-y-1">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const active = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileSidebarOpen(false)}
                      className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold ${
                        active ? 'bg-[#FFD900] text-[#071B3A]' : 'text-slate-300 hover:bg-white/10'
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      <span>{item.name}</span>
                    </Link>
                  );
                })}
              </nav>
            </div>
          </div>
        )}

        {/* Page Body */}
        <main className="flex-1 p-4 sm:p-8 max-w-[1560px] w-full mx-auto space-y-8">
          {children}
        </main>
      </div>
    </div>
  );
}
