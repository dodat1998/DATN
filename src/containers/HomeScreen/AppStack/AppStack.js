import * as React from 'react';
import {Button, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import BottomNavigator from './BottomNavigator';

import Player from './Player';

const Stack = createStackNavigator();

function AppStacks() {
  return (
    <Stack.Navigator initialRouteName={'App'} headerMode={'none'}>
      <Stack.Screen name="App" component={BottomNavigator} />
      <Stack.Screen name="Player" component={Player} />
    </Stack.Navigator>
  );
}

export default function AppStack() {
  return (
    <NavigationContainer>
      <AppStacks />
    </NavigationContainer>
  );
}
