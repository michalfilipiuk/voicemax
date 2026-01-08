import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from 'react';

import {
  getUserProfile,
  saveUserProfile,
  clearUserProfile,
  generateId,
} from '@/services/storage';
import type {
  UserProfile,
  AgeRange,
  PrimaryGoal,
  VoicePerception,
  ExperienceLevel,
  DailyCommitment,
} from '@/types';
import { DEFAULT_USER_PROFILE } from '@/types';

type UserContextType = {
  user: UserProfile;
  isLoading: boolean;
  hasCompletedOnboarding: boolean;
  updateUser: (updates: Partial<UserProfile>) => Promise<void>;
  setOnboardingStep: (step: number) => Promise<void>;
  completeOnboarding: () => Promise<void>;
  resetUser: () => Promise<void>;
  setFirstName: (name: string) => Promise<void>;
  setAgeRange: (age: AgeRange) => Promise<void>;
  setPrimaryGoal: (goal: PrimaryGoal) => Promise<void>;
  setVoicePerception: (perception: VoicePerception) => Promise<void>;
  setExperienceLevel: (level: ExperienceLevel) => Promise<void>;
  setDailyCommitment: (commitment: DailyCommitment) => Promise<void>;
  setBaselinePitch: (pitch: number) => Promise<void>;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile>(DEFAULT_USER_PROFILE);
  const [isLoading, setIsLoading] = useState(true);

  // Load user profile on mount
  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const savedProfile = await getUserProfile();
      if (savedProfile) {
        setUser(savedProfile);
      } else {
        // Create new user profile
        const newProfile: UserProfile = {
          ...DEFAULT_USER_PROFILE,
          id: generateId(),
          createdAt: new Date().toISOString(),
        };
        setUser(newProfile);
        await saveUserProfile(newProfile);
      }
    } catch (error) {
      console.error('Error loading user:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateUser = useCallback(
    async (updates: Partial<UserProfile>) => {
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
      await saveUserProfile(updatedUser);
    },
    [user]
  );

  const setOnboardingStep = useCallback(
    async (step: number) => {
      await updateUser({ onboardingStep: step });
    },
    [updateUser]
  );

  const completeOnboarding = useCallback(async () => {
    await updateUser({ onboardingCompleted: true });
  }, [updateUser]);

  const resetUser = useCallback(async () => {
    await clearUserProfile();
    const newProfile: UserProfile = {
      ...DEFAULT_USER_PROFILE,
      id: generateId(),
      createdAt: new Date().toISOString(),
    };
    setUser(newProfile);
    await saveUserProfile(newProfile);
  }, []);

  // Convenience setters for onboarding
  const setFirstName = useCallback(
    async (firstName: string) => {
      await updateUser({ firstName });
    },
    [updateUser]
  );

  const setAgeRange = useCallback(
    async (ageRange: AgeRange) => {
      await updateUser({ ageRange });
    },
    [updateUser]
  );

  const setPrimaryGoal = useCallback(
    async (primaryGoal: PrimaryGoal) => {
      await updateUser({ primaryGoal });
    },
    [updateUser]
  );

  const setVoicePerception = useCallback(
    async (voicePerception: VoicePerception) => {
      await updateUser({ voicePerception });
    },
    [updateUser]
  );

  const setExperienceLevel = useCallback(
    async (experienceLevel: ExperienceLevel) => {
      await updateUser({ experienceLevel });
    },
    [updateUser]
  );

  const setDailyCommitment = useCallback(
    async (dailyCommitment: DailyCommitment) => {
      await updateUser({ dailyCommitment });
    },
    [updateUser]
  );

  const setBaselinePitch = useCallback(
    async (pitch: number) => {
      // Calculate target pitch (realistic 3-month goal)
      const targetPitch = Math.round(pitch - Math.min(pitch * 0.12, 25));
      await updateUser({ baselinePitch: pitch, targetPitch });
    },
    [updateUser]
  );

  return (
    <UserContext.Provider
      value={{
        user,
        isLoading,
        hasCompletedOnboarding: user.onboardingCompleted,
        updateUser,
        setOnboardingStep,
        completeOnboarding,
        resetUser,
        setFirstName,
        setAgeRange,
        setPrimaryGoal,
        setVoicePerception,
        setExperienceLevel,
        setDailyCommitment,
        setBaselinePitch,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
