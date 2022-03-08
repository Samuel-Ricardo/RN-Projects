import React, { useState } from 'react'
import { Text } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

import { bindActionCreators } from 'redux'
import {connect} from 'react-redux'

import {getToggleButtonStyle} from './ToggleButtonStyle'

function setupStyle(filled, style_button, style_font, button_styled) {
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
}

 const ToggleButton = (props) => {

  const {
    filled, 
    style_button, 
    style_font, 
    app_theme,

    isActive,
    setActive,

    action
  } = props;

  const button_style = getToggleButtonStyle(app_theme);

  let button_styled = isActive ? button_style.filled : button_style.void_style;

  //setupStyle(filled, style_button, style_font, button_styled);

  const toggle = ()=> {
    setActive(!isActive)
    if(action) action();
  }

  return (

    <TouchableOpacity
      style={button_styled.Button}
      onPress={toggle}
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

export default connect(mapStateToProps)(ToggleButton);
