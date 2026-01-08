/**
 * Typography styles from Figma design system
 * Font family: Inter
 */

import { TextStyle } from 'react-native';

export const Typography = {
  // Font family
  fontFamily: 'Inter',

  // Font weights
  weights: {
    regular: '400' as TextStyle['fontWeight'],
    medium: '500' as TextStyle['fontWeight'],
    semiBold: '600' as TextStyle['fontWeight'],
  },

  // Font sizes
  sizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 20,
    xl: 24,
    xxl: 32,
  },

  // Line heights
  lineHeights: {
    xs: 16,
    sm: 18,
    md: 20,
    lg: 24,
    xl: 28,
    xxl: 36,
  },

  // Text styles - complete style definitions
  styles: {
    // Headlines
    headlineDisplay: {
      fontSize: 32,
      lineHeight: 36,
      fontWeight: '600',
      letterSpacing: -0.32, // -1%
    } as TextStyle,

    headlineLarge: {
      fontSize: 24,
      lineHeight: 28,
      fontWeight: '600',
      letterSpacing: -0.24, // -1%
    } as TextStyle,

    headlineMedium: {
      fontSize: 20,
      lineHeight: 24,
      fontWeight: '600',
      letterSpacing: -0.2, // -1%
    } as TextStyle,

    headlineSmall: {
      fontSize: 16,
      lineHeight: 20,
      fontWeight: '600',
      letterSpacing: 0,
    } as TextStyle,

    // Body Large
    bodyLarge: {
      fontSize: 16,
      lineHeight: 20,
      fontWeight: '400',
      letterSpacing: 0,
    } as TextStyle,

    bodyLargeLong: {
      fontSize: 16,
      lineHeight: 24,
      fontWeight: '400',
      letterSpacing: 0,
    } as TextStyle,

    bodyLargeMedium: {
      fontSize: 16,
      lineHeight: 20,
      fontWeight: '500',
      letterSpacing: 0,
    } as TextStyle,

    // Body Regular
    bodyRegular: {
      fontSize: 14,
      lineHeight: 18,
      fontWeight: '400',
      letterSpacing: 0,
    } as TextStyle,

    bodyRegularLong: {
      fontSize: 14,
      lineHeight: 20,
      fontWeight: '400',
      letterSpacing: 0,
    } as TextStyle,

    bodyRegularMedium: {
      fontSize: 14,
      lineHeight: 18,
      fontWeight: '500',
      letterSpacing: 0,
    } as TextStyle,

    // Body Small
    bodySmall: {
      fontSize: 12,
      lineHeight: 16,
      fontWeight: '400',
      letterSpacing: 0,
    } as TextStyle,

    bodySmallMedium: {
      fontSize: 12,
      lineHeight: 16,
      fontWeight: '500',
      letterSpacing: 0,
    } as TextStyle,
  },
};

// Export individual styles for convenience
export const TextStyles = Typography.styles;
