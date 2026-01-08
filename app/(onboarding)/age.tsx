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
import type { AgeRange } from '@/types';

const TOTAL_STEPS = 12;

const AGE_OPTIONS: { id: AgeRange; title: string; description: string }[] = [
  {
    id: '18-24',
    title: '18-24 years',
    description: 'Voice still developing, great time to train',
  },
  {
    id: '25-34',
    title: '25-34 years',
    description: 'Prime age for voice optimization',
  },
  {
    id: '35-44',
    title: '35-44 years',
    description: 'Establish your authoritative voice',
  },
  {
    id: '45-54',
    title: '45-54 years',
    description: 'Maintain and deepen your voice',
  },
  {
    id: '55+',
    title: '55+ years',
    description: 'Keep your voice strong and resonant',
  },
];

export default function AgeScreen() {
  const router = useRouter();
  const { setAgeRange, setOnboardingStep } = useUser();
  const contentNormal = useThemeColor({}, 'contentNormal');
  const [selectedAge, setSelectedAge] = useState<AgeRange | null>(null);

  const handleContinue = async () => {
    if (selectedAge) {
      await setAgeRange(selectedAge);
      await setOnboardingStep(3);
      router.push('/(onboarding)/goal');
    }
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <ThemedView style={styles.container}>
      <PageHeader
        variant="progress"
        currentStep={3}
        totalSteps={TOTAL_STEPS}
        onLeftPress={handleBack}
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.questionSection}>
          <ThemedText type="headlineLarge">How old are you?</ThemedText>
          <ThemedText type="bodyRegular" style={{ color: contentNormal }}>
            Voice characteristics vary by age group
          </ThemedText>
        </View>

        <View style={styles.optionsSection}>
          {AGE_OPTIONS.map((option) => (
            <SelectCard
              key={option.id}
              title={option.title}
              description={option.description}
              selected={selectedAge === option.id}
              onSelect={() => setSelectedAge(option.id)}
              type="radio"
            />
          ))}
        </View>
      </ScrollView>

      <Footer
        variant="oneButton"
        primaryLabel="Continue"
        primaryDisabled={!selectedAge}
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
