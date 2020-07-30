import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export const TodoScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Todo Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
