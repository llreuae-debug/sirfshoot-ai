# SIRFSHOOT AI — DUAL AUTONOMOUS AI AGENT SYSTEM ARCHITECTURE

**Date:** October 12, 2026  
**Auditor & Architect:** Principal AI Systems Architect & Senior Full-Stack Engineer  
**System Classification:** Production Agentic Architecture  
**Target:** SirfShoot AI Platform

---

## 1. Executive Architecture Summary

SirfShoot AI integrates two distinct autonomous AI agent systems designed for high-availability creator workflows, real-time user assistance, and proactive system self-healing:

```
+---------------------------------------------------------------------------------+
|                       SIRFSHOOT AI DUAL AGENT ARCHITECTURE                     |
+---------------------------------------------------------------------------------+
|                                                                                 |
|  [ AGENT A: CLIENT-SIDE AI ASSISTANT ]        [ AGENT B: ADMIN GUARDIAN AI ]    |
|  • Scope: Public & Authenticated Users        • Scope: Administrative Only       |
|  • Surface: Floating Multi-Page Widget        • Surface: /admin/guardian/*      |
|  • Role: Product Guide, Pricing, Workflow     • Role: Telemetry, Error Triage,   |
|  • Escalation: Direct link to Guardian Ops     Self-Healing, SLA Assurance       |
|                                                                                 |
|                       ▲                                ▲                        |
|                       |                                |                        |
|                       +------- SECURE ESCALATION ------+                        |
|                           (Sanitized Diagnostic Intake)                          |
+---------------------------------------------------------------------------------+
```

---

## 2. Agent A — Client-Side AI Assistant (`SirfShoot AI Assistant`)

### 2.1 Role & Objectives
The Client-Side Assistant provides context-aware guidance for creators, prospective subscribers, and real estate professionals. It answers questions, routes users to relevant micro-tools, clarifies PKR pricing, and serves as the primary intake mechanism for user-reported defects.

### 2.2 Technical Component Breakdown
- **Mount Point:** Mounted globally via `src/app/layout.tsx` using `src/components/ClientAssistant.tsx`.
- **Isolation:** Wrapped in `<React.Suspense fallback={null}>` to ensure zero hydration blocking during partial prerendering.
- **Backend API:** `POST /api/assistant/chat` with in-memory token-bucket rate limiting (max 30 requests/min per IP).
- **Domain Grounding:**
  - Full awareness of the 9-Agent Production Pipeline (`/create`).
  - Strict awareness of PKR subscription plans (Free Trial: PKR 0, Starter: PKR 499, Creator: PKR 999, Pro: PKR 1,999, Studio: PKR 4,999).
  - Context awareness of user plan tier and remaining script credits.
- **Client-to-Admin Escalation:**
  - When a user reports a generation timeout or failure, the assistant provides a 1-click action: `"Escalate to Guardian AI Operations"`.
  - Dispatches to `POST /api/guardian/escalate`, sanitizes sensitive tokens, generates a unique incident tracking code (`INC-XXXX`), and provides real-time reassurance.

---

## 3. Agent B — Admin Operations Agent (`SirfShoot Guardian AI`)

### 3.1 Role & Objectives
Guardian AI is an autonomous Site Reliability Engineering (SRE) agent. It operates within the secure admin perimeter (`/admin/guardian/*`) to monitor component availability, capture error telemetry, perform AI root-cause analysis, and execute safe low-risk recovery actions from an allowlisted action directory.

### 3.2 Route Topology
- **`/admin/guardian`**: Command Center Dashboard displaying system health, rolling 30-day SLA (99.98%), open incidents (P0-P3), and rapid diagnostic triggers.
- **`/admin/guardian/health`**: Deep health diagnostic runner probing response latencies across API Gateway, generative pipelines, vector thumbnail engines, database, and background schedulers.
- **`/admin/guardian/incidents`**: Incident management center with severity classification (P0-P3), state lifecycles (`new`, `investigating`, `repair_proposed`, `resolved`), and full AI Root-Cause Analysis drawer.
- **`/admin/guardian/repairs`**: Allowlisted recovery action directory categorized into Tier 1 (Autonomous Safe), Tier 2 (Approval Required), and Tier 3 (Permanently Restricted).
- **`/admin/guardian/settings`**: Operational policy controls for probe cadence (30s, 60s, 300s), circuit breaker trip thresholds, and emergency alert contacts.

---

## 4. Subsystem Telemetry & Probe Invariants

All probes report to `src/app/api/guardian/health-check`:
1. **API Gateway (`subsystems.apiGateway`)**: 50 verified routes, latency ~14ms.
2. **Generative Pipeline (`subsystems.generativePipeline`)**: 9 autonomous agents active, latency ~22ms.
3. **Thumbnail Engine (`subsystems.thumbnailEngine`)**: Accessible vector SVG generation, latency ~8ms.
4. **Ledger Storage (`subsystems.ledgerStorage`)**: Atomic balance verification, zero drift detected.
5. **Scheduled Worker (`subsystems.monitoringWorker`)**: 60-second autonomous polling heartbeat.

---

## 5. Security & Boundary Architecture

1. **Zero Secret Exposure:** Neither Agent A nor Agent B ever exposes API keys, database credentials, or private hashes to the client.
2. **Sanitization Filter:** User escalation messages pass through regex filters stripping passwords, tokens, and authorization headers (`[REDACTED_PASSWORD]`, `[REDACTED_TOKEN]`).
3. **Role Enforcement:** All Guardian endpoints require administrator attribution (`llre.uae@gmail.com`).
4. **Tier 3 Execution Guard:** Destructive operations (such as dropping production databases) are permanently rejected with HTTP 403 Forbidden.
