import {
  Home01Icon,
  Search01Icon,
  Notification02Icon,
  UserIcon,
  ArrowRight01Icon,
} from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react-native';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, View, Pressable } from 'react-native';
import Animated from 'react-native-reanimated';

import { Badge } from '@/components/badges';
import { Button } from '@/components/buttons';
import { BottomNav, BottomNavItem, PageHeader } from '@/components/navigation';
import { ProgressBar } from '@/components/progress';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { usePressAnimation, PressAnimationPresets } from '@/hooks/use-press-animation';
import { useThemeColor } from '@/hooks/use-theme-color';
import { Rounded } from '@/styles/spacing';
import { Shadows } from '@/styles/shadows';

const navItems: BottomNavItem[] = [
  { key: 'home', label: 'Home', icon: <HugeiconsIcon icon={Home01Icon} /> },
  { key: 'search', label: 'Search', icon: <HugeiconsIcon icon={Search01Icon} /> },
  { key: 'notifications', label: 'Alerts', icon: <HugeiconsIcon icon={Notification02Icon} /> },
  { key: 'profile', label: 'Profile', icon: <HugeiconsIcon icon={UserIcon} /> },
];

function Card({ children, onPress }: { children: React.ReactNode; onPress?: () => void }) {
  const bgMain = useThemeColor({}, 'bgMain');
  const { animatedStyle, handlePressIn, handlePressOut, triggerHaptics } = usePressAnimation(
    PressAnimationPresets.card
  );

  return (
    <Pressable
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={() => {
        triggerHaptics();
        onPress?.();
      }}
    >
      <Animated.View style={[styles.card, Shadows.small, { backgroundColor: bgMain }, animatedStyle]}>
        {children}
      </Animated.View>
    </Pressable>
  );
}

export function HomeTemplate() {
  const contentNormal = useThemeColor({}, 'contentNormal');
  const contentStrong = useThemeColor({}, 'contentStrong');
  const bgSecondary = useThemeColor({}, 'bgSecondary');
  const alphaMedium = useThemeColor({}, 'alphaMedium');
  const [activeNav, setActiveNav] = useState('home');

  return (
    <ThemedView style={styles.container}>
      {/* Header */}
      <PageHeader
        title="Home"
        showLeftButton={false}
        rightIcon={<HugeiconsIcon icon={Notification02Icon} />}
        onRightPress={() => {}}
      />

      {/* Content */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Welcome Section */}
        <View style={styles.section}>
          <ThemedText type="headlineLarge">Good morning, Alex</ThemedText>
          <ThemedText type="bodyRegular" style={{ color: contentNormal }}>
            Here's what's happening today
          </ThemedText>
        </View>

        {/* Progress Card */}
        <Card>
          <View style={styles.cardHeader}>
            <View style={styles.cardTitleRow}>
              <ThemedText type="bodyLargeMedium">Weekly Goal</ThemedText>
              <Badge type="success" label="On track" />
            </View>
            <ThemedText type="bodySmall" style={{ color: contentNormal }}>
              5 of 7 days completed
            </ThemedText>
          </View>
          <ProgressBar currentStep={5} totalSteps={7} />
        </Card>

        {/* Quick Actions */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <ThemedText type="headlineSmall">Quick Actions</ThemedText>
            <Pressable>
              <ThemedText type="bodyRegularMedium" style={{ color: contentNormal }}>
                See all
              </ThemedText>
            </Pressable>
          </View>
          <View style={styles.quickActions}>
            <Button title="New Task" variant="primary" size="sm" onPress={() => {}} style={styles.quickAction} />
            <Button title="Schedule" variant="secondary" size="sm" onPress={() => {}} style={styles.quickAction} />
            <Button title="Reports" variant="outline" size="sm" onPress={() => {}} style={styles.quickAction} />
          </View>
        </View>

        {/* Recent Activity */}
        <View style={styles.section}>
          <ThemedText type="headlineSmall">Recent Activity</ThemedText>
          <View style={[styles.activityList, { backgroundColor: bgSecondary }]}>
            {['Project update submitted', 'Meeting scheduled for tomorrow', 'New comment on your post'].map(
              (item, index) => (
                <View
                  key={index}
                  style={[
                    styles.activityItem,
                    index < 2 && { borderBottomWidth: 1, borderBottomColor: alphaMedium },
                  ]}
                >
                  <ThemedText type="bodyRegular" style={{ flex: 1 }}>
                    {item}
                  </ThemedText>
                  <HugeiconsIcon icon={ArrowRight01Icon} size={16} color={contentNormal} />
                </View>
              )
            )}
          </View>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <BottomNav items={navItems} activeKey={activeNav} onSelect={setActiveNav} />
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
    paddingHorizontal: 24,
    paddingBottom: 24,
    gap: 24,
  },
  section: {
    gap: 12,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  card: {
    padding: 20,
    gap: 16,
    ...Rounded.xl,
  },
  cardHeader: {
    gap: 4,
  },
  cardTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  quickActions: {
    flexDirection: 'row',
    gap: 8,
  },
  quickAction: {
    flex: 1,
  },
  activityList: {
    ...Rounded.lg,
    overflow: 'hidden',
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 12,
  },
});
