import React, { FunctionComponent } from 'react';
import { DarkTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// Screens

import Register from '../screens/register';


const Stack = createNativeStackNavigator();

const NotConnectedStack: FunctionComponent = () => {

  return (
    <NavigationContainer
      theme={DarkTheme}
    >
      <Stack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName='Register'
      >
        <Stack.Screen
          name="Register"
          component={Register}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default NotConnectedStack;