import {
  Tick01Icon,
  Mic01Icon,
  ChartAverageIcon,
  Calendar01Icon,
  Target01Icon,
} from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react-native';
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import { Card } from '@/components/cards';
import { Footer, PageHeader } from '@/components/navigation';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useUser } from '@/context/UserContext';
import { useThemeColor } from '@/hooks/use-theme-color';
import { Spacing, BorderRadius } from '@/styles/spacing';

const TOTAL_STEPS = 12;

const FEATURES = [
  {
    icon: Mic01Icon,
    title: 'Voice Analysis',
    description: 'Track your pitch with precision',
  },
  {
    icon: Calendar01Icon,
    title: 'Daily Workouts',
    description: '5-15 minute guided exercises',
  },
  {
    icon: ChartAverageIcon,
    title: 'Progress Tracking',
    description: 'See your improvement over time',
  },
  {
    icon: Target01Icon,
    title: 'Personalized Goals',
    description: 'Training tailored to your voice',
  },
];

export default function PaywallScreen() {
  const router = useRouter();
  const { user, completeOnboarding } = useUser();
  const contentNormal = useThemeColor({}, 'contentNormal');
  const contentSubtle = useThemeColor({}, 'contentSubtle');
  const brandContent = useThemeColor({}, 'brandContent');
  const successContent = useThemeColor({}, 'successContent');
  const bgSecondary = useThemeColor({}, 'bgSecondary');

  const handleStartTrial = async () => {
    // For MVP, just complete onboarding
    await completeOnboarding();
    router.replace('/(tabs)');
  };

  const handleMaybeLater = async () => {
    // Also completes onboarding but could set a flag for limited features
    await completeOnboarding();
    router.replace('/(tabs)');
  };

  const goalLabels: Record<string, string> = {
    authority: 'Sound more authoritative at work',
    social: 'Build social confidence',
    dating: 'Improve dating and attraction',
    content: 'Better voice for content',
    self_improvement: 'General self-improvement',
  };

  return (
    <ThemedView style={styles.container}>
      <PageHeader variant="progress" currentStep={12} totalSteps={TOTAL_STEPS} />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.headerSection}>
          <ThemedText type="headlineLarge" style={styles.title}>
            Your program is ready, {user.firstName || 'there'}!
          </ThemedText>
        </View>

        {/* Summary card */}
        <Card variant="elevated" style={styles.summaryCard}>
          <ThemedText
            type="bodyRegularMedium"
            style={styles.summaryTitle}
          >
            Your Training Plan
          </ThemedText>

          <View style={styles.summaryRow}>
            <ThemedText type="bodyRegular" style={{ color: contentNormal }}>
              Starting pitch
            </ThemedText>
            <ThemedText type="bodyRegularMedium" style={{ color: brandContent }}>
              {user.baselinePitch} Hz
            </ThemedText>
          </View>

          <View style={styles.summaryRow}>
            <ThemedText type="bodyRegular" style={{ color: contentNormal }}>
              Target pitch
            </ThemedText>
            <ThemedText type="bodyRegularMedium" style={{ color: successContent }}>
              {user.targetPitch} Hz
            </ThemedText>
          </View>

          <View style={styles.summaryRow}>
            <ThemedText type="bodyRegular" style={{ color: contentNormal }}>
              Daily commitment
            </ThemedText>
            <ThemedText type="bodyRegularMedium">
              {user.dailyCommitment} minutes
            </ThemedText>
          </View>

          <View style={styles.summaryRow}>
            <ThemedText type="bodyRegular" style={{ color: contentNormal }}>
              Goal
            </ThemedText>
            <ThemedText
              type="bodyRegularMedium"
              style={styles.goalText}
              numberOfLines={1}
            >
              {user.primaryGoal ? goalLabels[user.primaryGoal] : 'Deeper voice'}
            </ThemedText>
          </View>
        </Card>

        {/* Features list */}
        <View style={styles.featuresSection}>
          <ThemedText type="bodyRegularMedium" style={styles.featuresTitle}>
            What's Included
          </ThemedText>

          {FEATURES.map((feature, index) => (
            <View key={index} style={styles.featureRow}>
              <View
                style={[
                  styles.featureIconContainer,
                  { backgroundColor: bgSecondary },
                ]}
              >
                <HugeiconsIcon
                  icon={feature.icon}
                  size={20}
                  color={brandContent}
                />
              </View>
              <View style={styles.featureText}>
                <ThemedText type="bodyRegularMedium">{feature.title}</ThemedText>
                <ThemedText type="bodySmall" style={{ color: contentSubtle }}>
                  {feature.description}
                </ThemedText>
              </View>
              <HugeiconsIcon
                icon={Tick01Icon}
                size={20}
                color={successContent}
              />
            </View>
          ))}
        </View>

        {/* Pricing card (placeholder) */}
        <Card
          variant="outlined"
          style={StyleSheet.flatten([styles.pricingCard, { borderColor: brandContent }])}
        >
          <View style={styles.pricingHeader}>
            <ThemedText type="headlineSmall">7-Day Free Trial</ThemedText>
            <View
              style={[
                styles.popularBadge,
                { backgroundColor: brandContent + '20' },
              ]}
            >
              <ThemedText type="bodySmall" style={{ color: brandContent }}>
                Most Popular
              </ThemedText>
            </View>
          </View>
          <ThemedText type="bodyRegular" style={{ color: contentNormal }}>
            Then $9.99/month • Cancel anytime
          </ThemedText>
        </Card>
      </ScrollView>

      <Footer
        variant="twoButtonsVertical"
        primaryLabel="Start Free Trial"
        secondaryLabel="Maybe Later"
        onPrimaryPress={handleStartTrial}
        onSecondaryPress={handleMaybeLater}
        text="No payment required to start"
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.lg,
  },
  headerSection: {
    marginBottom: Spacing.lg,
  },
  title: {
    textAlign: 'center',
  },
  summaryCard: {
    padding: Spacing.lg,
    gap: Spacing.md,
  },
  summaryTitle: {
    marginBottom: Spacing.xs,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  goalText: {
    flex: 1,
    textAlign: 'right',
    marginLeft: Spacing.md,
  },
  featuresSection: {
    marginTop: Spacing.xl,
    gap: Spacing.md,
  },
  featuresTitle: {
    marginBottom: Spacing.xs,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  featureIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  featureText: {
    flex: 1,
    gap: 2,
  },
  pricingCard: {
    marginTop: Spacing.xl,
    padding: Spacing.lg,
    borderWidth: 2,
  },
  pricingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.xs,
  },
  popularBadge: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
    borderRadius: BorderRadius.full,
  },
});
