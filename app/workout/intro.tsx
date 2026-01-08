import { CheckmarkCircle02Icon, Clock01Icon, Cancel01Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react-native';
import * as Haptics from 'expo-haptics';
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Button } from '@/components/buttons';
import { Card } from '@/components/cards';
import { PageHeader } from '@/components/navigation';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { getDefaultWorkoutExercises, getEstimatedWorkoutDuration } from '@/constants/exercises';
import { useWorkout } from '@/context/WorkoutContext';
import { useThemeColor } from '@/hooks/use-theme-color';
import { Spacing } from '@/styles/spacing';

export default function WorkoutIntroScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { startWorkout, getTodaysWorkout } = useWorkout();

  const brandContent = useThemeColor({}, 'brandContent');
  const contentNormal = useThemeColor({}, 'contentNormal');
  const contentSubtle = useThemeColor({}, 'contentSubtle');
  const successContent = useThemeColor({}, 'successContent');
  const bgSecondary = useThemeColor({}, 'bgSecondary');

  const exercises = getDefaultWorkoutExercises();
  const estimatedMinutes = getEstimatedWorkoutDuration();
  const todaysWorkout = getTodaysWorkout();
  const isAlreadyCompleted = !!todaysWorkout;

  const handleStartWorkout = async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    await startWorkout();
    router.push('/workout/exercise');
  };

  const handleClose = () => {
    router.back();
  };

  return (
    <ThemedView style={styles.container}>
      <PageHeader
        variant="default"
        title="Daily Training"
        leftIcon={<HugeiconsIcon icon={Cancel01Icon} size={20} />}
        onLeftPress={handleClose}
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Summary Card */}
        <Card variant="elevated" style={styles.summaryCard}>
          <View style={styles.summaryRow}>
            <View style={[styles.iconCircle, { backgroundColor: bgSecondary }]}>
              <HugeiconsIcon icon={Clock01Icon} size={24} color={brandContent} />
            </View>
            <View>
              <ThemedText type="headlineSmall">~{estimatedMinutes} minutes</ThemedText>
              <ThemedText type="bodySmall" style={{ color: contentSubtle }}>
                {exercises.length} exercises
              </ThemedText>
            </View>
          </View>

          {isAlreadyCompleted && (
            <View style={[styles.completedBanner, { backgroundColor: successContent + '15' }]}>
              <HugeiconsIcon icon={CheckmarkCircle02Icon} size={20} color={successContent} />
              <ThemedText type="bodySmall" style={{ color: successContent }}>
                You already completed today's workout!
              </ThemedText>
            </View>
          )}
        </Card>

        {/* Exercise List */}
        <View style={styles.exerciseList}>
          <ThemedText type="bodySmallMedium" style={{ color: contentSubtle }}>
            TODAY'S EXERCISES
          </ThemedText>

          {exercises.map((exercise, index) => (
            <Card key={exercise.id} variant="filled" style={styles.exerciseCard}>
              <View style={styles.exerciseNumber}>
                <ThemedText type="bodySmallMedium" style={{ color: brandContent }}>
                  {index + 1}
                </ThemedText>
              </View>
              <View style={styles.exerciseInfo}>
                <ThemedText type="bodyRegularMedium">{exercise.name}</ThemedText>
                <ThemedText type="bodySmall" style={{ color: contentNormal }}>
                  {exercise.description}
                </ThemedText>
              </View>
            </Card>
          ))}
        </View>

        {/* Tips */}
        <Card variant="filled" style={styles.tipsCard}>
          <ThemedText type="bodySmallMedium" style={{ color: contentSubtle }}>
            TIPS FOR BEST RESULTS
          </ThemedText>
          <ThemedText type="bodySmall" style={{ color: contentNormal }}>
            • Find a quiet space where you can focus{'\n'}
            • Stand or sit with good posture{'\n'}
            • Stay relaxed - tension affects your voice{'\n'}
            • Hydrate before and after
          </ThemedText>
        </Card>
      </ScrollView>

      {/* Footer */}
      <View style={[styles.footer, { paddingBottom: insets.bottom + Spacing.md }]}>
        <Button
          title={isAlreadyCompleted ? 'Train Again' : 'Start Training'}
          variant="primary"
          size="lg"
          onPress={handleStartWorkout}
          style={styles.startButton}
        />
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.lg,
    gap: Spacing.lg,
  },
  summaryCard: {
    padding: Spacing.lg,
    gap: Spacing.md,
  },
  summaryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  completedBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    padding: Spacing.md,
    borderRadius: 12,
  },
  exerciseList: {
    gap: Spacing.sm,
  },
  exerciseCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.md,
    gap: Spacing.md,
  },
  exerciseNumber: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(184, 150, 62, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  exerciseInfo: {
    flex: 1,
    gap: 2,
  },
  tipsCard: {
    padding: Spacing.lg,
    gap: Spacing.sm,
  },
  footer: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.md,
  },
  startButton: {
    width: '100%',
  },
});
