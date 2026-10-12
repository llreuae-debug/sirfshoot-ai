import { NextRequest, NextResponse } from 'next/server';
import { generateThumbnailSvg } from '@/lib/thumbnail-generator';
import { ThumbnailVariant } from '@/lib/types';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { variant, title = 'SirfShoot Video' }: { variant: ThumbnailVariant; title: string } = body;

    if (!variant) {
      return NextResponse.json({ error: 'Thumbnail variant configuration is required' }, { status: 400 });
    }

    const svg = generateThumbnailSvg(variant, title);
    return NextResponse.json({ success: true, svg });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: 'Thumbnail generation failed', details: message }, { status: 500 });
  }
}
