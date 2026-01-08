import { useThemeOverride } from '@/context/ThemeContext';

export function useColorScheme(): 'light' | 'dark' {
  const { theme } = useThemeOverride();
  return theme;
}
