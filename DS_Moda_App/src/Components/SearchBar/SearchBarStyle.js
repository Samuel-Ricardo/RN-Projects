import { StyleSheet } from 'react-native'
import getGlobalStyle from '../../Style/GlobalStyle'

const getSearchBarStyle = (app_theme) => {

  const global_style = getGlobalStyle(app_theme);

  const Container = StyleSheet.create({

    Container: {

      backgroundColor: app_theme.default_background,

      paddingTop: 0,
      paddingLeft: 0,
      paddingRight: 0,
      paddingBottom: 0,

      flexDirection: 'row',

      justifyContent: 'space-between',

      width: global_style.ScreenWidth,

      borderBottomEndRadius: 20,
      borderBottomStartRadius: 20,
    },

  })

  const search_bar_style = StyleSheet.create({

    Container: {
      ...Container.Container,

      flexDirection: 'column',
    },

    SearchArea: {
      ...Container.Container,

      paddingTop: 10,
      paddingLeft: 15,
      paddingRight: 10,
      paddingBottom: 20,

      backgroundColor: 'transparent',
     },

    TextInput: {

      borderBottomWidth: 3,
      borderStyle: 'solid',
      borderColor: app_theme.default_border_color

    },

    TextArea: {

      paddingLeft: 10,
      paddingRight: 10,
      padding: 8,
      marginTop: 10,

      backgroundColor: '#FFF',
      borderRadius: 50,
      width: global_style.ScreenWidth - 90,
    },

    SearchButton: {

      backgroundColor: app_theme.background_color,
      borderRadius: 20,
      padding: 10,

      marginBottom: -5,
    },

    NavBar: {
      borderStyle: 'solid',
      borderTopWidth: 3,
      borderColor: app_theme.background_color,

      paddingTop: 15,
      marginLeft: 10,
      marginRight: 10,
      paddingBottom: 20,

      flexDirection: 'row',

      alignItems: 'center',
      // justifyContent: 'center',
      justifyContent: 'space-between',
    },
  });

  return search_bar_style;
}

export { getSearchBarStyle as default };
