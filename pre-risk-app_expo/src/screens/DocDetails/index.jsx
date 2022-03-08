import React, { useEffect, useState } from 'react'
import { Text, View, ScrollView, Alert } from 'react-native'

import { connect } from "react-redux"
import { bindActionCreators } from 'redux'

import * as UserActions from "../../../Store/actions/User"
import * as cart_actions from '../../../Store/actions/ShoppingCart'

import * as API from '../../server/API'

import getHomeStyle from './details_style'

import DocDetails from "../DocDetails"
//import Header from '../../component/Header'
import Button from '../../component/Button'
import ItemList from '../../component/ItemList'
import Item from '../../component/Item'


const DocDetailsScreen = ({ navigation, route, user, logoutUser, addItem, app_theme, dispatch }) => {

 
  const home_style = getHomeStyle(app_theme)

 
  return (
    <>
      <View style={home_style.Container}>
        
        <ScrollView style={{
          marginBottom: 0,
          maxHeight: 130,
        }} >

          <View style={home_style.Message}>
            <Text>Bem Vindo de Volta Zeca Pagodinho :)</Text>
          </View>

        </ScrollView>
        <ItemList
          app_theme={app_theme}
        >
              <Text style={{ marginTop: 30 }}>
                Tela em produção (~ U.U)~
            </Text>
          

        </ItemList>
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


export default connect(mapStateToProps, mapDispatchToProps)(DocDetailsScreen);


//    <View>
//      <Text> Home Screen { route.params?.user }</Text>
//    </View>
