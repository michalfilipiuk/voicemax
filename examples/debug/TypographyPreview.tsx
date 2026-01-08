import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ThemedText, type TextType } from '@/components/themed-text';
import { useThemeColor } from '@/hooks/use-theme-color';
import { Typography } from '@/styles/typography';

type TypographyStyle = {
  name: string;
  type: TextType;
  specs: string;
};

type TypographyGroup = {
  title: string;
  styles: TypographyStyle[];
};

const typographyGroups: TypographyGroup[] = [
  {
    title: 'Headlines',
    styles: [
      { name: 'Headline Display', type: 'headlineDisplay', specs: '32px / 36px / 600 / -1%' },
      { name: 'Headline Large', type: 'headlineLarge', specs: '24px / 28px / 600 / -1%' },
      { name: 'Headline Medium', type: 'headlineMedium', specs: '20px / 24px / 600 / -1%' },
      { name: 'Headline Small', type: 'headlineSmall', specs: '16px / 20px / 600 / 0%' },
    ],
  },
  {
    title: 'Body Large',
    styles: [
      { name: 'Body Large', type: 'bodyLarge', specs: '16px / 20px / 400 / 0%' },
      { name: 'Body Large - Long', type: 'bodyLargeLong', specs: '16px / 24px / 400 / 0%' },
      { name: 'Body Large - Medium', type: 'bodyLargeMedium', specs: '16px / 20px / 500 / 0%' },
    ],
  },
  {
    title: 'Body Regular',
    styles: [
      { name: 'Body Regular', type: 'bodyRegular', specs: '14px / 18px / 400 / 0%' },
      { name: 'Body Regular - Long', type: 'bodyRegularLong', specs: '14px / 20px / 400 / 0%' },
      { name: 'Body Regular - Medium', type: 'bodyRegularMedium', specs: '14px / 18px / 500 / 0%' },
    ],
  },
  {
    title: 'Body Small',
    styles: [
      { name: 'Body Small', type: 'bodySmall', specs: '12px / 16px / 400 / 0%' },
      { name: 'Body Small - Medium', type: 'bodySmallMedium', specs: '12px / 16px / 500 / 0%' },
    ],
  },
];

function TypographySample({ style }: { style: TypographyStyle }) {
  const alphaMedium = useThemeColor({}, 'alphaMedium');
  const contentNormal = useThemeColor({}, 'contentNormal');
  const bgSecondary = useThemeColor({}, 'bgSecondary');

  return (
    <View style={[styles.sample, { backgroundColor: bgSecondary, borderColor: alphaMedium }]}>
      <View style={styles.sampleHeader}>
        <ThemedText type="bodySmallMedium" style={{ color: contentNormal }}>
          {style.name}
        </ThemedText>
        <ThemedText type="bodySmall" style={{ color: contentNormal, fontFamily: 'monospace' }}>
          {style.specs}
        </ThemedText>
      </View>
      <ThemedText type={style.type}>
        The quick brown fox jumps over the lazy dog
      </ThemedText>
    </View>
  );
}

function TypographyGroupSection({ group }: { group: TypographyGroup }) {
  const alphaMedium = useThemeColor({}, 'alphaMedium');

  return (
    <View style={styles.groupContainer}>
      <ThemedText type="headlineSmall">{group.title}</ThemedText>
      <View style={styles.samplesContainer}>
        {group.styles.map((style) => (
          <TypographySample key={style.type} style={style} />
        ))}
      </View>
    </View>
  );
}

export function TypographyPreview() {
  const contentNormal = useThemeColor({}, 'contentNormal');
  const infoContent = useThemeColor({}, 'infoContent');

  return (
    <View style={styles.container}>
      <ThemedText type="headlineLarge">Typography</ThemedText>

      {/* Font Family Info */}
      <View style={styles.fontFamilySection}>
        <ThemedText type="bodySmall" style={{ color: contentNormal }}>
          Font family
        </ThemedText>
        <ThemedText type="headlineMedium">
          {Typography.fontFamily}
        </ThemedText>
      </View>

      {/* Spec Legend */}
      <View style={styles.legend}>
        <ThemedText type="bodySmall" style={{ color: contentNormal }}>
          Specs format: size / line-height / weight / letter-spacing
        </ThemedText>
      </View>

      {/* Typography Groups */}
      {typographyGroups.map((group) => (
        <TypographyGroupSection key={group.title} group={group} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 24,
  },
  fontFamilySection: {
    gap: 4,
  },
  legend: {
    marginTop: -12,
  },
  groupContainer: {
    gap: 12,
  },
  samplesContainer: {
    gap: 12,
  },
  sample: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    gap: 12,
  },
  sampleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
