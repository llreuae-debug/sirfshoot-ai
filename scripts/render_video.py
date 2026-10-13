#!/usr/bin/env python3
"""
SirfShoot AI Video Rendering Engine
Assembles multi-scene video from script sections, background imagery,
Edge-TTS neural voiceover, and burned-in lower-third/Shorts typography.

Supports:
- 16:9 Landscape (1920x1080) for YouTube full videos
- 9:16 Vertical (1080x1920) for YouTube Shorts, Reels, and TikTok
Powered by Pillow + FFmpeg (Apple Silicon H.264 hardware acceleration).
"""

import os
import sys
import json
import math
import argparse
import tempfile
import subprocess
import urllib.request
from PIL import Image, ImageDraw, ImageFont, ImageFilter

FFMPEG_BIN = "/opt/homebrew/bin/ffmpeg" if os.path.exists("/opt/homebrew/bin/ffmpeg") else "ffmpeg"

# Brand Color Palette
COLORS = {
    "bg": (12, 16, 26),
    "primary": (229, 9, 20),       # SirfShoot Red
    "accent": (99, 102, 241),      # Indigo
    "highlight": (251, 191, 36),   # Amber
    "white": (255, 255, 255),
    "slate": (148, 163, 184),
    "pill_bg": (0, 0, 0, 195),
}

FALLBACK_IMAGES = [
    "https://images.unsplash.com/photo-1541888946425-d0fbb18615f3?auto=format&fit=crop&w=1920&q=80", # Architecture
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=80", # Modern house
    "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1920&q=80", # Technology code
    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1920&q=80", # Skyscraper
]

def get_system_font(size: int, bold: bool = False):
    """Finds best available TrueType font on macOS / Linux."""
    candidates = [
        "/System/Library/Fonts/Supplemental/Arial Bold.ttf" if bold else "/System/Library/Fonts/Supplemental/Arial.ttf",
        "/System/Library/Fonts/Helvetica.ttc",
        "/System/Library/Fonts/SFNS.ttf",
        "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf" if bold else "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
    ]
    for p in candidates:
        if os.path.exists(p):
            try:
                return ImageFont.truetype(p, size)
            except Exception:
                continue
    return ImageFont.load_default()

def wrap_text(text: str, font, max_width: int, draw: ImageDraw.ImageDraw) -> list:
    """Wraps text within max_width pixels."""
    words = text.split()
    if not words:
        return []
    lines = []
    current_line = []
    for w in words:
        test_line = " ".join(current_line + [w])
        bbox = draw.textbbox((0, 0), test_line, font=font)
        if (bbox[2] - bbox[0]) <= max_width:
            current_line.append(w)
        else:
            if current_line:
                lines.append(" ".join(current_line))
            current_line = [w]
    if current_line:
        lines.append(" ".join(current_line))
    return lines

def download_or_generate_bg(image_url: str, width: int, height: int, temp_dir: str, index: int) -> Image.Image:
    """Fetches background image or renders gradient background."""
    dest = os.path.join(temp_dir, f"bg_{index}.jpg")
    url = image_url or FALLBACK_IMAGES[index % len(FALLBACK_IMAGES)]
    try:
        req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
        with urllib.request.urlopen(req, timeout=8) as response, open(dest, "wb") as out_file:
            out_file.write(response.read())
        img = Image.open(dest).convert("RGB")
        # Crop & scale to cover
        img_ratio = img.width / img.height
        target_ratio = width / height
        if img_ratio > target_ratio:
            new_width = int(img.height * target_ratio)
            left = (img.width - new_width) // 2
            img = img.crop((left, 0, left + new_width, img.height))
        else:
            new_height = int(img.width / target_ratio)
            top = (img.height - new_height) // 2
            img = img.crop((0, top, img.width, top + new_height))
        return img.resize((width, height), Image.Resampling.LANCZOS)
    except Exception as e:
        # Fallback to dark modern gradient
        base = Image.new("RGB", (width, height), color=COLORS["bg"])
        draw = ImageDraw.Draw(base)
        for y in range(height):
            alpha = int(255 * (y / height))
            draw.line([(0, y), (width, y)], fill=(12 + int(alpha * 0.1), 16 + int(alpha * 0.15), 26 + int(alpha * 0.2)))
        return base

