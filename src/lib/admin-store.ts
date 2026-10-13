'use client';

import { useState, useEffect } from 'react';
import {
  AdminMember,
  LedgerTransaction,
  MembershipPlan,
  AdminAuditLog,
  PageSeoConfig,
  PlanType,
  MembershipStatus,
  AdminRole,
} from './types';
import { useCreatorStore } from './store';

const ADMIN_STORAGE_KEY = (typeof window !== 'undefined' && localStorage.getItem('tameeros_admin_data_v1') ? 'tameeros_admin_data_v1' : (typeof window !== 'undefined' && localStorage.getItem('sirfshoot_admin_data_v1') ? 'sirfshoot_admin_data_v1' : 'tameeros_admin_data_v1'));

export const INITIAL_PLANS: MembershipPlan[] = [
  {
    id: 'trial',
    name: 'Free Trial',
    pricePKR: 0,
    billingInterval: 'monthly',
    includedScripts: 2,
    includedCredits: 2,
    activeSubscribers: 142,
    status: 'active',
    features: ['2 Full 9-Agent Video Packages', 'Single Tone Fingerprint', '7-Day Validity', 'No Credit Card Required'],
  },
  {
    id: 'starter',
    name: 'Starter Plan',
    pricePKR: 499,
    billingInterval: 'monthly',
    includedScripts: 3,
    includedCredits: 3,
    activeSubscribers: 86,
    status: 'active',
    features: ['3 Full Video Packages / Mo', 'Complete 9-Agent Pipeline', 'Teleprompter Mode', 'Email Support'],
  },
  {
    id: 'creator',
    name: 'Creator Plan (Most Popular)',
    pricePKR: 999,
    billingInterval: 'monthly',
    includedScripts: 7,
    includedCredits: 7,
    activeSubscribers: 318,
    status: 'active',
    features: ['7 Full Video Packages / Mo', 'Unlimited Tone Fingerprints', '3-Variant Thumbnails', 'Priority WhatsApp Support'],
  },
  {
    id: 'pro',
    name: 'Pro Studio Plan',
    pricePKR: 1999,
    billingInterval: 'monthly',
    includedScripts: 15,
    includedCredits: 15,
    activeSubscribers: 94,
    status: 'active',
    features: ['15 Full Video Packages / Mo', 'Priority AI Pipeline Routing', 'Multi-Channel Workspace', 'Real Estate CRM Integration'],
  },
  {
    id: 'studio',
    name: 'Enterprise Studio',
    pricePKR: 4999,
    billingInterval: 'monthly',
    includedScripts: 50,
    includedCredits: 50,
    activeSubscribers: 18,
    status: 'active',
    features: ['50+ Video Packages', 'Custom Voice Models', 'API Webhooks & Bulk Export', 'Dedicated Account Manager'],
  },
];

