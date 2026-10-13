import crypto from 'crypto';

const ENCRYPTION_SECRET = process.env.APP_SECRET || 'sirfshoot-secure-fallback-secret-32b!';
const ALGORITHM = 'aes-256-gcm';

function getDerivedKey(): Buffer {
  return crypto.createHash('sha256').update(ENCRYPTION_SECRET).digest();
}

export function encrypt(text: string): string {
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv(ALGORITHM, getDerivedKey(), iv);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  const tag = cipher.getAuthTag().toString('hex');
  return `${iv.toString('hex')}:${tag}:${encrypted}`;
}

export function decrypt(encryptedStr: string): string | null {
  try {
    const [ivHex, tagHex, encryptedHex] = encryptedStr.split(':');
    if (!ivHex || !tagHex || !encryptedHex) return null;
    const decipher = crypto.createDecipheriv(
      ALGORITHM,
      getDerivedKey(),
      Buffer.from(ivHex, 'hex')
    );
    decipher.setAuthTag(Buffer.from(tagHex, 'hex'));
    let decrypted = decipher.update(encryptedHex, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  } catch {
    return null;
  }
}

export function maskKey(key: string): string {
  if (!key || key.length < 8) return '••••••••';
  return `${key.slice(0, 4)}••••${key.slice(-4)}`;
}

export interface DecryptedKeys {
  geminiKey?: string;
  openAiKey?: string;
  pexelsKey?: string;
  youtubeAccessToken?: string;
}

export function getDecryptedKeysFromCookie(cookieValue?: string): DecryptedKeys {
  const keys: DecryptedKeys = {
    geminiKey: process.env.GEMINI_API_KEY,
    openAiKey: process.env.OPENAI_API_KEY,
    pexelsKey: process.env.PEXELS_API_KEY,
    youtubeAccessToken: process.env.YOUTUBE_ACCESS_TOKEN,
  };

  if (!cookieValue) return keys;

  try {
    const parsed = JSON.parse(cookieValue);
    if (parsed.gemini) {
      const dec = decrypt(parsed.gemini);
      if (dec) keys.geminiKey = dec;
    }
    if (parsed.openai) {
      const dec = decrypt(parsed.openai);
      if (dec) keys.openAiKey = dec;
    }
    if (parsed.pexels) {
      const dec = decrypt(parsed.pexels);
      if (dec) keys.pexelsKey = dec;
    }
    if (parsed.youtube) {
      const dec = decrypt(parsed.youtube);
      if (dec) keys.youtubeAccessToken = dec;
    }
  } catch {
    // Ignore invalid cookie
  }

  return keys;
}
