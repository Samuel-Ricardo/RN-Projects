import React, { useState } from 'react'
import { Text, TouchableOpacity } from 'react-native'

import {getObservationStyle} from './OBSStyle'

import { connect } from 'react-redux'

const Link = (props) => {

  const {
    app_theme,
    onClick,
    background_style,
    font_style,
  } = props

  let obs_style = getObservationStyle(app_theme)

  if (background_style) {

    obs_style = {
      ...obs_style,

      Background: {
        ...obs_style.Background,
        ...background_style
      },
    }

  }

  if (font_style) {

    obs_style = {
      ...obs_style,

      Font: {
        ...obs_style.Font,
        ...font_style
      }
    }
  }

  return (

    <TouchableOpacity
      style={obs_style.Background}
      onPress={onClick ? onClick : ()=>{}}
    >
      <Text
        style={obs_style.Font}
      >
        {props.children}
      </Text>
    </TouchableOpacity>

  )
}

const mapStateToProps = state => ({
  app_theme: state.app_config.app_theme
})

export default connect(mapStateToProps)(Link)