'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SidebarDrawer from '@/components/SidebarDrawer';
import { useCreatorStore } from '@/lib/store';
import { DEFAULT_COURSE_LESSONS } from '@/lib/mock-data';
import {
  GraduationCap,
  Play,
  CheckCircle2,
  Circle,
  Clock,
  Download,
  BookOpen,
  ArrowLeft,
  Sparkles,
  Award,
  Video,
} from 'lucide-react';

export default function CursosPage() {
  const { state, toggleLessonCompleted } = useCreatorStore();
  const [selectedLessonId, setSelectedLessonId] = useState<string>(
    DEFAULT_COURSE_LESSONS[0]?.id || 'lesson-1'
  );

  const completedSet = new Set(state.completedLessonIds || []);
  const currentLesson =
    DEFAULT_COURSE_LESSONS.find((l) => l.id === selectedLessonId) ||
    DEFAULT_COURSE_LESSONS[0];

  const completionPercentage = Math.round(
    (completedSet.size / DEFAULT_COURSE_LESSONS.length) * 100
  );

  return (
    <div className="flex min-h-screen flex-col bg-[#F8FAFC]">
      <SidebarDrawer />
      <Navbar />

      <main className="flex-1 py-8 sm:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
            <div className="flex items-center gap-3">
              <Link
                href="/dashboard"
                className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition"
                title="Back to Dashboard"
              >
                <ArrowLeft className="h-5 w-5" />
              </Link>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-purple-600 to-pink-600 text-white shadow-md">
                <GraduationCap className="h-5 w-5" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  Tameeros Academy
                </h1>
                <p className="text-xs text-slate-500">
                  Practical masterclass on paid advertising, high-retention video creatives, and conversion funnels for real estate.
                </p>
              </div>
            </div>

            {/* Course Progress Widget */}
            <div className="flex items-center gap-3 rounded-2xl border border-purple-200 bg-purple-50/60 px-4 py-2">
              <div className="text-right">
                <div className="text-xs font-bold text-purple-900">Your Progress</div>
                <div className="text-[11px] text-purple-600 font-semibold">
                  {completedSet.size} of {DEFAULT_COURSE_LESSONS.length} Lessons Completed
                </div>
              </div>
              <div className="h-10 w-10 rounded-full bg-purple-600 text-white flex items-center justify-center font-extrabold text-xs shadow-sm">
                {completionPercentage}%
              </div>
            </div>
          </div>

          {/* Main Course Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Video Player & Current Lesson Details */}
            <div className="lg:col-span-8 space-y-6">
              {/* Interactive Video Player */}
              <div className="relative aspect-video w-full rounded-3xl overflow-hidden bg-slate-950 shadow-2xl border border-slate-800 flex flex-col justify-between p-6 sm:p-8">
                {/* Background Atmosphere */}
                <div className="absolute inset-0 bg-gradient-to-tr from-purple-900/40 via-black to-slate-950 pointer-events-none" />

                <div className="relative z-10 flex items-center justify-between">
                  <span className="rounded-full bg-purple-500/20 border border-purple-400/30 px-3 py-1 text-xs font-bold text-purple-300">
                    {currentLesson.moduleTitle}
                  </span>
                  <span className="text-xs text-slate-400 flex items-center gap-1 font-mono">
                    <Clock className="h-3.5 w-3.5" />
                    <span>{currentLesson.durationMin} min</span>
                  </span>
                </div>

                {/* Big Play Button */}
                <div className="relative z-10 mx-auto text-center space-y-3">
                  <button
                    type="button"
                    onClick={() => toggleLessonCompleted(currentLesson.id)}
                    className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-2xl shadow-purple-500/50 hover:scale-105 active:scale-95 transition"
                    aria-label="Watch Lesson"
                  >
                    <Play className="h-8 w-8 fill-white ml-1" />
                  </button>
                  <p className="text-xs font-semibold text-slate-300">
                    Click to play lesson or mark as completed
                  </p>
                </div>

                {/* Video Bottom Bar */}
                <div className="relative z-10 flex items-center justify-between text-white">
                  <div className="truncate max-w-md">
                    <h3 className="font-extrabold text-sm sm:text-base text-white truncate">
                      {currentLesson.title}
                    </h3>
                  </div>
                  <button
                    type="button"
                    onClick={() => toggleLessonCompleted(currentLesson.id)}
                    className="flex items-center gap-1.5 rounded-xl bg-white/10 backdrop-blur-md px-3 py-1.5 text-xs font-bold text-white hover:bg-white/20 transition"
                  >
                    {completedSet.has(currentLesson.id) ? (
                      <>
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                        <span>Completed</span>
                      </>
                    ) : (
                      <>
                        <Circle className="h-3.5 w-3.5 text-slate-400" />
                        <span>Mark as Completed</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Lesson Summary & Key Takeaways Card */}
              <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-7 shadow-sm space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                  <BookOpen className="h-4 w-4 text-purple-600" />
                  <h2 className="text-sm font-extrabold text-slate-900 uppercase tracking-wide">
                    Lesson Overview
                  </h2>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {currentLesson.description}
                </p>

                <div className="pt-2">
                  <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                    Actionable Key Takeaways
                  </h4>
                  <ul className="space-y-2">
                    {currentLesson.keyTakeaways.map((point, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-700">
                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-purple-100 text-[10px] font-black text-purple-700 mt-0.5">
                          {idx + 1}
                        </span>
                        <span className="leading-relaxed">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs text-slate-400">
                    Includes cheat sheets, script templates, and campaign setups.
                  </span>
                  <button
                    type="button"
                    onClick={() => alert('Playbook PDF downloaded successfully!')}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-50 transition shadow-xs"
                  >
                    <Download className="h-3.5 w-3.5 text-purple-600" />
                    <span>Download Playbook (PDF)</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Right: Course Curriculum Playlist */}
            <div className="lg:col-span-4 space-y-4">
              <div className="rounded-3xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <h3 className="font-extrabold text-sm text-slate-900 uppercase tracking-wide">
                    Course Curriculum
                  </h3>
                  <span className="text-[11px] font-bold text-purple-600">
                    {DEFAULT_COURSE_LESSONS.length} Modules
                  </span>
                </div>

                <div className="space-y-2">
                  {DEFAULT_COURSE_LESSONS.map((lesson, idx) => {
                    const isSelected = lesson.id === selectedLessonId;
                    const isCompleted = completedSet.has(lesson.id);

                    return (
                      <div
                        key={lesson.id}
                        role="button"
                        tabIndex={0}
                        onClick={() => setSelectedLessonId(lesson.id)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') setSelectedLessonId(lesson.id);
                        }}
                        className={`w-full rounded-2xl p-3.5 text-left transition flex items-start gap-3 border cursor-pointer ${
                          isSelected
                            ? 'bg-purple-50/70 border-purple-300 ring-2 ring-purple-400/20'
                            : 'bg-white border-slate-200/80 hover:bg-slate-50'
                        }`}
                      >
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleLessonCompleted(lesson.id);
                          }}
                          className="mt-0.5 text-slate-400 hover:text-purple-600 transition shrink-0"
                          title={isCompleted ? 'Mark incomplete' : 'Mark complete'}
                        >
                          {isCompleted ? (
                            <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                          ) : (
                            <Circle className="h-4 w-4 text-slate-300" />
                          )}
                        </button>

                        <div className="min-w-0 flex-1 space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-purple-700">
                              Module {idx + 1}
                            </span>
                            <span className="text-[10px] font-mono text-slate-400">
                              {lesson.durationMin} min
                            </span>
                          </div>
                          <h4
                            className={`font-extrabold text-xs leading-snug line-clamp-2 ${
                              isSelected ? 'text-purple-950' : 'text-slate-800'
                            }`}
                          >
                            {lesson.title}
                          </h4>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Bonus Blueprint Banner */}
              <div className="rounded-3xl border border-amber-200/80 bg-gradient-to-br from-amber-50 to-orange-50/50 p-5 space-y-2">
                <div className="flex items-center gap-2">
                  <Award className="h-4 w-4 text-amber-600" />
                  <h4 className="font-extrabold text-xs text-amber-950 uppercase tracking-wide">
                    Certificate & Toolkit
                  </h4>
                </div>
                <p className="text-[11px] text-amber-900 leading-relaxed">
                  Complete all modules to unlock the official Tameeros Shorts Creator Certification and verified campaign templates.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
