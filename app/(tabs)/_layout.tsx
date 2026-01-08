import {
  Home01Icon,
  ChartAverageIcon,
  Settings01Icon,
} from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react-native';
import { Tabs } from 'expo-router';
import React from 'react';

import { useThemeColor } from '@/hooks/use-theme-color';

export default function TabLayout() {
  const bgMain = useThemeColor({}, 'bgMain');
  const brandContent = useThemeColor({}, 'brandContent');
  const contentSubtle = useThemeColor({}, 'contentSubtle');

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: bgMain,
          borderTopWidth: 0.5,
          borderTopColor: contentSubtle + '30',
        },
        tabBarActiveTintColor: brandContent,
        tabBarInactiveTintColor: contentSubtle,
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => (
            <HugeiconsIcon icon={Home01Icon} size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="progress"
        options={{
          title: 'Progress',
          tabBarIcon: ({ color, size }) => (
            <HugeiconsIcon icon={ChartAverageIcon} size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color, size }) => (
            <HugeiconsIcon icon={Settings01Icon} size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
