#!/usr/bin/env python3
"""
SirfShoot AI — Edge-TTS Voice Synthesizer & Word-Boundary Synchronizer
Outputs:
  - Audio: MP3 file (24kHz, 48kbps CBR)
  - Subtitles: SRT file
  - Word Timings: JSON file with startMs, endMs, and words for karaoke/reel caption rendering
"""
import sys
import os
import re
import json
import asyncio
import argparse
import ssl
import certifi

try:
    ssl._create_default_https_context = lambda: ssl.create_default_context(cafile=certifi.where())
except Exception:
    pass

import edge_tts

def format_timestamp_srt(ms: int) -> str:
    hours = ms // 3600000
    ms %= 3600000
    minutes = ms // 60000
    ms %= 60000
    seconds = ms // 1000
    milliseconds = ms % 1000
    return f"{hours:02d}:{minutes:02d}:{seconds:02d},{milliseconds:03d}"

async def run_synthesis(text: str, voice: str, rate: str, pitch: str, output_audio: str, output_srt: str = None, output_json: str = None):
    communicate = edge_tts.Communicate(text, voice, rate=rate, pitch=pitch)
    
    audio_chunks = []
    word_events = []
    
    async for event in communicate.stream():
        if event["type"] == "audio":
            audio_chunks.append(event["data"])
        elif event["type"] == "WordBoundary":
            offset_ms = int(event["offset"] / 10000)      # 100ns -> ms
            duration_ms = int(event["duration"] / 10000)  # 100ns -> ms
            word_events.append({
                "word": event["text"],
                "startMs": offset_ms,
                "endMs": offset_ms + duration_ms
            })

    # Save MP3 audio
    os.makedirs(os.path.dirname(os.path.abspath(output_audio)), exist_ok=True)
    with open(output_audio, "wb") as f:
        for chunk in audio_chunks:
            f.write(chunk)

    total_bytes = os.path.getsize(output_audio)
    # Edge-TTS audio format is audio-24khz-48kbitrate-mono-mp3 (48 kbps constant bitrate)
    total_duration_ms = int((total_bytes * 8 / 48000) * 1000)

    # If WordBoundary events were emitted, use exact boundaries
    words = re.findall(r"\S+", text)
    if not word_events and words:
        # Fallback to high-accuracy proportional word distribution across total duration
        total_chars = sum(len(w) for w in words) or 1
        current_ms = 0
        for w in words:
            word_dur_ms = max(180, int((len(w) / total_chars) * total_duration_ms))
            end_ms = min(total_duration_ms, current_ms + word_dur_ms)
            word_events.append({
                "word": w,
                "startMs": current_ms,
                "endMs": end_ms
            })
            current_ms = end_ms
        if word_events:
            word_events[-1]["endMs"] = total_duration_ms

    total_words = len(word_events)
    final_duration_ms = word_events[-1]["endMs"] if word_events else total_duration_ms

    # Write Word Boundary JSON
    if output_json:
        os.makedirs(os.path.dirname(os.path.abspath(output_json)), exist_ok=True)
        with open(output_json, "w", encoding="utf-8") as f:
            json.dump({
                "voice": voice,
                "wordCount": total_words,
                "durationMs": final_duration_ms,
                "words": word_events
            }, f, indent=2, ensure_ascii=False)

    # Generate SRT captions
    if output_srt:
        os.makedirs(os.path.dirname(os.path.abspath(output_srt)), exist_ok=True)
        srt_blocks = []
        if word_events:
            block_size = 4
            for i in range(0, len(word_events), block_size):
                chunk = word_events[i:i + block_size]
                start_ms = chunk[0]["startMs"]
                end_ms = chunk[-1]["endMs"]
                phrase = " ".join(c["word"] for c in chunk)
                srt_blocks.append((start_ms, end_ms, phrase))
        
        with open(output_srt, "w", encoding="utf-8") as f:
            for idx, (s_ms, e_ms, phrase) in enumerate(srt_blocks, start=1):
                f.write(f"{idx}\n")
                f.write(f"{format_timestamp_srt(s_ms)} --> {format_timestamp_srt(e_ms)}\n")
                f.write(f"{phrase}\n\n")

    return {
        "success": True,
        "audio": output_audio,
        "srt": output_srt,
        "json": output_json,
        "wordsCount": total_words,
        "durationMs": final_duration_ms,
        "voice": voice
    }

def main():
    parser = argparse.ArgumentParser(description="SirfShoot Edge-TTS Neural Voice Generator")
    parser.add_argument("--text", type=str, required=True, help="Text to speak")
    parser.add_argument("--voice", type=str, default="ur-PK-UzmaNeural", help="Voice model ID")
    parser.add_argument("--rate", type=str, default="+0%", help="Speed rate (+10%%, -10%%)")
    parser.add_argument("--pitch", type=str, default="+0Hz", help="Pitch shift")
    parser.add_argument("--output-audio", type=str, required=True, help="Path to save audio.mp3")
    parser.add_argument("--output-srt", type=str, default=None, help="Path to save subtitles.srt")
    parser.add_argument("--output-json", type=str, default=None, help="Path to save word timings JSON")

    args = parser.parse_args()
    result = asyncio.run(run_synthesis(
        text=args.text,
        voice=args.voice,
        rate=args.rate,
        pitch=args.pitch,
        output_audio=args.output_audio,
        output_srt=args.output_srt,
        output_json=args.output_json
    ))
    print(json.dumps(result))

if __name__ == "__main__":
    main()
