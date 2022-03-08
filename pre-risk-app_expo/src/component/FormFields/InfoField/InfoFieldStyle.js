import { StyleSheet } from 'react-native'
import getGlobalStyle from '../../../style/Global_Style'

export default function getInfoFieldStyle(app_theme) {

  const global_style = getGlobalStyle(app_theme);

  const info_field_style = StyleSheet.create({

    ...global_style,

    Background: {
      ...global_style.Shadow,

      backgroundColor: app_theme.background_color,

      padding: 10,

      borderStyle: 'solid',
      borderRadius: 15,
    },

    Title: {
      ...global_style.P,

      fontWeight: "bold",
      color: app_theme.default_background,

      marginBottom: 5,
    },

    Content: {
      fontWeight: "bold",
      color: app_theme.default_background,

      marginBottom: 10,
      marginLeft: 5,
    }

  })

  return info_field_style;
};
