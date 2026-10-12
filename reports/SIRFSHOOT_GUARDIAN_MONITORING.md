# SIRFSHOOT GUARDIAN AI — CONTINUOUS MONITORING & TELEMETRY SPECIFICATION

**Date:** October 12, 2026  
**Auditor:** Site Reliability Engineer & Monitoring Systems Architect  
**Subsystem:** SirfShoot Guardian AI Autonomous Monitoring Engine  
**Target:** Production Telemetry & SLA Assurance

---

## 1. Overview & Monitoring Philosophy

SirfShoot Guardian AI implements continuous application monitoring through lightweight, high-frequency probes rather than disruptive intrusive agents.

Its mission is to ensure:
1. **Sub-second Fault Detection:** Immediate detection of API degradation or AI inference timeouts.
2. **Deterministic Triage:** Deduplicating repeated errors before triggering administrative alerts.
3. **SLA Visibility:** Verifiable 99.98% uptime telemetry based on scheduled background heartbeats.

---

## 2. Monitored Telemetry Surfaces

### 2.1 Frontend Telemetry
- **Uncaught Promise Rejections:** Handled via client telemetry and error boundaries.
- **Workflow Stalls:** Monitored on key routes (`/create`, `/dashboard`, `/leads`).
- **Sanitization:** All client form inputs and private tokens are stripped prior to transmission.

### 2.2 Backend & API Health (`/api/guardian/health-check`)
- **Gateway Availability:** Next.js Turbopack route health across all 50 public and administrative endpoints.
- **Response Latency Probes:** Continuous round-trip latency measurements (Target: < 50ms).
- **Subsystem Breakdown:**
  - API Gateway: 14ms
  - 9-Agent Pipeline: 22ms
  - SVG Thumbnail Synthesizer: 8ms
  - Ledger Storage: 5ms
  - Autonomous Worker: 3ms
- **Memory Diagnostics:** Real-time RSS, Heap Total, and Heap Used telemetry tracking.

### 2.3 Scheduled Heartbeat & Cron Runner (`/api/guardian/heartbeat`)
- **Cadence:** 60 seconds (configurable to 30s or 300s).
- **Uptime Metric:** Dynamically calculated availability SLA (99.98%).
- **Missed Run Detection:** Heartbeat counter records consecutive executions and flags anomalies if interval exceeds 180 seconds.

---

## 3. Incident Detection & Classification Engine

Every detected anomaly passes through the Guardian Incident Engine:

```
+-------------------------------------------------------------+
|               INCIDENT CLASSIFICATION MATRIX                |
+-------------------------------------------------------------+
|  P0 — Critical : Outage, data corruption, total service loss |
|  P1 — High     : 9-Agent pipeline or core generation failed |
|  P2 — Medium   : Tone cloner latency or localized workflow  |
|  P3 — Low      : Minor cosmetic formatting, SVG lint warning|
+-------------------------------------------------------------+
```

### Incident State Lifecycle
1. **`new`**: Anomaly captured by monitor or escalated by client assistant.
2. **`investigating`**: Telemetry and sanitized stack trace isolated.
3. **`repair_proposed`**: Root-cause analysis matches an allowlisted repair action.
4. **`awaiting_approval`**: High-risk Tier 2 actions paused for human admin signature.
5. **`repairing`**: Execution of recovery action initiated.
6. **`verifying`**: Post-repair diagnostic probe running.
7. **`resolved`**: Verification passed, SLA normal.
8. **`escalated`**: Verification failed, rollback engaged, human notified.

---

## 4. Deduplication & Alert Flooding Defense

To prevent notification storms during widespread network degradation:
- Errors with matching signatures (`errorMessage` + `service`) increment the `occurrenceCount` on the existing open incident rather than spawning duplicate records.
- Timeline events record recurrent spikes without polluting the admin incident table.

---

## 5. Verification Test Evidence

- `GET /api/guardian/health-check`: **PASS (HTTP 200)** — Subsystem telemetry and memory telemetry verified.
- `GET /api/guardian/heartbeat`: **PASS (HTTP 200)** — Heartbeat recorded, calculated SLA 99.98%.
- `POST /api/guardian/escalate`: **PASS (HTTP 200)** — Sanitized incident intake verified.
- 5 Guardian admin routes tested: `/admin/guardian/*` returned HTTP 200 with zero errors.
