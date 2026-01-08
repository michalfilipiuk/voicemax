import { FireIcon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react-native';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

import { ThemedText } from '@/components/themed-text';
import { useThemeColor } from '@/hooks/use-theme-color';
import { Spacing, BorderRadius } from '@/styles/spacing';

interface StreakDisplayProps {
  streak: number;
  showAnimation?: boolean;
}

export function StreakDisplay({ streak, showAnimation = false }: StreakDisplayProps) {
  const brandContent = useThemeColor({}, 'brandContent');
  const bgSecondary = useThemeColor({}, 'bgSecondary');
  const contentNormal = useThemeColor({}, 'contentNormal');

  const scale = useSharedValue(1);

  React.useEffect(() => {
    if (showAnimation && streak > 0) {
      scale.value = withSequence(
        withTiming(1.2, { duration: 200 }),
        withTiming(1, { duration: 200 })
      );
    }
  }, [streak, showAnimation]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <View style={[styles.container, { backgroundColor: bgSecondary }]}>
      <Animated.View style={[styles.iconContainer, animatedStyle]}>
        <HugeiconsIcon
          icon={FireIcon}
          size={28}
          color={streak > 0 ? brandContent : contentNormal}
        />
      </Animated.View>
      <View style={styles.textContainer}>
        <ThemedText
          type="headlineSmall"
          style={{ color: streak > 0 ? brandContent : contentNormal }}
        >
          {streak}
        </ThemedText>
        <ThemedText type="bodySmall" style={{ color: contentNormal }}>
          {streak === 1 ? 'day streak' : 'day streak'}
        </ThemedText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    borderRadius: BorderRadius.full,
    gap: Spacing.sm,
  },
  iconContainer: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: Spacing.xs,
  },
});
