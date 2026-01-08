import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { StepDots } from '@/components/progress';
import { ThemedText } from '@/components/themed-text';
import { useThemeColor } from '@/hooks/use-theme-color';
import { Button } from '@/components/buttons';

export function StepDotsPreview() {
  const contentNormal = useThemeColor({}, 'contentNormal');
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 5;

  const handleNext = () => {
    setCurrentStep((prev) => (prev < totalSteps ? prev + 1 : 1));
  };

  const handlePrev = () => {
    setCurrentStep((prev) => (prev > 1 ? prev - 1 : totalSteps));
  };

  return (
    <View style={styles.container}>
      <ThemedText type="headlineLarge">Step Dots</ThemedText>

      <ThemedText type="bodySmall" style={{ color: contentNormal, marginTop: -12 }}>
        Dot indicator for carousels and multi-step flows
      </ThemedText>

      {/* Interactive Example */}
      <View style={styles.section}>
        <ThemedText type="headlineSmall">Interactive Example</ThemedText>
        <View style={styles.interactiveContainer}>
          <ThemedText type="bodyRegular" style={{ color: contentNormal, marginBottom: 8 }}>
            Slide {currentStep} of {totalSteps}
          </ThemedText>
          <StepDots currentStep={currentStep} totalSteps={totalSteps} />
          <View style={styles.buttonRow}>
            <Button
              title="Previous"
              variant="secondary"
              size="sm"
              onPress={handlePrev}
            />
            <Button
              title="Next"
              variant="primary"
              size="sm"
              onPress={handleNext}
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
              3 slides
            </ThemedText>
            <StepDots currentStep={1} totalSteps={3} />
          </View>
          <View style={styles.exampleRow}>
            <ThemedText type="bodySmall" style={{ color: contentNormal }}>
              4 slides
            </ThemedText>
            <StepDots currentStep={2} totalSteps={4} />
          </View>
          <View style={styles.exampleRow}>
            <ThemedText type="bodySmall" style={{ color: contentNormal }}>
              5 slides
            </ThemedText>
            <StepDots currentStep={3} totalSteps={5} />
          </View>
          <View style={styles.exampleRow}>
            <ThemedText type="bodySmall" style={{ color: contentNormal }}>
              6 slides
            </ThemedText>
            <StepDots currentStep={4} totalSteps={6} />
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
