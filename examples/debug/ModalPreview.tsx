import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';

import { Button } from '@/components/buttons';
import { SelectCard } from '@/components/checkboxes';
import { Dropdown } from '@/components/dropdown';
import { TextInput } from '@/components/input';
import { SegmentedControl } from '@/components/segmented-control';
import { BottomSheetModal, FullScreenModal } from '@/components/modals';
import { ThemedText } from '@/components/themed-text';
import { useThemeColor } from '@/hooks/use-theme-color';

export function ModalPreview() {
  // Basic modals
  const [simpleConfirm, setSimpleConfirm] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(false);

  // Content-heavy modals
  const [formSheet, setFormSheet] = useState(false);
  const [selectSheet, setSelectSheet] = useState(false);
  const [settingsSheet, setSettingsSheet] = useState(false);
  const [longFormSheet, setLongFormSheet] = useState(false);

  // Full screen modals
  const [fullScreenForm, setFullScreenForm] = useState(false);
  const [fullScreenSettings, setFullScreenSettings] = useState(false);

  // Form state
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [selectedTheme, setSelectedTheme] = useState('system');
  const [selectedLanguage, setSelectedLanguage] = useState<string | undefined>(undefined);
  const [selectedNotification, setSelectedNotification] = useState<string | null>(null);
  const [selectedPrivacy, setSelectedPrivacy] = useState<string | null>(null);

  const contentNormal = useThemeColor({}, 'contentNormal');

  const languageOptions = [
    { label: 'English', value: 'en' },
    { label: 'Spanish', value: 'es' },
    { label: 'French', value: 'fr' },
    { label: 'German', value: 'de' },
  ];

  return (
    <View style={styles.container}>
      <ThemedText type="headlineLarge">Modals</ThemedText>
      <ThemedText type="bodySmall" style={{ color: contentNormal, marginTop: -12 }}>
        Bottom sheet and full screen modal variants with different content.
      </ThemedText>

      {/* Simple Modals */}
      <View style={styles.section}>
        <ThemedText type="headlineSmall">Simple Dialogs</ThemedText>
        <ThemedText type="bodySmall" style={{ color: contentNormal }}>
          Minimal content - modal hugs content.
        </ThemedText>
        <View style={styles.buttonRow}>
          <Button
            title="Confirm"
            variant="secondary"
            size="sm"
            onPress={() => setSimpleConfirm(true)}
          />
          <Button
            title="Delete"
            variant="secondary"
            size="sm"
            onPress={() => setDeleteConfirm(true)}
          />
        </View>
      </View>

      {/* Content-Heavy Modals */}
      <View style={styles.section}>
        <ThemedText type="headlineSmall">Forms & Selections</ThemedText>
        <ThemedText type="bodySmall" style={{ color: contentNormal }}>
          Modals with various form components.
        </ThemedText>
        <View style={styles.buttonRow}>
          <Button
            title="Quick Form"
            variant="secondary"
            size="sm"
            onPress={() => setFormSheet(true)}
          />
          <Button
            title="Select Plan"
            variant="secondary"
            size="sm"
            onPress={() => setSelectSheet(true)}
          />
          <Button
            title="Settings"
            variant="secondary"
            size="sm"
            onPress={() => setSettingsSheet(true)}
          />
        </View>
      </View>

      {/* Scrollable Modals */}
      <View style={styles.section}>
        <ThemedText type="headlineSmall">Scrollable Content</ThemedText>
        <ThemedText type="bodySmall" style={{ color: contentNormal }}>
          Long content that requires scrolling.
        </ThemedText>
        <View style={styles.buttonRow}>
          <Button
            title="Long Form"
            variant="secondary"
            size="sm"
            onPress={() => setLongFormSheet(true)}
          />
          <Button
            title="Full Screen Form"
            variant="secondary"
            size="sm"
            onPress={() => setFullScreenForm(true)}
          />
          <Button
            title="Full Settings"
            variant="secondary"
            size="sm"
            onPress={() => setFullScreenSettings(true)}
          />
        </View>
      </View>

      {/* Simple Confirm Modal */}
      <BottomSheetModal
        visible={simpleConfirm}
        onClose={() => setSimpleConfirm(false)}
        title="Confirm Action"
        description="Are you sure you want to proceed?"
        footerProps={{
          variant: 'twoButtonsHorizontal',
          primaryLabel: 'Confirm',
          secondaryLabel: 'Cancel',
          onPrimaryPress: () => setSimpleConfirm(false),
          onSecondaryPress: () => setSimpleConfirm(false),
        }}
      >
        <View style={styles.modalContent}>
          <ThemedText type="bodyRegular" style={{ color: contentNormal }}>
            This will update your preferences.
          </ThemedText>
        </View>
      </BottomSheetModal>

      {/* Delete Confirm Modal */}
      <BottomSheetModal
        visible={deleteConfirm}
        onClose={() => setDeleteConfirm(false)}
        title="Delete Item"
        description="This action cannot be undone."
        footerProps={{
          variant: 'twoButtonsVertical',
          primaryLabel: 'Delete',
          secondaryLabel: 'Cancel',
          onPrimaryPress: () => setDeleteConfirm(false),
          onSecondaryPress: () => setDeleteConfirm(false),
        }}
      >
        <View style={styles.modalContent}>
          <ThemedText type="bodyRegular" style={{ color: contentNormal }}>
            Are you sure you want to permanently delete this item from your account?
          </ThemedText>
        </View>
      </BottomSheetModal>

      {/* Quick Form Sheet */}
      <BottomSheetModal
        visible={formSheet}
        onClose={() => setFormSheet(false)}
        title="Add New Item"
        description="Fill in the details below."
        footerProps={{
          variant: 'oneButton',
          primaryLabel: 'Add Item',
          onPrimaryPress: () => setFormSheet(false),
        }}
      >
        <View style={styles.modalContent}>
          <TextInput label="Name" placeholder="Enter item name" />
          <TextInput label="Description" placeholder="Optional description" />
        </View>
      </BottomSheetModal>

      {/* Select Plan Sheet */}
      <BottomSheetModal
        visible={selectSheet}
        onClose={() => setSelectSheet(false)}
        title="Choose a Plan"
        description="Select the plan that works best for you."
        footerProps={{
          variant: 'oneButton',
          primaryLabel: 'Continue',
          onPrimaryPress: () => setSelectSheet(false),
          primaryDisabled: !selectedPlan,
        }}
      >
        <View style={styles.modalContent}>
          <SelectCard
            title="Basic"
            description="Perfect for getting started"
            selected={selectedPlan === 'basic'}
            onSelect={() => setSelectedPlan('basic')}
          />
          <SelectCard
            title="Pro"
            description="For power users and teams"
            selected={selectedPlan === 'pro'}
            onSelect={() => setSelectedPlan('pro')}
          />
          <SelectCard
            title="Enterprise"
            description="Custom solutions for large organizations"
            selected={selectedPlan === 'enterprise'}
            onSelect={() => setSelectedPlan('enterprise')}
          />
        </View>
      </BottomSheetModal>

      {/* Settings Sheet */}
      <BottomSheetModal
        visible={settingsSheet}
        onClose={() => setSettingsSheet(false)}
        title="Quick Settings"
        description="Adjust your preferences."
        footerProps={{
          variant: 'oneButton',
          primaryLabel: 'Done',
          onPrimaryPress: () => setSettingsSheet(false),
        }}
      >
        <View style={styles.modalContent}>
          <ThemedText type="bodyLargeMedium">Theme</ThemedText>
          <SegmentedControl
            options={[
              { label: 'Light', value: 'light' },
              { label: 'Dark', value: 'dark' },
              { label: 'System', value: 'system' },
            ]}
            value={selectedTheme}
            onValueChange={setSelectedTheme}
          />
          <Dropdown
            label="Language"
            placeholder="Select language"
            options={languageOptions}
            value={selectedLanguage}
            onValueChange={setSelectedLanguage}
          />
        </View>
      </BottomSheetModal>

      {/* Long Form Sheet */}
      <BottomSheetModal
        visible={longFormSheet}
        onClose={() => setLongFormSheet(false)}
        title="Complete Your Profile"
        description="We need a few more details to set up your account."
        footerProps={{
          variant: 'twoButtonsVertical',
          primaryLabel: 'Save Profile',
          secondaryLabel: 'Skip for Now',
          onPrimaryPress: () => setLongFormSheet(false),
          onSecondaryPress: () => setLongFormSheet(false),
        }}
      >
        <View style={styles.modalContent}>
          <TextInput label="First Name" placeholder="Enter first name" />
          <TextInput label="Last Name" placeholder="Enter last name" />
          <TextInput label="Email" placeholder="Enter email" keyboardType="email-address" />
          <TextInput label="Phone" placeholder="Enter phone number" keyboardType="phone-pad" />
          <Dropdown
            label="Language"
            placeholder="Select language"
            options={languageOptions}
            value={selectedLanguage}
            onValueChange={setSelectedLanguage}
          />
          <TextInput label="Bio" placeholder="Tell us about yourself" multiline numberOfLines={3} />
          <TextInput label="Website" placeholder="https://yourwebsite.com" keyboardType="url" />
        </View>
      </BottomSheetModal>

      {/* Full Screen Form */}
      <FullScreenModal
        visible={fullScreenForm}
        onClose={() => setFullScreenForm(false)}
        title="Create Account"
        description="Enter your details to get started."
        footerProps={{
          variant: 'twoButtonsVertical',
          primaryLabel: 'Create Account',
          secondaryLabel: 'I already have an account',
          onPrimaryPress: () => setFullScreenForm(false),
          onSecondaryPress: () => setFullScreenForm(false),
        }}
      >
        <View style={styles.fullScreenContent}>
          <TextInput label="Full Name" placeholder="Enter your name" />
          <TextInput label="Email" placeholder="Enter your email" keyboardType="email-address" />
          <TextInput label="Password" placeholder="Create a password" secureTextEntry />
          <TextInput label="Confirm Password" placeholder="Confirm password" secureTextEntry />
          <Dropdown
            label="Country"
            placeholder="Select your country"
            options={[
              { label: 'United States', value: 'us' },
              { label: 'Canada', value: 'ca' },
              { label: 'United Kingdom', value: 'uk' },
              { label: 'Australia', value: 'au' },
            ]}
            value={undefined}
            onValueChange={() => {}}
          />
        </View>
      </FullScreenModal>

      {/* Full Screen Settings */}
      <FullScreenModal
        visible={fullScreenSettings}
        onClose={() => setFullScreenSettings(false)}
        title="App Settings"
        description="Customize your experience."
        footerProps={{
          variant: 'twoButtonsHorizontal',
          primaryLabel: 'Save',
          secondaryLabel: 'Reset',
          onPrimaryPress: () => setFullScreenSettings(false),
          onSecondaryPress: () => setFullScreenSettings(false),
        }}
      >
        <View style={styles.fullScreenContent}>
          <ThemedText type="headlineSmall">Appearance</ThemedText>
          <SegmentedControl
            options={[
              { label: 'Light', value: 'light' },
              { label: 'Dark', value: 'dark' },
              { label: 'System', value: 'system' },
            ]}
            value={selectedTheme}
            onValueChange={setSelectedTheme}
          />

          <ThemedText type="headlineSmall" style={{ marginTop: 16 }}>Notifications</ThemedText>
          <SelectCard
            title="All notifications"
            description="Receive all push and email notifications"
            selected={selectedNotification === 'all'}
            onSelect={() => setSelectedNotification('all')}
            type="radio"
          />
          <SelectCard
            title="Important only"
            description="Only critical updates and messages"
            selected={selectedNotification === 'important'}
            onSelect={() => setSelectedNotification('important')}
            type="radio"
          />
          <SelectCard
            title="None"
            description="Turn off all notifications"
            selected={selectedNotification === 'none'}
            onSelect={() => setSelectedNotification('none')}
            type="radio"
          />

          <ThemedText type="headlineSmall" style={{ marginTop: 16 }}>Privacy</ThemedText>
          <SelectCard
            title="Public profile"
            description="Anyone can see your profile"
            selected={selectedPrivacy === 'public'}
            onSelect={() => setSelectedPrivacy('public')}
            type="radio"
          />
          <SelectCard
            title="Private profile"
            description="Only approved followers can see your content"
            selected={selectedPrivacy === 'private'}
            onSelect={() => setSelectedPrivacy('private')}
            type="radio"
          />

          <ThemedText type="headlineSmall" style={{ marginTop: 16 }}>Language & Region</ThemedText>
          <Dropdown
            label="Language"
            placeholder="Select language"
            options={languageOptions}
            value={selectedLanguage}
            onValueChange={setSelectedLanguage}
          />
          <Dropdown
            label="Time Zone"
            placeholder="Select time zone"
            options={[
              { label: 'Pacific Time (PT)', value: 'pt' },
              { label: 'Mountain Time (MT)', value: 'mt' },
              { label: 'Central Time (CT)', value: 'ct' },
              { label: 'Eastern Time (ET)', value: 'et' },
            ]}
            value={undefined}
            onValueChange={() => {}}
          />
        </View>
      </FullScreenModal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 24,
  },
  section: {
    gap: 8,
  },
  buttonRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginTop: 8,
  },
  modalContent: {
    gap: 16,
  },
  fullScreenContent: {
    gap: 16,
  },
});
