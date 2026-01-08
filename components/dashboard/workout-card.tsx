import { Dumbbell01Icon, CheckmarkCircle02Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react-native';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import { Button } from '@/components/buttons';
import { Card } from '@/components/cards';
import { ProgressBar } from '@/components/progress';
import { ThemedText } from '@/components/themed-text';
import { useThemeColor } from '@/hooks/use-theme-color';
import { Spacing } from '@/styles/spacing';

interface WorkoutCardProps {
  isCompleted: boolean;
  exercisesCompleted?: number;
  totalExercises?: number;
  onStartPress: () => void;
}

export function WorkoutCard({
  isCompleted,
  exercisesCompleted = 0,
  totalExercises = 5,
  onStartPress,
}: WorkoutCardProps) {
  const brandContent = useThemeColor({}, 'brandContent');
  const contentNormal = useThemeColor({}, 'contentNormal');
  const contentSubtle = useThemeColor({}, 'contentSubtle');
  const successContent = useThemeColor({}, 'successContent');
  const bgSecondary = useThemeColor({}, 'bgSecondary');

  return (
    <Card variant="elevated" style={styles.card}>
      <View style={styles.header}>
        <View
          style={[
            styles.iconCircle,
            {
              backgroundColor: isCompleted
                ? successContent + '20'
                : bgSecondary,
            },
          ]}
        >
          <HugeiconsIcon
            icon={isCompleted ? CheckmarkCircle02Icon : Dumbbell01Icon}
            size={24}
            color={isCompleted ? successContent : brandContent}
          />
        </View>
        <View style={styles.headerText}>
          <ThemedText type="bodyRegularMedium">
            {isCompleted ? "Today's Training" : 'Daily Training'}
          </ThemedText>
          <ThemedText type="bodySmall" style={{ color: contentSubtle }}>
            {isCompleted
              ? 'Completed!'
              : `${totalExercises} exercises · ~10 min`}
          </ThemedText>
        </View>
      </View>

      {!isCompleted && exercisesCompleted > 0 && (
        <View style={styles.progressSection}>
          <View style={styles.progressHeader}>
            <ThemedText type="bodySmall" style={{ color: contentNormal }}>
              Progress
            </ThemedText>
            <ThemedText type="bodySmall" style={{ color: contentSubtle }}>
              {exercisesCompleted}/{totalExercises}
            </ThemedText>
          </View>
          <ProgressBar currentStep={exercisesCompleted} totalSteps={totalExercises} />
        </View>
      )}

      {isCompleted ? (
        <View style={[styles.completedBanner, { backgroundColor: successContent + '15' }]}>
          <ThemedText type="bodySmall" style={{ color: successContent }}>
            Great work! Come back tomorrow for your next session.
          </ThemedText>
        </View>
      ) : (
        <Button
          title={exercisesCompleted > 0 ? 'Continue Workout' : 'Start Workout'}
          variant="primary"
          size="lg"
          onPress={onStartPress}
        />
      )}
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: Spacing.lg,
    gap: Spacing.md,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  headerText: {
    flex: 1,
    gap: 2,
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressSection: {
    gap: Spacing.xs,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  completedBanner: {
    padding: Spacing.md,
    borderRadius: 12,
  },
});
