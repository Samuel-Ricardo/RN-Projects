import React from 'react'
import { Image, Text, View } from 'react-native'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler'

import { connect } from 'react-redux'
import SearchIcon from '../../icon/SearchIcon'

import getSearchBarStyle from './SearchBarStyle'

const updateIcon = require('../../assets/magnifier.png');


const SearchBar = (props) => {

  const { app_theme, placeholder, style, onChangeText, search, onButtonPress, value, children, text } = props

  let search_bar_style = getSearchBarStyle(app_theme)

  if (style) {
    search_bar_style = {
      ...search_bar_style,
      ...style
    }
  }

  return (
    <View style={search_bar_style.Container}>

      <View style={search_bar_style.SearchArea}>
        <View style={search_bar_style.TextArea}>
          <TextInput
            style={search_bar_style.TextInput}
            placeholder={placeholder}
            onChangeText={(search) => (text.setText(search))}
            value={text.text}
          />
        </View>

        <TouchableOpacity
          style={search_bar_style.SearchButton}
          onPress={() => onButtonPress()}
        >
          <Image source={updateIcon} style={{ width: 30, height: 30 }} />
        </TouchableOpacity>
      </View>

      <View style={search_bar_style.NavBar}>
        {children}
      </View>
    </View>
  )
}

const mapStateToProps = state => ({
  app_theme: state.app_config.app_theme
})

export default connect(mapStateToProps)(SearchBar);
