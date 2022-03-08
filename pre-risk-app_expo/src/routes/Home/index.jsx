import React from 'react';
import { Image, View } from 'react-native';

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeIcon from '../../icon/HomeIcon'
import HomeScreen from '../../screens/Home'

import AddIcon from '../../icon/AddIcon';
import FactoryMenu from '../FactoryMenu';

import ReportIcon from '../../icon/ReportIcon2';
import ReportScreen from '../../screens/ReportScreen';

const HomeRoutes = ({ app_theme }) => {

  const BottomTab = createBottomTabNavigator();

  return (
    <BottomTab.Navigator>
      <>
        <BottomTab.Screen
          name='Home'
          component={HomeScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <View>
                <HomeIcon fill={color} width={size} height={size} />
              </View>
            )
          }}
          initialParams={{}}
        />

        <BottomTab.Screen
          name='Factory'
          component={FactoryMenu}
          options={{
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <View>
                <AddIcon fill={color} width={size} height={size} />
              </View>
            )
          }}
          initialParams={{}}
        />

        <BottomTab.Screen
          name='reports'
          component={ReportScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <View>
                <Image source={require('../../assets/reporter.png')} style={{width: size, height: size}}/>
              </View>
            )
          }}
          initialParams={{}}
        />
      </>
    </BottomTab.Navigator>
  )
}


export default HomeRoutes;
