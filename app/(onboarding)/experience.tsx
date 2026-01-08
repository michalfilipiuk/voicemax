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
import type { ExperienceLevel } from '@/types';

const TOTAL_STEPS = 12;

const EXPERIENCE_OPTIONS: {
  id: ExperienceLevel;
  title: string;
  description: string;
}[] = [
  {
    id: 'none',
    title: 'No, this is completely new',
    description: 'First time exploring voice training',
  },
  {
    id: 'youtube',
    title: "I've watched some YouTube videos",
    description: 'Some exposure but no structured practice',
  },
  {
    id: 'tried',
    title: "I've tried exercises but didn't stick with it",
    description: 'Started before but lost consistency',
  },
  {
    id: 'experienced',
    title: 'Yes, I have some experience',
    description: 'Familiar with voice training techniques',
  },
];

export default function ExperienceScreen() {
  const router = useRouter();
  const { setExperienceLevel, setOnboardingStep } = useUser();
  const contentNormal = useThemeColor({}, 'contentNormal');
  const [selectedExperience, setSelectedExperience] =
    useState<ExperienceLevel | null>(null);

  const handleContinue = async () => {
    if (selectedExperience) {
      await setExperienceLevel(selectedExperience);
      await setOnboardingStep(6);
      router.push('/(onboarding)/commitment');
    }
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <ThemedView style={styles.container}>
      <PageHeader
        variant="progress"
        currentStep={6}
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
            Have you tried voice training before?
          </ThemedText>
          <ThemedText type="bodyRegular" style={{ color: contentNormal }}>
            We'll adjust the program to your experience level
          </ThemedText>
        </View>

        <View style={styles.optionsSection}>
          {EXPERIENCE_OPTIONS.map((option) => (
            <SelectCard
              key={option.id}
              title={option.title}
              description={option.description}
              selected={selectedExperience === option.id}
              onSelect={() => setSelectedExperience(option.id)}
              type="radio"
            />
          ))}
        </View>
      </ScrollView>

      <Footer
        variant="oneButton"
        primaryLabel="Continue"
        primaryDisabled={!selectedExperience}
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
