'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SidebarDrawer from '@/components/SidebarDrawer';
import { useCreatorStore } from '@/lib/store';
import {
  MessageSquare,
  Send,
  Sparkles,
  ArrowLeft,
  Copy,
  CheckCircle2,
  RefreshCw,
  Lightbulb,
  ShieldAlert,
  Compass,
} from 'lucide-react';

interface ChatMessage {
  id: string;
  role: 'assistant' | 'user';
  content: string;
  timestamp: string;
}

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: 'msg-1',
    role: 'assistant',
    content:
      'Hello! I am your **AI Real Estate & Marketing Copilot**. How can I assist your pipeline, scripts, and deals today?\n\nYou can ask me for:\n• WhatsApp objection handling scripts (e.g. price resistance, fee questions)\n• 30-second high-retention video scripts for luxury properties\n• Lead reactivation messages with high response rates\n• Due diligence and closing checklists',
    timestamp: '10:00 AM',
  },
];

const SUGGESTED_PROMPTS = [
  'Objection Handling: "Your commission fee is too high"',
  '30-second Reels script for a luxury duplex penthouse',
  'WhatsApp message to re-engage dormant buyer leads',
  'Listing presentation checklist for motivated sellers',
];

export default function AssistentePage() {
  const { state } = useCreatorStore();
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSendMessage = React.useCallback(
    (textToSend?: string) => {
      const text = textToSend || inputText;
      if (!text.trim() || isTyping) return;

      const newId = 'msg-' + Math.random().toString(36).slice(2, 9);
      const userMsg: ChatMessage = {
        id: newId,
        role: 'user',
        content: text.trim(),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, userMsg]);
      setInputText('');
      setIsTyping(true);

      setTimeout(() => {
        let replyContent = '';
        const lower = text.toLowerCase();

        if (lower.includes('commission') || lower.includes('fee') || lower.includes('high')) {
          replyContent = `### 🎯 How to Handle Commission Resistance:\n\n**Core Principle:** Don’t argue over percentages; demonstrate the financial risk of discount representation.\n\n**WhatsApp Script Template:**\n> *"I completely understand your desire to optimize costs, [Name]. My role isn't merely listing the property on portals—it's safeguarding your transaction, filtering unqualified buyers, and actively defending your top asking price so you don't lose 5% to 10% in aggressive renegotiations. How about a 10-minute strategy call so I can show you our marketing roadmap?"*\n\n**Pro Tip:** Offer the full Comparative Market Valuation and Featured Listing Placement as an exclusive bonus.`;
        } else if (lower.includes('script') || lower.includes('reels') || lower.includes('video') || lower.includes('penthouse')) {
          replyContent = `### 🎬 30-Second High-Retention Reels Script:\n\n**00–03s (The Hook):**\n*"If you had PKR 85 Million right now, would you buy this penthouse in Gulberg or invest in Dubai? Look at this terrace."* (Camera tracking backwards from double-height living room toward open balcony view)\n\n**03–15s (The Desire):**\n*"Spanning 350 sq.m with 4 private en-suite bedrooms and a heated plunge pool on the 18th floor. Floor-to-ceiling glass and 24/7 biometric security."*\n\n**15–25s (The Opportunity):**\n*"The owner is open to direct purchase terms or structured installment options."*\n\n**25–30s (Direct CTA):**\n*"Comment 'TOUR' below or message via the bio link to receive the exclusive presentation book."*`;
        } else if (lower.includes('dormant') || lower.includes('reactivate') || lower.includes('lead')) {
          replyContent = `### 📲 Lead Reactivation Script (High Response Rate):\n\n> *"Hi [Name], hope you are having a productive week! I thought of you today because a property just entered our private portfolio that matches your exact criteria in [Area/Sector], but with a negotiation term that likely won't last past this week.\n\nAre you still exploring options in this category, or have you already secured your ideal place? If interested, I can send you a 1-minute video walkthrough right now."*\n\n**Why this works:** Zero sales pressure, sparks authentic curiosity, and creates natural urgency.`;
        } else {
          replyContent = `Here is your strategic marketing analysis for **"${text}"**:\n\n1. **Positioning & Perception:** Anchor the listing around non-replicable lifestyle benefits (security, community prestige, architectural quality).\n2. **Visual Engagement:** Pair crisp 4K imagery with concise neural voice narration to maximize watch time across social platforms.\n3. **Rapid Follow-Up:** Respond to inbound buyer inquiries within 5 minutes—conversion probability drops significantly after 30 minutes.\n\nWould you like me to draft a custom video script or an investor presentation outline tailored to this property?`;
        }

        const replyId = 'msg-' + Math.random().toString(36).slice(2, 9);
        const assistantMsg: ChatMessage = {
          id: replyId,
          role: 'assistant',
          content: replyContent,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };

        setMessages((prev) => [...prev, assistantMsg]);
        setIsTyping(false);
      }, 700);
    },
    [inputText, isTyping]
  );

  const handleCopyMessage = (id: string, content: string) => {
    navigator.clipboard.writeText(content);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#F8FAFC]">
      <SidebarDrawer />
      <Navbar />

      <main className="flex-1 py-8 sm:py-12">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-200 pb-6">
            <div className="flex items-center gap-3">
              <Link
                href="/dashboard"
                className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition"
                title="Back to Dashboard"
              >
                <ArrowLeft className="h-5 w-5" />
              </Link>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 text-white shadow-md">
                <Sparkles className="h-5 w-5" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  AI Real Estate Copilot
                </h1>
                <p className="text-xs text-slate-500">
                  24/7 strategic assistant for sales scripts, marketing blueprints, and objection handling.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setMessages(INITIAL_MESSAGES)}
              className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-600 hover:bg-slate-50 transition shadow-xs"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              <span>Clear Chat</span>
            </button>
          </div>

          {/* Suggested Prompts Pills */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mr-1">
              Suggested:
            </span>
            {SUGGESTED_PROMPTS.map((prompt) => (
              <button
                key={prompt}
                type="button"
                onClick={() => handleSendMessage(prompt)}
                className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-700 hover:border-[#E50914] hover:text-[#E50914] transition shadow-xs"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Chat Container */}
          <div className="rounded-3xl border border-slate-200 bg-white shadow-sm flex flex-col h-[550px] overflow-hidden">
            {/* Messages Scroll Area */}
            <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4">
              {messages.map((m) => {
                const isAssistant = m.role === 'assistant';
                return (
                  <div
                    key={m.id}
                    className={`flex gap-3 ${isAssistant ? 'justify-start' : 'justify-end'}`}
                  >
                    {isAssistant && (
                      <div className="h-8 w-8 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 text-white flex items-center justify-center text-xs font-bold shrink-0 shadow-xs mt-1">
                        AI
                      </div>
                    )}

                    <div
                      className={`relative max-w-xl rounded-2xl p-4 text-xs sm:text-sm leading-relaxed ${
                        isAssistant
                          ? 'bg-slate-50 border border-slate-200/80 text-slate-800'
                          : 'bg-[#E50914] text-white shadow-md'
                      }`}
                    >
                      <div className="whitespace-pre-line font-sans">{m.content}</div>

                      <div className="flex items-center justify-between gap-4 mt-2 pt-1 border-t border-slate-200/40 text-[10px] text-slate-400">
                        <span>{m.timestamp}</span>

                        {isAssistant && (
                          <button
                            type="button"
                            onClick={() => handleCopyMessage(m.id, m.content)}
                            className="flex items-center gap-1 hover:text-slate-700 transition"
                            title="Copy reply"
                          >
                            {copiedId === m.id ? (
                              <>
                                <CheckCircle2 className="h-3 w-3 text-emerald-600" />
                                <span className="text-emerald-600 font-bold">Copied!</span>
                              </>
                            ) : (
                              <>
                                <Copy className="h-3 w-3" />
                                <span>Copy</span>
                              </>
                            )}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}

              {isTyping && (
                <div className="flex items-center gap-2 text-xs text-slate-400 italic">
                  <div className="h-2 w-2 rounded-full bg-amber-500 animate-ping" />
                  <span>Copilot is formulating a response...</span>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Box Footer */}
            <div className="border-t border-slate-100 p-3 sm:p-4 bg-slate-50/50">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  placeholder="Ask anything about scripts, client negotiations, objection handling, or property listings..."
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  className="flex-1 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:border-[#E50914] focus:outline-none shadow-xs"
                />

                <button
                  type="submit"
                  disabled={!inputText.trim() || isTyping}
                  className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#E50914] text-white hover:bg-[#B91C1C] transition disabled:opacity-40 shadow-md shadow-red-500/20 shrink-0"
                  aria-label="Send message"
                >
                  <Send className="h-4 w-4" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
