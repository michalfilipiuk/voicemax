import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import { Card } from '@/components/cards';
import { Footer, PageHeader } from '@/components/navigation';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useUser } from '@/context/UserContext';
import { useThemeColor } from '@/hooks/use-theme-color';
import {
  getVoiceDescription,
  getVoiceCategory,
  MALE_VOICE_RANGES,
  REFERENCE_VOICES,
} from '@/services/audio';
import { Spacing, BorderRadius } from '@/styles/spacing';

const TOTAL_STEPS = 12;

export default function ResultsScreen() {
  const router = useRouter();
  const { user, setOnboardingStep } = useUser();
  const contentNormal = useThemeColor({}, 'contentNormal');
  const contentSubtle = useThemeColor({}, 'contentSubtle');
  const brandContent = useThemeColor({}, 'brandContent');
  const successContent = useThemeColor({}, 'successContent');
  const bgSecondary = useThemeColor({}, 'bgSecondary');

  const pitch = user.baselinePitch || 130;
  const category = getVoiceCategory(pitch);
  const description = getVoiceDescription(pitch);

  const handleContinue = async () => {
    await setOnboardingStep(10);
    router.push('/(onboarding)/projection');
  };

  // Calculate position on scale (60-200 Hz range)
  const scaleMin = 60;
  const scaleMax = 200;
  const pitchPercentage = Math.max(
    0,
    Math.min(100, ((pitch - scaleMin) / (scaleMax - scaleMin)) * 100)
  );

  return (
    <ThemedView style={styles.container}>
      <PageHeader variant="progress" currentStep={10} totalSteps={TOTAL_STEPS} />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.headerSection}>
          <ThemedText type="headlineLarge" style={styles.title}>
            Your Voice Analysis
          </ThemedText>
          <ThemedText
            type="bodyRegular"
            style={[styles.subtitle, { color: contentNormal }]}
          >
            Here's what we measured
          </ThemedText>
        </View>

        {/* Main pitch display */}
        <Card variant="elevated" style={styles.pitchCard}>
          <ThemedText
            type="bodyRegularMedium"
            style={{ color: contentNormal }}
          >
            Your Average Pitch
          </ThemedText>
          <View style={styles.pitchValueContainer}>
            <ThemedText type="headlineDisplay" style={{ color: brandContent }}>
              {pitch}
            </ThemedText>
            <ThemedText type="headlineMedium" style={{ color: contentNormal }}>
              Hz
            </ThemedText>
          </View>
          <ThemedText
            type="bodySmall"
            style={[styles.categoryLabel, { color: contentSubtle }]}
          >
            {category ? MALE_VOICE_RANGES[category].label : 'Measured'}
          </ThemedText>
        </Card>

        {/* Voice scale visualization */}
        <View style={styles.scaleSection}>
          <ThemedText type="bodyRegularMedium" style={styles.scaleTitle}>
            Voice Pitch Scale
          </ThemedText>

          <View style={styles.scaleContainer}>
            <View style={[styles.scaleBar, { backgroundColor: bgSecondary }]}>
              {/* Zone markers */}
              <View
                style={[
                  styles.scaleZone,
                  styles.deepZone,
                  { backgroundColor: successContent + '40' },
                ]}
              />
              <View
                style={[
                  styles.scaleZone,
                  styles.averageZone,
                  { backgroundColor: brandContent + '40' },
                ]}
              />
              <View
                style={[
                  styles.scaleZone,
                  styles.higherZone,
                  { backgroundColor: bgSecondary },
                ]}
              />

              {/* Current position indicator */}
              <View
                style={[
                  styles.indicator,
                  {
                    left: `${pitchPercentage}%`,
                    backgroundColor: brandContent,
                  },
                ]}
              />
            </View>

            {/* Scale labels */}
            <View style={styles.scaleLabels}>
              <ThemedText type="bodySmall" style={{ color: contentSubtle }}>
                Deep
              </ThemedText>
              <ThemedText type="bodySmall" style={{ color: contentSubtle }}>
                Average
              </ThemedText>
              <ThemedText type="bodySmall" style={{ color: contentSubtle }}>
                Higher
              </ThemedText>
            </View>
          </View>
        </View>

        {/* Description card */}
        <Card variant="filled" style={styles.descriptionCard}>
          <ThemedText type="bodyRegular">{description}</ThemedText>
        </Card>

        {/* Reference comparisons */}
        <View style={styles.referenceSection}>
          <ThemedText type="bodyRegularMedium" style={styles.referenceTitle}>
            For Reference
          </ThemedText>

          {Object.values(REFERENCE_VOICES).map((voice, index) => (
            <View key={index} style={styles.referenceItem}>
              <View style={styles.referenceInfo}>
                <ThemedText type="bodyRegular">{voice.name}</ThemedText>
                <ThemedText type="bodySmall" style={{ color: contentSubtle }}>
                  {voice.description}
                </ThemedText>
              </View>
              <ThemedText type="bodyRegularMedium" style={{ color: brandContent }}>
                {voice.pitch} Hz
              </ThemedText>
            </View>
          ))}
        </View>
      </ScrollView>

      <Footer
        variant="oneButton"
        primaryLabel="See What's Possible"
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
    paddingTop: Spacing.md,
    paddingBottom: Spacing.lg,
  },
  headerSection: {
    alignItems: 'center',
    gap: Spacing.xs,
    marginBottom: Spacing.lg,
  },
  title: {
    textAlign: 'center',
  },
  subtitle: {
    textAlign: 'center',
  },
  pitchCard: {
    alignItems: 'center',
    padding: Spacing.xl,
    gap: Spacing.xs,
  },
  pitchValueContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: Spacing.xs,
  },
  categoryLabel: {
    marginTop: Spacing.xs,
  },
  scaleSection: {
    marginTop: Spacing.xl,
    gap: Spacing.md,
  },
  scaleTitle: {
    textAlign: 'center',
  },
  scaleContainer: {
    gap: Spacing.sm,
  },
  scaleBar: {
    height: 24,
    borderRadius: BorderRadius.full,
    flexDirection: 'row',
    overflow: 'hidden',
    position: 'relative',
  },
  scaleZone: {
    height: '100%',
  },
  deepZone: {
    width: '35%',
  },
  averageZone: {
    width: '35%',
  },
  higherZone: {
    width: '30%',
  },
  indicator: {
    position: 'absolute',
    width: 8,
    height: 32,
    borderRadius: 4,
    top: -4,
    marginLeft: -4,
  },
  scaleLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.sm,
  },
  descriptionCard: {
    marginTop: Spacing.lg,
    padding: Spacing.lg,
  },
  referenceSection: {
    marginTop: Spacing.xl,
    gap: Spacing.md,
  },
  referenceTitle: {
    marginBottom: Spacing.xs,
  },
  referenceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Spacing.sm,
  },
  referenceInfo: {
    flex: 1,
    gap: 2,
  },
});
