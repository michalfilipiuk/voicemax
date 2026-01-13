import React from 'react';
import { StyleSheet, View } from 'react-native';

import { Card } from '@/components/cards';
import { ThemedText } from '@/components/themed-text';
import { useThemeColor } from '@/hooks/use-theme-color';
import { type VoiceCategory } from '@/services/audio';
import { Spacing } from '@/styles/spacing';

interface PitchResultCardProps {
  hz: number;
  category: VoiceCategory;
  percentile: number;
  comparison: string;
}

const CATEGORY_LABELS: Record<VoiceCategory, string> = {
  very_deep: 'Very Deep',
  deep: 'Deep',
  average: 'Average',
  higher: 'Higher',
};

export function PitchResultCard({
  hz,
  category,
  percentile,
  comparison,
}: PitchResultCardProps) {
  const contentNormal = useThemeColor({}, 'contentNormal');
  const contentSubtle = useThemeColor({}, 'contentSubtle');
  const brandContent = useThemeColor({}, 'brandContent');

  return (
    <Card variant="elevated" style={styles.container}>
      <ThemedText type="bodyRegularMedium" style={{ color: contentNormal }}>
        Your Pitch
      </ThemedText>

      <View style={styles.pitchValueContainer}>
        <ThemedText type="headlineDisplay" style={{ color: brandContent }}>
          {hz}
        </ThemedText>
        <ThemedText type="headlineMedium" style={{ color: contentNormal }}>
          Hz
        </ThemedText>
      </View>

      <ThemedText type="bodyRegularMedium" style={{ color: contentSubtle }}>
        {CATEGORY_LABELS[category]}
      </ThemedText>

      <View style={styles.statsRow}>
        <View style={styles.statItem}>
          <ThemedText type="bodySmall" style={{ color: contentSubtle }}>
            Percentile
          </ThemedText>
          <ThemedText type="bodyRegularMedium" style={{ color: brandContent }}>
            {percentile}th
          </ThemedText>
        </View>
      </View>

      <ThemedText
        type="bodySmall"
        style={[styles.comparison, { color: contentNormal }]}
      >
        {comparison}
      </ThemedText>
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: Spacing.xl,
    gap: Spacing.xs,
  },
  pitchValueContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: Spacing.xs,
  },
  statsRow: {
    flexDirection: 'row',
    gap: Spacing.xl,
    marginTop: Spacing.sm,
  },
  statItem: {
    alignItems: 'center',
    gap: 2,
  },
  comparison: {
    textAlign: 'center',
    marginTop: Spacing.sm,
    fontStyle: 'italic',
  },
});
