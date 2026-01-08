import { Briefcase01Icon, GraduateMaleIcon, Home01Icon, Rocket01Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react-native';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import { SelectCard } from '@/components/checkboxes';
import { Footer, PageHeader } from '@/components/navigation';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useThemeColor } from '@/hooks/use-theme-color';

const options = [
  {
    id: 'work',
    title: 'For work',
    description: 'Boost productivity and collaborate with teams',
    icon: Briefcase01Icon,
  },
  {
    id: 'personal',
    title: 'Personal use',
    description: 'Organize your life and personal projects',
    icon: Home01Icon,
  },
  {
    id: 'education',
    title: 'Education',
    description: 'Learn new skills and track your progress',
    icon: GraduateMaleIcon,
  },
  {
    id: 'startup',
    title: 'Startup / Side project',
    description: 'Build and launch your next big idea',
    icon: Rocket01Icon,
  },
];

export function QuizTemplate() {
  const contentNormal = useThemeColor({}, 'contentNormal');
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  return (
    <ThemedView style={styles.container}>
      {/* Header with Progress */}
      <PageHeader
        variant="progress"
        currentStep={2}
        totalSteps={5}
        onLeftPress={() => {}}
      />

      {/* Content */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.questionSection}>
          <ThemedText type="headlineLarge">
            What brings you here today?
          </ThemedText>
          <ThemedText type="bodyRegular" style={{ color: contentNormal }}>
            This helps us personalize your experience
          </ThemedText>
        </View>

        <View style={styles.optionsSection}>
          {options.map((option) => (
            <SelectCard
              key={option.id}
              title={option.title}
              description={option.description}
              icon={<HugeiconsIcon icon={option.icon} size={20} />}
              selected={selectedOption === option.id}
              onSelect={() => setSelectedOption(option.id)}
              type="radio"
            />
          ))}
        </View>
      </ScrollView>

      {/* Footer */}
      <Footer
        variant="oneButton"
        primaryLabel="Continue"
        primaryDisabled={!selectedOption}
        onPrimaryPress={() => {}}
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
    paddingHorizontal: 24,
    paddingTop: 8,
    paddingBottom: 24,
  },
  questionSection: {
    gap: 8,
    marginBottom: 24,
  },
  optionsSection: {
    gap: 12,
  },
});
