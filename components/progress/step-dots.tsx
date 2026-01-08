import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';

import { useThemeColor } from '@/hooks/use-theme-color';
import { Rounded } from '@/styles/spacing';

export type StepDotsProps = {
  /** Current step (1-indexed) */
  currentStep: number;
  /** Total number of steps */
  totalSteps: number;
  /** Optional custom style for the container */
  style?: ViewStyle;
};

export function StepDots({ currentStep, totalSteps, style }: StepDotsProps) {
  const contentStrong = useThemeColor({}, 'contentStrong');
  const alphaMedium = useThemeColor({}, 'alphaMedium');

  return (
    <View style={[styles.container, style]}>
      {Array.from({ length: totalSteps }, (_, index) => {
        const stepNumber = index + 1;
        const isActive = stepNumber === currentStep;

        return (
          <View
            key={index}
            style={[
              styles.dot,
              { backgroundColor: isActive ? contentStrong : alphaMedium },
            ]}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  dot: {
    width: 8,
    height: 8,
    ...Rounded.full,
  },
});
