import React, { useState } from 'react';
import {
  View,
  Pressable,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { useThemeColor } from '@/hooks/use-theme-color';
import { HugeiconsIcon } from '@hugeicons/react-native';
import { Sun01Icon, Moon01Icon } from '@hugeicons/core-free-icons';

export type DebugSection = 'colors' | 'typography' | 'shadows' | 'radius' | 'buttons' | 'iconButtons' | 'icons' | 'textInputs' | 'dropdown' | 'segmentedControl' | 'tabs' | 'checkbox' | 'radioButton' | 'selectCard' | 'switch' | 'badge' | 'progressBar' | 'stepDots' | 'card' | 'divider' | 'avatar' | 'toast' | 'emptyState' | 'modal' | 'logo' | 'pageHeader' | 'modalHeader' | 'footer' | 'bottomNav' | 'templateOnboarding' | 'templateQuiz' | 'templateHome' | null;

type DebugMenuProps = {
  activeSection: DebugSection;
  onSectionChange: (section: DebugSection) => void;
  theme: 'light' | 'dark';
  onThemeChange: (theme: 'light' | 'dark') => void;
};

const sections: { key: DebugSection; label: string }[] = [
  { key: 'colors', label: 'Colors' },
  { key: 'typography', label: 'Typography' },
  { key: 'shadows', label: 'Shadows' },
  { key: 'radius', label: 'Radius' },
  { key: 'buttons', label: 'Buttons' },
  { key: 'iconButtons', label: 'Icon Buttons' },
  { key: 'icons', label: 'Icons' },
  { key: 'textInputs', label: 'Text Inputs' },
  { key: 'dropdown', label: 'Dropdown' },
  { key: 'segmentedControl', label: 'Segmented Control' },
  { key: 'tabs', label: 'Tabs' },
  { key: 'checkbox', label: 'Checkbox' },
  { key: 'radioButton', label: 'Radio Button' },
  { key: 'selectCard', label: 'Select Card' },
  { key: 'switch', label: 'Switch' },
  { key: 'badge', label: 'Badge' },
  { key: 'progressBar', label: 'Progress Bar' },
  { key: 'stepDots', label: 'Step Dots' },
  { key: 'card', label: 'Card' },
  { key: 'divider', label: 'Divider' },
  { key: 'avatar', label: 'Avatar' },
  { key: 'toast', label: 'Toast' },
  { key: 'emptyState', label: 'Empty State' },
  { key: 'modal', label: 'Modal' },
  { key: 'logo', label: 'Logo' },
  { key: 'pageHeader', label: 'Page Header' },
  { key: 'modalHeader', label: 'Modal Header' },
  { key: 'footer', label: 'Footer' },
  { key: 'bottomNav', label: 'Bottom Nav' },
  { key: 'templateOnboarding', label: '📱 Onboarding' },
  { key: 'templateQuiz', label: '📱 Quiz' },
  { key: 'templateHome', label: '📱 Home' },
];

export function DebugMenu({ activeSection, onSectionChange, theme, onThemeChange }: DebugMenuProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const bgMain = useThemeColor({}, 'bgMain');
  const bgSecondary = useThemeColor({}, 'bgSecondary');
  const bgTertiary = useThemeColor({}, 'bgTertiary');
  const contentStrong = useThemeColor({}, 'contentStrong');
  const contentNormal = useThemeColor({}, 'contentNormal');
  const brandContent = useThemeColor({}, 'brandContent');
  const alphaMedium = useThemeColor({}, 'alphaMedium');
  const alphaStrong = useThemeColor({}, 'alphaStrong');

  const handleSectionSelect = (section: DebugSection) => {
    onSectionChange(section);
    setIsDropdownOpen(false);
  };

  const toggleTheme = () => {
    onThemeChange(theme === 'light' ? 'dark' : 'light');
  };

  const currentLabel = activeSection
    ? sections.find((s) => s.key === activeSection)?.label
    : 'Select Preview';

  return (
    <View style={styles.container}>
      {/* Theme Switcher */}
      <Pressable
        style={[styles.themeSwitcher, { backgroundColor: bgTertiary, borderColor: alphaMedium }]}
        onPress={toggleTheme}
      >
        <HugeiconsIcon
          icon={theme === 'light' ? Sun01Icon : Moon01Icon}
          size={20}
          color={contentStrong}
        />
      </Pressable>

      {/* Dropdown */}
      <View style={styles.dropdownContainer}>
        <Pressable
          style={[styles.dropdownButton, { backgroundColor: brandContent }]}
          onPress={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          <ThemedText style={styles.dropdownButtonText} lightColor="#FFFFFF" darkColor="#FFFFFF">
            {currentLabel}
          </ThemedText>
          <ThemedText style={styles.dropdownArrow} lightColor="#FFFFFF" darkColor="#FFFFFF">
            {isDropdownOpen ? '▲' : '▼'}
          </ThemedText>
        </Pressable>

        {/* Dropdown Menu */}
        {isDropdownOpen && (
          <View style={[styles.dropdownMenu, { backgroundColor: bgMain, borderColor: alphaMedium }]}>
            <ScrollView style={styles.dropdownScroll} showsVerticalScrollIndicator={false}>
              {sections.map((section) => (
                <Pressable
                  key={section.key}
                  style={[
                    styles.dropdownItem,
                    activeSection === section.key && { backgroundColor: bgSecondary },
                  ]}
                  onPress={() => handleSectionSelect(section.key)}
                >
                  <ThemedText
                    style={[
                      styles.dropdownItemText,
                      { color: activeSection === section.key ? brandContent : contentStrong },
                    ]}
                  >
                    {section.label}
                  </ThemedText>
                  {activeSection === section.key && (
                    <ThemedText style={{ color: brandContent }}>✓</ThemedText>
                  )}
                </Pressable>
              ))}

              {/* Clear selection option */}
              {activeSection && (
                <>
                  <View style={[styles.divider, { backgroundColor: alphaMedium }]} />
                  <Pressable
                    style={styles.dropdownItem}
                    onPress={() => handleSectionSelect(null)}
                  >
                    <ThemedText style={[styles.dropdownItemText, { color: contentNormal }]}>
                      Clear Preview
                    </ThemedText>
                  </Pressable>
                </>
              )}
            </ScrollView>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 60,
    right: 16,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    zIndex: 1000,
  },
  themeSwitcher: {
    width: 40,
    height: 36,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  themeIcon: {
    fontSize: 18,
  },
  dropdownContainer: {
    position: 'relative',
  },
  dropdownButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
    gap: 8,
  },
  dropdownButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  dropdownArrow: {
    fontSize: 10,
  },
  dropdownMenu: {
    position: 'absolute',
    top: 44,
    right: 0,
    minWidth: 160,
    maxHeight: 400,
    borderRadius: 12,
    borderWidth: 1,
    paddingVertical: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  dropdownScroll: {
    flexGrow: 0,
  },
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  dropdownItemText: {
    fontSize: 15,
    fontWeight: '500',
  },
  divider: {
    height: 1,
    marginVertical: 4,
  },
});
