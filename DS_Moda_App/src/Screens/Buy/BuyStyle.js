import { StyleSheet } from 'react-native';
import getGlobalStyle from '../../Style/GlobalStyle'

export default function getBuyStyle(app_theme) {

  const global_style = getGlobalStyle(app_theme)

  const buy_style = StyleSheet.create({
    ...global_style,

    icon_background: {
      ...global_style.Shadow,

      shadowOffset: { width: 5, height: 10 },
      elevation: 40,

      padding: 40,
      borderRadius: 40,

      backgroundColor: app_theme.background_color,
    },

    StyledTitle: {

      color: app_theme.default_background,
      fontWeight: 'bold',
      fontSize: 16,
      marginBottom: -0,
      textAlign: 'center',
      alignItems: 'center',
    }
  })

  return buy_style;
};
