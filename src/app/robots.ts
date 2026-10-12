import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://sirfshoot-ai.vercel.app';

  return {
    rules: [
      {
        userAgent: '*',
        allow: [
          '/',
          '/create',
          '/tools',
          '/tools/*',
          '/pricing',
          '/blog',
          '/blog/*',
          '/cursos',
          '/leads',
          '/demo',
          '/narracao',
          '/imagens',
          '/video-automatico',
          '/precificacao',
          '/financiamento',
          '/descricoes',
          '/login',
          '/privacy',
          '/terms',
          '/refund',
          '/llms.txt',
        ],
        disallow: [
          '/admin',
          '/admin/*',
          '/dashboard',
          '/dashboard/*',
          '/project',
          '/project/*',
          '/settings',
          '/settings/*',
          '/api/*',
          '/minha-assinatura',
          '/planos',
        ],
      },
      {
        // Explicit allowance for AI and generative answer engine crawlers on public content
        userAgent: [
          'GPTBot',
          'ChatGPT-User',
          'PerplexityBot',
          'ClaudeBot',
          'Google-Extended',
          'cohere-ai',
        ],
        allow: [
          '/',
          '/tools',
          '/tools/*',
          '/pricing',
          '/blog/*',
          '/llms.txt',
          '/api/geo-context',
        ],
        disallow: [
          '/admin/*',
          '/dashboard/*',
          '/project/*',
          '/api/pipeline/*',
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
