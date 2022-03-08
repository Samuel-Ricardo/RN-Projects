import { StyleSheet } from "react-native";
import getGlobalStyle from '../../Style/GlobalStyle'
import getLoginStyle from '../Login/LoginStyle'

const getRegisterStyle = (app_theme) => {

  const global_style = getGlobalStyle(app_theme)

  const login_style = getLoginStyle(app_theme)

  const register_style = StyleSheet.create({
    ...global_style,
    ...login_style,

    Button: {
      ...login_style.Button,

      marginTop: -30
    },

    TextInput: {
      ...login_style.TextInput,

      marginBottom: 20,
    }
  })

  return register_style;
}

export { getRegisterStyle as default };
