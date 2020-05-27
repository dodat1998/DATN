import * as React from 'react';
import {Button, View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

import Profile from '../Profile/Profile';
import ProfileDetail from '../Profile/ProfileDetail';
function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{
          headerTitle: () => (
            <View>
              <Text
                style={{fontSize: 20, fontWeight: 'bold', color: '#3399ff'}}>
                Acount
              </Text>
            </View>
          ),
        }}
      />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="ProfileDetail"
        component={ProfileDetail}
      />
    </Stack.Navigator>
  );
}

export default function ProfileStack() {
  return <MyStack />;
}
