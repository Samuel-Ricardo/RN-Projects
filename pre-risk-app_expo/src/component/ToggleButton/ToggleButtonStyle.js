import { StyleSheet } from 'react-native'
import getGlobalStyle from '../../style/Global_Style'



export const getToggleButtonStyle = (app_theme) => {

  const global_style = getGlobalStyle(app_theme)

  const filled = StyleSheet.create({
    Button: {
      ...global_style.Button,
    
      textAlign: "center",
    },
    font: {
      ...global_style.Text,

      fontWeight: "bold",

      textAlign: "center",
    }
  });

  const void_style = StyleSheet.create({

    Button: {

      ...global_style.Button,

      backgroundColor: app_theme.void_color,

      borderWidth: 5,
      borderStyle: "solid",
      borderColor: app_theme.default_border_color,

      fontWeight: "normal",
      alignItems: 'center',
    },

    font: {
      ...global_style.Text,

      fontWeight: "bold",
      color: app_theme.default_border_color,
    }
  });



  const toggle_button_style = {
    ...global_style,

    filled,
    void_style
  };

  return toggle_button_style;
}