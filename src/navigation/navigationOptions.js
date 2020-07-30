import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';

export const headerSettings = ({navigation}) => {
  return {
    headerLeft: () => (
      <Icon
        onPress={navigation.toggleDrawer}
        name="bars"
        size={28}
        style={iconStyle}
      />
    ),
  };
};

const iconStyle = {
  marginLeft: 15,
};
