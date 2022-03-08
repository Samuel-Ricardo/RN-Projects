import {
  StyleSheet
} from 'react-native';
import getGlobalStyle from '../../Style/GlobalStyle'

export default function getStoreStyle(app_theme) {

  const global_style = getGlobalStyle(app_theme)

  const store_style = StyleSheet.create({
    ...global_style,

    link_background: {
      borderStyle: 'solid',
      borderLeftWidth: 3,
      borderColor: app_theme.background_color,

      paddingLeft: 30,
      paddingRight: 25,
    },

    link_font: {
      color: '#FFF',
      fontWeight: 'bold',
      fontSize: 18,
    },

    StyledTitle: {
      ...global_style.H2,

      marginTop: 25,
      marginBottom:-70,

      textAlign: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: 'bold',
      color: app_theme.default_background,
    }
  })

  return store_style;
};
