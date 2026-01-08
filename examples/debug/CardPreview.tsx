import React from 'react';
import { View, StyleSheet } from 'react-native';

import { Card } from '@/components/cards';
import { ThemedText } from '@/components/themed-text';
import { useThemeColor } from '@/hooks/use-theme-color';

export function CardPreview() {
  const contentNormal = useThemeColor({}, 'contentNormal');

  return (
    <View style={styles.container}>
      <ThemedText type="headlineLarge">Card</ThemedText>
      <ThemedText type="bodySmall" style={{ color: contentNormal, marginTop: -12 }}>
        Content container with multiple style variants.
      </ThemedText>

      {/* Elevated Variant */}
      <View style={styles.groupContainer}>
        <ThemedText type="headlineSmall">Elevated (Default)</ThemedText>
        <Card variant="elevated">
          <ThemedText type="bodyRegularMedium">Elevated Card</ThemedText>
          <ThemedText type="bodySmall" style={{ color: contentNormal, marginTop: 4 }}>
            This card has a subtle shadow for depth.
          </ThemedText>
        </Card>
      </View>

      {/* Outlined Variant */}
      <View style={styles.groupContainer}>
        <ThemedText type="headlineSmall">Outlined</ThemedText>
        <Card variant="outlined">
          <ThemedText type="bodyRegularMedium">Outlined Card</ThemedText>
          <ThemedText type="bodySmall" style={{ color: contentNormal, marginTop: 4 }}>
            This card has a border instead of shadow.
          </ThemedText>
        </Card>
      </View>

      {/* Filled Variant */}
      <View style={styles.groupContainer}>
        <ThemedText type="headlineSmall">Filled</ThemedText>
        <Card variant="filled">
          <ThemedText type="bodyRegularMedium">Filled Card</ThemedText>
          <ThemedText type="bodySmall" style={{ color: contentNormal, marginTop: 4 }}>
            This card has a secondary background color.
          </ThemedText>
        </Card>
      </View>

      {/* Custom Padding */}
      <View style={styles.groupContainer}>
        <ThemedText type="headlineSmall">Custom Padding</ThemedText>
        <Card variant="outlined" padding={24}>
          <ThemedText type="bodyRegularMedium">Extra Padding</ThemedText>
          <ThemedText type="bodySmall" style={{ color: contentNormal, marginTop: 4 }}>
            This card has 24px padding instead of the default 16px.
          </ThemedText>
        </Card>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 24,
  },
  groupContainer: {
    gap: 12,
  },
});