def render_scene_frame(
    section: dict,
    index: int,
    total: int,
    width: int,
    height: int,
    is_shorts: bool,
    temp_dir: str
) -> str:
    """Renders a single cinematic scene graphic with vignette, badge, and subtitles."""
    bg_img = download_or_generate_bg(section.get("image_url", ""), width, height, temp_dir, index)
    
    # Create RGBA canvas
    canvas = bg_img.convert("RGBA")
    overlay = Image.new("RGBA", (width, height), (0, 0, 0, 0))
    d_over = ImageDraw.Draw(overlay)
    
    # 1. Dark Vignette / Cinematic Bottom Gradient
    grad_height = int(height * (0.65 if is_shorts else 0.5))
    grad_top = height - grad_height
    for y in range(grad_height):
        ratio = y / grad_height
        alpha = int(210 * (ratio ** 1.3))
        d_over.line([(0, grad_top + y), (width, grad_top + y)], fill=(0, 0, 0, alpha))
        
    # Top Subtle Header Vignette
    for y in range(int(height * 0.2)):
        ratio = 1.0 - (y / (height * 0.2))
        alpha = int(140 * (ratio ** 1.5))
        d_over.line([(0, y), (width, y)], fill=(0, 0, 0, alpha))

    # Composite gradient onto canvas
    canvas = Image.alpha_composite(canvas, overlay)
    draw = ImageDraw.Draw(canvas)

    # 2. Typography & Badges
    font_badge = get_system_font(20 if is_shorts else 24, bold=True)
    font_title = get_system_font(44 if is_shorts else 52, bold=True)
    font_text = get_system_font(28 if is_shorts else 32, bold=False)

    sec_type = (section.get("type") or "SCENE").upper()
    badge_label = f"[{index + 1:02d} // {sec_type}]"
    
    if is_shorts:
        # 9:16 Vertical Layout (Shorts / Reels)
        # Top Pill Badge
        badge_bbox = draw.textbbox((0, 0), badge_label, font=font_badge)
        bw = badge_bbox[2] - badge_bbox[0] + 32
        bh = 38
        bx = (width - bw) // 2
        by = int(height * 0.12)
        draw.rounded_rectangle([bx, by, bx + bw, by + bh], radius=19, fill=(229, 9, 20, 235))
        draw.text((bx + 16, by + 8), badge_label, font=font_badge, fill=COLORS["white"])

        # Center/Lower Third Caption Block
        narration = section.get("content", "").strip()
        lines = wrap_text(narration, font_title, width - 140, draw)[:4]
        line_h = 56
        block_h = len(lines) * line_h
        start_y = int(height * 0.68) - (block_h // 2)

        # Translucent pill behind caption
        pill_pad_x = 28
        pill_pad_y = 20
        draw.rounded_rectangle(
            [50, start_y - pill_pad_y, width - 50, start_y + block_h + pill_pad_y],
            radius=20,
            fill=(10, 14, 24, 215),
            outline=(255, 255, 255, 40),
            width=2
        )

        for i, line in enumerate(lines):
            lbox = draw.textbbox((0, 0), line, font=font_title)
            lx = (width - (lbox[2] - lbox[0])) // 2
            ly = start_y + (i * line_h)
            # Text drop shadow
            draw.text((lx + 2, ly + 2), line, font=font_title, fill=(0, 0, 0, 200))
            # Text highlight for first line
            fill_color = COLORS["highlight"] if i == 0 else COLORS["white"]
            draw.text((lx, ly), line, font=font_title, fill=fill_color)

    else:
        # 16:9 Landscape Layout (Kurzgesagt / Documentary)
        # Top Left Badge
        draw.rounded_rectangle([80, 70, 80 + 260, 70 + 44], radius=22, fill=(229, 9, 20, 240))
        draw.text((105, 80), badge_label, font=font_badge, fill=COLORS["white"])

        # Bottom Left Lower-Third Container
        content_lines = wrap_text(section.get("content", "").strip(), font_text, width - 360, draw)[:3]
        title_text = section.get("title") or f"Pillar {index + 1}: {sec_type.capitalize()}"
        
        lt_y = height - 260
        # Glassmorphism container
        draw.rounded_rectangle(
            [80, lt_y, width - 80, height - 70],
            radius=18,
            fill=(10, 14, 24, 210),
            outline=(255, 255, 255, 30),
            width=2
        )
        # Title in Accent Red / Amber
        draw.text((115, lt_y + 24), title_text, font=font_title, fill=COLORS["white"])
        # Narration subtitle
        for i, line in enumerate(content_lines[:2]):
            draw.text((115, lt_y + 90 + (i * 38)), line, font=font_text, fill=(226, 232, 240))

        # Bottom Progress Bar
        bar_w = int((width - 160) * ((index + 1) / total))
        draw.rectangle([80, height - 76, 80 + bar_w, height - 70], fill=COLORS["primary"])

    out_frame = os.path.join(temp_dir, f"scene_frame_{index}.png")
    canvas.convert("RGB").save(out_frame, quality=95)
    return out_frame

def build_scene_clip(frame_path: str, duration: float, index: int, width: int, height: int, temp_dir: str) -> str:
    """Creates a Ken Burns zooming video segment for a single scene via FFmpeg."""
    clip_output = os.path.join(temp_dir, f"clip_{index}.mp4")
    fps = 25
    frames = max(int(duration * fps), 25)

    # Alternate zoom-in and zoom-out
    if index % 2 == 0:
        # Zoom in: 1.0 -> 1.12
        zoom_expr = f"min(pzoom+0.0008,1.14)"
    else:
        # Zoom out / pan
        zoom_expr = f"max(1.14-0.0008*on,1.0)"

    vf = f"scale=8000:-1,zoompan=z='{zoom_expr}':d={frames}:x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':s={width}x{height}:fps={fps}"

    cmd = [
        FFMPEG_BIN, "-y",
        "-loop", "1",
        "-i", frame_path,
        "-t", f"{duration:.2f}",
        "-vf", vf,
        "-c:v", "libx264",
        "-preset", "veryfast",
        "-pix_fmt", "yuv420p",
        "-r", str(fps),
        clip_output
    ]
    subprocess.run(cmd, check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    return clip_output

def main():
    parser = argparse.ArgumentParser(description="SirfShoot AI Video Rendering Engine")
    parser.add_argument("--manifest", help="Path to JSON manifest file or inline JSON string", required=True)
    parser.add_argument("--audio-path", help="Path to synthesized .mp3 audio file")
    parser.add_argument("--output", help="Path to output .mp4 video file", required=True)
    parser.add_argument("--orientation", choices=["landscape", "shorts"], default="landscape")
    args = parser.parse_args()

    # Parse manifest
    if os.path.exists(args.manifest):
        with open(args.manifest, "r", encoding="utf-8") as f:
            manifest = json.load(f)
    else:
        manifest = json.loads(args.manifest)

    sections = manifest.get("sections", [])
    if not sections:
        # Fallback default single scene
        sections = [{"type": "INTRO", "content": manifest.get("title", "SirfShoot Video")}]

    is_shorts = args.orientation == "shorts" or manifest.get("orientation") == "shorts"
    width = 1080 if is_shorts else 1920
    height = 1920 if is_shorts else 1080

    os.makedirs(os.path.dirname(os.path.abspath(args.output)), exist_ok=True)

    with tempfile.TemporaryDirectory() as temp_dir:
        # 1. Determine Total Audio Duration via ffmpeg -i
        audio_duration = 15.0 # default if no audio
        if args.audio_path and os.path.exists(args.audio_path):
            try:
                res = subprocess.run([FFMPEG_BIN, "-i", args.audio_path], capture_output=True, text=True)
                import re
                m = re.search(r"Duration:\s*(\d+):(\d+):(\d+\.?\d*)", res.stderr)
                if m:
                    h, m_val, s = float(m.group(1)), float(m.group(2)), float(m.group(3))
                    audio_duration = max(h * 3600 + m_val * 60 + s, 2.0)
            except Exception as e:
                audio_duration = 15.0

        # Proportional scene durations based on word count
        word_counts = [max(len(s.get("content", "").split()), 4) for s in sections]
        total_words = sum(word_counts)
        scene_durations = [(w / total_words) * audio_duration for w in word_counts]

        # 2. Render Scene Frames and Video Clips
        clip_paths = []
        for i, sec in enumerate(sections):
            frame_path = render_scene_frame(sec, i, len(sections), width, height, is_shorts, temp_dir)
            dur = max(scene_durations[i], 2.0)
            clip_path = build_scene_clip(frame_path, dur, i, width, height, temp_dir)
            clip_paths.append(clip_path)

        # 3. Concatenate Scene Clips
        concat_txt = os.path.join(temp_dir, "concat.txt")
        with open(concat_txt, "w", encoding="utf-8") as f:
            for p in clip_paths:
                f.write(f"file '{p}'\n")

        raw_concat_video = os.path.join(temp_dir, "raw_concat.mp4")
        concat_cmd = [
            FFMPEG_BIN, "-y",
            "-f", "concat",
            "-safe", "0",
            "-i", concat_txt,
            "-c", "copy",
            raw_concat_video
        ]
        subprocess.run(concat_cmd, check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)

        # 4. Multiplex Audio Track
        final_cmd = [FFMPEG_BIN, "-y", "-i", raw_concat_video]
        if args.audio_path and os.path.exists(args.audio_path):
            final_cmd.extend(["-i", args.audio_path, "-c:v", "copy", "-c:a", "aac", "-b:a", "192k", "-shortest"])
        else:
            final_cmd.extend(["-c:v", "copy", "-an"])

        final_cmd.extend(["-movflags", "+faststart", args.output])
        subprocess.run(final_cmd, check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)

    result = {
        "success": True,
        "output": args.output,
        "orientation": args.orientation,
        "width": width,
        "height": height,
        "duration": audio_duration,
        "scenes_count": len(sections),
    }
    print(json.dumps(result))

if __name__ == "__main__":
    main()
