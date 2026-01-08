import React from 'react';
import { StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { useThemeColor } from '@/hooks/use-theme-color';
import { Rounded, Spacing } from '@/styles/spacing';

export type BadgeType = 'default' | 'info' | 'alert' | 'error' | 'success';

export type BadgeProps = {
  /** The text to display in the badge */
  label: string;
  /** The color style of the badge */
  type?: BadgeType;
};

export function Badge({ label, type = 'default' }: BadgeProps) {
  // Theme colors
  const alphaSubtle = useThemeColor({}, 'alphaSubtle');
  const contentStrong = useThemeColor({}, 'contentStrong');
  const infoBg = useThemeColor({}, 'infoBg');
  const infoContent = useThemeColor({}, 'infoContent');
  const alertBg = useThemeColor({}, 'alertBg');
  const alertContent = useThemeColor({}, 'alertContent');
  const errorBg = useThemeColor({}, 'errorBg');
  const errorContent = useThemeColor({}, 'errorContent');
  const successBg = useThemeColor({}, 'successBg');
  const successContent = useThemeColor({}, 'successContent');

  // Get colors based on type
  const getColors = () => {
    switch (type) {
      case 'info':
        return { bg: infoBg, text: infoContent };
      case 'alert':
        return { bg: alertBg, text: alertContent };
      case 'error':
        return { bg: errorBg, text: errorContent };
      case 'success':
        return { bg: successBg, text: successContent };
      default:
        return { bg: alphaSubtle, text: contentStrong };
    }
  };

  const colors = getColors();

  return (
    <View style={[styles.container, { backgroundColor: colors.bg }]}>
      <ThemedText
        type="bodyRegularMedium"
        style={[styles.text, { color: colors.text }]}
      >
        {label}
      </ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 24,
    paddingHorizontal: Spacing.sm,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-start',
    ...Rounded.full,
  },
  text: {
    // Typography handled by ThemedText type="bodyRegularMedium"
  },
});
