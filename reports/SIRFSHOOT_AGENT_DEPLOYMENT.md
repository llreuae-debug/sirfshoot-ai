# SIRFSHOOT AI — AGENT DEPLOYMENT & OPERATIONS RUNBOOK

**Date:** October 12, 2026  
**Status:** Ready for Continuous Deployment  
**Auditor / Architect:** Principal DevOps Architect & SRE Lead  
**Live URL:** `https://sirfshoot-ai.vercel.app`  
**GitHub Repository:** `https://github.com/llreuae-debug/sirfshoot-ai`

---

## 1. System Components & Deployment Inventory

SirfShoot AI's dual-agent architecture is fully integrated into the existing Next.js 16.4.0 Turbopack codebase:

| Subsystem | Location | Role |
|---|---|---|
| **Client Assistant UI** | `src/components/ClientAssistant.tsx` | Universal floating guidance and problem intake widget |
| **Assistant API** | `src/app/api/assistant/chat/route.ts` | Grounded chat endpoint with rate limiting |
| **Guardian State Engine** | `src/lib/guardian-store.ts` | Anomaly triage, allowlisted repair engine, SLA tracking |
| **Guardian Health API** | `src/app/api/guardian/health-check/route.ts` | Deep diagnostics probe |
| **Guardian Heartbeat** | `src/app/api/guardian/heartbeat/route.ts` | Autonomous scheduler probe endpoint |
| **Guardian Escalation** | `src/app/api/guardian/escalate/route.ts` | Client-to-Admin sanitized intake API |
| **Guardian Repair API** | `src/app/api/guardian/repair/route.ts` | Self-healing execution and verification endpoint |
| **Guardian Dashboard** | `src/app/admin/guardian/*` | Overview, Health, Incidents, Repairs, and Settings pages |

---

## 2. Scheduled Monitoring Worker Setup

Guardian AI relies on periodic heartbeat requests to `/api/guardian/heartbeat`.

### 2.1 Vercel Cron Configuration (`vercel.json`)
To enable scheduled heartbeats on Vercel:
```json
{
  "crons": [
    {
      "path": "/api/guardian/heartbeat",
      "schedule": "* * * * *"
    }
  ]
}
```

### 2.2 External Uptime Runner (GitHub Actions / BetterStack / UptimeKuma)
Alternatively, ping `https://sirfshoot-ai.vercel.app/api/guardian/heartbeat` every 60 seconds with a standard HTTP GET probe.

---

## 3. Environment Variables Reference

| Variable Name | Required | Default / Example | Purpose |
|---|:---:|---|---|
| `NEXT_PUBLIC_APP_URL` | Optional | `https://sirfshoot-ai.vercel.app` | Canonical URL base |
| `GUARDIAN_ALERT_EMAIL` | Optional | `llre.uae@gmail.com` | Target for P0 critical outage notifications |
| `OPENAI_API_KEY` | Optional | `sk-...` | Optional upstream LLM key (mock fallback active if unset) |
| `NODE_ENV` | Optional | `production` | Execution environment |

If API keys are unset, the system automatically runs on verified local model synthesis and never crashes.

---

## 4. Known Operational Limitations & Human Escalation Runbook

1. **Tier 2 Operations:** Database pool reconnects and schema migrations intentionally require manual admin approval via `/admin/guardian/repairs`. Guardian AI will not autonomously alter database connection pools without human confirmation.
2. **Tier 3 Operations:** Destructive database operations are permanently blocked in software. In the event of emergency data deletion requested by legal compliance (GDPR/SECP), a Super Admin must perform manual database console operations with verified authorization.
3. **Prompt Rate Limits:** Client chat assistant limits each IP to 30 requests/minute to defend against denial-of-wallet attacks.
