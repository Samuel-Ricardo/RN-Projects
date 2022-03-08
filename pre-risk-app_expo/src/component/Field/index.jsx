import React, { useState } from 'react'
import { Text, View } from 'react-native'
import { connect } from 'react-redux'

import getFieldStyle from './FieldStyle'

const Field = (props) => {

  const { text, value, app_theme } = props;

  const field_style = getFieldStyle(app_theme);

  return (

    <View style={field_style.Container}>
      <Text style={field_style.Text}>
       {text}
      </Text>
      <Text style={field_style.P}>
        {value}
      </Text>
    </View>
  )
}

const mapStateToProps = state => ({

  app_theme: state.app_config.app_theme
})

export default connect(mapStateToProps)(Field);
