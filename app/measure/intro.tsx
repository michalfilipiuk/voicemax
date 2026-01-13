import {
  Mic01Icon,
  VolumeOffIcon,
  UserIcon,
} from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react-native';
import { Audio } from 'expo-av';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, ScrollView, StyleSheet, View } from 'react-native';

import { Card } from '@/components/cards';
import { Footer, PageHeader } from '@/components/navigation';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useThemeColor } from '@/hooks/use-theme-color';
import { isAnalyzerReady } from '@/services/audio/voice-analyzer';
import { Spacing } from '@/styles/spacing';

const TIPS = [
  {
    icon: VolumeOffIcon,
    title: 'Find a quiet space',
    description: 'Background noise can affect accuracy',
  },
  {
    icon: UserIcon,
    title: 'Speak naturally',
    description: 'Use your normal conversational voice',
  },
  {
    icon: Mic01Icon,
    title: 'Hold phone steady',
    description: 'Keep about 6 inches from your mouth',
  },
];

export default function MeasureIntroScreen() {
  const router = useRouter();
  const contentNormal = useThemeColor({}, 'contentNormal');
  const brandContent = useThemeColor({}, 'brandContent');
  const bgSecondary = useThemeColor({}, 'bgSecondary');
  const [isRequestingPermission, setIsRequestingPermission] = useState(false);
  const [analyzerReady, setAnalyzerReady] = useState<boolean | null>(null);

  useEffect(() => {
    checkAnalyzer();
  }, []);

  const checkAnalyzer = async () => {
    const ready = await isAnalyzerReady();
    setAnalyzerReady(ready);
  };

  const handleStartTest = async () => {
    if (analyzerReady === false) {
      Alert.alert(
        'Analysis Unavailable',
        'Voice analysis is not available. Please ensure the app is fully installed.',
        [{ text: 'OK' }]
      );
      return;
    }

    setIsRequestingPermission(true);

    try {
      const { granted } = await Audio.requestPermissionsAsync();

      if (granted) {
        router.push('/measure/recording');
      } else {
        Alert.alert(
          'Microphone Access Required',
          'VoiceMax needs microphone access to analyze your voice. Please enable it in Settings.',
          [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Try Again', onPress: handleStartTest },
          ]
        );
      }
    } catch (error) {
      console.error('Error requesting permission:', error);
      Alert.alert('Error', 'Unable to request microphone permission');
    } finally {
      setIsRequestingPermission(false);
    }
  };

  const handleClose = () => {
    router.back();
  };

  const getButtonLabel = () => {
    if (analyzerReady === null) return 'Checking...';
    if (isRequestingPermission) return 'Requesting...';
    return 'Start Measurement';
  };

  return (
    <ThemedView style={styles.container}>
      <PageHeader
        variant="default"
        onLeftPress={handleClose}
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.headerSection}>
          <View
            style={[styles.iconContainer, { backgroundColor: brandContent }]}
          >
            <HugeiconsIcon icon={Mic01Icon} size={32} color="#FFFFFF" />
          </View>

          <ThemedText type="headlineLarge" style={styles.title}>
            Measure Your Voice
          </ThemedText>
          <ThemedText
            type="bodyLarge"
            style={[styles.subtitle, { color: contentNormal }]}
          >
            3 quick recordings to analyze your voice masculinity - depth, resonance, power, and control.
          </ThemedText>
        </View>

        <View style={styles.tipsSection}>
          <ThemedText type="bodyLargeMedium" style={styles.tipsTitle}>
            Tips for accurate measurement
          </ThemedText>

          {TIPS.map((tip, index) => (
            <Card key={index} variant="filled" style={styles.tipCard}>
              <View style={styles.tipContent}>
                <View
                  style={[styles.tipIconContainer, { backgroundColor: bgSecondary }]}
                >
                  <HugeiconsIcon
                    icon={tip.icon}
                    size={20}
                    color={brandContent}
                  />
                </View>
                <View style={styles.tipText}>
                  <ThemedText type="bodyRegularMedium">{tip.title}</ThemedText>
                  <ThemedText
                    type="bodySmall"
                    style={{ color: contentNormal }}
                  >
                    {tip.description}
                  </ThemedText>
                </View>
              </View>
            </Card>
          ))}
        </View>
      </ScrollView>

      <Footer
        variant="oneButton"
        primaryLabel={getButtonLabel()}
        primaryDisabled={isRequestingPermission || analyzerReady === null}
        onPrimaryPress={handleStartTest}
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
    gap: Spacing.md,
    marginBottom: Spacing.xl,
  },
  iconContainer: {
    width: 72,
    height: 72,
    borderRadius: 36,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  title: {
    textAlign: 'center',
  },
  subtitle: {
    textAlign: 'center',
    paddingHorizontal: Spacing.sm,
  },
  tipsSection: {
    gap: Spacing.md,
  },
  tipsTitle: {
    marginBottom: Spacing.xs,
  },
  tipCard: {
    padding: Spacing.md,
  },
  tipContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  tipIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tipText: {
    flex: 1,
    gap: 2,
  },
});
