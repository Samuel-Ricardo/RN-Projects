import React from 'react';

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import FactoryMenu from '../../screens/FactoryMenu';

import DriverFactory from '../../screens/DriverFactory/index';
import VehicleFactory from '../../screens/VehicleFactory/index';
import HelperFactory from '../../screens/HelperFactory/index';


const FactoryMenuRoutes = ({ app_theme }) => {

  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator>
      <>
        <Stack.Screen
          name='factory-menu'
          component={FactoryMenu}
          options={{
            headerShown: false,
          }}
          initialParams={{}}
        />

        <Stack.Screen
          name='factory-driver'
          component={DriverFactory}
          options={{
            headerShown: false,
          }}
          initialParams={{}}
        />

        <Stack.Screen
          name='factory-helper'
          component={HelperFactory}
          options={{
            headerShown: false,
          }}
          initialParams={{}}
        />

        <Stack.Screen
          name='factory-vehicle'
          component={VehicleFactory}
          options={{
            headerShown: false,
          }}
          initialParams={{}}
        />
      </>
    </Stack.Navigator>
  )
}


export default FactoryMenuRoutes;
