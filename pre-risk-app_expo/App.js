import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Provider } from 'react-redux';
import Store from './Store'

import Routes from './src/routes'

export default function App() {
  return (
    <Provider store={Store}>

      <StatusBar />

      <Routes />

    </Provider>
  );
}
