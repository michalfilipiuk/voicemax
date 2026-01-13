import * as Haptics from 'expo-haptics';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ActivityIndicator, Alert, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Card } from '@/components/cards';
import { Switch } from '@/components/switch';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useThemeOverride } from '@/context/ThemeContext';
import { useToast } from '@/context/ToastContext';
import { useUser } from '@/context/UserContext';
import { useWorkout } from '@/context/WorkoutContext';
import { useThemeColor } from '@/hooks/use-theme-color';
import { Spacing, BorderRadius } from '@/styles/spacing';
import { audioRecorder, analyzeVoiceSimple, type SimpleVoiceAnalysis } from '@/services/audio';

export default function SettingsScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { user, resetUser } = useUser();
  const { clearHistory } = useWorkout();
  const { theme, setTheme } = useThemeOverride();
  const { showToast } = useToast();

  const contentNormal = useThemeColor({}, 'contentNormal');
  const contentSubtle = useThemeColor({}, 'contentSubtle');
  const bgSecondary = useThemeColor({}, 'bgSecondary');
  const errorContent = useThemeColor({}, 'errorContent');

  const isDarkMode = theme === 'dark';
  const [isRecording, setIsRecording] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<SimpleVoiceAnalysis | null>(null);

  const primaryColor = useThemeColor({}, 'primary');

  const handleTestVoiceAnalysis = async () => {
    try {
      const hasPermission = await audioRecorder.requestPermissions();
      if (!hasPermission) {
        Alert.alert('Permission Required', 'Microphone access is needed to test voice analysis.');
        return;
      }

      // Start recording
      setIsRecording(true);
      setAnalysisResult(null);
      await audioRecorder.startRecording();

      // Record for 3 seconds
      await new Promise(resolve => setTimeout(resolve, 3000));

      // Stop recording
      const result = await audioRecorder.stopRecording();
      setIsRecording(false);

      if (!result?.uri) {
        showToast('Recording failed', 'error');
        return;
      }

      // Analyze
      setIsAnalyzing(true);
      const analysis = await analyzeVoiceSimple(result.uri);
      setAnalysisResult(analysis);
      setIsAnalyzing(false);

      showToast('Analysis complete!', 'success');
    } catch (error) {
      setIsRecording(false);
      setIsAnalyzing(false);
      console.error('Voice analysis error:', error);
      showToast('Analysis failed: ' + (error as Error).message, 'error');
    }
  };

  const handleToggleDarkMode = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setTheme(isDarkMode ? 'light' : 'dark');
  };

  const handleResetProgress = () => {
    Alert.alert(
      'Reset Progress',
      'This will clear all your workout history and voice measurements. This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Reset',
          style: 'destructive',
          onPress: async () => {
            await clearHistory();
            showToast('Progress has been reset', 'success');
          },
        },
      ]
    );
  };

  const handleResetOnboarding = () => {
    Alert.alert(
      'Reset Onboarding',
      'This will reset your profile and take you back to the welcome screen.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Reset',
          style: 'destructive',
          onPress: async () => {
            await resetUser();
            router.replace('/(onboarding)/welcome');
          },
        },
      ]
    );
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[
          styles.content,
          { paddingTop: insets.top + Spacing.md },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <ThemedText type="headlineLarge">Settings</ThemedText>
        </View>

        {/* Profile Section */}
        <Card variant="elevated" style={styles.card}>
          <ThemedText type="bodySmallMedium" style={{ color: contentSubtle }}>
            PROFILE
          </ThemedText>
          <View style={styles.profileInfo}>
            <View style={styles.infoRow}>
              <ThemedText type="bodyRegular" style={{ color: contentNormal }}>
                Name
              </ThemedText>
              <ThemedText type="bodyRegularMedium">
                {user.firstName || 'Not set'}
              </ThemedText>
            </View>
            <View style={styles.infoRow}>
              <ThemedText type="bodyRegular" style={{ color: contentNormal }}>
                Baseline Pitch
              </ThemedText>
              <ThemedText type="bodyRegularMedium">
                {user.baselinePitch ? `${user.baselinePitch} Hz` : 'Not measured'}
              </ThemedText>
            </View>
            <View style={styles.infoRow}>
              <ThemedText type="bodyRegular" style={{ color: contentNormal }}>
                Target Pitch
              </ThemedText>
              <ThemedText type="bodyRegularMedium">
                {user.targetPitch ? `${user.targetPitch} Hz` : 'Not set'}
              </ThemedText>
            </View>
          </View>
        </Card>

        {/* Appearance Section */}
        <Card variant="elevated" style={styles.card}>
          <ThemedText type="bodySmallMedium" style={{ color: contentSubtle }}>
            APPEARANCE
          </ThemedText>
          <View style={styles.settingRow}>
            <ThemedText type="bodyRegular">Dark Mode</ThemedText>
            <Switch value={isDarkMode} onValueChange={handleToggleDarkMode} />
          </View>
        </Card>

        {/* Voice Analysis Test Section */}
        <Card variant="elevated" style={styles.card}>
          <ThemedText type="bodySmallMedium" style={{ color: contentSubtle }}>
            VOICE ANALYSIS TEST
          </ThemedText>
          <ThemedText type="bodySmall" style={{ color: contentSubtle }}>
            Test the new state-of-the-art voice analysis. Records 3 seconds of audio.
          </ThemedText>
          <Pressable
            onPress={handleTestVoiceAnalysis}
            disabled={isRecording || isAnalyzing}
            style={[
              styles.actionButton,
              { backgroundColor: primaryColor, opacity: isRecording || isAnalyzing ? 0.6 : 1 },
            ]}
          >
            {isRecording ? (
              <View style={styles.recordingRow}>
                <ActivityIndicator color="#fff" size="small" />
                <ThemedText type="bodyRegularMedium" style={{ color: '#fff', marginLeft: 8 }}>
                  Recording... (3s)
                </ThemedText>
              </View>
            ) : isAnalyzing ? (
              <View style={styles.recordingRow}>
                <ActivityIndicator color="#fff" size="small" />
                <ThemedText type="bodyRegularMedium" style={{ color: '#fff', marginLeft: 8 }}>
                  Analyzing...
                </ThemedText>
              </View>
            ) : (
              <ThemedText type="bodyRegularMedium" style={{ color: '#fff' }}>
                Test Voice Analysis
              </ThemedText>
            )}
          </Pressable>

          {analysisResult && (
            <View style={styles.resultsContainer}>
              <ThemedText type="bodySmallMedium" style={{ color: contentSubtle, marginBottom: 8 }}>
                RESULTS
              </ThemedText>

              <View style={styles.resultRow}>
                <ThemedText type="bodyRegular">Pitch</ThemedText>
                <ThemedText type="bodyRegularMedium">
                  {analysisResult.pitch.hz} Hz ({analysisResult.pitch.category})
                </ThemedText>
              </View>

              <View style={styles.resultRow}>
                <ThemedText type="bodyRegular">Quality Score</ThemedText>
                <ThemedText type="bodyRegularMedium">
                  {analysisResult.quality.overall}/100 ({analysisResult.quality.category})
                </ThemedText>
              </View>

              <View style={styles.resultRow}>
                <ThemedText type="bodyRegular">Clarity (HNR)</ThemedText>
                <ThemedText type="bodyRegularMedium">
                  {analysisResult.metrics.hnr.toFixed(1)} dB ({analysisResult.metrics.hnrStatus})
                </ThemedText>
              </View>

              <View style={styles.resultRow}>
                <ThemedText type="bodyRegular">Jitter</ThemedText>
                <ThemedText type="bodyRegularMedium">
                  {analysisResult.metrics.jitter.toFixed(2)}% ({analysisResult.metrics.jitterStatus})
                </ThemedText>
              </View>

              <View style={styles.resultRow}>
                <ThemedText type="bodyRegular">Shimmer</ThemedText>
                <ThemedText type="bodyRegularMedium">
                  {analysisResult.metrics.shimmer.toFixed(2)} dB ({analysisResult.metrics.shimmerStatus})
                </ThemedText>
              </View>

              <View style={styles.resultRow}>
                <ThemedText type="bodyRegular">Formant F1</ThemedText>
                <ThemedText type="bodyRegularMedium">{analysisResult.formants.f1} Hz</ThemedText>
              </View>

              <View style={styles.resultRow}>
                <ThemedText type="bodyRegular">Formant F2</ThemedText>
                <ThemedText type="bodyRegularMedium">{analysisResult.formants.f2} Hz</ThemedText>
              </View>

              <View style={styles.resultRow}>
                <ThemedText type="bodyRegular">Formant F3</ThemedText>
                <ThemedText type="bodyRegularMedium">{analysisResult.formants.f3} Hz</ThemedText>
              </View>

              <View style={styles.resultRow}>
                <ThemedText type="bodyRegular">Vocal Tract Length</ThemedText>
                <ThemedText type="bodyRegularMedium">{analysisResult.formants.vocalTractLength} cm</ThemedText>
              </View>
            </View>
          )}
        </Card>

        {/* Data Section */}
        <Card variant="elevated" style={styles.card}>
          <ThemedText type="bodySmallMedium" style={{ color: contentSubtle }}>
            DATA
          </ThemedText>
          <Pressable
            onPress={handleResetProgress}
            style={[styles.actionButton, { backgroundColor: bgSecondary }]}
          >
            <ThemedText type="bodyRegular" style={{ color: errorContent }}>
              Reset Progress
            </ThemedText>
          </Pressable>
          <Pressable
            onPress={handleResetOnboarding}
            style={[styles.actionButton, { backgroundColor: bgSecondary }]}
          >
            <ThemedText type="bodyRegular" style={{ color: errorContent }}>
              Reset Onboarding
            </ThemedText>
          </Pressable>
        </Card>

        {/* Disclaimer */}
        <Card variant="filled" style={styles.disclaimerCard}>
          <ThemedText type="bodySmall" style={{ color: contentSubtle }}>
            VoiceMax is a voice training app designed to help develop deeper,
            more resonant speaking voices through exercises. Results vary by
            individual. This app does not provide medical advice. Consult a
            professional for any voice-related health concerns.
          </ThemedText>
        </Card>

        {/* Version */}
        <ThemedText
          type="bodySmall"
          style={[styles.version, { color: contentSubtle }]}
        >
          VoiceMax v1.0.0
        </ThemedText>
      </ScrollView>
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
    paddingBottom: Spacing.xl,
    gap: Spacing.lg,
  },
  header: {
    gap: Spacing.xs,
  },
  card: {
    padding: Spacing.lg,
    gap: Spacing.md,
  },
  profileInfo: {
    gap: Spacing.sm,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  actionButton: {
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.md,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
  },
  disclaimerCard: {
    padding: Spacing.md,
  },
  version: {
    textAlign: 'center',
  },
  recordingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  resultsContainer: {
    marginTop: Spacing.sm,
    paddingTop: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.1)',
  },
  resultRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Spacing.xs,
  },
});
