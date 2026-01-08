import React, { useEffect } from 'react';
import {
  Dimensions,
  Modal,
  ScrollView,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import Animated, {
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as Haptics from 'expo-haptics';

import { Footer, FooterProps } from '@/components/navigation';
import { ModalHeader } from '@/components/navigation';
import { ThemedText } from '@/components/themed-text';
import { useThemeColor } from '@/hooks/use-theme-color';
import { Spacing } from '@/styles/spacing';
import { Duration, SpringConfig } from '@/styles/animation';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

export type FullScreenModalProps = {
  /** Whether the modal is visible */
  visible: boolean;
  /** Callback when modal is closed */
  onClose: () => void;
  /** Modal title (optional) */
  title?: string;
  /** Description text below title (optional) */
  description?: string;
  /** Content to render inside modal */
  children?: React.ReactNode;
  /** Whether content should scroll (default: true) */
  scrollable?: boolean;
  /** Footer props (optional) */
  footerProps?: Omit<FooterProps, 'style'>;
  /** Custom style for content container */
  contentStyle?: ViewStyle;
  /** Test ID for testing */
  testID?: string;
};

export function FullScreenModal({
  visible,
  onClose,
  title,
  description,
  children,
  scrollable = true,
  footerProps,
  contentStyle,
  testID,
}: FullScreenModalProps) {
  const insets = useSafeAreaInsets();
  const bgMain = useThemeColor({}, 'bgMain');
  const contentNormal = useThemeColor({}, 'contentNormal');
  const backdropColor = useThemeColor({}, 'alphaOverlay');

  const translateY = useSharedValue(SCREEN_HEIGHT);

  // Open/close animation
  useEffect(() => {
    if (visible) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      translateY.value = withSpring(0, SpringConfig.modal);
    } else {
      translateY.value = withTiming(SCREEN_HEIGHT, { duration: Duration.normal });
    }
  }, [visible]);

  const handleClose = (callback?: () => void) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    translateY.value = withTiming(SCREEN_HEIGHT, { duration: Duration.normal }, () => {
      runOnJS(callback || onClose)();
    });
  };

  // Animated styles
  const backdropStyle = useAnimatedStyle(() => ({
    opacity: interpolate(translateY.value, [0, SCREEN_HEIGHT], [1, 0]),
  }));

  const modalStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  if (!visible) {
    return null;
  }

  const ContentWrapper = scrollable ? ScrollView : View;
  const contentWrapperProps = scrollable
    ? {
        style: styles.scrollContent,
        contentContainerStyle: [
          styles.scrollContentContainer,
          contentStyle,
          { paddingBottom: footerProps ? 0 : insets.bottom + Spacing.lg },
        ],
        showsVerticalScrollIndicator: false,
      }
    : {
        style: [styles.content, contentStyle, { paddingBottom: footerProps ? 0 : insets.bottom + Spacing.lg }],
      };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      statusBarTranslucent
      onRequestClose={() => handleClose()}
    >
      <View style={styles.container}>
        {/* Backdrop */}
        <Animated.View style={[styles.backdrop, { backgroundColor: backdropColor }, backdropStyle]} />

        {/* Modal Content */}
        <Animated.View
          testID={testID}
          accessibilityViewIsModal={true}
          style={[
            styles.modal,
            modalStyle,
            {
              backgroundColor: bgMain,
              paddingTop: insets.top,
            },
          ]}
        >
          {/* Header - close button only */}
          <ModalHeader onClose={() => handleClose()} />

          {/* Title & Description */}
          {(title || description) && (
            <View style={styles.textContainer}>
              {title && (
                <ThemedText type="headlineDisplay" style={styles.title}>
                  {title}
                </ThemedText>
              )}
              {description && (
                <ThemedText
                  type="bodyLargeLong"
                  style={[styles.description, { color: contentNormal }]}
                >
                  {description}
                </ThemedText>
              )}
            </View>
          )}

          {/* Content */}
          <ContentWrapper {...contentWrapperProps}>{children}</ContentWrapper>

          {/* Footer */}
          {footerProps && (
            <Footer
              {...footerProps}
              onPrimaryPress={
                footerProps.onPrimaryPress
                  ? () => handleClose(footerProps.onPrimaryPress)
                  : undefined
              }
              onSecondaryPress={
                footerProps.onSecondaryPress
                  ? () => handleClose(footerProps.onSecondaryPress)
                  : undefined
              }
            />
          )}
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
  },
  modal: {
    flex: 1,
  },
  textContainer: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.xxl,
    gap: Spacing.sm,
  },
  title: {},
  description: {},
  scrollContent: {
    flex: 1,
  },
  scrollContentContainer: {
    paddingHorizontal: Spacing.lg,
  },
  content: {
    flex: 1,
    paddingHorizontal: Spacing.lg,
  },
});
