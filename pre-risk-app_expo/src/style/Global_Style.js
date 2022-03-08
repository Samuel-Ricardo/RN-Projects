import {
  StyleSheet
} from 'react-native'
import {
  Dimensions
} from "react-native";

const getGlobalStyle = (app_theme) => {

  const width = Dimensions.get('window').width; //full width
  const height = Dimensions.get('window').height; //full height

  const getDimensions = () => {
    const width = Dimensions.get('window').width; //full width
    const height = Dimensions.get('window').height; //full height

    return {
      width,
      height
    }
  }

  const effects = StyleSheet.create({
    Shadow: {

      shadowColor: '#000000',
      shadowOffset: {
        width: 0.2,
        height: 2
      },
      shadowOpacity: 0.9,
      shadowRadius: 3,
      elevation: 4,
    },
  })

  const text_style = StyleSheet.create({
    Title: {

      color: app_theme.text_color,
      fontSize: app_theme.title_size,
      fontWeight: "bold"
    },

    H2: {
      color: app_theme.text_color,
      fontSize: app_theme.h2_title_size,
      fontWeight: "bold"
    },

    P: {
      color: app_theme.text_color,
      fontSize: app_theme.paragraph_size
    },

    Text: {
      fontSize: app_theme.text_size,
      color: app_theme.text_color
    },

    Link: {
      fontSize: 14,
      color: app_theme.default_background
    },

    TextInput: {
      borderStyle: "solid",
      borderBottomLeftRadius: 5,
      borderBottomRightRadius: 5,
      borderTopLeftRadius: 3,
      marginRight:5,
      //textAlign: 'center',


      borderColor: app_theme.default_background,

      borderLeftWidth: 2,
      borderBottomWidth: 3,

      paddingLeft: 8
    },
  })

  const global_styled = StyleSheet.create({

    division:{
      display: 'flex',
      maxHeight: 10,
      backgroundColor:'#FFFFFF',
      borderRadius: 15,
      flex: 1,
    },

    side_bar: {
      backgroundColor: 'red',

      display: 'flex',
      flexDirection: 'column',

      minWidth: width,
      height: height / 2
    },

    Border: {
      borderStyle: 'solid',
      borderColor: app_theme.default_border_color,
    },

    Container: {

      backgroundColor: app_theme.default_background,

      display: "flex",
      flex: 1,
      flexGrow: 1,
    },

    Pane: {

      backgroundColor: app_theme.pane_color,
      borderRadius: 20,
      borderStyle: "solid"
    },

    Div: {

    },

    divide: {
      backgroundColor: '#0151ad', 
      height: 2, 
      marginVertical: 4, 
      alignSelf:'stretch'
    },

    Button: {

      paddingTop: 10,
      paddingBottom: 10,

      paddingLeft: 20,
      paddingRight: 20,

      backgroundColor: app_theme.default_background,

      borderBottomLeftRadius: 50,
      borderBottomRightRadius: 50,
      borderTopLeftRadius: 50,
      borderTopRightRadius: 50,

      fontWeight: "bold"
    },

    ButtonGroup: {

      justifyContent: 'space-between',

      alignItems: 'center',

      flexDirection: 'row',
    },

    TabBar: {
      borderStyle: "solid",
      borderColor: app_theme.default_background,
      borderRadius: 20,
      borderWidth: 1,

      backgroundColor: 'red',

    },

    icon: {
      borderRadius: 50,
    },

    icon_background: {


      shadowColor: '#000000',
      shadowOffset: {
        width: 0.2,
        height: 2
      },
      shadowOpacity: 0.9,
      shadowRadius: 3,
      elevation: 3,



      shadowOffset: { width: 5, height: 10 },
      elevation: 40,

      padding: 40,
      borderRadius: 40,

      backgroundColor: app_theme.background_color,
    },
  });

  const global_style = {
    ...global_styled,

    ...text_style,

    ...effects,

    ScreenWidth: width,
    ScreenHeight: height,

    getDimensions
  }

  return global_style;
}

export {
  getGlobalStyle as
    default
};
