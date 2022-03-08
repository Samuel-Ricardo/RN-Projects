import React from 'react'
import { Text, View } from 'react-native'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler'

import { connect } from 'react-redux'
import SearchIcon from '../../image/icon/SearchIcon'

import getSearchBarStyle from './SearchBarStyle'

const SearchBar = (props) => {

 const {app_theme, placeholder, style, onChangeText, onButtonPress, value, children} = props

 let search_bar_style = getSearchBarStyle(app_theme)

  if (style) {
    search_bar_style = {
      ...search_bar_style,
      ...style
    }
  }

  return (
    <View style ={search_bar_style.Container}>

      <View style={search_bar_style.SearchArea}>
        <View style={search_bar_style.TextArea}>
          <TextInput
            style={search_bar_style.TextInput}
            placeholder={placeholder}
            onChangeText={onChangeText}
            value={value}
          />
        </View>

        <TouchableOpacity
          style={search_bar_style.SearchButton}
          onPress={onButtonPress}
        >
          <SearchIcon
            width={35}
            height={35}
            // fill_1='#FFF'
            // fill_2='transparent'
          />
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
