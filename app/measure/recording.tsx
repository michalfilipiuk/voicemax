import { useRouter } from 'expo-router';
import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Alert, ActivityIndicator } from 'react-native';

import { Waveform, RecordingButton } from '@/components/audio';
import { Card } from '@/components/cards';
import { PageHeader } from '@/components/navigation';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useVoice } from '@/context/VoiceContext';
import { useThemeColor } from '@/hooks/use-theme-color';
import {
  audioRecorder,
  analyzeVoiceSimple,
  type SimpleVoiceAnalysis,
} from '@/services/audio';
import { saveRecording } from '@/services/storage';
import { Spacing } from '@/styles/spacing';

// 3-step recording protocol:
// Steps 1-2: Read sentences (for UX - makes measurement feel thorough)
// Step 3: Sustained "aaah" (actual measurement - most accurate for F0/formants)
const RECORDING_STEPS = [
  {
    id: 1,
    type: 'sentence' as const,
    instruction: 'Read this phrase aloud',
    content: 'The human voice is the most powerful instrument.',
    hint: 'Speak naturally at your normal pace',
    minDuration: 2000,
    maxDuration: 8000,
  },
  {
    id: 2,
    type: 'sentence' as const,
    instruction: 'Now read this phrase',
    content: 'I speak with confidence and authority.',
    hint: 'Use your natural speaking voice',
    minDuration: 2000,
    maxDuration: 8000,
  },
  {
    id: 3,
    type: 'sound' as const,
    instruction: 'Finally, make this sound',
    content: 'Aaaaaah',
    hint: 'Hold a relaxed "aah" for 5 seconds',
    minDuration: 4000,
    maxDuration: 8000,
  },
];

