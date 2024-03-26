import React, { ReactElement } from 'react';
import AppNavigator from './AppNavigator';
import { OnlineStatusProvider } from './contexts/OnlineStatusContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { RealmProvider } from '@realm/react';
import TaskSchema from './schemas/TaskSchema';

export default function App(): ReactElement {
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