export const INITIAL_MEMBERS: AdminMember[] = [
  {
    id: 'mem-admin-01',
    name: 'LLRE UAE Admin',
    email: 'llre.uae@gmail.com',
    role: 'super_admin',
    plan: 'studio',
    membershipStatus: 'active',
    creditsRemaining: 9999,
    creditsTotal: 10000,
    totalSpentPKR: 0,
    billingInterval: 'annual',
    subscriptionStartedAt: '2026-01-01T00:00:00Z',
    subscriptionExpiresAt: '2027-12-31T23:59:59Z',
    createdAt: '2026-01-01T00:00:00Z',
    lastActiveAt: new Date().toISOString(),
    notes: 'Platform Super Administrator with unrestricted permissions and audit access.',
  },
  {
    id: 'mem-001',
    name: 'Hamza Khan',
    email: 'creator@tameeros.com',
    role: 'creator',
    plan: 'creator',
    membershipStatus: 'active',
    creditsRemaining: 18,
    creditsTotal: 25,
    totalSpentPKR: 2997,
    billingInterval: 'monthly',
    subscriptionStartedAt: '2026-08-15T10:00:00Z',
    subscriptionExpiresAt: '2026-11-15T10:00:00Z',
    createdAt: '2026-08-15T09:30:00Z',
    lastActiveAt: '2026-10-12T08:45:00Z',
    notes: 'High-RPM Geopolitics & Tech explainer channel (92K YouTube subscribers).',
  },
  {
    id: 'mem-002',
    name: 'Bilal Ahmed',
    email: 'bilal.ahmed@karachirealty.pk',
    role: 'creator',
    plan: 'pro',
    membershipStatus: 'active',
    creditsRemaining: 12,
    creditsTotal: 30,
    totalSpentPKR: 5997,
    billingInterval: 'monthly',
    subscriptionStartedAt: '2026-07-01T12:00:00Z',
    subscriptionExpiresAt: '2026-11-01T12:00:00Z',
    createdAt: '2026-07-01T11:20:00Z',
    lastActiveAt: '2026-10-11T16:10:00Z',
    notes: 'Karachi luxury real estate broker; uses automated video tours & CRM leads pipeline.',
  },
  {
    id: 'mem-003',
    name: 'Ayesha Siddiqui',
    email: 'ayesha.creator@gmail.com',
    role: 'creator',
    plan: 'starter',
    membershipStatus: 'trial',
    creditsRemaining: 2,
    creditsTotal: 2,
    totalSpentPKR: 0,
    billingInterval: 'trial',
    subscriptionStartedAt: '2026-10-08T14:00:00Z',
    subscriptionExpiresAt: '2026-10-15T14:00:00Z',
    createdAt: '2026-10-08T14:00:00Z',
    lastActiveAt: '2026-10-12T07:15:00Z',
    notes: 'Testing Roman Urdu script generation for female lifestyle & parenting vlog.',
  },
  {
    id: 'mem-004',
    name: 'Tariq Mehmood',
    email: 'tariq.media@fintechpk.org',
    role: 'creator',
    plan: 'creator',
    membershipStatus: 'past_due',
    creditsRemaining: 0,
    creditsTotal: 14,
    totalSpentPKR: 1998,
    billingInterval: 'monthly',
    subscriptionStartedAt: '2026-06-10T08:00:00Z',
    subscriptionExpiresAt: '2026-10-10T08:00:00Z',
    createdAt: '2026-06-10T07:45:00Z',
    lastActiveAt: '2026-10-09T18:30:00Z',
    notes: 'Card payment failed on 10 Oct renewal; grace period notification sent.',
  },
  {
    id: 'mem-005',
    name: 'Saad Farooq',
    email: 'saad@creativelabs.ae',
    role: 'support',
    plan: 'pro',
    membershipStatus: 'active',
    creditsRemaining: 40,
    creditsTotal: 45,
    totalSpentPKR: 3998,
    billingInterval: 'monthly',
    subscriptionStartedAt: '2026-05-20T10:00:00Z',
    subscriptionExpiresAt: '2026-11-20T10:00:00Z',
    createdAt: '2026-05-20T09:15:00Z',
    lastActiveAt: '2026-10-12T09:00:00Z',
    notes: 'Support & Community Lead for UAE diaspora creator network.',
  },
  {
    id: 'mem-006',
    name: 'Zainab Qureshi',
    email: 'zainab.finance@islamicinvest.pk',
    role: 'creator',
    plan: 'starter',
    membershipStatus: 'suspended',
    creditsRemaining: 0,
    creditsTotal: 3,
    totalSpentPKR: 499,
    billingInterval: 'monthly',
    subscriptionStartedAt: '2026-09-01T10:00:00Z',
    subscriptionExpiresAt: '2026-10-01T10:00:00Z',
    createdAt: '2026-09-01T09:50:00Z',
    lastActiveAt: '2026-09-25T11:00:00Z',
    notes: 'Suspended pending SECP regulatory compliance check on stock advice claims.',
  },
];

