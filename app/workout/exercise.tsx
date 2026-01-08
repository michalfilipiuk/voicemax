import * as Haptics from 'expo-haptics';
import { useRouter } from 'expo-router';
import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Button } from '@/components/buttons';
import {
  BreathingCircle,
  TimerDisplay,
  ExerciseInstruction,
} from '@/components/exercise';
import { PageHeader } from '@/components/navigation';
import { ProgressBar } from '@/components/progress';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { getDefaultWorkoutExercises } from '@/constants/exercises';
import { useWorkout } from '@/context/WorkoutContext';
import { useThemeColor } from '@/hooks/use-theme-color';
import type { ExerciseConfig } from '@/types';
import { Spacing } from '@/styles/spacing';

export default function ExerciseScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { completeExercise, currentExerciseIndex, advanceToNextExercise } = useWorkout();

  const brandContent = useThemeColor({}, 'brandContent');
  const contentSubtle = useThemeColor({}, 'contentSubtle');

  const exercises = getDefaultWorkoutExercises();
  const [isActive, setIsActive] = useState(true);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [currentRep, setCurrentRep] = useState(1);
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);

  const currentExercise = exercises[currentExerciseIndex];
  const isLastExercise = currentExerciseIndex === exercises.length - 1;

  // Initialize timer based on exercise type
  useEffect(() => {
    if (currentExercise.duration) {
      setTimeRemaining(currentExercise.duration);
    } else if (currentExercise.reps && currentExercise.repDuration) {
      setTimeRemaining(currentExercise.repDuration);
    }
    setCurrentRep(1);
    setCurrentPhraseIndex(0);
    setIsActive(true);
  }, [currentExerciseIndex, currentExercise]);

  // Timer countdown
  useEffect(() => {
    if (!isActive || timeRemaining <= 0) return;

    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          // Timer complete
          handleTimerComplete();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isActive, timeRemaining]);

  const handleTimerComplete = useCallback(() => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

    // Check if this is a rep-based exercise
    if (currentExercise.reps && currentRep < currentExercise.reps) {
      setCurrentRep((prev) => prev + 1);
      setTimeRemaining(currentExercise.repDuration || 8);
      return;
    }

    handleCompleteExercise();
  }, [currentExercise, currentRep]);

  const handleCompleteExercise = async () => {
    // Record exercise completion
    await completeExercise({
      exerciseId: currentExercise.id,
      completed: true,
      duration: currentExercise.duration ||
        (currentExercise.reps && currentExercise.repDuration
          ? currentExercise.reps * currentExercise.repDuration
          : 30),
    });

    if (isLastExercise) {
      router.push('/workout/complete');
    } else {
      // Advance to next exercise in context before navigating to rest
      advanceToNextExercise();
      router.push('/workout/rest');
    }
  };

  const handleNextPhrase = () => {
    if (!currentExercise.phrases) return;

    if (currentPhraseIndex < currentExercise.phrases.length - 1) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      setCurrentPhraseIndex((prev) => prev + 1);
    } else {
      handleCompleteExercise();
    }
  };

  const handleSkip = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    handleCompleteExercise();
  };

  const renderExerciseContent = () => {
    switch (currentExercise.type) {
      case 'breathing':
        return (
          <View style={styles.exerciseContent}>
            {currentExercise.phases && (
              <BreathingCircle
                phases={currentExercise.phases}
                isActive={isActive}
              />
            )}
            <TimerDisplay
              seconds={timeRemaining}
              totalSeconds={currentExercise.duration}
            />
          </View>
        );

      case 'timed':
      case 'sustained':
        return (
          <View style={styles.exerciseContent}>
            <TimerDisplay
              seconds={timeRemaining}
              totalSeconds={currentExercise.duration}
              variant="large"
            />
          </View>
        );

      case 'reps':
        return (
          <View style={styles.exerciseContent}>
            <View style={styles.repCounter}>
              <ThemedText type="headlineDisplay" style={{ color: brandContent }}>
                {currentRep}
              </ThemedText>
              <ThemedText type="bodyRegular" style={{ color: contentSubtle }}>
                of {currentExercise.reps} reps
              </ThemedText>
            </View>
            <TimerDisplay
              seconds={timeRemaining}
              totalSeconds={currentExercise.repDuration}
            />
          </View>
        );

      case 'phrase':
        return (
          <View style={styles.exerciseContent}>
            <ExerciseInstruction
              title={currentExercise.name}
              instruction={currentExercise.instruction || ''}
              phrase={currentExercise.phrases?.[currentPhraseIndex]}
              repCount={{
                current: currentPhraseIndex + 1,
                total: currentExercise.phrases?.length || 0,
              }}
            />
            <Button
              title="Next Phrase"
              variant="primary"
              size="lg"
              onPress={handleNextPhrase}
              style={styles.nextButton}
            />
          </View>
        );

      default:
        return null;
    }
  };

  return (
    <ThemedView style={styles.container}>
      {/* Progress Header */}
      <View style={[styles.header, { paddingTop: insets.top }]}>
        <View style={styles.progressSection}>
          <ThemedText type="bodySmall" style={{ color: contentSubtle }}>
            Exercise {currentExerciseIndex + 1} of {exercises.length}
          </ThemedText>
          <ProgressBar
            currentStep={currentExerciseIndex + 1}
            totalSteps={exercises.length}
          />
        </View>
      </View>

      {/* Exercise Content */}
      <View style={styles.main}>
        {currentExercise.type !== 'phrase' && (
          <ExerciseInstruction
            title={currentExercise.name}
            instruction={currentExercise.instruction || ''}
          />
        )}
        {renderExerciseContent()}
      </View>

      {/* Footer */}
      <View style={[styles.footer, { paddingBottom: insets.bottom + Spacing.md }]}>
        {currentExercise.type !== 'phrase' && (
          <Button
            title="Complete Early"
            variant="secondary"
            size="md"
            onPress={handleSkip}
          />
        )}
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.md,
  },
  progressSection: {
    gap: Spacing.sm,
  },
  main: {
    flex: 1,
    paddingHorizontal: Spacing.lg,
    gap: Spacing.xl,
  },
  exerciseContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.lg,
  },
  repCounter: {
    alignItems: 'center',
    gap: Spacing.xs,
  },
  nextButton: {
    width: '100%',
    marginTop: Spacing.lg,
  },
  footer: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.md,
    alignItems: 'center',
  },
});
