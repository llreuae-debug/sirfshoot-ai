export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from 'next/server';
import { getDecryptedKeysFromCookie } from '@/lib/crypto';

export interface StockPhotoResult {
  id: number | string;
  width: number;
  height: number;
  url: string;
  photographer: string;
  src: {
    original: string;
    large2x: string;
    large: string;
    medium: string;
    portrait?: string;
    landscape?: string;
  };
}

const CURATED_FALLBACK_PHOTOS: Record<string, StockPhotoResult[]> = {
  tech: [
    {
      id: 'fallback-tech-1',
      width: 1920,
      height: 1080,
      url: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5',
      photographer: 'Verified Creator Library',
      src: {
        original: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1920&q=85',
        large2x: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1920&q=85',
        large: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1280&q=80',
        medium: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80',
      },
    },
    {
      id: 'fallback-tech-2',
      width: 1920,
      height: 1080,
      url: 'https://images.unsplash.com/photo-1518770660439-4636190af475',
      photographer: 'Verified Creator Library',
      src: {
        original: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1920&q=85',
        large2x: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1920&q=85',
        large: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1280&q=80',
        medium: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
      },
    },
  ],
  realestate: [
    {
      id: 'fallback-re-1',
      width: 1920,
      height: 1080,
      url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9',
      photographer: 'Verified Creator Library',
      src: {
        original: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1920&q=85',
        large2x: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1920&q=85',
        large: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1280&q=80',
        medium: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80',
      },
    },
    {
      id: 'fallback-re-2',
      width: 1920,
      height: 1080,
      url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c',
      photographer: 'Verified Creator Library',
      src: {
        original: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=85',
        large2x: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=85',
        large: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1280&q=80',
        medium: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
      },
    },
  ],
};

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get('query') || 'architecture luxury modern';
    const orientation = searchParams.get('orientation') || 'landscape';
    const perPage = Math.min(Number(searchParams.get('per_page')) || 6, 20);

    const cookieHeader = req.cookies.get('ss_byok')?.value;
    const { pexelsKey } = getDecryptedKeysFromCookie(cookieHeader);

    if (pexelsKey) {
      try {
        const pexelsUrl = `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&orientation=${orientation}&per_page=${perPage}`;
        const pexelsRes = await fetch(pexelsUrl, {
          headers: {
            Authorization: pexelsKey,
          },
        });

        if (pexelsRes.ok) {
          const data = await pexelsRes.json();
          if (data.photos && data.photos.length > 0) {
            return NextResponse.json({
              success: true,
              source: 'pexels_api',
              photos: data.photos,
              totalResults: data.total_results,
            });
          }
        }
      } catch (e) {
        console.warn('Pexels API fetch failed, falling back to curated assets:', e);
      }
    }

    // Curated verified fallbacks
    const category = query.toLowerCase().includes('tech') || query.toLowerCase().includes('code')
      ? 'tech'
      : 'realestate';
    const fallbackPhotos = CURATED_FALLBACK_PHOTOS[category] || CURATED_FALLBACK_PHOTOS.realestate;

    return NextResponse.json({
      success: true,
      source: 'curated_library',
      photos: fallbackPhotos,
      totalResults: fallbackPhotos.length,
      notice: pexelsKey ? 'Query returned 0 direct hits; curated library served.' : 'Add Pexels API key in Settings to unlock unlimited live stock search.',
    });
  } catch (err: unknown) {
    console.error('Stock search route error:', err);
    return NextResponse.json({ error: 'Failed to search stock assets' }, { status: 500 });
  }
}
