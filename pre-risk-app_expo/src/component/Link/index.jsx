import React, { useState } from 'react'
import { Text, TouchableOpacity } from 'react-native'

import getLinkStyle from './LinkStyle'

import { connect } from 'react-redux'

const Link = (props) => {

  const {
    app_theme,
    onClick,
    background_style,
    font_style,
  } = props

  let link_style = getLinkStyle(app_theme)

  if (background_style) {

    link_style = {
      ...link_style,

      Background: {
        ...link_style.Background,
        ...background_style
      },
    }

  }

  if (font_style) {

    link_style = {
      ...link_style,

      Font: {
        ...link_style.Font,
        ...font_style
      }
    }
  }

  return (

    <TouchableOpacity
      style={link_style.Background}
      onPress={onClick}
    >
      <Text
        style={link_style.Font}
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