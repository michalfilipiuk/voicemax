import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Button } from '@/components/buttons';
import { ThemedText } from '@/components/themed-text';
import { useThemeColor } from '@/hooks/use-theme-color';

export type FooterVariant =
  | 'none'
  | 'oneButton'
  | 'twoButtonsVertical'
  | 'twoButtonsHorizontal'
  | 'oneButtonRight';

export type FooterProps = {
  /** Footer variant */
  variant?: FooterVariant;
  /** Primary button label */
  primaryLabel?: string;
  /** Secondary button label */
  secondaryLabel?: string;
  /** Callback when primary button is pressed */
  onPrimaryPress?: () => void;
  /** Callback when secondary button is pressed */
  onSecondaryPress?: () => void;
  /** Whether primary button is disabled */
  primaryDisabled?: boolean;
  /** Whether secondary button is disabled */
  secondaryDisabled?: boolean;
  /** Optional text below buttons */
  text?: string;
  /** Optional container style */
  style?: ViewStyle;
};

export function Footer({
  variant = 'oneButton',
  primaryLabel = 'Continue',
  secondaryLabel = 'Cancel',
  onPrimaryPress,
  onSecondaryPress,
  primaryDisabled = false,
  secondaryDisabled = false,
  text,
  style,
}: FooterProps) {
  const bgMain = useThemeColor({}, 'bgMain');
  const contentStrong = useThemeColor({}, 'contentStrong');
  const insets = useSafeAreaInsets();

  // No content variant
  if (variant === 'none') {
    return null;
  }

  const renderContent = () => {
    switch (variant) {
      case 'oneButton':
        return (
          <View style={styles.content}>
            <Button
              title={primaryLabel}
              variant="primary"
              size="lg"
              onPress={onPrimaryPress}
              disabled={primaryDisabled}
              style={styles.fullWidthButton}
            />
            {text && (
              <ThemedText type="bodyRegular" style={[styles.text, { color: contentStrong }]}>
                {text}
              </ThemedText>
            )}
          </View>
        );

      case 'twoButtonsVertical':
        return (
          <View style={styles.content}>
            <Button
              title={primaryLabel}
              variant="primary"
              size="lg"
              onPress={onPrimaryPress}
              disabled={primaryDisabled}
              style={styles.fullWidthButton}
            />
            <Button
              title={secondaryLabel}
              variant="secondary"
              size="lg"
              onPress={onSecondaryPress}
              disabled={secondaryDisabled}
              style={styles.fullWidthButton}
            />
            {text && (
              <ThemedText type="bodyRegular" style={[styles.text, { color: contentStrong }]}>
                {text}
              </ThemedText>
            )}
          </View>
        );

      case 'twoButtonsHorizontal':
        return (
          <View style={styles.contentHorizontal}>
            <Button
              title={secondaryLabel}
              variant="secondary"
              size="lg"
              onPress={onSecondaryPress}
              disabled={secondaryDisabled}
              style={styles.flexButton}
            />
            <Button
              title={primaryLabel}
              variant="primary"
              size="lg"
              onPress={onPrimaryPress}
              disabled={primaryDisabled}
              style={styles.flexButton}
            />
          </View>
        );

      case 'oneButtonRight':
        return (
          <View style={styles.contentRight}>
            <Button
              title={primaryLabel}
              variant="primary"
              size="lg"
              onPress={onPrimaryPress}
              disabled={primaryDisabled}
            />
          </View>
        );

      default:
        return null;
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: bgMain, paddingBottom: insets.bottom }, style]}>
      {renderContent()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  content: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 12,
    gap: 16,
    alignItems: 'center',
  },
  contentHorizontal: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 12,
    flexDirection: 'row',
    gap: 16,
  },
  contentRight: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 12,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  fullWidthButton: {
    width: '100%',
  },
  flexButton: {
    flex: 1,
  },
  text: {
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
  },
});
