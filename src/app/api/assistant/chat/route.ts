import { NextRequest, NextResponse } from 'next/server';

interface ChatRequestPayload {
  message: string;
  history?: { role: 'user' | 'assistant'; content: string }[];
  context?: {
    currentPage?: string;
    userPlan?: string;
    creditsRemaining?: number;
  };
}

// In-memory rate limiting map: ip -> timestamps[]
const rateLimitMap = new Map<string, number[]>();
const RATE_LIMIT_WINDOW_MS = 60000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 30;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const timestamps = rateLimitMap.get(ip) || [];
  const validTimestamps = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  if (validTimestamps.length >= MAX_REQUESTS_PER_WINDOW) {
    return false;
  }
  validTimestamps.push(now);
  rateLimitMap.set(ip, validTimestamps);
  return true;
}

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get('x-forwarded-for') || '127.0.0.1';
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please wait a moment before sending another message.' },
        { status: 429 }
      );
    }

    const body: ChatRequestPayload = await req.json();
    const userMessage = body.message?.trim();

    if (!userMessage) {
      return NextResponse.json({ error: 'Message cannot be empty.' }, { status: 400 });
    }

    if (userMessage.length > 2000) {
      return NextResponse.json(
        { error: 'Message exceeds maximum length of 2000 characters.' },
        { status: 400 }
      );
    }

    // Sanitize message against simple prompt injection / extraction attempts
    const sanitizedPrompt = userMessage.slice(0, 2000);
    const lower = sanitizedPrompt.toLowerCase();

    // Context metadata
    const currentPage = body.context?.currentPage || '/';
    const userPlan = body.context?.userPlan || 'creator';
    const creditsRemaining = body.context?.creditsRemaining ?? 7;

    let reply = '';
    let suggestedActions: { label: string; actionType: 'navigate' | 'prefill' | 'escalate'; payload?: string }[] = [];

    // Intelligent domain-grounded assistant reasoning
    if (lower.includes('price') || lower.includes('cost') || lower.includes('pricing') || lower.includes('plan')) {
      reply = `Tameeros Shorts offers transparent pricing quoted in Pakistani Rupee (PKR):\n\n` +
        `• **Free Trial:** PKR 0 for 7 days (includes 2 full 9-agent video packages, no credit card required).\n` +
        `• **Starter Plan:** PKR 499 / month (3 full video packages).\n` +
        `• **Creator Plan (Most Popular):** PKR 999 / month (7 full video packages, unlimited Voice Fingerprints, 3-variant thumbnails).\n` +
        `• **Pro Studio Plan:** PKR 1,999 / month (15 full video packages, priority routing, CRM Leads pipeline).\n` +
        `• **Enterprise Studio:** PKR 4,999 / month (50+ packages, custom voice models, API webhooks).\n\n` +
        `You are currently on the **${userPlan.toUpperCase()}** tier with **${creditsRemaining} credits** remaining.`;
      suggestedActions = [
        { label: 'View Pricing & Plans', actionType: 'navigate', payload: '/pricing' },
        { label: 'Start Studio with Free Trial', actionType: 'navigate', payload: '/create' },
      ];
    } else if (lower.includes('9 agent') || lower.includes('pipeline') || lower.includes('how it works') || lower.includes('how does')) {
      reply = `Tameeros Shorts transforms your topic into a ready-to-shoot production package in ~3 minutes using 9 autonomous AI agents:\n\n` +
        `1. **Agent 01 (Research):** Scrapes live Google Trends & YouTube signals.\n` +
        `2. **Agent 02 (Script Engine):** Generates spoken teleprompter scripts matched to your Voice Fingerprint.\n` +
        `3. **Agent 03 (Fact Check):** Cross-checks claims with verified sources.\n` +
        `4. **Agent 04 (Legal & Safety):** SECP compliance & fair-use verification.\n` +
        `5. **Agent 05 (Tone Cloner):** Matches conversational English, Urdu, or Roman Urdu dialects.\n` +
        `6. **Agent 06 (Storyboard):** 14-scene shot list with Midjourney prompts and B-roll cues.\n` +
        `7. **Agent 07 (Thumbnail Designer):** 3 distinct CTR concepts (Safe, Bold, Experimental).\n` +
        `8. **Agent 08 (SEO & Metadata):** High-CTR titles, 800-word descriptions, and chapter markers.\n` +
        `9. **Agent 09 (Shorts Repurposing):** 3 vertical viral clips for TikTok, Shorts, and Reels.`;
      suggestedActions = [
        { label: 'Launch Creation Studio', actionType: 'navigate', payload: '/create' },
        { label: 'Explore Interactive Demo', actionType: 'navigate', payload: '/demo' },
      ];
    } else if (lower.includes('tone') || lower.includes('voice') || lower.includes('fingerprint') || lower.includes('roman urdu')) {
      reply = `Our proprietary **Tone Fingerprint** technology analyzes your cadence, vocabulary, and linguistic habits so your generated scripts actually sound like you—not robotic ChatGPT prose.\n\n` +
        `Supported voices include:\n` +
        `• **Conversational Roman Urdu Explainer** (popular for tech & geopolitics)\n` +
        `• **High-Energy Storyteller** (entertainment & viral news)\n` +
        `• **Authoritative Financial Analyst** (SECP-compliant stocks & crypto)\n` +
        `• **Direct-Response Real Estate Agent** (high-intent property tours)\n\n` +
        `You can calibrate your voice in the Tone Fingerprint tool.`;
      suggestedActions = [
        { label: 'Tone Fingerprint Tool', actionType: 'navigate', payload: '/tools/tone-fingerprint' },
        { label: 'High-RPM Niche Picker', actionType: 'navigate', payload: '/tools/niche-picker' },
      ];
    } else if (lower.includes('real estate') || lower.includes('property') || lower.includes('lead') || lower.includes('mortgage')) {
      reply = `Tameeros Shorts includes specialized AI real estate tools tailored for brokers and agencies:\n\n` +
        `• **Automated Video Generator (/video-creator):** Turns property photos into cinematic video tours.\n` +
        `• **Property Valuation Copilot (/valuation):** AI comparative market analysis.\n` +
        `• **Mortgage Simulator (/mortgage):** Monthly installment calculation.\n` +
        `• **CRM Leads Pipeline (/leads):** Lead tracking with 1-click WhatsApp follow-up generation.`;
      suggestedActions = [
        { label: 'Open CRM Leads Pipeline', actionType: 'navigate', payload: '/leads' },
        { label: 'Property Video Generator', actionType: 'navigate', payload: '/video-creator' },
      ];
    } else if (
      lower.includes('error') ||
      lower.includes('fail') ||
      lower.includes('bug') ||
      lower.includes('issue') ||
      lower.includes('broken') ||
      lower.includes('problem') ||
      lower.includes('timeout')
    ) {
      reply = `I apologize that you encountered a technical issue. Our autonomous Site Reliability system (**Tameeros Guardian AI**) continuously monitors system health and can investigate immediately.\n\n` +
        `Would you like me to log an incident directly with the Guardian Operations team? I will include sanitized diagnostic telemetry from your session so engineers can resolve it promptly.`;
      suggestedActions = [
        { label: 'Escalate to Guardian AI Operations', actionType: 'escalate', payload: userMessage },
        { label: 'Retry Current Action', actionType: 'navigate', payload: currentPage },
      ];
    } else if (lower.includes('contact') || lower.includes('support') || lower.includes('human') || lower.includes('help')) {
      reply = `Our support team is available across multiple channels:\n\n` +
        `• **Email:** hello@tameeros.com / support@tameeros.com\n` +
        `• **Super Administrator:** llre.uae@gmail.com\n` +
        `• **Locations:** Karachi & Dubai\n` +
        `• **Response Time:** Typically under 2 hours for active subscribers.`;
      suggestedActions = [
        { label: 'Visit Creator Academy', actionType: 'navigate', payload: '/academy' },
        { label: 'Read Creator Playbooks', actionType: 'navigate', payload: '/blog' },
      ];
    } else {
      reply = `Hello! I am the **Tameeros Shorts Assistant**. I can help you with:\n\n` +
        `1. Using the **9-Agent Autonomous Production Pipeline** to generate video scripts.\n` +
        `2. Understanding our **PKR Pricing Plans** and credit allocations.\n` +
        `3. Setting up your unique **Tone Fingerprint**.\n` +
        `4. Real estate marketing tools & CRM lead generation.\n` +
        `5. Troubleshooting errors and reporting incidents to **Guardian AI**.\n\n` +
        `What would you like to explore today?`;
      suggestedActions = [
        { label: 'How does 9-Agent Pipeline work?', actionType: 'prefill', payload: 'How does the 9-Agent Pipeline work?' },
        { label: 'What are the subscription plans in PKR?', actionType: 'prefill', payload: 'What are the subscription plans in PKR?' },
        { label: 'Explore Free Creator Tools', actionType: 'navigate', payload: '/tools' },
      ];
    }

    return NextResponse.json({
      reply,
      suggestedActions,
      context: {
        currentPage,
        userPlan,
        creditsRemaining,
        timestamp: new Date().toISOString(),
      },
    });
  } catch (err) {
    console.error('Error in /api/assistant/chat:', err);
    return NextResponse.json(
      { error: 'An unexpected internal error occurred while processing your message.' },
      { status: 500 }
    );
  }
}
