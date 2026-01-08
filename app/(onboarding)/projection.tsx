import { PlayIcon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react-native';
import { Audio } from 'expo-av';
import * as Haptics from 'expo-haptics';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { Card } from '@/components/cards';
import { Footer, PageHeader } from '@/components/navigation';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useUser } from '@/context/UserContext';
import { useVoice } from '@/context/VoiceContext';
import { useThemeColor } from '@/hooks/use-theme-color';
import { calculateProjections } from '@/services/audio';
import { Spacing, BorderRadius } from '@/styles/spacing';

const TOTAL_STEPS = 12;

interface ProjectionData {
  label: string;
  pitch: number;
  description: string;
  highlight: boolean;
}

export default function ProjectionScreen() {
  const router = useRouter();
  const { user, setOnboardingStep } = useUser();
  const { latestMeasurement } = useVoice();
  const contentNormal = useThemeColor({}, 'contentNormal');
  const contentSubtle = useThemeColor({}, 'contentSubtle');
  const brandContent = useThemeColor({}, 'brandContent');
  const successContent = useThemeColor({}, 'successContent');
  const bgSecondary = useThemeColor({}, 'bgSecondary');

  const [playingIndex, setPlayingIndex] = useState<number | null>(null);
  const [sound, setSound] = useState<Audio.Sound | null>(null);

  const basePitch = user.baselinePitch || 130;
  const projections = calculateProjections(basePitch);

  const projectionData: ProjectionData[] = [
    {
      label: 'Current',
      pitch: basePitch,
      description: 'Your voice today',
      highlight: false,
    },
    {
      label: '1 Month',
      pitch: projections.oneMonth,
      description: 'Noticeable improvement',
      highlight: false,
    },
    {
      label: '3 Months',
      pitch: projections.threeMonth,
      description: 'Significant transformation',
      highlight: true,
    },
  ];

  const handlePlayPreview = async (index: number) => {
    // Stop any currently playing sound
    if (sound) {
      await sound.unloadAsync();
      setSound(null);
    }

    if (playingIndex === index) {
      setPlayingIndex(null);
      return;
    }

    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

    // For MVP, we'll just provide haptic feedback
    // In production, this would play pitch-shifted audio
    setPlayingIndex(index);

    // Simulate playback duration
    setTimeout(() => {
      setPlayingIndex(null);
    }, 2000);

    // If we have a recording, try to play it with pitch adjustment
    if (latestMeasurement?.recordingUri) {
      try {
        const projection = projectionData[index];
        const rate = projection.pitch / basePitch; // Lower pitch = lower rate

        const { sound: newSound } = await Audio.Sound.createAsync(
          { uri: latestMeasurement.recordingUri },
          { rate, shouldCorrectPitch: false }
        );

        setSound(newSound);
        await newSound.playAsync();

        newSound.setOnPlaybackStatusUpdate((status) => {
          if (status.isLoaded && status.didJustFinish) {
            setPlayingIndex(null);
          }
        });
      } catch (error) {
        console.error('Error playing audio:', error);
        setPlayingIndex(null);
      }
    }
  };

  const handleContinue = async () => {
    // Clean up audio
    if (sound) {
      await sound.unloadAsync();
    }

    await setOnboardingStep(11);
    router.push('/(onboarding)/paywall');
  };

  const totalImprovement = basePitch - projections.threeMonth;

  return (
    <ThemedView style={styles.container}>
      <PageHeader variant="progress" currentStep={11} totalSteps={TOTAL_STEPS} />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.headerSection}>
          <ThemedText type="headlineLarge" style={styles.title}>
            Here's what's possible
          </ThemedText>
          <ThemedText
            type="bodyRegular"
            style={[styles.subtitle, { color: contentNormal }]}
          >
            With consistent training, you could lower your voice by up to{' '}
            <ThemedText type="bodyRegularMedium" style={{ color: brandContent }}>
              {totalImprovement} Hz
            </ThemedText>
          </ThemedText>
        </View>

        {/* Projection cards */}
        <View style={styles.projectionsContainer}>
          {projectionData.map((projection, index) => (
            <Card
              key={projection.label}
              variant={projection.highlight ? 'elevated' : 'filled'}
              style={StyleSheet.flatten([
                styles.projectionCard,
                projection.highlight ? {
                  borderWidth: 2,
                  borderColor: successContent,
                } : {},
              ])}
            >
              <View style={styles.projectionHeader}>
                <View>
                  <ThemedText
                    type="bodySmall"
                    style={{ color: contentSubtle }}
                  >
                    {projection.label}
                  </ThemedText>
                  <View style={styles.pitchRow}>
                    <ThemedText
                      type="headlineMedium"
                      style={{
                        color: projection.highlight
                          ? successContent
                          : brandContent,
                      }}
                    >
                      {projection.pitch}
                    </ThemedText>
                    <ThemedText type="bodyRegular" style={{ color: contentNormal }}>
                      {' '}
                      Hz
                    </ThemedText>
                  </View>
                  <ThemedText
                    type="bodySmall"
                    style={{ color: contentSubtle }}
                  >
                    {projection.description}
                  </ThemedText>
                </View>

                {/* Play button */}
                <Pressable
                  onPress={() => handlePlayPreview(index)}
                  style={[
                    styles.playButton,
                    {
                      backgroundColor:
                        playingIndex === index ? brandContent : bgSecondary,
                    },
                  ]}
                >
                  <HugeiconsIcon
                    icon={PlayIcon}
                    size={20}
                    color={playingIndex === index ? '#FFFFFF' : brandContent}
                  />
                </Pressable>
              </View>

              {/* Progress indicator for projection */}
              {index > 0 && (
                <View style={styles.improvementBadge}>
                  <ThemedText
                    type="bodySmall"
                    style={{ color: successContent }}
                  >
                    -{basePitch - projection.pitch} Hz
                  </ThemedText>
                </View>
              )}
            </Card>
          ))}
        </View>

        {/* Disclaimer */}
        <Card variant="filled" style={styles.disclaimerCard}>
          <ThemedText type="bodySmall" style={{ color: contentSubtle }}>
            * Results vary based on individual physiology and training
            consistency. Projections are based on typical progress with daily
            practice.
          </ThemedText>
        </Card>
      </ScrollView>

      <Footer
        variant="oneButton"
        primaryLabel="Start My Training"
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
    gap: Spacing.sm,
    marginBottom: Spacing.xl,
  },
  title: {
    textAlign: 'center',
  },
  subtitle: {
    textAlign: 'center',
    paddingHorizontal: Spacing.md,
  },
  projectionsContainer: {
    gap: Spacing.md,
  },
  projectionCard: {
    padding: Spacing.lg,
  },
  projectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pitchRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginVertical: Spacing.xs,
  },
  playButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  improvementBadge: {
    position: 'absolute',
    top: Spacing.md,
    right: Spacing.md + 56, // Account for play button
    backgroundColor: 'rgba(0, 200, 83, 0.1)',
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
    borderRadius: BorderRadius.full,
  },
  disclaimerCard: {
    marginTop: Spacing.xl,
    padding: Spacing.md,
  },
});
