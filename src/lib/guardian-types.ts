export type HealthStatus = 'healthy' | 'degraded' | 'critical' | 'maintenance';

export type HealthCategory = 'frontend' | 'backend' | 'ai_provider' | 'database' | 'storage' | 'scheduler';

export interface HealthComponent {
  id: string;
  name: string;
  category: HealthCategory;
  status: HealthStatus;
  latencyMs: number;
  lastChecked: string;
  uptimePercent: number;
  details: string;
  errorRate: number; // percentage (e.g. 0.02 = 0.02%)
}

export type IncidentSeverity = 'P0' | 'P1' | 'P2' | 'P3';

export type IncidentStatus =
  | 'new'
  | 'investigating'
  | 'repair_proposed'
  | 'awaiting_approval'
  | 'repairing'
  | 'verifying'
  | 'resolved'
  | 'escalated';

export interface RootCauseAnalysis {
  summary: string;
  likelyCause: string;
  verifiedFacts: string[];
  hypotheses: string[];
  affectedComponents: string[];
  userImpact: string;
  recommendation: string;
  riskLevel: 'low' | 'medium' | 'high';
  requiresApproval: boolean;
  proposedVerification: string;
  rollbackPlan: string;
}

export interface RepairResult {
  actionId: string;
  actionName: string;
  executedAt: string;
  executedBy: string; // 'guardian_autonomous' or admin email
  success: boolean;
  output: string;
  verificationPassed: boolean;
  rollbackTriggered: boolean;
}

export interface Incident {
  id: string; // e.g. INC-1042
  title: string;
  severity: IncidentSeverity;
  status: IncidentStatus;
  service: string;
  route?: string;
  errorMessage: string;
  sanitizedStackTrace?: string;
  createdAt: string;
  updatedAt: string;
  occurrenceCount: number;
  reportedBy: 'system_monitor' | 'client_assistant' | 'admin';
  userEmail?: string;
  rootCauseAnalysis?: RootCauseAnalysis;
  suggestedRepairId?: string;
  repairResult?: RepairResult;
  timeline: {
    timestamp: string;
    message: string;
    actor: string;
  }[];
}

export type RepairTier = 'tier1_automatic' | 'tier2_approval_required' | 'tier3_restricted';

export interface AllowlistedRepairAction {
  id: string;
  name: string;
  description: string;
  tier: RepairTier;
  riskLevel: 'low' | 'medium' | 'high';
  targetService: string;
  preconditions: string[];
  verificationProcedure: string;
  rollbackProcedure: string;
  timeoutMs: number;
  maxRetries: number;
  enabled: boolean;
}

export interface GuardianSettings {
  monitoringIntervalSeconds: number; // e.g. 60
  autoRepairTier1Enabled: boolean;
  p0AlertImmediate: boolean;
  alertEmail: string;
  circuitBreakerErrorThreshold: number; // percentage, e.g. 5%
  rateLimitThresholdPerMinute: number;
  lastHeartbeat: string;
  totalHeartbeatsRecorded: number;
  maintenanceMode: boolean;
}

export interface AssistantMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
  suggestedActions?: {
    label: string;
    actionType: 'navigate' | 'prefill' | 'escalate';
    payload?: string;
  }[];
}

export interface EscalationPayload {
  userDescription: string;
  pageRoute: string;
  userEmail?: string;
  browserMetadata?: {
    userAgent?: string;
    viewport?: string;
    connectionType?: string;
  };
}
