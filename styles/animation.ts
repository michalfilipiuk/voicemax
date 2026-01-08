import { WithSpringConfig } from 'react-native-reanimated';

/**
 * Animation duration constants (in milliseconds)
 */
export const Duration = {
  fast: 150,
  normal: 200,
  slow: 300,
} as const;

/**
 * Spring configurations for various animation types
 */
export const SpringConfig: Record<string, WithSpringConfig> = {
  /** Snappy spring for buttons - quick response with minimal bounce */
  button: {
    damping: 25,
    stiffness: 600,
  },
  /** Smooth spring for controls (checkbox, radio, switch) */
  control: {
    damping: 50,
    stiffness: 400,
  },
  /** Subtle spring for cards and larger touch targets */
  card: {
    damping: 50,
    stiffness: 400,
  },
  /** Snappy spring for modals and sheets - quick with minimal bounce */
  modal: {
    damping: 50,
    stiffness: 500,
    mass: 0.5,
  },
} as const;

/**
 * Gesture thresholds for dismiss behaviors
 */
export const GestureThreshold = {
  /** Distance in pixels to trigger dismiss */
  dismissDistance: 100,
  /** Velocity in pixels/second to trigger dismiss */
  dismissVelocity: 500,
} as const;
