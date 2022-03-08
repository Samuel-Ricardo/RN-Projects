import React, { useEffect, useState } from 'react'
import { Text, TouchableOpacity, View, Image, addons } from 'react-native'

import getHistoryItemStyleStyle from './HistoryItemStyle'

import { Alert } from 'react-native'

import Button from '../Button'

import { connect } from 'react-redux'

import * as API from '../../Services/API/API'

const HistoryItem = (props) => {
  const {
    app_theme,
    user,

    onPress,
    buttonText,

    key,

    container_style,
    font_style,

    id,
    items,
    total_value,
    cep_data,
    frete_data,
    buy_date,
  } = props

  let main_style = getHistoryItemStyleStyle(app_theme)

  const getItemsName = () => {

    var items_name = ''

    for (var i = 0; i < items.lenght; ++i) {

      items_name = items_name + items[i].name + ', '
    }

    return items_name
  }

  return (

    <View style={{
      ...main_style.Container,
      ...container_style,
    }}>

      <View style={main_style.ContentArea}>

        <View style={main_style.Line}>

          <Text style={main_style.Name}>
            {getItemsName()}
          </Text>

        </View>

        <View style={{ ...main_style.Line, marginTop: 10, }}>

          <Text style={main_style.Stock}>
            {buy_date}
          </Text>

          <Text style={main_style.Size}>
            Local: {cep_data.logradouro}
          </Text>

        </View>
        <View style={{ ...main_style.Line, marginTop: 10, marginBottom: 10 }}>

          <Text style={main_style.Value}>
            R$ {total_value}
          </Text>

          <Button
            style_button={
              {
                paddingTop: 0,
                paddingBottom: 0,
                paddingLeft: 45,
                paddingRight: 45,
              }
            }
            onClick={() => onPress(id)}
          >
            {buttonText}
          </Button>
        </View>

      </View>
    </View>

  )
}

const mapStateToProps = state => ({
  app_theme: state.app_config.app_theme,
  user: state.User.loggedUser,
})

export default connect(mapStateToProps)(HistoryItem)
