import React, { createContext, useContext, ReactNode, useState, useCallback } from 'react';
import { useColorScheme } from 'react-native';

interface ThemeContextType {
  isDarkTheme: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within an ThemeProvider');
  }
  return context;
};

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isDarkTheme, setIsDarkTheme] = useState<boolean>(true);
  const isDeviceThemeDark = useColorScheme() === 'dark';

  const toggleTheme = useCallback(() => {
    setIsDarkTheme(prevIsDarkTheme => isDeviceThemeDark || !prevIsDarkTheme);
  }, [isDeviceThemeDark]);

  return <ThemeContext.Provider value={{ isDarkTheme, toggleTheme }}>{children}</ThemeContext.Provider>;
};
