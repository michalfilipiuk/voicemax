import React from 'react';
import { StyleSheet, View, Pressable } from 'react-native';
import * as Haptics from 'expo-haptics';

import { ThemedText } from '@/components/themed-text';
import { useThemeColor } from '@/hooks/use-theme-color';
import { Rounded } from '@/styles/spacing';

export type TabOption<T extends string = string> = {
  /** Unique value for this tab */
  value: T;
  /** Label text for the tab */
  label: string;
};

export type TabsProps<T extends string = string> = {
  /** Array of tab options (minimum 2) */
  options: TabOption<T>[];
  /** Currently selected value */
  value: T;
  /** Callback when selection changes */
  onValueChange: (value: T) => void;
  /** Whether the tabs are disabled */
  disabled?: boolean;
};

export function Tabs<T extends string = string>({
  options,
  value,
  onValueChange,
  disabled = false,
}: TabsProps<T>) {
  // Theme colors
  const alphaSubtle = useThemeColor({}, 'alphaSubtle');
  const contentStrong = useThemeColor({}, 'contentStrong');
  const contentNormal = useThemeColor({}, 'contentNormal');

  const handlePress = (optionValue: T) => {
    if (!disabled && optionValue !== value) {
      Haptics.selectionAsync();
      onValueChange(optionValue);
    }
  };

  return (
    <View
      style={[styles.container, { opacity: disabled ? 0.5 : 1 }]}
      accessibilityRole="tablist"
    >
      {options.map((option) => {
        const isSelected = option.value === value;

        return (
          <Pressable
            key={option.value}
            onPress={() => handlePress(option.value)}
            disabled={disabled}
            accessibilityRole="tab"
            accessibilityState={{ selected: isSelected, disabled }}
            accessibilityLabel={option.label}
            style={[
              styles.tab,
              isSelected && { backgroundColor: alphaSubtle },
            ]}
          >
            <ThemedText
              type="bodyLargeMedium"
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
    gap: 4,
  },
  tab: {
    height: 40,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
    ...Rounded.full,
  },
  text: {
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 20,
  },
});
