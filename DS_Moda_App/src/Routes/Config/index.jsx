import React from 'react'

import { createStackNavigator } from '@react-navigation/stack';

import ConfigScreen from '../../Screens/Config';
import userUpdaterScreen from '../../Screens/UserUpdate';
import ItemCreator from '../../Screens/ItemCreator';
import ItemDeleter from '../../Screens/ItemDelete';
import ItemUpdater from '../../Screens/ItemUpdater';

const StoreRoutes = () => {

  const Stack = createStackNavigator()

  return (

    <Stack.Navigator>
      <>
        <Stack.Screen
          name="Config"
          component={ConfigScreen}
          options={{ headerShown: false }}
          initialParams={{}}
        />

        <Stack.Screen
          name="UserUpdater"
          component={userUpdaterScreen}
          options={{ headerShown: false }}
          initialParams={{}}
        />

        <Stack.Screen
          name="ItemUpdater"
          component={ItemUpdater}
          options={{ headerShown: false }}
          initialParams={{}}
        />

        <Stack.Screen
          name="ItemCreator"
          component={ItemCreator}
          options={{ headerShown: false }}
          initialParams={{}}
        />

        <Stack.Screen
          name="ItemDeleter"
          component={ItemDeleter}
          options={{ headerShown: false }}
          initialParams={{}}
        />
      </>
    </Stack.Navigator>
  )
}

export { StoreRoutes as default }
