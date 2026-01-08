import React from 'react';
import { Image, ImageStyle, StyleSheet, Text, View, ViewStyle } from 'react-native';

import { useThemeColor } from '@/hooks/use-theme-color';

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

const AVATAR_SIZES: Record<AvatarSize, number> = {
  xs: 24,
  sm: 32,
  md: 40,
  lg: 56,
  xl: 80,
};

const FONT_SIZES: Record<AvatarSize, number> = {
  xs: 10,
  sm: 12,
  md: 14,
  lg: 20,
  xl: 28,
};

export type AvatarProps = {
  /** Image source URI */
  source?: string;
  /** Fallback initials (1-2 characters) */
  initials?: string;
  /** Avatar size */
  size?: AvatarSize;
  /** Custom background color for initials */
  backgroundColor?: string;
  /** Optional container style */
  style?: ViewStyle;
  /** Test ID for testing */
  testID?: string;
};

export function Avatar({
  source,
  initials,
  size = 'md',
  backgroundColor,
  style,
  testID,
}: AvatarProps) {
  const alphaMedium = useThemeColor({}, 'alphaMedium');
  const contentStrong = useThemeColor({}, 'contentStrong');

  const avatarSize = AVATAR_SIZES[size];
  const fontSize = FONT_SIZES[size];
  const bgColor = backgroundColor || alphaMedium;

  // Format initials (max 2 characters, uppercase)
  const formattedInitials = initials?.slice(0, 2).toUpperCase() || '';

  const containerStyle: ViewStyle = {
    width: avatarSize,
    height: avatarSize,
    borderRadius: avatarSize / 2,
  };

  const imageStyle: ImageStyle = {
    width: avatarSize,
    height: avatarSize,
    borderRadius: avatarSize / 2,
  };

  // If we have an image source
  if (source) {
    return (
      <View testID={testID} style={[styles.container, containerStyle, style]}>
        <Image
          source={{ uri: source }}
          style={[styles.image, imageStyle]}
          resizeMode="cover"
        />
      </View>
    );
  }

  // Fallback to initials
  return (
    <View
      testID={testID}
      style={[
        styles.container,
        styles.initialsContainer,
        containerStyle,
        { backgroundColor: bgColor },
        style,
      ]}
    >
      <Text
        style={[
          styles.initials,
          { fontSize, color: contentStrong },
        ]}
      >
        {formattedInitials}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  initialsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  initials: {
    fontWeight: '600',
    textAlign: 'center',
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
});
