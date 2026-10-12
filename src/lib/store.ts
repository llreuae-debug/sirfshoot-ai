'use client';

import { useState, useEffect } from 'react';
import {
  UserState,
  ProjectData,
  ToneFingerprint,
  LeadItem,
  LeadReminder,
  SavedDescription,
  SavedValuation,
  SavedFinancing,
} from './types';
import {
  INITIAL_USER_STATE,
  ADMIN_USER_STATE,
  DEFAULT_TONE_FINGERPRINTS,
  DEFAULT_LEADS,
  DEFAULT_LEAD_REMINDERS,
  DEFAULT_SAVED_DESCRIPTIONS,
  DEFAULT_SAVED_VALUATIONS,
  DEFAULT_SAVED_FINANCINGS,
} from './mock-data';

const STORAGE_KEY = 'sirfshoot_creator_state_v1';

export function getInitialState(): UserState {
  if (typeof window === 'undefined') {
    return INITIAL_USER_STATE;
  }
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed && parsed.projects && parsed.projects.length > 0) {
        // Ensure all default tone fingerprints (including English & updated currency) are updated
        const defaultMap = new Map(DEFAULT_TONE_FINGERPRINTS.map((df) => [df.id, df]));
        const updatedFingerprints = (parsed.activeFingerprints || []).map((f: ToneFingerprint) => {
          return defaultMap.has(f.id) ? defaultMap.get(f.id)! : f;
        });
        const existingIds = new Set(updatedFingerprints.map((f: ToneFingerprint) => f.id));
        const missing = DEFAULT_TONE_FINGERPRINTS.filter((df) => !existingIds.has(df.id));
        parsed.activeFingerprints = [...updatedFingerprints, ...missing];

        // Ensure newly integrated features are initialized if undefined
        if (!parsed.leads || parsed.leads.length === 0) parsed.leads = DEFAULT_LEADS;
        if (!parsed.leadReminders) parsed.leadReminders = DEFAULT_LEAD_REMINDERS;
        if (!parsed.savedDescriptions) parsed.savedDescriptions = DEFAULT_SAVED_DESCRIPTIONS;
        if (!parsed.savedValuations) parsed.savedValuations = DEFAULT_SAVED_VALUATIONS;
        if (!parsed.savedFinancings) parsed.savedFinancings = DEFAULT_SAVED_FINANCINGS;
        if (!parsed.completedLessonIds) parsed.completedLessonIds = ['lesson-1'];

        saveState(parsed);
        return parsed;
      }
    }
  } catch (err) {
    console.error('Error loading state from localStorage:', err);
  }
  return INITIAL_USER_STATE;
}

export function saveState(state: UserState): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (err) {
    console.error('Error saving state to localStorage:', err);
  }
}

export function useCreatorStore() {
  const [state, setState] = useState<UserState>(INITIAL_USER_STATE);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const loaded = getInitialState();
    queueMicrotask(() => {
      setState(loaded);
      setIsLoaded(true);
    });
  }, []);

  const updateState = (updater: (prev: UserState) => UserState) => {
    setState((prev) => {
      const next = updater(prev);
      saveState(next);
      return next;
    });
  };

  const loginAsUser = (user: UserState) => {
    setState(user);
    saveState(user);
  };

  const loginAsAdmin = () => {
    setState(ADMIN_USER_STATE);
    saveState(ADMIN_USER_STATE);
  };

  const loginWithEmail = (email: string, name?: string) => {
    if (email.trim().toLowerCase() === 'llre.uae@gmail.com') {
      loginAsAdmin();
      return;
    }
    const newUser: UserState = {
      ...INITIAL_USER_STATE,
      email: email.trim(),
      name: name?.trim() || email.split('@')[0],
      channelName: `${name?.trim() || email.split('@')[0]}'s Channel`,
    };
    loginAsUser(newUser);
  };

  const getProject = (id: string): ProjectData | undefined => {
    const memoryProject = state.projects.find((p) => p.id === id);
    if (memoryProject) return memoryProject;
    if (typeof window !== 'undefined') {
      const persisted = getInitialState();
      return persisted.projects.find((p) => p.id === id);
    }
    return undefined;
  };

  const addProject = (project: ProjectData) => {
    updateState((prev) => ({
      ...prev,
      creditsRemaining: Math.max(0, prev.creditsRemaining - 1),
      projects: [project, ...prev.projects],
    }));
  };

  const updateProject = (id: string, updater: (proj: ProjectData) => ProjectData) => {
    updateState((prev) => ({
      ...prev,
      projects: prev.projects.map((p) => (p.id === id ? updater(p) : p)),
    }));
  };

  const addToneFingerprint = (fingerprint: ToneFingerprint) => {
    updateState((prev) => ({
      ...prev,
      activeFingerprints: [fingerprint, ...prev.activeFingerprints],
    }));
  };

  const updateToneFingerprint = (id: string, updated: Partial<ToneFingerprint>) => {
    updateState((prev) => ({
      ...prev,
      activeFingerprints: prev.activeFingerprints.map((tf) =>
        tf.id === id ? { ...tf, ...updated } : tf
      ),
    }));
  };

  const addLead = (lead: LeadItem) => {
    updateState((prev) => ({
      ...prev,
      leads: [lead, ...(prev.leads || [])],
    }));
  };

  const updateLead = (id: string, updates: Partial<LeadItem>) => {
    updateState((prev) => ({
      ...prev,
      leads: (prev.leads || []).map((l) => (l.id === id ? { ...l, ...updates } : l)),
    }));
  };

  const deleteLead = (id: string) => {
    updateState((prev) => ({
      ...prev,
      leads: (prev.leads || []).filter((l) => l.id !== id),
    }));
  };

  const addLeadReminder = (reminder: LeadReminder) => {
    updateState((prev) => ({
      ...prev,
      leadReminders: [reminder, ...(prev.leadReminders || [])],
    }));
  };

  const toggleLeadReminder = (id: string) => {
    updateState((prev) => ({
      ...prev,
      leadReminders: (prev.leadReminders || []).map((r) =>
        r.id === id ? { ...r, completed: !r.completed } : r
      ),
    }));
  };

  const saveDescription = (desc: SavedDescription) => {
    updateState((prev) => ({
      ...prev,
      savedDescriptions: [desc, ...(prev.savedDescriptions || [])],
    }));
  };

  const saveValuation = (val: SavedValuation) => {
    updateState((prev) => ({
      ...prev,
      savedValuations: [val, ...(prev.savedValuations || [])],
    }));
  };

  const saveFinancing = (fin: SavedFinancing) => {
    updateState((prev) => ({
      ...prev,
      savedFinancings: [fin, ...(prev.savedFinancings || [])],
    }));
  };

  const toggleLessonCompleted = (lessonId: string) => {
    updateState((prev) => {
      const current = prev.completedLessonIds || [];
      const updated = current.includes(lessonId)
        ? current.filter((id) => id !== lessonId)
        : [...current, lessonId];
      return {
        ...prev,
        completedLessonIds: updated,
      };
    });
  };

  const resetToSampleData = () => {
    setState(INITIAL_USER_STATE);
    saveState(INITIAL_USER_STATE);
  };

  return {
    state,
    isLoaded,
    getProject,
    addProject,
    updateProject,
    addToneFingerprint,
    updateToneFingerprint,
    addLead,
    updateLead,
    deleteLead,
    addLeadReminder,
    toggleLeadReminder,
    saveDescription,
    saveValuation,
    saveFinancing,
    toggleLessonCompleted,
    resetToSampleData,
    loginAsUser,
    loginAsAdmin,
    loginWithEmail,
  };
}
