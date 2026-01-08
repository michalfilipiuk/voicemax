import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Card } from '@/components/cards';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useUser } from '@/context/UserContext';
import { useVoice } from '@/context/VoiceContext';
import { useWorkout } from '@/context/WorkoutContext';
import { useThemeColor } from '@/hooks/use-theme-color';
import { Spacing } from '@/styles/spacing';

export default function ProgressScreen() {
  const insets = useSafeAreaInsets();
  const { user } = useUser();
  const { measurements } = useVoice();
  const { progress } = useWorkout();
  const brandContent = useThemeColor({}, 'brandContent');
  const contentNormal = useThemeColor({}, 'contentNormal');
  const contentSubtle = useThemeColor({}, 'contentSubtle');
  const successContent = useThemeColor({}, 'successContent');

  // Calculate improvement
  const baseline = user.baselinePitch || 0;
  const latest =
    measurements.length > 0 ? measurements[measurements.length - 1].pitchHz : baseline;
  const improvement = baseline - latest;

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
          <ThemedText type="headlineLarge">Your Progress</ThemedText>
          <ThemedText type="bodyRegular" style={{ color: contentNormal }}>
            Track your voice training journey
          </ThemedText>
        </View>

        {/* Voice Progress Card */}
        <Card variant="elevated" style={styles.card}>
          <ThemedText type="bodyRegularMedium">Voice Progress</ThemedText>
          <View style={styles.pitchComparison}>
            <View style={styles.pitchItem}>
              <ThemedText type="bodySmall" style={{ color: contentSubtle }}>
                Baseline
              </ThemedText>
              <ThemedText type="headlineMedium" style={{ color: brandContent }}>
                {baseline || '--'} Hz
              </ThemedText>
            </View>
            <View style={styles.pitchItem}>
              <ThemedText type="bodySmall" style={{ color: contentSubtle }}>
                Current
              </ThemedText>
              <ThemedText type="headlineMedium" style={{ color: brandContent }}>
                {latest || '--'} Hz
              </ThemedText>
            </View>
            <View style={styles.pitchItem}>
              <ThemedText type="bodySmall" style={{ color: contentSubtle }}>
                Change
              </ThemedText>
              <ThemedText
                type="headlineMedium"
                style={{ color: improvement > 0 ? successContent : contentNormal }}
              >
                {improvement > 0 ? `-${improvement}` : improvement || '--'} Hz
              </ThemedText>
            </View>
          </View>
        </Card>

        {/* Training Stats Card */}
        <Card variant="elevated" style={styles.card}>
          <ThemedText type="bodyRegularMedium">Training Stats</ThemedText>
          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <ThemedText type="headlineLarge" style={{ color: brandContent }}>
                {progress.totalWorkouts}
              </ThemedText>
              <ThemedText type="bodySmall" style={{ color: contentSubtle }}>
                Total Workouts
              </ThemedText>
            </View>
            <View style={styles.statItem}>
              <ThemedText type="headlineLarge" style={{ color: brandContent }}>
                {progress.totalMinutes}
              </ThemedText>
              <ThemedText type="bodySmall" style={{ color: contentSubtle }}>
                Minutes Trained
              </ThemedText>
            </View>
            <View style={styles.statItem}>
              <ThemedText type="headlineLarge" style={{ color: brandContent }}>
                {progress.currentStreak}
              </ThemedText>
              <ThemedText type="bodySmall" style={{ color: contentSubtle }}>
                Current Streak
              </ThemedText>
            </View>
            <View style={styles.statItem}>
              <ThemedText type="headlineLarge" style={{ color: brandContent }}>
                {progress.longestStreak}
              </ThemedText>
              <ThemedText type="bodySmall" style={{ color: contentSubtle }}>
                Best Streak
              </ThemedText>
            </View>
          </View>
        </Card>

        {/* Measurement History */}
        <Card variant="elevated" style={styles.card}>
          <ThemedText type="bodyRegularMedium">Recent Measurements</ThemedText>
          {measurements.length > 0 ? (
            <View style={styles.measurementsList}>
              {measurements
                .slice(-5)
                .reverse()
                .map((measurement) => (
                  <View key={measurement.id} style={styles.measurementItem}>
                    <ThemedText type="bodyRegular">
                      {measurement.pitchHz} Hz
                    </ThemedText>
                    <ThemedText type="bodySmall" style={{ color: contentSubtle }}>
                      {new Date(measurement.timestamp).toLocaleDateString()}
                    </ThemedText>
                  </View>
                ))}
            </View>
          ) : (
            <ThemedText type="bodyRegular" style={{ color: contentSubtle }}>
              No measurements yet. Complete a voice test to see your progress.
            </ThemedText>
          )}
        </Card>
      </ScrollView>
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
    paddingBottom: Spacing.xl,
    gap: Spacing.lg,
  },
  header: {
    gap: Spacing.xs,
  },
  card: {
    padding: Spacing.lg,
    gap: Spacing.md,
  },
  pitchComparison: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  pitchItem: {
    alignItems: 'center',
    gap: Spacing.xs,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  statItem: {
    width: '50%',
    alignItems: 'center',
    paddingVertical: Spacing.md,
    gap: Spacing.xs,
  },
  measurementsList: {
    gap: Spacing.sm,
  },
  measurementItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: Spacing.sm,
  },
});
