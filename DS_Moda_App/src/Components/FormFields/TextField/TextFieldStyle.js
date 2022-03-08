import { StyleSheet } from 'react-native'
import getGlobalStyle from '../../../Style/GlobalStyle'

const getTextFieldStyle = (app_theme) => {

  const global_style = getGlobalStyle(app_theme);

  const text_field_style = StyleSheet.create({
    Title: {
      ...global_style.P,

      fontWeight: "bold",
      color: app_theme.default_background,
      marginBottom: 10
    },

    TextInput: {
      ...global_style.TextInput
    },

    Container: {
      flexDirection: 'row'
    }
  });

  return text_field_style;
}

export { getTextFieldStyle as default };
