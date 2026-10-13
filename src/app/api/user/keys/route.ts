import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

const ENCRYPTION_SECRET = process.env.APP_SECRET || 'sirfshoot-secure-fallback-secret-32b!';
const ALGORITHM = 'aes-256-gcm';

function getDerivedKey(): Buffer {
  return crypto.createHash('sha256').update(ENCRYPTION_SECRET).digest();
}

function encrypt(text: string): string {
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv(ALGORITHM, getDerivedKey(), iv);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  const tag = cipher.getAuthTag().toString('hex');
  return `${iv.toString('hex')}:${tag}:${encrypted}`;
}

function maskKey(key: string): string {
  if (!key || key.length < 8) return '••••••••';
  return `${key.slice(0, 4)}••••${key.slice(-4)}`;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { geminiKey, openAiKey, pexelsKey, youtubeKey } = body;

    const res = NextResponse.json({
      success: true,
      message: 'Keys securely encrypted and registered for this session.',
      status: {
        hasGemini: Boolean(geminiKey || process.env.GEMINI_API_KEY),
        geminiPreview: geminiKey ? maskKey(geminiKey) : process.env.GEMINI_API_KEY ? '••••Server Configured••••' : null,
        hasOpenAI: Boolean(openAiKey || process.env.OPENAI_API_KEY),
        openAiPreview: openAiKey ? maskKey(openAiKey) : process.env.OPENAI_API_KEY ? '••••Server Configured••••' : null,
        hasPexels: Boolean(pexelsKey || process.env.PEXELS_API_KEY),
        pexelsPreview: pexelsKey ? maskKey(pexelsKey) : process.env.PEXELS_API_KEY ? '••••Server Configured••••' : null,
        hasYouTube: Boolean(youtubeKey || process.env.YOUTUBE_ACCESS_TOKEN),
        youtubePreview: youtubeKey ? maskKey(youtubeKey) : process.env.YOUTUBE_ACCESS_TOKEN ? '••••Server Configured••••' : null,
      },
    });

    // Store encrypted keys in an HTTP-only secure cookie
    const keyData: Record<string, string> = {};
    if (geminiKey) keyData.gemini = encrypt(geminiKey);
    if (openAiKey) keyData.openai = encrypt(openAiKey);
    if (pexelsKey) keyData.pexels = encrypt(pexelsKey);
    if (youtubeKey) keyData.youtube = encrypt(youtubeKey);

    if (Object.keys(keyData).length > 0) {
      res.cookies.set('ss_byok', JSON.stringify(keyData), {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: '/',
      });
    }

    return res;
  } catch (err) {
    console.error('Failed to save API keys:', err);
    return NextResponse.json({ error: 'Failed to securely store credentials' }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const cookie = req.cookies.get('ss_byok')?.value;
  let hasUserGemini = false;
  let hasUserOpenAI = false;
  let hasUserPexels = false;
  let hasUserYouTube = false;

  if (cookie) {
    try {
      const parsed = JSON.parse(cookie);
      hasUserGemini = Boolean(parsed.gemini);
      hasUserOpenAI = Boolean(parsed.openai);
      hasUserPexels = Boolean(parsed.pexels);
      hasUserYouTube = Boolean(parsed.youtube);
    } catch {
      // Ignore invalid cookie
    }
  }

  return NextResponse.json({
    hasGemini: hasUserGemini || Boolean(process.env.GEMINI_API_KEY),
    geminiSource: hasUserGemini ? 'user_byok' : process.env.GEMINI_API_KEY ? 'server_env' : 'none',
    hasOpenAI: hasUserOpenAI || Boolean(process.env.OPENAI_API_KEY),
    openAiSource: hasUserOpenAI ? 'user_byok' : process.env.OPENAI_API_KEY ? 'server_env' : 'none',
    hasPexels: hasUserPexels || Boolean(process.env.PEXELS_API_KEY),
    pexelsSource: hasUserPexels ? 'user_byok' : process.env.PEXELS_API_KEY ? 'server_env' : 'none',
    hasYouTube: hasUserYouTube || Boolean(process.env.YOUTUBE_ACCESS_TOKEN),
    youtubeSource: hasUserYouTube ? 'user_byok' : process.env.YOUTUBE_ACCESS_TOKEN ? 'server_env' : 'none',
  });
}
