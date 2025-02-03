import React, { ReactElement, useEffect } from 'react';
import AppNavigator from './AppNavigator';
import { RealmProvider } from '@realm/react';
import TaskSchema from './database/schemas/TaskSchema';
import { migrationsRealm } from './database/migrationsRealm';
import { Provider } from 'react-redux';
import { store } from './store';
import { ColorSchemeName, useColorScheme } from 'react-native';
import { themeInitialized } from './slices/themeSlice';
import { useAppDispatch } from './hooks/storeHooks';

function AppWrapper() {
  const dispatch = useAppDispatch();
  const colorScheme = useColorScheme() as ColorSchemeName;

  useEffect(() => {
    dispatch(themeInitialized(colorScheme === 'dark'));
  }, [colorScheme, dispatch]);

  return <AppNavigator />;
}

export default function App(): ReactElement {
  return (
    <Provider store={store}>
      <RealmProvider schema={[TaskSchema]} schemaVersion={1} onMigration={migrationsRealm}>
        <AppWrapper />
      </RealmProvider>
    </Provider>
  );
}
