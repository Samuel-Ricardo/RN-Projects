import React, { useState } from 'react'
import { Text } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

import { bindActionCreators } from 'redux'
import {connect} from 'react-redux'

import getButtonStyle from './ButtonStyle'

 const Button = (props) => {

  const {onClick, filled, style_button, style_font, app_theme} = props;

  const button_style = getButtonStyle(app_theme);

  let button_styled = button_style.filled

  if(filled === false){

    button_styled = button_style.void_style

  }

  if (style_button) {

    button_styled = {
      ...button_styled,

      Button: {
        ...button_styled.Button,
        ...style_button
      },
    }

  }

  if (style_font) {

    button_styled = {
      ...button_styled,

      font: {
        ...button_styled.font,
        ...style_font
      }
    }

  }

  return (

    <TouchableOpacity
      style={button_styled.Button}
      onPress={onClick}
    >

      <Text
        style={button_styled.font}
      >
        {props.children}
      </Text>

    </TouchableOpacity>
  )
}

const mapStateToProps = state => ({

  app_theme: state.app_config.app_theme
})

export default connect(mapStateToProps)(Button);
