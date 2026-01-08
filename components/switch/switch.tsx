import * as Haptics from 'expo-haptics';
import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

import { useThemeColor } from '@/hooks/use-theme-color';
import { SpringConfig } from '@/styles/animation';
import { Opacity, Rounded } from '@/styles/spacing';

const TRACK_WIDTH = 51;
const TRACK_HEIGHT = 31;
const THUMB_SIZE = 27;
const THUMB_MARGIN = 2;

export type SwitchProps = {
  /** Whether the switch is on */
  value: boolean;
  /** Callback when the switch is toggled */
  onValueChange: (value: boolean) => void;
  /** Whether the switch is disabled */
  disabled?: boolean;
  /** Accessibility label for screen readers */
  accessibilityLabel?: string;
};

export function Switch({
  value,
  onValueChange,
  disabled = false,
  accessibilityLabel,
}: SwitchProps) {
  // Theme colors
  const alphaMedium = useThemeColor({}, 'alphaMedium');
  const brandContent = useThemeColor({}, 'brandContent');
  const bgMain = useThemeColor({}, 'bgMain');

  // Animation value for thumb position and track color
  const progress = useSharedValue(value ? 1 : 0);

  // Update animation when value changes
  React.useEffect(() => {
    progress.value = withSpring(value ? 1 : 0, SpringConfig.control);
  }, [value, progress]);

  const handlePress = () => {
    if (!disabled) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      onValueChange(!value);
    }
  };

  // Animated track style
  const trackAnimatedStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      progress.value,
      [0, 1],
      [alphaMedium, brandContent]
    ),
  }));

  // Animated thumb style
  const thumbAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: progress.value * (TRACK_WIDTH - THUMB_SIZE - THUMB_MARGIN * 2),
      },
    ],
  }));

  return (
    <Pressable
      onPress={handlePress}
      disabled={disabled}
      hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
      accessibilityRole="switch"
      accessibilityState={{ checked: value, disabled }}
      accessibilityLabel={accessibilityLabel}
    >
      <Animated.View
        style={[
          styles.track,
          trackAnimatedStyle,
          { opacity: disabled ? Opacity.disabled : Opacity.full },
        ]}
      >
        <Animated.View
          style={[
            styles.thumb,
            thumbAnimatedStyle,
            { backgroundColor: bgMain },
          ]}
        />
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  track: {
    width: TRACK_WIDTH,
    height: TRACK_HEIGHT,
    ...Rounded.full,
    justifyContent: 'center',
    paddingHorizontal: THUMB_MARGIN,
  },
  thumb: {
    width: THUMB_SIZE,
    height: THUMB_SIZE,
    ...Rounded.full,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
});
