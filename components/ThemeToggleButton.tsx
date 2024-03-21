import React from 'react';
import { Button } from 'react-native';
import { useTheme } from './ThemeContext';

const ThemeToggleButton: React.FC = () => {
  const { isDarkTheme, toggleTheme } = useTheme();

  return (
    <Button onPress={toggleTheme} title={isDarkTheme ? 'Go Light' : 'Go Dark'} color={isDarkTheme ? '#999' : '#333'} />
  );
};

export default ThemeToggleButton;
