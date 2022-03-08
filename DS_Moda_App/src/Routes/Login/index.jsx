import React from 'react'

import LoginScreen from '../../Screens/Login'
import Register from '../../Screens/UserRegister'
import ForgotPasswordScreen from '../../Screens/ForgotPassword'

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const LoginRoutes = () => {

  const Stack = createStackNavigator()

   return (

       <Stack.Navigator>
        <>
          <Stack.Screen
            name="Login"
            component={ LoginScreen }
            options={{ headerShown: false }}
            initialParams={{}}
          />

          <Stack.Screen
            name="user_register"
            component={ Register }
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

export {LoginRoutes as default}
