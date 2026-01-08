import { Bug01Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react-native';
import * as Haptics from 'expo-haptics';
import { useRouter, usePathname } from 'expo-router';
import React, { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { IconButton } from '@/components/buttons';
import { BottomSheetModal } from '@/components/modals';
import { ThemedText } from '@/components/themed-text';
import { useUser } from '@/context/UserContext';
import { useThemeColor } from '@/hooks/use-theme-color';
import { Spacing, BorderRadius } from '@/styles/spacing';

interface NavSection {
  title: string;
  routes: { label: string; path: string }[];
}

const NAV_SECTIONS: NavSection[] = [
  {
    title: 'Onboarding',
    routes: [
      { label: '1. Welcome', path: '/(onboarding)/welcome' },
      { label: '2. Name', path: '/(onboarding)/name' },
      { label: '3. Age', path: '/(onboarding)/age' },
      { label: '4. Goal', path: '/(onboarding)/goal' },
      { label: '5. Perception', path: '/(onboarding)/perception' },
      { label: '6. Experience', path: '/(onboarding)/experience' },
      { label: '7. Commitment', path: '/(onboarding)/commitment' },
      { label: '8. Voice Test Intro', path: '/(onboarding)/voice-test-intro' },
      { label: '9. Voice Recording', path: '/(onboarding)/voice-recording' },
      { label: '10. Results', path: '/(onboarding)/results' },
      { label: '11. Projection', path: '/(onboarding)/projection' },
      { label: '12. Paywall', path: '/(onboarding)/paywall' },
    ],
  },
  {
    title: 'Main App',
    routes: [
      { label: 'Dashboard', path: '/(tabs)' },
      { label: 'Progress', path: '/(tabs)/progress' },
      { label: 'Settings', path: '/(tabs)/settings' },
    ],
  },
  {
    title: 'Workout',
    routes: [
      { label: 'Workout Intro', path: '/workout/intro' },
      { label: 'Exercise', path: '/workout/exercise' },
      { label: 'Rest', path: '/workout/rest' },
      { label: 'Complete', path: '/workout/complete' },
    ],
  },
];

export function DebugNavigator() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const insets = useSafeAreaInsets();
  const { user, resetUser, completeOnboarding } = useUser();

  // Theme colors
  const brandContent = useThemeColor({}, 'brandContent');
  const bgSecondary = useThemeColor({}, 'bgSecondary');
  const contentStrong = useThemeColor({}, 'contentStrong');
  const contentSubtle = useThemeColor({}, 'contentSubtle');
  const errorContent = useThemeColor({}, 'errorContent');
  const successContent = useThemeColor({}, 'successContent');

  // Only show in development
  if (!__DEV__) return null;

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleNavigate = (path: string) => {
    Haptics.selectionAsync();
    setIsOpen(false);
    setTimeout(() => {
      router.push(path as any);
    }, 100);
  };

  const handleResetOnboarding = async () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
    await resetUser();
    setIsOpen(false);
    router.replace('/(onboarding)/welcome');
  };

  const handleCompleteOnboarding = async () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    await completeOnboarding();
    setIsOpen(false);
    router.replace('/(tabs)');
  };

  return (
    <>
      {/* Floating Debug Button */}
      <View
        style={[
          styles.floatingButtonContainer,
          { bottom: insets.bottom + 100 },
        ]}
      >
        <IconButton
          icon={<HugeiconsIcon icon={Bug01Icon} color="#FFFFFF" />}
          variant="primary"
          size="lg"
          onPress={handleOpen}
        />
      </View>

      {/* Navigation Modal */}
      <BottomSheetModal
        visible={isOpen}
        onClose={handleClose}
        title="Debug Navigator"
        maxHeight={0.8}
      >
        {/* Current State */}
        <View style={[styles.stateSection, { backgroundColor: bgSecondary }]}>
          <ThemedText type="bodySmallMedium" style={{ color: contentSubtle }}>
            Current Path
          </ThemedText>
          <ThemedText type="bodyRegularMedium" style={{ color: brandContent }}>
            {pathname}
          </ThemedText>
          <View style={styles.stateRow}>
            <ThemedText type="bodySmall" style={{ color: contentSubtle }}>
              Onboarding:
            </ThemedText>
            <ThemedText
              type="bodySmallMedium"
              style={{
                color: user.onboardingCompleted ? successContent : errorContent,
              }}
            >
              {user.onboardingCompleted ? 'Complete' : 'Incomplete'}
            </ThemedText>
          </View>
          {user.baselinePitch && (
            <View style={styles.stateRow}>
              <ThemedText type="bodySmall" style={{ color: contentSubtle }}>
                Baseline Pitch:
              </ThemedText>
              <ThemedText type="bodySmallMedium">
                {user.baselinePitch} Hz
              </ThemedText>
            </View>
          )}
        </View>

        {/* Quick Actions */}
        <View style={styles.actionsRow}>
          <Pressable
            onPress={handleResetOnboarding}
            style={[
              styles.actionButton,
              { backgroundColor: errorContent + '20' },
            ]}
          >
            <ThemedText type="bodySmallMedium" style={{ color: errorContent }}>
              Reset Onboarding
            </ThemedText>
          </Pressable>
          <Pressable
            onPress={handleCompleteOnboarding}
            style={[
              styles.actionButton,
              { backgroundColor: successContent + '20' },
            ]}
          >
            <ThemedText
              type="bodySmallMedium"
              style={{ color: successContent }}
            >
              Complete Onboarding
            </ThemedText>
          </Pressable>
        </View>

        {/* Navigation Sections */}
        {NAV_SECTIONS.map((section) => (
          <View key={section.title} style={styles.section}>
            <ThemedText
              type="bodySmallMedium"
              style={[styles.sectionTitle, { color: contentSubtle }]}
            >
              {section.title}
            </ThemedText>
            <View style={styles.routesList}>
              {section.routes.map((route) => {
                const isActive = pathname === route.path;
                return (
                  <Pressable
                    key={route.path}
                    onPress={() => handleNavigate(route.path)}
                    style={[
                      styles.routeItem,
                      {
                        backgroundColor: isActive
                          ? brandContent + '20'
                          : bgSecondary,
                      },
                    ]}
                  >
                    <ThemedText
                      type="bodyRegular"
                      style={{
                        color: isActive ? brandContent : contentStrong,
                      }}
                    >
                      {route.label}
                    </ThemedText>
                  </Pressable>
                );
              })}
            </View>
          </View>
        ))}
      </BottomSheetModal>
    </>
  );
}

const styles = StyleSheet.create({
  floatingButtonContainer: {
    position: 'absolute',
    right: Spacing.md,
    zIndex: 1000,
  },
  stateSection: {
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
    gap: Spacing.xs,
    marginBottom: Spacing.md,
  },
  stateRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  actionsRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
    marginBottom: Spacing.lg,
  },
  actionButton: {
    flex: 1,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
  },
  section: {
    marginBottom: Spacing.lg,
  },
  sectionTitle: {
    marginBottom: Spacing.sm,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  routesList: {
    gap: Spacing.xs,
  },
  routeItem: {
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    borderRadius: BorderRadius.md,
  },
});
