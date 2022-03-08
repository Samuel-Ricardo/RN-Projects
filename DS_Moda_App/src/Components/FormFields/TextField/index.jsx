import React from 'react'
import { Text, View } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'

import { connect } from 'react-redux'
import Button from '../../Button'

import getTextFiledStyle from './TextFieldStyle'

const TextField = (props) => {

  const { app_theme, placeholder, secureTextEntry, style, onChangeText, value, title, button, buttonText, onPress } = props

  let TextFieldStyle = getTextFiledStyle(app_theme)

  if (style) {
    TextFieldStyle = {
      ...TextFieldStyle,
      ...style
    }
  }

  if (button === true) {
    TextFieldStyle = {
      ...TextFieldStyle,
      TextInput: {
        ...TextFieldStyle.TextInput,
      borderLeftWidth: 0,
      }
    }
  }

  return (
    <View style={TextFieldStyle}>
      <Text style={TextFieldStyle.Title}>
        {title}
      </Text>
      <View style={TextFieldStyle.Container}>

        <TextInput
          style={TextFieldStyle.TextInput}
          placeholder={placeholder}
          onChangeText={onChangeText}
          value={value}
          secureTextEntry={secureTextEntry}
        />

        {/* {button === true
          ?
          <Button
            onClick={() => onPress()}
          >
            {buttonText}
          </Button>
          :
          <></>
        } */}

      </View>
    </View>
  )
}

const mapStateToProps = state => ({
  app_theme: state.app_config.app_theme
})

export default connect(mapStateToProps)(TextField);
