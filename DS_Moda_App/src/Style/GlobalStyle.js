import { StyleSheet } from 'react-native'
import { Dimensions } from "react-native";
// import { StyleSheetProperties } from 'react-native'
// import { StyleProp } from 'react-native'

import AsyncStorage from '@react-native-async-storage/async-storage';

import styled from 'styled-components/native';

// import { app_theme } from '../../App'

// let theme = props => props.theme

const getGlobalStyle = (app_theme) => {

  //const appTheme = await AsyncStorage.getItem('@app_theme')

  //const app_theme = JSON.parse(appTheme)

  // const app_theme = theme()

  const width = Dimensions.get('window').width; //full width
  const height = Dimensions.get('window').height; //full height

  const global_styled = StyleSheet.create({

    Border: {
      borderStyle: 'solid',
      borderColor: app_theme.default_border_color,
    },
    
    Container: {

      backgroundColor: app_theme.default_background,

      display: "flex",
      flex: 1,
    },

    Pane: {

      backgroundColor: app_theme.pane_color,
      borderRadius: 20,
      borderStyle: "solid"
    },

    Div: {

    },

    Shadow: {

      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.9,
      shadowRadius: 3,
      elevation: 3,
    },

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

      borderColor: app_theme.default_background,

      borderLeftWidth: 2,
      borderBottomWidth: 3,

      paddingLeft: 8
  },

    Button: {

      paddingTop: 10,
      paddingBottom: 10,

      paddingLeft: 20,
      paddingRight: 20,

      backgroundColor:  app_theme.default_background,

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
      borderWidth:1,

      backgroundColor: 'red',

    },

    icon: {
      borderRadius: 50,
    }
  });

  const global_style = {
    ...global_styled,

    ScreenWidth: width,
    ScreenHeight: height
  }

    return global_style;
}

export { getGlobalStyle as default };


// export const Container = styled.View`
//   background-color:  ${props => props.theme.default_background};

//   display: flex;
//   flex: ${1};
// `;

// export const Pane = styled.View`

//   background-color: ${props => props.theme.pane_color};
//   border-radius: ${20};
//   border-style: solid;

// `

// export const Div = styled.View`

// `;



// export const Title = styled.Text`
//   color: ${props => props.theme.text_color};
//   font-size: ${props => props.theme.title_size};
//   font-weight: bold;
// `;

// export const H2 = styled.Text`
//   color: ${props => props.theme.text_color};
//   font-size: ${props => props.theme.h2_title_size};
//   font-weight: bold;
// `;

// export const P = styled.Text`
//   color: ${props => props.theme.text_color};
//   font-size: ${props => props.theme.paragraph_size};
// `;

// export const Text = styled.Text`

//   font-size: ${props => props.theme.text_size}
// `;

// export const Link = styled(Text)`
//   font-size: ${14};
//   color: ${props => props.theme.default_background}
// `;


// export const InputText = styled.TextInput`
//   border-style: solid;
//   border-bottom-left-radius: ${5};
//   border-bottom-right-radius: ${5};
//   border-top-left-radius: ${3};

//   border-color: ${props => props.theme.default_background};

//   border-left-width: ${2};
//   border-bottom-width: ${3};
// `;



// export const Button = styled.TouchableOpacity`

//   padding-top: 10;
//   padding-bottom: 10;

//   margin-left: 5;
//   margin-right: 5;

//   background-color:  ${props => props.theme.default_background};

//   border-bottom-left-radius: ${50};
//   border-bottom-right-radius: ${50};
//   border-top-left-radius: ${50};
//   border-top-right-radius: ${50};

//   font-weight: bold
// `;
/*
export default async function getGlobalStyle() {

const appTheme = await AsyncStorage.getItem('@app_theme')

const app_theme = JSON.parse(appTheme)

const global_style = StyleSheet.create({

  Container: {

    backgroundColor: app_theme.default_background,

    display: flex,
    flex: 1,
  }

})

  return global_style;
}; */
