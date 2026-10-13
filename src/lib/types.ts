export type LanguageMode = 'hinglish' | 'urdu' | 'roman_urdu' | 'english' | 'hindi';

export type PlanType = 'trial' | 'starter' | 'creator' | 'pro' | 'studio';

export interface ToneFingerprint {
  id: string;
  name: string;
  channelName: string;
  niche: string;
  language: LanguageMode;
  hinglishRatio: number; // 0 to 100%
  vocabularyLevel: 'Everyday Street' | 'Conversational Smart' | 'Analytical Technical' | 'Storyteller Warm';
  signatureVocabulary: string[];
  hookStyle: string;
  signatureTransitions: string[];
  signatureCloses: string[];
  fillerWords: string[];
  bannedWords: string[];
  pacingWpm: number;
  sampleTranscripts?: string[];
  createdAt: string;
}

export interface TopicAngle {
  id: string;
  title: string;
  angleDescription: string;
  ideaScore: number; // 0-100
  searchVolume: 'Spiking' | 'High' | 'Peaking today' | 'Steady';
  competition: 'Low' | 'Medium' | 'High';
  targetAudience: string;
  estimatedRuntimeMin: number;
  sourceSignal: 'Google Trends' | 'YouTube' | 'Dawn / Express' | 'Reddit Pakistan' | 'Twitter / X';
}

export interface VerifiedSource {
  name: string;
  domain: string;
  credibility: 'High' | 'Official' | 'Verified News';
  url: string;
  keyFinding: string;
}

export interface FactCheckItem {
  id: string;
  claim: string;
  status: 'verified' | 'flagged' | 'unresolved';
  confidenceScore: number; // 0-100
  explanation: string;
  source: string;
}

export interface LegalReview {
  overallRisk: 'Safe' | 'Low Risk' | 'Needs Disclaimer';
  defamationChecked: boolean;
  fairUseCompliant: boolean;
  sebiCompliance: {
    isFinancialContent: boolean;
    disclaimerNeeded: boolean;
    disclaimerText?: string;
  };
  notes: string[];
}

export interface ScriptSection {
  id: string;
  type: 'HOOK' | 'SCENE' | 'INTRO' | 'B_ROLL' | 'BODY' | 'PAUSE' | 'SFX' | 'CTA';
  speakerLabel?: string;
  content: string;
  productionCue?: string; // e.g. "[MCU, face camera, neutral backdrop]" or "[B-ROLL: LoC map, archival footage]"
  timestamp: string; // e.g. "00:00"
  durationSec: number;
}

export interface StoryboardScene {
  sceneNumber: number;
  timestamp: string;
  durationSec: number;
  type: 'A-ROLL' | 'B-ROLL' | 'MOTION GRAPHIC';
  framing: 'MCU (Medium Close-Up)' | 'Wide Shot' | 'Close-Up' | 'Overhead' | 'Dutch Angle';
  spokenTextSnippet: string;
  visualDirection: string;
  aiImagePrompt: string;
  bRollKeywords: string[];
  audioCue: string;
  transition: 'Hard cut' | 'Whip pan' | 'Cross dissolve' | 'Zoom in';
  previewImageUrl?: string;
}

export interface ThumbnailVariant {
  id: 'safe' | 'bold' | 'experimental';
  name: 'Safe' | 'Bold' | 'Experimental';
  tagline: string;
  predictedCtr: number; // e.g. 11.4%
  textOverlay: string; // Under 5 words
  visualComposition: string;
  faceDirection: string;
  colorPalette: string[]; // Hex codes e.g. ["#0F172A", "#E50914", "#FBBF24"]
  midjourneyPrompt: string;
  dallEPrompt: string;
  previewImageUrl?: string;
}

export interface SeoPackage {
  titleVariants: Array<{
    title: string;
    score: number;
    hookCategory: 'Curiosity Gap' | 'Urgent Question' | 'Bold Statement';
  }>;
  description: string;
  tags: string[];
  chapters: Array<{
    timestamp: string;
    title: string;
  }>;
  pinnedComment: string;
  suggestedHashtags: string[];
}

export interface ShortClip {
  id: string;
  clipNumber: number;
  title: string;
  hook3Sec: string;
  script: string;
  visualCue: string;
  durationSec: number;
  igCaption: string;
  hashtags: string[];
  whatsAppStatusDraft: string;
  communityPostDraft: string;
}

export interface ProjectData {
  id: string;
  title: string;
  topic: string;
  niche: string;
  language: LanguageMode;
  targetRuntimeMin: number;
  toneFingerprintId: string;
  toneFingerprintName: string;
  status: 'ready' | 'generating' | 'draft';
  currentAgentStep?: number;
  createdAt: string;
  updatedAt: string;

  // Agent 1: Research
  topics: TopicAngle[];
  selectedTopicIndex: number;

  // Agent 2: Script Research Brief
  researchBrief: {
    summary: string;
    keyFacts: string[];
    timeline: string[];
    sources: VerifiedSource[];
  };

  // Agent 3: Fact-Check
  factCheckList: FactCheckItem[];

  // Agent 4: Legal & Policy Review
  legalReview: LegalReview;

  // Agent 5: Script
  script: {
    fullText: string;
    wordCount: number;
    estimatedReadTimeMinutes: number;
    toneMatchScore: number;
    vocabularyScore: number;
    rhythmScore: number;
    hooksScore: number;
    sections: ScriptSection[];
  };

