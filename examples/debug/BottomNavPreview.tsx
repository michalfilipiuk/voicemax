import {
  Home01Icon,
  Search01Icon,
  UserIcon,
  Setting07Icon,
  Notification02Icon,
  FavouriteIcon,
  Store01Icon,
  MessageMultiple01Icon,
} from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react-native';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { BottomNav, BottomNavItem } from '@/components/navigation';
import { ThemedText } from '@/components/themed-text';
import { useThemeColor } from '@/hooks/use-theme-color';

// Example: 5 items (common app navigation)
const fiveItems: BottomNavItem[] = [
  { key: 'home', label: 'Home', icon: <HugeiconsIcon icon={Home01Icon} /> },
  { key: 'search', label: 'Search', icon: <HugeiconsIcon icon={Search01Icon} /> },
  { key: 'favorites', label: 'Favorites', icon: <HugeiconsIcon icon={FavouriteIcon} /> },
  { key: 'notifications', label: 'Alerts', icon: <HugeiconsIcon icon={Notification02Icon} /> },
  { key: 'profile', label: 'Profile', icon: <HugeiconsIcon icon={UserIcon} /> },
];

// Example: 4 items
const fourItems: BottomNavItem[] = [
  { key: 'home', label: 'Home', icon: <HugeiconsIcon icon={Home01Icon} /> },
  { key: 'shop', label: 'Shop', icon: <HugeiconsIcon icon={Store01Icon} /> },
  { key: 'messages', label: 'Messages', icon: <HugeiconsIcon icon={MessageMultiple01Icon} /> },
  { key: 'profile', label: 'Profile', icon: <HugeiconsIcon icon={UserIcon} /> },
];

// Example: 3 items (minimal)
const threeItems: BottomNavItem[] = [
  { key: 'home', label: 'Home', icon: <HugeiconsIcon icon={Home01Icon} /> },
  { key: 'search', label: 'Search', icon: <HugeiconsIcon icon={Search01Icon} /> },
  { key: 'settings', label: 'Settings', icon: <HugeiconsIcon icon={Setting07Icon} /> },
];

export function BottomNavPreview() {
  const contentNormal = useThemeColor({}, 'contentNormal');
  const alphaMedium = useThemeColor({}, 'alphaMedium');

  const [activeKey5, setActiveKey5] = useState('home');
  const [activeKey4, setActiveKey4] = useState('home');
  const [activeKey3, setActiveKey3] = useState('home');

  return (
    <View style={styles.container}>
      <ThemedText type="headlineLarge">Bottom Nav</ThemedText>

      <ThemedText type="bodySmall" style={{ color: contentNormal, marginTop: -12 }}>
        Flexible navigation bar supporting 3-5 items
      </ThemedText>

      {/* 5 Items */}
      <View style={styles.section}>
        <ThemedText type="headlineSmall">5 Items</ThemedText>
        <ThemedText type="bodySmall" style={{ color: contentNormal }}>
          Active: {activeKey5}
        </ThemedText>
        <View style={[styles.navContainer, { borderColor: alphaMedium }]}>
          <BottomNav
            items={fiveItems}
            activeKey={activeKey5}
            onSelect={setActiveKey5}
          />
        </View>
      </View>

      {/* 4 Items */}
      <View style={styles.section}>
        <ThemedText type="headlineSmall">4 Items</ThemedText>
        <ThemedText type="bodySmall" style={{ color: contentNormal }}>
          Active: {activeKey4}
        </ThemedText>
        <View style={[styles.navContainer, { borderColor: alphaMedium }]}>
          <BottomNav
            items={fourItems}
            activeKey={activeKey4}
            onSelect={setActiveKey4}
          />
        </View>
      </View>

      {/* 3 Items */}
      <View style={styles.section}>
        <ThemedText type="headlineSmall">3 Items</ThemedText>
        <ThemedText type="bodySmall" style={{ color: contentNormal }}>
          Active: {activeKey3}
        </ThemedText>
        <View style={[styles.navContainer, { borderColor: alphaMedium }]}>
          <BottomNav
            items={threeItems}
            activeKey={activeKey3}
            onSelect={setActiveKey3}
          />
        </View>
      </View>

      {/* Usage Example */}
      <View style={styles.section}>
        <ThemedText type="headlineSmall">Usage</ThemedText>
        <View style={[styles.codeBlock, { backgroundColor: useThemeColor({}, 'bgSecondary'), borderColor: alphaMedium }]}>
          <ThemedText type="bodySmall" style={{ fontFamily: 'monospace' }}>
            {`const items: BottomNavItem[] = [
  { key: 'home', label: 'Home',
    icon: <HugeiconsIcon icon={Home01Icon} /> },
  { key: 'search', label: 'Search',
    icon: <HugeiconsIcon icon={Search01Icon} /> },
  // ... more items
];

<BottomNav
  items={items}
  activeKey={activeKey}
  onSelect={(key) => setActiveKey(key)}
/>`}
          </ThemedText>
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
  navContainer: {
    borderWidth: 1,
    borderRadius: 12,
    overflow: 'hidden',
  },
  codeBlock: {
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
  },
});
