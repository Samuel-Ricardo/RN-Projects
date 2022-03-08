import { StyleSheet } from 'react-native';
import getGlobalStyle from '../../Style/GlobalStyle'

export default function getFormStyle(app_theme) {

  const global_style = getGlobalStyle(app_theme)

  const form_style = StyleSheet.create({
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

    TextArea: {
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

    SubTitle: {
      ...global_style.H2,

      textAlign: "center",
      marginBottom: 20,
    },

    StyledSubTitle: {
      ...global_style.H2,

      textAlign: "center",
      marginBottom: 20,

      marginTop: 30,
      marginBottom: 30,

      fontWeight: "bold",
      color: app_theme.default_background
    },

    P: {
      ...global_style.P,

      textAlign: "center",
      marginLeft: 50,
      marginRight: 50,
    },

    Link: {
      ...global_style.Link,

      marginTop: 20,
      marginBottom: 25,
    }
  })

  return form_style;
};
