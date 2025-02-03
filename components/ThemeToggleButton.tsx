import React, { ReactElement } from 'react';
import { Button } from 'react-native';
import { selectTheme, toggleTheme } from '../slices/themeSlice';
import { useAppDispatch, useAppSelector } from '../hooks/storeHooks';

const ThemeToggleButton = (): ReactElement => {
  const dispatch = useAppDispatch();
  const isDarkTheme = useAppSelector(selectTheme);

  return (
    <Button
      onPress={() => dispatch(toggleTheme())}
      title={isDarkTheme ? 'Go Light' : 'Go Dark'}
      color={isDarkTheme ? '#999' : '#333'}
    />
  );
};

export default ThemeToggleButton;
