import {
  FlashIcon,
  Time01Icon,
  TimeScheduleIcon,
} from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react-native';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import { SelectCard } from '@/components/checkboxes';
import { Footer, PageHeader } from '@/components/navigation';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useUser } from '@/context/UserContext';
import { useThemeColor } from '@/hooks/use-theme-color';
import { Spacing } from '@/styles/spacing';
import type { DailyCommitment } from '@/types';

const TOTAL_STEPS = 12;

const COMMITMENT_OPTIONS: {
  id: DailyCommitment;
  title: string;
  description: string;
  icon: typeof FlashIcon;
}[] = [
  {
    id: 5,
    title: '5 minutes',
    description: 'Quick daily sessions — great for busy schedules',
    icon: FlashIcon,
  },
  {
    id: 10,
    title: '10 minutes',
    description: 'Recommended — balanced training for steady progress',
    icon: Time01Icon,
  },
  {
    id: 15,
    title: '15+ minutes',
    description: 'Intensive — fastest results for dedicated users',
    icon: TimeScheduleIcon,
  },
];

export default function CommitmentScreen() {
  const router = useRouter();
  const { setDailyCommitment, setOnboardingStep } = useUser();
  const contentNormal = useThemeColor({}, 'contentNormal');
  const [selectedCommitment, setSelectedCommitment] =
    useState<DailyCommitment | null>(null);

  const handleContinue = async () => {
    if (selectedCommitment) {
      await setDailyCommitment(selectedCommitment);
      await setOnboardingStep(7);
      router.push('/(onboarding)/voice-test-intro');
    }
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <ThemedView style={styles.container}>
      <PageHeader
        variant="progress"
        currentStep={7}
        totalSteps={TOTAL_STEPS}
        onLeftPress={handleBack}
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.questionSection}>
          <ThemedText type="headlineLarge">
            How much time can you commit daily?
          </ThemedText>
          <ThemedText type="bodyRegular" style={{ color: contentNormal }}>
            Consistency matters more than duration
          </ThemedText>
        </View>

        <View style={styles.optionsSection}>
          {COMMITMENT_OPTIONS.map((option) => (
            <SelectCard
              key={option.id}
              title={option.title}
              description={option.description}
              icon={<HugeiconsIcon icon={option.icon} size={20} />}
              selected={selectedCommitment === option.id}
              onSelect={() => setSelectedCommitment(option.id)}
              type="radio"
            />
          ))}
        </View>
      </ScrollView>

      <Footer
        variant="oneButton"
        primaryLabel="Continue"
        primaryDisabled={!selectedCommitment}
        onPrimaryPress={handleContinue}
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
    paddingTop: Spacing.sm,
    paddingBottom: Spacing.lg,
  },
  questionSection: {
    gap: Spacing.sm,
    marginBottom: Spacing.lg,
  },
  optionsSection: {
    gap: Spacing.md,
  },
});
