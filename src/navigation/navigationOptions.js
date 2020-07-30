import React from 'react';
import {Text} from 'react-native';

export const headerSettings = ({navigation}) => {
  return {
    headerLeft: () => <Text onPress={navigation.toggleDrawer}>иконка</Text>,
  };
};
