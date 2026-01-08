import React from 'react';
import { View, StyleSheet } from 'react-native';

import { Button } from '@/components/buttons';
import { ThemedText } from '@/components/themed-text';
import { useToast } from '@/context/ToastContext';
import { useThemeColor } from '@/hooks/use-theme-color';

export function ToastPreview() {
  const { showToast } = useToast();
  const alphaMedium = useThemeColor({}, 'alphaMedium');
  const bgSecondary = useThemeColor({}, 'bgSecondary');
  const contentNormal = useThemeColor({}, 'contentNormal');

  return (
    <View style={styles.container}>
      <ThemedText type="headlineLarge">Toast</ThemedText>
      <ThemedText type="bodySmall" style={{ color: contentNormal, marginTop: -12 }}>
        Non-blocking notifications that appear at the top of the screen.
      </ThemedText>

      {/* Toast Types */}
      <View style={styles.groupContainer}>
        <ThemedText type="headlineSmall">Toast Types</ThemedText>
        <View style={[styles.previewBox, { backgroundColor: bgSecondary, borderColor: alphaMedium }]}>
          <Button
            title="Show Success"
            variant="primary"
            onPress={() => showToast('Operation completed successfully!', 'success')}
          />
          <Button
            title="Show Error"
            variant="secondary"
            onPress={() => showToast('Something went wrong. Please try again.', 'error')}
          />
          <Button
            title="Show Warning"
            variant="secondary"
            onPress={() => showToast('Your session will expire in 5 minutes.', 'warning')}
          />
          <Button
            title="Show Info"
            variant="outline"
            onPress={() => showToast('New features are available!', 'info')}
          />
        </View>
      </View>

      {/* Custom Duration */}
      <View style={styles.groupContainer}>
        <ThemedText type="headlineSmall">Custom Duration</ThemedText>
        <View style={[styles.previewBox, { backgroundColor: bgSecondary, borderColor: alphaMedium }]}>
          <Button
            title="Quick Toast (1.5s)"
            variant="secondary"
            onPress={() => showToast('This disappears quickly!', 'info', 1500)}
          />
          <Button
            title="Long Toast (5s)"
            variant="secondary"
            onPress={() => showToast('This stays visible longer for important messages.', 'info', 5000)}
          />
        </View>
      </View>

      {/* Usage Examples */}
      <View style={styles.groupContainer}>
        <ThemedText type="headlineSmall">Common Use Cases</ThemedText>
        <View style={[styles.previewBox, { backgroundColor: bgSecondary, borderColor: alphaMedium }]}>
          <Button
            title="Save Changes"
            variant="primary"
            onPress={() => showToast('Changes saved successfully!', 'success')}
          />
          <Button
            title="Delete Item"
            variant="secondary"
            onPress={() => showToast('Item moved to trash.', 'info')}
          />
          <Button
            title="Network Error"
            variant="secondary"
            onPress={() => showToast('No internet connection.', 'error')}
          />
          <Button
            title="Form Warning"
            variant="outline"
            onPress={() => showToast('Please fill in all required fields.', 'warning')}
          />
        </View>
      </View>

      {/* Note */}
      <View style={styles.groupContainer}>
        <ThemedText type="bodySmall" style={{ color: contentNormal }}>
          Tap on a toast to dismiss it immediately. Toasts auto-dismiss after their duration (default: 3 seconds).
        </ThemedText>
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
    gap: 12,
  },
});