export default function MeasureRecordingScreen() {
  const router = useRouter();
  const { addMeasurement } = useVoice();
  const contentNormal = useThemeColor({}, 'contentNormal');
  const contentSubtle = useThemeColor({}, 'contentSubtle');
  const brandContent = useThemeColor({}, 'brandContent');
  const successContent = useThemeColor({}, 'successContent');

  const [currentStep, setCurrentStep] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [audioLevel, setAudioLevel] = useState(0);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [recordingUri, setRecordingUri] = useState<string | null>(null);

  const recordingStartTime = useRef<number>(0);
  const durationInterval = useRef<ReturnType<typeof setInterval> | null>(null);
  const autoStopTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const step = RECORDING_STEPS[currentStep];

  useEffect(() => {
    return () => {
      if (durationInterval.current) clearInterval(durationInterval.current);
      if (autoStopTimeout.current) clearTimeout(autoStopTimeout.current);
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

      durationInterval.current = setInterval(() => {
        const elapsed = Date.now() - recordingStartTime.current;
        setRecordingDuration(elapsed);
      }, 100);

      autoStopTimeout.current = setTimeout(() => {
        stopRecording();
      }, step.maxDuration);
    } catch (error) {
      console.error('Error starting recording:', error);
    }
  };

  const stopRecording = async () => {
    if (!isRecording) return;

    if (durationInterval.current) {
      clearInterval(durationInterval.current);
      durationInterval.current = null;
    }
    if (autoStopTimeout.current) {
      clearTimeout(autoStopTimeout.current);
      autoStopTimeout.current = null;
    }

    setIsRecording(false);

    try {
      const result = await audioRecorder.stopRecording();

      if (result && result.durationMillis >= step.minDuration) {
        // Save the "aaah" recording (step 3) for analysis
        if (currentStep === 2) {
          const permanentUri = await saveRecording(result.uri, 'voice_measure');
          setRecordingUri(permanentUri);
        }

        // Move to next step or process
        if (currentStep < RECORDING_STEPS.length - 1) {
          setCurrentStep(currentStep + 1);
          setAudioLevel(0);
          setRecordingDuration(0);
        } else {
          // All steps complete - analyze the "aaah" recording
          const uri = currentStep === 2
            ? await saveRecording(result.uri, 'voice_measure')
            : recordingUri;
          if (uri) {
            await processRecording(uri, result.durationMillis);
          }
        }
      } else {
        setAudioLevel(0);
        setRecordingDuration(0);
        Alert.alert(
          'Too Short',
          step.type === 'sound'
            ? 'Please hold the sound for at least 4 seconds.'
            : 'Please read the full phrase.',
          [{ text: 'OK' }]
        );
      }
    } catch (error) {
      console.error('Error stopping recording:', error);
      Alert.alert('Error', 'Something went wrong. Please try again.');
    }
  };

  const processRecording = async (uri: string, durationMs: number) => {
    setIsProcessing(true);

    try {
      let analysis: SimpleVoiceAnalysis;
      try {
        analysis = await analyzeVoiceSimple(uri);
      } catch (analysisError) {
        console.error('Analysis error:', analysisError);
        Alert.alert(
          'Analysis Failed',
          'Could not analyze your voice. Please try again.',
          [
            { text: 'Try Again', onPress: () => router.replace('/measure/recording') },
            { text: 'Cancel', style: 'cancel', onPress: () => router.back() },
          ]
        );
        return;
      }

      await addMeasurement(
        analysis.pitch.hz,
        analysis.raw.pitch.min,
        analysis.raw.pitch.max,
        uri,
        durationMs / 1000,
        'quick_measure'
      );

      router.push({
        pathname: '/measure/results',
        params: { analysis: JSON.stringify(analysis) },
      });
    } catch (error) {
      console.error('Error processing recording:', error);
      setIsProcessing(false);
      Alert.alert('Error', 'Something went wrong. Please try again.');
    }
  };

  const handleRecordPress = () => {
    if (isRecording) {
      if (recordingDuration >= step.minDuration) {
        stopRecording();
      }
    } else {
      startRecording();
    }
  };

  const handleClose = () => {
    if (isRecording) {
      audioRecorder.cancelRecording();
    }
    router.back();
  };

  const formatDuration = (ms: number) => {
    const seconds = Math.floor(ms / 1000);
    return `${seconds}s`;
  };

  const canStop = recordingDuration >= step.minDuration;

  if (isProcessing) {
    return (
      <ThemedView style={styles.container}>
        <PageHeader variant="default" onLeftPress={handleClose} />
        <View style={styles.processingContainer}>
          <ActivityIndicator size="large" color={brandContent} />
          <ThemedText type="headlineSmall" style={{ marginTop: Spacing.lg }}>
            Analyzing your voice...
          </ThemedText>
          <ThemedText type="bodyRegular" style={{ color: contentNormal, marginTop: Spacing.sm }}>
            Calculating masculinity metrics
          </ThemedText>
        </View>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <PageHeader variant="default" onLeftPress={handleClose} />

      <View style={styles.content}>
        {/* Progress dots */}
        <View style={styles.progressContainer}>
          {RECORDING_STEPS.map((s, index) => (
            <View
              key={s.id}
              style={[
                styles.progressDot,
                {
                  backgroundColor:
                    index < currentStep
                      ? successContent
                      : index === currentStep
                      ? brandContent
                      : contentSubtle + '40',
                },
              ]}
            />
          ))}
        </View>

        {/* Step header */}
        <View style={styles.headerSection}>
          <ThemedText type="headlineMedium" style={styles.title}>
            {isRecording ? 'Recording...' : step.instruction}
          </ThemedText>
          <ThemedText
            type="bodyRegular"
            style={[styles.subtitle, { color: contentNormal }]}
          >
            {isRecording
              ? canStop
                ? 'Tap to stop when finished'
                : `Keep going (${formatDuration(step.minDuration - recordingDuration)} more)`
              : step.hint}
          </ThemedText>
        </View>

        {/* Content card */}
        <Card variant="filled" style={styles.contentCard}>
          <ThemedText
            type={step.type === 'sound' ? 'headlineDisplay' : 'bodyLarge'}
            style={[
              styles.contentText,
              step.type === 'sound' && styles.soundText,
            ]}
          >
            {step.type === 'sound' ? step.content : `"${step.content}"`}
          </ThemedText>
        </Card>

        {/* Waveform */}
        <View style={styles.waveformContainer}>
          <Waveform level={audioLevel} isRecording={isRecording} />
        </View>

        {/* Duration indicator */}
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
            disabled={isRecording && !canStop}
          />
        </View>

        {/* Step indicator */}
        <ThemedText
          type="bodySmall"
          style={[styles.stepIndicator, { color: contentSubtle }]}
        >
          Step {currentStep + 1} of {RECORDING_STEPS.length}
        </ThemedText>
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
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: Spacing.sm,
    marginBottom: Spacing.lg,
  },
  progressDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
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
  contentCard: {
    padding: Spacing.xl,
  },
  contentText: {
    textAlign: 'center',
    lineHeight: 28,
  },
  soundText: {
    letterSpacing: 6,
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
  stepIndicator: {
    textAlign: 'center',
    marginBottom: Spacing.xl,
  },
  processingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
  },
});
