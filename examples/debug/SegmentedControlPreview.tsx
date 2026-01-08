import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { useThemeColor } from '@/hooks/use-theme-color';
import { SegmentedControl } from '@/components/segmented-control';
import { HugeiconsIcon } from '@hugeicons/react-native';
import { Sun01Icon, Moon01Icon, Home01Icon, Settings01Icon, User02Icon, Search01Icon, GridIcon } from '@hugeicons/core-free-icons';

export function SegmentedControlPreview() {
  // Segmented Control states
  const [themeSegment, setThemeSegment] = useState<'dark' | 'light'>('dark');
  const [viewSegment, setViewSegment] = useState<'grid' | 'list' | 'card'>('grid');
  const [tabSegment, setTabSegment] = useState<'home' | 'profile' | 'settings'>('home');
  const [textSegment2, setTextSegment2] = useState<'tab1' | 'tab2'>('tab1');
  const [textSegment5, setTextSegment5] = useState<'one' | 'two' | 'three' | 'four' | 'five'>('one');

  const alphaMedium = useThemeColor({}, 'alphaMedium');
  const bgSecondary = useThemeColor({}, 'bgSecondary');
  const contentNormal = useThemeColor({}, 'contentNormal');

  return (
    <View style={styles.container}>
      <ThemedText type="headlineLarge">Segmented Control</ThemedText>
      <ThemedText type="bodySmall" style={{ color: contentNormal, marginTop: -12 }}>
        Toggle between views with icon or text segments. Supports 2-5 items.
      </ThemedText>

      {/* Icon Variant */}
      <View style={styles.groupContainer}>
        <ThemedText type="headlineSmall">Icon Variant</ThemedText>
        <View style={[styles.previewBox, { backgroundColor: bgSecondary, borderColor: alphaMedium }]}>
          {/* 2 items */}
          <View style={styles.segmentRow}>
            <ThemedText type="bodySmall" style={{ color: contentNormal, width: 60 }}>2 items</ThemedText>
            <SegmentedControl
              variant="icon"
              options={[
                { value: 'dark', icon: <HugeiconsIcon icon={Moon01Icon} size={20} /> },
                { value: 'light', icon: <HugeiconsIcon icon={Sun01Icon} size={20} /> },
              ]}
              value={themeSegment}
              onValueChange={setThemeSegment}
            />
          </View>

          {/* 3 items */}
          <View style={styles.segmentRow}>
            <ThemedText type="bodySmall" style={{ color: contentNormal, width: 60 }}>3 items</ThemedText>
            <SegmentedControl
              variant="icon"
              options={[
                { value: 'home', icon: <HugeiconsIcon icon={Home01Icon} size={20} /> },
                { value: 'profile', icon: <HugeiconsIcon icon={User02Icon} size={20} /> },
                { value: 'settings', icon: <HugeiconsIcon icon={Settings01Icon} size={20} /> },
              ]}
              value={tabSegment}
              onValueChange={setTabSegment}
            />
          </View>

          {/* 5 items */}
          <View style={styles.segmentRow}>
            <ThemedText type="bodySmall" style={{ color: contentNormal, width: 60 }}>5 items</ThemedText>
            <SegmentedControl
              variant="icon"
              options={[
                { value: 'one', icon: <HugeiconsIcon icon={Home01Icon} size={20} /> },
                { value: 'two', icon: <HugeiconsIcon icon={Search01Icon} size={20} /> },
                { value: 'three', icon: <HugeiconsIcon icon={GridIcon} size={20} /> },
                { value: 'four', icon: <HugeiconsIcon icon={User02Icon} size={20} /> },
                { value: 'five', icon: <HugeiconsIcon icon={Settings01Icon} size={20} /> },
              ]}
              value={textSegment5}
              onValueChange={setTextSegment5}
            />
          </View>
        </View>
      </View>

      {/* Text Variant */}
      <View style={styles.groupContainer}>
        <ThemedText type="headlineSmall">Text Variant</ThemedText>
        <View style={[styles.previewBox, { backgroundColor: bgSecondary, borderColor: alphaMedium }]}>
          {/* 2 items */}
          <View style={styles.segmentRow}>
            <ThemedText type="bodySmall" style={{ color: contentNormal, width: 60 }}>2 items</ThemedText>
            <SegmentedControl
              variant="text"
              options={[
                { value: 'tab1', label: 'Tab 1' },
                { value: 'tab2', label: 'Tab 2' },
              ]}
              value={textSegment2}
              onValueChange={setTextSegment2}
            />
          </View>

          {/* 3 items */}
          <View style={styles.segmentRow}>
            <ThemedText type="bodySmall" style={{ color: contentNormal, width: 60 }}>3 items</ThemedText>
            <SegmentedControl
              variant="text"
              options={[
                { value: 'grid', label: 'Grid' },
                { value: 'list', label: 'List' },
                { value: 'card', label: 'Card' },
              ]}
              value={viewSegment}
              onValueChange={setViewSegment}
            />
          </View>

          {/* 5 items */}
          <View style={styles.segmentRow}>
            <ThemedText type="bodySmall" style={{ color: contentNormal, width: 60 }}>5 items</ThemedText>
            <SegmentedControl
              variant="text"
              options={[
                { value: 'one', label: 'One' },
                { value: 'two', label: 'Two' },
                { value: 'three', label: 'Three' },
                { value: 'four', label: 'Four' },
                { value: 'five', label: 'Five' },
              ]}
              value={textSegment5}
              onValueChange={setTextSegment5}
            />
          </View>
        </View>
      </View>

      {/* Disabled State */}
      <View style={styles.groupContainer}>
        <ThemedText type="headlineSmall">Disabled</ThemedText>
        <View style={[styles.previewBox, { backgroundColor: bgSecondary, borderColor: alphaMedium }]}>
          <View style={styles.segmentRow}>
            <ThemedText type="bodySmall" style={{ color: contentNormal, width: 60 }}>Icon</ThemedText>
            <SegmentedControl
              variant="icon"
              options={[
                { value: 'dark', icon: <HugeiconsIcon icon={Moon01Icon} size={20} /> },
                { value: 'light', icon: <HugeiconsIcon icon={Sun01Icon} size={20} /> },
              ]}
              value="dark"
              onValueChange={() => {}}
              disabled
            />
          </View>
          <View style={styles.segmentRow}>
            <ThemedText type="bodySmall" style={{ color: contentNormal, width: 60 }}>Text</ThemedText>
            <SegmentedControl
              variant="text"
              options={[
                { value: 'tab1', label: 'Tab 1' },
                { value: 'tab2', label: 'Tab 2' },
              ]}
              value="tab1"
              onValueChange={() => {}}
              disabled
            />
          </View>
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
  segmentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
});
