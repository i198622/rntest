import { Dimensions } from 'react-native'

export const PRIMARY = '#089057'
export const GRAY_BG = '#CED0CE'
export const WHITE = '#FFF'
export const BLACK = '#000'
export const SHADOW = '#999'
export const TRANSPARENT = 'rgba(0,0,0,0.5)'
export const RED = '#FF0000'

export const { width: W, height: H } = Dimensions.get('window')

export const onScreen = (screen, navigation, obj) => () => {
  navigation.navigate(screen, obj)
}

export const openDrawer = (navigation) => () => navigation.openDrawer()
