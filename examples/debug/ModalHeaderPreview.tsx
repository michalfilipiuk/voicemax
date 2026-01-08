import React from 'react';
import { StyleSheet, View } from 'react-native';

import { ModalHeader } from '@/components/navigation';
import { ThemedText } from '@/components/themed-text';
import { useThemeColor } from '@/hooks/use-theme-color';

export function ModalHeaderPreview() {
  const contentNormal = useThemeColor({}, 'contentNormal');
  const alphaMedium = useThemeColor({}, 'alphaMedium');

  return (
    <View style={styles.container}>
      <ThemedText type="headlineLarge">Modal Header</ThemedText>

      <ThemedText type="bodySmall" style={{ color: contentNormal, marginTop: -12 }}>
        Header component for modal screens
      </ThemedText>

      {/* Without Title */}
      <View style={styles.section}>
        <ThemedText type="headlineSmall">Close Button Only</ThemedText>
        <View style={[styles.headerContainer, { borderColor: alphaMedium }]}>
          <ModalHeader onClose={() => console.log('Close pressed')} />
        </View>
      </View>

      {/* With Title */}
      <View style={styles.section}>
        <ThemedText type="headlineSmall">With Title</ThemedText>
        <View style={[styles.headerContainer, { borderColor: alphaMedium }]}>
          <ModalHeader
            title="Modal Title"
            onClose={() => console.log('Close pressed')}
          />
        </View>
      </View>

      {/* Example Titles */}
      <View style={styles.section}>
        <ThemedText type="headlineSmall">Example Titles</ThemedText>
        <View style={[styles.headerContainer, { borderColor: alphaMedium }]}>
          <ModalHeader
            title="Select Option"
            onClose={() => console.log('Close pressed')}
          />
        </View>
        <View style={[styles.headerContainer, { borderColor: alphaMedium, marginTop: 8 }]}>
          <ModalHeader
            title="Filter Results"
            onClose={() => console.log('Close pressed')}
          />
        </View>
        <View style={[styles.headerContainer, { borderColor: alphaMedium, marginTop: 8 }]}>
          <ModalHeader
            title="Add New Item"
            onClose={() => console.log('Close pressed')}
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
  headerContainer: {
    borderWidth: 1,
    borderRadius: 12,
    overflow: 'hidden',
  },
});
