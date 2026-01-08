import React from 'react';
import { View, StyleSheet } from 'react-native';

import { EmptyState } from '@/components/empty-state';
import { ThemedText } from '@/components/themed-text';
import { useThemeColor } from '@/hooks/use-theme-color';
import { HugeiconsIcon } from '@hugeicons/react-native';
import {
  SearchRemoveIcon,
  Folder01Icon,
  WifiDisconnected01Icon,
  ShoppingCart01Icon,
} from '@hugeicons/core-free-icons';

export function EmptyStatePreview() {
  const alphaMedium = useThemeColor({}, 'alphaMedium');
  const bgSecondary = useThemeColor({}, 'bgSecondary');
  const contentNormal = useThemeColor({}, 'contentNormal');

  return (
    <View style={styles.container}>
      <ThemedText type="headlineLarge">Empty State</ThemedText>
      <ThemedText type="bodySmall" style={{ color: contentNormal, marginTop: -12 }}>
        Placeholder for empty content areas with optional icon, description, and action.
      </ThemedText>

      {/* Full Example */}
      <View style={styles.section}>
        <ThemedText type="headlineSmall">Full Example</ThemedText>
        <View style={[styles.previewBox, { backgroundColor: bgSecondary, borderColor: alphaMedium }]}>
          <EmptyState
            icon={<HugeiconsIcon icon={SearchRemoveIcon} />}
            title="No results found"
            description="We couldn't find anything matching your search. Try adjusting your filters."
            buttonLabel="Clear filters"
            onButtonPress={() => {}}
          />
        </View>
      </View>

      {/* Title Only */}
      <View style={styles.section}>
        <ThemedText type="headlineSmall">Title Only</ThemedText>
        <View style={[styles.previewBox, { backgroundColor: bgSecondary, borderColor: alphaMedium }]}>
          <EmptyState title="Nothing here yet" />
        </View>
      </View>

      {/* With Description */}
      <View style={styles.section}>
        <ThemedText type="headlineSmall">With Description</ThemedText>
        <View style={[styles.previewBox, { backgroundColor: bgSecondary, borderColor: alphaMedium }]}>
          <EmptyState
            title="No notifications"
            description="You're all caught up! Check back later for new updates."
          />
        </View>
      </View>

      {/* With Icon */}
      <View style={styles.section}>
        <ThemedText type="headlineSmall">With Icon</ThemedText>
        <View style={[styles.previewBox, { backgroundColor: bgSecondary, borderColor: alphaMedium }]}>
          <EmptyState
            icon={<HugeiconsIcon icon={Folder01Icon} />}
            title="No files"
            description="Upload your first file to get started."
          />
        </View>
      </View>

      {/* Different Use Cases */}
      <View style={styles.section}>
        <ThemedText type="headlineSmall">Use Cases</ThemedText>
        <View style={[styles.previewBox, { backgroundColor: bgSecondary, borderColor: alphaMedium }]}>
          <EmptyState
            icon={<HugeiconsIcon icon={WifiDisconnected01Icon} />}
            title="No connection"
            description="Please check your internet connection and try again."
            buttonLabel="Retry"
            onButtonPress={() => {}}
          />
        </View>
        <View style={[styles.previewBox, { backgroundColor: bgSecondary, borderColor: alphaMedium, marginTop: 16 }]}>
          <EmptyState
            icon={<HugeiconsIcon icon={ShoppingCart01Icon} />}
            title="Your cart is empty"
            description="Looks like you haven't added anything to your cart yet."
            buttonLabel="Start shopping"
            onButtonPress={() => {}}
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
  section: {
    gap: 12,
  },
  previewBox: {
    borderRadius: 12,
    borderWidth: 1,
    overflow: 'hidden',
  },
});
