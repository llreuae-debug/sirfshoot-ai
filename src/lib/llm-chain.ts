/**
 * Multi-Provider LLM Fallback Chain
 * Ported from reference architecture (agents/gemini_client.py)
 * Tries Gemini models in priority order, then OpenAI models, then returns null for local template fallback.
 */

export interface LLMRequestOptions {
  prompt: string;
  systemInstruction?: string;
  temperature?: number;
  preferredModel?: string;
  keys?: {
    geminiKey?: string;
    openAiKey?: string;
  };
}

export interface LLMResponse {
  text: string;
  model: string;
  provider: 'gemini' | 'openai';
  latencyMs: number;
}

const GEMINI_MODELS = [
  'gemini-2.5-flash',
  'gemini-2.5-flash-lite',
  'gemini-2.0-flash',
  'gemini-2.0-flash-lite',
  'gemini-1.5-flash',
  'gemini-1.5-pro',
];

const OPENAI_MODELS = [
  'gpt-4o',
  'gpt-4o-mini',
];

function shouldSwitchModel(status: number, errorMsg: string): boolean {
  if (status === 429 || status === 503 || status === 500 || status === 504 || status === 404) {
    return true;
  }
  const lower = errorMsg.toLowerCase();
  return (
    lower.includes('quota') ||
    lower.includes('rate limit') ||
    lower.includes('resource_exhausted') ||
    lower.includes('overloaded') ||
    lower.includes('high demand') ||
    lower.includes('not found') ||
    lower.includes('temporarily unavailable')
  );
}

async function callGemini(model: string, apiKey: string, prompt: string, systemInstruction?: string, temperature = 0.7): Promise<string> {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
  
  const contents = [
    {
      role: 'user',
      parts: [{ text: prompt }],
    },
  ];

  const payload: Record<string, unknown> = {
    contents,
    generationConfig: {
      temperature,
    },
  };

  if (systemInstruction) {
    payload.systemInstruction = {
      parts: [{ text: systemInstruction }],
    };
  }

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const errorText = await res.text();
    const err = new Error(`Gemini ${model} HTTP ${res.status}: ${errorText}`);
    (err as unknown as { status: number }).status = res.status;
    throw err;
  }

  const data = await res.json();
  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) {
    throw new Error(`Gemini ${model} returned empty response.`);
  }
  return text.trim();
}

async function callOpenAI(model: string, apiKey: string, prompt: string, systemInstruction?: string, temperature = 0.7): Promise<string> {
  const url = 'https://api.openai.com/v1/chat/completions';

  const messages = [];
  if (systemInstruction) {
    messages.push({ role: 'system', content: systemInstruction });
  }
  messages.push({ role: 'user', content: prompt });

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      messages,
      temperature,
    }),
  });

  if (!res.ok) {
    const errorText = await res.text();
    const err = new Error(`OpenAI ${model} HTTP ${res.status}: ${errorText}`);
    (err as unknown as { status: number }).status = res.status;
    throw err;
  }

  const data = await res.json();
  const text = data?.choices?.[0]?.message?.content;
  if (!text) {
    throw new Error(`OpenAI ${model} returned empty response.`);
  }
  return text.trim();
}

export async function generateWithFallbackChain(options: LLMRequestOptions): Promise<LLMResponse | null> {
  const {
    prompt,
    systemInstruction,
    temperature = 0.7,
    preferredModel,
    keys,
  } = options;

  const geminiKey = keys?.geminiKey || process.env.GEMINI_API_KEY;
  const openAiKey = keys?.openAiKey || process.env.OPENAI_API_KEY;

  if (!geminiKey && !openAiKey) {
    return null; // Gracefully signal caller to use local deterministic engine
  }

  const startTime = Date.now();

  // Rotate Gemini chain if preferredModel is in the list
  let activeGeminiChain = [...GEMINI_MODELS];
  if (preferredModel && activeGeminiChain.includes(preferredModel)) {
    const idx = activeGeminiChain.indexOf(preferredModel);
    activeGeminiChain = [...activeGeminiChain.slice(idx), ...activeGeminiChain.slice(0, idx)];
  }

  // 1. Try Gemini models
  if (geminiKey) {
    for (const model of activeGeminiChain) {
      try {
        const text = await callGemini(model, geminiKey, prompt, systemInstruction, temperature);
        return {
          text,
          model,
          provider: 'gemini',
          latencyMs: Date.now() - startTime,
        };
      } catch (err: unknown) {
        const status = (err as { status?: number })?.status || 500;
        const msg = err instanceof Error ? err.message : String(err);
        if (shouldSwitchModel(status, msg)) {
          console.warn(`[LLM Chain] ${model} unavailable (${status}) — falling back to next model.`);
          continue;
        } else {
          console.error(`[LLM Chain] Unrecoverable error on ${model}:`, msg);
          break; // Auth error or client bug
        }
      }
    }
  }

  // 2. Fall back to OpenAI models if available
  if (openAiKey) {
    for (const model of OPENAI_MODELS) {
      try {
        const text = await callOpenAI(model, openAiKey, prompt, systemInstruction, temperature);
        return {
          text,
          model,
          provider: 'openai',
          latencyMs: Date.now() - startTime,
        };
      } catch (err: unknown) {
        const status = (err as { status?: number })?.status || 500;
        const msg = err instanceof Error ? err.message : String(err);
        if (shouldSwitchModel(status, msg)) {
          console.warn(`[LLM Chain] OpenAI ${model} unavailable (${status}) — trying next.`);
          continue;
        } else {
          console.error(`[LLM Chain] Unrecoverable error on OpenAI ${model}:`, msg);
          break;
        }
      }
    }
  }

  return null;
}
