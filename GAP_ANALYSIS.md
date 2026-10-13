# SirfShoot AI / Tameeros Shorts — Gap Analysis & System Audit

**Date:** October 13, 2026  
**Auditor:** Principal Full-Stack Engineer & Product Lead  
**Target Codebase:** `SirfShoot` (`https://sirfshoot-ai.vercel.app/`, git: `llreuae-debug/sirfshoot-ai`)  
**Reference Codebase:** `reference/youtube-agentic-ai-studio` (`https://github.com/raunakpatil/youtube-agentic-ai-studio`, MIT)  

---

## 1. Executive Summary

`SirfShoot` is currently a client-side Next.js 16/React 19 application with a comprehensive UI for YouTube creation, Tone Fingerprinting, and real estate tools. However, **the generative AI pipeline, video rendering, TTS narration, and YouTube upload layers are currently non-functional or client-side simulations**:
- Research and script generation currently use deterministic mock templates in `src/lib/ai-pipeline.ts` with keyword branching, rather than live LLMs.
- Narration uses browser Web Speech synthesis, with zero word-timing alignment or downloadable audio assets.
- Video generation is simulated in canvas or static previews; no MoviePy, FFmpeg, or media encoding worker exists.
- YouTube upload, OAuth tokens, and scheduling are absent.
- The reference repository (`youtube-agentic-ai-studio`) provides a functional 6-step Python pipeline with Gemini fallback, Edge-TTS word timing, Pexels image retrieval, MoviePy rendering (16:9 and 9:16 Shorts), Flask human review, and YouTube Data API v3 upload.

---

## 2. Feature-by-Feature Gap Analysis Table

