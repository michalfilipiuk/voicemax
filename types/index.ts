// User Profile Types
export type AgeRange = '18-24' | '25-34' | '35-44' | '45-54' | '55+';

export type PrimaryGoal =
  | 'authority'
  | 'social'
  | 'dating'
  | 'content'
  | 'self_improvement';

export type VoicePerception =
  | 'too_high'
  | 'average_want_deeper'
  | 'inconsistent'
  | 'nasal'
  | 'unsure';

export type ExperienceLevel = 'none' | 'youtube' | 'tried' | 'experienced';

export type DailyCommitment = 5 | 10 | 15;

export interface UserProfile {
  id: string;
  firstName: string;
  ageRange: AgeRange | null;
  primaryGoal: PrimaryGoal | null;
  voicePerception: VoicePerception | null;
  experienceLevel: ExperienceLevel | null;
  dailyCommitment: DailyCommitment | null;
  onboardingCompleted: boolean;
  onboardingStep: number;
  createdAt: string;
  baselinePitch: number | null;
  targetPitch: number | null;
}

export const DEFAULT_USER_PROFILE: UserProfile = {
  id: '',
  firstName: '',
  ageRange: null,
  primaryGoal: null,
  voicePerception: null,
  experienceLevel: null,
  dailyCommitment: null,
  onboardingCompleted: false,
  onboardingStep: 0,
  createdAt: '',
  baselinePitch: null,
  targetPitch: null,
};

// Voice Measurement Types
export type MeasurementContext =
  | 'onboarding'
  | 'quick_measure'
  | 'exercise'
  | 'workout';

export interface VoiceMeasurement {
  id: string;
  timestamp: string;
  pitchHz: number;
  pitchMin: number;
  pitchMax: number;
  recordingUri: string;
  duration: number;
  context: MeasurementContext;
}

// Workout Types
export type ExerciseType =
  | 'breathing'
  | 'timed'
  | 'reps'
  | 'phrase'
  | 'sustained';

export interface ExerciseConfig {
  id: string;
  name: string;
  description: string;
  type: ExerciseType;
  instruction?: string;
  duration?: number;
  reps?: number;
  repDuration?: number;
  phases?: { name: string; duration: number }[];
  phrases?: string[];
  showPitchMeter?: boolean;
  showTimer?: boolean;
  showRecordPlayback?: boolean;
}

export interface ExerciseResult {
  exerciseId: string;
  completed: boolean;
  duration: number;
  pitchReadings?: number[];
  recordingUri?: string;
}

export interface WorkoutSession {
  id: string;
  date: string;
  completed: boolean;
  exercises: ExerciseResult[];
  totalDuration: number;
  pitchBefore?: number;
  pitchAfter?: number;
}

// User Progress Types
export interface UserProgress {
  currentStreak: number;
  longestStreak: number;
  totalWorkouts: number;
  totalMinutes: number;
  lastWorkoutDate: string | null;
  baselinePitch: number;
  targetPitch: number;
  measurementIds: string[];
}

export const DEFAULT_USER_PROGRESS: UserProgress = {
  currentStreak: 0,
  longestStreak: 0,
  totalWorkouts: 0,
  totalMinutes: 0,
  lastWorkoutDate: null,
  baselinePitch: 0,
  targetPitch: 0,
  measurementIds: [],
};

// Voice Projection Types
export interface VoiceProjection {
  label: string;
  months: number;
  pitchHz: number;
  description: string;
}

// Pitch Reference Data
export const PITCH_RANGES = {
  veryDeep: { min: 60, max: 100, label: 'Very Deep' },
  deep: { min: 100, max: 130, label: 'Deep' },
  average: { min: 130, max: 165, label: 'Average' },
  higher: { min: 165, max: 200, label: 'Higher' },
} as const;

export const REFERENCE_VOICES = {
  morganFreeman: { name: 'Morgan Freeman', pitch: 85 },
  jamesEarlJones: { name: 'James Earl Jones', pitch: 80 },
  averageMale: { name: 'Average Male', pitch: 120 },
} as const;
