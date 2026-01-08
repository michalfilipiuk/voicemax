import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import { TextInput } from '@/components/input';
import { Footer, PageHeader } from '@/components/navigation';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useUser } from '@/context/UserContext';
import { useThemeColor } from '@/hooks/use-theme-color';
import { Spacing } from '@/styles/spacing';

const TOTAL_STEPS = 12;

export default function NameScreen() {
  const router = useRouter();
  const { setFirstName, setOnboardingStep } = useUser();
  const contentNormal = useThemeColor({}, 'contentNormal');
  const [name, setName] = useState('');

  const handleContinue = async () => {
    if (name.trim()) {
      await setFirstName(name.trim());
      await setOnboardingStep(2);
      router.push('/(onboarding)/age');
    }
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <ThemedView style={styles.container}>
      <PageHeader
        variant="progress"
        currentStep={2}
        totalSteps={TOTAL_STEPS}
        onLeftPress={handleBack}
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.questionSection}>
          <ThemedText type="headlineLarge">What should we call you?</ThemedText>
          <ThemedText type="bodyRegular" style={{ color: contentNormal }}>
            We'll use this to personalize your training experience
          </ThemedText>
        </View>

        <View style={styles.inputSection}>
          <TextInput
            placeholder="Enter your first name"
            value={name}
            onChangeText={setName}
            autoCapitalize="words"
            autoFocus
            returnKeyType="done"
            onSubmitEditing={handleContinue}
          />
        </View>
      </ScrollView>

      <Footer
        variant="oneButton"
        primaryLabel="Continue"
        primaryDisabled={!name.trim()}
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
    marginBottom: Spacing.xl,
  },
  inputSection: {
    gap: Spacing.md,
  },
});
