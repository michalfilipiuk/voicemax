import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';

import { Switch } from '@/components/switch';
import { ThemedText } from '@/components/themed-text';
import { useThemeColor } from '@/hooks/use-theme-color';

export function SwitchPreview() {
  const [switch1, setSwitch1] = useState(false);
  const [switch2, setSwitch2] = useState(true);
  const [switch3, setSwitch3] = useState(false);
  const [switch4, setSwitch4] = useState(true);
  const [switch5, setSwitch5] = useState(false);

  const alphaMedium = useThemeColor({}, 'alphaMedium');
  const bgSecondary = useThemeColor({}, 'bgSecondary');
  const contentNormal = useThemeColor({}, 'contentNormal');

  return (
    <View style={styles.container}>
      <ThemedText type="headlineLarge">Switch</ThemedText>
      <ThemedText type="bodySmall" style={{ color: contentNormal, marginTop: -12 }}>
        Toggle switch with smooth animation and haptic feedback.
      </ThemedText>

      {/* Interactive States */}
      <View style={styles.groupContainer}>
        <ThemedText type="headlineSmall">Interactive</ThemedText>
        <View style={[styles.previewBox, { backgroundColor: bgSecondary, borderColor: alphaMedium }]}>
          <View style={styles.switchRow}>
            <ThemedText type="bodyRegular" style={{ flex: 1 }}>
              {switch1 ? 'On' : 'Off'} - Tap to toggle
            </ThemedText>
            <Switch value={switch1} onValueChange={setSwitch1} />
          </View>

          <View style={styles.switchRow}>
            <ThemedText type="bodyRegular" style={{ flex: 1 }}>
              {switch2 ? 'On' : 'Off'} - Tap to toggle
            </ThemedText>
            <Switch value={switch2} onValueChange={setSwitch2} />
          </View>
        </View>
      </View>

      {/* States */}
      <View style={styles.groupContainer}>
        <ThemedText type="headlineSmall">States</ThemedText>
        <View style={[styles.previewBox, { backgroundColor: bgSecondary, borderColor: alphaMedium }]}>
          <View style={styles.switchRow}>
            <ThemedText type="bodyRegular" style={{ flex: 1, color: contentNormal }}>
              Default (Off)
            </ThemedText>
            <Switch value={false} onValueChange={() => {}} />
          </View>

          <View style={styles.switchRow}>
            <ThemedText type="bodyRegular" style={{ flex: 1, color: contentNormal }}>
              Selected (On)
            </ThemedText>
            <Switch value={true} onValueChange={() => {}} />
          </View>

          <View style={styles.switchRow}>
            <ThemedText type="bodyRegular" style={{ flex: 1, color: contentNormal }}>
              Disabled (Off)
            </ThemedText>
            <Switch value={false} onValueChange={() => {}} disabled />
          </View>

          <View style={styles.switchRow}>
            <ThemedText type="bodyRegular" style={{ flex: 1, color: contentNormal }}>
              Disabled (On)
            </ThemedText>
            <Switch value={true} onValueChange={() => {}} disabled />
          </View>
        </View>
      </View>

      {/* Example Settings */}
      <View style={styles.groupContainer}>
        <ThemedText type="headlineSmall">Settings Example</ThemedText>
        <View style={[styles.previewBox, { backgroundColor: bgSecondary, borderColor: alphaMedium }]}>
          <View style={styles.switchRow}>
            <ThemedText type="bodyRegular" style={{ flex: 1 }}>Dark Mode</ThemedText>
            <Switch value={switch3} onValueChange={setSwitch3} />
          </View>

          <View style={styles.switchRow}>
            <ThemedText type="bodyRegular" style={{ flex: 1 }}>Push Notifications</ThemedText>
            <Switch value={switch4} onValueChange={setSwitch4} />
          </View>

          <View style={styles.switchRow}>
            <ThemedText type="bodyRegular" style={{ flex: 1 }}>Auto-update</ThemedText>
            <Switch value={switch5} onValueChange={setSwitch5} />
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
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
