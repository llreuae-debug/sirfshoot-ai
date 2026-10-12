'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Users,
  Search,
  Plus,
  Filter,
  ArrowUpDown,
  MoreVertical,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Ban,
  UserCheck,
  Eye,
  Edit2,
  Trash2,
  Coins,
  Shield,
  X,
  Mail,
  Calendar,
  Sparkles,
} from 'lucide-react';
import AdminLayout from '@/components/AdminLayout';
import { useAdminStore } from '@/lib/admin-store';
import { AdminMember, MembershipStatus, PlanType, AdminRole } from '@/lib/types';

export default function MembersAdminPage() {
  const {
    data,
    addMember,
    updateMember,
    setMemberStatus,
    deleteMember,
    adjustMemberCredits,
  } = useAdminStore();

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [planFilter, setPlanFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'createdAt' | 'name' | 'credits' | 'spent'>('createdAt');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;

  // Modals state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<AdminMember | null>(null);
  const [creditAdjustmentMember, setCreditAdjustmentMember] = useState<AdminMember | null>(null);
  const [statusConfirmMember, setStatusConfirmMember] = useState<{ member: AdminMember; nextStatus: MembershipStatus } | null>(null);

  // Form states
  const [newMemberForm, setNewMemberForm] = useState({
    name: '',
    email: '',
    plan: 'creator' as PlanType,
    role: 'creator' as AdminRole,
    initialCredits: 7,
    notes: '',
  });

  const [adjustmentForm, setAdjustmentForm] = useState({
    delta: 5,
    reason: 'Promotional creator package addition',
  });

  const [statusReason, setStatusReason] = useState('');

  // Filter & Sort Logic
  const filteredMembers = useMemo(() => {
    return data.members
      .filter((m) => {
        const matchesSearch =
          m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          m.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          m.id.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'all' || m.membershipStatus === statusFilter;
        const matchesPlan = planFilter === 'all' || m.plan === planFilter;
        return matchesSearch && matchesStatus && matchesPlan;
      })
      .sort((a, b) => {
        let valA: string | number = '';
        let valB: string | number = '';

        if (sortBy === 'name') {
          valA = a.name.toLowerCase();
          valB = b.name.toLowerCase();
        } else if (sortBy === 'credits') {
          valA = a.creditsRemaining;
          valB = b.creditsRemaining;
        } else if (sortBy === 'spent') {
          valA = a.totalSpentPKR;
          valB = b.totalSpentPKR;
        } else {
          valA = new Date(a.createdAt).getTime();
          valB = new Date(b.createdAt).getTime();
        }

        if (sortOrder === 'asc') return valA > valB ? 1 : -1;
        return valA < valB ? 1 : -1;
      });
  }, [data.members, searchTerm, statusFilter, planFilter, sortBy, sortOrder]);

  const totalPages = Math.ceil(filteredMembers.length / pageSize) || 1;
  const paginatedMembers = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredMembers.slice(start, start + pageSize);
  }, [filteredMembers, currentPage, pageSize]);

  // Handlers
  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMemberForm.name.trim() || !newMemberForm.email.trim()) return;

    // Check duplicate email
    if (data.members.some((m) => m.email.toLowerCase() === newMemberForm.email.toLowerCase())) {
      alert('A member with this email address already exists in the system.');
      return;
    }

    addMember({
      name: newMemberForm.name.trim(),
      email: newMemberForm.email.trim(),
      plan: newMemberForm.plan,
      role: newMemberForm.role,
      membershipStatus: 'active',
      creditsRemaining: Number(newMemberForm.initialCredits),
      creditsTotal: Number(newMemberForm.initialCredits),
      totalSpentPKR: 0,
      billingInterval: 'monthly',
      subscriptionStartedAt: new Date().toISOString(),
      subscriptionExpiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      notes: newMemberForm.notes.trim(),
    });

    setIsAddModalOpen(false);
    setNewMemberForm({
      name: '',
      email: '',
      plan: 'creator',
      role: 'creator',
      initialCredits: 7,
      notes: '',
    });
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingMember) return;

    updateMember(editingMember.id, {
      name: editingMember.name,
      plan: editingMember.plan,
      role: editingMember.role,
      notes: editingMember.notes,
    });

    setEditingMember(null);
  };

  const handleCreditAdjustmentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!creditAdjustmentMember) return;
    if (!adjustmentForm.reason.trim()) {
      alert('A valid operational reason is required for auditable credit adjustments.');
      return;
    }

    adjustMemberCredits(
      creditAdjustmentMember.id,
      Number(adjustmentForm.delta),
      adjustmentForm.reason.trim()
    );

    setCreditAdjustmentMember(null);
    setAdjustmentForm({ delta: 5, reason: '' });
  };

  const handleStatusChangeConfirm = () => {
    if (!statusConfirmMember) return;
    setMemberStatus(
      statusConfirmMember.member.id,
      statusConfirmMember.nextStatus,
      statusReason || `Status transition to ${statusConfirmMember.nextStatus}`
    );
    setStatusConfirmMember(null);
    setStatusReason('');
  };

  const getStatusBadge = (status: MembershipStatus) => {
    switch (status) {
      case 'active':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-black bg-emerald-500/10 text-emerald-700 border border-emerald-500/20">
            <CheckCircle2 className="h-3 w-3" /> Active
          </span>
        );
      case 'trial':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-black bg-amber-500/10 text-amber-700 border border-amber-500/20">
            <Clock className="h-3 w-3" /> Free Trial
          </span>
        );
      case 'past_due':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-black bg-rose-500/10 text-rose-700 border border-rose-500/20">
            <AlertTriangle className="h-3 w-3" /> Past Due
          </span>
        );
      case 'suspended':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-black bg-red-600/10 text-red-700 border border-red-600/20">
            <Ban className="h-3 w-3" /> Suspended
          </span>
        );
      case 'cancelled':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-black bg-slate-500/10 text-slate-700 border border-slate-500/20">
            Cancelled
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-black bg-slate-200 text-slate-700">
            {status}
          </span>
        );
    }
  };

  return (
    <AdminLayout
      title="Member Directory"
      subtitle="Comprehensive member accounts, subscription tiers, internal credit balances, and role authorization."
      action={
        <button
          type="button"
          onClick={() => setIsAddModalOpen(true)}
          className="btn-3d-yellow px-4 py-2.5 rounded-xl text-xs font-black text-[#071B3A] flex items-center gap-2 cursor-pointer shadow-md"
        >
          <Plus className="h-4 w-4" />
          <span>Add New Member</span>
        </button>
      }
    >
      {/* Search and Filters Bar */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search by name, email or ID..."
              className="w-full pl-10 pr-4 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-[#071B3A] font-medium"
            />
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-slate-400 hidden sm:block" />
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 focus:bg-white focus:outline-none focus:border-[#071B3A] font-semibold text-slate-700 cursor-pointer"
            >
              <option value="all">All Statuses</option>
              <option value="active">Active</option>
              <option value="trial">Free Trial</option>
              <option value="past_due">Past Due</option>
              <option value="suspended">Suspended</option>
              <option value="cancelled">Cancelled</option>
            </select>

            {/* Plan Filter */}
            <select
              value={planFilter}
              onChange={(e) => {
                setPlanFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 focus:bg-white focus:outline-none focus:border-[#071B3A] font-semibold text-slate-700 cursor-pointer"
            >
              <option value="all">All Plans</option>
              <option value="trial">Trial</option>
              <option value="starter">Starter</option>
              <option value="creator">Creator</option>
              <option value="pro">Pro</option>
              <option value="studio">Studio</option>
            </select>

            {/* Sort Filter */}
            <select
              value={`${sortBy}-${sortOrder}`}
              onChange={(e) => {
                const [sb, so] = e.target.value.split('-') as [
                  'createdAt' | 'name' | 'credits' | 'spent',
                  'asc' | 'desc'
                ];
                setSortBy(sb);
                setSortOrder(so);
              }}
              className="text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 focus:bg-white focus:outline-none focus:border-[#071B3A] font-semibold text-slate-700 cursor-pointer"
            >
              <option value="createdAt-desc">Newest First</option>
              <option value="createdAt-asc">Oldest First</option>
              <option value="name-asc">Name (A-Z)</option>
              <option value="credits-desc">Credits (Highest)</option>
              <option value="spent-desc">Total Spent (Highest)</option>
            </select>
          </div>
        </div>

        {/* Quick Stats Summary */}
        <div className="flex items-center gap-6 pt-2 border-t border-slate-100 text-xs text-slate-500 font-medium">
          <span>
            Showing <strong className="text-slate-900">{filteredMembers.length}</strong> of{' '}
            <strong className="text-slate-900">{data.members.length}</strong> members
          </span>
          <span className="hidden sm:inline">
            Active: <strong className="text-emerald-700">{data.members.filter((m) => m.membershipStatus === 'active').length}</strong>
          </span>
          <span className="hidden sm:inline">
            Trial: <strong className="text-amber-700">{data.members.filter((m) => m.membershipStatus === 'trial').length}</strong>
          </span>
          <span className="hidden sm:inline">
            Suspended: <strong className="text-red-700">{data.members.filter((m) => m.membershipStatus === 'suspended').length}</strong>
          </span>
        </div>
      </div>

      {/* Members Table */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50/80 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-3.5 px-4">Member</th>
                <th className="py-3.5 px-4">Role & Tier</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-center">Remaining Credits</th>
                <th className="py-3.5 px-4 text-right">Total Spent</th>
                <th className="py-3.5 px-4">Registered</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
              {paginatedMembers.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-400">
                    <Users className="h-8 w-8 mx-auto mb-2 opacity-40" />
                    <p className="font-semibold text-slate-600">No members match your criteria</p>
                    <p className="text-xs text-slate-400 mt-1">Try clearing search filters or add a new member.</p>
                  </td>
                </tr>
              ) : (
                paginatedMembers.map((member) => (
                  <tr key={member.id} className="hover:bg-slate-50/70 transition">
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <div className="h-9 w-9 rounded-full bg-[#071B3A] text-white flex items-center justify-center font-black text-xs shrink-0">
                          {member.name.slice(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <Link
                            href={`/admin/members/${member.id}`}
                            className="font-bold text-slate-900 hover:text-blue-600 flex items-center gap-1.5 transition"
                          >
                            <span>{member.name}</span>
                            {member.role === 'super_admin' && (
                              <Shield className="h-3 w-3 text-purple-600" />
                            )}
                          </Link>
                          <div className="text-[11px] text-slate-500 font-mono">{member.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-slate-900 capitalize">{member.plan}</div>
                      <div className="text-[11px] text-slate-400 capitalize">{member.role.replace('_', ' ')}</div>
                    </td>
                    <td className="py-3.5 px-4">{getStatusBadge(member.membershipStatus)}</td>
                    <td className="py-3.5 px-4 text-center">
                      <span className="font-mono font-bold text-slate-900 bg-amber-500/10 text-amber-900 px-2.5 py-1 rounded-lg">
                        {member.creditsRemaining} / {member.creditsTotal}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right font-mono font-bold text-slate-900">
                      PKR {member.totalSpentPKR.toLocaleString()}
                    </td>
                    <td className="py-3.5 px-4 text-slate-500 text-[11px]">
                      {new Date(member.createdAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <Link
                          href={`/admin/members/${member.id}`}
                          title="View Details"
                          className="p-1.5 rounded-lg text-slate-500 hover:text-[#071B3A] hover:bg-slate-100 transition"
                        >
                          <Eye className="h-4 w-4" />
                        </Link>
                        <button
                          type="button"
                          onClick={() => setCreditAdjustmentMember(member)}
                          title="Adjust Credits"
                          className="p-1.5 rounded-lg text-amber-600 hover:bg-amber-50 transition cursor-pointer"
                        >
                          <Coins className="h-4 w-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setEditingMember(member)}
                          title="Edit Profile"
                          className="p-1.5 rounded-lg text-blue-600 hover:bg-blue-50 transition cursor-pointer"
                        >
                          <Edit2 className="h-4 w-4" />
                        </button>
                        {member.membershipStatus === 'active' ? (
                          <button
                            type="button"
                            onClick={() =>
                              setStatusConfirmMember({ member, nextStatus: 'suspended' })
                            }
                            title="Suspend Account"
                            className="p-1.5 rounded-lg text-rose-600 hover:bg-rose-50 transition cursor-pointer"
                          >
                            <Ban className="h-4 w-4" />
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={() =>
                              setStatusConfirmMember({ member, nextStatus: 'active' })
                            }
                            title="Reactivate Account"
                            className="p-1.5 rounded-lg text-emerald-600 hover:bg-emerald-50 transition cursor-pointer"
                          >
                            <UserCheck className="h-4 w-4" />
                          </button>
                        )}
                      </div>
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

      {/* ==================================================================== */}
      {/* ADD MEMBER MODAL */}
      {/* ==================================================================== */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full border border-slate-200 shadow-2xl p-6 space-y-5 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="h-9 w-9 rounded-xl bg-[#071B3A] text-white flex items-center justify-center">
                  <Plus className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-black text-slate-900 text-base">Register New Member</h3>
                  <p className="text-xs text-slate-500">Create an authenticated member with verified credentials.</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="space-y-4 text-xs font-medium">
              <div>
                <label className="block text-slate-700 font-bold mb-1.5">Full Name</label>
                <input
                  type="text"
                  required
                  value={newMemberForm.name}
                  onChange={(e) => setNewMemberForm({ ...newMemberForm, name: e.target.value })}
                  placeholder="e.g. Asad Siddiqui"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-[#071B3A]"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1.5">Email Address</label>
                <input
                  type="email"
                  required
                  value={newMemberForm.email}
                  onChange={(e) => setNewMemberForm({ ...newMemberForm, email: e.target.value })}
                  placeholder="e.g. asad@agency.pk"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-[#071B3A]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-bold mb-1.5">Membership Plan</label>
                  <select
                    value={newMemberForm.plan}
                    onChange={(e) =>
                      setNewMemberForm({ ...newMemberForm, plan: e.target.value as PlanType })
                    }
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-[#071B3A] font-semibold text-slate-700"
                  >
                    <option value="trial">Free Trial (2 scripts)</option>
                    <option value="starter">Starter Plan (3 scripts)</option>
                    <option value="creator">Creator Plan (7 scripts)</option>
                    <option value="pro">Pro Studio (15 scripts)</option>
                    <option value="studio">Enterprise Studio (50 scripts)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1.5">Initial Credits</label>
                  <input
                    type="number"
                    min="0"
                    max="1000"
                    value={newMemberForm.initialCredits}
                    onChange={(e) =>
                      setNewMemberForm({ ...newMemberForm, initialCredits: Number(e.target.value) })
                    }
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-[#071B3A]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1.5">Administrative Role</label>
                <select
                  value={newMemberForm.role}
                  onChange={(e) =>
                    setNewMemberForm({ ...newMemberForm, role: e.target.value as AdminRole })
                  }
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-[#071B3A] font-semibold text-slate-700"
                >
                  <option value="creator">Creator (Standard User)</option>
                  <option value="support">Support Agent</option>
                  <option value="content_manager">Content Manager</option>
                  <option value="analyst">Analyst</option>
                  <option value="admin">Administrator</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1.5">Internal Notes</label>
                <textarea
                  rows={2}
                  value={newMemberForm.notes}
                  onChange={(e) => setNewMemberForm({ ...newMemberForm, notes: e.target.value })}
                  placeholder="e.g. Real estate influencer referred by marketing team"
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-[#071B3A]"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 font-bold text-slate-600 hover:bg-slate-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-3d-yellow px-5 py-2.5 rounded-xl font-black text-[#071B3A] cursor-pointer"
                >
                  Save & Activate Member
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* EDIT MEMBER MODAL */}
      {/* ==================================================================== */}
      {editingMember && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full border border-slate-200 shadow-2xl p-6 space-y-5 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="h-9 w-9 rounded-xl bg-blue-600 text-white flex items-center justify-center">
                  <Edit2 className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-black text-slate-900 text-base">Edit Member Profile</h3>
                  <p className="text-xs text-slate-500">{editingMember.email}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setEditingMember(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleEditSubmit} className="space-y-4 text-xs font-medium">
              <div>
                <label className="block text-slate-700 font-bold mb-1.5">Full Name</label>
                <input
                  type="text"
                  required
                  value={editingMember.name}
                  onChange={(e) => setEditingMember({ ...editingMember, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-[#071B3A]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-bold mb-1.5">Plan</label>
                  <select
                    value={editingMember.plan}
                    onChange={(e) =>
                      setEditingMember({ ...editingMember, plan: e.target.value as PlanType })
                    }
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-[#071B3A] font-semibold text-slate-700"
                  >
                    <option value="trial">Trial</option>
                    <option value="starter">Starter</option>
                    <option value="creator">Creator</option>
                    <option value="pro">Pro</option>
                    <option value="studio">Studio</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1.5">Role</label>
                  <select
                    value={editingMember.role}
                    onChange={(e) =>
                      setEditingMember({ ...editingMember, role: e.target.value as AdminRole })
                    }
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-[#071B3A] font-semibold text-slate-700"
                  >
                    <option value="creator">Creator</option>
                    <option value="support">Support</option>
                    <option value="content_manager">Content Manager</option>
                    <option value="analyst">Analyst</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1.5">Administrative Notes</label>
                <textarea
                  rows={3}
                  value={editingMember.notes || ''}
                  onChange={(e) => setEditingMember({ ...editingMember, notes: e.target.value })}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-[#071B3A]"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setEditingMember(null)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 font-bold text-slate-600 hover:bg-slate-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-3d-yellow px-5 py-2.5 rounded-xl font-black text-[#071B3A] cursor-pointer"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* MANUAL CREDIT ADJUSTMENT MODAL */}
      {/* ==================================================================== */}
      {creditAdjustmentMember && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full border border-slate-200 shadow-2xl p-6 space-y-5 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="h-9 w-9 rounded-xl bg-amber-500 text-slate-900 flex items-center justify-center">
                  <Coins className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-black text-slate-900 text-base">Adjust Usage Credits</h3>
                  <p className="text-xs text-slate-500">
                    Member: {creditAdjustmentMember.name} (Current balance: {creditAdjustmentMember.creditsRemaining})
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setCreditAdjustmentMember(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleCreditAdjustmentSubmit} className="space-y-4 text-xs font-medium">
              <div>
                <label className="block text-slate-700 font-bold mb-1.5">
                  Credit Delta (Positive to grant, Negative to deduct)
                </label>
                <input
                  type="number"
                  required
                  value={adjustmentForm.delta}
                  onChange={(e) =>
                    setAdjustmentForm({ ...adjustmentForm, delta: Number(e.target.value) })
                  }
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-[#071B3A] font-mono text-sm font-bold"
                />
                <p className="text-[11px] text-slate-500 mt-1">
                  New calculated balance:{' '}
                  <strong className="text-slate-900">
                    {creditAdjustmentMember.creditsRemaining + Number(adjustmentForm.delta)} credits
                  </strong>
                </p>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1.5">
                  Mandatory Audit Reason <span className="text-red-600">*</span>
                </label>
                <textarea
                  rows={2}
                  required
                  value={adjustmentForm.reason}
                  onChange={(e) =>
                    setAdjustmentForm({ ...adjustmentForm, reason: e.target.value })
                  }
                  placeholder="e.g. Granted 5 credits due to verified generation timeout issue #482"
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-[#071B3A]"
                />
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-[11px] text-amber-900 leading-relaxed">
                <strong>Auditable Ledger Notice:</strong> This action will atomically write a ledger entry with your administrative signature and create an immutable audit record.
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setCreditAdjustmentMember(null)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 font-bold text-slate-600 hover:bg-slate-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-3d-yellow px-5 py-2.5 rounded-xl font-black text-[#071B3A] cursor-pointer"
                >
                  Confirm Adjustment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* STATUS CHANGE CONFIRMATION MODAL */}
      {/* ==================================================================== */}
      {statusConfirmMember && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full border border-slate-200 shadow-2xl p-6 space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center gap-3 text-rose-600">
              <div className="h-10 w-10 rounded-xl bg-rose-50 border border-rose-200 flex items-center justify-center">
                <AlertTriangle className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-black text-slate-900 text-base">Confirm Account Status Transition</h3>
                <p className="text-xs text-slate-500">
                  Transition to <strong className="uppercase">{statusConfirmMember.nextStatus}</strong>
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Are you sure you want to transition <strong>{statusConfirmMember.member.name}</strong> to{' '}
              <span className="font-bold uppercase text-slate-900">{statusConfirmMember.nextStatus}</span>? This will immediately take effect across all sessions.
            </p>

            <div>
              <label className="block text-xs text-slate-700 font-bold mb-1">Audit Reason</label>
              <input
                type="text"
                value={statusReason}
                onChange={(e) => setStatusReason(e.target.value)}
                placeholder="e.g. Terms violation or user requested suspension"
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none"
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setStatusConfirmMember(null)}
                className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleStatusChangeConfirm}
                className="px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-black cursor-pointer"
              >
                Confirm Status Transition
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