export const INITIAL_LEDGER: LedgerTransaction[] = [
  {
    id: 'tx-fin-001',
    memberId: 'mem-002',
    memberName: 'Bilal Ahmed',
    memberEmail: 'bilal.ahmed@karachirealty.pk',
    timestamp: '2026-10-01T12:00:00Z',
    type: 'subscription_payment',
    category: 'financial',
    description: 'Pro Plan Monthly Subscription Renewal (PKR 1,999)',
    amountPKR: 1999,
    currency: 'PKR',
    paymentReference: 'PAY-HBL-889102',
    status: 'completed',
    initiatedBy: 'system',
  },
  {
    id: 'tx-crd-002',
    memberId: 'mem-002',
    memberName: 'Bilal Ahmed',
    memberEmail: 'bilal.ahmed@karachirealty.pk',
    timestamp: '2026-10-01T12:00:01Z',
    type: 'credit_grant',
    category: 'credit',
    description: '15 Pro Monthly Video Credits Issued',
    amountCredits: 15,
    balanceAfterCredits: 30,
    currency: 'PKR',
    status: 'completed',
    initiatedBy: 'system',
  },
  {
    id: 'tx-crd-003',
    memberId: 'mem-002',
    memberName: 'Bilal Ahmed',
    memberEmail: 'bilal.ahmed@karachirealty.pk',
    timestamp: '2026-10-04T15:30:00Z',
    type: 'credit_usage',
    category: 'credit',
    description: 'Automated Real Estate Video Generation (DHA Phase 8 Walkthrough)',
    amountCredits: -1,
    balanceAfterCredits: 29,
    currency: 'PKR',
    status: 'completed',
    initiatedBy: 'user',
  },
  {
    id: 'tx-fin-004',
    memberId: 'mem-001',
    memberName: 'Hamza Khan',
    memberEmail: 'creator@tameeros.com',
    timestamp: '2026-10-05T09:00:00Z',
    type: 'purchase',
    category: 'financial',
    description: '10 Additional High-RPM Script Credits Add-On',
    amountPKR: 1299,
    currency: 'PKR',
    paymentReference: 'PAY-JAZZCASH-441209',
    status: 'completed',
    initiatedBy: 'user',
  },
  {
    id: 'tx-crd-005',
    memberId: 'mem-001',
    memberName: 'Hamza Khan',
    memberEmail: 'creator@tameeros.com',
    timestamp: '2026-10-05T09:00:02Z',
    type: 'credit_grant',
    category: 'credit',
    description: '10 Script Pack Credits Credited',
    amountCredits: 10,
    balanceAfterCredits: 21,
    currency: 'PKR',
    status: 'completed',
    initiatedBy: 'system',
  },
  {
    id: 'tx-crd-006',
    memberId: 'mem-001',
    memberName: 'Hamza Khan',
    memberEmail: 'creator@tameeros.com',
    timestamp: '2026-10-08T14:20:00Z',
    type: 'credit_usage',
    category: 'credit',
    description: '9-Agent Pipeline Run: "Pakistan IT Exports Ground Reality"',
    amountCredits: -1,
    balanceAfterCredits: 20,
    currency: 'PKR',
    status: 'completed',
    initiatedBy: 'user',
  },
  {
    id: 'tx-crd-007',
    memberId: 'mem-001',
    memberName: 'Hamza Khan',
    memberEmail: 'creator@tameeros.com',
    timestamp: '2026-10-10T11:10:00Z',
    type: 'admin_adjustment',
    category: 'credit',
    description: 'Courtesy credit issued for network latency during voiceover render',
    amountCredits: 2,
    balanceAfterCredits: 22,
    currency: 'PKR',
    status: 'completed',
    initiatedBy: 'llre.uae@gmail.com',
    reason: 'Customer reported voiceover synthesis timeout retry',
  },
  {
    id: 'tx-fin-008',
    memberId: 'mem-004',
    memberName: 'Tariq Mehmood',
    memberEmail: 'tariq.media@fintechpk.org',
    timestamp: '2026-10-10T08:00:00Z',
    type: 'subscription_payment',
    category: 'financial',
    description: 'Creator Plan Monthly Subscription Renewal (PKR 999)',
    amountPKR: 999,
    currency: 'PKR',
    paymentReference: 'PAY-DECLINED-CARD-991',
    status: 'failed',
    initiatedBy: 'system',
    reason: 'Insufficient funds / issuing bank decline',
  },
];

