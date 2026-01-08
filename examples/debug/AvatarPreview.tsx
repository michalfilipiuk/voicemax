import React from 'react';
import { View, StyleSheet } from 'react-native';

import { Avatar } from '@/components/avatar';
import { ThemedText } from '@/components/themed-text';
import { useThemeColor } from '@/hooks/use-theme-color';

export function AvatarPreview() {
  const alphaMedium = useThemeColor({}, 'alphaMedium');
  const bgSecondary = useThemeColor({}, 'bgSecondary');
  const contentNormal = useThemeColor({}, 'contentNormal');
  const successContent = useThemeColor({}, 'successContent');
  const errorContent = useThemeColor({}, 'errorContent');

  return (
    <View style={styles.container}>
      <ThemedText type="headlineLarge">Avatar</ThemedText>
      <ThemedText type="bodySmall" style={{ color: contentNormal, marginTop: -12 }}>
        User profile display with image or initials fallback.
      </ThemedText>

      {/* Sizes */}
      <View style={styles.groupContainer}>
        <ThemedText type="headlineSmall">Sizes</ThemedText>
        <View style={[styles.previewBox, { backgroundColor: bgSecondary, borderColor: alphaMedium }]}>
          <View style={styles.row}>
            <View style={styles.sizeItem}>
              <Avatar size="xs" initials="XS" />
              <ThemedText type="bodySmall" style={{ color: contentNormal }}>xs (24)</ThemedText>
            </View>
            <View style={styles.sizeItem}>
              <Avatar size="sm" initials="SM" />
              <ThemedText type="bodySmall" style={{ color: contentNormal }}>sm (32)</ThemedText>
            </View>
            <View style={styles.sizeItem}>
              <Avatar size="md" initials="MD" />
              <ThemedText type="bodySmall" style={{ color: contentNormal }}>md (40)</ThemedText>
            </View>
            <View style={styles.sizeItem}>
              <Avatar size="lg" initials="LG" />
              <ThemedText type="bodySmall" style={{ color: contentNormal }}>lg (56)</ThemedText>
            </View>
            <View style={styles.sizeItem}>
              <Avatar size="xl" initials="XL" />
              <ThemedText type="bodySmall" style={{ color: contentNormal }}>xl (80)</ThemedText>
            </View>
          </View>
        </View>
      </View>

      {/* With Image */}
      <View style={styles.groupContainer}>
        <ThemedText type="headlineSmall">With Image</ThemedText>
        <View style={[styles.previewBox, { backgroundColor: bgSecondary, borderColor: alphaMedium }]}>
          <View style={styles.row}>
            <Avatar
              size="lg"
              source="https://i.pravatar.cc/150?img=1"
            />
            <Avatar
              size="lg"
              source="https://i.pravatar.cc/150?img=2"
            />
            <Avatar
              size="lg"
              source="https://i.pravatar.cc/150?img=3"
            />
          </View>
        </View>
      </View>

      {/* Initials */}
      <View style={styles.groupContainer}>
        <ThemedText type="headlineSmall">Initials Fallback</ThemedText>
        <View style={[styles.previewBox, { backgroundColor: bgSecondary, borderColor: alphaMedium }]}>
          <View style={styles.row}>
            <Avatar size="lg" initials="JD" />
            <Avatar size="lg" initials="AB" />
            <Avatar size="lg" initials="M" />
          </View>
        </View>
      </View>

      {/* Custom Colors */}
      <View style={styles.groupContainer}>
        <ThemedText type="headlineSmall">Custom Background Colors</ThemedText>
        <View style={[styles.previewBox, { backgroundColor: bgSecondary, borderColor: alphaMedium }]}>
          <View style={styles.row}>
            <Avatar size="lg" initials="OK" backgroundColor={successContent} />
            <Avatar size="lg" initials="NO" backgroundColor={errorContent} />
            <Avatar size="lg" initials="CU" backgroundColor="#9C27B0" />
          </View>
        </View>
      </View>

      {/* User List Example */}
      <View style={styles.groupContainer}>
        <ThemedText type="headlineSmall">User List Example</ThemedText>
        <View style={[styles.previewBox, { backgroundColor: bgSecondary, borderColor: alphaMedium }]}>
          <View style={styles.userRow}>
            <Avatar size="md" source="https://i.pravatar.cc/150?img=4" />
            <View style={styles.userInfo}>
              <ThemedText type="bodyRegularMedium">Sarah Johnson</ThemedText>
              <ThemedText type="bodySmall" style={{ color: contentNormal }}>sarah@example.com</ThemedText>
            </View>
          </View>
          <View style={styles.userRow}>
            <Avatar size="md" initials="MK" />
            <View style={styles.userInfo}>
              <ThemedText type="bodyRegularMedium">Michael King</ThemedText>
              <ThemedText type="bodySmall" style={{ color: contentNormal }}>michael@example.com</ThemedText>
            </View>
          </View>
          <View style={styles.userRow}>
            <Avatar size="md" source="https://i.pravatar.cc/150?img=5" />
            <View style={styles.userInfo}>
              <ThemedText type="bodyRegularMedium">Emily Chen</ThemedText>
              <ThemedText type="bodySmall" style={{ color: contentNormal }}>emily@example.com</ThemedText>
            </View>
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
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    flexWrap: 'wrap',
  },
  sizeItem: {
    alignItems: 'center',
    gap: 4,
  },
  userRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 8,
  },
  userInfo: {
    flex: 1,
  },
});
