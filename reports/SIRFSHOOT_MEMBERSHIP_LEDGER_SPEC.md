# SIRFSHOOT AI — MEMBERSHIP & AUDITABLE LEDGER SPECIFICATION

**Date:** October 12, 2026  
**Architect:** Principal Database Architect & Financial Systems Engineer  
**Document Ref:** `SPEC-LEDGER-2026-v1`  
**Target Systems:** SaaS Membership Plans, Usage Quotas, and Auditable Financial & Credit Ledger

---

## 1. Accounting Decoupling Principle

A core invariant of the SirfShoot AI platform is the **strict, unambiguous separation of real monetary transactions from internal usage credits**:

```
+-------------------------------------------------------------+
|                SIRFSHOOT AI LEDGER ARCHITECTURE            |
+-------------------------------------------------------------+
|                                                             |
|   [ CATEGORY: FINANCIAL ]          [ CATEGORY: CREDIT ]     |
|   • Currency: Real PKR (₨)         • Token: Video Scripts   |
|   • Payment Gateways (Stripe/PayFast) • Consumed on Run     |
|   • Double-entry accounting        • Balance liability      |
|   • Subject to tax & compliance    • Internal SaaS unit     |
|                                                             |
|            *** STRICTLY DECOUPLED METRICS ***               |
+-------------------------------------------------------------+
```

Under no circumstances are monetary balances and credit counts summed, merged, or presented as a single ambiguous metric.

---

## 2. Membership Plans Specification

SirfShoot AI supports 5 distinct SaaS tiers configured in Pakistani Rupee (PKR):

| Tier Code | Plan Name | Price (PKR) | Billing Cadence | Monthly Credits | Quota Rights |
|---|---|:---:|:---:|:---:|---|
| **`trial`** | Free Trial | PKR 0 | 7-day single cycle | 2 credits | 2 complete 9-agent video packages |
| **`starter`** | Starter Plan | PKR 499 | Monthly | 3 credits | 3 video packages, teleprompter mode |
| **`creator`** | Creator Plan | PKR 999 | Monthly | 7 credits | 7 packages, unlimited Tone Fingerprints, 3-variant thumbnails |
| **`pro`** | Pro Studio Plan | PKR 1,999 | Monthly | 15 credits | 15 packages, priority pipeline routing, CRM leads |
| **`studio`** | Enterprise Studio | PKR 4,999 | Monthly | 50 credits | 50+ packages, bulk export, dedicated manager |

### Plan Modification Rules
1. **Grandfathering Protection:** Changes to plan pricing only apply to newly subscribed members. Existing active subscriptions retain their established price until renewal cancellation.
2. **Mandatory Audit Reason:** Assigning or altering a member's plan via the admin dashboard requires an administrative reason string recorded in the audit log.

---

## 3. Auditable Ledger Data Schema

Every material balance change is stored as an immutable transaction in `data.ledger`:

```typescript
export interface LedgerTransaction {
  id: string;                      // Unique ID (e.g., tx-1728734000000)
  memberId: string;                // Foreign key to member record
  memberName: string;              // Cached member name for fast tabular view
  memberEmail: string;             // Member email
  timestamp: string;               // ISO 8601 UTC timestamp
  type: LedgerTransactionType;     // Event type
  category: 'financial' | 'credit';// Strict accounting category
  description: string;             // Human-readable summary
  amountPKR?: number;              // Monetary amount in PKR (if financial)
  amountCredits?: number;          // Credit delta (if credit)
  balanceAfterCredits?: number;    // Resulting credit balance
  currency: 'PKR';                 // ISO currency code
  paymentReference?: string;       // Gateway receipt or webhook event ID
  status: 'completed' | 'pending' | 'failed' | 'reversed';
  initiatedBy: string;             // Admin email or 'system'
  reason?: string;                 // Mandatory operational reason
}
```

---

## 4. Supported Transaction Types

1. **`purchase` (Financial):** One-off credit pack purchase or top-up confirmed by payment provider.
2. **`subscription_payment` (Financial):** Recurring membership charge confirmed by webhook.
3. **`refund` (Financial):** Reversal of paid monetary transaction.
4. **`credit_grant` (Credit):** Monthly plan allotment or trial credit allocation.
5. **`credit_usage` (Credit):** Deduction of credits upon successful execution of the 9-agent pipeline (`/api/pipeline/run`).
6. **`promotional_credit` (Credit):** Marketing or referral credits credited to a user account.
7. **`admin_adjustment` (Credit):** Manual credit addition or deduction executed by an authorized administrator.

---

## 5. Ledger Integrity & Double-Entry Rules

1. **No Mutable Balances Without Transaction History:**
   The member's `creditsRemaining` is NEVER updated directly without appending a corresponding `LedgerTransaction` record.
2. **Atomic Balance Updates:**
   State updates mutate the member balance and append the ledger entry in a single atomic transaction.
3. **Audit Log Mirroring:**
   Every manual adjustment creates a parallel `AdminAuditLog` record containing:
   - `adminEmail`: The authenticated admin's email.
   - `beforeValue`: Previous credit balance.
   - `afterValue`: New calculated balance.
   - `reason`: Mandatory operational justification.
4. **Idempotency Safeguard:**
   Every ledger event has a unique timestamped transaction identifier (`tx-${Date.now()}`) to prevent accidental duplicate execution.
5. **CSV Export Capabilities:**
   The ledger table supports instant CSV generation with all 12 accounting columns properly escaped for spreadsheet audits.
