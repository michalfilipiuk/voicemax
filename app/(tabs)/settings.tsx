import * as Haptics from 'expo-haptics';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, View } from 'react-native';
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
});
