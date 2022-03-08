import { StyleSheet } from 'react-native'
//import getGlobalStyle from '../../Style/GlobalStyle'
import getGlobalStyle from '../../style/Global_Style';

export const getObservationStyle = (app_theme) => {

  const global_style = getGlobalStyle(app_theme)

  const obs_style = StyleSheet.create({
    ...global_style,

    Background: {
      marginTop:8,
      marginLeft: 15,
      backgroundColor: "transparent"
    },
    Font: {
      ...global_style.Link
    }
})
  return obs_style;
}
