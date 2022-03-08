// import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { StatusBar } from 'react-native'

import { ThemeProvider } from 'styled-components'

import { DEFAULT_THEME } from "./src/Style/Themes"

import { Provider } from "react-redux";
import Store from "./Store"

import Routes from './src/Routes';
import { useEffect } from 'react';

// const getTheme = () => {

//   return appTheme;
// }


// export const app_theme = DEFAULT_THEME;

export default function App() {

  const [appTheme, setAppTheme] = useState(DEFAULT_THEME)

  const app_theme = JSON.stringify(appTheme)

  AsyncStorage.setItem('@app_theme', app_theme)

  return (
    <ThemeProvider theme={appTheme}>
      <Provider store={Store}>

        <StatusBar />

        <Routes />

      </Provider>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
