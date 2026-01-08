import React, { useState } from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { useThemeColor } from '@/hooks/use-theme-color';
import { Dropdown } from '@/components/dropdown';
import { HugeiconsIcon } from '@hugeicons/react-native';
import { GridIcon, Location01Icon } from '@hugeicons/core-free-icons';

type ToggleProps = {
  label: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
};

function Toggle({ label, value, onValueChange }: ToggleProps) {
  const brandContent = useThemeColor({}, 'brandContent');
  const bgTertiary = useThemeColor({}, 'bgTertiary');
  const contentNormal = useThemeColor({}, 'contentNormal');

  return (
    <Pressable
      style={[
        styles.toggleContainer,
        { backgroundColor: value ? brandContent : bgTertiary },
      ]}
      onPress={() => onValueChange(!value)}
    >
      <ThemedText
        type="bodySmall"
        style={{ color: value ? '#FFFFFF' : contentNormal }}
      >
        {label}
      </ThemedText>
    </Pressable>
  );
}

const countryOptions = [
  { label: 'United States', value: 'us' },
  { label: 'United Kingdom', value: 'uk' },
  { label: 'Canada', value: 'ca' },
  { label: 'Australia', value: 'au' },
  { label: 'Germany', value: 'de' },
  { label: 'France', value: 'fr' },
];

const categoryOptions = [
  { label: 'Technology', value: 'tech' },
  { label: 'Design', value: 'design' },
  { label: 'Marketing', value: 'marketing' },
  { label: 'Sales', value: 'sales' },
];

export function DropdownPreview() {
  const [showDropdownLeftIcon, setShowDropdownLeftIcon] = useState(true);
  const [selectedCountry, setSelectedCountry] = useState<string>();
  const [selectedCategory, setSelectedCategory] = useState<string>('tech');

  const alphaMedium = useThemeColor({}, 'alphaMedium');
  const bgSecondary = useThemeColor({}, 'bgSecondary');
  const contentNormal = useThemeColor({}, 'contentNormal');

  return (
    <View style={styles.container}>
      <ThemedText type="headlineLarge">Dropdown</ThemedText>
      <ThemedText type="bodySmall" style={{ color: contentNormal, marginTop: -12 }}>
        Dropdown selector with optional left icon. Tap to open options.
      </ThemedText>

      {/* Dropdown Icon Toggle */}
      <View style={styles.groupContainer}>
        <ThemedText type="headlineSmall">Icon Options</ThemedText>
        <View style={[styles.toggleRow, { backgroundColor: bgSecondary, borderColor: alphaMedium }]}>
          <Toggle
            label="Left Icon"
            value={showDropdownLeftIcon}
            onValueChange={setShowDropdownLeftIcon}
          />
        </View>
      </View>

      {/* Dropdown States */}
      <View style={styles.groupContainer}>
        <ThemedText type="headlineSmall">States</ThemedText>
        <View style={[styles.previewBox, { backgroundColor: bgSecondary, borderColor: alphaMedium }]}>
          {/* Default (no selection) */}
          <Dropdown
            options={countryOptions}
            value={selectedCountry}
            onValueChange={setSelectedCountry}
            placeholder="Select a country"
            leftIcon={showDropdownLeftIcon ? <HugeiconsIcon icon={Location01Icon} size={20} /> : undefined}
          />

          {/* With Selection */}
          <Dropdown
            options={categoryOptions}
            value={selectedCategory}
            onValueChange={setSelectedCategory}
            placeholder="Select a category"
            leftIcon={showDropdownLeftIcon ? <HugeiconsIcon icon={GridIcon} size={20} /> : undefined}
          />

          {/* Disabled */}
          <Dropdown
            options={countryOptions}
            value="us"
            onValueChange={() => {}}
            placeholder="Select a country"
            disabled
            leftIcon={showDropdownLeftIcon ? <HugeiconsIcon icon={Location01Icon} size={20} /> : undefined}
          />

          {/* Error */}
          <Dropdown
            options={countryOptions}
            value={undefined}
            onValueChange={() => {}}
            placeholder="Select a country"
            error="Please select a country"
            leftIcon={showDropdownLeftIcon ? <HugeiconsIcon icon={Location01Icon} size={20} /> : undefined}
          />
        </View>
      </View>

      {/* Dropdown With Label & Hint */}
      <View style={styles.groupContainer}>
        <ThemedText type="headlineSmall">With Label & Hint</ThemedText>
        <View style={[styles.previewBox, { backgroundColor: bgSecondary, borderColor: alphaMedium }]}>
          <Dropdown
            label="Country"
            options={countryOptions}
            value={selectedCountry}
            onValueChange={setSelectedCountry}
            placeholder="Select your country"
            hint="Where are you located?"
            leftIcon={showDropdownLeftIcon ? <HugeiconsIcon icon={Location01Icon} size={20} /> : undefined}
          />

          <Dropdown
            label="Department"
            options={categoryOptions}
            value={selectedCategory}
            onValueChange={setSelectedCategory}
            placeholder="Select department"
            hint="Your primary work area"
            leftIcon={showDropdownLeftIcon ? <HugeiconsIcon icon={GridIcon} size={20} /> : undefined}
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
  toggleRow: {
    flexDirection: 'row',
    gap: 12,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  toggleContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  previewBox: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    gap: 16,
  },
});
