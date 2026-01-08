import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';

import { useThemeColor } from '@/hooks/use-theme-color';
import { Rounded } from '@/styles/spacing';

export type ProgressBarProps = {
  /** Current step (1-indexed) */
  currentStep: number;
  /** Total number of steps */
  totalSteps: number;
  /** Optional custom style for the container */
  style?: ViewStyle;
};

export function ProgressBar({ currentStep, totalSteps, style }: ProgressBarProps) {
  const alphaSubtle = useThemeColor({}, 'alphaSubtle');
  const brandContent = useThemeColor({}, 'brandContent');

  // Calculate progress percentage (0-100)
  const progress = Math.min(Math.max((currentStep / totalSteps) * 100, 0), 100);

  return (
    <View style={[styles.track, { backgroundColor: alphaSubtle }, style]}>
      <View
        style={[
          styles.fill,
          {
            backgroundColor: brandContent,
            width: `${progress}%`,
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    height: 8,
    width: '100%',
    ...Rounded.full,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    ...Rounded.full,
  },
});
