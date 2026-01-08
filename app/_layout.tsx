import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, View } from 'react-native';
import 'react-native-reanimated';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { DebugNavigator } from '@/components/debug';
import { ToastContainer } from '@/components/feedback/toast';
import {
  ThemeOverrideProvider,
  useThemeOverride,
} from '@/context/ThemeContext';
import { ToastProvider } from '@/context/ToastContext';
import { UserProvider, useUser } from '@/context/UserContext';
import { VoiceProvider } from '@/context/VoiceContext';
import { WorkoutProvider } from '@/context/WorkoutContext';
import { useThemeColor } from '@/hooks/use-theme-color';

function LoadingScreen() {
  const bgMain = useThemeColor({}, 'bgMain');
  const brandContent = useThemeColor({}, 'brandContent');

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: bgMain,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <ActivityIndicator size="large" color={brandContent} />
    </View>
  );
}

function NavigationContent() {
  const { hasCompletedOnboarding, isLoading } = useUser();

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      {!hasCompletedOnboarding ? (
        <Stack.Screen name="(onboarding)" />
      ) : (
        <Stack.Screen name="(tabs)" />
      )}
      <Stack.Screen
        name="workout"
        options={{ presentation: 'fullScreenModal' }}
      />
    </Stack>
  );
}

function RootLayoutContent() {
  const { theme } = useThemeOverride();

  return (
    <ThemeProvider value={theme === 'dark' ? DarkTheme : DefaultTheme}>
      <ToastProvider>
        <UserProvider>
          <VoiceProvider>
            <WorkoutProvider>
              <NavigationContent />
              <ToastContainer />
              <DebugNavigator />
              <StatusBar style={theme === 'dark' ? 'light' : 'dark'} />
            </WorkoutProvider>
          </VoiceProvider>
        </UserProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <ThemeOverrideProvider>
        <RootLayoutContent />
      </ThemeOverrideProvider>
    </SafeAreaProvider>
  );
}
