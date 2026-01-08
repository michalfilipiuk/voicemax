import { Stack } from 'expo-router';

export default function OnboardingLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
        gestureEnabled: true,
      }}
    >
      <Stack.Screen name="welcome" />
      <Stack.Screen name="name" />
      <Stack.Screen name="age" />
      <Stack.Screen name="goal" />
      <Stack.Screen name="perception" />
      <Stack.Screen name="experience" />
      <Stack.Screen name="commitment" />
      <Stack.Screen name="voice-test-intro" />
      <Stack.Screen
        name="voice-recording"
        options={{ gestureEnabled: false }}
      />
      <Stack.Screen name="results" options={{ gestureEnabled: false }} />
      <Stack.Screen name="projection" />
      <Stack.Screen name="paywall" options={{ gestureEnabled: false }} />
    </Stack>
  );
}
