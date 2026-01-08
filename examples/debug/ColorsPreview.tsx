import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { useThemeColor } from '@/hooks/use-theme-color';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

type ColorGroup = {
  title: string;
  colors: { key: keyof typeof Colors.light; label: string }[];
};

const colorGroups: ColorGroup[] = [
  {
    title: 'Brand',
    colors: [
      { key: 'brandBg', label: 'bg' },
      { key: 'brandContent', label: 'content' },
    ],
  },
  {
    title: 'Background',
    colors: [
      { key: 'bgMain', label: 'main' },
      { key: 'bgSecondary', label: 'secondary' },
      { key: 'bgTertiary', label: 'tertiary' },
    ],
  },
  {
    title: 'Content',
    colors: [
      { key: 'contentDisabled', label: 'disabled' },
      { key: 'contentSubtle', label: 'subtle' },
      { key: 'contentNormal', label: 'normal' },
      { key: 'contentMuted', label: 'muted' },
      { key: 'contentStrong', label: 'strong' },
    ],
  },
  {
    title: 'Alpha',
    colors: [
      { key: 'alphaSubtle', label: 'subtle (5%)' },
      { key: 'alphaMedium', label: 'medium (10%)' },
      { key: 'alphaStrong', label: 'strong (15%)' },
    ],
  },
  {
    title: 'Success',
    colors: [
      { key: 'successBg', label: 'bg' },
      { key: 'successContent', label: 'content' },
    ],
  },
  {
    title: 'Error',
    colors: [
      { key: 'errorBg', label: 'bg' },
      { key: 'errorContent', label: 'content' },
    ],
  },
  {
    title: 'Alert',
    colors: [
      { key: 'alertBg', label: 'bg' },
      { key: 'alertContent', label: 'content' },
    ],
  },
  {
    title: 'Info',
    colors: [
      { key: 'infoBg', label: 'bg' },
      { key: 'infoContent', label: 'content' },
    ],
  },
];

function ColorSwatch({ colorKey, label }: { colorKey: keyof typeof Colors.light; label: string }) {
  const colorScheme = useColorScheme() ?? 'light';
  const color = Colors[colorScheme][colorKey];
  const alphaMedium = useThemeColor({}, 'alphaMedium');
  const contentNormal = useThemeColor({}, 'contentNormal');
  const contentStrong = useThemeColor({}, 'contentStrong');

  return (
    <View style={styles.swatch}>
      <View
        style={[
          styles.colorBox,
          { backgroundColor: color, borderColor: alphaMedium },
        ]}
      />
      <View style={styles.colorInfo}>
        <ThemedText style={[styles.colorLabel, { color: contentStrong }]}>
          {label}
        </ThemedText>
        <ThemedText style={[styles.colorValue, { color: contentNormal }]}>
          {color}
        </ThemedText>
      </View>
    </View>
  );
}

function ColorGroupSection({ group }: { group: ColorGroup }) {
  const alphaMedium = useThemeColor({}, 'alphaMedium');

  return (
    <View style={styles.groupContainer}>
      <ThemedText style={styles.groupTitle}>{group.title}</ThemedText>
      <View style={[styles.swatchGrid, { borderColor: alphaMedium }]}>
        {group.colors.map((color) => (
          <ColorSwatch key={color.key} colorKey={color.key} label={color.label} />
        ))}
      </View>
    </View>
  );
}

export function ColorsPreview() {
  return (
    <View style={styles.container}>
      <ThemedText style={styles.sectionTitle}>Colors</ThemedText>
      <ThemedText style={styles.sectionDescription}>
        All colors automatically adapt to the current theme.
      </ThemedText>
      {colorGroups.map((group) => (
        <ColorGroupSection key={group.title} group={group} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '700',
  },
  sectionDescription: {
    fontSize: 14,
    opacity: 0.7,
    marginTop: -16,
  },
  groupContainer: {
    gap: 12,
  },
  groupTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  swatchGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
  },
  swatch: {
    width: '30%',
    minWidth: 90,
    gap: 8,
  },
  colorBox: {
    height: 60,
    borderRadius: 8,
    borderWidth: 0.5,
  },
  colorInfo: {
    gap: 2,
  },
  colorLabel: {
    fontSize: 13,
    fontWeight: '500',
  },
  colorValue: {
    fontSize: 11,
    fontFamily: 'monospace',
  },
});
