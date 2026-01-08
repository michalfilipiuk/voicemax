import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from 'react';

import {
  getWorkoutHistory,
  saveWorkoutSession,
  updateWorkoutSession,
  getUserProgress,
  saveUserProgress,
  clearWorkoutHistory,
  clearUserProgress,
  generateId,
} from '@/services/storage';
import type {
  WorkoutSession,
  ExerciseResult,
  UserProgress,
} from '@/types';
import { DEFAULT_USER_PROGRESS } from '@/types';

type WorkoutContextType = {
  workoutHistory: WorkoutSession[];
  progress: UserProgress;
  activeSession: WorkoutSession | null;
  currentExerciseIndex: number;
  isLoading: boolean;
  startWorkout: () => Promise<WorkoutSession>;
  completeExercise: (result: ExerciseResult) => Promise<void>;
  advanceToNextExercise: () => void;
  finishWorkout: (pitchAfter?: number) => Promise<void>;
  cancelWorkout: () => void;
  updateStreak: () => Promise<void>;
  getWorkoutsThisWeek: () => number;
  getTodaysWorkout: () => WorkoutSession | null;
  clearHistory: () => Promise<void>;
  refreshData: () => Promise<void>;
};

const WorkoutContext = createContext<WorkoutContextType | undefined>(undefined);

export function WorkoutProvider({ children }: { children: ReactNode }) {
  const [workoutHistory, setWorkoutHistory] = useState<WorkoutSession[]>([]);
  const [progress, setProgress] = useState<UserProgress>(DEFAULT_USER_PROGRESS);
  const [activeSession, setActiveSession] = useState<WorkoutSession | null>(
    null
  );
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // Load data on mount
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [history, savedProgress] = await Promise.all([
        getWorkoutHistory(),
        getUserProgress(),
      ]);

      setWorkoutHistory(history);
      setProgress(savedProgress || DEFAULT_USER_PROGRESS);
    } catch (error) {
      console.error('Error loading workout data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const refreshData = useCallback(async () => {
    await loadData();
  }, []);

  const startWorkout = useCallback(async (): Promise<WorkoutSession> => {
    const session: WorkoutSession = {
      id: generateId(),
      date: new Date().toISOString(),
      completed: false,
      exercises: [],
      totalDuration: 0,
    };

    setActiveSession(session);
    setCurrentExerciseIndex(0);
    return session;
  }, []);

  const advanceToNextExercise = useCallback(() => {
    setCurrentExerciseIndex((prev) => prev + 1);
  }, []);

  const completeExercise = useCallback(
    async (result: ExerciseResult) => {
      if (!activeSession) return;

      const updatedSession: WorkoutSession = {
        ...activeSession,
        exercises: [...activeSession.exercises, result],
        totalDuration: activeSession.totalDuration + result.duration,
      };

      setActiveSession(updatedSession);
    },
    [activeSession]
  );

  const finishWorkout = useCallback(
    async (pitchAfter?: number) => {
      if (!activeSession) return;

      const completedSession: WorkoutSession = {
        ...activeSession,
        completed: true,
        pitchAfter,
      };

      await saveWorkoutSession(completedSession);
      setWorkoutHistory((prev) => [...prev, completedSession]);
      setActiveSession(null);
      setCurrentExerciseIndex(0);

      // Update progress
      const today = new Date().toISOString().split('T')[0];
      const newProgress: UserProgress = {
        ...progress,
        totalWorkouts: progress.totalWorkouts + 1,
        totalMinutes:
          progress.totalMinutes + Math.round(completedSession.totalDuration / 60),
        lastWorkoutDate: today,
      };

      await saveUserProgress(newProgress);
      setProgress(newProgress);

      // Update streak
      await updateStreakInternal(newProgress);
    },
    [activeSession, progress]
  );

  const cancelWorkout = useCallback(() => {
    setActiveSession(null);
    setCurrentExerciseIndex(0);
  }, []);

  const updateStreakInternal = async (currentProgress: UserProgress) => {
    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];

    let newStreak = currentProgress.currentStreak;

    if (currentProgress.lastWorkoutDate) {
      const lastWorkout = new Date(currentProgress.lastWorkoutDate);
      const daysDiff = Math.floor(
        (today.getTime() - lastWorkout.getTime()) / (1000 * 60 * 60 * 24)
      );

      if (daysDiff === 0) {
        // Already worked out today, keep streak
      } else if (daysDiff === 1) {
        // Consecutive day, increment streak
        newStreak += 1;
      } else {
        // Missed days, reset streak
        newStreak = 1;
      }
    } else {
      // First workout
      newStreak = 1;
    }

    const updatedProgress: UserProgress = {
      ...currentProgress,
      currentStreak: newStreak,
      longestStreak: Math.max(newStreak, currentProgress.longestStreak),
      lastWorkoutDate: todayStr,
    };

    await saveUserProgress(updatedProgress);
    setProgress(updatedProgress);
  };

  const updateStreak = useCallback(async () => {
    await updateStreakInternal(progress);
  }, [progress]);

  const getWorkoutsThisWeek = useCallback((): number => {
    const now = new Date();
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - now.getDay());
    startOfWeek.setHours(0, 0, 0, 0);

    return workoutHistory.filter((session) => {
      const sessionDate = new Date(session.date);
      return sessionDate >= startOfWeek && session.completed;
    }).length;
  }, [workoutHistory]);

  const getTodaysWorkout = useCallback((): WorkoutSession | null => {
    const today = new Date().toISOString().split('T')[0];

    return (
      workoutHistory.find((session) => {
        const sessionDate = new Date(session.date).toISOString().split('T')[0];
        return sessionDate === today && session.completed;
      }) || null
    );
  }, [workoutHistory]);

  const clearHistory = useCallback(async () => {
    await Promise.all([clearWorkoutHistory(), clearUserProgress()]);
    setWorkoutHistory([]);
    setProgress(DEFAULT_USER_PROGRESS);
    setActiveSession(null);
  }, []);

  return (
    <WorkoutContext.Provider
      value={{
        workoutHistory,
        progress,
        activeSession,
        currentExerciseIndex,
        isLoading,
        startWorkout,
        completeExercise,
        advanceToNextExercise,
        finishWorkout,
        cancelWorkout,
        updateStreak,
        getWorkoutsThisWeek,
        getTodaysWorkout,
        clearHistory,
        refreshData,
      }}
    >
      {children}
    </WorkoutContext.Provider>
  );
}

export function useWorkout() {
  const context = useContext(WorkoutContext);
  if (context === undefined) {
    throw new Error('useWorkout must be used within a WorkoutProvider');
  }
  return context;
}
