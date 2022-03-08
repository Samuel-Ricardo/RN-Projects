import React  from 'react'
import {View, Text, Image} from 'react-native'

import HomeScreen from '../../Screens/Home'
import PerfilScreen from '../../Screens/UserPerfil'
import StoreRoutes from '../Store'

import HomeIcon from '../../image/icon/HomeIcon.jsx'
import StoreIcon from '../../image/icon/StoreIcon'

import getGlobalStyle  from '../../Style/GlobalStyle'

import { NavigationContainer } from '@react-navigation/native'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'

import { connect } from 'react-redux'

const HomeRoutes = ({app_theme}) => {

    const BottomTab = createBottomTabNavigator()

    const global_style = getGlobalStyle(app_theme)

    return (
        <BottomTab.Navigator>
            <>
                <BottomTab.Screen
                    name='Home'
                    component={HomeScreen}
                    options={{
                        headerShown: false,
                        tabBarIcon: ({color, size}) => (
                        <View>
                            <HomeIcon fill={color} width={size} height={size}/>
                        </View>
                    )
                 }}
                    initialParams={{}}

                    style={global_style.TabBar}
                />

                <BottomTab.Screen
                    name='Store'
                    component={ StoreRoutes }
                    options={{
                        headerShown: false,
                        tabBarIcon: ({color, size}) => (
                        <View>
                            <StoreIcon fill={color} width={size} height={size}/>
                        </View>
                    )
                 }}
                    initialParams={{}}

                    style={global_style.TabBar}
                />

                <BottomTab.Screen
                    name='Perfil'
                    component={PerfilScreen}
                    options={{
                        headerShown: false,
                        tabBarIcon: ({color, size}) => (
                        <View>
                            <Image
                                source={require('../../image/icon/user_white_2.png')}
                                resizeMode='contain'
                                style={{
                                    width: size,
                                    height: size,
                                    tintColor: color
                                }}
                            />
                        </View>
                    )
                 }}
                    initialParams={{}}
                    style={global_style.TabBar}
                />
            </>
        </BottomTab.Navigator>
    )
}

const mapStateToProps = state => ({
    app_theme: state.app_config.app_theme
})

export default connect(mapStateToProps)(HomeRoutes)
