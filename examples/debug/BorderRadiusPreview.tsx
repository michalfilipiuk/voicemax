import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { useThemeColor } from '@/hooks/use-theme-color';
import { BorderRadius, Rounded, type BorderRadiusName } from '@/styles/spacing';

type RadiusInfo = {
  name: BorderRadiusName;
  label: string;
  value: number;
};

const radiusInfos: RadiusInfo[] = [
  { name: 'none', label: 'none', value: BorderRadius.none },
  { name: 'xs', label: 'x-small', value: BorderRadius.xs },
  { name: 'sm', label: 'small', value: BorderRadius.sm },
  { name: 'md', label: 'medium', value: BorderRadius.md },
  { name: 'lg', label: 'large', value: BorderRadius.lg },
  { name: 'xl', label: 'x-large', value: BorderRadius.xl },
  { name: 'xxl', label: 'xx-large', value: BorderRadius.xxl },
  { name: 'full', label: 'full', value: BorderRadius.full },
];

function RadiusSwatch({ info }: { info: RadiusInfo }) {
  const brandContent = useThemeColor({}, 'brandContent');
  const contentStrong = useThemeColor({}, 'contentStrong');
  const contentNormal = useThemeColor({}, 'contentNormal');

  return (
    <View style={styles.swatchContainer}>
      <View
        style={[
          styles.radiusBox,
          Rounded[info.name],
          {
            backgroundColor: brandContent,
          },
        ]}
      />
      <View style={styles.swatchInfo}>
        <ThemedText type="bodyRegularMedium" style={{ color: contentStrong }}>
          {info.label}
        </ThemedText>
        <ThemedText type="bodySmall" style={{ color: contentNormal }}>
          {info.value}px
        </ThemedText>
      </View>
    </View>
  );
}

export function BorderRadiusPreview() {
  const contentNormal = useThemeColor({}, 'contentNormal');
  const bgSecondary = useThemeColor({}, 'bgSecondary');
  const alphaMedium = useThemeColor({}, 'alphaMedium');

  return (
    <View style={styles.container}>
      <ThemedText type="headlineLarge">Border Radius</ThemedText>

      <ThemedText type="bodySmall" style={{ color: contentNormal, marginTop: -12 }}>
        Corner smoothing applied in Figma: 60% (iOS-style continuous corners)
      </ThemedText>

      {/* Radius Swatches */}
      <View style={[styles.swatchesContainer, { backgroundColor: bgSecondary, borderColor: alphaMedium }]}>
        {radiusInfos.map((info) => (
          <RadiusSwatch key={info.name} info={info} />
        ))}
      </View>

      {/* Usage Example */}
      <View style={styles.usageSection}>
        <ThemedText type="headlineSmall">Usage</ThemedText>
        <View style={[styles.codeBlock, { backgroundColor: bgSecondary, borderColor: alphaMedium }]}>
          <ThemedText type="bodySmall" style={{ fontFamily: 'monospace' }}>
            {`import { Rounded } from '@/styles';

// Use Rounded for iOS continuous corners
<View style={[styles.card, Rounded.md]}>
  <Text>Card with 8px corners</Text>
</View>

<View style={[styles.pill, Rounded.full]}>
  <Text>Pill button</Text>
</View>

// Or spread in StyleSheet
const styles = StyleSheet.create({
  card: { ...Rounded.lg },
});`}
          </ThemedText>
        </View>
      </View>

      {/* Token Reference */}
      <View style={styles.usageSection}>
        <ThemedText type="headlineSmall">Tokens</ThemedText>
        <View style={[styles.tokenList, { backgroundColor: bgSecondary, borderColor: alphaMedium }]}>
          {radiusInfos.map((info) => (
            <View key={info.name} style={styles.tokenRow}>
              <ThemedText type="bodySmall" style={{ fontFamily: 'monospace', flex: 1 }}>
                BorderRadius.{info.name}
              </ThemedText>
              <ThemedText type="bodySmall" style={{ color: contentNormal }}>
                {info.value}px
              </ThemedText>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 24,
  },
  swatchesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 20,
    padding: 24,
    borderRadius: 12,
    borderWidth: 1,
  },
  swatchContainer: {
    gap: 12,
    alignItems: 'center',
  },
  radiusBox: {
    width: 80,
    height: 64,
  },
  swatchInfo: {
    alignItems: 'center',
    gap: 2,
  },
  usageSection: {
    gap: 12,
  },
  codeBlock: {
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
  },
  tokenList: {
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    gap: 8,
  },
  tokenRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
