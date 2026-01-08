import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  withSequence,
  Easing,
} from 'react-native-reanimated';

import { ThemedText } from '@/components/themed-text';
import { useThemeColor } from '@/hooks/use-theme-color';

interface BreathingPhase {
  name: string;
  duration: number;
}

interface BreathingCircleProps {
  phases: BreathingPhase[];
  isActive: boolean;
  onPhaseChange?: (phase: BreathingPhase, index: number) => void;
  onCycleComplete?: () => void;
}

export function BreathingCircle({
  phases,
  isActive,
  onPhaseChange,
  onCycleComplete,
}: BreathingCircleProps) {
  const brandContent = useThemeColor({}, 'brandContent');
  const bgSecondary = useThemeColor({}, 'bgSecondary');
  const contentStrong = useThemeColor({}, 'contentStrong');

  const scale = useSharedValue(0.6);
  const [currentPhaseIndex, setCurrentPhaseIndex] = React.useState(0);

  const currentPhase = phases[currentPhaseIndex];
  const totalCycleDuration = phases.reduce((sum, p) => sum + p.duration, 0);

  useEffect(() => {
    if (!isActive) {
      scale.value = 0.6;
      return;
    }

    let isMounted = true;
    let phaseIndex = 0;

    const runCycle = () => {
      if (!isMounted) return;

      const phase = phases[phaseIndex];
      setCurrentPhaseIndex(phaseIndex);
      onPhaseChange?.(phase, phaseIndex);

      // Animate based on phase
      if (phase.name.toLowerCase() === 'inhale') {
        scale.value = withTiming(1, {
          duration: phase.duration * 1000,
          easing: Easing.inOut(Easing.ease),
        });
      } else if (phase.name.toLowerCase() === 'exhale') {
        scale.value = withTiming(0.6, {
          duration: phase.duration * 1000,
          easing: Easing.inOut(Easing.ease),
        });
      }
      // Hold keeps the same scale

      // Schedule next phase
      setTimeout(() => {
        if (!isMounted) return;

        phaseIndex = (phaseIndex + 1) % phases.length;

        if (phaseIndex === 0) {
          onCycleComplete?.();
        }

        runCycle();
      }, phase.duration * 1000);
    };

    runCycle();

    return () => {
      isMounted = false;
    };
  }, [isActive, phases]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <View style={styles.container}>
      <View style={[styles.outerRing, { borderColor: bgSecondary }]}>
        <Animated.View
          style={[
            styles.circle,
            { backgroundColor: brandContent + '30' },
            animatedStyle,
          ]}
        >
          <View style={[styles.innerCircle, { backgroundColor: brandContent }]}>
            <ThemedText type="headlineSmall" style={{ color: '#FFFFFF' }}>
              {currentPhase?.name || 'Ready'}
            </ThemedText>
            <ThemedText type="bodySmall" style={{ color: '#FFFFFF', opacity: 0.8 }}>
              {currentPhase?.duration}s
            </ThemedText>
          </View>
        </Animated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  outerRing: {
    width: 250,
    height: 250,
    borderRadius: 125,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  circle: {
    width: 220,
    height: 220,
    borderRadius: 110,
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
