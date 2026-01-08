import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';

import { useThemeColor } from '@/hooks/use-theme-color';
import { Spacing } from '@/styles/spacing';

export type DividerOrientation = 'horizontal' | 'vertical';

export type DividerProps = {
  /** Orientation of the divider */
  orientation?: DividerOrientation;
  /** Spacing around the divider */
  spacing?: number;
  /** Custom color override */
  color?: string;
  /** Optional container style */
  style?: ViewStyle;
};

export function Divider({
  orientation = 'horizontal',
  spacing = Spacing.md,
  color,
  style,
}: DividerProps) {
  const alphaMedium = useThemeColor({}, 'alphaMedium');
  const dividerColor = color || alphaMedium;

  const isHorizontal = orientation === 'horizontal';

  return (
    <View
      style={[
        isHorizontal ? styles.horizontal : styles.vertical,
        {
          backgroundColor: dividerColor,
          marginVertical: isHorizontal ? spacing : 0,
          marginHorizontal: isHorizontal ? 0 : spacing,
        },
        style,
      ]}
    />
  );
}

const styles = StyleSheet.create({
  horizontal: {
    height: 1,
    width: '100%',
  },
  vertical: {
    width: 1,
    height: '100%',
  },
});
