import * as React from 'react';
import {Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';

import Icon from 'react-native-vector-icons/AntDesign';

import HomeStack from '../AppItem/MemberStack/HomeStack';

import SearchStack from '../AppItem/MemberStack/SearchStack';

import ProfileStack from '../AppItem/MemberStack/ProfileStack';

const Tab = createMaterialBottomTabNavigator();

export default function App() {
  return (
    <Tab.Navigator
      activeColor="#3399ff"
      inactiveColor={'gray'}
      shifting={true}
      initialRouterName={'Home'}
      headerMode={'none'}
      labeled={false}>
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          // title: 'Home',
          tabBarColor: 'white',
          tabBarIcon: ({focused}) => (
            <Icon
              name="appstore-o"
              color={focused ? '#3399ff' : 'gray'}
              size={25}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchStack}
        options={{
          // tabBarBadge: '2',
          // title: 'Search',
          tabBarColor: 'white',
          tabBarIcon: ({focused}) => (
            <Icon
              name="search1"
              color={focused ? '#3399ff' : 'gray'}
              size={25}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStack}
        options={{
          // title: 'Profile',
          tabBarColor: 'white',
          tabBarIcon: ({focused}) => (
            <Icon
              name="setting"
              color={focused ? '#3399ff' : 'gray'}
              size={25}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
