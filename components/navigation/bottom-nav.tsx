import React from 'react';
import { Pressable, StyleSheet, View, ViewStyle } from 'react-native';
import Animated from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { usePressAnimation, PressAnimationPresets } from '@/hooks/use-press-animation';
import { useThemeColor } from '@/hooks/use-theme-color';

export type BottomNavItem = {
  /** Unique key for the item */
  key: string;
  /** Label text */
  label: string;
  /** Icon element for default state */
  icon: React.ReactNode;
  /** Icon element for selected state (optional, uses icon with different color if not provided) */
  selectedIcon?: React.ReactNode;
};

export type BottomNavProps = {
  /** Navigation items */
  items: BottomNavItem[];
  /** Currently selected item key */
  activeKey: string;
  /** Callback when an item is selected */
  onSelect: (key: string) => void;
  /** Optional container style */
  style?: ViewStyle;
};

// Individual nav item component with press animation
function NavItem({
  item,
  isSelected,
  brandContent,
  contentNormal,
  onPress,
}: {
  item: BottomNavItem;
  isSelected: boolean;
  brandContent: string;
  contentNormal: string;
  onPress: () => void;
}) {
  const { animatedStyle, handlePressIn, handlePressOut, triggerHaptics } = usePressAnimation(
    PressAnimationPresets.listItem
  );

  const color = isSelected ? brandContent : contentNormal;

  // Clone icon with appropriate color
  const renderIcon = () => {
    const iconToRender = isSelected && item.selectedIcon ? item.selectedIcon : item.icon;
    if (React.isValidElement(iconToRender)) {
      return React.cloneElement(iconToRender as React.ReactElement<any>, {
        color,
        size: 24,
      });
    }
    return iconToRender;
  };

  const handlePress = () => {
    if (!isSelected) {
      triggerHaptics();
      onPress();
    }
  };

  return (
    <Pressable
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={handlePress}
      style={styles.item}
      accessibilityRole="tab"
      accessibilityState={{ selected: isSelected }}
      accessibilityLabel={item.label}
    >
      <Animated.View style={[styles.itemContent, animatedStyle]}>
        <View style={styles.iconContainer}>
          {renderIcon()}
        </View>
        <ThemedText
          type="bodySmall"
          style={[
            styles.label,
            { color, fontWeight: '500' },
          ]}
        >
          {item.label}
        </ThemedText>
      </Animated.View>
    </Pressable>
  );
}

export function BottomNav({ items, activeKey, onSelect, style }: BottomNavProps) {
  const bgMain = useThemeColor({}, 'bgMain');
  const brandContent = useThemeColor({}, 'brandContent');
  const contentNormal = useThemeColor({}, 'contentNormal');
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[styles.container, { backgroundColor: bgMain, paddingBottom: insets.bottom }, style]}
      accessibilityRole="tablist"
    >
      {items.map((item) => (
        <NavItem
          key={item.key}
          item={item}
          isSelected={item.key === activeKey}
          brandContent={brandContent}
          contentNormal={contentNormal}
          onPress={() => onSelect(item.key)}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  item: {
    flex: 1,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemContent: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  iconContainer: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: 12,
    lineHeight: 16,
    textAlign: 'center',
  },
});
