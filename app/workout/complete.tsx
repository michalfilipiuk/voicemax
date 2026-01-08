import { CheckmarkCircle02Icon, FireIcon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react-native';
import * as Haptics from 'expo-haptics';
import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withSequence,
  withDelay,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Button } from '@/components/buttons';
import { Card } from '@/components/cards';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useWorkout } from '@/context/WorkoutContext';
import { useThemeColor } from '@/hooks/use-theme-color';
import { Spacing } from '@/styles/spacing';

export default function WorkoutCompleteScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { progress, finishWorkout, activeSession } = useWorkout();

  const brandContent = useThemeColor({}, 'brandContent');
  const successContent = useThemeColor({}, 'successContent');
  const contentNormal = useThemeColor({}, 'contentNormal');
  const bgSecondary = useThemeColor({}, 'bgSecondary');

  const scale = useSharedValue(0);
  const opacity = useSharedValue(0);

  useEffect(() => {
    // Complete the workout
    finishWorkout();

    // Trigger celebration haptics
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

    // Animate in
    scale.value = withSequence(
      withSpring(1.2, { damping: 8, stiffness: 100 }),
      withSpring(1, { damping: 12, stiffness: 100 })
    );
    opacity.value = withDelay(200, withSpring(1));
  }, []);

  const iconAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const contentAnimatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  const handleDone = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.replace('/(tabs)');
  };

  const totalExercises = activeSession?.exercises.length || 5;
  const totalMinutes = Math.ceil((activeSession?.totalDuration || 300) / 60);

  return (
    <ThemedView style={styles.container}>
      <View style={[styles.content, { paddingTop: insets.top + Spacing.xl }]}>
        {/* Success Icon */}
        <Animated.View style={[styles.iconContainer, iconAnimatedStyle]}>
          <View style={[styles.iconCircle, { backgroundColor: successContent }]}>
            <HugeiconsIcon icon={CheckmarkCircle02Icon} size={64} color="#FFFFFF" />
          </View>
        </Animated.View>

        {/* Celebration Text */}
        <Animated.View style={[styles.textSection, contentAnimatedStyle]}>
          <ThemedText type="headlineLarge" style={styles.title}>
            Workout Complete!
          </ThemedText>
          <ThemedText type="bodyRegular" style={{ color: contentNormal, textAlign: 'center' }}>
            Great job! You're one step closer to your voice goals.
          </ThemedText>
        </Animated.View>

        {/* Stats Cards */}
        <Animated.View style={[styles.statsSection, contentAnimatedStyle]}>
          <Card variant="filled" style={styles.statCard}>
            <ThemedText type="headlineMedium" style={{ color: brandContent }}>
              {totalExercises}
            </ThemedText>
            <ThemedText type="bodySmall" style={{ color: contentNormal }}>
              Exercises
            </ThemedText>
          </Card>

          <Card variant="filled" style={styles.statCard}>
            <ThemedText type="headlineMedium" style={{ color: brandContent }}>
              {totalMinutes}
            </ThemedText>
            <ThemedText type="bodySmall" style={{ color: contentNormal }}>
              Minutes
            </ThemedText>
          </Card>

          <Card variant="filled" style={styles.statCard}>
            <View style={styles.streakContent}>
              <HugeiconsIcon icon={FireIcon} size={20} color={brandContent} />
              <ThemedText type="headlineMedium" style={{ color: brandContent }}>
                {progress.currentStreak + 1}
              </ThemedText>
            </View>
            <ThemedText type="bodySmall" style={{ color: contentNormal }}>
              Day Streak
            </ThemedText>
          </Card>
        </Animated.View>

        {/* Motivation */}
        <Animated.View style={contentAnimatedStyle}>
          <Card variant="elevated" style={styles.motivationCard}>
            <ThemedText type="bodyRegular" style={{ color: contentNormal, textAlign: 'center' }}>
              Consistency is key. Come back tomorrow to keep your streak going!
            </ThemedText>
          </Card>
        </Animated.View>
      </View>

      {/* Footer */}
      <View style={[styles.footer, { paddingBottom: insets.bottom + Spacing.md }]}>
        <Button
          title="Done"
          variant="primary"
          size="lg"
          onPress={handleDone}
          style={styles.doneButton}
        />
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    gap: Spacing.xl,
  },
  iconContainer: {
    marginBottom: Spacing.md,
  },
  iconCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textSection: {
    alignItems: 'center',
    gap: Spacing.sm,
  },
  title: {
    textAlign: 'center',
  },
  statsSection: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    padding: Spacing.md,
    gap: Spacing.xs,
  },
  streakContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  motivationCard: {
    padding: Spacing.lg,
  },
  footer: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.md,
  },
  doneButton: {
    width: '100%',
  },
});
