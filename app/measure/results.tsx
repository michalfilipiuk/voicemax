import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useMemo } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import { Card } from '@/components/cards';
import { PitchResultCard } from '@/components/measure';
import { Footer, PageHeader } from '@/components/navigation';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useThemeColor } from '@/hooks/use-theme-color';
import {
  getTrainingRecommendations,
  type SimpleVoiceAnalysis,
} from '@/services/audio';
import { Spacing, BorderRadius } from '@/styles/spacing';

export default function MeasureResultsScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ analysis: string }>();
  const contentNormal = useThemeColor({}, 'contentNormal');
  const contentSubtle = useThemeColor({}, 'contentSubtle');
  const brandContent = useThemeColor({}, 'brandContent');
  const successContent = useThemeColor({}, 'successContent');
  const bgSecondary = useThemeColor({}, 'bgSecondary');

  const analysis: SimpleVoiceAnalysis | null = useMemo(() => {
    if (params.analysis) {
      try {
        return JSON.parse(params.analysis);
      } catch {
        return null;
      }
    }
    return null;
  }, [params.analysis]);

  const recommendations = useMemo(() => {
    if (analysis) {
      return getTrainingRecommendations(analysis);
    }
    return [];
  }, [analysis]);

  const handleDone = () => {
    router.replace('/(tabs)');
  };

  if (!analysis) {
    return (
      <ThemedView style={styles.container}>
        <PageHeader variant="default" onLeftPress={handleDone} />
        <View style={styles.errorContainer}>
          <ThemedText type="bodyLarge">Unable to load results</ThemedText>
        </View>
      </ThemedView>
    );
  }

  // Calculate position on scale (60-200 Hz range)
  const scaleMin = 60;
  const scaleMax = 200;
  const pitchPercentage = Math.max(
    0,
    Math.min(100, ((analysis.pitch.hz - scaleMin) / (scaleMax - scaleMin)) * 100)
  );

  return (
    <ThemedView style={styles.container}>
      <PageHeader variant="default" onLeftPress={handleDone} />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.headerSection}>
          <ThemedText type="headlineLarge" style={styles.title}>
            Voice Analysis
          </ThemedText>
          <ThemedText
            type="bodyRegular"
            style={[styles.subtitle, { color: contentNormal }]}
          >
            Your masculinity metrics
          </ThemedText>
        </View>

        {/* Pitch Card */}
        <PitchResultCard
          hz={analysis.pitch.hz}
          category={analysis.pitch.category}
          percentile={analysis.pitch.percentile}
          comparison={analysis.pitch.comparison}
        />

        {/* Voice scale visualization */}
        <View style={styles.scaleSection}>
          <ThemedText type="bodyRegularMedium" style={styles.sectionTitle}>
            Voice Pitch Scale
          </ThemedText>

          <View style={styles.scaleContainer}>
            <View style={[styles.scaleBar, { backgroundColor: bgSecondary }]}>
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

        {/* Overall Masculinity Score */}
        <Card variant="filled" style={styles.overallScoreCard}>
          <ThemedText type="bodySmall" style={{ color: contentSubtle, textAlign: 'center' }}>
            Overall Masculinity Score
          </ThemedText>
          <ThemedText type="headlineDisplay" style={{ color: brandContent, textAlign: 'center' }}>
            {Math.round(analysis.quality.overall)}
          </ThemedText>
          <ThemedText type="bodyRegularMedium" style={{ color: successContent, textAlign: 'center' }}>
            {analysis.quality.category}
          </ThemedText>
        </Card>

        {/* Voice Stats - 4 Core Metrics */}
        <View style={styles.metricsGrid}>
          {/* Depth Metric (Pitch-based) */}
          <Card variant="filled" style={styles.metricCard}>
            <ThemedText type="bodySmall" style={{ color: contentSubtle }}>
              Depth
            </ThemedText>
            <ThemedText type="headlineMedium" style={{ color: brandContent }}>
              {Math.round(analysis.quality.depth)}
            </ThemedText>
            <ThemedText type="bodySmall" style={{ color: contentNormal }}>
              {analysis.quality.depth >= 70 ? 'Deep' :
               analysis.quality.depth >= 40 ? 'Average' : 'Higher'}
            </ThemedText>
            <ThemedText type="bodySmall" style={{ color: contentSubtle, marginTop: 4 }}>
              {analysis.pitch.hz} Hz
            </ThemedText>
          </Card>

          {/* Resonance Metric (VTL-based) */}
          <Card variant="filled" style={styles.metricCard}>
            <ThemedText type="bodySmall" style={{ color: contentSubtle }}>
              Resonance
            </ThemedText>
            <ThemedText type="headlineMedium" style={{ color: brandContent }}>
              {Math.round(analysis.quality.resonance)}
            </ThemedText>
            <ThemedText type="bodySmall" style={{ color: contentNormal }}>
              {analysis.quality.resonance >= 70 ? 'Full' :
               analysis.quality.resonance >= 40 ? 'Moderate' : 'Thin'}
            </ThemedText>
            <ThemedText type="bodySmall" style={{ color: contentSubtle, marginTop: 4 }}>
              VTL: {analysis.formants.vocalTractLength} cm
            </ThemedText>
          </Card>

          {/* Power Metric (Projection/Authority) */}
          <Card variant="filled" style={styles.metricCard}>
            <ThemedText type="bodySmall" style={{ color: contentSubtle }}>
              Power
            </ThemedText>
            <ThemedText type="headlineMedium" style={{ color: brandContent }}>
              {Math.round(analysis.quality.power)}
            </ThemedText>
            <ThemedText type="bodySmall" style={{ color: contentNormal }}>
              {analysis.quality.power >= 70 ? 'Strong' :
               analysis.quality.power >= 40 ? 'Moderate' : 'Soft'}
            </ThemedText>
            <ThemedText type="bodySmall" style={{ color: contentSubtle, marginTop: 4 }}>
              Projection
            </ThemedText>
          </Card>

          {/* Control Metric (Voice Steadiness) */}
          <Card variant="filled" style={styles.metricCard}>
            <ThemedText type="bodySmall" style={{ color: contentSubtle }}>
              Control
            </ThemedText>
            <ThemedText type="headlineMedium" style={{ color: brandContent }}>
              {Math.round(analysis.quality.control)}
            </ThemedText>
            <ThemedText type="bodySmall" style={{ color: contentNormal }}>
              {analysis.quality.control >= 70 ? 'Steady' :
               analysis.quality.control >= 40 ? 'Moderate' : 'Variable'}
            </ThemedText>
            <ThemedText type="bodySmall" style={{ color: contentSubtle, marginTop: 4 }}>
              Stability
            </ThemedText>
          </Card>
        </View>

        {/* Recommendations Section */}
        {recommendations.length > 0 && (
          <View style={styles.recommendationsSection}>
            <ThemedText type="bodyRegularMedium" style={styles.sectionTitle}>
              Training Recommendations
            </ThemedText>

            <Card variant="filled" style={styles.recommendationsCard}>
              {recommendations.map((rec, index) => (
                <View key={index} style={styles.recommendationItem}>
                  <ThemedText type="bodyRegular" style={{ color: contentNormal }}>
                    {'\u2022'} {rec}
                  </ThemedText>
                </View>
              ))}
            </Card>
          </View>
        )}
      </ScrollView>

      <Footer variant="oneButton" primaryLabel="Done" onPrimaryPress={handleDone} />
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
    gap: Spacing.lg,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerSection: {
    alignItems: 'center',
    gap: Spacing.xs,
  },
  title: {
    textAlign: 'center',
  },
  subtitle: {
    textAlign: 'center',
  },
  sectionTitle: {
    marginBottom: Spacing.sm,
  },
  scaleSection: {
    gap: Spacing.md,
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
  overallScoreCard: {
    padding: Spacing.lg,
    alignItems: 'center',
    gap: Spacing.xs,
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  metricCard: {
    flex: 1,
    minWidth: '45%',
    padding: Spacing.md,
    gap: 2,
  },
  formantsList: {
    marginTop: 4,
  },
  recommendationsSection: {},
  recommendationsCard: {
    padding: Spacing.lg,
    gap: Spacing.sm,
  },
  recommendationItem: {
    paddingVertical: Spacing.xs,
  },
});
