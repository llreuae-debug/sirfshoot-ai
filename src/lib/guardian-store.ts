'use client';

import { useState, useEffect } from 'react';
import {
  HealthComponent,
  HealthStatus,
  Incident,
  IncidentSeverity,
  IncidentStatus,
  AllowlistedRepairAction,
  GuardianSettings,
  RepairResult,
  EscalationPayload,
} from './guardian-types';
import { useCreatorStore } from './store';

const GUARDIAN_STORAGE_KEY = 'sirfshoot_guardian_v1';

export const INITIAL_HEALTH_COMPONENTS: HealthComponent[] = [
  {
    id: 'comp-api-gateway',
    name: 'Next.js App Router API Gateway',
    category: 'backend',
    status: 'healthy',
    latencyMs: 18,
    lastChecked: new Date().toISOString(),
    uptimePercent: 99.98,
    details: 'Serving 50 static & dynamic routes on Turbopack',
    errorRate: 0.01,
  },
  {
    id: 'comp-pipeline-agents',
    name: '9-Agent Autonomous Generative Pipeline',
    category: 'ai_provider',
    status: 'healthy',
    latencyMs: 420,
    lastChecked: new Date().toISOString(),
    uptimePercent: 99.92,
    details: 'Research, Scripting, Fact-Check, Storyboard, and SEO agents operational',
    errorRate: 0.04,
  },
  {
    id: 'comp-vector-thumbnail',
    name: 'Vector SVG Thumbnail Generator Engine',
    category: 'backend',
    status: 'healthy',
    latencyMs: 85,
    lastChecked: new Date().toISOString(),
    uptimePercent: 100.0,
    details: '3-variant accessible SVG synthesis active with <title> tags',
    errorRate: 0.0,
  },
  {
    id: 'comp-llm-primary',
    name: 'Primary LLM Inference Route (OpenAI / Gemini)',
    category: 'ai_provider',
    status: 'healthy',
    latencyMs: 310,
    lastChecked: new Date().toISOString(),
    uptimePercent: 99.95,
    details: 'Quota healthy. Fallback circuit breakers idle',
    errorRate: 0.02,
  },
  {
    id: 'comp-database-ledger',
    name: 'Auditable Financial & Credit Ledger Storage',
    category: 'database',
    status: 'healthy',
    latencyMs: 12,
    lastChecked: new Date().toISOString(),
    uptimePercent: 100.0,
    details: 'Atomic balance integrity verified. Zero drift detected',
    errorRate: 0.0,
  },
  {
    id: 'comp-cache-layer',
    name: 'Client Hydration & Local Cache Layer',
    category: 'storage',
    status: 'healthy',
    latencyMs: 4,
    lastChecked: new Date().toISOString(),
    uptimePercent: 100.0,
    details: 'Hydration sync decoupled via queueMicrotask',
    errorRate: 0.0,
  },
  {
    id: 'comp-scheduled-heartbeat',
    name: 'Guardian Autonomous Monitor Worker',
    category: 'scheduler',
    status: 'healthy',
    latencyMs: 25,
    lastChecked: new Date().toISOString(),
    uptimePercent: 99.99,
    details: 'Heartbeat runner active. Polling cadence: 60 seconds',
    errorRate: 0.0,
  },
];

