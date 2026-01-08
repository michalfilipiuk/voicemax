import { useRouter } from 'expo-router';
import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View } from 'react-native';

import { Waveform, RecordingButton } from '@/components/audio';
import { Card } from '@/components/cards';
import { PageHeader } from '@/components/navigation';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useUser } from '@/context/UserContext';
import { useVoice } from '@/context/VoiceContext';
import { useThemeColor } from '@/hooks/use-theme-color';
import {
  audioRecorder,
  simulatePitchAnalysis,
} from '@/services/audio';
import { saveRecording } from '@/services/storage';
import { Spacing } from '@/styles/spacing';

const TOTAL_STEPS = 12;
const TEST_PHRASE =
  'The human voice is the most powerful instrument. When I speak with confidence, people listen and respect what I have to say.';
const MIN_RECORDING_DURATION = 3000; // 3 seconds
const MAX_RECORDING_DURATION = 10000; // 10 seconds

export default function VoiceRecordingScreen() {
  const router = useRouter();
  const { setOnboardingStep, setBaselinePitch } = useUser();
  const { addMeasurement } = useVoice();
  const contentNormal = useThemeColor({}, 'contentNormal');
  const brandContent = useThemeColor({}, 'brandContent');

  const [isRecording, setIsRecording] = useState(false);
  const [audioLevel, setAudioLevel] = useState(0);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);

  const recordingStartTime = useRef<number>(0);
  const durationInterval = useRef<ReturnType<typeof setInterval> | null>(null);
  const autoStopTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      // Cleanup on unmount
      if (durationInterval.current) {
        clearInterval(durationInterval.current);
      }
      if (autoStopTimeout.current) {
        clearTimeout(autoStopTimeout.current);
      }
      audioRecorder.cancelRecording();
    };
  }, []);

  const startRecording = async () => {
    try {
      await audioRecorder.startRecording((result) => {
        setAudioLevel(result.metering);
      });

      setIsRecording(true);
      recordingStartTime.current = Date.now();
      setRecordingDuration(0);

      // Update duration every 100ms
      durationInterval.current = setInterval(() => {
        const elapsed = Date.now() - recordingStartTime.current;
        setRecordingDuration(elapsed);
      }, 100);

      // Auto-stop after max duration
      autoStopTimeout.current = setTimeout(() => {
        stopRecording();
      }, MAX_RECORDING_DURATION);
    } catch (error) {
      console.error('Error starting recording:', error);
    }
  };

  const stopRecording = async () => {
    if (!isRecording) return;

    // Clear timers
    if (durationInterval.current) {
      clearInterval(durationInterval.current);
      durationInterval.current = null;
    }
    if (autoStopTimeout.current) {
      clearTimeout(autoStopTimeout.current);
      autoStopTimeout.current = null;
    }

    setIsRecording(false);
    setIsProcessing(true);

    try {
      const result = await audioRecorder.stopRecording();

      if (result && result.durationMillis >= MIN_RECORDING_DURATION) {
        // Save the recording
        const permanentUri = await saveRecording(result.uri, 'onboarding');

        // Analyze pitch (simulated for MVP)
        const analysis = simulatePitchAnalysis(result.durationMillis);

        // Save measurement
        await addMeasurement(
          analysis.averagePitch,
          analysis.minPitch,
          analysis.maxPitch,
          permanentUri,
          result.durationMillis / 1000,
          'onboarding'
        );

        // Set baseline pitch in user profile
        await setBaselinePitch(analysis.averagePitch);
        await setOnboardingStep(9);

        // Navigate to results
        router.push('/(onboarding)/results');
      } else {
        // Recording too short
        setIsProcessing(false);
        setAudioLevel(0);
        setRecordingDuration(0);
      }
    } catch (error) {
      console.error('Error stopping recording:', error);
      setIsProcessing(false);
    }
  };

  const handleRecordPress = () => {
    if (isRecording) {
      if (recordingDuration >= MIN_RECORDING_DURATION) {
        stopRecording();
      }
      // If too short, ignore stop press
    } else {
      startRecording();
    }
  };

  const formatDuration = (ms: number) => {
    const seconds = Math.floor(ms / 1000);
    return `${seconds}s`;
  };

  const canStop = recordingDuration >= MIN_RECORDING_DURATION;

  return (
    <ThemedView style={styles.container}>
      <PageHeader
        variant="progress"
        currentStep={9}
        totalSteps={TOTAL_STEPS}
      />

      <View style={styles.content}>
        <View style={styles.headerSection}>
          <ThemedText type="headlineMedium" style={styles.title}>
            {isProcessing
              ? 'Analyzing your voice...'
              : isRecording
              ? 'Recording...'
              : 'Read this phrase aloud'}
          </ThemedText>

          {!isProcessing && (
            <ThemedText
              type="bodyRegular"
              style={[styles.subtitle, { color: contentNormal }]}
            >
              {isRecording
                ? canStop
                  ? 'Tap to stop when finished'
                  : `Keep speaking (${formatDuration(MIN_RECORDING_DURATION - recordingDuration)} min)`
                : 'Tap the microphone and speak naturally'}
            </ThemedText>
          )}
        </View>

        {/* Test phrase card */}
        <Card variant="filled" style={styles.phraseCard}>
          <ThemedText type="bodyLarge" style={styles.phraseText}>
            "{TEST_PHRASE}"
          </ThemedText>
        </Card>

        {/* Waveform visualization */}
        <View style={styles.waveformContainer}>
          <Waveform level={audioLevel} isRecording={isRecording} />
        </View>

        {/* Recording duration indicator */}
        {isRecording && (
          <View style={styles.durationContainer}>
            <View style={[styles.recordingDot, { backgroundColor: brandContent }]} />
            <ThemedText type="bodyRegularMedium">
              {formatDuration(recordingDuration)}
            </ThemedText>
          </View>
        )}

        {/* Recording button */}
        <View style={styles.buttonContainer}>
          <RecordingButton
            isRecording={isRecording}
            onPress={handleRecordPress}
            disabled={isProcessing || (isRecording && !canStop)}
          />
        </View>

        {/* Instructions */}
        {!isRecording && !isProcessing && (
          <ThemedText
            type="bodySmall"
            style={[styles.hint, { color: contentNormal }]}
          >
            Hold the phone about 6 inches from your mouth
          </ThemedText>
        )}
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.md,
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
  phraseCard: {
    padding: Spacing.lg,
  },
  phraseText: {
    textAlign: 'center',
    fontStyle: 'italic',
    lineHeight: 28,
  },
  waveformContainer: {
    marginTop: Spacing.xl,
    paddingHorizontal: Spacing.md,
  },
  durationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
    marginTop: Spacing.md,
  },
  recordingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  hint: {
    textAlign: 'center',
    marginBottom: Spacing.xl,
  },
});
