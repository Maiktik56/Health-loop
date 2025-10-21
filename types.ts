import type React from 'react';

export interface WeightEntry {
  date: string;
  weight: number;
}

export interface SideEffectLog {
  id: string;
  date: string;
  effect: string;
  severity: number;
  guidance?: string;
  isLoadingGuidance?: boolean;
}

export interface Achievement {
    id: string;
    name: string;
    description: string;
    icon: React.FC<{className?: string}>;
}

export interface PatientData {
  name: string;
  medication: string;
  dose: string;
  injectionDay: number; // 0: Sun, 1: Mon, ...
  startingWeight: number;
  targetWeight: number;
  motivation: string;
  weightHistory: WeightEntry[];
  sideEffectLogs: SideEffectLog[];
  dailyStreak: number;
  lastCheckinDate: string | null;
  refillDueDate: string;
  // Gamification
  points: number;
  level: number;
  achievements: string[]; // array of achievement IDs
  completedTasksToday: string[];
}

export const COMMON_SIDE_EFFECTS = [
  "Nausea",
  "Vomiting",
  "Diarrhea",
  "Stomach Pain",
  "Constipation",
  "Fatigue",
  "Headache",
  "Injection Site Reaction",
  "Decreased Appetite",
];