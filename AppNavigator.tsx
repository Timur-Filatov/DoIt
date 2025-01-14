import React, { ReactElement } from 'react';
import { DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MasterScreen from './screens/MasterScreen';
import DetailScreen from './screens/DetailScreen';
import { useTheme } from './contexts/ThemeContext';
import { TaskModel } from './models/TaskModel';

export type RootStackParamList = {
  'Tasks List': {
    isOnline: boolean;
  };
  Details: {
    task: TaskModel;
  };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator(): ReactElement {
  const { isDarkTheme } = useTheme();

  return (
    <NavigationContainer theme={isDarkTheme ? DarkTheme : DefaultTheme}>
      <Stack.Navigator initialRouteName="Tasks List">
        <Stack.Screen name="Tasks List" component={MasterScreen} options={{ headerShown: false }} />

        <Stack.Screen name="Details" component={DetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
