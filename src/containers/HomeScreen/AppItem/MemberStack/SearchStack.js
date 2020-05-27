import * as React from 'react';

import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

import Search from '../Search/Search';
import SearchDetail from '../Home/HomeSinger';

function MyStack() {
  return (
    <Stack.Navigator headerMode={'none'}>
      <Stack.Screen name="Search" component={Search} />
      <Stack.Screen name="SearchDetail" component={SearchDetail} />
    </Stack.Navigator>
  );
}

export default function SearchStack() {
  return <MyStack />;
}
