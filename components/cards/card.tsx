import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';

import { useThemeColor } from '@/hooks/use-theme-color';
import { Shadows } from '@/styles/shadows';
import { Rounded, Spacing } from '@/styles/spacing';

export type CardVariant = 'elevated' | 'outlined' | 'filled';

export type CardProps = {
  /** Content to render inside the card */
  children: React.ReactNode;
  /** Card style variant */
  variant?: CardVariant;
  /** Optional padding override (default: 16) */
  padding?: number;
  /** Optional container style */
  style?: ViewStyle;
  /** Test ID for testing */
  testID?: string;
};

export function Card({
  children,
  variant = 'elevated',
  padding = Spacing.md,
  style,
  testID,
}: CardProps) {
  const bgMain = useThemeColor({}, 'bgMain');
  const bgSecondary = useThemeColor({}, 'bgSecondary');
  const alphaMedium = useThemeColor({}, 'alphaMedium');

  const getVariantStyles = (): ViewStyle => {
    switch (variant) {
      case 'elevated':
        return {
          backgroundColor: bgMain,
          ...Shadows.small,
        };
      case 'outlined':
        return {
          backgroundColor: bgMain,
          borderWidth: 1,
          borderColor: alphaMedium,
        };
      case 'filled':
        return {
          backgroundColor: bgSecondary,
        };
      default:
        return {
          backgroundColor: bgMain,
          ...Shadows.small,
        };
    }
  };

  return (
    <View
      testID={testID}
      style={[
        styles.container,
        getVariantStyles(),
        { padding },
        style,
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...Rounded.xl,
    overflow: 'hidden',
  },
});