export const INITIAL_SEO_CONFIGS: PageSeoConfig[] = [
  {
    path: '/',
    title: 'Home Page',
    seoTitle: 'Tameeros Shorts — Just Shoot It, We Handle The Rest',
    metaDescription: 'The AI Content OS for video creators and real estate teams. 9-agent pipeline transforms 1 topic into research, scripts in your tone, storyboards, thumbnails, SEO, and shorts.',
    canonicalUrl: 'https://sirfshoot-ai.vercel.app',
    ogTitle: 'Tameeros Shorts — Turn Video Ideas Into Scripts That Sound Like You',
    ogDescription: '9 AI agents handle research, scripts, fact-check, storyboards, thumbnails, SEO, and shorts. From PKR 499/mo.',
    indexable: true,
    schemaType: 'SoftwareApplication',
    lastAudited: new Date().toISOString(),
    issuesCount: 0,
    issues: [],
  },
  {
    path: '/create',
    title: 'Creative Studio (/create)',
    seoTitle: 'Creative Studio — 9-Agent Autonomous AI Video Production | Tameeros Shorts',
    metaDescription: 'Generate teleprompter-ready YouTube scripts, 14-scene storyboards, 3 Midjourney thumbnail concepts, and viral shorts in 3 minutes.',
    canonicalUrl: 'https://sirfshoot-ai.vercel.app/create',
    ogTitle: 'Tameeros Shorts Creative Studio — Full Video Production OS',
    ogDescription: 'Input a topic, get research, voice-cloned script, storyboard, thumbnails, and SEO.',
    indexable: true,
    schemaType: 'SoftwareApplication',
    lastAudited: new Date().toISOString(),
    issuesCount: 0,
    issues: [],
  },
  {
    path: '/tools',
    title: '12 Free Creator Tools (/tools)',
    seoTitle: '12 Free YouTube & Video Creator Tools | Tameeros Shorts',
    metaDescription: 'Free instant creator tools: 3-Second Hook Generator, Title CTR Predictor, YouTube SEO Grader, Roman Urdu Ratio, and PKR Income Calculator. No signup required.',
    canonicalUrl: 'https://sirfshoot-ai.vercel.app/tools',
    ogTitle: '12 Free Tools for Video Creators — Tameeros Shorts',
    ogDescription: 'Instant free AI tools for YouTube titles, hooks, SEO, income, and tone analysis.',
    indexable: true,
    schemaType: 'WebPage',
    lastAudited: new Date().toISOString(),
    issuesCount: 0,
    issues: [],
  },
  {
    path: '/pricing',
    title: 'Pricing & Plans (/pricing)',
    seoTitle: 'Pricing & Plans — Transparent PKR Creator Rates | Tameeros Shorts',
    metaDescription: 'Start free for 7 days (2 full scripts included). Starter at PKR 499/mo, Creator at PKR 999/mo, Pro at PKR 1,999/mo. All 9 agents on every plan.',
    canonicalUrl: 'https://sirfshoot-ai.vercel.app/pricing',
    ogTitle: 'Tameeros Shorts Pricing — Full 9-Agent Pipeline From PKR 499/mo',
    ogDescription: 'No hidden fees, cancel anytime. Real pricing in PKR for Pakistani and global creators.',
    indexable: true,
    schemaType: 'WebPage',
    lastAudited: new Date().toISOString(),
    issuesCount: 0,
    issues: [],
  },
  {
    path: '/academy',
    title: 'Tameeros Academy (/academy)',
    seoTitle: 'Tameeros Academy — Video Scripting & Channel Monetization Masterclass',
    metaDescription: 'Practical curriculum covering voice cloning, SECP compliance, YouTube Suggested algorithm, and building an automated video studio.',
    canonicalUrl: 'https://sirfshoot-ai.vercel.app/academy',
    ogTitle: 'Tameeros Academy — Master AI Video Production',
    ogDescription: 'Learn to script, rank, and monetize videos with specialist AI agents.',
    indexable: true,
    schemaType: 'Article',
    lastAudited: new Date().toISOString(),
    issuesCount: 0,
    issues: [],
  },
  {
    path: '/leads',
    title: 'CRM Leads Pipeline (/leads)',
    seoTitle: 'Real Estate Leads CRM & WhatsApp Automation | Tameeros Shorts',
    metaDescription: 'Convert high-intent property inquiries into deals. Track buyer stages, schedule follow-up reminders, and generate personalized WhatsApp messages.',
    canonicalUrl: 'https://sirfshoot-ai.vercel.app/leads',
    ogTitle: 'Tameeros Shorts CRM Leads — Real Estate Client Management',
    ogDescription: 'Manage property buyers, stage tracking, and automated WhatsApp follow-ups.',
    indexable: true,
    schemaType: 'SoftwareApplication',
    lastAudited: new Date().toISOString(),
    issuesCount: 0,
    issues: [],
  },
  {
    path: '/voiceover',
    title: 'AI Voiceover Studio (/voiceover)',
    seoTitle: 'AI Voiceover Studio — Neural Audio Synthesis & WAV Export | Tameeros Shorts',
    metaDescription: 'Generate studio-grade narration in natural accents. Multilingual neural voices, pitch and pacing control, teleprompter sync, and audio export.',
    canonicalUrl: 'https://sirfshoot-ai.vercel.app/voiceover',
    ogTitle: 'Tameeros Shorts Voiceover Studio — Professional Audio Narration',
    ogDescription: 'Turn scripts into crystal-clear voiceovers with neural AI audio models.',
    indexable: true,
    schemaType: 'SoftwareApplication',
    lastAudited: new Date().toISOString(),
    issuesCount: 0,
    issues: [],
  },
  {
    path: '/images',
    title: 'Social Post Studio 2.0 (/images)',
    seoTitle: 'Social Post Studio 2.0 & Image Enhancer | Tameeros Shorts',
    metaDescription: 'Generate photorealistic visuals, property staging, Instagram carousels, and high-DPI marketing graphics with one click.',
    canonicalUrl: 'https://sirfshoot-ai.vercel.app/images',
    ogTitle: 'Social Post Studio 2.0 — AI Visual Generation',
    ogDescription: 'Photorealistic image generator with aspect ratios and enhancement tools.',
    indexable: true,
    schemaType: 'SoftwareApplication',
    lastAudited: new Date().toISOString(),
    issuesCount: 0,
    issues: [],
  },
  {
    path: '/video-creator',
    title: 'Automated Video Creator (/video-creator)',
    seoTitle: 'Automated Property Video Creator & Reel Maker | Tameeros Shorts',
    metaDescription: 'Turn property specs, listings, or scripts into fully timed video reels with motion transitions, captions, and audio beds.',
    canonicalUrl: 'https://sirfshoot-ai.vercel.app/video-creator',
    ogTitle: 'Automated Video Creator — Turn Listings into Video Reels',
    ogDescription: 'Produce animated property video tours in under 2 minutes.',
    indexable: true,
    schemaType: 'SoftwareApplication',
    lastAudited: new Date().toISOString(),
    issuesCount: 0,
    issues: [],
  },
  {
    path: '/valuation',
    title: 'AI Property Valuation (/valuation)',
    seoTitle: 'AI Property Valuation & Market Yield Estimator | Tameeros Shorts',
    metaDescription: 'Instant comparative market analysis, price-per-sqft estimation, confidence score, and projected rental yields.',
    canonicalUrl: 'https://sirfshoot-ai.vercel.app/valuation',
    ogTitle: 'AI Property Valuation Calculator — Tameeros Shorts',
    ogDescription: 'Accurate property valuations with market demand and comparable pricing.',
    indexable: true,
    schemaType: 'SoftwareApplication',
    lastAudited: new Date().toISOString(),
    issuesCount: 0,
    issues: [],
  },
  {
    path: '/mortgage',
    title: 'Mortgage Simulator (/mortgage)',
    seoTitle: 'Mortgage & Installment Simulator | Tameeros Shorts',
    metaDescription: 'Simulate down payments, amortization curves, interest scenarios, and generate customer-ready financing proposals.',
    canonicalUrl: 'https://sirfshoot-ai.vercel.app/mortgage',
    ogTitle: 'Mortgage & Financing Simulator — Tameeros Shorts',
    ogDescription: 'Calculate SAC/PRICE monthly installments and down payment requirements.',
    indexable: true,
    schemaType: 'SoftwareApplication',
    lastAudited: new Date().toISOString(),
    issuesCount: 0,
    issues: [],
  },
];

