import React from 'react'

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from '../Screens/Login'
import HomeScreen from '../Screens/Home'
import { useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';


import * as UserActions from '../../Store/Actions/User'

import LoginRoutes from './Login'
import HomeRoutes from './Home'
import ConfigRoutes from './Config'

const Stack = createStackNavigator();

const Routes = ({ user }) => (

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

          <Stack.Screen
            name="Config"
            component={ConfigRoutes}
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


const mapStateToProps = state => ({

  user: state.User.loggedUser
})

const mapDispatchToProps = dispatch => (

  bindActionCreators(UserActions, dispatch)

)

export default connect(mapStateToProps, mapDispatchToProps)(Routes)
