import React from 'react';
import AppNavigator from './AppNavigator';
import { OnlineStatusProvider } from './components/OnlineStatusContext';
import { ThemeProvider } from './components/ThemeContext';

export default function App() {
  return (
    <OnlineStatusProvider>
      <ThemeProvider>
        <AppNavigator />
      </ThemeProvider>
    </OnlineStatusProvider>
  );
}
