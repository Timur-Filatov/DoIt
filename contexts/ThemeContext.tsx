import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useCallback,
  ReactElement,
} from 'react';
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

export const ThemeProvider = ({ children }: { children: ReactNode }): ReactElement => {
  const deviceIsDark = useColorScheme() === 'dark';
  const [isDarkTheme, setIsDarkTheme] = useState<boolean>(deviceIsDark);

  const toggleTheme = useCallback(() => {
    setIsDarkTheme(prev => {
      return !prev;
    });
  }, []);

  return (
    <ThemeContext.Provider value={{ isDarkTheme, toggleTheme }}>{children}</ThemeContext.Provider>
  );
};
