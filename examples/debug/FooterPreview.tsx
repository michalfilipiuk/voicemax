import React from 'react';
import { StyleSheet, View } from 'react-native';

import { Footer, FooterVariant } from '@/components/navigation';
import { ThemedText } from '@/components/themed-text';
import { useThemeColor } from '@/hooks/use-theme-color';

const variants: { variant: FooterVariant; label: string }[] = [
  { variant: 'oneButton', label: 'One Button' },
  { variant: 'twoButtonsVertical', label: 'Two Buttons - Vertical' },
  { variant: 'twoButtonsHorizontal', label: 'Two Buttons - Horizontal' },
  { variant: 'oneButtonRight', label: 'One Button - Right' },
];

export function FooterPreview() {
  const contentNormal = useThemeColor({}, 'contentNormal');
  const alphaMedium = useThemeColor({}, 'alphaMedium');

  return (
    <View style={styles.container}>
      <ThemedText type="headlineLarge">Footer</ThemedText>

      <ThemedText type="bodySmall" style={{ color: contentNormal, marginTop: -12 }}>
        Bottom action bar for pages with multiple layout variants
      </ThemedText>

      {/* All Variants */}
      {variants.map(({ variant, label }) => (
        <View key={variant} style={styles.section}>
          <ThemedText type="headlineSmall">{label}</ThemedText>
          <View style={[styles.footerContainer, { borderColor: alphaMedium }]}>
            <Footer
              variant={variant}
              primaryLabel="Continue"
              secondaryLabel="Go Back"
              onPrimaryPress={() => console.log('Primary pressed')}
              onSecondaryPress={() => console.log('Secondary pressed')}
            />
          </View>
        </View>
      ))}

      {/* With Text */}
      <View style={styles.section}>
        <ThemedText type="headlineSmall">With Text</ThemedText>
        <View style={[styles.footerContainer, { borderColor: alphaMedium }]}>
          <Footer
            variant="oneButton"
            primaryLabel="Create Account"
            text="By continuing, you agree to our Terms of Service"
            onPrimaryPress={() => console.log('Primary pressed')}
          />
        </View>
      </View>

      {/* Two Buttons Vertical With Text */}
      <View style={styles.section}>
        <ThemedText type="headlineSmall">Vertical + Text</ThemedText>
        <View style={[styles.footerContainer, { borderColor: alphaMedium }]}>
          <Footer
            variant="twoButtonsVertical"
            primaryLabel="Accept"
            secondaryLabel="Decline"
            text="Your selection will be saved"
            onPrimaryPress={() => console.log('Accept')}
            onSecondaryPress={() => console.log('Decline')}
          />
        </View>
      </View>

      {/* Disabled State */}
      <View style={styles.section}>
        <ThemedText type="headlineSmall">Disabled Primary</ThemedText>
        <View style={[styles.footerContainer, { borderColor: alphaMedium }]}>
          <Footer
            variant="twoButtonsHorizontal"
            primaryLabel="Submit"
            secondaryLabel="Cancel"
            primaryDisabled
            onPrimaryPress={() => console.log('Submit')}
            onSecondaryPress={() => console.log('Cancel')}
          />
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
  footerContainer: {
    borderWidth: 1,
    borderRadius: 12,
    overflow: 'hidden',
  },
});