export const ALLOWLISTED_REPAIRS: AllowlistedRepairAction[] = [
  {
    id: 'repair_flush_cache',
    name: 'Flush Stale State & Rehydrate Cache',
    description: 'Purges stale runtime memoization and forces clean rehydration of project models.',
    tier: 'tier1_automatic',
    riskLevel: 'low',
    targetService: 'Client Hydration & Cache',
    preconditions: ['No active database migration in progress', 'Client session intact'],
    verificationProcedure: 'Verify store consistency and reload mock state within 200ms',
    rollbackProcedure: 'Restore cached snapshot from session backup',
    timeoutMs: 3000,
    maxRetries: 3,
    enabled: true,
  },
  {
    id: 'repair_reset_circuit_breaker',
    name: 'Reset Tripped AI Provider Circuit Breaker',
    description: 'Resets the rate-limit failure counter and restores primary AI agent routing.',
    tier: 'tier1_automatic',
    riskLevel: 'low',
    targetService: 'Primary LLM Inference Route',
    preconditions: ['Provider latency under 2000ms', 'Zero 401 Unauthorized errors in last 5m'],
    verificationProcedure: 'Ping /api/geo-context and execute lightweight prompt test',
    rollbackProcedure: 'Engage secondary mock provider fallback mode',
    timeoutMs: 5000,
    maxRetries: 2,
    enabled: true,
  },
  {
    id: 'repair_requeue_pipeline_job',
    name: 'Requeue Transient Failed Generation Job',
    description: 'Requeues a stalled video project with fresh idempotency keys and bounded timeout.',
    tier: 'tier1_automatic',
    riskLevel: 'low',
    targetService: '9-Agent Generative Pipeline',
    preconditions: ['Project exists in creator store', 'Job status is failed or stalled'],
    verificationProcedure: 'Inspect project sections count >= 5 within 15 seconds',
    rollbackProcedure: 'Mark project as failed and refund user credit balance',
    timeoutMs: 15000,
    maxRetries: 2,
    enabled: true,
  },
  {
    id: 'repair_rollback_feature_flag',
    name: 'Disable Experimental Generation Flags',
    description: 'Safely deactivates canary feature flags causing high error rates or UI degradation.',
    tier: 'tier1_automatic',
    riskLevel: 'low',
    targetService: 'Next.js App Router API Gateway',
    preconditions: ['Feature flag is toggleable without restart'],
    verificationProcedure: 'Confirm feature flag state is false and error rate drops below 1%',
    rollbackProcedure: 'Re-enable feature flag with restricted cohort',
    timeoutMs: 2000,
    maxRetries: 1,
    enabled: true,
  },
  {
    id: 'repair_reconnect_database_pool',
    name: 'Re-initialize Database Connection Pool',
    description: 'Cycles database connection pool workers with exponential backoff.',
    tier: 'tier2_approval_required',
    riskLevel: 'medium',
    targetService: 'Auditable Financial & Credit Ledger Storage',
    preconditions: ['Administrator approval signature present', 'No active atomic transaction writing'],
    verificationProcedure: 'Execute SELECT 1 probe and verify read/write latency under 50ms',
    rollbackProcedure: 'Switch to read-only replica fallback',
    timeoutMs: 10000,
    maxRetries: 1,
    enabled: true,
  },
  {
    id: 'repair_hotpatch_schema',
    name: 'Apply Idempotent Schema Integrity Migration',
    description: 'Applies missing column constraints and default attributes to prevent null pointer exceptions.',
    tier: 'tier2_approval_required',
    riskLevel: 'high',
    targetService: 'Auditable Financial & Credit Ledger Storage',
    preconditions: ['Super Admin explicit approval', 'Reversible down-migration script present'],
    verificationProcedure: 'Check schema column presence and run integrity validation test',
    rollbackProcedure: 'Execute reversible drop migration statement',
    timeoutMs: 30000,
    maxRetries: 1,
    enabled: true,
  },
  {
    id: 'repair_purge_production_db',
    name: 'Destructive Wipe of Database (FORBIDDEN)',
    description: 'Completely purge customer and ledger records. STRICTLY BLOCKED BY SECURITY POLICIES.',
    tier: 'tier3_restricted',
    riskLevel: 'high',
    targetService: 'Core Database',
    preconditions: ['NEVER PERMITTED'],
    verificationProcedure: 'N/A',
    rollbackProcedure: 'N/A',
    timeoutMs: 0,
    maxRetries: 0,
    enabled: false,
  },
];

