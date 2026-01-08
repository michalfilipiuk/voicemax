import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { useThemeColor } from '@/hooks/use-theme-color';
import { IconButton, type IconButtonVariant, type IconButtonSize } from '@/components/buttons';
import { HugeiconsIcon } from '@hugeicons/react-native';
import { GridIcon } from '@hugeicons/core-free-icons';

type VariantInfo = {
  key: IconButtonVariant;
  label: string;
  description: string;
};

const variants: VariantInfo[] = [
  { key: 'primary', label: 'Primary', description: 'Main call-to-action icon buttons' },
  { key: 'secondary', label: 'Secondary', description: 'Secondary actions with less emphasis' },
  { key: 'outline', label: 'Outline', description: 'Bordered icon buttons for tertiary actions' },
  { key: 'ghost', label: 'Ghost', description: 'Minimal icon buttons for subtle actions' },
];

const sizes: IconButtonSize[] = ['lg', 'md', 'sm'];

// Icon sizes matching button sizes
const iconSizes: Record<IconButtonSize, number> = {
  lg: 24,
  md: 20,
  sm: 16,
};

function VariantSection({ variant }: { variant: VariantInfo }) {
  const alphaMedium = useThemeColor({}, 'alphaMedium');
  const bgSecondary = useThemeColor({}, 'bgSecondary');
  const contentNormal = useThemeColor({}, 'contentNormal');
  const contentStrong = useThemeColor({}, 'contentStrong');

  // Get icon color based on variant
  const getIconColor = (v: IconButtonVariant) => {
    if (v === 'primary') return '#FFFFFF';
    return contentStrong;
  };

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
              <IconButton
                variant={variant.key}
                size="md"
                icon={<HugeiconsIcon icon={GridIcon} size={iconSizes.md} color={getIconColor(variant.key)} />}
              />
              <ThemedText type="bodySmall" style={[styles.buttonLabel, { color: contentNormal }]}>
                Default
              </ThemedText>
            </View>
            <View style={styles.buttonWithLabel}>
              <IconButton
                variant={variant.key}
                size="md"
                disabled
                icon={<HugeiconsIcon icon={GridIcon} size={iconSizes.md} color={getIconColor(variant.key)} />}
              />
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
                <IconButton
                  variant={variant.key}
                  size={size}
                  icon={<HugeiconsIcon icon={GridIcon} size={iconSizes[size]} color={getIconColor(variant.key)} />}
                />
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

export function IconButtonsPreview() {
  const contentNormal = useThemeColor({}, 'contentNormal');

  return (
    <View style={styles.container}>
      <ThemedText type="headlineLarge">Icon Buttons</ThemedText>
      <ThemedText type="bodySmall" style={{ color: contentNormal, marginTop: -12 }}>
        Circular icon buttons with variants, states, and sizes. Using Hugeicons.
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
