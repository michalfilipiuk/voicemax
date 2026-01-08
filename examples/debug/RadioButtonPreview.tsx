import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { useThemeColor } from '@/hooks/use-theme-color';
import { RadioButton } from '@/components/checkboxes';

export function RadioButtonPreview() {
  const [selected1, setSelected1] = useState<string>('option1');
  const [selected2, setSelected2] = useState<string>('small');

  const alphaMedium = useThemeColor({}, 'alphaMedium');
  const bgSecondary = useThemeColor({}, 'bgSecondary');
  const contentNormal = useThemeColor({}, 'contentNormal');

  return (
    <View style={styles.container}>
      <ThemedText type="headlineLarge">Radio Button</ThemedText>
      <ThemedText type="bodySmall" style={{ color: contentNormal, marginTop: -12 }}>
        Radio buttons with scale effect and haptic feedback.
      </ThemedText>

      {/* States */}
      <View style={styles.groupContainer}>
        <ThemedText type="headlineSmall">States</ThemedText>
        <View style={[styles.previewBox, { backgroundColor: bgSecondary, borderColor: alphaMedium }]}>
          <View style={styles.radioRow}>
            <RadioButton selected={false} onSelect={() => {}} />
            <ThemedText type="bodyRegular" style={{ color: contentNormal }}>
              Default (Unselected)
            </ThemedText>
          </View>

          <View style={styles.radioRow}>
            <RadioButton selected={true} onSelect={() => {}} />
            <ThemedText type="bodyRegular" style={{ color: contentNormal }}>
              Selected
            </ThemedText>
          </View>

          <View style={styles.radioRow}>
            <RadioButton selected={false} onSelect={() => {}} disabled />
            <ThemedText type="bodyRegular" style={{ color: contentNormal }}>
              Disabled (Unselected)
            </ThemedText>
          </View>

          <View style={styles.radioRow}>
            <RadioButton selected={true} onSelect={() => {}} disabled />
            <ThemedText type="bodyRegular" style={{ color: contentNormal }}>
              Disabled (Selected)
            </ThemedText>
          </View>
        </View>
      </View>

      {/* Radio Group Example */}
      <View style={styles.groupContainer}>
        <ThemedText type="headlineSmall">Radio Group</ThemedText>
        <View style={[styles.previewBox, { backgroundColor: bgSecondary, borderColor: alphaMedium }]}>
          <View style={styles.radioRow}>
            <RadioButton
              selected={selected1 === 'option1'}
              onSelect={() => setSelected1('option1')}
            />
            <ThemedText type="bodyRegular">Option 1</ThemedText>
          </View>

          <View style={styles.radioRow}>
            <RadioButton
              selected={selected1 === 'option2'}
              onSelect={() => setSelected1('option2')}
            />
            <ThemedText type="bodyRegular">Option 2</ThemedText>
          </View>

          <View style={styles.radioRow}>
            <RadioButton
              selected={selected1 === 'option3'}
              onSelect={() => setSelected1('option3')}
            />
            <ThemedText type="bodyRegular">Option 3</ThemedText>
          </View>
        </View>
      </View>

      {/* Size Selection Example */}
      <View style={styles.groupContainer}>
        <ThemedText type="headlineSmall">Example: Size Selection</ThemedText>
        <View style={[styles.previewBox, { backgroundColor: bgSecondary, borderColor: alphaMedium }]}>
          <View style={styles.radioRow}>
            <RadioButton
              selected={selected2 === 'small'}
              onSelect={() => setSelected2('small')}
            />
            <ThemedText type="bodyRegular">Small</ThemedText>
          </View>

          <View style={styles.radioRow}>
            <RadioButton
              selected={selected2 === 'medium'}
              onSelect={() => setSelected2('medium')}
            />
            <ThemedText type="bodyRegular">Medium</ThemedText>
          </View>

          <View style={styles.radioRow}>
            <RadioButton
              selected={selected2 === 'large'}
              onSelect={() => setSelected2('large')}
            />
            <ThemedText type="bodyRegular">Large</ThemedText>
          </View>

          <View style={styles.radioRow}>
            <RadioButton
              selected={selected2 === 'xlarge'}
              onSelect={() => setSelected2('xlarge')}
            />
            <ThemedText type="bodyRegular">X-Large</ThemedText>
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
  radioRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
});