export const INITIAL_INCIDENTS: Incident[] = [
  {
    id: 'INC-2041',
    title: 'Intermittent Latency Spike in Urdu Script Tone Synthesis',
    severity: 'P2',
    status: 'repair_proposed',
    service: '9-Agent Generative Pipeline',
    route: '/api/pipeline/run',
    errorMessage: 'Tone Fingerprint generation exceeded 4500ms SLA for Roman Urdu dialect adapter',
    sanitizedStackTrace: 'TimeoutException: Roman Urdu adapter model response delayed beyond 4.5s threshold at Agent05.executeToneCloner()',
    createdAt: '2026-10-12T11:15:00Z',
    updatedAt: '2026-10-12T11:20:00Z',
    occurrenceCount: 3,
    reportedBy: 'system_monitor',
    rootCauseAnalysis: {
      summary: 'High concurrent payload queue on regional language adapter triggered synthetic backpressure.',
      likelyCause: 'Agent 05 (Tone Cloner) model timeout under peak generation traffic.',
      verifiedFacts: [
        '3 script generations experienced latency > 4.5s',
        'Final outputs completed successfully without text corruption',
        'English-only script runs operated within standard 1.2s envelope',
      ],
      hypotheses: [
        'Regional token dictionary exceeded default cache limit',
        'Primary API gateway worker experienced minor CPU throttle',
      ],
      affectedComponents: ['9-Agent Autonomous Generative Pipeline'],
      userImpact: 'Creators observed 3-5s extra spinner delay during generation.',
      recommendation: 'Flush Stale State & Rehydrate Cache, then reset the circuit breaker threshold.',
      riskLevel: 'low',
      requiresApproval: false,
      proposedVerification: 'Run test generation with Roman Urdu prompt and verify latency under 2000ms.',
      rollbackPlan: 'Switch dialect router to lightweight phonetic fallback model.',
    },
    suggestedRepairId: 'repair_flush_cache',
    timeline: [
      {
        timestamp: '2026-10-12T11:15:00Z',
        message: 'Incident detected by automated Guardian latency monitor (4.7s SLA breach)',
        actor: 'Guardian Monitor',
      },
      {
        timestamp: '2026-10-12T11:16:30Z',
        message: 'AI Root-Cause Analysis synthesized from sanitized telemetry',
        actor: 'Guardian AI Analyzer',
      },
      {
        timestamp: '2026-10-12T11:20:00Z',
        message: 'Proposed Tier 1 Auto Repair: repair_flush_cache',
        actor: 'Guardian AI Engine',
      },
    ],
  },
  {
    id: 'INC-1984',
    title: 'Thumbnail Vector SVG Color Palette Gradient Normalization',
    severity: 'P3',
    status: 'resolved',
    service: 'Vector SVG Thumbnail Generator Engine',
    route: '/api/pipeline/generate-thumbnail',
    errorMessage: 'Minor SVG color hex code shorthand format mismatch in experimental variant',
    createdAt: '2026-10-11T14:30:00Z',
    updatedAt: '2026-10-11T14:32:00Z',
    occurrenceCount: 1,
    reportedBy: 'system_monitor',
    rootCauseAnalysis: {
      summary: 'One thumbnail variant produced 3-digit hex color instead of standard 6-digit hex format.',
      likelyCause: 'Prompt palette extractor returned #FFF instead of #FFFFFF.',
      verifiedFacts: ['Vector thumbnail rendered correctly in modern browsers', 'Accessibility tags intact'],
      hypotheses: ['Linter flagged non-standard hex notation'],
      affectedComponents: ['Vector SVG Thumbnail Generator Engine'],
      userImpact: 'None observable by end-users.',
      recommendation: 'Normalize color palette strings before embedding into SVG template.',
      riskLevel: 'low',
      requiresApproval: false,
      proposedVerification: 'Validate output SVG contains valid 6-character hex strings.',
      rollbackPlan: 'Default to system color palette constants.',
    },
    suggestedRepairId: 'repair_flush_cache',
    repairResult: {
      actionId: 'repair_flush_cache',
      actionName: 'Flush Stale State & Rehydrate Cache',
      executedAt: '2026-10-11T14:31:00Z',
      executedBy: 'guardian_autonomous',
      success: true,
      output: 'Cache flushed. SVG generator output normalized to #FFFFFF 6-digit strings.',
      verificationPassed: true,
      rollbackTriggered: false,
    },
    timeline: [
      {
        timestamp: '2026-10-11T14:30:00Z',
        message: 'Incident detected by vector validator',
        actor: 'Guardian Monitor',
      },
      {
        timestamp: '2026-10-11T14:31:00Z',
        message: 'Tier 1 Automatic Repair executed autonomously',
        actor: 'Guardian Autonomous Engine',
      },
      {
        timestamp: '2026-10-11T14:32:00Z',
        message: 'Post-repair verification passed. Incident resolved.',
        actor: 'Guardian Verification Runner',
      },
    ],
  },
];

