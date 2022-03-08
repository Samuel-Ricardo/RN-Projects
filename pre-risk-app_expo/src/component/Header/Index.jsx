import React from 'react'
import { Text, View, Image, TouchableOpacity } from 'react-native'

import getHeaderStyle from './HeaderStyle'

import { connect } from "react-redux"

const Header = (props) => {

  const {
    app_theme,
    user,
    text,
    config_action,
    perfil_action,
    icon
  } = props;

  const header_style = getHeaderStyle(app_theme)

  return (

    <View style={header_style.Background}>

      {perfil_action != undefined ? (
        <TouchableOpacity
          onPress={() => perfil_action()}
        >
          {icon != undefined ?
            (
              icon
            ) : (
              <></>
            )

          }
        </TouchableOpacity>
      ) : (
        <TouchableOpacity>
          {icon != undefined ?
            (
              icon
            ) : (
              <></>
            )

          }
        </TouchableOpacity>
      )
      }

      <Text style={header_style.Font}> {text} </Text>

      <TouchableOpacity
        onPress={() => config_action()}
      >
        <Image
          style={{
            ...header_style.Icon,
            maxWidth: 30,
            maxHeight: 30
          }}
          source={require('../../assets/exit_512px.png')}

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
