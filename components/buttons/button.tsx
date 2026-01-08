import * as Haptics from 'expo-haptics';
import { ActivityIndicator, Pressable, StyleSheet, type PressableProps, type TextStyle, type ViewStyle } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

import { ThemedText } from '@/components/themed-text';
import { useThemeColor } from '@/hooks/use-theme-color';
import { SpringConfig } from '@/styles/animation';
import { Opacity, Rounded } from '@/styles/spacing';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive' | 'destructiveSecondary';
export type ButtonSize = 'sm' | 'md' | 'lg';

export type ButtonProps = PressableProps & {
  title: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  enableHaptics?: boolean;
  /** Show loading spinner and disable interactions */
  loading?: boolean;
};

export function Button({
  title,
  variant = 'primary',
  size = 'md',
  disabled,
  enableHaptics = true,
  loading = false,
  style,
  onPressIn,
  onPressOut,
  onPress,
  ...props
}: ButtonProps) {
  // Loading state disables the button
  const isDisabled = disabled || loading;
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
    if (enableHaptics && !isDisabled) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    onPress?.(event);
  };

  // Theme colors
  const brandContent = useThemeColor({}, 'brandContent');
  const bgTertiary = useThemeColor({}, 'bgTertiary');
  const contentStrong = useThemeColor({}, 'contentStrong');
  const alphaMedium = useThemeColor({}, 'alphaMedium');
  const alphaSubtle = useThemeColor({}, 'alphaSubtle');
  const errorContent = useThemeColor({}, 'errorContent');
  const errorBg = useThemeColor({}, 'errorBg');
  // Text color for filled buttons (always white for contrast on colored backgrounds)
  const contentOnFilled = useThemeColor({}, 'contentOnBrand');

  // Get variant styles
  const getVariantStyles = (): { container: ViewStyle; textColor: string } => {
    const baseDisabledOpacity = isDisabled ? Opacity.disabled : Opacity.full;

    switch (variant) {
      case 'primary':
        return {
          container: {
            backgroundColor: brandContent,
            opacity: baseDisabledOpacity,
          },
          textColor: contentOnFilled,
        };
      case 'secondary':
        return {
          container: {
            backgroundColor: bgTertiary,
            borderWidth: 1,
            borderColor: alphaSubtle,
            opacity: baseDisabledOpacity,
          },
          textColor: contentStrong,
        };
      case 'outline':
        return {
          container: {
            backgroundColor: 'transparent',
            borderWidth: 1,
            borderColor: alphaMedium,
            opacity: baseDisabledOpacity,
          },
          textColor: contentStrong,
        };
      case 'ghost':
        return {
          container: {
            backgroundColor: 'transparent',
            opacity: baseDisabledOpacity,
          },
          textColor: contentStrong,
        };
      case 'destructive':
        return {
          container: {
            backgroundColor: errorContent,
            opacity: baseDisabledOpacity,
          },
          textColor: contentOnFilled,
        };
      case 'destructiveSecondary':
        return {
          container: {
            backgroundColor: errorBg,
            borderWidth: 1,
            borderColor: errorBg,
            opacity: baseDisabledOpacity,
          },
          textColor: errorContent,
        };
      default:
        return {
          container: {
            backgroundColor: brandContent,
            opacity: baseDisabledOpacity,
          },
          textColor: contentOnFilled,
        };
    }
  };

  // Get size styles
  const getSizeStyles = (): { container: ViewStyle; textStyle: TextStyle } => {
    switch (size) {
      case 'lg':
        return {
          container: {
            paddingVertical: 14,
            paddingHorizontal: 20,
          },
          textStyle: {
            fontSize: 16,
            lineHeight: 20,
            fontWeight: '500',
          },
        };
      case 'md':
        return {
          container: {
            paddingVertical: 10,
            paddingHorizontal: 16,
          },
          textStyle: {
            fontSize: 16,
            lineHeight: 20,
            fontWeight: '500',
          },
        };
      case 'sm':
        return {
          container: {
            paddingVertical: 8,
            paddingHorizontal: 12,
          },
          textStyle: {
            fontSize: 14,
            lineHeight: 18,
            fontWeight: '500',
          },
        };
      default:
        return {
          container: {
            paddingVertical: 10,
            paddingHorizontal: 16,
          },
          textStyle: {
            fontSize: 16,
            lineHeight: 20,
            fontWeight: '500',
          },
        };
    }
  };

  const variantStyles = getVariantStyles();
  const sizeStyles = getSizeStyles();

  return (
    <AnimatedPressable
      style={[
        styles.base,
        sizeStyles.container,
        variantStyles.container,
        animatedStyle,
        style as ViewStyle,
      ]}
      disabled={isDisabled}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={handlePress}
      accessibilityRole="button"
      accessibilityState={{ disabled: !!isDisabled, busy: loading }}
      {...props}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={variantStyles.textColor}
        />
      ) : (
        <ThemedText
          style={[sizeStyles.textStyle, { color: variantStyles.textColor }]}
        >
          {title}
        </ThemedText>
      )}
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    justifyContent: 'center',
    ...Rounded.lg,
    flexDirection: 'row',
  },
});
