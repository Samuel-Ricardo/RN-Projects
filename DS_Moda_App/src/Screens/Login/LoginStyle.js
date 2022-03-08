import styled from 'styled-components'

// import { app_theme } from '../../../App'

import getGlobalStyle from '../../Style/GlobalStyle'

import * as storage from '../../util/storage'

//const { Container, H2, Title, P, InputText } = global_style;

import { StyleSheet } from 'react-native'


const getLoginStyle = (app_theme) => {

  //const app_theme = await storage.asyncGet('@app_theme')

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
      color:  "#0085FF"
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

export { getLoginStyle as default };

// export const Container :global_style.Container,

//  flex-direction: column
// `

// export const Pane = styled(global_style.Pane)`

//   padding-top: ${20};
//   padding-bottom: ${20};

//   padding-left: ${20};
//   padding-right: ${20};

//   margin-left: ${20};
//   margin-right: ${20};

//   display: flex;

//   margin-bottom: 20;

// `

// export const Div = styled(global_style.Div)`

//   top: 20;
//   left: 0;
//   right: 0;

//   margin-bottom: 40;
// `
// /* position: absolute; */



// export const Title = styled(global_style.Title)`

//   margin-bottom: 20;

//   text-align: center;

// `;

// export const H2 = styled(global_style.H2)`
//   text-align: center;
//   margin-bottom: 20;
// `;

// export const StyledH2 = styled(H2)`

//   margin-top: 30;
//   margin-bottom: 30;

//   font-weight: normal;
//   color:  ${props => props.theme.default_background}
// `;

// export const P = styled(global_style.P)`
//   text-align: center;
//   margin-left: 50;
//   margin-right: 50;
// `

// export const Link = styled(global_style.Link)`

//   margin-top: 30;
//   margin-bottom: 30;
// `



// export const InputText = styled(global_style.InputText)`

//   margin-bottom: ${25};

// `



// export const Button = styled(global_style.Button)`

//   margin-bottom: 20;

//   max-width: ${200}
// `

// export const ButtonGroup = styled(global_style.Div)`

//   justify-content: center;

//   align-items: center;

//   flex-direction: row
// `
