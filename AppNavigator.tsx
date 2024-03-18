import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MasterScreen from './screens/MasterScreen';
import DetailScreen from './screens/DetailScreen';
import { RootStackParamList } from './types/RootStackParamList';
import ConnectionToggleButton from './components/ConnectionToggleButton';
import { OnlineStatusProvider } from './components/OnlineStatusContext';

const Stack = createNativeStackNavigator<RootStackParamList>();

function AppNavigator() {
  return (
    <OnlineStatusProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Tasks List">
          <Stack.Screen
            name="Tasks List"
            component={MasterScreen}
            options={{ headerRight: ConnectionToggleButton }}
          />
          <Stack.Screen name="Details" component={DetailScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </OnlineStatusProvider>
  );
}

export default AppNavigator;
