import React from 'react';
import { StyleSheet, View } from 'react-native';

import { Badge, BadgeType } from '@/components/badges/badge';
import { ThemedText } from '@/components/themed-text';
import { useThemeColor } from '@/hooks/use-theme-color';

const badgeTypes: { type: BadgeType; label: string }[] = [
  { type: 'default', label: 'Default' },
  { type: 'info', label: 'Info' },
  { type: 'alert', label: 'Alert' },
  { type: 'error', label: 'Error' },
  { type: 'success', label: 'Success' },
];

export function BadgePreview() {
  const contentNormal = useThemeColor({}, 'contentNormal');

  return (
    <View style={styles.container}>
      <ThemedText type="headlineLarge">Badge</ThemedText>

      <ThemedText type="bodySmall" style={{ color: contentNormal, marginTop: -12 }}>
        Simple status indicators with 5 color variants
      </ThemedText>

      {/* All Badge Types */}
      <View style={styles.section}>
        <ThemedText type="headlineSmall">Types</ThemedText>
        <View style={styles.badgeRow}>
          {badgeTypes.map(({ type, label }) => (
            <Badge key={type} type={type} label={label} />
          ))}
        </View>
      </View>

      {/* Usage Examples */}
      <View style={styles.section}>
        <ThemedText type="headlineSmall">Usage Examples</ThemedText>
        <View style={styles.exampleRow}>
          <Badge type="success" label="Active" />
          <Badge type="error" label="Expired" />
          <Badge type="alert" label="Pending" />
          <Badge type="info" label="New" />
          <Badge type="default" label="Draft" />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 24,
  },
  section: {
    gap: 12,
  },
  badgeRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  exampleRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
});
