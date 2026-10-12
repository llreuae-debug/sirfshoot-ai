'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Image as ImageIcon,
  Video,
  Sparkles,
  MessageSquare,
  Users,
  GraduationCap,
  Calculator,
  Mic,
  Building,
  CreditCard,
  Settings,
  Menu,
  X,
  ChevronRight,
} from 'lucide-react';
import { useCreatorStore } from '@/lib/store';

export default function SidebarDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { state } = useCreatorStore();

  const mainTools = [
    { title: 'Dashboard', url: '/dashboard', icon: LayoutDashboard },
    { title: 'Social Post Studio 2.0', url: '/imagens', icon: ImageIcon, badge: 'New' },
    { title: 'Automated Videos', url: '/video-automatico', icon: Video },
    { title: 'AI Listing Descriptions', url: '/descricoes', icon: Sparkles, badge: 'AI' },
    { title: 'AI Copilot Assistant', url: '/assistente', icon: MessageSquare },
    { title: 'Leads CRM Pipeline', url: '/leads', icon: Users, badge: 'CRM' },
  ];

  const academyTools = [
    { title: 'SirfShoot Academy', url: '/cursos', icon: GraduationCap, badge: 'Growth' },
  ];

  const premiumTools = [
    { title: 'AI Property Valuation', url: '/precificacao', icon: Calculator, badge: 'Valuation' },
    { title: 'AI Voiceover Studio', url: '/narracao', icon: Mic, badge: 'Voices' },
    { title: 'Mortgage Simulator', url: '/financiamento', icon: Building, badge: 'Banks' },
  ];

  const accountTools = [
    { title: 'My Subscription', url: '/minha-assinatura', icon: CreditCard },
    { title: 'Plans & Upgrades', url: '/planos', icon: Settings },
  ];

  return (
    <>
      {/* Floating Sidebar Toggle Button (Left Top) */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="fixed left-3 top-3.5 z-40 flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200/80 bg-white/95 text-slate-700 shadow-sm backdrop-blur hover:bg-slate-100 transition active:scale-95 lg:flex"
        aria-label="Open tools menu"
        title="Tools Menu"
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* Backdrop */}
      {isOpen && (
        <div
          role="button"
          tabIndex={0}
          onClick={() => setIsOpen(false)}
          onKeyDown={(e) => {
            if (e.key === 'Escape') setIsOpen(false);
          }}
          className="fixed inset-0 z-50 bg-slate-950/40 backdrop-blur-xs transition-opacity animate-in fade-in"
          aria-label="Close sidebar navigation"
        />
      )}

      {/* Slide-out Drawer */}
      <aside
        className={`fixed top-0 left-0 bottom-0 z-50 w-72 sm:w-80 bg-white border-r border-slate-200 flex flex-col shadow-2xl transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Drawer Header */}
        <div className="flex h-16 items-center justify-between border-b border-slate-100 px-5">
          <Link
            href="/dashboard"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-2 font-black text-lg text-slate-900 tracking-tight"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[#E50914] to-[#B91C1C] text-white shadow-xs">
              <Sparkles className="h-4 w-4 fill-white/20" />
            </div>
            <span>SirfShoot <span className="text-[#E50914]">AI</span></span>
          </Link>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-800"
            aria-label="Close drawer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* User Card */}
        <div className="border-b border-slate-100 bg-slate-50/60 p-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-[#E50914]/10 text-[#E50914] flex items-center justify-center font-bold text-sm border border-[#E50914]/20">
              {state.name.slice(0, 2).toUpperCase()}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-xs text-slate-900 truncate">{state.name}</span>
                {state.role === 'admin' && (
                  <span className="rounded bg-purple-100 px-1 py-0.2 text-[9px] font-black text-purple-700">
                    ADMIN
                  </span>
                )}
              </div>
              <p className="text-[11px] text-slate-500 truncate">{state.email}</p>
            </div>
          </div>
        </div>

        {/* Nav Links Container */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
          {/* Main Tools */}
          <div>
            <div className="px-3 pb-2 text-[10px] font-black uppercase tracking-wider text-slate-400">
              Core Tools
            </div>
            <nav className="space-y-1">
              {mainTools.map((t) => {
                const Icon = t.icon;
                const active = pathname === t.url;
                return (
                  <Link
                    key={t.url}
                    href={t.url}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center justify-between rounded-xl px-3 py-2 text-xs font-bold transition ${
                      active
                        ? 'bg-[#E50914] text-white shadow-xs'
                        : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className={`h-4 w-4 ${active ? 'text-white' : 'text-slate-500'}`} />
                      <span>{t.title}</span>
                    </div>
                    {t.badge && (
                      <span
                        className={`rounded-full px-1.5 py-0.5 text-[9px] font-extrabold uppercase ${
                          active
                            ? 'bg-white/20 text-white'
                            : 'bg-red-50 text-[#E50914] border border-red-200'
                        }`}
                      >
                        {t.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Academy */}
          <div>
            <div className="px-3 pb-2 text-[10px] font-black uppercase tracking-wider text-slate-400">
              Academy & Growth
            </div>
            <nav className="space-y-1">
              {academyTools.map((t) => {
                const Icon = t.icon;
                const active = pathname === t.url;
                return (
                  <Link
                    key={t.url}
                    href={t.url}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center justify-between rounded-xl px-3 py-2 text-xs font-bold transition ${
                      active
                        ? 'bg-purple-600 text-white shadow-xs'
                        : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className={`h-4 w-4 ${active ? 'text-white' : 'text-purple-600'}`} />
                      <span>{t.title}</span>
                    </div>
                    {t.badge && (
                      <span className="rounded-full bg-purple-100 px-1.5 py-0.5 text-[9px] font-extrabold text-purple-700 uppercase">
                        {t.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Premium Tools */}
          <div>
            <div className="px-3 pb-2 text-[10px] font-black uppercase tracking-wider text-slate-400">
              Premium Tools
            </div>
            <nav className="space-y-1">
              {premiumTools.map((t) => {
                const Icon = t.icon;
                const active = pathname === t.url;
                return (
                  <Link
                    key={t.url}
                    href={t.url}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center justify-between rounded-xl px-3 py-2 text-xs font-bold transition ${
                      active
                        ? 'bg-amber-500 text-white shadow-xs'
                        : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className={`h-4 w-4 ${active ? 'text-white' : 'text-amber-500'}`} />
                      <span>{t.title}</span>
                    </div>
                    {t.badge && (
                      <span className="rounded-full bg-amber-100 px-1.5 py-0.5 text-[9px] font-extrabold text-amber-800 uppercase">
                        {t.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Account & Billing */}
          <div>
            <div className="px-3 pb-2 text-[10px] font-black uppercase tracking-wider text-slate-400">
              Account & Billing
            </div>
            <nav className="space-y-1">
              {accountTools.map((t) => {
                const Icon = t.icon;
                const active = pathname === t.url;
                return (
                  <Link
                    key={t.url}
                    href={t.url}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center justify-between rounded-xl px-3 py-2 text-xs font-bold transition ${
                      active
                        ? 'bg-slate-900 text-white shadow-xs'
                        : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className={`h-4 w-4 ${active ? 'text-white' : 'text-slate-500'}`} />
                      <span>{t.title}</span>
                    </div>
                    <ChevronRight className="h-3 w-3 text-slate-400" />
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Drawer Footer */}
        <div className="border-t border-slate-100 p-4 space-y-2">
          <Link
            href="/create"
            onClick={() => setIsOpen(false)}
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#E50914] to-[#B91C1C] py-2.5 text-xs font-bold text-white shadow-md hover:opacity-95 transition"
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span>Launch 9-Agent Studio</span>
          </Link>
          <div className="text-center text-[10px] text-slate-400">
            © 2026 SirfShoot AI • All Rights Reserved
          </div>
        </div>
      </aside>
    </>
  );
}
