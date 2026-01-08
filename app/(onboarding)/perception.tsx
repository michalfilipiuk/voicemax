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
import type { VoicePerception } from '@/types';

const TOTAL_STEPS = 12;

const PERCEPTION_OPTIONS: {
  id: VoicePerception;
  title: string;
  description: string;
}[] = [
  {
    id: 'too_high',
    title: "Higher than I'd like",
    description: 'My voice sounds too high-pitched',
  },
  {
    id: 'average_want_deeper',
    title: 'Average but want deeper',
    description: "It's okay, but I want more depth",
  },
  {
    id: 'inconsistent',
    title: 'Sometimes cracks or inconsistent',
    description: 'My voice is unpredictable',
  },
  {
    id: 'nasal',
    title: 'Nasal or thin sounding',
    description: 'Lacks resonance and richness',
  },
  {
    id: 'unsure',
    title: 'Not sure — help me find out',
    description: 'I need an objective assessment',
  },
];

export default function PerceptionScreen() {
  const router = useRouter();
  const { setVoicePerception, setOnboardingStep } = useUser();
  const contentNormal = useThemeColor({}, 'contentNormal');
  const [selectedPerception, setSelectedPerception] =
    useState<VoicePerception | null>(null);

  const handleContinue = async () => {
    if (selectedPerception) {
      await setVoicePerception(selectedPerception);
      await setOnboardingStep(5);
      router.push('/(onboarding)/experience');
    }
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <ThemedView style={styles.container}>
      <PageHeader
        variant="progress"
        currentStep={5}
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
            How would you describe your voice currently?
          </ThemedText>
          <ThemedText type="bodyRegular" style={{ color: contentNormal }}>
            Be honest — this helps us set realistic goals
          </ThemedText>
        </View>

        <View style={styles.optionsSection}>
          {PERCEPTION_OPTIONS.map((option) => (
            <SelectCard
              key={option.id}
              title={option.title}
              description={option.description}
              selected={selectedPerception === option.id}
              onSelect={() => setSelectedPerception(option.id)}
              type="radio"
            />
          ))}
        </View>
      </ScrollView>

      <Footer
        variant="oneButton"
        primaryLabel="Continue"
        primaryDisabled={!selectedPerception}
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
