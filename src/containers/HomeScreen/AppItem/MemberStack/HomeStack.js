import * as React from 'react';
import {Button, View, Text, Image} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

import Home from '../Home/Home';
import HomeAlbum from '../Home/HomeAlbum';

import HomeSinger from '../Home/HomeSinger';

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerTitle: () => (
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
              }}>
              <Image
                source={require('./../../../../images/logo.png')}
                style={{height: 30, width: 30}}
              />
              <Text
                style={{
                  marginLeft: 5,
                  fontSize: 25,
                  fontWeight: 'bold',
                  color: '#0073e6',
                }}>
                Box Music
              </Text>
            </View>
          ),
        }}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="HomeSinger"
        component={HomeSinger}
      />
      <Stack.Screen
        options={({route}) => ({title: route.params.name})}
        name="HomeAlbum"
        component={HomeAlbum}
      />
    </Stack.Navigator>
  );
}

export default function HomeStack() {
  return <MyStack />;
}
