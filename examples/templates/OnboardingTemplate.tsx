import React from 'react';
import { StyleSheet, View } from 'react-native';

import { Logo } from '@/components/logo';
import { Footer } from '@/components/navigation';
import { PageHeader } from '@/components/navigation';
import { StepDots } from '@/components/progress';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useThemeColor } from '@/hooks/use-theme-color';

export function OnboardingTemplate() {
  const contentNormal = useThemeColor({}, 'contentNormal');

  return (
    <ThemedView style={styles.container}>
      {/* Header with Logo */}
      <PageHeader variant="logo" />

      {/* Content */}
      <View style={styles.content}>
        <View style={styles.heroSection}>
          <Logo variant="symbol" size="large" />
          <View style={styles.textSection}>
            <ThemedText type="headlineLarge" style={styles.title}>
              Welcome to the App
            </ThemedText>
            <ThemedText type="bodyLarge" style={[styles.subtitle, { color: contentNormal }]}>
              Discover amazing features and get started on your journey with us today.
            </ThemedText>
          </View>
        </View>

        {/* Step Indicator */}
        <View style={styles.dotsContainer}>
          <StepDots currentStep={1} totalSteps={3} />
        </View>
      </View>

      {/* Footer */}
      <Footer
        variant="twoButtonsVertical"
        primaryLabel="Get Started"
        secondaryLabel="I already have an account"
        onPrimaryPress={() => {}}
        onSecondaryPress={() => {}}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'center',
  },
  heroSection: {
    alignItems: 'center',
    gap: 32,
  },
  textSection: {
    alignItems: 'center',
    gap: 12,
  },
  title: {
    textAlign: 'center',
  },
  subtitle: {
    textAlign: 'center',
    paddingHorizontal: 16,
  },
  dotsContainer: {
    alignItems: 'center',
    marginTop: 48,
  },
});
