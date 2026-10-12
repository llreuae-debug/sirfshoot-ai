import { NextRequest, NextResponse } from 'next/server';
import { runFullPipeline } from '@/lib/ai-pipeline';
import { DEFAULT_TONE_FINGERPRINTS } from '@/lib/mock-data';

export const SYSTEM_ENGLISH_POLICY_INSTRUCTION =
  'Write all user-facing textual output in clear, natural, professional English. Do not switch languages unless the application owner explicitly authorizes a change to the English-only product policy.';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { topic, niche = 'Geopolitics', language = 'english', targetRuntimeMin = 10, toneFingerprintId } = body;

    if (!topic || typeof topic !== 'string') {
      return NextResponse.json({ error: 'Valid topic string is required.' }, { status: 400 });
    }

    const toneFingerprint =
      DEFAULT_TONE_FINGERPRINTS.find((t) => t.id === toneFingerprintId) ||
      DEFAULT_TONE_FINGERPRINTS.find((t) => t.language === 'english') ||
      DEFAULT_TONE_FINGERPRINTS[0];

    const projectData = await runFullPipeline({
      topic,
      niche,
      language: language as 'english' | 'hinglish' | 'hindi',
      targetRuntimeMin: Number(targetRuntimeMin) || 10,
      toneFingerprint,
    });

    return NextResponse.json({
      success: true,
      project: projectData,
      policy: SYSTEM_ENGLISH_POLICY_INSTRUCTION,
    });
  } catch (error: unknown) {
    console.error('Error running pipeline API:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { error: 'Failed to run 9-agent pipeline', details: message },
      { status: 500 }
    );
  }
}
