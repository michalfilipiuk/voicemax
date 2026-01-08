import * as Haptics from 'expo-haptics';
import React from 'react';
import { Pressable, StyleSheet, type PressableProps, type ViewStyle } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

import { useThemeColor } from '@/hooks/use-theme-color';
import { SpringConfig } from '@/styles/animation';
import { Opacity, Rounded } from '@/styles/spacing';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export type IconButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
export type IconButtonSize = 'sm' | 'md' | 'lg';

// Icon sizes per button size
const ICON_SIZES: Record<IconButtonSize, number> = {
  sm: 16,
  md: 20,
  lg: 24,
};

export type IconButtonProps = PressableProps & {
  icon: React.ReactNode;
  variant?: IconButtonVariant;
  size?: IconButtonSize;
  enableHaptics?: boolean;
};

export function IconButton({
  icon,
  variant = 'primary',
  size = 'md',
  disabled,
  enableHaptics = true,
  style,
  onPressIn,
  onPressOut,
  onPress,
  ...props
}: IconButtonProps) {
  // Animation
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = (event: any) => {
    scale.value = withSpring(0.97, SpringConfig.button);
    onPressIn?.(event);
  };

  const handlePressOut = (event: any) => {
    scale.value = withSpring(1, SpringConfig.button);
    onPressOut?.(event);
  };

  const handlePress = (event: any) => {
    if (enableHaptics && !disabled) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    onPress?.(event);
  };

  // Theme colors
  const brandContent = useThemeColor({}, 'brandContent');
  const bgTertiary = useThemeColor({}, 'bgTertiary');
  const alphaMedium = useThemeColor({}, 'alphaMedium');
  const alphaSubtle = useThemeColor({}, 'alphaSubtle');

  // Get variant styles
  const getVariantStyles = (): ViewStyle => {
    const baseDisabledOpacity = disabled ? Opacity.disabled : Opacity.full;

    switch (variant) {
      case 'primary':
        return {
          backgroundColor: brandContent,
          opacity: baseDisabledOpacity,
        };
      case 'secondary':
        return {
          backgroundColor: bgTertiary,
          borderWidth: 1,
          borderColor: alphaSubtle,
          opacity: baseDisabledOpacity,
        };
      case 'outline':
        return {
          backgroundColor: 'transparent',
          borderWidth: 1,
          borderColor: alphaMedium,
          opacity: baseDisabledOpacity,
        };
      case 'ghost':
        return {
          backgroundColor: 'transparent',
          opacity: baseDisabledOpacity,
        };
      default:
        return {
          backgroundColor: brandContent,
          opacity: baseDisabledOpacity,
        };
    }
  };

  // Get size styles (square buttons)
  const getSizeStyles = (): ViewStyle => {
    switch (size) {
      case 'lg':
        return {
          width: 48,
          height: 48,
        };
      case 'md':
        return {
          width: 40,
          height: 40,
        };
      case 'sm':
        return {
          width: 32,
          height: 32,
        };
      default:
        return {
          width: 40,
          height: 40,
        };
    }
  };

  const variantStyles = getVariantStyles();
  const sizeStyles = getSizeStyles();

  // Clone icon with correct size
  const renderIcon = () => {
    if (React.isValidElement(icon)) {
      return React.cloneElement(icon as React.ReactElement<any>, {
        size: ICON_SIZES[size],
      });
    }
    return icon;
  };

  return (
    <AnimatedPressable
      style={[
        styles.base,
        sizeStyles,
        variantStyles,
        animatedStyle,
        style as ViewStyle,
      ]}
      disabled={disabled}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={handlePress}
      accessibilityRole="button"
      accessibilityState={{ disabled: !!disabled }}
      {...props}
    >
      {renderIcon()}
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    justifyContent: 'center',
    ...Rounded.full,
  },
});
