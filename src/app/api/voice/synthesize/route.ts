import { NextRequest, NextResponse } from 'next/server';
import { execFile } from 'child_process';
import { promisify } from 'util';
import path from 'path';
import fs from 'fs';
import os from 'os';

const execFileAsync = promisify(execFile);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      text,
      voice = 'en-US-AndrewMultilingualNeural',
      rate = '+0%',
      pitch = '+0Hz',
    } = body;

    if (!text || typeof text !== 'string' || text.trim().length === 0) {
      return NextResponse.json({ error: 'Text string is required for speech synthesis' }, { status: 400 });
    }

    const scriptPath = path.join(process.cwd(), 'scripts', 'synthesize_voice.py');
    const externalVenv = '/Users/dilnawaz/.gemini/antigravity-ide/venvs/sirfshoot-venv/bin/python';
    const pythonExecutable = process.env.VENV_PYTHON || (fs.existsSync(externalVenv) ? externalVenv : 'python3');

    const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'sirfshoot-tts-'));
    const outputAudio = path.join(tempDir, 'output.mp3');
    const outputSrt = path.join(tempDir, 'output.srt');
    const outputJson = path.join(tempDir, 'output.json');

    const args = [
      scriptPath,
      '--text', text.slice(0, 4000), // Protect against unbounded text payloads
      '--voice', voice,
      '--rate', rate,
      '--pitch', pitch,
      '--output-audio', outputAudio,
      '--output-srt', outputSrt,
      '--output-json', outputJson,
    ];

    try {
      const { stdout } = await execFileAsync(pythonExecutable, args, { timeout: 30000 });
      const meta = JSON.parse(stdout);

      const audioBuffer = fs.readFileSync(outputAudio);
      const audioBase64 = `data:audio/mp3;base64,${audioBuffer.toString('base64')}`;
      const srtContent = fs.existsSync(outputSrt) ? fs.readFileSync(outputSrt, 'utf-8') : null;
      const jsonContent = fs.existsSync(outputJson) ? JSON.parse(fs.readFileSync(outputJson, 'utf-8')) : null;

      // Clean up temp files
      try {
        fs.rmSync(tempDir, { recursive: true, force: true });
      } catch {
        // Non-critical temp cleanup
      }

      return NextResponse.json({
        success: true,
        voice,
        durationMs: meta.durationMs,
        wordsCount: meta.wordsCount,
        audioBase64,
        srt: srtContent,
        wordTimings: jsonContent?.words || [],
      });
    } catch (procErr: unknown) {
      console.error('Edge-TTS execution error:', procErr);
      return NextResponse.json({
        error: 'Edge-TTS synthesizer encountered a runtime exception',
        details: procErr instanceof Error ? procErr.message : String(procErr),
      }, { status: 500 });
    }
  } catch (err: unknown) {
    console.error('Voice synthesis route error:', err);
    return NextResponse.json({
      error: 'Failed to process speech synthesis request',
      details: err instanceof Error ? err.message : String(err),
    }, { status: 500 });
  }
}
