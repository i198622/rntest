import React, { memo } from 'react'
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { PRIMARY, openDrawer, W } from './../../constants'

const Header = memo(({ nav, textStyle, title = 'LOGO' }) => {
  const { container, iconStyle, text } = styles

  const onTest = () => alert('Clicked')

  return (
    <View style={container}>
      <TouchableOpacity style={iconStyle} onPress={openDrawer(nav)}>
        <Icon name="menu-outline" color={'white'} size={24} />
      </TouchableOpacity>
      <Text style={[text, textStyle]}>{title}</Text>
      <TouchableOpacity style={iconStyle} onPress={onTest}>
        <Icon name="home" color={'white'} size={24} />
      </TouchableOpacity>
    </View>
  )
})

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: PRIMARY,
    width: W,
    height: 70,
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  iconStyle: {
    padding: 10,
  },
  text: { color: 'white', fontSize: 24, fontWeight: 'bold' },
})
export { Header }
