import {
  StyleSheet
} from "react-native";
import Global_Style from "../../style/Global_Style";

import getGlobalStyle from '../../style/Global_Style'

const getMenuStyle = (app_theme) => {

  const global_style = getGlobalStyle(app_theme);

  const menu_styled = StyleSheet.create({
    ...global_style,

    background: {
      

      

      backgroundColor: app_theme.transparent_black,

      width: global_style.ScreenWidth,
      height: global_style.ScreenHeight,

      

      left: 0
    },

    header: {
      backgroundColor: app_theme.background_color,

      display: 'flex',
      flexDirection: "row",

      paddingVertical: 10,
      paddingHorizontal: 5,
    },

    icon: {
      ...global_style.icon,
      
      maxWidth: 25,
      maxHeight: 25
    }
  })

  const menu_style = {
    ...menu_styled
  }

  return menu_style;
}

export default getMenuStyle;
