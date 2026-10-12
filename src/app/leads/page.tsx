'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SidebarDrawer from '@/components/SidebarDrawer';
import { useCreatorStore } from '@/lib/store';
import { LeadItem, LeadReminder } from '@/lib/types';
import {
  Users,
  Plus,
  Phone,
  MessageSquare,
  Search,
  Bell,
  Trash2,
  Calendar,
  DollarSign,
  ArrowLeft,
  X,
  CheckCircle2,
  Clock,
  Sparkles,
} from 'lucide-react';

const COLUMNS: Array<{ id: LeadItem['status']; title: string; color: string; dot: string }> = [
  { id: 'novo', title: 'New Leads', color: 'border-blue-200 bg-blue-50/50', dot: 'bg-blue-500' },
  { id: 'contato', title: 'Contacted', color: 'border-amber-200 bg-amber-50/50', dot: 'bg-amber-500' },
  { id: 'visita', title: 'Tour Scheduled', color: 'border-purple-200 bg-purple-50/50', dot: 'bg-purple-500' },
  { id: 'proposta', title: 'Proposal Sent', color: 'border-orange-200 bg-orange-50/50', dot: 'bg-orange-500' },
  { id: 'fechado', title: 'Closed Won', color: 'border-emerald-200 bg-emerald-50/50', dot: 'bg-emerald-500' },
];

