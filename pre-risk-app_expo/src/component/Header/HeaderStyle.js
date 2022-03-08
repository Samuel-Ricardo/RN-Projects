import {StyleSheet} from 'react-native'
import getGlobalStyle from '../../style/Global_Style'

const getHeaderStyle = (app_theme) => {

  const global_style = getGlobalStyle(app_theme)

  const header_style = StyleSheet.create({
    ...global_style,

    Background: {
      backgroundColor: app_theme.default_background,
      flexDirection: "row",

      alignItems: 'center',
      justifyContent: 'space-between',
      textAlign: 'center',


      maxHeight: 80,
      minHeight: 80,

      paddingTop: 20,

      paddingLeft: 20,
      paddingRight: 20,

      borderBottomEndRadius: 15,
      borderBottomStartRadius: 15
    },

    Font: {
      ...global_style.P,

      textAlign: 'center',
      fontWeight: 'bold'
    },

    Icon: {

     // marginTop:10,
      
      maxWidth: 50,
      maxHeight: 50
    }
  });

  return header_style;
};

export { getHeaderStyle as default };
