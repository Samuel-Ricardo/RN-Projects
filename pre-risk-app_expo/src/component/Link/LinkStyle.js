import { StyleSheet } from 'react-native'
//import getGlobalStyle from '../../Style/GlobalStyle'
import getGlobalStyle from '../../style/Global_Style';

const getLinkStyle = (app_theme) => {

  const global_style = getGlobalStyle(app_theme)

  const link_style = StyleSheet.create({
    ...global_style,

    Background: {
      backgroundColor: "transparent"
    },
    Font: {
      ...global_style.Link
    }
})
  return link_style;
}

export { getLinkStyle as default}