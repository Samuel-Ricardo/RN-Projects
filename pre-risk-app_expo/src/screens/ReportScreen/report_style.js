import {
  Dimensions,
  StyleSheet
} from 'react-native'
import getGlobalStyle from '../../style/Global_Style'
import getLoginStyle from '../Login/login_style'

const getRelatoryStyle = (app_theme) => {

  const global_style = getGlobalStyle(app_theme)
  const login_style = getLoginStyle(app_theme)

  const width = Dimensions.get('window').width; //full width
  const height = Dimensions.get('window').height; //full height

  const relatory_style = StyleSheet.create({
    ...global_style,

    Container: {
      ...global_style.Container,

      backgroundColor: app_theme.background_color,

      flexDirection: 'column',
      flexGrow: 1,

      width: width,
      height: height
    },

    Button: {
      ...login_style.Button,

      marginTop: 5,
      marginLeft: 10
    },

  });

  return relatory_style;
}

export {
  getRelatoryStyle as
  default
};
