import { NextRequest, NextResponse } from 'next/server';
import { spawn } from 'child_process';
import path from 'path';
import fs from 'fs';
import os from 'os';

function getPythonPath(): string {
  if (process.env.VENV_PYTHON && fs.existsSync(process.env.VENV_PYTHON)) {
    return process.env.VENV_PYTHON;
  }
  const defaultVenv = '/Users/dilnawaz/.gemini/antigravity-ide/venvs/sirfshoot-venv/bin/python';
  if (fs.existsSync(defaultVenv)) {
    return defaultVenv;
  }
  return 'python3';
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      title = 'SirfShoot Video',
      sections = [],
      orientation = 'landscape',
      voice = 'en-US-AndrewMultilingualNeural',
      synthesizeAudio = true,
      audioUrl,
    } = body;

    if (!Array.isArray(sections) || sections.length === 0) {
      return NextResponse.json(
        { error: 'Invalid payload: at least one scene/section is required.' },
        { status: 400 }
      );
    }

    const publicVideosDir = path.join(process.cwd(), 'public', 'outputs', 'videos');
    const publicAudioDir = path.join(process.cwd(), 'public', 'outputs', 'audio');
    fs.mkdirSync(publicVideosDir, { recursive: true });
    fs.mkdirSync(publicAudioDir, { recursive: true });

    const timestamp = Date.now();
    const rand = Math.random().toString(36).substring(2, 8);
    const videoFileName = `video_${timestamp}_${rand}.mp4`;
    const targetVideoPath = path.join(publicVideosDir, videoFileName);
    const publicVideoUrl = `/outputs/videos/${videoFileName}`;

    let localAudioPath: string | null = null;
    let publicAudioUrl: string | null = null;

    // 1. Synthesize Audio if requested
    if (synthesizeAudio && !audioUrl) {
      const fullText = sections
        .map((s: { content?: string }) => s.content || '')
        .filter(Boolean)
        .join(' ');

      if (fullText.trim().length > 0) {
        const audioFileName = `audio_${timestamp}_${rand}.mp3`;
        localAudioPath = path.join(publicAudioDir, audioFileName);
        publicAudioUrl = `/outputs/audio/${audioFileName}`;

        const pythonBin = getPythonPath();
        const synthScript = path.join(process.cwd(), 'scripts', 'synthesize_voice.py');

        await new Promise<void>((resolve, reject) => {
          const proc = spawn(/*turbopackIgnore: true*/ pythonBin, [
            synthScript,
            '--text',
            fullText.slice(0, 3000),
            '--voice',
            voice,
            '--output-audio',
            localAudioPath!,
          ]);

          let stderr = '';
          proc.stderr.on('data', (d) => (stderr += d.toString()));
          proc.on('close', (code) => {
            if (code === 0 && fs.existsSync(localAudioPath!)) {
              resolve();
            } else {
              console.warn('Voice synthesis failed, proceeding without voice:', stderr);
              localAudioPath = null;
              resolve();
            }
          });
          proc.on('error', (err) => {
            console.warn('Voice synthesis process error:', err);
            localAudioPath = null;
            resolve();
          });
        });
      }
    } else if (audioUrl) {
      const candidate = path.join(process.cwd(), 'public', audioUrl.replace(/^\//, ''));
      if (fs.existsSync(candidate)) {
        localAudioPath = candidate;
        publicAudioUrl = audioUrl;
      }
    }

    // 2. Prepare Manifest JSON file
    const manifestData = {
      title,
      orientation,
      sections,
    };
    const manifestPath = path.join(os.tmpdir(), `manifest_${timestamp}_${rand}.json`);
    fs.writeFileSync(manifestPath, JSON.stringify(manifestData), 'utf-8');

    // 3. Execute render_video.py
    const pythonBin = getPythonPath();
    const renderScript = path.join(process.cwd(), 'scripts', 'render_video.py');

    const args = [
      renderScript,
      '--manifest',
      manifestPath,
      '--output',
      targetVideoPath,
      '--orientation',
      orientation === 'shorts' ? 'shorts' : 'landscape',
    ];

    if (localAudioPath && fs.existsSync(localAudioPath)) {
      args.push('--audio-path', localAudioPath);
    }

    const renderResult = await new Promise<{
      success: boolean;
      duration?: number;
      scenesCount?: number;
      width?: number;
      height?: number;
      error?: string;
    }>((resolve, reject) => {
      const proc = spawn(/*turbopackIgnore: true*/ pythonBin, args);
      let stdout = '';
      let stderr = '';

      proc.stdout.on('data', (d) => (stdout += d.toString()));
      proc.stderr.on('data', (d) => (stderr += d.toString()));

      proc.on('close', (code) => {
        try {
          if (fs.existsSync(manifestPath)) fs.unlinkSync(manifestPath);
        } catch {}

        if (code === 0 && fs.existsSync(targetVideoPath)) {
          try {
            const parsed = JSON.parse(stdout.trim());
            resolve({
              success: true,
              duration: parsed.duration,
              scenesCount: parsed.scenes_count,
              width: parsed.width,
              height: parsed.height,
            });
          } catch {
            resolve({ success: true, duration: 15.0, scenesCount: sections.length });
          }
        } else {
          console.error('Render video process failed with code', code, stderr);
          resolve({ success: false, error: stderr || 'Video rendering failed' });
        }
      });

      proc.on('error', (err) => {
        console.error('Render process spawn error:', err);
        resolve({ success: false, error: err.message });
      });
    });

    if (!renderResult.success) {
      return NextResponse.json(
        { error: renderResult.error || 'Failed to render video.' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      videoUrl: publicVideoUrl,
      audioUrl: publicAudioUrl,
      orientation,
      width: renderResult.width || (orientation === 'shorts' ? 1080 : 1920),
      height: renderResult.height || (orientation === 'shorts' ? 1920 : 1080),
      duration: renderResult.duration || 15.0,
      scenesCount: renderResult.scenesCount || sections.length,
    });
  } catch (err: unknown) {
    if ((err as { digest?: string })?.digest === 'NEXT_PRERENDER_INTERRUPTED') {
      throw err;
    }
    console.error('Video render route exception:', err);
    return NextResponse.json(
      { error: 'Internal error during video rendering pipeline' },
      { status: 500 }
    );
  }
}

export async function GET() {
  const pythonBin = getPythonPath();
  const ffmpegExists = fs.existsSync('/opt/homebrew/bin/ffmpeg');

  return NextResponse.json({
    status: 'ready',
    engine: 'Pillow + FFmpeg + Edge-TTS',
    ffmpegAvailable: ffmpegExists,
    pythonRuntime: pythonBin,
    supportedOrientations: ['landscape', 'shorts'],
    resolutions: {
      landscape: '1920x1080 (16:9)',
      shorts: '1080x1920 (9:16)',
    },
  });
}
