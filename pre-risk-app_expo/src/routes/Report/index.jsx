import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import ReportScreen from '../../screens/ReportScreen'


const RelatoryRoutes = () => {

const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator>
      <>
        <Stack.Screen
            name="Relatory"
            component={ ReportScreen }
            options={{ headerShown: false }}
            initialParams={{}}
          />
      </>
    </Stack.Navigator>

  )
}

export { RelatoryRoutes as default };