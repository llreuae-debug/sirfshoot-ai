import { ThumbnailVariant } from './types';

export function generateThumbnailSvg(variant: ThumbnailVariant, title: string): string {
  const bg1 = variant.colorPalette[0] || '#0F172A';
  const accent = variant.colorPalette[1] || '#E50914';
  const textCol = variant.colorPalette[2] || '#FBBF24';

  const cleanTitle = title.replace(/"/g, '&quot;').slice(0, 48);
  const cleanOverlay = (variant.textOverlay || variant.name || 'TAMEEROS SHORTS').replace(/"/g, '&quot;');

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1280 720" width="100%" height="100%" style="border-radius:12px; font-family:system-ui, -apple-system, sans-serif;">
    <title>${cleanTitle}</title>
    <defs>
      <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${bg1}" />
        <stop offset="60%" stop-color="#090d16" />
        <stop offset="100%" stop-color="#000000" />
      </linearGradient>
      <radialGradient id="glowGrad" cx="30%" cy="40%" r="60%">
        <stop offset="0%" stop-color="${accent}" stop-opacity="0.35" />
        <stop offset="70%" stop-color="${accent}" stop-opacity="0.05" />
        <stop offset="100%" stop-color="#000000" stop-opacity="0" />
      </radialGradient>
      <linearGradient id="textGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#FFFFFF" />
        <stop offset="100%" stop-color="${textCol}" />
      </linearGradient>
      <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="8" stdDeviation="12" flood-color="#000000" flood-opacity="0.8" />
      </filter>
    </defs>

    <!-- Background Base -->
    <rect width="1280" height="720" fill="url(#bgGrad)" />
    <rect width="1280" height="720" fill="url(#glowGrad)" />

    <!-- Grid / Tech Lines -->
    <g opacity="0.12" stroke="#ffffff" stroke-width="1.5">
      <line x1="0" y1="180" x2="1280" y2="180" />
      <line x1="0" y1="360" x2="1280" y2="360" />
      <line x1="0" y1="540" x2="1280" y2="540" />
      <line x1="426" y1="0" x2="426" y2="720" />
      <line x1="853" y1="0" x2="853" y2="720" />
    </g>

    <!-- Stylized Host Silhouette & Studio Visual Anchor -->
    <g filter="url(#shadow)">
      <!-- Silhouette Aura -->
      <circle cx="340" cy="420" r="230" fill="${accent}" opacity="0.25" filter="blur(40px)" />
      
      <!-- Studio Lighting & Mic Rig -->
      <path d="M 280 270 Q 330 190 390 270 T 420 480 L 220 480 Z" fill="#131b2e" />
      <!-- Stylized Studio Mic -->
      <rect x="220" y="340" width="34" height="60" rx="17" fill="#334155" stroke="#94a3b8" stroke-width="3" />
      <line x1="237" y1="400" x2="237" y2="480" stroke="#475569" stroke-width="6" />
      
      <!-- Creator Avatar Outline -->
      <circle cx="340" cy="270" r="100" fill="#1e293b" stroke="${accent}" stroke-width="5" />
      <!-- Eyes / Expression Silhouette -->
      <circle cx="315" cy="265" r="9" fill="#ffffff" />
      <circle cx="365" cy="265" r="9" fill="#ffffff" />
      <path d="M 320 305 Q 340 325 365 305" stroke="#ffffff" stroke-width="5" fill="none" stroke-linecap="round" />
    </g>

    <!-- Warning / Alert Accent Shield / Badge -->
    <g transform="translate(760, 100)" filter="url(#shadow)">
      <rect x="0" y="0" width="440" height="90" rx="16" fill="${accent}" />
      <text x="220" y="58" font-size="34" font-weight="900" fill="#ffffff" text-anchor="middle" letter-spacing="2">
        ${variant.name.toUpperCase()} STRATEGY
      </text>
    </g>

    <!-- Main High-CTR Text Overlay -->
    <g transform="translate(720, 260)" filter="url(#shadow)">
      <!-- Backdrop Pill -->
      <rect x="0" y="0" width="500" height="170" rx="20" fill="#0c0e17" stroke="#ffffff" stroke-width="3" opacity="0.95" />
      <text x="250" y="78" font-size="46" font-weight="900" fill="#ffffff" text-anchor="middle" letter-spacing="1">
        ${cleanOverlay.split(' ').slice(0, 3).join(' ')}
      </text>
      <text x="250" y="136" font-size="42" font-weight="900" fill="${textCol}" text-anchor="middle" letter-spacing="1">
        ${cleanOverlay.split(' ').slice(3).join(' ') || 'WATCH NOW!'}
      </text>
    </g>

    <!-- CTR Predictor Tag in Bottom Right -->
    <g transform="translate(940, 610)">
      <rect x="0" y="0" width="280" height="60" rx="12" fill="#000000" stroke="${accent}" stroke-width="2" opacity="0.9" />
      <text x="140" y="40" font-size="22" font-weight="800" fill="#22C55E" text-anchor="middle">
        CTR PROJECTION: ${variant.predictedCtr}%
      </text>
    </g>

    <!-- Tameeros Shorts Watermark Branding Badge -->
    <g transform="translate(40, 640)">
      <rect x="0" y="0" width="200" height="42" rx="8" fill="#000000" opacity="0.75" />
      <text x="100" y="28" font-size="17" font-weight="800" fill="#ffffff" text-anchor="middle">
        Tameeros <tspan fill="#E50914">Shorts</tspan>
      </text>
    </g>
  </svg>`;
}