export const INITIAL_AUDIT_LOGS: AdminAuditLog[] = [
  {
    id: 'aud-001',
    timestamp: '2026-10-12T09:15:00Z',
    adminEmail: 'llre.uae@gmail.com',
    action: 'MEMBER_ROLE_UPDATE',
    targetType: 'member',
    targetId: 'mem-005',
    details: 'Promoted Saad Farooq to Support role with read permissions',
    beforeValue: 'role: creator',
    afterValue: 'role: support',
    reason: 'Onboarded UAE regional support representative',
  },
  {
    id: 'aud-002',
    timestamp: '2026-10-10T11:10:00Z',
    adminEmail: 'llre.uae@gmail.com',
    action: 'MANUAL_CREDIT_ADJUSTMENT',
    targetType: 'credit',
    targetId: 'mem-001',
    details: 'Granted 2 courtesy credits to Hamza Khan',
    beforeValue: 'credits: 20',
    afterValue: 'credits: 22',
    reason: 'Customer reported voiceover synthesis timeout retry',
  },
  {
    id: 'aud-003',
    timestamp: '2026-10-09T14:30:00Z',
    adminEmail: 'llre.uae@gmail.com',
    action: 'SEO_METADATA_UPDATE',
    targetType: 'seo',
    targetId: '/tools',
    details: 'Updated meta description and schema type for 12 Free Tools catalog',
    beforeValue: 'schemaType: WebPage',
    afterValue: 'schemaType: WebPage (AEO optimized)',
    reason: 'Enforced Answer Engine Optimization question-answering standards',
  },
  {
    id: 'aud-004',
    timestamp: '2026-10-01T12:05:00Z',
    adminEmail: 'system',
    action: 'SUBSCRIPTION_RENEWAL',
    targetType: 'membership',
    targetId: 'mem-002',
    details: 'Auto-renewed Bilal Ahmed Pro Plan subscription (PKR 1,999)',
    beforeValue: 'expiry: 2026-10-01',
    afterValue: 'expiry: 2026-11-01',
    reason: 'Recurring payment captured via HBL gateway',
  },
];

