import React from 'react';
import { StyleSheet, View } from 'react-native';

import { Logo, LogoSize, LogoVariant } from '@/components/logo';
import { ThemedText } from '@/components/themed-text';
import { useThemeColor } from '@/hooks/use-theme-color';

const sizes: LogoSize[] = ['small', 'medium', 'large'];
const variants: LogoVariant[] = ['symbol', 'logomark'];

export function LogoPreview() {
  const contentNormal = useThemeColor({}, 'contentNormal');
  const bgSecondary = useThemeColor({}, 'bgSecondary');
  const alphaMedium = useThemeColor({}, 'alphaMedium');
  const brandContent = useThemeColor({}, 'brandContent');

  return (
    <View style={styles.container}>
      <ThemedText type="headlineLarge">Logo</ThemedText>

      <ThemedText type="bodySmall" style={{ color: contentNormal, marginTop: -12 }}>
        Symbol and logomark variants in three sizes
      </ThemedText>

      {/* Symbol Variant */}
      <View style={styles.section}>
        <ThemedText type="headlineSmall">Symbol</ThemedText>
        <View style={[styles.logoRow, { backgroundColor: bgSecondary, borderColor: alphaMedium }]}>
          {sizes.map((size) => (
            <View key={size} style={styles.logoItem}>
              <Logo variant="symbol" size={size} />
              <ThemedText type="bodySmall" style={{ color: contentNormal }}>
                {size}
              </ThemedText>
            </View>
          ))}
        </View>
      </View>

      {/* Logomark Variant */}
      <View style={styles.section}>
        <ThemedText type="headlineSmall">Logomark</ThemedText>
        <View style={[styles.logoColumn, { backgroundColor: bgSecondary, borderColor: alphaMedium }]}>
          {sizes.map((size) => (
            <View key={size} style={styles.logomarkItem}>
              <Logo variant="logomark" size={size} />
              <ThemedText type="bodySmall" style={{ color: contentNormal }}>
                {size}
              </ThemedText>
            </View>
          ))}
        </View>
      </View>

      {/* Custom Color */}
      <View style={styles.section}>
        <ThemedText type="headlineSmall">Custom Color</ThemedText>
        <View style={[styles.logoRow, { backgroundColor: bgSecondary, borderColor: alphaMedium }]}>
          <View style={styles.logoItem}>
            <Logo variant="symbol" size="medium" color={brandContent} />
            <ThemedText type="bodySmall" style={{ color: contentNormal }}>
              brand
            </ThemedText>
          </View>
          <View style={styles.logoItem}>
            <Logo variant="symbol" size="medium" color="#EF4444" />
            <ThemedText type="bodySmall" style={{ color: contentNormal }}>
              custom
            </ThemedText>
          </View>
        </View>
      </View>

      {/* Developer Note */}
      <View style={styles.section}>
        <ThemedText type="headlineSmall">Swapping the Logo</ThemedText>
        <View style={[styles.codeBlock, { backgroundColor: bgSecondary, borderColor: alphaMedium }]}>
          <ThemedText type="bodySmall" style={{ fontFamily: 'monospace' }}>
            {`// Open components/logo/logo.tsx
// Replace SymbolSvg and LogomarkSvg
// components with your own SVG paths.
//
// Keep viewBox dimensions or adjust
// the sizes config accordingly.`}
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
  section: {
    gap: 12,
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 24,
    padding: 24,
    borderRadius: 12,
    borderWidth: 1,
  },
  logoColumn: {
    gap: 20,
    padding: 24,
    borderRadius: 12,
    borderWidth: 1,
  },
  logoItem: {
    alignItems: 'center',
    gap: 8,
  },
  logomarkItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  codeBlock: {
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
  },
});
