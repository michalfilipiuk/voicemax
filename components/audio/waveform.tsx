import React, { useEffect } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';

import { useThemeColor } from '@/hooks/use-theme-color';
import { Spacing, BorderRadius } from '@/styles/spacing';

interface WaveformProps {
  level: number; // 0-1 normalized audio level
  isRecording: boolean;
  barCount?: number;
  color?: string;
  style?: ViewStyle;
}

const BAR_COUNT = 30;

export function Waveform({
  level,
  isRecording,
  barCount = BAR_COUNT,
  color,
  style,
}: WaveformProps) {
  const brandContent = useThemeColor({}, 'brandContent');
  const alphaSubtle = useThemeColor({}, 'alphaSubtle');
  const barColor = color || brandContent;

  // Create animated bars
  const bars = Array.from({ length: barCount }, (_, index) => (
    <WaveformBar
      key={index}
      index={index}
      level={level}
      isRecording={isRecording}
      barCount={barCount}
      activeColor={barColor}
      inactiveColor={alphaSubtle}
    />
  ));

  return <View style={[styles.container, style]}>{bars}</View>;
}

interface WaveformBarProps {
  index: number;
  level: number;
  isRecording: boolean;
  barCount: number;
  activeColor: string;
  inactiveColor: string;
}

function WaveformBar({
  index,
  level,
  isRecording,
  barCount,
  activeColor,
  inactiveColor,
}: WaveformBarProps) {
  const height = useSharedValue(0.2);

  useEffect(() => {
    if (isRecording) {
      // Create a wave effect based on position and audio level
      const centerIndex = barCount / 2;
      const distanceFromCenter = Math.abs(index - centerIndex) / centerIndex;

      // Base height influenced by audio level
      const baseHeight = 0.2 + level * 0.6;

      // Add variation based on position (center bars are taller)
      const positionMultiplier = 1 - distanceFromCenter * 0.5;

      // Add some randomness for visual interest
      const randomFactor = 0.8 + Math.random() * 0.4;

      const targetHeight = Math.min(
        1,
        baseHeight * positionMultiplier * randomFactor
      );

      height.value = withSpring(targetHeight, {
        damping: 15,
        stiffness: 150,
      });
    } else {
      height.value = withSpring(0.2, {
        damping: 20,
        stiffness: 100,
      });
    }
  }, [level, isRecording, index, barCount]);

  const animatedStyle = useAnimatedStyle(() => ({
    height: `${height.value * 100}%`,
    backgroundColor: height.value > 0.25 ? activeColor : inactiveColor,
  }));

  return (
    <View style={styles.barContainer}>
      <Animated.View style={[styles.bar, animatedStyle]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 100,
    gap: 2,
  },
  barContainer: {
    flex: 1,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bar: {
    width: 4,
    minHeight: 4,
    borderRadius: BorderRadius.full,
  },
});
