import React from 'react';
import { StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { useThemeColor } from '@/hooks/use-theme-color';

interface TimerDisplayProps {
  seconds: number;
  totalSeconds?: number;
  variant?: 'default' | 'compact' | 'large';
}

export function TimerDisplay({
  seconds,
  totalSeconds,
  variant = 'default',
}: TimerDisplayProps) {
  const brandContent = useThemeColor({}, 'brandContent');
  const contentNormal = useThemeColor({}, 'contentNormal');
  const bgSecondary = useThemeColor({}, 'bgSecondary');

  const formatTime = (secs: number): string => {
    const mins = Math.floor(secs / 60);
    const remainingSecs = secs % 60;
    return `${mins}:${remainingSecs.toString().padStart(2, '0')}`;
  };

  const progress = totalSeconds ? (totalSeconds - seconds) / totalSeconds : 0;

  if (variant === 'compact') {
    return (
      <View style={styles.compactContainer}>
        <ThemedText type="bodyRegularMedium" style={{ color: brandContent }}>
          {formatTime(seconds)}
        </ThemedText>
      </View>
    );
  }

  if (variant === 'large') {
    return (
      <View style={styles.largeContainer}>
        <ThemedText type="headlineDisplay" style={{ color: brandContent }}>
          {formatTime(seconds)}
        </ThemedText>
        {totalSeconds && (
          <View style={[styles.progressTrack, { backgroundColor: bgSecondary }]}>
            <View
              style={[
                styles.progressFill,
                {
                  backgroundColor: brandContent,
                  width: `${progress * 100}%`,
                },
              ]}
            />
          </View>
        )}
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: bgSecondary }]}>
      <ThemedText type="headlineMedium" style={{ color: brandContent }}>
        {formatTime(seconds)}
      </ThemedText>
      {totalSeconds && (
        <ThemedText type="bodySmall" style={{ color: contentNormal }}>
          / {formatTime(totalSeconds)}
        </ThemedText>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 16,
  },
  compactContainer: {
    alignItems: 'center',
  },
  largeContainer: {
    alignItems: 'center',
    gap: 16,
  },
  progressTrack: {
    height: 6,
    width: 200,
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
});
