import React from 'react';
import { StyleSheet, View } from 'react-native';

import { Card } from '@/components/cards';
import { ThemedText } from '@/components/themed-text';
import { useThemeColor } from '@/hooks/use-theme-color';
import { Spacing } from '@/styles/spacing';

interface ExerciseInstructionProps {
  title: string;
  instruction: string;
  phrase?: string;
  repCount?: { current: number; total: number };
}

export function ExerciseInstruction({
  title,
  instruction,
  phrase,
  repCount,
}: ExerciseInstructionProps) {
  const brandContent = useThemeColor({}, 'brandContent');
  const contentNormal = useThemeColor({}, 'contentNormal');
  const contentSubtle = useThemeColor({}, 'contentSubtle');

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <ThemedText type="headlineMedium">{title}</ThemedText>
        {repCount && (
          <ThemedText type="bodyRegularMedium" style={{ color: brandContent }}>
            {repCount.current}/{repCount.total}
          </ThemedText>
        )}
      </View>

      <ThemedText type="bodyRegular" style={{ color: contentNormal }}>
        {instruction}
      </ThemedText>

      {phrase && (
        <Card variant="filled" style={styles.phraseCard}>
          <ThemedText type="bodySmall" style={{ color: contentSubtle }}>
            Say this phrase:
          </ThemedText>
          <ThemedText type="headlineSmall" style={{ color: brandContent }}>
            "{phrase}"
          </ThemedText>
        </Card>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: Spacing.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  phraseCard: {
    padding: Spacing.lg,
    gap: Spacing.sm,
    alignItems: 'center',
  },
});
