import { Mic01Icon, ChartAverageIcon, Target01Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react-native';
import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import { Logo } from '@/components/logo';
import { Footer, PageHeader } from '@/components/navigation';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useThemeColor } from '@/hooks/use-theme-color';
import { Spacing } from '@/styles/spacing';

const VALUE_PROPS = [
  {
    icon: Mic01Icon,
    text: 'Measure your voice pitch with precision',
  },
  {
    icon: ChartAverageIcon,
    text: 'Track your progress over time',
  },
  {
    icon: Target01Icon,
    text: 'Achieve a deeper, more confident voice',
  },
];

export default function WelcomeScreen() {
  const router = useRouter();
  const contentNormal = useThemeColor({}, 'contentNormal');
  const brandContent = useThemeColor({}, 'brandContent');

  const handleGetStarted = () => {
    router.push('/(onboarding)/name');
  };

  return (
    <ThemedView style={styles.container}>
      <PageHeader variant="logo" />

      <View style={styles.content}>
        <View style={styles.heroSection}>
          <Logo variant="symbol" size="large" />

          <View style={styles.textSection}>
            <ThemedText type="headlineLarge" style={styles.title}>
              Unlock Your Deeper Voice
            </ThemedText>
            <ThemedText
              type="bodyLarge"
              style={[styles.subtitle, { color: contentNormal }]}
            >
              Train your voice to sound more confident, authoritative, and
              masculine.
            </ThemedText>
          </View>
        </View>

        <View style={styles.valueProps}>
          {VALUE_PROPS.map((prop, index) => (
            <View key={index} style={styles.valueProp}>
              <View
                style={[styles.iconContainer, { backgroundColor: brandContent }]}
              >
                <HugeiconsIcon icon={prop.icon} size={20} color="#FFFFFF" />
              </View>
              <ThemedText type="bodyRegular" style={styles.valueText}>
                {prop.text}
              </ThemedText>
            </View>
          ))}
        </View>
      </View>

      <Footer
        variant="oneButton"
        primaryLabel="Get Started"
        onPrimaryPress={handleGetStarted}
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
    paddingHorizontal: Spacing.lg,
    justifyContent: 'center',
  },
  heroSection: {
    alignItems: 'center',
    gap: Spacing.xl,
  },
  textSection: {
    alignItems: 'center',
    gap: Spacing.sm,
  },
  title: {
    textAlign: 'center',
  },
  subtitle: {
    textAlign: 'center',
    paddingHorizontal: Spacing.md,
  },
  valueProps: {
    marginTop: Spacing.xxl,
    gap: Spacing.md,
  },
  valueProp: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  valueText: {
    flex: 1,
  },
});
