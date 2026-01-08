import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { useThemeColor } from '@/hooks/use-theme-color';
import { Tabs } from '@/components/tabs';

export function TabsPreview() {
  // Tab states
  const [tab2, setTab2] = useState<'tab1' | 'tab2'>('tab1');
  const [tab3, setTab3] = useState<'home' | 'explore' | 'profile'>('home');
  const [tab4, setTab4] = useState<'all' | 'active' | 'completed' | 'archived'>('all');
  const [tab5, setTab5] = useState<'mon' | 'tue' | 'wed' | 'thu' | 'fri'>('mon');

  const alphaMedium = useThemeColor({}, 'alphaMedium');
  const bgSecondary = useThemeColor({}, 'bgSecondary');
  const contentNormal = useThemeColor({}, 'contentNormal');

  return (
    <View style={styles.container}>
      <ThemedText type="headlineLarge">Tabs</ThemedText>
      <ThemedText type="bodySmall" style={{ color: contentNormal, marginTop: -12 }}>
        Pill-style tabs for switching between views. Supports 2 or more items.
      </ThemedText>

      {/* Tab Counts */}
      <View style={styles.groupContainer}>
        <ThemedText type="headlineSmall">Tab Counts</ThemedText>
        <View style={[styles.previewBox, { backgroundColor: bgSecondary, borderColor: alphaMedium }]}>
          {/* 2 tabs */}
          <View style={styles.tabRow}>
            <ThemedText type="bodySmall" style={{ color: contentNormal, width: 50 }}>2</ThemedText>
            <Tabs
              options={[
                { value: 'tab1', label: 'Tab 1' },
                { value: 'tab2', label: 'Tab 2' },
              ]}
              value={tab2}
              onValueChange={setTab2}
            />
          </View>

          {/* 3 tabs */}
          <View style={styles.tabRow}>
            <ThemedText type="bodySmall" style={{ color: contentNormal, width: 50 }}>3</ThemedText>
            <Tabs
              options={[
                { value: 'home', label: 'Home' },
                { value: 'explore', label: 'Explore' },
                { value: 'profile', label: 'Profile' },
              ]}
              value={tab3}
              onValueChange={setTab3}
            />
          </View>

          {/* 4 tabs */}
          <View style={styles.tabRow}>
            <ThemedText type="bodySmall" style={{ color: contentNormal, width: 50 }}>4</ThemedText>
            <Tabs
              options={[
                { value: 'all', label: 'All' },
                { value: 'active', label: 'Active' },
                { value: 'completed', label: 'Done' },
                { value: 'archived', label: 'Archived' },
              ]}
              value={tab4}
              onValueChange={setTab4}
            />
          </View>

          {/* 5 tabs */}
          <View style={styles.tabRow}>
            <ThemedText type="bodySmall" style={{ color: contentNormal, width: 50 }}>5</ThemedText>
            <Tabs
              options={[
                { value: 'mon', label: 'Mon' },
                { value: 'tue', label: 'Tue' },
                { value: 'wed', label: 'Wed' },
                { value: 'thu', label: 'Thu' },
                { value: 'fri', label: 'Fri' },
              ]}
              value={tab5}
              onValueChange={setTab5}
            />
          </View>
        </View>
      </View>

      {/* Disabled State */}
      <View style={styles.groupContainer}>
        <ThemedText type="headlineSmall">Disabled</ThemedText>
        <View style={[styles.previewBox, { backgroundColor: bgSecondary, borderColor: alphaMedium }]}>
          <Tabs
            options={[
              { value: 'tab1', label: 'Tab 1' },
              { value: 'tab2', label: 'Tab 2' },
              { value: 'tab3', label: 'Tab 3' },
            ]}
            value="tab1"
            onValueChange={() => {}}
            disabled
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 24,
  },
  groupContainer: {
    gap: 12,
  },
  previewBox: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    gap: 16,
  },
  tabRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
});
