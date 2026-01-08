import React, { useState } from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { useThemeColor } from '@/hooks/use-theme-color';
import { SelectCard } from '@/components/checkboxes';
import { HugeiconsIcon } from '@hugeicons/react-native';
import {
  GridIcon,
  CreditCardIcon,
  Wallet01Icon,
  BankIcon,
  Moon01Icon,
  Sun01Icon,
  SmartPhone01Icon,
} from '@hugeicons/core-free-icons';

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

export function SelectCardPreview() {
  // Toggle states
  const [showIcon, setShowIcon] = useState(true);
  const [showDescription, setShowDescription] = useState(true);

  // Single select (radio) state
  const [selectedPayment, setSelectedPayment] = useState<string>('card');

  // Multi select (checkbox) state
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>(['dark']);

  const alphaMedium = useThemeColor({}, 'alphaMedium');
  const bgSecondary = useThemeColor({}, 'bgSecondary');
  const contentNormal = useThemeColor({}, 'contentNormal');

  const toggleFeature = (feature: string) => {
    setSelectedFeatures((prev) =>
      prev.includes(feature)
        ? prev.filter((f) => f !== feature)
        : [...prev, feature]
    );
  };

  return (
    <View style={styles.container}>
      <ThemedText type="headlineLarge">Select Card</ThemedText>
      <ThemedText type="bodySmall" style={{ color: contentNormal, marginTop: -12 }}>
        Large selectable cards for radio or checkbox selection.
      </ThemedText>

      {/* Options */}
      <View style={styles.groupContainer}>
        <ThemedText type="headlineSmall">Options</ThemedText>
        <View style={[styles.toggleRow, { backgroundColor: bgSecondary, borderColor: alphaMedium }]}>
          <Toggle label="Icon" value={showIcon} onValueChange={setShowIcon} />
          <Toggle label="Description" value={showDescription} onValueChange={setShowDescription} />
        </View>
      </View>

      {/* Single Select (Radio) */}
      <View style={styles.groupContainer}>
        <ThemedText type="headlineSmall">Single Select (Radio)</ThemedText>
        <View style={styles.cardList}>
          <SelectCard
            title="Credit Card"
            description={showDescription ? "Pay with Visa, Mastercard, or Amex" : undefined}
            icon={showIcon ? <HugeiconsIcon icon={CreditCardIcon} size={20} /> : undefined}
            selected={selectedPayment === 'card'}
            onSelect={() => setSelectedPayment('card')}
            type="radio"
          />
          <SelectCard
            title="Digital Wallet"
            description={showDescription ? "Apple Pay, Google Pay, or PayPal" : undefined}
            icon={showIcon ? <HugeiconsIcon icon={Wallet01Icon} size={20} /> : undefined}
            selected={selectedPayment === 'wallet'}
            onSelect={() => setSelectedPayment('wallet')}
            type="radio"
          />
          <SelectCard
            title="Bank Transfer"
            description={showDescription ? "Direct transfer from your bank" : undefined}
            icon={showIcon ? <HugeiconsIcon icon={BankIcon} size={20} /> : undefined}
            selected={selectedPayment === 'bank'}
            onSelect={() => setSelectedPayment('bank')}
            type="radio"
          />
        </View>
      </View>

      {/* Multi Select (Checkbox) */}
      <View style={styles.groupContainer}>
        <ThemedText type="headlineSmall">Multi Select (Checkbox)</ThemedText>
        <View style={styles.cardList}>
          <SelectCard
            title="Dark Mode"
            description={showDescription ? "Use dark theme throughout the app" : undefined}
            icon={showIcon ? <HugeiconsIcon icon={Moon01Icon} size={20} /> : undefined}
            selected={selectedFeatures.includes('dark')}
            onSelect={() => toggleFeature('dark')}
            type="checkbox"
          />
          <SelectCard
            title="Light Mode"
            description={showDescription ? "Use light theme throughout the app" : undefined}
            icon={showIcon ? <HugeiconsIcon icon={Sun01Icon} size={20} /> : undefined}
            selected={selectedFeatures.includes('light')}
            onSelect={() => toggleFeature('light')}
            type="checkbox"
          />
          <SelectCard
            title="Mobile Notifications"
            description={showDescription ? "Receive push notifications on your device" : undefined}
            icon={showIcon ? <HugeiconsIcon icon={SmartPhone01Icon} size={20} /> : undefined}
            selected={selectedFeatures.includes('notifications')}
            onSelect={() => toggleFeature('notifications')}
            type="checkbox"
          />
        </View>
      </View>

      {/* Disabled State */}
      <View style={styles.groupContainer}>
        <ThemedText type="headlineSmall">Disabled</ThemedText>
        <View style={styles.cardList}>
          <SelectCard
            title="Disabled Unselected"
            description={showDescription ? "This option is not available" : undefined}
            icon={showIcon ? <HugeiconsIcon icon={GridIcon} size={20} /> : undefined}
            selected={false}
            onSelect={() => {}}
            disabled
          />
          <SelectCard
            title="Disabled Selected"
            description={showDescription ? "This option is locked" : undefined}
            icon={showIcon ? <HugeiconsIcon icon={GridIcon} size={20} /> : undefined}
            selected={true}
            onSelect={() => {}}
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
  cardList: {
    gap: 12,
  },
});
