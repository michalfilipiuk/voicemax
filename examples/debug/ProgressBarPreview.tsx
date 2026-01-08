import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { ProgressBar } from '@/components/progress';
import { ThemedText } from '@/components/themed-text';
import { useThemeColor } from '@/hooks/use-theme-color';
import { Button } from '@/components/buttons';

export function ProgressBarPreview() {
  const contentNormal = useThemeColor({}, 'contentNormal');
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 5;

  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
  };

  const handlePrev = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleReset = () => {
    setCurrentStep(1);
  };

  return (
    <View style={styles.container}>
      <ThemedText type="headlineLarge">Progress Bar</ThemedText>

      <ThemedText type="bodySmall" style={{ color: contentNormal, marginTop: -12 }}>
        Step-based progress indicator for multi-step flows
      </ThemedText>

      {/* Interactive Example */}
      <View style={styles.section}>
        <ThemedText type="headlineSmall">Interactive Example</ThemedText>
        <View style={styles.interactiveContainer}>
          <ThemedText type="bodyRegular" style={{ color: contentNormal, marginBottom: 8 }}>
            Step {currentStep} of {totalSteps}
          </ThemedText>
          <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
          <View style={styles.buttonRow}>
            <Button
              title="Previous"
              variant="secondary"
              size="sm"
              onPress={handlePrev}
              disabled={currentStep === 1}
            />
            <Button
              title="Next"
              variant="primary"
              size="sm"
              onPress={handleNext}
              disabled={currentStep === totalSteps}
            />
            <Button
              title="Reset"
              variant="ghost"
              size="sm"
              onPress={handleReset}
            />
          </View>
        </View>
      </View>

      {/* Different Step Counts */}
      <View style={styles.section}>
        <ThemedText type="headlineSmall">Different Step Counts</ThemedText>
        <View style={styles.examplesContainer}>
          <View style={styles.exampleRow}>
            <ThemedText type="bodySmall" style={{ color: contentNormal }}>
              3 steps (step 1)
            </ThemedText>
            <ProgressBar currentStep={1} totalSteps={3} />
          </View>
          <View style={styles.exampleRow}>
            <ThemedText type="bodySmall" style={{ color: contentNormal }}>
              4 steps (step 2)
            </ThemedText>
            <ProgressBar currentStep={2} totalSteps={4} />
          </View>
          <View style={styles.exampleRow}>
            <ThemedText type="bodySmall" style={{ color: contentNormal }}>
              5 steps (step 3)
            </ThemedText>
            <ProgressBar currentStep={3} totalSteps={5} />
          </View>
          <View style={styles.exampleRow}>
            <ThemedText type="bodySmall" style={{ color: contentNormal }}>
              6 steps (step 5)
            </ThemedText>
            <ProgressBar currentStep={5} totalSteps={6} />
          </View>
          <View style={styles.exampleRow}>
            <ThemedText type="bodySmall" style={{ color: contentNormal }}>
              Complete (5/5)
            </ThemedText>
            <ProgressBar currentStep={5} totalSteps={5} />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 24,
  },
  section: {
    gap: 12,
  },
  interactiveContainer: {
    gap: 12,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 8,
  },
  examplesContainer: {
    gap: 16,
  },
  exampleRow: {
    gap: 8,
  },
});
