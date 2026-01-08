import { Mic01Icon, ArrowDown01Icon, ArrowUp01Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react-native';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import { Button } from '@/components/buttons';
import { Card } from '@/components/cards';
import { ThemedText } from '@/components/themed-text';
import { useThemeColor } from '@/hooks/use-theme-color';
import { Spacing, BorderRadius } from '@/styles/spacing';

interface VoiceStatsCardProps {
  currentPitch?: number;
  baselinePitch?: number;
  trend?: 'up' | 'down' | 'stable';
  onMeasurePress: () => void;
}

export function VoiceStatsCard({
  currentPitch,
  baselinePitch,
  trend,
  onMeasurePress,
}: VoiceStatsCardProps) {
  const brandContent = useThemeColor({}, 'brandContent');
  const contentNormal = useThemeColor({}, 'contentNormal');
  const contentSubtle = useThemeColor({}, 'contentSubtle');
  const successContent = useThemeColor({}, 'successContent');
  const errorContent = useThemeColor({}, 'errorContent');
  const bgSecondary = useThemeColor({}, 'bgSecondary');

  const displayPitch = currentPitch || baselinePitch;
  const improvement = baselinePitch && currentPitch ? baselinePitch - currentPitch : 0;

  const getTrendIcon = () => {
    if (!trend || trend === 'stable') return null;

    // For voice training, down is good (lower pitch)
    const isPositive = trend === 'down';
    const icon = trend === 'down' ? ArrowDown01Icon : ArrowUp01Icon;
    const color = isPositive ? successContent : errorContent;

    return (
      <View style={[styles.trendBadge, { backgroundColor: color + '20' }]}>
        <HugeiconsIcon icon={icon} size={16} color={color} />
        <ThemedText type="bodySmall" style={{ color }}>
          {Math.abs(improvement)} Hz
        </ThemedText>
      </View>
    );
  };

  return (
    <Card variant="elevated" style={styles.card}>
      <View style={styles.header}>
        <View style={[styles.iconCircle, { backgroundColor: bgSecondary }]}>
          <HugeiconsIcon icon={Mic01Icon} size={24} color={brandContent} />
        </View>
        <ThemedText type="bodyRegularMedium">Voice Stats</ThemedText>
      </View>

      <View style={styles.content}>
        {displayPitch ? (
          <>
            <View style={styles.pitchRow}>
              <ThemedText type="headlineLarge" style={{ color: brandContent }}>
                {displayPitch}
              </ThemedText>
              <ThemedText type="bodyRegular" style={{ color: contentNormal }}>
                {' '}Hz
              </ThemedText>
              {getTrendIcon()}
            </View>
            <ThemedText type="bodySmall" style={{ color: contentSubtle }}>
              {currentPitch ? 'Latest measurement' : 'Baseline pitch'}
            </ThemedText>
          </>
        ) : (
          <ThemedText type="bodyRegular" style={{ color: contentSubtle }}>
            No measurements yet
          </ThemedText>
        )}
      </View>

      <Button
        title="Measure Now"
        variant="secondary"
        size="md"
        onPress={onMeasurePress}
      />
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: Spacing.lg,
    gap: Spacing.md,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    gap: Spacing.xs,
  },
  pitchRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  trendBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginLeft: Spacing.sm,
    paddingVertical: 2,
    paddingHorizontal: Spacing.sm,
    borderRadius: BorderRadius.full,
  },
});
