import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Login from "../../screens/Login";
import Register from '../../screens/UserRegister'
import ForgotPasswordScreen from '../../screens/ForgotPassword'


const LoginRoutes = () => {

  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator>
      <>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
          initialParams={{}}
        />

        <Stack.Screen
          name="user_register"
          component={Register}
          options={{ headerShown: false }}
          initialParams={{}}
        />

        <Stack.Screen
          name='forgot_password'
          component={ForgotPasswordScreen}
          options={{ headerShown: false }}
          initialParams={{}}
        />

      </>
    </Stack.Navigator>

  )
}

export { LoginRoutes as default };

/*
         <Stack.Screen
           name='Relatory'
           component={RelatoryScreen}
           options={{ headerShown: false }}
           initialParams={{}}
         />

         <Stack.Screen
           name='home_screen'
           component={HomeTest}
           options={{ headerShown: false }}
           initialParams={{}}
         />
*/