export interface AdminStoreData {
  members: AdminMember[];
  plans: MembershipPlan[];
  ledger: LedgerTransaction[];
  seoConfigs: PageSeoConfig[];
  auditLogs: AdminAuditLog[];
}

export function getInitialAdminData(): AdminStoreData {
  if (typeof window === 'undefined') {
    return {
      members: INITIAL_MEMBERS,
      plans: INITIAL_PLANS,
      ledger: INITIAL_LEDGER,
      seoConfigs: INITIAL_SEO_CONFIGS,
      auditLogs: INITIAL_AUDIT_LOGS,
    };
  }
  try {
    const saved = localStorage.getItem(ADMIN_STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed && parsed.members) {
        return parsed;
      }
    }
  } catch (err) {
    console.error('Error loading admin state from localStorage:', err);
  }
  return {
    members: INITIAL_MEMBERS,
    plans: INITIAL_PLANS,
    ledger: INITIAL_LEDGER,
    seoConfigs: INITIAL_SEO_CONFIGS,
    auditLogs: INITIAL_AUDIT_LOGS,
  };
}

export function saveAdminData(data: AdminStoreData): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(ADMIN_STORAGE_KEY, JSON.stringify(data));
  } catch (err) {
    console.error('Error saving admin state:', err);
  }
}

