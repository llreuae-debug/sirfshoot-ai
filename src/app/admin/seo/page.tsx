'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Globe,
  CheckCircle2,
  AlertTriangle,
  ExternalLink,
  Edit2,
  Save,
  Search,
  Eye,
  FileCode,
  ShieldCheck,
  Bot,
  Sparkles,
  X,
  RefreshCw,
} from 'lucide-react';
import AdminLayout from '@/components/AdminLayout';
import { useAdminStore } from '@/lib/admin-store';
import { PageSeoConfig } from '@/lib/types';

export default function SeoAdminPage() {
  const { data, updateSeoConfig } = useAdminStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [editingPage, setEditingPage] = useState<PageSeoConfig | null>(null);
  const [saveSuccessMsg, setSaveSuccessMsg] = useState('');

  // SEO Health Calculations
  const totalPages = data.seoConfigs.length;
  const indexablePages = data.seoConfigs.filter((p) => p.indexable).length;
  const missingDescriptions = data.seoConfigs.filter((p) => !p.metaDescription || p.metaDescription.length < 30).length;
  const missingTitles = data.seoConfigs.filter((p) => !p.seoTitle || p.seoTitle.length < 10).length;
  const structuredDataCount = data.seoConfigs.filter((p) => p.schemaType).length;

  const filteredPages = data.seoConfigs.filter(
    (p) =>
      p.path.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.seoTitle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPage) return;

    updateSeoConfig(
      editingPage.path,
      {
        seoTitle: editingPage.seoTitle,
        metaDescription: editingPage.metaDescription,
        canonicalUrl: editingPage.canonicalUrl,
        ogTitle: editingPage.ogTitle || editingPage.seoTitle,
        ogDescription: editingPage.ogDescription || editingPage.metaDescription,
        indexable: editingPage.indexable,
        schemaType: editingPage.schemaType,
      },
      `Updated metadata via SEO Control Center`
    );

    setSaveSuccessMsg(`SEO metadata successfully updated for ${editingPage.path}`);
    setTimeout(() => setSaveSuccessMsg(''), 4000);
    setEditingPage(null);
  };

  return (
    <AdminLayout
      title="SEO, AEO & GEO Control Center"
      subtitle="Metadata orchestration, Answer Engine indexing rules, Google SERP snippet previews, and AI crawler accessibility."
      action={
        <div className="flex items-center gap-2">
          <a
            href="/sitemap.xml"
            target="_blank"
            rel="noreferrer"
            className="px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 bg-white hover:bg-slate-50 flex items-center gap-1.5 transition shadow-xs"
          >
            <Globe className="h-4 w-4" />
            <span>sitemap.xml</span>
          </a>
          <a
            href="/robots.txt"
            target="_blank"
            rel="noreferrer"
            className="px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 bg-white hover:bg-slate-50 flex items-center gap-1.5 transition shadow-xs"
          >
            <Bot className="h-4 w-4" />
            <span>robots.txt</span>
          </a>
          <a
            href="/llms.txt"
            target="_blank"
            rel="noreferrer"
            className="px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 bg-white hover:bg-slate-50 flex items-center gap-1.5 transition shadow-xs"
          >
            <Sparkles className="h-4 w-4 text-purple-600" />
            <span>llms.txt</span>
          </a>
        </div>
      }
    >
      {saveSuccessMsg && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 px-4 py-3 rounded-2xl text-xs font-bold flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
          <span>{saveSuccessMsg}</span>
        </div>
      )}

      {/* SEO Health Overview Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs">
          <div className="text-slate-500 text-xs font-bold uppercase tracking-wider text-[11px]">
            Total Tracked Pages
          </div>
          <div className="text-2xl font-black font-mono text-[#071B3A] mt-1.5">{totalPages}</div>
          <div className="text-[11px] text-slate-400 mt-1">All application routes</div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs">
          <div className="text-slate-500 text-xs font-bold uppercase tracking-wider text-[11px]">
            Indexable Public Pages
          </div>
          <div className="text-2xl font-black font-mono text-emerald-600 mt-1.5">
            {indexablePages}
          </div>
          <div className="text-[11px] text-slate-400 mt-1">Included in sitemap.xml</div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs">
          <div className="text-slate-500 text-xs font-bold uppercase tracking-wider text-[11px]">
            Schema.org Markup
          </div>
          <div className="text-2xl font-black font-mono text-blue-600 mt-1.5">
            {structuredDataCount} / {totalPages}
          </div>
          <div className="text-[11px] text-slate-400 mt-1">JSON-LD rich data validated</div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs">
          <div className="text-slate-500 text-xs font-bold uppercase tracking-wider text-[11px]">
            Missing Descriptions
          </div>
          <div className="text-2xl font-black font-mono text-rose-600 mt-1.5">
            {missingDescriptions}
          </div>
          <div className="text-[11px] text-slate-400 mt-1">Requires metadata snippet</div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs">
          <div className="text-slate-500 text-xs font-bold uppercase tracking-wider text-[11px]">
            GEO / AI Discoverability
          </div>
          <div className="text-2xl font-black font-mono text-purple-600 mt-1.5">Active</div>
          <div className="text-[11px] text-slate-400 mt-1">llms.txt & API live</div>
        </div>
      </div>

      {/* Crawl Directives & Standards Status */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-3">
        <h3 className="font-black text-slate-900 text-sm flex items-center gap-2">
          <ShieldCheck className="h-4 w-4 text-emerald-600" />
          <span>Technical SEO Crawl & Indexing Audit</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
            <div className="font-bold text-slate-900 flex items-center justify-between">
              <span>Robots Directives</span>
              <span className="text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded text-[10px]">
                Valid
              </span>
            </div>
            <p className="text-slate-500 text-[11px]">
              Allows public routes; blocks <code>/admin</code>, <code>/dashboard</code>, <code>/api</code>, <code>/settings</code>. Explicit access granted for GPTBot, ClaudeBot, and PerplexityBot.
            </p>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
            <div className="font-bold text-slate-900 flex items-center justify-between">
              <span>Canonical URLs</span>
              <span className="text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded text-[10px]">
                Enforced
              </span>
            </div>
            <p className="text-slate-500 text-[11px]">
              Every page links back to canonical root <code>https://sirfshoot-ai.vercel.app</code> to prevent duplicate content dilution.
            </p>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
            <div className="font-bold text-slate-900 flex items-center justify-between">
              <span>AEO / GEO Engine</span>
              <span className="text-purple-700 bg-purple-100 px-2 py-0.5 rounded text-[10px]">
                Optimized
              </span>
            </div>
            <p className="text-slate-500 text-[11px]">
              Factual questions & direct answers, structured JSON-LD (SoftwareApplication), and dedicated <code>/public/llms.txt</code>.
            </p>
          </div>
        </div>
      </div>

      {/* Pages Metadata Table */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm space-y-0">
        <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-slate-50/50">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Filter routes by path or title..."
              className="w-full pl-10 pr-4 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#071B3A]"
            />
          </div>
          <span className="text-xs text-slate-500 font-medium">
            Showing {filteredPages.length} routes
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50/80 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-3.5 px-4">Route Path</th>
                <th className="py-3.5 px-4">Page Title & SEO Title</th>
                <th className="py-3.5 px-4">Meta Description</th>
                <th className="py-3.5 px-4 text-center">Indexing</th>
                <th className="py-3.5 px-4 text-center">Schema</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
              {filteredPages.map((page) => (
                <tr key={page.path} className="hover:bg-slate-50/70 transition">
                  <td className="py-3.5 px-4 font-mono font-bold text-slate-900">
                    <div className="flex items-center gap-1.5">
                      <span>{page.path}</span>
                      <a
                        href={page.path}
                        target="_blank"
                        rel="noreferrer"
                        className="text-slate-400 hover:text-blue-600 transition"
                      >
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 max-w-xs">
                    <div className="font-bold text-slate-900">{page.title}</div>
                    <div className="text-[11px] text-slate-500 truncate" title={page.seoTitle}>
                      {page.seoTitle}
                    </div>
                  </td>
                  <td className="py-3.5 px-4 max-w-md">
                    <div className="text-slate-600 text-xs truncate" title={page.metaDescription}>
                      {page.metaDescription}
                    </div>
                    <div className="text-[10px] text-slate-400 mt-0.5">
                      {page.metaDescription.length} characters (150-160 optimal)
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <span
                      className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-black uppercase ${
                        page.indexable
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {page.indexable ? 'Index' : 'Noindex'}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    {page.schemaType ? (
                      <span className="font-mono text-[10px] bg-blue-50 text-blue-700 px-2 py-0.5 rounded border border-blue-200">
                        {page.schemaType}
                      </span>
                    ) : (
                      <span className="text-slate-300">-</span>
                    )}
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      type="button"
                      onClick={() => setEditingPage({ ...page })}
                      className="px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 flex items-center gap-1.5 ml-auto transition cursor-pointer"
                    >
                      <Edit2 className="h-3 w-3" />
                      <span>Edit SEO</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Page SEO Editor Modal with Live SERP Snippet Preview */}
      {editingPage && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full border border-slate-200 shadow-2xl p-6 space-y-5 my-8">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="font-black text-slate-900 text-base">Edit Page Metadata</h3>
                <p className="text-xs text-slate-500 font-mono">{editingPage.path}</p>
              </div>
              <button
                type="button"
                onClick={() => setEditingPage(null)}
                className="p-1 rounded text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* LIVE GOOGLE SERP PREVIEW */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-2">
              <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider flex items-center gap-1.5">
                <Eye className="h-3 w-3" /> Live Google Search Snippet Preview
              </span>
              <div className="bg-white rounded-xl p-3 border border-slate-200 space-y-1">
                <div className="text-[11px] text-slate-600 font-sans flex items-center gap-1.5">
                  <span className="h-3.5 w-3.5 rounded-full bg-red-600 text-[8px] text-white flex items-center justify-center font-bold">
                    S
                  </span>
                  <span>https://sirfshoot-ai.vercel.app{editingPage.path}</span>
                </div>
                <div className="text-sm font-bold text-[#1a0dab] hover:underline cursor-pointer">
                  {editingPage.seoTitle || 'Title not set'}
                </div>
                <div className="text-xs text-[#4d5156] line-clamp-2">
                  {editingPage.metaDescription || 'No meta description configured for this page.'}
                </div>
              </div>
            </div>

            <form onSubmit={handleEditSubmit} className="space-y-4 text-xs font-medium">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-slate-700 font-bold">SEO Title</label>
                  <span className="text-[11px] text-slate-400 font-mono">
                    {editingPage.seoTitle.length} chars (optimal: 50-60)
                  </span>
                </div>
                <input
                  type="text"
                  required
                  value={editingPage.seoTitle}
                  onChange={(e) =>
                    setEditingPage({ ...editingPage, seoTitle: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-[#071B3A]"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-slate-700 font-bold">Meta Description</label>
                  <span className="text-[11px] text-slate-400 font-mono">
                    {editingPage.metaDescription.length} chars (optimal: 140-160)
                  </span>
                </div>
                <textarea
                  rows={3}
                  required
                  value={editingPage.metaDescription}
                  onChange={(e) =>
                    setEditingPage({ ...editingPage, metaDescription: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-[#071B3A]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Canonical URL</label>
                  <input
                    type="text"
                    value={editingPage.canonicalUrl}
                    onChange={(e) =>
                      setEditingPage({ ...editingPage, canonicalUrl: e.target.value })
                    }
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono text-[11px]"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Schema.org JSON-LD Type</label>
                  <select
                    value={editingPage.schemaType || 'SoftwareApplication'}
                    onChange={(e) =>
                      setEditingPage({
                        ...editingPage,
                        schemaType: e.target.value as 'SoftwareApplication' | 'WebPage' | 'FAQPage' | 'Article',
                      })
                    }
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  >
                    <option value="SoftwareApplication">SoftwareApplication</option>
                    <option value="WebPage">WebPage</option>
                    <option value="FAQPage">FAQPage</option>
                    <option value="Article">Article</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingPage.indexable}
                    onChange={(e) =>
                      setEditingPage({ ...editingPage, indexable: e.target.checked })
                    }
                    className="rounded text-[#071B3A] focus:ring-0"
                  />
                  <span className="text-slate-700 font-bold">Allow Search Engine Indexing (index, follow)</span>
                </label>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setEditingPage(null)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-3d-yellow px-5 py-2.5 rounded-xl text-[#071B3A] font-black cursor-pointer shadow-md"
                >
                  Save Metadata Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
