import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { useThemeColor } from '@/hooks/use-theme-color';
import { Button, type ButtonVariant, type ButtonSize } from '@/components/buttons';

type VariantInfo = {
  key: ButtonVariant;
  label: string;
  description: string;
};

const variants: VariantInfo[] = [
  { key: 'primary', label: 'Primary', description: 'Main call-to-action buttons' },
  { key: 'secondary', label: 'Secondary', description: 'Secondary actions with less emphasis' },
  { key: 'outline', label: 'Outline', description: 'Bordered buttons for tertiary actions' },
  { key: 'ghost', label: 'Ghost', description: 'Minimal buttons for subtle actions' },
  { key: 'destructive', label: 'Destructive', description: 'Dangerous actions like delete' },
  { key: 'destructiveSecondary', label: 'Destructive Secondary', description: 'Secondary destructive actions' },
];

const sizes: ButtonSize[] = ['lg', 'md', 'sm'];

function VariantSection({ variant }: { variant: VariantInfo }) {
  const alphaMedium = useThemeColor({}, 'alphaMedium');
  const bgSecondary = useThemeColor({}, 'bgSecondary');
  const contentNormal = useThemeColor({}, 'contentNormal');

  return (
    <View style={styles.variantSection}>
      <View style={styles.variantHeader}>
        <ThemedText type="headlineSmall">{variant.label}</ThemedText>
        <ThemedText type="bodySmall" style={{ color: contentNormal }}>
          {variant.description}
        </ThemedText>
      </View>

      <View style={[styles.previewBox, { backgroundColor: bgSecondary, borderColor: alphaMedium }]}>
        {/* States */}
        <View style={styles.row}>
          <View style={styles.labelColumn}>
            <ThemedText type="bodySmall" style={{ color: contentNormal }}>States</ThemedText>
          </View>
          <View style={styles.buttonsRow}>
            <View style={styles.buttonWithLabel}>
              <Button variant={variant.key} title="Default" size="md" />
              <ThemedText type="bodySmall" style={[styles.buttonLabel, { color: contentNormal }]}>
                Default
              </ThemedText>
            </View>
            <View style={styles.buttonWithLabel}>
              <Button variant={variant.key} title="Disabled" size="md" disabled />
              <ThemedText type="bodySmall" style={[styles.buttonLabel, { color: contentNormal }]}>
                Disabled
              </ThemedText>
            </View>
          </View>
        </View>

        <View style={[styles.divider, { backgroundColor: alphaMedium }]} />

        {/* Sizes */}
        <View style={styles.row}>
          <View style={styles.labelColumn}>
            <ThemedText type="bodySmall" style={{ color: contentNormal }}>Sizes</ThemedText>
          </View>
          <View style={styles.buttonsRow}>
            {sizes.map((size) => (
              <View key={size} style={styles.buttonWithLabel}>
                <Button variant={variant.key} title="Button" size={size} />
                <ThemedText type="bodySmall" style={[styles.buttonLabel, { color: contentNormal }]}>
                  {size.toUpperCase()}
                </ThemedText>
              </View>
            ))}
          </View>
        </View>
      </View>
    </View>
  );
}

export function ButtonsPreview() {
  const contentNormal = useThemeColor({}, 'contentNormal');

  return (
    <View style={styles.container}>
      <ThemedText type="headlineLarge">Buttons</ThemedText>
      <ThemedText type="bodySmall" style={{ color: contentNormal, marginTop: -12 }}>
        Button variants, states, and sizes organized by type.
      </ThemedText>

      {variants.map((variant) => (
        <VariantSection key={variant.key} variant={variant} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 24,
  },
  variantSection: {
    gap: 12,
  },
  variantHeader: {
    gap: 4,
  },
  previewBox: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    gap: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 16,
  },
  labelColumn: {
    width: 50,
    paddingTop: 12,
  },
  buttonsRow: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    alignItems: 'flex-end',
  },
  buttonWithLabel: {
    alignItems: 'center',
    gap: 6,
  },
  buttonLabel: {
    fontSize: 11,
  },
  divider: {
    height: 1,
  },
});
