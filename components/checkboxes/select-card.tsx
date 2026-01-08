import { Tick02Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react-native';
import * as Haptics from 'expo-haptics';
import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

import { ThemedText } from '@/components/themed-text';
import { useThemeColor } from '@/hooks/use-theme-color';
import { SpringConfig } from '@/styles/animation';
import { Shadows } from '@/styles/shadows';
import { Opacity, Rounded, Spacing } from '@/styles/spacing';

export type SelectCardProps = {
  /** Title text for the card */
  title: string;
  /** Optional description text */
  description?: string;
  /** Optional icon element to display on the left */
  icon?: React.ReactNode;
  /** Whether the card is selected */
  selected: boolean;
  /** Callback when the card is pressed */
  onSelect: () => void;
  /** Selection type: 'radio' shows radio indicator, 'checkbox' shows checkbox indicator */
  type?: 'radio' | 'checkbox';
  /** Whether the card is disabled */
  disabled?: boolean;
  /** Accessibility label for screen readers */
  accessibilityLabel?: string;
};

export function SelectCard({
  title,
  description,
  icon,
  selected,
  onSelect,
  type = 'radio',
  disabled = false,
  accessibilityLabel,
}: SelectCardProps) {
  // Theme colors
  const bgMain = useThemeColor({}, 'bgMain');
  const alphaMedium = useThemeColor({}, 'alphaMedium');
  const brandContent = useThemeColor({}, 'brandContent');
  const contentStrong = useThemeColor({}, 'contentStrong');
  const contentNormal = useThemeColor({}, 'contentNormal');
  // Indicator color (always light for contrast on brand background)
  const indicatorColor = useThemeColor({}, 'contentOnBrand');

  // Animation value for scale on press
  const scale = useSharedValue(1);

  const handlePressIn = () => {
    scale.value = withSpring(0.98, SpringConfig.card);
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, SpringConfig.card);
  };

  const handlePress = () => {
    if (!disabled) {
      Haptics.selectionAsync();
      onSelect();
    }
  };

  // Container animation style
  const containerAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  // Clone icon with proper color
  const renderIcon = () => {
    if (!icon) return null;
    if (React.isValidElement(icon)) {
      return React.cloneElement(icon as React.ReactElement<any>, {
        color: contentStrong,
        strokeWidth: 1.5,
      });
    }
    return icon;
  };

  return (
    <Pressable
      onPress={handlePress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled}
      accessibilityRole={type === 'radio' ? 'radio' : 'checkbox'}
      accessibilityState={{ checked: selected, disabled }}
      accessibilityLabel={accessibilityLabel || title}
    >
      <Animated.View
        style={[
          styles.container,
          containerAnimatedStyle,
          Shadows.small,
          {
            backgroundColor: bgMain,
            borderColor: selected ? brandContent : alphaMedium,
            borderWidth: selected ? 2 : 1,
            // Compensate padding for border width difference to prevent layout shift
            paddingHorizontal: selected ? Spacing.md : Spacing.md + 1,
            paddingVertical: selected ? 20 : 21,
            opacity: disabled ? Opacity.subtle : Opacity.full,
          },
        ]}
      >
        {/* Icon */}
        {icon && <View style={styles.iconContainer}>{renderIcon()}</View>}

        {/* Content */}
        <View style={styles.content}>
          <ThemedText
            type="bodyLargeMedium"
            style={{ color: contentStrong }}
          >
            {title}
          </ThemedText>
          {description && (
            <ThemedText
              type="bodySmall"
              style={{ color: contentNormal }}
            >
              {description}
            </ThemedText>
          )}
        </View>

        {/* Selection Indicator */}
        <View
          style={[
            styles.indicator,
            type === 'radio' ? styles.radioIndicator : styles.checkboxIndicator,
            { backgroundColor: brandContent, opacity: selected ? 1 : 0 },
          ]}
        >
          {type === 'radio' ? (
            <View style={[styles.radioDot, { backgroundColor: indicatorColor }]} />
          ) : (
            <View style={styles.checkmark}>
              <HugeiconsIcon
                icon={Tick02Icon}
                size={14}
                color={indicatorColor}
                strokeWidth={2.5}
              />
            </View>
          )}
        </View>
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing.md - 4, // 12px
    ...Rounded.xl,
  },
  iconContainer: {
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    gap: Spacing.xs,
  },
  indicator: {
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioIndicator: {
    ...Rounded.full,
  },
  checkboxIndicator: {
    ...Rounded.sm,
  },
  radioDot: {
    width: 8,
    height: 8,
    ...Rounded.full,
  },
  checkmark: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
