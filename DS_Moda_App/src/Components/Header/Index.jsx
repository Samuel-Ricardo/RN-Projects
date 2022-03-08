import React from 'react'
import { Text, View, Image, Touchable, TouchableOpacity } from 'react-native'

import getHeaderStyle from './HeaderStyle'

import { connect } from "react-redux"

import Button from '../Button'

const Header = (props) => {

    const { app_theme, user, config_action, perfil_action } = props

    const header_style = getHeaderStyle(app_theme)

  return (

    <View style={header_style.Background}>

      <TouchableOpacity
        onPress={() => perfil_action()}
      >
        <Image
          style={header_style.Icon}
          source={ require('../../image/icon/user_white_2.png') }
        />
      </TouchableOpacity>


      <Text style={header_style.Font}> {user.name} </Text>

      <TouchableOpacity
        onPress={() => config_action()}
      >
        <Image
        style={{
          ...header_style.Icon,
          maxWidth: 30,
          maxHeight: 30
        }}
        source={ require('../../image/icon/gear_config_512px.png') }
        on
        />
      </TouchableOpacity>
    </View>

  )
}

const mapStateToProps = state => (
  {
    app_theme: state.app_config.app_theme
  })

export default connect(mapStateToProps)(Header);
