import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {headerSettings} from './navigationOptions';

import {HomeScreen} from '../screens/HomeScreen';

const Home = createStackNavigator();

export const HomeNavigator = () => {
  return (
    <Home.Navigator>
      <Home.Screen
        name="Home"
        component={HomeScreen}
        options={headerSettings}
      />
    </Home.Navigator>
  );
};
