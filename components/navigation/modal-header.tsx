import { Cancel01Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react-native';
import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';

import { IconButton } from '@/components/buttons';
import { ThemedText } from '@/components/themed-text';
import { useThemeColor } from '@/hooks/use-theme-color';
import { ComponentLayout, Spacing } from '@/styles/spacing';

export type ModalHeaderProps = {
  /** Modal title */
  title?: string;
  /** Callback when close button is pressed */
  onClose?: () => void;
  /** Optional container style */
  style?: ViewStyle;
  /** Test ID for testing */
  testID?: string;
};

export function ModalHeader({ title, onClose, style, testID }: ModalHeaderProps) {
  const bgMain = useThemeColor({}, 'bgMain');
  const contentStrong = useThemeColor({}, 'contentStrong');

  return (
    <View testID={testID} style={[styles.container, { backgroundColor: bgMain }, style]}>
      {/* Title */}
      {title && (
        <View style={styles.titleContainer}>
          <ThemedText type="bodyLargeMedium" style={styles.title}>
            {title}
          </ThemedText>
        </View>
      )}

      {/* Close Button */}
      <View style={styles.closeButtonContainer}>
        <IconButton
          icon={
            <HugeiconsIcon
              icon={Cancel01Icon}
              size={20}
              color={contentStrong}
              strokeWidth={2}
            />
          }
          variant="ghost"
          size="md"
          onPress={onClose}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: ComponentLayout.modalHeader.height,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.lg,
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    textAlign: 'center',
  },
  closeButtonContainer: {
    position: 'absolute',
    right: ComponentLayout.modalHeader.closeButtonOffset,
  },
});
