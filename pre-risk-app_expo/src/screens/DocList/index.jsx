import React, { useEffect, useState } from 'react'
import { Text, View, ScrollView, Alert } from 'react-native'

import { connect } from "react-redux"
import { bindActionCreators } from 'redux'

import * as API from '../../server/API'

import getDocItemStyle from './doc_item_style'



const DocListScreen = ({
  navigation,
  route,

  user,

  driver,
  helper,
  vehicle,

  app_theme,
}) => {

  const { } = driver;
  const { } = helper;
  const { } = vehicle;

  const item_style = getDocItemStyle(app_theme)


  return (
    <>
      <View style={item_style.Container}>
          <View style={item_style.Message}>
            <Text>Bem Vindo de Volta Zeca Pagodinho :)</Text>
          </View>
      </View>
    </>
  )
}
//<ItemList></ItemList>
const mapStateToProps = state => (
  {
    user: state.User.loggedUser,
    app_theme: state.app_config.app_theme
  })

const mapDispatchToProps = dispatch => {

  const actions = {
    ...cart_actions,
    ...UserActions
  }

  return bindActionCreators(actions, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(DocListScreen);


//    <View>
//      <Text> Home Screen { route.params?.user }</Text>
//    </View>