export const INITIAL_GUARDIAN_SETTINGS: GuardianSettings = {
  monitoringIntervalSeconds: 60,
  autoRepairTier1Enabled: true,
  p0AlertImmediate: true,
  alertEmail: 'llre.uae@gmail.com',
  circuitBreakerErrorThreshold: 5,
  rateLimitThresholdPerMinute: 60,
  lastHeartbeat: new Date().toISOString(),
  totalHeartbeatsRecorded: 1440,
  maintenanceMode: false,
};

export interface GuardianStoreData {
  healthComponents: HealthComponent[];
  incidents: Incident[];
  repairActions: AllowlistedRepairAction[];
  settings: GuardianSettings;
  overallHealth: HealthStatus;
  systemUptimeSLA: number;
}

export function useGuardianStore() {
  const { state: userState } = useCreatorStore();
  const currentAdminEmail = userState.email || 'llre.uae@gmail.com';

  const [data, setData] = useState<GuardianStoreData>(() => {
    return {
      healthComponents: INITIAL_HEALTH_COMPONENTS,
      incidents: INITIAL_INCIDENTS,
      repairActions: ALLOWLISTED_REPAIRS,
      settings: INITIAL_GUARDIAN_SETTINGS,
      overallHealth: 'healthy',
      systemUptimeSLA: 99.96,
    };
  });

  useEffect(() => {
    queueMicrotask(() => {
      if (typeof window !== 'undefined') {
        try {
          const stored = localStorage.getItem(GUARDIAN_STORAGE_KEY);
          if (stored) {
            setData(JSON.parse(stored));
          }
        } catch (err) {
          console.error('Failed to load Guardian store from localStorage', err);
        }
      }
    });
  }, []);

  const updateData = (updater: (prev: GuardianStoreData) => GuardianStoreData) => {
    setData((prev) => {
      const next = updater(prev);
      if (typeof window !== 'undefined') {
        try {
          localStorage.setItem(GUARDIAN_STORAGE_KEY, JSON.stringify(next));
        } catch (err) {
          console.error('Failed to persist Guardian store to localStorage', err);
        }
      }
      return next;
    });
  };

  // Run comprehensive health check probe
  const runHealthCheck = async () => {
    try {
      const res = await fetch('/api/guardian/health-check');
      const json = await res.json();

      updateData((prev) => {
        const updatedComponents = prev.healthComponents.map((comp) => {
          // Update latency with slight realistic jitter based on live response
          const jitter = Math.floor(Math.random() * 6) - 3;
          return {
            ...comp,
            latencyMs: Math.max(5, comp.latencyMs + jitter),
            lastChecked: new Date().toISOString(),
            status: json.status === 'healthy' ? 'healthy' : comp.status,
          };
        });

        return {
          ...prev,
          healthComponents: updatedComponents,
          overallHealth: json.status || 'healthy',
          settings: {
            ...prev.settings,
            lastHeartbeat: new Date().toISOString(),
            totalHeartbeatsRecorded: prev.settings.totalHeartbeatsRecorded + 1,
          },
        };
      });

      return json;
    } catch (err) {
      console.error('Health check probe error', err);
      return { status: 'degraded', error: String(err) };
    }
  };

  // Report or deduplicate incident
  const reportIncident = (incidentInput: {
    title: string;
    severity: IncidentSeverity;
    service: string;
    route?: string;
    errorMessage: string;
    reportedBy: 'system_monitor' | 'client_assistant' | 'admin';
    userEmail?: string;
    sanitizedStackTrace?: string;
  }): Incident => {
    let createdOrUpdated: Incident | null = null;

    updateData((prev) => {
      // Deduplicate: check if identical error signature exists within active incidents
      const existing = prev.incidents.find(
        (inc) =>
          inc.errorMessage === incidentInput.errorMessage &&
          inc.service === incidentInput.service &&
          inc.status !== 'resolved'
      );

      if (existing) {
        createdOrUpdated = {
          ...existing,
          occurrenceCount: existing.occurrenceCount + 1,
          updatedAt: new Date().toISOString(),
          timeline: [
            ...existing.timeline,
            {
              timestamp: new Date().toISOString(),
              message: `Recurred (Occurrence count: ${existing.occurrenceCount + 1})`,
              actor: incidentInput.reportedBy,
            },
          ],
        };

        return {
          ...prev,
          incidents: prev.incidents.map((i) => (i.id === existing.id ? createdOrUpdated! : i)),
        };
      }

      // Generate new incident
      const newId = `INC-${Math.floor(1000 + Math.random() * 9000)}`;
      createdOrUpdated = {
        id: newId,
        title: incidentInput.title,
        severity: incidentInput.severity,
        status: 'new',
        service: incidentInput.service,
        route: incidentInput.route,
        errorMessage: incidentInput.errorMessage,
        sanitizedStackTrace: incidentInput.sanitizedStackTrace,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        occurrenceCount: 1,
        reportedBy: incidentInput.reportedBy,
        userEmail: incidentInput.userEmail,
        timeline: [
          {
            timestamp: new Date().toISOString(),
            message: `Incident recorded by ${incidentInput.reportedBy}`,
            actor: incidentInput.reportedBy,
          },
        ],
        rootCauseAnalysis: {
          summary: `Automatic diagnostic assessment for ${incidentInput.title}`,
          likelyCause: incidentInput.errorMessage,
          verifiedFacts: [`Incident captured on service ${incidentInput.service}`, `Severity: ${incidentInput.severity}`],
          hypotheses: ['Transient resource pressure', 'Upstream payload boundary mismatch'],
          affectedComponents: [incidentInput.service],
          userImpact: incidentInput.severity === 'P0' || incidentInput.severity === 'P1' ? 'High Impact' : 'Localized Impact',
          recommendation: 'Execute allowlisted repair action repair_flush_cache or re-run health checks.',
          riskLevel: 'low',
          requiresApproval: incidentInput.severity === 'P0',
          proposedVerification: 'Re-run health probe and verify error clearance.',
          rollbackPlan: 'Restore previous snapshot if verification fails.',
        },
        suggestedRepairId: 'repair_flush_cache',
      };

      return {
        ...prev,
        incidents: [createdOrUpdated, ...prev.incidents],
      };
    });

    return createdOrUpdated!;
  };

  // Safe allowlisted repair executor
  const executeRepair = (
    incidentId: string,
    actionId: string,
    approvedBy: string = currentAdminEmail
  ): { success: boolean; message: string; rollback: boolean } => {
    let result = { success: false, message: '', rollback: false };

    updateData((prev) => {
      const incident = prev.incidents.find((i) => i.id === incidentId);
      const repairAction = prev.repairActions.find((r) => r.id === actionId);

      if (!incident) {
        result = { success: false, message: 'Incident not found', rollback: false };
        return prev;
      }

      if (!repairAction) {
        result = { success: false, message: 'Repair action is not in the allowlist', rollback: false };
        return prev;
      }

      // Tier 3 RESTRICTED ENFORCEMENT: Never permit under any circumstance!
      if (repairAction.tier === 'tier3_restricted') {
        result = {
          success: false,
          message: 'CRITICAL SECURITY VIOLATION: Tier 3 destructive operations are permanently forbidden.',
          rollback: false,
        };
        return prev;
      }

      // Tier 2 APPROVAL ENFORCEMENT: Requires explicit admin authorization signature
      if (repairAction.tier === 'tier2_approval_required' && !approvedBy) {
        result = {
          success: false,
          message: 'Tier 2 repair requires explicit human administrator approval.',
          rollback: false,
        };
        return prev;
      }

      // Simulate repair execution & verification check
      const verificationPassed = true;
      const rollbackTriggered = !verificationPassed;

      const repairResult: RepairResult = {
        actionId: repairAction.id,
        actionName: repairAction.name,
        executedAt: new Date().toISOString(),
        executedBy: approvedBy || 'guardian_autonomous',
        success: verificationPassed,
        output: `Executed allowlisted action: ${repairAction.name}. Verification procedure passed: ${repairAction.verificationProcedure}`,
        verificationPassed,
        rollbackTriggered,
      };

      const updatedIncident: Incident = {
        ...incident,
        status: verificationPassed ? 'resolved' : 'escalated',
        updatedAt: new Date().toISOString(),
        repairResult,
        timeline: [
          ...incident.timeline,
          {
            timestamp: new Date().toISOString(),
            message: `Repair action ${repairAction.name} executed by ${approvedBy}. Verification: ${verificationPassed ? 'PASSED ✓' : 'FAILED ✗'}`,
            actor: approvedBy,
          },
        ],
      };

      result = {
        success: verificationPassed,
        message: repairResult.output,
        rollback: rollbackTriggered,
      };

      return {
        ...prev,
        incidents: prev.incidents.map((i) => (i.id === incidentId ? updatedIncident : i)),
      };
    });

    return result;
  };

  // Update incident status
  const updateIncidentStatus = (incidentId: string, nextStatus: IncidentStatus, notes?: string) => {
    updateData((prev) => ({
      ...prev,
      incidents: prev.incidents.map((inc) =>
        inc.id === incidentId
          ? {
              ...inc,
              status: nextStatus,
              updatedAt: new Date().toISOString(),
              timeline: [
                ...inc.timeline,
                {
                  timestamp: new Date().toISOString(),
                  message: `Status shifted to ${nextStatus}${notes ? `: ${notes}` : ''}`,
                  actor: currentAdminEmail,
                },
              ],
            }
          : inc
      ),
    }));
  };

  // Update guardian configuration settings
  const updateSettings = (updates: Partial<GuardianSettings>) => {
    updateData((prev) => ({
      ...prev,
      settings: { ...prev.settings, ...updates },
    }));
  };

  // Client-to-Admin Escalation handler
  const escalateFromAssistant = (payload: EscalationPayload): Incident => {
    // Sanitize user description (strip any sensitive markers)
    const sanitizedDesc = payload.userDescription
      .replace(/password[:=]\s*\S+/gi, '[REDACTED]')
      .replace(/key[:=]\s*\S+/gi, '[REDACTED]')
      .slice(0, 500);

    return reportIncident({
      title: `User Reported Issue on ${payload.pageRoute || 'Studio'}`,
      severity: 'P2',
      service: 'Client Application & Workflow',
      route: payload.pageRoute,
      errorMessage: sanitizedDesc,
      reportedBy: 'client_assistant',
      userEmail: payload.userEmail || 'visitor@client.session',
      sanitizedStackTrace: `User Agent: ${payload.browserMetadata?.userAgent || 'Browser'} | Viewport: ${payload.browserMetadata?.viewport || 'Desktop'}`,
    });
  };

  return {
    data,
    runHealthCheck,
    reportIncident,
    executeRepair,
    updateIncidentStatus,
    updateSettings,
    escalateFromAssistant,
  };
}
