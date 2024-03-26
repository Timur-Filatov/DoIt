import React, { ReactElement } from 'react';
import { DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MasterScreen from './screens/MasterScreen';
import DetailScreen from './screens/DetailScreen';
import { RootStackParamList } from './types/RootStackParamList';
import { useTheme } from './contexts/ThemeContext';
import RightHeaderButtons from './components/RightHeaderButtons';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator(): ReactElement {
  const { isDarkTheme } = useTheme();

  return (
    <NavigationContainer theme={isDarkTheme ? DarkTheme : DefaultTheme}>
      <Stack.Navigator initialRouteName="Tasks List">
        <Stack.Screen name="Tasks List" component={MasterScreen} options={{ headerRight: RightHeaderButtons }} />
        <Stack.Screen name="Details" component={DetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
