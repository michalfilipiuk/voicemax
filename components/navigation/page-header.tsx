import { ArrowLeft01Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react-native';
import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { IconButton } from '@/components/buttons';
import { Logo } from '@/components/logo';
import { ProgressBar } from '@/components/progress';
import { ThemedText } from '@/components/themed-text';
import { useThemeColor } from '@/hooks/use-theme-color';

export type PageHeaderVariant = 'default' | 'progress' | 'logo';

export type PageHeaderProps = {
  /** Header variant */
  variant?: PageHeaderVariant;
  /** Title text (for default variant) */
  title?: string;
  /** Left icon element */
  leftIcon?: React.ReactNode;
  /** Right icon element */
  rightIcon?: React.ReactNode;
  /** Callback when left button is pressed */
  onLeftPress?: () => void;
  /** Callback when right button is pressed */
  onRightPress?: () => void;
  /** Whether to show the left button (defaults to true if onLeftPress provided) */
  showLeftButton?: boolean;
  /** Whether to show the right button (defaults to true if onRightPress provided) */
  showRightButton?: boolean;
  /** Current step for progress variant */
  currentStep?: number;
  /** Total steps for progress variant */
  totalSteps?: number;
  /** Optional container style */
  style?: ViewStyle;
};

export function PageHeader({
  variant = 'default',
  title,
  leftIcon,
  rightIcon,
  onLeftPress,
  onRightPress,
  showLeftButton,
  showRightButton,
  currentStep = 1,
  totalSteps = 1,
  style,
}: PageHeaderProps) {
  const bgMain = useThemeColor({}, 'bgMain');
  const contentStrong = useThemeColor({}, 'contentStrong');
  const insets = useSafeAreaInsets();

  // Determine if buttons should show
  const shouldShowLeftButton = showLeftButton ?? (onLeftPress !== undefined || leftIcon !== undefined);
  const shouldShowRightButton = showRightButton ?? (onRightPress !== undefined || rightIcon !== undefined);

  // Default left icon is back arrow
  const renderLeftIcon = () => {
    if (leftIcon) return leftIcon;
    return (
      <HugeiconsIcon
        icon={ArrowLeft01Icon}
        size={20}
        color={contentStrong}
        strokeWidth={2}
      />
    );
  };

  // Clone right icon with proper color if it's a HugeiconsIcon
  const renderRightIcon = () => {
    if (!rightIcon) return null;
    if (React.isValidElement(rightIcon)) {
      return React.cloneElement(rightIcon as React.ReactElement<any>, {
        color: contentStrong,
        strokeWidth: 2,
      });
    }
    return rightIcon;
  };

  // Logo variant - just centered logo, no buttons
  if (variant === 'logo') {
    return (
      <View style={[styles.outerContainer, { backgroundColor: bgMain, paddingTop: insets.top }, style]}>
        <View style={styles.innerContainer}>
          <Logo variant="symbol" size="medium" />
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.outerContainer, { backgroundColor: bgMain, paddingTop: insets.top }, style]}>
      <View style={styles.innerContainer}>
        {/* Left Button */}
        {shouldShowLeftButton && (
          <View style={styles.leftButtonContainer}>
            <IconButton
              icon={renderLeftIcon()}
              variant="ghost"
              size="md"
              onPress={onLeftPress}
            />
          </View>
        )}

        {/* Center Content */}
        {variant === 'default' && title && (
          <View style={styles.titleContainer}>
            <ThemedText type="bodyLargeMedium" style={styles.title}>
              {title}
            </ThemedText>
          </View>
        )}

        {variant === 'progress' && (
          <View style={styles.progressContainer}>
            <ProgressBar currentStep={currentStep} totalSteps={totalSteps} style={styles.progressBar} />
          </View>
        )}

        {/* Right Button */}
        {variant === 'default' && shouldShowRightButton && rightIcon && (
          <View style={styles.rightButtonContainer}>
            <IconButton
              icon={renderRightIcon()}
              variant="ghost"
              size="md"
              onPress={onRightPress}
            />
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    width: '100%',
  },
  innerContainer: {
    height: 72,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 14,
  },
  leftButtonContainer: {
    position: 'absolute',
    left: 14,
  },
  rightButtonContainer: {
    position: 'absolute',
    right: 14,
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    textAlign: 'center',
  },
  progressContainer: {
    flex: 1,
    marginLeft: 54,
    marginRight: 14,
  },
  progressBar: {
    height: 4,
  },
});
