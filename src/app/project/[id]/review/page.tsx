'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HumanReviewGate from '@/components/HumanReviewGate';
import { useCreatorStore } from '@/lib/store';
import { ProjectData } from '@/lib/types';
import { SAMPLE_PROJECT } from '@/lib/mock-data';
import { ArrowLeft } from 'lucide-react';

function StandaloneReviewContent() {
  const params = useParams();
  const router = useRouter();
  const projectId = (params?.id as string) || 'proj-india-pakistan-border';

  const { getProject, updateProject, state } = useCreatorStore();
  const [project, setProject] = useState<ProjectData>(() => {
    return getProject(projectId) || SAMPLE_PROJECT;
  });

  useEffect(() => {
    const loaded = getProject(projectId);
    if (loaded) {
      setProject(loaded);
    } else {
      setProject(SAMPLE_PROJECT);
    }
  }, [projectId, state.projects, getProject]);

  const handleUpdate = (updated: ProjectData) => {
    setProject(updated);
    updateProject(updated.id, () => updated);
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#F8FAFC]">
      <Navbar />

      <main className="flex-1 py-8 sm:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-6">
          {/* Breadcrumb Header */}
          <div className="flex items-center justify-between border-b border-slate-200 pb-4">
            <div className="flex items-center gap-3">
              <Link
                href={`/project/${projectId}`}
                className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-50 transition"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                <span>Back to Studio</span>
              </Link>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-xl font-black text-slate-900">
                    Human Review Gate • {project.title}
                  </h1>
                </div>
                <p className="text-xs text-slate-500">
                  Pre-flight editorial signoff before YouTube Data API publishing.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-mono font-medium text-slate-700">
                Channel: {state.channelName}
              </span>
            </div>
          </div>

          {/* Interactive Gate */}
          <HumanReviewGate project={project} onUpdateProject={handleUpdate} />
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function StandaloneReviewPage() {
  return (
    <React.Suspense
      fallback={
        <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center space-y-3">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-300 border-t-[#E50914]"></div>
          <p className="font-mono text-xs text-slate-500">Loading Human Review Gate...</p>
        </div>
      }
    >
      <StandaloneReviewContent />
    </React.Suspense>
  );
}
