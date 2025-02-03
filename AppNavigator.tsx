import React, { ReactElement } from 'react';
import { DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MasterScreen from './screens/MasterScreen';
import DetailScreen from './screens/DetailScreen';
import { TaskModel } from './models/TaskModel';
import { selectTheme } from './slices/themeSlice';
import { useAppSelector } from './hooks/storeHooks';

export type RootStackParamList = {
  'Tasks List': undefined;
  Details: {
    task: TaskModel;
  };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator(): ReactElement {
  const isDarkTheme = useAppSelector(selectTheme);

  return (
    <NavigationContainer theme={isDarkTheme ? DarkTheme : DefaultTheme}>
      <Stack.Navigator initialRouteName="Tasks List">
        <Stack.Screen name="Tasks List" component={MasterScreen} options={{ headerShown: false }} />

        <Stack.Screen name="Details" component={DetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
