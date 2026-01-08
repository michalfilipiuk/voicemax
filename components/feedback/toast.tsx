import {
  Alert02Icon,
  Cancel01Icon,
  CheckmarkCircle02Icon,
  InformationCircleIcon,
} from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react-native';
import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { useToast, type ToastType, type Toast } from '@/context/ToastContext';
import { useThemeColor } from '@/hooks/use-theme-color';
import { Duration, SpringConfig } from '@/styles/animation';
import { Shadows } from '@/styles/shadows';
import { IconSizes, Rounded, Spacing } from '@/styles/spacing';

const TOAST_ICONS = {
  success: CheckmarkCircle02Icon,
  error: Cancel01Icon,
  warning: Alert02Icon,
  info: InformationCircleIcon,
} as const;

export function ToastContainer() {
  const { toast, hideToast } = useToast();
  const insets = useSafeAreaInsets();

  // Keep track of the visible toast for exit animation
  const [visibleToast, setVisibleToast] = useState<Toast | null>(null);
  const isAnimatingOut = useRef(false);

  // Theme colors
  const bgMain = useThemeColor({}, 'bgMain');
  const alphaMedium = useThemeColor({}, 'alphaMedium');
  const contentStrong = useThemeColor({}, 'contentStrong');
  const successContent = useThemeColor({}, 'successContent');
  const errorContent = useThemeColor({}, 'errorContent');
  const alertContent = useThemeColor({}, 'alertContent');
  const infoContent = useThemeColor({}, 'infoContent');

  // Animation values
  const translateY = useSharedValue(-100);
  const dragY = useSharedValue(0);
  const opacity = useSharedValue(0);

  // Dismiss threshold - how far to drag before dismissing
  const DISMISS_THRESHOLD = -50;

  const getIconColor = (type: ToastType): string => {
    switch (type) {
      case 'success':
        return successContent;
      case 'error':
        return errorContent;
      case 'warning':
        return alertContent;
      case 'info':
        return infoContent;
      default:
        return infoContent;
    }
  };

  const animateOut = () => {
    isAnimatingOut.current = true;
    translateY.value = withTiming(-100, { duration: Duration.normal }, () => {
      runOnJS(setVisibleToast)(null);
      isAnimatingOut.current = false;
    });
    opacity.value = withTiming(0, { duration: Duration.normal });
  };

  const handleDismiss = () => {
    hideToast();
  };

  useEffect(() => {
    if (toast) {
      // New toast arrived - animate in
      setVisibleToast(toast);
      dragY.value = 0;
      translateY.value = withSpring(0, SpringConfig.modal);
      opacity.value = withTiming(1, { duration: Duration.fast });
    } else if (visibleToast && !isAnimatingOut.current) {
      // Toast removed - animate out
      animateOut();
    }
  }, [toast]);

  // Pan gesture for drag to dismiss
  const panGesture = Gesture.Pan()
    .onUpdate((event) => {
      // Only allow dragging upward (negative Y)
      if (event.translationY < 0) {
        dragY.value = event.translationY;
      }
    })
    .onEnd((event) => {
      if (event.translationY < DISMISS_THRESHOLD) {
        // Animate off screen then dismiss
        dragY.value = withTiming(-150, { duration: Duration.fast }, () => {
          runOnJS(handleDismiss)();
        });
        opacity.value = withTiming(0, { duration: Duration.fast });
      } else {
        // Spring back to original position
        dragY.value = withSpring(0, SpringConfig.modal);
      }
    });

  // Tap gesture to dismiss
  const tapGesture = Gesture.Tap()
    .onEnd(() => {
      runOnJS(handleDismiss)();
    });

  // Combine gestures - pan takes priority
  const composedGesture = Gesture.Race(panGesture, tapGesture);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value + dragY.value }],
    opacity: opacity.value,
  }));

  if (!visibleToast) {
    return null;
  }

  const toastIcon = TOAST_ICONS[visibleToast.type];
  const iconColor = getIconColor(visibleToast.type);

  return (
    <GestureHandlerRootView style={[styles.container, { top: insets.top + Spacing.sm }]} pointerEvents="box-none">
      <Animated.View style={animatedStyle}>
        <GestureDetector gesture={composedGesture}>
          <Animated.View style={[styles.toast, Shadows.medium, { backgroundColor: bgMain, borderColor: alphaMedium }]}>
            <HugeiconsIcon
              icon={toastIcon}
              size={IconSizes.lg}
              color={iconColor}
              strokeWidth={1.5}
            />
            <ThemedText
              type="bodyRegularMedium"
              style={[styles.message, { color: contentStrong }]}
              numberOfLines={2}
            >
              {visibleToast.message}
            </ThemedText>
          </Animated.View>
        </GestureDetector>
      </Animated.View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: Spacing.md,
    right: Spacing.md,
    zIndex: 9999,
  },
  toast: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.md,
    gap: Spacing.md,
    borderWidth: 1,
    ...Rounded.lg,
  },
  message: {
    flexShrink: 1,
  },
});
