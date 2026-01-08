import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Pressable,
  Modal,
  FlatList,
  type ViewStyle,
} from 'react-native';
import * as Haptics from 'expo-haptics';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useThemeColor } from '@/hooks/use-theme-color';
import { Opacity, Rounded } from '@/styles/spacing';
import { HugeiconsIcon } from '@hugeicons/react-native';
import { ArrowUp01Icon, ArrowDown01Icon, Tick01Icon } from '@hugeicons/core-free-icons';

export type DropdownOption = {
  label: string;
  value: string;
};

export type DropdownProps = {
  /** Array of options to display */
  options: DropdownOption[];
  /** Currently selected value */
  value?: string;
  /** Callback when selection changes */
  onValueChange: (value: string) => void;
  /** Placeholder text when no value selected */
  placeholder?: string;
  /** Label displayed above the dropdown */
  label?: string;
  /** Hint text displayed below the dropdown */
  hint?: string;
  /** Error message - when set, dropdown shows error state */
  error?: string;
  /** Icon element to display on the left side */
  leftIcon?: React.ReactNode;
  /** Whether the dropdown is disabled */
  disabled?: boolean;
  /** Additional style for the container */
  style?: ViewStyle;
  /** Accessibility label for screen readers */
  accessibilityLabel?: string;
};

function ChevronGrabber({ color }: { color: string }) {
  return (
    <View style={styles.chevronGrabber}>
      <HugeiconsIcon icon={ArrowUp01Icon} size={12} color={color} strokeWidth={2} />
      <HugeiconsIcon icon={ArrowDown01Icon} size={12} color={color} strokeWidth={2} />
    </View>
  );
}

export function Dropdown({
  options,
  value,
  onValueChange,
  placeholder = 'Select an option',
  label,
  hint,
  error,
  leftIcon,
  disabled = false,
  style,
  accessibilityLabel,
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Theme colors
  const contentStrong = useThemeColor({}, 'contentStrong');
  const contentSubtle = useThemeColor({}, 'contentSubtle');
  const contentNormal = useThemeColor({}, 'contentNormal');
  const alphaStrong = useThemeColor({}, 'alphaStrong');
  const alphaMedium = useThemeColor({}, 'alphaMedium');
  const alphaOverlay = useThemeColor({}, 'alphaOverlay');
  const errorContent = useThemeColor({}, 'errorContent');
  const bgMain = useThemeColor({}, 'bgMain');
  const bgSecondary = useThemeColor({}, 'bgSecondary');
  const brandContent = useThemeColor({}, 'brandContent');

  // Determine state
  const hasError = !!error;
  const selectedOption = options.find((opt) => opt.value === value);
  const hasValue = !!selectedOption;

  // Get border color based on state
  const getBorderColor = () => {
    if (hasError) return errorContent;
    if (isOpen) return contentStrong;
    return alphaStrong;
  };

  // Get text color based on state
  const getTextColor = () => {
    if (hasError) return errorContent;
    if (disabled) return contentSubtle;
    if (hasValue) return contentStrong;
    return contentSubtle;
  };

  // Get icon color based on state
  const getIconColor = () => {
    if (hasError) return errorContent;
    if (disabled) return contentSubtle;
    return contentSubtle;
  };

  // Get chevron color based on state
  const getChevronColor = () => {
    if (hasError) return errorContent;
    if (disabled) return contentSubtle;
    return contentStrong;
  };

  const iconColor = getIconColor();

  // Clone left icon with proper color and stroke width
  const renderLeftIcon = () => {
    if (!leftIcon) return null;
    if (React.isValidElement(leftIcon)) {
      return React.cloneElement(leftIcon as React.ReactElement<any>, {
        color: iconColor,
        strokeWidth: 1.5,
      });
    }
    return leftIcon;
  };

  const handlePress = () => {
    if (!disabled) {
      Haptics.selectionAsync();
      setIsOpen(true);
    }
  };

  const handleSelect = (selectedValue: string) => {
    Haptics.selectionAsync();
    onValueChange(selectedValue);
    setIsOpen(false);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <View style={[styles.container, style]}>
      {/* Label */}
      {label && (
        <ThemedText
          type="bodySmallMedium"
          style={[styles.label, { color: contentStrong }]}
        >
          {label}
        </ThemedText>
      )}

      {/* Dropdown Button */}
      <Pressable
        onPress={handlePress}
        disabled={disabled}
        accessibilityRole="combobox"
        accessibilityState={{ expanded: isOpen, disabled }}
        accessibilityLabel={accessibilityLabel || label || placeholder}
        style={[
          styles.dropdownButton,
          {
            borderColor: getBorderColor(),
            opacity: disabled ? Opacity.disabled : Opacity.full,
          },
        ]}
      >
        {/* Left Icon */}
        {leftIcon && <View style={styles.iconContainer}>{renderLeftIcon()}</View>}

        {/* Selected Value or Placeholder */}
        <ThemedText
          type="bodyLarge"
          style={[styles.text, { color: getTextColor() }]}
          numberOfLines={1}
        >
          {selectedOption?.label || placeholder}
        </ThemedText>

        {/* Chevron Grabber (always visible) */}
        <ChevronGrabber color={getChevronColor()} />
      </Pressable>

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

      {/* Options Modal */}
      <Modal
        visible={isOpen}
        transparent
        animationType="fade"
        onRequestClose={handleClose}
      >
        <Pressable style={[styles.modalOverlay, { backgroundColor: alphaOverlay }]} onPress={handleClose}>
          <ThemedView style={[styles.modalContent, { borderColor: alphaMedium }]}>
            <View style={[styles.modalHeader, { borderBottomColor: alphaMedium }]}>
              <ThemedText type="headlineSmall">{label || 'Select'}</ThemedText>
            </View>
            <FlatList
              data={options}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => {
                const isSelected = item.value === value;
                return (
                  <Pressable
                    style={[
                      styles.optionItem,
                      isSelected && { backgroundColor: bgSecondary },
                    ]}
                    onPress={() => handleSelect(item.value)}
                  >
                    <ThemedText
                      type="bodyLarge"
                      style={[
                        styles.optionText,
                        isSelected && { color: brandContent },
                      ]}
                    >
                      {item.label}
                    </ThemedText>
                    {isSelected && (
                      <HugeiconsIcon
                        icon={Tick01Icon}
                        size={20}
                        color={brandContent}
                        strokeWidth={1.5}
                      />
                    )}
                  </Pressable>
                );
              }}
              ItemSeparatorComponent={() => (
                <View style={[styles.separator, { backgroundColor: alphaMedium }]} />
              )}
            />
          </ThemedView>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 6,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 18,
  },
  dropdownButton: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 48,
    paddingHorizontal: 16,
    gap: 12,
    borderWidth: 1,
    ...Rounded.lg,
  },
  text: {
    flex: 1,
    fontSize: 16,
    lineHeight: 20,
  },
  iconContainer: {
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chevronGrabber: {
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    gap: -6,
  },
  hintText: {
    fontSize: 12,
    lineHeight: 16,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  modalContent: {
    width: '100%',
    maxHeight: '60%',
    ...Rounded.xl,
    borderWidth: 1,
    overflow: 'hidden',
  },
  modalHeader: {
    padding: 16,
    borderBottomWidth: 1,
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  optionText: {
    flex: 1,
  },
  separator: {
    height: 1,
  },
});
