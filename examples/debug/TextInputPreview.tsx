import React, { useState } from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { useThemeColor } from '@/hooks/use-theme-color';
import { TextInput } from '@/components/input';
import { HugeiconsIcon } from '@hugeicons/react-native';
import { Search01Icon, Cancel01Icon, EyeIcon, ViewOffIcon, Mail01Icon, LockIcon } from '@hugeicons/core-free-icons';

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

export function TextInputPreview() {
  const [showLeftIcon, setShowLeftIcon] = useState(true);
  const [showRightIcon, setShowRightIcon] = useState(true);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const alphaMedium = useThemeColor({}, 'alphaMedium');
  const bgSecondary = useThemeColor({}, 'bgSecondary');
  const contentNormal = useThemeColor({}, 'contentNormal');
  const contentSubtle = useThemeColor({}, 'contentSubtle');

  return (
    <View style={styles.container}>
      <ThemedText type="headlineLarge">Text Input</ThemedText>
      <ThemedText type="bodySmall" style={{ color: contentNormal, marginTop: -12 }}>
        Text inputs with optional icons, labels, hints, and states.
      </ThemedText>

      {/* Icon Toggles */}
      <View style={styles.groupContainer}>
        <ThemedText type="headlineSmall">Icon Options</ThemedText>
        <View style={[styles.toggleRow, { backgroundColor: bgSecondary, borderColor: alphaMedium }]}>
          <Toggle
            label="Left Icon"
            value={showLeftIcon}
            onValueChange={setShowLeftIcon}
          />
          <Toggle
            label="Right Icon"
            value={showRightIcon}
            onValueChange={setShowRightIcon}
          />
        </View>
      </View>

      {/* States */}
      <View style={styles.groupContainer}>
        <ThemedText type="headlineSmall">States</ThemedText>
        <View style={[styles.previewBox, { backgroundColor: bgSecondary, borderColor: alphaMedium }]}>
          {/* Default */}
          <TextInput
            placeholder="Default state"
            leftIcon={showLeftIcon ? <HugeiconsIcon icon={Search01Icon} size={20} /> : undefined}
            rightIcon={showRightIcon ? <HugeiconsIcon icon={Cancel01Icon} size={20} /> : undefined}
          />

          {/* Disabled */}
          <TextInput
            placeholder="Disabled state"
            disabled
            leftIcon={showLeftIcon ? <HugeiconsIcon icon={Search01Icon} size={20} /> : undefined}
            rightIcon={showRightIcon ? <HugeiconsIcon icon={Cancel01Icon} size={20} /> : undefined}
          />

          {/* Error */}
          <TextInput
            placeholder="Error state"
            error="This field has an error"
            leftIcon={showLeftIcon ? <HugeiconsIcon icon={Search01Icon} size={20} /> : undefined}
            rightIcon={showRightIcon ? <HugeiconsIcon icon={Cancel01Icon} size={20} /> : undefined}
          />
        </View>
      </View>

      {/* With Label & Hint */}
      <View style={styles.groupContainer}>
        <ThemedText type="headlineSmall">With Label & Hint</ThemedText>
        <View style={[styles.previewBox, { backgroundColor: bgSecondary, borderColor: alphaMedium }]}>
          <TextInput
            label="Email"
            placeholder="Enter your email"
            hint="We'll never share your email"
            keyboardType="email-address"
            autoCapitalize="none"
            leftIcon={showLeftIcon ? <HugeiconsIcon icon={Mail01Icon} size={20} /> : undefined}
          />

          <TextInput
            label="Password"
            placeholder="Enter your password"
            hint="Must be at least 8 characters"
            secureTextEntry={!passwordVisible}
            leftIcon={showLeftIcon ? <HugeiconsIcon icon={LockIcon} size={20} /> : undefined}
            rightIcon={
              showRightIcon ? (
                <Pressable onPress={() => setPasswordVisible(!passwordVisible)}>
                  <HugeiconsIcon
                    icon={passwordVisible ? ViewOffIcon : EyeIcon}
                    size={20}
                    color={contentSubtle}
                    strokeWidth={1.5}
                  />
                </Pressable>
              ) : undefined
            }
          />
        </View>
      </View>

      {/* Without Icons */}
      <View style={styles.groupContainer}>
        <ThemedText type="headlineSmall">Without Icons</ThemedText>
        <View style={[styles.previewBox, { backgroundColor: bgSecondary, borderColor: alphaMedium }]}>
          <TextInput
            label="Full Name"
            placeholder="John Doe"
          />

          <TextInput
            label="Bio"
            placeholder="Tell us about yourself..."
            multiline
            numberOfLines={3}
            style={{ height: 80, textAlignVertical: 'top' }}
          />
        </View>
      </View>

      {/* Error States */}
      <View style={styles.groupContainer}>
        <ThemedText type="headlineSmall">Error States</ThemedText>
        <View style={[styles.previewBox, { backgroundColor: bgSecondary, borderColor: alphaMedium }]}>
          <TextInput
            label="Email"
            placeholder="Enter your email"
            error="Please enter a valid email address"
            leftIcon={showLeftIcon ? <HugeiconsIcon icon={Mail01Icon} size={20} /> : undefined}
          />

          <TextInput
            label="Password"
            placeholder="Enter your password"
            error="Password must be at least 8 characters"
            secureTextEntry
            leftIcon={showLeftIcon ? <HugeiconsIcon icon={LockIcon} size={20} /> : undefined}
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
