import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useColorScheme as useSystemColorScheme } from 'react-native';

type ThemeContextType = {
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
  isManualOverride: boolean;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeOverrideProvider({ children }: { children: ReactNode }) {
  const systemTheme = useSystemColorScheme() ?? 'light';
  const [manualTheme, setManualTheme] = useState<'light' | 'dark' | null>(null);

  const theme = manualTheme ?? systemTheme;

  const setTheme = (newTheme: 'light' | 'dark') => {
    setManualTheme(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, isManualOverride: manualTheme !== null }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useThemeOverride() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useThemeOverride must be used within a ThemeOverrideProvider');
  }
  return context;
}
