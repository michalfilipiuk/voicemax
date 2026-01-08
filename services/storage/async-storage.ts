import AsyncStorage from '@react-native-async-storage/async-storage';

import type {
  UserProfile,
  VoiceMeasurement,
  WorkoutSession,
  UserProgress,
} from '@/types';

// Storage Keys
export const STORAGE_KEYS = {
  USER_PROFILE: '@voicemax:user_profile',
  VOICE_MEASUREMENTS: '@voicemax:voice_measurements',
  WORKOUT_HISTORY: '@voicemax:workout_history',
  USER_PROGRESS: '@voicemax:user_progress',
  SETTINGS: '@voicemax:settings',
} as const;

// Generic storage helpers
async function getItem<T>(key: string): Promise<T | null> {
  try {
    const value = await AsyncStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  } catch (error) {
    console.error(`Error reading ${key}:`, error);
    return null;
  }
}

async function setItem<T>(key: string, value: T): Promise<void> {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error writing ${key}:`, error);
    throw error;
  }
}

async function removeItem(key: string): Promise<void> {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.error(`Error removing ${key}:`, error);
    throw error;
  }
}

// User Profile
export async function getUserProfile(): Promise<UserProfile | null> {
  return getItem<UserProfile>(STORAGE_KEYS.USER_PROFILE);
}

export async function saveUserProfile(profile: UserProfile): Promise<void> {
  return setItem(STORAGE_KEYS.USER_PROFILE, profile);
}

export async function clearUserProfile(): Promise<void> {
  return removeItem(STORAGE_KEYS.USER_PROFILE);
}

// Voice Measurements
export async function getVoiceMeasurements(): Promise<VoiceMeasurement[]> {
  const measurements = await getItem<VoiceMeasurement[]>(
    STORAGE_KEYS.VOICE_MEASUREMENTS
  );
  return measurements || [];
}

export async function saveVoiceMeasurement(
  measurement: VoiceMeasurement
): Promise<void> {
  const measurements = await getVoiceMeasurements();
  measurements.push(measurement);
  return setItem(STORAGE_KEYS.VOICE_MEASUREMENTS, measurements);
}

export async function getLatestMeasurement(): Promise<VoiceMeasurement | null> {
  const measurements = await getVoiceMeasurements();
  if (measurements.length === 0) return null;
  return measurements[measurements.length - 1];
}

export async function clearVoiceMeasurements(): Promise<void> {
  return removeItem(STORAGE_KEYS.VOICE_MEASUREMENTS);
}

// Workout History
export async function getWorkoutHistory(): Promise<WorkoutSession[]> {
  const history = await getItem<WorkoutSession[]>(STORAGE_KEYS.WORKOUT_HISTORY);
  return history || [];
}

export async function saveWorkoutSession(
  session: WorkoutSession
): Promise<void> {
  const history = await getWorkoutHistory();
  history.push(session);
  return setItem(STORAGE_KEYS.WORKOUT_HISTORY, history);
}

export async function updateWorkoutSession(
  session: WorkoutSession
): Promise<void> {
  const history = await getWorkoutHistory();
  const index = history.findIndex((s) => s.id === session.id);
  if (index !== -1) {
    history[index] = session;
    return setItem(STORAGE_KEYS.WORKOUT_HISTORY, history);
  }
}

export async function clearWorkoutHistory(): Promise<void> {
  return removeItem(STORAGE_KEYS.WORKOUT_HISTORY);
}

// User Progress
export async function getUserProgress(): Promise<UserProgress | null> {
  return getItem<UserProgress>(STORAGE_KEYS.USER_PROGRESS);
}

export async function saveUserProgress(progress: UserProgress): Promise<void> {
  return setItem(STORAGE_KEYS.USER_PROGRESS, progress);
}

export async function clearUserProgress(): Promise<void> {
  return removeItem(STORAGE_KEYS.USER_PROGRESS);
}

// Clear all data
export async function clearAllData(): Promise<void> {
  await Promise.all([
    clearUserProfile(),
    clearVoiceMeasurements(),
    clearWorkoutHistory(),
    clearUserProgress(),
  ]);
}

// Generate unique ID
export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}
