import { StyleSheet } from 'react-native'

import getGlobalStyle from '../../Style/GlobalStyle'

const getForgotPasswordStyle = (app_theme) => {

  const global_style = getGlobalStyle(app_theme);

  const forgot_password_style = StyleSheet.create({
    ...global_style,
  })

  return forgot_password_style;
}

export { getForgotPasswordStyle as default}