| # | Feature / Capability | Reference Repo Implementation | Current SirfShoot Implementation | Exists? | Location in Code | Effort | Risk | Recommendation |
|---|---|---|---|:---:|---|:---:|:---:|---|
| **4.1** | **Research Agent with Model Fallback** | Gemini client (`agents/gemini_client.py`) with 8-model fallback chain (`gemini-2.5-flash` → `2.0-flash` → `2.0-flash-lite` → `gemma-4-31b-it` → `1.5-flash-001`), exponential backoff on 429/503. | Mock topic generation in `src/lib/ai-pipeline.ts` (static arrays based on keyword flags). | **Mock** | `src/lib/ai-pipeline.ts:40-120` | **M** | Low | Build server-side provider-agnostic `src/lib/llm/` with Zod validation, search grounding (Google Search tool), and fallback chain. |
| **4.2** | **Banned Topics Guardrail** | `banned_topics.txt` loaded on startup and injected as negative constraints into prompt. | None. Niche keywords are filtered purely for mock template matching. | **No** | None | **S** | Very Low | Implement workspace-level blocklist in database/localStorage and inject into research/script prompts. |
| **4.3** | **Structured Script Writer & Fact Check** | 9-section cinematic script (`agents/scriptwriter.py`) with hook, open loops, pattern interrupts, and 3 image queries per section. | Script generated from static string templates in `src/lib/ai-pipeline.ts`. Fact-check items are hardcoded strings. | **Partial / Mock** | `src/lib/ai-pipeline.ts:160-240` | **M** | Low | Port 9-section structure + 3-section Shorts structure to live LLM generation with an automated claim-extraction pass flagging facts for human source review. |
| **4.4** | **Narration with Word-Level Timing** | Edge-TTS (`video/narrator.py`) streaming audio + WordBoundary events, generating `.srt` and `.mp3`. | Browser `window.speechSynthesis` in `src/app/narracao/page.tsx`; no audio file output or word timing. | **No** | `src/app/narracao/page.tsx:140-190` | **M** | Medium | Implement worker-based Edge-TTS / Cloud TTS generating normalized MP3 and word-timed SRT cues (supporting Urdu and English). |
| **4.5** | **Stock Image Integration (Pexels)** | Pexels REST API (`video/stock.py`) fetching 1 image/section (normal) or 4 images/section (Shorts) with orientation & fallback. | Unsplash static URLs and mock cards in `src/app/imagens/page.tsx`. | **Mock** | `src/app/imagens/page.tsx` | **S** | Low | Add server-side Pexels API client with cache, attribution metadata, and manual image-swap UI. |
| **4.6** | **Video Renderer (16:9 + 9:16 Shorts)** | MoviePy 1.0.3 (`video/creator.py`) with Ken Burns zoom, crossfades, burned-in subtitles, and looped BGM. | Canvas simulated playback in `src/app/video-automatico/page.tsx`. No actual video rendering or MP4 export. | **No** | `src/app/video-automatico/page.tsx` | **L** | High (Serverless limit) | Deploy standalone containerized Python/FFmpeg worker on Railway/Render/Modal with signed object storage. |
| **4.7** | **Human Review & Decision Gate** | Flask local dashboard (`review/app.py`) blocking until explicit Approve or Reject click. | Next.js project viewer (`src/app/project/[id]/page.tsx`) with copy buttons, but no publish gate. | **Partial** | `src/app/project/[id]/page.tsx` | **M** | Low | Build formal `/review/[jobId]` approval gate requiring human sign-off on fact-check, licenses, and AI disclosures before upload. |
| **4.8** | **YouTube Data API v3 Upload & Scheduling** | `uploader/youtube.py` using installed OAuth client secrets, resumable 5MB chunk upload, tags, and category. | None. Links to `#` or export to clipboard. | **No** | None | **M** | High (Quota/Audit) | Implement Google OAuth 2.0 Web Flow, resumable chunked upload, altered/synthetic content disclosure, and scheduling with quota error states. |
| **4.9** | **Thumbnail Generator** | Conceptual Midjourney prompts only in reference repo. | 3 SVG canvas concept generators (`src/lib/thumbnail-generator.ts`) rendering text over gradients. | **Partial** | `src/lib/thumbnail-generator.ts` | **M** | Low | Upgrade to composite AI/Pexels background with canvas overlay, 3-word rule, 1280x720 PNG export, and mobile feed preview. |
| **4.10** | **Accounts, Credits Ledger & Payments** | None (reference repo is single-user local CLI). | Client-side mock `localStorage` in `src/lib/store.ts`. Pricing links hardcoded to `/create`. | **Mock** | `src/lib/store.ts`, `src/app/pricing/page.tsx` | **L** | Medium | Implement Postgres (Supabase/Neon), authenticated sessions, server-side transactional credits ledger, and payment gateway (Safepay/PayFast/Paddle). |
| **4.11** | **Analytics Dashboard** | Roadmap only in reference repo. | Static metrics in `src/app/dashboard/page.tsx` (PKR 284,500, RPM, etc.). | **Mock** | `src/app/dashboard/page.tsx` | **M** | Low | Connect read-only YouTube Analytics API v2 or show honest disconnected state with zero fake numbers. |
| **5.1** | **Deterministic Free Tools (12)** | None in reference repo (reference is pipeline-focused). | 12 tools in `src/app/tools/` using a mix of mock `setTimeout` and basic regex. | **Partial / Mock** | `src/app/tools/*` | **M** | Low | Port proven deterministic libraries (`hookscore.ts`, `title.ts`, `deadair.ts`, `chapters.ts`, `retention.ts`) from YT Agent Studio. |
| **5.2** | **Property Valuation & Mortgage Math** | None in reference repo. | Heuristic formula in `src/app/precificacao/page.tsx`; Brazilian SAC/PRICE amortization in `src/app/financiamento/page.tsx`. | **Partial** | `src/app/precificacao`, `src/app/financiamento` | **S** | Low | Add clear disclaimer, confidence intervals, unit tests; replace SAC with Pakistani reducing-balance and Islamic Musharakah math. |
| **5.3** | **Leads CRM** | None in reference repo. | Kanban board in `src/app/leads/page.tsx` with Portuguese internal status keys. | **Partial** | `src/app/leads/page.tsx` | **S** | Low | Clean Portuguese keys, add CSV import/export, drag-and-drop, WhatsApp link formatting (`wa.me`), and opt-out flags. |
| **5.4** | **Language & RTL Support** | English only in reference repo. | Mixed English, Roman Urdu, and Hinglish. No RTL stylesheet or Arabic fonts. | **Partial** | `src/app/globals.css` | **M** | Low | Add clean English/Urdu toggle with Noto Nastaliq Urdu / Amiri font fallbacks and proper RTL directionality. |

---

## 3. Exhaustive Route Inventory & Classification

Total detected routes: **38** (App routes + API routes).

