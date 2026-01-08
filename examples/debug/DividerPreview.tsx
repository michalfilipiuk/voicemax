import React from 'react';
import { View, StyleSheet } from 'react-native';

import { Divider } from '@/components/layout';
import { ThemedText } from '@/components/themed-text';
import { useThemeColor } from '@/hooks/use-theme-color';

export function DividerPreview() {
  const alphaMedium = useThemeColor({}, 'alphaMedium');
  const bgSecondary = useThemeColor({}, 'bgSecondary');
  const contentNormal = useThemeColor({}, 'contentNormal');
  const brandContent = useThemeColor({}, 'brandContent');

  return (
    <View style={styles.container}>
      <ThemedText type="headlineLarge">Divider</ThemedText>
      <ThemedText type="bodySmall" style={{ color: contentNormal, marginTop: -12 }}>
        Visual separator for content sections.
      </ThemedText>

      {/* Horizontal (Default) */}
      <View style={styles.groupContainer}>
        <ThemedText type="headlineSmall">Horizontal (Default)</ThemedText>
        <View style={[styles.previewBox, { backgroundColor: bgSecondary, borderColor: alphaMedium }]}>
          <ThemedText type="bodyRegular">Section 1</ThemedText>
          <Divider />
          <ThemedText type="bodyRegular">Section 2</ThemedText>
          <Divider />
          <ThemedText type="bodyRegular">Section 3</ThemedText>
        </View>
      </View>

      {/* Vertical */}
      <View style={styles.groupContainer}>
        <ThemedText type="headlineSmall">Vertical</ThemedText>
        <View style={[styles.previewBox, styles.horizontalBox, { backgroundColor: bgSecondary, borderColor: alphaMedium }]}>
          <ThemedText type="bodyRegular">Left</ThemedText>
          <Divider orientation="vertical" />
          <ThemedText type="bodyRegular">Center</ThemedText>
          <Divider orientation="vertical" />
          <ThemedText type="bodyRegular">Right</ThemedText>
        </View>
      </View>

      {/* Custom Spacing */}
      <View style={styles.groupContainer}>
        <ThemedText type="headlineSmall">Custom Spacing</ThemedText>
        <View style={[styles.previewBox, { backgroundColor: bgSecondary, borderColor: alphaMedium }]}>
          <ThemedText type="bodySmall" style={{ color: contentNormal }}>
            spacing=4
          </ThemedText>
          <Divider spacing={4} />
          <ThemedText type="bodySmall" style={{ color: contentNormal }}>
            spacing=24
          </ThemedText>
          <Divider spacing={24} />
          <ThemedText type="bodySmall" style={{ color: contentNormal }}>
            spacing=0 (no margin)
          </ThemedText>
          <Divider spacing={0} />
          <ThemedText type="bodySmall" style={{ color: contentNormal }}>
            Next section
          </ThemedText>
        </View>
      </View>

      {/* Custom Color */}
      <View style={styles.groupContainer}>
        <ThemedText type="headlineSmall">Custom Color</ThemedText>
        <View style={[styles.previewBox, { backgroundColor: bgSecondary, borderColor: alphaMedium }]}>
          <ThemedText type="bodyRegular">Default color</ThemedText>
          <Divider />
          <ThemedText type="bodyRegular">Brand color</ThemedText>
          <Divider color={brandContent} />
          <ThemedText type="bodyRegular">End</ThemedText>
        </View>
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
  previewBox: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  horizontalBox: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 60,
  },
});
