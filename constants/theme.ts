/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform } from 'react-native';

export const Colors = {
  light: {
    // Brand
    brandBg: '#FBF8F1',
    brandContent: '#B8963E',
    contentOnBrand: '#FFFFFF',

    // Background
    bgMain: '#FFFFFF',
    bgSecondary: '#FAFAFA',
    bgTertiary: '#F5F5F5',

    // Content
    contentDisabled: '#D4D4D4',
    contentSubtle: '#A3A3A3',
    contentNormal: '#737373',
    contentMuted: '#404040',
    contentStrong: '#0A0A0A',

    // Alpha (opacity variants)
    alphaSubtle: 'rgba(0, 0, 0, 0.05)',
    alphaMedium: 'rgba(0, 0, 0, 0.10)',
    alphaStrong: 'rgba(0, 0, 0, 0.15)',
    alphaOverlay: 'rgba(0, 0, 0, 0.50)',

    // Success
    successBg: 'rgba(16, 185, 129, 0.15)',
    successContent: '#10B981',

    // Error
    errorBg: 'rgba(239, 68, 68, 0.15)',
    errorContent: '#EF4444',

    // Alert
    alertBg: 'rgba(249, 115, 22, 0.15)',
    alertContent: '#F97316',

    // Info
    infoBg: 'rgba(14, 165, 233, 0.15)',
    infoContent: '#0EA5E9',

    // Tab navigation (using semantic colors)
    tabIconDefault: '#737373',
    tabIconSelected: '#0A0A0A',
  },
  dark: {
    // Brand
    brandBg: '#1A1714',
    brandContent: '#D4AF5C',
    contentOnBrand: '#1A1714',

    // Background
    bgMain: '#000000',
    bgSecondary: '#171717',
    bgTertiary: '#262626',

    // Content
    contentDisabled: '#525252',
    contentSubtle: '#A3A3A3',
    contentNormal: '#D4D4D4',
    contentMuted: '#E5E5E5',
    contentStrong: '#FAFAFA',

    // Alpha (opacity variants)
    alphaSubtle: 'rgba(255, 255, 255, 0.05)',
    alphaMedium: 'rgba(255, 255, 255, 0.10)',
    alphaStrong: 'rgba(255, 255, 255, 0.15)',
    alphaOverlay: 'rgba(255, 255, 255, 0.15)',

    // Success
    successBg: 'rgba(16, 185, 129, 0.15)',
    successContent: '#10B981',

    // Error
    errorBg: 'rgba(239, 68, 68, 0.15)',
    errorContent: '#EF4444',

    // Alert
    alertBg: 'rgba(249, 115, 22, 0.15)',
    alertContent: '#F97316',

    // Info
    infoBg: 'rgba(14, 165, 233, 0.15)',
    infoContent: '#0EA5E9',

    // Tab navigation (using semantic colors)
    tabIconDefault: '#A3A3A3',
    tabIconSelected: '#FAFAFA',
  },
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