  // Agent 6: Storyboard
  storyboard: {
    scenes: StoryboardScene[];
    totalScenes: number;
    aRollCount: number;
    bRollCount: number;
  };

  // Agent 7: Thumbnails
  thumbnails: {
    overallCtr: number;
    variants: ThumbnailVariant[];
  };

  // Agent 8: SEO & AEO
  seo: SeoPackage;

  // Agent 9: Shorts & Distribution
  shorts: {
    clips: ShortClip[];
    postingSchedule: string;
  };
}

export interface LeadItem {
  id: string;
  name: string;
  phone: string;
  email?: string;
  status: 'novo' | 'contato' | 'visita' | 'proposta' | 'fechado';
  priority: 'baixa' | 'media' | 'alta' | 'urgente';
  source: 'portal' | 'instagram' | 'trafego_pago' | 'indicacao' | 'youtube' | 'outro';
  propertyType?: string;
  budget?: string;
  notes?: string;
  createdAt: string;
}

export interface LeadReminder {
  id: string;
  leadId: string;
  leadName: string;
  title: string;
  remindAt: string;
  completed: boolean;
}

export interface SavedDescription {
  id: string;
  title: string;
  propertyType: string;
  location: string;
  tone: string;
  shortCopy: string;
  detailedCopy: string;
  hashtags: string[];
  createdAt: string;
}

export interface SavedValuation {
  id: string;
  title: string;
  location: string;
  areaSqM: number;
  estimatedValueMin: number;
  estimatedValueAvg: number;
  estimatedValueMax: number;
  pricePerSqM: number;
  marketDemand: 'High' | 'Medium' | 'Stable' | 'Alta' | 'Média' | 'Estável';
  createdAt: string;
}

export interface SavedFinancing {
  id: string;
  propertyValue: number;
  downPayment: number;
  termMonths: number;
  bestBank: string;
  firstInstallment: number;
  lastInstallment: number;
  system: 'SAC' | 'PRICE' | 'DIMINISHING_MUSHARAKAH' | 'EQUAL_INSTALLMENT' | string;
  createdAt: string;
}

export interface VoiceProfile {
  id: string;
  name: string;
  language: string;
  gender: 'male' | 'female';
  style: string;
  previewUrl?: string;
  isCloned?: boolean;
}

export interface CourseLesson {
  id: string;
  moduleTitle: string;
  title: string;
  durationMin: number;
  completed: boolean;
  videoUrl?: string;
  description: string;
  keyTakeaways: string[];
}

export interface UserState {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role?: 'admin' | 'creator';
  channelName: string;
  plan: PlanType;
  creditsRemaining: number;
  creditsTotal: number;
  trialDaysRemaining: number;
  activeFingerprints: ToneFingerprint[];
  projects: ProjectData[];
  leads?: LeadItem[];
  leadReminders?: LeadReminder[];
  savedDescriptions?: SavedDescription[];
  savedValuations?: SavedValuation[];
  savedFinancings?: SavedFinancing[];
  completedLessonIds?: string[];
}

export type MembershipStatus = 'trial' | 'active' | 'past_due' | 'suspended' | 'cancelled' | 'expired';

export type AdminRole = 'super_admin' | 'admin' | 'support' | 'analyst' | 'creator';

export interface AdminMember {
  id: string;
  name: string;
  email: string;
  role: AdminRole;
  plan: PlanType;
  membershipStatus: MembershipStatus;
  creditsRemaining: number;
  creditsTotal: number;
  totalSpentPKR: number;
  billingInterval: 'monthly' | 'annual' | 'trial';
  subscriptionStartedAt: string;
  subscriptionExpiresAt: string;
  createdAt: string;
  lastActiveAt: string;
  notes?: string;
}

export type LedgerTransactionType =
  | 'purchase'
  | 'credit_grant'
  | 'credit_usage'
  | 'refund'
  | 'promotional_credit'
  | 'admin_adjustment'
  | 'subscription_payment';

export type LedgerCategory = 'financial' | 'credit';

export interface LedgerTransaction {
  id: string;
  memberId: string;
  memberName: string;
  memberEmail: string;
  timestamp: string;
  type: LedgerTransactionType;
  category: LedgerCategory;
  description: string;
  amountPKR?: number;
  amountCredits?: number;
  balanceAfterCredits?: number;
  currency: 'PKR';
  paymentReference?: string;
  status: 'completed' | 'pending' | 'failed' | 'reversed';
  initiatedBy: string; // Admin email or 'system'
  reason?: string;
}

export interface MembershipPlan {
  id: PlanType;
  name: string;
  pricePKR: number;
  billingInterval: 'monthly' | 'annual';
  includedScripts: number;
  includedCredits: number;
  activeSubscribers: number;
  status: 'active' | 'inactive';
  features: string[];
}

export interface AdminAuditLog {
  id: string;
  timestamp: string;
  adminEmail: string;
  action: string;
  targetType: 'member' | 'membership' | 'credit' | 'seo' | 'security' | 'system';
  targetId: string;
  details: string;
  beforeValue?: string;
  afterValue?: string;
  reason?: string;
}

export interface PageSeoConfig {
  path: string;
  title: string;
  seoTitle: string;
  metaDescription: string;
  canonicalUrl: string;
  ogTitle: string;
  ogDescription: string;
  indexable: boolean;
  schemaType: 'SoftwareApplication' | 'WebPage' | 'FAQPage' | 'Article';
  lastAudited: string;
  issuesCount: number;
  issues?: string[];
}

