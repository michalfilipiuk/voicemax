import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { StreakDisplay, VoiceStatsCard, WorkoutCard } from '@/components/dashboard';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useUser } from '@/context/UserContext';
import { useVoice } from '@/context/VoiceContext';
import { useWorkout } from '@/context/WorkoutContext';
import { Spacing } from '@/styles/spacing';

export default function DashboardScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { user } = useUser();
  const { latestMeasurement, getPitchTrend } = useVoice();
  const { progress, getTodaysWorkout } = useWorkout();

  const todaysWorkout = getTodaysWorkout();
  const isWorkoutCompleted = !!todaysWorkout;
  const pitchTrend = getPitchTrend();

  // Map trend to component format
  const trend = pitchTrend === 'improving' ? 'down' : pitchTrend === 'declining' ? 'up' : undefined;

  const handleMeasureVoice = () => {
    router.push('/measure/intro');
  };

  const handleStartWorkout = () => {
    router.push('/workout/intro' as any);
  };

  const greeting = getGreeting();
  const displayName = user.firstName || 'there';

  return (
    <ThemedView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[
          styles.content,
          { paddingTop: insets.top + Spacing.md },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.greetingSection}>
            <ThemedText type="headlineMedium">
              {greeting}, {displayName}
            </ThemedText>
            <ThemedText type="bodyRegular" style={styles.subtitle}>
              Ready to train your voice?
            </ThemedText>
          </View>
          <StreakDisplay streak={progress.currentStreak} />
        </View>

        {/* Workout Card */}
        <WorkoutCard
          isCompleted={isWorkoutCompleted}
          exercisesCompleted={todaysWorkout?.exercises.length || 0}
          totalExercises={5}
          onStartPress={handleStartWorkout}
        />

        {/* Voice Stats Card */}
        <VoiceStatsCard
          currentPitch={latestMeasurement?.pitchHz}
          baselinePitch={user.baselinePitch ?? undefined}
          trend={trend}
          onMeasurePress={handleMeasureVoice}
        />

        {/* Quick Stats */}
        <View style={styles.statsRow}>
          <StatItem
            label="Total Workouts"
            value={progress.totalWorkouts.toString()}
          />
          <StatItem
            label="Minutes Trained"
            value={progress.totalMinutes.toString()}
          />
          <StatItem
            label="Best Streak"
            value={progress.longestStreak.toString()}
          />
        </View>
      </ScrollView>
    </ThemedView>
  );
}

function StatItem({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.statItem}>
      <ThemedText type="headlineSmall">{value}</ThemedText>
      <ThemedText type="bodySmall" style={styles.statLabel}>
        {label}
      </ThemedText>
    </View>
  );
}

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
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
    paddingBottom: Spacing.xl,
    gap: Spacing.lg,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  greetingSection: {
    flex: 1,
    gap: Spacing.xs,
  },
  subtitle: {
    opacity: 0.7,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
    gap: 4,
  },
  statLabel: {
    opacity: 0.6,
    textAlign: 'center',
  },
});
