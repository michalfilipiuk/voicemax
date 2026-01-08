import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { useThemeColor } from '@/hooks/use-theme-color';
import { Checkbox } from '@/components/checkboxes';

export function CheckboxPreview() {
  const [selected1, setSelected1] = useState(false);
  const [selected2, setSelected2] = useState(true);
  const [selected3, setSelected3] = useState(false);
  const [selected4, setSelected4] = useState(true);
  const [selected5, setSelected5] = useState(false);

  const alphaMedium = useThemeColor({}, 'alphaMedium');
  const bgSecondary = useThemeColor({}, 'bgSecondary');
  const contentNormal = useThemeColor({}, 'contentNormal');

  return (
    <View style={styles.container}>
      <ThemedText type="headlineLarge">Checkbox</ThemedText>
      <ThemedText type="bodySmall" style={{ color: contentNormal, marginTop: -12 }}>
        Animated checkbox with scale effect and haptic feedback.
      </ThemedText>

      {/* Interactive States */}
      <View style={styles.groupContainer}>
        <ThemedText type="headlineSmall">Interactive</ThemedText>
        <View style={[styles.previewBox, { backgroundColor: bgSecondary, borderColor: alphaMedium }]}>
          <View style={styles.checkboxRow}>
            <Checkbox selected={selected1} onSelect={setSelected1} />
            <ThemedText type="bodyRegular" style={{ color: contentNormal }}>
              {selected1 ? 'Selected' : 'Unselected'} - Tap to toggle
            </ThemedText>
          </View>

          <View style={styles.checkboxRow}>
            <Checkbox selected={selected2} onSelect={setSelected2} />
            <ThemedText type="bodyRegular" style={{ color: contentNormal }}>
              {selected2 ? 'Selected' : 'Unselected'} - Tap to toggle
            </ThemedText>
          </View>
        </View>
      </View>

      {/* States */}
      <View style={styles.groupContainer}>
        <ThemedText type="headlineSmall">States</ThemedText>
        <View style={[styles.previewBox, { backgroundColor: bgSecondary, borderColor: alphaMedium }]}>
          <View style={styles.checkboxRow}>
            <Checkbox selected={false} onSelect={() => {}} />
            <ThemedText type="bodyRegular" style={{ color: contentNormal }}>
              Default (Unselected)
            </ThemedText>
          </View>

          <View style={styles.checkboxRow}>
            <Checkbox selected={true} onSelect={() => {}} />
            <ThemedText type="bodyRegular" style={{ color: contentNormal }}>
              Selected
            </ThemedText>
          </View>

          <View style={styles.checkboxRow}>
            <Checkbox selected={false} onSelect={() => {}} disabled />
            <ThemedText type="bodyRegular" style={{ color: contentNormal }}>
              Disabled (Unselected)
            </ThemedText>
          </View>

          <View style={styles.checkboxRow}>
            <Checkbox selected={true} onSelect={() => {}} disabled />
            <ThemedText type="bodyRegular" style={{ color: contentNormal }}>
              Disabled (Selected)
            </ThemedText>
          </View>
        </View>
      </View>

      {/* Example List */}
      <View style={styles.groupContainer}>
        <ThemedText type="headlineSmall">Example List</ThemedText>
        <View style={[styles.previewBox, { backgroundColor: bgSecondary, borderColor: alphaMedium }]}>
          <View style={styles.checkboxRow}>
            <Checkbox selected={selected3} onSelect={setSelected3} />
            <ThemedText type="bodyRegular">Enable notifications</ThemedText>
          </View>

          <View style={styles.checkboxRow}>
            <Checkbox selected={selected4} onSelect={setSelected4} />
            <ThemedText type="bodyRegular">Subscribe to newsletter</ThemedText>
          </View>

          <View style={styles.checkboxRow}>
            <Checkbox selected={selected5} onSelect={setSelected5} />
            <ThemedText type="bodyRegular">Accept terms and conditions</ThemedText>
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
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
});
