import React from 'react'
import { Text, View, ScrollView, Image, TouchableOpacity } from 'react-native'

import { connect } from "react-redux"
import { bindActionCreators } from 'redux'

import * as UserActions from "../../../Store/Actions/User"

import getPerfilStyle from './PerfilStyle'

import Header from '../../Components/Header'
import Button from '../../Components/Button'
import ItemList from '../../Components/ItemList'
import InfoField from '../../Components/FormFields/InfoField'


const PerfilScreen = ({ navigation, route, user, logoutUser, app_theme, dispatch }) => {

  console.log("")
  console.log("Open: Perfil Screen")
  console.log("")

  console.log("")
  console.log("Navigation Data:")
  console.log(navigation)
  console.log("")

  console.log("")
  console.log("Navigation Route Data:")
  console.log(route)
  console.log("")

  console.log("")
  console.log("State:")
  console.log(user)
  console.log("")

  const perfil_style = getPerfilStyle(app_theme)

  return (
    <>
      <ScrollView>
      <View style={perfil_style.Container}>

        <View style={perfil_style.Header}>
          <TouchableOpacity
            style={perfil_style.LeftHeader}
            onPress={() => navigation.navigate('Store')}
          >
            <Image
              style={perfil_style.Icon}
              source={ require('../../image/icon/shopping-bag_512px.png')}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={perfil_style.RigthHeader}
            onPress={() => navigation.navigate('Config')}
          >
            <Image
              style={perfil_style.Icon}
              source={ require('../../image/icon/gear_config_512px.png')}
            />



          </TouchableOpacity>
        </View>

          <View style={perfil_style.ImageBackgound}>
            <Image
              style={perfil_style.PerfilImage}
              source={require('../../image/icon/user_white_2.png')}
            />
          </View>

          <Text style={{
            ...perfil_style.H2,
            ...perfil_style.Shadow,
            color: app_theme.default_background,
            padding: 20,
            borderRadius: 20,
            shadowColor: '#0085FF',
          }}>{user.name}</Text>

          <View style={perfil_style.InfoArea}>

            <InfoField
              title='Seu Email:'
            >
              {user.email}
            </InfoField>

            <InfoField
              title='Items Favoritados:'
              style={perfil_style.InfoFieldStyle}
            >
              {user.favoriteItems.length}
            </InfoField>

          </View>

          </View>
</ScrollView>

    </>
  )
}
//<ItemList></ItemList>
const mapStateToProps = state => (
  {
    user: state.User.loggedUser,
    app_theme: state.app_config.app_theme
  })

const mapDispatchToProps = dispatch => (
  bindActionCreators(UserActions, dispatch)
)

export default connect(mapStateToProps, mapDispatchToProps)(PerfilScreen);
