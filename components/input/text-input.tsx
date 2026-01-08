import React, { useState, forwardRef } from 'react';
import {
  TextInput as RNTextInput,
  StyleSheet,
  View,
  type TextInputProps as RNTextInputProps,
} from 'react-native';
import * as Haptics from 'expo-haptics';

import { ThemedText } from '@/components/themed-text';
import { useThemeColor } from '@/hooks/use-theme-color';
import { Opacity, Rounded } from '@/styles/spacing';

export type TextInputProps = RNTextInputProps & {
  /** Label displayed above the input */
  label?: string;
  /** Hint text displayed below the input */
  hint?: string;
  /** Error message - when set, input shows error state */
  error?: string;
  /** Icon element to display on the left side */
  leftIcon?: React.ReactNode;
  /** Icon element to display on the right side */
  rightIcon?: React.ReactNode;
  /** Whether the input is disabled */
  disabled?: boolean;
};

export const TextInput = forwardRef<RNTextInput, TextInputProps>(
  (
    {
      label,
      hint,
      error,
      leftIcon,
      rightIcon,
      disabled = false,
      style,
      onFocus,
      onBlur,
      value,
      ...props
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);

    // Theme colors
    const contentStrong = useThemeColor({}, 'contentStrong');
    const contentSubtle = useThemeColor({}, 'contentSubtle');
    const contentNormal = useThemeColor({}, 'contentNormal');
    const alphaStrong = useThemeColor({}, 'alphaStrong');
    const errorContent = useThemeColor({}, 'errorContent');

    // Determine state
    const hasError = !!error;

    // Get border color based on state
    const getBorderColor = () => {
      if (hasError) return errorContent;
      if (isFocused) return contentStrong;
      return alphaStrong;
    };

    // Get text color based on state (default, disabled, error)
    const getTextColor = () => {
      if (hasError) return errorContent;
      if (disabled) return contentSubtle;
      return contentStrong;
    };

    // Get icon color based on state
    const getIconColor = () => {
      if (hasError) return errorContent;
      if (disabled) return contentSubtle;
      return contentSubtle;
    };

    const handleFocus = (e: any) => {
      Haptics.selectionAsync();
      setIsFocused(true);
      onFocus?.(e);
    };

    const handleBlur = (e: any) => {
      setIsFocused(false);
      onBlur?.(e);
    };

    const iconColor = getIconColor();

    // Clone icons with proper color and consistent stroke width
    const renderIcon = (icon: React.ReactNode) => {
      if (!icon) return null;
      if (React.isValidElement(icon)) {
        return React.cloneElement(icon as React.ReactElement<any>, {
          color: iconColor,
          strokeWidth: 1.5,
        });
      }
      return icon;
    };

    return (
      <View style={styles.container}>
        {/* Label */}
        {label && (
          <ThemedText
            type="bodySmallMedium"
            style={[styles.label, { color: contentStrong }]}
          >
            {label}
          </ThemedText>
        )}

        {/* Input Container */}
        <View
          style={[
            styles.inputContainer,
            {
              borderColor: getBorderColor(),
              opacity: disabled ? Opacity.disabled : Opacity.full,
            },
          ]}
        >
          {/* Left Icon */}
          {leftIcon && <View style={styles.iconContainer}>{renderIcon(leftIcon)}</View>}

          {/* Text Input */}
          <RNTextInput
            ref={ref}
            style={[
              styles.input,
              { color: getTextColor() },
              style,
            ]}
            placeholderTextColor={contentSubtle}
            editable={!disabled}
            value={value}
            onFocus={handleFocus}
            onBlur={handleBlur}
            {...props}
          />

          {/* Right Icon */}
          {rightIcon && <View style={styles.iconContainer}>{renderIcon(rightIcon)}</View>}
        </View>

        {/* Hint or Error Text */}
        {(hint || error) && (
          <ThemedText
            type="bodySmall"
            style={[
              styles.hintText,
              { color: hasError ? errorContent : contentNormal },
            ]}
          >
            {error || hint}
          </ThemedText>
        )}
      </View>
    );
  }
);

TextInput.displayName = 'TextInput';

const styles = StyleSheet.create({
  container: {
    gap: 6,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 18,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 48,
    paddingHorizontal: 16,
    gap: 12,
    borderWidth: 1,
    ...Rounded.lg,
  },
  input: {
    flex: 1,
    fontSize: 16,
    lineHeight: 20,
    padding: 0,
  },
  iconContainer: {
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  hintText: {
    fontSize: 12,
    lineHeight: 16,
  },
});