export function useAdminStore() {
  const [data, setData] = useState<AdminStoreData>(getInitialAdminData);
  const { state: userState } = useCreatorStore();

  const isSuperAdmin =
    userState.role === 'admin' ||
    userState.email?.toLowerCase() === 'llre.uae@gmail.com';

  const currentAdminEmail = userState.email || 'llre.uae@gmail.com';

  useEffect(() => {
    queueMicrotask(() => {
      setData(getInitialAdminData());
    });
  }, []);

  const updateData = (updater: (prev: AdminStoreData) => AdminStoreData) => {
    setData((prev) => {
      const next = updater(prev);
      saveAdminData(next);
      return next;
    });
  };

  // ---------------------------------------------------------------------------
  // MEMBER MANAGEMENT ACTIONS
  // ---------------------------------------------------------------------------
  const addMember = (newMember: Omit<AdminMember, 'id' | 'createdAt' | 'lastActiveAt'>) => {
    const memberId = `mem-${Date.now()}`;
    const fullMember: AdminMember = {
      ...newMember,
      id: memberId,
      createdAt: new Date().toISOString(),
      lastActiveAt: new Date().toISOString(),
    };

    const auditEntry: AdminAuditLog = {
      id: `aud-${Date.now()}`,
      timestamp: new Date().toISOString(),
      adminEmail: currentAdminEmail,
      action: 'MEMBER_CREATED',
      targetType: 'member',
      targetId: memberId,
      details: `Created member ${fullMember.name} (${fullMember.email}) with ${fullMember.plan} plan`,
      afterValue: JSON.stringify({ role: fullMember.role, plan: fullMember.plan }),
      reason: 'Administrative creation',
    };

    updateData((prev) => ({
      ...prev,
      members: [fullMember, ...prev.members],
      auditLogs: [auditEntry, ...prev.auditLogs],
    }));
  };

  const updateMember = (id: string, updates: Partial<AdminMember>, reason = 'Administrative update') => {
    updateData((prev) => {
      const target = prev.members.find((m) => m.id === id);
      if (!target) return prev;

      const before = JSON.stringify(target);
      const updatedMembers = prev.members.map((m) =>
        m.id === id ? { ...m, ...updates, lastActiveAt: new Date().toISOString() } : m
      );

      const auditEntry: AdminAuditLog = {
        id: `aud-${Date.now()}`,
        timestamp: new Date().toISOString(),
        adminEmail: currentAdminEmail,
        action: 'MEMBER_UPDATED',
        targetType: 'member',
        targetId: id,
        details: `Updated member ${target.name} (${target.email})`,
        beforeValue: before,
        afterValue: JSON.stringify({ ...target, ...updates }),
        reason,
      };

      return {
        ...prev,
        members: updatedMembers,
        auditLogs: [auditEntry, ...prev.auditLogs],
      };
    });
  };

  const setMemberStatus = (id: string, status: MembershipStatus, reason: string) => {
    updateData((prev) => {
      const target = prev.members.find((m) => m.id === id);
      if (!target) return prev;

      const auditEntry: AdminAuditLog = {
        id: `aud-${Date.now()}`,
        timestamp: new Date().toISOString(),
        adminEmail: currentAdminEmail,
        action: status === 'suspended' ? 'MEMBER_SUSPENDED' : 'MEMBER_STATUS_CHANGED',
        targetType: 'member',
        targetId: id,
        details: `Changed status for ${target.name} from ${target.membershipStatus} to ${status}`,
        beforeValue: `status: ${target.membershipStatus}`,
        afterValue: `status: ${status}`,
        reason,
      };

      return {
        ...prev,
        members: prev.members.map((m) =>
          m.id === id ? { ...m, membershipStatus: status, lastActiveAt: new Date().toISOString() } : m
        ),
        auditLogs: [auditEntry, ...prev.auditLogs],
      };
    });
  };

  const deleteMember = (id: string, reason: string) => {
    updateData((prev) => {
      const target = prev.members.find((m) => m.id === id);
      if (!target) return prev;

      const auditEntry: AdminAuditLog = {
        id: `aud-${Date.now()}`,
        timestamp: new Date().toISOString(),
        adminEmail: currentAdminEmail,
        action: 'MEMBER_DELETED',
        targetType: 'member',
        targetId: id,
        details: `Deleted member ${target.name} (${target.email})`,
        beforeValue: JSON.stringify(target),
        reason,
      };

      return {
        ...prev,
        members: prev.members.filter((m) => m.id !== id),
        auditLogs: [auditEntry, ...prev.auditLogs],
      };
    });
  };

  // ---------------------------------------------------------------------------
  // MEMBERSHIP PLAN ACTIONS
  // ---------------------------------------------------------------------------
  const updatePlan = (id: PlanType, updates: Partial<MembershipPlan>, reason = 'Plan terms updated') => {
    updateData((prev) => {
      const target = prev.plans.find((p) => p.id === id);
      if (!target) return prev;

      const auditEntry: AdminAuditLog = {
        id: `aud-${Date.now()}`,
        timestamp: new Date().toISOString(),
        adminEmail: currentAdminEmail,
        action: 'PLAN_UPDATED',
        targetType: 'membership',
        targetId: id,
        details: `Updated plan ${target.name}`,
        beforeValue: JSON.stringify(target),
        afterValue: JSON.stringify({ ...target, ...updates }),
        reason,
      };

      return {
        ...prev,
        plans: prev.plans.map((p) => (p.id === id ? { ...p, ...updates } : p)),
        auditLogs: [auditEntry, ...prev.auditLogs],
      };
    });
  };

  // ---------------------------------------------------------------------------
  // FINANCIAL & CREDIT LEDGER ACTIONS
  // ---------------------------------------------------------------------------
  const adjustMemberCredits = (
    memberId: string,
    creditDelta: number,
    reason: string,
    category: 'credit' | 'financial' = 'credit',
    amountPKR?: number
  ) => {
    updateData((prev) => {
      const member = prev.members.find((m) => m.id === memberId);
      if (!member) return prev;

      const newCreditBalance = Math.max(0, member.creditsRemaining + creditDelta);

      // 1. Create Ledger Transaction
      const ledgerEntry: LedgerTransaction = {
        id: `tx-${Date.now()}`,
        memberId: member.id,
        memberName: member.name,
        memberEmail: member.email,
        timestamp: new Date().toISOString(),
        type: creditDelta >= 0 ? 'admin_adjustment' : 'credit_usage',
        category,
        description: `Manual adjustment: ${reason}`,
        amountCredits: creditDelta,
        balanceAfterCredits: newCreditBalance,
        amountPKR: amountPKR || undefined,
        currency: 'PKR',
        status: 'completed',
        initiatedBy: currentAdminEmail,
        reason,
      };

      // 2. Create Audit Log Entry
      const auditEntry: AdminAuditLog = {
        id: `aud-${Date.now()}`,
        timestamp: new Date().toISOString(),
        adminEmail: currentAdminEmail,
        action: 'MANUAL_CREDIT_ADJUSTMENT',
        targetType: 'credit',
        targetId: member.id,
        details: `Adjusted credits for ${member.name} by ${creditDelta > 0 ? '+' : ''}${creditDelta} (New balance: ${newCreditBalance})`,
        beforeValue: `creditsRemaining: ${member.creditsRemaining}`,
        afterValue: `creditsRemaining: ${newCreditBalance}`,
        reason,
      };

      // 3. Atomically update member balance and append ledger + audit records
      return {
        ...prev,
        members: prev.members.map((m) =>
          m.id === memberId
            ? {
                ...m,
                creditsRemaining: newCreditBalance,
                creditsTotal: creditDelta > 0 ? m.creditsTotal + creditDelta : m.creditsTotal,
              }
            : m
        ),
        ledger: [ledgerEntry, ...prev.ledger],
        auditLogs: [auditEntry, ...prev.auditLogs],
      };
    });
  };

  // ---------------------------------------------------------------------------
  // SEO PAGE CONFIGURATION ACTIONS
  // ---------------------------------------------------------------------------
  const updateSeoConfig = (path: string, updates: Partial<PageSeoConfig>, reason = 'SEO Metadata Update') => {
    updateData((prev) => {
      const target = prev.seoConfigs.find((s) => s.path === path);
      if (!target) return prev;

      const auditEntry: AdminAuditLog = {
        id: `aud-${Date.now()}`,
        timestamp: new Date().toISOString(),
        adminEmail: currentAdminEmail,
        action: 'SEO_METADATA_UPDATE',
        targetType: 'seo',
        targetId: path,
        details: `Updated SEO metadata for ${target.title} (${path})`,
        beforeValue: JSON.stringify(target),
        afterValue: JSON.stringify({ ...target, ...updates }),
        reason,
      };

      return {
        ...prev,
        seoConfigs: prev.seoConfigs.map((s) =>
          s.path === path ? { ...s, ...updates, lastAudited: new Date().toISOString() } : s
        ),
        auditLogs: [auditEntry, ...prev.auditLogs],
      };
    });
  };

  // CSV Export utility
  const exportLedgerCSV = (): string => {
    const headers = [
      'Transaction ID',
      'Date',
      'Member Name',
      'Member Email',
      'Type',
      'Category',
      'Credits Amount',
      'Balance After Credits',
      'Amount PKR',
      'Status',
      'Initiated By',
      'Reason / Description',
    ];

    const rows = data.ledger.map((tx) => [
      tx.id,
      tx.timestamp,
      `"${tx.memberName.replace(/"/g, '""')}"`,
      tx.memberEmail,
      tx.type,
      tx.category,
      tx.amountCredits ?? '',
      tx.balanceAfterCredits ?? '',
      tx.amountPKR ?? '',
      tx.status,
      tx.initiatedBy,
      `"${(tx.reason || tx.description).replace(/"/g, '""')}"`,
    ]);

    return [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
  };

  return {
    data,
    isSuperAdmin,
    currentAdminEmail,
    addMember,
    updateMember,
    setMemberStatus,
    deleteMember,
    updatePlan,
    adjustMemberCredits,
    updateSeoConfig,
    exportLedgerCSV,
  };
}
