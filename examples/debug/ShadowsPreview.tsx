import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { useThemeColor } from '@/hooks/use-theme-color';
import { Shadows, type ShadowName } from '@/styles/shadows';

type ShadowInfo = {
  name: ShadowName;
  label: string;
  description: string;
  specs: string;
};

const shadowInfos: ShadowInfo[] = [
  {
    name: 'small',
    label: 'Small',
    description: 'Cards, small elements',
    specs: 'offset: 0,2 / blur: 4 / opacity: 8%',
  },
  {
    name: 'medium',
    label: 'Medium',
    description: 'Dropdowns, popovers',
    specs: 'offset: 0,4 / blur: 8 / opacity: 8%',
  },
  {
    name: 'large',
    label: 'Large',
    description: 'Modals, dialogs',
    specs: 'offset: 0,8 / blur: 16 / opacity: 8%',
  },
];

function ShadowSwatch({ info }: { info: ShadowInfo }) {
  const bgMain = useThemeColor({}, 'bgMain');
  const bgSecondary = useThemeColor({}, 'bgSecondary');
  const alphaMedium = useThemeColor({}, 'alphaMedium');
  const contentNormal = useThemeColor({}, 'contentNormal');
  const contentStrong = useThemeColor({}, 'contentStrong');

  const shadowStyle = Shadows[info.name];

  return (
    <View style={styles.swatchContainer}>
      <View
        style={[
          styles.shadowBox,
          shadowStyle,
          { backgroundColor: bgMain, borderColor: alphaMedium },
        ]}
      />
      <View style={styles.swatchInfo}>
        <ThemedText type="bodyRegularMedium" style={{ color: contentStrong }}>
          {info.label}
        </ThemedText>
        <ThemedText type="bodySmall" style={{ color: contentNormal }}>
          {info.description}
        </ThemedText>
        <ThemedText type="bodySmall" style={{ color: contentNormal, fontFamily: 'monospace' }}>
          {info.specs}
        </ThemedText>
      </View>
    </View>
  );
}

export function ShadowsPreview() {
  const contentNormal = useThemeColor({}, 'contentNormal');
  const bgSecondary = useThemeColor({}, 'bgSecondary');
  const alphaMedium = useThemeColor({}, 'alphaMedium');

  return (
    <View style={styles.container}>
      <ThemedText type="headlineLarge">Shadows</ThemedText>

      <ThemedText type="bodySmall" style={{ color: contentNormal, marginTop: -12 }}>
        Elevation styles for depth and hierarchy
      </ThemedText>

      {/* Shadow Swatches */}
      <View style={[styles.swatchesContainer, { backgroundColor: bgSecondary, borderColor: alphaMedium }]}>
        {shadowInfos.map((info) => (
          <ShadowSwatch key={info.name} info={info} />
        ))}
      </View>

      {/* Usage Example */}
      <View style={styles.usageSection}>
        <ThemedText type="headlineSmall">Usage</ThemedText>
        <View style={[styles.codeBlock, { backgroundColor: bgSecondary, borderColor: alphaMedium }]}>
          <ThemedText type="bodySmall" style={{ fontFamily: 'monospace' }}>
            {`import { Shadows } from '@/styles';

<View style={Shadows.small}>
  <Text>Card content</Text>
</View>`}
          </ThemedText>
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
    gap: 24,
    padding: 24,
    borderRadius: 12,
    borderWidth: 1,
  },
  swatchContainer: {
    gap: 16,
    minWidth: 100,
  },
  shadowBox: {
    width: 100,
    height: 80,
    borderRadius: 8,
    borderWidth: 1,
  },
  swatchInfo: {
    gap: 4,
  },
  usageSection: {
    gap: 12,
  },
  codeBlock: {
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
  },
});
