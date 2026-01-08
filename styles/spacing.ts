import { ViewStyle } from 'react-native';

/**
 * Spacing and layout constants
 */

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

/**
 * Border radius values from Figma design system
 * Note: Corner smoothing of 60% is applied in Figma (iOS-style continuous corners)
 */
export const BorderRadius = {
  none: 0,
  xs: 4,      // x-small
  sm: 6,      // small
  md: 8,      // medium
  lg: 12,     // large
  xl: 16,     // x-large
  xxl: 32,    // xx-large (modal/container)
  full: 1000, // fully rounded (pill shape)
};

// Export type for border radius keys
export type BorderRadiusName = keyof typeof BorderRadius;

/**
 * Helper to get border radius with iOS continuous corner smoothing
 * Use this instead of raw BorderRadius values to ensure consistent corner rendering
 */
export const rounded = (radius: number): ViewStyle => ({
  borderRadius: radius,
  borderCurve: 'continuous',
});

/**
 * Pre-defined rounded styles with iOS continuous corners
 * These match the BorderRadius values but include borderCurve: 'continuous'
 */
export const Rounded: Record<BorderRadiusName, ViewStyle> = {
  none: { borderRadius: 0 },
  xs: { borderRadius: BorderRadius.xs, borderCurve: 'continuous' },
  sm: { borderRadius: BorderRadius.sm, borderCurve: 'continuous' },
  md: { borderRadius: BorderRadius.md, borderCurve: 'continuous' },
  lg: { borderRadius: BorderRadius.lg, borderCurve: 'continuous' },
  xl: { borderRadius: BorderRadius.xl, borderCurve: 'continuous' },
  xxl: { borderRadius: BorderRadius.xxl, borderCurve: 'continuous' },
  full: { borderRadius: BorderRadius.full, borderCurve: 'continuous' },
};

/**
 * Border width values for consistent stroke sizing
 */
export const BorderWidth = {
  none: 0,
  thin: 1,
  medium: 2,
  thick: 3,
} as const;

/**
 * Opacity values for consistent transparency
 */
export const Opacity = {
  disabled: 0.5,
  subtle: 0.6,
  medium: 0.8,
  full: 1,
} as const;

/**
 * Icon size scale for consistent icon sizing
 */
export const IconSizes = {
  xs: 12,
  sm: 16,
  md: 20,
  lg: 24,
  xl: 32,
  xxl: 48,
} as const;

/**
 * Component-specific layout constants
 * These are intentional fixed values that don't map to the spacing scale
 */
export const ComponentLayout = {
  /** Bottom sheet drag handle dimensions */
  handle: {
    width: 36,
    height: 4,
    borderRadius: 2,
  },
  /** Modal header dimensions */
  modalHeader: {
    height: 60,
    closeButtonOffset: 14,
  },
  /** Handle container padding */
  handleContainer: {
    paddingTop: 12,
    paddingBottom: 4,
  },
  /** Page header dimensions */
  pageHeader: {
    height: 72,
    horizontalPadding: 14,
  },
  /** Bottom navigation dimensions */
  bottomNav: {
    height: 56,
    iconSize: 24,
  },
  /** Text input dimensions */
  textInput: {
    height: 48,
    multilineMinHeight: 100,
  },
} as const;
