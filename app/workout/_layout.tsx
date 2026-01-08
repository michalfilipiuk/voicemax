import { Stack } from 'expo-router';

import { useThemeColor } from '@/hooks/use-theme-color';

export default function WorkoutLayout() {
  const bgMain = useThemeColor({}, 'bgMain');

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: bgMain },
        gestureEnabled: false, // Prevent swipe back during workout
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="intro" />
      <Stack.Screen name="exercise" />
      <Stack.Screen name="rest" />
      <Stack.Screen name="complete" />
    </Stack>
  );
}
