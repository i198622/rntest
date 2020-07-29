import * as React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { Home, Todos } from './screens'

const Drawer = createDrawerNavigator()

const AppNavigatior = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Todos" component={Todos} />
    </Drawer.Navigator>
  )
}

export default AppNavigatior
