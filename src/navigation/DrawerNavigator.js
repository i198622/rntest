import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {HomeNavigator} from './HomeNavigator';
import {TodoNavigator} from './TodoNavigator';

const Drawer = createDrawerNavigator();

export const DrawerNavigator = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen
        name="HomeScreen"
        component={HomeNavigator}
        options={{title: 'Home'}}
      />
      <Drawer.Screen
        name="TodoScreen"
        component={TodoNavigator}
        options={{title: 'Todos'}}
      />
    </Drawer.Navigator>
  );
};
