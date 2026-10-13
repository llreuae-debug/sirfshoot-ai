import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  async redirects() {
    return [
      { source: '/cursos', destination: '/academy', permanent: true },
      { source: '/narracao', destination: '/voiceover', permanent: true },
      { source: '/imagens', destination: '/images', permanent: true },
      { source: '/video-automatico', destination: '/video-creator', permanent: true },
      { source: '/precificacao', destination: '/valuation', permanent: true },
      { source: '/financiamento', destination: '/mortgage', permanent: true },
      { source: '/descricoes', destination: '/descriptions', permanent: true },
      { source: '/minha-assinatura', destination: '/subscription', permanent: true },
      { source: '/planos', destination: '/pricing', permanent: true },
    ];
  },
};

export default nextConfig;
