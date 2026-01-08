import * as Haptics from 'expo-haptics';
import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

import { useThemeColor } from '@/hooks/use-theme-color';
import { SpringConfig } from '@/styles/animation';
import { Opacity, Rounded } from '@/styles/spacing';

export type RadioButtonProps = {
  /** Whether the radio button is selected */
  selected: boolean;
  /** Callback when the radio button is pressed */
  onSelect: () => void;
  /** Whether the radio button is disabled */
  disabled?: boolean;
  /** Accessibility label for screen readers */
  accessibilityLabel?: string;
};

export function RadioButton({
  selected,
  onSelect,
  disabled = false,
  accessibilityLabel,
}: RadioButtonProps) {
  // Theme colors
  const alphaStrong = useThemeColor({}, 'alphaStrong');
  const brandContent = useThemeColor({}, 'brandContent');
  // Dot color (always light for contrast on brand background)
  const dotColor = useThemeColor({}, 'contentOnBrand');

  // Animation value for scale on press
  const scale = useSharedValue(1);

  const handlePressIn = () => {
    scale.value = withSpring(0.9, SpringConfig.control);
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, SpringConfig.control);
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

  return (
    <Pressable
      onPress={handlePress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled}
      hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
      accessibilityRole="radio"
      accessibilityState={{ checked: selected, disabled }}
      accessibilityLabel={accessibilityLabel}
    >
      <Animated.View
        style={[
          styles.container,
          containerAnimatedStyle,
          {
            backgroundColor: selected ? brandContent : 'transparent',
            borderColor: selected ? brandContent : alphaStrong,
            borderWidth: selected ? 0 : 1,
            opacity: disabled ? Opacity.subtle : Opacity.full,
          },
        ]}
      >
        {selected && <View style={[styles.dot, { backgroundColor: dotColor }]} />}
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 20,
    height: 20,
    ...Rounded.full,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  dot: {
    width: 8,
    height: 8,
    ...Rounded.full,
  },
});
