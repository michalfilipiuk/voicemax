import React from 'react';
import { StyleSheet, View, Pressable } from 'react-native';
import * as Haptics from 'expo-haptics';

import { ThemedText } from '@/components/themed-text';
import { useThemeColor } from '@/hooks/use-theme-color';
import { Rounded } from '@/styles/spacing';
import { Shadows } from '@/styles/shadows';

export type SegmentedControlOption<T extends string = string> = {
  /** Unique value for this option */
  value: T;
  /** Label text (for text variant) */
  label?: string;
  /** Icon element (for icon variant) */
  icon?: React.ReactNode;
};

export type SegmentedControlProps<T extends string = string> = {
  /** Array of options (2-5 items) */
  options: SegmentedControlOption<T>[];
  /** Currently selected value */
  value: T;
  /** Callback when selection changes */
  onValueChange: (value: T) => void;
  /** Variant: 'text' or 'icon' */
  variant?: 'text' | 'icon';
  /** Whether the control is disabled */
  disabled?: boolean;
};

export function SegmentedControl<T extends string = string>({
  options,
  value,
  onValueChange,
  variant = 'text',
  disabled = false,
}: SegmentedControlProps<T>) {
  // Theme colors
  const alphaSubtle = useThemeColor({}, 'alphaSubtle');
  const bgMain = useThemeColor({}, 'bgMain');
  const contentStrong = useThemeColor({}, 'contentStrong');
  const contentNormal = useThemeColor({}, 'contentNormal');

  const handlePress = (optionValue: T) => {
    if (!disabled && optionValue !== value) {
      Haptics.selectionAsync();
      onValueChange(optionValue);
    }
  };

  // Clone icon with proper color
  const renderIcon = (icon: React.ReactNode, isSelected: boolean) => {
    if (!icon) return null;
    if (React.isValidElement(icon)) {
      return React.cloneElement(icon as React.ReactElement<any>, {
        color: isSelected ? contentStrong : contentNormal,
        strokeWidth: 1.5,
      });
    }
    return icon;
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: alphaSubtle, opacity: disabled ? 0.5 : 1 },
      ]}
      accessibilityRole="tablist"
    >
      {options.map((option) => {
        const isSelected = option.value === value;

        if (variant === 'icon') {
          return (
            <Pressable
              key={option.value}
              onPress={() => handlePress(option.value)}
              disabled={disabled}
              accessibilityRole="tab"
              accessibilityState={{ selected: isSelected, disabled }}
              accessibilityLabel={option.label}
              style={[
                styles.iconItem,
                isSelected && [
                  styles.selectedItem,
                  { backgroundColor: bgMain },
                  Shadows.small,
                ],
              ]}
            >
              {renderIcon(option.icon, isSelected)}
            </Pressable>
          );
        }

        return (
          <Pressable
            key={option.value}
            onPress={() => handlePress(option.value)}
            disabled={disabled}
            accessibilityRole="tab"
            accessibilityState={{ selected: isSelected, disabled }}
            accessibilityLabel={option.label}
            style={[
              styles.textItem,
              isSelected && [
                styles.selectedItem,
                { backgroundColor: bgMain },
                Shadows.small,
              ],
            ]}
          >
            <ThemedText
              type="bodyRegularMedium"
              style={[
                styles.text,
                { color: isSelected ? contentStrong : contentNormal },
              ]}
            >
              {option.label}
            </ThemedText>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    padding: 4,
    gap: 4,
    ...Rounded.full,
  },
  iconItem: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    ...Rounded.full,
  },
  textItem: {
    height: 40,
    paddingHorizontal: 12,
    alignItems: 'center',
    justifyContent: 'center',
    ...Rounded.full,
  },
  selectedItem: {
    // Shadow and background applied dynamically
  },
  text: {
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 18,
  },
});
