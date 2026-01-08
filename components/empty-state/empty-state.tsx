import React from 'react';
import { StyleSheet, View, type ViewStyle } from 'react-native';

import { Button } from '@/components/buttons';
import { ThemedText } from '@/components/themed-text';
import { useThemeColor } from '@/hooks/use-theme-color';
import { IconSizes, Spacing } from '@/styles/spacing';

export type EmptyStateProps = {
  /** Title text (required) */
  title: string;
  /** Optional description text */
  description?: string;
  /** Optional icon element */
  icon?: React.ReactNode;
  /** Optional button label */
  buttonLabel?: string;
  /** Optional button press handler */
  onButtonPress?: () => void;
  /** Optional container style */
  style?: ViewStyle;
};

export function EmptyState({
  title,
  description,
  icon,
  buttonLabel,
  onButtonPress,
  style,
}: EmptyStateProps) {
  const contentNormal = useThemeColor({}, 'contentNormal');
  const contentStrong = useThemeColor({}, 'contentStrong');

  // Clone icon with appropriate color and size
  const renderIcon = () => {
    if (!icon) return null;
    if (React.isValidElement(icon)) {
      return React.cloneElement(icon as React.ReactElement<any>, {
        color: contentNormal,
        size: IconSizes.xxl,
        strokeWidth: 1.5,
      });
    }
    return icon;
  };

  return (
    <View style={[styles.container, style]}>
      {icon && <View style={styles.iconContainer}>{renderIcon()}</View>}

      <View style={styles.textContainer}>
        <ThemedText type="headlineSmall" style={[styles.title, { color: contentStrong }]}>
          {title}
        </ThemedText>

        {description && (
          <ThemedText type="bodyRegular" style={[styles.description, { color: contentNormal }]}>
            {description}
          </ThemedText>
        )}
      </View>

      {buttonLabel && onButtonPress && (
        <Button
          title={buttonLabel}
          variant="secondary"
          size="sm"
          onPress={onButtonPress}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.xxl,
    gap: Spacing.md,
  },
  iconContainer: {
    width: IconSizes.xxl,
    height: IconSizes.xxl,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.sm,
  },
  textContainer: {
    alignItems: 'center',
    gap: Spacing.sm,
  },
  title: {
    textAlign: 'center',
  },
  description: {
    textAlign: 'center',
  },
});
