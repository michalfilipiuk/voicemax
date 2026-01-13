import { Stack } from 'expo-router';

import { useThemeColor } from '@/hooks/use-theme-color';

export default function MeasureLayout() {
  const bgMain = useThemeColor({}, 'bgMain');

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: bgMain },
        gestureEnabled: false,
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="intro" />
      <Stack.Screen name="recording" />
      <Stack.Screen name="results" />
    </Stack>
  );
}
