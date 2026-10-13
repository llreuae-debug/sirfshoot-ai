import { NextResponse } from 'next/server';

export async function GET() {
  const hasGemini = Boolean(process.env.GEMINI_API_KEY);
  const hasOpenAI = Boolean(process.env.OPENAI_API_KEY);
  const hasPexels = Boolean(process.env.PEXELS_API_KEY);

  const capabilities = {
    llm: {
      status: hasGemini || hasOpenAI ? 'ready' : 'fallback_heuristic',
      activeProvider: hasGemini ? 'gemini' : hasOpenAI ? 'openai' : 'local_heuristic',
      hasByokSupport: true,
    },
    voice: {
      status: 'ready',
      engine: 'edge-tts_word_sync',
      supportedLanguages: ['en', 'ur', 'roman_urdu'],
    },
    images: {
      status: hasPexels ? 'ready' : 'stock_curated',
      provider: hasPexels ? 'pexels_api' : 'verified_library',
    },
    tools: {
      status: 'ready',
      count: 12,
      deterministicLinters: true,
    },
    agents: {
      status: 'ready',
      count: 9,
      humanReviewGateEnforced: true,
    },
  };

  return NextResponse.json({
    status: 'operational',
    service: 'SirfShoot AI / Tameeros Shorts',
    timestamp: new Date().toISOString(),
    capabilities,
  }, {
    headers: {
      'Cache-Control': 'no-store, max-age=0',
    },
  });
}
