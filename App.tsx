import React from 'react';
import AppNavigator from './AppNavigator';
import { OnlineStatusProvider } from './components/OnlineStatusContext';
import { ThemeProvider } from './components/ThemeContext';
import { RealmProvider } from '@realm/react';
import { TaskSchema } from './schemas/TaskSchema';

export default function App() {
  return (
    <RealmProvider schema={[TaskSchema]}>
      <OnlineStatusProvider>
        <ThemeProvider>
          <AppNavigator />
        </ThemeProvider>
      </OnlineStatusProvider>
    </RealmProvider>
  );
}
