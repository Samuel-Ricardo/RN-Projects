import React from 'react'

import StoreScreen from '../../Screens/Store'
import MarketCar from '../../Screens/MarketCar'
import CepScreen from '../../Screens/CEP'

import { createStackNavigator } from '@react-navigation/stack';

const StoreRoutes = () => {

  const Stack = createStackNavigator()

  return (

    <Stack.Navigator>
      <>
        <Stack.Screen
          name="Store"
          component={StoreScreen}
          options={{ headerShown: false }}
          initialParams={{}}
        />

        <Stack.Screen
          name="Car"
          component={MarketCar}
          options={{ headerShown: false }}
          initialParams={{}}
        />

        <Stack.Screen
          name="Cep"
          component={CepScreen}
          options={{ headerShown: false }}
          initialParams={{}}
        />
      </>
    </Stack.Navigator>
  )
}

export { StoreRoutes as default }
