import * as Haptics from 'expo-haptics';
import { useRouter } from 'expo-router';
import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Button } from '@/components/buttons';
import { TimerDisplay } from '@/components/exercise';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useThemeColor } from '@/hooks/use-theme-color';
import { Spacing } from '@/styles/spacing';

const REST_DURATION = 10; // 10 seconds rest

export default function RestScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const contentNormal = useThemeColor({}, 'contentNormal');

  const [timeRemaining, setTimeRemaining] = useState(REST_DURATION);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          handleContinue();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleContinue = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.replace('/workout/exercise');
  };

  return (
    <ThemedView style={styles.container}>
      <View style={[styles.content, { paddingTop: insets.top }]}>
        <View style={styles.main}>
          <ThemedText type="headlineLarge" style={styles.title}>
            Take a Breath
          </ThemedText>
          <ThemedText type="bodyRegular" style={{ color: contentNormal, textAlign: 'center' }}>
            Rest and prepare for the next exercise
          </ThemedText>

          <View style={styles.timerContainer}>
            <TimerDisplay
              seconds={timeRemaining}
              totalSeconds={REST_DURATION}
              variant="large"
            />
          </View>
        </View>

        <View style={[styles.footer, { paddingBottom: insets.bottom + Spacing.md }]}>
          <Button
            title="Skip Rest"
            variant="secondary"
            size="lg"
            onPress={handleContinue}
            style={styles.skipButton}
          />
        </View>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  main: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.lg,
    gap: Spacing.md,
  },
  title: {
    textAlign: 'center',
  },
  timerContainer: {
    marginTop: Spacing.xl,
  },
  footer: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.md,
  },
  skipButton: {
    width: '100%',
  },
});
