import React from 'react';
import { DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MasterScreen from './screens/MasterScreen';
import DetailScreen from './screens/DetailScreen';
import { RootStackParamList } from './types/RootStackParamList';
import { useTheme } from './components/ThemeContext';
import { RightHeaderButtons } from './components/RightHeaderButtons';

const Stack = createNativeStackNavigator<RootStackParamList>();

function AppNavigator() {
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

export default AppNavigator;
