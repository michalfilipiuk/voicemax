import { Mic01Icon, StopIcon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react-native';
import * as Haptics from 'expo-haptics';
import React, { useEffect } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
  withSpring,
  cancelAnimation,
} from 'react-native-reanimated';

import { useThemeColor } from '@/hooks/use-theme-color';

interface RecordingButtonProps {
  isRecording: boolean;
  onPress: () => void;
  disabled?: boolean;
  size?: number;
}

export function RecordingButton({
  isRecording,
  onPress,
  disabled = false,
  size = 80,
}: RecordingButtonProps) {
  const brandContent = useThemeColor({}, 'brandContent');
  const errorContent = useThemeColor({}, 'errorContent');
  const bgMain = useThemeColor({}, 'bgMain');

  const pulseScale = useSharedValue(1);
  const buttonScale = useSharedValue(1);
  const ringOpacity = useSharedValue(0);

  useEffect(() => {
    if (isRecording) {
      // Start pulse animation
      pulseScale.value = withRepeat(
        withSequence(
          withTiming(1.3, { duration: 1000 }),
          withTiming(1, { duration: 1000 })
        ),
        -1,
        false
      );

      // Fade in ring
      ringOpacity.value = withTiming(0.3, { duration: 300 });
    } else {
      // Stop animations
      cancelAnimation(pulseScale);
      pulseScale.value = withSpring(1);
      ringOpacity.value = withTiming(0, { duration: 300 });
    }
  }, [isRecording]);

  const handlePress = () => {
    if (disabled) return;

    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    onPress();
  };

  const handlePressIn = () => {
    buttonScale.value = withSpring(0.95, { damping: 15, stiffness: 200 });
  };

  const handlePressOut = () => {
    buttonScale.value = withSpring(1, { damping: 15, stiffness: 200 });
  };

  const pulseStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pulseScale.value }],
    opacity: ringOpacity.value,
  }));

  const buttonStyle = useAnimatedStyle(() => ({
    transform: [{ scale: buttonScale.value }],
  }));

  const buttonColor = isRecording ? errorContent : brandContent;

  return (
    <View style={[styles.container, { width: size * 1.5, height: size * 1.5 }]}>
      {/* Pulse ring */}
      <Animated.View
        style={[
          styles.pulseRing,
          pulseStyle,
          {
            width: size * 1.4,
            height: size * 1.4,
            borderRadius: size * 0.7,
            borderColor: buttonColor,
          },
        ]}
      />

      {/* Main button */}
      <Pressable
        onPress={handlePress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={disabled}
      >
        <Animated.View
          style={[
            styles.button,
            buttonStyle,
            {
              width: size,
              height: size,
              borderRadius: size / 2,
              backgroundColor: buttonColor,
              opacity: disabled ? 0.5 : 1,
            },
          ]}
        >
          <HugeiconsIcon
            icon={isRecording ? StopIcon : Mic01Icon}
            size={size * 0.4}
            color={bgMain}
          />
        </Animated.View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  pulseRing: {
    position: 'absolute',
    borderWidth: 3,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
});
