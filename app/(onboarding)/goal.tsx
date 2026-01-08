import {
  Briefcase01Icon,
  UserGroupIcon,
  HeartAddIcon,
  Mic01Icon,
  Target01Icon,
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
import type { PrimaryGoal } from '@/types';

const TOTAL_STEPS = 12;

const GOAL_OPTIONS: {
  id: PrimaryGoal;
  title: string;
  description: string;
  icon: typeof Briefcase01Icon;
}[] = [
  {
    id: 'authority',
    title: 'Sound more authoritative at work',
    description: 'Command respect in meetings and presentations',
    icon: Briefcase01Icon,
  },
  {
    id: 'social',
    title: 'Build confidence in social situations',
    description: 'Feel more assured in conversations',
    icon: UserGroupIcon,
  },
  {
    id: 'dating',
    title: 'Improve dating and attraction',
    description: 'Make a stronger first impression',
    icon: HeartAddIcon,
  },
  {
    id: 'content',
    title: 'Better voice for content creation',
    description: 'Sound great on podcasts and videos',
    icon: Mic01Icon,
  },
  {
    id: 'self_improvement',
    title: 'General self-improvement',
    description: 'Become the best version of yourself',
    icon: Target01Icon,
  },
];

export default function GoalScreen() {
  const router = useRouter();
  const { setPrimaryGoal, setOnboardingStep } = useUser();
  const contentNormal = useThemeColor({}, 'contentNormal');
  const [selectedGoal, setSelectedGoal] = useState<PrimaryGoal | null>(null);

  const handleContinue = async () => {
    if (selectedGoal) {
      await setPrimaryGoal(selectedGoal);
      await setOnboardingStep(4);
      router.push('/(onboarding)/perception');
    }
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <ThemedView style={styles.container}>
      <PageHeader
        variant="progress"
        currentStep={4}
        totalSteps={TOTAL_STEPS}
        onLeftPress={handleBack}
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.questionSection}>
          <ThemedText type="headlineLarge">What's your main goal?</ThemedText>
          <ThemedText type="bodyRegular" style={{ color: contentNormal }}>
            This helps us tailor your training program
          </ThemedText>
        </View>

        <View style={styles.optionsSection}>
          {GOAL_OPTIONS.map((option) => (
            <SelectCard
              key={option.id}
              title={option.title}
              description={option.description}
              icon={<HugeiconsIcon icon={option.icon} size={20} />}
              selected={selectedGoal === option.id}
              onSelect={() => setSelectedGoal(option.id)}
              type="radio"
            />
          ))}
        </View>
      </ScrollView>

      <Footer
        variant="oneButton"
        primaryLabel="Continue"
        primaryDisabled={!selectedGoal}
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
