import * as Haptics from 'expo-haptics';
import { useCallback } from 'react';
import {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  WithSpringConfig,
} from 'react-native-reanimated';

export type PressAnimationConfig = {
  /** Scale value when pressed (default: 0.97) */
  scaleValue?: number;
  /** Spring configuration */
  springConfig?: WithSpringConfig;
  /** Enable haptic feedback (default: true) */
  enableHaptics?: boolean;
  /** Haptic feedback style (default: Light for buttons, Selection for controls) */
  hapticStyle?: 'light' | 'medium' | 'heavy' | 'selection';
};

export type PressAnimationResult = {
  /** Animated style to apply to the component */
  animatedStyle: { transform: { scale: number }[] };
  /** Handler for press in event */
  handlePressIn: () => void;
  /** Handler for press out event */
  handlePressOut: () => void;
  /** Trigger haptic feedback manually */
  triggerHaptics: () => void;
};

const DEFAULT_SPRING_CONFIG: WithSpringConfig = {
  damping: 50,
  stiffness: 400,
  mass: 0.5,
};

/**
 * A reusable hook for press animations with haptic feedback.
 *
 * Use this hook on all interactive components (buttons, cards, list items, etc.)
 * to provide consistent tactile feedback throughout the app.
 *
 * @example
 * ```tsx
 * function MyButton({ onPress, children }) {
 *   const { animatedStyle, handlePressIn, handlePressOut, triggerHaptics } = usePressAnimation();
 *
 *   return (
 *     <Pressable
 *       onPressIn={handlePressIn}
 *       onPressOut={handlePressOut}
 *       onPress={() => {
 *         triggerHaptics();
 *         onPress?.();
 *       }}
 *     >
 *       <Animated.View style={animatedStyle}>
 *         {children}
 *       </Animated.View>
 *     </Pressable>
 *   );
 * }
 * ```
 *
 * @example With custom config
 * ```tsx
 * const { animatedStyle, handlePressIn, handlePressOut } = usePressAnimation({
 *   scaleValue: 0.95,
 *   hapticStyle: 'medium',
 * });
 * ```
 */
export function usePressAnimation(config?: PressAnimationConfig): PressAnimationResult {
  const {
    scaleValue = 0.97,
    springConfig = DEFAULT_SPRING_CONFIG,
    enableHaptics = true,
    hapticStyle = 'light',
  } = config ?? {};

  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = useCallback(() => {
    scale.value = withSpring(scaleValue, springConfig);
  }, [scaleValue, springConfig]);

  const handlePressOut = useCallback(() => {
    scale.value = withSpring(1, springConfig);
  }, [springConfig]);

  const triggerHaptics = useCallback(() => {
    if (!enableHaptics) return;

    switch (hapticStyle) {
      case 'light':
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        break;
      case 'medium':
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        break;
      case 'heavy':
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
        break;
      case 'selection':
        Haptics.selectionAsync();
        break;
    }
  }, [enableHaptics, hapticStyle]);

  return {
    animatedStyle,
    handlePressIn,
    handlePressOut,
    triggerHaptics,
  };
}

/**
 * Preset configurations for common use cases
 */
export const PressAnimationPresets = {
  /** For primary action buttons */
  button: {
    scaleValue: 0.97,
    hapticStyle: 'light' as const,
  },
  /** For cards and larger touch targets */
  card: {
    scaleValue: 0.98,
    hapticStyle: 'light' as const,
  },
  /** For small controls like checkboxes, radio buttons */
  control: {
    scaleValue: 0.9,
    hapticStyle: 'selection' as const,
  },
  /** For list items and navigation items */
  listItem: {
    scaleValue: 0.98,
    hapticStyle: 'selection' as const,
  },
  /** For icon buttons */
  iconButton: {
    scaleValue: 0.9,
    hapticStyle: 'light' as const,
  },
} as const;
