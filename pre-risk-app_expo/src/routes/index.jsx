import React from "react";

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginRoutes from './Login'
import HomeRoutes from './Home'

import { connect } from "react-redux";


const Stack = createNativeStackNavigator();

const Routes = ({ user }) => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user.isLogged ? (
          <>
            <Stack.Screen
              name="Home"
              component={HomeRoutes}
              options={{
                headerShown: false
              }}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="login_routes"
              component={LoginRoutes}
              options={{ headerShown: false }}
              initialParams={{}}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>

  )
}

const mapStatteToProps = state => ({
  user: state.User.logged_user,
})


export default connect(mapStatteToProps)(Routes);