| Route Path | Type | Status | Current Behavior & Defect Analysis | Required Action |
|---|---|:---:|---|---|
| `/` | Page | **Working UI (Mock Data)** | Hero renders fixed mock figures ("9,999 Credits", "PKR 284,500", "14.8% Projected CTR"). Invented statistic in demo script ("24%"). | Label demo numbers as "Sample", remove "Projected CTR", fix copy. |
| `/create` | Page | **Working UI (Mock Output)** | Form submits to `/api/pipeline/run`, which returns mock static data. | Connect to live multi-agent backend with LLM fallback. |
| `/project/[id]` | Page | **Working UI (Mock Data)** | Displays project sections from `localStorage`. Zero video playback. | Add video review player, fact-check source verification, and approve gate. |
| `/dashboard` | Page | **Working UI (Mock Data)** | Displays hardcoded stats and local projects. | Replace hardcoded figures with real user project history. |
| `/demo` | Page | **Working** | Interactive guided tour of the 9-agent concept. | Keep, but label all metrics as demonstration heuristics. |
| `/pricing` | Page | **Mock / Placeholder** | 4 tier cards in PKR, but all buttons link to `/create`. | Connect real payment flow or display honest "Coming Soon". |
| `/planos` | Page | **Duplicate** | Portuguese alias for pricing. | Add 301 redirect to `/pricing`. |
| `/settings` | Page | **Mock / Broken** | Form accepts API keys but only triggers a mock timeout; keys are not saved or encrypted. | Implement secure server-side encrypted BYOK storage. |
| `/login` | Page | **Mock** | Toggle button simulates login as User or Admin in `localStorage`. | Implement real OAuth (Google/Email). |
| `/privacy` | Page | **Working** | Privacy policy text. | Add YouTube API Services disclosures and AI processor details. |
| `/terms` | Page | **Working** | Terms of service text. | Add MIT credit to reference repo and YouTube terms link. |
| `/refund` | Page | **Working** | Refund policy text. | Align with actual payment processor terms. |
| `/blog` | Page | **Working** | Static creator playbooks. | Retain. |
| `/cursos` | Page | **Portuguese Slug** | Course curriculum player for creator academy. | Rename to `/academy` with 301 redirect. |
| `/narracao` | Page | **Portuguese Slug (Mock)** | Browser WebSpeech audio generator. No exportable MP3/SRT. | Rename to `/voiceover` with 301 redirect; connect Edge-TTS. |
| `/imagens` | Page | **Portuguese Slug (Mock)** | Gallery of Unsplash cards with prompt copying. | Rename to `/images` with 301 redirect; integrate Pexels API. |
| `/video-automatico` | Page | **Portuguese Slug (Mock)** | Canvas slideshow simulation. | Rename to `/video-creator` with 301 redirect. |
| `/precificacao` | Page | **Portuguese Slug** | Property valuation calculator. Lacks disclaimer. | Rename to `/valuation` with 301 redirect; add methodology disclaimer. |
| `/financiamento` | Page | **Portuguese Slug** | Mortgage simulator using Brazilian SAC math. | Rename to `/mortgage` with 301 redirect; implement PKR Diminishing Musharakah. |
| `/leads` | Page | **Working (Partial)** | Kanban CRM with Portuguese status tags (`novo`, `contato`). | Normalize status keys, add CSV export and WhatsApp click-to-chat. |
| `/videos` | Page | **Working** | Video library list from `localStorage`. | Retain and connect to real job queue assets. |
| `/descricoes` | Page | **Portuguese Slug** | Description generator. | Rename to `/descriptions` with 301 redirect. |
| `/assistente` | Page | **Working** | Rule-based chatbot assistant. | Connect to real assistant endpoint with domain grounding. |
| `/minha-assinatura`| Page | **Portuguese Slug** | Subscription view. | Rename to `/subscription` with 301 redirect. |
| `/tools` | Page | **Working** | 12 creator micro-tools catalog. | Align tool titles and operational badges with real capabilities. |
| `/tools/title-tester` | Page | **Mock / Misleading** | "Title CTR Predictor" predicts fake CTR (`Math.min(18.5, ctr)`). | Rename to "Title Score", port deterministic `title.ts` linter. |
| `/tools/hook-generator`| Page | **Mock** | Static hardcoded array of 3 hooks. | Port deterministic 21-formula classifier + live LLM generation. |
| `/tools/youtube-seo-grader` | Page | **Working** | Heuristic character length and tag scorer. | Retain and enhance with deterministic query testing. |
| `/tools/hinglish-ratio`| Page | **Working** | Roman Urdu vs English word balance checker. | Retain and enhance word dictionaries. |
| `/tools/youtube-income-calculator`| Page | **Working** | RPM * views calculator in PKR. | Retain; add niche RPM benchmark table. |
| `/tools/tone-fingerprint` | Page | **Working** | Cadence and linguistic profile questionnaire. | Connect directly into studio pipeline injection. |
| `/tools/niche-picker` | Page | **Working** | Niche matrix. | Retain. |
| `/tools/thumbnail-ideas` | Page | **Working** | Brainstorming prompts. | Retain. |
| `/tools/ai-script-robot-score` | Page | **Working** | Flags robotic words. | Retain; expand forbidden words list. |
| `/tools/sebi-cheatsheet` | Page | **Misaligned** | Financial disclaimer referencing Indian SEBI. | Align with Pakistani SECP regulations. |
| `/tools/templates` | Page | **Working** | Template library. | Retain. |
| `/tools/quiz` | Page | **Working** | Archetype quiz. | Retain. |
| `/admin/*` | Pages | **Working Mock** | Admin dashboard, guardian health, ledger, and member tables. | Maintain for system monitoring, wire to real health registry. |
| `/api/pipeline/run` | API | **Mock Route** | Generates mock project data. | Refactor to invoke server-side LLM pipeline. |
| `/api/pipeline/generate-thumbnail` | API | **Mock Route** | Returns SVG canvas data. | Connect to canvas/image rendering pipeline. |
| `/api/assistant/chat` | API | **Working** | Rule-based domain assistant. | Retain, enhance with verified health telemetry. |
| `/api/guardian/*` | API | **Working Mock** | Heartbeat, health check, escalation endpoints. | Convert into real system health registry (`/api/health`). |

