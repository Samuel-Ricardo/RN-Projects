import { StyleSheet } from 'react-native'
import getGlobalStyle from '../../Style/GlobalStyle'


const getItemStyle = (app_theme) => {

  const global_style = getGlobalStyle(app_theme)

  const item_style = {
    ...global_style,

    Container: {
      ...global_style.Border,
      backgroundColor: app_theme.background_color,

      flexDirection: 'row',

      borderWidth: 3,
      borderRadius: 20,

      height: 118,

      paddingTop: 10,
      paddingBottom: 10,
      paddingLeft: 3,
      paddingRight: 5,

      marginLeft: 20,
      marginRight: 20,
      marginTop: 20,

      maxWidth: global_style.ScreenWidth - 40,

    },

    ContentArea: {
      marginRigth: 20,
      
    },

    Line: {
      flexDirection: 'row',
      justifyContent: 'space-between',


    },

    ImageArea: {
      ...global_style.Border,

      borderRightWidth: 3,
      borderTopStartRadius: 10,
      borderBottomStartRadius: 10,

      marginTop: -7,
      marginBottom: -7,

      paddingTop: 3,
      paddingLeft: 5,
      paddingRight: 5,
      paddingBottom: 5,

    },

    Image: {

      borderRadius: 10,

      marginTop: -2,
      marginLeft: -2.5,

      width: 100,
      height: 98,
    },

    ContentArea: {

      marginLeft: 8,

      flexGrow: 1,
    },

    Name: {

      textAlign: "justify",
      marginRight: 4,

      color: 'black',
    },

    Size: {

      paddingLeft: 10,

    }


  };

  return item_style;
}

export { getItemStyle as default};
