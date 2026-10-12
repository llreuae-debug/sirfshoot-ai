'use client';

import React, { useState, useRef, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import {
  MessageSquare,
  X,
  Send,
  Sparkles,
  Bot,
  AlertTriangle,
  RotateCcw,
  ExternalLink,
  ShieldAlert,
  ChevronDown,
  ArrowRight,
  User,
  CheckCircle2,
} from 'lucide-react';
import { AssistantMessage } from '@/lib/guardian-types';
import { useCreatorStore } from '@/lib/store';

let assistantSeq = 0;
function nextAssistantId(prefix: string) {
  assistantSeq += 1;
  return `${prefix}-${assistantSeq}`;
}

function ClientAssistantInner() {
  const pathname = usePathname();
  const router = useRouter();
  const { state: userState } = useCreatorStore();

  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasUnread, setHasUnread] = useState(false);
  const [escalatingIncident, setEscalatingIncident] = useState(false);
  const [incidentSuccessCode, setIncidentSuccessCode] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const [messages, setMessages] = useState<AssistantMessage[]>([
    {
      id: 'welcome-1',
      role: 'assistant',
      content: `Hello! I am the **Tameeros Shorts Assistant**.\n\nI can help you navigate the 9-agent production pipeline, understand pricing in PKR, set up your Tone Fingerprint, or report technical issues to our autonomous operations team. How can I assist you today?`,
      timestamp: '2026-10-12T00:00:00Z',
      suggestedActions: [
        { label: 'How does 9-Agent work?', actionType: 'prefill', payload: 'How does the 9-Agent Pipeline work?' },
        { label: 'Subscription plans in PKR', actionType: 'prefill', payload: 'What are the subscription plans in PKR?' },
        { label: 'Report a technical issue', actionType: 'prefill', payload: 'I encountered an error / technical problem' },
      ],
    },
  ]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  // Handle sending a chat message
  const handleSendMessage = async (customText?: string) => {
    const textToSend = (customText || inputMessage).trim();
    if (!textToSend || isLoading) return;

    const userMsg: AssistantMessage = {
      id: nextAssistantId('msg-user'),
      role: 'user',
      content: textToSend,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/assistant/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: textToSend,
          history: messages.slice(-4).map((m) => ({ role: m.role, content: m.content })),
          context: {
            currentPage: pathname,
            userPlan: userState.plan,
            creditsRemaining: userState.creditsRemaining,
          },
        }),
      });

      if (!res.ok) {
        throw new Error(`HTTP error ${res.status}`);
      }

      const data = await res.json();

      const assistantMsg: AssistantMessage = {
        id: nextAssistantId('msg-ai'),
        role: 'assistant',
        content: data.reply || 'I processed your request.',
        timestamp: new Date().toISOString(),
        suggestedActions: data.suggestedActions,
      };

      setMessages((prev) => [...prev, assistantMsg]);
      if (!isOpen) setHasUnread(true);
    } catch (err) {
      console.error('Chat error', err);
      const errorMsg: AssistantMessage = {
        id: nextAssistantId('msg-err'),
        role: 'assistant',
        content: 'I encountered a brief connection delay. Would you like to retry or report this issue to Guardian AI operations?',
        timestamp: new Date().toISOString(),
        suggestedActions: [
          { label: 'Retry Question', actionType: 'prefill', payload: textToSend },
          { label: 'Escalate to Guardian AI', actionType: 'escalate', payload: textToSend },
        ],
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  // Client-to-Admin Escalation trigger
  const handleEscalateToGuardian = async (problemDescription: string) => {
    setEscalatingIncident(true);
    try {
      const res = await fetch('/api/guardian/escalate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userDescription: problemDescription || 'User requested technical assistance from chat',
          pageRoute: pathname,
          userEmail: userState.email || 'creator@session',
          browserMetadata: {
            userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : 'Browser',
            viewport: typeof window !== 'undefined' ? `${window.innerWidth}x${window.innerHeight}` : 'Standard',
          },
        }),
      });

      const data = await res.json();
      if (data.success && data.incidentId) {
        setIncidentSuccessCode(data.incidentId);

        const escalationConfirmation: AssistantMessage = {
          id: nextAssistantId('msg-esc'),
          role: 'assistant',
          content: `Incident **${data.incidentId}** has been registered with **Tameeros Guardian AI Operations**.\n\n` +
            `• **Service Target:** Client Application (${pathname})\n` +
            `• **Diagnostic Status:** Dispatched\n` +
            `• **Severity:** P2 (Investigating)\n\n` +
            `Our autonomous reliability engine has initiated automated telemetry capture. If self-healing recovery actions are available, they will be applied automatically.`,
          timestamp: new Date().toISOString(),
          suggestedActions: [
            { label: 'Return to Studio', actionType: 'navigate', payload: '/create' },
            { label: 'Ask Another Question', actionType: 'prefill', payload: 'What other features can I use?' },
          ],
        };

        setMessages((prev) => [...prev, escalationConfirmation]);
      }
    } catch (err) {
      console.error('Escalation error', err);
    } finally {
      setEscalatingIncident(false);
    }
  };

  const handleActionClick = (action: { label: string; actionType: 'navigate' | 'prefill' | 'escalate'; payload?: string }) => {
    if (action.actionType === 'navigate' && action.payload) {
      router.push(action.payload);
      if (window.innerWidth < 640) setIsOpen(false);
    } else if (action.actionType === 'prefill' && action.payload) {
      handleSendMessage(action.payload);
    } else if (action.actionType === 'escalate') {
      handleEscalateToGuardian(action.payload || inputMessage || 'Reported user problem');
    }
  };

  const handleClearHistory = () => {
    setMessages([
      {
        id: nextAssistantId('msg-clr'),
        role: 'assistant',
        content: 'Conversation history cleared. How can I help you with Tameeros Shorts?',
        timestamp: new Date().toISOString(),
        suggestedActions: [
          { label: 'How does 9-Agent work?', actionType: 'prefill', payload: 'How does the 9-Agent Pipeline work?' },
          { label: 'Subscription plans in PKR', actionType: 'prefill', payload: 'What are the subscription plans in PKR?' },
        ],
      },
    ]);
  };

  // If in admin routes, don't overlap with admin menus
  const isAdminRoute = pathname.startsWith('/admin');

  return (
    <>
      {/* Floating Assistant Launcher Button */}
      <div className={`fixed bottom-6 right-6 z-40 ${isAdminRoute ? 'hidden sm:block' : ''}`}>
        {!isOpen && (
          <button
            type="button"
            onClick={() => {
              setIsOpen(true);
              setHasUnread(false);
            }}
            className="group relative flex items-center gap-2.5 px-4 py-3 bg-[#071B3A] text-white rounded-full shadow-2xl border border-white/20 hover:scale-105 active:scale-95 transition cursor-pointer"
            aria-label="Open Tameeros Shorts Assistant"
          >
            <div className="relative h-7 w-7 rounded-full bg-gradient-to-br from-[#FFD900] to-[#E5A800] text-[#071B3A] flex items-center justify-center font-bold shadow-md">
              <Bot className="h-4 w-4" />
              <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-emerald-500 border-2 border-[#071B3A]" />
            </div>
            <span className="text-xs font-black tracking-tight text-white hidden md:inline">
              AI Assistant
            </span>
            {hasUnread && (
              <span className="absolute -top-1.5 -left-1.5 h-4 w-4 rounded-full bg-red-600 border-2 border-white text-[9px] font-bold text-white flex items-center justify-center">
                1
              </span>
            )}
          </button>
        )}
      </div>

      {/* Expandable Assistant Chat Panel */}
      {isOpen && (
        <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-[94vw] sm:w-[420px] max-h-[85vh] h-[640px] bg-white rounded-3xl border border-slate-200 shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
          {/* Header */}
          <div className="bg-[#071B3A] text-white p-4 flex items-center justify-between border-b border-white/10 shrink-0">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-2xl bg-gradient-to-br from-[#FFD900] to-[#E5A800] text-[#071B3A] flex items-center justify-center font-black shadow-md">
                <Sparkles className="h-4.5 w-4.5" />
              </div>
              <div>
                <h3 className="font-black text-sm text-white leading-tight">Tameeros Shorts Assistant</h3>
                <div className="flex items-center gap-1.5 text-[10px] text-slate-300 font-medium">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Online · Connected to Guardian Ops</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={handleClearHistory}
                title="Clear Conversation"
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition cursor-pointer"
              >
                <RotateCcw className="h-3.5 w-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                title="Minimize Assistant"
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Messages Feed */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs bg-slate-50/60">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.role === 'assistant' && (
                  <div className="h-7 w-7 rounded-xl bg-[#071B3A] text-white flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                    <Bot className="h-3.5 w-3.5 text-[#FFD900]" />
                  </div>
                )}

                <div className={`max-w-[85%] space-y-2`}>
                  <div
                    className={`p-3.5 rounded-2xl leading-relaxed whitespace-pre-wrap ${
                      msg.role === 'user'
                        ? 'bg-[#071B3A] text-white font-medium rounded-tr-xs'
                        : 'bg-white text-slate-800 border border-slate-200 shadow-xs rounded-tl-xs'
                    }`}
                  >
                    {msg.content}
                  </div>

                  {/* Smart Action Chips */}
                  {msg.suggestedActions && msg.suggestedActions.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {msg.suggestedActions.map((action, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => handleActionClick(action)}
                          className={`text-[11px] font-bold px-2.5 py-1 rounded-xl transition flex items-center gap-1 cursor-pointer border ${
                            action.actionType === 'escalate'
                              ? 'bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100'
                              : action.actionType === 'navigate'
                              ? 'bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100'
                              : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                          }`}
                        >
                          {action.actionType === 'escalate' && <ShieldAlert className="h-3 w-3 text-rose-600" />}
                          {action.actionType === 'navigate' && <ExternalLink className="h-3 w-3 text-blue-600" />}
                          <span>{action.label}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {msg.role === 'user' && (
                  <div className="h-7 w-7 rounded-xl bg-slate-300 text-slate-700 flex items-center justify-center shrink-0 mt-0.5">
                    <User className="h-3.5 w-3.5" />
                  </div>
                )}
              </div>
            ))}

            {isLoading && (
              <div className="flex gap-2.5 items-center text-slate-400 text-xs py-2">
                <div className="h-7 w-7 rounded-xl bg-[#071B3A] text-[#FFD900] flex items-center justify-center">
                  <Bot className="h-3.5 w-3.5 animate-bounce" />
                </div>
                <div className="bg-white border border-slate-200 rounded-2xl px-3 py-2 text-slate-500 font-medium shadow-xs">
                  Thinking...
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Escalation Notification Banner */}
          {incidentSuccessCode && (
            <div className="bg-emerald-50 border-t border-emerald-200 px-4 py-2 text-[11px] text-emerald-800 font-bold flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                <span>Ticket #{incidentSuccessCode} Dispatched to Operations</span>
              </span>
              <button
                type="button"
                onClick={() => setIncidentSuccessCode(null)}
                className="text-emerald-600 hover:text-emerald-900 cursor-pointer"
              >
                Dismiss
              </button>
            </div>
          )}

          {/* Message Input Footer */}
          <div className="p-3 bg-white border-t border-slate-200">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Ask about 9 agents, pricing, or report an issue..."
                className="flex-1 px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:outline-none focus:border-[#071B3A] font-medium"
                disabled={isLoading || escalatingIncident}
              />
              <button
                type="submit"
                disabled={!inputMessage.trim() || isLoading || escalatingIncident}
                className="h-9 w-9 rounded-xl bg-[#071B3A] text-white flex items-center justify-center hover:bg-black disabled:opacity-40 transition cursor-pointer shrink-0 shadow-sm"
              >
                <Send className="h-3.5 w-3.5" />
              </button>
            </form>
            <div className="flex items-center justify-between text-[10px] text-slate-400 mt-1 px-1 font-medium">
              <span>English only · Real-time LLM</span>
              <span>Encrypted session</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default function ClientAssistant() {
  return (
    <React.Suspense fallback={null}>
      <ClientAssistantInner />
    </React.Suspense>
  );
}