---

## 4. Architectural Split & Infrastructure Plan

Because Next.js on Vercel Serverless has a strict 15–60s execution timeout and lacks system FFmpeg/MoviePy binaries, the video production pipeline requires an asynchronous decoupled architecture:

```
┌──────────────────────────────────────────────┐
│            VERCEL (Next.js 16 App)           │
│  - Modern Responsive Web UI & Auth           │
│  - Fast LLM Pipeline (/api/pipeline/run)     │
│  - Human Review & Decision Gate (/review)    │
│  - Micro-Tools & Deterministic Linters       │
│  - Webhook Handlers                          │
└───────────────┬──────────────────────────────┘
                │ Dispatches Job
                ▼
┌──────────────────────────────────────────────┐
│         JOB QUEUE (Upstash Redis / QStash)   │
└───────────────┬──────────────────────────────┘
                │ Consumes Job
                ▼
┌──────────────────────────────────────────────┐
│       RENDER WORKER (Python Container)       │
│  - Edge-TTS Word-Boundary Synthesis          │
│  - Pexels Image Fetching & Caching           │
│  - MoviePy 1.0.3 + FFmpeg (1080p / 9:16)     │
│  - Urdu RTL Font Shaping (Amiri / Noto)      │
│  - Background Music Looping & Ducking        │
│  Host: Railway / Render / Fly.io / Modal     │
└───────────────┬──────────────────────────────┘
                │ Uploads Rendered Artifacts
                ▼
┌──────────────────────────────────────────────┐
│      OBJECT STORAGE (Cloudflare R2 / S3)     │
│  - Narration MP3 + SRT Captions              │
│  - Rendered MP4 Video & Shorts               │
│  - High-Res Thumbnails                       │
└──────────────────────────────────────────────┘
```

---

## 5. Summary of Truthfulness & Consistency Issues to Address in Phase 1

1. **Demo Figures:** Replace static hero metrics ("9,999 Credits", "STUDIO PRO", "PKR 284,500", "14.8% Projected CTR") with dynamic account data or clearly labeled "Sample / Simulation" tags.
2. **Title Predictor:** Rename "Title CTR Predictor" to "Title Score", explicitly stating it is an editorial heuristic.
3. **Invented Stats:** Remove the invented "grew by 24%" statistic from the sample script.
4. **Canonical & Branding:** Consolidate domain configuration across `metadataBase`, `canonical`, OpenGraph, Twitter, sitemap, and schema to `https://sirfshoot-ai.vercel.app`.
5. **Portuguese Slugs:** Create 301 redirects for `/cursos` → `/academy`, `/narracao` → `/voiceover`, `/imagens` → `/images`, `/video-automatico` → `/video-creator`, `/precificacao` → `/valuation`, `/financiamento` → `/mortgage`.
6. **Regulatory Alignment:** Replace Indian SEBI references with Pakistani SECP guidelines.
7. **Social & Footer Links:** Remove placeholder social links (`https://youtube.com`, `https://x.com`) or replace with verified project accounts; fix `#agents` anchor collisions.