export default function LeadsPage() {
  const { state, addLead, updateLead, deleteLead, toggleLeadReminder } = useCreatorStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New Lead form
  const [newLeadName, setNewLeadName] = useState('');
  const [newLeadPhone, setNewLeadPhone] = useState('');
  const [newLeadEmail, setNewLeadEmail] = useState('');
  const [newLeadPriority, setNewLeadPriority] = useState<LeadItem['priority']>('alta');
  const [newLeadSource, setNewLeadSource] = useState<LeadItem['source']>('instagram');
  const [newLeadProperty, setNewLeadProperty] = useState('');
  const [newLeadBudget, setNewLeadBudget] = useState('');
  const [newLeadNotes, setNewLeadNotes] = useState('');

  const leads = state.leads || [];
  const reminders = state.leadReminders || [];

  const filteredLeads = leads.filter((l) => {
    const matchesSearch =
      l.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.phone.includes(searchQuery) ||
      (l.propertyType && l.propertyType.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesPriority = priorityFilter === 'all' || l.priority === priorityFilter;
    return matchesSearch && matchesPriority;
  });

  const handleCreateLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLeadName.trim() || !newLeadPhone.trim()) {
      alert('Please provide at least the lead’s Name and Phone number.');
      return;
    }

    const lead: LeadItem = {
      id: `lead-${Date.now()}`,
      name: newLeadName.trim(),
      phone: newLeadPhone.trim(),
      email: newLeadEmail.trim() || undefined,
      priority: newLeadPriority,
      source: newLeadSource,
      propertyType: newLeadProperty.trim() || undefined,
      budget: newLeadBudget.trim() || undefined,
      notes: newLeadNotes.trim() || undefined,
      status: 'novo',
      createdAt: new Date().toISOString(),
    };

    addLead(lead);
    setIsAddModalOpen(false);

    // Reset form
    setNewLeadName('');
    setNewLeadPhone('');
    setNewLeadEmail('');
    setNewLeadProperty('');
    setNewLeadBudget('');
    setNewLeadNotes('');
  };

  const getPriorityBadge = (p: LeadItem['priority']) => {
    switch (p) {
      case 'urgente':
        return { label: 'Urgent', style: 'bg-red-100 text-red-700 border-red-200' };
      case 'alta':
        return { label: 'High', style: 'bg-orange-100 text-orange-700 border-orange-200' };
      case 'media':
        return { label: 'Medium', style: 'bg-amber-100 text-amber-700 border-amber-200' };
      case 'baixa':
        return { label: 'Low', style: 'bg-slate-100 text-slate-700 border-slate-200' };
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#F8FAFC]">
      <SidebarDrawer />
      <Navbar />

      <main className="flex-1 py-8 sm:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
            <div className="flex items-center gap-3">
              <Link
                href="/dashboard"
                className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition"
                title="Back to Dashboard"
              >
                <ArrowLeft className="h-5 w-5" />
              </Link>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-md">
                <Users className="h-5 w-5" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  Leads CRM Pipeline
                </h1>
                <p className="text-xs text-slate-500">
                  Manage buyers, investors, and listing deals with direct WhatsApp messaging and reminders.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsAddModalOpen(true)}
                className="btn-shadow inline-flex items-center gap-1.5 rounded-full bg-[#E50914] px-5 py-2.5 text-xs sm:text-sm font-bold text-white hover:bg-[#B91C1C] transition active:scale-95 shadow-md shadow-red-500/20"
              >
                <Plus className="h-4 w-4" />
                <span>+ Add Lead</span>
              </button>
            </div>
          </div>

          {/* Search, Filter & Scheduled Reminders Bar */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Search & Filter */}
            <div className="lg:col-span-6 flex flex-wrap items-center gap-2">
              <div className="relative flex-1 min-w-[240px]">
                <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search by name, phone or property..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white pl-9 pr-3 py-2 text-xs text-slate-800 placeholder:text-slate-400 focus:border-[#E50914] focus:outline-none shadow-xs"
                />
              </div>

              <select
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
                className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 focus:border-[#E50914] focus:outline-none shadow-xs"
              >
                <option value="all">All Priorities</option>
                <option value="urgente">Urgent</option>
                <option value="alta">High</option>
                <option value="media">Medium</option>
                <option value="baixa">Low</option>
              </select>
            </div>

            {/* Reminders Bar */}
            <div className="lg:col-span-6 rounded-2xl border border-amber-200/80 bg-amber-50/60 p-3 sm:px-4 flex items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2 truncate">
                <Bell className="h-4 w-4 text-amber-600 shrink-0" />
                <span className="font-bold text-slate-800 shrink-0">Follow-up Tasks:</span>
                <span className="text-slate-600 truncate font-medium">
                  {reminders.filter((r) => !r.completed).length > 0
                    ? reminders.filter((r) => !r.completed)[0]?.title
                    : 'No pending reminders. You are all caught up!'}
                </span>
              </div>
              <span className="rounded-full bg-amber-100 border border-amber-300 px-2 py-0.5 text-[10px] font-black text-amber-800 shrink-0">
                {reminders.filter((r) => !r.completed).length} Pending
              </span>
            </div>
          </div>

          {/* Kanban Board Columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-start">
            {COLUMNS.map((col) => {
              const colLeads = filteredLeads.filter((l) => l.status === col.id);
              return (
                <div
                  key={col.id}
                  className={`flex flex-col rounded-2xl border ${col.color} p-3.5 space-y-3 min-h-[500px]`}
                >
                  {/* Column Header */}
                  <div className="flex items-center justify-between pb-2 border-b border-slate-200/60">
                    <div className="flex items-center gap-2">
                      <span className={`h-2.5 w-2.5 rounded-full ${col.dot}`} />
                      <h3 className="font-extrabold text-xs text-slate-900 tracking-tight">
                        {col.title}
                      </h3>
                    </div>
                    <span className="rounded-full bg-white px-2 py-0.5 text-[10px] font-black text-slate-600 shadow-2xs">
                      {colLeads.length}
                    </span>
                  </div>

                  {/* Leads Cards */}
                  <div className="space-y-3 flex-1 overflow-y-auto">
                    {colLeads.length === 0 ? (
                      <div className="rounded-xl border border-dashed border-slate-300/80 p-6 text-center text-[11px] text-slate-400 font-medium">
                        No leads in this stage
                      </div>
                    ) : (
                      colLeads.map((lead) => {
                        const pri = getPriorityBadge(lead.priority);
                        return (
                          <div
                            key={lead.id}
                            className="rounded-xl border border-slate-200/80 bg-white p-3.5 shadow-xs space-y-2.5 transition hover:shadow-md"
                          >
                            <div className="flex items-start justify-between gap-1">
                              <div>
                                <h4 className="font-extrabold text-xs text-slate-900 leading-snug">
                                  {lead.name}
                                </h4>
                                <p className="text-[11px] text-slate-500 font-mono">{lead.phone}</p>
                              </div>
                              <span
                                className={`rounded px-1.5 py-0.5 text-[9px] font-bold border ${pri.style}`}
                              >
                                {pri.label}
                              </span>
                            </div>

                            {lead.propertyType && (
                              <div className="text-[11px] text-slate-600 font-semibold line-clamp-1">
                                🏠 {lead.propertyType}
                              </div>
                            )}

                            {lead.budget && (
                              <div className="text-[11px] text-emerald-700 font-bold font-mono">
                                💰 {lead.budget}
                              </div>
                            )}

                            {lead.notes && (
                              <p className="text-[10px] text-slate-500 line-clamp-2 leading-relaxed bg-slate-50 p-1.5 rounded">
                                {lead.notes}
                              </p>
                            )}

                            {/* Move Pipeline Stage Dropdown */}
                            <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-1">
                              <select
                                value={lead.status}
                                onChange={(e) =>
                                  updateLead(lead.id, {
                                    status: e.target.value as LeadItem['status'],
                                  })
                                }
                                className="rounded-lg border border-slate-200 bg-slate-50 px-2 py-1 text-[10px] font-semibold text-slate-700 focus:outline-none"
                              >
                                <option value="novo">New</option>
                                <option value="contato">Contacted</option>
                                <option value="visita">Tour / Demo</option>
                                <option value="proposta">Proposal</option>
                                <option value="fechado">Closed Won</option>
                              </select>

                              {/* Direct WhatsApp & Call Buttons */}
                              <div className="flex items-center gap-1">
                                <a
                                  href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, '')}`}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="flex h-6 w-6 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700 hover:bg-emerald-200 transition"
                                  title="Chat on WhatsApp"
                                >
                                  <MessageSquare className="h-3 w-3" />
                                </a>
                                <a
                                  href={`tel:${lead.phone}`}
                                  className="flex h-6 w-6 items-center justify-center rounded-lg bg-blue-100 text-blue-700 hover:bg-blue-200 transition"
                                  title="Direct Call"
                                >
                                  <Phone className="h-3 w-3" />
                                </a>
                                <button
                                  type="button"
                                  onClick={() => deleteLead(lead.id)}
                                  className="flex h-6 w-6 items-center justify-center rounded-lg text-slate-400 hover:bg-red-50 hover:text-red-600 transition"
                                  title="Delete Lead"
                                >
                                  <Trash2 className="h-3 w-3" />
                                </button>
                              </div>
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>

      {/* Add Lead Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            role="button"
            tabIndex={0}
            onClick={() => setIsAddModalOpen(false)}
            onKeyDown={(e) => {
              if (e.key === 'Escape') setIsAddModalOpen(false);
            }}
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity animate-in fade-in"
            aria-label="Close dialog"
          />

          <div className="relative w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-2xl animate-in zoom-in-95 duration-200">
            <button
              type="button"
              onClick={() => setIsAddModalOpen(false)}
              className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="space-y-1 mb-5">
              <h3 className="text-xl font-black text-slate-900 tracking-tight">
                Add New Lead
              </h3>
              <p className="text-xs text-slate-500">
                Register a new client or investor into your sales pipeline.
              </p>
            </div>

            <form onSubmit={handleCreateLead} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Farhan Ali"
                    value={newLeadName}
                    onChange={(e) => setNewLeadName(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs text-slate-800 focus:border-[#E50914] focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Phone (WhatsApp) *</label>
                  <input
                    type="text"
                    required
                    placeholder="+92 300 1234567"
                    value={newLeadPhone}
                    onChange={(e) => setNewLeadPhone(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs text-slate-800 font-mono focus:border-[#E50914] focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Email Address</label>
                  <input
                    type="email"
                    placeholder="client@gmail.com"
                    value={newLeadEmail}
                    onChange={(e) => setNewLeadEmail(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs text-slate-800 focus:border-[#E50914] focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Priority</label>
                  <select
                    value={newLeadPriority}
                    onChange={(e) => setNewLeadPriority(e.target.value as LeadItem['priority'])}
                    className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-800 focus:border-[#E50914] focus:outline-none"
                  >
                    <option value="urgente">Urgent</option>
                    <option value="alta">High</option>
                    <option value="media">Medium</option>
                    <option value="baixa">Low</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Interested Property</label>
                  <input
                    type="text"
                    placeholder="e.g. Penthouse Bahria Town"
                    value={newLeadProperty}
                    onChange={(e) => setNewLeadProperty(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs text-slate-800 focus:border-[#E50914] focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Budget / Capital</label>
                  <input
                    type="text"
                    placeholder="e.g. PKR 45,000,000"
                    value={newLeadBudget}
                    onChange={(e) => setNewLeadBudget(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs text-slate-800 font-mono focus:border-[#E50914] focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">Notes & Client Details</label>
                <textarea
                  rows={2}
                  placeholder="Specific requirements, timeframe, preferred banking partner..."
                  value={newLeadNotes}
                  onChange={(e) => setNewLeadNotes(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 p-2.5 text-xs text-slate-800 placeholder:text-slate-400 focus:border-[#E50914] focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-[#E50914] px-5 py-2 text-xs font-bold text-white hover:bg-[#B91C1C] transition shadow-md"
                >
                  Save Lead
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
