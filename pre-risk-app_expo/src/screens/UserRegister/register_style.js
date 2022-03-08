import { StyleSheet } from "react-native";
import getGlobalStyle from '../../style/Global_Style'
import getLoginStyle from '../Login/login_style'

const getRegisterStyle = (app_theme) => {

  const global_style = getGlobalStyle(app_theme)

  const login_style = getLoginStyle(app_theme)

  const register_style = StyleSheet.create({
    ...global_style,
    ...login_style,

    Button: {
      ...login_style.Button,

      marginTop: -30,
      marginLeft: 80
    },

    TextInput: {
      ...login_style.TextInput,

      marginBottom: 20,
      width: 300,
    }
  })

  return register_style;
}

export { getRegisterStyle as default };
