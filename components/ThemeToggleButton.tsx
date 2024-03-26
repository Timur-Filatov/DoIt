import React, { ReactElement } from 'react';
import { Button } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';

const ThemeToggleButton = (): ReactElement => {
  const { isDarkTheme, toggleTheme } = useTheme();

  return (
    <Button onPress={toggleTheme} title={isDarkTheme ? 'Go Light' : 'Go Dark'} color={isDarkTheme ? '#999' : '#333'} />
  );
};

export default ThemeToggleButton;
