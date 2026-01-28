
export enum EducationSystem {
  MATRIC_FSC = 'MATRIC_FSC',
  O_A_LEVEL = 'O_A_LEVEL'
}

export interface WeightageSettings {
  matric: number;
  hssc: number;
  test: number;
}

export interface University {
  id: string;
  name: string;
  abbreviation: string;
  city: string;
  programs: Program[];
}

export interface Program {
  id: string;
  name: string;
  category: string;
  weightage: WeightageSettings;
  lastYearMerit?: number;
}

export interface UserEducation {
  system: EducationSystem;
  matricTotal: number;
  matricObtained: number;
  hsscTotal: number;
  hsscObtained: number;
  testScore: number;
  testTotal: number;
  testType: string;
  useCustomWeightage: boolean;
  customWeightage: WeightageSettings;
}

export interface CalculationResult {
  meritScore: number;
  programName: string;
  universityName: string;
  fullUniversityName?: string;
  isSafe: boolean;
  isMatch: boolean;
  isReach: boolean;
  lastYearMerit?: number;
  isCustomWeightage: boolean;
}

// --- StudyMate Specific Types ---

export type View = 'dashboard' | 'planner' | 'mentor' | 'notes' | 'analytics' | 'university' | 'feedback' | 'settings';

export interface Task {
  id: string;
  title: string;
  subject: string;
  priority: 'low' | 'medium' | 'high';
  duration: number; // minutes
  completed: boolean;
  date: string;
}

export interface Note {
  id: string;
  title: string;
  content: string;
  tags: string[];
  updatedAt: string;
}

export interface StudySession {
  id: string;
  startTime: string;
  duration: number;
  subject: string;
}

export interface FeedbackEntry {
  id: string;
  name: string;
  rating: number;
  comment: string;
  date: string;
}
