import * as Haptics from 'expo-haptics';
import React, { useEffect } from 'react';
import {
  Dimensions,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, {
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Footer, FooterProps, ModalHeader } from '@/components/navigation';
import { ThemedText } from '@/components/themed-text';
import { useThemeColor } from '@/hooks/use-theme-color';
import { Duration, GestureThreshold, SpringConfig } from '@/styles/animation';
import { ComponentLayout, Rounded, Spacing } from '@/styles/spacing';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

export type BottomSheetModalProps = {
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
  /** Max height as percentage of screen (default: 0.9 = 90%). Modal will hug content up to this height. */
  maxHeight?: number;
  /** Whether to show drag handle indicator (default: true) */
  showHandle?: boolean;
  /** Footer props (optional) */
  footerProps?: Omit<FooterProps, 'style'>;
  /** Whether swipe to dismiss is enabled (default: true) */
  swipeToDismiss?: boolean;
  /** Custom style for content container */
  contentStyle?: ViewStyle;
  /** Test ID for testing */
  testID?: string;
};

export function BottomSheetModal({
  visible,
  onClose,
  title,
  description,
  children,
  maxHeight = 0.9,
  showHandle = true,
  footerProps,
  swipeToDismiss = true,
  contentStyle,
  testID,
}: BottomSheetModalProps) {
  const insets = useSafeAreaInsets();
  const bgMain = useThemeColor({}, 'bgMain');
  const alphaMedium = useThemeColor({}, 'alphaMedium');
  const contentNormal = useThemeColor({}, 'contentNormal');
  const backdropColor = useThemeColor({}, 'alphaOverlay');

  const maxModalHeight = SCREEN_HEIGHT * maxHeight;
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

  // Pan gesture for swipe to dismiss
  const panGesture = Gesture.Pan()
    .enabled(swipeToDismiss)
    .onUpdate((event) => {
      // Only allow dragging down
      if (event.translationY > 0) {
        translateY.value = event.translationY;
      }
    })
    .onEnd((event) => {
      if (
        event.translationY > GestureThreshold.dismissDistance ||
        event.velocityY > GestureThreshold.dismissVelocity
      ) {
        // Dismiss
        runOnJS(Haptics.impactAsync)(Haptics.ImpactFeedbackStyle.Light);
        translateY.value = withTiming(SCREEN_HEIGHT, { duration: Duration.normal }, () => {
          runOnJS(onClose)();
        });
      } else {
        // Snap back
        translateY.value = withSpring(0, SpringConfig.modal);
      }
    });

  // Animated styles
  const backdropStyle = useAnimatedStyle(() => ({
    opacity: interpolate(translateY.value, [0, SCREEN_HEIGHT], [1, 0]),
  }));

  const sheetStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  if (!visible) {
    return null;
  }

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      statusBarTranslucent
      onRequestClose={() => handleClose()}
    >
      <GestureHandlerRootView style={styles.container}>
        {/* Backdrop */}
        <Animated.View style={[styles.backdrop, { backgroundColor: backdropColor }, backdropStyle]}>
          <Pressable style={styles.backdropPressable} onPress={() => handleClose()} />
        </Animated.View>

        {/* Sheet */}
        <GestureDetector gesture={panGesture}>
          <Animated.View
            testID={testID}
            accessibilityViewIsModal={true}
            style={[
              styles.sheet,
              sheetStyle,
              {
                maxHeight: maxModalHeight,
                backgroundColor: bgMain,
                paddingBottom: footerProps ? 0 : insets.bottom,
              },
            ]}
          >
            {/* Handle */}
            {showHandle && (
              <View style={styles.handleContainer}>
                <View style={[styles.handle, { backgroundColor: alphaMedium }]} />
              </View>
            )}

            {/* Header - close button only */}
            <ModalHeader onClose={() => handleClose()} />

            {/* Scrollable Content */}
            <ScrollView
              style={styles.scrollView}
              contentContainerStyle={styles.scrollContent}
              showsVerticalScrollIndicator={false}
            >
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
              <View style={[styles.content, contentStyle]}>{children}</View>
            </ScrollView>

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
        </GestureDetector>
      </GestureHandlerRootView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
  },
  backdropPressable: {
    flex: 1,
  },
  sheet: {
    ...Rounded.xl,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    overflow: 'hidden',
  },
  handleContainer: {
    alignItems: 'center',
    paddingTop: ComponentLayout.handleContainer.paddingTop,
    paddingBottom: Spacing.xs,
  },
  handle: {
    width: ComponentLayout.handle.width,
    height: ComponentLayout.handle.height,
    borderRadius: ComponentLayout.handle.borderRadius,
  },
  scrollView: {
    flexShrink: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: Spacing.lg,
  },
  textContainer: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.xxl,
    gap: Spacing.sm,
  },
  title: {},
  description: {},
  content: {
    paddingHorizontal: Spacing.lg,
  },
});
