import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SessionProvider } from './src/context/SessionContext';

// Screens
import DashboardScreen from './src/screens/DashboardScreen';
import ActiveSessionScreen from './src/screens/ActiveSessionScreen';
import SummaryScreen from './src/screens/SummaryScreen';
import HistoryScreen from './src/screens/HistoryScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SessionProvider>
      <NavigationContainer>
        <StatusBar style="dark" />
        <Stack.Navigator
          initialRouteName="Dashboard"
          screenOptions={{
            headerShown: false
          }}
        >
          <Stack.Screen
            name="Dashboard"
            component={DashboardScreen}
          />
          <Stack.Screen
            name="ActiveSession"
            component={ActiveSessionScreen}
          />
          <Stack.Screen
            name="Summary"
            component={SummaryScreen}
          />
          <Stack.Screen
            name="History"
            component={HistoryScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SessionProvider>
  );
}
