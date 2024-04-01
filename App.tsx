import React, { ReactElement } from 'react';
import AppNavigator from './AppNavigator';
import { OnlineStatusProvider } from './contexts/OnlineStatusContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { RealmProvider } from '@realm/react';
import TaskSchema from './database/schemas/TaskSchema';
import { migrationsRealm } from './database/migrationsRealm';

export default function App(): ReactElement {
  return (
    <RealmProvider schema={[TaskSchema]} schemaVersion={1} onMigration={migrationsRealm}>
      <OnlineStatusProvider>
        <ThemeProvider>
          <AppNavigator />
        </ThemeProvider>
      </OnlineStatusProvider>
    </RealmProvider>
  );
}
