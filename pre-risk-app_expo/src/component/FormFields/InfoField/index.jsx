import React from 'react'
import { Text, View } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'

import { connect } from 'react-redux'

import getInfoFieldStyle from './InfoFieldStyle'

const InfoField = (props) => {

 const {app_theme, style, title, children} = props

 let Info_Field_Style = getInfoFieldStyle(app_theme)

  if (style) {
    Info_Field_Style = {

      Background: {
        ...Info_Field_Style.Background,
      ...style.Background
      },

      Title: {
        ...Info_Field_Style.Title,
        ...style.Title
      },

      Content: {
        ...Info_Field_Style.Content,
        ...style.Content
      }
    }
  }

  return (
    <View style ={Info_Field_Style.Background}>
      <Text style={Info_Field_Style.Title}>
        {title}
      </Text>

      <Text
        style={Info_Field_Style.Content}
      >
        {children}
      </Text>
    </View>
  )
}

const mapStateToProps = state => ({
  app_theme: state.app_config.app_theme
})

export default connect(mapStateToProps)(InfoField);
