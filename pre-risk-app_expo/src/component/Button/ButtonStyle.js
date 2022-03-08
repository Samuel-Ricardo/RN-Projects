import { StyleSheet } from 'react-native'
import getGlobalStyle from '../../style/Global_Style'



const getButtonStyle = (app_theme) => {

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

      borderStyle: "solid",
      borderColor: app_theme.default_border_color,

      fontWeight: "normal"
    },

    font: {
      ...global_style.Text,

      fontWeight: "bold",
      color: app_theme.default_background_color,
    }
  });



  const button_style = {
    ...global_style,

    filled,
    void_style
  };

  return button_style;
}

export { getButtonStyle as default};