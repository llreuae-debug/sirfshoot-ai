import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://sirfshoot-ai.vercel.app';
  const lastModified = new Date();

  // Public indexable routes with priorities and change frequencies
  const publicRoutes = [
    { url: '', priority: 1.0, changeFrequency: 'daily' as const },
    { url: '/create', priority: 0.9, changeFrequency: 'weekly' as const },
    { url: '/tools', priority: 0.9, changeFrequency: 'weekly' as const },
    { url: '/pricing', priority: 0.85, changeFrequency: 'weekly' as const },
    { url: '/blog', priority: 0.8, changeFrequency: 'weekly' as const },
    { url: '/academy', priority: 0.8, changeFrequency: 'weekly' as const },
    { url: '/leads', priority: 0.75, changeFrequency: 'weekly' as const },
    { url: '/demo', priority: 0.75, changeFrequency: 'monthly' as const },
    { url: '/voiceover', priority: 0.8, changeFrequency: 'weekly' as const },
    { url: '/images', priority: 0.8, changeFrequency: 'weekly' as const },
    { url: '/video-creator', priority: 0.8, changeFrequency: 'weekly' as const },
    { url: '/valuation', priority: 0.75, changeFrequency: 'weekly' as const },
    { url: '/mortgage', priority: 0.75, changeFrequency: 'weekly' as const },
    { url: '/descriptions', priority: 0.75, changeFrequency: 'weekly' as const },
    { url: '/login', priority: 0.6, changeFrequency: 'monthly' as const },
    { url: '/privacy', priority: 0.5, changeFrequency: 'monthly' as const },
    { url: '/terms', priority: 0.5, changeFrequency: 'monthly' as const },
    { url: '/refund', priority: 0.5, changeFrequency: 'monthly' as const },
    
    // 12 Micro-Tools Catalog
    { url: '/tools/ai-script-robot-score', priority: 0.7, changeFrequency: 'monthly' as const },
    { url: '/tools/hinglish-ratio', priority: 0.7, changeFrequency: 'monthly' as const },
    { url: '/tools/hook-generator', priority: 0.75, changeFrequency: 'weekly' as const },
    { url: '/tools/niche-picker', priority: 0.75, changeFrequency: 'weekly' as const },
    { url: '/tools/quiz', priority: 0.65, changeFrequency: 'monthly' as const },
    { url: '/tools/sebi-cheatsheet', priority: 0.65, changeFrequency: 'monthly' as const },
    { url: '/tools/templates', priority: 0.7, changeFrequency: 'weekly' as const },
    { url: '/tools/thumbnail-ideas', priority: 0.75, changeFrequency: 'weekly' as const },
    { url: '/tools/title-tester', priority: 0.75, changeFrequency: 'weekly' as const },
    { url: '/tools/tone-fingerprint', priority: 0.8, changeFrequency: 'weekly' as const },
    { url: '/tools/youtube-income-calculator', priority: 0.75, changeFrequency: 'monthly' as const },
    { url: '/tools/youtube-seo-grader', priority: 0.75, changeFrequency: 'weekly' as const },
  ];

  return publicRoutes.map((route) => ({
    url: `${baseUrl}${route.url}`,
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
