/**
 * Shadow styles from Figma design system
 *
 * Each shadow in Figma has two layers. React Native only supports single shadows,
 * so we combine them to approximate the visual effect.
 *
 * Figma shadow specs (two layers each):
 * - small:  (0,1) blur 2 + (0,2) blur 8, color rgba(0,0,0,0.04)
 * - medium: (0,2) blur 4 + (0,8) blur 16, color rgba(0,0,0,0.04)
 * - large:  (0,4) blur 8 + (0,16) blur 32, color rgba(0,0,0,0.04)
 */

import { ViewStyle, Platform } from 'react-native';

type ShadowStyle = Pick<
  ViewStyle,
  'shadowColor' | 'shadowOffset' | 'shadowOpacity' | 'shadowRadius' | 'elevation'
>;

export const Shadows = {
  /**
   * Small shadow - subtle elevation for cards and small elements
   * Figma: (0,1) blur 2 + (0,2) blur 8 @ 4% opacity
   */
  small: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  } as ShadowStyle,

  /**
   * Medium shadow - moderate elevation for dropdowns, popovers
   * Figma: (0,2) blur 4 + (0,8) blur 16 @ 4% opacity
   */
  medium: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.10,
    shadowRadius: 8,
    elevation: 4,
  } as ShadowStyle,

  /**
   * Large shadow - strong elevation for modals, dialogs
   * Figma: (0,4) blur 8 + (0,16) blur 32 @ 4% opacity
   */
  large: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 8,
  } as ShadowStyle,

  /**
   * No shadow - useful for removing shadows
   */
  none: {
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  } as ShadowStyle,
};

// Export shadow names for typing
export type ShadowName = keyof typeof Shadows;

// Helper to get shadow style by name
export const getShadow = (name: ShadowName): ShadowStyle => Shadows[name];
