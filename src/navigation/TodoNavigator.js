import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {headerSettings} from './navigationOptions';

import {TodoScreen} from '../screens/TodoScreen';

const Todo = createStackNavigator();

export const TodoNavigator = () => {
  return (
    <Todo.Navigator>
      <Todo.Screen
        name="Todos"
        component={TodoScreen}
        options={headerSettings}
      />
    </Todo.Navigator>
  );
};
