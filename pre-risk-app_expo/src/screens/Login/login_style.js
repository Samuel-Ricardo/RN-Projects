import styled from 'styled-components'

import getGlobalStyle from '../../style/Global_Style'

import {
  StyleSheet
} from 'react-native'


const getLoginStyle = (app_theme) => {

  const global_style = getGlobalStyle(app_theme)

  const login_style = StyleSheet.create({
    ...global_style,

    Container: {
      ...global_style.Container,

      flexDirection: 'column'
    },

    Pane: {
      ...global_style.Pane,

      paddingTop: 20,
      paddingBottom: 20,

      paddingLeft: 20,
      paddingRight: 20,

      marginLeft: 20,
      marginRight: 20,

      display: "flex",

      marginBottom: 20,
    },

    Div: {
      ...global_style.Div,

      top: 20,
      left: 0,
      right: 0,

      marginBottom: 40
    },

    Title: {
      ...global_style.Title,

      marginBottom: 20,

      textAlign: "center",

    },

    H2: {
      ...global_style.H2,


      textAlign: "center",
      marginBottom: 20,
    },

    StyledH2: {
      ...global_style.H2,

      textAlign: "center",
      marginBottom: 20,

      marginTop: 30,
      marginBottom: 30,

      fontWeight: "normal",
      // color:  app_theme.default_background
      color: "#0085FF"
    },

    P: {
      ...global_style.P,

      textAlign: "center",
      marginLeft: 50,
      marginRight: 50,
    },

    Link: {
      ...global_style.Link,

      marginTop: 30,
      marginBottom: 30,
    },

    TextInput: {
      ...global_style.TextInput,

      marginBottom: 25,
    },

    Button: {
      ...global_style.Button,

      marginBottom: 0,



      maxWidth: 200
    },

    ButtonGroup: {
      ...global_style.Div,

      justifyContent: 'space-between',

      alignItems: 'center',

      flexDirection: 'row',


    },

  })

  return login_style
}

export {
  getLoginStyle as
  default
};
